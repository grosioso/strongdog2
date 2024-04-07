class SFX {
	constructor(){
		this.isSFX = true;
	}

	load(){
		if (!isSafari){
			this.fileToken = resource.get("sound/sfx_sounds_button6.wav");
			this.fileToken.volume = 0.5;
			this.fileToken.oncanplaythrough = -1;

			this.fileDeath = resource.get("sound/sfx_alarm_loop5.wav");
			this.fileDeath.volume = 0.1;
			this.fileDeath.oncanplaythrough = -1;

			this.fileCheckpoint = resource.get("sound/sfx_coin_cluster3.wav");
			this.fileCheckpoint.oncanplaythrough = -1;

			this.filepipe = resource.get("sound/sfx_movement_jump19.wav");
			this.filepipe.volume = 0.2;
			this.filepipe.oncanplaythrough = -1;

			this.fileMove = resource.get("sound/sfx_movement_ladder2a.wav");
			this.fileMove.volume = 0.05;
			this.fileMove.oncanplaythrough = -1;

			this.fileDash = resource.get("sound/sfx_movement_jump11.wav");
			this.fileDash.volume = 0.05;
			this.fileDash.playbackRate = 1.5
			this.fileDash.oncanplaythrough = -1;
		}
	}

	toogleSFX(){
		if(this.isSFX) this.isSFX = false;
		else this.isSFX = true;
	}

	token(){
		if (!isSafari){
			this.fileToken.pause();
			this.fileToken.currentTime = 0;
			if(this.isSFX) this.fileToken.play();
		}
	}

	death(){
		if (!isSafari){
			this.fileDeath.pause();
			this.fileDeath.currentTime = 0;
			if(this.isSFX) this.fileDeath.play();
		}
	}

	checkpoint(){
		if (!isSafari){
			this.fileCheckpoint.pause();
			this.fileCheckpoint.currentTime = 0;
			if(this.isSFX) this.fileCheckpoint.play();
		}
	}

	pipe(){
		if (!isSafari){
			this.filepipe.pause();
			this.filepipe.currentTime = 0;
			if(this.isSFX) this.filepipe.play();
		}
	}

	move(){
		if (!isSafari){
			this.fileMove.pause();
			this.fileMove.currentTime = 0;
			if(this.isSFX) this.fileMove.play();
		}
	}

	dash(){
		if (!isSafari){
			this.fileDash.pause();
			this.fileDash.currentTime = 0;
			if(this.isSFX) this.fileDash.play();
		}
	}
}