function Formation(_destx, _desty, _size){
	this.angle = RAND() * 0.1

	this.size = _size;
	//this.width = 5+Math.floor(RAND()*15);
	//this.width = Math.round(Math.sqrt(this.size));
	//this.height = Math.round(Math.sqrt(this.size));
	this.height = Math.ceil(Math.sqrt(this.size) * 0.5);
	this.width = Math.ceil(this.size/this.height);
	
	this.spread = 0.7;
	
	this.center_path = new Point(_destx, _desty);
	this.center_finish = new Point(_destx, _desty);
	this.numberOfUnits = 0;
	
	this.addUnit = function( unit){
		unit.formationID = this.numberOfUnits;
		unit.formation = this;
		unit.preferred_facing = 1.57 - this.angle;
		this.numberOfUnits ++;
	}
	
	//modifies xx and yy to conform to the formation
	this.getFormationPos = function(unit, xx , yy){
		var row = Math.floor(unit.formationID /this.width);
		var col = unit.formationID % this.width;
		
		var offX = (row - this.height/2) * this.spread;
		var offY = (col - this.width/2) * this.spread;
		
		//offX = Math.cos(col/this.width * 6.28) * this.width;
		//offX = row-this.height/2 + Math.abs( unit.formationID % this.width - this.width/2);
		
		var formX = xx  + offX*Math.cos(this.angle) - offY*Math.sin(this.angle) + (RAND()-0.5)*0.2;
		var formY = yy  + offX*Math.sin(this.angle) + offY*Math.cos(this.angle) + (RAND()-0.5)*0.2;
		
		formX = Math.max(0.01, Math.min(Pathfinder.mapW-0.01, formX));
		formY = Math.max(0.01, Math.min(Pathfinder.mapH-0.01, formY));
		return new Point( formX, formY);
	}
	
	this.world_move_update = function(offX, offY){
		this.center_path.x -= offX;
		this.center_finish.x -= offX;
		
		this.center_path.y -= offY;
		this.center_finish.y -= offY;
	}

}

var pf = Pathfinder;

function MoveOrder(_pf, _destx, _desty, _original_size){
	this.dest = new Point(_destx,_desty);
	this.GroupMoveOrders = [];
	this.Members = [];	
	this.formation = new Formation(_destx, _desty, _original_size);
}

MoveOrder.prototype.addMember = function(task){
	//unsubscribe from old order
	if(task.groupMoveOrder != null){
		task.groupMoveOrder.removeMember(task);
	}
	
	var n = task.caster.atNode;
	var group = null;
	
	//If there's no group in the unit's area belonging to this order, then we create one
	//We use Dijkstra for partitioning
	if(n.lastCheckedGroupOrderAffiliation == null || n.lastCheckedGroupOrderAffiliation.parentOrder != this){
		group = new GroupMoveOrder(pf, this.dest.x, this.dest.y, this);
		this.GroupMoveOrders.push(group);
		//group size was 10 once, probably 7 or even 5 is better
		pf.Dijkstra_Search(n, 7, GroupMoveOrder.SetNodeAffiliation, group, task.blocker_layer);
	}else{
		group = n.lastCheckedGroupOrderAffiliation;
	}

	group.addMember(task);
	this.Members.push(task);
}

MoveOrder.prototype.setFormationShape = function(_angle, _width, _height, _spread){
	this.formation.angle = _angle;
	this.formation.width = _width;
	this.formation.height = _height;
	this.formation.spread = _spread;
}

MoveOrder.prototype.start = function(_hasFormation){
	if(_hasFormation == true){
		for(var i=0;i<this.Members.length;++i){
			var unit = this.Members[i].caster;
			unit.formation_sort_value = unit.x * Math.cos( this.formation.angle)  + unit.y* Math.sin( this.formation.angle)
			+ unit.formation_priority * 10;
		}
		this.Members.sort( MoveOrder.formation_sort_compare );
		
		var formationRows = this.formation.width;
		
		for(var i=0;i<this.Members.length;++i){
			var unit = this.Members[i].caster;
			unit.formation_sort_value = 
			-unit.x * Math.sin( this.formation.angle)  + unit.y* Math.cos( this.formation.angle) 
			+ Math.floor(i/formationRows) * 1000;
		}
		this.Members.sort( MoveOrder.formation_sort_compare);
		
		for(var i=0;i<this.Members.length;++i){
			this.formation.addUnit( this.Members[i].caster );
		}
	}
	
	
	//we need this separate loop to ensure that the leadertask are the first ones to be calculated
	for(var i=this.GroupMoveOrders.length-1;i>=0;--i){
		for(var j=0; j<this.GroupMoveOrders[i].Members.length;++j){
			var task = this.GroupMoveOrders[i].Members[j];
			
			if(_hasFormation == true){
				var formationDest = this.formation.getFormationPos(task.caster, this.dest.x, this.dest.y);
			}else{
				var formationDest = new Point(this.dest.x, this.dest.y);
			}
			
			var formationDestNode = pf.getNodeAt(formationDest.x, formationDest.y);
			
			//position in formation might not be reachable form the center of the formation. Thus we look for an alternative
			var alternativeDestNode = pf.Get_Alternative_Node_For_Formation( pf.getNodeAt(this.dest.x, this.dest.y), formationDestNode, task.blocker_layer);
			
			if(  alternativeDestNode != null){
				formationDest.x = alternativeDestNode.nodex + RAND();
				formationDest.y = alternativeDestNode.nodey + RAND();
				task.caster.formation_fix_pos = false;
			}else{
				task.caster.formation_fix_pos = true;
			}
			
			task.orderdest.x = formationDest.x ;
			task.orderdest.y = formationDest.y ;
			
			if(task == task.groupMoveOrder.leaderTask){
				//task.SetMovePath( this.dest.x , this.dest.y);
				task.SetMovePath( formationDest.x , formationDest.y);
			}else{
				task.Follow_LeaderTask(task.groupMoveOrder.leaderTask);
			}
		}
	}
}


