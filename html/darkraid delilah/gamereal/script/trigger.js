"use strict";

function Trigger(_id){
	this.id = _id;
	//name starting with # will not be saved
	this.name = "#"+_id + "Untitled Trigger";
	this.color = Trigger.getColor();
	this.enableCondition = TriggerCondition.Never;
	this.enableParam = [];
	//list of action instances, format: [[id,param,delay],[id,param,delay],...]
	this.actions = [];
	//used for checking if event is happening (hero is in event area)
	this.state = 0;
	this.triggered = false;
	//counts the ticks since trigger activation
	this.age = 0;
	this.selectedAction = null;
	this.maxActionDelay = 0;
	this.areas = [];
	this.enabled = true;
	
	this.condition = Trigger.condition;
	this.setCondition = Trigger.setCondition;
	this.addAction = Trigger.addAction;
	this.getConditionText = Trigger.getConditionText;
}
Trigger.prototype.loop = function(){	
	if(this.enabled == false){
		return;
	}
	if(this.state > 0){
		this.state--;
		if (this.triggered == false && this.condition() == true){
			this.fire();
		}
	}
	if(this.triggered == false){
		if(this.condition() == true){
			this.fire();
		}
	}
	
	
	if(this.triggered){
		//after all actions have been executed, there's no reason to check
		if(this.age <= this.maxActionDelay){
			for(var i=0;i<this.actions.length;++i){
				if(this.actions[i][2] == this.age){
					this.doAction(i);
				}
			}
		}
		if(this.triggered){
			this.age ++;
		}
	}
}
Trigger.prototype.fire = function(){
	this.state = 2;
	this.triggered = true;
	for(var i=0;i<this.actions.length;++i){
		this.maxActionDelay = Math.max(this.maxActionDelay, this.actions[i][2]);
	}
}

Trigger.prototype.reset = function(){
	this.age = 0;
	this.state = 0;
	this.triggered = false;
}

Trigger.prototype.sortActions = function(){
	this.actions.sort(function(a,b){return a[2]<b[2]?-1:1});
}

Trigger.prototype.UnitInArea = function(u){
	for(var i=0;i<this.areas.length;++i){
		if(Unit_Distance(this.areas[i], u)<this.areas[i].scale){
			return true;
		}
	}
	return false;
}
Trigger.prototype.doAction = function(actionId){
	var act = TriggerAction.getById(this.actions[actionId][0]);
	act.execute(this.actions[actionId][1]);
	if(act.repeatOnLoad){
		Trigger.actionHistory.push([this.id, actionId]);
	}
}
Trigger.condition = function(){
	return this.enableCondition.check(this.enableParam);
}
Trigger.getConditionText = function(){
	return this.enableCondition.getText(this.enableParam);
}
Trigger.addAction = function(action){
	this.actions.push([action.id, action.getDefaultParams(), 0]);
}
Trigger.setCondition = function(cond){
	this.enableCondition = cond;
	this.enableParam = cond.getDefaultParams();
}
//END OF METHOD FUNCTIONS

Trigger.list = [];
Trigger.globalVariables = []; //contains global switches
Trigger.Tags = [];
//every tagged unit can have a special loot table. Default values are null
Trigger.Tagged_Loot = [];
Trigger.Unit_Groups = [];
Trigger.Timers = [];
Trigger.Conditions = [];
Trigger.Functions = [];
Trigger.Actions = [];
Trigger.CameraPoints = [];
Trigger.actionHistory = [];
Trigger.Objectives = [];
//Trigger.Actions = [];
Trigger.selectedTrigger = null;
Trigger.infoText_jump = "JUMP";
Trigger.tint_green = [0.6,1,0.2];
Trigger.tint_blue = [0.2,0.6,1];
Trigger.tint_disabled = [0.4,0.05,0.];
Trigger.tint_upgradeCircle = [0.6,1,0.2];
Trigger.tint_exitCircle = [0.2,0.6,1];

