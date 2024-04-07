
var Task = new Object();
Task.utility_timestamp = 0;

Task.id_MovementTask = 0;
Task.id_ChaseTask = 1;
Task.id_ChaseTask_SingleTarget = 2;
Task.id_ChaseTask_Swarm = 3;
Task.id_AttackTask_Base = 4;
Task.id_AttackTask_Swarm = 5;
Task.id_IdleTask = 6;
Task.id_DeadTask = 7;
Task.id_Alone_Move_Task = 8;
Task.id_HotspotMoveTask = 9;
Task.id_JumpTask = 10;
Task.id_StunTask = 11;
Task.id_KickTask = 12;
Task.id_OrderedMovementTask = 13;

Task.getDestNode = function(){
	return pf.getNodeAt(this.dest.x, this.dest.y);
}
Task.getOrderDestNode = function(){
	return pf.getNodeAt(this.orderdest.x, this.orderdest.y);
}

Task.Next_Node_Reached = function(){
	var radius = this.caster.currentSpeed * 0.5 + this.extraPointArrivalRadius;
	//in the old version we were only calculating distance from the current dest
	if(Math.abs(this.caster.x - this.dest.x) <= radius &&  Math.abs(this.caster.y - this.dest.y) <= radius ){
		return true;
	//in the new version we are calculating distance to the line between current dest and next dest.
	//if we are on the line, it is guaranteed that both points are in line of sight
	}else if( Point.equals(this.dest, this.finaldest) == false){
		var diffY = 0;
		var diffX = 0;
		if(this.nextDest != undefined){
			diffY = this.nextDest.y-this.dest.y;
			diffX = this.nextDest.x-this.dest.x;
		}
		var length = Math.sqrt( diffY*diffY + diffX*diffX);
		
		if(length != 0){
			var vector = (diffY)*this.caster.x - (diffX )*this.caster.y + this.nextDest.x*this.dest.y - this.nextDest.y*this.dest.x;
			if(Math.abs(vector)/length <= radius){
				return true;
			}
		}
	}
	return false;
}

//target is unit, not point
Task.refreshPathToTarget = function(){
	if(this.targetUnit != null && this.targetUnit  != undefined){
		var rangedPoint = null;
		if(this.rangedTargeting == true){
			var rangedPoint = Utils.point_between_points_at_max_distance_xxyy
			(this.targetUnit.x,this.caster.x, this.targetUnit.y,this.caster.y, this.range-this.arrivalBuffer);
		}
		this.SetMovePath( this.targetUnit.x, this.targetUnit.y, rangedPoint);
	}	
}

Task.Get_Next_Dest_Along_Path = function(){
	var nodeCtr = this.path_node_counter + 1;
	var len = this.Path.length;
	if(len > 0 && nodeCtr < len){
		var dNode = this.Path[ nodeCtr ];
	}
	if(nodeCtr >= len-1 && dNode == this.finaldestNode){ //last node
		return new Point(this.finaldest.x, this.finaldest.y); 
	}else if(nodeCtr == 0){ //start node
		return new Point(this.caster.x, this.caster.y);
	}else if(len > 0 && nodeCtr < len){
		return new Point(dNode.nodex + 0.5 /*+ dNode.avgDistanceX */, dNode.nodey + 0.5 /*+ dNode.avgDistanceY*/);
	}else{
		return this.dest;
	}
}

Task.Set_Next_Dest = function(){
	this.dest = this.Get_Next_Dest_Along_Path();
	this.path_node_counter++;
	this.nextDest = this.Get_Next_Dest_Along_Path();
	this.destNode = this.getDestNode();
}

//_x, _y - destination coordinates
//_rangedTarget - alternative target for ranged tasks : 
//the attacker won't go around, if it can get in range just by going in a straight line
Task.SetMovePath = function(_x, _y, _rangedTarget){
	var destination_node = pf.getNodeAt(_x, _y);
	if( destination_node == undefined){
		this.caster.Stop();
		return;
	}
	
	if(_rangedTarget != null){
		var rangedDestnode = pf.getNodeAt(_rangedTarget.x,_rangedTarget.y);
		if(Pathfinder.InLOS(rangedDestnode, this.caster.atNode, this.blocker_layer) == true){
			this.caster.moving = true;
			this.finaldest.x = this.dest.x = _rangedTarget.x;
			this.finaldest.y = this.dest.y = _rangedTarget.y;
			this.finaldestNode = Pathfinder.getNodeAt(_rangedTarget.x, _rangedTarget.y);
			return;
		}
	}
	
	var startSectorID = Node.getSectorID(this.caster.atNode, this.blocker_layer);
	if( Node.getSectorID(destination_node, this.blocker_layer) !=  startSectorID){
		alternative_node = pf.Get_Alternative_Node_For_Different_Sector( this.caster.atNode, destination_node, startSectorID, this.blocker_layer );
		_x = alternative_node.nodex + 0.5;
		_y = alternative_node.nodey + 0.5;
	}
	
	this.caster.setValidCoordinates();

	if(pf.Compute_Path_For_MovementTask(this, _x, _y) > 0){
		this.caster.moving = true;
	}else{
		return;
	}
	
	//nem kell kiszamolni vegig a pontos utat, eleg csak egy darabon
	var path_calculation_end = Math.max(0, this.PathAbstract.length - 7);
	for(var i=this.PathAbstract.length-1;i>path_calculation_end;--i){
		pf.Pathfind_Between_Nodes(this.PathAbstract[i-1], this.PathAbstract[i] ,this);
	}

	if(this.Path.length > 0){
		pf.Path_Smoothing(this);
	}

	this.path_node_counter = 0;//this will skip the startnode
	if(this.Path.length > 0){
		this.Set_Next_Dest();
	}
}

Task.SetMovePath_Air = function(_x, _y, _rangedTarget){
	this.finaldestNode = Pathfinder.getNodeAt_Robust(_x,_y);
	this.Path = [this.caster.atNode , this.finaldestNode];
	this.path_node_counter = 1;
	this.dest = this.finaldest = this.nextDest = new Point(_x, _y);
	this.destNode = this.finaldestNode;
	this.caster.moving = true;
}

