
function Unit(proto, owner){
	this.proto = proto;
	this.name = this.proto.name;
	this.level = 0;
	this.net_id = -1;
	
	this.editorPlace = null;
	this.tagId = -1; //used for written scripts. Negative tags have no effect
	this.editorAngle = 0;
	
	this.type = proto.type;
	this.owner = owner;
	this.squad = null; //ai only
	this.actor = proto.actor_constructor(proto, this);
	this.alive = true;
	this.born = true;
	this.selected = false;
	this.isStructure = proto.isStructure;
	this.deathSound = proto.deathSound;
	this.gateClosed = true; //for gates
	this.container = null;//for garrison
	this.garrisonArray = null;
	this.structureSize = proto.structureSize;
	this.aroundNodes = null; //nodes around structure
	this.stationary = proto.stationary;
	this.birthCounter = 0;
	this.birthTime = proto.birthTime;
	
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.on_the_ground = true;
	this.minimapX = 0;
	this.minimapY = 0;
	this.flyingHeight = proto.flyingHeight;
	this.goalZ = 0;
	this.gravityFactor = proto.gravityFactor;
	//this.stickToTerrain = proto.stickToTerrain;
	this.gravity = true;
	
	this.hp_max = proto.hp_max;
	this.hp = this.hp_max;
	this.hp_regen = proto.hp_regen;
	this.armor = this.proto.armor;
	this.shield_max = 100;
	this.shield = 0;
	this.hazmat = 0;
	this.hazmat_max = 200;
	this.absorption = this.proto.absorption;
	this.resourceCarried = 0;
	this.xp = 0;
	this.last_hurter = null;
	
	this.speed = proto.speed;
	this.currentSpeed = 0;
	this.acceleration = proto.acceleration;
	this.speed_clamp_factor = proto.speed_clamp_factor;
	this.knockbackEffect = proto.knockbackEffect;
	this.angle = 0;
	this.dx = 0;
	this.dy = 0;
	this.dz = 0;
	//for checking if unit is stuck
	this.dx_cumulative = 0;
	this.dy_cumulative = 0;
	this.movement_time = 0;
	this.movementx = 0;
	this.movementy = 0;
	this.moving = false;
	
	this.fighting = false;
	this.atOrderedNode = false;
	this.on_ceiling = proto.on_ceiling;
	this.deaf = false;
	
	this.hardRadius = proto.hardRadius;
	this.cylinder_height = proto.cylinder_height; //used for projectile and hitscan collisions
	this.collZ = proto.collZ; //height of collision sphere center, used for geometry collisions
	this.softRadius_moving = proto.softRadius_moving; 
	this.softRadius_standing = proto.softRadius_standing;
	this.collision_tiles_radius = proto.collision_tiles_radius;
	this.collisionFrequency = proto.blockerCollisionTreshold == 0 ? 2 : 1;
	this.collision_speedlimit_factor = proto.collision_speedlimit_factor;
	this.nextColl = null;
	this.prevColl = null;
	
	this.pressureStrength_radial = proto.pressureStrength_radial;
	this.pressureStrength_side = proto.pressureStrength_side;
	this.gridPressure = proto.gridPressure;
	this.pressure_clamp_factor = proto.pressure_clamp_factor;
	this.sidePressureClamp = proto.sidePressureClamp;
	this.pressure_damping = proto.pressure_damping;
	this.pressure_moveOrder_orderliness = proto.pressure_moveOrder_orderliness;
	this.pressure_stacking_factor = proto.pressure_stacking_factor;
	this.bounces_off_walls = proto.bounces_off_walls;
	this.blockerCollisionTreshold = proto.flying ? -1 : proto.blockerCollisionTreshold;
	this.last_distancefield_absolute = 0;
	this.distance_pressure_factor = proto.distance_pressure_factor;
	this.blocker_pressure_damping = proto.blocker_pressure_damping;
	
	this.pressureVector = new Vector(0,0,0);
	this.pressure_priority_class = proto.pressure_priority_class;
	this.pressurePriority = RAND() + proto.pressure_priority_class; 
	this.blockerPressureVector = new Vector(0,0,0);
	this.sidePressureVector = new Vector(0,0,0);
	this.gridPressureVector = new Vector(0,0,0);
	this.gridPressure_damping = proto.gridPressure_damping;
	this.windPressureVector = new Vector(0,0,0);

	this.pressure_absolute = 0;
	this.avoidTurnSpeed = proto.avoidTurnSpeed;
	this.avoidDamping = proto.avoidDamping;
	this.avoidLeft = 0; this.avoidRight = 0;
	this.avoidAngle = 0;
	
	this.number_of_collisions_last_frame = 0;
	this.number_of_collisions_with_moving_last_frame = 0;
	
	this.sightRadius = proto.sightRadius;
	this.sightZ = proto.sightZ;
	this.acquisitionRange = proto.acquisitionRange;
	
	this.acquisitionGroup = -1;
	if(this.proto.attackDamage>0){
		if(proto.flying){
			this.acquisitionGroup = 3;
		}else if(proto.rangedTargeting == false){
			this.acquisitionGroup = 0;
		}else{
			if(proto.attackRange > 2){ 
				this.acquisitionGroup = 1;
			}else{ //large, melee (all large units are technically ranged, but these are short ranged ones)
				this.acquisitionGroup = 2;
			}
		}
	}
	
	this.attack_burst_count = proto.attack_burst_count;
	this.attack_burst_cooldown = proto.attack_burst_cooldown;
	this.attackRange = proto.attackRange;
	this.rangedTargeting = proto.rangedTargeting;
	this.fleeSpeedBonus = 0;
	this.attackDamage = proto.attackDamage;
	this.attackCooldown = proto.attackCooldown;
	this.swingTime = proto.swingTime;
	this.canBeGrabbed = proto.canBeGrabbed;
	this.grabbedActor = null;
	this.projectileLaunchZ = proto.projectileLaunchZ;
	this.projectileLaunchY = proto.projectileLaunchY;
	this.projectileLaunchX = proto.projectileLaunchX;
	this.projectileSetter = proto.projectileSetter;
	this.hasTurret = proto.hasTurret;
	this.attackArrivalBuffer = proto.attackArrivalBuffer;
	this.attackProgressRangeBonus = proto.attackProgressRangeBonus;
	this.maxActionZ = proto.maxActionZ;
	this.targetPriority  = proto.targetPriority;
	this.EnemyFilter = proto.EnemyFilter;
	this.GuardFilter = proto.GuardFilter;
	this.targetUnit = null;
	
	this.wanderChance = proto.wanderChance;
	this.wanderRadius = proto.wanderRadius;
	this.chaseRadius_squared = 999999; //proto.chaseRadius_squared; 
	this.chaseStartPos = new Point(0,0); //unit returns here if it chases too far
	
	this.formation_priority = proto.formation_priority;
	this.preferred_pos = new Point(0,0);
	this.preferred_facing = 0;
	this.formationConformance = RAND() + 0.5;
	this.formationID = 0;
	this.formation_fix_pos = false;
	this.formation_sort_value = 0;
	this.formation = null;
	
	this.task = null
	this.taskStack = [];
	this.guardTask = null;
	this.guarding = false;

	this.atNode = null;
	
	this.inner_counter = (RAND() * 60)>>0;
	this.randomValue = RAND();
	this.decayTime = proto.decayTime;
	this.decayCounter = 0;
	
	this.loop_second = Unit.loop_second;
	this.loop_ai = proto.loop_ai;
	Unit.getLoopFunction(this);

	this.Attack = proto.Attack;
	Unit.getHurtFunction(this);
	this.HurtEffect = proto.HurtEffect;

	this.Die = Unit.Die;
	this.ReleaseGrabbedActor = Unit.ReleaseGrabbedActor;
	this.DeathEffect = proto.DeathEffect;
	
	this.distanceField_Pressure = proto.blockerCollisionTreshold <= 0 ? Unit.distanceField_Pressure : Unit.distanceField_Pressure_Large;
	
	this.blocker_collision = Unit.blocker_collision;
	this.blockerCollisionCheck = this.proto.isItem ? Unit.blockerCollisionCheck_item : Unit.blockerCollisionCheck; 
	this.blockerCollisionCheck_node = Unit.blockerCollisionCheck_node;
	
	this.neighbour_collision = Unit.neighbour_collision;

	this.GetNearestUnitWithFilter = Unit.GetNearestUnitWithFilter;
	this.GetNearestUnit_NoObstacle = Unit.GetNearestUnit_NoObstacle;
	this.GetNearestUnit_PreFilter = Unit.GetNearestUnit_PreFilter;
	
	this.world_move_update = Unit.world_move_update;
	this.setTag = Unit.setTag;
	
	this.Abilities = [];
	if(this.stationary || this.isStructure){
		this.movementAbility = null;
	}else{
		this.movementAbility = new AbilityInstance(this, Ability.Move);
		this.Abilities.push(this.movementAbility);
		this.Abilities.push(new AbilityInstance(this, Ability.Stop));
	}
	if(this.attackDamage>0){
		this.attackAbility = new AbilityInstance(this, this.proto.AttackAbility)
		this.Abilities.push(this.attackAbility);
	}else{
		this.attackAbility = null;
	}

	for(var i=0;i<this.proto.Abilities_Special.length;++i){
		if(this.owner.hasAbility(this.proto.Abilities_Special[i])){
			this.Abilities.push(new AbilityInstance(this, this.proto.Abilities_Special[i]) );
		}
	}
	
	this.crew = null;
	this.crewedUnit = null;
	//this.followUnit = null;
	//this.followArrivalBuffer_default = 2 + RAND()*3;
	//this.followArrivalBuffer = this.followArrivalBuffer_default;
	//this.followIgnoreEnemyRadius = proto.followIgnoreEnemyRadius;
	this.reflectChance = proto.reflectChance;
	//structures would otherwise be affected by a single AOE for each node they cover
	this.last_aoe_source = null;
	this.replace_alias = null;
	
	this.coyote_time = 0; //starts counting up when not standing on floor
	this.last_floor_collider = null;
	this.last_floor_triangle = null;
	this.last_coll_triangle = null;
	this.eyeZ = proto.eyeZ;
	this.painChance = proto.painChance;
	this.last_evil_seen = null;
	this.see_evil_counter = 0;
}

Unit.getLoopFunction = function(u){
	if(u.stationary == false){
		if(u.proto.isItem == false){
			u.loop_first = Unit.loop_first;
		}else{
			u.loop_first = Unit.loop_first_item;
			u.loop_second = Unit.loop_second_item;
		}
	}else if(u.isStructure == true){
		if(u.proto.isGate == true){
			u.loop_second = Unit.loop_second_gate;
		}
		u.loop_first = Unit.loop_first_structure;
	}else{
		u.loop_first = Unit.loop_first_stationary;
	}
}

Unit.getHurtFunction = function(u){
	if(u.proto.isItem){
		u.Hurt = Unit.Hurt_item
	}else if(u.proto.isResource){
		u.Hurt = Unit.Hurt_Resource;
	}else if(u.proto.isNeutralGarrison){
		u.Hurt = Unit.Hurt_Cover;
	}else{
		u.Hurt = Unit.Hurt;
	}
	if(u.proto.invulnerable){
		u.Hurt = Utils.DO_NOTHING;
	}
}

