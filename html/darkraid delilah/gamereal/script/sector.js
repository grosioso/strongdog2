function ScanlineSector(_start, _end){
	this.startX = _start;
	this.endX = _end;
	this.parentSectors = [];
	this.childSectors = [];
	this.sectorID = -1;
	this.generatedID = -1;
	
	this.Recursive_Sector_Join = ScanlineSector.Recursive_Sector_Join;
}

ScanlineSector.Recursive_Sector_Join = function(id){
	this.sectorID = id;
	for(var i=0;i<this.parentSectors.length;++i){
		if(this.parentSectors[i].sectorID != id){
			this.parentSectors[i].Recursive_Sector_Join(id);
		}
	}
	
	for(var i=0;i<this.childSectors.length;++i){
		if(this.childSectors[i].sectorID != id){
			this.childSectors[i].Recursive_Sector_Join(id);
		}
	}
}

//an algorithm filters out cases where pathing is changed, but sectors are not
//checking has to be done BEFORE updating passability, if the node turns walkable,
//and AFTER updating passability, if it turns unwalkable
//otherwise bugs will occur for larger collision layers
Pathfinder.Get_Sector_Update_Filter = function(nod){
	var update_sector_cases = new Uint8Array(Pathfinder.map_scanline.length);
	for(var coll_category = 0; coll_category < Pathfinder.map_scanline.length;++coll_category){
		update_sector_cases[coll_category] = Pathfinder.Sector_Update_Needed(nod, coll_category);
	}
	return update_sector_cases;
}

//only does updates where we couldn't rule out the case of unchanging sectors
Pathfinder.Generate_Sectors_All_Layers_NodeUpdate = function(nod, walkable_or_not, update_sector_cases){
	for(var coll_category = 0; coll_category < Pathfinder.map_scanline.length;++coll_category){
		var sector_change_case = update_sector_cases[coll_category];
		//console.log("change",coll_category,sector_change_case);
		if(sector_change_case == 1){
			Pathfinder.Update_Scanline(nod.nodey, false, coll_category)
			this.Generate_Sectors(coll_category);
		}else{
			if(walkable_or_not == false){
				this.Update_Scanline(nod.nodey, true, coll_category);
			}else{
				this.Update_Scanline(nod.nodey, true, coll_category);
				if(sector_change_case == 2){//a new sector has been opened inside an obstacle area
					//we fill in the negative sectors
					var line = this.map_scanline[coll_category][nod.nodey];
					for(var i=0;i<line.length;++i){
						if(line[i].sectorID == -1){
							line[i].sectorID = this.getUnusedSectorId(coll_category);
						}
					}
				}
				this.Scanline_BorrowSectors(nod.nodey, coll_category);
			}
		}
	}
}

//there are a variety of situations, when sector update is not neccessary, 
//because it is guaranteed that a sector has not been split/merged
//for this we have to check the neighbors of the changed node
Pathfinder.Sector_Update_Needed = function(nod, layer){
	var caseByte = Pathfinder.get_walkability_byte(nod, layer);
	return Pathfinder.sector_update_close_check[ caseByte ];
}

Pathfinder.get_walkability_byte = function(nod, layer){
	var nx = nod.nodex;
	var ny = nod.nodey;
	var kern = [[1,1,1],[1,1,1],[1,1,1]];
	var bitOrders = [[8,4,2],[16,0,1],[32,64,128]];
	//let's get the 9 neighbors, 1 means obstacle
	for(var i=-1;i<=1;++i){
		if(ny + i < 0 || ny + i >= this.mapH){continue;}
		for(var j=-1;j<=1;++j){
			if(nx + j < 0 || nx + j >= this.mapW){continue;}
			if(Node.isPassable(this.map[ny+i][nx+j], layer) == true){
				kern[i+1][j+1] = 0;
			}
		}
	}
	//E + NE*2 + N*4 + NW*8 + W*16 + SW*32 + S*64 + SE*128
	var caseByte = 0;
	for(var i=0;i<3;++i){
		for(var j=0;j<3;++j){
			caseByte += kern[i][j]*bitOrders[i][j];
		}
	}
	return caseByte;
}
Pathfinder.get_walkability_halfbyte = function(nod, layer){
	var nx = nod.nodex;
	var ny = nod.nodey;
	var offsets = [[1,0],[0,1],[-1,0],[0,-1]];
	//E + 2*N + 4*W + 8*S;
	var bitOrders = [1,2,4,8];
	var caseByte = 0;
	//let's get the 4 neighbors
	for(var i=0;i<4;++i){
		var xx = nx+ offsets[i][0];
		var yy = ny+ offsets[i][1];
		if(yy < 0 || yy >= this.mapH || xx < 0 || xx >= this.mapW){continue;}
		caseByte += Node.isPassable(this.map[yy][xx], layer) == true ? 0 : bitOrders[i];
	}
	return caseByte;
}

//all 256 cases for 8 neighbors
//each neighbor is 1 bit, starting from the EASTERN neighbor (+1,0)
//if value is 1, closing the node might split the sector in 2 or more sectors
//and opening it might merge sectors
//if value is 2, opening the node will create a new sector inside an unwalkable area
Pathfinder.sector_update_close_check = [
0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,
0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,
0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,
0,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,
0,0,1,0,0,2,0,2,0,0,1,0,0,2,0,2,
0,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,
0,0,1,0,0,2,0,2,0,0,1,0,0,2,0,2,
0,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,
1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,
0,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,
0,0,1,0,0,2,0,2,0,0,1,0,0,2,0,2,
0,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,
0,0,1,0,0,2,0,2,0,0,1,0,0,2,0,2,
];

