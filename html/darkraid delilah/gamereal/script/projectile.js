function Projectile(caster){
	this.caster = caster;
	this.alive = true;
	this.owner = this.caster.owner;
	this.damage = 0;
	this.knockback = 0;
	this.knockback_absoulte = 0; //not affected by unit's knockbackEffect stat
	this.isProjectile = true;
	this.pierce = false;
	this.pierce_damage_loss = 0.5;
	this.piercelist = null;
	this.multishot = 0;
	this.stunChance = 0;
	this.bleedTime = 0;
	this.lifesteal = 0;
	this.self_damage = 0;
	this.canBeReflected = false;
	this.noFriendlyCollision  = false;
	this.makeRagdoll = false;
	this.gravity = 0.0;
	this.gravity_dead = 0.02;
	this.dies_on_landing = true;
	this.floor_triangle = null;
	this.loop_special = null;
	this.decalSize = 1;
	
	if(!this.caster.isProjectile){
		if(!this.caster.hasTurret){
			this.x = caster.x + Math.sin(caster.angle)*caster.projectileLaunchY;
			this.y = caster.y + Math.cos(caster.angle)*caster.projectileLaunchY;
		}else{
			this.x = caster.x + Math.sin(caster.angle)*caster.projectileLaunchY;
			this.y = caster.y + Math.cos(caster.angle)*caster.projectileLaunchY;
			//NON-DETERMINISTIC
			//this.x = caster.actor.turret.x - Math.sin( caster.actor.turret.rotZ)*caster.projectileLaunchY;
			//this.y = caster.actor.turret.y - Math.cos( caster.actor.turret.rotZ)*caster.projectileLaunchY;
		}
		this.z = caster.z + caster.projectileLaunchZ;
	}else{
		this.x = caster.x;
		this.y = caster.y;
		this.z = caster.z;
	}
	
	this.decayTime = 0;
	this.deathZ = 0;
	this.decayCounter = 0;
	this.dieWhenOwnerDies = false;
	this.compensateTargetMotion = false;
	
	this.speed = 0.5;
	this.arrivalRange = 1;
	
	this.canCollide = false;
	this.hasTarget = true;
	this.collRadius = 0.15; //only used for non-targeted projectiles
	this.areaRadius = 1.8;
	this.areaDamageFactor = 0.5;
	this.areaKnockbackFactor = 0.5;
	this.hardRadius = 0.08; //only used for cannonballs on the ground and terrain collision
	this.targetZOffset = 0.6;
	this.areaTargetFilter = SearchFilter.isEnemy;
	
	this.startPoint = new Vector(this.x, this.y, this.z);
	this.startDist = 0;
	this.parabolaFactor = 1;
	
	this.dx = 0;
	this.dy = 0;
	this.dz = 0;
	
	this.homing = true;
	this.lookForTarget = false;
	this.scatter = 0;
	this.spawnParticleFunction = null;
	this.deathParticleFunction = null;
	this.bounceParticleFunction = null;
	//if null, it will inherit land effect. If you want to disable it, use empty function instead
	this.deathParticleFunction_water = null;
	//when true: even if deathParticleFunction_water is null, if hit unit stands in the water, splash is played
	this.water_hit_inherit_splash = false;
	this.bloodsplatSize = 1;
	this.hasLaunchLight = true;
	this.hasDeathLight = false;
	this.deathSound = null;
	this.splashEffect = null;
	this.splashHappened = false;
	this.angle = 0;
	this.pitch = 0;
	this.timeLeft = -1;
	this.age = 0;
	this.soulburn_time = 0;
	
	this.actor = Actor.ProjectileActor(this);
	this.dest =  new Vector(0, 0, 0);
	this.atNode = null;

	this.targetUnit = null;

	this.arrivalEffect = Projectile.collisionEffect;
	this.areaEffect = null;
	this.applyAreaEffect = Projectile.applyAreaEffect;
	this.collisionEffect = Projectile.collisionEffect;
	this.collisionEffect_special = null;
	this.areaEffect_special = null;
	this.removeEffect_special = null;
	this.collisionObstacle = Projectile.collisionObstacle;
	this.collisionLoop = Projectile.collisionLoop;
	this.turnFactor = 0;
	
	this.lastHitUnit = null;
	this.typeSetter = null;
}

Projectile.prototype.getAtNode = Unit.prototype.getAtNode;

