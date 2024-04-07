function Anim(_type, frames, frameLengths, looping){
	this.type = _type;
	this.frames = frames;
	this.frames_multidir = null;
	this.frameLengths = frameLengths;
	this.randomStart = false;
	this.blendStart = false; 
	if(frames.length != frameLengths.length){
		console.warn("Frames and FrameLengths arrays must be of same size");
	}
	if(this.type == Anim.birth){
		this.blendStart = false;
	}
	
	this.frameTimes = [];
	this.posKeys = null;
	var sum = 0;
	for(var i=0; i<frames.length;++i){
		this.frameLengths[i] *= Anim.timeMultiplier;
		sum += this.frameLengths[i];
		this.frameTimes[i] = sum;
	}

	this.endTime = this.frameTimes[this.frames.length-1] -1;
	this.numberOfFrames = frames.length;
	this.looping = looping;
	//used for sword lunge anims
	this.special_variant = this.type;
	this.nextType = -1;
	Anim.last = this;
}

function AnimPosKey(_startTime, _x,_y,_z, _scale){
	this.x = _x;
	this.y = _y;
	this.z = _z;
	this.startTime = _startTime;
	if(_scale === void 0){_scale = 1;}
	this.scale = _scale;
}

Anim.last = null;
Anim.timeMultiplier = 2;
Anim.maxBlendTime = 8;
Anim.stand = 0;
Anim.walk = 1;
Anim.attack = 2;
Anim.death = 3;
Anim.birth = 4;
Anim.stand2 = 5;
Anim.stand_hurt = 6;
Anim.grabbed = 7;
Anim.birth_training = 8;
Anim.death_special = 9;
Anim.jump = 10;
Anim.spell = 11;
Anim.sprint = 12;
Anim.charge = 13;
Anim.stand_training = 14;
Anim.stand_training_hurt = 15;
Anim.spawn_hurt = 16;
Anim.pain = 17;
Anim.spawn = 18;


Anim.getEmpty = function(){
	var a =[];
	a[ Anim.stand ] = new Anim(Anim.stand, [0],[3],true);
	a[ Anim.attack ] = new Anim(Anim.attack, [0],[1],true);
	a[ Anim.walk ] = new Anim(Anim.walk, [0],[1],true);
	a[ Anim.death ] = new Anim(Anim.death, [0],[1],true);
	a[ Anim.birth]  = a[Anim.stand];
	a[ Anim.grabbed ] = a[Anim.stand];
	a[ Anim.jump ] = a[Anim.stand];
	a[ Anim.stand_hurt ] = a[Anim.stand];
	a[ Anim.pain ] = a[Anim.stand];
	return a;
}
Anim.clone = function(src){
	var dest = [];
	for(var i=0;i<src.length;++i){
		dest[i] = src[i];
	}
	return dest;
}
//deep copy
Anim.clone_value = function(src){
	var dest = [];
	for(var i=0;i<src.length;++i){
		if(src[i]){
			dest[i] = Object.assign(new Object(), src[i]);
			dest[i].frames = src[i].frames.slice();
			dest[i].frameLengths = src[i].frameLengths.slice();
			dest[i].frameTimes = src[i].frameTimes.slice();
		}
	}
	return dest;
}

Anim.Empty = Anim.getEmpty();

Anim.ChomperAnim = Anim.getEmpty();
Anim.ChomperAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[6,6],true);
Anim.ChomperAnim[Anim.stand].frames_multidir = [
[0,1,2,3,4,-3,-2,-1],
[8,9,10,11,12,-11,-10,-9]];
Anim.ChomperAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0,0,0],[2,2,2,2,4],false);
Anim.ChomperAnim[Anim.attack].frames_multidir = [
[32,33,34,35,36,-35,-34,-33],
[40,41,42,43,44,-43,-42,-41],
[48,49,50,51,52,-51,-50,-49],
[56,57,58,59,60,-59,-58,-57],
[32,33,34,35,36,-35,-34,-33]];
Anim.ChomperAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0,0,0],[2,2,2,2],true);
Anim.ChomperAnim[Anim.walk].frames_multidir = [
[0,1,2,3,4,-3,-2,-1],
[8,9,10,11,12,-11,-10,-9],
[16,17,18,19,20,-19,-18,-17],
[24,25,26,27,28,-27,-26,-25]];
Anim.ChomperAnim[ Anim.death ] = new Anim(Anim.death, [37, 53,54,55,61,62],[1,3,3,3,3,3],false);
Anim.ChomperAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.ChomperAnim[Anim.pain].frames_multidir = [
[37,29,21,13,44,-13,-21,-29]];

