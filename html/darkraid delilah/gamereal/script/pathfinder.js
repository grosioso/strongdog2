"use strict";

function Node(_x, _y, _handler){
	this.nodex = _x;
	this.nodey = _y;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.pnode = null;
	//0 == untouched, 1==open, 2==closed
	this.status = 0;
 
	this.wallZ = 0;
	this.averageZ = 0;
	this.ao = 0;
	
	this.firstColl = null;
	this.unitCount = 0;
	this.pathType = 0;
	// also checks whether or not auto water generation should remove it
	//0 = walkable, 1 = unbuildable, 2 = water, 3 = obstacle, no cover, 4+ = obstacle, cover
	
	this.walkable_private = true;
	this.passability = Pathfinder.max_distanceField;
	this.actor = null;
	this.cliffType = 15;
	this.structure = null;
	
	this.lastCheckedFormation = null;
	this.lastCheckedGroupOrderAffiliation = null;
	this.lastDijkstraSearchId = -1;
	
	this.bend_timestamp = 0;
	this.bend_x = 0;
	this.bend_y = 0;
	this.bend_timestamp_unit = 0;
	this.bend_unit_dir = 0;
}

Node.removeUnit = function(nod, u){
	//nod.Units_in_node.splice(nod.Units_in_node.indexOf(u),1);
	if(u == nod.firstColl){
		nod.firstColl = u.nextColl;
	}
	if(u.nextColl){
		u.nextColl.prevColl = u.prevColl;
	}
	if(u.prevColl){
		u.prevColl.nextColl = u.nextColl;
	}
	nod.unitCount--;
	u.prevColl = u.nextColl = null;
}

Node.addUnit = function(nod, u){
	u.prevColl = null;
	if(nod.firstColl){
		if(nod.firstColl == u){//circular reference, VERY BAD
			console.log("HAY");
		}else{
			u.nextColl = nod.firstColl;
			nod.firstColl.prevColl = u;
		}
	}else{
		u.nextColl = null;
	}
	nod.unitCount++;
	nod.firstColl = u;
}

Node.addTail = function(nod, u){
	var last=nod.firstColl;
	var prev = null;
	while(last){
		prev = last;
		last = last.nextColl;
	}
	if(prev){
		if(prev == u){//circular reference, VERY BAD
			console.log("HEY");
		}else{
			prev.nextColl = u;
		}
	}else{
		nod.firstColl = u;
	}
}


Node.getCluster = function( nod ){
	return pf.map_cluster[(nod.nodey/pf.cluster_size>>0)][(nod.nodex/pf.cluster_size>>0)];
}

Node.setWalkable = function (nod, _walkable_or_not, pathType){
	if(nod.walkable_private == _walkable_or_not){
		return;	
	}
	nod.walkable_private = _walkable_or_not;
	if(_walkable_or_not == true){
		nod.pathType = 0; //zyklon
		var update_sector_cases = Pathfinder.Get_Sector_Update_Filter(nod);
		Pathfinder.eraseDistanceField(nod.nodex,nod.nodey);
	}else{
		nod.pathType = pathType; //zyklon
		Pathfinder.setDistanceField(nod.nodex,nod.nodey);
		Pathfinder.setDistanceField_NodeData(nod.nodex, nod.nodey);
		var update_sector_cases = Pathfinder.Get_Sector_Update_Filter(nod);
	}
	Pathfinder.Generate_Sectors_All_Layers_NodeUpdate(nod, _walkable_or_not, update_sector_cases);
	Pathfinder.Generate_Abstract_QueueOperation(nod.nodex, nod.nodey);
}

Node.isWalkable = function(nod){
	return nod.walkable_private;
}

Node.isBuildable = function(nod){
	return nod.pathType==0;
}

Node.isBuildable_no_units = function(nod,builder){
	if(nod.pathType == 0){
		for(var u = nod.firstColl; u ; u=u.nextColl){
			if(u!=builder&&u.flyingHeight<2){
				return false;
			}
		}
		return true;
	}
	return false;
}

Node.isPassable = function(nod, layer){
	/*if(layer == 0){
		return nod.walkable_private;
	}*/
	return nod.passability > layer;
}
Node.isPassable_Big_LOS = function(nod, layer){
	return nod.passability > layer ;
}
Node.isNotCover = function(nod,layer){
	return nod.pathType <4;
}

Node.getVisibility = function(nod, visGroup){
	var ts = Pathfinder.Visibility[visGroup][nod.nodey][nod.nodex];
	if(ts == 0){return 0;}
	
	var fog = Pathfinder.FOW_Timestamp - ts;

	if(fog < 65){
		return 2;
	}
	return 1;
}

Node.getSectorID = function(nod, layer){
	if(Node.isPassable(nod, layer) == false){
		return -1;
	}
	var line = Pathfinder.map_scanline[layer][nod.nodey];
	for(var i=0;i<line.length; ++i){
		if(line[i].startX <= nod.nodex && line[i].endX >= nod.nodex){
			return line[i].sectorID;
		}
	}
	return -1;
}

Node.resetWallZ = function(nod){
	if(nod.walkable_private == true){
		nod.wallZ = 0;
	}else if(nod.structure == null){
		//if(Math.abs(nod.cliffType%16) < 15){ ZYKLON only, probably
			nod.wallZ = Node.getCliffLevel(nod);
		//}else{
		//	nod.wallZ = 2;
		//}
	}else{
		//this will be updated with averageZ in the terrain.UpdateTile_Pathfinder_Heights function
		nod.wallZ = nod.structure.proto.wallZ; 
	}
}

Node.decodeWallZ = function(nod, groundZ){
	if(nod.wallZ > 50){
		return nod.wallZ - 100;
	}
	return nod.wallZ + groundZ;
}	
Node.set_fow_occlusionZ = function(nod){
	Pathfinder.Visibility_Occlusion[nod.nodey][nod.nodex] = nod.averageZ+Node.getCliffLevel_AO(nod);
}

Node.getCliffLevel = function(nod){
	var ctype = (nod.cliffType+4096)%16;
	var cfamily = Math.floor(((nod.cliffType+4096)%256) / 16);
	var h = CliffSet.list[cfamily].sideHeight;
	return (ctype %16<15)? h : 0 ;
}
Node.getCliffLevel_AO = function(nod){
	var ctype = (nod.cliffType+4096)%16;
	var cfamily = Math.floor(((nod.cliffType+4096)%256) / 16);
	var h = CliffSet.list[cfamily].sideHeight;
	return (ctype %16<15)? Math.floor(nod.cliffType/256)+h : Math.floor(nod.cliffType/256);
}

Node.makeBendExplosion = function(xx, yy, strength){
	xx = (xx>>0); yy = (yy>>0);
	for(var i=-3;i<3;++i){
		var ny = i+yy;
		if(ny < 0 || ny >= Pathfinder.mapH){continue;}
		for(var j=-3;j<3;++j){
			var nx = j+xx;
			if(nx < 0 || nx >= Pathfinder.mapW){continue;}
			var n = Pathfinder.map[ny][nx];
			n.bend_timestamp = Pathfinder.bend_timestamp + 3*Math.max(Math.abs(i),Math.abs(j));
			var ang = Math.atan2(ny-yy,nx-xx);
			var dist = Math.sqrt(i*i+j*j);
			if(i==0 && j==0){
				var ang = Math.random()*6.28;
				var dist = (i*i+j*j); //WARNING, squared dist
			}else{
				var ang = Math.atan2(i,j);
				var dist = Math.sqrt(i*i+j*j);
			}
			n.bend_x = Math.cos(ang)*(strength/(dist+1)); n.bend_y= Math.sin(ang)*(strength/(dist+1));
		}
	}
}

