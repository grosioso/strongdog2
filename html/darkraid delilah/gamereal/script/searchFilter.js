function SearchFilter(_preFilter, _treshold){
	this.preFilter = _preFilter;
	//prefilter offset: when 1 match is not enough
	//example: 1 matching ally can be self
	this.preFilter_treshold =  _treshold;
	this.name = "unnamed";
	this.look_for_pos_behind_wall = true;
	this.use_standing_range = true;
	this.filterFunction = Utils.FALSE;
	this.nodeFunction = Utils.TRUE;
}
SearchFilter.preFilter_none = -1;
SearchFilter.preFilter_enemy = 0;
SearchFilter.preFilter_ally = 1;


SearchFilter.isAlive = new SearchFilter(null,0);
SearchFilter.isAlive.filterFunction = function(caller, otherUnit){
	return (otherUnit.alive == true);
}

SearchFilter.isEnemy = new SearchFilter(SearchFilter.preFilter_enemy,0);
SearchFilter.isEnemy.filterFunction = function(caller, otherUnit){
	return (caller.owner.team != otherUnit.owner.team && otherUnit.alive == true && otherUnit.proto.isResource == false);
}

SearchFilter.isGroundEnemy = new SearchFilter(SearchFilter.preFilter_enemy,0);
SearchFilter.isGroundEnemy.filterFunction = function(caller, otherUnit){
	return (caller.owner.team != otherUnit.owner.team && otherUnit.alive == true && !otherUnit.proto.flying);
}

SearchFilter.isAirEnemy = new SearchFilter(SearchFilter.preFilter_enemy,0);
SearchFilter.isAirEnemy.filterFunction = function(caller, otherUnit){
	return (caller.owner.team != otherUnit.owner.team && otherUnit.alive == true && otherUnit.proto.flying);
}

SearchFilter.isTallEnemy = new SearchFilter(SearchFilter.preFilter_enemy,0);
SearchFilter.isTallEnemy.filterFunction = function(caller, otherUnit){
	return (caller.owner.team != otherUnit.owner.team && otherUnit.alive == true && (otherUnit.proto.flying||otherUnit.proto.isTall));
}

SearchFilter.isEnemyTarget = new SearchFilter(SearchFilter.preFilter_enemy, 0);
//only search for targets on visible nodes
SearchFilter.isEnemyTarget.nodeFunction = function(n, caller){
	return Node.getVisibility(n, caller.owner.visGroup) == 2;
}
SearchFilter.isEnemyTarget.filterFunction = function(caller, otherUnit){
	return (otherUnit.alive == true && caller.owner.team != otherUnit.owner.team && otherUnit.targetPriority > 1);
}

SearchFilter.isEnemyGroundTarget = new SearchFilter(SearchFilter.preFilter_enemy, 0);
SearchFilter.isEnemyGroundTarget.nodeFunction = SearchFilter.isEnemyTarget.nodeFunction;
SearchFilter.isEnemyGroundTarget.filterFunction = function(caller, otherUnit){
	return (otherUnit.alive == true && caller.owner.team != otherUnit.owner.team && !otherUnit.proto.flying && otherUnit.targetPriority > 1);
}

SearchFilter.isEnemyAirTarget = new SearchFilter(SearchFilter.preFilter_enemy, 0);
SearchFilter.isEnemyAirTarget.nodeFunction = SearchFilter.isEnemyTarget.nodeFunction;
SearchFilter.isEnemyAirTarget.filterFunction = function(caller, otherUnit){
	return (otherUnit.alive == true && caller.owner.team != otherUnit.owner.team && otherUnit.proto.flying && otherUnit.targetPriority > 1);
}

SearchFilter.isTarget = new SearchFilter(SearchFilter.preFilter_enemy,0);
SearchFilter.isTarget.filterFunction = function(caller, otherUnit){
	return (caller !=otherUnit && otherUnit.targetPriority > 1 && otherUnit.alive == true);
}

