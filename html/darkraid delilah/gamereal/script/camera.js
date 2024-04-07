function Camera(_pos, _isTarget){
	this.pos_ref = [_pos[0], _pos[1], _pos[2]];
	this.pos = [_pos[0], _pos[1], _pos[2]];
	this.eyePos =[ 0,0,0];
	this.mousePos_ref = [0,0];
	this.mousePos = [0,0];
	this.mouseOffsetFactor = 1;
	this.pitch = 0;
	this.yaw = 0;
	this.roll = 0;
	this.roll_motion_tilt = 0;
	this.fov = 1;
	this.isTarget = _isTarget;
	this.distance = 12;
	this.distance_inGame_default = 0;
	this.distance_inGame = this.distance_inGame_default;
	this.inv_PV_Matrix = mat4.create();
	this.far = this.far_default = 64;
	this.near_default = 0.1;
	this.near = this.near_default;
	this.targetUnit = null;
	this.targetPoint = null;
	this.change_time = 50;
	this.change_counter = 0;
	this.pos_last = [0,0,0];
	this.dist_last = 50;
	this.yaw_last = 0;
	this.pitch_last = 0;
	//this.z_to_xy_factor = 1.3;//ZYKLON
	this.zoomDelta = 0;
	this.damping = 0.05;
	this.mouseLook = true;
	this.shearPitch = true; //use for 2.5d camera projection
	this.sensitivity_x = 0.005;
	this.sensitivity_y = this.sensitivity_x;
	this.recoil_force_yaw = 0;
	this.recoil_force_pitch = 0;

	this.headbob = 0;
	this.headbob_phase = 0;
	
	this.bound_bottom = 0; this.bound_left = 0;
	this.bound_top = 64; this.bound_right = 64;
	
	this.pitch_default = 1.57;
	this.yaw_default = 0;
	this.distance_default = 10;
	this.setDefaultParams = function(){
		this.far = this.far_default;
		this.near = 0.3;
		this.fov = 1.15;
		this.yaw = this.yaw_default;
		this.pitch = this.pitch_default;//0.947;
		this.distance = this.distance_default;
		//this.distance_inGame = this.distance;
		Render.shadowBoxSizeMultiplier = 1;
	}
	this.mouse_update = function(dx,dy){
		var xFac = this.sensitivity_x;
		var yFac = this.sensitivity_y;
		if(Control.invertMouseY){dy=-dy;}
		if(this.shearPitch){
			yFac *= Math.abs(Math.cos(this.pitch-1.57));
			if(Math.abs(this.pitch - dy*yFac -1.57) > 1 || Math.abs(this.pitch -1.57) > 1){
				yFac = this.sensitivity_y * 0.1;
			}
			this.pitch = Math.max(0.44,Math.min(2.7,this.pitch - dy*yFac ));
		}else{
			this.pitch = Math.max(0,Math.min(3.1415,this.pitch - dy*yFac ));
		}
		this.yaw = (this.yaw+dx*xFac)%6.283;
	}
	
	this.shakeOffset = [0,0,0];
	
	this.checkBounds = function(){
		var boundCorner_r = rayCastScreen(GUI.clipToPixelX(1),0,0);
		var boundCorner_l = rayCastScreen(GUI.clipToPixelX(-1),0,0);
		var boundCorner_t = rayCastScreen(0,GUI.clipToPixelY(-1),0);
		var boundCorner_b = rayCastScreen(0,GUI.clipToPixelY(1),0);
		var bound_r = this.bound_right+boundCorner_r[0]-this.pos[0];
		var bound_l = this.bound_left-(boundCorner_l[0]-this.pos[0]);
		var bound_t = this.bound_top-(boundCorner_t[1]-this.pos[1]);
		var bound_b = this.bound_bottom+boundCorner_b[1]-this.pos[1];
		this.pos_ref[0] = Math.max(bound_l,Math.min(bound_r,this.pos_ref[0]));
		this.pos_ref[1] = Math.max(bound_b,Math.min(bound_t,this.pos_ref[1]));
	}
	
	this.scroll = function(scrollX, scrollY){
		var newX = this.pos_ref[0]+scrollX;
		var newY = this.pos_ref[1]+scrollY;
		
		var boundCorner = rayCastScreen(0,GUI.clipToPixelY(1),0);
		var bound_t = this.bound_top-(boundCorner[1]-this.pos[1]);
		var bound_b = this.bound_bottom+(boundCorner[1]-this.pos[1]);
		var bound_r = this.bound_right+(boundCorner[0]-this.pos[0]);
		var bound_l = this.bound_left-(boundCorner[0]-this.pos[0]); 
				
		var dx = Math.min(bound_r, Math.max(bound_l,newX)) - this.pos_ref[0];
		var dy = Math.min(bound_t, Math.max(bound_b,newY)) - this.pos_ref[1];
		
		this.pos_ref[0] +=dx;
		this.pos_ref[1] +=dy;
		
		this.pos[0] +=dx;
		this.pos[1] +=dy;
	}
	
	this.followTargetUnit = function(){
		this.distance = this.distance_inGame;
		this.near = this.near_default;
		this.headbob *= 0.98;
		if(this.targetUnit != null){
			
			//why not just read the coords from the actor? because we must know them before actor.update_drawloop()
			var delta = Actor.frameInterpMultiplier*Render.frameDelta;
			this.pos_ref[0] += this.targetUnit.dx * delta;
			this.pos_ref[1] += this.targetUnit.dy * delta;
			this.pos_ref[2] += this.targetUnit.dz * delta;
			
			this.roll = this.roll_motion_tilt;
			
			if(this.targetUnit.last_floor_collider){
				this.yaw += this.targetUnit.last_floor_collider.d_angle * Actor.frameInterpMultiplier*Render.frameDelta;
			}
			if(this.targetUnit.moving){
				this.headbob = Math.min(this.headbob + 0.001*Render.frameDelta, 0.15);
				this.headbob_phase += this.headbob*5;
			}
			
			this.pos[0] = this.pos_ref[0];
			this.pos[1] = this.pos_ref[1];
			this.pos[2] = this.pos_ref[2] + Math.sin(this.headbob_phase ) * this.headbob;
			
		}
	}
	
	this.followTargetPoint = function(){
		this.change_counter = Math.min(this.change_counter + Render.frameDelta, this.change_time);
		var factor = this.change_counter/this.change_time;
		this.pos_ref[0] = Utils.LERP1(factor, this.pos_last[0],this.targetPoint.x);
		this.pos_ref[1] = Utils.LERP1(factor, this.pos_last[1],this.targetPoint.y);
		this.pos_ref[2] = Utils.LERP1(factor, this.pos_last[2],this.targetPoint.z);
		this.distance = Utils.LERP1(factor, this.dist_last,this.targetPoint.distance);
		
		if(this.yaw_last - this.targetPoint.yaw < -3.1415){
			this.yaw = Utils.LERP1(factor, this.yaw_last+6.283, this.targetPoint.yaw);
		}else if(this.yaw_last - this.targetPoint.yaw > 3.1415){
			this.yaw = Utils.LERP1(factor, this.yaw_last, this.targetPoint.yaw+6.283);
		}else{
			this.yaw = Utils.LERP1(factor, this.yaw_last, this.targetPoint.yaw);
		}
		
		this.pitch = Utils.LERP1(factor, this.pitch_last, this.targetPoint.pitch);
		
		this.pos[0] =this.pos_ref[0];
		this.pos[1] =this.pos_ref[1];
		this.pos[2] =this.pos_ref[2];
	}
	
	this.gameloop = function(){
		if(Control.gameState == Control.gameState_inGame && !Control.gamePaused){
			if(this.targetUnit != null){
				this.pos[0] =this.pos_ref[0] = this.targetUnit.actor.x ;
				this.pos[1] =this.pos_ref[1] = this.targetUnit.actor.y ;
				this.pos[2] =this.pos_ref[2] = this.targetUnit.actor.z  + this.targetUnit.eyeZ;
			}
		}
	}
	
	this.loop = function(){
		
		if(Control.gameState == Control.gameState_inGame && !Control.gamePaused){
			if(this.targetPoint){
				this.followTargetPoint();
			}else{
				//this.distance_inGame = this.distance_inGame_default;
				this.followTargetUnit();
			}	
		}else{
			this.roll = 0;
		}
		
		this.pitch += this.recoil_force_pitch;
		this.yaw += this.recoil_force_yaw;
		this.recoil_force_pitch *= 0.8;
		this.recoil_force_yaw *= 0.8;
		
		this.pos[0] += (this.pos_ref[0]-this.pos[0])*this.damping;
		this.pos[1] += (this.pos_ref[1]-this.pos[1])*this.damping;
		this.pos[2] += (this.pos_ref[2]-this.pos[2])*this.damping;
		
		if(!this.targetPoint){
			if(Control.gameState == Control.gameState_inGame){
				this.distance += (this.distance_inGame - this.distance)*0.1;
			}
		}
		
		//this.near = Math.max(2, this.distance/3);
		//this.far = Math.max(100, this.distance*2);
		
		this.updateEyePos();
	}
	
	this.apply_point = function(p, time){
		this.targetPoint  = p;
		this.change_time = Math.max(0.01, time);
		this.change_counter = 0;
		this.dist_last = this.distance;
		this.yaw_last = this.yaw;
		this.pitch_last = this.pitch;
		this.pos_last[0]=this.pos[0];
		this.pos_last[1]=this.pos[1];
		this.pos_last[2]=this.pos[2];
		
		if(this.targetPoint){
			this.followTargetPoint();
		}
		
	}
	
	this.shake = function(ampl, angle){
		this.pos[0] += Math.cos(angle) * ampl;
		this.pos[1] += Math.sin(angle) * ampl;
	}
	
	this.updateEyePos = function(){
		if(this.isTarget == true){
			vec3.set(this.eyePos, 0,0,this.distance);
			var v = [0,0,this.distance];
			vec3.rotateX(this.eyePos,this.eyePos,[0,0,0],this.pitch);
			vec3.rotateZ(this.eyePos,this.eyePos,[0,0,0],-this.yaw);
			vec3.add(this.eyePos,this.eyePos,this.pos);
		}else{
			vec3.copy(this.pos, this.eyePos);
		}		
	}
	
	this.getEyePos = function( inout ){
		if(this.isTarget == true){
			var v = [0,0,this.distance];
			vec3.rotateX(v,v,[0,0,0],this.pitch);
			vec3.rotateZ(v,v,[0,0,0],-this.yaw);
			vec3.add(v,v,this.pos);
			return v;
		}
		return [this.pos[0], this.pos[1], this.pos[2]];
	}

	this.getEyePos_customAngle = function(_yaw, _pitch){
		if(this.isTarget == true){
			var v = [0,0,this.distance];
			vec3.rotateX(v,v,[0,0,0], _pitch);
			vec3.rotateZ(v,v,[0,0,0], _yaw);
			vec3.add(v,v,this.pos);
			return v;
		}
		return [this.pos[0], this.pos[1], this.pos[2]];
	}
	
	this.setBoundsToMapSize = function(){
		this.bound_top = M.height;
		this.bound_bottom = 0;
		this.bound_right = M.width ;
		this.bound_left = 0;
	}	
	this.setBounds = function(){
		this.bound_top = M.cam_bound_top ;
		this.bound_bottom = M.cam_bound_bottom ;
		this.bound_right = M.cam_bound_right ;
		this.bound_left = M.cam_bound_left ;
	}	
	this.zoom_ZYKLON = function(zoomVal){
		this.zoomDelta -= zoomVal;
	}
	
	this.setPos = function(x,y,z){
		this.pos[0] = this.pos_ref[0] = x;
		this.pos[1] = this.pos_ref[1] = y;
		this.pos[2] = this.pos_ref[2] = z;
	}
	this.setPos_with_bounds = function(x,y,z){
		this.scroll(x-this.pos_ref[0],y-this.pos_ref[1]);
	}
	
	this.recoil = function(val_pitch, val_yaw){
		this.recoil_force_pitch += val_pitch;
		this.recoil_force_yaw += val_yaw;
	}
	
	this.LevelStart = function(){
		this.targetPoint = null;
		this.setDefaultParams();
	}
}