Unit.loop_first = function(){
	if(this.inner_counter < 59){
		++this.inner_counter;
	}else{
		this.inner_counter = 0;
	}
	
	this.setValidCoordinates();
	var atNode_last_frame = this.atNode;
	this.atNode = pf.getNodeAt_Robust(this.x,this.y);
	if(this.atNode != atNode_last_frame){
		var clust = Node.getCluster(this.atNode); var oldclust = Node.getCluster(atNode_last_frame);
		if(clust != oldclust){
			oldclust.removeLiveUnit(this);
			clust.addLiveUnit(this);
		}
		if(atNode_last_frame != null){
			Node.removeUnit(atNode_last_frame, this);
			
		}
		Node.addUnit(this.atNode, this);
	}
	
	var dz_previous = this.dz;
	this.dx = 0;
	this.dy = 0;
	this.dz = 0;
	
	this.setPressureVectors();
	
	if(this.alive){
		Minimap.unitUpdate(this);
		if(this == Gamestats.Hero){
			Unit.move_wasd(this);
			Unit.weapon_loop(this);
		}else{
			if(this.loop_ai && this.owner.ai){
				this.loop_ai();
			}
			if(this.task != null){
				this.task.loop();
			}
		}
		
		if(this.guardTask.chasePauseTimer <= 0 && this != Gamestats.Hero){
			if(this.guarding == true && Gamestats.GuardEnabled){
				this.guardTask.loop();
			}
		}else{
			this.guardTask.chasePauseTimer --;
		}
		//Regen loop
		if(this.hp < this.hp_max){
			this.hp = Math.min(this.hp_max, this.hp+this.hp_regen);
		}
		
		for(var i=0;i<this.Abilities.length;++i){
			this.Abilities[i].loop();
		}
	}
	
	if(this.moving == true 
	/*&& (this.dz >= -0.1 || this.proto.flying)*/){ // not falling
		this.currentSpeed = Math.min(this.currentSpeed + this.speed*this.acceleration, this.speed);
		this.currentSpeed *= (1+this.fleeSpeedBonus);
		this.movement_time++;		
		if(this.task != null && this != Gamestats.Hero ){//if we have not stopped in the previous loop

			if(this.avoidLeft > 0 || this.avoidRight > 0){
				if(this.avoidLeft > this.avoidRight){
					this.avoidAngle -= this.avoidTurnSpeed ;
				}else{
					this.avoidAngle += this.avoidTurnSpeed ; 
				}
			}
			//this.angle = this.task.dest.x != this.x ? Math.atan2((this.task.dest.x - this.x),(this.task.dest.y - this.y)) : 1.57;
			this.angle += this.avoidAngle;
			this.avoidAngle *= this.avoidDamping;
			
			this.movementx = (Math.sin(this.angle)) * this.currentSpeed;
			this.movementy = (Math.cos(this.angle)) * this.currentSpeed;
			
			//this.atNode.bend_timestamp_unit = Pathfinder.bend_timestamp;
			//this.atNode.bend_unit_dir = - this.actor.rotZ;
			if(this.movement_time > 15 && this.dx_cumulative*this.dx_cumulative+this.dy_cumulative*this.dy_cumulative < this.speed*this.speed/4){
				if(this.task.ability && this.task.ability.can_interrupt_if_stuck){
					if(this.proto == UnitPrototype.Probe && this.owner.ai){
						//hack, should find real reason why ai builders can't reach build dest
						Unit.Wander(this);
					}else{
						this.Wait(30);
					}
				}
			}
		}
	}else{
		this.dx_cumulative=0;
		this.dy_cumulative=0;
		this.movement_time=0;
		this.currentSpeed = this.speed * 0.05;
		this.avoidAngle = 0;
		if(this != Gamestats.Hero){
			this.movementx = 0;
			this.movementy = 0;
		}
	}
	
	
	
	this.dx += this.movementx;
	this.dy += this.movementy;
	//CLAMP
	var speedlimit = this.speed * Math.max(this.speed_clamp_factor, 1+this.fleeSpeedBonus);
	//units are a bit slowed down if a lot of collisions are happening to them
	if(this.number_of_collisions_last_frame > this.collision_speedlimit_factor){
		speedlimit /= Math.min( 2 , 1 + 0.15*(this.number_of_collisions_last_frame-this.collision_speedlimit_factor));
	}
	if(this.fighting == true){
		speedlimit *= 0.5;
		this.currentSpeed = this.speed/2;
	}
	this.dx = Math.max(-speedlimit,Math.min(speedlimit,this.dx));
	this.dy = Math.max(-speedlimit,Math.min(speedlimit,this.dy));
	
	//var groundZ = M.terrain.getHeightAt(this.x, this.y);
	//if(this.alive){groundZ += this.proto.flyingHeight;}
	var wallZ = Node.decodeWallZ(this.atNode, groundZ);
	this.gravity = true;
	
	if(this == Gamestats.Hero){
		var groundZ = Math.max(NavNode.get_floor_z(this.x - 0.1,this.y,this.z), NavNode.get_floor_z(this.x + 0.1,this.y,this.z));
		groundZ = Math.max(groundZ, NavNode.get_floor_z(this.x ,this.y +0.1 ,this.z));
		groundZ = Math.max(groundZ, NavNode.get_floor_z(this.x ,this.y -0.1 ,this.z));
	}else{
		var groundZ = NavNode.get_floor_z(this.x,this.y,this.z);
	}

	var on_the_ground_now = groundZ>this.z-0.05;
	if(!this.on_the_ground && on_the_ground_now && this.windPressureVector.z < -0.1 && dz_previous < -0.05 ){//just landed
		var landingPitch = Math.max(0.75, 1  - Math.abs(this.windPressureVector.z)*0.5);
		var landingVolume =  Math.abs(this.windPressureVector.z)*2;
		SoundObject.hit_melee.playAt(this.x,this.y,landingPitch , landingVolume);
	}
	this.on_the_ground = on_the_ground_now;
	
	this.last_floor_collider = NavNode.last_collider;
	this.last_floor_triangle = NavNode.last_raycast_triangle;
	
	if(!this.proto.flying&&!this.on_ceiling || !this.alive){
		if(!this.on_the_ground){ //ground unit in the air, let's make it fall
			if(this.windPressureVector.z > -0.5){//terminal velocity
				this.windPressureVector.z -= this.gravityFactor;
			}
			this.coyote_time ++;
			if(this.coyote_time < 4 && this == Gamestats.Hero && this.windPressureVector.z<0.05){ 
				Unit.jump_loop(this); 
			}
		}else{ //on ground
			this.windPressureVector.z = Math.max(0, this.windPressureVector.z);
			this.dz = (groundZ-this.z)*0.5; //*0.5 to make it a soft transition
			if(this == Gamestats.Hero){ Unit.jump_loop(this); }
			
			if(this.last_floor_collider){
				
				if(this.last_floor_triangle){ //scrolling floor
					var sec = this.last_floor_triangle.getSector();
					this.dx -= sec.texOffX / 64;
					this.dy -= sec.texOffY / 64;
				}
				
				vec3.rotate_collider_inverse(NavNode.helperVec, this.last_floor_triangle.plane, this.last_floor_collider);
				//harder to walk on slope
				var slopeWalkLoss = Math.sqrt(1-NavNode.helperVec[2]);
				this.dx -= this.movementx*slopeWalkLoss;
				this.dy -= this.movementy*slopeWalkLoss;
				if(NavNode.helperVec[2]<0.8){//slide down a slope
					this.coyote_time ++;
					if(this.coyote_time > 10){
						var slopeSlide = (slopeWalkLoss-0.3)*0.2;
						this.dx += NavNode.helperVec[0]*slopeSlide;
						this.dy += NavNode.helperVec[1]*slopeSlide;
						this.dz -= (1-NavNode.helperVec[2])*slopeSlide*0.5;
						//smaller jump from steep slope
						this.windPressureVector.z -= slopeSlide;
					}
				}else{
					this.coyote_time = 0;
				}
				
				var sec = this.last_floor_triangle.getSector();
				if(sec.effect){
					sec.effect(this.last_floor_triangle, this);
				}
			}
		}
	}else if( this.proto.flying && this.task.id != Task.id_JumpTask){ //charging Ghasts should not be affected
		//FLYING UNIT
		this.windPressureVector.z *= 0.8;
		if(!this.last_coll_triangle && this.moving && this.inner_counter %60 == 0){
			if(RAND()< 0.1){
				this.goalZ = groundZ + this.flyingHeight + RAND() * Math.max(1, Gamestats.Hero.z-this.z) ;
			}
		}
		
		if(this.task.targetUnit 
		&& Unit_Distance(this.task.targetUnit, this) < 4*Math.abs(this.z-(this.task.targetUnit.z))
		&& !this.last_coll_triangle && this.inner_counter%60 < 30 ){//get to target's level if getting closer
			this.pressureVector.z += Math.sign(this.task.targetUnit.z - this.z) * 0.001;
		}else{
			//this.goalZ = groundZ  + this.flyingHeight;
			if(this.z  < this.goalZ ){
				this.pressureVector.z += 0.001;
				if(this.last_coll_triangle){
					this.pressureVector.z += 0.001;
				}
			}else if(this.z  > this.goalZ + 4 || this.last_coll_triangle && this.z > this.goal){
				this.pressureVector.z -= 0.001;
				if(this.last_coll_triangle){
					this.pressureVector.z -= 0.001;
				}
			}
		}
	}else if(this.on_ceiling){ //MONSTER ON CEILING
		this.collZ = -this.proto.collZ;
		this.eyeZ = -this.proto.eyeZ;
		this.projectileLaunchZ = -this.proto.projectileLaunchZ;
		this.coyote_time = 0;
		groundZ = NavNode.get_ceiling_z(this.x,this.y,this.z); 
		if(groundZ-this.z < 0.05){//touching the ceiling
			this.windPressureVector.z = 0;
			this.dz = (groundZ-this.z)*0.5; //*0.5 to make it a soft transition
			this.on_the_ground = true;
		}else{
			this.windPressureVector.z = Math.max(0.1,this.windPressureVector.z +0.005);
			this.on_the_ground = false;
		}
		this.actor.model = Asset.model.sprite_flipped;
		this.pressureVector.z = 0;
	}
	
	this.dx += this.windPressureVector.x;
	this.dy += this.windPressureVector.y;
	this.dz += this.windPressureVector.z;
	this.dx_cumulative += this.dx;
	this.dy_cumulative += this.dy;
	this.dx_cumulative*=0.9;
	this.dy_cumulative*=0.9;
	if(this.mesh_collision()){
		if(this.last_coll_triangle){
			if(this.proto.flying){
				this.flying_on_collision();
			}
			var sec = this.last_coll_triangle.getSector();
			if(sec.effect){
				sec.effect(this.last_coll_triangle, this);
			}
		}
		if(!this.proto.flying && this.task.onCollision){
			this.task.onCollision(this.last_coll_triangle);
		}
	}
	if(this!=Gamestats.Hero && this.alive && !this.proto.flying){ //avoid chasms
		 if(this.chasm_collision( groundZ )){
			if(this.task.onCollision){
				this.task.onCollision(null);
			}
		}
	}
		
	//if movement is being obstructed, the unit is slow, so it will have to accelerate
	if(this.moving == true && (Math.abs(this.dx) + Math.abs(this.dy) < this.currentSpeed/2)){
		this.currentSpeed *= 0.8;
	}
	
	if(isNaN(this.dz)){
		this.dz = 0;
		this.dy = 0;
		this.dx = 0;
		console.log("DELTANAN");
	}
	
	this.z += this.dz;
	this.x += this.dx;
	this.y += this.dy;
	 
	
	if( this.z < groundZ-0.1 && Control.gameState == Control.gameState_inEditor){ //edge case when unit is placed below the map mesh
		this.z = groundZ;
	}
}

Unit.move_wasd = function(u){
	if(Control.gameState != Control.gameState_inGame){return;}
	var mx = my = 0;
	
	if(Control.key_left.pressed()){
		mx -= 0.5;
	}
	if(Control.key_right.pressed()){
		mx += 0.5;
	}
	if(Control.key_backward.pressed()){
		my -= 0.5;
	}
	if(Control.key_forward.pressed()){
		my += 0.5;
	}
	
	var zerodir = -cam.yaw;
	var mx_rot = 0;
	var my_rot = 0;
	var cs = Math.cos(zerodir); var sn = Math.sin(zerodir);
	
	if(Math.abs(mx)>0.1 || Math.abs(my) >0.1){
		var dist = Math.sqrt(mx*mx+my*my);
		mx_rot += (mx*cs - my*sn)/dist * u.currentSpeed;
		my_rot += (mx*sn + my*cs)/dist * u.currentSpeed;
	}
	if(Control.key_sneak.pressed()){
		mx *= 0.5; my *= 0.5;
		mx_rot *= 0.5; my_rot *= 0.5;
		
	}
	 
	//proportional ease-in
	u.movementx += (mx_rot - u.movementx)*0.4;
	u.movementy += (my_rot - u.movementy)*0.4;
	
	if(mx || my){
		u.moving = true;
	}else{
		u.moving = false;
	}
	cam.roll_motion_tilt += (mx*0.015 - cam.roll_motion_tilt)*0.15;
}


Unit.weapon_loop = function(u){
	if(Control.gameState != Control.gameState_inGame || !u.weapon){return;}
	u.weapon.loop();
	if(u.leftWeapon){
		u.leftWeapon.loop();
	}
}

Unit.jump_loop = function(u){
	if(Control.gameState != Control.gameState_inGame || !u.alive){return;}
	if(Control.key_spell.pressed()){
		SoundObject.jump.playAt(u.x,u.y);
		u.windPressureVector.z = 0.12;
	}
}

Unit.shoot_at = function(u,targetVec){
	Projectile.Create(u.projectileSetter, u, u.attackDamage, null, targetVec );
	u.proto.attackSound.playAt(u.x,u.y);
	u.actor.startAnimation(Anim.attack);
	Unit.setFacingInstant(u, cam.yaw);
}

Unit.loop_first_birth = function(){
	if(this.inner_counter < 59){
		++this.inner_counter;
	}else{
		this.inner_counter = 0;
	}
	
	this.birthCounter++;
	this.born = false; 
	//RTS ONLY
	/*if(this.isStructure != true){
		if(this.actor.shadowShader.isAnimatedShadow == false){
			this.actor.shadowZOffset = this.birthCounter/this.birthTime -1; 
		}else{
			this.actor.shadowZOffset = 0;
		}
		this.z = M.terrain.getHeightAt(this.x, this.y);
		this.z = Math.max(this.z, Node.decodeWallZ(this.atNode, this.z));
	}else{
		this.z = M.terrain.getHeightAt(this.x, this.y);
		if(this.builder){ //should exclude landing bunkers and such
			this.hp = Math.min(this.hp_max, this.hp + this.hp_max/this.proto.trainingTime);
		}
	}*/
	
	if(this.proto.flying){
		this.windPressureVector.z *= 0.8;
		this.dz = this.windPressureVector.z;
		this.z += this.dz;
	}
	
	if(this.birthCounter > this.birthTime){
		this.born = true;
		this.owner.gainUnit_born(this);
		//zero out the pressure that could be accumlated during birth
		Vector.scale(this.pressureVector, 0);
		Vector.scale(this.sidePressureVector,0);
		Vector.scale(this.gridPressureVector,0);
		//Vector.scale(this.windPressureVector,0);
		Unit.getLoopFunction(this);
		this.actor.shadowZOffset = 0;
		if(this.alive == true){
			this.actor.startAnimation(Anim.stand);
		}
		if(this.proto.birthModel){
			this.actor.model = this.proto.model;
			this.actor.frame = this.actor.animCollection[Anim.stand].frames[0];
		}
		if(this.isStructure == true){
			if(this.owner == Control.currentPlayer && this.builder){
				GUI.Alert_Construction(this);
			}
			this.z = this.atNode.averageZ + Node.getCliffLevel(this.atNode);
		}
		//we add an idle subtask to the trigger spawned units,
		//otherwise the hotspot task will set 'moving' to true,
		//changing the birth animation to walk animation
		if(this.taskStack.length > 0){
			this.removeTopSubTask();
		}
	}
}

Unit.loop_first_stationary = function(){
	if(this.inner_counter < 59){
		++this.inner_counter;
	}else{
		this.inner_counter = 0;
	}
	this.preferred_pos.x = this.x;
	this.preferred_pos.y = this.y;
	
	if(this.guarding == true){
		if(Gamestats.GuardEnabled){
			this.guardTask.loop();
		}
	}
	if(this.task != null){
		this.task.loop();
	}
	for(var i=0;i<this.Abilities.length;++i){
		this.Abilities[i].loop();
	}
	if(this.container){
		if(this.container.alive == true){
			this.z = this.container.z + this.container.proto.garrisonZ;
			
			if( !this.container.isStructure){
				//moving garrison
				
				this.setValidCoordinates();
				var atNode_last_frame = this.atNode;
				Minimap.unitUpdate(this);
				this.atNode = pf.getNodeAt_Robust(this.x,this.y);
				if(this.atNode != atNode_last_frame && this.alive){
					var clust = Node.getCluster(this.atNode); var oldclust = Node.getCluster(atNode_last_frame);
					if(clust != oldclust){
						oldclust.removeLiveUnit(this);
						clust.addLiveUnit(this);
					}
					if(atNode_last_frame != null){
						Node.removeUnit(atNode_last_frame, this);
					}
					Node.addUnit(this.atNode, this);	
				}
				if(this.container.proto.garrisonAttachmentPointId>=0){
					//dynamic garrison point using attachmentPoint
					this.actor.update_drawloop = Actor.UnitActor.update_drawloop_garrisonAttachment;
					this.x = this.container.x;
					this.y = this.container.y;
				}else{
					//static model point
					var garrId = this.container.garrisonArray.indexOf(this);
					var garrData = this.container.proto.garrisonPlacement[garrId];
					this.x = this.container.x + garrData[0];
					this.y = this.container.y + garrData[1];
					this.dx = this.container.dx;
					this.dy = this.container.dy;
				}
				this.z = this.container.z + this.container.proto.garrisonZ;
			}else{
				this.z = this.container.actor.z + this.container.proto.garrisonZ;
			}
		}else{
			//container building has been destroyed
			var ungarrisoned = Unit.ungarrison(this.container, this);
			if(this.container.proto.garrison_move_inherited){
				if(this.container.movementAbility && this.container.movementAbility.target){
					Unit.Walk(ungarrisoned, this.container.movementAbility.target.x,this.container.movementAbility.target.y);
				}
			}
			return;
		}
	}
}

Unit.loop_first_structure = function(){
	if(this.inner_counter < 59){
		++this.inner_counter;
	}else{
		this.inner_counter = 0;
	}
	if(this.task != null){
		this.task.loop();
	}
	this.z = M.terrain.getHeightAt(this.x, this.y);
	if(this.alive == true){
		for(var i=0;i<this.Abilities.length;++i){
			this.Abilities[i].loop();
		}
		if(Gamestats.GuardEnabled){
			if(this.attackRange>0){
				this.guarding = true;
				this.guardTask.loop();
			}
		}
		
		if(this.loop_ai && this.owner.ai){
			this.loop_ai();
		}
		
		//otherwise structures would never be attacked by AI
		if(this.proto.targetPriority == 1){
			if(this.inner_counter % 30 == 0){
				if(RAND() < 0.2){
					this.targetPriority = 2
				}else{
					this.targetPriority = 1;
				}
			}
		}
		
		if(this.proto.isNeutralGarrison){
			if(this.garrisonArray.length > 0){
				this.targetPriority = 2;
				if(this.garrisonArray[0].owner != this.owner){
					var replaced = Unit.changeOwner(this, this.garrisonArray[0].owner);
					this.replace_alias = replaced;
					return;
				}
			}else{
				if(this.owner != Players[0]){
					Unit.changeOwner(this, Players[0]);
					return;
				}
				this.targetPriority = 0;
			}
		}
	}
	/*if(this.garrisonArray){
		if(this.garrisonArray.length > 0){
			this.targetPriority = 2;
			//this.sightRadius = this.garrisonArray[0]
		}else{
			this.targetPriority = this.proto.targetPriority;
		}
	}*/
}

Unit.loop_first_item = function(){
	if(this.inner_counter < 59){
		++this.inner_counter;
	}else{
		this.inner_counter = 0;
	}
	
	var atNode_last_frame = this.atNode;
	this.atNode = pf.getNodeAt_Robust(this.x,this.y);
	
	this.x += this.dx;
	this.y += this.dy;
	
	var node_of_next_frame = pf.getNodeAt(this.x,this.y);
	if(node_of_next_frame && (this.blockerCollisionCheck(node_of_next_frame)==true
	|| node_of_next_frame.pathType == 1)){
		this.blocker_collision(node_of_next_frame);
	}	

	
	if(this.flyingHeight > 0){
		this.flyingHeight += this.dz;
		this.flyingHeight = Math.max(0, this.flyingHeight);
		this.dz -= this.proto.gravityFactor;
		this.dx *= 0.9;
		this.dy *= 0.9;
	}else{
		this.dz = 0;
		this.dx *= 0.8;
		this.dy *= 0.8;
		this.flyingHeight = 0;
	}
	
 
	var groundZ = NavNode.get_floor_z(this.x,this.y,this.z);
	this.z = groundZ + this.flyingHeight;
	
	if(this.alive == true && this.inner_counter % 2 == 0){ 
		if(Unit_Distance_3d(this,Gamestats.Hero) < 0.8 && 
		(!this.proto.itemPickupCondition||this.proto.itemPickupCondition(Gamestats.Hero)) && Gamestats.Hero.alive){
			Unit.pickup(this, Gamestats.Hero);
		}
	}
	
	//var angleChange = 0.05;
	//this.angle = (this.angle + angleChange)%6.2832
}
Unit.pickup = function(item,picker){
	if(item.proto.itemEffect){
		item.proto.itemEffect(item, picker);
	}
	if(item.proto.itemPickupText != null){
		GUI.Alert(item.proto.itemPickupText);
	}
	item.Die();
	return true;
}