var Pathfinder = new Object();
var pf = Pathfinder;
Pathfinder.map = [];
Pathfinder.map_cluster = [];
Pathfinder.map_scanline = [[],[]];
Pathfinder.cluster_size = 8;
Pathfinder.cluster_update_queue = [];

Pathfinder.distanceFieldX = [];
Pathfinder.distanceFieldY = [];
Pathfinder.distanceField_Absolute = [];
Pathfinder.mapW = 0;
Pathfinder.mapH = 0;
Pathfinder.maxFollowerPathLength = 20;
Pathfinder.max_distanceField = 7;
Pathfinder.olist = [];
Pathfinder.clist = [];
Pathfinder.olistAbstract = [];
Pathfinder.clistAbstract = [];

Pathfinder.MoveOrders = [];
Pathfinder.bend_timestamp = 0;
Pathfinder.FOW_Timestamp = 0;
Pathfinder.FOW_TextureBuffer = null;
Pathfinder.FOW_TextureBuffer_prev = null;
Pathfinder.FOW_Texture = null;
Pathfinder.FOW_Texture_Size = 64;
Pathfinder.FOW_last_update_pos = [0,0];
Pathfinder.lastFOWUpdateX =0; //these are for interpolation
Pathfinder.lastFOWUpdateY = 0; 
//the result of current LOS check, used with spiral traversal from center
//size of matrix will be maximum diameter of a unit's LOS, plus center(in this case 20+20+1)
Pathfinder.FOW_Current_Check_Matrix = [];
Pathfinder.currentDijkstraSearchId = 0;
Pathfinder.Visibility = [];
Pathfinder.Visibility_Occlusion = [];
Pathfinder.water_pathing_depth = -0.8;

Pathfinder.init = function(){
	Pathfinder.mapW = M.width;
	Pathfinder.mapH = M.height;
	
	this.map = [];
	this.map_cluster = [];
	this.distanceFieldX =[];
	this.distanceFieldY =[];
	this.distanceField_Absolute = [];
	this.map_scanline = [[],[]];
 
	Pathfinder.currentDijkstraSearchId = 0;
	Pathfinder.lastFOWUpdateY = 0; 
	Pathfinder.lastFOWUpdateX = 0; 
	Pathfinder.MoveOrders = [];
	Pathfinder.FOW_Timestamp = 0;
	Pathfinder.bend_timestamp = 0;
 
	this.olist = [];
	this.olistAbstract = [];
	
	for(var i=0;i<this.mapH;++i){
		this.map[i] = [];
		for(var coll_category=0;coll_category<this.map_scanline.length;++coll_category){
			this.map_scanline[coll_category][i] = [];
		}
		
		for(var j=0;j<this.mapW;++j){
			this.map[i][j] = new Node(j,i,this);
		}
	}
	
	for(var i=0;i<this.mapH * 2;++i){
		this.distanceFieldX[i] = [];
		this.distanceFieldY[i] = [];
		this.distanceField_Absolute[i] = [];
		for(var j=0;j<this.mapW * 2;++j){
			this.distanceFieldX[i][j] = 0;
			this.distanceFieldY[i][j] = 0;
			this.distanceField_Absolute[i][j] = this.max_distanceField;
		}
	}

	for(var i=0;i<this.mapH/ this.cluster_size;++i){
		this.map_cluster[i] = [];
		for(var j=0;j<this.mapW/this.cluster_size;++j){
			this.map_cluster[i][j] = new cluster(j,i,this.cluster_size);
		}
	}
	
	this.Visibility = [];
	this.Visibility_Occlusion = [];
	for(var i=0;i<Players.length;++i){
		this.Visibility[i] = [];
		for(var j=0;j<this.mapH;++j){
			this.Visibility[i][j]=new Uint32Array(this.mapW);
		}
	}
	for(var i=0;i<this.mapH;++i){
		this.Visibility_Occlusion[i] = new Float32Array(this.mapW);
		for(var j=0;j<this.mapW;++j){
			this.Visibility[0][i][j] = 2147483647;
		}
	}
	
	Pathfinder.Generate_Abstract_Full();
	Pathfinder.FOW_Timestamp = 256;//if we init it to 0, it will transition from clear to masked over a few frames.
	
	var maxDimension = Math.max(this.mapH, this.mapW);
	this.Init_FOW_Stuff(this.FOW_Texture_Size);
	for(var coll_category=0;coll_category<this.map_scanline.length;++coll_category){
		for(var i=0;i<this.mapH;++i){
			this.Update_Scanline(i,false, coll_category);
		}
	}
	Pathfinder.Generate_Sectors_All_Layers();
}

Pathfinder.Init_FOW_Stuff = function(size){
	//fow buffer only has 1 channel, uses a 1 channel texture
	this.FOW_TextureBuffer = new Uint8Array(size*size);
	this.FOW_TextureBuffer_prev = new Uint8Array(size*size);
	this.FOW_Texture = createTexture_From_Array(this.FOW_TextureBuffer,size,size, true,false,false,false,1);
	for(var i=0;i<41;++i){
		this.FOW_Current_Check_Matrix[i] = new Uint8Array(41);
	}
}

Pathfinder.LoadPathing = function(data){
	for(var i=0; i<data.height;++i){
		for(var j=0; j<data.width; ++j){
			var bufId = i*data.width + j;
			if(bufId >= data.pathingMap.length){
				continue;
			}
			var nod = this.map[i+M.loadY][j+M.loadX];
			nod.pathType = B64CharToSextet(data.pathingMap[bufId]);
			if(nod.pathType > 3){
				M.terrain.ColorMap[i+M.loadY][j+M.loadX] = 4;
			}else if(nod.pathType == 1){
				M.terrain.ColorMap[i+M.loadY][j+M.loadX] = 1;
			}else if(nod.pathType == 2){
				M.terrain.ColorMap[i+M.loadY][j+M.loadX] = 2;
			}else if(nod.pathType == 3){
				M.terrain.ColorMap[i+M.loadY][j+M.loadX] = 3;
			}
			if(nod.pathType > 1){
				nod.walkable_private = false;
				nod.wallZ = nod.averageZ+2; //This will need a lot of fixing
				Pathfinder.setDistanceField(nod.nodex,nod.nodey);
				Pathfinder.setDistanceField_NodeData(nod.nodex, nod.nodey);
			}
		}
	}
	Pathfinder.Generate_Scanlines_Full();
	Pathfinder.Generate_Abstract_Full();
}

Pathfinder.FOW_Timestamp_OverFlow = function(){
	console.log("Fog of War - TIMESTAMP OVERFLOW");
}