Anim.ZombieAnim = Anim.getEmpty();
Anim.ZombieAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[6,6],true);
Anim.ZombieAnim[Anim.stand].frames_multidir = [
[24,25,26,27,28,-27,-26,-25],
[16,17,18,19,20,-19,-18,-17]];
Anim.ZombieAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0,0,0],[3,3,3,3],true);
Anim.ZombieAnim[Anim.walk].frames_multidir = Anim.ChomperAnim[Anim.walk].frames_multidir;
Anim.ZombieAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0,0],[2,2,8,4],false);
Anim.last.frames_multidir = [
[32,33,34,35,36,-35,-34,-33],
[40,41,42,43,44,-43,-42,-41],
[48,49,50,51,52,-51,-50,-49],
[32,33,34,35,36,-35,-34,-33]];
Anim.ZombieAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.last.frames_multidir = [
[56,57,58,59,60,-59,-58,-57]];
Anim.ZombieAnim[ Anim.death ] = new Anim(Anim.death, [56,5,13,21,29,37],[1,2,1.5,1.5,1.5,2],false);

Anim.ScoutAnim = Anim.getEmpty();
Anim.ScoutAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[6,6],true);
Anim.ScoutAnim[Anim.stand].frames_multidir = [
[0,7,6,5,4,3,2,1],
[8,15,14,13,12,11,10,9]];
Anim.ScoutAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0,0,0],[3,4,3,4],true);
Anim.ScoutAnim[Anim.walk].frames_multidir = [
[0,7,6,5,4,3,2,1],
[8,15,14,13,12,11,10,9],
[16,23,22,21,20,19,18,17],
[24,31,30,29,28,27,26,25]];
Anim.ScoutAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0],[2,7,2],false);
Anim.ScoutAnim[Anim.attack].frames_multidir = [
[32,39,38,37,36,35,34,33],
[40,47,46,45,44,43,42,41],
[32,39,38,37,36,35,34,33]];
Anim.ScoutAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.ScoutAnim[Anim.pain].frames_multidir = [
[48,55,54,53,52,51,50,49]];
Anim.ScoutAnim[ Anim.death ] = new Anim(Anim.death, [32,56,57,58,59,60],[4,5,3,2,2,2],false);

Anim.EnforcerAnim = Anim.getEmpty();
Anim.EnforcerAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[6,6],true);
Anim.EnforcerAnim[Anim.stand].frames_multidir = Anim.ChomperAnim[Anim.stand].frames_multidir;
Anim.EnforcerAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0,0,0],[3,3,3,3],true);
Anim.EnforcerAnim[Anim.walk].frames_multidir = Anim.ChomperAnim[Anim.walk].frames_multidir;
Anim.EnforcerAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0],[2,23,2],false);
Anim.EnforcerAnim[Anim.attack].frames_multidir = [
[32,33,34,35,36,-35,-34,-33],
[40,41,42,43,44,-43,-42,-41],
[32,33,34,35,36,-35,-34,-33]];
Anim.EnforcerAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.EnforcerAnim[Anim.pain].frames_multidir = [
[48,49,50,51,52,-51,-50,-49]];
Anim.EnforcerAnim[ Anim.death ] = new Anim(Anim.death, [48,5,13,21,29],[1.5,2.5,3,3,3],false);

Anim.RangerAnim = Anim.clone(Anim.EnforcerAnim);
Anim.RangerAnim[ Anim.death ] = new Anim(Anim.death, [5,13,21,29,37],[3,3,2,2,2],false);
Anim.RangerAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0],[4,3,2],false);
Anim.RangerAnim[Anim.attack].frames_multidir = Anim.EnforcerAnim[Anim.attack].frames_multidir;

Anim.FallenAnim = Anim.clone(Anim.RangerAnim);
Anim.FallenAnim[ Anim.death ] = new Anim(Anim.death, [48,5,13,21,29,37],[1,2,2,1.5,1.5,2],false);

Anim.SuccubusAnim = Anim.clone(Anim.FallenAnim);
Anim.SuccubusAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0,0,0],[3,3,2,3,4],false);
Anim.SuccubusAnim[Anim.attack].frames_multidir = Anim.EnforcerAnim[Anim.attack].frames_multidir;
Anim.last.frames_multidir = [
[32,33,34,35,36,-35,-34,-33],
[40,41,42,43,44,-43,-42,-41],
[48,49,50,51,52,-51,-50,-49],
[40,41,42,43,44,-43,-42,-41],
[32,33,34,35,36,-35,-34,-33],
];
Anim.SuccubusAnim[ Anim.death ] = new Anim(Anim.death, [56,5,13,21,29,37],[1,2,3,2,2,2],false);
Anim.SuccubusAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.last.frames_multidir = [
[56,57,58,59,60,-59,-58,-57]];

