"use strict";

function Actor(_model,_shaderProgram,_texture, _owner){
	
	this.x = 0;
	this.y = 0;
	this.x_last =0;
	this.y_last =0;
	this.z_last =0;
	this.rotZ_last = 0;
	this.d_angle = 0;
	this.z = 0;
	this.rotX = 0;
	this.rotY = 0;
	this.rotZ = 0;
	this.scale = 1;
	this.scaleZ = 1;
	this.ShaderModelFrameSortId = 0;
	
	this.followTerrainSlope = false;
	this.hasShadow = false;
	this.shadowZOffset = 0;
	this.shadowShader= ShaderProgram.shadow_no_rotationShader;
	this.shadowModel = Asset.model.unitshadow;
	this.windOffset = 0;
	this.proto = null;
	this.renderLayer = 0;
	
	this.nodraw = false;
	this.cull_backfacing  = true;
	 
	this.age = 0;
	this.owner = _owner;
	
	this.model = _model;
	this.isRemoved = false;
	
	this.frame = 0;
	this.nextFrame = 0;
	this.animCollection = null;
	this.animTime = 0;
	this.animPosKey = 0;
	this.animFrame = 0;
	this.animFrameTime = 0; //from 0 to frameLength
	this.animSequence = null;
	//depends on the time between two animation frames
	//if between two frames there is one game update, then interp = 0.25;
	this.frameInterpDelta = 0.25; 
	this.frameInterp = 0;
	this.opacity = 1;
	
	this.shaderProgram = _shaderProgram;
	this.texture = _texture;
	this.texture_default = _texture;
	this.instanced_draw = false;
	
	this.lightsource = null;
	
	this.visible = false;
	this.bounding_box_width = 0.8; //used for visibility check
	this.bounding_box_height = 0.9;
	this.bounding_box_length = 0.7; //used for visibility check
	
	this.bounding_box_width_hittest = 0.7; //used for selection check
	this.bounding_box_height_hittest = 1.; //used for selection check
	
	this.bounding_box_centerX = 0;
	this.bounding_box_centerY = 0;
	this.bounding_box_centerZ = 0;
	
	this.refractionLowerBound = -0.1;
	
	this.preselected = false;
	this.selected = false;
	
	this.selectable_editor = true;
	this.hasHelperActor = false;
	
	this.update_drawloop = Actor.update_drawloop;
	this.update_anim = Actor.update_anim;
	this.update_posKeys = Actor.update_posKeys;
	this.moveTo = Actor.moveTo;
	this.update_selection = Actor.update_selection;
	this.setPos = Actor.setPos;
	
	if(this.owner != null && this.owner != undefined){
		this.checkVisibility = Actor.checkVisibility_Unit;
	}else{
		this.checkVisibility = Actor.checkVisibility;
	}
	
	this.hitTest = Actor.hitTest;
	this.remove = Actor.remove;
	this.startAnimation = Actor.startAnimation;
	this.world_move_update = Actor.world_move_update;
	this.setInterpolatedRotation = Actor.setInterpolatedRotation;
	
	this.spriteSize = Actor.SpriteSize_8x8 ;
	this.sprite_face_camera = true;
}
Actor.framesPerTick = 2;
Actor.frameInterpMultiplier = 1/Actor.framesPerTick;
Actor.SpriteSize_8x8 = [1/8,1/8];
Actor.SpriteSize_4x4 = [1/4,1/4];
Actor.SpriteSize_1x1 = [1,1];
Actor.SpriteSize_80px = [80/512 ,80/512];

Actor.update_drawloop = function(){
	this.frameInterp = Math.min(1, this.frameInterp + this.frameInterpDelta*Render.frameDelta);
}

Actor.startAnimation_explicit = function(a, anim){
	a.animSequence = anim;
	a.animFrameTime = 0;
	a.animPosKey = 0;
	a.animFrame = 0;
	a.animTime = 0;
	a.frameInterp = 0;
	a.frameInterpDelta = Actor.frameInterpMultiplier / a.animSequence.frameLengths[a.animFrame];
	a.frame =  a.animSequence.frames[a.animFrame];
	a.nextFrame = a.animSequence.frames[(a.animFrame+1)%a.animSequence.numberOfFrames];
}

Actor.startAnimation = function(animType){
	this.animSequence = this.animCollection[animType];
	var resetAnim = false;
	if(animType != this.animSequence.animType ){
		resetAnim = true;
	}
	if(this.animSequence == undefined){
		this.animSequence = this.animCollection[Anim.stand];
	}
	if(resetAnim == true){
		this.animFrameTime = 0;
		this.animPosKey = 0;
		if(this.animSequence.randomStart == false){
			this.animFrame = 0;
			this.animTime = 0;
		}else{
			this.animFrame = Math.floor(Math.random()*this.animSequence.numberOfFrames);
			this.animTime = this.animSequence.frameTimes[(this.animFrame-1+this.animSequence.numberOfFrames)%this.animSequence.numberOfFrames];
			if(this.animSequence.looping == true){
				if(this.animTime >= this.animSequence.endTime){
					this.animTime = 0;
				}
			}
		}
		
		this.frameInterp = 0;
		this.frameInterpDelta = Actor.frameInterpMultiplier / this.animSequence.frameLengths[this.animFrame];
		
		if(this.animSequence.blendStart == true && this.visible == true){
			//animblending will increase the number of frame-nextframe combinations
			this.frame = this.nextFrame;//this might be the key to animblending
			if(this.animSequence.frameLengths[this.animFrame] > Anim.maxBlendTime){
				var skippedTime = this.animSequence.frameLengths[this.animFrame]- Anim.maxBlendTime;
				this.animTime+=skippedTime;
				this.frameInterpDelta = Actor.frameInterpMultiplier / Anim.maxBlendTime;
			}
		}else{
			this.frame =  this.animSequence.frames[this.animFrame];
		}
		this.nextFrame = this.animSequence.frames[(this.animFrame+1)%this.animSequence.numberOfFrames];
	}
}

Actor.update_posKeys = function(){
	var key = this.animSequence.posKeys[this.animPosKey];
	var nextKey = this.animSequence.posKeys[this.animPosKey+1];
	var interp = (this.animTime-key.startTime)/(nextKey.startTime-key.startTime);
	var sn = Math.sin(3.1415-this.rotZ); var cs = Math.cos(3.1415-this.rotZ);
	var x_off = key.x * (1-interp) + nextKey.x*interp;
	var y_off = key.y * (1-interp) + nextKey.y*interp;
	this.x_last += cs*x_off-sn*y_off; 
	this.y_last += sn*x_off+cs*y_off; 
	this.z_last += key.z * (1-interp) + nextKey.z*interp;
	interp = (this.animTime+1-key.startTime)/(nextKey.startTime-key.startTime);
	this.scale = this.scale_base * (key.scale*(1-interp)+ nextKey.scale*interp);
}

Actor.update_posKeys_attachments = function(){
	var key = this.animSequence.posKeys[this.animPosKey];
	var nextKey = this.animSequence.posKeys[this.animPosKey+1];
	var interp = (this.animTime+1-key.startTime)/(nextKey.startTime-key.startTime);
	this.scale = this.scale_base * (key.scale*(1-interp)+ nextKey.scale*interp);
}

Actor.moveTo = function(_x,_y,_z){
	this.x = _x;
	this.y = _y;
	this.z = _z;
	this.x_last = _x;
	this.y_last = _y;
	this.z_last = _z;
}
Actor.world_move_update = function(offX, offY){
	this.x -= offX;
	this.y  -= offY;
	this.x_last -= offX;
	this.y_last -= offY;

}
Actor.setPos = function(newPos){
	this.x = newPos[0];
	this.y = newPos[1];
	this.z = newPos[2];
	this.x_last = newPos[0];
	this.y_last = newPos[1];
	this.z_last = newPos[2];
}

Actor.vis_minpoint = [0,0,0];
Actor.vis_maxpoint = [0,0,0];
Actor.vis_centerpoint = [0,0,0];


Actor.update_selection = function(){
	if(Control.dragSelectionRect.enabled == true){
		Actor.vis_minpoint[0]=this.x - this.bounding_box_width_hittest*0.5;
		Actor.vis_minpoint[1]=this.y - this.bounding_box_width_hittest*0.5;
		Actor.vis_minpoint[2]=this.z;
		Actor.vis_maxpoint[0] = this.x + this.bounding_box_width_hittest*0.5
		Actor.vis_maxpoint[1] = this.y + this.bounding_box_width_hittest*0.5;
		Actor.vis_maxpoint[2] = this.z;
		if(Utils.frustum_Cull_AABB(Actor.vis_minpoint,Actor.vis_maxpoint,Selection_Frustum) == true){
			this.preselected = true;
		}else{
			this.preselected = false;
		}
	}
}

Actor.checkVisibility = function(){
	//var half_w = this.bounding_box_width*0.5;
	if(this.nodraw == true){
		this.visible = false;
	}else{
		Actor.vis_minpoint[0]=this.x - this.bounding_box_width*0.5 + this.bounding_box_centerX;
		Actor.vis_minpoint[1]=this.y - this.bounding_box_length*0.5 + this.bounding_box_centerY;
		Actor.vis_minpoint[2]=this.z + this.bounding_box_centerZ;
		Actor.vis_maxpoint[0] = this.x + this.bounding_box_width*0.5 + this.bounding_box_centerX;
		Actor.vis_maxpoint[1] = this.y + this.bounding_box_length*0.5 + this.bounding_box_centerY;
		Actor.vis_maxpoint[2] = this.z + this.bounding_box_height + this.bounding_box_centerZ;
		this.visible = Utils.frustum_Cull_AABB(Actor.vis_minpoint,Actor.vis_maxpoint,View_Frustum);
	}
}

Actor.checkVisibility_reflection = function(){
	if(Math.abs(this.x - cam.pos[0]) > 20 || Math.abs(this.y - cam.pos[1]) > 20 || this.nodraw == true){
		this.visible = false;
	}else{
		if((Math.abs(this.x - cam.pos[0]) < 9 && Math.abs(this.y - cam.pos[1]) < 9.5)){
			this.visible = true;
		}else{
			Actor.vis_minpoint[0]=this.x - this.bounding_box_width*0.5 + this.bounding_box_centerX;
			Actor.vis_minpoint[1]=this.y - this.bounding_box_length*0.5 + this.bounding_box_centerY;
			Actor.vis_minpoint[2]= -this.z - this.bounding_box_height - this.bounding_box_centerZ;
			Actor.vis_maxpoint[2]= -this.z - this.bounding_box_centerZ;
			Actor.vis_maxpoint[0] = this.x + this.bounding_box_width*0.5 + this.bounding_box_centerX;
			Actor.vis_maxpoint[1] = this.y + this.bounding_box_length*0.5 + this.bounding_box_centerY;
			this.visible = Utils.frustum_Cull_AABB(Actor.vis_minpoint,Actor.vis_maxpoint,View_Frustum);
		}
	}
}

Actor.checkVisibility_SHIP = function(){
	if(Math.abs(this.x - cam.pos[0]) > 40 || Math.abs(this.y - cam.pos[1]) > 40 || this.nodraw == true){
		this.visible = false;
	}else{
		this.visible = true;
	}
}

Actor.checkVisibility_Unit = function(){
	if(Math.abs(this.x - cam.pos[0]) > Render.actor_cull_outer || Math.abs(this.y - cam.pos[1]) > Render.actor_cull_outer || this.nodraw == true){
		this.visible = false;
	}else{
		if((Math.abs(this.x - cam.pos[0]) < 9 && Math.abs(this.y - cam.pos[1]) < 9.5)){
			this.visible = true;
		}else{
			Actor.vis_centerpoint[0] = this.x;
			Actor.vis_centerpoint[1] = this.y;
			Actor.vis_centerpoint[2] = this.z;
			var radius = this.bounding_box_width;
			this.visible = Utils.frustum_Cull_Sphere(Actor.vis_centerpoint, radius ,View_Frustum);
		}
	}
}

Actor.checkVisibility_Structure = function(){
	if(Math.abs(this.x - cam.pos[0]) > Render.actor_cull_outer || Math.abs(this.y - cam.pos[1]) > Render.actor_cull_outer 
	|| this.nodraw == true || this.revealed == false){
		this.visible = false;
	}else{
		if((Math.abs(this.x - cam.pos[0]) < 9 && Math.abs(this.y - cam.pos[1]) < 9.5)){
			this.visible = true;
		}else{
			Actor.vis_centerpoint[0] = this.x;
			Actor.vis_centerpoint[1] = this.y;
			Actor.vis_centerpoint[2] = this.z;
			var radius = this.bounding_box_width;
			this.visible = Utils.frustum_Cull_Sphere(Actor.vis_centerpoint, radius ,View_Frustum);
		}
 
	}
}

Actor.checkVisibility_ParticleEffect = function(){
	if(Math.abs(this.x - cam.pos[0]) > Render.actor_cull_outer || Math.abs(this.y - cam.pos[1]) > Render.actor_cull_outer || this.nodraw == true){
		this.visible = false;
	}else{
		if((Math.abs(this.x - cam.pos[0]) < 9 && Math.abs(this.y - cam.pos[1]) < 9.5)){
			this.visible = true;
		}else{
			Actor.vis_centerpoint[0] = this.x;
			Actor.vis_centerpoint[1] = this.y;
			Actor.vis_centerpoint[2] = this.z;
			this.visible = Utils.frustum_Cull_Sphere(Actor.vis_centerpoint,this.bounding_sphere_radius,View_Frustum);
		}
	}
}
Actor.checkVisibility_Projectile = Actor.checkVisibility_Unit;

Actor.checkVisibility_Rope = function(){
	if(Math.abs(this.x - cam.pos[0]) > 20 || Math.abs(this.y - cam.pos[1]) > 20 || this.nodraw == true){
		this.visible = false;
	}else{
		if((Math.abs(this.x - cam.pos[0]) < 9 && Math.abs(this.y - cam.pos[1]) < 9.5)){
			this.visible = true;
		}else{
			Actor.vis_centerpoint[0] = (this.startPoint.x + this.endPoint.x) /2;
			Actor.vis_centerpoint[1] = (this.startPoint.y + this.endPoint.y) /2;
			Actor.vis_centerpoint[2] = (this.startPoint.z + this.endPoint.z) /2;
			this.visible = Utils.frustum_Cull_Sphere(Actor.vis_centerpoint, this.bounding_sphere_radius ,View_Frustum);
		}
	}
}
Actor.checkVisibility_Decal = Actor.checkVisibility_ParticleEffect;

Actor.checkVisibility_always = function(){
	this.visible = true;
}

//for correct functioning, this has to be checked after the parent visibility check
//If all child actors are inserted into the Actors array after the parent actors, it should work 
Actor.checkVisibility_inherit = function(){
	this.visible = this.baseActor.visible;
}

Actor.calculateBoundingBox = function(d, iter){
	if(d.shaderProgram == ShaderProgram.caveShader){
		d.bounding_box_centerX = 0;
		d.bounding_box_centerY = 0;
		d.bounding_box_centerZ = 0;
		
		d.bounding_box_width = 1;
		d.bounding_box_length = 1;
		d.update_gameloop(); //update z
		d.bounding_box_height = Math.max(0.1, 4-d.z);
		return;
	}
	
	//update with scale
	d.bounding_box_width = d.model.bound_width * d.scale;
	d.bounding_box_length = d.bounding_box_width;
	d.bounding_box_height = d.model.bound_height * d.scale;
	d.bounding_box_centerX = 0;
	d.bounding_box_centerY = 0;
	d.bounding_box_centerZ = d.model.bound_zOffset * d.scale;
	
	if(d.hasShadow != true){
		return;
	}
	//caculate edge of shadow
	var sang = Environment.getSunAngle();
	var cs = -Math.sin(sang);
	var sn = -Math.cos(sang);
	var dood_height = (d.bounding_box_height + d.bounding_box_centerZ);
	var zz =  dood_height+d.z;
	var shadow_factor = Environment.getShadowLength();
	var slen = shadow_factor * dood_height;
	var zmax = zz;
	var search_end = slen + shadow_factor*8;
	
	//abban az esetben ha a modellnek csak a széle vet hosszú árnyékot
	var search_offset_x = cs * d.bounding_box_width *0.4;
	var search_offset_y = sn * d.bounding_box_width *0.4;
	
	var intersect_x = d.x + search_offset_x; var intersect_y = d.y + search_offset_y; var intersect_z = 0;
	for(var k=0;k< search_end ;k+=iter){ //search along shadow direction
		intersect_x += cs*iter; intersect_y += sn*iter;
		intersect_z = M.terrain.getHeightAt(intersect_x, intersect_y);
		if(intersect_z > zz-k*dood_height/slen){
			break;
		}
	}
	//fit shadow in a box
	var half_w = d.bounding_box_width*0.5;

	var minX= Math.min(intersect_x, d.x - half_w);
	var minY= Math.min(intersect_y, d.y - half_w);
	var minZ= Math.min(intersect_z, d.z + d.bounding_box_centerZ);
	var maxX = Math.max(intersect_x, d.x + half_w);
	var maxY = Math.max(intersect_y, d.y + half_w);
	var maxZ= Math.max(intersect_z, d.z + d.bounding_box_height + d.bounding_box_centerZ);

	d.bounding_box_width = maxX-minX;
	d.bounding_box_length = maxY-minY;
	d.bounding_box_height = maxZ - minZ;
	d.bounding_box_centerZ = minZ-d.z;
	d.bounding_box_centerX = (maxX+minX)*0.5 - d.x;
	d.bounding_box_centerY = (maxY+minY)*0.5 - d.y;
}


Actor.hitTest = function(ray_planes){
	if(Math.abs(this.x - cam.pos[0]) > 20 || Math.abs(this.y - cam.pos[1]) > 20){
		return false;
	}else{
		Actor.vis_minpoint[0]=this.x - this.bounding_box_width_hittest*0.5;
		Actor.vis_minpoint[1]=this.y - this.bounding_box_width_hittest*0.5;
		Actor.vis_minpoint[2]=this.z;
		Actor.vis_maxpoint[0] = this.x + this.bounding_box_width_hittest*0.5;
		Actor.vis_maxpoint[1] = this.y+ this.bounding_box_width_hittest*0.5;
		Actor.vis_maxpoint[2] = this.z + this.bounding_box_height_hittest;
		return Utils.frustum_Cull_AABB(Actor.vis_minpoint,Actor.vis_maxpoint, ray_planes);
	}
}

Actor.hitTest_sphere = function(ray_planes){
	if(Math.abs(this.x - cam.pos[0]) > 20 || Math.abs(this.y - cam.pos[1]) > 20 || this.nodraw == true){
		return false;
	}else{
		Actor.vis_centerpoint[0] = this.x;
		Actor.vis_centerpoint[1] = this.y;
		Actor.vis_centerpoint[2] = this.z;
		var radius = this.bounding_box_width_hittest;
		return Utils.frustum_Cull_Sphere(Actor.vis_centerpoint, this.bounding_box_width_hittest ,ray_planes);
	}
}

Actor.hitTest_never = function(){
	return false;
}