Unit.loop_second_item = function(){
	if(this.alive == false){
		this.decayCounter ++;
		if(this.decayCounter >= this.decayTime){
			this.Remove();
		}
	}
	if(!this.last_floor_collider){
		var groundZ = NavNode.get_floor_z(this.x,this.y,this.z);
		this.last_floor_collider = NavNode.last_raycast_triangle;
	}
}

Unit.loop_second = function(){
	if(this.proto.texture_wounded && this.hp < this.hp_max*this.proto.woundTreshold){
		if(this.actor.texture_default != this.proto.texture_wounded){
			if(this.proto.WoundEffect){
				this.proto.WoundEffect(this);
			}
			this.actor.texture_default = this.proto.texture_wounded;
			this.actor.texture = this.actor.texture_default;
		}
	}
	
	if(this.alive == true){
		
		if(this.last_evil_seen){
			this.see_evil_counter = Math.min(30, this.see_evil_counter + 10);
			if(this.see_evil_counter > 10){
				this.Hurt(Math.ceil(this.see_evil_counter/3), this.last_evil_seen);
			}
			this.last_evil_seen = null;
		}else{
			this.see_evil_counter = Math.max(0, this.see_evil_counter - 1);
		}

		if(this.owner.rescuable && this.proto.rescuable && !this.container){
			if(this.inner_counter %30 == 10){
				var rescuer = this.GetNearestUnit_NoObstacle(4+this.hardRadius, SearchFilter.isRescuer);
				if(rescuer){
					Unit.rescue(this,rescuer);
					return;
				}
			}
		}
		
		if(this.born){	
			if(this.inner_counter % this.collisionFrequency == 0 /*|| this.number_of_collisions_last_frame > this.collision_every_frame_treshold*/){
				this.neighbour_collision();
			}
		
			if(this.moving == true){
				if(this.proto.walkSound && this.inner_counter%this.proto.walkSoundTicks==0 &&
				this.actor.visible){
					this.proto.walkSound.playAt(this.x,this.y);
				}
				if(this.gridPressure > 0){
					this.getGridPressure();
				}
				
				if(this.inner_counter % 6 == 0 ){ 
					this.avoidLeft = 0; this.avoidRight = 0;
					if(this.pressureStrength_side > 0 && this.last_distancefield_absolute > 3){//if too close to obstacle, don't avoid
						this.getAvoid();
					}
					if(this.inner_counter % 18 == 0 && Unit.checkInWater(this) == true
					&& this.actor.visible == true){
						ParticleActor.SpawnUnitRipple(this.x, this.y, false);
						if(Math.random()<0.2){
							SoundObject.step_water.playAt(this.x, this.y)
						}
					}
				}
				this.angle = Math.atan2(
				(this.movementx + this.blockerPressureVector.x + this.sidePressureVector.x),
				(this.movementy + this.blockerPressureVector.y + this.sidePressureVector.y));
			}
			if(this.container == null){
				this.actor.update_selection();
			}
		}
	}/*else{ //Corpse decay disabled for FPS
		this.decayCounter += 0.2; 
		if(this.decayCounter >= this.decayTime){
			this.Remove();
		}
	}*/
}

Unit.loop_second_gate = function(){
	
	if(this.gateClosed == true && this.alive == true){
		if(this.decayCounter > 0 ){
			this.decayCounter -= 4;
		}
	}else{
		if(this.decayCounter <= this.decayTime){
			if(this.actor.animCollection == Anim.Empty){
				this.decayCounter += 4;
			}
		}else if(this.alive == false){
			this.Remove();
		}
	}
}

Unit.prototype.setPressureVectors = function(){
	this.pressureVector.x = Math.max(-this.speed*this.pressure_clamp_factor,Math.min(this.speed*this.pressure_clamp_factor,this.pressureVector.x)) ;
	this.pressureVector.y = Math.max(-this.speed*this.pressure_clamp_factor,Math.min(this.speed*this.pressure_clamp_factor,this.pressureVector.y)) ;
	this.pressureVector.z = Math.max(-this.speed*4,Math.min(this.speed * 0.5,this.pressureVector.z));
	if(this.pressure_stacking_factor > 0 && this.pressure_absolute > 0 && this.pressureVector.z > 0.001){
		this.pressureVector.z *= 0.97;
	}else if(this.proto.flying){
		this.pressureVector.z *= 0.97;
	}

	this.windPressureVector.x = Math.max(-0.5, Math.min(0.5, this.windPressureVector.x));
	this.windPressureVector.y = Math.max(-0.5, Math.min(0.5, this.windPressureVector.y));
	this.windPressureVector.z = Math.max(-0.5, Math.min(0.5, this.windPressureVector.z));
	
	//Vector.add(this.pressureVector,this.pressureVector,this.blockerPressureVector);
	if(!isNaN(this.pressureVector.x)){
		this.dx += this.pressureVector.x + Math.max(-this.sidePressureClamp, Math.min(this.sidePressureClamp, this.sidePressureVector.x)) + this.gridPressureVector.x;
		this.dy += this.pressureVector.y + Math.max(-this.sidePressureClamp, Math.min(this.sidePressureClamp, this.sidePressureVector.y)) + this.gridPressureVector.y;
		this.dz += this.pressureVector.z;
	}
	
	if(!isNaN(this.blockerPressureVector.x)){
		this.dx += this.blockerPressureVector.x;
		this.dy += this.blockerPressureVector.y;
	}
	
	if(this.number_of_collisions_with_moving_last_frame > 0){
		this.pressureVector.x *= this.pressure_damping;
		this.pressureVector.y *= this.pressure_damping;
	}else{
		this.pressureVector.x *= this.pressure_damping * 0.92;
		this.pressureVector.y *= this.pressure_damping * 0.92;
	}
	this.sidePressureVector.x *= 0.8;
	this.sidePressureVector.y *= 0.8;
	this.gridPressureVector.x *= this.gridPressure_damping;
	this.gridPressureVector.y *= this.gridPressure_damping;
	
	this.windPressureVector.x *= 0.8;
	this.windPressureVector.y *= 0.8;

	this.pressure_absolute_by_moving = 0;
	this.pressure_absolute = 0;
	
	Vector.scale(this.blockerPressureVector, this.blocker_pressure_damping);
}


Unit.prototype.jumpTo = function(goalVector){
	if(!this.alive){
		return;
	}
	var jumpZ = 0;

	jumpZ = M.terrain.getHeightAt(goalVector.x, goalVector.y);
	goalVector.z = jumpZ;
	Unit.setFacingInstant(this, Math.atan2(goalVector.x-this.x,goalVector.y-this.y));
	
	var jumpTime = Unit_Distance(goalVector,this)*4;
	this.addSubTask(new JumpTask(this, goalVector, null, jumpTime, false));
}

Unit.openGate = function(g){
	if(g.alive == false || g.gateClosed == false){return;}
	g.gateClosed  = false;

	M.terrain.Deform_Set_Walkability(g.atNode, true, u, 0);
	
	SoundObject.gate_open.playAt(g.x, g.y)
	g.pressureStrength_radial = 0;
}
Unit.closeGate = function(g){
	if(g.alive == false || g.gateClosed==true){return;}
	if(g.atNode.unitCount > 1){ //if units are standing on it, we can't close the gate
		return;
	}
	SoundObject.gate_open.playAt(g.x, g.y)
	g.gateClosed  = true;
	g.pressureStrength_radial = g.proto.pressureStrength_radial;
	M.terrain.Deform_Set_Walkability(g.atNode, false, u, 7);
}

Unit.prototype.setBaseTask = function(newTask){
		this.clearAllTasks();
		
		if(this.task != null){
			if(this.task.Finish != undefined){
				this.task.Finish();
			}
		}
		this.task = newTask;
		if(this.task.abilityInstance){
			this.getAbilityGuardTask(this.task.abilityInstance.proto);
		}
		if(this.task.Start != undefined){
			this.task.Start();
		}
}

Unit.prototype.addSubTask = function( newTask ){
		this.movement_time = 0;
		if(this.task != null){
			this.taskStack.push( this.task );
		}
		this.task = newTask;
		if(this.task.abilityInstance){
			this.getAbilityGuardTask(this.task.abilityInstance.proto);
		}
		if(this.task.Start != undefined){
			this.task.Start();
		}
		if(this.taskStack.length > 100){
			console.log("too many tasks");
			this.Stop();
		}
	
}

Unit.prototype.changeSubTask = function( newTask ){
		this.movement_time = 0;
		this.task = newTask;
		if(this.task.abilityInstance){
			this.getAbilityGuardTask(this.task.abilityInstance.proto);
		}
		if(this.task.Start != undefined){
			this.task.Start();
		}
	
}

Unit.prototype.removeTopSubTask = function(){
		this.movement_time = 0;
		if(this.task.Finish != undefined){
			this.task.Finish();
		}
		if(this.taskStack.length == 0){//TODO find an elegant fix, this should NEVER HAPPEN
			this.Stop();
			//console.log("oops");
			return;
		}
		this.task = this.taskStack[this.taskStack.length - 1];
		this.taskStack.length = this.taskStack.length - 1;
		
		if(this.task.Resume != undefined){
			this.task.Resume();
		}else if(this.task.Start != undefined){
			this.task.Start();
		}
		if(this.moving == false){
			this.angle = this.preferred_facing;
		}

}

Unit.prototype.clearAllTasks = function(){
	this.fighting = false;
	if(this.task != null){
		if(this.task.Finish != undefined){
			this.task.Finish();
		}
	}
	
	for(var i=this.taskStack.length-1;i>=0;--i){
		if(this.taskStack[i].Finish != undefined){
			this.taskStack[i].Finish();
		}
	}
	this.taskStack.length = 0;
	this.movement_time = 0;
	this.task = null;
	this.guarding = false;
}

Unit.prototype.startGuard = function(){
	this.guarding = true;
	this.guardTask.target = null;
}

Unit.prototype.getAbilityGuardTask = function(ability){
	if(ability.guardTask != this.guardTask.custom_constructor){
		if(!ability.guardTask){
			this.guardTask = this.proto.GuardTask(this);
		}else{
			this.guardTask = ability.guardTask(this);
		}
	}
}

Unit.prototype.updateTaskParams = function(){
	if(this.task.updateParams != undefined){
		this.task.updateParams();
	}
}

Unit.prototype.setValidCoordinates = function(){
	if(this.x <0 || isNaN(this.x)){
		this.x = 0;
	}else if(this.x >= pf.mapW){
		this.x = pf.mapW-0.01
	}
	if(this.y <0 || isNaN(this.y)){
		this.y = 0;
	}else if(this.y >= pf.mapH){
		this.y = pf.mapH-0.01
	}
}

Unit.distanceField_Pressure = function(){
	if(this.moving == true){
		var distField = pf.getDistanceFieldAt(this.x, this.y);
		var distx =  distField[1] * Math.abs(this.movementy/this.speed);
		var disty = distField[2] * Math.abs(this.movementx/this.speed);
		this.blockerPressureVector.x += distx* this.distance_pressure_factor;
		this.blockerPressureVector.y += disty *this.distance_pressure_factor; 
		this.last_distancefield_absolute = distField[0];
	}
}

Unit.distanceField_Pressure_Large = function(){
	var distField = pf.getDistanceFieldAt(this.x, this.y);
	if(this.moving == true){
		var distx = distField[1] * (0.3 + Math.abs(this.movementy/this.speed)*0.7); //mix by 30-70
		var disty = distField[2] * (0.3 + Math.abs(this.movementx/this.speed)*0.7);
		this.blockerPressureVector.x += distx *this.distance_pressure_factor;
		this.blockerPressureVector.y += disty *this.distance_pressure_factor; 
		
		this.last_distancefield_absolute = distField[0];
	}

	if(distField[0] <= this.blockerCollisionTreshold){
		this.currentSpeed *= 0.95; //bit of slowdown
		if(this.moving == true && this.inner_counter%30 == 0 && this.bounces_off_walls == true){
			//BOUNCE
			this.pressureVector.x += distField[1]* (RAND()+0.2)*0.3;
			this.pressureVector.y += distField[2]* (RAND()+0.2)*0.3;
		}else{
			this.pressureVector.x += distField[1]* this.distance_pressure_factor;
			this.pressureVector.y += distField[2]* this.distance_pressure_factor;
		}
		//sideways pressure for avoidance
		distx = distField[1] * (-this.movementx)*10;
		disty = distField[2] * (-this.movementy)*10;
		this.blockerPressureVector.x += this.x%1 < 0.5 ? - disty*this.distance_pressure_factor : disty*this.distance_pressure_factor;
		this.blockerPressureVector.y += this.y%1 < 0.5 ? - distx*this.distance_pressure_factor : distx*this.distance_pressure_factor;
	}
}

Unit.prototype.chasm_collision = function(groundZ_old){
 
	var dxy = Math.sqrt(this.dx *this.dx + this.dy*this.dy);
	if(dxy < this.speed*2){
		if(this.on_ceiling){
			var groundZ_next = NavNode.get_ceiling_z(this.x + this.dx*2 ,this.y + this.dy*2 ,this.z);
			if( Math.abs(groundZ_next-groundZ_old ) > 0.45){
				this.dx *= -0.5;
				this.dy *= -0.5;
				this.dz = 0;
				return true;
			}
		}else{
			var groundZ_next = NavNode.get_floor_z(this.x + this.dx*2 ,this.y + this.dy*2 ,this.z);
			if( groundZ_old - groundZ_next  > 0.45 || groundZ_old - groundZ_next < -0.36){
				this.dx *= -0.5;
				this.dy *= -0.5;
				this.dz = 0;
				return true;
			}
		}
		
	}
	return false;
}

Unit.prototype.flying_on_collision = function(){
	var groundZ_next = NavNode.get_floor_z(this.x + this.movementx*10 ,this.y + this.movementy*10 ,this.z);
	if(groundZ_next > -999){
		this.goalZ = groundZ_next +0.1;
	}
	if(groundZ_next < -999 || RAND()<0.45){
		if(this.task.onCollision){
			this.task.onCollision(this.last_coll_triangle);
		}
	}	 
}


