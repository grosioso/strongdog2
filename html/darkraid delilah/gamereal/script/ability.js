function Ability(_type, _name){
	this.id = Ability.list.length;
	Ability.list.push(this);
	
	this.name = _name;
	this.tooltip = "N/A";
	this.manaCost = 0;
	this.moneyCost = 0;
	this.coinCost = 0;
	this.cooldown = 50;
	
	this.damage = 0;
	this.resourcePerHit = 0;
	
	this.first_cooldown_factor = 0.25;
	this.iconId = 0;
	this.castSound = null;
	this.channelingSound = null;
	this.animType = Anim.attack;
	this.projectileSetter = null;
	this.targetMode = Ability.target_none;
	this.targetDummy = false; //used for attack ground
	//behaves just like a unit target, but it is invisible and indestructible
	this.hasFormation = false;
	//this.hotkey = 82;
	this.hotkey = 9999;
	this.hotkey_if_hidden = false; //hotkey works even if button is not on panel
	this.castRange = 5;
	this.guardTask = null;
	this.rangedTargeting = false;
	this.swingTime = 5; //should be less than channelingPeriod
	this.channelingPeriod = 6;
	this.shots = -1; //-1 for infinite
	this.arrivalBuffer = 0.2;
	this.inheritFromAttack = false; //inherits stats from unit attack (like cooldown, range, etc)
	this.lookForTarget = false; //look for target when there isn't any. Example: attack/attackMove
	this.trainingType = null; //used for training/research/spawning type abilities
	this.trainingProto = null;
	this.isResearch = false;
	this.training_model_cursor = false;
	this.spawningLimit = 0;
	this.buttonPos = -1;
	this.chaseForever = false;
	this.can_interrupt_if_stuck = true;
	this.cast_by_only_one = false;//if order is given to a group, only the best caster candidate will use the spell
	
	this.castCondition = Ability.condition_cooldown;
	this.techCondition = Utils.TRUE;
	this.requirementText = null;//text displayed at bottom of tooltip if tech conditions are not met
	this.targetCondition = Utils.TRUE; //global filter
	this.targetFilter = SearchFilter.isAlive; //filter for individual casters
	this.Effect = Utils.DO_NOTHING;
	this.swingEffect=null;
	this.PassiveEffect = null;
	this.new_target_check = null; //runs if current attack target is dead
	this.targetSelectionFilter = Unit.has_rightclick_mechanic;
	this.client_only = false;
	
	//used for tech tree and one-time upgrades
	this.ownerArray = [];
	
}

Ability.prototype.disableForPlayer = function(playerId){
	if(this.ownerArray[playerId] == true){
		this.ownerArray[playerId] = false;
		for(var i=0;i<Units.length;++i){
			if(Units[i].owner.id == playerId){
				Unit.removeAbility(Units[i], this);
			}
		}
	}
}

Ability.LevelStart = function(){
	for(var i=0;i<Ability.list.length;++i){
		var ab = Ability.list[i];
		for(var j=0;j<Players.length;++j){
			ab.ownerArray[j] = true;
		}
		if(ab.trainingType){
			if(ab.isResearch){
				ab.trainingProto = Upgrade[ab.trainingType];
			}else{
				ab.trainingProto = UnitPrototype[ab.trainingType];
			}
		}
	}
}
Ability.list = [];
Ability.lastTargetObject = null;
Ability.target_none = 0;
Ability.target_unit = 1;
Ability.target_point = 2;
Ability.target_drag = 3;
//Ability.target_ground = 4; //creates a dummy unit object
Ability.target_cursor = 5; //instant cast at mouse position(can't be used for button press)
Ability.target_grid = 6;
Ability.target_unit_or_point = 7;

Ability.getById = function(id){
	return Ability.list[id];
}