Actor.collision_check = function(){
	var mynode = Pathfinder.getNodeAt_Robust(this.x, this.y);
	var nx = mynode.nodex;var ny = mynode.nodey;
	var tilesRadius = 1;
	var r1 = this.collision_radius;
	for(var i=-tilesRadius; i<=tilesRadius; ++i){
		if(ny+i < 0 || ny + i >= pf.mapH){continue};
		for(var j=-tilesRadius;j<=tilesRadius;++j){
			if(nx+j < 0 || nx + j >= pf.mapW){continue};
			
			var nod = pf.map[ny+i][nx+j]; 
			for(var u=nod.firstColl;u;u=u.nextColl){
				if(u == this || u.alive == false){continue;}
				var distance = Unit_Distance_3d(this,u);
				var r2 = u.moving == true ? u.softRadius_moving : u.softRadius_standing;
				if(distance < r1 + r2){
					var distVectorX = (this.x - u.x); var distVectorY = (this.y - u.y);
					var pressure_force = (r1 + r2 - distance) / (r1 + r2);
					var pressure_radial = pressure_force * u.pressureStrength_radial;
					
					Vector.translate_3d(this.pressureVector, pressure_radial  * distVectorX, pressure_radial  * distVectorY,0);
				}
			}
		}
	}
}

Actor.remove = function(){
	this.preselected = false;
	this.isRemoved = true;
	
	if(this.selected == true){
		this.selected = false;
		Selected.splice(Editor.selected.indexOf(this), 1);
	}
	if(this.turret != undefined && this.turret != null){
		Actors.splice(Actors.indexOf(this.turret), 1);
		this.turret = null;
	}
	if(this.lightsource != null){
		this.lightsource.detachFromActor();
	}
	Actors.splice(Actors.indexOf(this), 1);
}

Actor.setInterpolatedRotation = function(finalAngle){
	var turnSpeed = this.turnSpeed;
	//var anglediff = ((((finalAngle - this.rotZ) % 3.1415) + 4.7124) % 3.1415) - 1.5708;
	var anglediff = this.rotZ - finalAngle;
	if(( Math.abs(anglediff) <= turnSpeed) || Math.abs(anglediff) >= 6.283-turnSpeed){
		this.rotZ_last = finalAngle;
	}else if(anglediff  < -turnSpeed){
		if(anglediff < -3.1415){
			this.rotZ_last -= turnSpeed;
		}else{
			this.rotZ_last += turnSpeed;
		}
	}else if(anglediff  > turnSpeed){
		if(anglediff > 3.1415){
			this.rotZ_last += turnSpeed;
		}else{
			this.rotZ_last -= turnSpeed;
		}
	}
}

Actor.getSlopeAngle = function(){
	var normZ = M.terrain.getSlopeZAt(this.x, this.y);
	if(normZ == 1){
		this.rotX = 0;
		this.rotY = 0;
	}else{
		this.rotX = Math.atan2(M.terrain.getSlopeYAt(this.x, this.y)/(normZ),1);
		this.rotY = Math.atan2(M.terrain.getSlopeXAt(this.x, this.y)/(normZ),1);
	}
}

Actor.remove_Cliff = function(){
	this.preselected = false;
	this.isRemoved = true;
	if(this.selected == true){
		this.selected = false;
		Selected.splice(Editor.selected.indexOf(this), 1);
	}
	Actors.splice(Actors.indexOf(this), 1);
	this.node.actor = null;
}


/*Actor.PrototypeActor = function(unitProto){
	var a = unitProto.actor_constructor(null);
	a.checkVisibility = function(){
		this.visible = true;
	}
	return a;
}*/
Actor.EditorActor = function(_linkedObject){
	var a = new Actor( Asset.model.dummy , ShaderProgram.standard_no_specShader, Asset.texture.white, null);
	a.linkedObject = _linkedObject;
	if(a.linkedObject.proto != undefined){
		a.model = a.linkedObject.proto.helperModel;
	}
	a.x = _linkedObject.x; a.y = _linkedObject.y; a.z = _linkedObject.z;
	//background actor
	if(a.linkedObject.shaderProgram == ShaderProgram.backgroundShader){
		a.x = Math.max(0, Math.min(M.width, a.x));
		a.y = Math.max(0, Math.min(M.height,a.y));
	}
	
	a.rotZ = a.linkedObject.rotZ;
	a.editor_only = true;
	if(a.linkedObject.isJumpPoint != true){
		a.scale = a.linkedObject.scale;
		if(a.linkedObject.isRope){
			a.x =a.linkedObject.endPoint.x;
			a.y =a.linkedObject.endPoint.y;
			a.z =a.linkedObject.endPoint.z;
		}
	}else{
		a.scale = a.linkedObject.jumpDistance;
		a.rotZ  = a.linkedObject.jumpDir;
	}
	
	if(a.linkedObject.isPatrolPoint ||  a.linkedObject.isUnitSpawner){
		a.hitTest = Actor.hitTest_never;
	}
	
	a.update_gameloop = function(){
		if(this.linkedObject == null || this.linkedObject.isRemoved){
			this.remove();
			return;
		}
		
		if(this.linkedObject.helperModel){
			this.model = this.linkedObject.helperModel;
		}
		if(this.linkedObject.helperColor){
			this.shaderProgram = ShaderProgram.tintedShader;
			this.tint = this.linkedObject.helperColor;
		}
		if(this.linkedObject.isUnitSpawner){
			this.scale = this.linkedObject.spawnType.actorScale;
		}
		
		if(this.selected){
			if(this.linkedObject.isUnitSpawner == true){
				this.scale = this.linkedObject.spawnType.actorScale;
				this.texture = this.texture_default = this.linkedObject.texture;
				this.moveTo(this.linkedObject.x, this.linkedObject.y,this.linkedObject.z);
			}else if(this.linkedObject.isPatrolPoint == true){
				this.scale = this.linkedObject.patrolRadius;
				this.rotZ = 0;
				this.moveTo(Math.floor(this.linkedObject.x)+0.5, Math.floor(this.linkedObject.y)+0.5,this.linkedObject.z-0.3)
			}else if(this.linkedObject.isJumpPoint == true){
				this.linkedObject.jumpDistance = this.scale;
				this.linkedObject.jumpDir = this.rotZ;
			}else if(this.linkedObject.isRope == true){
				this.linkedObject.endPoint.x = this.x;
				this.linkedObject.endPoint.y = this.y;
				this.linkedObject.endPoint.z = this.z;
			}else if(this.linkedObject.renderLayer == -1){
				//reflection actor
				this.linkedObject.x=this.x;
				this.linkedObject.y=this.y;
				this.linkedObject.z=this.z;
				this.linkedObject.scale=this.scale;
				this.model = this.linkedObject.model;
				if(this.linkedObject.partitioned){
					Actor.updateDoodadPartition(this.linkedObject);
				}
			}
		}
		this.nodraw = !Render.drawEditorHelpers;
	}

	a.update_linked_object = function(){
		this.linkedObject.x = this.linkedObject.x_last = this.x;
		this.linkedObject.y = this.linkedObject.y_last = this.y;
		this.linkedObject.z = this.linkedObject.z_last = this.z;
		this.linkedObject.rotZ = this.linkedObject.rotZ_last = this.rotZ;
	}
	
	if(a.linkedObject.isRope){
		a.update_linked_object = Utils.DO_NOTHING;
	}
	
	if(a.linkedObject.renderLayer == -1){
		//reflected actor
		a.scale = a.linkedObject.scale;
		a.model = a.linkedObject.model;
		a.shaderProgram = ShaderProgram.waveShader;
		a.opacity = 0.2;
		a.getCopy = function(){
			return this.linkedObject.getCopy();
		}
	}
	
	a.getDoodadSaveData = undefined;
	
	return a;
}

Actor.EditorSplinePoint = function(_linkedPoint, _linkedRoad){
	var a = Actor.EditorActor(_linkedPoint);
	a.linkedRoad = _linkedRoad;
	a.z = 0;
	a.scale = a.linkedObject.width * 0.5;
	a.rotZ = - a.linkedObject.fillet - 1.5708;
	//a.update_gameloop = function(){};
	a.update_linked_object = function(){
		this.linkedObject.x = this.x;
		this.linkedObject.y = this.y;
		this.linkedObject.fillet = (-this.rotZ + 4.712389)%6.283;
		this.linkedObject.width = this.scale*2;
		this.linkedRoad.needs_update = true;
	}
	a.editorDeleteAction = function(){
		this.linkedRoad.removePoint(this.linkedRoad.spline.indexOf(this.linkedObject));
	}
	a.copySpecial = function(){
		var myId = this.linkedRoad.spline.indexOf(this.linkedObject);
		var newPoint = this.linkedRoad.insertPoint(myId);
		Actors.push(Actor.EditorSplinePoint(newPoint, this.linkedRoad));
	}
	return a;
}

//type is 0 for point helper, 1 for linedef helper, 2 for segment helper
Actor.EditorBuilderPoint = function(_linkedObject, _linkedModel, _type){
	var a = new Actor( Asset.model.flak , ShaderProgram.standard_no_specShader, Asset.texture.white, null);
	a.linkedObject = _linkedObject;
	a.linkedModel = _linkedModel;
	a.z = 0;
	a.scale = 1;
	a.type = _type;
	a.editor_only = true;
	a.hitTest = Actor.hitTest_sphere;
	
	a.linkedObject.helper = a;
	if(a.type == 0){//point
		a.x = a.linkedObject.x;
		a.y = a.linkedObject.y;
	}else if(a.type == 1){//edge
		a.x = 0.5*(a.linkedObject.p1.x + a.linkedObject.p2.x);
		a.y = 0.5*(a.linkedObject.p1.y + a.linkedObject.p2.y);
		a.model = Asset.model.dummy_linedef;
		a.rotZ = a.linkedObject.getAngle();
		a.nextFrame = 1;
	}else if(a.type == 2){
		a.model = Asset.model.spawntrigger;
		a.x = a.linkedObject.getCenterX();
		a.y = a.linkedObject.getCenterY();
		a.z = a.linkedObject.floor;
		a.rotX = a.linkedObject.ceiling;
	}
	
	a.update_drawloop = function(){
		this.scale = 0.15 + cam.distance*0.02;
		this.bounding_box_width_hittest = this.scale*0.7;
		//when hovering near a point in draw mode, show that the drawing will be snapped to that point
		if(this.type == 0 && Editor.brushMode == Editor.brushMode_Draw ){
			if(Math.abs(Control.terrainCursorPos[0]-this.x)+Math.abs(Control.terrainCursorPos[1]-this.y)<Editor.snap_draw_size){
				this.scale *= 2;
			}
		}else if(this.type == 1){//use model frame interpolation to only scale the width of the helper
			this.frameInterp = 0.03*this.linkedObject.getLength()/this.scale;
		} 
		if(this.selected){
			this.texture = Asset.texture.selection_red;
		}else{
			this.texture = this.texture_default;
		}
	}
	a.update_gameloop = function(){
		if(this.type == 0){
			if(this.selected){
				Minimap.tintAt(this.x,this.y,1,1,0);
			}else{
				Minimap.tintAt(this.x,this.y,0.6,0.6,0.6);
			}
		}else{
			if(this.type == 1){ //linedef
				if(this.selected){
					Minimap.tintAt(this.x,this.y,1,0,0);
					Minimap.tintAt(0.5*(this.x+this.linkedObject.p1.helper.x),0.5*(this.y+this.linkedObject.p1.helper.y),1,0,0);
					Minimap.tintAt(0.5*(this.x+this.linkedObject.p2.helper.x),0.5*(this.y+this.linkedObject.p2.helper.y),1,0,0);
				}else{
					Minimap.tintAt(this.x,this.y,0.3,0.2,0);
					Minimap.tintAt(0.5*(this.x+this.linkedObject.p1.helper.x),0.5*(this.y+this.linkedObject.p1.helper.y),0.3,0.2,0);
					Minimap.tintAt(0.5*(this.x+this.linkedObject.p2.helper.x),0.5*(this.y+this.linkedObject.p2.helper.y),0.3,0.2,0);
				}
				if(this.linkedObject.sound_blocker){
					this.model = Asset.model.dummy_linedef_soundblocker;
				}else{
					this.model = Asset.model.dummy_linedef;
				}
			}
			 
			if(this.linkedObject.tag ){
				if(!this.getInfoText){
					this.getInfoText = function(){
						return this.linkedObject.tag > 0 ? "tag:"+this.linkedObject.tag : " ";
					}
					GUI.AddInfoText( this );
				}
				this.texture_default  = Asset.texture.cyan;
			}else{
				this.texture_default  = Asset.texture.gray;
			}
			 
		}
	}
	
	a.update_linked_object = function(){
		if(this.type == 0){ //point
			this.linkedObject.on_helper_move();
		}else if(this.type == 1){ //linedef	
			this.linkedObject.on_helper_move();
			this.linkedObject.extra_topZ = this.rotX;
			this.linkedObject.extra_bottomZ = this.rotY;
		}else if(this.type == 2){ //segment
			//this.linkedObject.move_center_to(this.x,this.y);
			this.linkedObject.ceiling = this.rotX;
		}
		
		this.linkedModel.needs_update = true;
	}
	
	a.update_linked_height = function(){
		if(this.type == 2){
			this.linkedObject.set_floor(this.z);
			this.linkedModel.needs_update = true;
		}
	}
	
	a.update_linked_scale = function(){
		/*if(this.type == 2){
			this.linkedObject.ceiling = this.z + this.scale;
			this.linkedModel.needs_update = true;
		}*/
	}
	
	a.editorDeleteAction = function(){
		if(!this.isRemoved){
			if(this.type == 0){ 
				this.linkedModel.deletePoint(this.linkedObject);
			}else if(this.type == 1){
				this.linkedModel.weldEdge(this.linkedObject);
			}else if(this.type == 2){
				this.linkedModel.destroySegment(this.linkedObject);
			}
			this.linkedModel.needs_update = true;
		}
	}
	
	a.copySpecial = function(){
		if(this.type == 0){//chamfer vertex in direction of mouse
			this.linkedModel.chamfer_towards_mouse(this.linkedObject );
		}else if(this.type == 1){ //bisect edge
			var rval = this.linkedModel.bisect(this.linkedObject);
			this.linkedModel.addPointHelper(rval[0]);
			this.linkedModel.addEdgeHelper(rval[1]);
			
			this.x = this.linkedObject.getCenterX();
			this.y = this.linkedObject.getCenterY();
			BuilderModel.ACTIVE_ACTOR.local_to_global(this);
		}
		//var myId = this.linkedRoad.spline.indexOf(this.linkedObject);
		//var newPoint = this.linkedRoad.insertPoint(myId);
		//Actors.push(Actor.EditorSplinePoint(newPoint, this.linkedRoad));
	}
	a.getDoodadSaveData = undefined;
	return a;
}

Actor.Cut_Draw_Point = function(x,y){
	var a = new Actor( Asset.model.cube, ShaderProgram.standard_no_specShader, Asset.texture.white, null);
	a.scale = 0.2;
	a.spriteSize = Actor.SpriteSize_1x1;
	a.editor_only = true;
	a.x = x; a.y = y;
	return a;
}

/*Actor.EditorFacePoint = function(_linkedActor, _linkedTriangle){
	var a = Actor.EditorActor(_linkedActor);
	a.linkedObject = _linkedActor;
	a.linkedTriangle = _linkedTriangle;
	a.scale = 0.83;
	a.shaderProgram = ShaderProgram.triangleShader;
	a.model = a.shadowModel = Asset.model.face_center;
	a.tint = GUI.textColor_white;
	
	a.update_gameloop = Actor.EditorFacePoint.update_gameloop;
	a.update_linked_object = Actor.EditorFacePoint.update_linked_object;
	
	a.editorDeleteAction = Utils.DO_NOTHING;
	return a;
}
Actor.EditorFacePoint.update_gameloop = function(){
	if(this.linkedObject == null || this.linkedObject.isRemoved){
		this.remove();
		return;
	}
	this.nodraw = !Render.drawEditorHelpers;
	this.tint = Trigger.list[this.linkedTriangle.sectorId].color;
};
Actor.EditorFacePoint.update_linked_object = function(){
	this.linkedTriangle.sectorId = Math.floor(this.rotX*10);
	this.linkedObject.model.buffer_from_triangle_colors();
}*/

Actor.SpawnWallDecal = function(x,y,z,collider, triangle, scale ){
	var a = new Actor( Asset.model.beacon , ShaderProgram.multiplyShader , Asset.texture.bulletHole , null);
	var plane = new Float32Array(3);
	vec3.rotate_collider_inverse(plane, triangle.plane, collider);
	a.x = x + plane[0]*0.005;
	a.y = y + plane[1]*0.005;
	a.z = z + plane[2]*0.005;
	a.scale = scale * (0.08 + Math.random()*0.07);
	a.decay = 0;
	a.opacity = 0.9;
	a.timeLeft = 500;
	a.sector = triangle.getSector();
	a.triangle = triangle;
	a.selectable_editor = false;
	a.collider = collider;
	
	var pitch = Math.acos(plane[2]);
	var yaw = Math.atan2(plane[0],plane[1]) - 1.57;
	var rot = Utils.euler_zxy_to_xyz(0,pitch,yaw);
	a.rotX = rot[0];
	a.rotY = rot[1];
	a.rotZ = Math.floor(Math.random()*4)*1.57;
	
	a.update_gameloop = Actor.update_gameloop_wallDecal;
	a.update_drawloop = Utils.DO_NOTHING;
	Actor.addToWorld(a);
	return a;
}
Actor.update_gameloop_wallDecal = function(){
	this.timeLeft --;
	if(this.timeLeft <= 0){
		this.opacity -= 0.001;
	}
	this.z += this.sector.dz * this.triangle.color[2];
	if(this.collider){
		this.x += this.collider.dx;
		this.y += this.collider.dy;
	}
	if(this.opacity <= 0){
		this.remove();
	}
}

Actor.SFXActor = function(_model, _texture, _anim, _time){
	var a = new Actor( _model , ShaderProgram.standard_no_specShader, _texture, null);
	a.timeLeft = _time;
	a.animCollection = _anim;
	a.decay = 0;
	a.update_gameloop = Actor.SFXActor.update_gameloop;
	
	a.startAnimation(Anim.stand);
	return a;
}
Actor.SFXActor.update_gameloop = function(){
	this.update_anim();
	this.timeLeft --;
	if(this.timeLeft <= 0){
		this.remove();
	}
	this.z -= this.decay;
}

Actor.SFXSpriteActor = function( _texture, _anim, _time  ){
	var a = Actor.SFXActor(Asset.model.sprite, _texture,_anim,_time);
	a.shaderProgram =ShaderProgram.spriteShader;
	return a;
}

