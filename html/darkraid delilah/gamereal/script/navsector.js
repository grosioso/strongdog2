//a sector of triangles, across all colliders
//used for triggers and doors/elevators
function NavSector(id){
	this.id = id;
	this.last_use_time = -1;
	this.last_shot_time = -1;
	this.use_triggered_textures = false;
	this.effect = null;
	this.zOffset = 0;
	this.dz = 0;
	this.zOffset_goal = 0;
	this.zOffset_speed = 0.03;
	this.doorZ = 0;
	this.use_condition_id = 0;
	this.monsters_can_use = false;
	this.isGlass = false;
	this.close_time = 200;
	this.close_counter = 0;
	this.in_update_list = false;
	this.triangleList = [];
	this.texOffX =0;
	this.texOffY =0;
}
NavSector.List = [];
NavSector.UpdateList = [];
NavSector.prototype.elevate = function(goalZ, speed){
	this.zOffset_goal = goalZ;
	this.zOffset_speed = speed;
	if(!this.in_update_list){
		this.wake_up();
	}
}
NavSector.prototype.wake_up = function(){
	this.in_update_list = true;
	NavSector.UpdateList.push(this);
}

NavSector.prototype.check_use_condition = function(){
	switch(this.use_condition_id){
		case -1: return false;
		case 0: return true;
		case 1:
		if(Gamestats.Keycards[0]){ return true;	
		}else{
			GUI.Alert("RED Hand required to use!", true);
			return false;
		}
		case 2:
		if(Gamestats.Keycards[1]){ return true;	
		}else{
			GUI.Alert("GREEN Hand required to use!", true);
			return false;
		}
		case 3:
		if(Gamestats.Keycards[2]){ return true;	
		}else{
			GUI.Alert("BLUE Hand required to use!", true);
			return false;
		}
		default:
		return true;
	}
}
NavSector.prototype.onUse = function(){
	if(this.check_use_condition()){
		this.last_use_time = Gamestats.mapTime + 2;
		this.use_triggered_textures = true;
		if(this.doorZ && this.zOffset == 0){
			this.elevate(this.doorZ, 0.03);
			this.close_counter = this.close_time;
			this.playSound(SoundObject.gate, 0.8);
		}else if(this.triangleList[0].matId == WALL.switch_gilded.matId){
			this.playSound(SoundObject.button);
		}
	}
}

NavSector.prototype.onShot = function( x,y,z, triangle, collider, decalSize ){
	if(this.id > 0 && triangle.matId == WALL.glass_window.matId){
		if(this.last_shot_time <= 0){
			this.last_shot_time = Gamestats.mapTime + 2;
			var shards = ParticleActor.SpawnGlassShards(x,y,z, triangle.get_angle_2d());
			shards.floor_triangle = triangle;
			this.use_triggered_textures = true;
			//let bullets through once window is broken
			for(var i=0;i<this.triangleList.length;++i){
				if(this.triangleList[i].matId == WALL.glass_window.matId){
					this.triangleList[i].ignore_raycast = true;
				}
			}
		}
	}else{
		Actor.SpawnWallDecal(x,y,z,collider,triangle, decalSize );
		var smoke = ParticleActor.SpawnBulletSmoke(x,y,z, 1.57-cam.yaw);
		smoke.floor_triangle = triangle;
	}
}

NavSector.prototype.update = function(){
	this.dz = 0;
	var diff = Math.abs(this.zOffset-this.zOffset_goal);
	if(diff>0){
		var tickDist = Math.min(diff, this.zOffset_speed);
		var tickOffset = Math.sign(this.zOffset_goal-this.zOffset)*tickDist;
		this.dz = tickOffset;
		this.apply_z_offset(tickOffset);
		if(this.zOffset == this.zOffset_goal){ //arrival
			this.playSound(SoundObject.gate_stop);
		}
	}else{
		if(this.doorZ && this.zOffset){
			if(this.close_time > 0){
				if(this.close_counter > 0){
					this.close_counter --;
				}else{
					if(this.zOffset_goal != 0){ //start closing
						this.playSound(SoundObject.gate_close, 0.8);
					}
					this.zOffset_goal = 0;
				}
			}
		}
	}
}

