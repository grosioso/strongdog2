var Environment = new Object();
Environment.gravity = 1;
Environment.backgroundColor = [0.4,0.4,0.4];
Environment.fogColor = [0.62,0.68,0.75];
Environment.fogStart = 50;
Environment.fogStart_ref = 50;
Environment.fogLength = 55;

Environment.skyColor = [0.3,0.45,0.55];
Environment.groundColor_base = [-3,-2,-1];
Environment.groundColor = [1,1,1];
Environment.localLight = [3,1.5,0.3];

Environment.fillColor = [0,0,0];
Environment.lightPosition = [-0.7,-0.2,0.8];
Environment.fillPosition = [0.95,0,-0.3]//[0.7,-0.4,-0.05];
Environment.ambientColor = [0.18,0.25,0.35];
Environment.lightColor = [1.1,1,0.86];
Environment.lightColor_backup = [0,0,0];
Environment.fillGrassFactor = 0.4;
Environment.fillGrassBonus = 0.075;

Environment.detailWindOffset = 0;
Environment.windStrength = 1;
Environment.windStrength_ref = 1;
Environment.windPhase = 0;
Environment.windPhase_ref = 0;
Environment.windVector = [0,0,0];

Environment.fireColor = [1,1,1];
Environment.envTexture = null;
Environment.cloudTexture = null;
Environment.cloudOffset = [0,0];
Environment.cloudStrength = 1;
Environment.cloudOpacity = 1;
Environment.cloudColor = [0.2,0.3,0.4,1];
Environment.cloudColor_skyReflection = null;
Environment.skyActor = null;
Environment.cloudSecondLayerScale = 0.75;
Environment.cloudSecondLayerOpacity = 0.5;
Environment.cloudSecondLayerSpeed = 0.5;
//used for maps where distant parts can be visible
Environment.shadowBoxCustomScale = 1;
Environment.shadowBoxOffset = [0,0,0];

//Environment.saturation = 1;

Environment.fogZColor = [0.92,0.8,0.63, 0.5]; //alpha controls the shadow effect of the height fog
//water refraction does not recieve shadow from the surface height fog, which leads to edges on the shore.
//A hack has been implemented in water_fs, in the form of refracZFogShadowEffect
//A real solution would be to use a separate overlay texture for underwater, with the shadow channel containing both cloud and fog shadows
Environment.fogZStart = 0;
Environment.fogZLength = 1;
Environment.fogZTexture = null;
Environment.fogZOffset = [0,0];
Environment.fogZStrength = 1;
Environment.fogZOpacity = 1;
Environment.fogZSecondLayerScale = 0.75;
Environment.fogZSecondLayerOpacity = 0.5;
Environment.fogZSecondLayerSpeed = 0.15;
Environment.fogZSpeed = 0.063;
Environment.fogZDir = 0.785;
Environment.fogZConsistency = 16;

Environment.waterFogZColor = [-0.7,0.05,0.2, 0]; //water
Environment.waterZ = 0;
Environment.waterFogZStart = 0;
Environment.waterFogZLength = 4;
Environment.waterColor = [0.1,0.4,0.6, 0.]; //this could replace groundColor in floatingShader
Environment.waterTint = [0.84,1.35,1.23];
Environment.waterWaviness = 4;
Environment.shoreFactor = 1.4;
Environment.waterReflectionDistortion = 7;
Environment.waterRefractionDistortion = 4;
Environment.waterReflection = 0.5;
Environment.waterFresnel = 0.4;
Environment.waterShortening = 0.76;

Environment.waterPhase = 0;
Environment.waterOffset = [0,0];
Environment.shoreWavePhase = 0;
Environment.waveOpacity = 0.4;
Environment.tintLayerTransparency = 0;
Environment.waterGroups = [];

