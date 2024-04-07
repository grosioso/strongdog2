function Portrait(texture, name){
	this.seqs = [];
	this.seqs[Portrait.idle] = [0];
	this.seqs[Portrait.talk] = [0,1,2,3,4];
	this.texture = texture;
	this.anim = Portrait.idle;
	this.randomize_frames = true;
	this.animFrame = 0;
	this.frame = 0;
	this.tickPerFrame = 15;
	
	this.name = name;
	this.id = Portrait.list.length;
	Portrait.list.push(this);
}

Portrait.prototype.speech = function(){
	if(this.animFrame >= this.seqs[this.anim].length || this.anim != Portrait.talk){
		this.start(Portrait.talk);
	}
}
Portrait.prototype.getNextFrame=function(){
	if(this.animFrame>=this.seqs[this.anim].length){
		this.start(Portrait.idle);
	}
	if(this.randomize_frames){
		this.animFrame = Math.floor(Math.random()*this.seqs[this.anim].length*0.9999)
		this.frame = this.seqs[this.anim][this.animFrame];
	}else{
		this.frame = this.seqs[this.anim][this.animFrame];
		this.animFrame++;
	}
	return this.frame;
}

Portrait.prototype.start=function(id){
	this.animFrame = 0;
	this.anim = id;
	this.frame = this.seqs[id][0];
}
Portrait.idle=0;
Portrait.talk=1;
Portrait.list = [];
Portrait.init = function(){
	Portrait.Marine = new Portrait(Asset.texture.mantis_sheet, "Marine");
	Portrait.Imp = new Portrait(Asset.texture.portrait_imp, "Imp");
	Portrait.Imp.tickPerFrame = 6;
 
	Portrait.Ghoul = new Portrait(Asset.texture.portrait_imp, "Ghoul");
	Portrait.Ghoul.seqs[Portrait.idle] = [8];
	Portrait.Ghoul.seqs[Portrait.talk] = Portrait.interval(8,12);
	Portrait.Ghoul.tickPerFrame = 7;
	
	Portrait.Scout = new Portrait(Asset.texture.portrait_imp, "Scout");
	Portrait.Scout.seqs[Portrait.idle] = [16];
	Portrait.Scout.seqs[Portrait.talk] = Portrait.interval(16,20);
	Portrait.Scout.tickPerFrame = 8;
	
	Portrait.Enforcer = new Portrait(Asset.texture.portrait_imp, "Enforcer");
	Portrait.Enforcer.seqs[Portrait.idle] = [24];
	Portrait.Enforcer.seqs[Portrait.talk] = Portrait.interval(24,28);
	Portrait.Enforcer.tickPerFrame = 7;
	
	Portrait.TV = new Portrait(Asset.texture.portrait_imp, "TV");
	Portrait.TV.seqs[Portrait.idle] = [5];
	Portrait.TV.seqs[Portrait.talk] = [5,6,7];
}

Portrait.interval = function(start,end){
	if(start > end){
		return Portrait.interval(end,start);
	}
	var arr = [];
	for(var i=start;i<=end;++i){
		arr.push(i);
	}
	return arr;
}