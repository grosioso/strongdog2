function Passable_Border(n1,n2, layer){
	return (Node.isPassable(n1, layer)  && Node.isPassable(n2, layer) );
}

function cluster(_x, _y, _size){
	this.nodex = _x;
	this.nodey = _y;
	this.size = _size;
		
	this.enemyNumArray = new Int32Array( Players.length );
	this.allyNumArray = new Int32Array( Players.length );
	this.filterArrays = [this.enemyNumArray, this.allyNumArray];
	this.heat = 0;	
	
	//one array for each side
	//right/up/left/down/special
	//var Gates = [[],[],[],[],[]]; //fifth side is the middle, for start- and endpoints
	this.Gates_All_Sizes = [ [[],[],[],[],[]], [[],[],[],[],[]], [[],[],[],[],[]]];
}

cluster.prototype.world_move_update = function(clustOffX, clustOffY){
	this.nodex -= clustOffX;
	this.nodey -= clustOffY;
	
	for(var k = 0; k<this.Gates_All_Sizes.length;++k){
		var gateArr = this.Gates_All_Sizes[k];
		for(side = 0; side < 5; ++ side){
			for(i=0;i < gateArr[side].length; ++ i){
				gateArr[side][i].world_move_update();
			}
		}
	}
}

cluster.prototype.addLiveUnit = function(unit){
	this.heat += unit.proto.structureHeat;
	if(unit.alive == false){
		return;
	}
	for(var i=0;i<this.enemyNumArray.length;++i){
		if(i != unit.owner.id){
			this.enemyNumArray[i]++;
		}
	}
	this.allyNumArray[unit.owner.id]++;
}

cluster.prototype.removeLiveUnit = function(unit){
	this.heat -= unit.proto.structureHeat;
	if(unit.alive == false){
		return;
	}
	for(var i=0;i<this.enemyNumArray.length;++i){
		if(i != unit.owner.id){
			this.enemyNumArray[i]--;
		}
	}
	this.allyNumArray[unit.owner.id]--;
}

//CreateGate_XXX - vegigpasztazza az adott oldalt, akadalytol akadalyig. 6-nal hosszabb resbe 2 kaput is tesz
//visszaadja a kereses veget, hogy a fo fuggveny folytathassa a pasztazast
cluster.prototype.CreateGate_RIGHT = function(i, gateArr, layer){
	var pos = i;
	while(pos<this.size){
		if(Passable_Border(Pathfinder.map[this.nodey*this.size + pos][(this.nodex + 1)*this.size - 1],
		Pathfinder.map[this.nodey*this.size + pos][(this.nodex + 1)*this.size], layer) && pos < this.size-1){
			++pos;
		}else{
			if(pos-i<6){
				gateArr[0].push(new clusterGate(this.size - 1 ,(pos+i)/2,0,this));//Right side x is 7, right index is 0
			}else{
				gateArr[0].push(new clusterGate(this.size - 1 ,i+1,0,this));//Right side x is 7, right index is 0
				gateArr[0].push(new clusterGate(this.size - 1 ,pos-2,0,this));//Right side x is 7, right index is 0
			}
			break;
		}
	}
	return pos;
}
	
cluster.prototype.CreateGate_LEFT = function(i, gateArr, layer){
	var pos = i;
	while(pos<this.size){
		if(Passable_Border(Pathfinder.map[this.nodey*this.size + pos][this.nodex*this.size],
		Pathfinder.map[this.nodey*this.size + pos][this.nodex*this.size - 1], layer) && pos< this.size-1 ){
			++pos;
		}else{
			if(pos-i < 6){
				gateArr[2].push(new clusterGate(0,(pos+i)/2,2,this));//Left side x is 0, left index is 2
			}else{
				gateArr[2].push(new clusterGate(0,i+1,2,this));//Left side x is 0, left index is 2
				gateArr[2].push(new clusterGate(0,pos-2,2,this));//Left side x is 0, left index is 2
			}
			break;
		}
	}
	return pos;
}