Trigger.init = function(){
	Trigger.list  = [];
	Trigger.list_quests = [];
	Trigger.Conditions = [];
	Trigger.Actions = [];
	Trigger.Functions = [];
	Trigger.actionHistory = [];
	Trigger.Unit_Groups = [];
	Trigger.CameraPoints = [];
	Trigger.Objectives = [];
	TriggerParam.Init();
	
	
	TriggerCondition.Never = new TriggerCondition("Never");
	
	TriggerCondition.Always = new TriggerCondition("Always");
	TriggerCondition.Always.check = Utils.TRUE;
	TriggerCondition.Always.getText = function(){return "Always";}
	
	TriggerCondition.Use =  new TriggerCondition("Use");
	TriggerCondition.Use.params[0] = TriggerParam.type_int;
	TriggerCondition.Use.check = function(p){
			var sec = NavSector.getById(p[0]);
			if(sec && sec.last_use_time >= Gamestats.mapTime){
				return true;
			}
			return false;
		}
	TriggerCondition.Use.getText = function(p){return `Sector ${p[0]} used`;}
	
	TriggerCondition.Triggered = new TriggerCondition("Triggered");
	TriggerCondition.Triggered.params[0] = TriggerParam.type_trigger_id;
	TriggerCondition.Triggered.check = function(p){return Trigger.list[Math.floor(p[0])].triggered;}
	TriggerCondition.Triggered.getText = function(p){return `trig ${p[0]} ${Trigger.list[Math.floor(p[0])].name} triggered`;}
	
	TriggerCondition.InSector = new TriggerCondition("InSector");
	TriggerCondition.InSector.params[0] = TriggerParam.type_int;
	TriggerCondition.InSector.params[1] = TriggerParam.type_int;
	TriggerCondition.InSector.check = function(p){
			/*var u = Trigger.Tags[p[0]].getOwnerUnit();
			var trig = Trigger.list[p[1]];
			if(u && trig){
				return trig.UnitInArea(u);
			}*/
			var u =Gamestats.Hero;
			if(u.last_floor_triangle){
				return u.last_floor_triangle.sectorId == p[1];
			}
			return false;
		}
	TriggerCondition.InSector.getText = function(p){return `Unit${p[0]} is in sector ${p[1]}`;}
	
	TriggerCondition.Not = new TriggerCondition("Not");
	TriggerCondition.Not.params[0] = TriggerParam.type_condition;
	TriggerCondition.Not.check = function(p){return TriggerCondition.getById(p[0][0]).check(p[0][1])==false;}
	TriggerCondition.Not.getText = function(p){return "Not("+ this.params[0].getText(p[0])+")";}
	
	TriggerCondition.And = new TriggerCondition("And");
	TriggerCondition.And.params[0] = TriggerParam.type_condition;
	TriggerCondition.And.params[1] = TriggerParam.type_condition;
	TriggerCondition.And.check = function(p){
		return TriggerCondition.getById(p[0][0]).check(p[0][1])&&TriggerCondition.getById(p[1][0]).check(p[1][1]);}
	TriggerCondition.And.getText = function(p){
		return "("+ this.params[0].getText(p[0])+")AND("+ this.params[1].getText(p[1])+")";}
		
	TriggerCondition.Or = new TriggerCondition("Or");
	TriggerCondition.Or.params[0] = TriggerParam.type_condition;
	TriggerCondition.Or.params[1] = TriggerParam.type_condition;
	TriggerCondition.Or.check = function(p){
		return TriggerCondition.getById(p[0][0]).check(p[0][1])||TriggerCondition.getById(p[1][0]).check(p[1][1]);}
	TriggerCondition.Or.getText = function(p){
		return "("+ this.params[0].getText(p[0])+")OR("+ this.params[1].getText(p[1])+")";}
	
	TriggerCondition.IsDead = new TriggerCondition("IsDead");
	TriggerCondition.IsDead.params[0] = TriggerParam.type_int;
	TriggerCondition.IsDead.check = function(p){return Trigger.Tags[p[0]].isDead();}
	TriggerCondition.IsDead.getText = function(p){return `Unit ${p[0]} is dead.`;}
	
	TriggerCondition.TimePassed = new TriggerCondition("TimePassed");
	TriggerCondition.TimePassed.params[0] = TriggerParam.type_trigger_id;
	TriggerCondition.TimePassed.params[1] = TriggerParam.type_int;
	TriggerCondition.TimePassed.check = function(p){return Trigger.list[Math.floor(p[0])].age > p[1];}
	TriggerCondition.TimePassed.getText = function(p){return `Trigger ${p[0]} ${Trigger.list[Math.floor(p[0])].name} age > ${p[1]} (${fixed1(p[1]/30)} s).`;}
	
	TriggerCondition.InArea = new TriggerCondition("UnitInArea");
	TriggerCondition.InArea.params[0] = TriggerParam.type_int;
	TriggerCondition.InArea.params[1] = TriggerParam.type_int;
	TriggerCondition.InArea.check = function(p){
			var u = Trigger.Tags[p[0]].getOwnerUnit();
			var trig = Trigger.list[p[1]];
			if(u && trig){
				return trig.UnitInArea(u);
			}
			return false;
		}
	TriggerCondition.InArea.getText = function(p){return `Unit${p[0]} is in event ${p[1]}`;}
	
	TriggerCondition.HasBornUnit = new TriggerCondition("HasBornUnit");
	TriggerCondition.HasBornUnit.params[0] = TriggerParam.type_int;
	TriggerCondition.HasBornUnit.params[1] = TriggerParam.type_unitType;
	TriggerCondition.HasBornUnit.params[2] = TriggerParam.type_relation;
	TriggerCondition.HasBornUnit.params[3] = TriggerParam.type_int;
	TriggerCondition.HasBornUnit.check = function(p){
			var player =Players[p[0]];
			var type = UnitPrototype.getById(p[1]);
			if(player&&type){
				return TriggerParam.Relations[p[2]].func(type.playerCounts_born[player.id],p[3]);
			}
			return false;
		}
	TriggerCondition.HasBornUnit.getText = function(p){
		var relation = TriggerParam.Relations[p[2]].name;
		var typeName = UnitPrototype.getById(p[1]).name;
		return `Player${p[0]}'s finished count of ${typeName}s ${relation} ${p[3]}`;}
		
	TriggerCondition.TypeKills = new TriggerCondition("TypeKills");
	TriggerCondition.TypeKills.params[0] = TriggerParam.type_int; //player
	TriggerCondition.TypeKills.params[1] = TriggerParam.type_unitType; //unit type
	TriggerCondition.TypeKills.params[2] = TriggerParam.type_relation;
	TriggerCondition.TypeKills.params[3] = TriggerParam.type_int; //count
	TriggerCondition.TypeKills.check = function(p){
			var player =Players[p[0]];
			var type = UnitPrototype.getById(p[1]);
			if(player&&type){
				return TriggerParam.Relations[p[2]].func(type.playerKills[player.id],p[3]);
			}
			return false;
		}
	TriggerCondition.TypeKills.getText = function(p){
		var relation = TriggerParam.Relations[p[2]].name;
		var typeName = UnitPrototype.getById(p[1]).name;
		return `Player${p[0]}'s kills of ${typeName}s ${relation} ${p[3]}`;}
	
	
	TriggerCondition.IsRescued = new TriggerCondition("IsRescued");
	TriggerCondition.IsRescued.params[0] = TriggerParam.type_int;
	TriggerCondition.IsRescued.check = function(p){return Trigger.Tags[p[0]].isRescued();}
	TriggerCondition.IsRescued.getText = function(p){return `Unit ${p[0]} is rescued.`;}
	
	TriggerCondition.UnitHp = new TriggerCondition("UnitHp");
	TriggerCondition.UnitHp.params[0] = TriggerParam.type_int;
	TriggerCondition.UnitHp.params[1] = TriggerParam.type_relation;
	TriggerCondition.UnitHp.params[2] = TriggerParam.type_int;
	TriggerCondition.UnitHp.check = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		var hp = u?u.hp:0;
		return TriggerParam.Relations[p[1]].func(hp,p[2]);
	}
	TriggerCondition.UnitHp.getText = function(p){
		var relation = TriggerParam.Relations[p[1]].name;
		return `Unit ${p[0]} life${relation}${p[2]} hp.`;}
		
	TriggerCondition.UnitOwner = new TriggerCondition("UnitOwner");
	TriggerCondition.UnitOwner.params[0] = TriggerParam.type_int;
	TriggerCondition.UnitOwner.params[1] = TriggerParam.type_int;
	TriggerCondition.UnitOwner.check = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		if(u){
			return u.owner.id == p[1];
		}
		return false;
	}
	TriggerCondition.UnitOwner.getText = function(p){return `Unit ${p[0]} is owned by player ${p[1]}.`;}
	
	TriggerCondition.UnitType = new TriggerCondition("UnitType");
	TriggerCondition.UnitType.params[0] = TriggerParam.type_int;
	TriggerCondition.UnitType.params[1] = TriggerParam.type_unitType;
	TriggerCondition.UnitType.check = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		var type = UnitPrototype.getById(p[1]);
		if(u && type){
			return u.proto == type;
		}
		return false;
	}
	TriggerCondition.UnitType.getText = function(p){
		var type = UnitPrototype.getById(p[1]);
		return `Unit ${p[0]} type is ${type.name}.`;}
		
		TriggerCondition.DistanceToUnit = new TriggerCondition("DistanceToUnit");
	TriggerCondition.DistanceToUnit.params[0] = TriggerParam.type_int;
	TriggerCondition.DistanceToUnit.params[1] = TriggerParam.type_int;
	TriggerCondition.DistanceToUnit.params[2] = TriggerParam.type_relation;
	TriggerCondition.DistanceToUnit.params[3] = TriggerParam.type_float;
	TriggerCondition.DistanceToUnit.check = function(p){
		var u1 = Trigger.Tags[p[0]].getOwnerUnit();
		var u2 = Trigger.Tags[p[1]].getOwnerUnit();
		if(u1&&u2){
			return  TriggerParam.Relations[p[2]].func(Unit_Distance(u1,u2),p[3]);
		}
		return false;
	}
	TriggerCondition.DistanceToUnit.getText = function(p){
		var relation = TriggerParam.Relations[p[2]].name;
		return `Unit${p[0]} to Unit${p[1]} distance ${relation}${p[3]}.`;}
		
	TriggerCondition.DistanceToPoint = new TriggerCondition("DistanceToPoint");
	TriggerCondition.DistanceToPoint.params[0] = TriggerParam.type_int;
	TriggerCondition.DistanceToPoint.params[1] = TriggerParam.type_int;
	TriggerCondition.DistanceToPoint.params[2] = TriggerParam.type_relation;
	TriggerCondition.DistanceToPoint.params[3] = TriggerParam.type_float;
	TriggerCondition.DistanceToPoint.check = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		var p = Trigger.CameraPoints[p[1]];
		if(u&&p){
			return  TriggerParam.Relations[p[2]].func(Unit_Distance(u,p),p[3]);
		}
		return false;
	}
	TriggerCondition.DistanceToPoint.getText = function(p){
		var relation = TriggerParam.Relations[p[2]].name;
		return `Unit${p[0]} to Point${p[1]} distance ${relation}${p[3]}.`;}
		
	TriggerCondition.GarrisonCount = new TriggerCondition("GarrisonCount");
	TriggerCondition.GarrisonCount.params[0] = TriggerParam.type_int;
	TriggerCondition.GarrisonCount.params[1] = TriggerParam.type_relation;
	TriggerCondition.GarrisonCount.params[2] = TriggerParam.type_int;
	TriggerCondition.GarrisonCount.check = function(p){
			var u = Trigger.Tags[p[0]].getOwnerUnit();
			if(u && u.garrisonArray){
				return TriggerParam.Relations[p[1]].func(u.garrisonArray.length,p[2]);
			}
			return false;
		}
	TriggerCondition.GarrisonCount.getText = function(p){
		var relation = TriggerParam.Relations[p[1]].name;
		return `Unit${p[0]}'s garrison count ${relation} ${p[2]}`;}
		
	TriggerCondition.GroupDead = new TriggerCondition("GroupDead");
	TriggerCondition.GroupDead.params[0] = TriggerParam.type_int;
	TriggerCondition.GroupDead.check = function(p){
			var group = Trigger.Unit_Groups[p[0]];
			if(!group || group.length < 1){return false;}
			for(var i=0;i<group.length;++i){
				if(group[i].alive){return false;}
			}
			return true;
		}
	TriggerCondition.GroupDead.getText = function(p){return `Group ${p[0]} has no living members.`;}
	
	TriggerCondition.ObjectiveValue = new TriggerCondition("ObjectiveValue");
	TriggerCondition.ObjectiveValue.params[0] = TriggerParam.type_int;
	TriggerCondition.ObjectiveValue.params[1] = TriggerParam.type_function;
	TriggerCondition.ObjectiveValue.params[2] = TriggerParam.type_relation;
	TriggerCondition.ObjectiveValue.check = function(p){
		var obj = Trigger.Objectives[p[0]];
		var checkVal = TriggerFunction.giveResult(p[1]);
		if(obj){
			return TriggerParam.Relations[p[2]].func(Trigger.Objectives[p[0]].value, checkVal);
		}
		return false;
	}
	TriggerCondition.ObjectiveValue.getText = function(p){
		var relation = TriggerParam.Relations[p[2]].name;
		return `Objective ${p[0]} value ${relation} (${TriggerFunction.giveText(p[1])})`;}
		
	TriggerCondition.TimerValue = new TriggerCondition("TimerValue");
	TriggerCondition.TimerValue.params[0] = TriggerParam.type_int;
	TriggerCondition.TimerValue.params[1] = TriggerParam.type_int;
	TriggerCondition.TimerValue.params[2] = TriggerParam.type_relation;
	TriggerCondition.TimerValue.check = function(p){
		return TriggerParam.Relations[p[2]].func(Trigger.Timers[p[0]], p[1]);
	}
	TriggerCondition.TimerValue.getText = function(p){
		var relation = TriggerParam.Relations[p[2]].name;
		return `Timer ${p[0]} value ${relation} ${p[1]} (${fixed1(p[1]/30)} s).`;}
	
	TriggerCondition.PoiOwner = new TriggerCondition("PoiOwner");
	TriggerCondition.PoiOwner.params[0] = TriggerParam.type_int;
	TriggerCondition.PoiOwner.params[1] = TriggerParam.type_int;
	TriggerCondition.PoiOwner.check = function(p){
		var pt = AI.Points[p[0]];
		if(pt){
			return pt.controllerId == p[1];
		}
		return false;
	}
	TriggerCondition.PoiOwner.getText = function(p){return `POI ${p[0]} is controlled by player ${p[1]}.`;}
	
	TriggerCondition.KillerOwner = new TriggerCondition("KillerOwner");
	TriggerCondition.KillerOwner.params[0] = TriggerParam.type_int;
	TriggerCondition.KillerOwner.params[1] = TriggerParam.type_int;
	TriggerCondition.KillerOwner.check = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		if(u && !u.alive){
			if(u.last_hurter){
				return u.last_hurter.owner.id == p[1];
			}
		}
		return false;
	}
	TriggerCondition.KillerOwner.getText = function(p){return `Unit ${p[0]} was killed by player ${p[1]}.`;}
	
	TriggerCondition.Comparison = new TriggerCondition("Comparison");
	TriggerCondition.Comparison.params[0] = TriggerParam.type_function;
	TriggerCondition.Comparison.params[1] = TriggerParam.type_function;
	TriggerCondition.Comparison.params[2] = TriggerParam.type_relation;
	TriggerCondition.Comparison.check = function(p){
		var val1 = TriggerFunction.giveResult(p[0]);
		var val2 = TriggerFunction.giveResult(p[1]);
		return TriggerParam.Relations[p[2]].func(val1,val2);
	}
	TriggerCondition.Comparison.getText = function(p){
		var relation = TriggerParam.Relations[p[2]].name;
		return `(${TriggerFunction.giveText(p[0])}) ${relation} (${TriggerFunction.giveText(p[1])})`;}
	
	TriggerCondition.Difficulty = new TriggerCondition("Difficulty");
	TriggerCondition.Difficulty.params[0] = TriggerParam.type_int;
	TriggerCondition.Difficulty.check = function(p){
		var diff = p[0]<=0?0:1;
		return Gamestats.difficulty == p[0];
	}
	TriggerCondition.Difficulty.getText = function(p){return `Game difficulty ${p[0]<=0?"EASY":"HARD"}`;}
	
	/*TriggerCondition.GlobalVariable = new TriggerCondition("GlobalVariable");
	TriggerCondition.GlobalVariable.params[0] = TriggerParam.type_int;
	TriggerCondition.GlobalVariable.params[1] = TriggerParam.type_int;
	TriggerCondition.GlobalVariable.params[2] = TriggerParam.type_relation;
	TriggerCondition.GlobalVariable.check = function(p){
		return TriggerParam.Relations[p[2]].func(Trigger.globalVariables[p[0]] , p[1]);
	}
	TriggerCondition.GlobalVariable.getText = function(p){
		var relation = TriggerParam.Relations[p[2]].name;
		return `GlobalVar ${p[0]} ${relation} ${p[1]}.`;}*/
	
	//ACTIONS
	TriggerAction.IfThenElse = new TriggerAction("IfThenElse");
	TriggerAction.IfThenElse.params[0] = TriggerParam.type_condition;
	TriggerAction.IfThenElse.params[1] = TriggerParam.type_int;
	TriggerAction.IfThenElse.params[2] = TriggerParam.type_int;
	TriggerAction.IfThenElse.repeatOnLoad = false;
	TriggerAction.IfThenElse.execute = function(p){
		if(TriggerCondition.getById(p[0][0]).check(p[0][1])){
			var trig = Trigger.list[p[1]];
			if( trig && !trig.triggered ){
				trig.fire();
			}
		}else if(p[2]>=0){
			var trig = Trigger.list[p[2]];
			if( trig && !trig.triggered ){
				trig.fire();
			}
		}
	}
	TriggerAction.IfThenElse.getText = function(p){
		return "If "+ this.params[0].getText(p[0])+" then "
		+ (Trigger.list[p[1]]?Trigger.list[p[1]].name:"nothing") +" else " 
		+ (Trigger.list[p[2]]?Trigger.list[p[2]].name:"nothing");}
		
	TriggerAction.LiftSector = new TriggerAction("LiftSector");
	TriggerAction.LiftSector.params[0] = TriggerParam.type_int;
	TriggerAction.LiftSector.params[1] = TriggerParam.type_float;
	TriggerAction.LiftSector.params[2] = TriggerParam.type_float;
	TriggerAction.LiftSector.execute = function(p){
		var sec = NavSector.getById(p[0]);
		var offset = p[1] == 0? sec.doorZ : p[1];
		var speed = p[2] == 0?sec.zOffset_speed:p[2];
		var soundPitch = speed*25 / Math.abs(offset - sec.zOffset);
		if(offset > 0){
			sec.playSound(SoundObject.gate, soundPitch);
		}else{
			if(speed < 0.01){
				SoundObject.soulfire.play(0,0, 0.5, 1);
			}else{
				sec.playSound(SoundObject.gate_close, soundPitch);
			}
		}
		sec.close_time = -1;
		sec.elevate( offset, speed );
	}
	TriggerAction.LiftSector.getText = function(p){return `Lift Sector ${p[0]} to ${p[1]}, speed ${p[2]}`;}
	
	TriggerAction.ChangeTexture = new TriggerAction("ChangeTexture");
	TriggerAction.ChangeTexture.params[0] = TriggerParam.type_int;
	TriggerAction.ChangeTexture.params[1] = TriggerParam.type_int;
	TriggerAction.ChangeTexture.execute = function(p){
		var sec = NavSector.getById(p[0]);
		sec.use_triggered_textures = p[1]?true:false;
	}
	TriggerAction.ChangeTexture.getText = function(p){return `Change Sector ${p[0]} switch textures to ${p[1]}`;}
	
	TriggerAction.KillUnit = new TriggerAction("KillUnit");
	TriggerAction.KillUnit.params[0] = TriggerParam.type_int;
	TriggerAction.KillUnit.execute = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit()
		if(u){u.Hurt(99999, u)}
	}
	TriggerAction.KillUnit.getText = function(p){return `Kill Unit ${p[0]}`;}
 
	
	TriggerAction.GiveMoney = new TriggerAction("GiveMoney");
	TriggerAction.GiveMoney.params[0] = TriggerParam.type_int;
	TriggerAction.GiveMoney.params[1] = TriggerParam.type_int;
	TriggerAction.GiveMoney.execute = function(p){
		var player = Players[p[0]];
		if(player){
			player.money = Math.max(0, player.money + p[1]);
		}
	}
	TriggerAction.GiveMoney.getText = function(p){return `Give Player${p[0]} ${p[1]} money`;}
	
	TriggerAction.CastAbilityUnit = new TriggerAction("CastAbilityUnit");
	TriggerAction.CastAbilityUnit.params[0] = TriggerParam.type_int;
	TriggerAction.CastAbilityUnit.params[1] = TriggerParam.type_ability;
	TriggerAction.CastAbilityUnit.params[2] = TriggerParam.type_int;
	TriggerAction.CastAbilityUnit.execute = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		if(u && u.alive){
			var ab = Ability.list[p[1]];
			if(ab){
				var targetUnit = Trigger.Tags[p[2]].getOwnerUnit();
				if(targetUnit&&targetUnit.alive){
					Move_Issued_Single(u,targetUnit,ab);
				}
			}
		}
	}
	TriggerAction.CastAbilityUnit.getText = function(p){
		var ab = Ability.list[p[1]];
		if(ab){
			return `Unit ${p[0]} cast ${ab.name} on unit ${p[2]}`;
		}return "INVALID ABILITY";
	}
	TriggerAction.CastAbilityPoint = new TriggerAction("CastAbilityPoint");
	TriggerAction.CastAbilityPoint.params[0] = TriggerParam.type_int;
	TriggerAction.CastAbilityPoint.params[1] = TriggerParam.type_ability;
	TriggerAction.CastAbilityPoint.params[2] = TriggerParam.type_int;
	TriggerAction.CastAbilityPoint.execute = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		if(u && u.alive){
			var ab = Ability.list[p[1]];
			if(ab){
				var point = Trigger.CameraPoints[p[2]];
				if(point){
					Move_Issued_Single(u,new AbilityTargetDummyUnit(point.x,point.y),ab);
				}
			}
		}
	}
	TriggerAction.CastAbilityPoint.getText = function(p){
		var ab = Ability.list[p[1]];
		if(ab){
			return `Unit ${p[0]} cast ${ab.name} on point ${p[2]}`;
		}return "INVALID ABILITY";
	}
	
	TriggerAction.Hint = new TriggerAction("Hint");
	TriggerAction.Hint.params[0] = TriggerParam.type_int;
	TriggerAction.Hint.execute = function(p){
		GUI.HintPanel.addHint(Gamestats.getHintText(p[0]));
	}
	TriggerAction.Hint.getText = function(p){return `Hint ${Gamestats.getHintText(p[0])}`;}
	
	TriggerAction.GarrisonSpawn = new TriggerAction("GarrisonSpawn");
	TriggerAction.GarrisonSpawn.params[0] = TriggerParam.type_int;
	TriggerAction.GarrisonSpawn.params[1] = TriggerParam.type_unitType;
	TriggerAction.GarrisonSpawn.params[2] = TriggerParam.type_int;
	TriggerAction.GarrisonSpawn.execute = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		var player = Players[p[2]];
		if(u && Unit.hasGarrisonSpace(u) && player){
			var type = UnitPrototype.getById(p[1]);
			if(type.garrisonAliasType){
				if(type.stationary == false){
					//if the ungarrisoned type is given, replace it with garrisoned type
					type = type.garrisonAliasType;
				}
				var gu = Unit.Create(u.x , u.y , player, type );
				Unit.linkGarrison(u, gu);
			}
		}
	}
	TriggerAction.GarrisonSpawn.getText = function(p){return `Garrison in unit${p[0]} a ${UnitPrototype.getById(p[1]).name}) for player ${p[2]}`;}
	
	TriggerAction.DisableAbility = new TriggerAction("DisableAbility");
	TriggerAction.DisableAbility.params[0] = TriggerParam.type_int;
	TriggerAction.DisableAbility.params[1] = TriggerParam.type_ability;
	TriggerAction.DisableAbility.repeatOnLoad = true;
	TriggerAction.DisableAbility.execute = function(p){
		var ab = Ability.list[p[1]];
		if(ab){
			ab.disableForPlayer(p[0]);
		}
	}
	TriggerAction.DisableAbility.getText = function(p){
		var ab = Ability.list[p[1]];
		if(ab){
			return `Disable ${ab.name} for player ${p[0]}`;
		}
		return "INVALID ABILITY";
	}
	
	TriggerAction.SetAI = new TriggerAction("SetAI");
	TriggerAction.SetAI.params[0] = TriggerParam.type_int;
	TriggerAction.SetAI.params[1] = TriggerParam.type_ai;
	TriggerAction.SetAI.repeatOnLoad = true;
	TriggerAction.SetAI.execute = function(p){
		var player = Players[p[0]];
		var aiPersona = AIPersona.list[p[1]];
		if(player && aiPersona){
			player.makeAI(aiPersona);
		}
	}
	TriggerAction.SetAI.getText = function(p){
		var ai = AIPersona.list[p[1]];
		return `Set player ${p[0]} ai persona to ${ai.name}`;}
	
	TriggerAction.SetUnitName = new TriggerAction("SetUnitName");
	TriggerAction.SetUnitName.params[0] = TriggerParam.type_int;
	TriggerAction.SetUnitName.repeatOnLoad = true;
	TriggerAction.SetUnitName.params[1] = TriggerParam.type_string;
	TriggerAction.SetUnitName.execute = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		if(u){u.name = p[1];}
	}
	TriggerAction.SetUnitName.getText = function(p){return `Set unit ${p[0]} name to ${p[1]}`;}
	
	TriggerAction.ChangeOwner = new TriggerAction("ChangeOwner");
	TriggerAction.ChangeOwner.params[0] = TriggerParam.type_int;
	TriggerAction.ChangeOwner.params[1] = TriggerParam.type_int;
	TriggerAction.ChangeOwner.repeatOnLoad = true;
	TriggerAction.ChangeOwner.execute = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		if(u && u.alive){
			Unit.changeOwner(u, Players[p[1]]);
		}
	}
	TriggerAction.ChangeOwner.getText = function(p){return `Change owner of unit ${p[0]} to Player ${p[1]}.`;}
	
	
	TriggerAction.ChangeUnitType = new TriggerAction("ChangeUnitType");
	TriggerAction.ChangeUnitType.params[0] = TriggerParam.type_int;
	TriggerAction.ChangeUnitType.params[1] = TriggerParam.type_unitType;
	TriggerAction.ChangeUnitType.execute = function(p){
		Unit.changeType( Trigger.Tags[p[0]].getOwnerUnit(), UnitPrototype.getById(p[1]));
	}
	TriggerAction.ChangeUnitType.getText = function(p){return `Change unit ${p[0]} type to ${UnitPrototype.getById(p[1]).name})`;}

	TriggerAction.AddToGroup = new TriggerAction("AddToGroup");
	TriggerAction.AddToGroup.params[0] = TriggerParam.type_int;
	TriggerAction.AddToGroup.params[1] = TriggerParam.type_int;
	TriggerAction.AddToGroup.execute = function(p){
		var u = Trigger.Tags[p[1]].getOwnerUnit();
		if(Trigger.Unit_Groups[p[0]] && u){ //group exists
			if(Trigger.Unit_Groups[p[0]].indexOf(u) < 0)
			Trigger.Unit_Groups[p[0]].push(u);
		}
	}
	TriggerAction.AddToGroup.getText = function(p){return `Add unit ${p[1]} to group ${p[0]}`;}
	
	TriggerAction.CinematicMode = new TriggerAction("CinematicMode");
	TriggerAction.CinematicMode.params[0] = TriggerParam.type_int;
	TriggerAction.CinematicMode.repeatOnLoad = true;
	TriggerAction.CinematicMode.execute = function(p){
		Gamestats.setCinematicMode(p[0]>0);
	}
	TriggerAction.CinematicMode.getText = function(p){return `Set cinematic mode to ${p[0]}`;}
	
	TriggerAction.CamPoint = new TriggerAction("CamPoint");
	TriggerAction.CamPoint.params[0] = TriggerParam.type_int;
	TriggerAction.CamPoint.params[1] = TriggerParam.type_int;
	TriggerAction.CamPoint.repeatOnLoad = true;
	TriggerAction.CamPoint.execute = function(p){
		if(p[0] >= 0 && p[0] < Trigger.CameraPoints.length){
			cam.apply_point(Trigger.CameraPoints[p[0]], p[1]);
		}else{
			cam.apply_point(null, p[1]);
		}
	}
	TriggerAction.CamPoint.getText = function(p){return `Apply camera point ${p[0]} over ${p[1]} ticks`;}
	
	TriggerAction.Speech = new TriggerAction("Speech");
	TriggerAction.Speech.params[0] = TriggerParam.type_string; //name, leave empty for default portrait name
	TriggerAction.Speech.params[1] = TriggerParam.type_string; //content
	TriggerAction.Speech.params[2] = TriggerParam.type_portrait; //portrait
	TriggerAction.Speech.params[3] = TriggerParam.type_int; //duration
	TriggerAction.Speech.params[4] = TriggerParam.type_voice;
	TriggerAction.Speech.execute = function(p){
		GUI.DialogPanel.setVisibility(true);
		GUI.DialogPanel.timer = p[3];
		var newPortrait = Portrait.list[p[2]];
		if(p[0]&&p[0].length > 1){
			GUI.DialogPanel.titleElem.setText(p[0]);
		}else{
			GUI.DialogPanel.titleElem.setText(newPortrait.name);
		}
		
		GUI.DialogPanel.setText(p[1])
		GUI.DialogPanel.portrait.setPortrait(newPortrait);
		
		SoundObject.phonemeSource = SoundObject.getVoiceByName( p[4] );
		if(SoundObject.phonemeSource){
			SoundObject.startPhonemeText( p[1], 0.5);
			GUI.DialogPanel.portrait.speechTime = p[3];
		}
			
		/*if( p > 0 ){ //using a sound clip
			var clip = SoundObject.playVoice(p[4]);
			if(clip){
				GUI.DialogPanel.portrait.speechTime = Math.floor(clip.duration()*60);
			}
		}else{
			GUI.DialogPanel.silenceTime = p[3]*0.5;
		}*/
	}
	TriggerAction.Speech.getText = function(p){return `${p[0]} speaks for ${p[3]} ticks (${fixed1(p[3]/30)}s)`;}
	
	TriggerAction.MeshMotion = new TriggerAction("MeshMotion");
	TriggerAction.MeshMotion.params[0] = TriggerParam.type_int;
	TriggerAction.MeshMotion.params[1] = TriggerParam.type_int;
	TriggerAction.MeshMotion.execute = function(p){
		var mesh = NavNode.Colliders[p[0]];
		if(mesh){
			mesh.motion_function = Actor.get_motion_function(p[1]);
		}
	}
	TriggerAction.MeshMotion.getText = function(p){return `Mesh${p[0]} motion = function${p[1]}`;}
	
	TriggerAction.CustomHint = new TriggerAction("CustomHint");
	TriggerAction.CustomHint.params[0] = TriggerParam.type_string;
	TriggerAction.CustomHint.execute = function(p){
		GUI.HintPanel.addHint(p[0]);
	}
	TriggerAction.CustomHint.getText = function(p){return "Custom Hint";}
	
	TriggerAction.WalkToPoint = new TriggerAction("WalkToPoint");
	TriggerAction.WalkToPoint.params[0] = TriggerParam.type_int;
	TriggerAction.WalkToPoint.params[1] = TriggerParam.type_int;
	TriggerAction.WalkToPoint.execute = function(p){
		if(p[1] >= 0 && p[1] < Trigger.CameraPoints.length){
			var point = Trigger.CameraPoints[p[1]];
			var u = Trigger.Tags[p[0]].getOwnerUnit();
			if(u && u.alive){ Unit.Walk(u, point.x, point.y);}
		}
	}
	TriggerAction.WalkToPoint.getText = function(p){return `Unit ${p[0]} walks to point ${p[1]}`;}
	
	TriggerAction.WalkToUnit = new TriggerAction("WalkToUnit");
	TriggerAction.WalkToUnit.params[0] = TriggerParam.type_int;
	TriggerAction.WalkToUnit.params[1] = TriggerParam.type_int;
	TriggerAction.WalkToUnit.execute = function(p){
		var u1 = Trigger.Tags[p[0]].getOwnerUnit();
		var u2 = Trigger.Tags[p[1]].getOwnerUnit();
		if(u1 && u2){
			u1.setBaseTask(Task.Alone_Move_Task( u1, u2, u.movementAbility, true));
		}
	}
	TriggerAction.WalkToUnit.getText = function(p){return `Unit ${p[0]} walks to unit ${p[1]}`;}
	
	TriggerAction.LookAtUnit = new TriggerAction("LookAtUnit");
	TriggerAction.LookAtUnit.params[0] = TriggerParam.type_int;
	TriggerAction.LookAtUnit.params[1] = TriggerParam.type_int;
	TriggerAction.LookAtUnit.execute = function(p){
		var u1 = Trigger.Tags[p[0]].getOwnerUnit();
		var u2 = Trigger.Tags[p[1]].getOwnerUnit();
		if(u1&&u2){
			Unit.facePointSlow(u1,u2.x,u2.y);
		}
	}
	TriggerAction.LookAtUnit.getText = function(p){return `Unit ${p[0]} looks at unit ${p[1]}`;}
	
	TriggerAction.DisableTrigger = new TriggerAction("DisableTrigger");
	TriggerAction.DisableTrigger.params[0] = TriggerParam.type_int;
	//TriggerAction.DisableTrigger.repeatOnLoad = true;
	TriggerAction.DisableTrigger.execute = function(p){
		Trigger.list[p[0]].enabled = false;
	}
	TriggerAction.DisableTrigger.getText = function(p){return `Disable trigger ${p[0]} ${Trigger.list[p[0]].name}`;}
	
	TriggerAction.RunTrigger = new TriggerAction("RunTrigger");
	TriggerAction.RunTrigger.params[0] = TriggerParam.type_int;
	TriggerAction.RunTrigger.execute = function(p){
		var trig = Trigger.list[p[0]];
		if( trig && !trig.triggered ){
			trig.fire();
		}
	}
	TriggerAction.RunTrigger.getText = function(p){return `Run trigger ${p[0]} ${Trigger.list[p[0]].name}`;}
	
	TriggerAction.ResetTrigger = new TriggerAction("ResetTrigger");
	TriggerAction.ResetTrigger.params[0] = TriggerParam.type_int;
	TriggerAction.ResetTrigger.execute = function(p){
		var trig = Trigger.list[p[0]];
		if(trig){
			trig.reset();
		}
	}
	TriggerAction.ResetTrigger.getText = function(p){return `Reset trigger ${p[0]} ${Trigger.list[p[0]].name}`;}
	
	TriggerAction.RemoveUnit = new TriggerAction("RemoveUnit");
	TriggerAction.RemoveUnit.params[0] = TriggerParam.type_int;
	TriggerAction.RemoveUnit.execute = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		if(u){
			u.Remove();
		}
	}
	TriggerAction.RemoveUnit.getText = function(p){return `Delete unit ${p[0]}`;}
	
	TriggerAction.DisableAbility = new TriggerAction("DisableAbility");
	TriggerAction.DisableAbility.params[0] = TriggerParam.type_int;
	TriggerAction.DisableAbility.params[1] = TriggerParam.type_ability;
	TriggerAction.DisableAbility.execute = function(p){
		var ab = Ability.list[p[1]];
		if(ab){
			ab.disableForPlayer(p[0]);
		}
	}
	TriggerAction.DisableAbility.getText = function(p){
		var ab = Ability.list[p[1]];
		if(ab){
			return `Disable ${ab.name} for player ${p[0]}`;
		}
		return "INVALID ABILITY";
	}
	
	TriggerAction.SetTeam = new TriggerAction("SetTeam");
	TriggerAction.SetTeam.params[0] = TriggerParam.type_int;
	TriggerAction.SetTeam.params[1] = TriggerParam.type_int;
	TriggerAction.SetTeam.repeatOnLoad = true;
	TriggerAction.SetTeam.execute = function(p){
		if(Players[p[0]]){
			Players[p[0]].setTeam(p[1]);
		}
	}
	TriggerAction.SetTeam.getText = function(p){return `Set player ${p[0]}'s team to ${p[1]}`;}
	
	TriggerAction.SetObjective = new TriggerAction("SetObjective");
	TriggerAction.SetObjective.params[0] = TriggerParam.type_int;
	TriggerAction.SetObjective.params[1] = TriggerParam.type_string;
	TriggerAction.SetObjective.params[2] = TriggerParam.type_string;
	TriggerAction.SetObjective.repeatOnLoad = true;
	TriggerAction.SetObjective.execute = function(p){
		var id = p[0];
		if(p[0]>=0){
			Trigger.Objectives[id] = new Objective(p[1],p[2]);
			GUI.ObjectivePanel.refresh();
		}
	}
	TriggerAction.SetObjective.getText = function(p){
		if(p[2].length>1){
			return `Objective ${p[0]}: ${p[1]}{param}${p[2]}`;
		}else{
			return `Objective ${p[0]}: ${p[1]}`;	
		}
	}
	
	TriggerAction.FinishObjective = new TriggerAction("FinishObjective");
	TriggerAction.FinishObjective.params[0] = TriggerParam.type_int;
	TriggerAction.FinishObjective.repeatOnLoad = true;
	TriggerAction.FinishObjective.execute = function(p){
		var id = p[0];
		if(Trigger.Objectives[id]){
			Trigger.Objectives[id].finished = true;
			GUI.ObjectivePanel.refresh();
		}
	}
	TriggerAction.FinishObjective.getText = function(p){return `Set objective ${p[0]} to finished`;}
	
	TriggerAction.ObjectiveAddValue = new TriggerAction("ObjectiveAddValue");
	TriggerAction.ObjectiveAddValue.params[0] = TriggerParam.type_int;
	TriggerAction.ObjectiveAddValue.params[1] = TriggerParam.type_function;
	TriggerAction.ObjectiveAddValue.execute = function(p){
		var id = p[0];
		if(Trigger.Objectives[id]){
			Trigger.Objectives[id].value += TriggerFunction.giveResult(p[1]);
			GUI.ObjectivePanel.refresh();
		}
	}
	TriggerAction.ObjectiveAddValue.getText = function(p){return `Increase Objective ${p[0]} value by ${TriggerFunction.giveText(p[1])}`;}
	
	TriggerAction.ObjectiveSetValue = new TriggerAction("ObjectiveSetValue");
	TriggerAction.ObjectiveSetValue.params[0] = TriggerParam.type_int;
	TriggerAction.ObjectiveSetValue.params[1] = TriggerParam.type_function;
	TriggerAction.ObjectiveSetValue.execute = function(p){
		var id = p[0];
		if(Trigger.Objectives[id]){
			Trigger.Objectives[id].value = TriggerFunction.giveResult(p[1]);
			GUI.ObjectivePanel.refresh();
		}
	}
	TriggerAction.ObjectiveSetValue.getText = function(p){return `Set Objective ${p[0]} param to (${TriggerFunction.giveText(p[1])})`;}
	
	TriggerAction.SetTimer = new TriggerAction("SetTimer");
	TriggerAction.SetTimer.params[0] = TriggerParam.type_int;
	TriggerAction.SetTimer.params[1] = TriggerParam.type_int;
	TriggerAction.SetTimer.execute = function(p){
		Trigger.Timers[p[0]] = p[1];
	}
	TriggerAction.SetTimer.getText = function(p){return `Set timer ${p[0]} to ${p[1]} ticks (${fixed1(p[1]/30)} s)`;}
	
	TriggerAction.ShowTimer = new TriggerAction("ShowTimer");
	TriggerAction.ShowTimer.params[0] = TriggerParam.type_int;
	TriggerAction.ShowTimer.params[1] = TriggerParam.type_string;
	TriggerAction.ShowTimer.repeatOnLoad = true;
	TriggerAction.ShowTimer.execute = function(p){
		var panel = GUI.TimerPanelClass.getById(p[0]);
		if(panel){
			panel.titleText.setText(p[1])
			panel.setVisibility(true);
		}else{
			panel = GUI.TimerPanelClass.Create(p[1]);
		}
		panel.timerId = p[0];
	}
	TriggerAction.ShowTimer.getText = function(p){return `Show timer ${p[0]} with title ${p[1]}`;}
	
	TriggerAction.HideTimer = new TriggerAction("HideTimer");
	TriggerAction.HideTimer.params[0] = TriggerParam.type_int;
	TriggerAction.HideTimer.repeatOnLoad = true;
	TriggerAction.HideTimer.execute = function(p){
		var panel = GUI.TimerPanelClass.getById(p[0]);
		if(panel){
			panel.destroy();
		}
	}
	TriggerAction.HideTimer.getText = function(p){return `Hide timer ${p[0]}`;}
	
	TriggerAction.Victory= new TriggerAction("Victory");
	TriggerAction.Victory.repeatOnLoad = true;
	TriggerAction.Victory.execute = function(p){
		Gamestats.Victory();
	}
	TriggerAction.Victory.getText = function(p){return `Victory`;}
	
	TriggerAction.Defeat= new TriggerAction("Defeat");
	TriggerAction.Defeat.repeatOnLoad = true;
	TriggerAction.Defeat.execute = function(p){
		Gamestats.Defeat();
	}
	TriggerAction.Defeat.getText = function(p){return `Defeat`;}
	
	TriggerAction.ExitZone = new TriggerAction("ExitZone");
	TriggerAction.ExitZone.params[0] = TriggerParam.type_string;
	TriggerAction.ExitZone.execute = function(p){
		Gamestats.ExitZone(p[0],-1,-1);
	}
	TriggerAction.ExitZone.getText = function(p){return `Exit to level ${p[0]}.`;}
	
	TriggerAction.Ping = new TriggerAction("Ping");
	TriggerAction.Ping.params[0] = TriggerParam.type_int;
	TriggerAction.Ping.execute = function(p){
		var cp = Trigger.CameraPoints[p[0]];
		if(cp){
			GUI.Minimap_InGame.ping(cp.x,cp.y,GUI.textColor_reflect);
		}	
	}
	TriggerAction.Ping.getText = function(p){
		return `Ping point ${p[0]}`;}
	
	TriggerAction.KillGroup = new TriggerAction("KillGroup");
	TriggerAction.KillGroup.params[0] = TriggerParam.type_int;
	TriggerAction.KillGroup.execute = function(p){
		var group = Trigger.Unit_Groups[p[0]];
		if(group){
			for(var i=0;i<group.length;++i){
				group[i].Die();
			}
		}
	}
	TriggerAction.KillGroup.getText = function(p){return `Kill UnitGroup ${p[0]}`;}
	
	TriggerAction.KillPlayer = new TriggerAction("KillPlayer");
	TriggerAction.KillPlayer.params[0] = TriggerParam.type_int;
	TriggerAction.KillPlayer.execute = function(p){
		var player = Players[p[0]];
		for(var i=0;i<Units.length;++i){
			if(Units[i].owner == player){
				Units[i].Die();
			}
		}
	}
	TriggerAction.KillPlayer.getText = function(p){return `Kill all units from Player ${p[0]}.`;}
	
	TriggerAction.AddWalkPoint = new TriggerAction("AddWalkPoint");
	TriggerAction.AddWalkPoint.params[0] = TriggerParam.type_int;
	TriggerAction.AddWalkPoint.params[1] = TriggerParam.type_int;
	TriggerAction.AddWalkPoint.execute = function(p){
		if(p[1] >= 0 && p[1] < Trigger.CameraPoints.length){
			var point = Trigger.CameraPoints[p[1]];
			var u = Trigger.Tags[p[0]].getOwnerUnit();
			if(u.hasTurret){
				if(u){u.addSubTask(Task.Alone_Move_Task( u, point, u.moveAbility, false)); }
			}else{
				if(u){u.addSubTask(Task.Alone_Move_Task( u, point, u.attackAbility, true)); }
			}
			
		}
	}
	TriggerAction.AddWalkPoint.getText = function(p){return `Add point ${p[1]} to path of Unit ${p[0]}`;}
	
	TriggerAction.ObjectiveButton = new TriggerAction("ObjectiveButton");
	TriggerAction.ObjectiveButton.params[0] = TriggerParam.type_int;
	TriggerAction.ObjectiveButton.params[1] = TriggerParam.type_string;
	TriggerAction.ObjectiveButton.params[2] = TriggerParam.type_int;
	TriggerAction.ObjectiveButton.params[3] = TriggerParam.type_int;
	TriggerAction.ObjectiveButton.repeatOnLoad = true;
	TriggerAction.ObjectiveButton.execute = function(p){
		var id = p[0];
		if(Trigger.Objectives[id]){
			GUI.ObjectivePanel.addHintButton(id,p[1],p[2],p[3])
		}
	}
	TriggerAction.ObjectiveButton.getText = function(p){return `Add button to Obj${p[0]},name ${p[1]} callback ${p[2]}, condition ${p[3]}`;}
	
	TriggerAction.SetUnitHp = new TriggerAction("SetUnitHp");
	TriggerAction.SetUnitHp.params[0] = TriggerParam.type_int;
	TriggerAction.SetUnitHp.params[1] = TriggerParam.type_int;
	TriggerAction.SetUnitHp.execute = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		if(u && u.alive){
			u.hp = p[1];
		}
	}
	TriggerAction.SetUnitHp.getText = function(p){
		return `Set unit ${p[0]} life to ${p[1]}`;}
		
	TriggerAction.Acceleration = new TriggerAction("Acceleration");
	TriggerAction.Acceleration.params[0] = TriggerParam.type_float;
	TriggerAction.Acceleration.repeatOnLoad = true;
	TriggerAction.Acceleration.execute = function(p){
		Gamestats.acceleration = p[0];
	}
	TriggerAction.Acceleration.getText = function(p){
		return `Set world acceleration to ${p[0]}`;}
	
	TriggerAction.StopUnit = new TriggerAction("StopUnit");
	TriggerAction.StopUnit.params[0] = TriggerParam.type_int;
	TriggerAction.StopUnit.execute = function(p){
		var u = Trigger.Tags[p[0]].getOwnerUnit();
		if(u && u.alive){
			u.Stop();
		}
	}
	TriggerAction.StopUnit.getText = function(p){
		return `Stop unit${p[0]}`;}

	TriggerAction.Upgrade = new TriggerAction("Upgrade");
	TriggerAction.Upgrade.params[0] = TriggerParam.type_int;
	TriggerAction.Upgrade.params[1] = TriggerParam.type_upgrade;
	TriggerAction.Upgrade.repeatOnLoad = false;
	TriggerAction.Upgrade.execute = function(p){
		var player = Players[p[0]];
		var up = Upgrade.getById(p[1])
		if(player && up){
			up.apply(p[0], false);
		}
	}
	TriggerAction.Upgrade.getText = function(p){
		return `Player ${p[0]} upgrades ${Upgrade.getById(p[1]).name}`;}
	
	/*TriggerAction.GlobalVarAdd = new TriggerAction("GlobalVarAdd");
	TriggerAction.GlobalVarAdd.params[0] = TriggerParam.type_int;
	TriggerAction.GlobalVarAdd.params[1] = TriggerParam.type_int;
	TriggerAction.GlobalVarAdd.repeatOnLoad = true;
	TriggerAction.GlobalVarAdd.execute = function(p){
		Trigger.globalVariables[p[0]] += p[1];
	}
	TriggerAction.GlobalVarAdd.getText = function(p){
		return `Add p[1] to GlobalVariable ${p[0]}`;}
		
	TriggerAction.GlobalVarSet = new TriggerAction("GlobalVarSet");
	TriggerAction.GlobalVarSet.params[0] = TriggerParam.type_int;
	TriggerAction.GlobalVarSet.params[1] = TriggerParam.type_int;
	TriggerAction.GlobalVarSet.repeatOnLoad = true;
	TriggerAction.GlobalVarSet.execute = function(p){
		Trigger.globalVariables[p[0]] = p[1];
	}
	TriggerAction.GlobalVarSet.getText = function(p){
		return `Set GlobalVariable ${p[0]} to ${p[1]}`;}*/
	
	TriggerFunction.Integer = new TriggerFunction("Integer");
	TriggerFunction.Integer.params[0] = TriggerParam.type_int;
	TriggerFunction.Integer.func = function(p){
		return p[0];
	}
	TriggerFunction.Integer.getText = function(p){
		return `${p[0]}`;}
	
	TriggerFunction.PlayerMoney = new TriggerFunction("PlayerMoney");
	TriggerFunction.PlayerMoney.params[0] = TriggerParam.type_int;
	TriggerFunction.PlayerMoney.func = function(p){
		//var playerId = TriggerFunction.getById(p[0][0]).func(p[0][1]);
		var player = Players[p[0]];
		return player?player.money:0;
	}
	TriggerFunction.PlayerMoney.getText = function(p){
		return `Player${p[0]}'s money`;}
		
	TriggerFunction.PlayerCoin = new TriggerFunction("PlayerCoin");
	TriggerFunction.PlayerCoin.params[0] = TriggerParam.type_int;
	TriggerFunction.PlayerCoin.func = function(p){
		var player = Players[p[0]];
		return player?player.coin:0;
	}
	TriggerFunction.PlayerCoin.getText = function(p){
		return `Player${p[0]}'s coin`;}
		
	TriggerFunction.TypeKills = new TriggerFunction("TypeKills");
	TriggerFunction.TypeKills.params[0] = TriggerParam.type_int;
	TriggerFunction.TypeKills.params[1] = TriggerParam.type_unitType;
	TriggerFunction.TypeKills.func = function(p){
		//var playerId = TriggerFunction.getById(p[0][0]).func(p[0][1]);
		var playerId = p[0];
		var player = Players[playerId];
		var type = UnitPrototype.getById(p[1]);
		if(player&&type){
			return type.playerKills[playerId];
		}
		return 0;
	}
	TriggerFunction.TypeKills.getText = function(p){
		var typeName = UnitPrototype.getById(p[1]).name;
		return `Player${p[0]}'s kills of ${typeName}`;}
		
	TriggerFunction.POIsOwned = new TriggerFunction("POIsOwned");
	TriggerFunction.POIsOwned.params[0] = TriggerParam.type_int;
	TriggerFunction.POIsOwned.func = function(p){
		var playerId = p[0];
		var player = Players[playerId];
		if(player){
			var count = 0;
			for(var i=0;i<AI.Points.length;++i){
				if(AI.Points[i]&&AI.Points[i].isControlPoint && AI.Points[i].controllerId == p[0]){
					count ++;
				}
			}
			return count;
		}
		return 0;
	}
	TriggerFunction.POIsOwned.getText = function(p){
		return `Player${p[0]}'s n.o. control points`;}
		
	TriggerFunction.TypeOwned = new TriggerFunction("TypeOwned");
	TriggerFunction.TypeOwned.params[0] = TriggerParam.type_int;
	TriggerFunction.TypeOwned.params[1] = TriggerParam.type_unitType;
	TriggerFunction.TypeOwned.func = function(p){
		//var playerId = TriggerFunction.getById(p[0][0]).func(p[0][1]);
		var playerId = p[0];
		var player = Players[playerId];
		var type = UnitPrototype.getById(p[1]);
		if(player&&type){
			return type.playerCounts_born[playerId];
		}
		return 0;
	}
	TriggerFunction.TypeOwned.getText = function(p){
		var typeName = UnitPrototype.getById(p[1]).name;
		return `Player${p[0]}'s count of ${typeName}`;}
		
	TriggerFunction.PlayerStructures = new TriggerFunction("PlayerStructures");
	TriggerFunction.PlayerStructures.params[0] = TriggerParam.type_int;
	TriggerFunction.PlayerStructures.func = function(p){
		var player = Players[p[0]];
		return player?player.structures.length:0;
	}
	TriggerFunction.PlayerStructures.getText = function(p){
		return `Player${p[0]}'s number of structures`;}
		
	var defaultCamPoint = Actor.CameraPoint(null, null);
	for(var i=0;i<50;++i){
		Trigger.list[i]=new Trigger(i);
		Trigger.Tags[i] = new TriggerTag(i);
		Trigger.Tagged_Loot[i] = null;
		Trigger.Unit_Groups[i] = [];
	}
	Trigger.CameraPoints = [];
	Trigger.Timers = [0,0,0,0];
	Trigger.resetGlobalVariables();
	
	Actor.EndlessSpawnArea.initTypes();
}
Trigger.resetGlobalVariables = function(){
	Trigger.globalVariables = [];
	for(var i=0;i<50;++i){
		Trigger.globalVariables[i] = 0;
	}
}