/*Actor.SpawnDrip = function( x,y,z){
	var a = Actor.SFXSpriteActor( Asset.texture.ghast, Anim.DripAnim, 12);
	a.spriteSize = Actor.SpriteSize_80px;
	a.moveTo(x,y,z);
	a.scale = 0.625;
	Actors.push(a);
	return a;
}*/
Actor.SpawnRocketExplosion = function(x,y,z, scale, bringForward){
	var expl = Actor.SFXSpriteActor( Asset.texture.explosion , Anim.ExplosionAnim , 12);
	expl.spriteSize  =  Actor.SpriteSize_4x4;
	x -= Math.sign(x-cam.pos[0])*bringForward;
	y -= Math.sign(y-cam.pos[1])*bringForward;
	z-=0.4;
	expl.moveTo(x,y,z);
	expl.scale = 1.3 * scale;
	Actors.push(expl);
	return expl;
}
Actor.SpawnBloodSplat = function( x,y,z){
	var a = Actor.SFXSpriteActor( Asset.texture.bloodsplat, Anim.BloodSplatAnim, 20);
	a.spriteSize = Actor.SpriteSize_4x4;
	a.moveTo(x,y,z);
	Actors.push(a);
	return a;
}
Actor.SpawnBloodSmallSplat = function( x,y,z){
	var a = Actor.SFXSpriteActor( Asset.texture.bloodsplat, Anim.BloodSmallSplatAnim, 15);
	a.spriteSize = Actor.SpriteSize_4x4;
	a.scale = Math.random()*0.3+0.5;
	if(Math.random()<0.5){
		a.scale *= 1.2;
		z-= a.scale*0.6;
		a.startAnimation(Anim.stand2);
		a.timeLeft = 12;
	}else{
		z-= a.scale*0.4;
	}
	
	//bring it forward, towards camera
	x -= Math.sign(x-cam.pos[0])*0.1;
	y -= Math.sign(y-cam.pos[1])*0.1;
	a.moveTo(x,y,z);
	Actors.push(a);
	return a;
}

Actor.SpawnWeaponBlood = function(x,y,z,triangle){
	if(Math.random()<0.5){ //particle effect
		var splat = ParticleActor.SpawnBloodSplat(x,y,z, 1.57-cam.yaw);
		splat.floorZ = NavNode.get_floor_z(splat.x,splat.y,splat.z)+0.05;
		splat.floor_triangle = triangle;
	}else{ //sprite effect
		var splatSprite = Actor.SpawnBloodSmallSplat(x,y,z);
		splatSprite.floor_triangle = triangle;
	} 
}

Actor.add_lockOn_fire = function(parent){
	var a = Actor.SFXSpriteActor( Asset.texture.doodad_fire2, Anim.FireAnim, parent.timeLeft);
	parent.children.push(a);
	a.spriteSize = [0.25,1];
	a.scale = 0.6;
	a.x = parent.x; a.y = parent.y;
	Actors.push(a);
	return a;
}

Actor.SpawnLockOn = function( target, caster, timeLeft ){
	var a = Actor.SFXActor(Asset.model.lock_on, Asset.texture.lock_on, Anim.Empty, timeLeft);
	//a.shaderProgram = ShaderProgram.doomShader;
	//a.scale_base = actor.owner.hardRadius;
	a.caster = caster;
	 
	a.texture = Asset.texture.invisible;
	a.targetActor = target.actor;
	a.target = target;
	a.moveTo(target.x, target.y, target.z);
	SoundObject.soulfire.play(0,0);
	
	a.children = [];
	Actor.add_lockOn_fire(a);
	Actor.add_lockOn_fire(a);
	Actor.add_lockOn_fire(a);
	Actor.add_lockOn_fire(a);
	
	a.cull_backfacing = false;
	a.hasVision = false;
	a.fire_height = -0.05;
	a.update_gameloop = function(){
		this.hasVision = false;
		this.fire_height = Math.min(0.25, this.fire_height + 0.006);
		if(this.caster.alive && this.caster.task.id != Task.id_StunTask){
			if(this.caster.can_see_unit(this.target)){
				this.hasVision = true;
				this.x = this.target.x;
				this.y = this.target.y;
				this.z = this.target.z;
				if(this.timeLeft % 6 == 1){
					this.target.Hurt(1, this.caster);
					SoundObject.fireball_hit.playAt(this.target.x,this.target.y);
				}
			}
		}else{
			this.timeLeft = 0;
		}
		this.timeLeft --;
		if(this.timeLeft <= 0){
			for(var i=0;i<this.children.length;++i){
				this.children[i].timeLeft = 0;
			}
			this.remove();
		}
	}
	a.update_drawloop = function(){
		if(this.hasVision){
			this.x = this.target.actor.x;
			this.y = this.target.actor.y;
			this.z = this.target.actor.z  ;
		}
		this.rotZ -= Render.frameDelta * 0.05;
		for(var i=0;i<this.children.length;++i){
			this.children[i].x = this.x + 0.3*Math.sin(this.rotZ + i*1.57);
			this.children[i].y = this.y + 0.3*Math.cos(this.rotZ + i*1.57);
			this.children[i].z = this.z+this.fire_height;
		}
	}
 
	Actors.push(a);
	return a;
}

Actor.SpawnAura = function( actor ){
	var a = Actor.Aura(actor);
	Actors.push(a);
	return a;
}

Actor.SpawnOrderAura = function(){
	var a = Actor.Aura(null);
	a.x = Control.clickStartPoint_Terrain[0];
	a.y = Control.clickStartPoint_Terrain[1];
	a.z = Control.clickStartPoint_Terrain[2]+0.2;
	a.scale_base = 0.6;
	a.growth = -0.02;
	a.timeLeft = 30;
	a.tint_base = Actor.tint_order;
	a.shaderProgram = ShaderProgram.worldGuiShader;
	a.scaleX  = a.scaleY = 1;
	Actors.push(a);
	return a;
}
Actor.SpawnTargetAura = function( actor ){
	var a = Actor.Aura(actor);
	//a.scale_base = actor.owner.hardRadius;
	a.growth = 0.02;
	a.zOffset = -actor.model.bound_zSize*actor.scale*0.6+0.1;
	a.timeLeft = 35;
	a.scale_base = 0.8;
	Actors.push(a);
	return a;
}
Actor.SpawnNovaAura = function( actor ){
	var a = Actor.Aura(actor);
	a.growth = 0.;
	a.texture = Asset.texture.stun;
	a.zOffset = -0.4;
	//a.timeLeft = 35;
	a.tint_base = Actor.tint_nova;
	a.scale_base = 2.2;
	a.rotSpeed = 0.1;
	Actors.push(a);
	return a;
}

Actor.SpawnLocustAura = function( x,y,z ){
	var a = Actor.Aura(null);
	a.x=x;a.y=y;a.z=z;
	a.growth = -0.15;
	a.texture = Asset.texture.shockwave;
	a.timeLeft = 20;
	a.scale_base = 3.5;
	a.scale = 0.1;
	a.tint_base = Actor.tint_shockwave;
	Actors.push(a);
	return a;
}
Actor.tint_aura = [1.3,1,0.9];
Actor.tint_order = [0.5,1,0.5];
Actor.tint_nova = [1.5,1.35,1.1];
Actor.tint_shockwave = [4.,4.,4.];
Actor.tint_rescue = [0.3,1,0.9];
Actor.tint_bubble = [0.8,0.4,0.9];
Actor.SpawnRescueAura = function( actor ){
	var a = Actor.SpawnTargetAura(actor);
	a.tint_base = Actor.tint_rescue;
	return a;
}
Actor.SpawnBubbleAura = function( actor ){
	var a = Actor.SpawnTargetAura(actor);
	a.model = Asset.model.bubble;
	a.growth = 0;
	a.scale_base = (actor.model.bound_width)*actor.scale/2;
	a.timeLeft = 610;
	a.rotSpeed = 0.03;
	a.zOffset = -0.5;
	a.tint_base = Actor.tint_bubble;
	return a;
}
Actor.SpawnAbsorbAura = function( actor ){
	var a = Actor.SpawnBubbleAura(actor);
	a.growth = -0.04;
	a.scale_base*=1.2;
	a.timeLeft = 10;
	a.rotSpeed = 0.1;
	a.tint_base = Actor.tint_shockwave;
	return a;
}
Actor.SpawnStun = function(linkedObject,duration){
	var a = Actor.Aura(linkedObject);
	a.tint_base = GUI.textColor_stun;
	a.growth = 0;
	a.scale_base = 0.7;
	a.timeLeft = duration;
	a.texture = Asset.texture.stun;
	a.zOffset = 0.15;
	Actors.push(a);
}
Actor.SpawnReflect = function(linkedObject, facing){
	var a = Actor.Aura(linkedObject);
	a.tint_base = GUI.textColor_stun;
	a.growth = -0.11;
	
	if(linkedObject){
		a.tint_base = [5,4,3];
		a.scale_base = 3.3 +linkedObject.owner.proto.hardRadius*3;
	}else{
		a.scale_base = 5;
		a.tint_base = [2.5,2.5,3];
	}
	a.timeLeft = 20;
	a.model = Asset.model.reflect;
	a.texture = Asset.texture.ripple;
	a.rotZ = facing;
	a.zOffset = -0.1;
	a.rotSpeed = 0;
	Actors.push(a);
	return a;
}
Actor.SpawnLaser = function(caster,target,attachId){
	var a = new Actor(Asset.model.laser, ShaderProgram.additive_full_rotationShader,caster.proto.texture.getTeamVariant(caster.owner.laserColorId),null);
	a.endPoint_attachment = new Vector(0,0,0);
	a.baseActor = caster.actor;
	a.startZOffset = (Math.random()+0.5)*target.actor.scale*target.actor.model.bound_zSize*0.5;
	a.attachmentId = attachId; //attach to pioneer's gun
	a.timeLeft = 8;
	a.girth = 1;
	a.animCollection = Anim.LaserAnim;
	a.startAnimation(Anim.stand);
	
	a.update_gameloop = function(){
		this.update_anim();
		this.timeLeft--;
		if(this.timeLeft <= 0){
			this.remove();
		}
	}
	a.update_drawloop = function(){
		if(this.attachmentId < 0){
			//attach end of rope to actor
			var endPoint = this.baseActor;
		}else{
			//attach end of rope to attachment point on baseActor
			var endPoint = this.endPoint_attachment;
			var pointsArray = this.baseActor.model.pointsArray;
			var pprev = pointsArray[this.baseActor.frame][this.attachmentId];
			var pnext = pointsArray[this.baseActor.nextFrame][this.attachmentId];
			
			var offx = this.baseActor.scale*Utils.LERP1(this.baseActor.frameInterp, pprev.x,pnext.x);
			var offy = this.baseActor.scale*Utils.LERP1(this.baseActor.frameInterp, pprev.y,pnext.y);
			endPoint.z = this.baseActor.z+this.baseActor.scale*Utils.LERP1(this.baseActor.frameInterp, pprev.z,pnext.z);
			
			var snz = Math.sin(-this.baseActor.rotZ); var csz = Math.cos(-this.baseActor.rotZ);
			endPoint.x = this.baseActor.x + offx*csz - offy*snz;
			endPoint.y = this.baseActor.y + offx*snz + offy*csz;
		}
		var dist = Unit_Distance_3d(this, endPoint);
		var rotZ = 3.1415-Math.atan2(this.y- endPoint.y,this.x-endPoint.x);
		var rotY = -1.57+Math.atan2(this.z -endPoint.z, Unit_Distance(this,endPoint));
		
		var xyzRot = Utils.euler_zxy_to_xyz(0, rotY, rotZ);
		this.rotZ = xyzRot[2];
		this.rotY = xyzRot[1];
		this.rotX = xyzRot[0];
		
		this.scaleZ = dist/5/this.girth;
		this.scale = 1*this.girth;
		this.opacity -= 0.06*Render.frameDelta;
		
		this.frameInterp = Math.min(1, this.frameInterp + this.frameInterpDelta*Render.frameDelta);
		
		if(this.opacity <= 0){
			this.remove();
		}
	}
	a.x = target.actor.x;
	a.y = target.actor.y;
	a.z = target.actor.z+a.startZOffset;
	Actors.push(a);
	return a;
}

Actor.Aura = function(linkedObject){
	var a = new Actor(Asset.model.beacon, ShaderProgram.waveShader, Asset.texture.beacon, null);
	a.scale_base = 2;
	a.growth = -1/30;
	a.opacity = 0;
	a.timeLeft = 60;
	a.linkedObject = linkedObject;
	
	if(a.linkedObject){
		a.x = linkedObject.x;
		a.y = linkedObject.y;
	}
	
	a.rotSpeed = 0.06;
	a.zOffset = 0;
	a.tint_base = Actor.tint_aura;
	a.tint = [1,1,1];
	a.update_gameloop = function(){
		if(this.linkedObject){
			this.x = this.linkedObject.x;
			this.y = this.linkedObject.y;
			this.z = this.linkedObject.z + this.linkedObject.model.bound_zSize*this.linkedObject.scale+this.zOffset;
		}
		if(this.visible == false){
			this.timeLeft -= 2;
		}
		if(this.timeLeft <= 0){
			this.remove();
		}
	}
	a.update_drawloop = function(){
		this.scale = this.scale_base + this.timeLeft*this.growth;
		var tintFactor = Math.min(1, this.timeLeft/60);
		this.tint[0]=this.tint_base[0]*tintFactor;
		this.tint[1]=this.tint_base[1]*tintFactor;
		this.tint[2]=this.tint_base[2]*tintFactor;
		
		if(this.linkedObject){
			this.x = this.linkedObject.x;
			this.y = this.linkedObject.y;
			this.z = this.linkedObject.z + this.linkedObject.model.bound_zSize*this.linkedObject.scale+this.zOffset;
		}
		this.timeLeft -= 1*Render.frameDelta;
		this.rotZ += this.rotSpeed*Render.frameDelta;
	}
	return a;
}

Actor.SpawnMissileBeacon = function(missile,scale, visible_to_all){
	var a = new Actor(Asset.model.beacon, ShaderProgram.waveShader, Asset.texture.repairZone, null);
	a.missile = missile;
	a.scale = scale;
	a.baseOpacity = 0.25;
	a.opacity = 0;
	a.visible_to_all = visible_to_all;
	a.update_gameloop = function(){
		if(this.visible_to_all==false){
			this.nodraw = Control.currentPlayer.team != this.missile.owner.team;
		}
		if(this.missile.alive){
			this.x = this.missile.targetUnit.x;
			this.y = this.missile.targetUnit.y;
			this.z = M.terrain.getHeightAt(this.missile.targetUnit.x, this.missile.targetUnit.y)+0.2;
			this.opacity += (this.baseOpacity-this.opacity)*0.2
		}else{
			this.opacity-=0.02;
			if(this.opacity<=0){
				this.remove();
			}
		}
	}
	a.update_drawloop = function(){
		this.rotZ = cam.yaw - Unit_Distance(this,this.missile)*0.1;
	}
	
	Actors.push(a);
	return a;
}

Actor.addToWorld = function(a){
	if(a.partitioned == true){
		Actor.addPartitionedDoodad(a);
	}else{
		Actors.push(a);
		if(a.parts){
			for(var i=0;i<a.parts.length;++i){
				Actor.addToWorld(a.parts[i]);
			}
		}
	}
	if(a.isShipActor){
		a.owner = a.shipType(a);
		a.owner.setOwner(  Editor.brushPlayerId  );
		Actors.push(a);
		Ships.push(a.owner);
	}
}

Actor.addPartitionedDoodad = function(a){
	var partY = Math.max(0, Math.min( Doodads.length-1,Math.floor((a.y/*+a.z*0.7*/)/16))); 
	var partX = Math.max(0, Math.min( Doodads[0].length-1,Math.floor(a.x/16)));
	Doodads[partY][partX].push(a);
	a.partitionX = partX; a.partitionY = partY;
	a.remove = Actor.remove_partitioned_doodad;
}
Actor.updateDoodadPartition = function(a){
	var oldPart = Doodads[a.partitionY][a.partitionX];
	var partY = Math.max(0, Math.min( Doodads.length-1,Math.floor((a.y/*+a.z*0.7*/)/16))); 
	var partX = Math.max(0, Math.min( Doodads[0].length-1,Math.floor(a.x/16)));
	var newPart = Doodads[partY][partX];
	if(newPart != oldPart){
		oldPart.splice(oldPart.indexOf(a),1);
		a.partitionX = partX; a.partitionY = partY;
		newPart.push(a);
	}
}
Actor.remove_partitioned_doodad = function(){
	this.preselected = false;
	this.isRemoved = true;
	if(this.selected == true){
		this.selected = false;
		Selected.splice(Editor.selected.indexOf(this), 1);
	}
	if(this.lightsource != null){
		this.lightsource.detachFromActor();
	}
	var part = Doodads[this.partitionY][this.partitionX];
	part.splice(part.indexOf(this), 1);
}
Actor.calculate_doodad_bounding_boxes = function(){
	for(var k=0;k<Doodads.length;++k){
		for(var l=0;l<Doodads[k].length;++l){
			var part = Doodads[k][l];
			for(var i=0;i<part.length;++i){
				Actor.calculateBoundingBox(part[i], 0.5);
			}
		}
	}
}
Actor.doodad_gameloop_global = function(){
	for(var i=-1;i<=1;++i){
		for(var j=-1;j<=1;++j){
			var partX = j+Math.floor(cam.pos[0]/16);
			var partY = i+Math.floor(cam.pos[1]/16);
			if(partY>=0&&partY<Doodads.length&&partX >= 0&&partX < Doodads[0].length){
				var part = Doodads[partY][partX];
				for(var k=part.length-1;k>=0;--k){
					part[k].update_gameloop();
				}
			}
		}
	}
}
Actor.remove_if_added = function(a){
	if(Actors.indexOf(a)>=0){
		a.remove();
	}
}