Anim.RednoseAnim = Anim.clone(Anim.SuccubusAnim);
Anim.RednoseAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0,0,0],[1.5,1.5,1.5,1.5],true);
Anim.last.frames_multidir = Anim.SuccubusAnim[Anim.walk].frames_multidir;

Anim.AllyAnim = Anim.clone(Anim.RangerAnim);
Anim.AllyAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0,0,0],[2,2,2,2],true);
Anim.last.frames_multidir = Anim.EnforcerAnim[Anim.walk].frames_multidir;
Anim.AllyAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0],[2,7,2],false);
Anim.last.frames_multidir = Anim.EnforcerAnim[Anim.attack].frames_multidir;

Anim.PainlordAnim = Anim.clone(Anim.ZombieAnim);
Anim.PainlordAnim[ Anim.death ] = new Anim(Anim.death, [5,13,21,29,37],[3,2,1.5,1.5,2],false);


Anim.RascalAnim = Anim.clone(Anim.ZombieAnim);
Anim.RascalAnim[ Anim.stand ] = new Anim(Anim.stand,[0,0,0,0],[3,3,3,3],true);
Anim.last.frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
[8,-9,-10,-11,12,11,10,9],
[16,-17,-18,-19,20,19,18,17],
[24,-25,-26,-27,28,27,26,25]];
Anim.RascalAnim[ Anim.walk ] = new Anim(Anim.walk,[0,0,0,0],[3,3,3,3],true);
Anim.last.frames_multidir=Anim.RascalAnim[Anim.stand].frames_multidir;
Anim.RascalAnim[Anim.attack].frames_multidir = [
[32,-33,-34,-35,36,35,34,33],
[40,-41,-42,-43,44,43,42,41],
[48,-49,-50,-51,52,51,50,49],
[32,-33,-34,-35,36,35,34,33]];
Anim.RascalAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.last.frames_multidir = [
[56,-57,-58,-59,60,59,58,57]];
Anim.RascalAnim[ Anim.death ] = new Anim(Anim.death, [56,5,13,21,29],[1,2,3,2,2],false);

Anim.BehemothAnim = Anim.getEmpty();
Anim.BehemothAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[7,7],true);
Anim.BehemothAnim[Anim.stand].frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
[6,-7,-8,-9,10,9,8,7]];
Anim.BehemothAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0 ],[3,10,2],false);
Anim.BehemothAnim[Anim.attack].frames_multidir = [
[24,-25,-26,-27,28,27,26,25],
[30,-31,-32,-33,34,33,32,31],
[24,-25,-26,-27,28,27,26,25]];
Anim.BehemothAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0,0,0],[3,3,3,3],true);
Anim.BehemothAnim[Anim.walk].frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
[6,-7,-8,-9,10,9,8,7],
[12,-13,-14,-15,16,15,14,13],
[18,-19,-20,-21,22,21,20,19]];
Anim.BehemothAnim[ Anim.death ] = new Anim(Anim.death, [36,5,11,17,23],[1,2.5,3,3,3],false);
Anim.BehemothAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.BehemothAnim[Anim.pain].frames_multidir = [
[36,-37,-38,-39,40,39,38,37]];

Anim.PainkingAnim = Anim.getEmpty();
Anim.PainkingAnim[ Anim.stand ] = new Anim(Anim.stand,[0,0],[9,9],true);
Anim.last.frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
//[5,-6,-7,-8,-9,8,7,6],
[-10,-11,-12,-13,-14,13,12,11],
 ];
Anim.PainkingAnim[ Anim.walk ] = new Anim(Anim.walk,[0,0,0,0],[3,3,3,3],true);
Anim.last.frames_multidir = [
[ 0, -1, -2, -3, -4, 3, 2, 1],
[ 5, -6, -7, -8, -9, 8, 7, 6],
[10,-11,-12,-13,-14,13,12,11],
[15,-16,-17,-18,-19,18,17,16],
];
Anim.PainkingAnim[Anim.attack] = new Anim(Anim.attack, [0,0,0,0],[5,28,10,3], false);
Anim.last.frames_multidir = [
[20,-21,-22,-23,24,23,22,21],
[25,-26,-27,-28,29,28,27,26],
[30,-31,-32,-33,34,33,32,31],
[20,-21,-22,-23,24,23,22,21]];
Anim.PainkingAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.last.frames_multidir = [
[35,-36,-37,-38,39,38,37,36]];
Anim.PainkingAnim[ Anim.death ] = new Anim(Anim.death, [35,40,41,42,43,44,45,46],[1,3,3,3,2,2,2,2],false);