Projectile.prototype.loop_first = function(){
	if(this.alive == false){
		if(this.decayCounter >= this.decayTime ){
			this.Remove();
		}else{
			this.dz -= this.gravity_dead;
			this.z += this.dz;
			
			this.dx *= 0.7;
			this.dy *= 0.7;
			
			this.x += this.dx;
			this.y += this.dy;
		}
		this.decayCounter ++;
		return;
	}
	
	/*if(this.splashEffect != null){
		var waterLevel = M.terrain.getWaterAt(this.x,this.y);
		waterLevel -= 0.1;
		if((this.z >  waterLevel) && (this.z+this.dz <= waterLevel)){
			this.splashEffect(this.x, this.y, this.z, Math.random());
			this.splashHappened = true;
		}
	}*/
	
	if(this.targetUnit != null && this.targetUnit.alive == true){
		this.dest.x = this.targetUnit.x;
		this.dest.y = this.targetUnit.y;
		this.dest.z = this.targetUnit.z + this.targetZOffset;
	}
	
	this.atNode = this.getAtNode();
	
	if(!Pathfinder.getNodeAt(this.x + this.dx, this.y + this.dy)){
		this.Die(); return;
	}
	if(this.timeLeft == 0 || Math.abs(this.z)>50){
		this.Remove(); return;
	}
	if(this.timeLeft > 0){
		this.timeLeft --;
	}
	this.age ++;
	if(this.fuse > 0){
		this.fuse --;
	}
	
	if(this.hasTarget == true && this.checkArrival() == true || this.fuse == 0){
		if(this.targetUnit && this.targetUnit.alive == true && !this.targetUnit.isDummy && this.hasTarget ){
			this.arrivalEffect(this.targetUnit);
		}else{
			this.collisionObstacle();
		}
		this.lastHitUnit = this.targetUnit;
		this.Die();
		return;
	}
	
	if(this.dieWhenOwnerDies == true && this.caster.alive == false){
		this.Die();
		return;
	}
	
	this.dz -= this.gravity;
	var total_delta = Math.sqrt(this.dx*this.dx + this.dy*this.dy + this.dz*this.dz);
	
	if(this.canCollide == true){
		var collider = this.hitTest();
		if(collider != null 
		&& (this.piercelist==null||this.piercelist.indexOf(collider)<0)){
			//UNIT COLLISION
			if(collider.owner && collider.owner.team != this.owner.team){
				this.collisionEffect(collider);
			}else{
				this.applyAreaEffect();
			}
			this.lastHitUnit = collider;
			var reflect = collider.reflectChance > RAND();
			if(this.piercelist != null && this.damage > 1 
			&& (this.canBeReflected == false || !reflect )){
				this.piercelist.push(this.lastHitUnit);
				this.damage *= this.pierce_damage_loss;
				this.bleedTime *= this.pierce_damage_loss;
			}else{
				if(this.canBeReflected == true && reflect){
					Projectile.Reflect(this, collider);
				}
				this.Die();
				return;
			}
		}else{
			//MAP COLLISION
			if(!this.hasTarget){
				var hit = NavNode.rayCast_all([this.x,this.y,this.z],[this.x+this.dx,this.y+this.dy,this.z+this.dz]);
				if(NavNode.last_raycast_dist < total_delta + this.hardRadius){
					NavNode.last_raycast_triangle.getSector().onShot( hit[0],hit[1],hit[2], NavNode.last_raycast_triangle, NavNode.last_collider, this.decalSize );
					if(this.dies_on_landing == true){
						this.collisionObstacle();
						this.Die();
					}else{
						if( total_delta > 0.05){
							vec3.rotate_collider_inverse(hit , NavNode.last_raycast_triangle.plane , NavNode.last_collider );
							this.bounce(hit[0],hit[1],hit[2], 0.7 );
						}else{ //stick
							this.dx=this.dy=this.dz =this.gravity = 0;
						}
						//this.parabolaFactor = 0;
					}
					return;
				}
			}
		} 
	}

	if(this.homing == true){
		if(this.turnFactor){
			var newAngle = this.dest.x != this.x ? Math.atan2((this.dest.x - this.x),(this.dest.y - this.y)) : 1.57;
			this.turn_gradual(newAngle);
		}else{
			this.angle = this.dest.x != this.x ? Math.atan2((this.dest.x - this.x),(this.dest.y - this.y)) : 1.57;
		}
		this.pitch = Math.atan2( this.dest.z - this.z, Utils.distance_xxyy(this.x,this.dest.x, this.y, this.dest.y) );
		var pcos = Math.cos(this.pitch);
		this.dx = (Math.sin(this.angle)) *this.speed * pcos;
		this.dy = (Math.cos(this.angle)) *this.speed * pcos;
		this.dz = Math.sin(this.pitch) * this.speed;
	}else{
		this.angle = Math.atan2(this.dx, this.dy);
	}
	
	if(this.loop_special){
		this.loop_special();
	}
	
	this.z += this.dz;
	this.x += this.dx;
	this.y += this.dy;
	
	/*else if(this.lookForTarget == true && this.age%4 == 3){
		this.targetUnit = Projectile.getAutoTarget(this);
		if(this.targetUnit!=null){
			this.hasTarget = true;
			this.homing = true;
		}
	}*/

	
	/*var pcos = Math.cos(this.pitch);
	this.dx = (Math.sin(this.angle)) *this.speed * pcos;
	this.dy = (Math.cos(this.angle)) *this.speed * pcos;
	//parabola trajectory, so the delta will be its derivate, which is a linear function
	this.dz =  Math.cos(this.pitch)*this.parabolaFactor *(0.5*this.startDist - Unit_Distance(this, this.startPoint))/this.startDist;
	this.dz += Math.sin(this.pitch) * this.speed;*/
}

Projectile.prototype.Die = function(){
	this.alive = false;
	this.deathZ = this.z;
	//this.dz = 0.06; //bounce up on collision
	this.dz = 0;
	this.dx = 0;
	this.dy = 0;
	if(this.actor.visible && (this.deathParticleFunction != null || this.deathParticleFunction_water != null)){
		var smokeAngle = -this.angle +1.57;
		var waterLevel = -99;
		if(this.deathParticleFunction_water != null || this.splashEffect != null){
			waterLevel = M.terrain.getWaterAt(this.x,this.y) - 0.1;
		}
		
		if(this.deathParticleFunction_water != null && waterLevel>this.z 
		|| this.splashEffect != null 
		&& this.lastHitUnit!=null && waterLevel >= this.lastHitUnit.z){ //hit unit is standing in water
			if(this.deathParticleFunction_water != null){
				this.deathParticleFunction_water(this.x,this.y,this.z, smokeAngle);
			}else if(this.water_hit_inherit_splash == true 
			&& waterLevel < this.z){ //splash didn't happen yet;
				this.splashEffect(this.x,this.y,this.z, smokeAngle);
			}
		}else{
			var part = this.deathParticleFunction(this.x,this.y,this.z, smokeAngle);
			part.floor_triangle = this.floor_triangle;
		}
	}
	if(this.deathSound != null){
		this.deathSound.playAt(this.x , this.y );
	}
	if(this.decayTime <= 0){
		this.Remove();
	}else{
		this.actor.startAnimation(Anim.death);
		if(this.actor.lightsource){
			this.actor.lightsource.detachFromActor();
		}
	}
}

Projectile.prototype.Remove = function(){
	if(this.removeEffect_special){
		this.removeEffect_special();
	}
	this.alive = false;
	this.actor.remove();
	this.actor = null;
	this.atNode = null;
	Projectiles.splice(Projectiles.indexOf(this), 1);
}