Trigger.checkConditionByTriggerId = function(id){
	if(id < 0){
		return true;
	}
	return Trigger.list[id].condition();
}

Trigger.getSaveData = function(){
	var arr = [];
	for(var i=0;i<Trigger.list.length;++i){
		var tr = Trigger.list[i];
		var name = tr.name[0] == '#'? null : tr.name;
		arr.push([ name, tr.globalConditionId, tr.enableCondition.id, tr.enableParam, tr.actions]);
	}
	return arr;
}
Trigger.loadSavedData = function(data){
	for(var i=0;i<data.length;++i){
		var tr = Trigger.list[i];
		if(data[i][0] != null){
			tr.name = data[i][0];
		}
		tr.globalConditionId = data[i][1];
		tr.enableCondition = TriggerCondition.getById(data[i][2]);
		tr.enableParam = data[i][3];
		tr.actions = data[i][4];
	}
}
Trigger.getSaveState = function(){
	var data = [];
	for(var i=0;i<Trigger.list.length;++i){
		var tr = Trigger.list[i];
		if(tr.name[0] != '#' || tr.triggered || !tr.enabled || tr.age){
			//don't save unused triggers
			data.push([tr.id, tr.triggered?1:0, tr.age, tr.maxActionDelay, tr.enabled?1:0]);
		}
	}
	return data;
}
Trigger.loadSaveState = function(data){
	for(var i=0;i<data.length;++i){
		var d = data[i];
		var tr = Trigger.list[ d[0] ];
		tr.triggered = (d[1]>0)?true:false;
		tr.age = d[2];
		tr.maxActionDelay = d[3];
		tr.enabled = (d[4]>0)?true:false;
	}
}
Trigger.getActorSaveState = function(){
	var data = [];
	for(var i=0;i<Actors.length;++i){
		var a = Actors[i];
		if(a.isTriggerActor){
			data.push([
				a.triggered,
				a.timeLeft,
				a.fuseTimer,
				a.spawnPhase
			]);
		}
	}
	return data;
}

