function LightDecal(_size, _intensity, _decay, _isVolatile){
	this.x = 0;
	this.actor = null;
	this.offsetY = 0;
	this.y = 0;
	this.angle = 0;
	this.size = _size;
	this.intensity_ref = _intensity;
	this.decay = _decay;
	this.intensity = _intensity;
	this.visible = true;
	this.isVolatile = _isVolatile; //volatile means that if it is not visible, it will disappear immediately. Only use for fast effects
	this.texture = Asset.texture.light_muzzle;
	this.aoLayer = -1;
	//this.texture = Textures[18];
	
	this.checkVisibility = LightDecal.checkVisibility;
}

LightDecal.prototype.update = function(){
	this.checkVisibility();
	
	if(this.actor != null){
		this.x = this.actor.x;
		this.y = this.actor.y;
		this.angle = -this.actor.rotZ;
		if(this.offsetY){
			this.x -= Math.sin(this.angle)*this.offsetY;
			this.y += Math.cos(this.angle)*this.offsetY;
		}
	}
	
	this.intensity += (this.intensity_ref-this.intensity)*this.decay*Render.frameDelta;
	if(Math.abs(this.intensity - this.intensity_ref) < 0.01){
		this.intensity = this.intensity_ref;
	}
	if(this.actor == null){
		this.intensity_ref = 0;
	}
	if(this.intensity + this.intensity_ref <= 0.01){
		this.remove();
	}else if(this.isVolatile == true && this.visible == false){
		this.remove();
	}
}

LightDecal.prototype.moveTo = function(xx,yy){
	this.x = xx;
	this.y = yy;
}
LightDecal.prototype.remove = function(){
	if(this.actor != null){
		if(this.actor.lightsource == this){
			this.actor.lightsource = null;
		}
		this.actor = null;
	}
	var id = LightDecals.indexOf(this);
	if(id>=0){
		LightDecals.splice(LightDecals.indexOf(this),1);
	}
}
LightDecal.prototype.addToActor = function(actor){
	this.actor = actor;
	actor.lightsource = this;
}
LightDecal.prototype.detachFromActor = function(){
	this.moveTo(this.actor.x, this.actor.y);
	this.actor.lightsource = null;
	this.actor = null;
}

LightDecal.checkVisibility = function(){
	if(Math.abs(this.x - cam.pos[0]) > 20 || Math.abs(this.y - cam.pos[1]) > 20){
		this.visible = false;
	}else{
		if(this.actor && this.actor.owner){
			this.visible = this.actor.visible;
		}else{
			this.visible = true;
		}
	}
	
}

LightDecal.checkVisibility_AO = function(){
	return Render.drawUnitAO;
}

LightDecal.Create = function(_size, _intensity, _decay){
	var li = new LightDecal(_size, _intensity, _decay, false);
	LightDecals.push(li);
	return li;
}
LightDecal.Create_Volatile = function(_size, _intensity, _decay){
	var li = new LightDecal(_size, _intensity, _decay, true);
	LightDecals.push(li);
	return li;
}
//AO decals are NOT added to lightdecals array, they can only be bound to units
LightDecal.Create_Unit_AO = function(u){
	if(u.proto.aoLayer == 0){
		u.actor.ao_lightsource = new LightDecal(u.proto.aoSize, 1, 0.07, false);
		u.actor.ao_lightsource.texture = Asset.texture.ao;
	}else{
		u.actor.ao_lightsource = new LightDecal(u.proto.aoSize, 1, 0.07, false);
		u.actor.ao_lightsource.texture = Asset.texture.ao2;
	}
	u.actor.ao_lightsource.actor = u.actor;
	u.actor.ao_lightsource.intensity = 0;
	u.actor.ao_lightsource.aoLayer = u.proto.aoLayer;
	u.actor.ao_lightsource.checkVisibility = LightDecal.checkVisibility_AO;
	//LightDecals.push(u.actor.lightsource);
}

LightDecal.PosArray = new Float32Array(12);
LightDecal.PosBuffer;
LightDecal.AO_Max_Count = 200;
LightDecal.AOPosArray1 = new Float32Array(12* LightDecal.AO_Max_Count);
LightDecal.AOPosArray2 = new Float32Array(12* LightDecal.AO_Max_Count);
LightDecal.AOPosBuffer1;
LightDecal.AOPosBuffer2;
LightDecal.AOCount1 = 0;
LightDecal.AOCount2 = 0;
LightDecal.AOTexArray = new Float32Array(12* LightDecal.AO_Max_Count);
LightDecal.AOTexBuffer;
LightDecal.AO_update_switch = 0;