NavSector.prototype.apply_z_offset = function(amt){
	this.zOffset += amt;
	for(var i=0;i<this.triangleList.length;++i){
		var tri = this.triangleList[i];
		var amt_tri = amt * tri.color[2] ; //door Bias is coded in blue vertex channel
		tri.center[2] += amt_tri;
		tri.corners[0][2] += amt_tri;
		tri.corners[1][2] += amt_tri;
		tri.corners[2][2] += amt_tri;
		
		tri.bound_z_max += amt_tri;
		tri.bound_z_min += amt_tri;
		
		tri.getPlaneEquation();
	}
}
 
NavSector.prototype.playSound = function(sound, pitch){
	pitch = pitch || 1;
	if(this.triangleList.length > 0){
		var tri = this.triangleList[0];
		var tri_last = this.triangleList[this.triangleList.length-1];
		//approximate center of sector with average of first and last triangle 
		var sourceCoord = [ 
		(tri.center[0]+tri_last.center[0])/2,
		(tri.center[1]+tri_last.center[1])/2,
		(tri.center[2]+tri_last.center[2])/2];
		
		var seg = tri.builderSegment;
		if(seg){
			var sourceActor = seg.parentMesh.actor_instance;
			if(sourceActor){
				var globalPoint = NavNode.localToGlobal_3d(sourceCoord, sourceActor, sourceCoord); 
				sound.playAt(sourceCoord[0], sourceCoord[1], pitch);
			}
		}
	}
}

NavSector.prototype.addTriangle = function(tri){
	this.triangleList.push(tri);
}
NavSector.prototype.unlink_triangle = function(tri){
	this.triangleList.splice(this.triangleList.indexOf(tri));
}
NavSector.getById = function(id){
	id = Math.max(0, Math.min(id, this.List.length)) >> 0;
	return this.List[id];
}
NavSector.LevelStart = function(){
	this.List = [];
	this.UpdateList = [];
	for(var i=0;i<50;++i){
		this.List[i] = new NavSector(i);
	}
}
NavSector.reset_all = function(){
	for(var i=0;i<this.List.length;++i){
		var sec = this.List[i];
		sec.last_use_time = -1;
		sec.last_shot_time = -1;
		sec.use_triggered_textures = false;
	}
}
NavSector.getSaveData = function(){
	var data = [];
	for(var i=0;i<this.List.length;++i){
		var sec = this.List[i];
		data[i] = [sec.id, sec.doorZ, sec.texOffX, sec.texOffY, sec.use_condition_id];
	}
	return data;
}
NavSector.loadSaveData = function(arr){
	for(var i=0;i<arr.length;++i){
		var dat = arr[i];
		var sec = this.List[dat[0]];
		sec.doorZ = dat[1];
		sec.texOffX = dat[2];
		sec.texOffY = dat[3];
		sec.use_condition_id = dat[4] || 0;
	}
}
NavSector.get_first_unused = function(){
	for(var i=1;i<this.List.length;++i){
		if(this.List[i].triangleList.length == 0){
			return i;
		}
	}
	return 0;
}
NavSector.get_unused_secret = function(){
	var len = 32;
	var exist_bitmask = new Uint8Array(len);
	for(var i=0;i<BuilderModel.list.length;++i){
		var bm = BuilderModel.list[i];
		for(var j=0;j<bm.segments.length;++i){
			if(bm.segments[j].secretId){
				exist_bitmask[bm.segments[j].secretId] = 1;
			}
		}
	}
	for(var i=0;i<len;++i){
		if(exist_bitmask[i] == 0){
			return i;
		}
	}
	return len+1;
}

NavSector.get_secret_count = function(){
	var len = 32;
	var exist_bitmask = new Uint8Array(len);
	for(var i=0;i<BuilderModel.list.length;++i){
		var bm = BuilderModel.list[i];
		for(var j=0;j<bm.segments.length;++j){
			if(bm.segments[j].secretId){
				exist_bitmask[bm.segments[j].secretId] = 1;
			}
		}
	}
	var count = 0;
	for(var i=0;i<len;++i){
		if(exist_bitmask[i] == 1){
			count++;
		}
	}
	return count;
}