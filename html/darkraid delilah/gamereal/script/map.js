
var M = new Object();
M.height = 128;
M.width = 128;
M.maxDim = 128;
M.terrain = null;
M.tileset = [];

M.name = "Just Another Voor Map";
M.filename = null; //used for save/load data
M.musicId = 0;
M.ambienceId = 0;

M.cam_bound_top = 64;
M.cam_bound_bottom = 0;
M.cam_bound_right = 64;
M.cam_bound_left = 0;
M.offsetX = 0;
M.offsetY = 0;
M.isMenu = false;
M.hasThumbnail = false;
M.isMelee = false;
M.meleePlayers = 2;
M.description = "No description."
M.monsterLevel = 0;
M.lastLoadedData = null;
M.version_id = 0;
M.loadX = 0;
M.loadY = 0;
M.loadZ = 0;
M.playerColors = [0,1,2,3,4,5,6,7,8];

M.getTerrainTextureById = function(id){
	id = Math.max(0,Math.min(7,id));
	return this.tileset[id];
}
M.getParitionedDoodadCount = function(){
	var sum = 0;
	for(var i=0;i<Doodads.length;++i){
		for(var j=0;j<Doodads[i].length;++j){
			sum += Doodads[i][j].length;
		}
	}
	return sum;
}
M.initDoodadPartitions = function(){
	Doodads = [];
	for(var i=0;i<this.height;i+=16){
		Doodads[i/16] = [];
		for(var j=0;j<this.width;j+=16){
			Doodads[i/16][j/16] = [];
		}
	}
}

M.setCamBoundsToSize = function(){
	this.cam_bound_bottom = 0; this.cam_bound_left = 0;
	this.cam_bound_right = this.width; this.cam_bound_top = this.height;
	cam.setBoundsToMapSize();
}

M.Initialize = function(h,w){
	this.height = h;
	this.width = w;
	this.maxDim = Math.max(h,w);
	this.setCamBoundsToSize();
	M.initDoodadPartitions();
	this.tileset = [Asset.texture.terrain_rock,Asset.texture.terrain_darkDirt,Asset.texture.terrain_grass, Asset.texture.terrain_sand,Asset.texture.terrain_cobble,Asset.texture.terrain_dryGrass];
	this.tilesetMiniMapColors = [ [142,124,110],[181,176,168],[240,228,202],[240,228,202],[130,130,130],[230,240,255]];
	
	M.initDoodadPartitions();
	M.terrain = new Terrain();
	M.terrain.init(null);
	initTerrainBuffers(M.terrain);
	Environment.init();
	Pathfinder.init();
	Minimap.Initialize();
	Editor.PlacedUnits = [];
	M.offsetX = 0;
	M.offsetY = 0;
	
	M.terrain.Update_All_Tiles()
	M.offsetX = 0;
	M.offsetY = 0;
	
	M.terrain.update_blendTexture();
	M.terrain.update_waterTexture();
	M.isMenu = false;
	M.isMelee = false;
	M.meleePlayers = 2;
	M.description = "No description."
	M.hasThumbnail = false;
	setTerrainTexResolution( terrainTexSize );
}
M.Create = function(h,w,name){
	h=Math.floor(h);
	w=Math.floor(w);
	M.Initialize(h,w);
	M.name = name || "No name";
	M.filename = null;
	LevelStart();
	Environment.Reset();
	M.setCamBoundsToSize();
}
//you can set a custom (bigger) size if you want to expand the map
M.loadMap = function(data, injected_size){
	M.loadX = M.loadY = 0;
	this.lastLoadedData = data;
	this.name = data.name;
	this.description = data.description || "No description."
	this.version_id = data.version_id || 0;
	
	if(injected_size === void 0){
		this.height = data.height;
		this.width = data.width;
		this.maxDim = Math.max(this.height,this.width);
	}else{
		this.height = injected_size[0];
		this.width = injected_size[1];
	}

	this.isMenu = data.isMenu != undefined ? data.isMenu : false;
	this.isMelee = data.isMelee !=undefined ? data.isMelee : false;
	this.meleePlayers = data.meleePlayers || 2;
	this.hasThumbnail = data.hasThumbnail ? data.hasThumbnail : false;
	M.initDoodadPartitions();
	M.terrain = new Terrain();
	M.terrain.init(/*data*/);
	//initTerrainBuffers(M.terrain);
	Environment.init();
	Pathfinder.init();
	Minimap.Initialize();
	Editor.PlacedUnits = [];
	M.offsetX = 0;
	M.offsetY = 0;
	M.musicId = data.musicId || 0;
	M.ambienceId = data.ambienceId || 0;
	M.playerColors = data.playerColors || null;
	if(data.monsterLevel!= undefined){
		M.monsterLevel = data.monsterLevel;
	}else{
		M.monsterLevel = 0;
	}
	BuilderModel.Init();
	BuilderModel.load_all_data(data.builderData);
	LevelStart();
 
	//M.LoadTileData(data);
	//M.loadTexGroups(data);
	M.setCamBoundsToSize(); 
	cam.setBounds();
	
	//M.terrain.Update_All_Tiles();
	
	M.loadEnvironment(data);
	//Pathfinder.LoadPathing(data); //this must come after, because it uses averageZ;
	//M.LoadCliffData(data); //this must come after, because it uses averageZ;
	M.terrain.Update_All_Tiles();
	//M.LoadRoadData(data);
	if(data.navSectors){
		NavSector.loadSaveData(data.navSectors);
	}
	M.LoadDoodadData(data);
	if(Gamestats.saveState != null){
		Player.loadSaveState(Gamestats.saveState.playerData);
		Upgrade.loadSaveState(Gamestats.saveState.upgradeData);
		Unit.loadSaveState(Gamestats.saveState.unitData);
	}else{
		M.LoadUnitData(data);
		Trigger.getTaggedUnits();
		Gamestats.GetStartLocations();
	}
	
	if(data.triggerData!= undefined){
		Trigger.loadSavedData(data.triggerData);
	}
	if(Gamestats.saveState != null){
		Gamestats.mapTime = Gamestats.saveState.mapTime;
		//Pathfinder.loadFOW(Gamestats.saveState.fowData);
		Trigger.loadSaveState(Gamestats.saveState.triggerData);
		Trigger.loadActorSaveState(Gamestats.saveState.triggerActorData);
		Trigger.loadActionHistory(Gamestats.saveState.triggerActionHistory);
		Trigger.loadTimers(Gamestats.saveState.triggerTimers);
		Trigger.loadUnitGroupSaveSate(Gamestats.saveState.unitGroupData);
		Objective.loadSaveState(Gamestats.saveState.objectiveValues);
	}
	Gamestats.saveState = null;
	//M.terrain.update_blendTexture();
	//M.terrain.update_waterTexture();
	Actor.calculate_doodad_bounding_boxes();
	Minimap.generate_tintArray();
	setTerrainTexResolution(terrainTexSize);
}