Unit.prototype.mesh_collision = function(){
	var collZ = this.collZ;
	var floor = this.last_floor_collider;
	var coll_happened = false;
	this.last_coll_triangle = null;
	
	vec3.set(NavNode.coll_center, this.x + this.dx ,this.y + this.dy,this.z+this.dz+collZ);
	var hitPos = NavNode.sphere_collision_all( NavNode.coll_center , this.hardRadius);
	if(hitPos){
		coll_happened = true;
		this.last_coll_triangle = NavNode.last_raycast_triangle;
		var dist=Utils.distance_xxyyzz(hitPos[0], this.x, hitPos[1], this.y, hitPos[2], this.z+collZ);
		var tri_normal = hitPos; //reuse junk vector
		
		var otherTri = null;
		if(NavNode.last_coll_edgeId >= 0){//collision was with edge
			otherTri = NavNode.last_raycast_triangle.getAdjacentByEdgeId( NavNode.last_coll_edgeId );
		}
		if(otherTri){//if collision was with a corner, use normal from both triangles
			vec3.mix(tri_normal, NavNode.last_raycast_triangle.plane, otherTri.plane);
			vec3.rotate_collider_inverse(tri_normal, tri_normal ,NavNode.last_collider);
		}else{
			vec3.rotate_collider_inverse(tri_normal,NavNode.last_raycast_triangle.plane,NavNode.last_collider);
		}
		
		if(tri_normal[2] < 0){//collision with ceiling
			this.windPressureVector.z = Math.min(this.windPressureVector.z, -0,01);
		}
		
		var dxy = Math.sqrt(this.dx*this.dx + this.dy*this.dy + this.dz*this.dz); //magnitude of motion
		
		//project motion vector onto triangle normal
		var dot = tri_normal[0]*this.dx + tri_normal[1]*this.dy + tri_normal[2]*this.dz;
		
		this.dx = this.dx - tri_normal[0]*dot  ;
		this.dy = this.dy - tri_normal[1]*dot  ;
		this.dz = this.dz - tri_normal[2]*dot  ;
		
		if(this.moving){ //slide unit along wall, especially when running parallel to it
			var dcos = (tri_normal[0]*this.movementx + tri_normal[1]*this.movementy)/this.currentSpeed;
			//squared sine between wall and movement - squared will bias towards sideways motion
			var dsinSQ = 1-dcos*dcos; 
			dsinSQ = Math.max(0, dsinSQ - 0.3)*1.6; //dunno why, but this won't be 0 if walking perpendicular
			var cross = tri_normal[0] * this.movementy - tri_normal[1] * this.movementx;
			dsinSQ *= -Math.sign(cross) * this.currentSpeed ;//flip if angle diff is negative
			this.dx += tri_normal[1] * dsinSQ;
			this.dy += -tri_normal[0] * dsinSQ;
		}
		if(otherTri){//extra bounce when colliding with corners
			var bounceBack = 0.1 + dxy*0.2;
			this.dx += tri_normal[0]*bounceBack * RAND();
			this.dy += tri_normal[1]*bounceBack;
			this.dz += tri_normal[2]*bounceBack;
		} 
		//trim the motion vector so that the colliders touch exactly
		var allowed_delta = Math.max(0, this.hardRadius - dist + dxy);
		var factor =  Math.min(1, (allowed_delta)/(dxy+0.01));
		this.dx -= this.dx * factor;
		this.dy -= this.dy * factor;
		this.dz -= this.dz * factor;
		
		//WHY IS THIS NOT EQUAL???
		//console.log(dist - NavNode.last_raycast_dist);
		vec3.set(NavNode.coll_center, this.x+this.dx,this.y+this.dy,this.z+this.dz+collZ);
		hitPos = NavNode.sphere_collision_all( NavNode.coll_center , this.hardRadius);	
		if(hitPos){ //second collision to handle concanve corners
			otherTri = null;
			if(NavNode.last_coll_edgeId >= 0){//collision was with edge
				otherTri = NavNode.last_raycast_triangle.getAdjacentByEdgeId( NavNode.last_coll_edgeId );
			}
			if(otherTri){//if collision was with a corner, use normal from both triangles
				vec3.mix(tri_normal, NavNode.last_raycast_triangle.plane, otherTri.plane);
				vec3.rotate_collider_inverse(tri_normal, tri_normal , NavNode.last_collider );
			}else{
				vec3.rotate_collider_inverse(tri_normal, NavNode.last_raycast_triangle.plane, NavNode.last_collider);
			}
			//how deep is the intersection?
			dist=Utils.distance_xxyyzz(hitPos[0], this.x, hitPos[1], this.y, hitPos[2], this.z+collZ)+0.001;
			var interX = hitPos[0]-this.x;
			var interY = hitPos[1]-this.y;
			var interZ = hitPos[2]-(this.z+collZ);
			//extra bounce along normals
			var bounceBack = dist-this.hardRadius + 0.03;
			this.dx =  (interX-interX/dist*this.hardRadius) + tri_normal[0]*bounceBack;
			this.dy =  (interY-interY/dist*this.hardRadius) + tri_normal[1]*bounceBack;
			this.dz =  (interZ-interZ/dist*this.hardRadius) + tri_normal[2]*bounceBack;
			
			if(NavNode.last_collider!= floor &&(NavNode.last_collider.dynamic || floor&&floor.dynamic)){
				//Dynamic collision (floor or collider is moving)
				var crashdx = NavNode.last_collider.dx;
				var crashdy = NavNode.last_collider.dy;
				var crashdz = NavNode.last_collider.dz;
				
				if(NavNode.last_collider.d_angle || NavNode.last_collider.d_rotX || NavNode.last_collider.d_rotY){
					var centerX = NavNode.last_collider.x_last - this.x;
					var centerY = NavNode.last_collider.y_last - this.y;
					var centerZ = NavNode.last_collider.z_last - this.z;
					vec3.set(NavNode.helperVec, centerX, centerY, centerZ);
					vec3.rotateXYZ_origin(NavNode.helperVec, NavNode.helperVec, 
					NavNode.last_collider.d_rotX, NavNode.last_collider.d_rotY, NavNode.last_collider.d_angle);
					crashdx += NavNode.helperVec[0]-centerX;
					crashdy += NavNode.helperVec[1]-centerY;
					crashdz += NavNode.helperVec[2]-centerZ;
				}
				if(floor && floor.dynamic){ //negate movement with the floor if we collide with another mesh
					crashdx -= floor.dx;
					crashdy -= floor.dy;
					crashdz -= floor.dz;
					if(floor.d_angle || floor.d_rotX || floor.d_rotY){
						var centerX = floor.x_last - this.x;
						var centerY = floor.y_last - this.y;
						var centerZ = floor.z_last - this.z;
						vec3.set(NavNode.helperVec, centerX, centerY, centerZ);
						vec3.rotateXYZ_origin(NavNode.helperVec, NavNode.helperVec, floor.d_rotX, floor.d_rotY, floor.d_angle);
						crashdx -= (NavNode.helperVec[0]-centerX);
						crashdy -= (NavNode.helperVec[1]-centerY);
						crashdz -= (NavNode.helperVec[2]-centerZ);
					}
				}
				dot = crashdx*interX+crashdy*interY+crashdz*interZ;
				if(dot<0){
					this.dx += crashdx;
					this.dy += crashdy;
					this.dz += crashdz;
				}
			}
		}
	}
	
	if(floor && floor.dynamic){//move unit together with the surface 
		this.dx += floor.dx;
		this.dy += floor.dy;
		this.dz += floor.dz;
		
		if( floor.d_angle || floor.d_rotX || floor.d_rotY){
			var centerX = floor.x_last - this.x;
			var centerY = floor.y_last - this.y;
			var centerZ = floor.z_last - this.z;
			vec3.set(NavNode.helperVec, centerX, centerY, centerZ);
			vec3.rotateXYZ_origin(NavNode.helperVec, NavNode.helperVec, floor.d_rotX, floor.d_rotY, floor.d_angle);
			this.dx += (NavNode.helperVec[0]-centerX);
			this.dy += (NavNode.helperVec[1]-centerY);
			this.dz += (NavNode.helperVec[2]-centerZ);
			
			this.angle += floor.d_angle;
		}
	}
	
	return coll_happened;
}

Unit.blocker_collision = function(node){
	var nx;
	var ny;
	if(node != undefined){
		nx = node.nodex;
		ny = node.nodey;
	}else{
		nx = (this.x>>0);
		ny = (this.y>>0);
	}

	this.x -= this.dx;
	this.y -= this.dy;

	var dx_saved = this.dx;
	var dy_saved = this.dy;

	this.dx = 0;
	this.dy = 0;

	this.x += dx_saved;
	if(this.blockerCollisionCheck(this.x, this.y) == true){
		this.x -= dx_saved
		
		this.y += dy_saved;
		
		if(this.blockerCollisionCheck(this.x, this.y) == true){
			this.y -= dy_saved;
		}else{
			this.dy = dy_saved;
		}
	}else{
		this.dx = dx_saved
	}
	//BOUNCE
	if(this.moving == true && this.inner_counter%5 == 0 && this.bounces_off_walls == true){
		var distVectorX = (this.x - (nx+ 0.5));
		var distVectorY = (this.y - (ny+ 0.5));
		var pressureX = 0;
		var pressureY = 0;
		
		if(Math.abs(distVectorX) > Math.abs(distVectorY)){
			pressureX = 0.3 * Math.sign(distVectorX) * (RAND()+0.2);
			pressureY = 0;
		}else{
			pressureX = 0;
			pressureY = 0.3 * Math.sign(distVectorY) * (RAND()+0.2);
		}
		//pressureX += distVectorX*0.01;
		//pressureY += distVectorY*0.01;
		Vector.translate(this.blockerPressureVector, pressureX ,pressureY);
	}
}

Unit.sidePressure_submissive_matrix =
[[0,0.2],[ 0.7,0.7],[0,-1],[-1,-1],[1,-0.5],[1,-1],[1,0],[1,0],    [0,0]];
Unit.sidePressure_dominant_matrix =
[[0,0.4],[0.7,-0.7],[1,-1],[1,-1],[1,-0.5],[1,-1],[1,0],[1,0],     [0,0]];

Unit.neighbour_collision = function(){
	var nx = this.atNode.nodex;var ny = this.atNode.nodey;
	var tilesRadius = this.collision_tiles_radius;
	var ps_radial_current = this.pressureStrength_radial + this.number_of_collisions_last_frame*0.005;
	var r1 = this.moving == true ? this.softRadius_moving : this.softRadius_standing;
	this.number_of_collisions_last_frame = 0;
	this.number_of_collisions_with_moving_last_frame = 0;

	//ez arra valo hogy csak akadaly kozeleben halmozodjanak
	//var climbFactor  = 1/(0.3+this.last_distancefield_absolute);//we add 0.5 so it won't be zero
	//climbFactor *= climbFactor;
	var climbFactor = 1;
	
	var collcount  = 0;
	for(var i=-tilesRadius; i<=tilesRadius; ++i){
		if(ny+i < 0 || ny + i >= pf.mapH){continue};
		for(var j=-tilesRadius;j<=tilesRadius;++j){
			if(nx+j < 0 || nx + j >= pf.mapW){continue};
			var nod = pf.map[ny+i][nx+j];
			for(var u = nod.firstColl; u ; u=u.nextColl){
				if(u == this || u.alive == false /*|| u.born != true*/){continue;}
				
				var distance = Unit_Distance_3d(this,u);

				var r2 = u.moving == true ? u.softRadius_moving : u.softRadius_standing;

				if(distance < r1 + r2 && distance > 0.0001){
					if(u.crewedUnit == this || this.crewedUnit == u){
						continue;
					}
					var distVectorX = (this.x - u.x); //add a bit so that it's never the same
					var distVectorY = (this.y - u.y);
				
					this.number_of_collisions_last_frame ++;
					if(this.moving == true || u.moving == true){
						this.number_of_collisions_with_moving_last_frame ++;
					}
					
					var pressure_force = (r1 + r2 - distance) / (r1 + r2);
					
					if(u.z == this.z){
						var distVectorZ = 0.01+(this.pressurePriority < u.pressurePriority ? distance : -distance);
					}else{
						var distVectorZ = (this.z - u.z);
					}
					
					//if otherunit has a 1 larger class, the diff is 0.5, if 2 then 0.25
					var pressureClassDifference = Math.max(1, Math.pow(0.5, this.pressure_priority_class-u.pressure_priority_class));
					
					//if we want a more chaotic crowd, we can disable this (e.g. swarming insects)
					var pressure_radial_other = -1 * pressure_force * ps_radial_current / pressureClassDifference;
					Vector.translate_3d(u.pressureVector, pressure_radial_other  * distVectorX, pressure_radial_other  * distVectorY,
					 pressure_radial_other  * distVectorZ/distance * u.pressure_stacking_factor * climbFactor);
					 
					/*if( u.pressureStrength_side > 0 && u.owner.team == this.owner.team && this.moving == true){
						var pressure_side = pressure_force *  u.pressureStrength_side / (Math.max(distance, 0.3)) / pressureClassDifference;
						var dotp = this.movementx * distVectorX + this.movementy * distVectorY; //DOT product
						
						if(dotp <= 0){ //we are in front of the unit
							var crossp = this.movementx * distVectorY - this.movementy * distVectorX; //CROSS product
							var anglediff = 4;
							if(u.moving == true){
								if(crossp >= 0){	//unit on left side							
									anglediff = (Math.round((this.angle-u.angle)/ 0.785) + 16)%8; //2*pi / 8
								}else{
									anglediff = (Math.round((u.angle-this.angle)/ 0.785) + 16)%8; //2*pi / 8
								}
							}
							if(this.pressurePriority  > u.pressurePriority || u.moving == false ){
								var px = Unit.sidePressure_dominant_matrix[anglediff][0] * pressure_side;
								var py = Unit.sidePressure_dominant_matrix[anglediff][1] * pressure_side;
							}else{
								var px = Unit.sidePressure_submissive_matrix[anglediff][0] * pressure_side;
								var py = Unit.sidePressure_submissive_matrix[anglediff][1] * pressure_side;
							}
							
							if(crossp < 0){
								px*= -1;
							}
							
							var sn = Math.sin(this.angle);
							var cs = Math.cos(this.angle);

							Vector.translate(u.sidePressureVector, cs*px - sn*py, sn*px + cs*py);
						}
					}*/
					
					if(this.owner.team == u.owner.team && u.moving == true){
						if(this.pressurePriority < u.pressurePriority){
							pressure_force *= 0.25;
						}
					}
					u.pressure_absolute += pressure_force;
					this.pressure_absolute += pressure_force;
					
					//radial pushing
					var pressure_radial = pressure_force * u.pressureStrength_radial * pressureClassDifference;
					Vector.translate_3d(this.pressureVector, pressure_radial  * distVectorX/distance, pressure_radial  * distVectorY/distance,
					pressure_radial  * distVectorZ/distance * this.pressure_stacking_factor * climbFactor);
				}
			}
		}
	}
}

Unit.prototype.getAvoid = function(){
	var tilesRadius = this.collision_tiles_radius;
	var nx = this.atNode.nodex; var ny = this.atNode.nodey;
	var angleClass = (Math.round((this.angle - 0.1963)/ 0.785) + 16)%8;
	switch(angleClass){
		//offset search radius towards move direction
		case 0:ny++; break; //N
		case 1:ny++;nx++;break;
		case 2:nx++;break; //E
		case 3:nx++;ny--;break;
		case 4:ny--;break; //S
		case 5:ny--;nx--;break;
		case 6:nx--;break; //W
		case 7:ny++;nx--;break;
		default:break;
	}
	
	//large units also avoid units in the same class
	var myPriority = this.pressure_priority_class < 2 ? this.pressure_priority_class : this.pressure_priority_class-1;
	for(var i=-tilesRadius; i<=tilesRadius; ++i){ //iterate through nearby nodes
		if(ny+i < 0 || ny + i >= pf.mapH){continue};
		for(var j=-tilesRadius;j<=tilesRadius;++j){
			if(nx+j < 0 || nx + j >= pf.mapW){continue};
			if(this.movementx*j < 0 && this.movementy*i < 0){continue;}//ignore nodes behind move direction
			
			var nod = pf.map[ny+i][nx+j];
			for(var u = nod.firstColl; u ; u=u.nextColl){ //iterate through units in node
				if(u.alive == false || u == this){continue;} //ignore if dead or self
				if(u.pressure_priority_class > myPriority ){
					var dotp_move = u.movementx*this.movementx + u.movementy*this.movementy; //DOT product of move vectors
					//dotp is speed1*speed2*cos(angleDiff), so in this case anglediff is acos(0.5) = 60 degrees
					if(dotp_move > (this.currentSpeed*u.currentSpeed*0.5) ){continue;} //ignore if moving in same direction
					
					var distance = Unit_Distance_3d(this,u);
					var distVectorX = (this.x - u.x);
					var distVectorY = (this.y - u.y);
					
					var dotp_avoid = - this.movementx * distVectorX - this.movementy *distVectorY; //DOT product
					if(dotp_avoid > 0){ //unit is not behind us
						var crossp_avoid = this.movementx * distVectorY - this.movementy * distVectorX; //CROSS product
						if(crossp_avoid >= 0){//Left side
							this.avoidLeft+= 0.3 + 1/(0.1+distance);
						}else{//Right side
							this.avoidRight+= 0.3 + 1/(0.1+distance);
						}
					}
				}
			}
		}
	}
}