Task.world_move_update_movementTask = function(offX, offY){
	this.dest.x -= offX;
	this.dest.y -= offY;
	this.finaldest.x -= offX;
	this.finaldest.y -= offY;
}

Task.unit_inrange_check = function(targ){
	return(Unit_Distance(this.caster, targ) < this.range - this.arrivalBuffer + targ.hardRadius)
}

function MovementTask( _caster ){
	this.id = Task.id_MovementTask;
	this.caster = _caster;
	this.blocker_layer = _caster.blockerCollisionTreshold;
	this.can_return_here_from_chase = true;

	this.Path = [];
	this.PathAbstract = [];
	this.path_node_counter = 0;
	
	this.dest = new Point(0, 0 ); //position of next node along the path
	this.nextDest = new Point(0, 0 );
	this.destNode = this.caster.atNode;
	this.finaldest = new Point(0, 0); //end destination of pathfinding
	this.finaldestNode = null;
	this.extraPointArrivalRadius = Math.min(0.25, this.caster.hardRadius);
	
	this.Next_Node_Reached = Task.Next_Node_Reached;
	this.SetMovePath = Task.SetMovePath;
	if(this.caster.blockerCollisionTreshold < 0){
		this.SetMovePath = Task.SetMovePath_Air;
	}
	
	this.Set_Next_Dest = Task.Set_Next_Dest;
	this.Get_Next_Dest_Along_Path = Task.Get_Next_Dest_Along_Path;
	this.getOrderDestNode = Task.getOrderDestNode;
	this.getDestNode = Task.getDestNode;
	this.unit_inrange_check = Task.unit_inrange_check;
	
	this.world_move_update = Task.world_move_update_movementTask;
	/*this.Resume = function(){
		this.caster.moving = true;
	}*/

	this.getSaveState = function(){
		return [this.finaldest.x, this.finaldest.y];
	}
}

/*Task.OrderedMovementTask = function( _caster , _target , _abilityInst){
	var t = new MovementTask(_caster);
	t.id = Task.id_OrderedMovementTask;
	t.orderdest = new Point( 0, 0 );
	t.leaderNode = null;
	t.groupMoveOrder = null;
	t.moveOrder = null;
	t.id_in_groupOrder = 0;
	t.waitingForRefresh = false;
	
	t.abilityInstance = _abilityInst;
	t.ability = _abilityInst.proto;
	
	t.targetUnit = _target  ;
	t.isAttackMove = t.ability.lookForTarget && (t.targetUnit==null);	
	t.hasExplicitTarget = (t.targetUnit!=null);

	if(t.ability.inheritFromAttack == false){
		t.range = t.ability.castRange;
		t.rangedTargeting = t.ability.rangedTargeting;
		t.arrivalBuffer = t.ability.arrivalBuffer;
	}else{
		t.range = t.caster.attackRange;
		t.rangedTargeting = t.caster.rangedTargeting;
		t.arrivalBuffer = t.caster.attackArrivalBuffer;
	}
	
	
	t.Start = function(){
		if(this.isAttackMove == true){
			this.caster.startGuard( );
		}
		this.caster.fighting = false;
		this.caster.guardTask.setChasePause(0);
	}
	
	t.Resume = function(){
		if(this.isAttackMove == true){
			this.caster.startGuard( );
		}
		this.waitingForRefresh = true;
		this.caster.moving = false;
		this.caster.fighting = false;
	}
	
	t.Finish = function(){
		this.moveOrder.removeMember(this);
	}
	
	t.loop = function(){
		if(this.caster.moving == false && this.caster.waitingForRefresh == false){
			return;
		}
		
		//single target move, not attackmove
		if(this.hasExplicitTarget == true){
			if(this.targetUnit && this.targetUnit.alive == true){
				if(this.unit_inrange_check(this.targetUnit) == true){
					this.caster.addSubTask( Task.AttackTask_Base( this.caster, this.targetUnit, this.abilityInstance ));
					return;
				}else{
					this.orderdest.x = this.targetUnit.x;
					this.orderdest.y = this.targetUnit.y;
				}
			}else{
				if(this.targetUnit&&this.targetUnit.replace_alias&&this.targetUnit.replace_alias.alive){
					//maybe target has just changed owner or type
					this.targetUnit = this.targetUnit.replace_alias;
				}else{
					this.targetUnit = null;
					this.hasExplicitTarget = false;
					this.isAttackMove = true;
					this.caster.startGuard(  );
				}
			}
		}
		
		var leaderTask = this.groupMoveOrder.leaderTask;
		
		if(this != leaderTask){
			if(this.caster.atNode == leaderTask.destNode 
			&& leaderTask.destNode != leaderTask.getOrderDestNode()
			&& this.groupMoveOrder.newLeaderTaskRequested == false){
				this.groupMoveOrder.setNewLeaderTask(this); //Set this task to new group leader task
				this.SetMovePath(this.orderdest.x, this.orderdest.y, null);
			}
		}
		
		if( this.Next_Node_Reached() == true ){
			if(this.path_node_counter < this.Path.length-1){ //point we arrived at is not the last one along the path
				this.Set_Next_Dest();
			}else{
				if(Point.equals(this.finaldest, this.orderdest)  && Point.equals(this.finaldest, this.dest)){ //this is the actual end of the path
					if(this.hasExplicitTarget){
						this.caster.addSubTask( Task.ChaseTask_SingleTarget( this.caster, this.targetUnit, this.abilityInstance ));
					}else{
						this.caster.Stop();
					}
				}else if(this != leaderTask){ //this is only the end of the follower's path, but the leader knows the entire path
					this.Follow_LeaderTask(leaderTask);
				}else{
					//ANOMALY, this should not happen imo
					//console.log("Pathfinding anomaly");
					if(this.hasExplicitTarget){
						this.caster.addSubTask( Task.ChaseTask_SingleTarget( this.caster, this.targetUnit, this.abilityInstance ));
					}else{
						this.caster.Stop();
					}
				}
			}
		}
		
		if(this.caster.inner_counter % 5 == 0){
			//for ranged abilities
			if(this.hasExplicitTarget == true){ //we've already checked in this loop if targetunit is alive, so there's no need
				if(this.rangedTargeting == true){
					var rangedPoint = Utils.point_between_points_at_max_distance_xxyy
					(this.targetUnit.x,this.caster.x, this.targetUnit.y,this.caster.y, this.range-this.arrivalBuffer);
					if(Pathfinder.InLOS(rangedPoint, this.caster.atNode, this.blocker_layer, this.blocker_layer) == true){
						this.caster.addSubTask( Task.ChaseTask_SingleTarget( this.caster, this.targetUnit, this.abilityInstance ));
						return;
					}
				}
			}
		}
		
		//periodically repeated path reconstruction
		if(this.caster.inner_counter%30==0 && (this.caster.moving == true || this.waitingForRefresh == true)){
			this.waitingForRefresh = false;
			
			if(this != leaderTask){
				this.Follow_LeaderTask(leaderTask);
			}else{
				this.SetMovePath(this.orderdest.x, this.orderdest.y,null);
			}
		}
	}
	
	t.Follow_LeaderTask = Task.OrderedMovementTask.Follow_LeaderTask;
	t.world_move_update = Task.OrderedMovementTask.world_move_update;
	
	return t;
}
 
Task.OrderedMovementTask.Follow_LeaderTask = function(leaderTask){
	//the leader might have a long path between 2 nodes, but we can limit that distance for the followers
	var leaderUnit = leaderTask.caster;
	if(Point.equals(leaderTask.dest, leaderTask.orderdest) //ha mar az utolso pontnal tartok, csoporttol fuggetlenul megyek tovabb
	//|| leaderUnit.moving == false //ha a vezeto mar all, csoporttol fuggetlenul megyek tovabb
	//ha kozel vagyok es latom is a celomat, csoporttol fuggetlenul megyek tovabb
	|| Math.abs(this.caster.x - this.orderdest.x)+Math.abs(this.caster.y - this.orderdest.y) < 15 
	&& pf.InLOS(this.caster.atNode, pf.getNodeAt(this.orderdest.x, this.orderdest.y), this.blocker_layer)){
		var followerDest = this.orderdest;
	}else{
		var followerDest = Utils.point_between_points_at_max_distance(new Point(leaderUnit.x, leaderUnit.y), leaderTask.dest, pf.maxFollowerPathLength);
	}
	this.SetMovePath(followerDest.x, followerDest.y, null);
	this.leaderNode = leaderUnit.destNode;
}

Task.OrderedMovementTask.world_move_update = function(offX, offY){
	this.dest.x -= offX;
	this.dest.y -= offY;
	this.finaldest.x -= offX;
	this.finaldest.y -= offY;
	this.orderdest.x -= offX;
	this.orderdest.y -= offY;
}*/

