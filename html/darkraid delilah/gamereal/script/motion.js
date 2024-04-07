Actor.MOTIONS = [];
Actor.MOTIONS[0] = function(){}
Actor.MOTIONS[1] = function(){
	//this.not_floor = true;
	var phase = Gamestats.mapTime % 270;
	if(phase < 35){
		if(this.z > -4.5){
			this.dz = -0.125;
		}
		if(phase == 30){
			SoundObject.crumble.playAt(this.x,this.y,0.7);
		}
	}else if(phase > 60){
		if(phase == 66){
			SoundObject.gate.playAt(this.x,this.y,0.5);
		}
		if(this.z < 0){
			this.dz = 0.025;
		}
	}
}
Actor.MOTIONS[2] = function(){
	if(NavSector.List[1].last_use_time > 0 && this.rotY < 1.57){
		this.d_rotY = 0.02;
	}
}
Actor.MOTIONS[3] = function(){
	var goalX = 31.25;
	if(this.x < goalX){
		this.dx = 0.01 + 0.004*(goalX - this.x);
	}else{
		this.dx = 0;
	}
}

Actor.get_motion_function = function(id){
	return Actor.MOTIONS[id] || Actor.MOTIONS[0];
}