cluster.prototype.CreateGate_UP = function(i, gateArr, layer){
	var pos = i;
	while(pos < this.size ){
		if(Passable_Border(Pathfinder.map[this.nodey*this.size][this.nodex*this.size + pos], 
		Pathfinder.map[this.nodey*this.size -1][this.nodex*this.size +pos], layer) && pos< this.size-1){
			++pos;
		}else{
			if(pos - i <6){
				gateArr[1].push(new clusterGate((pos+i)/2,0,1,this));//Up side y is 0, up index is 1
			}else{
				gateArr[1].push(new clusterGate(i+1,0,1,this));//Up side y is 0, up index is 1
				gateArr[1].push(new clusterGate(pos-2,0,1,this));//Up side y is 0, up index is 1
			}
			break;
		}
	}
	return pos;
}

cluster.prototype.CreateGate_DOWN = function(i, gateArr,  layer){
	var pos = i;
	while(pos<this.size){
		if(Passable_Border(Pathfinder.map[(this.nodey+1)*this.size - 1][this.nodex*this.size + pos],
		Pathfinder.map[(this.nodey+1)*this.size][this.nodex*this.size + pos], layer) && pos< this.size - 1){
			++pos;
		}else{
			if(pos - i <6){
				gateArr[3].push(new clusterGate((pos+i)/2,this.size - 1,3,this));//Down side y is 7, down index is 3
			}else{
				gateArr[3].push(new clusterGate(i+1,this.size - 1,3,this));//Down side y is 7, down index is 3
				gateArr[3].push(new clusterGate(pos-2,this.size - 1,3,this));//Down side y is 7, down index is 3
			}
			break;
		}
	}
	return pos;
}

cluster.prototype.GenerateGates = function(layer){
	var i;
	this.Gates_All_Sizes[layer] = [[],[],[],[],[]];
	var gateArr = this.Gates_All_Sizes[layer];
	
	if(this.nodex < Pathfinder.mapW/this.size-1){//Right side gate generation
		for(i=0;i<this.size;++i){
			if(Passable_Border(Pathfinder.map[this.nodey*this.size + i][(this.nodex+1)*this.size - 1],
			Pathfinder.map[this.nodey*this.size + i][(this.nodex+1)*this.size], layer)){
				i=this.CreateGate_RIGHT(i, gateArr, layer);//We change 'i' to return value of the function
			}
		}
	}
	if(this.nodey >0){//Up side gate generation
		for(i=0;i<this.size;++i){
			if(Passable_Border(Pathfinder.map[this.nodey*this.size][this.nodex*this.size + i],
			Pathfinder.map[this.nodey*this.size -1][this.nodex*this.size +i], layer)){
				i=this.CreateGate_UP(i, gateArr, layer);//We change 'i' to return value of the function(folytatjuk)
			}
		}
	}
	if(this.nodex >0){//Left side gate generation
		for(i=0;i<this.size;++i){
			if(Passable_Border(Pathfinder.map[this.nodey*this.size + i][this.nodex*this.size],
			Pathfinder.map[this.nodey*this.size + i][this.nodex*this.size - 1], layer)){
				i=this.CreateGate_LEFT(i, gateArr, layer);//We change 'i' to return value of the function
			}
		}
	}
	
	if(this.nodey < Pathfinder.mapH/this.size-1){//Down side gate generation
		for(i=0;i<this.size;++i){
			if(Passable_Border(Pathfinder.map[(this.nodey+1)*this.size -1][this.nodex*this.size + i], 
			Pathfinder.map[(this.nodey+1)*this.size][this.nodex*this.size + i], layer)){
				i=this.CreateGate_DOWN(i, gateArr, layer);//We change 'i' to return value of the function
			}
			
		}
	}
	
}

//Delete obsolete gate references from the memory of this cluster AND neighboring clusters
//This is crucial for partial abstract-map re-generation
//Else we will have a references to nonexistent gates (supposedly to ones of this cluster) in the neighbors that have not been regenerated
cluster.prototype.Cleanup_Adjacency = function(layer){
	var gateArr = this.Gates_All_Sizes[layer];
	
	var i; var j;
	for(var side = 0;side < 4; ++ side){
		for(i=0;i<gateArr[side].length;++i){
			var thisGate = gateArr[side][i];
			
			for(var j=0; j< thisGate.Adjacent.length;++j){
				var otherGate = thisGate.Adjacent[j];
				if(otherGate.parentCluster != this){
					otherGate.AdjacentCost.splice( otherGate.Adjacent.indexOf(thisGate),1);
					otherGate.Adjacent.splice( otherGate.Adjacent.indexOf(thisGate),1);
				}
			}
			thisGate.Adjacent = [];
			thisGate.AdjacentCost = [];
		}
	}
}