//can pick up items
SearchFilter.canPickup = new SearchFilter(SearchFilter.preFilter_enemy,0);
SearchFilter.canPickup.filterFunction = function(caller, otherUnit){
	return (otherUnit.owner.id != 0 && otherUnit.alive == true && otherUnit.isStructure == false 
	&& otherUnit.proto.isItem == false && otherUnit.proto.flying == false);
}

SearchFilter.isAlly = new SearchFilter(SearchFilter.preFilter_ally,0);
SearchFilter.isAlly.filterFunction = function(caller, otherUnit){
	return (caller !=otherUnit && otherUnit.owner.team == caller.owner.team && otherUnit.alive == true);
}

SearchFilter.isRescuer = new SearchFilter(SearchFilter.preFilter_ally,0);
SearchFilter.isRescuer.look_for_pos_behind_wall = false;
SearchFilter.isRescuer.use_standing_range = false;
SearchFilter.isRescuer.filterFunction = function(caller, otherUnit){
	return (otherUnit.owner.team == caller.owner.team && otherUnit.owner != caller.owner && otherUnit.alive == true);
}


SearchFilter.isResource = new SearchFilter(SearchFilter.preFilter_none ,0);
SearchFilter.isRescuer.look_for_pos_behind_wall = false;
SearchFilter.isResource.filterFunction = function(caller, otherUnit){
	return (otherUnit.alive && otherUnit.proto.isResource);
}

SearchFilter.aiSelectIdle = new SearchFilter(SearchFilter.preFilter_ally,1);
SearchFilter.aiSelectIdle.filterFunction = function(caller, otherUnit){
	if(otherUnit.owner==caller.owner && !otherUnit.isStructure &&
	!otherUnit.proto.isWorker && otherUnit.task.id == Task.id_IdleTask){
		caller.owner.ai.selection.push(otherUnit);
	}
	return false;
}


SearchFilter.zombieFFATarget = new SearchFilter(SearchFilter.preFilter_enemy,0);
SearchFilter.zombieFFATarget.filterFunction = function(caller, otherUnit){
	if(caller !=otherUnit && otherUnit.targetPriority > 1 && otherUnit.alive == true){
		var herodist = Unit_Distance(caller, Gamestats.Hero);
		if(caller.owner.team == otherUnit.owner.team){
			if(herodist > caller.heroChaseRange && herodist < 19){
				return true;
			}
		}else{
			return true;
		}
	}
	return false;
}

SearchFilter.broadcastGuardtaskTimestamp = new SearchFilter(SearchFilter.preFilter_ally,1);
SearchFilter.broadcastGuardtaskTimestamp.filterFunction = function(caller, otherUnit){
	if(otherUnit.alive == true && otherUnit.guarding == true && otherUnit.acquisitionGroup ==  caller.acquisitionGroup 
	&& caller.owner.team == otherUnit.owner.team){
		otherUnit.guardTask.timestamp = Task.utility_timestamp;
	}
	return false;
}

SearchFilter.broadcastGuardtaskTarget = new SearchFilter(SearchFilter.preFilter_ally,1);
SearchFilter.broadcastGuardtaskTarget.filterFunction = function(caller, otherUnit){
	if(otherUnit.alive == true && otherUnit.guardTask.target == null && otherUnit.acquisitionGroup ==  caller.acquisitionGroup
	&& caller.owner.team == otherUnit.owner.team && otherUnit.guarding == true && otherUnit.guardTask.chasePauseTimer <= 0){
		otherUnit.guardTask.injectTarget(caller.guardTask.target);
	}
	return false;
}

SearchFilter.get_POI_influence = new SearchFilter(SearchFilter.preFilter_none,0);
SearchFilter.get_POI_influence.filterFunction = function(POI, unit){
	if(unit.alive){
		POI.influence[unit.owner.team] += AI.getUnitStrength(unit);
	}
	return false;
}

SearchFilter.get_POI_worth = new SearchFilter(SearchFilter.preFilter_none,0);
SearchFilter.get_POI_worth.filterFunction = function(POI, unit){
	if(unit.proto.isResource){
		POI.worth += unit.hp;
	}
	return false;
}