Ability.init = function(){
	Ability.list = [];
	
	Ability.Move = new Ability(1, "Move");
	Ability.Move.hotkey = 77;
	//Ability.Move.hotkey = 32;
	Ability.Move.hasFormation = true;
	Ability.Move.castRange = 0;
	Ability.Move.cooldown = 0;
	Ability.Move.targetMode = Ability.target_point ;
	Ability.Move.tooltip="Make unit move, ignoring enemies along the way"
	Ability.Move.buttonPos = 0;
	
	Ability.RallyPoint = new Ability(1, "Set Rally Point");
	Ability.RallyPoint.hotkey = 77;
	Ability.RallyPoint.iconId = 5;
	//Ability.Move.hotkey = 32;
	Ability.RallyPoint.castRange = 99999;
	Ability.RallyPoint.cooldown = 0;
	Ability.RallyPoint.targetMode = Ability.target_point ;
	Ability.RallyPoint.tooltip="Trained units will automatically move to set point";
	Ability.RallyPoint.buttonPos = 4;
	Ability.RallyPoint.targetDummy = true;
	Ability.RallyPoint.shots = 1;
	Ability.RallyPoint.swingTime = 1;
	Ability.animType = -1;
	Ability.RallyPoint.Effect = function(caster, target){
		this.target = target;
		this.lastTarget = target;
	}
	
	Ability.Garrison = new Ability(1, "Garrison");
	Ability.Garrison.castRange = 2;
	Ability.Garrison.cooldown = 5;
	Ability.Garrison.channelingPeriod = 16;
	Ability.Garrison.swingTime = 14;
	Ability.Garrison.targetMode = Ability.target_point ;
	Ability.Garrison.Effect = function(caster, target){
		if(Unit.hasGarrisonSpace(target) && 
		(caster.owner.team == target.owner.team||target.owner==Players[0])){
			caster.Remove();
			var gu = Unit.Create(target.x , target.y , caster.owner, caster.proto.garrisonAliasType);
			gu.hp = caster.hp;
			gu.xp = caster.xp;
			Unit.linkGarrison(target, gu);
			if(target.actor.visible){
				SoundObject.garrison.playAt(target.x,target.y);
			}
		}else{
			caster.Stop();
		}
	}
	
	Ability.AttackMove = new Ability(2, "Attack");
	Ability.AttackMove.hasFormation = true;
	Ability.AttackMove.iconId = 2;
	Ability.AttackMove.targetMode = Ability.target_point ;
	Ability.AttackMove.cooldown = 0;
	Ability.AttackMove.hotkey = 65;
	Ability.AttackMove.castRange = 0;
	Ability.AttackMove.inheritFromAttack = true;
	Ability.AttackMove.lookForTarget = true;
	Ability.AttackMove.tooltip="Use on a unit to attack it, use on ground for a guard-move"
	Ability.AttackMove.Effect = function(caster, target){
		if(target.targetPriority < 1){
			caster.task.targetUnit = null;
		}else{
			caster.Attack(target);
		}
	}
	Ability.AttackMove.buttonPos = 1;
	Ability.AttackMove.new_target_check = function(caster){
		return caster.GetNearestUnitWithFilter(caster.acquisitionRange/2, caster.GuardFilter, true);
	}
	
	Ability.Attack_Lock_On = new Ability(3,"Attack_Lock_On");
	Ability.copy(Ability.Attack_Lock_On, Ability.AttackMove);
	Ability.Attack_Lock_On.swingEffect = function(caster,target){
		//console.log(caster,target);
		Actor.SpawnLockOn(target,caster,caster.proto.swingTime);
	}
	Ability.Attack_Lock_On.Effect = function(caster,target){
		if( caster.can_see_unit(target)){
			caster.Attack(target);
		}
	}
	
	Ability.AttackGround = new Ability(3, "AttackGround");
	Ability.AttackGround.iconId = 2;
	Ability.AttackGround.targetDummy = true;
	Ability.AttackGround.cooldown = 0;
	Ability.AttackGround.hotkey = 71; //g
	Ability.AttackGround.targetMode = Ability.target_cursor;//Ability.target_point;
	Ability.AttackGround.inheritFromAttack = true;
	Ability.AttackGround.Effect = function(caster, target){
		caster.Attack(target);
		caster.formation_fix_pos = false;
	}

	Ability.Stop = new Ability(4, "Stop");
	Ability.Stop.hotkey = 83;//S
	Ability.Stop.iconId = 1;
	Ability.Stop.cooldown = 0;
	Ability.Stop.tooltip="Makes the unit stop"
	Ability.Stop.Effect = function(caster,target){
		caster.preferred_facing = caster.angle;
		caster.Stop();
	}
	Ability.Stop.buttonPos = 2;
	
	Ability.Build = new Ability(5, "Build Basic Structures");
	Ability.Build.cooldown = 0;
	Ability.Build.iconId = 4;
	Ability.Build.hotkey = 66; //B
	Ability.Build.tooltip = "Open the building tab";
	Ability.Build.hotkey_if_hidden = true;
	Ability.Build.Effect = function(){
		GUI.AbilityPanel.setButtonOffset(8);
	}
	Ability.Build.targetMode = Ability.target_none;
	Ability.Build.buttonPos = 6;
	Ability.Build.client_only = true;
	
	Ability.Build_Advanced = new Ability(5, "Build Advanced Structures");
	Ability.copy(Ability.Build_Advanced, Ability.Build);
	Ability.Build_Advanced.iconId = 12;
	Ability.Build_Advanced.hotkey = 86; //V
	Ability.Build_Advanced.tooltip = "Open the building tab"
	Ability.Build_Advanced.hotkey_if_hidden = true;
	Ability.Build_Advanced.Effect = function(){
		GUI.AbilityPanel.setButtonOffset(16);
	}
	Ability.Build_Advanced.buttonPos = 7;
	
	Ability.Research_PlasmaCharge = new Ability(1,"Research Plasma Charge");
	Ability.Research_PlasmaCharge.trainingType = "PlasmaCharge";
	Ability.Research_PlasmaCharge.buttonPos = 4;
	Ability.Research_PlasmaCharge.isResearch = true;
	Ability.Research_PlasmaCharge.cooldown = 0;
	Ability.Research_PlasmaCharge.first_cooldown_factor = 0;
	Ability.Research_PlasmaCharge.Effect = Effect.TrainUnit;
	Ability.Research_PlasmaCharge.tooltip = "Unlocks Plasma Charge spell for Electropods."
	Ability.Research_PlasmaCharge.hotkey = 69; //E
	Ability.Research_PlasmaCharge.castCondition = Ability.condition_money;
	Ability.Research_PlasmaCharge.techCondition = function(player){
		return player.canUpgrade(this.trainingProto);
	}
	
	/*Ability.Drip = new Ability(1, "Drip");
	Ability.Drip.client_only = true;
	Ability.Drip.cooldown = 0;
	Ability.Drip.PassiveEffect = function(caster){
		if(caster.inner_counter%30 ==0 && Math.random()<0.5 && caster.actor.visible){
			Actor.SpawnDrip(caster.actor.x,caster.actor.y,caster.actor.z-0.3);
		}
	}*/
	
	Ability.EvilEye = new Ability(1, "EvilEye");
	Ability.EvilEye.cooldown = 0;
	Ability.EvilEye.PassiveEffect = function(caster){
		if(caster.inner_counter%10 ==0 ){
			var target = Gamestats.Hero;
			var d = Unit_Distance(caster, target);
			SoundObject.heartbeat.playAt(caster.x,caster.y,1, 1/(d+0.1) );
			if(d > 15 || Control.key_eyes.pressed() ){
				return;
			}
			var lookangle = target.angle;
			if(target == Gamestats.Hero){
				lookangle = cam.yaw;
			}
			var dot = Math.sin(lookangle)*(caster.x-target.x) + Math.cos(lookangle)*(caster.y-target.y);
			var angleToMe = Math.acos(dot/d);
			if(angleToMe < 0.75 && caster.can_see_unit(target)){
				if(target==Gamestats.Hero){
					var screenPos = worldPointToGUI(caster.x, caster.y, caster.z+caster.collZ)
					if(Math.abs(screenPos[0]-0.4)<0.47 && Math.abs(screenPos[1]-0.5)<0.45){
						target.last_evil_seen = caster;
						GUI.AddDamageMarker(screenPos[0], screenPos[1],1.5);
						if(caster.proto.attackSound){
							caster.proto.attackSound.playAt(caster.x , caster.y );
						}
						caster.actor.startAnimation(Anim.spell);
					}
				}else{
					target.last_evil_seen = caster;
				}
			}
		}
	}
	
	Ability.Soulburn = new Ability(1, "Soulburn");
	Ability.Soulburn.cooldown = 0;
	Ability.Soulburn.PassiveEffect = function(caster){
		if(this.duration % 15 == 5){
			if(caster.actor.visible){
				Actor.SpawnRocketExplosion(caster.actor.x,caster.actor.y,caster.actor.z+caster.eyeZ/2, 0.7, 0.08);
			}
			caster.Hurt(2, this.sourceUnit );
		}
	}
	
	Ability.NetTrainingCancel = new Ability(1, "NET_CANCEL");
	
	Ability.TabCancel = new Ability(1, "Cancel Tab");
	Ability.TabCancel.tooltip = "Back to main ability tab"
	Ability.TabCancel.client_only = true;
	Ability.TabCancel.cooldown = 0;
	Ability.TabCancel.iconId = 62;
	Ability.TabCancel.Effect = function(){
		GUI.AbilityPanel.setButtonOffset(0);
	}
	
}