Pathfinder.FOW_Texture_Update = function(){
	var vis_array = this.Visibility[Control.currentPlayer.visGroup];
	if(Gamestats.cinematicMode){
		vis_array = this.Visibility[0];
	}
	
	var size  = Pathfinder.FOW_Texture_Size;
	var startX =  Math.floor(cam.pos[0] - this.FOW_Texture_Size/2) ;
	var startY =  Math.floor(cam.pos[1] - this.FOW_Texture_Size/2) ;
	var lastOffX = this.lastFOWUpdateX-startX; 
	var lastOffY = this.lastFOWUpdateY-startY;
	Pathfinder.FOW_last_update_pos[0] =  Math.floor(cam.pos[0] );
	Pathfinder.FOW_last_update_pos[1] =  Math.floor(cam.pos[1] ) + 1;
	//swap the buffers, last frame's fresh data is this frames's old data
	/*var replace = this.FOW_TextureBuffer_prev;
	this.FOW_TextureBuffer_prev  = this.FOW_TextureBuffer;
	this.FOW_TextureBuffer = replace;
	var nodeStamp = 0;
	var fog = 0;
	for(var i=0;i< size;++i){
		if(i+startY < 0 || i+startY >= this.mapH){
			continue;
		}
		for(var j=0;j<size;++j){
			if(j+startX < 0 || j+startX >= this.mapW){
				continue;
			}
			nodeStamp = vis_array[i+startY][j+startX];
			
			fog = Math.min(this.FOW_Timestamp - nodeStamp, 255);

			if(fog > 65 && nodeStamp != 0){
				fog = 130;
			}else if(fog < 65){
				fog = 0;
			}

			if(i - lastOffY < 0 || j - lastOffX < 0 || i - lastOffY >= size || j - lastOffX >= size){
				 //no interpolation, last frame's data is not available due to camera movement
				this.FOW_TextureBuffer[(i*size + j)] = fog;
			}else{
				var lastFog = this.FOW_TextureBuffer_prev[((i-lastOffY)*size + j-lastOffX)]
				this.FOW_TextureBuffer[(i*size + j)] = Math.min(255, lastFog*0.95 + fog*0.055);
			}
		}
	}
	updateTexture_From_Array(this.FOW_Texture, this.FOW_TextureBuffer,this.FOW_Texture_Size,this.FOW_Texture_Size);*/
	this.lastFOWUpdateX = startX;
	this.lastFOWUpdateY = startY;
}
 
Pathfinder.eraseDistanceField = function(nx,ny){
	var distRadius = Math.ceil(this.max_distanceField /2);
	
	//in first pass we reset the distance field pixels that can be possibly affected by the node
	for(var i = -1* distRadius; i<= distRadius; ++ i){
		if(ny + i < 0 || ny+i >= this.mapH){
			continue;
		}
		for(var j = -1* distRadius; j<= distRadius; ++ j){
			if(nx + j < 0 || nx+j >= this.mapW){
				continue;
			}
			
			if(Node.isWalkable(this.map[ny+i][nx+j]) == true){
				var dfmx = (nx+j)*2; //distance field map x
				var dmfy = (ny+i)*2;
				this.distanceFieldX[dmfy][dfmx] = 0;
				this.distanceFieldY[dmfy][dfmx] = 0;
				this.distanceField_Absolute[dmfy][dfmx] = this.max_distanceField;
				
				this.distanceFieldX[dmfy+1][dfmx] = 0;
				this.distanceFieldY[dmfy+1][dfmx] = 0;
				this.distanceField_Absolute[dmfy+1][dfmx] = this.max_distanceField;
				
				this.distanceFieldX[dmfy][dfmx+1] = 0;
				this.distanceFieldY[dmfy][dfmx+1] = 0;
				this.distanceField_Absolute[dmfy][dfmx+1] = this.max_distanceField;
				
				this.distanceFieldX[dmfy+1][dfmx+1] = 0;
				this.distanceFieldY[dmfy+1][dfmx+1] = 0;
				this.distanceField_Absolute[dmfy+1][dfmx+1] = this.max_distanceField;
			}
		}
	}
	//in second pass we recalculate all nodes that can possibly affect the deleted area. 
	//henceforth we need double the radius, but only check unwalkables
	distRadius *= 2;
	for(var i = -1* distRadius; i<= distRadius; ++ i){
		if(ny + i < 0 || ny+i >= this.mapH){
			continue;
		}
		for(var j = -1* distRadius; j<= distRadius; ++ j){
			if(nx + j < 0 || nx+j >= this.mapW){
				continue;
			}
			if(Node.isWalkable(this.map[ny+i][nx+j]) == false){
				Pathfinder.setDistanceField(nx+j, ny+i);
			}
			Pathfinder.setDistanceField_NodeData(nx+j, ny+i);
		}
	}
}

Pathfinder.setDistanceField = function(nx, ny){
	nx*=2;//distance field map is at double resolution
	ny*=2;
	for(var i = -1* this.max_distanceField; i<= this.max_distanceField+1; ++ i){
		if(ny + i < 0 || ny+i >= this.mapH*2){
			continue;
		}
		
		var offY;
		if(i < 0){
			offY = i;
		}else if( i < 2){
			offY = 0;
		}else{
			offY = i-1;
		}
		
		for(var j = -1* this.max_distanceField; j<= this.max_distanceField+1; ++ j){
			if(nx + j < 0 || nx+j >= this.mapW*2){
				continue;
			}
			
			var offX;
			if(j < 0){
				offX = j;
			}else if( j < 2){
				offX = 0;
			}else{
				offX = j-1;
			}
			
			if((offX == 0) && (offY == 0)){
				this.distanceFieldX[ny+i][nx+j] = 0;
				this.distanceFieldY[ny+i][nx+j] = 0;
				this.distanceField_Absolute[ny+i][nx+j] = 0;
				
			}else{
				var dist = Math.sqrt(offX*offX + offY*offY);
				if(dist < this.distanceField_Absolute[ny+i][nx+j]){
					this.distanceField_Absolute[ny+i][nx+j] = dist;

					if(dist != 0){
						this.distanceFieldX[ny+i][nx+j] = offX/dist;
						this.distanceFieldY[ny+i][nx+j] = offY/dist;
					}else{
						this.distanceFieldX[ny+i][nx+j] = offX;
						this.distanceFieldY[ny+i][nx+j] = offY;
					}
				}
			}
		}
	}
}

Pathfinder.setDistanceField_NodeData = function(nx, ny){
	var bignode_rad = Math.ceil(this.max_distanceField/2);
	
	for(var i = -bignode_rad; i<= bignode_rad; ++ i){
		if(ny + i < 0 || ny+i >= this.mapH){
			continue;
		}
		for(var j = -bignode_rad; j<=bignode_rad; ++ j){
			if(nx + j < 0 || nx+j >= this.mapW){
				continue;
			}
			var n = this.map[ny+i][nx+j];
			n.passability = this.distanceField_Absolute[(ny+i)*2][(nx+j)*2];
			n.passability = Math.max(n.passability ,this.distanceField_Absolute[(ny+i)*2+1][(nx+j)*2]);
			n.passability = Math.max(n.passability ,this.distanceField_Absolute[(ny+i)*2][(nx+j)*2+1]);
			n.passability = (Math.max(n.passability ,this.distanceField_Absolute[(ny+i)*2+1][(nx+j)*2+1]))>>0;
			//this `floor` has an important effect, it filters out 1-wide diagonals for larger units
			
			/*n.avgDistanceX = this.distanceFieldX[(ny+i)*2][(nx+j)*2];
			n.avgDistanceX += this.distanceFieldX[(ny+i)*2+1][(nx+j)*2];
			n.avgDistanceX +=this.distanceFieldX[(ny+i)*2][(nx+j)*2+1];
			n.avgDistanceX += this.distanceFieldX[(ny+i)*2+1][(nx+j)*2+1];
			n.avgDistanceX /= 4;
			
			n.avgDistanceY = this.distanceFieldY[(ny+i)*2][(nx+j)*2];
			n.avgDistanceY += this.distanceFieldY[(ny+i)*2+1][(nx+j)*2];
			n.avgDistanceY +=this.distanceFieldY[(ny+i)*2][(nx+j)*2+1];
			n.avgDistanceY += this.distanceFieldY[(ny+i)*2+1][(nx+j)*2+1];
			n.avgDistanceY /= 4;*/
		}
	}
}