LightDecal.Init_AO_Buffer = function(){
	this.PosArray[0] = -0.5;
	this.PosArray[1] = 0.5;
	this.PosArray[2] = -0.5;
	this.PosArray[3] = -0.5;
	this.PosArray[4] = 0.5;
	this.PosArray[5] = -0.5;
	this.PosArray[6] = 0.5;
	this.PosArray[7] = -0.5;
	this.PosArray[8] = 0.5;
	this.PosArray[9] = 0.5;
	this.PosArray[10] = -0.5;
	this.PosArray[11] = 0.5;
		
	for(var i=0;i<this.AOTexArray.length;i+=12){
		this.AOTexArray[i] = 0;
		this.AOTexArray[i+1] = 0;
		this.AOTexArray[i+2] = 1;
		this.AOTexArray[i+3] = 0;
		this.AOTexArray[i+4] = 0;
		this.AOTexArray[i+5] = 1;
		this.AOTexArray[i+6] = 0;
		this.AOTexArray[i+7] = 1;
		this.AOTexArray[i+8] = 1;
		this.AOTexArray[i+9] = 0;
		this.AOTexArray[i+10] = 1;
		this.AOTexArray[i+11] = 1;
	}
	LightDecal.PosBuffer = gl.createBuffer();
	LightDecal.AOPosBuffer1 = gl.createBuffer();
	LightDecal.AOPosBuffer2 = gl.createBuffer();
	LightDecal.AOTexBuffer = gl.createBuffer();
	
	gl.bindBuffer(gl.ARRAY_BUFFER,LightDecal.PosBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, LightDecal.PosArray ,gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER,LightDecal.AOTexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, LightDecal.AOTexArray ,gl.STATIC_DRAW);
	
	gl.bindBuffer(gl.ARRAY_BUFFER,LightDecal.AOPosBuffer1);
	gl.bufferData(gl.ARRAY_BUFFER, LightDecal.AOPosArray1 ,gl.DYNAMIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER,LightDecal.AOPosBuffer2);
	gl.bufferData(gl.ARRAY_BUFFER, LightDecal.AOPosArray2 ,gl.DYNAMIC_DRAW);
	
}

LightDecal.Update_AO_Buffer = function(){
	/*if(LightDecal.AO_update_switch < 3){
		LightDecal.AO_update_switch++;
		return;
	}
	LightDecal.AO_update_switch = 0;*/
	
	this.AOCount1 = 0; 
	this.AOCount2 = 0; 
	var li = null; 
	var xx =0; var yy= 0;
	var size = 0;
	var gridPerBuf = Pathfinder.FOW_Texture_Size;
	var texPos = Pathfinder.FOW_last_update_pos;
	var idx = 0; var arr;
	
	for(var i=0;i<Visible_Actors.length;++i){
		if(this.AOCount >= this.AO_Max_Count){ break; }
		li = Visible_Actors[i].ao_lightsource;
		if(li && li.aoLayer >= 0){
			li.update();
			xx = (-texPos[0]*2 + li.x*2)/gridPerBuf;
			yy = (-texPos[1]*2 + li.y*2)/gridPerBuf;
			size = li.size/gridPerBuf * 0.5 * li.intensity; 
			
			if(li.aoLayer == 0 && this.AOCount1 < this.AO_Max_Count){
				idx = this.AOCount1*12;
				this.AOCount1 ++;
				arr = this.AOPosArray1;
			}else if(li.aoLayer == 1 && this.AOCount2 < this.AO_Max_Count){
				idx = this.AOCount2*12;
				this.AOCount2 ++;
				arr = this.AOPosArray2;
			}else{
				continue;
			}
			
			arr[idx] = xx - size;
			arr[idx+1] = yy - size;
			arr[idx+2] = xx + size;
			arr[idx+3] = yy - size;
			arr[idx+4] = xx - size;
			arr[idx+5] = yy + size;
			arr[idx+6] = xx - size;
			arr[idx+7] = yy + size;
			arr[idx+8] = xx + size;
			arr[idx+9] = yy - size;
			arr[idx+10] = xx + size;
			arr[idx+11] = yy + size;
		}
	}
	gl.bindBuffer(gl.ARRAY_BUFFER,LightDecal.AOPosBuffer1);
	gl.bufferData(gl.ARRAY_BUFFER, LightDecal.AOPosArray1 ,gl.DYNAMIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER,LightDecal.AOPosBuffer2);
	gl.bufferData(gl.ARRAY_BUFFER, LightDecal.AOPosArray2,gl.DYNAMIC_DRAW);
}
