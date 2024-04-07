function ParticleActor(_x, _y, _z, _visFamily){
	this.model = Asset.model.cube;
	this.hasShadow = false;
	this.hasHelperActor = true;
	this.isParticle = true;
	
	this.isVolatile = false; //volatile means it disappears when it is not visible;
	this.visFamily = _visFamily;
	ParticleActor.Counters_LastTickSpawn[this.visFamily]++;
		
	this.texture_default = Asset.texture.smoke;
	this.texture = this.texture_default
	this.shaderProgram = ShaderProgram.particleShader;
	this.unlit = false;
	this.alphaBlended = false;
	this.visible = false;
	
	this.bounding_sphere_radius = 4;
	
	this.x = _x;
	this.y = _y;
	this.z = _z;
	this.baseOpacity = 0.8;
	this.fade_start = 0;
	this.opacity = this.baseOpacity;
	
	this.motionPosArray = null;
	this.motionDirArray = null;
	this.motion_speed = 1;
	this.motion_drag = 1;
	this.motionChannel = 0;
	this.dynamic = false;
	this.dynamic_update_timer = 0;
	this.baseActor = null;
	this.baseActor_attachmentId = -1;

	this.refractionLowerBound = -0.1;
	
	this.renderLayer = 3;
	this.model = null;
	this.age = 0;
	//because gravity is age dependent, but it should not be affected by expansion, we need to do some math 
	this.age_no_expansion = 0; 
	this.gravity_current = 0;
	
	this.gravity = 0;
	this.growth = 0.15;

	this.age_speed = 0.2;
	this.ageLimit = 80;
	this.expansionTime = 25;
	this.expansionPower = 12;
	
	this.hitTest = Actor.hitTest_never;
	this.checkVisibility = Actor.checkVisibility_ParticleEffect;
	this.world_move_update = Actor.world_move_update;
	
	this.floorZ = -999;
	this.floor_triangle = null;
}

ParticleActor.prototype.update_drawloop = function(){
	if(this.age < this.expansionTime && this.expansionTime > 0){
		var expansion_diff = this.age_speed* (this.expansionTime-this.age)/this.expansionTime * this.expansionPower;
		this.age += expansion_diff;
	}
	var delta = this.age_speed*Render.frameDelta;
	this.age += delta;
	this.age_no_expansion += delta;
	//because gravity is age dependent, but it should not be affected by expansion, we need to do some math 
	this.gravity_current = Math.pow(this.age_no_expansion,3)*this.gravity/Math.pow(this.age, 3);
	
	if(this.ageLimit > 0){
		this.opacity = this.baseOpacity * (1- (this.age-this.fade_start)/(this.ageLimit-this.fade_start));
	}
	ParticleActor.Counters_Visible[this.visFamily] ++;
	
	
	if(this.dynamic == true){
		ParticleActor.dynamic_Visible++;
		this.motionChannel = Math.min(Render.maxDynamicEmitterCount, ParticleActor.dynamic_Visible);
		//this.update_centerPoint();
		
		var tw = ParticleActor.motionRes;
		var bufpos = 0 + this.motionChannel*ParticleActor.motionRes*4;
		var arrpos=0;
		var dirpos = 0;
		var buflen = this.motionPosArray.length;
		
		if(this.motionDirArray == null){
			for(var i=0;i<tw;++i){
				particlePosBuffer[bufpos] = this.motionPosArray[arrpos];
				particlePosBuffer[bufpos+1] = this.motionPosArray[arrpos+1];
				particlePosBuffer[bufpos+2] = this.motionPosArray[arrpos+2];
				particlePosBuffer[bufpos+3] = this.motionPosArray[arrpos+3];
				bufpos += 4;
				arrpos += 4;
			}
		}else{
			for(var i=0;i<tw;++i){
				var buf_time = Math.floor(this.age_no_expansion/100 * tw - i)%tw;
				
				if(this.motion_drag == 1){
					particlePosBuffer[bufpos] = this.motionPosArray[arrpos]+ buf_time*this.motionDirArray[dirpos];
					particlePosBuffer[bufpos+1] = this.motionPosArray[arrpos+1]+buf_time*this.motionDirArray[dirpos+1];
				}else{
					particlePosBuffer[bufpos] = this.motionPosArray[arrpos]+ ((1-Math.pow(this.motion_drag, buf_time))/(1-this.motion_drag))*this.motionDirArray[dirpos];
					particlePosBuffer[bufpos+1] = this.motionPosArray[arrpos+1]+((1-Math.pow(this.motion_drag, buf_time))/(1-this.motion_drag))*this.motionDirArray[dirpos+1];
				}
				
				particlePosBuffer[bufpos+2] = this.motionPosArray[arrpos+2];
				particlePosBuffer[bufpos+3] = this.motionPosArray[arrpos+3];
				bufpos += 4;
				arrpos += 4;
				dirpos += 2;
			}
		}
	}
}