Projectile.prototype.checkArrival = function(){
	if( (this.x - this.dest.x)*(this.x - this.dest.x) + (this.y-this.dest.y)*(this.y-this.dest.y) < this.arrivalRange*this.arrivalRange ){
		return true;
	}
	return false;
}

Projectile.prototype.bounce = function( nx, ny, nz, surface_bounce ){
	this.dx*=surface_bounce;
	this.dy*=surface_bounce;
	this.dz*=surface_bounce;
	
	var dot = nx*this.dx + ny*this.dy + nz*this.dz;
	this.dx -= 2*dot*nx;
	this.dy -= 2*dot*ny;
	this.dz -= 2*dot*nz;
	
	if(this.bounceParticleFunction){
		var norm_angle = this.angle; //NOT CORRECT, placeholder
		this.bounceParticleFunction(this.x, this.y, this.z, -1.57-norm_angle)
	}
}

Projectile.prototype.hitTest = function(){
	var nx = this.atNode.nodex; var ny = this.atNode.nodey;
	var minDist = 999999;
	var minUnit = null;
	
	var delta = Utils.length_xyz(this.dx,this.dy,this.dz);
	var iters = 1+Math.floor(4*delta);
	var tilesRadius = 1+Math.floor(delta);
	
	for(var i=-tilesRadius; i<=tilesRadius; ++i){
		if(ny+i < 0 || ny + i >= Pathfinder.mapH){continue};
		for(var j=-tilesRadius;j<=tilesRadius;++j){
			if(nx+j < 0 || nx + j >= Pathfinder.mapW){continue};
			
			var nod = Pathfinder.map[ny+i][nx+j];
			for(var u=nod.firstColl;u;u=u.nextColl){
				if(u.isColliderDoodad!=true && (!u.alive 
				//garrisoned units excluded
				|| u.container
				|| this.caster == u || this.noFriendlyCollision&&this.owner == u.owner)){continue;}
				
				for(var k=0;k<iters;++k){
					var fac = k/iters; //sub-frame collision for fast projectiles
					var iterZ = this.z+this.dz*fac;
					var distance = Utils.distance_xxyy( this.x+this.dx*fac, u.x, this.y+this.dy*fac, u.y);
					if(distance <= u.hardRadius + this.collRadius && distance < minDist){
						if(!u.on_ceiling && iterZ>u.z-this.collRadius && iterZ<u.z + u.cylinder_height+this.collRadius
						|| u.on_ceiling && iterZ>u.z-u.cylinder_height-this.collRadius && iterZ<u.z+this.collRadius ){
							minDist = distance;
							minUnit = u;
						} 
					}
				}
			}
		}
	}
	return minUnit;
}

Projectile.applyAreaEffect = function(){
	if(this.areaEffect == null){
		return;
	}
	var tilesRadius = Math.ceil(this.areaRadius);

	var pf = Pathfinder;
	var nx = this.atNode.nodex; var ny = this.atNode.nodey;
	var minDist = 999999;
	var minUnit = null;
	for(var i=-tilesRadius; i<=tilesRadius; ++i){
		if(ny+i < 0 || ny + i >= pf.mapH){continue};
		for(var j=-tilesRadius;j<=tilesRadius;++j){
			if(nx+j < 0 || nx + j >= pf.mapW){continue};
			var nod = pf.map[ny+i][nx+j];
			for(var u=nod.firstColl;u;u=u.nextColl){
				if(u.isColliderDoodad != true && this.areaTargetFilter.filterFunction(this.caster, u)
					&& u.last_aoe_source != this){
					var distance = Unit_Distance_3d(this,u);
					var r = u.hardRadius + this.areaRadius;
					if(distance <= r ){
						u.last_aoe_source = this;
						this.areaEffect(u,  (r - distance)/r );
					}
				}
			}
		}
	}
}

Projectile.areaEffect = function(u, distFactor){
	if(distFactor >= 0.1){
		if(u.owner.team == this.owner.team ){
			u.Hurt(this.damage * distFactor * this.areaDamageFactor * this.self_damage, this.caster);
		}else{
			u.Hurt(this.damage * distFactor * this.areaDamageFactor , this.caster);
		}
	}
	
	var ang = Math.atan2((u.y - this.y), (u.x - this.x));
	var ddx = Math.cos(ang) * distFactor;
	var ddy = Math.sin(ang) * distFactor;
	var knock = this.knockback * this.areaKnockbackFactor * u.knockbackEffect;
	Vector.translate(u.windPressureVector, ddx*knock, ddy*knock);
	
	if(distFactor >= 0.3){
		u.actor.hitRotY += ddx*u.proto.hitRotEffect*0.5;
		u.actor.hitRotX += ddy*u.proto.hitRotEffect*0.5;
	}
	if(this.areaEffect_special){
		this.areaEffect_special(u,distFactor);
	}
	
	if(this.makeRagdoll == true && u.alive == false && 
	u.proto.canBeGrabbed == true && distFactor > RAND()-0.1){
		Unit.MakeRagdoll(u, ang, distFactor);
	}
}

Projectile.areaHeal = function(u,distFactor){
	if(distFactor>0 && u.owner.team == this.owner.team && u.born){
		u.Repair(Math.min(200, this.damage * (u.hp_max/100)) , this );
	}
}
Projectile.areaSteal = function(u, distFactor){
	if(u.owner.team != this.owner.team){
		Unit.removeCarriedResource(u);
	}
}

Projectile.areaNova = function(u,distFactor){
	if(distFactor>0 && u.owner.team != this.owner.team && u.born && !u.isStructure){
		u.Hurt(this.damage*u.hp_max/100, this.caster );
	}
}

Projectile.spawnSpiderEffect = function(){
	Effect.SpawnBabySpider(this,null);
}
Projectile.spawnLeaperEffect = function(){
	Effect.SpawnLeaper(this,null);
}