MoveOrder.prototype.loop = function(){
	//this.updateFormationCenter();
	
	for(var i=this.GroupMoveOrders.length-1;i>=0;--i){
		if(this.GroupMoveOrders[i].isEmpty() == true ){
			this.deleteGroup(this.GroupMoveOrders[i]);
		}else{
			this.GroupMoveOrders[i].loop();
		}
	}
	if(this.GroupMoveOrders.length == 0){
		this.remove();
	}
} 


MoveOrder.prototype.deleteGroup = function(group){
	group.cleanUp();
	this.GroupMoveOrders.splice(this.GroupMoveOrders.indexOf(group), 1);
}

MoveOrder.prototype.removeMember = function(task){
	if(task.moveOrder == this){
		task.groupMoveOrder.removeMember(task);
		this.Members.splice(this.Members.indexOf(task),1);
		task.moveOrder = null;
		task.groupMoveOrder = null;
	}
}

MoveOrder.prototype.remove = function(){
	this.GroupMoveOrders = [];
	this.Members = [];
	this.dest = null;
	pf.MoveOrders.splice(pf.MoveOrders.indexOf(this),1);
}

MoveOrder.prototype.world_move_update = function(offX, offY){
	this.dest.x -= offX;
	this.dest.y -= offY;
	for(var i=this.GroupMoveOrders.length-1;i>=0;--i){
		this.GroupMoveOrders[i].world_move_update(offX, offY);
	}
}

MoveOrder.formation_sort_compare =function(a,b){
	if(a.caster.formation_sort_value < b.caster.formation_sort_value){
		return -1;
	}else{
		return 1;
	}
}
	
function GroupMoveOrder(_pf, _destx, _desty, _parent){
	var pf = _pf;
	this.parentOrder = _parent;
	this.leaderTask = null;
	var nextId = 0; //Every unit's individual movementTask gets an id.
	this.destnode = pf.getNodeAt(_destx, _desty);
	this.dest = new Point(_destx,_desty);
	this.newLeaderTaskRequested = false;
	this.Members = [];
	
	this.addMember = function(task){
		if(nextId == 0){
			this.leaderTask = task;
		}
		task.groupMoveOrder = this;
		task.moveOrder = this.parentOrder;
		this.Members.push(task);
		task.id_in_groupMoveOrder = nextId;
		nextId ++;
	}
	
	this.removeMember = function(task){
		if(task == this.leaderTask){
			this.getNewLeaderTask();
		}
		task.groupMoveOrder = null;
		this.Members.splice(this.Members.indexOf(task),1);
	}
	
	this.loop = function(){
		this.newLeaderTaskRequested = false;
		if(this.leaderTask == null || this.leaderTask.caster.task != this.leaderTask || this.leaderTask.groupMoveOrder != this){
			this.getNewLeaderTask();
		}
	}
	
	this.setNewLeaderTask = function(task){
		this.leaderTask = task;
		this.newLeaderTaskRequested = true;
	}
	
	this.getNewLeaderTask = function(){
		this.leaderTask = this.Members[0];
	}
	
	this.isEmpty = function(){
		return (this.Members.length == 0);
	}
	
	this.cleanUp = function(){
		this.Members = [];
		this.leaderTask = null;
		this.dest = null;
	}
	
	this.world_move_update = function(offX, offY){
		this.dest.x -= offX;
		this.dest.y -= offY;
		this.destnode = pf.getNodeAt(this.dest.x, this.dest.y);
	}
}

GroupMoveOrder.SetNodeAffiliation = function(nod, order){
	nod.lastCheckedGroupOrderAffiliation = order;
	return false;
}