M.loadTexGroups = function(data){

	TexGroup.vegetation.update(data.hsl_vegetation);
	TexGroup.rock.update(data.hsl_rock);
	TexGroup.sand.update(data.hsl_sand);
	TexGroup.dirt.update(data.hsl_dirt);
	TexGroup.concrete.update(data.hsl_concrete);
}

M.saveMap = function(){
	var mapData = new Object;
	mapData.version_id = VERSION_ID;
	mapData.name = M.name;
	mapData.width = M.width;
	mapData.height = M.height;
	mapData.isMelee = M.isMelee;
	mapData.meleePlayers = M.meleePlayers;
	mapData.description = M.description;
	if(M.isMelee || M.hasThumbnail){
		mapData.thumbnail = Minimap.saveThumbnail();
	}
	mapData.hasThumbnail = M.hasThumbnail;
	mapData.musicId = M.musicId;
	mapData.ambienceId = M.ambienceId;
	mapData.isMenu = M.isMenu;
	//mapData.cam_bounds = [M.cam_bound_top,M.cam_bound_bottom,M.cam_bound_left,M.cam_bound_right];
	mapData.monsterLevel = M.monsterLevel;
	//mapData.playerColors = M.playerColors;
	
	mapData.skyId = Environment.skyId;
	
	mapData.navSectors = NavSector.getSaveData();
	//mapData.hsl_rock = TexGroup.rock.getHSL();
	//mapData.hsl_sand = TexGroup.sand.getHSL();
	//mapData.hsl_vegetation = TexGroup.vegetation.getHSL();
	//mapData.hsl_dirt = TexGroup.dirt.getHSL();
	//mapData.hsl_concrete = TexGroup.concrete.getHSL();
	//mapData.HeightMap = "";
	//for(var i=0;i<=M.height;++i){
	//	for(var j=0;j<=M.width;++j){
	//		mapData.HeightMap += to_b64_fixed(M.terrain.HeightMap[i][j], 6, 6, true);
	//	}
	//}
	//mapData.blendBuffer = M.getBlendMapArray();
	//mapData.waterBuffer = M.getAOArray();
	//mapData.pathingMap = M.getWalkabilityBitmap();
	//mapData.cliffMap = M.getCliffMap();
	//mapData.tiles = M.getTileSaveData();
	mapData.builderData = BuilderModel.save_all_data();
	mapData.doodads = M.getDoodadSaveData();
	mapData.doodadLUT = DoodadPrototype.getNewLUT();
	//mapData.roads = M.getRoadSaveData();
	mapData.units = M.getUnitSaveData();
	mapData.triggerData = Trigger.getSaveData();
	return JSON.stringify(mapData);
}