//mostly used for large units, such as tanks
Unit.prototype.getGridPressure = function(){
	var gridPressX = 0; var gridPressY = 0;
	var tilesRadius = this.collision_tiles_radius;
	var nx = this.atNode.nodex; var ny = this.atNode.nodey;
	
	for(var i=-tilesRadius; i<=tilesRadius; ++i){
		if(ny+i < 0 || ny + i >= pf.mapH){continue};
		for(var j=-tilesRadius;j<=tilesRadius;++j){
			if(nx+j < 0 || nx + j >= pf.mapW){continue};
			
			var nod = pf.map[ny+i][nx+j];
			for(var u = nod.firstColl; u ; u=u.nextColl){
				if(u == this || u.alive == false || u.moving == false){continue;}
				gridPressX -= Math.sign(j) * u.gridPressure;
				gridPressY -= Math.sign(i) * u.gridPressure;
			}
		}
	}
	Vector.translate(this.gridPressureVector, gridPressX*this.gridPressure, gridPressY*this.gridPressure);
}

Unit.prototype.getAtNode = function(){
	return pf.getNodeAt_Robust(this.x, this.y);
}
Unit.prototype.initAtNode = function(){
	this.atNode = this.getAtNode();
	if(this.proto.isItem != true){
		if(this.alive){
			Node.getCluster(this.atNode).addLiveUnit(this);
		}
		if(this.isStructure){
			Node.addTail(this.atNode, this);
		}else{
			Node.addUnit(this.atNode, this);
		}
	}
}

//if this returns false, it means that there are definitely no units of a given prefilter in the neighboring clusters
//Used BEFORE detailed search
Unit.GetNearestUnit_PreFilter = function(range, filter, can_be_ranged){
	var nx = this.atNode.nodex;
	var ny = this.atNode.nodey;
	var filterFunction = filter.filterFunction;
	var playerId = this.owner.id;
	var targets_are_nearby = false;
	if(range >= 3){
		var csize = Pathfinder.cluster_size;
		var foundNum = 0;
		var pre_search_cluster_radius = Math.ceil(range/csize);
		for(var i=-pre_search_cluster_radius; i<=pre_search_cluster_radius; ++i){
			for(var j=-pre_search_cluster_radius;j<=pre_search_cluster_radius;++j){
				if(nx + j*csize >=0 && nx+j*csize < pf.mapW && ny + i*csize >=0 && ny+i*csize < pf.mapH){
					var clust = pf.map_cluster[ ((ny+i*csize)/csize >>0)][((nx+j*csize)/csize >>0)];
					foundNum += clust.filterArrays[ filter.preFilter ][playerId];
					if(foundNum > filter.preFilter_treshold){
						targets_are_nearby = true;
						break;
					}
				}else{
					continue;
				}
			}
		}
		if(targets_are_nearby == false){
			return false
		}
	}
	return true;
}

Unit.GetNearestUnit_NoObstacle = function(range, filter){
	var nx = this.atNode.nodex;
	var ny = this.atNode.nodey;
	var filterFunction = filter.filterFunction;
	var playerId = this.owner.id;
	var offX = 0;
	var offY = 0;
	var off_dx = 0;
	var off_dy = -1;
	var searchId = Pathfinder.currentDijkstraSearchId;
	var standingRange = filter.use_standing_range?this.attackRange:9999;
	
	for(var i=4*range*range; i>=0;--i){
		if(nx + offX >0 && nx+offX < pf.mapW && ny + offY >0 && ny+offY < pf.mapH){
			var nod = pf.map[ny+offY][nx+offX];
			if(nod.lastDijkstraSearchId != searchId//if false, we have already looked at this node in the dijkstra search
			&& Node.getVisibility(nod, this.owner.visGroup) == 2){
				for(var u=nod.firstColl;u;u=u.nextColl){
					if(filterFunction(this,u) == true){
						var dist = Math.sqrt(offX*offX+offY*offY);//because of spiral traversal, all later units will be further
						if(dist < standingRange){ //unit can be reached without moving
							return u;
						}else{ //we are not be able to attack instantly, but we check if we could get in range easily
							if(filter.look_for_pos_behind_wall){
								var rangedPoint = Utils.point_between_points_at_max_distance_xxyy
								(nx+offX+0.5,nx+0.5, ny+offY+0.5,ny+0.5, this.attackRange-1);
								if(Pathfinder.InLOS(Pathfinder.getNodeAt(rangedPoint.x, rangedPoint.y) , this.atNode, this.blockerCollisionTreshold) == false){
									break; //this point can't get in range witout actual pathfinding, so stop checking this node
								}else{
									return u;//we can simply get into range of this node
								}
							}
						}}}}}
		//SPIRAL TRAVERSAL
		if (offX == offY || (offX < 0 && offX == -offY) || (offX > 0 && offX == 1-offY)){
			var temp = off_dx;
			off_dx = -off_dy;
			off_dy = temp;
		}
		offX += off_dx;
		offY += off_dy;
	}
	return null;
}

Unit.GetNearestUnitWithFilter = function(range, filter, can_be_ranged){
	//var minDist = 99999;
	var minDistUnit = null;
	var nx = this.atNode.nodex;
	var ny = this.atNode.nodey;
	var playerId = this.owner.id;
	
	if(filter.preFilter >= 0){
		if(this.GetNearestUnit_PreFilter(range, filter, can_be_ranged) == false){
			return null;
		}
	}
	
	minDistUnit = Pathfinder.Dijkstra_Unit_Search(this.atNode, range, filter, this, this.blockerCollisionTreshold);
	
	if(can_be_ranged == false || this.rangedTargeting == false || minDistUnit != null){
		return minDistUnit;
	}
	
	return this.GetNearestUnit_NoObstacle(range * 0.7, filter, can_be_ranged);
}

Unit.Attack_Instant = function(target){
	target.Hurt(this.attackDamage, this);
	this.proto.attackSound_melee.playAt(this.x,this.y);
}

Unit.Attack_Evil = function(target){
	var d = Unit_Distance(this, target);
	var lookangle = target.angle;
	if(target == Gamestats.Hero){
		lookangle = cam.yaw;
	}
	var dot = Math.sin(lookangle)*(this.x-target.x) + Math.cos(lookangle)*(this.y-target.y);
	var angleToMe = Math.acos(dot/d);
	if(angleToMe < 0.75 && this.can_see_unit(target)){
		if(target==Gamestats.Hero){
			var screenPos = worldPointToGUI(this.x, this.y, this.z+this.collZ)
			if(Math.abs(screenPos[0]-0.4)<0.47 && Math.abs(screenPos[1]-0.5)<0.45){
				target.last_evil_seen = this;
				if(this.proto.attackSound){
					this.proto.attackSound.playAt(this.x , this.y );
				}
				this.actor.startAnimation(Anim.spell);
			}
		}else{
			target.last_evil_seen = this;
		}
	}
}

Unit.Attack_Shock = function(target){
	target.Hurt(this.attackDamage, this);

		this.proto.attackSound_melee.playAt(this.x,this.y);
		ParticleActor.SpawnShock(this.x,this.y,this.z+this.projectileLaunchZ,this.actor.rotZ);
		ParticleActor.SpawnSparks(target.x,target.y,target.z+0.7,-this.actor.rotZ+1.57);
	
}

Unit.Attack_Laser = function(target){
	target.Hurt(this.attackDamage, this);

		if(this.proto.attackSound){
			this.proto.attackSound.playAt(this.x,this.y);
		}
		Actor.SpawnLaser(this,target,this.proto.laserAttachPoint);
		target.actor.hitRotY += Math.sin(this.angle)*target.proto.hitRotEffect*0.2;
		target.actor.hitRotX += Math.cos(this.angle)*target.proto.hitRotEffect*0.2;
	
}
Unit.Attack_Laser_Double = function(target){
	target.Hurt(this.attackDamage, this);

		if(this.proto.attackSound){
			this.proto.attackSound.playAt(this.x,this.y);
		}
		var a = Actor.SpawnLaser(this,target,this.proto.laserAttachPoint);
		a.texture = Asset.texture.marine.getTeamVariant(this.owner.laserColorId);
		a = Actor.SpawnLaser(this,target,1);
		a.texture = Asset.texture.marine.getTeamVariant(this.owner.laserColorId);
		target.actor.hitRotY += Math.sin(this.angle)*target.proto.hitRotEffect*0.2;
		target.actor.hitRotX += Math.cos(this.angle)*target.proto.hitRotEffect*0.2;
	
}

Unit.Attack_Laser_Lightning = function(target){
	target.Hurt(this.attackDamage, this);
		if(this.proto.attackSound_melee){
			this.proto.attackSound_melee.playAt(this.x,this.y);
		}
		var a = Actor.SpawnLaser(this,target,this.proto.laserAttachPoint);
		a.model = Asset.model.laser_lightning;
		a.animCollection = Anim.LaserLightningAnim;
		a.texture = Asset.texture.tank;
		a.startAnimation(Anim.stand);
		target.actor.hitRotY += Math.sin(this.angle)*target.proto.hitRotEffect*0.2;
		target.actor.hitRotX += Math.cos(this.angle)*target.proto.hitRotEffect*0.2;
		ParticleActor.SpawnSparks(target.x,target.y,target.z+0.7,-this.actor.rotZ+1.57);
	
}

Unit.Attack_Remove = function(target){
	target.Remove();
}
/*Unit.Attack_Pull = function(target, phase){
	//REPLACED WITH PROJECTILE
	target.Hurt(this.attackDamage, this);
	if(Utils.distance_xxyy(this.x, target.x, this.y, target.y) > 2){
		Vector.translate(target.windPressureVector, -Math.sin(this.angle), -Math.cos(this.angle));
	}
	SoundObject.hit_melee.playAt(this.x,this.y);
}*/

Unit.Attack_Starship = function(target){
	if(!this.isStructure){
		var targetArr = Pathfinder.Spiral_Unit_Collect(this.atNode, this.attackRange , this.EnemyFilter , this);
		if(targetArr.length > 0){
			target  = Utils.randomElem(targetArr);
		}
	}
	
	
	target.Hurt(this.attackDamage, this);

		if(this.proto.attackSound){
			this.proto.attackSound.playAt(this.x,this.y);
		}
		var a = Actor.SpawnLaser(this,target,this.proto.laserAttachPoint);
		a.texture = Asset.texture.white;
		a.model = Asset.model.laser_starship;
		a.animCollection = Anim.LaserStarshipAnim;
		a.startAnimation(Anim.stand);
		target.actor.hitRotY += Math.sin(this.angle)*target.proto.hitRotEffect*0.2;
		target.actor.hitRotX += Math.cos(this.angle)*target.proto.hitRotEffect*0.2;
		ParticleActor.SpawnStarshipSparks(target.x,target.y,target.z+0.7,-this.actor.rotZ+1.57);
	
}
	
Unit.Attack_Grab = function(target){
	var wasalive = target.alive;
	target.Hurt(this.attackDamage, this);
	SoundObject.hit_melee.playAt(this.x, this.y);
	if(target.alive != wasalive && target.canBeGrabbed == true){
		var a = Actor.AttachmentActor(this.actor, 0, null);
		a.shaderProgram = target.actor.shaderProgram.full_rot_alias;
		Actors.push(a);
		a.model = target.actor.model;
		//a.baseScale = target.actor.scale;
		a.scale = target.actor.scale;
		a.texture_default = target.actor.texture;
		a.texture = a.texture_default;
		a.animCollection = target.actor.animCollection;
		a.startAnimation(Anim.grabbed);
		a.frame = target.actor.frame;
		quat.fromPitch(a.localQuat, 6.28*RAND());
		if(target.actor.lightsource != null){
			target.actor.lightsource.attachToActor(a);
		}
		target.Remove();
		this.grabbedActor = a;
	}
}

Unit.Attack_Vile = function(target){
	target.Hurt(this.attackDamage, this);
	SoundObject.fireball.playAt(target.x,target.y);
	target.windPressureVector.z += 0.15;
	var knock = -1.5;
	target.windPressureVector.x += knock*Math.cos(1.57-this.angle);
	target.windPressureVector.y += knock*Math.sin(1.57-this.angle);
	target.currentSpeed = 0;
}

Unit.ReleaseGrabbedActor = function(throwX, throwY, throwZ, spin){
	if(this.grabbedActor == null){
		return;
	}
	var sn = Math.sin(-this.actor.rotZ);
	var cs = Math.cos(-this.actor.rotZ);
	this.grabbedActor.baseActor = null;
	this.grabbedActor.dx = throwX * cs - throwY*sn;
	this.grabbedActor.dy = throwX * sn + throwY*cs;
	this.grabbedActor.gravity = throwZ;
	this.grabbedActor.spin = spin;
	this.grabbedActor = null;
}

Unit.MakeRagdoll = function(u, angle, force){
	var a = Actor.AttachmentActor(u.actor, 0, null);
	Actors.push(a);
	a.x = u.actor.x; a.y = u.actor.y; a.z = u.actor.z + 0.5;
	a.model = u.actor.model;
	//a.baseScale = target.actor.scale;
	a.scale = u.actor.scale;
	a.texture_default = u.actor.texture;
	a.texture = a.texture_default;
	a.animCollection = u.actor.animCollection;
	a.startAnimation(Anim.grabbed); 
	a.frame = u.actor.frame;
	quat.fromPitch(a.localQuat, 6.28*RAND());
	u.Remove();
	force = (force+0.03)*0.07;
	angle += (RAND()-0.5)*0.5;
	var sn = Math.sin(angle);
	var cs = Math.cos(angle);
	a.dx = force*sn;
	a.dy = force*cs;
	a.gravity = force*(1+RAND()*2.2);
	a.spin = (RAND()+0.5)*(RAND()<0.5?0.1:-0.1);
}

Unit.Attack_Shoot = function(target){
	Projectile.Create(this.projectileSetter, this, this.attackDamage, target, null);
	if(this.proto.attackSound){
		this.proto.attackSound.playAt(this.x,this.y);
	}
}

Unit.Attack_LeftRight = function(target){
	this.projectileLaunchX *= -1;
	var targetAngle = Math.atan2(this.y-target.y, this.x-target.x) 
	var p1 = Projectile.Create(this.projectileSetter, this, this.attackDamage, target, null);
	var sn = Math.sin(-targetAngle)*this.projectileLaunchX;
	var cs = Math.cos(-targetAngle)*this.projectileLaunchX;
	p1.x+=sn;p1.y+=cs;
	
	if(this.proto.attackSound){
		this.proto.attackSound.playAt(this.x,this.y);
	}
}

Unit.Attack_Shoot_Forward = function(target){
	var dist = Unit_Distance(target, this);
	var targetVec = new Vector(this.x + Math.sin(this.angle)*dist, this.y+ Math.cos(this.angle)*dist,target.z);
	Projectile.Create(this.projectileSetter, this, this.attackDamage, null, targetVec);
	if(this.proto.attackSound){
		this.proto.attackSound.playAt(this.x,this.y);
	}
}

Unit.Attack_Fan = function(target){
	if(this.inner_counter < 7 || this.inner_counter > 23){return;}
	var targetVector  = new Vector(0,0,target.z);
	var targetAngle = Math.atan2(this.y-target.y, this.x-target.x) 
	+ (this.inner_counter/30 - 0.5)*1.35;
	var dist = Unit_Distance(this, target);
	targetVector.x = this.x-Math.cos(targetAngle)*dist;
	targetVector.y = this.y-Math.sin(targetAngle)*dist;
	Projectile.Create(this.projectileSetter, this, this.attackDamage, null, targetVector);
	if(this.proto.attackSound){
		this.proto.attackSound.playAt(this.x,this.y);
	}
}

Unit.Attack_Scatter = function(target){
	Projectile.Create(this.projectileSetter, this, this.attackDamage, target, null, false);
	for(var i=0;i<6;++i){
		Projectile.Create(this.projectileSetter, this, this.attackDamage, target, null, true);
	}
	if(this.proto.attackSound){
		this.proto.attackSound.playAt(this.x,this.y);
	}
}

Unit.Attack_Double = function(target){
	var targetAngle = Math.atan2(this.y-target.y, this.x-target.x);
	var p1 = Projectile.Create(this.projectileSetter, this, this.attackDamage/2, target,null);
	var p2 = Projectile.Create(this.projectileSetter, this, this.attackDamage/2, target,null);
	var sn = Math.sin(-targetAngle)*this.projectileLaunchX;
	var cs = Math.cos(-targetAngle)*this.projectileLaunchX;
	p1.x+=sn;p1.y+=cs;
	p2.x-=sn;p2.y-=cs;
	
	if(this.proto == UnitPrototype.Behemoth){
		if(this.task.burst_progress == 1 ){
			p1.rotateDeltas(-0.3);
		}else{
			p2.rotateDeltas(0.3);
		}
	}
	
	if(this.proto.attackSound ){
		this.proto.attackSound.playAt(this.x,this.y);
	}
}