Actor.DoodadActor = function( proto , _owner){
	var a = new Actor( Asset.model.tree1 , ShaderProgram.vegetationShader, Asset.texture.tree, null);
	a.proto = proto;
	a.partitioned = true;
	if(proto != null){
		if(proto.veryBig){
			a.checkVisibility = Actor.checkVisibility_SHIP;
		}
		a.spriteSize = proto.spriteSize;
		a.animCollection = proto.animCollection;
		if(a.animCollection != null){
			a.startAnimation(Anim.stand);
		}
		a.texture_default = proto.texture;
		a.texture_variation = 0;
		if(a.proto.textureVariations && a.proto.textureVariations.length > 0){
			a.texture_variation = a.proto.lastTextureVariation;
			a.texture_default = a.proto.textureVariations[a.texture_variation]||a.proto.textureVariations[0];
		}
		a.texture = a.texture_default
		a.model = proto.model;
		if(a.proto.modelVariations && a.proto.modelVariations.length > 0){
			a.model_variation = a.proto.lastModelVariation;
			if(a.proto.modelVariations[0][0]){ //animation variation
				a.animCollection = a.proto.modelVariations[a.model_variation]||a.proto.modelVariations[0];
				a.startAnimation(Anim.stand);
			}else{//model variation
				a.model = a.proto.modelVariations[a.model_variation]||a.proto.modelVariations[0];
			}
		}
		a.shadowModel = a.model;
		
		a.shaderProgram = proto.shader;
		a.shadowShader = proto.shadowShader;
		a.hasShadow = proto.hasShadow;
		a.cull_backfacing = proto.cull_backfacing;
		a.individual_windphase_strength = proto.individual_windphase_strength;
		a.windEffect = proto.windEffect;
		a.bendStrength = proto.bendStrength;
		a.shadowZOffset = proto.shadowZOffset;
		a.alphaTreshold = proto.alphaTreshold;
		a.collision_radius = proto.collision_radius;
		a.hasHelperActor = proto.hasHelperActor;
		a.sprite_face_camera = proto.sprite_face_camera;
		a.inherit_floor_color = proto.inherit_floor_color;
		if(proto.hidden_in_water){
			a.refractionLowerBound = 100;
		}
		a.frame = proto.animFrame;
		a.scale = proto.scale + 2*proto.randomScale*(Math.random()-0.5);
		
		a.bounding_box_width_hittest = proto.bounding_box_width_hittest;
		a.bounding_box_height_hittest = proto.bounding_box_width_hittest;
		
		a.bounding_box_width = a.bounding_box_length = a.model.bound_width;
		a.bounding_box_height = a.model.bound_height;
		a.bounding_box_centerZ = a.model.bound_zOffset;
		
		if(proto.randomRotation == true){
			if(proto.snapToAngle == false){
				a.rotZ = Math.random() * Math.PI*2;
			}else{
				a.rotZ = Math.floor(Math.random()*4) * Math.PI*0.5;}
		}else{a.rotZ = 0;}
	}else{
		a.individual_windphase_strength = 1
		a.windEffect = 1;
		a.alphaTreshold = 0.5;
		a.bendStrength = 0;
	}
	a.nextFrame = a.frame;
	a.windOffset = Math.random()*6.28;
	a.windPhase = 0;
	a.windPhase_ref = 0;
	
	a.getDoodadSaveData = Actor.getDoodadSaveData_doodad;
	a.update_gameloop = Actor.update_gameloop_doodad;
	a.update_drawloop = Actor.update_drawloop_doodad;
	a.getCopy = Actor.getCopy_doodad;
	return a;
}

Actor.getCopy_doodad = function(){
	var c = this.proto.actor_constructor(this.proto, this.owner);
	c.rotZ = this.rotZ;
	c.rotY = this.rotY;
	c.rotX = this.rotX;
	c.x = this.x; c.y = this.y; c.z = this.z;
	c.scale = this.scale;
	c.texture_variation = this.texture_variation;
	c.texture_default = c.texture = this.texture_default;
	c.model_variation = this.model_variation;
	c.model = this.model; c.shadowModel = this.shadowModel;
	return c;
}

Actor.getDoodadSaveData_doodad = function(){
	return [this.proto.id, 
	Math.round(this.x*1000)/1000,
	Math.round(this.y*1000)/1000,
	Math.round(this.z*1000)/1000, 
	Math.round(this.rotX*1000)/1000,
	Math.round(this.rotY*1000)/1000, 
	Math.round(this.rotZ*1000)/1000, 
	Math.round(this.scale*1000)/1000, 
	this.texture_variation, (this.model_variation!=null?this.model_variation:0)];
}


Actor.update_gameloop_doodad = function(){
	if(this.animCollection != null){
		this.update_anim();
	}
	if(this.inherit_floor_color && (!this.floor_triangle || Control.gameState == Control.gameState_inEditor)){
		var groundZ = NavNode.get_floor_z(this.x,this.y,this.z);
		//this.last_floor_collider = NavNode.last_collider;
		this.floor_triangle = NavNode.last_raycast_triangle;
	}
} 

Actor.update_drawloop_doodad = function(){
	this.frameInterp = Math.min(1, this.frameInterp + this.frameInterpDelta*Render.frameDelta);
} 

Actor.RotatingDoodad = function( proto , _owner){
	var a = Actor.DoodadActor(proto,_owner);
	a.update_drawloop = function(){
		this.rotZ -= 0.01/this.scale;
		if(this.rotZ < 0){
			this.rotZ += 6.283;
		}
		this.frameInterp = Math.min(1, this.frameInterp + this.frameInterpDelta*Render.frameDelta);
	}
	return a;
}

Actor.BigWaveSpawner =  function( proto , _owner){
	var a = Actor.DoodadActor( proto, _owner);
	a.partitioned = false;
	a.spawnFreq = 250;
	a.spawnTimeOffset = 0;
	a.spawnType = Actor.BigWaveActor;
	a.hidden_ingame = true;
	a.update_gameloop = function(){
		this.z = Environment.waterZ;
		this.spawnTimeOffset = Math.floor(this.rotX*this.spawnFreq / 10);
		this.nodraw = !Render.drawEditorHelpers;
		
		if((Environment.shoreWavePhase + this.spawnTimeOffset ) % this.spawnFreq == 0){
			var w = this.spawnType(this, this.rotY + 0.5);
			Actors.push(w);
		}
	}
	a.afterLoad = function(){
		var w = this.spawnType(this, this.rotY + 0.5);
		Actors.push(w);
		Actor.goToAnimTime(w, this.spawnFreq -this.spawnTimeOffset);

	}
	return a;
}

Actor.SmallWaveSpawner = function( proto , _owner){
	var a = Actor.BigWaveSpawner(proto, _owner);
	a.spawnType = Actor.SmallWaveActor
	a.spawnFreq = 155;
	return a;
}

Actor.BigWaveActor = function(spawner, _baseOpacity){
	var a = new Actor( Asset.model.wave_long , ShaderProgram.rippleShader, Asset.texture.wave, null);
	a.x = spawner.x; a.y = spawner.y; a.rotZ = spawner.rotZ;
	a.selectable_editor = false;
	a.bounding_sphere_radius = spawner.scale*4+1;
	a.checkVisibility = Actor.checkVisibility_ParticleEffect;
	a.spawner = spawner;
	a.renderLayer = 4;
	a.opacity = 0;
	a.waveSpeed = 0.5;
	a.baseOpacity = _baseOpacity;
	a.waveTimeOffset = 0;
	a.animCollection = Anim.WaveLongAnim;
	a.startAnimation(Anim.stand);
	a.opacityTimeKeys = [200,420,520];
	
	a.update_gameloop = function(){
		if(this.spawner){
			this.rotZ = this.spawner.rotZ;
			this.x = this.spawner.x;
			this.y = this.spawner.y;
			this.scale = this.spawner.scale;
		}
		this.z = Environment.waterZ;
		this.update_anim();
		if(this.animTime < this.opacityTimeKeys[0]){
			this.opacity = this.animTime/this.opacityTimeKeys[0];
		}else if(this.animTime < this.opacityTimeKeys[1]){
			this.opacity = 1;
		}else if(this.animTime < this.opacityTimeKeys[2]){
			this.opacity = 1+this.opacityTimeKeys[1]/(this.opacityTimeKeys[2]-this.opacityTimeKeys[1]) - this.animTime/ (this.opacityTimeKeys[2]-this.opacityTimeKeys[1]);
		}else{
			this.remove();
		}
		//this.opacity *= Environment.waveOpacity;
		this.opacity *= this.baseOpacity;
	}
	return a;
}

Actor.SmallWaveActor = function(spawner, _baseOpacity){
	var a = Actor.BigWaveActor(spawner, _baseOpacity);
	a.model = Asset.model.wave;
	a.animCollection = Anim.WaveAnim;
	a.startAnimation(Anim.stand);
	a.opacityTimeKeys = [70,160,210];
	return a;
}

Actor.RippleActor = function(_x,_y, _delay, _opacity){
	var a = new Actor( Asset.model.ripple , ShaderProgram.rippleShader, Asset.texture.ripple_normal, null);
	a.selectable_editor = false;
	a.bounding_box_width = 2;
	a.renderLayer = 4;
	a.scale = 0.1; //initial size
	a.growth = 0.02;
	a.opacity = _opacity;
	a.decay = a.opacity*0.01;
	a.delay = _delay;
	a.x = _x, a.y = _y; a.z = Environment.waterZ;
	a.visFamily = 0;
	a.rotZ = -1.57;
	
	a.update_drawloop = function(){
		this.scale += this.growth*Render.frameDelta;
		this.rotZ = Environment.getSunAngle();
		ParticleActor.Counters_Visible[this.visFamily] ++;
	}
	a.update_gameloop = function(){
		this.z = M.terrain.getWaterAt(this.x, this.y);
		if(this.delay > 0){
			this.delay--;
			this.nodraw = true;
		}else{
			this.nodraw = false;
			this.opacity -= this.decay;
			if(this.opacity <= 0){
				this.remove();
			}
		}
	}
	return a;
}

Actor.RainSplash = function(x,y){
	var a = new Actor( Asset.model.flak ,ShaderProgram.waveShader, Asset.texture.splash, null);
	a.decay = 0.2;
	a.x = x; a.y = y;
	a.scale = 0.05
	a.rotZ = Math.random()*6.283;
	a.z = Math.max(M.terrain.getHeightAt(a.x, a.y), M.terrain.getWaterAt(a.x,a.y));
	a.timeLeft = 10;
	a.selectable_editor = false;
	a.update_gameloop = Actor.update_gameloop_rainSplash;
	a.update_drawloop = Actor.update_drawloop_rainSplash;
	return a;
}
Actor.update_drawloop_rainSplash = function(){
	this.scale += 0.1 * Render.frameDelta;
	this.z += 0.02 * Render.frameDelta;
	this.opacity -= this.decay* Render.frameDelta;
}
Actor.update_gameloop_rainSplash = function(){
	this.timeLeft --;
	if(this.opacity <= 0 || this.timeLeft <= 0){
		this.remove();
	}
}

Actor.RainActor = function(x,y){
	var a = new Actor( Asset.model.rain , ShaderProgram.rainShader, Asset.texture.rain, null);
	a.timeLeft = Environment.rainPeriod * 2;
	a.x = x; a.y = y;
	a.animCollection = Anim.RainAnim;
	a.startAnimation(Anim.stand);
	a.update_gameloop = function(){
		this.update_anim();
		if(this.animTime == 0){
			this.update_anim();
		}
		this.timeLeft --;
		if(this.timeLeft <= 0){
			this.remove();
		}
	}
	a.checkVisibility = Actor.checkVisibility_always;
	a.opacity = 0.3;
	a.selectable_editor = false;
	return a;
}

Actor.SnowfallActor = function(x,y){
	var a = Actor.RainActor(x,y);
	a.texture = Asset.texture.rocks;
	a.model = Asset.model.snowfall;
	//a.timeLeft = 120;
	a.opacity = 0.15;
	a.animCollection = Anim.SnowfallAnim;
	a.startAnimation(Anim.stand);
	a.cull_backfacing = false;
	return a;
}

Actor.DecalSpawner = function(proto, _owner){
	var a = Actor.DoodadActor( proto, _owner);
	a.partitioned = false;
	a.spawnFreq = 250;
	a.spawnTimeOffset = 0;
	a.spawnType = Actor.BigWaveActor;
	a.hidden_ingame = true;
	a.shaderProgram = ShaderProgram.standard_no_specShader;
	
	a.decal = new DecalActor(1,1,0,0, proto.shader, a.texture)
	a.decal.alphaCutoff = 0.5;
	a.decal.renderLayer = 0;
	a.decal.timed = false;
	a.decal.timeLeft = 5000;
	Actor.addToWorld(a.decal);

	
	a.update_gameloop = function(){
		this.decal.alphaCutoff = this.rotX + 0.5;
		this.decal.timeLeft = Math.max(500, this.rotY*1000 + 2000);
		this.nodraw = !Render.drawEditorHelpers;
		if(this.decal.x != this.x ||this.decal.y != this.y ||
		this.decal.angle != this.rotZ || this.decal.size != this.scale){
			this.decal.angle = this.rotZ;
			this.decal.setPosAndSize([this.x,this.y,this.z], this.scale);
			Actor.updateDoodadPartition(a.decal);
		}
		this.decal.texture = this.texture;
	}
	a.remove_base = a.remove;
	a.remove = function(){
		this.decal.remove();
		this.remove_base();
	}
	
	return a;
}

Actor.ElevationActor = function(proto , _owner){
	var a = new Actor( Asset.model.dummy_elevation , ShaderProgram.standard_no_specShader, Asset.texture.fireball, null);
	
	a.proto = proto;
	a.linkedNode = null;
	//a.linkedNodes = [];
	//a.lastX = 0; a.lastY = 0; a.lastZ = 0;
	a.update_gameloop = function(){
		this.nodraw = !Render.drawEditorHelpers;
		var newNode = Pathfinder.getNodeAt(this.x, this.y);

		if(this.linkedNode != null){
			if(newNode != this.linkedNode){
				Node.resetWallZ(this.linkedNode);
			}
		}
		if(newNode != null && newNode != undefined){
			this.linkedNode = newNode;
			//+100 because of new decoding format
			this.linkedNode.wallZ = this.z + 100;
		}
		
		if(this.rotX >= 0.1){
			this.texture = this.texture_default = Asset.texture.white;
			if(this.linkedNode.pathType != 0){
				M.terrain.Deform_Set_Walkability(this.linkedNode, true, null, 0);
			}
		}else{
			this.texture = this.texture_default = this.proto.texture;
		}
		
		/*if(this.lastX != this.x || this.lastY != this.y ||
		this.lastZ != this.z){
			for(var i=0;i<this.linkedNodes.length;++i){
				Node.resetWallZ(this.linkedNodes[i]);
			}
			this.linkedNodes.length = 0;
			var halfScale = this.scale*0.5;
			for(var i=-halfScale;i<halfScale;++i){
				for(var j=-halfScale;j<halfScale;++j){
					var newNode = Pathfinder.getNodeAt(this.x+i, this.y+j);
					if(newNode != undefined){
						this.linkedNodes.push(newNode);
						newNode.wallZ = this.z + 100;
					}
				}
			}
		}
		
		this.lastX = this.x;
		this.lastY = this.y;
		this.lastZ = this.z;*/
	}
	
	a.remove_base = Actor.remove;
	a.remove = function(){
		if(this.linkedNode != null){
			Node.resetWallZ(this.linkedNode);
		}
		this.remove_base();
	}
	a.getCopy = Actor.getCopy_doodad;
	a.getDoodadSaveData = Actor.getDoodadSaveData_doodad;
	return a;
}

Actor.SkyActor = function(){
	var a = Actor.DoodadActor(null, null);
	a.model = Asset.model.skybox;
	a.shaderProgram = ShaderProgram.skyShader;
	a.checkVisibility = Actor.checkVisibility_always;
	a.cull_backfacing = false;
	
	a.update_drawloop = function(){
		this.texture = Environment.skyTexture;
		this.x = cam.pos[0];
		this.y = cam.pos[1];
		this.z = cam.pos[2];
		this.scale = 1+cam.distance/20;
		this.rotZ = cam.yaw;
	}
	return a;
}

Actor.BackgroundActor = function(proto,_owner){
	var a = Actor.DoodadActor(proto,_owner);
	a.checkVisibility = Actor.checkVisibility_always;
	a.cull_backfacing = false;
	a.partitioned = false;
	a.x_draw = 0;
	a.y_draw = 0;
	a.shaderProgram = ShaderProgram.backgroundShader;
	a.update_drawloop = function(){
		var parallax = Math.max(1,-this.z*1);
		this.x_draw = (cam.pos[0]*(parallax-1)+this.x)/parallax;
		this.y_draw = (cam.pos[1]*(parallax-1)+(this.y))/parallax - this.z;
	}
	return a;
}

Actor.ReflectedBackground = function(proto,_owner){
	var a = Actor.BackgroundActor(proto,_owner);
	a.checkVisibility = Actor.checkVisibility_always;
	a.renderLayer = -1;
	a.update_drawloop = function(){
		var parallax = Math.max(1,this.z*2);
		this.x_draw = (cam.pos[0]*(parallax-1)+this.x)/parallax;
		this.y_draw = (cam.pos[1]*(parallax-1)+(this.y))/parallax + this.z;
		Visible_ReflectionActors.push(this);
	}
	return a;
}



Actor.ReflectedDoodad = function(proto,_owner){
	var a = Actor.DoodadActor(proto,_owner);
	a.renderLayer = -1;
	a.checkVisibility = Actor.checkVisibility_reflection;
	a.update_drawloop = function(){
		Visible_ReflectionActors.push(this);
	}
	return a;
}

Actor.GUIActor = function(_model, _texture, animCollection){
	var a = new Actor(_model,ShaderProgram.standard_full_rotation_no_specShader,_texture,null);
	a.checkVisibility = Actor.checkVisibility_always;
	a.animCollection = animCollection;
	
	a.update_gameloop = function(){
		this.update_anim();
	}
	a.startAnimation(Anim.stand);
	return a;
}

Actor.PlatformActor = function(proto, _owner){
	var a = Actor.DoodadActor(proto, _owner);
	a.dz = 0; a.dx = 0; a.dy = 0;
	a.sineSpeed = 0.1; a.sineScale = 0;
	a.dynamic = true;
	a.projectiles_inherit_motion = false;
	a.not_floor = false;
	a.partitioned = false;
	a.rotX_last = 0;
	a.rotY_last = 0;
	a.d_rotX = 0;
	a.d_rotY = 0;
	a.spin = 0;
	a.use_material_ids = true;
	
	a.motion_function = function(){
		this.dx = this.sineScale * Math.cos((Gamestats.mapTime-1) * this.sineSpeed);
	}

	a.update_collider_dynamic = function(){
		this.x = this.x_last + this.dx;
		this.y = this.y_last + this.dy;
		this.z = this.z_last + this.dz;
		this.rotZ = this.rotZ_last + this.d_angle;
		this.rotX = this.rotX_last + this.d_rotX;
		this.rotY = this.rotY_last + this.d_rotY;
		
		this.x_last = this.x;
		this.y_last = this.y;
		this.z_last = this.z;
		this.rotZ_last = this.rotZ;
		this.rotX_last = this.rotX;
		this.rotY_last = this.rotY;
		//this.dz = this.sineScale * Math.sin(Gamestats.mapTime * this.sineSpeed);
		
		//this.d_rotX = this.sineScale * Math.sign( Math.sin((Gamestats.mapTime-1) * this.sineSpeed));
		this.d_angle = this.spin;
		this.dz = 0;
		this.dy = 0;
		this.dx = 0;
		this.d_rotX = 0;
		this.d_rotY = 0;
		this.motion_function()
	}
	
	a.update_drawloop = function(){
		var delta = Actor.frameInterpMultiplier*Render.frameDelta;
		this.x += this.dx * delta;
		this.y += this.dy * delta;
		this.z += this.dz * delta;
		this.rotZ += this.d_angle * delta;
		this.rotX += this.d_rotX * delta;
		this.rotY += this.d_rotY * delta;
		this.frameInterp = Math.min(1, this.frameInterp + this.frameInterpDelta*Render.frameDelta);
	}	
	return a;
}


Actor.LampActor = function(proto, _owner){
	var a = Actor.DoodadActor(proto, _owner);
	a.lightsource = new LightDecal(20, 0.4, 0.5, false);
	a.lightsource.actor = a;
	a.update_gameloop = function(){
		this.lightsource.size = 20 * this.scale;
		this.lightsource.intensity_ref = 0.4+this.rotX;
		if(this.animCollection != null){
			this.update_anim();
		}
		//this.lightsource.size = this.scale;
	}
	return a;
}