M.downloadSavedMap = function(){
	Filesaver.saveFile(M.saveMap(), this.name + ".txt", "maps");
}

M.loadEnvironment = function(data){
	Environment.skyId = data.skyId || 0;
}

M.resetUnits = function(){
	for(var i=Units.length-1;i>=0;--i){
		var u = Units[i];
		if(u != Gamestats.Hero){
			u.Remove();
		}
	}
	
	for(var i=Editor.PlacedUnits.length-1;i>=0;--i){
		var u = Editor.PlacedUnits[i];
		var player = u.owner;
		if(u.proto.isItem == true){
			u.owner = Players[0];
		}
		var u2 = Unit.Create(u.editorPlace.x, u.editorPlace.y, player, u.proto);
		u2.editorPlace = new Vector(u.editorPlace.x, u.editorPlace.y, u.editorPlace.z);
		u2.z = u.editorPlace.z;
		Unit.setFacingInstant(u2, u.editorAngle);
		u2.editorAngle = u.editorAngle;
		u2.tagId = u.tagId;
	}
	
	Trigger.getTaggedUnits();
}

M.getBlendMapArray = function(){
	//why divide it up into 2 pieces? 1st: rgb will be together, alpha separate, 
	//2nd: 32 bits are not exceeded
	var b64buf = "";
	var len = M.terrain.blendBuffer.length;
	var buf = M.terrain.blendBuffer;
	for(var i=0;i<len;i+=4){
		
		var b64pixel = to_b64_fixed(buf[i+2]+buf[i+1]*256+buf[i]*65536, 24 , 0, false);
		b64pixel += to_b64_fixed(buf[i+3], 6 , 0, false);
		b64buf += b64pixel;
	}
	return b64buf;
}
M.getAOArray = function(){
	//only export rba channels in current setup
	var b64buf = "";
	var len = M.terrain.waterBuffer.length;
	var buf = M.terrain.waterBuffer;
	for(var i=0;i<len;i+=4){
		var b64pixel = to_b64_fixed(buf[i+3]+buf[i+2]*256+buf[i]*65536, 24 , 0, false);
		b64buf += b64pixel;
	}
	return b64buf;
}

M.getWalkabilityBitmap = function(){
	//var arr = [];
	var arr = "";
	for(var i=0;i<this.height;++i){
		//arr[i] = [];
		for(var j=0;j<this.width;++j){
			if(Pathfinder.map[i][j].structure == null){
				arr+= sextetToB64Char(Pathfinder.map[i][j].pathType);
				//arr[i][j] = Pathfinder.map[i][j].pathType;
			}else{
				arr+= 'A';
				//arr[i][j] = 0;
			}
		}
	}
	return arr;
}

M.getCliffMap = function(){
	var arr = "";
	for(var i=0;i<this.height;++i){
		for(var j=0;j<this.width;++j){
			/*var nod = Pathfinder.map[i][j];
			if(nod.actor != null){
				arr += to_b64_fixed((nod.cliffType)*16 + nod.actor.model_variation%16,18,0,true);
			}else{
				arr += to_b64_fixed((nod.cliffType)*16,18,0,true); 
			}*/
			arr += to_b64_fixed( M.getCliffNodeData(j,i) ,18,0,true); 
		}
	}
	return arr;
}
M.getCliffNodeData = function(xx,yy){
	var nod = Pathfinder.map[yy][xx];
	if(nod.actor != null){
		return (nod.cliffType)*16 + nod.actor.model_variation%16 ;
	}
	return (nod.cliffType)*16 ; 
	
}

M.getTileSaveData = function(){
	var arr = [];
	for(var i=0;i<this.terrain.Tiles.length;++i){
		arr[i] = [];
		for(var j=0;j<this.terrain.Tiles[i].length;++j){
			var t=this.terrain.Tiles[i][j];
			var record = [t.matId, t.tileSideBias[0], t.tileSideBias[1],t.tileSideBias[2], t.tileSideBias[3], 0];
			if(t.waterActor != null){
				record[5] = t.waterActor.group.id+1;
			}
			arr[i].push(record);
		}
	}
	return arr;
}