Ability.copy = function(dst, src){
	var nm = dst.name; var id = dst.id;
	Object.assign(dst, src);
	dst.name = nm;
	dst.id = id;
	dst.ownerArray = [];
}

Ability.condition_cooldown = function(){
	return this.cooldownCounter <= 0;
}
Ability.condition_spell_money = function(caster){
	if(this.cooldownCounter <= 0){
		if(this.caster.owner.money >= this.proto.moneyCost){
			return true;
		}else{
			if(caster.owner == Control.currentPlayer){
				GUI.Alert_Minerals();
			}
		}
	}
	return false;
}

Ability.condition_money = function(caster){
	var type = this.proto.trainingProto;
	if(this.caster.owner.money >= type.moneyCost){
		if(this.caster.owner.coin >= type.coinCost){
			return true;
		}else{
			if(caster.owner == Control.currentPlayer){
				GUI.Alert_Coin();
			}
			
			return false;
		}
	}else{
		if(caster.owner == Control.currentPlayer){
			GUI.Alert_Minerals();
		}
		return false;
	}
}

Ability.condition_isResource = function(target){
	return target.alive && target.proto.isResource;
}

Ability.condition_isHackable = function(target){
	return target.alive && target.born && target.proto==UnitPrototype.Computer;
}

Ability.condition_isUnit = function(target){
	return target.alive && target.born && !target.isStructure;
}