Environment.rainCounter = 0;
Environment.raining = false;
Environment.snowing = false;
Environment.thunder = false;
Environment.thunderCounter = 0;
Environment.thunderMoment = 0;
Environment.rainPeriod = 30;
Environment.muzzle_light_time = 0;
Environment.skyTexture = null;
Environment.skyOffset = [0,0];
Environment.skyId = 0;

Environment.init = function(){
	Environment.shoreWavePhase = -1;
	Environment.rainCounter = -1;
	Environment.detailWindOffset = 0;
	Environment.windVector = [1,1,0];
	Environment.windStrength = 0;
	Environment.windStrength_ref = 0.2;
	Environment.windPhase = 0;
	Environment.windPhase_ref = 0;
	Environment.cloudTexture = Asset.texture.cloudLayer;
	Environment.cloudStrength = 0.9;
	Environment.cloudOpacity = 1.1;
	Environment.skyTexture = Asset.texture.sky;
	Environment.skyId = 0;
	
	Environment.fogZTexture = Asset.texture.overlayFog;
	Environment.fogZStrength = 1.;
	Environment.fogZOpacity = 1.;
	Environment.fogZSecondLayerScale = 3;
	Environment.fogZSecondLayerSpeed = 0.2;
	Environment.fogZDir = 0.4;
	Environment.fogZSpeed = 0.2;
	Environment.waterOffset = [0,0];
	Environment.skyActor = Actor.SkyActor();
	
	Environment.lightColor_backup = Environment.lightColor.slice();
}

Environment.Reset = function(){
	Environment.fogZStrength = 1.;
	Environment.fogZOpacity = 1.;
	Environment.fogZSecondLayerScale = 3;
	Environment.fogZSecondLayerSpeed = 0.2;
	Environment.fogZDir = 0.4;
	Environment.fogZSpeed = 0.2;
	Environment.waterOffset = [0,0];
	
	Environment.shadowBoxCustomScale = 1;
	Environment.shadowBoxOffset = [0,0,0];
}

Environment.Update_Gameloop = function(){
	Environment.shoreWavePhase ++;
	this.muzzle_light_time = Math.max(0, this.muzzle_light_time - 1);
	if(this.muzzle_light_time > 0){
		this.fillColor[0] = Math.min(48, 16* this.muzzle_light_time);
	}else{
		this.fillColor[0] = 0;
	}
	
	//Environment.lightPosition[0] = -Math.sin(cam.yaw)*Math.sin(cam.pitch);
	//Environment.lightPosition[1] = -Math.cos(cam.yaw)*Math.sin(cam.pitch);
	//Environment.lightPosition[2] = Math.cos(cam.pitch);
	
	if(Environment.snowing){
		var rainConstructor = Actor.SnowfallActor;
		Environment.rainPeriod = 100;
	}else{
		var rainConstructor = Actor.RainActor;
		Environment.rainPeriod = 50;
	}
	if(Environment.raining == true || Environment.snowing == true){
		if(this.rainCounter == 0 || this.rainCounter == Environment.rainPeriod ){
			Actors.push(rainConstructor(~~(cam.pos[0]/10-0.5)*10, ~~(cam.pos[1]/10-0.5)*10));
			Actors.push(rainConstructor(~~(cam.pos[0]/10+0.5)*10, ~~(cam.pos[1]/10+0.5)*10));
		}
		if(this.rainCounter == 10 || this.rainCounter == Environment.rainPeriod+10 ){
			Actors.push(rainConstructor(~~(cam.pos[0]/10+0.5)*10, ~~(cam.pos[1]/10-0.5)*10));
			Actors.push(rainConstructor(~~(cam.pos[0]/10-0.5)*10, ~~(cam.pos[1]/10+0.5)*10));
		}
		this.rainCounter ++;
		if(this.rainCounter >= Environment.rainPeriod*2){
			this.rainCounter = 0;
		}
		if(Render.drawEffects && Environment.raining){
			for(var i=0;i<10;++i){
				var posX = cam.pos[0]+Math.random()*16-8;
				var posY =  cam.pos[1]+Math.random()*16-8;
				if(M.terrain.getCloudMaskAt(posX,posY)>50 &&
				posX > 0 && posY > 0 && posX < M.width && posY < M.height){
					var a =Actor.RainSplash(posX , posY)
					Actors.push(a);
				}
			}
		}
	}
	
	if(Environment.thunder){
		this.thunderCounter --;
		if(this.thunderCounter <= 0){
			this.thunderCounter = ~~(Math.random()*500+50);
			this.lightColor[0]=this.lightColor_backup[0];
			this.lightColor[1]=this.lightColor_backup[1];
			this.lightColor[2]=this.lightColor_backup[2];
			this.thunderMoment = ~~(this.thunderCounter - Math.random()*50);
		}else if(this.thunderCounter < 5){
			Utils.smooth_decay_3(this.lightColor, this.lightColor_backup, 0.85);
		}else if(this.thunderCounter < 30){
			var rand = (Math.random()*this.thunderCounter*0.1 -0.95)*0.4;
			this.lightColor[0]=Math.max(this.lightColor_backup[0],this.lightColor[0]+rand);
			this.lightColor[1]=Math.max(this.lightColor_backup[1],this.lightColor[1]+rand);
			this.lightColor[2]=Math.max(this.lightColor_backup[2],this.lightColor[2]+rand);
		}else{
			this.lightColor_backup[0]=this.lightColor[0];
			this.lightColor_backup[1]=this.lightColor[1];
			this.lightColor_backup[2]=this.lightColor[2];
		}
		if(this.thunderCounter == this.thunderMoment){
			SoundObject.thunder.play((Math.random()-0.5)*15, (Math.random()-0.5)*15);
		}
	}else{
		this.lightColor_backup[0]=this.lightColor[0];
		this.lightColor_backup[1]=this.lightColor[1];
		this.lightColor_backup[2]=this.lightColor[2];
	}
}