Anim.AnglerAnim = Anim.getEmpty();
Anim.AnglerAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[7,7],true);
Anim.AnglerAnim[Anim.stand].frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
[5,-6,-7,-8,9,8,7,6]];
Anim.AnglerAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0,0,0 ],[3,2,2,3,2],false);
Anim.AnglerAnim[Anim.attack].frames_multidir = [
[20,-21,-22,-23,24,23,22,21],
[25,-26,-27,-28,29,28,27,26],
[30,-31,-32,-33,34,33,32,31],
[35,-36,-37,-38,39,38,37,36],
[20,-25,-26,-27,28,27,26,25],];
Anim.last.nextType = 0;
Anim.AnglerAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0,0,0],[3,3,3,3],true);
Anim.AnglerAnim[Anim.walk].frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
[5,-6,-7,-8,9,8,7,6],
[10,-11,-12,-13,14,13,12,11],
[15,-16,-17,-18,19,18,17,16]];
Anim.AnglerAnim[ Anim.death ] = new Anim(Anim.death, [40,45,46,47,48,49],[1,2,2,2,2,3],false);
Anim.AnglerAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.AnglerAnim[Anim.pain].frames_multidir = [
[40,-41,-42,-43,44,43,42,41]];

Anim.NoseAnim = Anim.getEmpty();
Anim.NoseAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[7,7],true);
Anim.NoseAnim[ Anim.stand].frames_multidir = Anim.AnglerAnim[Anim.stand].frames_multidir;
Anim.NoseAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0,0,0],[3,3,3,3],true);
Anim.NoseAnim[ Anim.walk].frames_multidir = Anim.AnglerAnim[Anim.walk].frames_multidir;
Anim.NoseAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0,0],[2,2,2,3],false);
Anim.NoseAnim[ Anim.attack].frames_multidir = [
[20,-21,-22,-23,24,23,22,21],
[25,-26,-27,-28,29,28,27,26],
[30,-31,-32,-33,34,33,32,31],
[20,-25,-26,-27,28,27,26,25]];
Anim.NoseAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.NoseAnim[Anim.pain].frames_multidir = [
[35,-36,-37,-38,39,38,37,36],];
Anim.NoseAnim[ Anim.death ] = new Anim(Anim.death, [35,40,41,42,43,44],[1.5,2.5,2.5,2.5,2,2],false);

Anim.ValkyrieAnim = Anim.getEmpty();
Anim.ValkyrieAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[7,7],true);
Anim.ValkyrieAnim[Anim.stand].frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
[5,-6,-7,-8,9,8,7,6]];
Anim.ValkyrieAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0,0],[3,8,2,3 ],false);
Anim.ValkyrieAnim[Anim.attack].frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
[10,-11,-12,-13,-14,13,12,11],
[0,-1,-2,-3,4,3,2,1],
[5,-6,-7,-8,9,8,7,6]];
Anim.last.nextType = 0;
Anim.ValkyrieAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0 ],[3,3 ],true);
Anim.ValkyrieAnim[Anim.walk].frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
[5,-6,-7,-8,9,8,7,6]];
Anim.ValkyrieAnim[ Anim.death ] = new Anim(Anim.death, [15,20,21,22,23],[1,2,2,2,2],false);
Anim.ValkyrieAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.ValkyrieAnim[Anim.pain].frames_multidir = [
[15,-16,-17,-18,-19,18,17,16]];

Anim.StillbornAnim = Anim.clone(Anim.ZombieAnim);
Anim.StillbornAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0,0],[3,8,2,2], false);
Anim.StillbornAnim[Anim.attack].frames_multidir = [
[32,33,34,35,36,-35,-34,-33],
[40,41,42,43,44,-43,-42,-41],
[48,49,50,51,52,-51,-50,-49],
[24,25,26,27,28,-27,-26,-25],];
Anim.last.nextType = 0;
Anim.StillbornAnim[ Anim.death ] = new Anim(Anim.death, [5,13,21,29],[3,3,2,2],false);