Actor.FogLevelActor = function(proto, _owner){
	var a = Actor.DoodadActor(proto, _owner);
	a.lightsource = new LightDecal(12, 0.4, 0.5, false);
	a.lightsource.actor = a;
	a.lightsource.texture = Asset.texture.invisible;
	a.update_gameloop = function(){
		this.nodraw = !Render.drawEditorHelpers;
		this.lightsource.size = this.scale*15;
	}
	return a;
}

/*Actor.update_Cliff_z = function(){
	this.z = this.node.averageZ + Math.floor(this.node.cliffType/256) + this.cliffSet.actorZOffset;
}

Actor.CliffActor = function(cliffSet){
	var a = Actor.DoodadActor(null,null);
	a.model = Asset.model_cliff_default;
	a.getDoodadSaveData = undefined;
	a.cliffTextureVariation = 0;
	a.cliffSet = cliffSet;
	a.model_variation = 0;
	a.cliffModelType = 0;
	a.cliffCode = 0;
	a.windEffect = 0.3;
	a.bounding_box_width = 3;
	a.bounding_box_height = 4;
	a.selectable_editor = false;
	a.cull_backfacing = true;
	a.hasShadow = cliffSet.hasShadow;
	a.bendStrength = cliffSet.bendStrength;
	
	a.shaderProgram = cliffSet.shader;
	a.shadowShader = cliffSet.shadowShader;
	
	a.shadowZOffset = -0.01;
	a.texture_default = cliffSet.texture;
	a.texture = cliffSet.texture;
	a.node = null;
	a.scale = 1;
	
	a.remove = Actor.remove_Cliff;
	a.update_gameloop = Actor.update_Cliff_z;
	return a;
}
Actor.setCliffModelVariation = function(a, variant){
	a.model_variation = variant;
	a.model = a.cliffSet.models[a.cliffModelType][variant];
	if(!a.model){
		a.model = a.cliffSet.models[a.cliffModelType][0];
	}
	a.shadowModel =  a.model;
}
Actor.CliffDoodad = function(proto, owner){
	var a  = Actor.DoodadActor(proto,owner)
	a.node = Pathfinder.getNodeAt(1,1);
	a.cliffTextureVariation = 0;
	a.cliffSet = CliffSet.Mesa;
	a.update_gameloop = function(){
		this.node = Pathfinder.getNodeAt_Robust(this.x, this.y);
	}
	return a;	
}*/

Actor.StructureActor = function(proto, _owner){
	var a = new Actor(Asset.model.wall, ShaderProgram.standard_no_specShader, Textures[11], _owner);
	a.hasShadow = true;
	a.bounding_box_width = proto.structureSize*1.6;
	a.checkVisibility = Actor.checkVisibility_Structure;
	a.HurtCheck = Actor.StructureActor.HurtCheck;
	a.structure_revealed = false;
	a.scale = proto.actorScale + (proto.actorScaleVariation*(Math.random()-0.5));
	a.scale_base = a.scale;
	a.model = proto.model;
	a.shaderProgram = proto.shaderProgram;
	a.shadowModel = a.model;
	a.shadowShader = proto.shadowShader;
	a.cull_backfacing = proto.cull_backfacing;
	a.texture_default = proto.texture;
	a.texture = a.texture_default;
	a.animCollection = proto.animCollection;
	a.animSequence = a.animCollection[Anim.stand]; //fontos hogy ez is itt legyen inicializalaskor
	a.startAnimation(Anim.stand);	

	a.windOffset = Math.random()*6.28;
	a.windPhase = 0;
	a.windPhase_ref = 0;
	a.windEffect = 0.3;
	a.individual_windphase_strength = 0.8;
	a.bendVector = [0,0];
	a.damageEffectCountdown = 30;
	a.revealed = false;
	a.revealed_now = false;
	a.update_ao = Actor.StructureActor.update_ao;
	a.ao_removed = false;
	if(_owner == null){ //editor actor
		a.checkVisibility = Actor.checkVisibility_always;
		return a;
	}else{
		a.update_gameloop = Actor.StructureActor.update_gameloop;
		a.update_drawloop = Actor.StructureActor.update_drawloop;
		a.bounding_box_width_hittest = proto.structureSize*0.8;
	}
	
	return a;
}
Actor.StructureActor.update_gameloop = function(){
	var vis = Node.getVisibility(Pathfinder.getNodeAt_Robust(this.x,this.y), Control.currentPlayer.visGroup);
	this.revealed_now = vis>1;
	if(this.revealed_now){
		if(this.revealed == false){
			this.revealed = true;
			this.update_ao();
		}
	}
	
	this.x = this.x_last;
	this.y = this.y_last;
	this.z = this.z_last;
	
	this.x_last = this.owner.x;
	this.y_last = this.owner.y;
	
	//this.shadowZOffset = -this.owner.decayCounter*0.01;
	if(this.revealed_now){
		if(this.owner.actor!=this){
			this.remove();
			return;
		}
		this.update_anim();
		if(this.owner.alive){
			this.z_last = this.owner.z;
			this.HurtCheck();
			
			if(this.door){
				if(this.owner.trainingQueue && this.owner.trainingQueue.length > 0){
					if(this.door.animSequence.type != Anim.death){
						this.door.startAnimation(Anim.death);
					}
				}else{
					if(this.door.animSequence.type != Anim.stand){
						this.door.startAnimation(Anim.stand);
					}
				}
			}
			
		}else{
			this.z_last = this.owner.z  - this.owner.decayCounter*0.01;
			if(this.crane){
				if(this.crane.barrel){
					this.crane.barrel = Actor.checkVisibility;
					this.crane.barrel.baseActor = null;
					this.crane.barrel = null;
				}
				this.crane.shadowShader = ShaderProgram.shadow_full_rotationShader;
				if(this.crane.animSequence.type != Anim.death){
					this.crane.startAnimation(Anim.death);
				}
			}
			if(this.fan){
				this.fan.spin*=0.8;
			}
			if(this.cooler){
				this.cooler.shadowShader = ShaderProgram.shadow_animatedShader;
				this.cooler.spin = Math.max(0.0002,this.cooler.spin*0.9);
				if(this.cooler.animSequence.type != Anim.death){
					this.cooler.startAnimation(Anim.death);
				}
			}
			if(this.door && this.door.animSequence.type != Anim.death){
				this.door.startAnimation(Anim.death);
			}
		}
		
		if(this.animSequence.posKeys != null && this.animPosKey < this.animSequence.posKeys.length -1){
			this.update_posKeys();
		}
	}else{
		if(this.fan){
			this.fan.spin = 0;
		}
	}
}

Actor.StructureActor.HurtCheck = function(){
	if(!this.owner.alive || !this.owner.born){
		return;
	}
	var hpRatio = this.owner.hp/this.owner.hp_max;
	
	if(this.animCollection[Anim.stand_training] && this.owner.trainingQueue && this.owner.trainingQueue.length){
		//check structure training animation
		if(this.owner.trainingQueue[0][1] <= this.owner.proto.spawnAnimOffset && this.animCollection[Anim.spawn]){
			if(this.animSequence.type != Anim.spawn){
				if(hpRatio<0.5){
					this.startAnimation(Anim.spawn_hurt);
				}else{
					this.startAnimation(Anim.spawn);
				}
			}
		}else if(this.animSequence.type != Anim.spawn){
			if(hpRatio < 0.5){
				if(this.animSequence != this.animCollection[Anim.stand_training_hurt]){
					this.startAnimation(Anim.stand_training_hurt);
				}
			}else{
				if(this.animSequence != this.animCollection[Anim.stand_training]){
					this.startAnimation(Anim.stand_training);
				}
			}
		}
	}else if(this.animSequence.type != Anim.spawn){
		if(hpRatio < 0.5){
			if(this.animSequence != this.animCollection[Anim.stand_hurt]){
				this.startAnimation(Anim.stand_hurt);
			}
		}else{
			if(this.animSequence == this.animCollection[Anim.stand_hurt]){
				this.startAnimation(Anim.stand);
			}
		}
	}
	

	if(this.visible && hpRatio < 0.85 ){
		this.damageEffectCountdown --;
		if( this.damageEffectCountdown  <= 0){
			this.damageEffectCountdown = 20 + 20*hpRatio;
			if(this.owner.proto.damagePoints){
				var dpid = Utils.randomElem_clientSide(this.owner.proto.damagePoints);
				var dp = this.model.pointsArray[this.frame][dpid];
				if(Math.random()<0.7){
					ParticleActor.spawnAtModelPoint(this,dp,ParticleActor.SpawnStructureSmoke, 0);
				}else{
					ParticleActor.spawnAtModelPoint(this,dp,ParticleActor.SpawnSparks, 0);
				}
			}
		}
	}
	
	if(this.fan){
		if(this.owner.born){
			if(this.owner.proto == UnitPrototype.Barracks){
				if(this.owner.trainingQueue&&this.owner.trainingQueue.length>0){
					if(this.owner.trainingQueue[0][0]==UnitPrototype.Stinger){
						var spin_ref = 0.3;
					}else{
						var spin_ref = 0.15;
					}
				}else{
					var spin_ref = 0.04;
				}
			}else{
				//fan spins faster if building is damaged
				var spin_ref = 0.06+(1-hpRatio)*0.12;
			}
			this.fan.spin += (spin_ref-this.fan.spin)*0.15;
			//fan jerks if building is damaged
			if(Math.random()>hpRatio+0.1&&Math.random()<0.02){
				this.fan.spin=-0.05;
			}
		}
	}
}

Actor.StructureActor.update_drawloop = function(){
	if(this.revealed_now){
		this.frameInterp = Math.min(1, this.frameInterp + this.frameInterpDelta*Render.frameDelta);
	
		if(this.owner.alive == true){
			this.windPhase_ref += (Math.random()-0.5)*0.25 * Render.frameDelta *Environment.windStrength;
			var phase_error = this.windPhase_ref-this.windPhase;
			this.windPhase += phase_error * 0.1;
			if(this.windPhase_ref > Math.PI*2){
				this.windPhase_ref -= Math.PI*2;
				this.windPhase -= Math.PI*2;
			}else if(this.windPhase_ref < 0){
				this.windPhase_ref += Math.PI*2;
				this.windPhase += Math.PI*2;
			}
		}
	}
}
Actor.StructureActor.update_ao = function(){
	var size = this.owner.proto.structureSize;
	var n = Pathfinder.getNodeAt(this.owner.x,this.owner.y);
	var nx = n.nodex-Math.floor(size/2) ;
	var ny = n.nodey-Math.floor(size/2) ;
	var terrianTiles = [];
	for(var i=0;i<size;++i){
		for(var j=0;j<size;++j){
			if(ny + i < 0 || nx + j <0 || ny+i >= Pathfinder.mapH || nx+j >= Pathfinder.mapW){
				continue;
			}
			var tile = M.terrain.Tiles[Math.floor((ny+i)/M.terrain.tilesize)][Math.floor((nx+i)/M.terrain.tilesize)];
			if(tile.stored_for_structure_update!=this.owner){
				terrianTiles.push(tile);
				tile.stored_for_structure_update = this.owner;
			}
		}
	}
	for(var i=0;i<terrianTiles.length;++i){
		M.terrain.UpdateTile_Pathfinder_Heights(terrianTiles[i]);
	}
	M.terrain.update_waterTexture();
}

Actor.StructureCrater = function(structure){
	var a = new Actor(Asset.model.crater1, ShaderProgram.terrainMeshShader, Asset.texture.crater, null);
	a.structure = structure;
	a.structure.actor.crater = a;
	a.z = a.structure.z-0.5;
	a.x = structure.x;
	a.y = structure.y;
	a.scale = structure.proto.craterSize * 0.7;
	a.selectable_editor = false;
	a.rotZ = Math.random()*6.28;
	a.baseActor = a.structure.actor;
	a.checkVisibility = Actor.checkVisibility_inherit;
	a.update_gameloop= function(){
		if(this.baseActor.revealed_now){
			if(this.structure.alive){
				this.z += (this.structure.z-this.z)*0.06;
				this.scale += (this.structure.proto.craterSize-this.scale)*0.1;
			}else{
				this.z -= 0.01;
				this.scale += 0.005;
				if(this.z<this.structure.z-1){
					this.remove();
				}
			}
		}
	}
	return a;
}

Actor.Construction = function(structure){
	var a = new Actor(Asset.model.construction, ShaderProgram.standard_single_rotationShader, Asset.texture.computer, null);
	a.structure = structure;
	a.z = a.structure.z;
	a.x = structure.x;
	a.y = structure.y;
	a.selectable_editor = false;
	a.rotZ = Math.random()*6.28;
	a.timeLeft = 44;
	a.animCollection = Anim.ConstructionAnim;
	a.startAnimation(Anim.birth);
	a.shadowModel=  a.model;
	a.hasShadow = true;
	a.shadowShader=ShaderProgram.shadow_animatedShader;
	a.scale = structure.proto.constructionSize;
	a.texture_default=a.texture=a.texture.getTeamVariant(structure.owner.colorId);

	a.baseActor = structure.actor;
	a.sparkCounter = 30;
	a.checkVisibility = Actor.checkVisibility_inherit;
	
	a.update_gameloop= function(){
		if(this.baseActor.revealed_now){
			if(this.structure.alive && !this.structure.born
			&&this.structure.birthCounter < this.structure.birthTime-20){
				this.x = this.structure.x;
				this.y = this.structure.y;
				this.sparkCounter--;
				if(this.sparkCounter <= 0){
					this.sparkCounter = 30;
					if(this.visible){
						ParticleActor.SpawnSparks(this.x,this.y,this.z+1*this.scale,Math.random()*6.28);
					}
				}
			}else{
				if(this.animSequence.type != Anim.death){
					this.startAnimation(Anim.death);
				}
				this.timeLeft --;
				if(this.timeLeft <= 0){
					this.remove();
				}
			}
			this.update_anim();
			this.rotZ += 0.01;
		}	
	}
	return a;
}

Actor.WallActor = function(proto, _owner){
	var a = Actor.StructureActor(proto, _owner);
	a.isWallActor = true;
	a.setWallAngles = Actor.setWallAngles;
	a.shadowZOffset = -0.1;
	return a;
}
Actor.setWallAngles = function(){
	for(var i=-1;i<2;++i){
		for (var j=-1;j<2;++j){
			var n = Pathfinder.getNodeAt(this.x+j, this.y+i);
			if(n != undefined){
				if(n.structure != null && n.structure.actor.isWallActor == true){
					var code = Pathfinder.getWallAngleAt(n);
					n.structure.actor.rotZ = code * 1.57; 


					if(n.structure.proto.structure_random_rotation > 0){
						n.structure.actor.rotZ += n.structure.proto.structure_random_rotation*(Math.random()-0.5);
						if(Math.random()>0.5){
							n.structure.actor.rotZ += 3.1415;
						}
					}
					
					if(code ==8){
						if(n.structure.actor.model.nubAsset != null){
							n.structure.actor.shadowModel=n.structure.actor.model = n.structure.actor.model.nubAsset;
						}else{
							n.structure.actor.rotZ = Math.random()*6.28;
						}
					}else if(code > 3){
						if( n.structure.actor.model.cornerAsset != null){
							n.structure.actor.shadowModel=n.structure.actor.model = n.structure.actor.model.cornerAsset;
						}else{
							n.structure.actor.rotZ -= 0.785;
						}
					}else if(code <= 3 && n.structure.actor.model.straightAsset != null){
						n.structure.actor.shadowModel=n.structure.actor.model = n.structure.actor.model.straightAsset;
					}
				}
			}
		}
	}
}

Actor.update_anim = function(){
	var numOfFrames = this.animSequence.numberOfFrames;
	if(this.animTime >= this.animSequence.endTime){
		if(this.animSequence.looping == true){
			this.animTime = 0;
			this.animFrameTime = 0;
			this.animPosKey = 0;
			this.animFrame = 0;
			this.frameInterp = 0;
			this.frameInterpDelta = Actor.frameInterpMultiplier / this.animSequence.frameLengths[this.animFrame];
		}else if(this.animSequence.nextType >= 0){
			this.startAnimation(this.animSequence.nextType);
		}
	}else{
		this.animTime ++;
		if(this.animSequence.frameTimes[this.animFrame] <= this.animTime){
			this.animFrame = Math.min(this.animFrame+1, numOfFrames-1);
			
			this.frameInterpDelta = Actor.frameInterpMultiplier / this.animSequence.frameLengths[this.animFrame];
			this.frameInterp = 0;
			this.animFrameTime = 0;
			
		}else{
			this.animFrameTime ++;
			var gameLoopFrameInterp = this.frameInterpDelta * this.animFrameTime * Actor.framesPerTick;
			this.frameInterp = Math.min( Math.max(this.frameInterp,  gameLoopFrameInterp-this.frameInterpDelta), 1) ;
		}
	}
	//model position keyframe update
	if(this.animSequence.posKeys != null && this.animPosKey < this.animSequence.posKeys.length - 1 ){
		if(this.animSequence.posKeys[this.animPosKey+1].startTime <= this.animTime){
			this.animPosKey ++;
		}
	}

	if(this.animFrameTime == 0){
		this.frame = this.animSequence.frames[this.animFrame];
		if(this.animSequence.looping == true){
			this.nextFrame = this.animSequence.frames[ (this.animFrame + 1)%numOfFrames ];
		}else{
			this.nextFrame = this.animSequence.frames[ Math.min(this.animFrame + 1, numOfFrames-1) ];
		}
	}
}

Actor.goToAnimTime = function(a, time){
	a.animTime = time;
	a.animFrame = 0;
	var numOfFrames = a.animSequence.numberOfFrames;
	for(var i=0;i<numOfFrames;++i){
		if(a.animSequence.frameTimes[i] >= a.animTime){
			a.animFrame = i-1;
		}
	}
	a.animFrameTime = time - a.animSequence.frameTimes[a.animFrame-1];
	a.frame = a.animSequence.frames[a.animFrame];
	a.nextFrame = a.animSequence.frames[ Math.min(a.animFrame + 1, numOfFrames-1) ];
	a.frameInterpDelta = Actor.frameInterpMultiplier / a.animSequence.frameLengths[a.animFrame];
	a.frameInterp = a.animFrameTime*a.frameInterpDelta*Actor.framesPerTick;
}