SearchFilter.get_builder_worker = new SearchFilter(SearchFilter.preFilter_ally, 1);
SearchFilter.get_builder_worker.filterFunction = function(caller, unit){
	if(unit.proto.isWorker && unit.owner == caller.owner && unit.alive && unit.born
	&& !(unit.task.ability && unit.task.ability.effect == Effect.Build)){
		return true;
	}
	return false;
}

f = SearchFilter.itemHeal = new SearchFilter(SearchFilter.preFilter_none,0);
f.filterFunction = function(caller, unit){
	if(unit.alive && !unit.isStructure && !unit.proto.isItem){
		unit.Repair(caller.proto.itemParam, caller);
	}
	return false;
}


f = SearchFilter.ScareSimilar = new SearchFilter(SearchFilter.preFilter_ally, 1);
f.filterFunction = function(caller, otherUnit){
	if(otherUnit.alive && caller.proto == otherUnit.proto ){
		otherUnit.Flee(caller.x,caller.y);
	}
	return false;
}

f = SearchFilter.Fear = new SearchFilter(SearchFilter.preFilter_enemy, 0);
f.filterFunction = function(caller, otherUnit){
	if(otherUnit.alive && otherUnit.owner != caller.owner && otherUnit.stationary == false){
		otherUnit.Flee(caller.x,caller.y);
	}
	return false;
}

f = SearchFilter.DeleteStructure = new SearchFilter(SearchFilter.preFilter_none,0);
f.name = "DeleteStructure";
f.filterFunction = function(caller, otherUnit){
	//if(otherUnit.proto.isGate == true){
	if(otherUnit.proto.isStructure == true){
		otherUnit.Die();
	}
	return false;
}

f = SearchFilter.HurtPlayer2 = new SearchFilter(SearchFilter.preFilter_none,0);
f.name = "Hurt_Player2";
f.filterFunction = function(caller, otherUnit){
	if(otherUnit.owner == Players[2]){
		otherUnit.Hurt(50,otherUnit);
	}
	return false;
}
f = SearchFilter.HurtPlayer3 = new SearchFilter(SearchFilter.preFilter_none,0);
f.name = "Hurt_Player3";
f.filterFunction = function(caller, otherUnit){
	if(otherUnit.owner == Players[3]){
		otherUnit.Hurt(50,otherUnit);
	}
	return false;
}
f = SearchFilter.RemoveUnits = new SearchFilter(SearchFilter.preFilter_none,0);
f.name = "RemoveEnemy";
f.filterFunction = function(caller, otherUnit){
	if(otherUnit.owner.team!=1){
		otherUnit.owner.unitKilled(otherUnit); 
		otherUnit.Remove();
	}
	return false;
}

f = SearchFilter.Reveal = new SearchFilter(SearchFilter.preFilter_none,0);
f.name = "Reveal";
f.filterFunction = null;
f.nodeFunction = function(n,caller){
	Pathfinder.Visibility[1][n.nodey][n.nodex]++;
	return false;
}
f = SearchFilter.RevealPermanent = new SearchFilter(SearchFilter.preFilter_none,0);
f.name = "RevealPermanent";
f.filterFunction = null;
f.nodeFunction = function(n,caller){
	Pathfinder.Visibility[1][n.nodey][n.nodex] = 2147483647;
	return false;
}
f = SearchFilter.RevealTemp = new SearchFilter(SearchFilter.preFilter_none,0);
f.name = "Reveal_10s";
f.filterFunction = null;
f.nodeFunction = function(n,caller){
	Pathfinder.Visibility[1][n.nodey][n.nodex] = Pathfinder.FOW_Timestamp + 600;
	return false;
}

f = SearchFilter.Rescue = new SearchFilter(SearchFilter.preFilter_none,0);
f.name = "Rescue";
f.filterFunction = function(caller, otherUnit){
	if(otherUnit.alive && otherUnit.owner.rescuable){
		Unit.rescue(otherUnit, null);
	}
	return false;
}

SearchFilter.list = [SearchFilter.DeleteStructure,SearchFilter.Reveal,SearchFilter.RevealPermanent,SearchFilter.HurtPlayer2,SearchFilter.HurtPlayer3,SearchFilter.RemoveUnits,SearchFilter.Rescue,SearchFilter.RevealTemp];