Projectile.collisionEffect = function(collider){
	if(collider.isColliderDoodad){
		this.applyAreaEffect();	
		return;
	}
	
	if(collider.actor.visible == true && collider.proto.hasBlood == true){
		Actor.SpawnWeaponBlood(this.x,this.y,this.z, collider.last_floor_triangle);
	} 
	
	collider.Hurt(this.damage, this.caster);

	this.applyAreaEffect();	
	if(this.collisionEffect_special){
		this.collisionEffect_special(collider);
	}
	//if ragdolled, actor no longer exists
	if(collider.actor!=null && collider.actor.visible){
		collider.actor.hitRotY += this.dx/this.speed*0.3*collider.proto.hitRotEffect;
		collider.actor.hitRotX += this.dy/this.speed*0.3*collider.proto.hitRotEffect;
	}
	
	var knock = this.knockback;
	if(collider.alive == true){

		if(this.stunChance > 0 && this.stunChance > RAND()){
			Unit.Stun(collider);
		}
		
		if(this.soulburn_time > 0){
			AbilityInstance.applyBuff(collider, Ability.Soulburn, this.soulburn_time, this.caster);
		}
		
		if(this.lifesteal > 0){
			if(this.caster == Gamestats.Hero){
				var newHp = 
				Math.min(this.caster.hp_max+this.caster.saturation,this.caster.hp + this.damage*this.lifesteal);
				this.caster.hp = Math.max(this.caster.hp, newHp);
			}else{
				this.caster.hp = Math.min(this.caster.hp+this.damage*this.lifesteal, this.caster.hp_max);
			}
		}
	}else{
		//units on death are knocked back further
		knock = this.knockback *1.7;
	}
		
	
	if(this.hasDeathLight == true){
		var expl = LightDecal.Create_Volatile(10, 0.25 , 0.3); //warning, this is a volatile lightdecal
		expl.moveTo(this.x, this.y);
		expl.angle = Math.atan2(this.y-collider.y, this.x - collider.x);
	}
	
	knock *= collider.knockbackEffect;
	knock += this.knockback_absoulte;
	Vector.translate(collider.windPressureVector, this.dx*knock, this.dy*knock);
}

Projectile.collisionObstacle = function(){
	this.applyAreaEffect();
	if(this.hasDeathLight == true){
		var expl = LightDecal.Create_Volatile(10, 0.25 , 0.3); //warning, this is a volatile lightdecal
		expl.moveTo(this.x, this.y);
		expl.angle = Math.atan2(this.dy, this.dx);
	}
}

Projectile.setType_cannon = function(p){
	p.parabolaFactor = 0.22;
	p.homing = false;
	p.canCollide = true;
	p.hasTarget = false;
	p.hasDeathLight = true;
	p.scatter = 0.2;
	p.actor.scale = 0.7;
	p.knockback = 1.2;
	p.areaRadius = 3;
	p.areaEffect = Projectile.areaEffect;
	p.spawnParticleFunction = ParticleActor.SpawnCannonSmoke;
	p.deathParticleFunction = ParticleActor.SpawnCannonDebris;
	p.deathParticleFunction_water = Utils.DO_NOTHING;
	p.splashEffect = ParticleActor.SpawnWaterExplosion;
	p.water_hit_inherit_splash = true;
	p.bloodsplatSize = 1.7;
	p.decayTime = 120;
	p.actor.texture = p.actor.texture_default = Asset.texture.cannonball;
	p.makeRagdoll = true;
	p.deathSound = null;
}

Projectile.setType_pistol = function(p){
	p.parabolaFactor = 0;
	p.canCollide = true;
	p.homing = false;
	p.knockback = 0.5;
	p.actor.model = Asset.model.bullet;
	p.actor.shadowModel = p.actor.model;
	p.actor.hasShadow = true;
	p.spawnParticleFunction = ParticleActor.SpawnPistolSmoke;
	p.hasTarget = false;
	p.splashEffect = ParticleActor.SpawnSplash;
	p.canBeReflected = true;
	if(p.caster == Gamestats.Hero && p.caster.weapon == Gamestats.Hero.pistol){
		Projectile.getWeaponStats(p,Gamestats.Hero.pistol);
		if(p.pierce){
			p.actor.scale = 0.3;
			p.actor.shadowShader = ShaderProgram.shadowShader;
			p.actor.model = p.actor.shadowModel = Asset.model.bullet_sniper;
		}
	}
}
Projectile.setType_smg = function(p){
	Projectile.setType_pistol(p);
	p.canBeReflected = true;
	if(p.caster == Gamestats.Hero){
		Projectile.getWeaponStats(p,Gamestats.Hero.smg);
		if(p.pierce){
			p.actor.scale = 0.3;
			p.actor.shadowShader = ShaderProgram.shadowShader;
			p.actor.model = p.actor.shadowModel = Asset.model.bullet_sniper;
		}
	}
}

Projectile.setType_bomb = function(p){
	p.parabolaFactor = 0.5;
	p.actor.scale = 1;
	p.canCollide = true;
	p.homing = false;
	p.hasLaunchLight = false;
	p.hasDeathLight = true;
	p.knockback = 0.5;
	p.areaRadius = 3;
	p.areaEffect = Projectile.areaEffect;

	p.speed = 0.2;
	p.bloodsplatSize = 1.7;
	p.actor.model = Asset.model.bomb;
	p.actor.texture = p.actor.texture_default = Asset.texture.white;
	p.actor.shadowModel = p.actor.model;
	p.actor.shaderProgram = ShaderProgram.standard_no_specShader;
	p.deathParticleFunction = ParticleActor.SpawnBombDebris;
	p.deathParticleFunction_water = ParticleActor.SpawnWaterExplosion;
	p.splashEffect = ParticleActor.SpawnSplash;
	p.spawnParticleFunction = ParticleActor.SpawnTest;
	p.actor.hasShadow = true;
	p.makeRagdoll = true;
	p.hasTarget = false;
}