Actor.UnitActor = function(proto, _owner){
	var a = new Actor(Asset.model.warrior ,ShaderProgram.standard_no_specShader , Textures[4], _owner);
	a.model = proto.model;
	a.shadowModel = proto.shadowModel;
	a.scale = proto.actorScale + (proto.actorScaleVariation*(Math.random()-0.5));
	a.scale_base = a.scale;
	a.animCollection = proto.animCollection;
	a.texture_default = proto.texture;
	a.hasShadow = proto.hasShadow;
	a.gameloop_special = null;
	a.hitRotX = 0;
	a.hitRotY = 0;
	a.ao_lightsource = null;
	a.floor_triangle = null;
	a.spriteSize = proto.spriteSize;
	
	if(proto.textureVariations != null){
		a.texture_default = proto.textureVariations[Math.floor(Math.random() * proto.textureVariations.length * 0.999)];
	}
	
	a.texture = a.texture_default;
	a.followTerrainSlope = proto.followTerrainSlope;
	a.turnSpeed = proto.turnSpeed;
	a.shaderProgram = proto.shaderProgram;
	a.shadowShader = proto.shadowShader;
	
	//fontos hogy ez is itt legyen inicializalaskor
	a.startAnimation(Anim.stand);
	
	if(_owner == null){ //editor actor
		a.checkVisibility = Actor.checkVisibility_always;
		return a;
	}
	
	a.update_gameloop = Actor.UnitActor.update_gameloop;
	a.getSlopeAngle = Actor.getSlopeAngle;
	a.update_drawloop = Actor.UnitActor.update_drawloop;
	a.gameloop_special = Actor.UnitActor.gameloop_special;
	return a;
}
Actor.UnitActor.update_gameloop = function(){
	this.rotZ = this.rotZ_last;
	this.x = this.x_last;
	this.y = this.y_last;
	this.z = this.z_last;
	
	this.x_last = this.owner.x;
	this.y_last = this.owner.y;
	this.z_last = this.owner.z  - this.owner.decayCounter*0.003;
	this.floor_triangle = this.owner.last_floor_triangle;
	
	/*if(this.owner.last_floor_collider && this.owner.last_floor_collider.dynamic){
		this.x  += 0.5 * this.owner.last_floor_collider.dx;
		this.y  += 0.5 * this.owner.last_floor_collider.dy;
		this.z  += 0.5 * this.owner.last_floor_collider.dz;
	}	*/
	
	this.scale = this.scale_base;
	if(this.animSequence.posKeys != null && this.animPosKey < this.animSequence.posKeys.length -1){
		this.update_posKeys();
	}
	
	if(this.owner.alive == true){
		this.setInterpolatedRotation(this.owner.angle+ 3.1415);
	}else{
		this.opacity = 1 - this.owner.decayCounter*0.1;
	}
	
	this.d_angle = this.rotZ_last - this.rotZ;
		
	if(this.d_angle > 3.1415){
		this.d_angle -= 6.283;
	}else if(this.d_angle < -3.1415){
		this.d_angle += 6.283;
	}

	if(this.gameloop_special != null){
		this.gameloop_special();
	}
	
	this.update_anim();
}

Actor.UnitActor.gameloop_special = function(){
	if(this.owner.moving == true && this.animSequence.type != Anim.walk){
		this.startAnimation(Anim.walk);
	}else if(this.owner.moving == false && this.animSequence.type == Anim.walk){
		this.startAnimation(Anim.stand);
	}
}

Actor.UnitActor.update_drawloop = function(){
	if(this.animSequence.frames_multidir){ // CHARON
		//trying to eliminate sprite rotation caused by camera rotation, *1 seemed too strong, hence *0.5
		var cam_angle_diff = cam.yaw - Math.atan2(this.x-cam.eyePos[0],this.y-cam.eyePos[1]);
		cam_angle_diff = (cam_angle_diff + 3.1415 + 6.2823)%6.2823 - 3.1415;
		cam_angle_diff *= 0.5;
		
		var angleId = Math.round((1000 + ( cam.yaw-this.rotZ - cam_angle_diff )/6.283 )%1 * 8) % 8;
		this.frame = this.animSequence.frames_multidir[this.animFrame][ angleId ];
	}
	
	if(this.owner != undefined){
		var delta = Actor.frameInterpMultiplier*Render.frameDelta;
		this.x += this.owner.dx * delta;
		this.y += this.owner.dy * delta;
		this.z += this.owner.dz * delta;
		this.rotZ += this.d_angle * delta;
		
		this.frameInterp = Math.min(1, this.frameInterp + this.frameInterpDelta*Render.frameDelta);
		
		if(this.followTerrainSlope == true){
			this.getSlopeAngle();
		}else{
			this.rotX = this.rotY = 0;
		}
		this.rotX += this.hitRotX;
		this.rotY += this.hitRotY;
		this.hitRotX -= this.hitRotX*0.05*Render.frameDelta;
		this.hitRotY -= this.hitRotY*0.05*Render.frameDelta;
		if(Math.abs(this.rotX)>0.015 || Math.abs(this.rotY) > 0.015){
			this.shaderProgram = this.shaderProgram.full_rot_alias;
		}else{
			this.shaderProgram = this.shaderProgram.single_rot_alias;
		}
		if(this.owner.container && this.owner.container.actor){
			this.z = this.owner.container.actor.z + this.owner.container.proto.garrisonZ;
		}
		
		if(this.owner.alive != true){
			if(this.shadowZOffset > -1){
				this.shadowZOffset -= 0.01;
			}else{
				this.hasShadow = false;
			}
		}
		
		if(this.quaternion){
			Utils.quatFromXYZ(this.quaternion, this.rotX, -this.rotY, this.rotZ);
		}
	}
}

Actor.UnitActor.update_drawloop_garrisonAttachment = function(){
	if(this.owner != undefined){
		var baseActor = this.owner.container.actor;
		var pointsArray = baseActor.model.pointsArray;
		var baseActorRotZ = baseActor.rotZ;
		var attachmentId = this.owner.container.proto.garrisonAttachmentPointId;

		var pprev = pointsArray[baseActor.frame][attachmentId];
		var pnext = pointsArray[baseActor.nextFrame][attachmentId];

		var offx = Utils.LERP1(baseActor.frameInterp, pprev.x,pnext.x);
		var offy = Utils.LERP1(baseActor.frameInterp, pprev.y,pnext.y);
		var offz = Utils.LERP1(baseActor.frameInterp, pprev.z,pnext.z);
	
		var snz = Math.sin(-baseActorRotZ); var csz = Math.cos(-baseActorRotZ);
		this.dx = offx*csz - offy*snz;
		this.dy = offx*snz + offy*csz;
		this.dz = offz;

		this.x = baseActor.x + this.dx;
		this.y = baseActor.y + this.dy;
		this.z = baseActor.z + this.dz;
		
		if(this.quaternion){
			Utils.quatFromXYZ(this.quaternion, this.rotX, -this.rotY, this.rotZ);
		}
	}
}

Actor.AttachmentActor = function(baseActor, _attachmentId, _owner){
	var a = new Actor(Asset.model.swarmer , ShaderProgram.standard_full_rotationShader , baseActor.texture, null);
	if(baseActor){
		a.shaderProgram = baseActor.shaderProgram.full_rot_alias;
	}
	a.baseActor = baseActor;
	a.attachmentId = _attachmentId;
	a.isAttachment = true;
	a.selectable_editor = false;
	//a.checkVisibility = Actor.checkVisibility_inherit;
	//a.remove = function(){}; //remove is handled by baseActor
	a.animCollection = Anim.Empty;
	a.quaternion = quat.create();
	a.localQuat = quat.create();
	a.baseActorRotZ = 0;
	a.gravity = 0;
	a.lastZ = 0;
	a.terrainZ = 0;
	a.spin = 0;
	a.localSpin = 0;
	a.localSpinSum = 0;
	a.hasShadow = true;
	a.shadowModel = Asset.model.flak;
	a.waitingForLandingSound = true;
	a.loseOnDeath = false;
	a.rotMatrix = mat3.create();
	a.scale_base = 1;
	
	a.startAnimation(Anim.stand);
	a.update_posKeys = Actor.update_posKeys_attachments;
	a.update_gameloop = Actor.AttachmentActor.update_gameloop;
	a.update_drawloop = Actor.AttachmentActor.update_drawloop;
	
	return a;
}

Actor.AttachmentActor.update_gameloop = function(){
	if(this.animSequence.posKeys != null && this.animPosKey < this.animSequence.posKeys.length -1){
		this.update_posKeys();
	}
	if(this.baseActor != null && this.baseActor.isRemoved == false){
		//var pointsArray = this.baseActor.model.pointsArray;
		var pointFrame = this.baseActor.model.pointsArray[this.baseActor.frame];
		if(pointFrame){
			//this should always be true, but for some reason it can break
			this.x = this.baseActor.x + this.baseActor.scale*pointFrame[this.attachmentId].x;
			this.y = this.baseActor.y + this.baseActor.scale*pointFrame[this.attachmentId].y;
			this.z = this.baseActor.z + this.baseActor.scale*pointFrame[this.attachmentId].z;
		}
		
		if(this.loseOnDeath == true && this.baseActor.owner.alive == false){
			this.dx = this.baseActor.owner.dx*0.5;
			this.dy = this.baseActor.owner.dy*0.5;
			this.dz = 0.1; this.gravity = 0.1;
			this.baseActor = null;
			this.checkVisibility = Actor.checkVisibility;
		}
	}else{
		if( isNaN(this.x) &&  isNaN(this.y)){
			console.log("NaN");
			this.remove();
			return;
		} 
		this.terrainZ = M.terrain.getHeightAt(this.x, this.y);
		if(this.z > this.terrainZ+0.2){
			//object is not on ground
			this.gravity -= 0.01*Environment.gravity;
			if(this.visible){ 
				var waterZ = M.terrain.getWaterAt(this.x,this.y)-0.05;
				if(this.z <= waterZ){
					if(this.lastZ > waterZ){ //entering water, make splash
						ParticleActor.SpawnSplash(this.x, this.y, waterZ, 0);
						SoundObject.step_water.play(this.x-cam.pos[0], this.y-cam.pos[1], 0.6)
					}
					this.waitingForLandingSound = false; //landing sound if in water
					this.dx *= 0.8;
					this.dy *= 0.8;
					this.spin *= 0.9;
					this.gravity = Math.max(-0.006, this.gravity);
				}
			}
		}else{
			//object is on ground
			if(this.waitingForLandingSound == true){
				this.waitingForLandingSound = false;
				if(this.visible == true){
					ParticleActor.SpawnFallingDust(this.x,this.y,this.z, Math.random()*6.28);
					SoundObject.thump.play(this.x-cam.pos[0], this.y-cam.pos[1]);
				}
			}
			this.gravity = -0.00075; //slow decay;
			this.dx *= 0.7;
			this.dy *= 0.7;
			this.spin *= 0.7;
		}
		if(this.z < this.terrainZ-1){
			this.remove();
		}
	}
	this.update_anim();
	this.lastZ = this.z;
}
Actor.AttachmentActor.update_drawloop = function(){
	if(this.baseActor != null && this.baseActor.isRemoved == false){
		if(this.spin == 0){
			this.baseActorRotZ = this.baseActor.rotZ;
		}//otherwise attachment is spinning
		

		var pointsArray = this.baseActor.model.pointsArray;
		var pprev = pointsArray[this.baseActor.frame][this.attachmentId];
		var pnext = pointsArray[this.baseActor.nextFrame][this.attachmentId];

		var offx = this.baseActor.scale*Utils.LERP1(this.baseActor.frameInterp, pprev.x,pnext.x);
		var offy = this.baseActor.scale*Utils.LERP1(this.baseActor.frameInterp, pprev.y,pnext.y);
		var offz = this.baseActor.scale*Utils.LERP1(this.baseActor.frameInterp, pprev.z,pnext.z);
		
		if(this.baseActor.quaternion){
			var offs = [offx , offy , offz ];
			quat.rotatePoint(offs,offs,this.baseActor.quaternion);
			offx = offs[0];
			offy = offs[1];
			offz = offs[2];
			this.dx = offx;
			this.dy = offy;
		}else{
			var snz = Math.sin(-this.baseActorRotZ); var csz = Math.cos(-this.baseActorRotZ);
			this.dx = offx*csz - offy*snz;
			this.dy = offx*snz + offy*csz;
		}
		this.dz = offz;
	
		this.x = this.baseActor.x + this.dx;
		this.y = this.baseActor.y + this.dy;
		this.z = this.baseActor.z + this.dz;
		
		var quatprev = quat.fromValues(pprev.q[0], pprev.q[1],pprev.q[2],pprev.q[3])
		var quatnext = quat.fromValues(pnext.q[0], pnext.q[1],pnext.q[2],pnext.q[3])

		quat.slerp(this.quaternion, quatprev, quatnext, this.baseActor.frameInterp);
		quat.mul(this.quaternion, this.quaternion, this.localQuat);
		
		if(this.baseActor.quaternion){
			quat.mul(this.quaternion, this.baseActor.quaternion, this.quaternion);
		}
	}else{
		this.z += this.gravity*Render.frameDelta;
		this.x += this.dx*Render.frameDelta;
		this.y += this.dy*Render.frameDelta;
		
	}
	this.baseActorRotZ += this.spin*Render.frameDelta;
	this.frameInterp = Math.min(1, this.frameInterp + this.frameInterpDelta*Render.frameDelta);

	mat3.identity(this.rotMatrix);
	
	if(!this.baseActor || !this.baseActor.quaternion){
		mat3.rotate(this.rotMatrix,this.rotMatrix, -this.baseActorRotZ, [0,0,1]);
	}
	
	mat3.fromQuat(lastQuatMatrix, this.quaternion);
	mat3.mul(this.rotMatrix, this.rotMatrix, lastQuatMatrix);

	var rm = this.rotMatrix;
   /*this.rotY = -Math.asin(rm[2]);
	this.rotZ = Math.atan2( -rm[1]/Math.cos(this.rotY), rm[0]/Math.cos(this.rotY) );
	this.rotX = Math.atan2( -rm[5]/Math.cos(this.rotY), rm[8]/Math.cos(this.rotY) );*/
	this.rotY = Math.asin(rm[6]);
	this.rotX = Math.atan2( rm[7]/Math.cos(this.rotY), rm[8]/Math.cos(this.rotY) );
	this.rotZ = Math.atan2( -rm[0]/Math.cos(this.rotY), rm[3]/Math.cos(this.rotY) ) +1.57;
	this.localSpinSum = (this.localSpinSum + this.localSpin*Render.frameDelta)%6.283;
	this.rotZ += this.localSpinSum;
}

Actor.TurretActor = function(baseActor, _owner){
	var a = new Actor(Asset.model.tank_turret ,baseActor.shaderProgram , baseActor.texture, null);
	a.baseActor = baseActor;
	a.ref_angle = 0;
	a.scale = a.baseActor.scale;
	a.rotZ = 0;
	a.zOffset = 0;
	a.turnSpeed = 0.15;
	a.animCollection = Anim.TurretAnim;
	a.startAnimation(Anim.stand);
	a.remove = Utils.DO_NOTHING; //remove is handled by baseActor
	a.rotationResetTimer = 0; //if the timer reaches 0, the turret will reset to default position
	
	a.checkVisibility = Actor.checkVisibility_inherit;
	a.update_gameloop = function(){
		this.x = this.baseActor.x;
		this.y = this.baseActor.y;
		this.z = this.baseActor.z + this.zOffset;
		this.rotZ = this.rotZ_last;
		
		this.rotationResetTimer = Math.max(0, this.rotationResetTimer-1);
		if(this.rotationResetTimer == 0 && this.baseActor.owner.moving){
			this.ref_angle = 0;
		}
		
		this.setInterpolatedRotation(this.ref_angle + this.baseActor.rotZ);
		this.d_angle = (this.rotZ_last - this.rotZ);
		
		if(this.d_angle > 3.1415){
			this.d_angle -= 6.283;
		}else if(this.d_angle < -3.1415){
			this.d_angle += 6.283;
		}
		if(this.baseActor.owner.alive == false){
			this.shadowShader = ShaderProgram.shadow_animatedShader;
		}
		
		this.update_anim();
	}
	
	a.update_drawloop = function(){
		var bp = this.baseActor.model.pointsArray[0][0];
		var snz = Math.sin(-this.baseActor.rotZ); var csz = Math.cos(-this.baseActor.rotZ);
		this.x = this.baseActor.x + (bp.x*csz - bp.y*snz)*this.baseActor.scale;
		this.y = this.baseActor.y + (bp.x*snz + bp.y*csz)*this.baseActor.scale;
		this.z = this.baseActor.z + this.zOffset;
		
		this.rotZ += this.d_angle * Actor.frameInterpMultiplier*Render.frameDelta;
		this.rotX = this.baseActor.rotX;
		this.rotY = this.baseActor.rotY;
		this.frameInterp = Math.min(1, this.frameInterp + this.frameInterpDelta*Render.frameDelta);
	}
	
	a.facePoint = function(x,y){
		this.ref_angle =  Math.atan2(x - this.x, y - this.y) + 3.1415 - this.baseActor.rotZ;
		this.rotationResetTimer = 30;
	}
	return a;
}

Actor.TurretActor.CreateRailTurret = function(baseActor, _owner){
	var a = Actor.TurretActor(baseActor, _owner);
	Actors.push(a);
	baseActor.turret = a;
	a.model = a.shadowModel = Asset.model.railturret;
	a.hasShadow = true;
	a.shadowShader = ShaderProgram.shadowShader;
	return a;
}
Actor.TurretActor.CreateRailTankTurret = function(baseActor, _owner){
	var a = Actor.TurretActor.CreateRailTurret(baseActor, _owner);
	a.scale = 0.75;
	a.shadowShader=ShaderProgram.shadow_full_rotationShader;
	a.texture=a.texture_default = Asset.texture.computer.getTeamVariant(baseActor.owner.owner.colorId);
	return a;
}
Actor.TurretActor.CreateTankTurret = function(baseActor, _owner){
	var a = Actor.TurretActor(baseActor, _owner);
	Actors.push(a);
	baseActor.turret = a;
	return a;
}
Actor.TurretActor.CreateStarTurret = function(baseActor, _owner){
	var a = Actor.TurretActor(baseActor, _owner);
	Actors.push(a);
	a.texture = a.texture_default = Asset.texture.white;
	a.animCollection = Anim.Empty;
	a.model = a.shadowModel = Asset.model.bullet;
	a.hasShadow = false;
	a.zOffset = 0.7*baseActor.scale ;
	baseActor.turret = a;
	return a;
}

Actor.TurretActor.CreateTotem = function(baseActor, _owner){
	var totem = Actor.AttachmentActor.CreateCooler(baseActor);
	totem.model = totem.shadowModel = Asset.model.totem;
	totem.spin = 0.01;
	
	var a = Actor.TurretActor.CreateStarTurret(baseActor, _owner);
	a.zOffset = 1.9;
	return a;
}

//same as unit, but has structure hurt anims
Actor.FortActor = function(proto, _owner){
	var a= Actor.UnitActor(proto, _owner);
	a.gameloop_special = Actor.StructureActor.HurtCheck;
	a.damageEffectCountdown = 0;
	return a;
}