//used for a periodically repeated simple action
function AttackTask( _caster, _target, _abilityInst){
	this.id = Task.id_AttackTask_Base;
	this.caster = _caster;
	this.targetUnit = _target;
	this.abilityInstance = _abilityInst;
	
	if(_abilityInst == null){
		this.abilityInstance = this.caster.attackAbility;
	}

	this.ability = this.abilityInstance.proto;
	
	this.updateParams = function(){
		if(this.ability.inheritFromAttack == false){
			this.cooldown = this.ability.channelingPeriod;
			this.swingTime = this.ability.swingTime;
			this.range_default = this.ability.castRange;
			this.targetFilter = this.ability.targetFilter.filterFunction;
			this.burst_count = 1;
			this.always_face_target = true;
			this.burst_cooldown = 10;
		}else{
			this.cooldown = this.caster.attackCooldown;
			this.swingTime = this.caster.swingTime;
			this.range_default = this.caster.attackRange;
			this.targetFilter = this.caster.EnemyFilter.filterFunction;
			this.burst_count = this.caster.attack_burst_count;
			this.burst_cooldown = this.caster.attack_burst_cooldown;
			this.always_face_target = this.caster.Attack != Unit.Attack_Shoot_Forward;
		}
		this.range = this.range_default;
	}
	this.burst_progress = 0;
	this.updateParams();
	
	this.loop = function(){
		if(this.abilityInstance.actionCooldownCounter == 1 && RAND()<this.caster.proto.attackPauseChance){ //change position after shooting
			if(RAND()<0.66){ //back to chase (reposition)
				this.Interrupt(0);return;
			}else{ //simple reposition
				this.Interrupt(3);return;
			}
		}
		
		if(this.targetUnit && this.targetFilter(this.caster, this.targetUnit) ){
			
			if( this.always_face_target || this.abilityInstance.actionCooldownCounter == 0 ){
				Unit.facePointXY(this.caster, this.targetUnit.x, this.targetUnit.y, false);
			}else{
				Unit.facePointXY_gradual(this.caster,this.targetUnit.x, this.targetUnit.y, 0.026);
			}
			
			if(Unit_Distance_3d(this.caster,this.targetUnit) <= this.range + this.targetUnit.hardRadius){
				this.loop_action();
			}else if(this.abilityInstance.actionCooldownCounter<= 0){//don't interrupt swing
				//target out of range
				this.Interrupt(0);return;
			}
		}else{
			//target is not available
			if(this.targetUnit&&this.targetUnit.replace_alias){
				//maybe target has just changed owner or type
				this.targetUnit = this.targetUnit.replace_alias;
			}else{
				this.targetUnit = null;
				//check if we can get new targetUnit
				if(this.ability.new_target_check){
					this.targetUnit = this.ability.new_target_check(this.caster);
				}
				if(this.targetUnit == null){
					this.Interrupt(1);
				}
			}
			return;
		}
	}
	
	this.loop_action = Task.loop_action;
	
	this.Start = function(){
		this.caster.fighting = true;
		this.caster.moving = false;
		this.caster.guarding = false;
		this.abilityInstance.actionCooldownCounter = 0;
	}
	this.Resume = function(){
		this.caster.fighting = true;
		this.caster.moving = false;
		this.caster.guarding = false;
		this.abilityInstance.actionCooldownCounter = 0;
	}
	
	//cause == 0 - target out of range
	//cause == 1 - target is not available (most likely dead)
	//cause == 2 - out of shots
	//cause == 3 - change position
	this.Interrupt = function( cause){
		this.caster.fighting = false;
		if(cause == 0){
			if(this.caster.stationary == false){
				this.caster.changeSubTask( Task.ChaseTask( this.caster, this.targetUnit, this.abilityInstance ));
			}else{
				this.caster.removeTopSubTask();
			}
		}else if(cause == 1){
			console.log("gg");
			this.caster.removeTopSubTask();
		}else if(cause == 2){
			this.caster.Stop();
			this.caster.actor.startAnimation(Anim.stand);
		}else if(cause == 3){
			//interrup attack and move in the general direction of the target
			this.caster.Flee(2*this.caster.x - this.targetUnit.x + 5*(RAND()-0.5), 2*this.caster.y - this.targetUnit.y + 5*(RAND()-0.5));
		}
	}
}

