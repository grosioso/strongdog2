function Weapon(id, owner){
	this.owner = owner;
	this.id = id;
	this.cooldown = 36;
	this.cooldown_base = this.cooldown;
	this.damage = 15;
	this.knockback = 0.1;
	this.heat = 0;
	this.cooldownCounter = 0;
	this.projectileSetter = Projectile.setType_krnka; //null for hitscan
	this.hitscanRange = 999;
	this.hitscan_decal = true;
	this.texture = Asset.texture.minigun;
	this.shot_count = 1;
	this.ammo_cost = 1;
	this.shot_spread = 14;
	this.shot_spread_vertical = 8;
	this.swingDelay = 0;
	this.swing_frame = -1;
	this.put_away_delay = -1;
	this.grab_delay = 0;
	this.put_away_next_weapon = this;
	this.has_secondary_weapon = false;
	this.isTorch = false; //enables a local light around the player
	
	this.shootSound = SoundObject.shotgun;
	this.shootSoundPitch = 1;
	this.swingSound = null;
	this.hitSound = null;
	
	this.guiElem = null;
	this.animSpeed = 0.4;
	this.playShootAnim = true;
	this.animCollection = Anim.ShotgunAnim;
	this.rects = 
	[[0,167/512,150/512,135/512],
	[150/512,167/512,150/512,135/512],
	[300/512,167/512,150/512,135/512],
	[0,0,150/512,167/512],
	[150/512,0,150/512,167/512],
	[300/512,0,150/512,167/512]];
	this.ammo_screen_frames = [1,2,3,4,5,6];
	this.frame_x_offsets = null;
	this.frame_y_offsets = null;
	this.specialAnimLoop = null;
	this.specialLoop = null;
	this.spriteSize = 512;
	this.spriteOffsetX = 0;
	this.spriteOffsetY = 0;
	this.recoil = 0;
	this.muzzle_light_time = 5;
	this.swing_light_time = 0;
	this.always_lit = false;
	this.ammoId = 1;
	this.obtained = false;
	
	this.attack_pressed = function(){
		return (this==Gamestats.Hero.leftWeapon ? Control.key_secondary.pressed() : Control.key_primary.pressed());
	}
	
	this.loop = function(){
		if(this.specialLoop){
			this.specialLoop();
		}
		this.cooldownCounter = Math.max(0, this.cooldownCounter-1);
		
		if(this.put_away_delay >= 0){
			if(this.put_away_delay == 0){
				if( this == Gamestats.Hero.weapon ){
					this.put_away_next_weapon.equip(false);
					if(this.put_away_next_weapon.has_secondary_weapon){
						Gamestats.Hero.arsenal[0].equip(true);
					}else if(Gamestats.Hero.leftWeapon){
						Gamestats.Hero.leftWeapon.disable();
					}
				}
			}else{
				this.put_away_delay --;
			}
		}else if(this.grab_delay > 0){
			this.grab_delay --;
		}else if(Control.gameState == Control.gameState_inGame && this.attack_pressed() && this.has_ammo() ){
			if(this.cooldownCounter < 1 
			&& this.swing_frame < 0){ //only start next swing if swing is not in progress
				if(this.playShootAnim){
					this.guiElem.startAnim(Anim.attack);
					Environment.muzzle_light_time = Math.max(Environment.muzzle_light_time, this.swing_light_time);
				}
				this.swing_frame = 0;
				if(this.swingSound){
					this.swingSound.playAt(this.owner.x, this.owner.y);
				}
			}
		}
		if(this.swing_frame > -1){
			this.swing_frame += 1;
		}
		if(this.swing_frame >= this.swingDelay){
			this.swing_frame = -1;
			this.shoot( );
			if(this.shootSound){
				this.shootSound.playAt(this.owner.x, this.owner.y,this.shootSoundPitch);
			}
		}
		
		if(!this.has_ammo() && this != Gamestats.Hero.arsenal[1]){
			Weapon.setWeapon(1);
		}
	}
	
	this.equip = function(leftHand){
		var guiElem = leftHand ? GUI.LeftGunSprite : GUI.GunSprite;
		guiElem.texture = this.texture;
		guiElem.animCollection = this.animCollection;
		guiElem.gun = this;
		guiElem.specialAnimLoop = this.specialAnimLoop;
		guiElem.animSpeed = this.animSpeed;
		guiElem.setVisibility(true);
		this.guiElem = guiElem;
	
		if(leftHand){
			Gamestats.Hero.leftWeapon = this;
		}else{
			Gamestats.Hero.weapon = this;
		}
		
		this.put_away_delay = -1;
		this.grab_delay = 12;
		guiElem.startAnim(Anim.stand);
		guiElem.weapon_swap_y = 0.25;
		
		if(Gamestats.Hero.weapon.isTorch || Gamestats.Hero.leftWeapon && Gamestats.Hero.leftWeapon.isTorch){
			Gamestats.Hero.lightsource.size = 18; 
		}else{
			Gamestats.Hero.lightsource.size = 0;
		}
	}
	
	this.shoot = function( ){
		this.owner.ammoArray[this.ammoId].spend(this.ammo_cost);
		this.cooldownCounter += this.cooldown;
		
		//get target point
		var rad = 100;
		var targetX = rad*Math.cos(1.5707-cam.yaw)*Math.sin(cam.pitch) + cam.pos[0];
		var targetY = rad*Math.sin(1.5707-cam.yaw)*Math.sin(cam.pitch) + cam.pos[1];
		var targetZ = -rad*Math.cos(cam.pitch) + cam.pos[2];
		var targetVec = new Vector(targetX, targetY, targetZ);
		
		for(var i=0;i<this.shot_count;++i){
			targetVec.x = targetX+(RAND()-0.5)*this.shot_spread;
			targetVec.y = targetY+(RAND()-0.5)*this.shot_spread;
			targetVec.z = targetZ+(RAND()-0.5)*this.shot_spread_vertical;
			var isMultiShot = i>0; //only false for first bullet
			var roll_damage = Math.round(this.damage*(RAND()*0.5+0.75));
			if(this.projectileSetter){
				var p = Projectile.Create(this.projectileSetter, this.owner, roll_damage , null, targetVec, isMultiShot );
			}else{
				var u = NavNode.hitScan_unit([this.owner.x,this.owner.y,this.owner.z+this.owner.eyeZ],[targetVec.x,targetVec.y,targetVec.z], this.owner);
				if(u && Utils.distance_xxyyzz(this.owner.x, u.x , this.owner.y, u.y, this.owner.z+this.owner.eyeZ, u.z+u.collZ ) < this.hitscanRange + u.hardRadius ){
					u.Hurt(roll_damage , this.owner);
					if(this.hitSound){
						this.hitSound.playAt(u.x,u.y);
					}
					if(this.knockback){
						var ang = Math.atan2((u.y - this.owner.y), (u.x - this.owner.x));
						var ddx = Math.cos(ang) ;
						var ddy = Math.sin(ang) ;
						var knock = this.knockback * u.knockbackEffect;
						Vector.translate(u.windPressureVector, ddx*knock, ddy*knock);
					}
					
					if(NavNode.last_raycast_triangle && Utils.distance_array3d( NavNode.ray_result, NavNode.coll_center) < 2.5){
						//if in front of a wall, add blood splatter on wall
						var hit = NavNode.ray_result;
						var decal = Actor.SpawnWallDecal(hit[0],hit[1],hit[2],NavNode.last_collider, NavNode.last_raycast_triangle, 1);
						decal.scale = 0.1 + Math.random()*0.25;
						decal.opacity = 0.65;
						decal.texture = Asset.texture.blood;
					}
					
					Actor.SpawnWeaponBlood(NavNode.coll_center[0],NavNode.coll_center[1],NavNode.coll_center[2], u.last_floor_triangle);
					
				}else if(this.hitscan_decal && NavNode.last_raycast_triangle){
					var hit = NavNode.ray_result;
					NavNode.last_raycast_triangle.getSector().onShot( hit[0],hit[1],hit[2], NavNode.last_raycast_triangle,NavNode.last_collider, 1 );
				}
			}
		}
		
		if(this.recoil){
			cam.recoil( (0.5 + RAND()*0.5) * this.recoil, (0.5 - RAND()) * this.recoil);
		}
		Environment.muzzle_light_time = Math.max(Environment.muzzle_light_time, this.muzzle_light_time);
		
		if(this.owner.last_floor_triangle){
			//SoundSector.PropagateSound(this.owner.last_floor_triangle, 2);
			this.owner.last_floor_triangle.PropagateSound();
		}
	}
}
Weapon.prototype.get_ammo_count = function(){
	return this.owner.ammoArray[this.ammoId].count;
}
Weapon.prototype.has_ammo = function(){
	return this.get_ammo_count() >= this.ammo_cost;
}
Weapon.prototype.can_shoot = function(){
	return this.has_ammo() && this.put_away_delay < 0 && this.grab_delay <= 0;
}
Weapon.prototype.disable = function(){
	if(this == Gamestats.Hero.leftWeapon){
		Gamestats.Hero.leftWeapon = null;
		GUI.LeftGunSprite.setVisibility(false);
	}
}

