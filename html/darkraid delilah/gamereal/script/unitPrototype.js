
function UnitPrototype(_type,_name){
	this.type = _type;
	this.name = _name;
	this.id = UnitPrototype.getNextId();
	this.playerCounts = null;
	this.playerCounts_born = null;
	this.playerKills = null;
	UnitPrototype.Types[this.id] = this;
	
	this.actor_constructor = Actor.UnitActor;
	this.model = Asset.model.sprite;
	this.spriteSize = [1/8,1/8];
	this.shadowModel = Asset.model.unitshadow;
	this.shadowShader = ShaderProgram.shadow_no_rotationShader;
	this.iconId = 16;
	this.attachment_actor_function = null;
	this.hasShadow = true;
	this.hasBlood = true;
	this.bloodType = BloodType.Red;
	this.birthModel = null;
	this.cull_backfacing = true;
	this.shaderProgram = ShaderProgram.standard_shadowedShader;
	this.texture = Textures[0];
	this.texture_wounded = null;
	this.textureVariations = null;
	this.actorScale = 1;
	this.actorScaleVariation = 0;
	this.animCollection = Anim.Empty;
	this.spawnAnimOffset = -1; //start spawn animation before training is complete, -1 means no anim
	this.deathSound = SoundObject.death_human;
	this.hurtSound = SoundObject.oof_human;
	this.walkSound = null;
	this.walkSoundTicks = 20;
	this.soundPitchFactor = 1; //modifies pitch of hurt/death sounds
	this.deathModel = null; this.deathModel_special = null;
	this.deathSFX = null;
	this.decayTime = 300; //after this time the corpse will disappear
	this.turnSpeed = 0.2;
	this.followTerrainSlope = false;
	this.isStructure = false;
	this.isResource = false;
	this.isResourcePoint = false;//take the resources here
	this.isWorker = false;
	this.resourceCap= 0;
	this.isGate = false;
	this.crewType = null; //takes unit type, used for cannon followers
	this.on_ceiling = false;
	
	this.isItem = false;
	this.itemParam = 0;	
	this.allowEnemyPickup = false; //other units can pick it up(and drop in on death)	
	this.isTreasureItem = false;
	this.isOneTimePickup = false;
	this.itemEffect = null;
	this.itemPickupText = "+loot"
	this.itemDropCondition = null;
	this.itemReplaceCondition = null;
	this.itemPickupCondition = null;
	//if drop condition is not met, drop this instead
	this.itemFallbackDrop = null;

	this.lightTexture = null;
	this.lightOffsetY = 0;
	//no movement logic
	this.stationary = false;
	this.wallZ = 1.5;
	this.structureSize = 0;
	this.structureHeat = 0;
	this.showHeatWhenSelected = false;
	this.structureMaxHeat = 0;
	this.structure_rotation = 3.1415;
	this.structure_random_rotation = 0;
	this.structure_random_rotation_90 = false;
	this.craterSize = 2;
	this.constructionSize = 0.45;
	//array of ids of model points that are used for spawning sparks and smoke
	this.damagePoints=null; //[1,2,3];
	this.laserAttachPoint = 0;
	
	this.flyingHeight = 0;
	this.flying = false;
	this.gravity = true;
	this.isTall = false;
	//this.stickToTerrain = true;
	
	this.hp_max = 50;
	this.hp_regen = 0;
	this.armor = 0;
	this.absorption = 999999;
	this.speed = 0.12;
	this.acceleration = 0.25; //factor, will be multiplied by speed
	this.speed_clamp_factor = 1; //for slow units should be more than 1, but is should NEVER go above one
	this.knockbackEffect = 1;
	this.hitRotEffect = 1;
	this.birthTime = 0;
	this.birthTime_training = 20;
	this.trainingTime = 300;
	this.moneyCost = 50;
	this.coinCost = 0;
	this.maintenance = 0;
	
	this.hardRadius = 0.15;
	this.softRadius_moving = 0.35; //for swarms at least 0.4 is recommended
	this.softRadius_standing = 0.2;
	this.collision_tiles_radius = 1;
	this.collision_speedlimit_factor = 4; //if last tick had more collisions than this, then the next tick will always have a unit collision check
	//otherwise we might do a collision check only on every x tick
	this.pressureStrength_radial = 0.07;
	this.pressureStrength_side = 0.005; 
	this.pressure_clamp_factor = 1.3;
	this.sidePressureClamp = 0.15; //sidepressure delta effect will be clamped to this
	this.pressure_damping = 0.85;
	this.gridPressure_damping = 0.95;
	
	this.pressure_moveOrder_orderliness = 1;
	this.pressure_stacking_factor = 0;
	this.pressure_priority_class = 1;
	this.bounces_off_walls = true;
	this.gravityFactor = 0.02;
	this.blockerCollisionTreshold = 0; //0 for small units, 1 if it needs 2 grids to move, 2 for giant units only
	this.distance_pressure_factor = 0.014;
	this.blocker_pressure_damping = 0.7;
	this.gridPressure = 0; //keep distance between units when moving
	this.avoidTurnSpeed = 0.2;
	this.avoidDamping = 0.86;
	
	this.sightRadius = 8;
	this.sightZ = 1.1;
	this.acquisitionRange = 9;
	this.attackRange = 1;
	this.rangedTargeting = false; //used for target acquisition+pathfinding
	// also recommended for large units, otherwise small units can attack them from unreachable tiles that would otherwise be in range 
	this.loop_ai = null;
	this.attackDamage = 5;
	this.attackCooldown = 20;
	this.swingTime = 8;
	this.canBeGrabbed = false;
	this.attackSound = SoundObject.attack_rifle;
	this.attackSound_melee = SoundObject.hit_melee;
	this.swingSound = null;
	this.projectileLaunchZ = 0.7;
	this.projectileLaunchY = 0.85;
	this.projectileLaunchX = 0.3;
	this.projectileSetter = null;
	this.hasTurret = false;
	this.attackArrivalBuffer = 0.2;
	this.attackProgressRangeBonus = 0.4; //if the attack anim is started, the range is slightly increased - will interrupt less often if target is moving
	this.maxActionZ = 0.9; //used for stacking units. If flyingheight is higher than this, unit can't attack or chase, just tries to move along
	this.targetPriority = 3;
	this.wanderChance = 0;
	this.wanderRadius = 7;
	this.invulnerable = false;
	this.painChance = 0.7;
	this.attackPauseChance = 0.5;
	
	this.chaseRadius_squared = 225; 
	this.formation_priority = 4;
	this.selectionPriority = 5;
	this.isGarrison = false;
	this.isNeutralGarrison = false;
	this.garrisonZ = 1.5;
	//every subarray has 3 params: x offset, y offset, facing; number of subarrays is number of units
	this.garrisonPlacement = [[0,0.4,0],[-0.4,0,-1.57],[0,-0.4,3.14],[0.4, 0,1.57]];
	this.garrisonAliasType = null; //unit will turn into this type when out of garrison
	this.garrisonUnitType = null; //type of units in garrison
	this.garrisonAttachmentPointId = -1;
	this.garrison_move_inherited = false;//if garrison dies, unit continues to move to garrison's target
	
	this.followIgnoreEnemyRadius = 7; //zyklon only
	
	this.EnemyFilter = SearchFilter.isEnemy;
	this.GuardFilter = SearchFilter.isEnemyTarget;
	this.GuardTask = Task.GuardTask_Base;
	this.Attack = Unit.Attack_Instant;
	this.DeathEffect = null;
	this.BirthEffect = null;
	this.WoundEffect = null;
	this.woundTreshold = 0.4;
	this.HurtEffect = null;
	this.Abilities_Special = [];
	this.AttackAbility = Ability.AttackMove;
	this.Upgrades = [];

	this.followPartyFunction = null;
	this.reflectChance = 0;
	this.aoSize = 2.75;
	this.aoLayer = 0; //layer 0 is limited to human height, layer 1 is limited to approx. half
	this.ao_structure_height = 1.5;
	this.showLifebar = true;
	this.lifebarWidth = 1;
	this.lifebarZ = 1.5;
	this.eyeZ = 0.82;
	this.cylinder_height = 0.9;
	this.collZ = 0.7;
	this.attack_burst_count = 0;
	this.attack_burst_cooldown = 3;
	this.heroDeadAliasType = this;
	this.alwaysAllowRescue = false;
	this.rescuable = true;
	this.aiAliasType = null;
	this.actorTint = null;
	this.quoteSet = null;
	this.portrait = null;
	this.regenPerSecond = 0;
	this.magnetic = false; //magnetic units are not affected by world acceleration
	this.can_use_sectors = true;
	this.loot = null;
}
/*UnitPrototype.prototype.onDeath = function(){
}
UnitPrototype.prototype.onRemove = function(){
}*/