Ability.condition_isStructure = function(target){
	return target.alive && target.proto.isStructure;
}
Ability.condition_isSuicideTarget = function(target){
	return target.alive && (target.proto.isStructure||target.proto.isTall);
}

function AbilityTarget(x,y,unit){
	this.x = x;
	this.y = y;
	this.unit = unit;
	//this.direction = ;
}

//mostly used for attack ground
function AbilityTargetDummyUnit(_x, _y){
	this.x = _x;
	this.y = _y;
	this.z = M.terrain.getHeightAt(_x, _y);
	this.isStructure = false;
	this.alive = true;
	this.isDummy = true;
	this.hardRadius = 0.5;
	this.net_id = -1;
	
	this.Hurt = Utils.DO_NOTHING;
}

function AbilityInstance(_caster, _proto){
	this.proto = _proto;
	this.caster = _caster;
	this.cooldownCounter = Math.round(this.proto.first_cooldown_factor * this.proto.cooldown);
	this.actionCooldownCounter = 0;

	this.Effect = this.proto.Effect;
	this.PassiveEffect = this.proto.PassiveEffect;
	this.condition = this.proto.castCondition;
	this.duration = -1;
	this.shots = this.proto.shots;
	
	this.target = null;
	this.lastTarget = null;
	this.sourceUnit = _caster; //buff source
	this.swing_counter = 0; //a how many times did the unit attack?
}

AbilityInstance.prototype.loop = function(){
	if(this.cooldownCounter > 0){
		this.cooldownCounter--;
	}
	if(this.actionCooldownCounter > 0){
		this.actionCooldownCounter --;
	}
	if(this.PassiveEffect != null){
		this.PassiveEffect(this.caster);
		if(this.duration > 0){
			this.duration --;
			if(this.duration <= 0){
				this.caster.Abilities.splice(this.caster.Abilities.indexOf(this),1);
			}
		}
	}
}

AbilityInstance.prototype.startCall = function(){
	if(this.proto.techCondition(this.caster.owner)){
		if(this.condition(this.caster)){
			this.waitingForTarget = true;
			this.shots = this.proto.shots;
			return true;
		}
	}else{
		GUI.Alert_Tech();
	}
	return false;
}