Unit.Attack_Line = function(target){
	var tp = new Vector(target.x, target.y, target.z);
	var tdist = Unit_Distance(this, target) + 0.01;
	var tdx = (tp.x-this.x)/tdist;
	var tdy = (tp.y-this.y)/tdist;
	tp.x -= tdx*0.3;
	tp.y -= tdy*0.3;
	for(var i=0;i<3;++i){
		var isSecondary = i != 0; //let the first projectile be the non-multishot one
		Projectile.Create(this.projectileSetter, this, this.attackDamage, null, tp, isSecondary);
		
		tp.x += tdx*1.5;
		tp.y += tdy*1.5;
	}
	if(this.proto.attackSound ){
		this.proto.attackSound.playAt(this.x,this.y);
	}
}

Unit.Attack_Heal = function(target){
	target.hp = Math.min(target.hp_max, target.hp+this.attackDamage*2);
}

Unit.Attack_Jump = function(target){
	//if(Unit_Distance(target, this) > 1){
	this.jumpTo(new Vector(target.x, target.y, target.z+0.5));
	//}else{
	//	target.Hurt(this.attackDamage, this);
	//	this.proto.attackSound_melee.playAt(this.x,this.y);
	//}
}

Unit.Attack_Charge = function(target){
	var time = 6*Unit_Distance(this,target)+20;
	this.addSubTask(new JumpTask(this, new Vector(target.x,target.y,target.z), target, time, false));
}

Unit.Attack_Ability = function(caster, target, ab){
	Projectile.Create(ab.projectileSetter, caster, ab.damage, target, null);
	if(ab.castSound){
		ab.castSound.playAt(caster.x, caster.y);
	}
}


Unit.Hurt = function(dmg, source, damagetype ){
	if(damagetype == Damagetype.HAZMAT){
		if(this.hazmat > 0){
			var hazmatAbsorb = Math.floor( Math.min(this.hazmat, dmg) );
			dmg = Math.max(0, dmg - hazmatAbsorb);
			this.hazmat -= hazmatAbsorb;
			SoundObject.push.playAt(this.x,this.y,1.8);
		}
	} 
	
	dmg = Math.ceil(Math.max(Math.min(1,dmg),dmg-this.armor));
	/*if(dmg > this.absorption){
		//Actor.SpawnAbsorbAura(this.actor);
		SoundObject.push.playAt(this.x,this.y,1.8);
		dmg = this.absorption;
	}*/
	if(this.shield > 0){
		var damageReduction = Math.floor( Math.min(dmg/2, this.shield) );
		this.shield -= damageReduction;
		dmg -= damageReduction;
	}
	this.hp = Math.max(0, this.hp - dmg);
	//xp amount is calculated from both the value of attacker and target
 
	this.last_hurter = source;
	if(this.hp <= 0 && this.alive){
		if(this.owner != source.owner){
			source.owner.unitKilled(this);
			//extra xp for killing unit
		}
		this.Die();
		Unit.throwLoot(this, source);
	}else{
		if(this.EnemyFilter.filterFunction(this, source) && this.attackAbility){
			if(this.guarding && !this.task.targetUnit){
				this.guardTask.injectTarget(source);
			}else if(this.task.targetUnit 
				&& Unit_Distance_3d(this.task.targetUnit,this) > Unit_Distance_3d(source,this)
				&&!this.task.hasExplicitTarget){
				this.task.targetUnit = source;
			}
		}else if(this.task.id == Task.id_IdleTask && this.movementAbility){
			this.Flee(source.x, source.y);
		}
		if(this.painChance > RAND() && this.born && this.task.id != Task.id_JumpTask){
			Unit.Stun(this, 8);
		}
	}
	
	if(this.HurtEffect != null){
		this.HurtEffect(this, source, dmg);
	}
	if(this == Gamestats.Hero){
		GUI.HurtPanel.opacity = Math.min(GUI.HurtPanel.opacity + Math.sqrt(Math.max(0,dmg+4))*0.05, 1);
		if(dmg > 0){
			this.proto.hurtSound.play(0,0);
		}
	}
}

Unit.Hurt_item = function(dmg, source){
	this.hp = Math.max(0, this.hp - dmg);
	if(this.hp <= 0){
		if(source == null){
			this.deathSound = null;
		}
		this.Die();
	}
}

Unit.Hurt_Resource = function(dmg, source){
	var ab = Unit.getAbilityInstance(source, Ability.Gather);
	if(ab){
		dmg = ab.proto.resourcePerHit;
		this.hp = Math.max(0, this.hp - dmg);
		source.xp += dmg/50;
		if(this.hp <= 0 && this.alive){
			this.Die();
		}else{
			
		}
	}
}

Unit.Hurt_Cover = function(dmg, source){
	var u = Utils.randomElem(this.garrisonArray);
	if(u){
		u.Hurt(dmg * 0.5,source);
	}
}

Unit.throwLoot = function(u, killer){
	if(u.proto.loot){
		var item = Unit.Create(u.x, u.y, Players[0], u.proto.loot, 0);
		item.z = u.z;
		item.actor.z = u.actor.z;
		item.dz = 0.1;
	}
}

Unit.prototype.fall_from_ceiling = function(){
	this.on_ceiling = false;
	this.actor.model = Asset.model.sprite;
	this.z -= 0.6;
	this.collZ = this.proto.collZ;
	this.eyeZ = this.proto.eyeZ;
	this.projectileLaunchZ = this.proto.projectileLaunchZ;
}

Unit.prototype.can_see_unit = function( t ){
	//var d = Unit_Distance(this, t);
	var zdiff = this.z+ this.eyeZ - t.z - t.collZ;
	var d = Math.sqrt( (this.x-t.x)*(this.x-t.x)+(this.y-t.y)*(this.y-t.y) + zdiff*zdiff);
	NavNode.rayCast_all([this.x, this.y, this.z + this.eyeZ] ,[t.x, t.y, t.z + t.collZ]);
	return NavNode.last_raycast_dist > d ;
}

Unit.prototype.turn_gradual = function(newangle, factor){
	var da = (newangle-this.angle + 3.1415*5) %6.283 -3.1415 
	/*if(Math.abs(da)>0.15 && !this.proto.walk_while_turn){
		this.currentSpeed = 0;
	}*/
	da = Math.min(Math.abs(da), factor)*Math.sign(da);
	this.angle = this.angle + da;
}

Unit.prototype.get_target_raycast = function(){
	var target = null;
	var t = null;
	if(this.owner.team == Gamestats.Hero.owner.team){ //allies can attack random enemies
		for(var i=0;i<5;++i){ //check a couple of random units if they are valid target
			var randUnit = Utils.randomElem(Units);
			if(randUnit.alive && randUnit.owner.team != this.owner.team && randUnit.targetPriority > 1 && !randUnit.proto.isItem){
				t = randUnit;
			}
			if(!t){ return; } //didn't find any target candidates
		}
	}else{ 
		t = Gamestats.Hero;
		if(!t.alive){return;}
		if(this.last_floor_triangle){ //Sound alert. Only enemies can hear
			if(!this.deaf && this.last_floor_triangle.SoundCheck()){
				return t;
			}
		}
	}

	var d = Unit_Distance(this, t);
	var angleToHero;
	if(this.deaf || this.owner.team == Gamestats.Hero.owner.team){
		angleToHero = 999;
	}else{
		var dot = Math.sin(this.angle)*(this.x-t.x) + Math.cos(this.angle)*(this.y-t.y);
		angleToHero = Math.acos(dot/d);
	}
	
	var canReact = (angleToHero > 2.6 - RAND()) //field of vision check, probability increases closer to FOV center
	&& RAND() > d/100; //at 100 units the chance of detection is 0%, at 0 distance it's 100%
	if(canReact && this.can_see_unit( t )){
		target = t;
	}
		
	return target;
}

Unit.hero_angle_diff = function(u){
	if(u == Gamestats.Hero){return 0;}
	var ang = Utils.angle_between_points(u,Gamestats.Hero);
	ang -= cam.yaw;
	return -1*((ang+3.1415)%6.283 - 3.1415);
}

//ZYKLON
Unit.prototype.ProjectileObstacleAlert = function(projectile){
	if(this.alive == false){
		return;
	}
	if(this.fighting == true && this.task.target == projectile.targetUnit){
		if(RAND() < 0.5){
			this.guardTask.setChasePause(5+RAND()*10);
			this.task.Interrupt(1);
		}
	}
}

Unit.prototype.Heal = function(heal, source){
	this.hp = Math.min(this.hp_max,this.hp+heal);
}
Unit.prototype.Repair = function(heal, source){
	if(this.actor.visible){
		if(this.hp < this.hp_max){
			GUI.AddRisingText(this.x, this.y, this.z, GUI.msg_repair, GUI.textColor_repair);
		}
		var a = Actor.SpawnLaser(this,source,-1);
		a.model = Asset.model.laser_repair;
		a.texture = Asset.texture.laser_repair;
	}
	this.Heal(heal, source);	
}

Unit.prototype.Stop = function(){
	if(this.guardTask.custom_constructor!=null){
		//reset guardTask
		this.guardTask = this.proto.GuardTask(this);
	}
	
	this.setBaseTask( new IdleTask(this));
	this.moving = false;
	this.fighting = false;
	this.fleeSpeedBonus = 0;
	this.atOrderedNode = true;
	
	if(this.formation != null){
		this.angle = this.preferred_facing;
	}
	
	this.preferred_pos.x = this.x;
	this.preferred_pos.y = this.y;
	this.chaseStartPos.x = this.x;
	this.chaseStartPos.y = this.y;
}

Unit.prototype.Wait = function(time){
	if(this.moving){
		this.addSubTask(new IdleTask(this));
		this.movement_time = 0;
		this.task.timeLeft = time;
	}
}

Unit.prototype.Flee = function(xx,yy){
	if(!this.born || this.task.id == Task.id_JumpTask){return;}
	var fleeAngle = Math.atan2(yy-this.y, xx-this.x) + 3.1415 + RAND()-0.5;
	var fleeDistance = 5;
	if(this.Attack == Unit.Attack_Jump){
		fleeDistance *= 0.6;
	}
	var fleePos = new Point(this.x + fleeDistance*Math.cos(fleeAngle), this.y + fleeDistance*Math.sin(fleeAngle))
	/*if(this.Attack == Unit.Attack_Jump && RAND() > 0.5){
		this.jumpTo( new Vector(fleePos.x, fleePos.y, this.z));
	}else{*/
		this.addSubTask( Task.FleeTask( this, fleePos));
	//}
}

Unit.prototype.returnResources = function(){
	var resourcePoint = this.owner.getClosestResourcePoint(this);
	var ab = Unit.getAbilityInstance(this , Ability.GatherReturn);
	if(resourcePoint){
		this.setBaseTask(Task.ChaseTask_SingleTarget(this, resourcePoint, ab));
	}else{
		this.Stop();
	}
}

Unit.prototype.returnToGather = function(){
	var ab = Unit.getAbilityInstance(this , Ability.Gather);
	if(ab.lastTarget && ab.lastTarget.alive){
		var t= ab.lastTarget;
		this.setBaseTask(Task.ChaseTask(this, t , ab));
	}else{
		var t = Unit.getClosestResource(this, 15);
		if(t){
			this.setBaseTask(Task.ChaseTask(this, t, ab));
			if(!this.born){
				this.addSubTask(new StunTask(this, 0));
			}
		}else{
			if(this.owner.ai){
				t = this.owner.getRandomResourcePoint();
				if(t){
					this.setBaseTask(Task.ChaseTask(this, t, Unit.getAbilityInstance(this , Ability.GatherReturn)));
				}else{
					this.Stop();
				}
			}else{
				this.Stop();
			}
		}
	}
}

Unit.removeCarriedResource = function(u){
	u.resourceCarried = 0;
	if(u.actor.minerals){
		u.actor.minerals.remove();
		u.actor.minerals = null;
	}
}

Unit.getClosestResource = function(u, radius){
	return u.GetNearestUnitWithFilter(radius, SearchFilter.isResource, 0);
}

Unit.Stun = function(u, duration){
		if(this.Attack == Unit.Attack_Charge && this.task.id == Task.id_JumpTask){
			return;
		}
		if(u.task.id == Task.id_StunTask){
			//only keep the longest stun
			if(duration > u.task.timeLeft){
				u.task.Interrupt(0);
			}else{
				return;
			}			
		}
		
		u.addSubTask( new StunTask(u, duration));
		if(u.born){
			if(u.proto.hurtSound){
				u.proto.hurtSound.playAt(u.x,u.y);
			}
			u.actor.startAnimation(Anim.pain);
		}
}

Unit.Wander = function(u){
		
	if(u.editorPlace){
		var refpoint = u.editorPlace;
	}else{
		var refpoint = new Point(u.x, u.y);
	}
	var wanderAngle = RAND()*6.28;
	var wanderX =Math.cos(wanderAngle) * (RAND()*2+1+u.wanderRadius/5);
	var wanderY =Math.sin(wanderAngle) * (RAND()*2+1+u.wanderRadius/5);
	var wanderPoint = new Point(u.preferred_pos.x+ wanderX,u.preferred_pos.y+ wanderY);
	var dist = Point.distance(wanderPoint, refpoint);
	if(dist > u.wanderRadius){
		wanderPoint.x -= wanderX*2; wanderPoint.y -= wanderY*2; //out of bounds, let's go the opposite way
		dist = Point.distance(wanderPoint, refpoint);
	}
	if(dist <= u.wanderRadius){
		if(Pathfinder.pointInBounds(wanderPoint)==true){
			var df =  pf.getDistanceFieldAt(wanderPoint.x, wanderPoint.y);
			wanderPoint.x += df[1]*2; wanderPoint.y += df[2]*2;
			var moveTask = Task.Alone_Move_Task( u, wanderPoint , u.attackAbility);
			u.addSubTask( moveTask );
		}
	}
		
}

Unit.Walk = function(u,x,y){
	var p = new Point(x,y);
	if(u.movementAbility){
		u.movementAbility.target = p;
		if(u.hasTurret){//can also attack while moving
			u.setBaseTask(Task.Alone_Move_Task( u, p , u.movementAbility, false));
		}else{
			u.setBaseTask(Task.Alone_Move_Task( u, p , u.attackAbility, true));
		}
	}
}

Unit.Die = function(){
	if(this.alive == true){
		this.Die_Remove_Common();
		this.hp = 0;
		/*if(this.proto.hasBlood == true && Math.random()< this.proto.bloodType.decalChance){
			if(this.actor.visible){//TODO find a better way to cull blood decal generation
				DecalActor.SpawnBlood(this.x, this.y, this.proto.bloodType);
			}
		}*/
		//this.hardRadius *= 0.5;
		//this.collZ = this.hardRadius+0.1; //move collider to almost touch the ground
		//this.collZ = 0.05;
		//this.hardRadius = 0.03;
		
		
		if(this != Gamestats.Hero && this.on_the_ground ){
			//check if unit stands in front of a ledge
			var dist = Unit_Distance(this, Gamestats.Hero) + 0.05;
			var dirSign = Math.sign(RAND()-0.5); //50% chance to check for front or back ledge
			var dirX = (this.x-Gamestats.Hero.x)/dist *0.5*dirSign;
			var dirY = (this.y-Gamestats.Hero.y)/dist *0.5*dirSign;
			var frontFloorZ = NavNode.get_floor_z(this.x-dirX, this.y-dirY, this.z);
			if(frontFloorZ != 0 && frontFloorZ < this.z-0.1){ //if so, let's make it fall down the ledge	
				this.windPressureVector.x -= dirX*0.3;
				this.windPressureVector.y -= dirY*0.3;
			}
		}
		if(this.on_ceiling){ //flip back corpse
			this.fall_from_ceiling();
		}
		
		if(this.container && this.container.proto.isGarrison){
			var u = Unit.ungarrison_dead(this.container, this);
		}
		if(this.actor.lightsource != null){
			this.actor.lightsource.detachFromActor();
		}
		if(this.actor.ao_lightsource != null){
			this.actor.ao_lightsource.detachFromActor();
		}
		this.actor.texture = this.actor.texture_default;
		this.preferred_facing = this.angle;
		if(this.proto.deathSFX != null){
			this.proto.deathSFX(this.x, this.y, this.z, this.actor.rotZ);
		}
		
		this.actor.startAnimation(Anim.death);
		if(this.proto.deathModel != null){
			this.actor.model = this.actor.shadowModel = this.proto.deathModel;
			this.actor.shadowShader = ShaderProgram.shadow_animatedShader;
			this.actor.frame = this.actor.animCollection[Anim.death].frames[0];
			//this.actor.frame = this.actor.nextFrame;
		}
 
		if(this.hasTurret){
			this.actor.turret.startAnimation(Anim.death);
		}
		if(this.deathSound != null){
			this.deathSound.playAt(this.x, this.y , this.proto.soundPitchFactor);
		}
		if(this.tagId >= 0){
			Trigger.taggedUnitDeath(this);
		}
		if(this.DeathEffect != null){
			this.DeathEffect(this, this.last_hurter);
		}
	}
}