Task.loop_action = function(){
	if(this.abilityInstance.actionCooldownCounter <= 0){
		if(!this.caster.can_see_unit(this.targetUnit)){
			this.Interrupt(0);
		}
		
		this.burst_progress = 0;
		if(this.abilityInstance.shots == 0){
			this.Interrupt(2);return;
		}
		this.abilityInstance.actionCooldownCounter = this.cooldown;
		this.abilityInstance.startSwing(this.targetUnit);
		if(this.caster.proto.swingSound){
			this.caster.proto.swingSound.play_by_object( this.caster );
		}
		/*if(this.caster.crew != null){
			this.caster.crew[0].Stop();
			this.caster.crew[0].actor.startAnimation(Anim.attack);
		}
		if(this.caster.grabbedActor != null){
			this.caster.ReleaseGrabbedActor(RAND()*0.05, 0.05 + RAND()*0.07, 0.07 + RAND()*0.07, -0.05);
		}*/
		this.range = this.range_default + this.caster.attackProgressRangeBonus;
	}
	//if(this.abilityInstance.actionCooldownCounter == this.cooldown-this.swingTime){
	if(this.abilityInstance.actionCooldownCounter == this.cooldown-this.swingTime - this.burst_progress*this.burst_cooldown){
		this.abilityInstance.lastTarget = this.targetUnit;
		this.abilityInstance.Effect(this.caster, this.targetUnit);
		this.abilityInstance.shots --;
		if(this.burst_progress < this.burst_count){
			this.burst_progress++;
		}else{ //burst is over
			this.range = this.range_default; //negate effect of attackProgressRangeBonus
		}
	}
}

Task.AttackTask_Base = function(_caster, _target, _abilityInst){
	var t = new AttackTask(_caster, _target, _abilityInst);
	return t;
}

Task.ChaseTask = function( _caster, _target, _abilityInst){
	var t = new MovementTask(_caster);
	t.id = Task.id_ChaseTask;
	t.targetUnit = _target;
	t.refreshPathToTarget = Task.refreshPathToTarget;
	
	//if true, the unit can look for alternatives to chase, thus eliminating various kiting exploits
	t.canChangeTarget = true; 
	t.acquisitionRange = t.caster.acquisitionRange * 0.6;
	t.attackTaskConstructor = Task.AttackTask_Base;

	t.abilityInstance = _abilityInst;
	if(_abilityInst == null){
		t.abilityInstance = t.caster.attackAbility;
	}
	
	t.ability = t.abilityInstance.proto;
	if(t.ability.inheritFromAttack == false){
		t.range = t.ability.castRange;
		t.arrivalBuffer = t.ability.arrivalBuffer;
		t.rangedTargeting = t.ability.rangedTargeting;
		t.targetFilter = t.ability.targetFilter.filterFunction;
	}else{
		t.range = t.caster.attackRange;
		t.rangedTargeting = t.caster.rangedTargeting;
		t.arrivalBuffer = t.caster.attackArrivalBuffer;
		t.targetFilter = t.caster.EnemyFilter.filterFunction;
	}
	
	t.specialEndCondition = Utils.FALSE;
	/*if(t.ability.chaseForever == false){
		t.specialEndCondition = Task.ChaseEndCondition_default;
	}else{
		t.specialEndCondition = Utils.FALSE;
	}*/
	
	t.reactionTime = 0;
	t.dirDuration = 0;
	t.last_target_dir = 0;
	t.dir = 0;
	
	t.loop = function(){
		this.reactionTime = Math.max(0, this.reactionTime - 1);
		if(!this.targetUnit || !this.targetFilter(this.caster, this.targetUnit) ){
			if(this.targetUnit&&this.targetUnit.replace_alias){
				//maybe target has just changed owner or type
				this.targetUnit = this.targetUnit.replace_alias;
			}else{
				this.Interrupt(1);
			}
			return;
		}else if(this.specialEndCondition() == true ){ 
			//evvel vigyazz. Ha a can_return_here_from_chase nincs as also taskon beallitva, bajok lehetnek
			this.Interrupt(2);
			return;
		}else if(this.reactionTime <= 0 && this.unit_inrange_check(this.targetUnit)==true && this.caster.inner_counter%10 == 0){
			if(this.range < 3 || this.caster.can_see_unit(this.targetUnit)){
				//target in range
				var dist = Unit_Distance(this.caster, this.targetUnit);
				var attackChance = Math.min(0.85,  0.15 + Math.max(0, 1-dist*0.15));//attack less often if target is far away
				if(RAND()< attackChance ){ 
					this.Interrupt(0);
					return;
				}
			}				
		}
		
		this.dirDuration --;
		this.caster.angle = this.dir;
		if(this.caster.inner_counter %5 == 0){
			var targetDir = this.targetUnit.x != this.caster.x ? Math.atan2((this.targetUnit.x - this.caster.x ),(this.targetUnit.y - this.caster.y)) : 1.57;
			 
			if(this.dirDuration <= 0 || 
			Math.abs(this.last_target_dir - targetDir) > 0.6 ){ //target has moved
				this.last_target_dir = targetDir;
				this.newChaseDir();
			}
			
			if(this.caster.inner_counter %15 == 0){
				if(this.caster.proto.chaseSound && Math.random()<0.1){
				this.caster.proto.chaseSound.playAt(this.caster.x, this.caster.y);
				}
			}
		}
 
			
		if(this.caster.moving == false){
			if(this.caster.stationary == true){
				console.log("WUT");
			}else{
				console.log("WUTX",this.caster.name);
			}
			this.Interrupt(2);
			//this.Interrupt(1);
			return;
		}
	}
	
	t.onCollision = function(triangle){
		if(triangle && this.caster.proto.can_use_sectors && triangle.getSector().doorZ && triangle.getSector().monsters_can_use){
			triangle.getSector().onUse();
			this.dirDuration = Math.max(this.dirDuration, 150);
		}else{
			if(this.caster.inner_counter % 2 == 0){
				if(triangle && (triangle.plane[0]||triangle.plane[1])){
					this.dir = Math.atan2(triangle.plane[0], triangle.plane[1]);
					if(this.caster.last_floor_collider){ //local angle
						this.dir += this.caster.last_floor_collider.rotZ;
					}
					var r = RAND();
					if(r<0.4){ //try walking parallel to the wall
						this.dir += 1.57*(RAND()*0.5+0.75);
					}else if(r<0.8){
						this.dir -= 1.57*(RAND()*0.5+0.75);
					}else{
						//perpendicular
					}
				}else{
					var steerDir = Math.sign(RAND()-0.5);
					var steerAmt = Math.max(0.8, RAND()*2);	
					this.dir += steerAmt * steerDir;
				}
				this.dirDuration = 20 + RAND()*80;
			}
		}
	}
	
	t.newChaseDir = function(){
		var steer = (RAND()-0.5)*2;//3.14 ;
		if(this.caster.attackRange < 5){
			steer *= 0.6;
		}
		var dist = Unit_Distance(this.caster,this.targetUnit);
		this.dirDuration = 30 + RAND()*60
		if(dist < 5){
			steer *= 0.5;
			if(dist < 2){
				steer *= 0.5;
			}
		}
		this.dir = this.last_target_dir + steer;
	}

	
	t.Start = function(){
		this.Resume();
		this.reactionTime = 8;
		//if(this.unit_inrange_check(this.targetUnit)==true){ //DISABLE FOR DOOMCLONE
		//	this.Interrupt(0);
		//	return;
		//}
	}
	t.Resume = function(){
		this.refreshPathToTarget();
		this.caster.guarding = false;
		this.newChaseDir();
	}
	
	t.Interrupt = function(cause){
		if(cause == 0){ //start attacking
			this.caster.changeSubTask( this.attackTaskConstructor(this.caster, this.targetUnit, this.abilityInstance ));
		}else if(cause == 1){ //look for new target
			this.targetUnit = this.caster.guardTask.getNewChaseTarget();
			
			if(this.targetUnit == null){
				this.caster.removeTopSubTask();
			}else{
				this.refreshPathToTarget();
			}
		}else if(cause == 2){ //return to camp point
		console.log("camp");
			this.caster.removeTopSubTask();
			this.caster.guardTask.setChasePause(15);
		}
	}
	
	return t;
}

