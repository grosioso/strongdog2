var World = new Object();

World.moveQueue = [];
//the moveOps are queued so that they definitely happen in a loop, not an event
World.queueMoveOperation = function(offX, offY){
	this.moveQueue.push([offX, offY]);
}

World.move_update = function(){
	for(var i=0; i< this.moveQueue.length;++i){
		this.move_private_only( this.moveQueue[i][0], this.moveQueue[i][1]);
	}
	this.moveQueue = [];
}

World.move_private_only  = function(chunkOffsetX, chunkOffsetY){
	var offX = chunkOffsetX*Pathfinder.cluster_size;
	var offY = chunkOffsetY*Pathfinder.cluster_size;
	
	M.offsetX += offX;
	M.offsetY += offY;

	Pathfinder.move_node_map(chunkOffsetX, chunkOffsetY);
	Pathfinder.move_distance_field_map(offX, offY);
	Pathfinder.move_cluster_map(chunkOffsetX, chunkOffsetY);
	Pathfinder.Generate_Scanlines_Full(0);
	Pathfinder.Generate_Scanlines_Full(1);
	Pathfinder.move_moveOrders(offX, offY);
	M.terrain.world_move_update(chunkOffsetX, chunkOffsetY);
	Environment.world_move_update(offX, offY);
	
	for(var i=Units.length-1;i>=0;--i){
		Units[i].world_move_update(offX, offY);
	}
	for(var i=Actors.length-1;i>=0;--i){
		Actors[i].world_move_update(offX, offY);
	}
	Control.world_move_update(offX, offY);
	Pathfinder.FOW_Texture_Update();
}

Pathfinder.move_distance_field_map = function(offX, offY){
	//SHIFT DISTANCE FIELD MAP
	if(offY > 0){
		this.distanceFieldX.splice(0, this.cluster_size*2);
		this.distanceFieldY.splice(0, this.cluster_size*2);
		this.distanceField_Absolute.splice(0, this.cluster_size*2);
		
		for(var i=(this.mapH-this.cluster_size)*2;i<this.mapH*2;++i){
			this.distanceFieldX[i]=[];
			this.distanceFieldY[i]=[];
			this.distanceField_Absolute[i]=[];
			for(var j=this.mapW*2 -1;j>=0;--j){
				this.distanceFieldX[i][j] = 0;
				this.distanceFieldY[i][j] = 0;
				this.distanceField_Absolute[i][j] = this.max_distanceField;
			}
		}
	}else if(offY < 0){
		this.distanceFieldX.length = (this.mapH-this.cluster_size)*2;
		this.distanceFieldY.length = (this.mapH-this.cluster_size)*2;
		this.distanceField_Absolute.length = (this.mapH-this.cluster_size)*2;
		for(var i=0;i<this.cluster_size*2;++i){
			this.distanceFieldX.unshift([]);
			this.distanceFieldY.unshift([]);
			this.distanceField_Absolute.unshift([]);
			for(var j=this.mapW*2 -1;j>=0;--j){
				this.distanceFieldX[0][j] = 0;
				this.distanceFieldY[0][j] = 0;
				this.distanceField_Absolute[0][j] = this.max_distanceField;
			}
		}
	}
	
	if(offX > 0){
		for(var i=0;i<this.mapH*2;++i){
			this.distanceFieldX[i].splice(0, this.cluster_size*2);
			this.distanceFieldY[i].splice(0, this.cluster_size*2);
			this.distanceField_Absolute[i].splice(0, this.cluster_size*2);
			
			for(var j= (this.mapW-this.cluster_size)*2;j<this.mapW*2;++j){
				this.distanceFieldX[i][j] = 0;
				this.distanceFieldY[i][j] = 0;
				this.distanceField_Absolute[i][j] = this.max_distanceField;
			}
		}
	
	}else if(offX < 0){
		var cutArrayLength = (this.mapW-this.cluster_size)*2;
		var default_dir = []; //array segment of initial x and y distance field values
		var default_abs = []; //array segment of initial absolute distance field values
		for(var i=0;i<this.cluster_size*2;++i){
			default_abs.push(this.max_distanceField);
			default_dir.push(0);
		}
	
		for(var i=0;i<this.mapH*2;++i){
			this.distanceFieldX[i].length = cutArrayLength;
			this.distanceFieldY[i].length = cutArrayLength;
			this.distanceField_Absolute[i].length = cutArrayLength;
			
			this.distanceFieldX[i] = default_dir.concat(this.distanceFieldX[i]);
			this.distanceFieldY[i] = default_dir.concat(this.distanceFieldY[i]);
			this.distanceField_Absolute[i] = default_abs.concat(this.distanceField_Absolute[i]);
		}
	}
}