Anim.SkeletonAnim = Anim.getEmpty();
Anim.SkeletonAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[7,7],true);
Anim.SkeletonAnim[Anim.stand].frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
[5,-6,-7,-8,9,8,7,6]];
Anim.SkeletonAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0,0,0 ],[1.5,2,1,1,7],false);
Anim.SkeletonAnim[Anim.attack].frames_multidir = [
[25,-26,-27,-28,29,28,27,26],
[20,-21,-22,-23,24,23,22,21],
[25,-26,-27,-28,29,28,27,26],
[30,-31,-32,-33,34,33,32,31],
[35,-36,-37,-38,39,38,37,36]];
Anim.last.nextType = Anim.stand;
Anim.SkeletonAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0,0,0],[2.5,2.5,2.5,2.5],true);
Anim.SkeletonAnim[Anim.walk].frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
[5,-6,-7,-8,9,8,7,6],
[10,-11,-12,-13,14,13,12,11],
[15,-16,-17,-18,19,18,17,16]];
Anim.SkeletonAnim[ Anim.death ] = new Anim(Anim.death, [40,45,46,47,48,49],[1,2,2,1.5,1.5,1.5],false);
Anim.SkeletonAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.SkeletonAnim[Anim.pain].frames_multidir = [
[40,-41,-42,-43,44,43,42,41]];

Anim.GhoulAnim = Anim.getEmpty();
Anim.GhoulAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[7,7],true);
Anim.GhoulAnim[Anim.stand].frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
[7,-8,-9,-10,11,10,9,8]];
Anim.GhoulAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0,0,0  ],[2,2,4,4,4],false);
Anim.GhoulAnim[Anim.attack].frames_multidir = [
[28,-29,-30,-31,32,31,30,29],
[35,-36,-37,-38,39,38,37,36],
[42,-43,-44,-45,46,45,44,43],
[35,-36,-37,-38,39,38,37,36],
[42,-43,-44,-45,46,45,44,43]];
Anim.GhoulAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0,0,0],[1 ,1 ,1 ,1 ],true);
Anim.GhoulAnim[Anim.walk].frames_multidir = [
[0,-1,-2,-3,4,3,2,1],
[7,-8,-9,-10,11,10,9,8],
[14,-15,-16,-17,18,17,16,15],
[21,-22,-23,-24,25,24,23,22]];
Anim.GhoulAnim[ Anim.death ] = new Anim(Anim.death, [5,13,20,27,34,41],[1,2,2,1.5,1.5,1.5],false);
Anim.GhoulAnim[Anim.pain] = new Anim(Anim.pain,[0],[2],true);
Anim.GhoulAnim[Anim.pain].frames_multidir = [
[5,-12,-19,-26,33,26,19,12]];


Anim.GhastAnim = Anim.getEmpty();
Anim.GhastAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[7,6],true);
Anim.last.frames_multidir = [
[0,1,2,3,4,-3,-2,-1],
[8,9,10,11,12,-11,-10,-9]];
Anim.GhastAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0 ],[4,4 ],true);
Anim.last.frames_multidir = Anim.GhastAnim[Anim.stand].frames_multidir
Anim.GhastAnim[ Anim.death ] = new Anim(Anim.death, [40,32,33,34,35,36],[1,2,2,2,1.5,1.5],false);
Anim.GhastAnim[Anim.pain] = new Anim(Anim.pain,[0],[4],true);
Anim.last.frames_multidir = [
[40,41,42,43,44,-43,-42,-41]];
Anim.GhastAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0  ],[3,3], true);
Anim.last.frames_multidir = [
[16,17,18,19,20,-19,-18,-17],
[24,25,26,27,28,-27,-26,-25],
];
Anim.GhastAnim[ Anim.birth ] = new Anim(Anim.birth, [0,0,0],[4,3,2],false);
Anim.last.frames_multidir = [
[48,49,50,51,52,-51,-50,-49],
[56,57,58,59,60,-59,-58,-57],
[0,1,2,3,4,-3,-2,-1]];