AbilityInstance.prototype.endCall = function(target){
	this.waitingForTarget = false;
	if(this.condition(this.caster)){
		this.target = target;
		return true;
	}
	return false;
}

AbilityInstance.prototype.cancel = function(){
	this.target = null;
	this.waitingForTarget = false;
}

AbilityInstance.prototype.cast = function(target){
	this.waitingForTarget = false;
	if(this.condition(this.caster)){
		this.cooldownCounter = this.proto.cooldown;
		if(target == null){
			target = new AbilityTarget(0,0, this.caster);
		}
		this.lastTarget = target || this.lastTarget;
		this.Effect(this.caster, target);
	}
}
AbilityInstance.prototype.startSwing = function(target){
	this.swing_counter ++;
	if(this.caster.moving == false && this.caster.hasTurret == false && this.proto.animType>=0){
		this.caster.actor.startAnimation(this.proto.animType);
	}
	if(this.proto.swingEffect){
		this.proto.swingEffect(this.caster,target);
	}
	if(this.proto.channelingSound){
		this.proto.channelingSound.play(this.caster.x-cam.pos[0], this.caster.y-cam.pos[1]);
	}
	if(this.caster.hasTurret == true){
		this.caster.actor.turret.startAnimation(Anim.attack);
	}
}

//add buff or refresh if unit already has it
AbilityInstance.applyBuff = function(u, proto, duration, sourceUnit){
	var hasBuff = false;
	for(var i=0;i<u.Abilities.length;++i){
		if(u.Abilities[i].proto == proto){
			u.Abilities[i].duration = Math.max(u.Abilities[i].duration, duration);
			hasBuff = true;
			break;
		}
	}
	if(hasBuff == false){
		var abi = new AbilityInstance(u,proto);
		u.Abilities.push(abi);
		abi.duration = duration;
		abi.sourceUnit = sourceUnit;
	}
}

AbilityInstance.getSaveState = function(ab){
	return [ab.proto.id, ab.cooldownCounter, ab.actionCooldownCounter, ab.duration, ab.shots];
}
AbilityInstance.loadSaveState = function(ab, data){
	ab.cooldownCounter = data[1];
	ab.actionCooldownCounter = data[2];
	ab.duration = data[3];
	ab.shots = data[4];
}

var Effect = new Object();

Effect.SpawnPilot = function(caster,target){
	var xx = caster.x;
	var yy = caster.y;
	if(Node.isPassable(Pathfinder.getNodeAt_Robust(xx,yy), 0)==true){
		var u=Unit.Create(xx, yy, caster.owner, UnitPrototype.Pioneer, caster.angle);
		if(u){
			u.z = caster.z; u.actor.z = u.actor.z;
			u.actor.scale = caster.actor.scale;
			u.setBaseTask(new StunTask(u, 28));
			u.addSubTask(new KickTask(u, 0.7));
			u.addSubTask(new StunTask(u, 2));
			u.actor.startAnimation(Anim.birth);
			if(caster.tagId > -1 ){
				u.setTag(caster.tagId);
			}
		}
	}
}

Effect.SpawnHeroAlias  = function(caster,target){
	var xx = caster.x;
	var yy = caster.y;
	var u=Unit.Create(xx, yy, caster.owner,caster.proto.heroDeadAliasType, caster.angle);
	if(u){
		u.z = caster.z; u.actor.z = u.actor.z;
		/*u.actor.scale = caster.actor.scale;
		u.setBaseTask(new StunTask(u, 28));
		u.addSubTask(new KickTask(u, 0.7));
		u.addSubTask(new StunTask(u, 2));*/
		u.actor.startAnimation(Anim.birth);
		if(caster.tagId > -1){
			u.setTag(caster.tagId);
		}
	}
}

