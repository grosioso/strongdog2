function QuoteSet(sel,move,attack,birth){
	this.selected = sel;
	this.move = move;
	this.attack = attack;
	this.birth = birth;
	
	this.selected.randomPlay = true;
	this.selected.canInterrupt = true;
	this.move.randomPlay = true;
	this.move.canInterrupt = true;
	this.attack.randomPlay = true;
	this.attack.canInterrupt = true;
	this.birth.randomPlay = true;
	//don't stop the other quotes, let it play in parallel
	this.birth.canInterrupt = false;
}
QuoteSet.prototype.on_selected = function(u){
	return this.selected.play_quote();
}
QuoteSet.prototype.on_move = function(u){
	if(! this.selected.isPlaying()){
		return this.move.play_quote();
	}
	return false;
}
QuoteSet.prototype.on_attack = function(u){
	return this.attack.play_quote();
}
QuoteSet.prototype.on_birth = function(u){
	return this.birth.play_quote();
}
QuoteSet.lastPlayedObject = null;
QuoteSet.lastPlayedInstance = null;

function SoundObject(_instanceArray,_volume, _decay, _randomPitch){
	if(_decay === void 0){_decay = 600}
	if(_randomPitch === void 0){_randomPitch = 0}
	this.minDistances = [];
	this.sourceEntities = [];
	this.soundInstances = [];
	this.numInstances = _instanceArray.length;
	this.canInterrupt = false;
	this.randomPlay  = false;
	this.always_update_stereo = false;
	this.objectVolume = _volume;
	this.objectVolume_default = _volume;
	this.decayDistance = _decay;
	this.randomPitch = _randomPitch;
	this.constantPitch = 1;
	this.numOfPlaysLastTick = 0;
	this.numOfLoudPlaysLastTick = 0;
	this.maxPlaysInOneTick = this.numInstances;
	this.minTicksBetweenPlays = 0;
	this.ticksSinceLastPlay = 0;
	this.lastPlayedIndex = 0;
	this.maxVolumeThisTick = 0;
	this.multi_variant = null; //if a LOT of instances are played at the same time, we play this combined sound instead 
	this.distant_variant = null;
	this.loud_volume_treshold = 0.5;
	this.child = null;
	this.instance_interrupt_condition = null;
	this.looping = false;
	this.much_louder_when_near = false;
	
	for(var i=0;i<this.numInstances;++i){
		var newSoundInstance = new Howl({
			src:[_instanceArray[i].src],
			loop:this.looping,
			volume:this.objectVolume,
			pool:0
			});
		this.soundInstances[i] = newSoundInstance;
		this.minDistances[i]= -1;
		this.sourceEntities[i]=null;
	}
	
	SoundObjects[SoundObjects.length] = this;
}

SoundObject.prototype.setLooping = function(trueOrFalse){
	this.looping = trueOrFalse;
	for(var i=0;i<this.numInstances;++i){
		this.soundInstances[i].loop(trueOrFalse);
	}
}

SoundObject.prototype.play_basic = function(){
	this.soundInstances[0].stop();
	if(frameMS != 16){
		this.soundInstances[0].rate(16/frameMS);
	}
	this.soundInstances[0].play();
}

SoundObject.prototype.play_quote = function(){
	//if(frameMS != 16){return false;}
	var id = 0;
	if(!this.isPlaying()){
		if(this.soundInstances.length > 0){
			id = Math.floor(this.soundInstances.length * Math.random()*0.9999);
			if(id == this.lastPlayedIndex){
				id = (id+1)%this.soundInstances.length
			}
		}
		if(QuoteSet.lastPlayedObject != this && QuoteSet.lastPlayedObject.canInterrupt){
			QuoteSet.lastPlayedInstance.stop();
		}
		this.soundInstances[id].volume(this.objectVolume * SoundObject.portraitVolume);
		this.soundInstances[id].play();
		QuoteSet.lastPlayedInstance = this.soundInstances[id];
		QuoteSet.lastPlayedObject = this;
		this.lastPlayedIndex = id;
		return true;
	}
	return false;
}

SoundObject.prototype.play_by_object = function(u,pitchFactor){
	var inst = this.playAt(u.x, u.y, pitchFactor);
	if(inst){
		inst.last_player_object = u;
	}
}

SoundObject.prototype.playAt = function(xx,yy, pitchFactor, customVolume){
	xx -= cam.pos[0];
	yy -= cam.pos[1];
	var offX_rotated = xx*Math.cos(cam.yaw)-yy*Math.sin(cam.yaw);
	var offY_rotated = xx*Math.sin(cam.yaw)+yy*Math.cos(cam.yaw);
	return this.play(offX_rotated , offY_rotated , pitchFactor, customVolume);
}
SoundObject.prototype.play_dispatch = function(){
	if(SoundObject.currentVoice && SoundObject.currentVoice.playing()){
		this.setVolume(0.35);
	}else{
		this.setVolume(1);
	}
	this.play(0,0);
	this.canInterrupt = false;
}