Projectile.setType_smoke = function(p){
	Projectile.setType_bomb(p);
	p.deathParticleFunction = ParticleActor.SpawnSmokeBomb;
	p.self_damage = 0.25;
	p.makeRagdoll = false;
}

Projectile.setType_mine = function(p){
	Projectile.setType_bomb(p);
	p.spawnParticleFunction = null;
	p.dies_on_landing = false;
	p.speed = 0.2;
	p.collRadius = 0.4;
	p.actor.scale = 1.25;
}

Projectile.setType_stunMine = function(p){
	Projectile.setType_mine(p);
	p.dies_on_landing = false;
	p.actor.model = Asset.model.mine;
	p.actor.shadowModel = p.actor.model;
	p.actor.texture = Asset.texture.laika.getTeamVariant(p.owner.colorId);
	p.actor.shaderProgram = ShaderProgram.standard_single_rotationShader;
	p.actor.scale = 1;
	//p.canCollide = false;
	p.collRadius = -100;
	p.hasTarget = false;
	p.fuse = 90;
	p.areaEffect_special = Projectile.areaSteal;
	p.actor.animCollection = Anim.MineAnim;
	p.areaDamageFactor = 1;
	p.areaRadius = 3;
	p.deathParticleFunction = ParticleActor.SpawnLocustExplosion;
	/*p.deathParticleFunction = ParticleActor.SpawnSmokeBomb;
	p.self_damage = 0.25;
	p.makeRagdoll = false;*/
}

Projectile.setType_shrapnelbomb = function(p){
	Projectile.setType_bomb(p);
	//p.areaEffect = null
	p.deathSound = SoundObject.shotgun;
	p.deathParticleFunction = ParticleActor.SpawnSmallBombDebris;
	p.applyAreaEffect = function(){
		for(var i=0;i<6.28;i+=6.283/12){
			var shrapX = this.x+Math.sin(i)*2;
			var shrapY = this.y+Math.cos(i)*2;
			var tpoint=new Vector(shrapX, shrapY, M.terrain.getHeightAt(shrapX, shrapY));
			var shrap = Projectile.Create(Projectile.setType_shrapnelbomb_shrapnel, this , this.damage, null, tpoint);
			shrap.caster = this.caster;
		}
	}
}

Projectile.setType_shrapnelbomb_shrapnel = function(p){
	Projectile.setType_pistol(p);
	p.parabolaFactor = 0.1 + RAND()*0.1;
	p.speed = 0.4;
	p.actor.model = Asset.model.bullet_sniper;
	p.actor.hasShadow = false;
	p.actor.scale = 0.2+Math.random()*0.15;
	p.spawnParticleFunction = null;
	p.bleedTime = 120;
	p.knockback = 0.9;
	p.scatter = 0.4;
	p.pierce_damage_loss = 0.33;
}

Projectile.setType_krnka = function(p){
	p.canCollide = true;
	p.homing = false;
	p.knockback = 0;
	p.hasTarget = false;
	
	if(p.caster.Attack == Unit.Attack_Scatter){
		p.scatter = 0.5;
	}else{
		p.scatter = 0.4;
	}
	
	p.collRadius = 0.1;
	p.areaEffect = null;
 
	p.actor.scale = 0.5 ;
	//p.actor.animCollection = Anim.AxeAnim;
	p.spawnParticleFunction = null;
	//p.splashEffect = ParticleActor.SpawnSplash;
	
	p.actor.model = Asset.model.sprite_center;
	p.actor.shaderProgram = ShaderProgram.spriteShader;
	p.actor.texture_default = p.actor.texture = Asset.texture.projectile_bullet;
	p.actor.spriteSize = Actor.SpriteSize_8x8;
	
	p.timeLeft = 250;
	p.gravity = 0.0;
	p.speed= 2;
	//p.dies_on_landing = false;
	//p.bounceParticleFunction = ParticleActor.SpawnSparks;
	p.actor.update_drawloop_base = p.actor.update_drawloop;
	p.actor.update_drawloop = Projectile.drawloop_bullet
	//p.timeLeft = (p.caster.attackRange/p.speed >> 0 ) +	4;
}
Projectile.bullet_frames_multidir = [0,-1,-2,-3,-4,-3,-2,-1,0,1,2,3,4,3,2,1]
Projectile.drawloop_bullet = function(){
	var cam_angle_diff = cam.yaw - Math.atan2(this.x-cam.eyePos[0],this.y-cam.eyePos[1]);
	cam_angle_diff = (cam_angle_diff + 3.1415 + 6.2823)%6.2823 - 3.1415;
	cam_angle_diff *= 0.5;
	var angleId = Math.round((1000 + ( cam.yaw-this.rotZ - cam_angle_diff )/6.283 )%1 * 16) % 16;
	this.frame = Projectile.bullet_frames_multidir[angleId];
	this.update_drawloop_base();
}

Projectile.setType_pilot = function(p){
	Projectile.setType_krnka(p);
	p.scatter = 0;
	p.canBeReflected = true;
	p.speed = 0.75;
	p.collRadius += 0.12;
	p.actor.shaderProgram = ShaderProgram.standard_single_rotationShader;
	p.hasTarget = true;
	p.homing = true;
	p.actor.scale = 0.35;
}

Projectile.setType_soul = function(p){
	p.parabolaFactor = 0;
	p.canCollide = true;
	p.actor.scale = 0.5;
	p.actor.model = Asset.model.fireball;
	p.actor.animCollection = Anim.FireballAnim;
	p.actor.texture = p.actor.texture_default = Asset.texture.corsair5;
	p.actor.shaderProgram = ShaderProgram.waveShader;
	p.hasTarget = false;
	p.homing = false;
	p.speed = 0.12;
	p.hasLaunchLight = false;
	p.spawnParticleFunction = null;
	p.areaEffect = Projectile.areaEffect;
}