Environment.Update_Drawloop = function(){
	Environment.skyTexture = Asset.SKIES[Environment.skyId] || Asset.texture.sky;
	Environment.fogStart = Environment.fogStart_ref*cam.distance/53;
	//choose these parameters well. a slow phase will result in stretching, a fast phase will result in short period. Only applies ot flowing water
	Environment.waterPhase += Environment.windStrength * 0.01 * Render.frameDelta;
	Environment.waterOffset[0] = 2;
	Environment.waterOffset[1] = 2;
	
	Environment.cloudOffset[0] += Environment.windStrength * 0.05 * Render.frameDelta;
	Environment.cloudOffset[1] += Environment.windStrength * 0.05 * Render.frameDelta;
	
	Environment.fogZOffset[0] += Math.cos(Environment.fogZDir)*Environment.windStrength * Environment.fogZSpeed* Render.frameDelta;
	Environment.fogZOffset[1] += Math.sin(Environment.fogZDir)*Environment.windStrength *Environment.fogZSpeed* Render.frameDelta;
	
	Environment.groundColor[0] = Environment.groundColor_base[0]*(Environment.lightColor[0] + Environment.ambientColor[0]);
	Environment.groundColor[1] = Environment.groundColor_base[1]*(Environment.lightColor[1] + Environment.ambientColor[1]);
	Environment.groundColor[2] = Environment.groundColor_base[2]*(Environment.lightColor[2] + Environment.ambientColor[2]);
	
	
	var stren = Environment.windStrength;
	Environment.detailWindOffset += 0.2 * Render.frameDelta * stren;
	Environment.windPhase_ref += (Math.random()-0.5)*0.25 * Render.frameDelta *stren;
	var phase_error = Environment.windPhase_ref-Environment.windPhase ;
	Environment.windPhase += phase_error * 0.1;
	
	if(Environment.windPhase_ref > Math.PI*2){
		Environment.windPhase_ref -= Math.PI*2;
		Environment.windPhase -= Math.PI*2;
	}else if(Environment.windPhase_ref < 0){
		Environment.windPhase_ref += Math.PI*2;
		Environment.windPhase += Math.PI*2;
	}
	
	var strength_error = Environment.windStrength_ref-Environment.windStrength ;
	Environment.windStrength += strength_error * 0.01;
	
	if(Environment.detailWindOffset > Math.PI*2){
		Environment.detailWindOffset -= Math.PI*2;
	}

	
	Environment.windVector = [Math.sin(Environment.windPhase)*stren*0.3 + stren,Math.cos(Environment.windPhase)*stren*0.3 +stren,0];
	vec3.normalize(Environment.lightPosition,Environment.lightPosition);
	vec3.normalize(Environment.fillPosition,Environment.fillPosition);
}