Task.ChaseEndCondition_default = function(){
	return Unit.outOfChaseRadius(this.caster);
}

Task.ChaseTask_SingleTarget = function( _caster, _target, _abilityInst){
	var t = Task.ChaseTask(_caster, _target, _abilityInst);
	t.id = Task.id_ChaseTask_SingleTarget;
	t.canChangeTarget = false;
	t.specialEndCondition = Utils.FALSE;
	return t;
}

Task.FleeTask = function(_caster, _targetPoint){
	var t = new MovementTask(_caster);
	t.id = Task.id_FleeTask;
	t.targetPoint = _targetPoint;
	t.fleeAngle = _targetPoint.x != t.caster.x ? Math.atan2((_targetPoint.x - t.caster.x),(_targetPoint.y - t.caster.y)) : 1.57;
	t.timeLeft = 0;
	t.loop = function(){
		this.caster.fleeSpeedBonus *= 0.9;
		if(this.caster.moving == false){return;}
		this.caster.angle = this.fleeAngle;
		this.timeLeft --;
		if(this.timeLeft <= 0 || Unit_Distance(this.caster, this.targetPoint) < 0.2){
			this.Interrupt(0);return;
		}
	}
	
	t.Start = function(){
		this.caster.moving = true;
		this.caster.startGuard();
		this.caster.fleeSpeedBonus = 1 + RAND()*0.5;
		this.timeLeft = 20 + RAND()*10;
		this.caster.guardTask.setChasePause(this.timeLeft - 10);
		this.caster.fleeSpeedBonus = 0;
	}
	
	t.onCollision = function(){
		this.fleeAngle += RAND()*6.28 - 3.1415;
	}
	
	t.Interrupt = function(cause){
		if(cause == 0){ //quit fleeing
			this.caster.fleeSpeedBonus = 0;
			this.caster.removeTopSubTask();
		}
	}
	t.Finish = function(){
		this.caster.fleeSpeedBonus = 0;
	}
	return t;
}

function StunTask(_caster, _time){
	this.caster = _caster;
	this.timeLeft = _time;
	this.id = Task.id_StunTask;
	this.loop = function(){
		this.timeLeft --;
		if(this.timeLeft <= 0){
			this.Interrupt(0);return;
		}
	}
	this.Interrupt = function(cause){
		if(cause == 0){ //end of stun	
			this.caster.actor.startAnimation(Anim.stand);
			this.caster.removeTopSubTask();
		}
	}
	this.Start = function(){
		this.caster.moving = false;
		this.caster.guarding = false;
		//this.caster.actor.startAnimation(Anim.stand);
	}
}

function KickTask(_caster, _force){
	this.caster = _caster;
	this.force = _force;
	this.id = Task.id_KickTask;
	this.loop = function(){
		this.caster.gridPressureVector.x -= Math.sin(this.caster.angle)*this.force;
		this.caster.gridPressureVector.y -= Math.cos(this.caster.angle)*this.force;
		this.caster.removeTopSubTask();
	}
}