cluster.prototype.Gates_Get_Adjacent = function(layer){
	var gateArr = this.Gates_All_Sizes[layer];
	
	var i; var j;
	for(var side = 0;side < 4; ++ side){
		for(i=0;i<gateArr[side].length;++i){
			var thisGate = gateArr[side][i];
			thisGate.Adjacent = [];
			thisGate.AdjacentCost = [];
			
			/**Gates in same cluster**/
			var side_other;
			for(side_other = 0; side_other < 4;++side_other){
				for(j=0;j<gateArr[side_other].length;++j){
					if(side != side_other || i!=j){
						thisGate.Adjacent.push(gateArr[side_other][j]);
						thisGate.AdjacentCost.push(-1);
					}
				}
			}
			
			var otherSide;
			/**Gates in neighboring clusters**/
			if(side == 0){
				otherSide = Pathfinder.map_cluster[this.nodey][this.nodex+1].Gates_All_Sizes[layer][2];
			}else if(side == 2){
				otherSide = Pathfinder.map_cluster[this.nodey][this.nodex-1].Gates_All_Sizes[layer][0];
			}else if(side == 1){
				otherSide = Pathfinder.map_cluster[this.nodey-1][this.nodex].Gates_All_Sizes[layer][3];
			}else if(side == 3){
				otherSide = Pathfinder.map_cluster[this.nodey+1][this.nodex].Gates_All_Sizes[layer][1];
			}
			
			var otherGate = otherSide[i];//same gate on the neighbouring cluster

			//If the other cluster did not yet handle the creation of adjacency data
			if(otherGate.Adjacent.indexOf(thisGate) < 0){
				otherGate.Adjacent.push(thisGate);
				otherGate.AdjacentCost.push(10);
			}
			thisGate.Adjacent.push(otherGate);
			thisGate.AdjacentCost.push(10);//the cost of one grid is 10
		}
	}
}



cluster.prototype.Gates_Get_Costs = function(layer){
	var gateArr = this.Gates_All_Sizes[layer];
	
	var i;var j;var side;
	for(side=0;side<4;++side){//for each side
		for(i=0;i<gateArr[side].length;++i){//for each gate on side
		var thisGate = gateArr[side][i];
			for(j=thisGate.Adjacent.length-1;j>=0;--j){//for every adjacent gate 
				//iterate from back to front, because we may remove elements
				if(thisGate.AdjacentCost[j] < 0){//if a distance hasn't been calculated yet (default is -1)
					//note that distance is two-way, so if we have the distance from the other gate to here, we can use that
					var otherGate = thisGate.Adjacent[j];
					var distance = Math.round(Pathfinder.Pathfind_Cluster(otherGate,thisGate,this, layer));
					
					//thisGate.AdjacentCost[j] = distance;
					//otherGate.AdjacentCost[otherGate.Adjacent.indexOf(thisGate)] = distance;
						
					if(distance < 999999){
						thisGate.AdjacentCost[j] = distance;
						otherGate.AdjacentCost[otherGate.Adjacent.indexOf(thisGate)] = distance;
					}else{ //no path found, we can remove the connection
						otherGate.AdjacentCost.splice( otherGate.Adjacent.indexOf(thisGate),1);
						otherGate.Adjacent.splice( otherGate.Adjacent.indexOf(thisGate),1);
						thisGate.AdjacentCost.splice( j,1);
						thisGate.Adjacent.splice( j,1);
					}
				}
			}
		}
	}
}

cluster.prototype.Cleanup_Adjacency_All_Layers = function(){
	this.Cleanup_Adjacency(0);
	this.Cleanup_Adjacency(1);
}
cluster.prototype.GenerateGates_All_Layers = function(){
	this.GenerateGates(0);
	this.GenerateGates(1);
}
cluster.prototype.Gates_Get_Adjacent_All_Layers = function(){
	this.Gates_Get_Adjacent(0);
	this.Gates_Get_Adjacent(1);
}
cluster.prototype.Gates_Get_Costs_All_Layers = function(){
	this.Gates_Get_Costs(0);
	this.Gates_Get_Costs(1);
}