Weapon.prototype.mirror = function(){
	for(var i=0;i<this.rects.length;++i){
		var rec = this.rects[i];
		rec[0] = 1-rec[2]-rec[0];
	}
}

Weapon.mouse_scroll = function(delta){
	var scroll_dir = Math.sign(delta);
	var currentId = Gamestats.Hero.weapon.id;
	for(var i=0;i<Gamestats.Hero.arsenal.length;++i){
		var nextId = Math.max(1, (currentId+i*scroll_dir + Gamestats.Hero.arsenal.length) % Gamestats.Hero.arsenal.length);
		var wep = Gamestats.Hero.arsenal[nextId];
		if(wep.has_ammo() && wep != Gamestats.Hero.weapon){
			if(Weapon.setWeapon(nextId)){
				break;
			}
		}
	}
}
Weapon.setWeapon = function(id){
	//Gamestats.Hero.arsenal[id].equip();
	var nextWep = Gamestats.Hero.arsenal[id];
	if(!nextWep || !nextWep.obtained){
		return false;
	}
	Gamestats.Hero.weapon.put_away_next_weapon = nextWep;
	//same weapon or swap is already in progress
	if( Gamestats.Hero.weapon.id == id || Gamestats.Hero.weapon.put_away_delay >= 0){return;}
	Gamestats.Hero.weapon.put_away_delay = 12;
	if(Gamestats.Hero.leftWeapon){
		Gamestats.Hero.leftWeapon.put_away_delay = 12;
	}
	return true;
}
Weapon.any_attack_pressed = function(){
	return Control.key_primary.pressed() || Gamestats.Hero.leftWeapon&&Control.key_secondary.pressed();
}