M.LoadTileData = function(data){
	if(data.tiles == undefined){return;}
	var tile_rows = Math.min(M.terrain.Tiles.length, data.tiles.length);
	var tile_cols = Math.min(M.terrain.Tiles[0].length, data.tiles[0].length);
	for(var i=0;i< tile_rows ;++i){
		for(var j=0;j< tile_cols ;++j){
			var t = M.terrain.Tiles[i +Math.floor(M.loadY/8)][j +Math.floor(M.loadX/8)];
			M.terrain.Deform_Tile_Set_Material(j*8+M.loadX,i*8+M.loadY,data.tiles[i][j][0]);
			t.tileSideBias[0] = data.tiles[i][j][1];
			t.tileSideBias[1] = data.tiles[i][j][2];
			t.tileSideBias[2] = data.tiles[i][j][3];
			t.tileSideBias[3] = data.tiles[i][j][4];
			if(data.tiles[i][j][5] > 0){
				Editor.waterGroupId = data.tiles[i][j][5]-1;
				M.terrain.Deform_Tile_Water(j*8+M.loadX,i*8+M.loadY,true);
			}
		}
	}
}

M.getDoodadSaveData = function(){
	var arr = [];
	for(var i=0;i<Actors.length;++i){
		if(Actors[i].getDoodadSaveData != undefined || Actors[i].getDoodadSaveData != null){			
			arr.push(Actors[i].getDoodadSaveData());
		}
	}

	for(var k=0;k<Doodads.length;++k){
		for(var l=0;l<Doodads[0].length;++l){
			var part = Doodads[k][l];
			for(var i=0;i<part.length;++i){
				if(part[i].getDoodadSaveData != undefined){
					arr.push(part[i].getDoodadSaveData());
				}
			}
		}
	}
	
	return arr;
}

M.getUnitSaveData = function(){
	var arr = [];
	for(var i=0;i<Editor.PlacedUnits.length;++i){
		arr.push(Unit.getSaveData(Editor.PlacedUnits[i]));
	}
	return arr;
}

M.LoadDoodadData = function(data){
	if(data.doodads == undefined){return;}
	DoodadPrototype.decodeLUT(data.doodadLUT);
	for(var i=0;i<data.doodads.length;++i){
		DoodadPrototype.loadInstance(data.doodads[i]);
	}
}

M.LoadUnitData = function(data){
	if(data.units == undefined){return;}
	for(var i=0;i<data.units.length;++i){
		UnitPrototype.loadInstance(data.units[i]);
	}
}

M.LoadCliffData = function(data){
	var readId = 0;
	if(data.cliffMap == undefined){return;} 
	
	for(var i=0;i<data.height;++i){
		for(var j=0;j<data.width;++j){
			var loadVal = data.cliffMap[readId] + data.cliffMap[readId+1] + data.cliffMap[readId+2];
			readId += 3;
			
			var val = from_b64_fixed(loadVal,18,0,true);
			M.SetCliffNodeFromData(j+M.loadX,i+M.loadY,val);
		}
	}
}

M.SetCliffNodeFromData = function(xx,yy,val){
	type = Math.floor(val/16);
	variation = (val+4096*16)%16;
	var ctype = (type+4096)%16;
	var cfamily = Math.floor(((type+4096)%256) / 16);
	var clevel = Math.floor(type/256);
	if(val!=15){
		Editor.cliffSet = CliffSet.list[cfamily];
		Actor.setCliffModelVariation(Editor.setCliffTile(xx, yy, ctype, clevel),variation);
	}
}


M.LoadRoadData = function(data){
	if(data.roads == undefined){return;}
	for(var i=0;i<data.roads.length;++i){
		var spline = [];
		for(var j=0;j<data.roads[i].length;j+=4){
			spline[j/4] = new RoadPoint(data.roads[i][j], data.roads[i][j+1], data.roads[i][j+2], data.roads[i][j+3]);
		}
		RoadActor.SpawnRoad_Spline(0,0,spline);
	}
}
M.getRoadSaveData = function(){
	var arr = [];
	for(var i=0;i<Actors.length;++i){
		var spline = Actors[i].spline;
		if(spline != undefined){
			var newSplineData = [];
			arr.push(newSplineData);
			for(var j=0;j<spline.length;++j){
				newSplineData[j*4] = Math.round(spline[j].x*100)/100;
				newSplineData[j*4+1] = Math.round(spline[j].y*100)/100;
				newSplineData[j*4+2] = Math.round(spline[j].fillet*100)/100;
				newSplineData[j*4+3] = Math.round(spline[j].width*100)/100;
			}
		}
	}
	return arr;
}