UnitPrototype.nextId = 0;
UnitPrototype.Types = [];
UnitPrototype.getNextId = function(){
	UnitPrototype.nextId ++ ;
	return UnitPrototype.nextId;
}
UnitPrototype.copy = function(dst, src){
	var nm = dst.name; var id = dst.id;
	Object.assign(dst, src);
	dst.name = nm;
	dst.id = id;
	dst.HurtEffect = null;
	dst.attachment_actor_function = null;
	dst.garrisonAliasType = null;
}
UnitPrototype.levelStart = function(){
	for(var i=0;i<this.Types.length;++i){
		this.Types[i].playerCounts = new Uint16Array(9);
		this.Types[i].playerCounts_born = new Uint16Array(9);
		this.Types[i].playerKills = new Uint16Array(9);
	}
	for(var i=0;i<this.Types.length;++i){
		//garrisoned and ungarrisoned versions share their tally
		var type = this.Types[i];
		if(type.garrisonAliasType){
			type.playerCounts = type.garrisonAliasType.playerCounts;
			type.playerCounts_born = type.garrisonAliasType.playerCounts_born;
			type.playerKills = type.garrisonAliasType.playerKills;
		}
	}
}
UnitPrototype.getById = function(id){
	return UnitPrototype.Types[id];
}
UnitPrototype.loadInstance = function(data){
	var uproto = UnitPrototype.Types[data[0]];
	var createX = data[2]+M.loadX;
	var createY = data[3]+M.loadY;
	var createZ = data[4];
	if(uproto.isItem == true){
		var u = Unit.Create(createX,createY,Players[0], uproto);
	}else{
		var u = Unit.Create(createX,createY,Players[data[1]], uproto);
	}
	if(u){
		Unit.setFacingInstant(u, data[5]);
		u.z = createZ;
		u.editorAngle = data[5];
		u.editorPlace = new Vector(createX,createY,createZ);
		u.tagId = data[6];
		u.deaf = data[9] == 1 ? true : false;
		Editor.PlacedUnits.push(u);
	}
}