Weapon.Init = function(){
	Gamestats.Hero.arsenal = [
	Weapon.Fist(0,Gamestats.Hero),
	Weapon.Pistol(1,Gamestats.Hero),
	Weapon.Shotgun(2,Gamestats.Hero),
	Weapon.AK(3,Gamestats.Hero),
	Weapon.Claw(4,Gamestats.Hero),
	Weapon.PlasmaGun(5,Gamestats.Hero),
	Weapon.Minigun(6,Gamestats.Hero),
	/*Weapon.DoubleBarrel(7,Gamestats.Hero),
	Weapon.Claw(8,Gamestats.Hero),
	Weapon.Repenter(9,Gamestats.Hero)*/];
	/*Weapon.Fist(0,Gamestats.Hero),
	Weapon.Pistol(1,Gamestats.Hero),
	Weapon.Shotgun(2,Gamestats.Hero),
	Weapon.Minigun(3,Gamestats.Hero),
	Weapon.Rocket(4,Gamestats.Hero),
	Weapon.PlasmaGun(5,Gamestats.Hero),
	Weapon.AK(6,Gamestats.Hero),
	Weapon.DoubleBarrel(7,Gamestats.Hero),
	Weapon.Claw(8,Gamestats.Hero),
	Weapon.Repenter(9,Gamestats.Hero)];*/
	Gamestats.Hero.arsenal[0].obtained = true;
	Gamestats.Hero.arsenal[1].obtained = true;
}

Weapon.Shotgun = function(id,owner){
	var w = new Weapon(id,owner);
	w.shot_count = 7;
	w.damage = 10;
	w.projectileSetter = null; //hitscan
	w.recoil = 0.01;
	w.shootSoundPitch = 0.95;
	w.cooldown_base = w.cooldown = 36;
	w.ammoId = 2;
	w.spriteOffsetX = -0.28;
	w.frame_x_offsets = [-0.061,0,0,0,0,0];
	return w;
}