Projectile.setType_salamander = function(p){
	p.parabolaFactor = 0;
	p.canCollide = true;
	p.actor.scale = 0.25;
	p.actor.model = Asset.model.sprite_center;
	p.actor.animCollection = Anim.FireballAnim;
	p.actor.texture = p.actor.texture_default = Asset.texture.projectiles;
	//p.actor.shaderProgram = ShaderProgram.standard_glowmapShader;
	p.actor.shaderProgram = ShaderProgram.spriteShader;
	LightDecal.Create(6, 0.15 , 0.05).addToActor(p.actor);
	//p.hasTarget = false;
	p.hasTarget = false;
	p.homing = false;
	p.speed = 0.15;
	p.decayTime = 12;
	p.spawnParticleFunction = ParticleActor.SpawnTest;
	p.areaEffect = null;
	p.gravity_dead = 0.0;
	p.deathSound = SoundObject.fireball_hit;
}

Projectile.setType_painlord = function(p){
	Projectile.setType_salamander(p);
	p.actor.animCollection = Anim.BlueballAnim;
	p.deathParticleFunction = ParticleActor.SpawnSmallExplosion;
	if(RAND()<0.33){
		p.compensateTargetMotion = true;
	}
}

Projectile.setType_painking = function(p){
	Projectile.setType_salamander(p);
	p.homing = true;
	p.speed = 0.5;
	p.turnFactor = 0.1;
	p.scatter = 1.5;
}

Projectile.setType_plasma = function(p){
	Projectile.setType_salamander(p);
	p.speed = 0.6;
	p.actor.animCollection = Anim.PlasmastarAnim;
	p.spawnParticleFunction = null;
	p.actor.spriteSize = Actor.SpriteSize_4x4;
	p.knockback = 0.3;
	p.actor.scale = 0.5;
	p.decayTime = 8;
	p.scatter = 0.04;
}
Projectile.setType_plasma_pistol = function(p){
	Projectile.setType_plasma(p);
	p.speed = 0.6;
	p.gravity = 0.007;
	p.targetZOffset += 5;
	//p.soulburn_time = 60;
	p.actor.animCollection = Anim.RedballAnim;
	p.actor.spriteSize = Actor.SpriteSize_8x8;
	p.scatter = 0;
	p.decayTime = 12;
	p.actor.scale = 0.25;
	p.spawnParticleFunction = ParticleActor.SpawnTest;
}

Projectile.setType_claw = function(p){
	Projectile.setType_salamander(p);
	p.speed = 0.6;
	p.areaKnockbackFactor = 1;
	p.knockback = 1.25;
	p.areaEffect = Projectile.areaEffect;
	p.areaTargetFilter = SearchFilter.isAlive;
	p.deathSound = SoundObject.death_missile;
	p.self_damage = 1;
	//p.actor.animCollection = Anim.PlasmaAnim;
	p.areaRadius = 2;
	p.decalSize = 2;
	p.spawnParticleFunction = ParticleActor.SpawnRedTrail;
	p.deathParticleFunction = ParticleActor.SpawnStructureSmoke;
}
Projectile.setType_rocket = function(p){
	Projectile.setType_claw(p);
	p.actor.texture = Asset.texture.projectile_bullet;
	p.actor.update_drawloop_base = p.actor.update_drawloop;
	p.actor.update_drawloop = Projectile.drawloop_rocket;
	p.actor.spriteSize = Actor.SpriteSize_4x4;
	p.actor.scale = 0.5;
	p.actor.frame = 8;
	p.actor.animCollection = Anim.Empty;
	p.spawnParticleFunction = ParticleActor.SpawnTest;
	p.decayTime = 0;
}
Projectile.rocket_frames_multidir = [7,15,14,13,12,11,10,9,8,-9,-10,-11,-12,-13,-14,-15]
Projectile.drawloop_rocket = function(){
	var cam_angle_diff = cam.yaw - Math.atan2(this.x-cam.eyePos[0],this.y-cam.eyePos[1]);
	cam_angle_diff = (cam_angle_diff + 3.1415 + 6.2823)%6.2823 - 3.1415;
	cam_angle_diff *= 0.5;
	var angleId = Math.round((1000 + ( cam.yaw-this.rotZ - cam_angle_diff )/6.283 )%1 * 16) % 16;
	this.frame = Projectile.rocket_frames_multidir[angleId];
	this.update_drawloop_base();
}



Projectile.setType_mangler = function(p){
	Projectile.setType_salamander(p);
	p.actor.animCollection = Anim.RedballAnim;
	p.speed = 0.27;
}
Projectile.setType_succubus = function(p){
	Projectile.setType_mangler(p);
	p.speed = 0.15;
}
Projectile.setType_valkyrie = function(p){
	Projectile.setType_mangler(p);
	p.scatter = 0.08;
	if(p.caster.attackAbility.swing_counter %3 == 0){
		p.scatter = 0.5;
	}
	p.speed = 0.45;
}
Projectile.setType_nose = function(p){
	Projectile.setType_mangler(p);
	//p.gravity = 0.005;
	//p.targetZOffset = 1;
	p.actor.animCollection = Anim.BlueballAnim;
	p.actor.texture = Asset.texture.projectiles2;
	p.deathParticleFunction = ParticleActor.SpawnGreenExplosion;
	p.spawnParticleFunction = ParticleActor.SpawnGreenTrail;
}
Projectile.setType_goop = function(p){
	Projectile.setType_nose(p);
	p.speed = 0.35;
	p.gravity = 0.007;
	p.targetZOffset += 12;
	p.actor.scale = 0.4;
	p.fuse = 10;
	p.pierce_damage_loss = 0.5;
}
Projectile.setType_rednose = function(p){
	Projectile.setType_nose(p);
	p.speed = 0.35;
	p.gravity = 0.007;
	p.actor.scale = 0.4;
	p.targetZOffset += 0.5;
	p.fuse = 10;
	p.actor.texture = Asset.texture.projectiles;
	p.deathParticleFunction = ParticleActor.SpawnSmallExplosion;
	p.spawnParticleFunction = ParticleActor.SpawnRedTrail;
	p.pierce_damage_loss = 0.5;
}