Pathfinder.getDistanceFieldAt = function(xx,yy){
	return [ this.distanceField_Absolute[(yy*2)>>0][(xx*2)>>0],
	this.distanceFieldX[(yy*2)>>0][(xx*2)>>0],
	this.distanceFieldY[(yy*2)>>0][(xx*2)>>0]
	];
}
Pathfinder.getDistanceNodeX = function(nod){
	var nx = nod.nodex;
	var ny = nod.nodey;
	var x_avg = this.distanceFieldX[ny*2][nx*2] +this.distanceFieldX[ny*2+1][nx*2]+this.distanceFieldX[ny*2][nx*2+1]+this.distanceFieldX[ny*2+1][nx*2+1];
	return x_avg*0.25;
}
Pathfinder.getDistanceNodeY = function(nod){
	var nx = nod.nodex;
	var ny = nod.nodey;
	var y_avg = this.distanceFieldY[ny*2][nx*2] +this.distanceFieldY[ny*2+1][nx*2]+this.distanceFieldY[ny*2][nx*2+1]+this.distanceFieldY[ny*2+1][nx*2+1];
	return y_avg*0.25;
}

Pathfinder.Generate_Abstract_Full = function(){
	for(var i=0;i<this.mapH/this.cluster_size;++i){
		for(var j=0;j<this.mapW/this.cluster_size;++j){
			this.map_cluster[i][j].GenerateGates(0);
			this.map_cluster[i][j].GenerateGates(1);
			//this.map_cluster[i][j].GenerateGates(2);
		}
	}
	//kulon ciklus kell, mert elobb az osszes kaput ki kell generalni
	for(var i=0;i<this.mapH/this.cluster_size;++i){
		for(var j=0;j<this.mapW/this.cluster_size;++j){
			this.map_cluster[i][j].Gates_Get_Adjacent(0);
			this.map_cluster[i][j].Gates_Get_Adjacent(1);
			//this.map_cluster[i][j].Gates_Get_Adjacent(2);
		}
	}
	
	for(var i=0;i<this.mapH/this.cluster_size;++i){
		for(var j=0;j<this.mapW/this.cluster_size;++j){
			this.map_cluster[i][j].Gates_Get_Costs(0);
			this.map_cluster[i][j].Gates_Get_Costs(1);
			//this.map_cluster[i][j].Gates_Get_Costs(2);
		}
	}
}

Pathfinder.Generate_Abstract_QueueOperation = function(xx,yy){
	xx = (xx/this.cluster_size>>0)*this.cluster_size;
	yy = (yy/this.cluster_size>>0)*this.cluster_size;
	for(var i=0;i<this.cluster_update_queue.length;++i){
		if(this.cluster_update_queue[i][0] == xx && this.cluster_update_queue[i][1] == yy){
			//this means that the update of the tile has already been queued for the next loop
			//so there is no need to do it twice in a single loop
			return;
		}
	}
	this.cluster_update_queue.push([xx,yy]);
}

//runs all queued update queries
//it is important that we run this in the loop BEFORE the world_move operation
Pathfinder.Update_Abstract_Map = function(){
	//for(var i=0;i<this.cluster_update_queue.length;++i){
		//egyszerre kene ujrageneralni !!!, nem egyesevel
		//this.Generate_Abstract_SingleTile(this.cluster_update_queue[i][0], this.cluster_update_queue[i][1]);	
	//}
	Pathfinder.Generate_Abstract_ClusterArray(this.cluster_update_queue);
	this.cluster_update_queue.length = 0;
}

//we give all the positions of the clusters needing update
Pathfinder.Generate_Abstract_ClusterArray = function(posArr){
	
	var tiles = [];
	//get the 3x3 neighborhoods of each cluster, but no duplicates
	for(var k=0;k<posArr.length;++k){
		var cx = (posArr[k][0] / this.cluster_size >> 0);
		var cy = (posArr[k][1] / this.cluster_size >> 0);
	
		var startJ = Math.max(cx-1, 0);
		var endJ = Math.min(cx+2, this.mapW/this.cluster_size);
		var startI = Math.max(cy-1, 0);
		var endI = Math.min(cy+2, this.mapH/this.cluster_size);
		
		for(var i=startI; i<endI;++i){
			for(var j=startJ; j<endJ;++j){
				if(tiles.indexOf(this.map_cluster[i][j]) < 0){
					tiles.push(this.map_cluster[i][j]);
				}
			}
		}
	}

	for(var i = 0; i < tiles.length; ++i){
		tiles[i].Cleanup_Adjacency(0);
		tiles[i].Cleanup_Adjacency(1);
		//	this.map_cluster[i][j].Cleanup_Adjacency(2);
	}
	for(var i = 0; i < tiles.length; ++i){
		tiles[i].GenerateGates(0);
		tiles[i].GenerateGates(1);
		//this.map_cluster[i][j].GenerateGates(2);
	}
	for(var i = 0; i < tiles.length; ++i){
		tiles[i].Gates_Get_Adjacent(0);
		tiles[i].Gates_Get_Adjacent(1);
		//this.map_cluster[i][j].GenerateGates(2);
	}
	for(var i = 0; i < tiles.length; ++i){
		tiles[i].Gates_Get_Costs(0);
		tiles[i].Gates_Get_Costs(1);
		//this.map_cluster[i][j].GenerateGates(2);
	}
}



Pathfinder.Compute_Path_For_MovementTask = function(task, x, y){
	var u = task.caster;
	var layer = task.blocker_layer;
	if(u.x > this.mapW || u.x < 0 || u.y > this.mapH || u.y < 0){
		return 0;
	}
	var destnode = this.getNodeAt(x,y);
	var startnode = this.getNodeAt(u.x,u.y);
	if(destnode == undefined){
		return 0;
	}
	
	//Empty the previous pathfinding's data;
	task.Path.length = 0;
	task.PathAbstract.length = 0;

	if(Node.isPassable(startnode, layer) == false || Node.isPassable(destnode, layer) == false){
		return 0;
	}

	if(destnode == startnode || this.InLOS(destnode,startnode, layer) == true){
		task.finaldest.x = task.dest.x = x;
		task.finaldest.y = task.dest.y = y;

	}else{
		task.distanceToFinaldest = this.Pathfind_Abstract(startnode,destnode,task);
		task.finaldest.x = x;
		task.finaldest.y = y;
	}
	
	task.finaldestNode = Pathfinder.getNodeAt(x, y);
	return 1;
}