Weapon.Fist = function(id,owner){
	var w = new Weapon(id,owner);
	w.rects = 
	[[0,176/256 ,96/256,80/256],
	[128/256,139/256 ,128/256,117/256],
	[116/256,-10/256,140/256,(109 + 10)/256],
	[0/256,73/256,116/256,103/256],
	[0,0,110/256,73/256]];
	w.ammo_screen_frames = [5,5,5,5,5];
	w.animCollection = Anim.FistAnim;
	w.texture = Asset.texture.fist;
	w.spriteSize = 256;
	w.projectileSetter = null;
	w.spriteOffsetX = -0.46;
	w.swingSound = SoundObject.whoosh;
	w.shootSound = null;
	w.hitSound =SoundObject.shock;
	w.swingDelay = 1;
	w.cooldown_base = w.cooldown = 24;
	w.damage = 12;
	w.hitscanRange = 0.8;
	w.ammo_cost = 0;
	w.hitscan_decal = false;
	w.muzzle_light_time = 0;
	w.knockback = 0.3;
	return w;
}

Weapon.Sword = function(id,owner){
	var w = new Weapon(id,owner);
	w.texture = Asset.texture.sword;
	w.spriteSize = 512;
	w.spriteOffsetX = -0.8;
	w.animCollection = Anim.SwordAnim;
	w.shootSound = SoundObject.whoosh;
	w.hitSound = SoundObject.hit_melee;
	w.swingDelay = 7;
	w.knockback = 0.3;
	w.ammo_screen_frames = [4,4,4,4,4,4,4,4,4,4];
	w.damage = 30;
	w.cooldown_base = w.cooldown = 18;
	w.projectileSetter = null;
	w.hitscanRange = 1;
	w.frame_x_offsets = [0, -0.1, 0.25, 0.35, 0.55, 0.5, 0.4, 0.35, 0.4];
	w.rects = [
	[337/512,196/512,175/512,316/512],
	[0,0,175/512,270/512],
	[175/512,0,87/512,270/512],
	[267/512,0,120/512,180/512],
	[386/512,0,120/512,160/512],
	[0,443/512,126/512,69/512],
	[0,270/512,126/512,173/512],
	[126/512,270/512,101/512,242/512],
	[262/512,226/512,61/512,286/512],
	]
	w.ammo_cost = 0;
	w.hitscan_decal = false;
	w.muzzle_light_time = 0;
	return w;
}


Weapon.Claw = function(id,owner){
	var w = new Weapon(id,owner);
	w.rects = 
	[[0,0,0.25,0.25],
	[0.25,0,0.25,0.25],
	[0.5,0,0.25,0.25],
	[0.75,0,0.25,0.25],
	[0,0.25,0.25,0.3],
	[0.25,0.25,0.25,0.3],
	[0.5,0.25,0.25,0.3],
	[0.75,0.25,0.25,0.3],
	];
	w.mirror();
	w.spriteOffsetX = -0.05;
	w.has_secondary_weapon = true;
	//w.spriteOffsetX = -0.36;
	w.animCollection = Anim.ClawAnim;
	w.texture = Asset.texture.claw;
	w.spriteSize = 512;
	w.projectileSetter = Projectile.setType_claw;
	w.swingSound = SoundObject.claw;
	w.shootSound = SoundObject.fireball;
	w.cooldown_base = w.cooldown = 30;
	w.damage = 38;
	w.shot_count = 3;
	w.swingDelay = 6;
	w.ammoId = 3;
	w.always_lit = true;
	w.isTorch = true;
	 
	w.ammo_screen_frames = [0,0,0,0,0,0,0,0,0];
	return w;
}
	
Weapon.Pistol = function(id,owner){
	var w = new Weapon(id,owner);
	w.shot_count = 1;
	w.damage = 25;
	w.cooldown_base = w.cooldown = 20;
	w.projectileSetter = Projectile.setType_plasma_pistol;
	w.texture = Asset.texture.pistol;
	w.animCollection = Anim.PistolAnim;
	w.shootSound = SoundObject.plasmapistol;
	w.shot_spread = 6;
	w.shot_spread_vertical = 2;
	w.spriteSize = 256;
	w.has_secondary_weapon = true;
	w.rects = 
	/*[[0,0 ,112/256,128/256],
	[112/256,0 ,112/256,128/256],
	[112/256,128/256,112/256,128/256],
	[0/256,128/256,112/256,128/256]];*/
	[[0,0 ,128/256,128/256],
	[128/256,0 ,128/256,128/256],
	[128/256,128/256,128/256,128/256],
	[0/256,128/256,128/256,128/256]];
	//w.spriteOffsetX = -0.237;
	w.spriteOffsetX = -0.1;
	//w.spriteOffsetY = 0.05;
	w.ammo_screen_frames = [7,8,9,10];
	w.ammoId = 0;
	w.muzzle_light_time = 8;
	
	w.specialLoop = function(){//minigun wind-up
		this.cooldown = 7+ Math.max(0,(this.cooldown_base-7)*(1-this.heat));
		this.shot_spread = 3 + this.heat * 35;
		if(Control.key_primary.pressed() && this.can_shoot() ){
			var speed_increment = 0.05;
			var heat_increment = speed_increment/(this.cooldown_base - 7);
			this.heat = Math.min(1, this.heat + heat_increment );
			/*if(this.heat >= 1 && Gamestats.mapTime%60 == 0){
				this.owner.Hurt(3, this.owner); //burn player when maximum heat
			}*/
		}else{
			this.heat = Math.max(0, this.heat - 0.05);
		}
	}
	return w;
}