SoundObject.prototype.play = function(offX, offY, pitchFactor, customVolume){
	if(pitchFactor === void 0){pitchFactor = 1}
	if(customVolume === void 0){customVolume = 1}
	pitchFactor *= 16/frameMS;
	var finalVolume =  (1 - (Math.abs(offX)+Math.abs(offY))/this.decayDistance) * this.objectVolume ;
	
	if(finalVolume < 0.3){
		if(this.distant_variant != null && Math.random()>finalVolume ){
			this.distant_variant.play(offX, offY);
			return;
		}
	}
	finalVolume *= customVolume;
	if(finalVolume <= 0){
		return;
	}
	this.maxVolumeThisTick = Math.max(this.maxVolumeThisTick, finalVolume);
	
	this.numOfPlaysLastTick++;
	if(finalVolume >= this.loud_volume_treshold){
		this.numOfLoudPlaysLastTick ++;
	}
	
	
	
	if(this.numOfPlaysLastTick>this.maxPlaysInOneTick){
		if(this.multi_variant != null && this.numOfLoudPlaysLastTick>=this.maxPlaysInOneTick){
			this.multi_variant.play(offX, offY);
			//this.numOfLoudPlaysLastTick-=this.maxPlaysInOneTick; //I don't know if this is a good idea..
		}
		
		//if 2 sounds start on the same tick, we play the louder one
		if(finalVolume > this.maxVolumeThisTick){
			this.soundInstances[this.lastPlayedIndex].volume(finalVolume);
		}
		
		return;
	}
	
	if(this.ticksSinceLastPlay < this.minTicksBetweenPlays){
		return;
	}
	
	
	this.ticksSinceLastPlay = 0;
	var maxTime = -1;
	var maxPos = -1;
	if(this.randomPlay == true){
		var tries = 2;
		var i = Math.floor(Math.random()*this.numInstances*0.9999);
		for(var tries=0;tries<2;++tries){
			if(this.soundInstances[i].playing() == false){
				maxPos = i; break;
			}
			i = (i+1)%this.numInstances;
		}
	}else{
		for(var i=0;i<this.numInstances;++i){
			var si = this.soundInstances[i];
			if(si.playing() == false || this.canInterrupt == true){
				maxPos = i;
				break;
			}
			if(si.seek() > maxTime && si.volume() < finalVolume*0.8){
				maxTime = si.seek();
				maxPos = i;
			}
		}
	}
	
	
	
	if(maxPos < 0){
		return;
	}
	this.soundInstances[maxPos].stop();
	if(this.randomPitch != 0 || pitchFactor != 1){
		this.soundInstances[maxPos].rate((1 +  (Math.random()-0.5) * this.randomPitch)*this.constantPitch*pitchFactor );
	}
	if(SoundObject.voicePlaying){
		finalVolume *= 0.2;
	}
	this.soundInstances[maxPos].volume( finalVolume );
	var stereoOffset = Math.max(-1 , Math.min(1 ,offX/5));
	this.soundInstances[maxPos].stereo(stereoOffset);
	this.soundInstances[maxPos].play();
	this.lastPlayedIndex = maxPos;
	this.soundInstances[maxPos].last_player_object = null;
	if(this.child != null){
		this.child.play(offX, offY, pitchFactor);
	}
	return this.soundInstances[maxPos];
}

SoundObject.prototype.stop = function(){
	for(var i=0;i<this.numInstances;++i){
		this.soundInstances[i].stop();
	}
}

SoundObject.prototype.pause = function(){
	for(var i=0;i<this.numInstances;++i){
		this.soundInstances[i].pause();
	}
}

SoundObject.prototype.resume = function(){
	for(var i=0;i<this.numInstances;++i){
		if(this.soundInstances[i].seek()>0){
			this.soundInstances[i].play();
		}
	}
}

SoundObject.prototype.isPlaying = function(){
	for(var i=0;i<this.soundInstances.length;++i){
		if( this.soundInstances[i].playing()){
			return true;
		}
	}
	return false;
}

SoundObject.prototype.stopInstance = function(_id){
	if(this.soundInstances[_id].playing()){
		this.soundInstances[_id].stop();
	}
}

SoundObject.prototype.setVolume = function(_volume){
	for(var i=0;i<this.numInstances;++i){
		this.soundInstances[i].volume(_volume * this.objectVolume_default);
	}
	this.objectVolume = _volume * this.objectVolume_default;
}