Effect.SpawnUnit = function(caster, target){
	if(caster.inner_counter%60 == 0 && Gamestats.mapTime%2000 < 300
	&& caster.owner.lastTickIncome > 3){
		var trainX = 1.5*Math.sin(caster.angle);
		var trainY = 1.5*Math.cos(caster.angle);
		var proto = UnitPrototype.EvilProbe;
		var u = Unit.Create(caster.x+trainX+(RAND()+0.5)*0.1, caster.y+trainY+(RAND()+0.5)*0.1, caster.owner, 
		proto ,caster.angle, true);
		u.birthTime = u.proto.birthTime_training;
		Unit.setFacingInstant(u,caster.angle);
		if(caster.owner.ai){
			caster.owner.ai.infantry_bought_total++;
		}
	}	
}

Effect.SpawnGhast = function(caster){
	Actor.SpawnBloodSplat(caster.x,caster.y, caster.z + 0.8);
		
	var u = Unit.Create(caster.x,caster.y,caster.owner, UnitPrototype.Ghast, caster.angle);
	u.z = caster.z + 0.5;
	Unit.setFacingInstant(u, caster.angle);
	u.actor.z = u.actor.z_last = u.z;
	u.windPressureVector.z += 0.1;
	u.windPressureVector.x += 0.1*Math.cos(1.57-caster.angle);
	u.windPressureVector.y += 0.1*Math.sin(1.57-caster.angle);
	Unit.Stun(caster, 10);
}


Effect.checkTrainingQueue = function(caster){
	if(!caster.trainingQueue){
		caster.trainingQueue = [];
	}
	var curr = caster.trainingQueue[0];
	if(curr){
		curr[1]--;
		if(curr[1] <= 0){
			caster.trainingQueue.splice(0,1);
			var type = curr[0];
			caster.xp += (type.moneyCost+type.coinCost)/50;
			
			if(type.isUpgrade){
				if(caster.owner == Control.currentPlayer){
					GUI.Alert_Research(caster, type);
				}
				type.apply(caster.owner.id);
				if(!type.singleUpgrade){
					curr[2].enableForPlayer(caster.owner.id);
				}else{
					curr[2].disableForPlayer(caster.owner.id);
				}
			}else{
				
				if(caster.owner.useCampaignUnitTypes){
					if(type.aiAliasType){
						type = type.aiAliasType;
					}
				}
				
				if(type.flying){
					var angle = RAND()*6.28;
					var trainX = caster.x;
					var trainY = caster.y;
				}else{
					var angle = caster.angle;
					var trainX = caster.x + 1.7*Math.sin(angle) +(RAND()+0.5)*0.1;
					var trainY = caster.y + 1.7*Math.cos(angle) +(RAND()+0.5)*0.1;
					
					if(!Node.isPassable(Pathfinder.getNodeAt_Robust(trainX, trainY), type.blockerCollisionTreshold)){
						var n = Pathfinder.Get_Alternative_Node_For_Training(caster,type.blockerCollisionTreshold);
						if(n){
							trainX = n.nodex+0.5;
							trainY = n.nodey+0.5;
							angle = Math.atan2(trainX - caster.x, trainY - caster.y);
						}
					}
				}
				
				
				var u = Unit.Create(trainX, trainY, caster.owner, type,angle, true);
				u.birthTime = u.proto.birthTime_training;
				//Unit.setFacingInstant(u,caster.angle);
				if(caster.owner==Control.currentPlayer){
					Unit.quote_birth(u);
				}
				
				var rallyAb = Unit.getAbilityInstance(caster , Ability.RallyPoint);
				if(u.proto.isWorker){
					u.returnToGather();
					u.actor.startAnimation(Anim.birth_training);
				}else{
					if(rallyAb && rallyAb.lastTarget){
						Unit.Walk(u, rallyAb.lastTarget.x, rallyAb.lastTarget.y)
						u.addSubTask( new StunTask(u,0));
					}
				}
			}
		}
	}
}

Effect.TrainUnit = function(caster){
	if(!caster.trainingQueue){
		caster.trainingQueue = [];
	}
	if(this.proto.isResearch){
		var type = this.proto.trainingProto;
		if(type.allow_parallel_research == false){
			type.disableForPlayer(caster.owner.id);
		}
	}else{
		var type = UnitPrototype[this.proto.trainingType];
	}
	caster.owner.spend(type.moneyCost, type.coinCost);
	caster.trainingQueue.push([type, type.trainingTime, this.proto]);
	
}