Trigger.loadActorSaveState = function(data){
	var triggerActorId = 0;
	for(var i=0;i<Actors.length;++i){
		var a = Actors[i];
		if(a.isTriggerActor){
			var d=data[triggerActorId];
			a.triggered = d[0];
			a.timeLeft = d[1];
			a.fuseTimer = d[2];
			a.spawnPhase = d[3];
			triggerActorId++;
		}
		if(triggerActorId >= data.length){
			break;
		}
	}
}

Trigger.getUnitGroupSaveSate = function(){
	var data = [];
	for(var i=0;i<Trigger.Unit_Groups.length;++i){
		var gr= Trigger.Unit_Groups[i];
		if( gr.length > 0){
			var grDat = [ i , [] ];
			for(var j=0;j<gr.length;++j){
				grDat[1].push(Units.indexOf(gr[j]));
			}
			data.push(grDat);
		}
	}
	return data;
}
Trigger.loadUnitGroupSaveSate = function(data){
	if(!data){return;}
	for(var i=0;i<data.length;++i){
		var gr = Trigger.Unit_Groups[ data[i][0]];
		var gr_ids = data[i][1];
		for(var j=0;j<gr_ids.length;++j){
			var u = Units[gr_ids[j]];
			if(u){
				gr.push( u );
			}
		}
	}
}

