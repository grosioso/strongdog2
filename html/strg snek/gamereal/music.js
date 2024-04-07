class Music{

	constructor(){
		this.isMusic = true;
		this.music = null;
		this.volume = null;
	}

	play(){
		if(this.isMusic) this.music.play();
	}

	load(music){
		this.stop();
		this.music = resource.get(music);
		this.music.oncanplaythrough = -1;
		this.music.loop = true;
		this.music.load();
		this.play();
	}

	stop(){
		if (this.music != null ) {
			this.music.pause();
			this.music = null;
		}
	}
	
	setVolume(volume){
		this.music.volume = volume;
		this.volume = volume;
	}
	
	toggle(){
		if(this.isMusic) {
			this.isMusic = false;
			this.music.pause();
		} else {
			this.isMusic = true;
			this.music.play();
		}
	}
}