//if two nodes are in line of sight, we can remove nodes in between
Pathfinder.Path_Smoothing = function(task){
	var j = 0; var current = 0; 
	var dest = task.Path.length-1;
	var layer = task.blocker_layer;
	
	while(current!=dest){
		
		for(;current!=dest-1 && current<dest-1;){
			if(this.InLOS(task.Path[current],task.Path[current+2], layer)){
			   task.Path.splice(current+1,1);
			   --dest;
			}else{
				break;
			}
		}
		++current;
	}

}

//Returns length of found path
Pathfinder.Pathfind_Abstract = function(startnode,destnode,task){
	this.CleanupAbstractLists();
	
	var layer = task.blocker_layer;
	
	var startcluster  = this.map_cluster[(startnode.nodey/this.cluster_size)>>0][(startnode.nodex/this.cluster_size)>>0];
	var destcluster = this.map_cluster[(destnode.nodey/this.cluster_size)>>0][(destnode.nodex/this.cluster_size)>>0];
	var startgate = startcluster.Create_Abstract_Endpoint(startnode,layer);
	var destgate = destcluster.Create_Abstract_Endpoint(destnode,layer);
	
	startgate.pgate = startgate;
	var currentgate = startgate;

	this.OpenGateNode(currentgate);
	while(currentgate!=destgate && this.olistAbstract.length>0){
		this.olistAbstract.pop();
		
		this.GetF_Abstract(destgate,currentgate);/**Could be inlined for optimization**/
		this.CloseGateNode(currentgate);//Add to closed list
		if(this.olistAbstract.length > 0){
			currentgate = Pathfinder.getMinimal_F_AndSetAsLast(this.olistAbstract);//Get node with best F value from olistAbstract
		}
	}
	
	//We might have found a path
	if(currentgate!=destgate){
		console.log('NO PATH');
	}else{
		task.PathAbstract.push(this.map[destgate.nodey][destgate.nodex]);//building abstract path
		while(currentgate!=startgate){
			currentgate=currentgate.pgate;
			
			task.PathAbstract.push(this.map[currentgate.nodey][currentgate.nodex]);//building abstract path
		}
	}

	
	//VERY IMPORTANT TO CLEAN UP
	startcluster.Cleanup_Endpoints(layer);
	destcluster.Cleanup_Endpoints(layer);
	
	return destgate.g;
}

Pathfinder.Heuristic = function(curr, dest){
	var dx = Math.abs(curr.nodex - dest.nodex);
	var dy = Math.abs(curr.nodey - dest.nodey);
	return (10 * (dx+dy) - 6*Math.min(dx,dy)) *1.1;
}
Pathfinder.NodeDistance = function(curr, dest){
	var dx = Math.abs(curr.nodex - dest.nodex);
	var dy = Math.abs(curr.nodey - dest.nodey);
	return (10 * (dx+dy) - 6*Math.min(dx,dy));
}

//gets the minimum distance between two gates inside of a cluster (for the AdjacentCost array)
Pathfinder.Pathfind_Cluster = function(startGate, destGate, clust, layer){
	if (startGate == destGate){
		return 0;
	}
	if(this.InLOS(this.map[startGate.nodey][startGate.nodex],this.map[destGate.nodey][destGate.nodex], layer)){
	   return this.Heuristic(startGate,destGate);
	}
	var destnode = this.map[destGate.nodey][destGate.nodex];
	var startnode = this.map[startGate.nodey][startGate.nodex];
	destnode.g = destnode.f = destnode.h = 0;
	startnode.g = startnode.f = startnode.h = 0;

	this.currentnode = startnode;
	this.currentnode.pnode = this.currentnode;
	//this.CleanupLists();
	this.OpenNode(this.currentnode);
	return this.A_STAR_Cluster(startnode,destnode,clust, layer);//Return distance between gates
}

Pathfinder.Pathfind_Between_Nodes = function(startnode,destnode,task){
	startnode.g = startnode.f = startnode.g = 0;
	
	this.currentnode=startnode;
	this.currentnode.pnode= this.currentnode;

	this.OpenNode(this.currentnode);
	
	var g = this.A_STAR(startnode,destnode,task, -1, task.blocker_layer );
	return g;
}

Pathfinder.A_STAR_Cluster = function(startnode,destnode, clust, layer){
	while(this.currentnode!= destnode && this.olist.length>=1){
		this.olist.pop();
		this.CloseNode(this.currentnode);
		this.GetF_8dir(clust, destnode, true, layer);
		this.currentnode = this.olist[this.olist.length-1];
	}
	this.CleanupLists();
	if(this.currentnode!= destnode){//there is no path between the two gates inside the 
		return 9999999; //infinite
	}
	return destnode.g;
}

Pathfinder.A_STAR = function(startnode, destnode, task, maxDistance, layer){
	
	var constrained_to_cluster;
	//if mindistance is POSTIVE then we are using clusterless A_STAR
	//which is only for utility, not for Unit movement
	if(maxDistance < 0){
		if((startnode.nodex/this.cluster_size>>0)!=(destnode.nodex/this.cluster_size>>0) 
			|| (startnode.nodey/this.cluster_size>>0)!=(destnode.nodey/this.cluster_size>>0)){
			//if nodes are not in the same cluster, it means they are right next to each other
			//therefore the search is trivial
			task.Path.push(destnode);
			task.Path.push(startnode);
			this.CleanupLists();
			//console.log(destnode,startnode, task.Path);
			return 0;
		}
		constrained_to_cluster = true;
	}else{
		this.currentnode = startnode;
		startnode.g = startnode.h = startnode.f = 0;
		this.OpenNode(this.currentnode);
		constrained_to_cluster = false;
	}
	
	while(this.currentnode != destnode && this.olist.length>=1){
		this.olist.pop();
		this.CloseNode(this.currentnode);
		this.GetF_8dir(null,destnode, constrained_to_cluster, layer);
		this.currentnode =this.olist[this.olist.length-1];
		if(this.currentnode == undefined){
			this.CleanupLists();
			return;
		}
		
		if(maxDistance >= 0){
			if(this.currentnode.g > maxDistance * 10){
				this.CleanupLists();
				return -1 ;
			}
		}
		
	}
	var rval = this.currentnode.g;
	//if mindistance is POSTIVE then we are using clusterless A_STAR
	//which is only for utility, not for Unit movement
	if(maxDistance < 0 && this.currentnode == destnode){
		task.Path.push(this.currentnode);//Push the destnode
		while(this.currentnode!=startnode){
			
			if(!this.currentnode.pnode){
				console.error("HEY", this.currentnode);
				break;
			}
			
			this.currentnode=this.currentnode.pnode;
			task.Path.push( this.currentnode );
		}
	}
	
	this.CleanupLists();
	return rval;
}