Trigger.loadActionHistory = function(data){
	this.actionHistory = [];
	for(var i=0;i<data.length;++i){
		var trig = Trigger.list[data[i][0]];
		trig.doAction(data[i][1]);
	}
}
Trigger.loadTimers = function(data){
	for(var i=0;i<data.length;++i){
		this.Timers[i] = data[i];
	}
}

Trigger.update = function(){
	for(var i=0;i<50;++i){
		Trigger.list[i].loop();
		Trigger.Tags[i].update();
	}
	for(var i=0;i<Trigger.Timers.length;++i){
		Trigger.Timers[i] = Math.max(0,Trigger.Timers[i]-1);
	}
}

Trigger.clearTags = function(){
	for(var i=0;i<this.Tags.length;++i){
		this.Tags[i].clear();
	}
}
Trigger.getColor = function(){
	var col = [Math.random(), Math.random(), Math.random()];
	//saturate colors
	var avg = 0.333*(col[0]+col[1]+col[2]);
	col[0] = col[0]*1.5 - avg*0.5;
	col[1] = col[1]*1.5 - avg*0.5;
	col[2] = col[2]*1.5 - avg*0.5;
	return col;
}

function TriggerTag(_id){
	this.id = _id;
	this.trigger = null; //will be set in Trigger.getTaggedUnits
	this.textElem = null;
	this.text = "tag: "+this.id;
	this.actor = null;
	this.setActor = function(a){
		if(this.actor != null){ //remove the tag from the pervious unit
			if(this.actor.owner != null && this.actor.owner != undefined && this.actor.owner.tagId == this.id){
				this.actor.owner.tagId = -1;
			}else if(this.actor.tagId == this.id){
				this.actor.tagId = -1;
			}
		}
		
		this.actor = a;
		if(this.textElem != null){
			this.textElem.removeFromGUI(GUI.Elements_Tags);
		}
		this.textElem = GUI.AddTagText(this, a.x,a.y,a.z, 10, this.text);
	}
	this.getOwnerUnit = function(){
		if(this.actor){
			return this.actor.owner;
		}else{return null;}
	}
	this.update = function(){
		if(this.actor != null && this.actor.isRemoved == true){
			this.clear();
		}
	}
	this.clear = function(){
		if(this.actor==null){return;}
		this.actor = null;
		if(this.textElem){
			this.textElem.removeFromGUI(GUI.Elements_Tags);
			this.textElem = null;
		}
	}
	this.isDead = function(){
		return (this.actor == null || this.actor.owner == undefined || this.actor.owner.alive == false);
	}
	this.isRescued = function(){
		if(this.actor != null){
			if(this.actor.owner.followUnit == Gamestats.Hero.follow_dummy){
				return true;
			}
		}
		return false;
	}
}
TriggerTag.prototype.getSpawner = function(){
	for(var i=0;i<Actors.length;++i){
		var a = Actors[i];
		if(a.spawnTag == this.id){
			return a;
		}
	}
	return null;
}
TriggerTag.getFirstUnused = function(){
	for(var i=1;i<Trigger.Tags.length;++i){
		if(Trigger.Tags[i].actor == null && Trigger.Tags[i].getSpawner() == null){
			return Trigger.Tags[i].id;
		}
	}
	return 1;
}
TriggerTag.focus = function(id){
	var a = Trigger.Tags[id].actor;
	if(!a){
		a = Trigger.Tags[id].getSpawner();
	}
	if(a){
		cam.pos_ref[0] = a.x;
		cam.pos_ref[1] = a.y;
		return;
	}
}

Trigger.getTaggedUnits = function(){
	Trigger.clearTags();
	for(var i=0;i<Units.length;++i){
		var u = Units[i];
		if(u.tagId >= 0){
			Trigger.Tags[ u.tagId ].setActor(u.actor);
		}
	}
}

Trigger.taggedUnitDeath = function(u){
	//Trigger.list[ u.tagId ].state = 2;
}