ParticleActor.prototype.update_gameloop = function(){
	if(this.ageLimit >= 0 && this.age > this.ageLimit){
		this.remove(); return;
	}
	
	if(this.baseActor != null && this.baseActor.isRemoved==true){
		if(this.ageLimit >=0){
			this.ageLimit=Math.min(this.ageLimit, this.age_speed*(this.age+20));
		}else{
			this.ageLimit= this.age_speed*(this.age+20);
		}
		this.fade_start = this.age;
		this.isVolatile = true;
		this.update_centerPoint();
		this.baseActor = null;
	}
	
	if(this.visible == false ){
		if(this.isVolatile){
			this.remove(); return;
		}
		//update in gameloop is not visible, otherwise it is updated in drawloop
		this.age+=this.age_speed*2;
	}
	
	if(this.dynamic == true && Control.gamePaused == false){
		if(this.dynamic_update_timer >= 5 && this.baseActor != null && this.baseActor.isRemoved == false){
			this.update_centerPoint();
			this.dynamic_update_timer = 0;
		}
		this.dynamic_update_timer ++;
		
		var tw = ParticleActor.motionRes;
		var buf_time = Math.floor(this.age_no_expansion/100 * tw)%tw;
		var buf_time_p1 = (buf_time+1)%tw;
		var buf_time_dir = buf_time;
		buf_time*=4;
		buf_time_p1*= 4;
		buf_time_dir *= 2;
	
		
		if(this.baseActor != null && this.baseActor.isRemoved == false){
			var offx=this.baseActor.x; offy=this.baseActor.y; offz=this.baseActor.z; 
			var rot = this.baseActor.rotZ + this.model.angle;
			if(this.baseActor.isAttachment == true){
				rot += this.baseActor.baseActorRotZ;
			}
			if(this.baseActor_attachmentId >= 0){
				var pointsArray = this.baseActor.model.pointsArray[this.baseActor.frame];
				if(pointsArray.length-1>=this.baseActor_attachmentId){
					offx += pointsArray[this.baseActor_attachmentId].x;
					offy += pointsArray[this.baseActor_attachmentId].y;
					offz += pointsArray[this.baseActor_attachmentId].z;
					rot = this.baseActor.rotZ
				}
			}
			
			this.motionPosArray[buf_time] = this.motionPosArray[buf_time_p1] = offx-this.x;
			this.motionPosArray[buf_time+1] = this.motionPosArray[buf_time_p1+1] = offy-this.y;
			this.motionPosArray[buf_time+2] = this.motionPosArray[buf_time_p1+2] = offz-this.z;
			this.motionPosArray[buf_time+3] = 1.;
			
			if(this.motionDirArray){
				this.motionDirArray[buf_time_dir] = Math.cos(-1.57- rot)*this.motion_speed/ParticleActor.motionRes;
				this.motionDirArray[buf_time_dir+1]  = Math.sin(-1.57- rot)*this.motion_speed/ParticleActor.motionRes;
			}
		}else{
			this.motionPosArray[buf_time] = this.motionPosArray[buf_time_p1] = 0;
			this.motionPosArray[buf_time+1] = this.motionPosArray[buf_time_p1+1] = 0;
			this.motionPosArray[buf_time+2] = this.motionPosArray[buf_time_p1+2] = 0;
			this.motionPosArray[buf_time+3] = 0;
		}
		
	}
}
	