Projectile.setType_monk = function(p){
	Projectile.setType_mangler(p);
	p.actor.animCollection = Anim.PlasmastarAnim;
	p.actor.spriteSize = Actor.SpriteSize_4x4;
	if(p.caster.proto == UnitPrototype.Scholar){
		p.actor.texture = Asset.texture.projectiles2;
	}
	p.actor.scale = 0.5;
}
	
Projectile.setType_ghoul = function(p){
	Projectile.setType_mangler(p);
	p.speed = 0.5;
	//p.actor.shaderProgram  = ShaderProgram.waveShader;
	p.actor.animCollection = Anim.Empty;
	p.spawnParticleFunction = null;
	p.hasLaunchLight = false;
	//p.actor.texture = Asset.texture.ripple;
	p.actor.texture = Asset.texture.projectile_scream;
	p.actor.spriteSize = Actor.SpriteSize_1x1;
	p.actor.scale = 0.1;
	p.collRadius = 0.2;
	p.noFriendlyCollision = true;
	p.timeLeft = 35;
	p.decayTime = 0;
	//p.actor.model = Asset.model.soundwave;
	//p.actor.cull_backfacing = false;
	p.loop_special = function(){
		this.collRadius += 0.13;
		this.actor.scale += 0.15;
	}
}

Projectile.setType_skeleton = function(p){
	Projectile.setType_mangler(p);
	
	p.speed = 0.2;
	p.actor.scale = 0.5;
	//p.hasTarget = true;
	p.actor.texture = Asset.texture.projectile_axe;
	p.actor.animCollection = Anim.AxeAnim;
	if(RAND()<0.5){
		p.turnFactor = 0.04;
		p.homing = true;
		p.scatter = 0.6;
		p.speed = 0.18;
		p.actor.animCollection = Anim.AxeRedAnim;
		SoundObject.whirl.playAt(p.x,p.y);
		p.timeLeft = 300;
	}
	p.actor.spriteSize = [1/4,1/4];
	p.deathSound = SoundObject.hit_melee;
}


Projectile.setType_behemoth = function(p){
	Projectile.setType_salamander(p);
	p.speed = 0.3;
	p.collRadius = 0.5;
	p.actor.scale = 0.6;
}

Projectile.setType_flare = function(p){
	Projectile.setType_salamander(p);
	p.spawnParticleFunction = ParticleActor.SpawnShotgunSmoke;
	p.parabolaFactor = 0.35;
	p.areaDamageFactor = 0.6;
	p.areaKnockbackFactor = 0.7;
	p.areaRadius = 2.2;
	p.deathParticleFunction = ParticleActor.SpawnFlareExplosion;
	if(p.caster == Gamestats.Hero){
		p.self_damage = 0.5;
	}
}

Projectile.setType_plasmaCharge = function(p){
	Projectile.setType_salamander(p);
	p.speed = 0.09;
	p.hasTarget = false;
	p.timeLeft = 90;
	p.pierce_damage_loss = 1;
	p.pierce = true;
	p.actor.texture = Asset.texture.white;
	p.actor.scale = 0.8;
	p.homing = false;
	p.collRadius = 1.3;
	p.areaTargetFilter = SearchFilter.isGroundEnemy;
	p.collisionEffect_special = function(coll){
		ParticleActor.SpawnShock(this.x,this.y,this.z+0.5,Math.atan2(this.x-coll.x,this.y-coll.y));
		SoundObject.shockAt(this.x , this.y , 1.4);
	}
	p.areaEffect = null;
	p.spawnParticleFunction = ParticleActor.SpawnSparks;
}

Projectile.setType_nova = function(p){
	Projectile.setType_plasmaCharge(p);
	p.spawnParticleFunction = ParticleActor.SpawnFlareExplosion;
	p.areaTargetFilter = SearchFilter.isGroundEnemy;
	p.areaDamageFactor = 1;
	p.areaKnockbackFactor = 0.7;
	p.areaRadius = 2.5;
	p.actor.texture = Asset.texture.invisible;
	p.actor.hasShadow = false;
	p.timeLeft = 5;
	p.speed = 0.1;
	p.deathParticleFunction = null;
	p.collisionEffect_special = null;
	p.areaEffect = Projectile.areaNova;
	p.canCollide = false;
	p.hasTarget = true;
}

Projectile.setType_sacrifice = function(p){
	p.actor.model = p.actor.shadowModel = p.caster.actor.model;
	p.actor.texture = p.caster.actor.texture;
	p.actor.scale = p.caster.actor.scale;
	p.actor.shaderProgram = p.caster.actor.shaderProgram;
	p.actor.shadowShader = ShaderProgram.shadowShader;
	p.actor.hasShadow = true;
	p.speed = 0.13;
	p.arrivalRange = 0.2;
	p.parabolaFactor = 0.1;
	p.homing = true;
	p.spawnParticleFunction = null;
	p.hasLaunchLight = false;
	p.deathParticleFunction = ParticleActor.SpawnLocustExplosion;
	p.caster.Remove();
}

Projectile.getAutoTarget = function(p){
	return Pathfinder.Dijkstra_Unit_Search(p.atNode, 5, SearchFilter.isEnemyTarget, p.caster, 0);
}

Projectile.getShadow = function(p){
	p.actor.hasShadow = true;
	p.actor.shadowModel = p.actor.model;
	p.actor.shadowShader = ShaderProgram.shadowShader;
}