Actor.HorseActor = function(proto, _owner){
	var a= Actor.UnitActor(proto, _owner);
	a.riderActor = Actor.AttachmentActor(a, 0, null);
	if(proto == UnitPrototype.Horse){
		a.riderActor.model = Asset.model.private;
	}else{
		a.riderActor.model = Asset.model.pioneer;
	}
	a.riderActor.hasShadow = false;
	a.riderActor.animCollection = Anim.PrivateHorseAnim;
	a.riderActor.texture = a.riderActor.texture_default = Asset.texture.private;
	a.startAnimation_base = Actor.startAnimation;
	a.timeSinceLastDustSpawn = 0;
	
	a.gameloop_special = function(){
		this.timeSinceLastDustSpawn ++;
		if(this.owner.moving == true){
			if(this.visible == true && this.owner.inner_counter%15 == 0){
				SoundObject.gallop.play(this.x-cam.pos[0], this.y-cam.pos[1]);
			}
			if(this.timeSinceLastDustSpawn > Math.max(5, ParticleActor.Counters_Visible[ParticleActor.family_horseDust]*0.5) ){
				var rand = Math.random();
				if(this.visible == false){rand *= 5}
				if(rand < 0.2){
					var spawnDust = ParticleActor.SpawnHorseDust;
					if(M.terrain.getWaterAt(this.x,this.y) < this.z){
						if(spawnDust(this.x, this.y, this.z, this.rotZ) == true){
							this.timeSinceLastDustSpawn = 0;
						}
					}
				}
			}
		}
	}
	
	a.startAnimation = function(animType){
		this.startAnimation_base(animType);
		if(this.riderActor != null){
			this.riderActor.startAnimation(animType);
			if(animType == Anim.death){
				this.riderActor.hasShadow = true;
				this.riderActor.baseActor =  null;
				this.riderActor = null;
				
			}
		}
	}
	return a;
}

Actor.ItemActor = function(proto, _owner){
	var a= Actor.UnitActor(proto, _owner);
	a.shadowShader = ShaderProgram.shadowShader;
	return a;
}

Actor.TankUnitActor = function(proto,_owner){
	var a= Actor.UnitActor(proto, _owner);
	a.bounding_box_width = 1;
	a.bounding_box_width_hittest = 0.8;
	
	a.shakeStrength = 0.4;
	a.shakeSpeed = 0.25;
	a.ref_shake = [0,0];
	a.shakeVector = [0,0];
	
	a.update_drawloop = function(){
		if(this.owner != undefined){
			var delta = Actor.frameInterpMultiplier*Render.frameDelta;
			this.x += this.owner.dx * delta;
			this.y += this.owner.dy * delta;
			this.z += this.owner.dz * delta;
			this.rotZ += this.d_angle * delta;
			
			this.frameInterp = Math.min(1, this.frameInterp + this.frameInterpDelta*Render.frameDelta);
			
			if(this.followTerrainSlope == true){
				this.getSlopeAngle();
			}
			this.rotX += this.hitRotX;
			this.rotY += this.hitRotY;
			this.hitRotX -= this.hitRotX*0.05*Render.frameDelta;
			this.hitRotY -= this.hitRotY*0.05*Render.frameDelta;
			
			if(this.owner.alive){
				this.ref_shake[0] = this.ref_shake[0]*0.75 + Math.random() - 0.5;
				this.ref_shake[1] = this.ref_shake[1]*0.75 + Math.random() - 0.5;
			}else{
				this.shadowShader = ShaderProgram.shadow_animatedShader;
			}
			
			this.shakeVector[0] += this.shakeSpeed * (this.ref_shake[0]-this.shakeVector[0]);
			this.shakeVector[1] += this.shakeSpeed * (this.ref_shake[1]-this.shakeVector[1]);
			//shake is weighted by speed
			var shakeFactor = (Math.abs(this.owner.movementx)+Math.abs(this.owner.movementy) + 0.03)*this.shakeStrength;
			
			this.rotX += this.shakeVector[0]* shakeFactor;
			this.rotY += this.shakeVector[1]* shakeFactor;
			
			if(this.quaternion){
				Utils.quatFromXYZ(this.quaternion, this.rotX, -this.rotY, this.rotZ);
			}
		}
	};
	
	return a;
}

Actor.ProjectileActor = function(_owner){
	var a = new Actor(Asset.model.flak, ShaderProgram.standard_single_rotationShader, Asset.texture.cannonball, _owner);
	a.hasShadow = false;
	a.shadowModel = a.model;
	a.bounding_sphere_radius = 2;
	a.animCollection = Anim.Empty;
	a.checkVisibility = Actor.checkVisibility_Projectile;
	//a.startAnimation(Anim.stand);
	a.update_drawloop = Actor.ProjectileActor.update_drawloop;
	a.update_gameloop = Actor.ProjectileActor.update_gameloop;

	return a;
}
Actor.ProjectileActor.update_gameloop = function(){
	this.x = this.owner.x;
	this.y = this.owner.y;
	this.z = this.owner.z;
	this.rotZ = this.owner.angle+3.1415;
	if(this.owner.caster == Gamestats.Hero){//this will make it look like it's coming out of the gun
		this.z -= 0.05*Math.min(1, 10/this.owner.age);
		this.x += 0.5*this.owner.caster.dx*Math.min(1, 10/this.owner.age);
		this.y += 0.5*this.owner.caster.dy*Math.min(1, 10/this.owner.age);
		
		if((this.owner.age == 1 || this.owner.age == 2) && this.owner.alive){
			this.scale *= 2;
		}
	}
	this.update_anim();
}
Actor.ProjectileActor.update_drawloop = function(){
	this.frameInterp = Math.min(1, this.frameInterp + this.frameInterpDelta*Render.frameDelta);
	 
	var delta = Actor.frameInterpMultiplier*Render.frameDelta;
	this.x += this.owner.dx * delta;
	this.y += this.owner.dy * delta;
	this.z += this.owner.dz * delta;
	//this.rotZ += this.d_angle * delta;
}

Actor.StaticActor = function(_model,_shaderProgram,_texture, _owner){
	var a = new Actor(_model,_shaderProgram,_texture, _owner);
	a.update_drawloop = Utils.DO_NOTHING;
	return a;
}

Actor.rayActor = function(){
	var a = new Actor(Asset.model.volume, ShaderProgram.rayShader,Textures[0] , null);
	a.renderLayer = 2;
	a.update_drawloop = function(){
		this.x = cam.pos[0];
		this.y = cam.pos[1];
		this.z = 0;
		this.scale = 2;
	}
	a.checkVisibility = Actor.checkVisibility_always;
	return a;
}

function DecalActor(_x, _y, _size, _angle, _shaderProgram, _texture){
	this.renderLayer = 0;
	this.visible = true;
	this.nodraw = false;
	this.isDecal = true;
	this.hasShadow = false;
	this.shaderProgram = _shaderProgram;
	this.texture = _texture;
	this.texture_default = _texture;
	this.x = _x;
	this.y = _y;
	this.z = 0.02;
	this.size = _size;
	this.ShaderModelFrameSortId = 0;
	this.frame = this.nextFrame = 0;
	this.partitioned = true;
	
	this.bounding_sphere_radius = 4;
	this.bounding_box_width_hittest = this.size;
	this.bounding_box_height_hittest = 1;
	
	this.refractionLowerBound = 1;
	this.depthMask = false;
	this.alphaCutoff = 0.5;
	this.alphaCutoffIncrement = 0.001;
	this.alphaCutoffMin = 0.5;
	this.angle = _angle;
	//we add a number between 0 and 1, so that decals created on the same frame have different priorities
	this.timeLeft = 2000+Math.random()*1500 + Math.random(); 
	this.timeIncrement = 2;
	this.timed = false;
	
	this.model = new DecalModel(this.x, this.y, this.z, this.size, this.angle);
	this.frame = 0;

	this.setPos = DecalActor.setPos;
	
	this.setPosAndSize = DecalActor.setPosAndSize;
	
	this.remove = Actor.remove;
	this.checkVisibility = Actor.checkVisibility_Decal;
	
	this.update_drawloop = Utils.DO_NOTHING;
	this.update_gameloop = DecalActor.update_gameloop;
	
	this.update_selection = Utils.DO_NOTHING;
	this.hitTest = Actor.hitTest;
	this.world_move_update = Actor.world_move_update;
}
DecalActor.setPos = function(newPos){
	this.x = newPos[0];
	this.y = newPos[1];
	this.z = newPos[2];
	this.model.moveTo(this.x, this.y);
}
DecalActor.setPosAndSize = function(newPos,newSize){
	this.size = newSize;
	this.bounding_box_width = newSize;
	this.bounding_box_height = newSize;
	this.bounding_box_width_hittest = newSize;
	this.model.size = this.size;
	this.model.setAngle(this.angle);
	this.setPos(newPos);
}
DecalActor.update_gameloop = function(){
	if(this.alphaCutoff > this.alphaCutoffMax){
		this.alphaCutoff -= this.alphaCutoffIncrement;
	}
	if(this.timed == true){
		if(this.timeLeft > 0){
			this.timeLeft -= this.timeIncrement;
		}else{
			this.remove();
		}
	}		
}

DecalActor.SpawnBlood = function(x,y, type){
	if(Math.random()*200 < Visible_BloodDecals.length){
		return;
	}
	var spawnX = x+Math.random()-0.5;
	var spawnY = y+Math.random()-0.5;
	var spawnSize = 1.6+Math.random()*0.5;
	var spawnAngle = Math.floor(Math.random()*4)*1.57;
	var d = new DecalActor(spawnX,spawnY,spawnSize, spawnAngle, type.decalShader, type.decalTexture);
	//var d = new ParticleActor(x,y,-0.5);
	d.alphaCutoff = 0.98;
	d.renderLayer = 2;
	d.timed = true;
	d.depthMask = true;
	d.alphaCutoffMax = 0.05 + Math.random()*0.2 ;
	Actor.addToWorld(d);
}

DecalActor.SpawnScorch = function(x,y, size){
	var spawnAngle = Math.floor(Math.random()*4)*1.57;
	var spawnSize = Math.random()*0.5+1;
	if(size !== void 0){
		spawnSize *= size;
	}
	var d = new DecalActor(x,y,spawnSize, spawnAngle, ShaderProgram.decalShader, Asset.texture.scorch);
	//var d = new ParticleActor(x,y,-0.5);
	d.alphaCutoff = 0.98;
	d.renderLayer = 0;
	d.timed = true;
	d.timeIncrement = 5;
	d.alphaCutoffMax = 0.05 + Math.random()*0.2 ;
	Actor.addToWorld(d);
	return d;
}
DecalActor.SpawnSpit = function(x,y){
	var d = DecalActor.SpawnScorch(x,y);
	d.texture = Asset.texture.spit_decal;
	d.timeIncrement = 15;
	d.alphaCutoffIncrement = 0.15;
	return d;
}
DecalActor.SpawnSmallBlood = function(x,y, type){
	if(type.smallDecalTexture == null){return;}
	var d = DecalActor.SpawnSpit(x,y);
	d.shaderProgram = type.decalShader;
	d.texture = type.smallDecalTexture;
	
	return d;
}

function RoadActor(_x,_y, _shaderProgram, _texture, _spline){
	this.x = _x; this.y = _y; this.z = 0;
	this.ShaderModelFrameSortId = 0;
	this.needs_update = false;
	this.isDecal = false;
	this.spline = _spline;
	this.shaderProgram = _shaderProgram;
	this.texture = _texture;
	this.texture_default = _texture;
	this.cull_backfacing = true;
	this.hasShadow = false;
	this.renderLayer = 0;
	this.refractionLowerBound = -1;
	this.textureLength = 0.15;
	this.alphaCutoff = 0.5;
	this.model = new RoadModel(this);
	this.maxX = this.maxY = this.minX = this.minY = 0;
	this.frame = this.nextFrame = 0; //must have for ShaderModelFrameSortId
	this.frameInterp=0;
	
	this.update_drawloop = Utils.DO_NOTHING;
	
	this.remove = Actor.remove;
	this.visible = true;
	this.checkVisibility = function(){
		if(this.needs_update == true){
			this.updatePath();
			this.needs_update = false;
		}
		
		this.visible = false;
		if(cam.pos[0]+15 > this.minX && cam.pos[0]-15 < this.maxX && cam.pos[1]+15 > this.minY && cam.pos[1]-15 < this.maxY){
			this.visible = true;
		}
	}
	this.hitTest = Actor.hitTest_never;
	
	this.updatePath = function(){
		this.model.refresh(this.spline);
		this.maxX =-999999; this.maxY =-999999; this.minX = 999999; this.minY = 999999;
		for(var i=0;i<this.spline.length;++i){
			this.maxX = Math.max(this.maxX, this.spline[i].x);
			this.minX = Math.min(this.minX, this.spline[i].x);
			this.maxY = Math.max(this.maxY, this.spline[i].y);
			this.minY = Math.min(this.minY, this.spline[i].y);
		}
		this.x = 0.5*(this.maxX+this.minX);
		this.y = 0.5*(this.maxY+this.minY);
	}
	this.insertPoint = function(pos){
		var prevpoint = this.spline[pos];
		var newpoint;
		if(pos < this.spline.length-1){
			var nextpoint = this.spline[pos+1];
			newpoint= new RoadPoint((prevpoint.x+nextpoint.x)*0.5,(prevpoint.y+nextpoint.y)*0.5,
			(prevpoint.fillet+nextpoint.fillet)*0.5, (prevpoint.width+nextpoint.width)*0.5);
		}else{
			var cs = Math.cos(prevpoint.fillet);
			var sn = Math.sin(prevpoint.fillet);
			newpoint= new RoadPoint(prevpoint.x + cs, prevpoint.y + sn, prevpoint.fillet, prevpoint.width);
		}
		this.spline.splice(pos+1, 0,newpoint);
		this.updatePath();
		return newpoint;
	}
	this.removePoint = function(pos){
		this.spline.splice(pos,1);
		this.updatePath();
	}
	this.updatePath();
}

RoadActor.SpawnRoad = function(x,y, pointcount){
	var spline = [];
	for(var i=0;i<pointcount;++i){
		spline[i] = new RoadPoint(x,y+i,0, 3);
	}
	var r = new RoadActor(x,y, ShaderProgram.roadShader, Asset.texture.road , spline);
	Actors.push(r);
	return r;
}
RoadActor.SpawnRoad_Spline = function(x,y, spline){
	var r = new RoadActor(x,y, ShaderProgram.roadShader, Asset.texture.road , spline);
	Actors.push(r);
	return r;
}

function RopeActor(proto, owner){
	var a = Actor.DoodadActor(proto,null);
	a.startPoint = a;
	a.endPoint = new Vector(cam.pos[0],cam.pos[1],5);
	a.partitioned = false;
	a.isRope = true;

	a.ropeLength = 10;
	a.ropeLength_base = 10; //unstretched length
	a.xyLength = 10; //length of rope projected down to xy plane
	a.pointsDistance = 10; //3d distance between start and end
	a.textureLength_base = 1;
	a.fixedTextureLength = proto.rope_fixedTextureLength;
	a.textureLength = 1;
	
	a.bounding_sphere_radius = 4;
	a.scale_current =1;
	a.scale=1;
	a.concave = false;
	
	a.checkVisibility = Actor.checkVisibility_Rope;
	
	//this.hitTest = Actor.hitTest_never;
	a.stretchFactor = 0;
	a.isGrappleRope = false;
	a.isActiveGrapple = true;
	a.startZOffset = 0;
	a.constant_arch_factor = 1.5;
	a.timeLeft = -1;
	
	a.update_gameloop = function(){
		this.x = this.startPoint.x;
		this.y = this.startPoint.y;
		this.z = this.startPoint.z + this.startZOffset;
		//leash
		this.stretchFactor = 1/(this.ropeLength_base/this.ropeLength) -1;
		if(this.stretchFactor > 0.2){
			if(this.endPoint.owner || this.endPoint.baseActor && this.endPoint.baseActor.owner){
				var u = this.endPoint.baseActor?this.endPoint.baseActor.owner:this.endPoint.owner;
				if(!u.isProjectile){
					u.windPressureVector.x -= Math.cos(this.rotZ)*this.stretchFactor*0.025;
					u.windPressureVector.y += Math.sin(this.rotZ)*this.stretchFactor*0.025;
				}
			}
		}
		
		if(this.endPoint.isRemoved || this.timeLeft == 0){
			this.remove(); return;
		}
		
		if(this.isGrappleRope){
			this.getDoodadSaveData = null;
			var u = this.endPoint.owner.caster;
			this.isActiveGrapple = u.task.id == Task.id_JumpTask;
			if(this.endPoint.owner.alive == false && this.isActiveGrapple == false && this.timeLeft < 0){
				//unit has finished jumping
				this.timeLeft = 30;
			}
			if(this.timeLeft >= 0){
				this.scale = Math.min(1,this.timeLeft/20); 
			}
		}else{
			this.ropeLength_base = 10+this.rotX;
		}
		
		if(this.timeLeft > 0){
			this.timeLeft--;
		}
	}
	a.update_drawloop = function(){
		this.x = this.startPoint.x;
		this.y = this.startPoint.y;
		this.z = this.startPoint.z + this.startZOffset;
		this.rotZ = Math.atan2(this.endPoint.x-this.x, this.endPoint.y-this.y)-1.57;
		this.xyLength = Math.sqrt(((this.endPoint.x-this.x)*(this.endPoint.x-this.x))+((this.endPoint.y-this.y)*(this.endPoint.y-this.y)));
		
		this.pointsDistance = Unit_Distance_3d(this.startPoint, this.endPoint);
		if(this.isGrappleRope == true){
			this.ropeLength_base = this.pointsDistance * this.constant_arch_factor;
			if(this.isActiveGrapple){
				this.constant_arch_factor = 0.8;
			}else{
				//gradually flatten out rope after end of jump
				this.constant_arch_factor = Math.max(0.8, this.constant_arch_factor - 0.05);
			}
		}
		this.ropeLength = Math.max(this.pointsDistance+0.1, this.ropeLength_base);
		this.scale_current = this.scale * this.ropeLength_base/this.ropeLength; //stretching
		if(this.fixedTextureLength == false){
			this.textureLength = this.ropeLength*this.textureLength_base;
		}
		
		
		
		this.v_factor = this.endPoint.z-this.z;
		this.a_factor = Utils.solve_monotonous(this.a_factor_searchFunction,0.1, 100, 0.01);
		if(this.concave){
			this.a_factor = -this.a_factor;
		}
		//len = a*(sinh((x-b)/a)+sinh(b/a))
		//solve for b:
		//b = (-2a*arcosh(len/k) -x)/2 where k == 2a*sinh(x/2a), x == xyLength
		var k = 2*this.a_factor*Math.sinh(this.xyLength/(2*this.a_factor));
		
		this.b_factor = -(2*this.a_factor*Math.acosh(this.ropeLength/k)*Math.sign(this.v_factor) - this.xyLength)/2;
		
		//from a*cosh(b/a) + c == 0 -> c == -a*cosh(b/a)
		this.c_factor = 0;
		this.c_factor = - this.getCatenary(0);
	}
	
	a.a_factor = 4; //sag
	a.b_factor = 0; //x offset of lowest point
	a.c_factor =0; //y offset
	a.v_factor = 0; //distance vertical factor
	a.a_factor_searchFunction = RopeActor.a_factor_searchFunction.bind(a);
	
	a.curveFunction = function(t){
		//t*=this.ropeDistance;
		return [t,0,0];
	}
	
	a.getCatenary = function(t){
		return this.a_factor*Math.cosh((t+this.b_factor)/this.a_factor) + this.c_factor;
	}
	
	a.getDoodadSaveData = function(){
		return [this.proto.id, 
		fixed3(this.x),fixed3(this.y),fixed3(this.z),
		fixed3(this.rotX),fixed3(this.rotY),fixed3(this.rotZ),
		fixed3(this.scale),
		this.texture_variation, 
		(this.model_variation!=null?this.model_variation:0),
		this.endPoint.x, this.endPoint.y, this.endPoint.z];
	}
	
	a.setDoodadLoadData = function(instData){
		this.rotX = instData[4];
		this.rotY = instData[5];
		this.rotZ = instData[6];
		this.scale = instData[7];
		this.endPoint.x = instData[10] + M.loadX;
		this.endPoint.y = instData[11] + M.loadY;
		this.endPoint.z = instData[12] + M.loadZ;
	}
	return a;
}
RopeActor.a_factor_searchFunction = function(fac){
	return 2*fac*Math.sinh(this.xyLength/(2*fac))-Math.sqrt(this.ropeLength*this.ropeLength-this.v_factor*this.v_factor);
}
RopeActor.Spawn = function(p1,p2){
	var r = new RopeActor(DoodadPrototype.Rope);
	r.startPoint = p1;
	r.endPoint = p2;
	Actors.push(r);
	return r;
}