SoundObject.prototype.updateMinDistance = function(entity){
	var dist = distance_origin(entity.pos);
	for(var i=0;i<this.numInstances;++i){
		if(dist < this.minDistances[i] || this.minDistances[i] < 0){
			for(j=i;j<this.numInstances-1;++j){
				this.minDistances[j+1] = this.minDistances[j];
				this.sourceEntities[j+1] = this.sourceEntities[j];
			}
			this.minDistances[i] = dist;
			this.sourceEntities[i] = entity;
		}
	}
}

SoundObject.prototype.updateDistanceVolume = function(_id){
	this.soundInstances[_id].volume(this.objectVolume* Math.max(1-(this.minDistances[_id]/decayDistance),0));
}

SoundObject.prototype.setPitch = function(_rate){
	for(var i=0;i<this.numInstances;++i){
		this.soundInstances[i].rate(_rate);
	}
}
SoundObject.prototype.interrupt_check_loop = function(){
	for(var i=0;i<this.numInstances;++i){
		if(this.soundInstances[i].playing() && this.instance_interrupt_condition(this.soundInstances[i])){
			this.soundInstances[i].stop();
		}
	}
}
SoundObject.prototype.stereo_update = function(){
	for(var i=0;i<this.numInstances;++i){
		if(this.soundInstances[i].playing() && this.soundInstances[i].last_player_object){
			var xx  = this.soundInstances[i].last_player_object.x - cam.pos[0];
			var yy  = this.soundInstances[i].last_player_object.y - cam.pos[1];
			var offX_rotated = xx*Math.cos(cam.yaw)-yy*Math.sin(cam.yaw);

			var stereoOffset = Math.max(-1 , Math.min(1 ,offX_rotated/5));
			this.soundInstances[i].stereo(stereoOffset);
		}
	}
}

SoundObject.MainLoop = function(){
	for(var i=0;i<SoundObjects.length;++i){
		var so = SoundObjects[i];
		so.numOfPlaysLastTick = 0;
		so.numOfLoudPlaysLastTick = 0;
		so.ticksSinceLastPlay ++;
		so.maxVolumeThisTick = 0;
		if(so.instance_interrupt_condition){
			so.interrupt_check_loop();
		}
		if(so.always_update_stereo){
			so.stereo_update();
		}
	}
	
	SoundObject.updatePhonemeText();
	
	if(SoundObject.currentVoice && SoundObject.currentVoice.playing()){
		SoundObject.voicePlaying = true;
		if(QuoteSet.lastPlayedInstance){
			QuoteSet.lastPlayedInstance.volume(0.2);
		}
		Music.MultiplyCurrentVolume(0.4);
	}else{
		SoundObject.voicePlaying = false;
		//SoundObject.currentVoice = null;
		if(QuoteSet.lastPlayedInstance){
			QuoteSet.lastPlayedInstance.volume( QuoteSet.lastPlayedObject.objectVolume * SoundObject.portraitVolume );
		}
		Music.MultiplyCurrentVolume(1);
	}
	
	/*if(!M.isMenu){ //RTS, randomized playlist
		var music = Music.Tracks[Music.trackID];
		if(music){
			if(!music.playing()){
				Music.RandomTrack();
			}
		}
	}*/
}

SoundObject.PauseAll = function(){
	for(var i=0;i<SoundObjects.length;++i){
		SoundObjects[i].pause();
	}
}
SoundObject.ResumeAll = function(){
	for(var i=0;i<SoundObjects.length;++i){
		SoundObjects[i].resume();
	}
}
SoundObject.StopAll = function(){
	for(var i=0;i<SoundObjects.length;++i){
		SoundObjects[i].stop();
	}
}

SoundObject.SetMasterVolume = function(newVolume){
	/*for(var i =0;i<SoundObjects.length;++i){
		SoundObjects[i].setVolume(newVolume);
	}*/
	Howler.volume(newVolume);
	SoundObject.masterVolume = newVolume;
}
SoundObject.SetPortraitVolume = function(newVolume){
	SoundObject.portraitVolume = newVolume;
}

SoundObject.portraitVolume = 1;
SoundObject.masterVolume = 0.7;
SoundObject.Ambiences = [];
SoundObject.playAmbience = function(){
	for(var i=0;i<this.Ambiences.length;++i){
		this.Ambiences[i].stop();
	}
	if(M.ambienceId >= 0 ){
		//this.Ambiences[M.ambienceId].play_basic();
	}
}
SoundObject.Voices = [];
SoundObject.currentVoice = null;
SoundObject.voicePlaying = false;
SoundObject.playVoice = function(name){
	var clip = SoundObject.getVoiceByName(name);
	if(clip){
		SoundObject.currentVoice = clip;
		clip.play();
		return clip;
	}
	return null;
}