//targetvector is a 3d point (same as the Vector from utils.js)
Projectile.Create = function(typeSetter, caster, dmg, targetUnit, targetVector, _isMultishot){
	var p = new Projectile(caster);
	p.damage = dmg;
	p.actor.moveTo(p.x,p.y,p.z);
	if(p.caster.actor){
		p.actor.rotZ = p.caster.actor.rotZ;
		p.floor_triangle = caster.last_floor_triangle;
	}
	
	Actors.push(p.actor);

	p.typeSetter = typeSetter;
	typeSetter(p);
	
	if(targetVector != null){
		p.dest = new Vector(targetVector.x, targetVector.y, targetVector.z + p.targetZOffset);
	}else{
		p.dest = new Vector(targetUnit.x, targetUnit.y, targetUnit.z + p.targetZOffset);
		if(p.compensateTargetMotion == true){
			//try to foresee the position of the target in the future, based on its current speed
			var tdist = Utils.distance_xxyy(caster.x, targetUnit.x, caster.y, targetUnit.y);
			var factor = (RAND()*0.3+0.85)
			p.dest.x += tdist*targetUnit.movementx/p.speed*factor;
			p.dest.y += tdist*targetUnit.movementy/p.speed*factor;
		}
	}
	
	p.startDist = Unit_Distance(p, p.dest);
	p.targetUnit = targetUnit;
	p.atNode = p.getAtNode();
	Projectiles.push(p);
	
	p.pitch = Math.atan2(p.dest.z - p.z, Utils.distance_xxyy(p.x,p.dest.x, p.y, p.dest.y) );
	p.angle = Math.atan2(p.dest.x-p.x, p.dest.y-p.y);
	p.angle +=(RAND()-0.5)*p.scatter;
	p.pitch +=(RAND()-0.5)*p.scatter*0.5; 
	
	var sinTheta = Math.sin(1.57 - p.pitch);
	
	p.dx = Math.sin(p.angle)*sinTheta*p.speed;
	p.dy = Math.cos(p.angle)*sinTheta*p.speed;
	p.dz = Math.cos(1.57 - p.pitch)*p.speed;
	
	if(caster.last_floor_collider && caster.last_floor_collider.projectiles_inherit_motion){
		p.dx += caster.last_floor_collider.dx;
		p.dy += caster.last_floor_collider.dy;
		p.dz += caster.last_floor_collider.dz;
	}
	
	p.actor.checkVisibility();
	if((p.actor.visible||
	p.targetUnit&&p.targetUnit.actor&&p.targetUnit.actor.visible) ){
		//ZYKLON, the visibilty of actors is guaranteed to not change very quickly
		//Might need more experimenting in an RTS
		if(p.spawnParticleFunction != null){
			var smokeAngle = 1.57 - p.angle;
			p.spawnParticleFunction(p.x + Math.cos(smokeAngle)*0.4,p.y + Math.sin(smokeAngle)*0.4,p.z, smokeAngle);
		}
		
		if(p.hasLaunchLight == true && _isMultishot != true){
			var expl = LightDecal.Create_Volatile(10, 0.25 , 0.3); //warning, this is a volatile lightdecal
			expl.moveTo(p.x, p.y);
			if(caster.actor){
				if(caster.hasTurret == true){
					expl.angle = -caster.actor.turret.rotZ;
				}else{
					expl.angle = -caster.actor.rotZ;
				}
			}
		}
	}else if( _isMultishot){
		p.deathSound = null;
	}

	if(p.hasTarget == false){
		//p.targetUnit = null;
	}
	if(p.pierce == true){
		p.piercelist = [];
	}
	p.actor.startAnimation(Anim.stand);
	if(p.caster == Gamestats.Hero){//this will make it look like it's coming out of the gun
		p.actor.z -= 0.05;
		p.actor.scale *= 0.25;
	}

	return p;
}

Projectile.getWeaponStats = function(p,w){
	if(w.charge <= 0){
		p.speed = w.projectile_speed;
		p.knockback = w.knockback;
	}
	
	if(Gamestats.Hero.weapon == Gamestats.Hero.blunderbuss && Gamestats.Hero.weapon.multishot_count < 2){
		//hand cannon
		p.speed = 0.27;
	}
	p.stunChance = w.stunChance;
	p.scatter = w.scatter;
	p.lifesteal = w.lifesteal;
	p.pierce_damage_loss = w.projectile_pierce_damage_loss
	p.bleedTime = w.bleedTime;
	if(Gamestats.Hero.weapon.charge >= 50){
		p.pierce_damage_loss = 0.33;
	}
	if(p.pierce_damage_loss > 0){
		p.pierce = true;
	}
	if(w.reflection_resistance > RAND()){
		p.canBeReflected = false;
	}
}

Projectile.Reflect = function(p, collider){
	var distFactor = (RAND()*0.5+0.5);
	var xx = (collider.x*(1-distFactor) + p.caster.x*distFactor)+ (RAND()-0.5)*3;
	var yy = (collider.y*(1-distFactor) + p.caster.y*distFactor)+ (RAND()-0.5)*3;
	var reflected = Projectile.Create(p.typeSetter , collider, p.damage, null,new Vector(xx, yy, p.caster.z));
	reflected.x = p.x;
	reflected.y = p.y;
	reflected.actor.tint = p.actor.tint;
	reflected.parabolaFactor = 0.2+RAND()*0.1;
	reflected.speed = p.speed;
	SoundObject.reflect.playAt(p.x , p.y );
	//GUI.AddRisingText(p.x,p.y,p.z,GUI.reflectMessage, GUI.textColor_reflect);
	Actor.SpawnReflect(collider.actor,3.1415+p.angle);
}

Projectile.prototype.turn_gradual = function(newangle){
	var da = (newangle-this.angle + 3.1415*5) %6.283 -3.1415 
	if(Math.abs(da)>0.15){
		this.currentSpeed = 0;
	}
	da = Math.min(Math.abs(da),this.turnFactor)*Math.sign(da);
	this.angle = this.angle + da;
}
Projectile.prototype.rotateDeltas = function(angle){
	var dx_old = this.dx;
	var sn = Math.sin(angle);
	var cs = Math.cos(angle);
	this.dx = this.dx*cs-this.dy*sn;
	this.dy = dx_old*sn+this.dy*cs;
}