Unit.prototype.Die_Remove_Common = function(){
	if(this.proto.isItem!=true){
		Node.getCluster(this.atNode).removeLiveUnit(this);
	}
	Minimap.removeUnit(this);
	
	this.alive = false;
	this.actor.preselected = false;
	this.Stop();
	this.moving = false;
	this.fighting = false;
	this.clearAllTasks();
	this.setBaseTask(new DeadTask(this));
	
	if(this.crewedUnit != null){
		this.crewedUnit.Die();
	}
	if(this.isStructure == true){
		Unit.removeStructure(this);
		this.owner.deleteStructure(this);
		if(this.actor.revealed){
			this.actor.update_ao();
		}
	}
	if(this.trainingQueue){
		Unit.cancelAllTraining(this);
	}
	if(this.proto.isResourcePoint){
		this.owner.deleteResourcePoint(this);
	}
	if(this.proto.isWorker){
		this.owner.deleteWorker(this);
	}
	this.owner.loseUnit(this);
	if(this.born){
		this.owner.loseUnit_born(this);
	}
	Control.RemoveUnitFromSelection(this);
	this.ReleaseGrabbedActor(0,0,0,0);
	this.garrisonArray = null;
	
}

Unit.prototype.Remove = function(){
	if(this.alive == true){
		this.Die_Remove_Common();
	}
	if(this.proto.isItem!=true){
		Node.removeUnit(this.atNode, this);
	}
	if(!this.isStructure && this.actor){
		this.actor.remove();
	}
	this.actor = null;
	Units.splice(Units.indexOf(this), 1);
}

Unit.world_move_update = function(offX, offY){
	if(this.isStructure == true){
		console.log("unhandled structure transition");
	}
	this.x -= offX;
	this.y -= offY;
	if(this.x < 0 || this.x >= M.width || this.y < 0 || this.y >= M.height){
		this.Remove();
	}

	this.chaseStartPos.x -= offX;
	this.chaseStartPos.y -= offY;
	this.preferred_pos.x -= offX;
	this.preferred_pos.y -= offY;
	
	for(var i=0;i<this.taskStack.length;++i){
		if(this.taskStack[i].world_move_update != undefined){
			this.taskStack[i].world_move_update(offX, offY);
		}
	}
	if(this.task.world_move_update != undefined){
		this.task.world_move_update(offX, offY);
	}
}	

Unit.setTag = function(tag){
	if(tag === void 0){
		tag = TriggerTag.getFirstUnused();
	}
	if(this.tagId >= 0){
		Trigger.Tags[this.tagId].clear();
	}
	this.tagId = tag;
	Trigger.Tags[tag].setActor(this.actor);
}

//birthTime is decayTime if alive is false
Unit.Create = function(_x, _y, _owner, _type, _angle, _isTrained, _alive, _birthTime, _loadedGame, _replaceUnit){
	if(_birthTime === void 0){
		_birthTime = -1;
	}
	if(_alive === void 0){
		_alive = true;
	}
	if(_loadedGame === void 0){
		_loadedGame = false;
	}
	
	var u = new Unit( _type, _owner );
	u.x = _x;
	u.y = _y;
	u.z = M.terrain.getHeightAt(_x,_y);
	Net.createUnit(u);
	if(_alive){
		if(u.isStructure == true){
			if (Unit.placeStructure(u) == false){
				Unit.removeStructure(u);
				return null;
			}
			if(u.proto.craterSize > 0 && ! _replaceUnit){
				Actors.push(Actor.StructureCrater(u));
			}
			u.owner.addStructure(u);
		}
		u.initAtNode();
		if(u.proto.isResourcePoint == true){
			u.owner.addResourcePoint(u);
		}
		if(u.proto.isWorker == true){
			u.owner.addWorker(u);
		}
		u.owner.gainUnit(u);
	}
	
	Units.push(u);
	Actors.push(u.actor);
	if(_alive){
		if(u.actor.turret != undefined){
			Actors.push(u.actor.turret);
		}
		if(u.actor.riderActor != undefined){
			Actors.push(u.actor.riderActor);
		}
		if(u.proto.isResource&&u.isStructure){
			u.actor.update_ao();
			u.actor.revealed = true;
		}
		//apply all upgrades to freshly created unit
		for(var i=0;i<u.proto.Upgrades.length;++i){
			var upgrade = u.proto.Upgrades[i];
			if(u.owner.hasUpgrade(upgrade) && upgrade.unitEffect){
				upgrade.unitEffect(u);
			}
		}
	}
	
	u.actor.moveTo(u.x,u.y,u.z);
	Unit.setCustomTexture(u);
	if(_type.actorTint){
		u.actor.tint = _type.actorTint;
	}
	if(u.proto.attachment_actor_function){
		u.proto.attachment_actor_function(u.actor);
	}
	
	if(u.actor.isWallActor == true){
		u.actor.setWallAngles();
	}else{
		if(u.isStructure == true){
			u.angle = _angle || u.proto.structure_rotation;
			if(u.proto.structure_random_rotation_90){
				u.angle = 1.57 * Math.floor(RAND()*4);
			}
			u.angle += u.proto.structure_random_rotation*(RAND()-0.5);
		}else{
			u.angle = _angle || RAND()*6.28;
		}
	}
	u.preferred_facing = u.angle;
	u.actor.rotZ = u.angle + 3.1415;
	u.actor.rotZ_last = u.actor.rotZ;

	u.guardTask = u.proto.GuardTask(u);
	if(_alive){
		if(u.proto.aoSize > 0 && !u.isStructure){
			LightDecal.Create_Unit_AO(u);
		}
		if(u.proto.lightTexture != null){
			LightDecal.Create(4, 0.6 , 0.15).addToActor(u.actor);
			u.actor.lightsource.texture = u.proto.lightTexture;
			u.actor.lightsource.offsetY = u.proto.lightOffsetY;
		}
		
		if(_type.birthTime > 0 && _birthTime < _type.birthTime 
		|| _isTrained == true && _birthTime < _type.trainingTime ){
			if(_isTrained){
				if(u.isStructure){
					u.birthTime = _type.trainingTime;
					Actors.push(Actor.Construction(u));
				}
			}
			if(_isTrained == true && u.actor.animCollection[Anim.birth_training]){
				u.actor.frame = u.actor.animCollection[Anim.birth_training].frames[0];
				u.actor.startAnimation(Anim.birth_training);
			}else{
				u.actor.frame = u.actor.animCollection[Anim.birth].frames[0];
				u.actor.startAnimation(Anim.birth);
			}
			if(u.actor.animSequence.posKeys != null){
				u.actor.update_posKeys();
				u.actor.x = u.actor.x_last;
				u.actor.y = u.actor.y_last;
				u.actor.z = u.actor.z_last;
			}
			if(_type.birthModel){
				u.actor.model = _type.birthModel;
			}
			u.born = false;
			if(_type.isItem != true){
				u.loop_first = Unit.loop_first_birth;
				//u.actor.shadowZOffset = -1; //this should only affect the first frame
			}
			if(_birthTime > 0){
				u.birthCounter = _birthTime; 
			}
		}else{
			//unit is created born
			u.birthCounter = 999;
			u.born = true;
			u.actor.startAnimation(Anim.stand);
			u.owner.gainUnit_born(u);
		}
		
		if(u.proto.isGarrison == true){
			u.garrisonArray = [];
			if(u.proto.garrisonUnitType && !_loadedGame){
				for(var i=0;i<u.proto.garrisonPlacement.length;++i){
					var gu = Unit.Create(u.x , u.y , u.owner, u.proto.garrisonUnitType );
					Unit.linkGarrison(u, gu);
				}
			}
		}
		if(u.proto.crewType != null ){
			u.crew = [];
			if(!_loadedGame){
				var offX = Math.cos(-u.angle)*1.3; var offY = Math.sin(-u.angle)*1.3;
				var cu = Unit.Create(u.x+offY, u.y-offX, u.owner, u.proto.crewType); 
				Unit.linkCrew(u,cu);
				cu.hp = cu.hp_max;
			}
		}
		u.setBaseTask(new IdleTask(u));
		u.preferred_facing = u.angle;
		u.preferred_pos.x = u.x;
		u.preferred_pos.y = u.y;
		u.chaseStartPos.x = u.x;
		u.chaseStartPos.y = u.y;
		
		/*if(u.x >=0&&u.y>=0){
			Minimap.addUnit(u.x, u.y, u);
		}*/
		
		if(_type.followPartyFunction != null){
			_type.followPartyFunction(u);
		}
	}else{
		u.alive = false;
		u.moving = false;
		u.guarding = false;
		u.clearAllTasks();
		u.setBaseTask(new DeadTask(u));
		u.initAtNode();
		u.decayCounter = _birthTime;
		u.actor.startAnimation(Anim.death);
		Actor.goToAnimTime(u.actor, 5);
		u.actor.frame = Utils.lastElem(u.actor.animCollection[Anim.death].frames);
		u.actor.nextFrame = u.actor.frame;
		if(u.proto.deathModel){
			u.actor.model = u.proto.deathModel;
		}
	}
	return u;
}


Unit.linkCrew = function(u , crewUnit){
	crewUnit.guardTask.setChasePause(9999999);
	crewUnit.crewedUnit = u; 
	crewUnit.hp_max = u.hp_max;
	crewUnit.followUnit = u;
	u.crew.push(crewUnit);	
}
Unit.linkGarrison = function(u, containedUnit){
	var params = u.proto.garrisonPlacement[u.garrisonArray.length];
	
	containedUnit.container = u; 
	if(u.proto.isNeutralGarrison == false){
		containedUnit.Hurt = Utils.DO_NOTHING;
	}
	if(u.garrisonArray.length > 0){
		Unit.refreshGarrisonPositions(u);
	}
	u.garrisonArray.push(containedUnit);

	containedUnit.x = u.x+params[0];
	containedUnit.y = u.y+params[1];
	containedUnit.preferred_facing = params[2];
	containedUnit.angle = containedUnit.preferred_facing;
}

Unit.setCustomTexture = function(u){
	if(u.actor.riderActor != undefined){
		if(u.proto == UnitPrototype.LizardRider){
			if(u.owner.id == 2){
				u.actor.riderActor.texture = u.actor.riderActor.texture_default = Asset.texture.corsair6;
			}else if(u.owner.id == 3){
				u.actor.riderActor.texture = u.actor.riderActor.texture_default = Asset.texture.corsair4;
			}else{
				u.actor.riderActor.texture = u.actor.riderActor.texture_default = Asset.texture.corsair2;
			}
		}else{
			if(u.owner.id == 3){
				u.actor.riderActor.texture = u.actor.riderActor.texture_default = Asset.texture.dutch;
			}
		}
	}
	
	u.actor.texture = u.actor.texture_default = u.proto.texture.getTeamVariant(u.owner.colorId);
	if(u.actor.turret){
		u.actor.turret.texture = u.actor.turret.texture_default = u.actor.texture;
	}
}

Unit.checkBuildable = function(xx,yy, type ){
	var ss = type.structureSize;
	if(ss % 2 != 0){
		xx = Math.floor(xx) + 0.5;
		yy = Math.floor(yy) + 0.5;
	}else{
		xx = Math.round(xx);
		yy = Math.round(yy);
	}
	var nx = Math.floor(xx)-Math.floor(ss/2) ;
	var ny = Math.floor(yy)-Math.floor(ss/2) ;
	var n;
	
	for(var i=0;i<ss;++i){
		for(var j=0;j<ss;++j){
			if(ny + i < 0 || nx + j <0 || ny+i >= Pathfinder.mapH || nx+j >= Pathfinder.mapW){
				return false;
			}
			n = Pathfinder.map[ny+i][nx+j];
			if(!Node.isBuildable(n)){
				return false;
			}
		}
	}
	return true;
}

Unit.placeStructure = function(u){
	if(u.structureSize % 2 != 0){
		u.x = Math.floor(u.x) + 0.5;
		u.y = Math.floor(u.y) + 0.5;
	}else{
		u.x = Math.round(u.x);
		u.y = Math.round(u.y);
	}
	u.atNode =  u.getAtNode();
	u.z = M.terrain.getHeightAt(u.x, u.y);
	
	var nx = u.atNode.nodex-Math.floor(u.structureSize/2) ;
	var ny = u.atNode.nodey-Math.floor(u.structureSize/2) ;
	var n;

	for(var i=0;i<u.structureSize;++i){
		for(var j=0;j<u.structureSize;++j){
			if(ny + i < 0 || nx + j <0 || ny+i >= Pathfinder.mapH || nx+j >= Pathfinder.mapW){
				console.log("struture out of bounds!");
				return false;
			}
			n = Pathfinder.map[ny+i][nx+j];
			if(n.structure != null){
				console.log("struture collision!");
				return false;
			}
			if(n != u.atNode){
				//structure is always the tail of the node linked list, 
				//so it has no nextColl => it can be in multiple nodes
				Node.addTail(n,u);
			}
			n.structure = u;
			M.terrain.Deform_Set_Walkability(n, false, u, 7);
			Minimap.addUnitAt(u.x+j, u.y+i, u);
		}
	}
	
	//get a 1-wide rectangular window around the structure, with corners
	u.aroundNodes = [];
	nx = u.atNode.nodex;
	ny = u.atNode.nodey;
	var ss = u.structureSize; var nx2 = 0; var ny2 = 0;
	var center = Math.floor(ss/2);
	var upperOffset = ss%2==0?center:center+1;
	for(var i=0;i<ss+1;++i){
		ny2 = ny-center-1+i; nx2 = nx-center-1;
		if(ny2 >=0 && nx2 >= 0){
			u.aroundNodes.push(Pathfinder.map[ny2][nx2]);
		}
		ny2 = ny+upperOffset ; nx2 = nx-center-1+i;
		if(ny2 < Pathfinder.mapH && nx2 >= 0){
			u.aroundNodes.push(Pathfinder.map[ny2][nx2]);
		}
		ny2 = ny+upperOffset -i; nx2 = nx+upperOffset ;
		if(ny2 < Pathfinder.mapH && nx2< Pathfinder.mapW){
			u.aroundNodes.push(Pathfinder.map[ny2][nx2]);
		}
		ny2 = ny-center-1; nx2 = nx+upperOffset -i;
		if(ny2 >= 0 && nx2 < Pathfinder.mapW){
			u.aroundNodes.push(Pathfinder.map[ny2][nx2]);
		}
	}
	return true;
}

Unit.removeStructure = function(u){
	var nx = u.atNode.nodex-Math.floor(u.structureSize/2) ;
	var ny = u.atNode.nodey-Math.floor(u.structureSize/2) ;
	
	for(var i=0;i<u.structureSize;++i){
		for(var j=0;j<u.structureSize;++j){
			if(ny + i < 0 || nx + j <0 || ny+i >= Pathfinder.mapH || nx+j >= Pathfinder.mapW){
				continue;
			}
			var n = Pathfinder.map[ny+i][nx+j];
			
			if(n.structure == u){
				if(n != u.atNode){//we remove it from central node somewhere else
					Node.removeUnit(n, u);
				}
				M.terrain.Deform_Set_Walkability(n, true, u, 4);
				n.structure = null;
				Minimap.removeUnitAt(u.x+j, u.y+i, u);
			}
		}
	}
}