//returns the freshly created gate
cluster.prototype.Create_Abstract_Endpoint = function(nod, layer){
	var i; var side;
	var gate = new clusterGate(nod.nodex- this.size*this.nodex,nod.nodey- this.size*this.nodey,5,this);
	
	var gateArr = this.Gates_All_Sizes[layer];
	/*S node or G node form HPA* paper*/
	for(side = 0; side < 5; ++ side){
		for(i=0;i<gateArr[side].length; ++ i){
			gate.Adjacent.push(gateArr[side][i]);
			gate.AdjacentCost.push(-1);
		}
	}
	
	gateArr[4].push(gate);

	for(i=0;i<gate.Adjacent.length;++i){
		
		var otherGate = gate.Adjacent[i];
		var dist = Pathfinder.Pathfind_Cluster(gate,otherGate,this, layer);
		gate.AdjacentCost[i] = dist;
		
		otherGate.Adjacent.push(gate);
		otherGate.AdjacentCost.push(dist);

		//DONT FORGET TO REMOVE THESE AFTER PATHFIND - done in Cleanup_AbstractStartDest
	}
	
	//Let's try a floodfill method instead of separate A* searches

	/*for(i=0; i<gate.Adjacent.length; ++ i){
		var otherGate = gate.Adjacent[i];
		var otherNode = Pathfinder.map[ otherGate.nodey][otherGate.nodex];

		otherNode.f = 99999;

		gate.AdjacentCost[i] = 99999;
	}
	//Time for good ol' Dijkstra
	Pathfinder.Set_Abstract_Endpoint_Adjacent_G_Weights(nod, gate);
	for(i=0; i<gate.Adjacent.length; ++ i){
		var otherGate = gate.Adjacent[i];
		var otherNode = Pathfinder.map[ otherGate.nodey][otherGate.nodex];
		var dist = otherNode.f;
		gate.AdjacentCost[i] = dist;
		
		otherGate.Adjacent.push(gate);
		otherGate.AdjacentCost.push(dist);
	}*/
	
	return gate;
}

cluster.prototype.Cleanup_Endpoints = function(layer){
	var gateArr = this.Gates_All_Sizes[layer];
	var i; var len; var k;
	//It is possible that the endgate and startgate are in the same cluster
	var endpoints_num =  gateArr[4].length;
	
	for(k=0;k<endpoints_num;++k){
		for(i=0;i< gateArr[4][k].Adjacent.length;++i){
			gateArr[4][k].Adjacent[i].Adjacent.pop();
			gateArr[4][k].Adjacent[i].AdjacentCost.pop();
		}
	}
	gateArr[4] = [];
}

cluster.prototype.Cleanup = function(){
	for(var i=0;i<this.Gates_All_Sizes.length;++i){
		var gateArr = this.Gates_All_Sizes[k];
		for(var i=0;i<gateArr.length;++i){
			for(var j=0;j<gateArr[i].length;++j){
				gateArr[i][j].Destroy();
			}
		}
	}
}


function clusterGate(_xx, _yy, _side, _pcluster){
	this.parentCluster = _pcluster;
	this.nodex = (_xx>>0) + this.parentCluster.nodex* this.parentCluster.size;
	this.nodey = (_yy>>0) + this.parentCluster.nodey* this.parentCluster.size;
	this.side = _side;
	this.Adjacent = [];
	this.AdjacentCost = [];
	this.h=0;
	this.f=0;
	this.g=0;
	this.pgate = null;
	this.status = 0;
	
	this.Destroy = clusterGate.Destroy;
	
	this.world_move_update = clusterGate.world_move_update;
}
clusterGate.prototype.Destroy = function(){
	this.Adjacent.length = 0;
	this.AdjacentCost.length = 0;
}
clusterGate.prototype.world_move_update = function(){
	this.nodex = (_xx>>0) + this.parentCluster.nodex* this.parentCluster.size;
	this.nodey = (_yy>>0) + this.parentCluster.nodey* this.parentCluster.size;
}

/*function DEBUG_gates_data(){
	var gates = 0;
	var edges = 0;
	for(var i=0;i<Pathfinder.map_cluster.length;++i){
		for(var j=0;j<Pathfinder.map_cluster.length;++j){
			for(var k=0;k<5;++k){
				for(var l = 0; l< Pathfinder.map_cluster[i][j].Gates[k].length;++l){
					++gates;
					edges += Pathfinder.map_cluster[i][j].Gates[k][l].Adjacent.length;
				}
			}
		}
	}
	console.log(gates,edges);
}*/