function Objective(text1, text2){
	this.text1 = text1;
	this.text2 = text2;
	this.value = 0;
	this.finished = false;
	this.displayed = false;//technical, used in GUI.ObjectivePanelClass
}
Objective.prototype.getText = function(){
	if(this.text2 && this.text2.length>1){
		return this.text1+this.value+this.text2;
	}else{
		return this.text1;
	}
}
Objective.getSaveState = function(){
	var dat = [];
	for(var i=0; i<Trigger.Objectives.length;++i){
		if(Trigger.Objectives[i]){
			dat[i] = Trigger.Objectives[i].value;
		}else{
			dat[i] = 0;
		}
	}
	return dat;
}
Objective.loadSaveState = function(data){
	if(!data){return;}
	for(var i=0;i<data.length;++i){
		if(Trigger.Objectives[i]){
			Trigger.Objectives[i].value = data[i];
		}
	}
	GUI.ObjectivePanel.refresh();
}

function TriggerCondition(name){
	this.id = Trigger.Conditions.length;
	this.name = name;
	Trigger.Conditions.push(this);
	this.check = Utils.FALSE;
	this.getText = function(){return "Never";}
	this.params = [];
}
TriggerCondition.prototype.getDefaultParams = function(){
	var p = [];
	for(var i=0;i<this.params.length;++i){
		p[i] = this.params[i].getDefault();
	}
	return p;
}
TriggerCondition.getById = function(id){
	return Trigger.Conditions[id];
}

function TriggerAction(name){
	this.id = Trigger.Actions.length;
	this.name = name;
	Trigger.Actions.push(this);
	this.execute = Utils.DO_NOTHING;
	this.repeatOnLoad = false;
	this.getText = function(){return "Nothing";}
	this.params = [];
}
TriggerAction.prototype.getDefaultParams = TriggerCondition.prototype.getDefaultParams;
TriggerAction.getById = function(id){
	return Trigger.Actions[id];
}

function TriggerFunction(name){
	this.id = Trigger.Functions.length;
	this.name = name;
	Trigger.Functions.push(this);
	this.func = Utils.TRUE;
	this.getText = function(){return "TRUE";}
	this.params = [];
}
TriggerFunction.prototype.getDefaultParams = TriggerCondition.prototype.getDefaultParams;
TriggerFunction.getById = function(id){
	return Trigger.Functions[id];
}
TriggerFunction.giveResult = function(triggerParam){
	return this.getById(triggerParam[0]).func(triggerParam[1]);
}
TriggerFunction.giveText = function(triggerParam){
	return this.getById(triggerParam[0]).getText(triggerParam[1]);
}

function TriggerParam(_name, _isComp){
	this.name = _name;
	this.isComposite = _isComp;
	this.noInput = false;
	this.customValue = 0;
	this.isNumeric = true;
	this.input_scale = 0;
	this.inputList = null;
	//if true, trigger inputs will be regenerated on changing the value
	this.getDefault = function(){
		return 0;
	}
	this.getText = function(p){
		return p;
	}
	//used for generating input gui of composite types
	this.getPrimitiveTypeList = function(p){
		return [this];
	}
	this.inputSetter = function(){
		this.paramArray[this.paramPos] = this.value;
	}
	this.inputGetter = function(){
		return this.paramArray[this.paramPos];
	}
}


TriggerParam.Init = function(){
	TriggerParam.type_int = new TriggerParam("int",false);
	TriggerParam.type_unsigned = new TriggerParam("uint",false);
	TriggerParam.type_float = new TriggerParam("float",false);
	
	TriggerParam.type_string = new TriggerParam("string",false);
	TriggerParam.type_string.isNumeric = false;
	TriggerParam.type_string.input_scale = 0.15;
	
	TriggerParam.type_trigger_id = new TriggerParam("trigger_id",false);
	//TriggerParam.type_trigger_id.getText = function(p){
	//	return Trigger.list[p].name;
	//}
	TriggerParam.type_point = new TriggerParam("point",true);
	TriggerParam.type_point.noInput = true;
	TriggerParam.type_point.getDefault = function(){
		return [0,0];
	}
	TriggerParam.type_point.getPrimitiveTypeList = function(p){
		return [TriggerParam.type_float,TriggerParam.type_float];
	}
	
	TriggerParam.type_condition = new TriggerParam("condition",true);
	TriggerParam.type_condition.inputList = Trigger.Conditions;
	TriggerParam.type_condition.getDefault = function(){
		return [0,[]];
	}
	TriggerParam.type_condition.getText = function(p){
		return ""+this.inputList[p[0]].getText(p[1])
	}
	TriggerParam.type_condition.getPrimitiveTypeList = function(p){
		//build a new composite param type on the fly, as a list of each condition's param types
		var type_paramList = new TriggerParam(null, true);
		type_paramList.customValue = p[0];
		type_paramList.noInput = true;
		type_paramList.inputList = this.inputList;
		type_paramList.getPrimitiveTypeList = function(){
			return this.inputList[this.customValue].params;
		}
		return [TriggerParam.type_condition_id, type_paramList ];
	}
	TriggerParam.type_condition.inputSetter = function(){
		var subCond_paramList = [];
		var subCond_paramTypeList = this.value.params;
		for(var i=0;i<subCond_paramTypeList.length;++i){
			subCond_paramList.push(subCond_paramTypeList[i].getDefault());
		}
		this.paramArray[this.paramPos] = [this.value.id, subCond_paramList ]
		GUI.TriggerParamPanelClass.Rebuild_ConditionPanel();
	}
	TriggerParam.type_condition.inputGetter = function(){
		return this.inputList[this.paramArray[this.paramPos][0]];
	}
	TriggerParam.type_condition_id = new TriggerParam("condition_id", false);
	TriggerParam.type_condition_id.noInput = true;
	
	TriggerParam.type_unitType = new TriggerParam("unitType", false);
	TriggerParam.type_unitType.inputList = UnitPrototype.Types;
	TriggerParam.type_unitType.input_scale = 0.1;
	TriggerParam.type_unitType.inputSetter = function(){
		this.paramArray[this.paramPos] = this.value.id;
	}
	TriggerParam.type_unitType.inputGetter = function(){
		return UnitPrototype.getById(this.paramArray[this.paramPos]);
	}
	
	TriggerParam.type_ability = new TriggerParam("ability", false);
	TriggerParam.type_ability.inputList = Ability.list;
	TriggerParam.type_ability.input_scale = 0.1;
	TriggerParam.type_ability.inputSetter = function(){
		this.paramArray[this.paramPos] = this.value.id;
	}
	TriggerParam.type_ability.inputGetter = function(){
		return  Ability.list[this.paramArray[this.paramPos]];
	}
	
	TriggerParam.type_upgrade = new TriggerParam("upgrade", false);
	TriggerParam.type_upgrade.inputList = Upgrade.list;
	TriggerParam.type_upgrade.input_scale = 0.1;
	TriggerParam.type_upgrade.inputSetter = function(){
		this.paramArray[this.paramPos] = this.value.id;
	}
	TriggerParam.type_upgrade.inputGetter = function(){
		return  Upgrade.list[this.paramArray[this.paramPos]];
	}
	
	TriggerParam.type_portrait = new TriggerParam("portrait", false);
	TriggerParam.type_portrait.inputList = Portrait.list;
	TriggerParam.type_portrait.input_scale = 0.05;
	TriggerParam.type_portrait.inputSetter = function(){
		this.paramArray[this.paramPos] = this.value.id;
	}
	TriggerParam.type_portrait.inputGetter = function(){
		return Portrait.list[this.paramArray[this.paramPos]];
	}
	
	
	TriggerParam.Relations = [];
	TriggerParam.Relations[0] = new TriggerParamRelation(0,">",function(a,b){return a>b;});
	TriggerParam.Relations[1] = new TriggerParamRelation(1,"<",function(a,b){return a<b;});
	TriggerParam.Relations[2] = new TriggerParamRelation(2,">=",function(a,b){return a>=b;});
	TriggerParam.Relations[3] = new TriggerParamRelation(3,"<=",function(a,b){return a<=b;});
	TriggerParam.Relations[4] = new TriggerParamRelation(4,"=",function(a,b){return a==b;});
	TriggerParam.Relations[5] = new TriggerParamRelation(5,"!=",function(a,b){return a!=b;});
	
	TriggerParam.type_relation = new TriggerParam("relation", false);
	TriggerParam.type_relation.inputList = TriggerParam.Relations;
	TriggerParam.type_relation.inputSetter = function(){
		this.paramArray[this.paramPos] = this.value.id;
	}
	TriggerParam.type_relation.inputGetter = function(){
		return TriggerParam.Relations[this.paramArray[this.paramPos]];
	}
	
	TriggerParam.type_voice = new TriggerParam("voice", false);
	TriggerParam.type_voice.inputList = SoundObject.Voices;
	TriggerParam.type_voice.input_scale = 0.05;
	TriggerParam.type_voice.inputSetter = function(){
		this.paramArray[this.paramPos] = this.value.name;
	}
	TriggerParam.type_voice.inputGetter = function(){
		return SoundObject.getVoiceByName(this.paramArray[this.paramPos]);
	}
	
	TriggerParam.type_ai = new TriggerParam("ai_persona", false);
	TriggerParam.type_ai.inputList = AIPersona.list;
	TriggerParam.type_ai.input_scale = 0.05;
	TriggerParam.type_ai.inputSetter = function(){
		this.paramArray[this.paramPos] = this.value.id;
	}
	TriggerParam.type_ai.inputGetter = function(){
		return AIPersona.list[this.paramArray[this.paramPos]];
	}
	
	TriggerParam.type_function = new TriggerParam("function",true);
	TriggerParam.type_function.inputList = Trigger.Functions;
	TriggerParam.type_function.getDefault = TriggerParam.type_condition.getDefault;
	TriggerParam.type_function.getText = TriggerParam.type_condition.getText;
	TriggerParam.type_function.getPrimitiveTypeList = TriggerParam.type_condition.getPrimitiveTypeList;
	TriggerParam.type_function.inputSetter = TriggerParam.type_condition.inputSetter;
	TriggerParam.type_function.inputGetter = TriggerParam.type_condition.inputGetter;
}

function TriggerParamRelation(id, name, func){
	this.id = id;
	this.name = name;
	this.func = func;
}

Actor.convertRot_to_triggerStuff = function(){
	this.rotX = Math.max(0, Math.round(this.rotX *10)/10);
	this.triggerId = Math.floor(this.rotX*10);
}


Actor.TriggerBaseActor = function(proto,_owner){
	var a = Actor.DoodadActor( proto, _owner);
	a.triggerId = 0;
	a.isTriggerActor = true;
	a.tint = [1,1,1];
	a.partitioned = false;
	a.remove = Actor.remove;
	a.convertRot_to_triggerStuff = Actor.convertRot_to_triggerStuff;
	
	a.update_gameloop = function(){
		this.nodraw = !Render.drawEditorHelpers && !Render.alwaysDrawSpawners;
	}
	
	return a;
}

Actor.TriggerCircle =  function( proto , _owner){
	var a = Actor.TriggerBaseActor( proto, _owner);
	a.triggerId = 0;
	a.triggerId_old = -1;
	a.conditionId = -1;
	
	a.update_gameloop = function(){
		this.nodraw = !Render.drawEditorHelpers && !Render.alwaysDrawSpawners;
		this.convertRot_to_triggerStuff();
		this.tint = Trigger.list[this.triggerId].color;
		//assign area to correct trigger if triggerId changes 
		if(this.triggerId_old != this.triggerId){
			if(this.triggerId_old>=0){
				var array = Trigger.list[this.triggerId_old].areas;
				array.splice(array.indexOf(this),1);
			}
			Trigger.list[this.triggerId].areas.push(this);
			this.triggerId_old = this.triggerId;
		}
		/*if(Trigger.checkConditionByTriggerId(this.conditionId) == true){
			if(Utils.distance_xxyy(Gamestats.Hero.x, this.x, Gamestats.Hero.y, this.y) < this.scale){
				Trigger.list[this.triggerId].state = 2;
			}
		}*/
	}
	
	a.remove_base = Actor.remove;
	a.remove = function(){
		var array = Trigger.list[this.triggerId].areas;
		array.splice(array.indexOf(this),1);
		this.triggerId=this.triggerId_old=-1;
		this.remove_base();
	}
	
	a.getDoodadSaveData = function(){
		return [this.proto.id, this.x, this.y, this.z, this.rotZ, this.scale, this.rotX, this.conditionId];
	}
	
	a.setDoodadLoadData = function(instData){
		this.rotZ = instData[4];
		this.scale = instData[5];
		this.rotX = instData[6];
		this.conditionId = instData[7];
	}
	a.getInfoText = function(){
		var str = "trig:"+Trigger.list[this.triggerId].name;
		if(this.conditionId > -1){
			str+= "\ncond:\n"+Trigger.list[this.conditionId].getConditionText();
		}
		return str;
	}
	return a;
}