RopeActor.HangRope = function(proto, owner, baseActor){
	var r = Actor.DoodadActor(proto, owner);
	
	r.tension = 0.2;
	r.update_gameloop = function(){
		this.texture = Asset.texture.rope;
	}
	r.ropeLength = 1;
	r.endPoint_attachment = new Vector(0,0,0);
	r.attachmentId = -1;
	r.update_drawloop = function(){
		if(this.attachmentId < 0){
			//attach end of rope to actor
			var endPoint = this.baseActor;
		}else{
			//attach end of rope to attachment point on baseActor
			var endPoint = this.endPoint_attachment;
			var pointsArray = this.baseActor.model.pointsArray;
			var pprev = pointsArray[this.baseActor.frame][this.attachmentId];
			var pnext = pointsArray[this.baseActor.nextFrame][this.attachmentId];
			//TODO doesn't take rotation into account
			endPoint.x = this.baseActor.x+Utils.LERP1(this.baseActor.frameInterp, pprev.x,pnext.x);
			endPoint.y = this.baseActor.y+Utils.LERP1(this.baseActor.frameInterp, pprev.y,pnext.y);
			endPoint.z = this.baseActor.z+Utils.LERP1(this.baseActor.frameInterp, pprev.z,pnext.z);
		}
		var dist = Unit_Distance_3d(this, endPoint);
		var rotZ = 3.1415-Math.atan2(this.y- endPoint.y,this.x-endPoint.x);
		var rotY = -1.57+Math.atan2(this.z-endPoint.z, Unit_Distance(this,endPoint));
		this.scaleZ = dist*0.4;
		
		this.tension = Math.max(Math.min(0.2, (dist-this.ropeLength)*0.03), 0.0);
		var xyzRot = Utils.euler_zxy_to_xyz(0, rotY, rotZ);
		this.rotZ = xyzRot[2];
		this.rotY = xyzRot[1];
		this.rotX = xyzRot[0];
	}
	
	r.getDoodadSaveData = function(){
		return [this.proto.id, 
		fixed3(this.x),fixed3(this.y),fixed3(this.z),
		fixed3(this.ropeLength),fixed3(this.rotY),fixed3(this.rotZ),
		fixed3(this.scale),
		this.texture_variation, 
		(this.model_variation!=null?this.model_variation:0)];
	}
	
	r.setDoodadLoadData = function(instData){
		this.ropeLength = instData[4];
		this.rotY = instData[5];
		this.rotZ = instData[6];
		this.scale = instData[7];
	}
	
	if(baseActor){
		r.baseActor = baseActor;
	}else{
		var a = new Actor(Asset.model.corsair,ShaderProgram.standard_full_rotation_no_specShader, Asset.texture.corsair,null);
		a.frame = 40;
		a.nextFrame = 40;
		a.hasShadow = true;
		a.shadowZOffset = -1;
		
		a.hangMomentum = [0,0,0];
		a.windPhase_ref = 0;
		a.windPhase = 0;
		a.update_gameloop = function(){
			this.texture = this.rope.texture_default;
			var n = Pathfinder.getNodeAt(this.x,this.y);
			if(n && n.bend_timestamp <= Pathfinder.bend_timestamp){
				var dt =Pathfinder.bend_timestamp- n.bend_timestamp;
				this.hangMomentum[0] += n.bend_x /(dt*dt+1)*0.5;
				this.hangMomentum[1] += n.bend_y /(dt*dt+1)*0.5;
			}
			
			this.hangMomentum[0]*= 0.8;
			this.hangMomentum[1]*= 0.8;
			this.hangMomentum[2]*= 0.8;
			this.hangMomentum[0] -= (this.x-this.rope.x)*this.rope.tension;
			this.hangMomentum[1] -= (this.y-this.rope.y)*this.rope.tension;
			this.hangMomentum[2] -= (this.z-this.rope.z)*this.rope.tension + 0.1;
			
			if(this.visible == false){
				this.x = this.rope.x;
				this.y = this.rope.y;
				this.z = this.rope.z-2;
			}
		}
		
		a.update_drawloop = function(){
			var delta = Actor.frameInterpMultiplier*Render.frameDelta;
			this.x += this.hangMomentum[0]*delta;
			this.y += this.hangMomentum[1]*delta;
			this.z += this.hangMomentum[2]*delta;
			
			this.windPhase_ref += (Math.random()-0.5)*0.25 * Render.frameDelta *Environment.windStrength;
			var phase_error = this.windPhase_ref-this.windPhase;
			this.windPhase += phase_error * 0.04;
			if(this.windPhase_ref > Math.PI*2){
				this.windPhase_ref -= Math.PI*2;
				this.windPhase -= Math.PI*2;
			}else if(this.windPhase_ref < 0){
				this.windPhase_ref += Math.PI*2;
				this.windPhase += Math.PI*2;
			}
			
			var windOffX =  Math.cos(this.windPhase)*Environment.windStrength;
			var windOffY =  Math.sin(this.windPhase)*Environment.windStrength;
			this.x += windOffX*0.02;
			this.y += windOffY*0.02;
			
			this.rotX = this.hangMomentum[0] - 0.3*windOffY;
			this.rotY = this.hangMomentum[1] - 0.3*windOffX;
			this.rotZ += Math.sin(this.windPhase)*0.05*Environment.windStrength;
		}
		Actors.push(a);
		r.baseActor = a;
		a.rope = r;
	}
	
	return r;
}

function WorldRectActor(){
	this.shaderProgram = ShaderProgram.worldGuiShader;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.rotZ = 0;
	this.model = Asset.model.rect_center;
	this.texture = Asset.texture.circle;
	this.frame = this.nextFrame = 0;
	this.selectable_editor = false;
	this.scaleX = 3;
	this.scaleY = 3;
	this.scaleZ = 1;
	this.depth_test = false;
	this.tint = [0.28,0.4,0.15]; //this.tint = [0.7,1.,0.4]; 
	this.tint_wire = [1,1,1];
	this.texture = Asset.texture.white;
	
	this.remove = function(){
		var id = WorldGUI.indexOf(this);
		if(id>=0){
			WorldGUI.splice(id,1);
		}
	}
	this.update_drawloop = Utils.DO_NOTHING;
}
WorldRectActor.AddBuildingGrid = function(buildingCursor, proto){
	var size = proto.structureSize;
	var nx = Math.floor(buildingCursor.x)-Math.floor(size/2);
	var ny = Math.floor(buildingCursor.y)-Math.floor(size/2);
	var hSize = size/2;
	for(var i=-hSize;i<hSize;++i){
		for(var j=-hSize;j<hSize;++j){
			WorldGUI.push(WorldRectActor.BuildingGrid(buildingCursor,j+0.5,i+0.5));
		}
	}
}

WorldRectActor.BuildingGrid = function(buildingCursor,offX,offY){
	var a = new WorldRectActor();
	a.scaleX = 0.9;
	a.scaleY = 0.9;
	if(buildingCursor){
		a.x = buildingCursor.x+offX;
		a.y = buildingCursor.y+offY;
		a.z = buildingCursor.z;
	}
	a.offX = offX; a.offY = offY;
	a.building  = buildingCursor;
	a.update_drawloop = function(){
		if(this.building.isRemoved){
			this.remove();
			return;
		}
		this.x = this.building.x + this.offX;
		this.y = this.building.y+this.offY;
		this.z = this.building.z;
		var n = Pathfinder.getNodeAt(this.x,this.y);
		if(n && Node.isBuildable(n)){
			this.tint = WorldRectActor.tint_buildable;
		}else{
			this.tint = WorldRectActor.tint_unbuildable;
		}
	}
	return a;
}

WorldRectActor.BuildingChunk = function(buildingCursor){
	var a = WorldRectActor.BuildingGrid(buildingCursor, 0,0);
	a.scaleX = a.scaleY = 8;
	//a.x = Math.floor(buildingCursor.x/8)*8+4;
	//a.y = Math.floor(buildingCursor.y/8)*8+4;
	a.texture = Asset.texture.heat;
	a.update_drawloop = function(){
		if(!this.building||this.building.isRemoved){
			this.x = this.y = -99999;
			return;
		}
		var tx = Math.floor(this.building.x/8);
		var ty = Math.floor(this.building.y/8);
		this.x = tx*8+4;
		this.y = ty*8+4;
		this.z = this.building.z;
		var clust = Pathfinder.getClusterAt(this.x,this.y);
		if(clust){
			var heat = clust.heat;
			if(Control.currentCommand.ability && Control.currentCommand.buildingCursor &&
			Control.currentCommand.ability.trainingType){
				var type = UnitPrototype[Control.currentCommand.ability.trainingType];
				if(type&& type.structureHeat){
					heat += type.structureHeat;
				}
			}
			if(heat <= 8){
				if(heat <= 4){
					this.tint = WorldRectActor.tint_buildable;
				}else if(heat <= 6){
					this.tint = WorldRectActor.tint_yellow;
				}else{
					this.tint = WorldRectActor.tint_orange;
				}
			}else{
				this.tint = WorldRectActor.tint_unbuildable;
			}
		}
	}
	return a;
}

WorldRectActor.tint_buildable = [0.1,0.5,0];
WorldRectActor.tint_yellow = [0.5,0.4,0];
WorldRectActor.tint_orange = [0.7,0.3,0];
WorldRectActor.tint_unbuildable = [1,0.2,0];
WorldRectActor.tint_pulse = [0.5,0.5,0.5];
WorldRectActor.pulse_phase = 0;
WorldRectActor.update = function(){
	this.tint_pulse[0] = this.tint_pulse[1] = this.tint_pulse[2] = Math.sin(this.pulse_phase*0.1)*0.2+0.3;
	this.pulse_phase = (this.pulse_phase+1)%1000;
}

WorldRectActor.getVisBox = function(a){
	var bb = new WorldRectActor();
	bb.model = Asset.model.cube;
	bb.x = a.x+a.bounding_box_centerX; bb.y = a.y+a.bounding_box_centerY; bb.z = a.z+a.bounding_box_centerZ;
	bb.scaleX = a.bounding_box_width;
	bb.scaleY = a.bounding_box_length;
	bb.scaleZ = a.bounding_box_height;
	bb.tint = [0.,0.05,0.1]; bb.tint_wire = [0,0.1,0.2];
	return bb;
}
WorldRectActor.getSelectionBox = function(a){
	var m = a.model;
	var bb = new WorldRectActor();
	bb.model = Asset.model.cube;
	bb.tint = [0,0,0]; bb.tint_wire = [0.3,0.3,0.3];
	var rot = -a.rotZ; var cs = Math.cos(rot); var sn = Math.sin(rot);
	bb.rotZ = rot; 
	bb.z = a.z+ m.bound_zOffset*a.scale;
	var offX = m.bound_xOffset*a.scale; var offY =m.bound_yOffset*a.scale;
	//because box is not always centered, we must rotate the center point too
	bb.x = a.x + offX*cs-offY*sn; bb.y = a.y + offX*sn+offY*cs; 
	bb.scaleX = m.bound_xSize*a.scale;
	bb.scaleY = m.bound_ySize*a.scale;
	bb.scaleZ = m.bound_zSize*a.scale;
	return bb;
}
WorldRectActor.getSelectionMesh = function(a){
	var m = a.model;
	var bb = new WorldRectActor();
	bb.model = a.model;
	if(a.owner){
		var arr = a.owner.owner.colorFloat;
		bb.tint = bb.tint_wire = [arr[0]*0.3 +0.1,arr[1]*0.3 + 0.1,arr[2]*0.3 + 0.1];
	}else{
		bb.tint = WorldRectActor.tint_pulse, bb.tint_wire = [0.3,0.2,0.];
		//if(a.tint != undefined){
		//	bb.tint = [0.2,0.2,0.2], bb.tint_wire = [0.15,0.15,0.15]; //triggers
		//}
	}
	bb.depth_test = true;
	var rot = -a.rotZ; var cs = Math.cos(rot); var sn = Math.sin(rot);
	bb.rotZ = rot; 
	bb.x = a.x; bb.y = a.y; bb.z = a.z;
	bb.scaleZ = bb.scaleY = bb.scaleX = a.scale;
	return bb;
}

function BloodType(){
	this.splatterTexture = Asset.texture.bloodsplatter; 
	this.decalTexture = Asset.texture.blood;
	this.smallDecalTexture = null;
	this.decalChance = 0.25;
	this.decalShader = ShaderProgram.decalShader;
	this.splatterSize = 1;
}
BloodType.init = function(){
	BloodType.Red = new BloodType();
	BloodType.Red.smallDecalTexture = Asset.texture.blood_small;
	BloodType.Brown = new BloodType();
	BloodType.Brown.splatterTexture = Asset.texture.bloodsplatter2; 
	BloodType.Brown.decalTexture = Asset.texture.blood2;
	BloodType.Brown.smallDecalTexture = Asset.texture.blood2_small;
	BloodType.Purple = new BloodType();
	BloodType.Purple.splatterTexture = Asset.texture.bloodsplatter3; 
	BloodType.Purple.decalTexture = Asset.texture.blood3;
	BloodType.Purple.smallDecalTexture = Asset.texture.blood3_small;
	
	BloodType.Bone = new BloodType();
	BloodType.Bone.splatterTexture = Asset.texture.bloodsplatter_bone; 
	BloodType.Bone.decalChance = 0;
	
	BloodType.Water = new BloodType();
	BloodType.Water.splatterTexture = Asset.texture.splash_big; 
	BloodType.Water.decalChance = 0.25;
	BloodType.Water.smallDecalTexture = Asset.texture.puddle;
	BloodType.Water.decalShader = ShaderProgram.puddleShader;
	BloodType.Water.decalTexture = Asset.texture.puddle;
}

Actor.ReflectionProbe = function(proto){
	var a = Actor.DoodadActor(proto, null);
	a.ReflectionArray = [];
	a.tileSize = this.scale;
	a.update_drawloop = function(){
		this.ReflectionArray.length = 0;
		for(var i=-this.tileSize; i<this.tileSize;++i){
			for(var j=-this.tileSize;j<this.tileSize;++j){
				var nod = pf.getNodeAt(this.x+j,this.y+i);
				if(nod){
					for(var u=nod.firstColl;u;u=u.nextColl){
						if(u.alive == true){
							this.ReflectionArray.push(u.actor);
						}
					}
				}
			}
		}
		if(this.ReflectionArray.length > 0){
			Visible_ReflectionProbes.push(this);
		}
		if(!Render.drawEditorHelpers){
			this.texture = Asset.texture.invisible
		}else{
			this.texture = this.texture_default
		}
	}

	
	return a;
}

Actor.ProjectileObstacle = function(proto){
	var a = Actor.DoodadActor(proto, null);
	a.atNode_last_frame = null;
	a.hardRadius = 1;
	a.isColliderDoodad = true;
	a.hp = 9999;
	a.targetPriority = -1;
	a.pressureStrength = 0;
	a.Hurt = Utils.DO_NOTHING;
	
	a.update_gameloop = function(){
		this.nodraw = !Render.drawEditorHelpers;
		this.hardRadius = this.scale;
		this.collision_tile_radius = Math.ceil(this.hardRadius); 
		this.atNode = pf.getNodeAt_Robust(this.x,this.y);

		if(this.atNode != this.atNode_last_frame){
			if(this.atNode_last_frame != null){
				Node.removeUnit(this.atNode_last_frame, this);
			}
			Node.addUnit(this.atNode, this);
		}
		this.atNode_last_frame = this.atNode;
	}
	a.remove_base = a.remove;
	a.remove = function(){
		Node.removeUnit(this.atNode, this);
		this.remove_base();
	}
	return a;
}

Actor.PressureObstacle = function(proto){
	var a = Actor.DoodadActor(proto, null);
	a.pressureStrength = 1;
	a.hardRadius = 1;
	a.collision_tiles_radius = 1;
	a.directional_pressure = false;
	
	a.update_gameloop = function(){
		this.nodraw = !Render.drawEditorHelpers;
		this.hardRadius = this.scale;
		this.collision_tiles_radius = Math.ceil(this.hardRadius); 
		this.atNode = pf.getNodeAt_Robust(this.x,this.y);
		this.pressureStrength = this.rotX+1;
		this.collision_check();
	}
	a.collision_check = function(){
		var nx = this.atNode.nodex;var ny = this.atNode.nodey;
		var tilesRadius = this.collision_tiles_radius;
		var r1 = this.hardRadius;
		for(var i=-tilesRadius; i<=tilesRadius; ++i){
			if(ny+i < 0 || ny + i >= pf.mapH){continue};
			for(var j=-tilesRadius;j<=tilesRadius;++j){
				if(nx+j < 0 || nx + j >= pf.mapW){continue};
				var nod = pf.map[ny+i][nx+j];
				for(var u=nod.firstColl;u;u=u.nextColl){
					if(u.alive == false /*|| u.born != true*/){continue;}
					var distance = Unit_Distance(this,u);
					var r2 = u.moving == true ? u.softRadius_moving : u.softRadius_standing;
					if(distance < r1 + r2 && distance > 0.0001){
						if(this.directional_pressure == true){
							var distVectorX = Math.cos(this.rotZ);
							var distVectorY = Math.sin(this.rotZ);
						}else{
							var distVectorX = (this.x - u.x);
							var distVectorY = (this.y - u.y);
						}
						var pressure_force = (r1 + r2 - distance) / (r1 + r2);
						var pressure_radial_other = -1 * pressure_force * this.pressureStrength;
						u.pressureVector.x += pressure_radial_other  * distVectorX;
						u.pressureVector.y += pressure_radial_other  * distVectorY;

					}
				}
			}
		}
	}	
	return a;
}