//we need the destnode parameter for the heuristic computing
Pathfinder.GetF_8dir = function(clust,destnode,constrained_to_cluster, layer){

		this.GetF(1,0,10,clust,destnode, constrained_to_cluster, layer);
		this.GetF(1,1,14,clust,destnode,constrained_to_cluster, layer);
		this.GetF(0,1,10,clust,destnode,constrained_to_cluster, layer);
		this.GetF(-1,1,14,clust,destnode,constrained_to_cluster, layer);
		this.GetF(-1,0,10,clust,destnode,constrained_to_cluster, layer);
		this.GetF(-1,-1,14,clust,destnode,constrained_to_cluster, layer);
		this.GetF(0,-1,10,clust,destnode,constrained_to_cluster, layer);
		this.GetF(1,-1,14,clust,destnode,constrained_to_cluster, layer);
	
}

Pathfinder.GetF = function(offX,offY,cost,clust,destnode,constrained_to_cluster, layer){
	var nx = this.currentnode.nodex;
	var ny = this.currentnode.nodey;
	
	var inIntraClusterMode = (clust != null);
	if(inIntraClusterMode ==true){ //we are doing an abstract search
		if(offX + nx > (clust.nodex+1) * this.cluster_size-1 || offX + nx < clust.nodex * this.cluster_size 
		|| offY + ny > (clust.nodey+1) * this.cluster_size-1 || offY + ny < clust.nodey * this.cluster_size){
		   return;
	   }
	}else if(offX+nx >= this.mapW || offX+nx < 0 || offY+ny >= this.mapH || offY+ny < 0 ){//out of bounds
		return;
	}
	
	var n = this.map[ny+offY][nx+offX];
	
	//Unconstrained search only happens on utility a-star searches, NEVER with unit path building 
	if(constrained_to_cluster == true && 
		( ((offX+nx)/this.cluster_size>>0) !=  (nx/this.cluster_size>>0) 
		||  ((offY+ny)/this.cluster_size>>0) !=  (ny/this.cluster_size>>0)) ){
			return;
	}
	
	if(n.status != 2){//node is not closed
		if(n.status != 1){//node is not open
			n.f = n.g = n.h = 0;
			if(Node.isPassable(n, layer)==false || 
			(Node.isPassable(this.map[ny][offX+nx], layer) == false || Node.isPassable(this.map[offY+ny][nx], layer) == false)){
				if(Node.isPassable(n, layer) == false){
					this.CloseNode(n);
					n.g = n.f = 99999;
				}
			}else{
				n.h=this.Heuristic(n,destnode)/*+ n.obstruction*/;
				n.g=this.currentnode.g + cost;
				n.f=n.g+n.h;
				this.OpenNode(n);
				this.SortF(this.olist);
				n.pnode = this.currentnode;
			}
		}else{//node is open
			if(this.currentnode.g<n.pnode.g 
			&& Math.abs(this.currentnode.nodex-n.nodex)<2 
			&& Math.abs(this.currentnode.nodey-n.nodey)<2){//new F is better than old F, and nodes are adjacent
				n.g=this.currentnode.g + cost;
				n.f=n.g+n.h;
				n.pnode = this.currentnode;
			}
		}
	}
}

Pathfinder.GetF_Abstract = function(destgate,currentgate){
	for(var i = 0;i< currentgate.Adjacent.length;++i){//for each adjacent node
		var gate = currentgate.Adjacent[i];
		if(gate.status != 2){//gate is not closed
		   if(gate.status != 1){//gate is not open
				gate.g = currentgate.g + currentgate.AdjacentCost[i];
				gate.h = this.Heuristic(gate,destgate);// * 1.1;//Gate coordinates are on node level
				gate.f = gate.h+gate.g;
				gate.pgate=currentgate;
				this.OpenGateNode(gate);//Insert node to sorted olistAbstract
			}else{//gate is open
				if(gate.g>currentgate.g + currentgate.AdjacentCost[i] && gate.pgate != currentgate){//Get the shortest path of the two
					gate.g = currentgate.g + currentgate.AdjacentCost[i];
					gate.f=gate.g+gate.h;
					gate.pgate=currentgate;
				}
			}
		}
	}
}

Pathfinder.OpenNode = function(n){
	if(n.status != 1){
		this.olist.push(n);
	}
	n.status = 1;
	
}
Pathfinder.OpenGateNode = function(n){
	if(n.status != 1){
		this.olistAbstract.push(n);
	}
	n.status = 1;
}

Pathfinder.CloseNode = function(n){
	if(n.status != 2){
		this.clist.push(n);
	}
	n.status = 2;
}
Pathfinder.CloseGateNode = function(n){
	if(n.status != 2){
		this.clistAbstract.push(n);
	}
	n.status = 2;
}

Pathfinder.CleanupLists = function(){
	for(var i=this.olist.length-1; i>=0;--i){
		this.olist[i].status = 0;
	}
	for(var i=this.clist.length-1; i>=0;--i){
		this.clist[i].status = 0;
	}
	this.olist.length = 0;
	this.clist.length = 0;
}

Pathfinder.CleanupAbstractLists = function(){

	for(var i=this.olistAbstract.length-1; i>=0;--i){
		this.olistAbstract[i].status = 0;
	}
	for(var i=this.clistAbstract.length-1; i>=0;--i){
		this.clistAbstract[i].status = 0;
	}
	this.olistAbstract = [];
	this.clistAbstract = [];
}


Pathfinder.SortF = function(A){
	/**INSERTION SORT**/
	var len = A.length; var j; var replace;
	for(var i = 1;i<len;++i){
		replace = A[i];
		j=i;
		for(;;){
			if(j<=0) break;
			if(A[j-1].f >= replace.f) break;
			A[j]=A[j-1];
			--j;
		}
		A[j] =replace;
	}
}

//returns boolean
Pathfinder.InLOS = function(startnode,destnode, layer){ 
	var x0 = startnode.nodex;
	var y0 = startnode.nodey;
	var x1 = destnode.nodex;
	var y1 = destnode.nodey;
	var dx = Math.abs(x1 - x0);
	var dy = Math.abs(y1 - y0);
	var xx = x0;
	var yy = y0;
	var n = 1 + dx + dy;//number of nodes to be intersected
	var x_inc = (x1 > x0) ?1 : -1;
	var y_inc = (y1 > y0) ? 1 : -1;
	var error = dx - dy;//difference between current node center and actual line position
	dx *=2;
	dy *=2;
	
	//passability function
	var passable = layer == 0 ? Node.isPassable : Node.isPassable_Big_LOS;
	
	for (;n>0;--n){
		if(passable(this.map[yy][xx], layer) == false ){
			return false;
		}
		if (error > 0){
			xx += x_inc;
			error -= dy;
		}else{
			yy += y_inc;
			error += dx;
		}
	}
	return true;
}

//get the node around the structure that is accessible and closest to start
Pathfinder.Get_Alternative_Node_For_StructureTarget = function(startnode,startSectorID, structure, layer){
	var mindist = 9999999;
	var minNode = null;
	var dist = 0;
	for(var i=0;i<structure.aroundNodes.length;++i){
		var n = structure.aroundNodes[i];
		if(Node.isPassable(n, layer) == true){
			//if startsectorId<0 then the search doesn't care about sector
			if(startSectorID < 0 || Node.getSectorID(n, layer) == startSectorID){
				dist = Pathfinder.NodeDistance(n, startnode);
				if( dist < mindist){
					mindist = dist;
					minNode = n;
				}
			}
		}
	}
	return minNode;
}