/*Actor.TriggerJumpCircle = function( proto, _owner){
	var a = Actor.TriggerBaseActor( proto, _owner);
	a.nodraw = false;
	a.update_gameloop = function(){
		this.nodraw = !Render.drawEditorHelpers && !Render.alwaysDrawSpawners;
		if(Utils.distance_xxyy(Gamestats.Hero.x, this.x, Gamestats.Hero.y, this.y) < this.scale){
			if(Gamestats.Hero.jumpCountdown <=0){
				var jumpX = this.x + this.jumpDistance*Math.cos(-1.57-this.jumpDir);
				var jumpY = this.y + this.jumpDistance*Math.sin(-1.57-this.jumpDir);
				Gamestats.Hero.jumpTo(new Vector(jumpX ,jumpY, 0));
			}
		}
	}
	a.scale = 0.4;
	a.tint = Trigger.tint_upgradeCircle;
	a.getInfoText = function(){
		return Trigger.infoText_jump;
	}
	a.scalePhase = 0; a.extraScale = 0;
	a.pulseScale = 0.05;
	a.jumpDistance = 2;
	a.jumpDir = 0;
	a.helperModel = Asset.model.trigger_patrol;
	a.isJumpPoint = true;
	
	a.getDoodadSaveData = function(){
		return [this.proto.id, this.x, this.y, this.z, this.rotZ, this.scale,this.jumpDir, this.jumpDistance];
	}
	
	a.setDoodadLoadData = function(instData){
		this.rotZ = instData[4];
		this.scale = instData[5];
		this.jumpDir = instData[6];
		this.jumpDistance = instData[7];
	}
	return a;
}*/

Actor.update_drawloop_beacon = function(){
	this.scale -= this.extraScale;
	if(Control.gameState == Control.gameState_inGame){
		this.extraScale = Math.sin(this.scalePhase)*0.2;
	}else{
		this.extraScale = 0;
	}
	this.scalePhase += 0.05*Render.frameDelta;
	this.scale += this.extraScale;
	this.rotZ = (this.rotZ+0.02*Render.frameDelta)%6.283;
}

Actor.TriggerBeacon =  function( proto , _owner){
	var a = Actor.TriggerBaseActor( proto, _owner);
	a.triggerId = 0;
	a.convertRot_to_triggerStuff = Actor.convertRot_to_triggerStuff;
	a.tint = Trigger.tint_exitCircle;
	a.exitLevel = "maps/tutorial";
	a.exitLevelPos = [0,0];
	a.nodraw = false;
	a.pulseScale = 0.2;
	a.update_gameloop = function(){
		var cond = Trigger.list[this.triggerId].condition();
		a.nodraw = !cond && Control.gameState == Control.gameState_inGame;
		if(Gamestats.exitTrigger == this){
			Gamestats.exitTrigger = null;
		}
		this.convertRot_to_triggerStuff();
	}
	
	a.scalePhase = 0; a.extraScale = 0;
	a.update_drawloop = Actor.update_drawloop_beacon;
	
	a.getDoodadSaveData = function(){
		return [this.proto.id, this.x, this.y, this.z, this.rotZ, this.scale, this.rotX];
	}
	
	a.setDoodadLoadData = function(instData){
		this.rotZ = instData[4];
		this.scale = instData[5];
		this.rotX = instData[6];
	}
	a.getInfoText = function(){
		var str = "trig:"+Trigger.list[this.triggerId].name;
		return str;
	}
	return a;
}

Actor.TriggerSpawnArea =  function( proto , _owner){
	var a = Actor.TriggerBaseActor( proto, _owner);
	a.convertRot_to_triggerStuff = Actor.convertRot_to_triggerStuff;
	a.tint = [1,1,1];
	a.triggerId = 0;
	a.isUnitSpawner = true;
	a.spawnType = UnitPrototype.Marine;
	a.duration = 100;
	a.spawnPeriod = 10; 
	a.delay = 0;
	a.spawnOwnerId = 2;
	a.helperColor = [0,0,0];
	a.helperModel = a.spawnType.model;
	//if no destination is added, spawned units will follow heatmap
	a.conditionId = -1;
	a.spawnTag = -1;
	a.spawnGroup = -1;
	a.dest = null;
	//non-editor parameters
	a.triggered = false;
	a.timeLeft = -1;
	a.fuseTimer = -1;
	a.spawnPhase = 0;
	
	a.update_gameloop = function(){
		this.nodraw = !Render.drawEditorHelpers && !Render.alwaysDrawSpawners;
		this.convertRot_to_triggerStuff();
		
		if(this.spawnType){this.helperModel = this.spawnType.model};
		this.helperColor = Player.Colors[this.spawnOwnerId].color_float;
		
		if(Control.gamePaused==false){
			this.tint = Trigger.list[this.triggerId].color;
			if(Trigger.list[this.triggerId].triggered){
				if(this.triggered == false){
					this.activate();
				}
				this.triggered = true;
			}else{
				this.triggered = false;
			}
			
			if(this.triggered == true){
				if(this.fuseTimer > 0){
					this.fuseTimer --;
				}else{
					if(this.timeLeft != 0){
						this.effect();
						if(this.timeLeft > 0){
							this.timeLeft --;
						}
					}
				}
			}
		}
	}
	
	a.effect = function(){
		if(this.spawnPhase == 0){
			if(Trigger.checkConditionByTriggerId(this.conditionId) == true){
				this.spawnFunction(this.spawnType);
			}
		}
		this.spawnPhase ++;	
		if(this.spawnPhase == this.spawnPeriod){
			this.spawnPhase = 0;
		}
	}
	
	a.spawnFunction = function( _spawnType ){
		var spawnPosDir = RAND()*6.283;
		var spawnPosLen = RAND()*this.scale;
		var spawnX = this.x + spawnPosLen*Math.cos(spawnPosDir);
		var spawnY = this.y + spawnPosLen*Math.sin(spawnPosDir);
		var u = Unit.Create(spawnX, spawnY, Players[this.spawnOwnerId], _spawnType ,this.rotZ);
		if(u){
			if(this.dest == null){
				//Unit.Alert(u, Gamestats.Hero ,1);
			}else{
				Unit.Walk(u,this.dest[0],this.dest[1]);
			}
			if(u.proto.birthTime > 0){
				u.addSubTask(new IdleTask(u));
			}
			if(this.spawnTag > -1){
				u.setTag(this.spawnTag);
			}
			if(this.spawnGroup > -1){
				if(Trigger.Unit_Groups[this.spawnGroup].indexOf(u) < 0){
					Trigger.Unit_Groups[this.spawnGroup].push(u);
				}
			}
		}
	}
	a.activate = function(){
		this.fuseTimer = this.delay;
		this.timeLeft = this.duration;
		this.spawnPhase = 0;
	}
	
	a.getDoodadSaveData = function(){
		return [this.proto.id, this.x, this.y, this.z, this.rotZ, this.scale, this.rotX, this.delay, this.duration, 
		this.spawnPeriod, this.spawnOwnerId, this.spawnType.id, this.dest, this.conditionId, this.spawnTag, this.spawnGroup];
	}
	
	a.setDoodadLoadData = function(instData){
		this.rotZ = instData[4];
		this.scale = instData[5];
		this.rotX = instData[6];
		this.delay = instData[7];
		this.duration = instData[8];
		this.spawnPeriod = instData[9];
		this.spawnOwnerId = instData[10];
		this.spawnType = UnitPrototype.Types[ instData[11]];
		
		this.dest = instData[12];
		if(this.dest){
			this.dest[0]+=M.loadX;
			this.dest[1]+=M.loadY;
		}
		this.conditionId = instData[13];
		if(instData.length > 14){
			this.spawnTag = instData[14];
			if(instData.length > 15){
				this.spawnGroup = instData[15];
			}
		}
	}
	
	a.getCopy = function(){
		var c = this.proto.actor_constructor(this.proto, this.owner);
		c.rotX = this.rotX;
		c.rotY = this.rotY;
		c.rotZ = this.rotZ;
		c.x = this.x; c.y = this.y; c.z = this.z;
		c.scale = this.scale;
		c.duration = this.duration;
		c.spawnOwnerId = this.spawnOwnerId;
		c.spawnType = this.spawnType;
		c.spawnTag = this.spawnTag;
		c.spawnPeriod = this.spawnPeriod;
		c.triggered = this.triggered; c.timeLeft = this.timeLeft;
		c.activate = this.activate;
		c.dest = this.dest?this.dest.slice():null;
		c.conditionId = this.conditionId;
		c.delay = this.delay;
		c.spawnGroup = this.spawnGroup;
		return c;
	}
	
	a.getInfoText = function(){
		var str = "trig:"+Trigger.list[this.triggerId].name;
		str+="\ndur:"+ (this.duration<0?"inf":this.duration);
		str+="\nperiod:"+ this.spawnPeriod;
		if(this.delay > 0){
			str+="\ndel:"+this.delay;
		}
		if(this.dest){
			str+="\ndest:"+this.dest[0]+","+this.dest[1];
		}
		if(this.conditionId > -1){
			str+= "\ncond:\n"+Trigger.list[this.conditionId].getConditionText();
		}
		if(this.spawnTag > -1){
			str+= "\nspawnTag: "+this.spawnTag;
		}
		if(this.spawnGroup > -1){
			str+= "\nspawnGroup: "+this.spawnGroup;
		}
		return str;
	}
	
	return a;
}

Actor.EndlessSpawnArea = function( proto , _owner){
	var a = Actor.TriggerSpawnArea(proto, _owner);
	a.duration = -1;
	a.spawnPhase = 0;
	a.spawnPeriod = 3600;
	a.nextTypeId = 0;
	//a.delay = 1200;
	a.getInfoText = function(){
		var str = "ENDLESS\ntrig:"+Trigger.list[this.triggerId].name;
		str+="\nperiod:"+ this.spawnPeriod;
		if(this.delay > 0){
			str+="\ndel:"+this.delay;
		}
		if(this.dest){
			str+="\ndest:"+this.dest[0]+","+this.dest[1];
		}
		if(this.conditionId > -1){
			str+= "\ncond:\n"+Trigger.list[this.conditionId].getConditionText();
		}
		if(this.spawnTag > -1){
			str+= "\nspawnTag: "+this.spawnTag;
		}
		if(this.spawnGroup > -1){
			str+= "\nspawnGroup: "+this.spawnGroup;
		}
		return str;
	}
		
	a.effect = function(){
		this.spawnPhase = Gamestats.mapTime - this.delay;
		var treshold =  (this.spawnPhase % this.spawnPeriod)/this.spawnPeriod * this.spawnPhase/3600/900;
		if( treshold > RAND() ){
			var maxTypeId = Math.floor(Math.min(this.spawnPhase/4600, Actor.EndlessSpawnArea.SpawnTypes.length -1 ));
			this.nextTypeId ++;
			if(this.nextTypeId > maxTypeId){ //roll over to first elem
				this.nextTypeId = 0;
			}
			var nextType = Actor.EndlessSpawnArea.SpawnTypes[this.nextTypeId];
			if(nextType){
				this.spawnFunction(nextType);
			}
		}
	}	
	return a;
}
Actor.EndlessSpawnArea.SpawnTypes = [];
Actor.EndlessSpawnArea.initTypes = function(){
	Actor.EndlessSpawnArea.SpawnTypes = [
	UnitPrototype.EvilProbe,
	UnitPrototype.EvilProbe,
	UnitPrototype.EvilProbe,
	UnitPrototype.Wildcat,
	UnitPrototype.EvilProbe,
	UnitPrototype.Stinger_Robot,
	UnitPrototype.EvilProbe, 
	UnitPrototype.Wildcat,
	UnitPrototype.EvilProbe,
	UnitPrototype.Laika, 
	UnitPrototype.Electropod,
	UnitPrototype.EvilProbe,
	UnitPrototype.Widow, 
	UnitPrototype.Stinger_Robot, 
	UnitPrototype.Wildcat,
	UnitPrototype.EvilProbe,
	UnitPrototype.Walker_Robot,
	UnitPrototype.Laika, 
	UnitPrototype.EvilProbe,
	UnitPrototype.Widow,
	UnitPrototype.Stinger_Robot,
	UnitPrototype.Wildcat,
	UnitPrototype.Widow
	];
}