Weapon.Rocket = function(id,owner){
	var w = new Weapon(id,owner);
	w.shot_count = 1;
	w.damage = 110;
	w.cooldown_base = w.cooldown = 22;
	w.projectileSetter = Projectile.setType_rocket;
	w.texture = Asset.texture.rocket;
	w.animCollection = Anim.RocketAnim;
	w.swingSound = SoundObject.rocket;
	w.shootSound = null;
	w.swingDelay = 6;
	w.shot_spread = 0;
	w.shot_spread_vertical = 0;
	w.spriteSize = 512;
	w.rects = 
	//[[0,0 ,150/512,128/512], [150/512 ,0 ,156/512,128/512], [0/512 ,128/512 ,170/512,128/512],[170/512 ,128/512 ,160/512,128/512]];
	[[0,0 ,160/512,128/512], [160/512 ,0 ,160/512,128/512], [0/512 ,128/512 ,160/512,128/512],[160/512 ,128/512 ,160/512,128/512]];
	//w.spriteOffsetX = 0.48;
	w.spriteOffsetX = -0.305;
	w.ammo_screen_frames = [11,12,13,14];
	w.ammoId = 3;
	w.muzzle_light_time = 7;
	w.swing_light_time = 7;

	return w;
}

Weapon.AK = function(id,owner){
	var w = new Weapon(id,owner);
	w.shot_count = 1;
	w.damage = 18;
	w.cooldown_base = w.cooldown = 6;
	w.texture = Asset.texture.rocket;
	w.animCollection = Anim.AKAnim;
	w.shootSound = SoundObject.ak;
	w.shot_spread = 0;
	w.shot_spread_vertical = 0;
	w.spriteSize = 512;
	w.rects = 
	[[0,256/512 ,150/512,128/512],[150/512,256/512 ,150/512,128/512],[300/512,256/512 ,170/512,128/512],[0,384/512 ,200/512,128/512]];
	w.spriteOffsetX = -0.31;
	w.ammo_screen_frames = [15,16,17,18];
	w.ammoId = 1;
	w.recoil = 0.006;
	w.projectileSetter  = null;
	w.muzzle_light_time = 4;
	
	return w;
}

Weapon.PlasmaGun = function(id,owner){
	var w = new Weapon(id,owner);
	w.shot_count = 1;
	w.damage = 25;
	w.cooldown_base = w.cooldown = 4;
	w.texture = Asset.texture.plasmagun;
	w.animCollection = Anim.PlasmaGunAnim;
	w.shootSound = SoundObject.plasmagun;
	w.shot_spread = 0;
	w.shot_spread_vertical = 0;
	w.spriteSize = 512;
	w.spriteOffsetX = -0.303;
	w.rects = 
	[[0,0,160/512,140/512],
	[160/512,0,160/512,140/512],
	[320/512,0,160/512,140/512],
	[0,140/512,160/512,140/512],
	[160/512,140/512,160/512,140/512],
	];
	w.ammo_screen_frames = [32,33,34,35,36];
	w.ammoId = 0;
	w.recoil = 0.0;
	w.projectileSetter  = Projectile.setType_plasma;
	w.muzzle_light_time = 5;
	
	w.specialLoop = function(){ //randomize shooting sprite, similar to Doon plasma gun
		if(Gamestats.mapTime%3 == 0){
			Anim.PlasmaGunAnim[Anim.attack].frames[0] = Math.floor(Math.random()*0.99*3)+2;
		}
	}
	return w;
}