Environment.world_move_update = function(offX, offY){
	Environment.detailWindOffset += offX+offY;
}

Environment.getSunAngle = function(){
	return Math.atan2(this.lightPosition[0], this.lightPosition[1]);
}
Environment.getSunPitch = function(){
	return Math.atan2(this.lightPosition[2],Math.sqrt(this.lightPosition[0]*this.lightPosition[0]+ this.lightPosition[1]*this.lightPosition[1]));
}
Environment.getShadowLength = function(){
	return Math.sqrt(this.lightPosition[0]*this.lightPosition[0]+ this.lightPosition[1]*this.lightPosition[1])/this.lightPosition[2];
}
Environment.getNormalizedLightZ = function(){
	var p = this.lightPosition;
	var l = Math.sqrt(p[0]*p[0]+p[1]*p[1]+p[2]*p[2]);
	return p[2]/l;
}
Environment.setAzimuth = function(light, angle){
	var len = Math.sqrt(light[0]*light[0]+light[1]*light[1]);
	light[0]=Math.cos(angle)*len;
	light[1]= Math.sin(angle)*len;
}
Environment.setElevation = function(light, angle){
	var rad = Math.sqrt(light[0]*light[0]+light[1]*light[1]+light[2]*light[2]);
	var fi = Math.atan2(light[1], light[0]);
	var sn = Math.sin(angle); var cs = Math.cos(angle);
	light[0] = rad*sn*Math.cos(fi);
	light[1] = rad*sn*Math.sin(fi);
	light[2] = rad*cs;
}

function WaterGroup( _id, _name){
	this.id = _id;
	this.name = _name;
	this.z = 0;
	this.fogZColor = [-0.7,0.05,0.2, 0]; //water
	this.fogZStart = 0;
	this.fogZLength = 4;

	this.color = [0.1,0.4,0.6, 0.]; //this could replace groundColor in floatingShader
	this.tint = [0.84,1.35,1.23];
	this.glossiness = 15;
	this.waviness = 4;
	this.shoreFactor = 1.4;
	this.reflectionDistortion = 7;
	this.refractionDistortion = 4;
	this.reflection = 0.55;
	this.fresnel = 0.45;
	this.shortening = 0.76; //things appear shorter underwater
	this.rippleOpacity = 1;
	this.hasVisiblePart = false;
	
	this.setAsCurrent = function(){
		Environment.waterFogZColor = this.fogZColor;
		Environment.waterZ = this.z;
		Environment.waterFogZStart = this.fogZStart;
		Environment.waterFogZLength = this.fogZLength;
		Environment.waterColor = this.color;
		Environment.waterTint = this.tint;
		Environment.waterWaviness = this.waviness;
		Environment.shoreFactor = this.shoreFactor;
		Environment.waterReflectionDistortion = this.reflectionDistortion;
		Environment.waterRefractionDistortion = this.refractionDistortion;
		Environment.waterReflection = this.reflection;
		Environment.waterFresnel = this.fresnel;
		Environment.waterShortening = this.shortening;
	}
}