ParticleActor.prototype.remove = function(){
	this.preselected = false;
	this.isRemoved = true;
	if(this.selected == true){
		this.selected = false;
		Selected.splice(Editor.selected.indexOf(this), 1);
	}
	if(this.lightsource != null){
		this.lightsource.detachFromActor();
	}
	Actors.splice(Actors.indexOf(this), 1);
}

ParticleActor.prototype.update_centerPoint = function(){
	//update center point of emitter;
	if(this.baseActor == null){return;}
	var buflen = this.motionPosArray.length;
	//first let's find the optimal centerpoint
	var minX = 99999; var minY = 99999;
	var maxX = -99999; var maxY = -99999;
	for(var i=0;i<buflen;i+=8){ //check only every second offset
		minX = Math.min(this.motionPosArray[i], minX);
		maxX = Math.max(this.motionPosArray[i], maxX);
		minY = Math.min(this.motionPosArray[i+1], minY);
		maxY = Math.max(this.motionPosArray[i+1], maxY);
	}
	this.bounding_sphere_radius = 2+Math.max(minX+maxX, minY+maxY)*0.5;
	
	var centerX = (minX+maxX)*0.5 + this.x;
	var centerY = (minY+maxY)*0.5 + this.y;
	
	var deltaX = centerX-this.x;
	var deltaY = centerY-this.y;
	var deltaZ = this.baseActor.z-this.z;
	
	if(Math.abs(deltaX)>2 || Math.abs(deltaY)>2 || Math.abs(deltaZ)>2){
		this.x +=deltaX;
		this.y +=deltaY;
		this.z +=deltaZ;
		for(var i=0;i<buflen;i+=4){
			this.motionPosArray[i]-=deltaX;
			this.motionPosArray[i+1]-=deltaY;
			this.motionPosArray[i+2]-=deltaZ;
		}
	}
}

ParticleActor.family_generic = 0;
ParticleActor.family_gunSmoke = 1;
ParticleActor.family_horseDust = 2;
ParticleActor.family_unitRipple = 3;

ParticleActor.Counters_Visible = [0,0,0,0,0,0,0,0];
//should be used for keeping a tally of 
ParticleActor.Counters_LastTickSpawn = [0,0,0,0,0,0,0,0];

ParticleActor.resetCounters = function(){
	for(var i=0;i<ParticleActor.Counters_Visible.length; ++i){
		ParticleActor.Counters_Visible[i] = 0;
		ParticleActor.Counters_LastTickSpawn[i] = 0;
	}
	ParticleActor.dynamic_Visible = 0;
}

ParticleActor.motionRes = 32;
ParticleActor.motionCount = 64;
ParticleActor.motionCount_current = 1;
ParticleActor.dynamic_Visible = 0;


ParticleActor.setDynamic = function(p, dir){
	p.dynamic = true;
	p.motionPosArray = new Float32Array(this.motionRes*4); 
	if(dir == true){
		p.motionDirArray = new Float32Array(this.motionRes*2); 
	}
}

ParticleActor.spawnAtModelPoint = function(actor, p, spawnFunc, angleOffset){
	return spawnFunc(actor.x+p.x*actor.scale, actor.y+p.y*actor.scale,actor.z+p.z*actor.scale, 
	quat.getRotZ(p.q) +actor.rotZ+angleOffset);
}

ParticleActor.SpawnSmoke = function(x,y,z,angle){
	if(Math.random()*150 < ParticleActor.Counters_Visible[ParticleActor.family_gunSmoke] ){
		return false;
	}
	var d = new ParticleActor(x,y,z, ParticleActor.family_gunSmoke);
	d.model = new ParticleModel(4, angle);
	d.model.init();
	if(Math.random() < 0.5){ //we can also set a chance for volatility
		d.isVolatile = true;
	}
	Actors.push(d);
	return true;
}