//Use it when whole map is updated, not for a single node
Pathfinder.Generate_Sectors_All_Layers = function(){
	for(var coll_category = 0; coll_category < Pathfinder.map_scanline.length;++coll_category){
		this.Generate_Sectors(coll_category);
	}
}
Pathfinder.Generate_Scanlines_Full = function(){
	for(var i=0;i<this.mapH;++i){
		Pathfinder.Update_Scanline(i, false, 0);
		Pathfinder.Update_Scanline(i, false, 1);
	}
	Pathfinder.Generate_Sectors(0);
	Pathfinder.Generate_Sectors(1);
}

Pathfinder.Update_Scanline = function( lineY, keep_sectors, layer ){
	var scanmap = this.map_scanline[layer];
	var start = 0;
	var end = 0;
	var prev_walkable = false;
	var newScan = [];
	
	for(var i=0; i<this.mapW;++i){
		if(Node.isPassable(this.map[lineY][i], layer) == true){
			prev_walkable = true;
		}else{
			if(prev_walkable == true){
				newScan.push( new ScanlineSector(start, end-1));
				start = end;
			}
			start ++;
			prev_walkable = false;
		}
		end++;
	}
	if(prev_walkable == true){
		newScan.push( new ScanlineSector(start, end-1));
	}
	
	if(keep_sectors == true){
		for(var i=0;i<newScan.length;++i){
			newScan[i].sectorID = Node.getSectorID(this.map[lineY][newScan[i].startX], layer);
		}
	}
	scanmap[lineY] = newScan;
}

Pathfinder.Scanline_BorrowSectors = function(lineY, layer){
	var scanmap = this.map_scanline[layer];
	var line = scanmap[lineY];
	for(var i=0;i<line.length;++i){
		if( lineY < this.mapH -1){
			var nextline = scanmap[lineY+1];
			this.Scanline_Get_Id_From_Neighbor(line[i], nextline);
		}
		if( lineY > 0){
			var prevline = scanmap[lineY-1];
			this.Scanline_Get_Id_From_Neighbor(line[i], prevline);
		}
	}
}

Pathfinder.Scanline_Get_Id_From_Neighbor = function(segment, otherline){
	for(var j=0; j< otherline.length;++j){
		if(otherline[j].endX >= segment.startX && otherline[j].startX <= segment.endX){
			if(otherline[j].sectorID >= 0){
				segment.sectorID = otherline[j].sectorID; break;
			}//else{console.log("This should not be negative")}
		}else if( otherline[j].startX > segment.endX){
			//mar tulhaladtunk a szektor vegen, biztos hogy ezutan nem talalunk csatlakozo szektort az also sorban
			break;
		}
	}
}

Pathfinder.sectorIDs = [[],[]];

Pathfinder.getUnusedSectorId = function(layer){
	var ids = this.sectorIDs[layer];
	var maxId = -1;
	for(var i=0;i<ids.length;++i){
		maxId = Math.max(ids[i],maxId);
	}
	maxId += 1; //the new id is larger than the largest current one
	this.sectorIDs[layer].push(maxId);
	return maxId;
}

Pathfinder.Generate_Sectors = function(layer){
	this.sectorIDs[layer] = [];
	var scanmap = this.map_scanline[layer];
	var line;
	for(var lineY = 0; lineY<this.mapH; ++lineY){
		line = scanmap[lineY];
		for(var i = 0;i<line.length; ++i){
			line[i].sectorID = -1;
			line[i].parentSectors.length = 0;
			line[i].childSectors.length = 0;
		}
	}
	
	var nextline;
	var nextSectorID = 0;

	for(var lineY = 0; lineY<this.mapH; ++lineY){
		line = scanmap[lineY];

		for(var i = 0;i<line.length; ++i){
			if(line[i].sectorID < 0){
				line[i].sectorID = nextSectorID;
				line[i].generatedID = nextSectorID;
				++nextSectorID;
			}
			
			if( lineY < this.mapH -1){
				nextline = scanmap[lineY+1];
				for(var j=0; j< nextline.length;++j){
					if(nextline[j].endX >= line[i].startX && nextline[j].startX <= line[i].endX){
						nextline[j].parentSectors.push(line[i]);
						line[i].childSectors.push( nextline[j] );
						//if(nextline[j].sectorID < 0){
							nextline[j].sectorID = line[i].sectorID;
						//}
					}else if( nextline[j].startX > line[i].endX){
						//mar tulhaladtunk a szektor vegen, biztos hogy ezutan nem talalunk csatlakozo szektort az also sorban
						break;
					}
				}
			}
		}
	}
	
	for(var lineY = 0; lineY<this.mapH; ++lineY){
		line = scanmap[lineY];
		for(var i = 0;i<line.length; ++i){
			if(line[i].sectorID == line[i].generatedID){
				this.sectorIDs[layer].push(line[i].sectorID);
			}
			line[i].Recursive_Sector_Join(line[i].sectorID);
		}
	}
}

Pathfinder.DEBUG_log_sector_ids = function(layer){
	var arr = [];
	for(var i=0;i<this.mapH;++i){
		var line_arr = [];
		for(var j=0;j<this.mapW;++j){
			line_arr.push( Node.getSectorID(this.map[i][j], layer));
		}
		arr.push(line_arr);
	}
	console.log(arr);
}