SoundObject.phonemeData = [[0.1,0.3],[0.75,0.5],[1,0.4],[2.2,0.5],[2,0.4],[2.5,0.5],[1.72,0.2],[2.8,0.15],[0,0.15],[0.65,0.4],[0.44,0.35],[1.2,0.3]];
SoundObject.currentPhonemeArray = [];
SoundObject.phonemeSpeed = 1;
SoundObject.phonemeProgress = -1;
SoundObject.phonemeSource = null;
SoundObject.phonemePitchVariation = 0.2;

SoundObject.updatePhonemeText = function(){
	if(this.phonemeProgress >= 0){
		
		if(this.phonemeProgress < this.currentPhonemeArray.length){
			var currentPhoneme = this.currentPhonemeArray[this.phonemeProgress];
			var dat = this.phonemeData[ currentPhoneme ];
			var phonemeTime = this.phonemeSource.seek();
			
			var phonemeEndTime = dat[0] + dat[1] * this.phonemeSpeed;
			if( phonemeTime > phonemeEndTime ){ //phoneme is over 
				this.phonemeProgress ++; //go to next phoneme or stop
				if(this.phonemeProgress < this.currentPhonemeArray.length){
					var currentPhoneme = this.currentPhonemeArray[this.phonemeProgress];
					var dat = this.phonemeData[ currentPhoneme  ];
					this.phonemeSource.seek(dat[0] + Math.random()*0.04);
					this.phonemeSource.rate( (Math.random()-0.5)*this.phonemePitchVariation + 1);
				}else{ //speech is over
					if(GUI.DialogPanel && GUI.DialogPanel.portrait && GUI.DialogPanel.portrait.portrait){
						GUI.DialogPanel.portrait.portrait.start(Portrait.idle);
						GUI.DialogPanel.portrait.speechTime = 0;
					}
					this.phonemeSource.stop();
					this.phonemeProgress = -1;
				}
			}
		}		
	}
}


SoundObject.startPhonemeText = function(_txt, speed){
	this.currentPhonemeArray = [];
	this.phonemeProgress = 0;
	this.phonemeSpeed = speed || 1;
	this.phonemeSpeechLength = 0;
	txt = _txt.toUpperCase();
	for(var i=0;i<txt.length;++i){
		var phoneme = -1;
		if(txt[i] == 'A'){
			phoneme = 0;
		}else if(txt[i] == 'R'){
			phoneme = 1;
		}else if(txt[i] == 'I'){
			phoneme = 2;
		}else if(txt[i] == 'O'){
			if(i%2 == 0){
				phoneme = 3;
			}else{
				phoneme = 11;
			}
		}else if(txt[i] == 'U'){
			phoneme = 4;
		}else if(txt[i] == 'Y'){
			phoneme = 5;
		}else if(txt[i] == 'T'){
			phoneme = 6;
		}else if(txt[i] == 'R'){
			phoneme = 7;
		}else if(txt[i] == 'S'){
			phoneme = 8;
		}else if(txt[i] == 'E'){
			if(i%2){
				phoneme = 9;
			}else{
				phoneme = 10;
			}
		}
		if(phoneme >= 0){
			this.currentPhonemeArray.push(phoneme);
		}
	}
	
	if(this.currentPhonemeArray.length <= 0){ //phonemization failed
		this.phonemeProgress = -1; //don't play anything
		return;
	}
	//start playing first phoneme
	var datId = this.currentPhonemeArray[0];
	var dat = this.phonemeData[ datId ];
	this.phonemeSource.seek(dat[0]);
	this.phonemeSource.play();
}

SoundObject.LevelStart = function(){
	if(this.currentVoice){
		this.currentVoice.stop();
	}
	this.currentVoice = null;
	this.voicePlaying = false;
	SoundObject.playAmbience();
	//Music.ChangeTrack(M.musicId);
	if(M.isMenu){
		Music.ChangeTrack(0);
	}else{
		Music.ChangeTrack(M.musicId);
		//Music.RandomTrack();
	}
}