ParticleActor.SpawnPistolSmoke = function(x,y,z,angle){
	var d = new ParticleActor(x,y,z, ParticleActor.family_generic);
	d.model = new ParticleModel(3, angle);
	d.model.constSize = 1;
	d.isVolatile = true;
	d.model.init();
	d.ageLimit = 40;
	
	Actors.push(d);
	
	return true;
}

ParticleActor.SpawnStructureSmoke = function(x,y,z,angle){
	var d = new ParticleActor(x,y,z, ParticleActor.family_generic);
	d.model = new ParticleModel(6, angle);
	d.model.consistency = 0.25;
	d.model.constSize = 3;
	d.model.growth = 10;
	d.model.randomSize = 0.5;
	d.isVolatile = true;
	d.model.init();
	d.ageLimit = 100;
	d.age_speed = 1.4;
	d.texture = Asset.texture.smoke ;
	
	d.alphaBlended = true;
	d.unlit = true;
	
	Actor.SpawnRocketExplosion(x,y,z,1,0.1);
	Actors.push(d);
	return d;
}

ParticleActor.SpawnGreenExplosion = function(x,y,z,angle){
	var a = Actor.SpawnRocketExplosion(x,y,z,0.6,0.1);
	a.texture= Asset.texture.projectiles2;
	a.animCollection= Anim.GreenExplosionAnim;
	a.startAnimation(Anim.stand);
	return a;
}
ParticleActor.SpawnSmallExplosion = function(x,y,z,angle){
	var a = ParticleActor.SpawnGreenExplosion(x,y,z,angle);
	a.texture= Asset.texture.projectiles;
	return a;
}

ParticleActor.SpawnCannonSmoke = function(x,y,z,angle){
	var d = new ParticleActor(x,y,z, ParticleActor.family_generic);
	d.model = new ParticleModel(7, angle);
	d.model.horizontalSpeed = 1.6;
	d.model.constSize = 4;
	d.model.init();
	
	
	d.expansionTime = 35;
	d.expansionPower = 16;
	d.ageLimit = 100;
	Actors.push(d);
	return true;
}
 
ParticleActor.SpawnDebris = function(x,y,z,angle, scale){
	var a = Actor.SFXActor(Asset.model.cannonDebris, M.terrain.getDebrisTextureAt(x,y) , Anim.CannonDebrisAnim, 30);
	a.x = x; a.y = y; a.z = z;
	a.rotZ = Math.random()*6.28;
	a.hasShadow = true;
	a.shadowModel = a.model;
	a.shadowShader = ShaderProgram.shadow_animatedShader;
	a.shadowZOffset = -0.1;
	if(scale !== void 0){
		a.scale *= scale;
	}
	Actors.push(a);
	return true;
}

ParticleActor.SpawnCannonDebris = function(x,y,z,angle){
	var d = new ParticleActor(x,y,z, ParticleActor.family_generic);
	d.model = new ParticleModel(4, angle);
	d.model.horizontalSpeed = 1;
	d.model.verticalSpeed = 1.9;
	d.model.verticalSpeedVariation = 2;
	d.model.constSize = 4;
	d.model.randomSize = 4;
	d.model.init();
	
	d.expansionTime = 20;
	d.expansionPower = 16;
	d.ageLimit = 50;
	d.texture_default = d.texture = Asset.texture.dust;
	Actors.push(d);
	
	SoundObject.crumble.play(x-cam.pos[0], y-cam.pos[1]);
	
	ParticleActor.SpawnDebris(x,y,z,angle);
	
	Node.makeBendExplosion(x, y, 2.5);
	return true;
}

ParticleActor.SpawnFallingDust = function(x,y,z,angle){
	var d = new ParticleActor(x,y,z, ParticleActor.family_generic);
	d.model = new ParticleModel(3, angle);
	d.model.horizontalSpeed = 0;
	d.model.horizontalSpeedVariation = 2;
	d.model.verticalSpeed = 1.5;
	d.model.verticalSpeedVariation = 1;
	d.model.constSize = 2;
	d.model.randomSize = 1.5;
	d.model.init();
	
	
	d.expansionTime = 10;
	d.expansionPower = 10;
	d.ageLimit = 20;
	d.texture_default = Asset.texture.dust;
	d.texture = d.texture_default;
	Actors.push(d);
	return true;
}