Effect.Build = function(caster){
	var type = UnitPrototype[this.proto.trainingType];
	if(this.target){
		var u = Unit.Create(this.target.x, this.target.y, caster.owner, type , type.structure_rotation , true);
	}else{//for some reason this can happen at a network desync
		console.log("missing target");
	}
	
	if(u){
		u.birthTime = type.trainingTime;
		caster.owner.spend(type.moneyCost, type.coinCost);
		//Actors.push(Actor.Construction(u));
		u.builder = caster;
		caster.Remove();
		u.hp = u.hp_max/10;
	}else{
		GUI.Alert(GUI.msg_cantBuildThere);
	}
	
	//caster.Stop();
}


Effect.Liftoff = function(caster){
	var u = Unit.Create(caster.x, caster.y, caster.owner, UnitPrototype.LevFort, false);
	for(var i=0;i<caster.garrisonArray.length;++i){
		Unit.linkGarrison(u,caster.garrisonArray[i]);
	}
	u.hp = caster.hp*u.hp_max/caster.hp_max;
	Unit.setFacingInstant(u,caster.angle)
	caster.Remove();
}

Effect.Settle = function(caster){
	var u = Unit.Create(caster.x, caster.y, caster.owner, UnitPrototype.Fort, false);
	if(u){
		for(var i=0;i<caster.garrisonArray.length;++i){
			Unit.linkGarrison(u,caster.garrisonArray[i]);
		}
		u.hp = caster.hp*u.hp_max/caster.hp_max;
		Unit.setFacingInstant(u,caster.angle);
		caster.Remove();
	}	
}

Effect.Levitate = function(caster){
	if(caster.flyingHeight < 0.5 && caster.pressureVector.z < 0.02){
		caster.pressureVector.z += (0.5-caster.flyingHeight)*0.015;
		if(caster.inner_counter%10==1){
			caster.pressureVector.z += 0.01*RAND();
		}
	}
}

Effect.HeroRevive = function(caster){
	caster.hp = caster.hp_max * (1-this.cooldownCounter/this.proto.cooldown);
	this.cooldownCounter ++;
	if(caster.inner_counter%30==0){
		var closestUnit = Pathfinder.Dijkstra_Unit_Search(caster.atNode, 5, SearchFilter.isTarget , caster, 0);
		if(closestUnit && closestUnit.owner.team == caster.owner.team){
			this.cooldownCounter -= 30;
			if(caster.owner.team == Control.currentPlayer.team){
				GUI.AddRisingText(caster.x, caster.y, caster.z, GUI.msg_repair, GUI.textColor_repair);
			}
			if(this.cooldownCounter <= 0){
				caster.Die();
			}
		}
	}
}

Effect.GiveMoney = function(caster,target){
	if(target){
		target.owner.getMoney(caster.proto.itemParam);
	}
}
Effect.GiveAmmo = function(caster,target){
	if(target){
		target.ammoArray[caster.proto.itemParam[0]].add(caster.proto.itemParam[1]);
	}
}

Effect.AreaHeal = function(caster, target){
	SoundObject.repair.playAt(caster.x,caster.y);
	Pathfinder.Spiral_Unit_Search(Pathfinder.getNodeAt(caster.x,caster.y), 10, SearchFilter.itemHeal , caster, 0);
}
Effect.Heal = function(caster, target){
	if(target.hp < target.hp_max){
		target.hp = Math.min(target.hp_max, target.hp + caster.proto.itemParam);
	}
}
Effect.Heal_Extra = function(caster, target){
	target.hp = target.hp + caster.proto.itemParam ;
}
Effect.GiveShield = function(caster, target){
	target.shield = Math.min(target.shield_max, target.shield + caster.proto.itemParam);
}
Effect.GiveWeapon = function(caster, target){
	Effect.GiveAmmo(caster,target);
	var wep = target.arsenal[caster.proto.itemParam[2]];
	if(!wep.obtained){
		wep.obtained = true;
		Weapon.setWeapon(caster.proto.itemParam[2]);
	}
}
Effect.GiveHazmat = function(caster, target){
	target.hazmat = Math.min(target.hazmat_max, target.hazmat + caster.proto.itemParam);
}
Effect.GiveKey = function(caster, target){
	Gamestats.Keycards[caster.proto.itemParam] = true;
}


Effect.Kill = function(caster,target){
	target.Die();
}