Weapon.Repenter = function(id,owner){
	var w = Weapon.PlasmaGun(id,owner);
	w.projectileSetter = Projectile.setType_goop;
	w.cooldown_base = w.cooldown = 2;
	w.shootSound = SoundObject.fireball;
	w.rects = 
	[[0,280/512,160/512,115/512],
	[0,395/512,160/512,115/512],
	[160/512,280/512,160/512,140/512],
	[320/512,280/512,160/512,140/512],
	[320/512,140/512,160/512,140/512],
	];
	return w;
}

Weapon.DoubleBarrel = function(id,owner){
	var w = new Weapon(id,owner);
	w.texture = Asset.texture.doublebarrel;
	w.rects  =
	[[0,0,160/512,0.25],[160/512,0,160/512,0.25],[320/512,0,160/512,0.25],[0,0.25,160/512,0.25],[160/512,0.25,160/512,0.25],[320/512,0.25,160/512,0.25],
	[0, 0.5, 160/512,106/512], [160/512, 0.5, 160/512,0.25],[320/512, 0.5, 160/512,0.25],
	[0, 0.75, 160/512,0.25],[160/512, 0.75, 160/512,0.25],[320/512, 0.75, 160/512,0.25]];
	w.animCollection = Anim.DoubleBarrelAnim;
	w.shootSound = SoundObject.ssg;
	w.shot_count = 12;
	w.damage = 15;
	w.projectileSetter = null; //hitscan
	w.recoil = 0.016;
	w.shot_spread = 26;
	w.shot_spread_vertical = 14;
	w.cooldown_base = w.cooldown = 58;
	w.ammo_screen_frames = [20,21,22,23,24,25,26,27,28,29,30,31];
	w.spriteOffsetX = 0.476;
	w.ammo_cost = 2;
	w.ammoId = 2;
	w.spriteOffsetX = -0.34;
	return w;
}


Weapon.Minigun = function(id,owner){
	var w = new Weapon(id,owner);
	w.shootSound = SoundObject.minigun;
	w.animCollection = Anim.MinigunAnim;
	w.cooldown_base = w.cooldown = 7;
	w.animSpeed = 0;
	w.playShootAnim = false;
	w.projectileSetter = null;
	w.damage = 15;
	w.shot_spread = 6;
	w.ammoId = 1;
	w.muzzle_light_time = 4;
	w.spriteOffsetX = -0.225;
	w.specialLoop = function(){//minigun wind-up
		if(Control.key_primary.pressed() && this.can_shoot() ){
			this.cooldown = Math.min(6, Math.max(3,this.cooldown * 0.95));
		}else{
			this.cooldown = Math.min(7,this.cooldown + 0.1);
		}
	}
	
	w.specialAnimLoop = function(){
		this.animSpeed = 2*(1/this.gun.cooldown - 1/7);
		this.frameTime += this.animSpeed  *Render.frameDelta;
		
		if(Control.key_primary.pressed() && this.animSpeed > 0.01 ){
			this.frame = Math.floor(this.frameTime ) % 3 + 3;
		}else{
			this.frame = Math.floor(this.frameTime ) % 3;
		}
	}
	
	w.rects = [[0,412/512, 120/512,100/512],
	[120/512,412/512, 120/512,100/512],
	[240/512,412/512, 120/512,100/512],
	[0,302/512, 120/512,110/512],
	[120/512,302/512, 120/512,110/512],
	[240/512,302/512, 120/512,110/512]];
	
	w.ammo_screen_frames = [37,38,39,40,41,42];
	return w;
}

function HeroAmmo(id, cap){
	this.count = 0;
	this.count_max = cap;
}
HeroAmmo.prototype.spend = function(delta){
	this.count = Math.max(0, this.count-delta);
}
HeroAmmo.prototype.add = function(delta){
	this.count = Math.min(this.count_max, this.count+delta);
}
HeroAmmo.Caps = [200,200,50,50,50];
HeroAmmo.Init = function(){
	Gamestats.Hero.ammoArray = [];
	for(var i=0;i<5;++i){
		Gamestats.Hero.ammoArray[i]= new HeroAmmo(i, HeroAmmo.Caps[i]);
	}
	Gamestats.Hero.ammoArray[0].count = 20;
	Gamestats.Hero.ammoArray[1].count = 0;
	Gamestats.Hero.ammoArray[2].count = 0;
	Gamestats.Hero.ammoArray[3].count = 0;
	Gamestats.Hero.ammoArray[4].count = 0;
}

var Damagetype = new Object();
Damagetype.NORMAL = 0;
Damagetype.HAZMAT = 1;