ParticleActor.SpawnBombDebris = function(x,y,z,angle){
	ParticleActor.SpawnCannonDebris(x,y,z,angle);
	//DecalActor.SpawnScorch(x,y);
	return true;
}

ParticleActor.SpawnSmallBombDebris = function(x,y,z,angle){
	ParticleActor.SpawnFallingDust(x,y,z,angle);
	ParticleActor.SpawnDebris(x,y,z,angle, 0.75);
	SoundObject.hit_melee.playAt(x,y);
	//Node.makeBendExplosion(x,y,2);
	//DecalActor.SpawnScorch(x,y,0.7);
	return true;
}



ParticleActor.SpawnSparks = function(x,y,z,angle){
	var a = Actor.SFXActor(Asset.model.bloodsplatter, Asset.texture.sparks, Anim.BloodsplatterAnim , 12);
	a.x = x; a.y = y; a.z = z;
	a.rotZ = -1.57-angle;
	//a.shaderProgram = ShaderProgram.standard_glowmapShader;
	a.shaderProgram = ShaderProgram.waveShader;
	a.renderLayer = 3;
	a.opacity = 1;
	Actors.push(a);
	return true;
}

ParticleActor.SpawnShotgunSmoke = function(x,y,z,angle){
	ParticleActor.SpawnSmoke(x,y,z,angle);
	ParticleActor.SpawnSparks(x,y,z,angle);
	var a=Actor.SpawnReflect(null, -1.57-angle);
	a.x = x;
	a.y = y;
	a.z = z;
}

ParticleActor.SpawnSpritz = function(x,y,z,angle){
	var d = new ParticleActor(x,y,z, ParticleActor.family_generic);
	d.model = new ParticleModel(3, angle);
	d.model.verticalSpeed = 1.5;
	d.model.verticalSpeedVariation = 1.2;
	d.model.horizontalSpeed = 0;
	d.model.stretch_z = 1.6;
	d.model.constSize = 1.5;
	d.model.consistency = 0.1;
	d.isVolatile = true;
	d.model.init();
	d.ageLimit = 30;
	
	d.expansionPower = 30;
	d.expansionTime = 25;
	d.unlit = true;
	d.baseOpacity = 1;
	d.texture =d.texture_default = Asset.texture.splash;
	Actors.push(d);
	return true;
}

ParticleActor.SpawnWaterExplosion = function(x,y,z,angle){
	var d = new ParticleActor(x,y, M.terrain.getWaterAt(x,y), ParticleActor.family_generic);
	d.model = new ParticleModel(6, angle);
	d.model.verticalSpeed = 1.5;
	d.model.verticalSpeedVariation = 1.3;
	d.model.horizontalSpeed = 0;
	d.model.stretch_z = 1.7;
	d.model.randomSize = 2;
	d.model.constSize = 4;
	d.model.angleVariation = 1.3;
	d.model.consistency = 0.4;
	d.isVolatile = true;
	d.model.init();
	d.ageLimit = 50;
	
	
	d.expansionPower = 30;
	d.expansionTime = 40;
	d.unlit = true;
	d.texture =d.texture_default = Asset.texture.splash_big;
	d.baseOpacity = 2;
	Actors.push(d);
	
	var r = Actor.RippleActor(x,y,0,1);
	r.scale = 1;
	r.growth = 0.05;
	Actors.push(r);
	r=Actor.RippleActor(x,y,10,0.65);
	r.growth = 0.045;
	r=Actor.RippleActor(x,y,20,0.5);
	r.growth = 0.04;
	Actors.push(r);
	for(var i=0;i<5;++i){
		r=Actor.RippleActor(x+Math.random()*4-2,y+Math.random()*4-2,Math.random()*20,1);
		Actors.push(r);
	}
	
	SoundObject.bigsplash.play(x-cam.pos[0], y-cam.pos[1]);
	
	Node.makeBendExplosion(x, y, 2.5);
	
	return true;
}
  