Anim.MonkAnim = Anim.getEmpty();
Anim.MonkAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[7,6],true);
Anim.last.frames_multidir = [
[0,1,2,3,4,-3,-2,-1],
[6,7,8,9,10,-9,-8,-7]];
Anim.MonkAnim[ Anim.walk ] = new Anim(Anim.walk, [0,0 ],[3,3 ],true);
Anim.MonkAnim[Anim.walk].frames_multidir = Anim.MonkAnim[Anim.stand].frames_multidir
Anim.MonkAnim[ Anim.death ] = new Anim(Anim.death, [30,5,11,17,23,29,35],[1,2,2,2,2,2,2],false);
Anim.MonkAnim[Anim.pain] = new Anim(Anim.pain,[0],[4],true);
Anim.last.frames_multidir = [[30,31,32,33,34,-33,-32,-31]];
Anim.MonkAnim[ Anim.attack ] = new Anim(Anim.attack, [0,0,0,0,0 ],[3,3,3,2,3],false);
Anim.last.frames_multidir = [
[12,13,14,15,16,-15,-14,-13],
[18,19,20,21,22,-21,-20,-19],
[24,25,26,27,28,-27,-26,-25],
[18,19,20,21,22,-21,-20,-19],
[12,13,14,15,16,-15,-14,-13],
];

Anim.EvilAnim = Anim.getEmpty();
Anim.EvilAnim[ Anim.stand ] = new Anim(Anim.stand, [0,2 ],[2,2 ], true);
Anim.EvilAnim[ Anim.attack ] = new Anim(Anim.attack, [1],[1 ], false);
Anim.EvilAnim[ Anim.spell ] = new Anim(Anim.attack, [1,3,1,3,1,3],[2,2,2,2,2,2 ], true);
Anim.EvilAnim[ Anim.walk ] = new Anim(Anim.walk, [0,2 ],[2,2 ], true);

Anim.FistAnim = Anim.getEmpty();
Anim.FistAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[6,6],true);
Anim.FistAnim[ Anim.attack ] = new Anim(Anim.attack, [1,2,3,4,0],[0.5,5,1,1,2], false);

Anim.ClawAnim = Anim.getEmpty();
Anim.ClawAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2 ],[3,3,3 ],true);
Anim.ClawAnim[ Anim.attack ] = new Anim(Anim.attack, [3,4,5,6,7,3 ],[1.5,1.5 ,1.5,1.5,2,1 ], false);
Anim.last.nextType = 0;

Anim.ShotgunAnim = Anim.getEmpty();
Anim.ShotgunAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[6,6],true);
Anim.ShotgunAnim[ Anim.attack ] = new Anim(Anim.attack, [1,2,5,3,4,3,5,0],[1,2,2,1,3,2,1,1], false);

Anim.DoubleBarrelAnim = Anim.getEmpty();
Anim.DoubleBarrelAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[6,6],true);
Anim.DoubleBarrelAnim[ Anim.attack ] = new Anim(Anim.attack, [1,2,3,4,5,6,7,8,9,10,11,0],[1.5,1,4,1,1,1 ,1 ,4.5,1.5,1 ,1 ,2], false);

Anim.RocketAnim = Anim.getEmpty();
Anim.RocketAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[0,0],true);
Anim.RocketAnim[ Anim.attack ] = new Anim(Anim.attack, [1,2,3,0],[1.5,1.5,2,1], false);

Anim.PlasmaGunAnim = Anim.getEmpty();
Anim.PlasmaGunAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[0,0],true);
Anim.PlasmaGunAnim[ Anim.attack ] = new Anim(Anim.attack, [2,1,0],[2.5,2,1], false);
 
Anim.AKAnim = Anim.getEmpty();
Anim.AKAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[0,0],true);
Anim.AKAnim[ Anim.attack ] = new Anim(Anim.attack, [1,2,3,0],[1,1,1,2], false);

Anim.MinigunAnim = Anim.getEmpty();
Anim.MinigunAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2],[3,3,3],true);
Anim.MinigunAnim[ Anim.attack ] = new Anim(Anim.attack, [3,4,5],[3,3,3], true);

Anim.SwordAnim = Anim.getEmpty();
Anim.SwordAnim[ Anim.stand ] = new Anim(Anim.stand, [0,0],[3,3],true);
Anim.SwordAnim[ Anim.attack ] = new Anim(Anim.attack, [1,2,3,4,5,6,7,8,0],[2,0.5,0.5,0.5,3,1,1,1,2], false);

Anim.PistolAnim = Anim.getEmpty();
Anim.PistolAnim[ Anim.attack ] = new Anim(Anim.attack, [2,1,3,0],[1.5,1.5,1,3], false);

Anim.ItemAnim = Anim.getEmpty();
Anim.ItemAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2,3],[3,3,3,3], true);