function JumpTask(_caster, _targetPoint, _targetUnit, _time ){
	this.caster = _caster;
	this.timeLeft = _time;
	this.id = Task.id_JumpTask;
	var startTime = _time;
	var startZ = this.caster.z;
	this.dirX = 0;
	this.dirY = 0;
	this.dirZ = 0;
	this.targetPoint = _targetPoint;
	this.targetUnit = _targetUnit;

	this.loop = function(){
		this.timeLeft --;

		if(this.caster.Attack == Unit.Attack_Charge && this.targetUnit){
			//CHARGE
			if(startTime - this.timeLeft > this.caster.swingTime){
				this.caster.dx += this.dirX*0.25;
				this.caster.dy += this.dirY*0.25;
				this.caster.dz += this.dirZ * 0.1;
				this.caster.goalZ = this.targetUnit.z;
				if(Utils.distance_xxyyzz(this.caster.x, this.targetUnit.x,
				this.caster.y, this.targetUnit.y,this.caster.z+this.caster.collZ, this.targetUnit.z) < this.targetUnit.hardRadius+0.8){
					this.caster.Attack = Unit.Attack_Instant;
					this.caster.Attack(this.caster.task.targetUnit);
					this.caster.Attack = Unit.Attack_Charge;
					this.caster.task.targetUnit.windPressureVector.x += this.caster.dx*2;
					this.caster.task.targetUnit.windPressureVector.y += this.caster.dy*2;
					this.Interrupt(0);
					return;
				}
				if(Math.floor(this.timeLeft) % 3 == 0){
					//Actor.SpawnRocketExplosion( this.caster.actor.x, this.caster.actor.y, this.caster.actor.z+0.46, 0.7, 0);
				}
			}else if(startTime - this.timeLeft == this.caster.swingTime){
				SoundObject.scream_soul.play_by_object(this.caster);
				//SoundObject.Hah.play(this.caster.x-cam.pos[0], this.caster.y-cam.pos[1],0.7);
				//ParticleActor.SpawnHorseDust(this.caster.x,this.caster.y,this.caster.z, this.caster.angle); 
				//ParticleActor.SpawnDebris(this.caster.x,this.caster.y,this.caster.z, this.caster.angle,0.8);
				this.caster.windPressureVector.x += this.dirX*0.05;
				this.caster.windPressureVector.y += this.dirY*0.05;
			}
		}else{
			var angle = Math.atan2( this.targetPoint.x - this.caster.x , this.targetPoint.y - this.caster.y);
			this.dirX = Math.sin(angle);
			this.dirY = Math.cos(angle);
			this.caster.dx += this.dirX*0.2;
			this.caster.dy += this.dirY*0.2;
			/*if(startTime > 0){
				var interp = this.timeLeft/startTime;
				this.caster.windPressureVector.z = Math.max(interp-0.5, 0) * 0.6;
			}*/
		}
			
		if(this.timeLeft <= 0){
			this.Interrupt(0);return;
		}
	}
	
	this.Interrupt = function(cause){
		if(cause == 0){ //end of jump
			if(this.caster.task == this){
				this.caster.removeTopSubTask();
				if(this.caster.Attack == Unit.Attack_Jump &&
				this.caster.task.targetUnit 
				&& Unit_Distance(this.caster, this.caster.task.targetUnit) < 1){
					this.caster.Attack = Unit.Attack_Instant;
					this.caster.Attack(this.caster.task.targetUnit);
					this.caster.Attack = Unit.Attack_Jump;
				}
			}
			if(this.caster.Attack == Unit.Attack_Charge || this.caster.Attack == Unit.Attack_Jump ){
				this.caster.attackAbility.actionCooldownCounter = 2;
			}
		}
	}
	
	this.Start = function(){
		this.caster.moving = false;
		this.caster.guarding = false;
		var angle = Math.atan2( this.targetPoint.x - this.caster.x , this.targetPoint.y - this.caster.y);
		this.dirX = Math.sin(angle);
		this.dirY = Math.cos(angle);
		this.dirZ = (this.targetPoint.z - this.caster.z)/Math.max(1, Unit_Distance(this.targetPoint, this.caster));
		if(this.caster.Attack == Unit.Attack_Jump){
			this.caster.windPressureVector.z = 0.15;
			if(this.caster.proto.attackSound){
				this.caster.proto.attackSound.playAt(this.caster.x,this.caster.y);
			}
			//if(this.caster.on_ceiling){
			//	this.caster.fall_from_ceiling();
			//}
		}
	}
}


function IdleTask(_caster){
	this.id = Task.id_IdleTask;
	this.caster = _caster;
	this.can_return_here_from_chase = true;
	this.arrivalBuffer_small = 0.2 + this.caster.proto.speed*2 + this.caster.hardRadius;
	this.minimal_movement_treshold = 0.005; //if position delta is less than this, we consider the unit stationary
	this.arrivalBuffer_large = 3;
	
	this.timeLeft = -1;
	
	this.loop = function(){
		if(this.caster.inner_counter % 10 == 0){ //ZYKLON, otherwise %5
			if((this.caster.container || this.caster.followUnit == null) && Gamestats.allowWander == true && RAND()<this.caster.wanderChance){
				Unit.Wander(this.caster);
			}else if(this.timeLeft<0){
				/*if(this.caster.formation_fix_pos == true && 
				Math.abs(this.caster.dx)<this.minimal_movement_treshold && Math.abs(this.caster.dy)<this.minimal_movement_treshold){
					if( Utils.distance_xxyy(this.caster.x, this.caster.preferred_pos.x, this.caster.y, this.caster.preferred_pos.y) > this.arrivalBuffer_small){
						this.caster.addSubTask( Task.Alone_Move_Task( this.caster, this.caster.preferred_pos, this.caster.attackAbility ));
					}
				}else{
					if( Utils.distance_xxyy(this.caster.x, this.caster.preferred_pos.x, this.caster.y, this.caster.preferred_pos.y) > this.arrivalBuffer_large
						|| this.caster.crewedUnit != null &&
						Utils.distance_xxyy(this.caster.x, this.caster.preferred_pos.x, this.caster.y, this.caster.preferred_pos.y) > 0.4){
						this.caster.addSubTask( Task.Alone_Move_Task( this.caster, this.caster.preferred_pos, this.caster.attackAbility));
					}
				}*/
			}
			
		}
		
		if(this.timeLeft > 0){
			this.timeLeft --;
		}else if(this.timeLeft == 0){ //only works if task is not base task
			this.caster.removeTopSubTask();
		}
	};
	
	this.Start = function(){
		this.caster.moving = false;
		this.caster.fighting = false;
		this.caster.startGuard();
	}
	
	this.Resume = this.Start;
}