ParticleActor.SpawnSplash = function(x,y,z,angle){
	ParticleActor.SpawnSpritz(x,y,z,angle)
	//water rings
	var r = Actor.RippleActor(x,y,0,1);
	r.scale = 0.5;
	Actors.push(r);
	Actors.push(Actor.RippleActor(x,y,20,0.8));
	SoundObject.splash.play(x-cam.pos[0], y-cam.pos[1]);
	return true;
}
 
ParticleActor.SpawnSpitMark = function(x,y,z,angle){
	DecalActor.SpawnSpit(x,y);
	SoundObject.bleed.play(x-cam.pos[0], y-cam.pos[1]);
	var a = Actor.SFXActor(Asset.model.cannonDebris, Asset.texture.spit , Anim.CannonDebrisAnim, 30);
	a.x = x; a.y = y; a.z = z;
	a.rotZ = Math.random()*6.28;
	a.hasShadow = false;
	a.scale = 0.5;
	Actors.push(a);
	return true;
}
ParticleActor.SpawnBloodSpitMark = function(x,y,z,angle){
	DecalActor.SpawnSmallBlood(x,y, BloodType.Red);
	SoundObject.bleed.play(x-cam.pos[0], y-cam.pos[1]);
	var a = Actor.SFXActor(Asset.model.cannonDebris, Asset.texture.bloodspit , Anim.CannonDebrisAnim, 30);
	a.x = x; a.y = y; a.z = z;
	a.rotZ = Math.random()*6.28;
	a.hasShadow = false;
	a.scale = 0.5;
	Actors.push(a);
	return true;
}
 

ParticleActor.SpawnUnitRipple = function(x,y, heroWave){
	if(heroWave == false && ParticleActor.Counters_Visible[ParticleActor.family_unitRipple]>Math.random()*30){
		return false;
	}
	var r = Actor.RippleActor(x,y,0,1);
	r.scale = 0.4;
	Actors.push(r);
	if(heroWave == true){//spawn a second one
		Actors.push(Actor.RippleActor(x,y,20,0.8));
	}else{
		r.visFamily = ParticleActor.family_unitRipple;
	}
	return true;
}

ParticleActor.SpawnBloodSplat = function(x,y,z,angle){
	var d = new ParticleActor(x,y,z, ParticleActor.family_generic);
	d.model = new ParticleModel(4, angle );
	d.model.angleVariation = 0.6;
	d.model.verticalSpeed = 0.6;
	if(Math.random() < 0.2){
		d.model.verticalSpeed  = 2;
	}
	d.model.verticalSpeedVariation = 1;
	d.model.horizontalSpeed = -0.1;
	//d.model.stretch_z = 1.5;
	d.model.constSize = 0.12;
	d.model.randomSize = 0.23;
	d.model.consistency = 0;
	//d.isVolatile = true;
	d.model.init();
	d.ageLimit = 100;
	
	d.expansionPower = 0;
	d.expansionTime = 0;
	d.age_speed = 1;
	d.gravity = 0.5;
	//d.unlit = true;
	d.baseOpacity = 3;
	d.texture =d.texture_default = Asset.texture.blood_particle;
	Actors.push(d);
	return d;
}

ParticleActor.SpawnGlassShards = function(x,y,z,angle){
	var d = new ParticleActor(x,y,z, ParticleActor.family_generic);
	d.model = new ParticleModel(15, angle );
	d.model.angleVariation = 2;
	d.model.verticalSpeed = 0.5;
 
	d.model.verticalSpeedVariation = 1.5;
	d.model.horizontalSpeed = -0.5;
	d.model.horizontalSpeedVariation = 0.3;
	
	d.model.constSize = 0.2;
	d.model.randomSize = 0.4;
	d.model.consistency = 0;
	//d.isVolatile = true;
	d.model.spread_x = 5;
	d.model.spread_y = 5;
	d.model.init();
	d.ageLimit = 100;
	
	d.expansionPower = 0;
	d.expansionTime = 0;
	d.age_speed = 1;
	d.gravity = 1;
	d.baseOpacity = 1;
	d.texture =d.texture_default = Asset.texture.glass_shard;
	SoundObject.glass_break.playAt(x, y );
	Actors.push(d);
	return d;
}