SoundObject.Init = function(){
	var as = Asset.sound;
	SoundObjects = [];
	
	SoundObject.hit_melee = new SoundObject([as.hit1, as.hit2, as.hit3], 0.5, 40, 0.2);
	SoundObject.hit_melee.randomPlay = true;
	
	SoundObject.thump = new SoundObject([as.thump1], 0.7, 40, 0.3);
	SoundObject.hint = new SoundObject([as.hint2], 0.6, 40, 0.0);
	SoundObject.chat = SoundObject.hint;
	SoundObject.rescue = new SoundObject([as.hint], 0.7, 40, 0.0);
	SoundObject.controlPoint = SoundObject.rescue;
	SoundObject.mouseover  = new SoundObject([as.mouseover], 0.9, 40, 0.0);
	SoundObject.mouseover.canInterrupt = true;
	
	SoundObject.railgun = new SoundObject([as.railgun,as.railgun,as.railgun], 1, 40, 0.2);
	SoundObject.railgun.constantPitch = 0.75;
	SoundObject.laser = new SoundObject([as.laser,as.laser,as.laser], 0.7, 40, 0.2);
	SoundObject.laser.minTicksBetweenPlays = 2;
	SoundObject.laser_deep = new SoundObject([as.laser,as.laser], 0.9, 40, 0.2);
	SoundObject.laser_deep.constantPitch = 0.65;
	SoundObject.laser_deep.minTicksBetweenPlays = 4;
	SoundObject.plasmapistol = new SoundObject([as.plasmapistol ,as.plasmapistol,as.plasmapistol,as.plasmapistol  ], 0.8, 40, 0.1);
	//SoundObject.plasmapistol.constantPitch = 1.5;
	SoundObject.plasmapistol.minTicksBetweenPlays = 2;
	SoundObject.plasmagun = new SoundObject([as.plasmagun ,as.plasmagun ,as.plasmagun ,as.plasmagun ,as.plasmagun,as.plasmagun   ], 0.6, 40, 0.15);
	SoundObject.laser_high = new SoundObject([as.laser_high,as.laser_high,as.laser_high], 0.9, 40, 0.1);
	SoundObject.laser_high.minTicksBetweenPlays = 2;
	SoundObject.laser_high.constantPitch = 0.9;
	SoundObject.pistol = new SoundObject([as.pistol,as.pistol,as.pistol], 0.75, 40, 0.2);
	SoundObject.claw = new SoundObject([as.claw,as.claw ], 0.75, 40, 0.05);
	SoundObject.drill = new SoundObject([as.drill,as.drill], 0.2, 40, 0.15);
	SoundObject.drill.minTicksBetweenPlays = 3;
	SoundObject.repair = new SoundObject([as.repair], 1, 50, 0.05);
	SoundObject.repair.canInterrupt = true;
	SoundObject.repair_launch = new SoundObject([as.repair_launch], 1, 50, 0.05);
	SoundObject.hit_big = new SoundObject([as.hit_big,as.hit_big], 0.85, 50, 0.02);
	SoundObject.chomp = new SoundObject([as.chomp,as.chomp], 0.8, 30, 0.02);
	SoundObject.bite_zombie = new SoundObject([as.bite_zombie1,as.bite_zombie2], 0.8, 30, 0.02);
	SoundObject.bite_zombie.randomPlay = true;
	SoundObject.rocket = new SoundObject([as.rocket, as.rocket], 0.85, 50, 0);
	//SoundObject.thunder  = new SoundObject([as.thunder], 1, 40, 0.25);
	SoundObject.push  = new SoundObject([as.push,as.push], 1, 40, 0.1);
	SoundObject.push.constantPitch = 0.7;
	SoundObject.scream_ghoul = new SoundObject([as.scream_ghoul, as.scream_ghoul], 0.8,50,0.05);
	SoundObject.scream_ghoul.always_update_stereo = true;
	SoundObject.scream_ghoul.instance_interrupt_condition = function(inst){
		return inst.last_player_object&&(!inst.last_player_object.alive 
		|| inst.last_player_object.task&&inst.last_player_object.task.id==Task.id_StunTask)
	}
	
	SoundObject.scream_soul = new SoundObject([as.scream_soul, as.scream_soul], 1,50,0.05);
	SoundObject.scream_soul.always_update_stereo = true;
	
	SoundObject.death_human  = new SoundObject(
	[as.death_human1,as.death_human2,as.death_human3], 0.6, 40, 0.15);
	SoundObject.death_human.randomPlay = true;
	
	SoundObject.gate  = new SoundObject([as.gate ], 1, 40, 0 );
	SoundObject.gate_close  = new SoundObject([as.gate_close], 1, 40, 0 );
	SoundObject.gate_stop = new SoundObject([as.gate_stop], 1, 40, 0 );
	
	SoundObject.oof_cannon  = new SoundObject([as.oof_cannon, as.oof_cannon], 0.7, 40, 0.2);
	SoundObject.oof_human  = new SoundObject([as.oof_human1, as.oof_human2,as.oof_human3], 0.7, 40, 0.2);
	SoundObject.smoke_grenade  = new SoundObject([as.smoke_grenade], 0.75, 50, 0.1);
	SoundObject.shock  = new SoundObject([as.shock, as.shock, as.shock], 0.9, 40, 0.15);
	SoundObject.shock.minTicksBetweenPlays = 2;
	
	SoundObject.fireball  = new SoundObject([as.fireball,as.fireball2,as.fireball,as.fireball2], 1, 40, 0.1);
	SoundObject.fireball.randomPlay = true;
	SoundObject.fireball_hit  = new SoundObject([as.fireball_hit,as.fireball_hit], 1, 40, 0.1);
	SoundObject.death_building = new SoundObject([as.death_building], 0.8, 40, 0.05);
	SoundObject.death_building_small = new SoundObject([as.death_building], 0.6, 40, 0.05);
	SoundObject.death_building_small.constantPitch = 1.4;
	SoundObject.death_tank = new SoundObject([as.death_tank], 0.6, 40, 0.05);
	SoundObject.death_tank.canInterrupt = true;
	SoundObject.charge  = new SoundObject([as.charge,as.charge], 1, 40, 0.05);
	SoundObject.crumble  = new SoundObject([as.crumble, as.crumble], 0.9, 60, 0.2);
	SoundObject.death_missile  = new SoundObject([as.death_missile, as.death_missile], 1, 60, 0.2);
	SoundObject.death_missile.minTicksBetweenPlays = 15;
	SoundObject.shot_grenade = new SoundObject([as.shot_grenade,as.shot_grenade], 0.8,40,0.15);
	SoundObject.shot_arachnose = new SoundObject([as.shot_arachnose,as.shot_arachnose], 0.8,40,0.15);
	SoundObject.soulfire  = new SoundObject([as.soulfire], 1, 40, 0.05);
	SoundObject.soulfire.canInterrupt = true;
	
	SoundObject.shotgun = new SoundObject([as.shotgun], 0.65,30,0.05); 
	SoundObject.shotgun.minTicksBetweenPlays = 2;
	SoundObject.shotgun.canInterrupt = true;
	
	SoundObject.shotgun_enemy = new SoundObject([as.shotgun_enemy], 0.5,35,0.05); 
	
	SoundObject.ssg = new SoundObject([as.ssg ], 0.7,40,0.05); 
	SoundObject.ssg.canInterrupt = true;
	SoundObject.ak = new SoundObject([as.ak,as.ak,as.ak,as.ak,as.ak ], 0.45,40,0.1); 
	//SoundObject.ak.canInterrupt = true;
	
	SoundObject.minigun = new SoundObject([as.minigun,as.minigun,as.minigun,as.minigun,as.minigun,as.minigun,as.minigun,as.minigun], 1,40,0.05); 
	SoundObject.minigun.minTicksBetweenPlays = 2;
	//SoundObject.minigun.canInterrupt = true;
	
	SoundObject.whoosh = new SoundObject([as.whoosh  ], 0.65,40,0.05); 
	SoundObject.whoosh.minTicksBetweenPlays = 2;
	
	SoundObject.jump = new SoundObject([as.jump ], 0.65,40,0.08); 
	SoundObject.jump.constantPitch = 0.85;
	
	SoundObject.death_fallen = new SoundObject([as.death_fallen,as.death_fallen], 1,40,0.1);
	SoundObject.death_behemoth = new SoundObject([as.death_behemoth,as.death_behemoth], 0.8,40,0.1);
	SoundObject.death_skeleton = new SoundObject([as.death_skeleton,as.death_skeleton], 0.6,40,0.1);
	SoundObject.death_chomper = new SoundObject([as.death_chomper,as.death_chomper], 1,50,0.1);
	SoundObject.death_maniac = new SoundObject([as.death_maniac, as.death_maniac2 ], 0.6,40,0.1);
	SoundObject.death_maniac.randomPlay = true;
	SoundObject.death_rascal = new SoundObject([as.death_rascal,as.death_rascal ], 1,40,0.1);
	SoundObject.death_mangler = new SoundObject([as.death_mangler ], 0.8,40,0.1);
	SoundObject.death_succubus = new SoundObject([as.death_succubus,as.death_succubus ], 1,50,0.1);
	SoundObject.death_monk = new SoundObject([as.death_monk ], 1,40,0.1);
	SoundObject.death_outcast = new SoundObject([as.death_outcast, as.death_outcast2 ], 0.8,40,0.1);
	SoundObject.death_outcast.randomPlay = true;
	SoundObject.death_nose = new SoundObject([as.death_nose ], 0.8,40,0.1);
	
	SoundObject.oof_chomper = new SoundObject([as.oof_chomper,as.oof_chomper2], 1,40,0.1);
	SoundObject.oof_zombie = new SoundObject([as.oof_zombie2,as.oof_zombie], 0.85,40,0.1);
	SoundObject.oof_zombie.randomPlay = true;
	SoundObject.oof_fallen = new SoundObject([as.oof_fallen,as.oof_fallen], 0.8,40,0.1);
	SoundObject.oof_rascal = new SoundObject([as.oof_rascal1,as.oof_rascal2], 0.6,40,0.1);
	SoundObject.oof_rascal.randomPlay = true;
	SoundObject.oof_maniac = new SoundObject([as.oof_maniac,as.oof_maniac], 0.8,40,0.1);
	SoundObject.oof_succubus = new SoundObject([as.oof_succubus, as.oof_succubus2 ], 0.6,40,0.1);
	SoundObject.oof_succubus.randomPlay = true;
	SoundObject.oof_mangler = new SoundObject([as.oof_mangler, as.oof_mangler ], 1,40,0.1);
	SoundObject.oof_mangler.minTicksBetweenPlays = 4;
	SoundObject.oof_bathory = new SoundObject([as.oof_bathory, as.oof_bathory2,as.oof_bathory3 ], 1,40,0.05);
	SoundObject.oof_bathory.minTicksBetweenPlays = 5;
	SoundObject.oof_bathory.randomPlay = true;
	SoundObject.oof_bathory.constantPitch = 1.06;
	
	SoundObject.alert_zombie = new SoundObject([as.alert_zombie, as.alert_zombie2 ], 1,40,0.1);
	SoundObject.alert_zombie.constantPitch = 0.85;
	SoundObject.alert_zombie.randomPlay = true;
	SoundObject.alert_outcast = new SoundObject([as.alert_outcast, as.alert_outcast2 ], 0.75,40,0.1);
	SoundObject.alert_outcast.randomPlay = true;
	SoundObject.alert_rascal = new SoundObject([as.alert_rascal, as.alert_rascal2 ], 0.35,40,0.1);
	SoundObject.alert_rascal.randomPlay = true;
	SoundObject.alert_maniac = new SoundObject([as.alert_maniac, as.alert_maniac2  ], 1,40,0.1);
	SoundObject.alert_maniac.randomPlay = true;
	SoundObject.alert_chomper = new SoundObject([as.alert_chomper, as.alert_chomper ], 0.75,40,0.1);
	SoundObject.alert_monk = new SoundObject([as.alert_monk, as.alert_monk ], 1,50,0.1);
	SoundObject.alert_behemoth = new SoundObject([as.alert_behemoth, as.alert_behemoth ], 0.8,50,0.12);
	SoundObject.alert_mangler = new SoundObject([as.alert_mangler, as.alert_mangler ], 1,50,0.15);
	SoundObject.alert_nose = new SoundObject([as.alert_nose ], 1,50,0.1);
	SoundObject.alert_ghast = new SoundObject([as.alert_ghast,as.alert_ghast ], 1,40,0.1);
	
	SoundObject.chase_chomper  = new SoundObject([as.chase_chomper,as.chase_chomper2,as.chase_chomper3,as.chase_chomper4], 1,40,0.1);
	SoundObject.chase_chomper.randomPlay = true;
	SoundObject.chase_zombie  = new SoundObject([as.chase_zombie,as.chase_zombie2, as.chase_zombie3, as.chase_zombie4], 1,40,0.1);
	SoundObject.chase_zombie.randomPlay = true;
	SoundObject.chase_rascal  = new SoundObject([as.chase_rascal,as.chase_rascal2, as.chase_rascal3, as.chase_rascal4], 0.7,40,0.15);
	SoundObject.chase_rascal.minTicksBetweenPlays = 30;
	SoundObject.chase_rascal.randomPlay = true;
	SoundObject.chase_maniac = new SoundObject([as.chase_maniac,as.chase_maniac2,as.chase_maniac3,as.chase_maniac4], 1,40,0.1);
	SoundObject.chase_maniac.randomPlay = true;
	SoundObject.chase_outcast = new SoundObject([as.chase_outcast,as.chase_outcast2,as.chase_outcast3], 1,40,0.1);
	SoundObject.chase_outcast.randomPlay = true;
	SoundObject.chase_outcast.minTicksBetweenPlays = 20;
	SoundObject.chase_behemoth = new SoundObject([as.chase_behemoth,as.chase_behemoth2], 1,40,0.1);
	SoundObject.chase_behemoth.randomPlay = true;
	SoundObject.chase_behemoth.minTicksBetweenPlays = 30;
	SoundObject.chase_succubus = new SoundObject([as.chase_succubus,as.chase_succubus2], 1,40,0.1);
	SoundObject.chase_succubus.randomPlay = true;
	SoundObject.chase_succubus.minTicksBetweenPlays = 25;
	SoundObject.chase_deserter = new SoundObject([as.chase_deserter,as.chase_deserter2], 1,40,0.1);
	SoundObject.chase_deserter.randomPlay = true;
	SoundObject.chase_deserter.minTicksBetweenPlays = 25;
	
	SoundObject.step_water  = new SoundObject([as.step_water,as.step_water], 0.25, 40,0.3);
	SoundObject.step_water.constantPitch = 0.8;
	SoundObject.heartbeat  = new SoundObject([as.heartbeat], 1, 12 ,0.02);
	SoundObject.heartbeat.much_louder_when_near = true;
	SoundObject.glass_break = new SoundObject([as.glass_break, as.glass_break], 0.65,40,0.2); 
	SoundObject.pickup = new SoundObject([as.pickup,as.pickup], 0.6,40,0); 
	SoundObject.puk = new SoundObject([ as.puk ], 0.2,40,0.12); 
	SoundObject.button = new SoundObject([as.button], 0.8,40,0); 
	
	SoundObject.panel_in = new SoundObject([as.panel_in], 0.2,40,0.1);
	SoundObject.panel_in.constantPitch = 1.5;
	SoundObject.panel_out = new SoundObject([as.panel_out], 0.2,40,0.1);
	SoundObject.panel_out.constantPitch = 1.5;
	SoundObject.ungarrison = new SoundObject([as.panel_out], 0.5,40,0.1);
	SoundObject.ungarrison.canInterrupt = true;
	SoundObject.garrison = new SoundObject([as.panel_in], 0.5,40,0.1);
	SoundObject.garrison.canInterrupt = true;
	SoundObject.laika_walk_loop = new SoundObject([as.laika_walk_loop,as.laika_walk_loop,as.laika_walk_loop], 0.5,40,0.1);
	SoundObject.laika_walk_loop.minTicksBetweenPlays = 3;
	SoundObject.laika_walk_loop.constantPitch = 1.05;
	
	SoundObject.whirl  = new SoundObject([as.whirl,as.whirl], 0.8,40,0.2); 
	//SoundObject.bigsplash  = new SoundObject([as.bigsplash,as.bigsplash], 0.8,40,0.2); 
	SoundObject.splash  = SoundObject.step_water;

	SoundObject.Ambiences[0] = SoundObject.laika_walk_loop;
	
	QuoteSet.lastPlayedObject = null;
	QuoteSet.lastPlayedInstance = null;
	
	/*SoundObject.Voices = [as.story_girlscout, as.story_heykid,as.story_bastards,as.story_thanksfortherescue,
	as.story_mars_swarming,as.story_mars_wemustfind,as.story_survival_hack,
	as.story_survival_already,as.story_survival_weird,as.story_survival_bugfix,as.story_orbit_commandpost]*/
}