Task.Alone_Move_Task = function( _caster, _targetPoint, _abilityInst, isAttackMove){
	var t = new MovementTask(_caster);
	t.id = Task.id_Alone_Move_Task;
	t.targetPoint = _targetPoint;
	t.timeLeft = -1;
	
	t.abilityInstance = _abilityInst;
	if(_abilityInst == null){
		t.abilityInstance = _caster.movementAbility;
	}
	
	t.ability = t.abilityInstance.proto;
	t.isAttackMove = t.ability.lookForTarget;
	
	t.canAttackWhileMoving = t.caster.hasTurret == true;
	t.targetUnit = null;
	t.acquisitionRange = t.caster.acquisitionRange;
	t.acquisitionRange_small = Math.min(2,t.caster.acquisitionRange * 0.5);
	t.range = t.caster.attackRange;
	t.rangedTargeting = t.caster.rangedTargeting;
	t.arrivalBuffer = t.caster.attackArrivalBuffer;
	t.cooldown = t.caster.attackCooldown;
	t.swingTime = t.caster.swingTime;
	t.range = t.caster.attackRange;
	t.loop_action = Task.loop_action_moving;
	t.abilityInstance_special = t.abilityInstance;
	//inherit from last task
	if(t.caster.task.canAttackWhileMoving == true){
		t.targetUnit = t.caster.task.targetUnit;
		t.cooldown_counter = t.caster.task.cooldown_counter;
	}
	t.loop = Task.Alone_Move_Task.loop;
	t.Start = Task.Alone_Move_Task.Start;
	t.Interrupt = Task.Alone_Move_Task.Interrupt;
	
	return t;
}
Task.Alone_Move_Task.loop = function(){
	if(this.timeLeft > 0){
		this.timeLeft--;
		if(this.timeLeft == 0){
			this.Interrupt(0);
		}
	}
	if(this.caster.moving == false){
		return;
	}
	if(this.caster.followUnit != null && this.caster.crewedUnit == null){
		if( Unit_Distance(this.caster, this.caster.followUnit) < this.caster.followArrivalBuffer){
			this.Interrupt(0);
		}
	}
	if( this.Next_Node_Reached() == true ){
		if(this.path_node_counter < this.Path.length-1 || this.destNode != this.finaldestNode){ //point we arrived at is not the last one along the path
			this.Set_Next_Dest();
		}else{
			this.Interrupt(0);
		}
	}
	
	if(this.caster.inner_counter%30==0 && this.caster.moving == true){
		this.SetMovePath(this.targetPoint.x, this.targetPoint.y,null);
	}
	
	if(this.canAttackWhileMoving == true){
		if(this.targetUnit != null && this.targetUnit.alive == true && this.unit_inrange_check(this.targetUnit) == true){
			Unit.facePointXY(this.caster, this.targetUnit.x, this.targetUnit.y, false);
			this.loop_action();
		}else{
			this.targetUnit = null;
			if(this.caster.inner_counter %10 == 1){
				if(this.caster.guardTask.timestamp < Task.utility_timestamp - 8){
					this.targetUnit = this.caster.GetNearestUnitWithFilter(this.acquisitionRange, this.caster.GuardFilter, true);
					if(this.targetUnit == null){
						this.caster.GetNearestUnitWithFilter(this.acquisitionRange*0.3, SearchFilter.broadcastGuardtaskTimestamp, false);
					}
				}else{
					this.targetUnit = this.caster.GetNearestUnitWithFilter(this.acquisitionRange_small, this.caster.GuardFilter, true);
				}
			}
		}
	}
}
Task.Alone_Move_Task.Start = function(){
	this.SetMovePath(this.targetPoint.x, this.targetPoint.y,null);
	if(this.isAttackMove == true){
		this.caster.startGuard(  );
	}
}
Task.Alone_Move_Task.Interrupt = function(cause){
	if(this.caster.taskStack.length > 0){
		this.caster.removeTopSubTask();
	}else{
		this.caster.Stop();
	}
}

Task.loop_action_moving = function(){
	if(this.abilityInstance_special.actionCooldownCounter <= 0){
		this.abilityInstance_special.actionCooldownCounter = this.cooldown;
		this.abilityInstance_special.startSwing(this.targetUnit);
	}
	if(this.abilityInstance_special.actionCooldownCounter== this.cooldown-this.swingTime){
		this.caster.Attack(this.targetUnit);
	}
}

function DeadTask( _caster){
	this.id = Task.id_DeadTask;
	this.caster = _caster;
	this.loop = function(){
		
	}
}


function GuardTask(_caster){
	this.caster = _caster;
	this.acquisitionRange = this.caster.acquisitionRange;
	this.acquisitionRange_small = Math.min(2,this.caster.acquisitionRange * 0.5);
	this.target = null;
	this.timestamp = 0;
	this.chasePauseTimer = 0;
	this.abilityInstance = null;
	this.custom_constructor = null;
	this.injectTarget = GuardTask.injectTarget;
	this.getNewChaseTarget = GuardTask.getNewChaseTarget;
	this.loop = function(){
		if(this.target != null){
			/*if(this.caster.task.can_return_here_from_chase == true){
				this.caster.chaseStartPos.x = this.caster.x;
				this.caster.chaseStartPos.y = this.caster.y;
			}
			if(this.caster.rangedTargeting == false){
				this.caster.GetNearestUnitWithFilter(3, SearchFilter.broadcastGuardtaskTarget, false);
			}*/
			if(this.caster.proto.alertSound){
				this.caster.proto.alertSound.playAt(this.caster.x, this.caster.y);
			}
			if(this.caster.stationary){
				this.caster.addSubTask( Task.AttackTask_Base( this.caster, this.target, this.abilityInstance));
			}else{
				this.caster.addSubTask( Task.ChaseTask( this.caster, this.target, this.abilityInstance));
			}
			this.target = null;
		}else{
			if(this.caster.inner_counter %10 == 1){
				this.target = this.caster.get_target_raycast();
				/*if(this.timestamp < Task.utility_timestamp - 8){
					this.target = this.caster.GetNearestUnitWithFilter(this.acquisitionRange, this.caster.GuardFilter , true);
					if(this.target == null){
						this.caster.GetNearestUnitWithFilter(this.acquisitionRange*0.3, SearchFilter.broadcastGuardtaskTimestamp, false);
					}
				}else{
					this.target = this.caster.GetNearestUnitWithFilter(this.acquisitionRange_small, this.caster.GuardFilter , true);
				}*/
			}
		}
	}
}
GuardTask.prototype.setChasePause = function(amt){
	this.chasePauseTimer = amt;
}
GuardTask.injectTarget = function(target){
	if(target.alive){
		this.target = target;
	}
}