Pathfinder.Get_Alternative_Node_For_Training = function(structure, layer){
	var smaller_layer_fallback = null;
	for(var i=0;i<structure.aroundNodes.length;++i){
		var n = structure.aroundNodes[i];
		if(Node.isPassable(n, layer) == true){
			return n;
		}else if(layer > 0 && Node.isPassable(n, layer-1)){
			smaller_layer_fallback = n;
		}
	}
	return smaller_layer_fallback;
}

Pathfinder.Get_Ungarrison_Node = function(structure,u,layer){
	var mindist = 9999999;
	var minNode = null;
	var dist = 0;
	for(var i=0;i<structure.aroundNodes.length;++i){
		var n = structure.aroundNodes[i];
		if(Node.isPassable(n, layer) == true){
			dist = Utils.distance_xxyy(n.nodex+0.5,u.x, n.nodey+0.5,u.y);
			if( dist < mindist){
				mindist = dist;
				minNode = n;
			}
		}
	}
	return minNode;
}

Pathfinder.Get_Free_Node_Radial = function(x,y,radius,treshold){
	var start_angle = RAND()*6.28;
	for(var i=0;i<6.28;i+=0.4){
		var xx = x + radius*Math.cos(i+start_angle);
		var yy = y + radius*Math.sin(i+start_angle);
		var n = Pathfinder.getNodeAt_Robust(xx,yy);
		if(n.passability >= treshold){
			return n;
		}
	}
	return null;
}

//params are [minSpace, structure_prototype]
Pathfinder.Check_Free_Buildspace = function(n, paramArr){
	return n.passability > paramArr[0] && n.pathType == 0 && Unit.checkBuildable(n.nodex,n.nodey,paramArr[1]);
}

//IMPORTANT that we go in the opposite directions, from dest to start, looking for the first node that
//the unit can reach
Pathfinder.Get_Alternative_Node_For_Different_Sector = function (startnode, destnode, startSectorID, layer){
	if(destnode.structure != null){
		var altern = Pathfinder.Get_Alternative_Node_For_StructureTarget(startnode, startSectorID, destnode.structure, layer);
		if(altern != null){
			return altern;
		}
	}
	
	var x0 = destnode.nodex;
	var y0 = destnode.nodey;
	var x1 = startnode.nodex;
	var y1 = startnode.nodey;
	var dx = Math.abs(x1 - x0);
	var dy = Math.abs(y1 - y0);
	var xx = x0;
	var yy = y0;
	var n = 1 + dx + dy;//number of nodes to be intersected
	var x_inc = (x1 > x0) ?1 : -1;
	var y_inc = (y1 > y0) ? 1 : -1;
	var error = dx - dy;//difference between current node center and actual line position
	dx *=2;
	dy *=2;
	for (;n>0;--n){
		if(Node.getSectorID(this.map[yy][xx], layer) == startSectorID ){
			return this.map[yy][xx];
		}
		if (error > 0){
			xx += x_inc;
			error -= dy;
		}else{
			yy += y_inc;
			error += dx;
		}
	}
	return startnode;
}

Pathfinder.Get_Alternative_Node_For_Formation = function(startnode,destnode, layer){ //returns boolean
	var x0 = startnode.nodex;
	var y0 = startnode.nodey;
	var x1 = destnode.nodex;
	var y1 = destnode.nodey;
	var dx = Math.abs(x1 - x0);
	var dy = Math.abs(y1 - y0);
	var xx = x0;
	var yy = y0;
	var n = 1 + dx + dy;//number of nodes to be intersected
	var x_inc = (x1 > x0) ?1 : -1;
	var y_inc = (y1 > y0) ? 1 : -1;
	var error = dx - dy;//difference between current node center and actual line position
	dx *=2;
	dy *=2;
	
	//torlodas lehet a falnal ha csak a pont elotte levo nodeot vesszuk aliasnak, ezert a fal elotti 2 node kozul valogatunk
	var prevNode = startnode;
	var prevPrevNode = startnode;
	
	for (;n>0;--n){
		if(Node.isPassable(this.map[yy][xx], layer) == false ){
			if( Node.isPassable(destnode, layer) == false || this.A_STAR( startnode, destnode, null, 15, layer) < 0){ 
				//returns 0 when distance is greater than maxDistance
				//so we use our fallback, unobstructed destination node
				if(RAND() > 0.6){
					return prevNode;
				}else{
					return prevPrevNode;
				}
				
			}else{
				return null;
			}
		}
		
		prevPrevNode = prevNode;
		prevNode = this.map[yy][xx];
		
		if (error > 0){
			xx += x_inc;
			error -= dy;
		}else{
			yy += y_inc;
			error += dx;
		}
	}
	return null;
}

Pathfinder.getNodeAt = function(x,y){
	if(y < this.mapH && y >= 0 && x < this.mapW && x >= 0){
		return this.map[y>>0][x>>0];
	}else{
		return undefined;
	}
}

//This one always returns a valid node
Pathfinder.getNodeAt_Robust = function(x,y){
	x = Math.max(0.01, Math.min(this.mapW - 0.01, x));
	y = Math.max(0.01, Math.min(this.mapH - 0.01, y));
	return this.map[y>>0][x>>0];
}

Pathfinder.getSectorAt = function(x,y, layer){
	if(y < this.mapH && y >= 0 && x < this.mapW && x >= 0){
		return Node.getSectorID(this.map[y>>0][x>>0], layer);
	}else{
		return -1;
	}
}

Pathfinder.getClusterAt = function(x,y){
	if(y < this.mapH && y >= 0 && x < this.mapW && x >= 0){
		return this.map_cluster[(y/8)>>0][(x/8)>>0];
	}else{
		return undefined;
	}
}

Pathfinder.Dijkstra_Search = function(n, radius, nodeFunction, nodeParam, layer){
	if(n == undefined){
		return;
	}
	this.OpenNode(n);
	this.currentnode = n;
	var currentnode_backup = n;
	this.currentnode.f = 0;
	while(this.olist.length > 0 && this.currentnode.f <= radius*10){
		//back up currentnode, another because searches could be nested
		currentnode_backup = this.currentnode;
		var nodeRetVal = nodeFunction(currentnode_backup, nodeParam);
		this.currentnode = currentnode_backup;
		if(nodeRetVal == true){
			this.CleanupLists();
			return this.currentnode;
		}
		
		this.olist.pop();
		this.CloseNode(this.currentnode);
		//this.GetF_Dijkstra_8dir();
		this.GetF_Dijkstra(1,0,10, layer);
		//this.GetF_Dijkstra(1,1,14);
		this.GetF_Dijkstra(0,1,10, layer);
		//this.GetF_Dijkstra(-1,1,14);
		this.GetF_Dijkstra(-1,0,10, layer);
		//this.GetF_Dijkstra(-1,-1,14);
		this.GetF_Dijkstra(0,-1,10, layer);
		//this.GetF_Dijkstra(1,-1,14);
		if(this.olist.length==0){
			break;
		}
		
		this.currentnode = Pathfinder.getMinimal_F_AndSetAsLast(this.olist);
		//this.currentnode =this.olist[this.olist.length-1];
	}
	this.CleanupLists();
	return null;
}