Anim.CrusaderAnim = Anim.getEmpty();
Anim.CrusaderAnim[ Anim.stand ] = new Anim(Anim.stand, [0],[1],true);
Anim.CrusaderAnim[ Anim.walk ] = new Anim(Anim.walk, [1,2,3,4,5,6,7,8],[1,1,1,1,1,1,1,1],true);
Anim.CrusaderAnim[ Anim.attack ] = new Anim(Anim.attack, [9,10,11,12,13,14,9],[1,3,1,1,3,2,1],false);
Anim.CrusaderAnim[ Anim.death ] = new Anim(Anim.death, [15,16,17],[2,2,2],false);
 
 
Anim.DoorAnim = Anim.getEmpty();
Anim.DoorAnim[Anim.birth] = new Anim(Anim.birth, [1,1],[50,50],false);
Anim.DoorAnim[Anim.stand] = new Anim(Anim.stand, [1,1,1,0,0],[15,15,30,5,5],false);
Anim.DoorAnim[Anim.death] = new Anim(Anim.death, [0,0,1],[5,25,30],false);  

Anim.WallAnim = Anim.getEmpty();
Anim.WallAnim[ Anim.birth ] = new Anim(Anim.birth, [2,1,0],[3,4,5],false);
Anim.WallAnim[ Anim.death ] = new Anim(Anim.death, [0,1,2],[3,3,3],false);
Anim.RocksAnim = Anim.getEmpty();
Anim.RocksAnim[ Anim.death ] = new Anim(Anim.death, [0,1,2,3,4,5,6,7,8],[2,2,2,2,2,2,2,2,2],false);

Anim.CannonDebrisAnim = Anim.getEmpty();
Anim.CannonDebrisAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2,3,4,5,6,7],[2,2,2,2,2,2,2,2],false);
Anim.BulletDebrisAnim = Anim.getEmpty();
Anim.BulletDebrisAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2,3,4,5,6],[1,1,1,1,1,1,1],false);

Anim.BloodsplatterAnim = Anim.getEmpty();
Anim.BloodsplatterAnim[ Anim.stand ] = new Anim(Anim.attack, [0,1,2,3],[1,2,2,2],false);

Anim.LaserAnim = Anim.getEmpty();
Anim.LaserAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2],[3,3,3],false);

Anim.LaserLightningAnim = Anim.getEmpty();
Anim.LaserLightningAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2,3,4],[1,1,1,1,1],false);

Anim.LaserStarshipAnim = Anim.getEmpty();
Anim.LaserStarshipAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2,3,4],[1,1,1,1,1],false);

Anim.RainAnim = Anim.getEmpty();
Anim.RainAnim[ Anim.stand ] = new Anim(Anim.stand,[0,1],[50,0], true);
Anim.SnowfallAnim = Anim.getEmpty();
Anim.SnowfallAnim[ Anim.stand ] = new Anim(Anim.stand,[0,1,2,3,4],[25,25,25,25,0], true);
 
Anim.EquipmentAnim = Anim.getEmpty();
Anim.EquipmentAnim[Anim.stand].posKeys = [new AnimPosKey(0,0,0,0.4), new AnimPosKey(60,0,0,0.4)];
Anim.EquipmentAnim[ Anim.death ]  = new Anim(Anim.birth, [0,0],[4,1],false);
Anim.last.posKeys = [new AnimPosKey(0,0,0,0.4,1), new AnimPosKey(6,0,0,0.5,0.01),new AnimPosKey(20,0,0,0.5,0.01)];

Anim.FireballAnim = Anim.getEmpty();
Anim.FireballAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2],[2,2,2],true);
Anim.last.randomStart = true;
Anim.FireballAnim[ Anim.death ] = new Anim(Anim.death, [2,3,4,5],[2,2,2,2],false);

Anim.BlueballAnim = Anim.getEmpty();
Anim.BlueballAnim[ Anim.stand ] = new Anim(Anim.stand, [32,33,34],[2,2,2],true);
Anim.last.randomStart = true;
Anim.BlueballAnim[ Anim.death ] = new Anim(Anim.death, [34,35,40,41],[2,2,2,2],false);

Anim.GreenballAnim = Anim.getEmpty();
Anim.GreenballAnim[ Anim.stand ] = new Anim(Anim.stand, [36,37,38],[2,2,2],true);
Anim.last.randomStart = true;
Anim.GreenballAnim[ Anim.death ] = new Anim(Anim.death, [38,39,44,45],[2,2,2,2],false);

Anim.PlasmastarAnim = Anim.getEmpty();
Anim.PlasmastarAnim[ Anim.stand ] = new Anim(Anim.stand, [12,13 ],[1,1],true);
Anim.last.randomStart = true;
Anim.PlasmastarAnim[ Anim.death ] = new Anim(Anim.death, [14,15 ],[2,2 ],false);