Pathfinder.move_node_map = function(clustOffX, clustOffY){
	var offX = clustOffX*this.cluster_size;
	var offY = clustOffY*this.cluster_size;
	
	//SHIFT NODE MAP
	if(offY >=0){
		for(var i=0;i<this.mapH-offY;++i){
			if(offX >= 0){
				for(var j=0;j<this.mapW-offX;++j){
					this.map[i][j] = this.map[i+offY][j+offX];
					
					//a koordinata frissitest nem vegezzuk az egesz palyara. Az ujonnan bejovo nodeok koordinatai valtozatlanul maradhatnak
					this.map[i][j].nodex -= offX;
					this.map[i][j].nodey -= offY;
					
				}
			}else{
				for(var j=this.mapW-1;j>= -offX;--j){
					this.map[i][j] = this.map[i+offY][j+offX];
					this.map[i][j].nodex -= offX;
					this.map[i][j].nodey -= offY;
				}
			}
		}
	}else{
		for(var i=this.mapH -1; i>= -offY;--i){
			if(offX >= 0){
				for(var j=0;j<this.mapW-offX;++j){
					this.map[i][j] = this.map[i+offY][j+offX];
					this.map[i][j].nodex -= offX;
					this.map[i][j].nodey -= offY;
				}
			}else{
				for(var j=this.mapW-1;j>= -offX;--j){
					this.map[i][j] = this.map[i+offY][j+offX];
					this.map[i][j].nodex -= offX;
					this.map[i][j].nodey -= offY;
				}
			}
		}
	}
	
	//palya uj szelen friss nodeokat generalunk (cluster_size-szelessegu sorban vagy oszlopban)
	if(clustOffY >0){
		for(var i=this.mapH - this.cluster_size -1;i<this.mapH;++i){
			for(var j=0;j<this.mapW;++j){
			
				this.map[i][j] = new Node(j, i, this);
			}
		}
	}else if(clustOffY < 0){
		for(var i=0;i<this.cluster_size;++i){
			for(var j=0;j<this.mapW;++j){
				this.map[i][j] = new Node(j, i, this);
			}
		}
	}
	if(clustOffX >0){
		for(var i=0;i<this.mapH;++i){
			for(var j=this.mapW-this.cluster_size -1;j<this.mapW;++j){
				this.map[i][j] = new Node(j, i, this);
			}
		}
	}else if(clustOffX < 0){
		for(var i=0;i<this.mapH;++i){
			for(var j=0;j<this.cluster_size;++j){
				this.map[i][j] = new Node(j, i, this);
			}
		}
	}
	
}
Pathfinder.move_cluster_map = function(clustOffX, clustOffY){
	var offX = clustOffX*this.cluster_size;
	var offY = clustOffY*this.cluster_size;
	
	var clustNumX = this.mapW/this.cluster_size;
	var clustNumY = this.mapH/this.cluster_size;
	
	
	//offet the clusters by a row or column or both
	if(clustOffY >=0){
		for(var i=0;i<clustNumY-clustOffY;++i){
			if(clustOffX >= 0){
				for(var j=0;j<clustNumX-clustOffX;++j){
					this.map_cluster[i][j] = this.map_cluster[i+clustOffY][j+clustOffX];
					this.map_cluster[i][j].world_move_update(clustOffX, clustOffY);
				}
			}else{
				for(var j=clustNumX-1;j>= -clustOffX ;--j){
					this.map_cluster[i][j] = this.map_cluster[i+clustOffY][j+clustOffX];
					this.map_cluster[i][j].world_move_update(clustOffX, clustOffY);
				}
			}
		}
	}else{
		for(var i=clustNumY -1; i>= - clustOffY;--i){
			if(clustOffX >= 0){
				for(var j=0;j<clustNumX-clustOffX;++j){
					this.map_cluster[i][j] = this.map_cluster[i+clustOffY][j+clustOffX];
					this.map_cluster[i][j].world_move_update(clustOffX, clustOffY);
				}
			}else{
				for(var j=clustNumX-1;j>= -clustOffX ;--j){
					this.map_cluster[i][j] = this.map_cluster[i+clustOffY][j+clustOffX];
					this.map_cluster[i][j].world_move_update(clustOffX, clustOffY);
				}
			}
		}
	}
	
	//palya uj szelen friss clustereket generalunk
	if(clustOffY >0){
		var i=clustNumY-1;
		for(var j=0;j<clustNumX;++j){
			this.map_cluster[i][j] = new cluster(j, i, this.cluster_size);
		}
	}else if(clustOffY < 0){
		var i=0;
		for(var j=0;j<clustNumX;++j){
			this.map_cluster[i][j] = new cluster(j, i, this.cluster_size);
		}
	}
	if(clustOffX >0){
		var j = clustNumX-1;
		for(var i=0;i<clustNumY;++i){
			this.map_cluster[i][j] = new cluster(j, i, this.cluster_size);
		}
	}else if(clustOffX < 0){
		var j = 0;
		for(var i=0;i<clustNumY;++i){
			this.map_cluster[i][j] = new cluster(j, i, this.cluster_size);
		}
	}

	
	//regenerate gates only on changing boundaries
	if(clustOffY != 0){
		for(var j=0;j<clustNumX;++j){
			this.map_cluster[0][j].Cleanup_Adjacency_All_Layers();
			this.map_cluster[clustNumY-1][j].Cleanup_Adjacency_All_Layers();
			if(clustOffY == -1){
				this.map_cluster[1][j].Cleanup_Adjacency_All_Layers();
			}else{
				this.map_cluster[clustNumY-2][j].Cleanup_Adjacency_All_Layers();
			}
		}
		for(var j=0;j<clustNumX;++j){
			this.map_cluster[0][j].GenerateGates_All_Layers();
			this.map_cluster[clustNumY-1][j].GenerateGates_All_Layers();
			if(clustOffY == -1){
				this.map_cluster[1][j].GenerateGates_All_Layers();
			}else{
				this.map_cluster[clustNumY-2][j].GenerateGates_All_Layers();
			}
		}
		for(var j=0;j<clustNumX;++j){
			this.map_cluster[0][j].Gates_Get_Adjacent_All_Layers();
			this.map_cluster[clustNumY-1][j].Gates_Get_Adjacent_All_Layers();
			if(clustOffY == -1){
				this.map_cluster[1][j].Gates_Get_Adjacent_All_Layers();
			}else{
				this.map_cluster[clustNumY-2][j].Gates_Get_Adjacent_All_Layers();
			}
		}
		for(var j=0;j<clustNumX;++j){
			this.map_cluster[0][j].Gates_Get_Costs_All_Layers();
			this.map_cluster[clustNumY-1][j].Gates_Get_Costs_All_Layers();
			if(clustOffY == -1){
				this.map_cluster[1][j].Gates_Get_Costs_All_Layers();
			}else{
				this.map_cluster[clustNumY-2][j].Gates_Get_Costs_All_Layers();
			}
		}
	}
	
	if(clustOffX != 0){
		for(var i=0;i<clustNumY;++i){
			this.map_cluster[i][0].Cleanup_Adjacency_All_Layers();
			this.map_cluster[i][clustNumX-1].Cleanup_Adjacency_All_Layers();
			if(clustOffX == -1){
				this.map_cluster[i][1].Cleanup_Adjacency_All_Layers();
			}else{
				this.map_cluster[i][clustNumX-2].Cleanup_Adjacency_All_Layers();
			}
		}
		for(var i=0;i<clustNumY;++i){
			this.map_cluster[i][0].GenerateGates_All_Layers();
			this.map_cluster[i][clustNumX-1].GenerateGates_All_Layers();
			if(clustOffX == -1){
				this.map_cluster[i][1].GenerateGates_All_Layers();
			}else{
				this.map_cluster[i][clustNumX-2].GenerateGates_All_Layers();
			}
		}
		for(var i=0;i<clustNumY;++i){
			this.map_cluster[i][0].Gates_Get_Adjacent_All_Layers();
			this.map_cluster[i][clustNumX-1].Gates_Get_Adjacent_All_Layers();
			if(clustOffX == -1){
				this.map_cluster[i][1].Gates_Get_Adjacent_All_Layers();
			}else{
				this.map_cluster[i][clustNumX-2].Gates_Get_Adjacent_All_Layers();
			}
		}
		for(var i=0;i<clustNumY;++i){
			this.map_cluster[i][0].Gates_Get_Costs_All_Layers();
			this.map_cluster[i][clustNumX-1].Gates_Get_Costs_All_Layers();
			if(clustOffX == -1){
				this.map_cluster[i][1].Gates_Get_Costs_All_Layers();
			}else{
				this.map_cluster[i][clustNumX-2].Gates_Get_Costs_All_Layers();
			}
		}
	}
}

Pathfinder.move_moveOrders = function(offX,offY){
	for(var i=0;i<this.MoveOrders.length;++i){
		this.MoveOrders[i].world_move_update(offX, offY);
	}
}