ParticleActor.SpawnBulletSmoke = function(x,y,z,angle){
	var d = new ParticleActor(x,y,z, ParticleActor.family_generic);
	d.model = new ParticleModel(4, angle );
	d.model.angleVariation = 0.;
	d.model.verticalSpeed = 0.6;
	d.model.verticalSpeedVariation = 0.6;
	d.model.horizontalSpeed = -0.1;
	d.model.constSize = 0.1;
	d.model.randomSize = 0.35;
	d.model.consistency = 0.4;
	//d.isVolatile = true;
	d.model.init();
	d.ageLimit = 100;
	
	d.expansionPower = 4;
	d.expansionTime = 20;
	d.age_speed = 0.75;
	d.gravity = 0;
	//d.unlit = true;
	d.baseOpacity = 1;
	d.texture =d.texture_default = Asset.texture.smoke;
	d.alphaBlended = true;
	Actors.push(d);
	return d;
}


ParticleActor.SpawnTest = function(x,y,z,angle){
	var d = new ParticleActor(x,y,z, ParticleActor.family_generic);
	ParticleActor.setDynamic(d, false);
	if(Projectiles[Projectiles.length-1]){
		d.baseActor = Projectiles[Projectiles.length-1].actor;
	}
	//d.baseActor = Gamestats.Hero.weapon.actor;
	//d.motion_speed = 10;
	//d.motion_drag = 0.9;
	//d.baseActor_attachmentId = 0;
	d.model = new ParticleModel(30, angle);
	d.model.verticalSpeed = 0.1;
	d.model.verticalSpeedVariation = 0.3;
	d.model.horizontalSpeed = -0.2;
	d.model.horizontalSpeedVariation = 0.2;
	d.model.randomSize = 0.1;
	d.model.constSize = 0.1;
	d.model.consistency = 1;
	d.model.angleVariation = 1;
	d.model.init();
	d.ageLimit = -1;
	d.gravity = 0.01;
	d.expansionPower = 0;
	d.expansionTime = 0;
	d.baseOpacity = 0.7;
	d.growth = 4;
	d.age_speed = 1.5;
	d.alphaBlended = true;
	d.unlit = true;
	
	Actors.push(d);
	return d;
}
ParticleActor.SpawnRedTrail = function(x,y,z,angle){
	var d = ParticleActor.SpawnTest(x,y,z,angle);
	d.texture = Asset.texture.smoke_red;
	d.growth = 10;
	return d;
}
ParticleActor.SpawnGreenTrail = function(x,y,z,angle){
	var d = ParticleActor.SpawnRedTrail(x,y,z,angle);
	d.texture = Asset.texture.smoke_green;
	return d;
}

ParticleActor.SpawnGrapple = function(x,y,z,angle){
	var p = Projectiles[Projectiles.length-1];
	var endActor = p.caster == Gamestats.Hero ? p.caster.weaponActor : p.caster.actor;
	var rope = RopeActor.Spawn(endActor, p.actor, 0.1);
	rope.isGrappleRope = true;
	rope.model = Asset.model.rope2;
	rope.texture = Asset.texture.rope;
	rope.concave = true;
}
/*ParticleActor.SpawnTest = function(x,y,z,angle){
	var d = new ParticleActor(x,y,z, ParticleActor.family_generic);
	ParticleActor.setDynamic(d, false);
	d.baseActor = Projectiles[Projectiles.length-1].actor;
	
	d.model = Asset.model.test_ribbon;
	d.texture =d.texture_default = Asset.texture.white;
	
	d.ageLimit = -1;
	d.gravity = 0.01;
	d.expansionPower = 0;
	d.expansionTime = 0;
	d.baseOpacity = 0.7;
	d.growth = 0;
	d.age_speed = 1.5;
	
	Actors.push(d);
	
	return true;
}*/