Pathfinder.Dijkstra_Unit_Search = function(n, radius, filter, nodeParam, layer){
	if(n == undefined){
		return;
	}
	var u = null;
	Pathfinder.currentDijkstraSearchId = (this.currentDijkstraSearchId+1)%1000000;
	this.OpenNode(n);
	this.currentnode = n;
	var currentnode_backup = n;
	this.currentnode.f = 0;
	while(this.olist.length > 0 && this.currentnode.f < radius*10){
		if(filter.nodeFunction(this.currentnode, nodeParam)==true){
			currentnode_backup = this.currentnode;
			//why the backup? because if the filterFunction does pathfinding, it could change currentNode
			for(var u = currentnode_backup.firstColl; u ; u=u.nextColl){
				if(u && u.owner!=null && (filter.filterFunction(nodeParam, u ) ==true)){
					this.CleanupLists();
					return u;
				}
			}
			this.currentnode = currentnode_backup;
		}
		this.olist.pop();
		this.CloseNode(this.currentnode);
		
		//ha az elozo node-on epulet van, akkor azt megvizsgaljuk, de onnan nem folytatjuk a keresest, mert az unwalkable
		if(Node.isPassable(this.currentnode, layer) == true || this.currentnode == n
		//ZYKLON, units can shoot through allied structures
		|| this.currentnode.structure && this.currentnode.structure.owner == nodeParam.owner
		&& nodeParam.attackRange > 2){//ZYKLON
			//this.GetF_Dijkstra_8dir();
			this.GetF_Dijkstra(1,0,10, layer);
			//this.GetF_Dijkstra(1,1,14);
			this.GetF_Dijkstra(0,1,10, layer);
			//this.GetF_Dijkstra(-1,1,14);
			this.GetF_Dijkstra(-1,0,10, layer);
			//this.GetF_Dijkstra(-1,-1,14);
			this.GetF_Dijkstra(0,-1,10, layer);
			//this.GetF_Dijkstra(1,-1,14);
		}
		
		if(this.olist.length==0){
			break;
		}
		this.currentnode = Pathfinder.getMinimal_F_AndSetAsLast(this.olist);
		this.currentnode.lastDijkstraSearchId = this.currentDijkstraSearchId;
	}
	this.CleanupLists();
	return null;
}

Pathfinder.GetF_Dijkstra  = function(offX, offY, cost, layer){
	var nx = this.currentnode.nodex;
	var ny = this.currentnode.nodey;
	if(ny+offY >= this.mapH || ny+offY < 0 || nx+offX >= this.mapW || nx+offX < 0){
		return;
	}
	var n = this.map[ny+offY][nx+offX];
	if(n.status == 2 || n.status == 1){
		return;
	}
	else if(Node.isPassable(n, layer) == false/*|| 
	//miert nem vizsgalunk atlot? mert manhattan tavolsaggal dolgozunk
	(Node.isWalkable(this.map[ny][offX+nx]) == false && Node.isWalkable(this.map[offY+ny][nx]) == false)*/){
		if(n.structure == null){
			cost = 9999;
		}
	}
	n.f = this.currentnode.f + cost;
	this.OpenNode(n);
}

//Spiral search ignores obstacles
//The spiral pattern kind of ensures that first result is closest
Pathfinder.Spiral_Unit_Search = function(n, radius, filter, nodeParam){
	var nx = n.nodex;
	var ny = n.nodey;
	var filterFunction = filter.filterFunction;
	var offX = 0;
	var offY = 0;
	var off_dx = 0;
	var off_dy = -1;
	for(var i=4*radius*radius; i>=0;--i){
		if(nx + offX >0 && nx+offX < this.mapW && ny + offY >0 && ny+offY < this.mapH){
			var nod = this.map[ny+offY][nx+offX];
			if(filter.nodeFunction(nod , nodeParam)==true){
				for(var u = nod.firstColl; u ; u=u.nextColl){
					if(u && u.owner!=null && (filterFunction(nodeParam, u ) ==true)){
						return u;
					}
				}
			}
		}
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

Pathfinder.Spiral_Unit_Collect = function(n, radius, filter, nodeParam){
	var nx = n.nodex;
	var ny = n.nodey;
	var filterFunction = filter.filterFunction;
	var offX = 0;
	var offY = 0;
	var off_dx = 0;
	var off_dy = -1;
	var collection = [];
	for(var i=4*radius*radius; i>=0;--i){
		if(nx + offX >0 && nx+offX < this.mapW && ny + offY >0 && ny+offY < this.mapH){
			var nod = this.map[ny+offY][nx+offX];
			if(filter.nodeFunction(nod , nodeParam)==true){
				for(var u = nod.firstColl; u ; u=u.nextColl){
					if(u && u.owner!=null && (filterFunction(nodeParam, u ) ==true)){
						collection.push(u);
					}
				}
			}
		}
		//SPIRAL TRAVERSAL
		if (offX == offY || (offX < 0 && offX == -offY) || (offX > 0 && offX == 1-offY)){
			var temp = off_dx;off_dx = -off_dy;off_dy = temp;
		}
		offX += off_dx; offY += off_dy;
	}
	return collection;
}


Pathfinder.getMinimal_F_AndSetAsLast = function(arr){
	var minF = 9999999;
	var minPos = 0;
	var n = arr[0];
	
	for(var i=0;i<arr.length; ++ i){
		n = arr[i];
		if(n.f < minF){
			minF = n.f;
			minPos = i;
		}
	}
	var replace = arr[minPos];
	arr[minPos] = arr[arr.length-1];

	arr[arr.length-1] = replace;
	return replace;
}

Pathfinder.getWallAngleAt = function(n){
	return  Pathfinder.wall_angle_table[ Pathfinder.get_walkability_halfbyte(n,0) ];
}
//the wall angle is defined by 4 neighbors, which results in 16 cases
// > 3 == corner model
// 8 == nub model
Pathfinder.wall_angle_table = [
/*8, 0, 1, 5, //this version does not put nubs at the end of a wall
0,0,4,0,
1,6,1,1,
7,0,1,8*/
8, 8, 8, 5,
8,0,4,0,
8,6,1,1,
7,0,1,8
];


Pathfinder.pointInBounds = function(p){
	return p.x >= 0 && p.x < this.mapW && p.y >=0 && p.y<this.mapH;
}

Pathfinder.GenerateChasmPathing = function(tresh){
	for(var i=0;i<this.mapH;++i){
		for (var j=0;j<this.mapW;++j){
			if(M.terrain.CutoutMap[i][j] < tresh){
				Node.setWalkable(this.map[i][j], false, 3);
				M.terrain.ColorMap[i][j] = 3;
			}
		}
	}
}
Pathfinder.GenerateWaterPathing = function(){
	for(var i=0;i<this.mapH;++i){
		for (var j=0;j<this.mapW;++j){
			var n = this.map[i][j];
			if(n.pathType != 2 && n.pathType != 0){ //we exclude obstacles and hand-placed non-obstacle unwalkables
				continue;
			}
			var t = M.terrain.Tiles[(i/8)>>0][(j/8)>>0];
			
			if(t.waterActor != null && n.averageZ+ M.terrain.CutoutMap[n.nodey][n.nodex] < this.water_pathing_depth){
				Node.setWalkable(n, false, 2);
				M.terrain.ColorMap[i][j] = 2;
			}else{
				Node.setWalkable(n, true, 0);
				M.terrain.ColorMap[i][j] = 0;
			}
		}
	}
}