Anim.RedballAnim = Anim.getEmpty();
Anim.RedballAnim[ Anim.stand ] = new Anim(Anim.stand, [10,11,12],[2,2,2],true);
Anim.last.randomStart = true;
Anim.RedballAnim[ Anim.death ] = new Anim(Anim.death, [13,14,15],[2,2,2],false);

Anim.AxeAnim = Anim.getEmpty();
Anim.AxeAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2],[1,1,1],true);
Anim.AxeAnim[ Anim.death ] = new Anim(Anim.stand, [4,5,6,7],[1,1.5,1.5,1],false);
Anim.AxeRedAnim = Anim.getEmpty();
Anim.AxeRedAnim[ Anim.stand ] = new Anim(Anim.stand, [8,9,10],[1,1,1],true);
Anim.AxeRedAnim[ Anim.death ] = new Anim(Anim.stand, [12,13,14,15],[1,1.5,1.5,1],false);

Anim.ExplosionAnim = Anim.getEmpty();
Anim.ExplosionAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2,3],[1.5,1.5,1.5,1.5],false);

Anim.GreenExplosionAnim = Anim.getEmpty();
Anim.GreenExplosionAnim[ Anim.stand ] = new Anim(Anim.stand, [4,5,6,7],[1.5,1.5,1.5,1.5],false);

Anim.BloodSplatAnim = Anim.getEmpty();
Anim.BloodSplatAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2,3,4],[2,2,2,2,2],false);
Anim.BloodSmallSplatAnim = Anim.getEmpty();
Anim.BloodSmallSplatAnim[ Anim.stand ] = new Anim(Anim.stand, [0,1,2,3,4],[1.5,1.5,1.5,1.5,1.5],false);
Anim.BloodSmallSplatAnim[ Anim.stand2 ] = new Anim(Anim.stand, [8,9,10,11],[1.5,1.5,1.5,1.5 ],false);

Anim.PlasmaAnim = Anim.getEmpty();
Anim.PlasmaAnim[ Anim.stand ] = new Anim(Anim.stand, [8,9,10],[1,1,2],false);
Anim.last.nextType = 1;
Anim.PlasmaAnim[ Anim.walk ] = new Anim(Anim.walk, [10,11,12],[2,2,2],true);
Anim.PlasmaAnim[ Anim.death ] = new Anim(Anim.death, [13,14,15],[2,2,2],false);
 
Anim.PunkBassAnim = Anim.getEmpty();
Anim.PunkBassAnim[Anim.stand] = new Anim(Anim.stand, [0,8,16,24],[2,2,2,2],true);
Anim.PunkDrumAnim = Anim.getEmpty();
Anim.PunkDrumAnim[Anim.stand] = new Anim(Anim.stand, [1,9,17,25,1,9,17,25],[1.5,1.5,1.5,1.5,1.5,1.5,1.5,1 ],true);
Anim.PunkGuitarAnim = Anim.getEmpty();
Anim.PunkGuitarAnim[Anim.stand] = new Anim(Anim.stand, [2,10,18,26],[2,2,2,2],true);
Anim.DancerAnim = Anim.getEmpty();
Anim.DancerAnim[Anim.stand] = new Anim(Anim.stand, [3,11,19,27],[2,2,2,2],true);
Anim.Punk1Anim = Anim.getEmpty();
Anim.Punk1Anim[Anim.stand] = new Anim(Anim.stand, [4,12,20,28],[2,2,2,2],true);
Anim.last.randomStart = true;
Anim.Punk2Anim = Anim.getEmpty();
Anim.Punk2Anim[Anim.stand] = new Anim(Anim.stand, [5,13,21,29],[2,2,2,2],true);
Anim.last.randomStart = true;
Anim.PunkChomperAnim = Anim.getEmpty();
Anim.PunkChomperAnim[Anim.stand] = new Anim(Anim.stand, [6,14,22,30],[3,3,3,3],true);
Anim.last.randomStart = true;

Anim.FireAnim = Anim.ItemAnim;
/*Anim.ButterflyAnim = Anim.getEmpty();
Anim.ButterflyAnim[ Anim.stand ] = new Anim(Anim.stand,[0,1,2,3,4,5],[1,1,1,1,1,1], true);
Anim.BatAnim = Anim.getEmpty();
Anim.BatAnim[ Anim.stand ] = new Anim(Anim.stand,[0,2,4],[1,1,1], true);*/