Unit.changeType = function(old, newType){
	var newUnit = Unit.Create(old.x, old.y, old.owner, newType, old.angle);
	newUnit.hp =  Math.min(newUnit.hp_max, Math.round(old.hp/old.hp_max * newUnit.hp_max));
	newUnit.xp = old.xp;
	newUnit.z = old.z+old.flyingHeight; newUnit.flyingHeight = old.flyingHeight;
	newUnit.actor.moveTo(old.actor.x, old.actor.y, old.actor.z);
	newUnit.dx = old.dx;
	newUnit.dy = old.dy;
	if(old.tagId > -1){
		newUnit.setTag(old.tagId);
	}
	old.Remove();
	return newUnit;
}


Unit.changeOwner = function(old, newOwner){
	if(old.owner == newOwner){return;}
	var oldActor = old.actor;
	var garrison = old.garrisonArray;
	old.Remove();
	var newUnit = Unit.Create(old.x, old.y, newOwner, old.proto, old.angle, false,true,99999, false, old);
	if(newUnit){
		if(garrison){
			Unit.replace_container(garrison,newUnit);
		}
		newUnit.hp = Math.min(newUnit.hp_max, old.hp);
		newUnit.xp = old.xp;
		newUnit.z = old.z+old.flyingHeight; newUnit.flyingHeight = old.flyingHeight;
		var newActor = newUnit.actor;
		newActor.moveTo(oldActor.x, oldActor.y, oldActor.z);
		newActor.dx = oldActor.dx;
		newActor.dy = oldActor.dy;
		newActor.frame = oldActor.frame;
		newUnit.angle = old.angle;
		newActor.rotZ = oldActor.rotZ;
		newActor.rotZ_last = oldActor.rotZ_last;
		newUnit.actor.scale = oldActor.scale;
		newUnit.actor.scale_base =oldActor.scale_base;
		
		if(old.tagId > -1){
			newUnit.setTag(old.tagId);
		}
		if(oldActor.crater){
			newActor.crater = oldActor.crater;
			newActor.crater.structure = newUnit;
			newActor.crater.baseActor = newActor;
		}
	}	
	return newUnit;
}

Unit.rescue = function(u,rescuer){
	var rescuePlayer = Control.currentPlayer;
	if(rescuer){
		rescuePlayer = rescuer.owner;
	}
	var rescued = Unit.changeOwner(u,rescuePlayer);
	u.replace_alias = rescued;
	if(rescuePlayer == Control.currentPlayer){
		SoundObject.rescue.playAt(u.x,u.y);
		Actor.SpawnRescueAura(rescued.actor);
	}
}

Unit.revive = function(u){
	if(u.alive){return;}
	u.alive = true;
	u.hp = u.hp_max;
	u.actor.startAnimation(Anim.stand);
	u.actor.hasShadow = u.proto.hasShadow;
	u.initAtNode();
	u.decayCounter = 0;
}

Unit.blockerCollisionCheck = function(xx, yy){
	if(xx < 0 || yy < 0 || xx >= Pathfinder.mapW || yy >= Pathfinder.mapH){
		return true;
	}
	var n = Pathfinder.getNodeAt(xx,yy);
	return Node.isPassable(n, this.blockerCollisionTreshold)==false;
	//return Math.ceil(Pathfinder.distanceField_Absolute[Math.floor(yy*2)][Math.floor(xx*2)]) <= this.blockerCollisionTreshold;
}
Unit.blockerCollisionCheck_node = function(n){
	return Node.isPassable(n, this.blockerCollisionTreshold)==false;
}
Unit.blockerCollisionCheck_item = function(n){
	return Node.isPassable(n, this.blockerCollisionTreshold)==false;
}

Unit.outOfChaseRadius = function(u){
	return (((u.x - u.chaseStartPos.x)*(u.x - u.chaseStartPos.x) + (u.y - u.chaseStartPos.y)*(u.y - u.chaseStartPos.y))>u.chaseRadius_squared);
}

Unit.enemy_for_player = function(u){
	return (u.isProjectile != true && u.alive == true && u.owner.team != Control.currentPlayer.team);
}
Unit.has_rightclick_mechanic = function(u, ability){
	return (!u.isProjectile && u.alive && 
	(u.owner.team != Control.currentPlayer.team || u.proto.isGarrison && u.owner == Control.currentPlayer
	|| u.proto.isResource || u.proto.isResourcePoint));
}

Unit.isAlive = function(u){
	return (u.isProjectile != true &&  u.alive);
}
Unit.isSelected = function(u){
	return (u.selected);
}
Unit.isRightClickEnemy = function(u){
	return u.owner.team != Control.currentPlayer.team && u.targetPriority > 0;
}
Unit.isHighlightable = function(u){
	return (u.isProjectile != true && u.alive == true && u.container == null);
}
Unit.hasGarrisonSpace = function(u){
	return u.garrisonArray && u.garrisonArray.length < u.proto.garrisonPlacement.length && u.born&&u.alive;
}

Unit.refreshGarrisonPositions = function(u){
	if(u.garrisonArray){
		for(var i=0;i<u.garrisonArray.length;++i){
			var gu = u.garrisonArray[i];
			var params = u.proto.garrisonPlacement[i];
			gu.x = u.x+params[0];
			gu.y = u.y+params[1];
			gu.preferred_facing = params[2];
			gu.angle = gu.preferred_facing;
		}
	}
}
Unit.ungarrison = function(container, u){
	if(!u.alive){return;}
	if(container.garrisonArray){
		container.garrisonArray.splice(container.garrisonArray.indexOf(u),1);
	}
	u.flyingHeight = container.proto.garrisonZ; u.z = container.z;
	if(u.actor.visible){
		SoundObject.ungarrison.playAt(u.x,u.y);
	}
	return Unit.changeType(u, u.proto.garrisonAliasType);
}

Unit.ungarrison_dead = function(container, u){
	if(container.garrisonArray){
		container.garrisonArray.splice(container.garrisonArray.indexOf(u),1);
	}
}
	
			
Unit.ungarrisonId = function(container, id){
	if(id < container.garrisonArray.length){
		var u = container.garrisonArray[id];
		if(container.isStructure){
			var n = Pathfinder.Get_Ungarrison_Node(container, u, 0);
		}else{
			var n = container.atNode;
		}
		if(n){
			u = Unit.ungarrison(container, u);
			u.x = n.nodex+0.3+RAND()*0.4;
			u.y = n.nodey+0.3+RAND()*0.4;
			u.flyingHeight = 0.1;
		}
	}
}

Unit.replace_container = function(garrisonArray, newContainer){
	newContainer.garrisonArray = garrisonArray;
	for(var i=0;i<garrisonArray.length;++i){
		garrisonArray[i].container = newContainer;
	}
}

Unit.cancelBuilding = function(u){
	u.Die();
	u.owner.getMoney(u.proto.moneyCost);
	u.owner.getCoin(u.proto.coinCost);
	if(u.builder){
		var builder = Unit.Create(u.x, u.y,u.owner,u.builder.proto);
		builder.hp = u.builder.hp;
		u.builder = null;
	}
}

Unit.cancelTrainingId = function(u, id){
	if(id < u.trainingQueue.length){
		var type = u.trainingQueue[id][0];
		u.owner.getMoney(type.moneyCost);
		u.owner.getCoin(type.coinCost);
		u.trainingQueue.splice(id,1);
		if(type.isUpgrade){
			type.enableForPlayer(u.owner.id);
		}
	}
}
Unit.cancelAllTraining = function(u){
	for(var i=0;i<u.trainingQueue.length;++i){
		var type = u.trainingQueue[i][0];
		u.owner.getMoney(type.moneyCost);
		u.owner.getCoin(type.coinCost);
		if(type.isUpgrade){
			type.enableForPlayer(u.owner.id);
		}
	}
	u.trainingQueue = [];
}

//forceFullRotation : if false, tanks will only rotate their turrets
Unit.facePointXY = function(u,x,y, forceFullRotation){
	if(forceFullRotation == true || u.hasTurret == false && !u.isStructure){
		u.angle = u.preferred_facing = Math.atan2(x - u.x, y - u.y);
	}else if(u.hasTurret){
		u.actor.turret.facePoint(x,y);
	}
}
Unit.facePointXY_gradual = function(u,x,y, factor){	 
	u.turn_gradual(Math.atan2(x - u.x, y - u.y), factor);
}


Unit.resizeHp = function(u, newVal){
	var ratio =  newVal/u.hp_max;
	u.hp_max = newVal;
	u.hp *= ratio;
}

Unit.setFacingSlow = function(u, angle){
	u.angle = angle;
	u.preferred_facing = angle;
}
Unit.facePointSlow = function(u,x,y){
	var angle = Math.atan2(x - u.x, y - u.y);
	Unit.setFacingSlow(u,angle);
}
Unit.setFacingInstant = function(u, angle){
	u.angle = angle;
	u.preferred_facing = angle;
	u.actor.rotZ = angle + 3.1415;
	u.actor.rotZ_last = u.actor.rotZ;
}
Unit.facePointInstant = function(u,x,y){
	var angle = Math.atan2(x - u.x, y - u.y);
	Unit.setFacingInstant(u,angle);
}

Unit.setPosInstant = function(u, x, y, z){
	u.x = x; u.y = y; u.z = z;
	u.preferred_pos.x = x;
	u.preferred_pos.y = y;
	u.chaseStartPos.x = x;
	u.chaseStartPos.y = y;
	u.actor.moveTo(u.x, u.y, u.z);
}

Unit.getAbilityInstance = function(u, ab){
	for(var i=0;i<u.Abilities.length;++i){
		if(u.Abilities[i].proto == ab){
			return u.Abilities[i];
		}
	}
	return null;
}
Unit.removeAbility = function(u,ab){
	for(var i=0;i<u.Abilities.length;++i){
		if(u.Abilities[i].proto == ab){
			u.Abilities.splice(i,1);
			return true;
		}
	}
	return false;
}

Unit.getSaveData = function(u){
	return [
	u.proto.id, 
	u.owner.id, 
	fixed3(u.editorPlace.x), 
	fixed3(u.editorPlace.y), 
	fixed3(u.editorPlace.z), 
	fixed3(u.editorAngle), 
	u.tagId, 
	u.wanderChance, 
	u.wanderRadius,
	u.deaf ? 1 : 0];
}

Unit.saveTrainingQueue = function(u){
	var data = [];
	if(u.trainingQueue){
		var tq = u.trainingQueue;
		for (var i=0;i<tq.length;++i){
			//trainingType(upgrade or unit), trainTime, trainAbility 
			data.push([tq[i][0].id, tq[i][1],tq[i][2].id])
		}
	}
	return data;
}

Unit.loadTrainingQueue = function(u, data){
	if(data.length > 0){
		var tq = [];
		u.trainingQueue = tq;
		for(var i=0;i<data.length;++i){
			var ab = Ability.getById(data[i][2]);
			//training type can be deduced from training ability
			u.trainingQueue.push([ab.trainingProto, data[i][1], ab]);
		}
	}
}

Unit.loadTasks = function(u, data){
	u.Stop();
	if(!data){return;}
	var taskList = [];
	for(var k=0;k<data.length;++k){
		var t = Task.loadSaveState(data[k],u);
		if(t != null){
			taskList.push(t);
		}
	}
	if(taskList.length > 0){
		u.setBaseTask(taskList[0]);
		for(var k=1;k<taskList.length;++k){
			u.addSubTask(taskList[k]);
		}
	}
}

Unit.loadAbilities = function(u, data){
	if(data){
		for(var k=0; k<data.length;++k){
			var ab = u.Abilities[k];
			if(ab.proto.id == data[k][0]){
				AbilityInstance.loadSaveState(ab, data[k])
			}
		}
	}
}

Unit.getSaveState = function(){
	var data = [];
	for(var i=0;i<Units.length;++i){
		var u = Units[i];
		if(u.alive && !u.proto.isItem){
			var taskStackData  = [];
			for(var k=0;k<u.taskStack.length;++k){
				taskStackData.push(Task.getSaveState(u.taskStack[k]));
			}
			taskStackData.push(Task.getSaveState(u.task));
		}else{
			var taskStackData = null;
		}
		
		var linkedUnit = -1;
		if(u.crewedUnit){
			linkedUnit = Units.indexOf(u.crewedUnit);
		}else if(u.container && u.container.proto.isGarrison){
			linkedUnit = Units.indexOf(u.container);
		}
		var proto = u.proto;
		var hp = u.hp;
		
		var abData = [];
		for (var k=0;k<u.Abilities.length;++k){
			abData.push( AbilityInstance.getSaveState(u.Abilities[k]) );
		}
		var tqueue = Unit.saveTrainingQueue(u);
		var builderHp = 0;
		if(u.builder && !u.born){
			builderHp = u.builder.hp;
		}
		data.push([
			i,
			proto.id,
			u.owner.id,
			[fixed3(u.x),fixed3(u.y),fixed3(u.z)],
			u.editorPlace?[fixed2(u.editorPlace.x),fixed2(u.editorPlace.y)]: 0 ,
			fixed2(u.angle),
			u.tagId,
			hp,
			hp>0?u.birthCounter:u.decayCounter,
			u.resourceCarried,
			[fixed2(u.chaseStartPos.x),fixed2(u.chaseStartPos.y)],
			taskStackData,
			linkedUnit,
			abData,
			tqueue,
			builderHp,
			u.xp,
		]);
	}
	return data;
}
Unit.loadSaveState = function(data){
	for(var i=0;i<data.length;++i){
		var d = data[i];
		var proto = UnitPrototype.getById(d[1]);
		
		var _isAlive = d[7]>0;
		var birthDecayCounter = d[8];
		var isConstructed = d[15]>0;
		var u = Unit.Create(d[3][0],d[3][1], Players[d[2]], 
		proto, d[5], isConstructed , _isAlive , birthDecayCounter, true);
		if(!u){continue;}
		if(d[4]){
			u.editorPlace = new Point(d[4][0],d[4][1]);
		}
		if(d[6]>=0){
			u.setTag(d[6]);
		}
		u.hp = d[7];
		u.resourceCarried = d[9];
		u.chaseStartPos.x = d[10][0];u.chaseStartPos.y = d[10][1];
		u.xp = d[16] || 0;
	}
	//second pass, anything that may need reference to other units
	var unitId = 0;
	for(var i=0;i<data.length;++i){
		var d = data[i];
		if(!d){
			continue;
		}
		var u = Units[unitId];
		if(!u){
			continue;
		}

		Unit.loadTasks(u,d[11]);
				
		if(d[12]>=0){
			//load linked unit (garrison or crew)
			var linkedUnit = Units[d[12]];
			if(linkedUnit.proto.isGarrison){
				Unit.linkGarrison(linkedUnit, u);
			}else if(linkedUnit.crew){
				Unit.linkCrew(linkedUnit, u);
			}
		}
		
		Unit.loadAbilities(u, d[13]);
		Unit.loadTrainingQueue(u, d[14]);
		if(d[15]>0){
			u.builder = new Unit(UnitPrototype.Probe,u.owner);
			u.builder.hp = d[15];
		}
		
		unitId++;
	}
}

/*Unit.followParty_Slave = function(u){
	for(var i=0;i<5;++i){
		var u2 = Unit.Create(u.x+RAND(), u.y+RAND(), u.owner, UnitPrototype.Private);
		u2.followUnit = u;
	}
}*/

Unit.checkInWater = function(u){
	return M.terrain.getWaterAt(u.x,u.y) > u.z+0.15;
}

Unit.quote_birth= function(u){
	if(u.proto.quoteSet){
		if(u.proto.quoteSet.on_birth(u)){
			if(u.proto.portrait && !GUI.DialogPanel.visible){
				u.proto.portrait.start(Portrait.talk);
			}
		}
	}
}
Unit.quote_move= function(u){
	if(u.proto.quoteSet){
		if(u.proto.quoteSet.on_move(u)){
			if(u.proto.portrait && !GUI.DialogPanel.visible){
				u.proto.portrait.start(Portrait.talk);
			}
		}
	}
}
Unit.quote_attack= function(u){
	if(u.proto.quoteSet){
		if(u.proto.quoteSet.on_attack(u)){
			if(u.proto.portrait && !GUI.DialogPanel.visible){
				u.proto.portrait.start(Portrait.talk);
			}
		}
		
	}
}
Unit.quote_selected= function(u){
	if(u.proto.quoteSet){
		if(u.proto.quoteSet.on_selected(u)){
			if(u.proto.portrait && !GUI.DialogPanel.visible){
				u.proto.portrait.start(Portrait.talk);
			}
		}
	}
}