GuardTask.getNewChaseTarget = function(){
	return this.caster.GetNearestUnitWithFilter(this.caster.acquisitionRange, this.caster.GuardFilter, true);
}

Task.GuardTask_Base = function(_caster){
	var t = new GuardTask(_caster);
	return t;
}

Task.GuardTask_NONE = function(_caster){
	var t = new GuardTask(_caster);
	t.custom_constructor = Task.GuardTask_NONE;
	t.getNewChaseTarget = function(){
		return null;
	}
	t.loop = function(){
		this.target = null;
	}
	return t;
}

Task.GuardTask_Stationary = function(_caster){
	var t = new GuardTask(_caster);
	t.loop = function(){
		if(this.target != null){
			if(this.caster.rangedTargeting == false){
				this.caster.GetNearestUnitWithFilter(this.acquisitionRange_small, SearchFilter.broadcastGuardtaskTarget, false);
			}
			this.caster.addSubTask( Task.AttackTask_Base( this.caster, this.target, null));
			this.target = null;
		}else{
			if(this.caster.inner_counter %15 == 1){
				
				if(this.timestamp < Task.utility_timestamp - 8){
					this.target = this.caster.GetNearestUnitWithFilter(this.acquisitionRange, this.caster.GuardFilter, true);
					if(this.target == null){
						this.caster.GetNearestUnitWithFilter(this.acquisitionRange*0.3, SearchFilter.broadcastGuardtaskTimestamp, false);
					}
				}else{
					this.target = this.caster.GetNearestUnitWithFilter(this.acquisitionRange_small, this.caster.GuardFilter, true);
				}
			}
		}
	}
	return t;
}

Task.GuardTask_Swarm = function(_caster){
	var t = new GuardTask(_caster);
	//t.acquisitionRange = t.caster.acquisitionRange;
	//t.acquisitionRange_small = Math.min(2,t.acquisitionRange * 0.5);
	
	t.loop = function(){
		if(this.target != null){
			if(this.caster.task.can_return_here_from_chase == true){
				this.caster.chaseStartPos.x = this.caster.x;
				this.caster.chaseStartPos.y = this.caster.y;
			}
			this.caster.addSubTask( Task.ChaseTask_Swarm( this.caster, this.target));
			this.target = null;
		}else{
			if(this.caster.inner_counter%30==0){
				if(this.caster.flyingHeight > 0.5 || Node.isWalkable(this.caster.atNode) == false){ //when they're on top of each other or on a wall
					return;
				}
				if(this.timestamp < Task.utility_timestamp - 8){
					this.target = this.caster.GetNearestUnitWithFilter(this.acquisitionRange, this.caster.GuardFilter, true);
					if(this.target == null){
						this.caster.GetNearestUnitWithFilter(this.acquisitionRange*0.4, SearchFilter.broadcastGuardtaskTimestamp, false);
					}else if(this.caster.rangedTargeting == false){
						this.caster.GetNearestUnitWithFilter(this.acquisitionRange_small, SearchFilter.broadcastGuardtaskTarget, false);
					}
				}else{
					this.target = this.caster.GetNearestUnitWithFilter(this.acquisitionRange_small, this.caster.GuardFilter, true);
				}
			}
		}
	}
	return t;
}

Task.getSaveState = function(t){
	var d = [t.id];
	d[1] = t.abilityInstance?t.caster.Abilities.indexOf(t.abilityInstance):-1;
	d[2]=t.finaldest?[t.finaldest.x,t.finaldest.y]:null;
	d[3]=t.targetUnit?Units.indexOf(t.targetUnit):-1;
	d[4]=t.targetPoint?[fixed2(t.targetPoint.x), fixed2(t.targetPoint.y)]:null;
	d[5]=t.timeLeft?t.timeLeft:-1;
	d[6]=t.isAttackMove;
	return d;
}
Task.loadSaveState = function(d, u){
	var id = d[0];
	var tPoint = d[4];
	var ability = d[1]>=0?u.Abilities[d[1]]:null;
	var timeLeft = d[5];
	var isAttackMove = d[6];	
	var targetUnit = d[3]>=0?Units[d[3]]:null;
	if(id == Task.id_HotspotMoveTask){
		var t=new HotspotMoveTask(u);
	}else if(id == Task.id_Alone_Move_Task){
		var t=Task.Alone_Move_Task(u,new Point(tPoint[0],tPoint[1]),ability, isAttackMove );
	}else if(id == Task.id_ChaseTask && targetUnit){
		var t=Task.ChaseTask(u, targetUnit, ability);
	}else if(id == Task.id_ChaseTask_SingleTarget && targetUnit){
		var t=Task.ChaseTask_SingleTarget(u, targetUnit, ability);
	}else if(id == Task.id_ChaseTask_Swarm && targetUnit){
		var t=Task.ChaseTask_Swarm(u, targetUnit);
	}else if(id == Task.id_AttackTask_Base && targetUnit){
		var t=Task.AttackTask_Base(u, targetUnit, ability);
	}else if(id == Task.id_AttackTask_Swarm && targetUnit){
		var t=Task.AttackTask_Swarm(u, targetUnit);
	}else if(id == Task.id_IdleTask){
		var t=new IdleTask(u);
	}else if(id == Task.id_StunTask){
		var t=new StunTask(u,timeLeft);
	}else{
		var t=new StunTask(u, 1);
	}
	if(timeLeft >=0){
		t.timeLeft = timeLeft;
	}
	return t;
}