Actor.TriggerEffectArea = function( proto , _owner){
	var a = Actor.TriggerSpawnArea(proto, _owner);
	a.duration = 1;
	a.spawnPeriod = 1;
	a.effectFilter = SearchFilter.list[0];
	a.isUnitSpawner = false;
	a.param = 0;
	
	a.spawnFunction = function(){
	}
	
	a.activate = function(){
		this.timeLeft = this.duration; 
		this.fuseTimer = this.delay;
		this.spawnPhase = 0;
	}
	
	a.effect = function(){
		if(this.spawnPhase == 0){
			if(this.effectFilter.filterFunction){
				Pathfinder.Dijkstra_Unit_Search(Pathfinder.getNodeAt(this.x,this.y), this.scale+1, this.effectFilter ,this, 0);
			}else if(this.effectFilter.nodeFunction){
				Pathfinder.Dijkstra_Search(Pathfinder.getNodeAt(this.x,this.y), this.scale+1, this.effectFilter.nodeFunction ,this, 0);
			}
		}
		this.spawnPhase ++;	
		if(this.spawnPhase == this.spawnPeriod){
			this.spawnPhase = 0;
		}	
	}
	
	a.getCopy = function(){
		var c = Actor.TriggerEffectArea(this.proto, this.owner);
		c.rotX = this.rotX;
		c.rotY = this.rotY;
		c.rotZ = this.rotZ;
		c.x = this.x; c.y = this.y; c.z = this.z;
		c.scale = this.scale;
		c.duration = this.duration;
		c.spawnPeriod = this.spawnPeriod;
		c.effectFilter = this.effectFilter;
		c.param = this.param || 0;
		return c;
	}
	
	a.getDoodadSaveData = function(){
		return [this.proto.id, this.x, this.y, this.z, this.rotX, this.rotY, this.rotZ, this.scale, this.delay, 
		SearchFilter.list.indexOf(this.effectFilter), this.duration, this.spawnPeriod, this.param];
	}
	
	a.setDoodadLoadData = function(instData){
		this.rotX = instData[4];
		this.rotY = instData[5];
		this.rotZ = instData[6];
		this.scale = instData[7];
		this.delay = instData[8];
		if(instData.length > 9){
			this.effectFilter = SearchFilter.list[instData[9]];
		}
		if(instData.length > 10){
			this.duration = instData[10];
			this.spawnPeriod = instData[11];
		}
		this.param = instData[12] || 0;
	}
	
	a.getInfoText = function(){
		var str = "trig:"+Trigger.list[this.triggerId].name;
		str+="\ndur:"+ (this.duration<0?"inf":this.duration);
		if(this.spawnPeriod > 1){
			str+="\nperiod:"+ this.spawnPeriod;
		}
		str+="\ndel:"+this.delay;
		str+="\nfilter: "+this.effectFilter.name;
		return str;
	}
	
	return a;
}

Actor.TriggerMessagePoint = function( proto , _owner){
	var a = Actor.TriggerSpawnArea(proto, _owner);
	a.duration = -1;
	a.message = "Drink up me hearties!"
	a.messageInstance = null;
	a.isUnitSpawner = false;
	a.conditionId = -1; //condition for visibility
	//if >0, message will be attached to a unit with the tag.
	a.parentTag = -1;
	
	a.spawnFunction = function(){
	}
	
	a.activate = function(){
		this.timeLeft = this.duration;
		this.fuseTimer = this.delay;
	}
	
	a.effect = function(){
		if(this.spawnPhase == 0){
			this.messageInstance = GUI.AddSpeechText(this.x, this.y, this.z, this.scale * 10, this.duration, this.message);
			this.messageInstance.visibilityConditionId = this.conditionId;
			this.messageInstance.parentTag = this.parentTag;
			this.spawnPhase = 1;
		}
	}
	
	a.getDoodadSaveData = function(){
		return [this.proto.id, this.x, this.y, this.z, this.scale, this.rotX, this.duration, this.message,
		this.delay,this.conditionId, this.parentTag];
	}
	
	a.setDoodadLoadData = function(instData){
		this.scale = instData[4];
		this.rotX = instData[5];
		this.duration = instData[6];
		this.message = instData[7].slice();
		this.delay = instData[8];
		this.conditionId = instData[9];
		this.parentTag = instData[10];
	}
	
	a.getCopy = function(){
		var c = Actor.TriggerMessagePoint(this.proto, this.owner);
		c.rotX = this.rotX;
		c.rotY = this.rotY;
		c.rotZ = this.rotZ;
		c.x = this.x; c.y = this.y; c.z = this.z;
		c.scale = this.scale;
		c.message = this.message;
		c.duration = this.duration;
		c.delay = this.delay;
		c.conditionId = this.conditionId;
		c.parentTag = this.parentTag;
		return c;
	}
	
	a.getInfoText = function(){
		var str = "trig:"+Trigger.list[this.triggerId].name;
		if(this.selected == true){
			str+="\n\""+ this.message +"\""
		}else{
			str+="\n\""+ this.message.slice(0,6) +"...\""
		}
		if(this.duration >= 0){
			str+="\ndur:"+this.duration;
		}
		if(this.delay > 0){
			str+="\ndel:"+this.delay;
		}
		if(this.parentTag >= 0){
			str+="\nAttach to tag: "+this.parentTag;
		}
		if(this.conditionId > -1){
			str+= "\ncond:\n"+this.conditionId+" |"
			+Trigger.list[this.conditionId].getConditionText();
		}
		return str;
	}
	
	return a;
}

Actor.TriggerPatrolPoint = function( proto , _owner){
	var a = Actor.TriggerSpawnArea(proto, _owner);
	//a.convertRot_to_triggerStuff = Actor.convertRot_to_triggerStuff;
	a.tint = [0,1,1];
	a.helperColor = [0,1,1];
	a.isPatrolPoint = true;
	a.isUnitSpawner = false;
	a.spawnType = null;
	a.helperModel = Asset.model.crate;
	a.patrolRadius = 1;
	a.patrolDest = new Point(0,0);
	a.pauseTime = 0;
	a.duration = 1;
	

	a.effect = function(){
		this.patrolDest.x = this.x + Math.cos(-this.rotZ-1.57)*this.scale;
		this.patrolDest.y = this.y + Math.sin(-this.rotZ-1.57)*this.scale;
		var nod = Pathfinder.getNodeAt(this.x, this.y);
		var u = null;
		for(var u=nod.firstColl;u;u=u.nextColl){
			if(u.moving == false && u.alerted == false && u.followUnit == null){
				if(u.patrolPauseTime == 0 || Gamestats.cinematicMode == true){
					Unit.Walk(u,this.patrolDest.x,this.patrolDest.y);
					//u.preferred_facing = this.rotZ;
					if(this.pauseTime > 0){
						u.addSubTask( new IdleTask(u));
						u.task.timeLeft = this.pauseTime;
					}
				}
				u.patrolPauseTime++;
			}else{
				u.patrolPauseTime = 0;
			}
		}
	}
	
	a.getCopy = function(){
		var c = Actor.TriggerPatrolPoint(this.proto, this.owner);
		c.rotX = this.rotX;
		c.rotY = this.rotY;
		c.rotZ = this.rotZ;
		c.x = this.x; c.y = this.y; c.z = this.z;
		c.scale = this.scale;
		c.pauseTime = this.pauseTime;
		c.delay = this.delay;
		c.duration = this.duration;
		return c;
	}
	
	a.getInfoText = function(){
		var str = "trig:"+Trigger.list[this.triggerId].name;
		str+="\ndur:"+ (this.duration<0?"inf":this.duration);
		str+="\ndel:"+this.delay;
		str+="\npause:"+this.pauseTime;
		return str;
	}
	
	a.getDoodadSaveData = function(){
		return [this.proto.id, this.x, this.y, this.z, this.rotZ, this.scale, this.rotX, this.delay, this.duration, this.pauseTime];
	}
	
	a.setDoodadLoadData = function(instData){
		this.rotZ = instData[4];
		this.scale = instData[5];
		this.rotX = instData[6];
		this.delay = instData[7];
		this.duration= instData[8];
		this.pauseTime =instData[9];
	}
	return a;
}

Actor.CameraPoint = function( proto , _owner){
	var a = Actor.TriggerBaseActor(proto, _owner);
	a.proto = proto;
	a.distance = 20;
	a.pitch = 0.85;
	a.yaw = 0.16;
	a.triggerId = 0;
	a.update_gameloop = function(){
		this.nodraw = !Render.drawEditorHelpers && !Render.alwaysDrawSpawners;
		this.convertRot_to_triggerStuff();
		Trigger.CameraPoints[this.triggerId] = this;
		this.distance = cam.distance_default*this.scale;
		this.pitch = cam.pitch_default + this.rotY;
		this.yaw = cam.yaw_default + this.rotZ;
		this.tint = Trigger.list[this.triggerId].color;
	}
	a.getInfoText = function(){
		var str = "camPoint: "+this.triggerId;
		str+="\ndist: "+ fixed2(this.distance);
		str+="\nyaw: "+ fixed2(this.yaw);
		str+="\npitch: "+ fixed2(this.pitch);
		return str;
	}
	a.afterLoad = function(){
		this.convertRot_to_triggerStuff();
		Trigger.CameraPoints[this.triggerId] = this;
	}
	
	a.getView = function(){
		this.rotZ = - cam.yaw_default + cam.yaw;
		this.scale = cam.distance/cam.distance_default;
		this.rotY = -cam.pitch_default + cam.pitch;
	}
	Actor.CameraPoint.setFirstEmptyId(a);
	return a;
}
Actor.CameraPoint.setFirstEmptyId = function(a){
	a.rotX = Math.min(4.9,Trigger.CameraPoints.length*0.1);
	for(var i=0;i<Trigger.CameraPoints.length;++i){
		if(!Trigger.CameraPoints[i] || Trigger.CameraPoints[i].isRemoved){
			a.rotX = i*0.1;
			Trigger.CameraPoints[i] = a;
			return;
		}
	}
}

//AI point of interest
Actor.POI = function( proto , _owner){
	var a = Actor.TriggerBaseActor(proto, _owner);
	a.proto = proto;
	a.triggerId = 0;
	a.worth =0;
	a.influence = [0,0,0,0,0];
	a.influence_radius = 16;
	a.update_counter = 150;
	//-1 is none, 0 is random
	a.startLocationId = -1;
	a.isControlPoint = false;
	a.maxInfluenceId = 0;
	a.controllerId = 0;
	
	a.getEnemyInfluence = function(player){
		var infl = 0;
		for(var i=0;i<Players.length;++i){
			if(Players[i].team != player.team){
				infl += this.influence[i];
			}
		}
		return infl;
	}
	
	a.getmaxInfluenceId = function(){
		var maxInfl = 0;
		var maxId = 0;
		for(var i=0;i<this.influence.length;++i){
			if(this.influence[i]>maxInfl){
				maxInfl = this.influence[i];
				maxId = i;
			}
		}
		return maxId;
	}
	a.refreshController = function(){
		if(this.influence[this.maxInfluenceId] > this.influence[this.controllerId]){
			if(this.controllerId != this.maxInfluenceId){
				if(this.maxInfluenceId == Control.currentPlayer.id){
					GUI.Alert_Point_Taken(this);
				}else if(this.controllerId > 0){
					GUI.Alert_Point_Lost(this);
				}
				this.controllerId = this.maxInfluenceId;
			}	
		}
	}
	
	a.update_gameloop = function(){
		this.nodraw = !Render.drawEditorHelpers && !Render.alwaysDrawSpawners && !this.isControlPoint;
		this.convertRot_to_triggerStuff();
		AI.Points[this.triggerId] = this;
		
		this.update_counter = (this.update_counter+1)%150;
		if(this.update_counter == (this.triggerId * 7)%150){
			this.update_influence();
			this.maxInfluenceId = this.getmaxInfluenceId();
		}
		if(!this.isControlPoint && this.update_counter == (this.triggerId * 13)%150){
			this.update_worth();
		}
		if(this.isControlPoint){
			this.model = Asset.model.beacon;
			this.texture = Asset.texture.beacon;
			this.tint = Players[this.controllerId].colorFloat;
			this.refreshController();
		}else{
			this.model = this.proto.model;
			this.textre = this.proto.texture;
			this.tint = Trigger.list[this.triggerId].color;
		}
	}
	a.getInfoText = function(){
		var str = "POI: "+this.triggerId + "\nrad:"+this.influence_radius;
		if(this.startLocationId>=0){
			str +="\nStartLoc: "+(this.startLocationId>0?this.startLocationId:"RANDOM");
		}
		if(this.isControlPoint){
			str +="\nControl Point"
		}
		return str;
	}
	a.afterLoad = function(){
		this.convertRot_to_triggerStuff();
		AI.Points[this.triggerId] = this;
	}
		
	a.update_influence = function(){
		for(var i=0;i<this.influence.length;++i){
			this.influence[i] = 0;
		}
		var n = Pathfinder.getNodeAt_Robust(this.x,this.y);
		Pathfinder.Dijkstra_Unit_Search(n, this.influence_radius , SearchFilter.get_POI_influence, this, 0);
		return this.influence;
	}
	a.update_worth = function(){
		this.worth = 0;
		var n = Pathfinder.getNodeAt_Robust(this.x,this.y);
		Pathfinder.Dijkstra_Unit_Search(n, this.influence_radius , SearchFilter.get_POI_worth, this, 0);
		return this.worth;
	}
	a.rotX = Math.min(4.9,AI.Points.length*0.1);
	
	a.getDoodadSaveData = function(){
		return [this.proto.id, this.x, this.y, this.z, this.rotX,this.rotY,this.rotZ, this.scale,this.startLocationId,this.influence_radius,this.isControlPoint];
	}
	a.setDoodadLoadData = function(instData){
		this.rotX = instData[4];
		this.rotY = instData[5];
		this.rotZ = instData[6];
		this.scale = instData[7];
		this.startLocationId = instData[8];
		this.influence_radius = instData[9] || 16;
		this.isControlPoint = instData[10] || false;
	}

	return a;
}