SoundObject.getVoiceByName = function(name){
	for (var i=0;i<this.Voices.length;++i){
		if(this.Voices[i].name === name){
			return this.Voices[i];
		}
	}
	return null;
}


var Music = new Object();
Music.Tracks = [];
Music.trackID = -1;
Music.volume = 0.5;
Music.enabled = true;
Music.Init = function(){
	var as = Asset.sound;

	this.Tracks[0] = Music.InitTrack(as.music1);
	this.Tracks[1] = Music.InitTrack(as.music3);
	this.Tracks[2] = Music.InitTrack(as.music3);
	this.Tracks[3] = Music.InitTrack(as.music4);
}
Music.InitTrack = function(asset){
	asset.loop(true);
	asset.volume(this.volume);
	return asset;
}
Music.MultiplyCurrentVolume = function(factor){
	var track = this.Tracks[this.trackID];
	if(track){
		track.volume(this.volume * factor);
	}
}
Music.SetVolume = function(newVolume){
	for(var i =0;i<this.Tracks.length;++i){
		this.Tracks[i].volume(newVolume);
	}
	Music.volume = newVolume;
}

Music.RandomTrack = function(){
	var id = (this.trackID+Math.floor(Math.random()*this.Tracks.length))%this.Tracks.length;
	Music.ChangeTrack(id);
}

Music.ChangeTrack = function(newTrackID){
	if(this.enabled == false){return;}
	var oldtrack = this.Tracks[this.trackID];
	var newtrack = this.Tracks[newTrackID];
	if(newtrack){
		/*if(M.isMenu){
			newtrack.loop(true);
		}else{
			newtrack.loop(false);
		}*/
		newtrack.loop(true);
	}
	if(oldtrack == newtrack){
		//oldtrack.stop();
		//newtrack.play();//TODO: does it stop without this line?
		return;
	}
	if(oldtrack){
		oldtrack.stop();
	}
	if(newtrack){
		this.trackID = newTrackID;
		newtrack.play();
	}
}