UnitPrototype.Initialize = function(){
	UnitPrototype.nextId = -1;
	var u = new UnitPrototype(0, "Unused_Type");
	
	UnitPrototype.Marine = u = new UnitPrototype(5, "Space Marine");
	u.iconId = 19;
	u.animCollection = Anim.ChomperAnim;
	u.model = Asset.model.sprite;
	u.texture = Asset.texture.chomper;
	u.attackRange = 999;
	u.rangedTargeting = true;
	u.knockbackEffect = 0.4;
	u.hitRotEffect = 0.65;
	u.attackDamage = 5;
	u.Attack = Unit.Attack_Shoot;
	u.projectileSetter = Projectile.setType_krnka;
	u.swingTime = 10;
	u.hp_max = 150;
	u.attackCooldown = 32;
	u.softRadius_standing = 0.29;
	u.softRadius_moving = 0.37;
	u.hardRadius = 0.29;
	u.projectileLaunchZ = 0.72;
	u.projectileLaunchY = 0.37;
	u.speed = 0.075;
	u.attackSound = SoundObject.minigun;
	u.shaderProgram = ShaderProgram.spriteShader;
	u.canBeGrabbed = true;
	u.Abilities_Special = [Ability.Garrison];
	u.quoteSet = QuoteSet.Marine;
	u.portrait = Portrait.Marine;
	u.moneyCost = 60;
	u.coinCost = 60;
	u.maintenance = 1;
	u.trainingTime = 600;
	u.loop_ai = AI.loop_marine;
	u.decayTime = 250;
	u.lifebarWidth = 1.8;
	u.lifebarZ = 1.4;
	
	UnitPrototype.Zombie = u = new UnitPrototype(5, "Zombie");
	UnitPrototype.copy(u, UnitPrototype.Marine);
	//u.quoteSet = null;
	u.texture = Asset.texture.zombie;
	//u.birthTime = 24;
	u.animCollection = Anim.ZombieAnim;
	u.speed = 0.045;
	u.hp_max = 30;
	u.attackDamage = 5;
	u.attackRange = 1;
	u.attackProgressRangeBonus = 0.25;
	u.swingTime = 10;
	u.attackCooldown = 36;
	u.attackDamage = 9;
	u.deathSound = SoundObject.death_fallen;
	u.chaseSound = null;
	u.hurtSound = SoundObject.oof_zombie;
	u.chaseSound = SoundObject.chase_zombie;
	u.alertSound = SoundObject.alert_zombie;
	u.Attack = Unit.Attack_Instant;
	u.swingSound = SoundObject.bite_zombie;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Stillborn = u = new UnitPrototype(5, "Stillborn");
	UnitPrototype.copy(u, UnitPrototype.Zombie);
	u.texture  = Asset.texture.stillborn;
	u.actorScale *= 0.5;
	u.speed = 0.03;
	u.Attack = Unit.Attack_Jump;
	u.attackRange = 5;
	u.speed_clamp_factor = 10;
	u.attackCooldown = 65;
	u.attackPauseChance = 1;
	u.cylinder_height = 0.4;
	u.attackDamage = 15;
	u.softRadius_standing = 0.18;
	u.softRadius_moving = 0.19;
	u.hardRadius = 0.18
	u.soundPitchFactor = 1.5;
	u.animCollection = Anim.StillbornAnim;
	u.attackSound = SoundObject.whoosh; //jump start
	u.attackSound_melee = SoundObject.hit_melee; //jump hit
	u.can_use_sectors = false;
	u.swingSound = null;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Ghast = u = new UnitPrototype(5, "Ghast");
	UnitPrototype.copy(u, UnitPrototype.Stillborn);
	u.texture = Asset.texture.ghast;
	u.spriteSize = [64/512,64/512];
	u.animCollection = Anim.GhastAnim;
	u.flyingHeight = 0.5;
	u.flying = true;
	u.Attack = Unit.Attack_Charge;
	u.attackSound_melee = SoundObject.hit_big; //jump hit
	u.hp_max = 120;
	u.birthTime = 10;
	u.attackPauseChance = 1;
	u.attackCooldown = 80;
	u.actorScale = 1;
	u.swingTime = 7;
	u.gravityFactor = 0.05;
	u.painChance = 1;
	u.hardRadius = 0.3;
	u.cylinder_height = 0.8;
	u.alertSound = SoundObject.alert_ghast;
	u.attackRange = 12;
	u.attackDamage = 20;
	u.flying = true;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Chomper = u = new UnitPrototype(5, "Chomper");
	UnitPrototype.copy(u, UnitPrototype.Marine);
	u.attackDamage = 18;
	u.attackRange = 0.9;
	u.Attack = Unit.Attack_Instant;
	u.deathSound = SoundObject.death_chomper;
	u.chaseSound = SoundObject.chase_chomper;
	u.swingSound = SoundObject.chomp;
	u.hurtSound = SoundObject.oof_chomper;
	//u.attackSound_melee =SoundObject.hit_big;
	u.swingTime = 11;
	u.speed = 0.085;
	u.alertSound = SoundObject.alert_chomper;
	u.attackProgressRangeBonus = 0.2
	Editor.Objects[0].push(u);
	
	UnitPrototype.Ghoul = u = new UnitPrototype(5, "Ghoul");
	UnitPrototype.copy(u, UnitPrototype.Chomper);
	u.texture = Asset.texture.ghoul;
	u.animCollection = Anim.GhoulAnim;
	u.actorScale = 1.125;
	u.speed = 0.15;
	u.hp_max = 250;
	u.projectileSetter = Projectile.setType_ghoul;
	u.projectileLaunchZ = 0.55;
	u.spriteSize = [72/512,72/512];
	u.attackCooldown = 70;
	u.swingTime = 24;
	u.attackRange = 3.2;
	u.attackDamage = 5;
	u.cylinder_height = 0.65;
	u.hardRadius = 0.2;
	u.collZ = 0.6;
	u.Attack = Unit.Attack_Shoot_Forward;
	u.attack_burst_count = 12;
	u.attackArrivalBuffer = 0.8;
	u.attackProgressRangeBonus = 100;
	u.projectileLaunchY = 0;
	u.painChance = 0.15;
	u.on_ceiling = true;
	u.attackSound = SoundObject.push;
	u.swingSound = SoundObject.scream_ghoul;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Skeleton = u = new UnitPrototype(5, "Skeleton");
	UnitPrototype.copy(u, UnitPrototype.Chomper);
	u.texture =Asset.texture.skeleton;
	u.animCollection = Anim.SkeletonAnim;
	u.spriteSize = [96/1024,96/512];
	u.actorScale = 1.5;
	u.attackCooldown = 60;
	u.attackPauseChance = 1;
	u.speed = 0.055;
	u.hp_max = 270;
	u.swingTime = 12;
	u.painChance = 0.32;
	u.attackDamage = 35;
	u.deathSound = SoundObject.death_skeleton;
	u.soundPitchFactor = 1;
	u.attackRange = 999;
	u.attackSound= SoundObject.whoosh;
	u.projectileSetter = Projectile.setType_skeleton;
	u.Attack = Unit.Attack_Shoot;
	u.swingSound = null;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Enforcer = u = new UnitPrototype(5, "Enforcer");
	UnitPrototype.copy(u, UnitPrototype.Marine);
	u.hp_max = 80;
	u.deathSound = SoundObject.death_fallen;
	u.texture = Asset.texture.enforcer;
	u.animCollection = Anim.EnforcerAnim;
	u.swingTime = 5;
	u.attackCooldown = 70;
	u.attackDamage = 5;
	u.attack_burst_count = 15;
	u.attack_burst_cooldown = 3;
	u.attackPauseChance = 0.75;
	u.swingTime = 5;
	u.speed = 0.07;
	u.hurtSound = SoundObject.oof_fallen;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Succubus = u = new UnitPrototype(5, "Succubus");
	UnitPrototype.copy(u, UnitPrototype.Enforcer);
	u.texture = Asset.texture.succubus;
	u.projectileSetter = Projectile.setType_succubus;
	u.attack_burst_count = 0;
	u.animCollection= Anim.SuccubusAnim;
	u.swingTime = 14;
	u.attackSound = SoundObject.fireball;
	u.attackCooldown = 40;
	u.attackDamage = 13;
	u.projectileLaunchZ = 0.6;
	u.speed = 0.065;
	u.hp_max = 70;
	u.hurtSound = SoundObject.oof_succubus;
	u.deathSound = SoundObject.death_succubus;
	u.chaseSound = SoundObject.chase_succubus;
	u.alertSound = SoundObject.chase_succubus;
	u.soundPitchFactor = 1;
	Editor.Objects[0].push(u);
	
	UnitPrototype.SuccubusPolice = u = new UnitPrototype(5, "Constable");
	UnitPrototype.copy(u, UnitPrototype.Succubus);
	u.texture = Asset.texture.succubus_police;
	u.hp_max = 90;
	u.projectileSetter = Projectile.setType_mangler;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Fallen = u = new UnitPrototype(5, "Fallen");
	UnitPrototype.copy(u, UnitPrototype.Enforcer);
	u.hp_max = 45;
	u.texture = Asset.texture.fallen;
	u.animCollection = Anim.FallenAnim;
	u.swingTime = 10;
	u.attackCooldown = 45;
	u.deathSound = SoundObject.death_fallen;
	u.hurtSound = SoundObject.oof_fallen;
	u.attack_burst_count = 0;
	u.speed = 0.047;
	u.painChance = 0.7;
	u.attackPauseChance = 0.8;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Maniac = u = new UnitPrototype(5, "Maniac");
	UnitPrototype.copy(u, UnitPrototype.Fallen);
	u.texture = Asset.texture.maniac;
	u.deathSound = SoundObject.death_maniac;
	u.chaseSound = SoundObject.chase_maniac;
	u.hurtSound = SoundObject.oof_maniac;
	u.alertSound = SoundObject.alert_maniac;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Cultist = u = new UnitPrototype(5, "Cultist");
	UnitPrototype.copy(u, UnitPrototype.Maniac);
	u.texture = Asset.texture.cultist;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Scout = u = new UnitPrototype(5, "Scout");
	UnitPrototype.copy(u, UnitPrototype.Marine);
	u.texture = Asset.texture.scout;
	u.animCollection = Anim.ScoutAnim;
	u.deathSound = SoundObject.death_pioneer;
	u.speed = 0.045;
	u.hp_max = 100;
	u.attack_burst_count = 3;
	u.attackCooldown = 30;
	//u.attackCooldown = 4;
	//u.swingTime = 1;
	//u.Attack = Unit.Attack_Fan;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Scout_Male = u = new UnitPrototype(5, "Scout Dude");
	UnitPrototype.copy(u, UnitPrototype.Scout);
	u.texture = Asset.texture.scout_male;
	u.deathSound = SoundObject.death_human;
	u.animCollection = Anim.ScoutAnim;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Ranger = u = new UnitPrototype(5, "Ranger");
	UnitPrototype.copy(u, UnitPrototype.Enforcer);
	u.animCollection = Anim.RangerAnim;
	u.texture = Asset.texture.ranger_demon;
	u.attackSound = SoundObject.shotgun_enemy;
	u.Attack = Unit.Attack_Scatter;
	u.attackCooldown = 55;
	u.attackDamage = 5;
	u.attack_burst_count = 0;
	u.attackPauseChance = 0.85;
	u.swingTime = 10;
	u.hp_max = 45;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Outcast = u = new UnitPrototype(5, "Outcast");
	UnitPrototype.copy(u, UnitPrototype.Ranger);
	u.texture = Asset.texture.ranger_male;
	u.chaseSound = SoundObject.chase_outcast;
	u.deathSound = SoundObject.death_outcast;
	u.hurtSound = SoundObject.oof_maniac;
	u.alertSound = SoundObject.alert_outcast;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Huntress = u = new UnitPrototype(5, "Huntress");
	UnitPrototype.copy(u, UnitPrototype.Ranger);
	u.texture = Asset.texture.ranger;
	u.deathSound = SoundObject.death_pioneer;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Scout_Ally = u = new UnitPrototype(5, "Scout Ally");
	UnitPrototype.copy(u, UnitPrototype.Scout);
	u.texture = Asset.texture.scout_ally
	u.animCollection = Anim.AllyAnim;
	u.speed = 0.12;
	u.hp_max = 150;
	u.swingTime = 4;
	u.painChance = 0.3;
	u.attack_burst_count = 3;
	u.Attack = Unit.Attack_Double;
	u.projectileLaunchX = 0.2;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Scout_Demon = u = new UnitPrototype(5, "Deserter");
	UnitPrototype.copy(u, UnitPrototype.Scout_Ally);
	u.texture = Asset.texture.scout_demon;
	u.hp_max = 100;
	u.speed = 0.08;
	u.attack_burst_cooldown = 3;
	u.attack_burst_count = 7;
	u.painChance = 0.66;
	u.attackPauseChance = 0.75;
	u.Attack = Unit.Attack_LeftRight;
	u.hardRadius *= 1.25;
	u.deathSound = SoundObject.death_succubus;
	u.chaseSound = SoundObject.chase_deserter;
	u.alertSound = SoundObject.chase_deserter;
	u.hurtSound = SoundObject.oof_succubus;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Painlord = u = new UnitPrototype(5, "Pain Lord");
	UnitPrototype.copy(u, UnitPrototype.Marine);
	u.animCollection = Anim.PainlordAnim;
	u.attackSound = SoundObject.fireball;
	u.texture = Asset.texture.painlord;
	u.deathSound = SoundObject.death_fallen;
	u.chaseSound = SoundObject.chase_zombie;
	u.hurtSound = SoundObject.oof_fallen;
	u.alertSound = null;
	u.swingTime = 12;
	u.hp_max = 85;
	u.speed = 0.06;
	u.attackDamage = 13;
	u.projectileSetter = Projectile.setType_painlord;
	//u.animCollection = Anim.EnforcerAnim;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Painking = u = new UnitPrototype(5, "Pain King");
	UnitPrototype.copy(u, UnitPrototype.Painlord);
	u.actorScale = 1.5;
	u.spriteSize = [0.1875/2 , 0.1875];
	u.animCollection = Anim.PainkingAnim;
	u.texture = Asset.texture.painking ;
	u.texture_wounded = Asset.texture.painking_wounded;
	u.hp_max = 1000;
	u.painChance = 0.1;
	u.knockbackEffect = 0.2;
	//u.attack_burst_count = 2;
	//u.attack_burst_cooldown = 2;
	u.projectileSetter = Projectile.setType_painking
	u.speed = 0.075;
	u.woundTreshold = 0.5;
	u.attackRange = 15;
	u.attackDamage = 20;
	u.attackProgressRangeBonus = 100;
	u.swingTime = 70;
	u.deathSound = SoundObject.death_mangler;
	u.AttackAbility = Ability.Attack_Lock_On;
	u.Attack = Unit.Attack_Vile;
	u.attackCooldown = 85;

	u.WoundEffect = Effect.SpawnGhast;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Rascal = u = new UnitPrototype(5, "Rascal");
	UnitPrototype.copy(u, UnitPrototype.Painlord);
	u.texture = Asset.texture.rascal;
	u.animCollection = Anim.RascalAnim;
	u.projectileSetter = Projectile.setType_salamander;
	u.deathSound = SoundObject.death_rascal;
	u.hurtSound = SoundObject.oof_rascal;
	u.chaseSound = SoundObject.chase_rascal;
	u.alertSound = SoundObject.alert_rascal;
	//u.soundPitchFactor = 1.2;
	u.projectileLaunchZ = 0.3;
	u.hp_max = 60;
	u.flyingHeight = 0.4;
	u.hardRadius = 0.3;
	u.collZ = 0.3;
	u.flying = true;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Behemoth = u = new UnitPrototype(5, "Behemoth");
	UnitPrototype.copy(u, UnitPrototype.Painlord);
	u.texture = Asset.texture.behemoth;
	u.animCollection = Anim.BehemothAnim;
	u.deathSound = SoundObject.death_behemoth;
	u.hurtSound = SoundObject.oof_chomper;
	u.alertSound = SoundObject.alert_behemoth;
	u.chaseSound = SoundObject.chase_behemoth;
	u.Attack = Unit.Attack_Double;
	u.projectileLaunchZ = 0.5;
	u.projectileLaunchX = 0.35;
	u.attackDamage = 26;
	u.painChance = 0.25;
	u.projectileSetter = Projectile.setType_behemoth;
	u.speed = 0.055;
	u.spriteSize = [1/12.8,1/6.4];
	u.actorScale = 1.25;
	u.hp_max = 500;
	u.texture_wounded = Asset.texture.behemoth_wounded;
	u.attackCooldown = 50;
	u.attack_burst_count = 1;
	u.hardRadius = 0.4;
	u.attack_burst_cooldown = 13;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Mangler = u = new UnitPrototype(5, "Mangler");
	UnitPrototype.copy(u, UnitPrototype.Behemoth);
	u.spriteSize = [96/1024,96/512];
	u.actorScale = 1.5;
	u.Attack = Unit.Attack_Shoot;
	u.texture = Asset.texture.angler;
	u.painChance = 0.5;
	u.projectileSetter = Projectile.setType_mangler;
	u.projectileLaunchZ = 0.7;
	u.collZ = 0.9;
	u.hp_max = 400;
	u.texture_wounded = null;
	u.deathSound = SoundObject.death_mangler;
	u.hurtSound = SoundObject.oof_mangler;
	u.chaseSound = SoundObject.chase_chomper;
	u.alertSound = SoundObject.alert_mangler;
	u.attackPauseChance = 0.8;
	u.attack_burst_count = 0;
	u.attackDamage = 23;
	u.animCollection = Anim.AnglerAnim;
	u.flying = true;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Monk = u = new UnitPrototype(5, "Monk");
	UnitPrototype.copy(u, UnitPrototype.Mangler);
	u.spriteSize = [80/512,80/512];
	u.animCollection = Anim.MonkAnim;
	u.deathSound = SoundObject.death_monk;
	u.alertSound = SoundObject.alert_monk;
	u.projectileSetter = Projectile.setType_monk;
	u.texture = Asset.texture.monk;
	u.projectileLaunchZ = 0.8;
	u.flying = false;
	u.speed = 0.08;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Scholar = u = new UnitPrototype(5, "Scholar");
	UnitPrototype.copy(u, UnitPrototype.Monk);
	u.texture = Asset.texture.scholar;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Arachnose = u = new UnitPrototype(5, "Arachnose");
	UnitPrototype.copy(u, UnitPrototype.Mangler);
	u.flying = false;
	u.texture = Asset.texture.arachnose;
	u.animCollection = Anim.NoseAnim;
	u.projectileLaunchZ = 1.2;
	u.attackSound = SoundObject.shot_arachnose;
	u.deathSound = SoundObject.death_tank;
	u.walkSound = SoundObject.laika_walk_loop
	u.projectileSetter = Projectile.setType_nose;
	u.hp_max = 420;
	u.turnSpeed = 0.13;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Rednose = u = new UnitPrototype(5, "Rednose");
	UnitPrototype.copy(u, UnitPrototype.Succubus);
	u.flying = false;
	u.attack_burst_count = 3;
	u.animCollection = Anim.RednoseAnim;
	u.attack_burst_cooldown = 5;
	u.projectileSetter = Projectile.setType_rednose;
	u.texture = Asset.texture.rednose;
	u.speed = 0.13;
	u.hp_max = 240;
	u.attackRange = 4.2;
	u.attackArrivalBuffer = 0.5;
	u.deathSound = SoundObject.death_nose;
	u.hurtSound= SoundObject.oof_mangler;
	u.alertSound = SoundObject.alert_nose;
	u.chaseSound = SoundObject.chase_chomper;
	u.soundPitchFactor = 1;
	//u.animCollection = Anim.NoseAnim;
	u.projectileLaunchZ = 0.72;
	u.turnSpeed = 0.16;
	Editor.Objects[0].push(u);
	
	UnitPrototype.Valkyrie = u = new UnitPrototype(5, "Valkyrie");
	UnitPrototype.copy(u, UnitPrototype.Mangler);
	u.animCollection = Anim.ValkyrieAnim;
	u.hp_max = 300;
	u.attackCooldown = 45;
	u.spriteSize = [96/512,96/512];
	u.attack_burst_cooldown = 7;
	u.attack_burst_count = 5;
	u.attackPauseChance = 0.5;
	u.projectileLaunchZ = 0.4;
	u.projectileLaunchX = 0.2;
	u.Attack = Unit.Attack_LeftRight;
	u.attackSound = SoundObject.plasmagun;
	u.projectileSetter = Projectile.setType_valkyrie;
	u.deathSound = SoundObject.death_tank;
	u.texture = Asset.texture.valkyrie;
	Editor.Objects[0].push(u);
	
	UnitPrototype.EvilEye = u = new UnitPrototype(5, "Evil Eye");
	UnitPrototype.copy(u, UnitPrototype.Marine);
	u.Attack = Unit.Attack_Instant;
	u.animCollection = Anim.EvilAnim;
	u.texture = Asset.texture.evileye;
	u.speed = 0.05;
	u.attackCooldown = 10;
	u.swingTime = 2;
	u.attackDamage = 10;
	u.attackSound = SoundObject.hit_big;
	u.Abilities_Special = [Ability.EvilEye];
	u.attackPauseChance = 0;
	u.attackRange = 0.8;
	u.attackProgressRangeBonus = 0.2;
	u.hp_max = 200;
	u.spriteSize = [1/2,1/2];
	u.actorScale = 2;
	u.painChance = 1;
	Editor.Objects[0].push(u);
	
	UnitPrototype.MineralItem = u = new UnitPrototype(15, "Minervite Batch");
	//u.animCollection = Anim.CrateAnim;
	u.animCollection = Anim.ItemAnim;
	u.model = Asset.model.minerals;
	u.shaderProgram = ShaderProgram.standard_single_rotationShader;
	u.animCollection = Anim.EquipmentAnim;
	u.actorScale = 0.6;
	u.hasBlood = false;
	u.actor_constructor = Actor.ItemActor;
	u.hardRadius = -100;
	u.shadowModel = u.model;
	u.pressureStrength_radial = 0;
	u.deathSound = SoundObject.puk;
	u.isItem = true;
	u.gravityFactor = 0.02;
	u.speed = 0;
	u.decayTime = 0;
	u.targetPriority = 0;
	u.hp_max = 150;
	u.birthTime = 0;
	u.itemEffect = Effect.GiveMoney;
	u.itemParam = 150;
	u.itemPickupText = "+150";
	u.aoSize = 0;
	u.portrait = null;
	
	UnitPrototype.Health = u = new UnitPrototype(11, "Health");
	UnitPrototype.copy(u, UnitPrototype.MineralItem);
	u.itemPickupText = "+Health";
	u.texture = Asset.texture.health;
	u.spriteSize = [1/2,1/2];
	u.model = u.shadowModel = Asset.model.sprite;
	u.shaderProgram = ShaderProgram.spriteShader;
	u.itemEffect = Effect.Heal_Extra;
	u.itemParam = 2;
	u.actorScale = 0.25;
	u.animCollection = Anim.ItemAnim;
	Editor.Objects[3].push(u);
	
	UnitPrototype.Medkit = u = new UnitPrototype(11, "Medkit");
	UnitPrototype.copy(u, UnitPrototype.Health);
	u.itemParam = 25;
	u.actorScale = 0.5;
	u.texture = Asset.texture.item_medkit;
	u.animCollection= Anim.Empty;
	u.spriteSize = [1,1];
	u.itemEffect = Effect.Heal;
	u.itemPickupCondition = function(target){return target.hp < target.hp_max;}
	Editor.Objects[3].push(u);
	
	UnitPrototype.Booster = u = new UnitPrototype(11, "Booster");
	UnitPrototype.copy(u, UnitPrototype.Medkit);
	u.itemParam = 10;
	u.texture = Asset.texture.item_booster;
	Editor.Objects[3].push(u);
	
	UnitPrototype.Shield = u = new UnitPrototype(11, "Shield");
	UnitPrototype.copy(u, UnitPrototype.Health);
	u.itemPickupText = "+Shield";
	u.texture = Asset.texture.item_armor;
	u.itemEffect = Effect.GiveShield;
	Editor.Objects[3].push(u);
	
	UnitPrototype.BodyArmor = u = new UnitPrototype(11, "Body Armor");
	UnitPrototype.copy(u, UnitPrototype.Medkit);
	u.itemPickupText = "+Shield";
	u.texture = Asset.texture.item_bodyarmor;
	u.itemPickupCondition = function(target){return target.shield < target.shield_max;}
	u.itemEffect = Effect.GiveShield;
	u.itemParam = 50;
	Editor.Objects[3].push(u);
	
	UnitPrototype.Hazmat = u = new UnitPrototype(11, "Hazmat Armor");
	UnitPrototype.copy(u, UnitPrototype.BodyArmor);
	u.itemPickupText = "+Hazmat Armor";
	u.texture = Asset.texture.item_hazmat;
	u.itemEffect = Effect.GiveHazmat;
	u.actorScale = 0.25;
	u.itemParam = 20;
	u.itemPickupCondition = function(target){return target.hazmat < target.hazmat_max;}
	Editor.Objects[3].push(u);
	
	UnitPrototype.RedKey = u = new UnitPrototype(11, "Red Key");
	UnitPrototype.copy(u, UnitPrototype.Hazmat);
	u.itemPickupText = "+Red Hand";
	u.texture = Asset.texture.key_red;
	u.itemEffect = Effect.GiveKey;
	u.itemParam = 0;
	u.itemPickupCondition = null;
	Editor.Objects[3].push(u);
	
	UnitPrototype.GreenKey = u = new UnitPrototype(11, "Green Key");
	UnitPrototype.copy(u, UnitPrototype.RedKey);
	u.itemPickupText = "+Green Hand";
	u.texture = Asset.texture.key_green;
	u.itemParam = 1;
	Editor.Objects[3].push(u);
	
	UnitPrototype.BlueKey = u = new UnitPrototype(11, "Blue Key");
	UnitPrototype.copy(u, UnitPrototype.RedKey);
	u.itemPickupText = "+Blue Hand";
	u.texture = Asset.texture.key_blue;
	u.itemParam = 2;
	Editor.Objects[3].push(u);
	
	UnitPrototype.Clip = u = new UnitPrototype(11, "Clip");
	UnitPrototype.copy(u, UnitPrototype.Health);
	u.itemPickupText = "+Bullets";
	u.texture = Asset.texture.item_bullet;
	u.itemEffect = Effect.GiveAmmo;
	u.itemParam = [1,8];
	u.animCollection = Anim.Empty;
	u.spriteSize = [1,1];
	Editor.Objects[3].push(u);
	
	UnitPrototype.Rocket = u = new UnitPrototype(11, "Rocket");
	UnitPrototype.copy(u, UnitPrototype.Clip);
	u.itemPickupText = "+Rocket";
	u.texture = Asset.texture.item_rocket;
	u.itemParam = [3,1];
	Editor.Objects[3].push(u);
	
	UnitPrototype.RocketBox = u = new UnitPrototype(11, "Rocket Box");
	UnitPrototype.copy(u, UnitPrototype.Rocket);
	u.itemPickupText = "+Rockets";
	u.texture = Asset.texture.item_box_rockets;
	u.actorScale = 0.5;
	u.itemParam = [3,5];
	Editor.Objects[3].push(u);
	
	UnitPrototype.SpiritAmmo = u = new UnitPrototype(11, "Spirit");
	UnitPrototype.copy(u, UnitPrototype.Clip);
	u.itemPickupText = "+Spirit";
	u.texture = Asset.texture.item_plasma;
	u.itemParam = [0,6];
	u.spriteSize = [1/2,1/2];
	u.animCollection = Anim.ItemAnim;
	Editor.Objects[3].push(u);
	
	UnitPrototype.Shells = u = new UnitPrototype(11, "Shells");
	UnitPrototype.copy(u, UnitPrototype.Clip);
	u.itemPickupText = "+Shells";
	u.texture = Asset.texture.item_shells;
	u.itemParam = [2,4];
	Editor.Objects[3].push(u);
	
	UnitPrototype.Shotgun = u = new UnitPrototype(11, "Shotgun");
	UnitPrototype.copy(u, UnitPrototype.Clip);
	u.itemPickupText = "Shotgun!";
	u.texture = Asset.texture.item_shotgun;
	u.itemParam = [2,8,2];
	u.itemEffect = Effect.GiveWeapon;
	u.model = Asset.model.sprite_1x2;
	u.actorScale = 0.5;
	Editor.Objects[3].push(u);
	
	UnitPrototype.AK = u = new UnitPrototype(11, "AK");
	UnitPrototype.copy(u, UnitPrototype.Shotgun);
	u.texture = Asset.texture.item_ak;
	u.itemParam = [1,20,3];
	u.itemPickupText = "Ancient Karbine!";
	Editor.Objects[3].push(u);
	
	UnitPrototype.Claw = u = new UnitPrototype(11, "Claw");
	UnitPrototype.copy(u, UnitPrototype.Shotgun);
	u.texture = Asset.texture.item_claw;
	u.itemParam = [3,5,4];
	u.itemPickupText = "Inferno Claw!";
	Editor.Objects[3].push(u);
	
	UnitPrototype.Plasmagun = u = new UnitPrototype(11, "Plasmagun");
	UnitPrototype.copy(u, UnitPrototype.Shotgun);
	u.texture = Asset.texture.item_plasmagun;
	u.itemParam = [0,30,5];
	u.itemPickupText = "Spirit Cannon!";
	Editor.Objects[3].push(u);
	
	UnitPrototype.Plasmagun = u = new UnitPrototype(11, "Minigun");
	UnitPrototype.copy(u, UnitPrototype.Shotgun);
	u.texture = Asset.texture.item_minigun;
	u.itemParam = [1,40,6];
	u.itemPickupText = "Minigun!";
	Editor.Objects[3].push(u);
	
	UnitPrototype.Hero = u = new UnitPrototype(11, "HERO");
	UnitPrototype.copy(u, UnitPrototype.Marine);
	u.projectileLaunchZ = 0.76;
	u.projectileLaunchY = 0.; //TODO: unit doesn't look in shoot dir, but in walk dir
	u.attackDamage = 20;
	u.hp_max = 100;
	u.speed = 0.18;
	u.hardRadius = 0.26;
	u.collZ = 0.615;
	u.eyeZ = 0.76;
	u.portrait = Portrait.Mantis;
	u.animCollection = Anim.Empty;
	u.hurtSound = SoundObject.oof_bathory;
	u.painChance = 0;
	u.spriteSize = [1,1];
	u.texture = WALL.propaganda;
	
	UnitPrototype.Maniac.loot = UnitPrototype.Clip;
	UnitPrototype.Cultist.loot = UnitPrototype.Clip;
	UnitPrototype.Fallen.loot = UnitPrototype.Clip;
	//UnitPrototype.Enforcer.loot = UnitPrototype.Clip;
	UnitPrototype.Ranger.loot = UnitPrototype.Shells;
	UnitPrototype.Outcast.loot =  UnitPrototype.Shells;
	UnitPrototype.Huntress.loot = UnitPrototype.Shells;
	UnitPrototype.Scout_Demon.loot = UnitPrototype.Clip;
	UnitPrototype.Succubus.loot = UnitPrototype.SpiritAmmo;
}
