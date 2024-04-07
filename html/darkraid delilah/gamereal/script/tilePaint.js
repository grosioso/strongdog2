Editor.autoTileCodes = [[0,1,10,12,4,5,1,13,4,9,10,0,12,13,9,5],
 		 [0,9,11,3,4,4,14,3,8,9,0,11,12,12,14,8],
 		 [0,1,2,11,9,1,6,2,14,9,10,11,0,10,14,6],
 		 [0,10,2,3,12,13,2,7,3,0,10,11,12,13,11,7]];
		 
Editor.autoTileEraseCodes = [[11,6,2,3,8,15,6,7,8,14,2,11,3,7,14,15],
 		 [10,1,2,7,5,5,6,7,15,1,10,2,13,13,6,15],
 		 [12,5,7,3,4,5,15,7,8,4,13,3,12,13,8,15],
 		 [9,1,6,8,4,5,6,15,8,9,1,14,4,5,14,15]];
		 
Editor.autoTileMirrorXYCodes = [0,3,4,1,2,7,8,5,6,11,12,9,10,13,14,15],
Editor.autoTileMirrorXCodes = [0,1,4,3,2,6,5,8,7,10,9,12,11,14,13,15],
Editor.autoTileMirrorYCodes = [0,3,2,1,4,8,7,6,5,12,11,10,9,14,13,15],

Editor.autoCliff = function(xx,yy, isErase, level){
	var tx = Math.floor(xx +0.5);
	var ty = Math.floor(yy +0.5);
	
	Editor.autoCliff_Tile(tx,ty,0,isErase, level);
	Editor.autoCliff_Tile(tx,ty-1,1,isErase, level);
	Editor.autoCliff_Tile(tx-1,ty,2,isErase, level);
	Editor.autoCliff_Tile(tx-1,ty-1,3,isErase, level);
}
Editor.getCliffLevel = function(cliffType){
	return Math.floor(cliffType/256);
}
Editor.getCliffCode = function(cliffType){
	return (cliffType +4096)% 16;
}
Editor.autoCliff_Tile = function(tx, ty, tileId, isErase, level){
	var code = 0;
	if(ty < 0 || ty >= M.height || tx <0 || tx >= M.width){
		return;
	}
	
	if(M.terrain.lastStrokeObject){//store old state for undo/redo operations
		var oldStrokeVal = M.getCliffNodeData(tx, ty);
	};
					
	var node = Pathfinder.map[ty][tx];
	var act = node.actor;
	var oldmask = Editor.getCliffCode(node.cliffType)
	var oldLevel = Editor.getCliffLevel(node.cliffType);
	
	if(isErase == false){
		if(level > oldLevel && Editor.cliffLevelBlending==false){ 
			code = 15;
		}else if(level < oldLevel && Editor.cliffLevelBlending==false){
			return;
		}else{
			code = Editor.autoTileCodes[tileId][oldmask];
		}
		
	}else{
		if(level > oldLevel && Editor.cliffLevelBlending==false){ 
			return;
		}else if(level < oldLevel && Editor.cliffLevelBlending==false){
			code = 0;
		}else{
			code = Editor.autoTileEraseCodes[tileId][oldmask];
		}
	}
	Editor.updateCliffTile(tx,ty,code, isErase, level);
	
	if(M.terrain.lastStrokeObject){//store new state for undo/redo operations
		var newStrokeVal = M.getCliffNodeData(tx, ty);
		M.terrain.lastStrokeObject.setDataPoint(tx,ty, Editor.brushMap_Cliff,0, newStrokeVal-oldStrokeVal)
	};
}

Editor.removeCliffTile = function(node){
	node.actor.remove();
	node.actor = null;
}
Editor.updateCliffTile = function(tx,ty,code , isErase, level){
	var node = Pathfinder.map[ty][tx];
	var old_act = node.actor;
	if(old_act != null){
		Editor.removeCliffTile(node);
	}
	if(isErase == true){
		M.terrain.CutoutMap[ty][tx] = level;
	}
	Editor.setCliffTile(tx, ty, code, level);
	//code 15 means emtpy sapce, we already deleted anything that could have been there
	//code 0 is also empty (well it's filled, but a filled cliff is flat space)
	if(code != 0 && code != 15){
		if(level >= 0){
			M.terrain.Deform_Set_Walkability(node, false, null, 7);
		}else{
			M.terrain.Deform_Set_Walkability(node, false, null, 3); //ZYKLON
		}

	}else{
		M.terrain.Deform_Set_Walkability(node, true, null, 0);
	}
}

Editor.setCliffTile_mirrored = function(mirrorType, tx, ty, code, level){
	code = (code+4096)%16;
	if(mirrorType==0 || mirrorType == 2){
		var mirrorCodes = Editor.autoTileMirrorXYCodes;
	}else if(mirrorType == 1){
		var mirrorCodes = Editor.autoTileMirrorYCodes;
	}else{
		var mirrorCodes = Editor.autoTileMirrorXCodes;
	}
	code = mirrorCodes[code];
	Editor.setCliffTile(tx, ty, code, level);
} 

Editor.setCliffTile = function(tx, ty, code, level){
	code = (code+4096)%16;
	var a = Actor.CliffActor( Editor.cliffSet );
	var node = Pathfinder.map[ty][tx];
	a.x = tx+0.5;
	a.y = ty+0.5;
	a.scale = Editor.cliffSet.actorScale;
	a.cliffTextureVariation = Math.floor(Math.random()*4);
	a.node = node;
	
	
	a.z = node.averageZ + level;
	node.cliffType = code + level*256 + Editor.cliffSet.id*16;
	if(code > 0 ){
		M.terrain.CutoutMap[ty][tx] = level;
	}
	switch(code){
		case 0: M.terrain.CutoutMap[ty][tx] = (level+Editor.cliffSet.height) ; //plateau
		break;
		case 1: Editor.set_Actor_CliffModel(a, 0); a.rotZ = Math.PI; 
		break;
		case 2: Editor.set_Actor_CliffModel(a, 0); a.rotZ = Math.PI*0.5;
		break;
		case 3: Editor.set_Actor_CliffModel(a, 0); a.rotZ = 0;
		break;
		case 4: Editor.set_Actor_CliffModel(a, 0); a.rotZ = Math.PI*1.5;
		break;
		case 5: Editor.set_Actor_CliffModel(a, 1); a.rotZ = Math.PI*1.5;
		break;
		case 6: Editor.set_Actor_CliffModel(a, 1); a.rotZ = Math.PI;
		break;
		case 7: Editor.set_Actor_CliffModel(a, 1); a.rotZ = Math.PI*0.5;
		break;
		case 8: Editor.set_Actor_CliffModel(a, 1); a.rotZ = 0;
		break;
		case 9: Editor.set_Actor_CliffModel(a, 2); a.rotZ = Math.PI*1.5;
		break;
		case 10: Editor.set_Actor_CliffModel(a, 2); a.rotZ = Math.PI;
		break;
		case 11: Editor.set_Actor_CliffModel(a, 2); a.rotZ = Math.PI*0.5;
		break;
		case 12: Editor.set_Actor_CliffModel(a, 2); a.rotZ = 0;
		break;
		case 13: Editor.set_Actor_CliffModel(a, 3);
		break;
		case 14: Editor.set_Actor_CliffModel(a, 3); a.rotZ = Math.PI*0.5;
		break;
		case 15: M.terrain.CutoutMap[ty][tx] = level;
		break;
	}
	if(code != 0 && code != 15){
		Actor.addPartitionedDoodad(a);
		node.actor = a;
	}
	return a;
}

//update model and cliff family in one function
Editor.set_Actor_CliffModel = function(actor, modelType){
	var randId =  Math.floor(Editor.cliffSet.models[modelType].length * Math.random()*0.999);
	actor.model = Editor.cliffSet.models[modelType][randId];
	actor.model_variation = randId;
	actor.shadowModel = actor.model;
	actor.cliffModelType = modelType;
}

function CliffSet(_name){
	//variations of: flat, corner, bend, cross
	this.name = _name;
	this.models = [[Models[7], Models[11], Models[13], Models[16]],
	[Models[8], Models[12], Models[14]],[Models[9],Models[9],Models[15]],[Models[10]]];
	this.hasShadow = true;
	this.shader = ShaderProgram.cliffShader;
	this.shadowShader = ShaderProgram.shadow_cliffShader;
	this.height = 2; //used for cutout
	this.sideHeight = 2; //used for ambient occlusion
	this.actorZOffset = 0;
	this.actorScale = 1;
	this.bendStrength = 0; //used for vegetation explosion effect
	this.texture = Asset.texture.cliff1;
	this.id = CliffSet.nextId; CliffSet.nextId++;
	this.minimapColor = Minimap.color_rock;
	CliffSet.list[this.id] = this;
}
CliffSet.nextId = 0;
CliffSet.list = [];
CliffSet.init = function(){
	var am = Asset.model;
	CliffSet.Mesa = new CliffSet("Mesa 2");
	
	CliffSet.Cave = new CliffSet("Cave");
	CliffSet.Cave.height = -100;
	CliffSet.Cave.hasShadow = false;
	CliffSet.Cave.shader = ShaderProgram.caveShader;
	CliffSet.Cave.models = [[am.cliff3a, am.cliff3a2,am.cliff3a3],[am.cliff3c,am.cliff3c2,am.cliff3c3],[am.cliff3b],[am.cliff3x]];
	CliffSet.Cave.texture = Asset.texture.cliff2;
	
	CliffSet.Mesa3 = new CliffSet("Mesa 3");
	CliffSet.Mesa3.height = 3;
	CliffSet.Mesa3.sideHeight = 3;
	CliffSet.Mesa3.actorScale = 1.5;
	
	CliffSet.Mesa15 = new CliffSet("Mesa 1.5");
	CliffSet.Mesa15.height = CliffSet.Mesa15.sideHeight = 1.5;
	CliffSet.Mesa15.actorScale = 0.75;
	
	CliffSet.Mesa1 = new CliffSet("Mesa 1");
	CliffSet.Mesa1.height = CliffSet.Mesa1.sideHeight = 1;
	CliffSet.Mesa1.actorScale = 0.5;
	
	//CliffSet.Mesa.shortAlias = CliffSet.Mesa1;
	CliffSet.Concrete = new CliffSet("Concrete");
	//CliffSet.Concrete.height = -100;
	//CliffSet.Concrete.hasShadow = false;
	CliffSet.Concrete.shader = ShaderProgram.wallShader;
	CliffSet.Concrete.models = [[am.cliff2a, am.cliff2a2,am.cliff2a3 ],[am.cliff2c ],[am.cliff2b],[am.cliff2x]];
	CliffSet.Concrete.texture = Asset.texture.cliff_concrete;
	
	CliffSet.Concrete1 = new CliffSet("Concrete 1");
	//CliffSet.Concrete.height = -100;
	//CliffSet.Concrete.hasShadow = false;
	CliffSet.Concrete1.shader = ShaderProgram.wallShader;
	CliffSet.Concrete1.models = CliffSet.Concrete.models;
	CliffSet.Concrete1.texture = Asset.texture.cliff_concrete;
	CliffSet.Concrete1.height = CliffSet.Concrete1.sideHeight = 1;
	CliffSet.Concrete1.actorScale = 0.5;
	
	CliffSet.Ridge = new CliffSet("Ridge");
	//CliffSet.Concrete.height = -100;
	//CliffSet.Concrete.hasShadow = false;
	CliffSet.Ridge.models = [[am.cliff_space_a, am.cliff_space_a2, am.cliff_space_a3 ],[am.cliff_space_c,am.cliff_space_c2 ],[am.cliff_space_b],[am.cliff_space_x]];
	CliffSet.Ridge.height = 2;
	CliffSet.Ridge.sideHeight = 2;
	CliffSet.Ridge.actorScale = 1;
	
	CliffSet.Ridge1 = new CliffSet("Ridge1");
	//CliffSet.Concrete.height = -100;
	//CliffSet.Concrete.hasShadow = false;
	CliffSet.Ridge1.models = CliffSet.Ridge.models;
	CliffSet.Ridge1.height = 1;
	CliffSet.Ridge1.sideHeight = 1;
	CliffSet.Ridge1.actorScale = 0.5;
	
	CliffSet.Ridge1 = new CliffSet("Ridge15");
	//CliffSet.Concrete.height = -100;
	//CliffSet.Concrete.hasShadow = false;
	CliffSet.Ridge1.models = CliffSet.Ridge.models;
	CliffSet.Ridge1.height = 1.5;
	CliffSet.Ridge1.sideHeight = 1.5;
	CliffSet.Ridge1.actorScale = 0.75;
	
	CliffSet.Space = new CliffSet("Space");
	//CliffSet.Concrete.height = -100;
	//CliffSet.Concrete.hasShadow = false;
	CliffSet.Space.models = CliffSet.Ridge.models;
	CliffSet.Space.height = 10;
	CliffSet.Space.sideHeight = 9;
	CliffSet.Space.actorZOffset = 8;
	CliffSet.Space.actorScale = 1;
	
	CliffSet.Space_Block = new CliffSet("Space_Block");
	//CliffSet.Concrete.height = -100;
	//CliffSet.Concrete.hasShadow = false;
	CliffSet.Space_Block.models = [[am.cliff2a2,am.cliff2a3 ],[am.cliff2c2,am.cliff2c3 ],[am.cliff2b],[am.cliff2x]];
	CliffSet.Space_Block.height = 10;
	CliffSet.Space_Block.sideHeight = 9;
	CliffSet.Space_Block.actorZOffset = 8;
	CliffSet.Space_Block.actorScale = 1;
	CliffSet.Space_Block.shader = ShaderProgram.wallShader;
	CliffSet.Space_Block.texture = Asset.texture.cliff_concrete;
	
	CliffSet.Space_Layer = new CliffSet("Space_Layer");
	CliffSet.Space_Layer.models = CliffSet.Space_Block.models;
	CliffSet.Space_Layer.height = 10;
	CliffSet.Space_Layer.sideHeight = 9;
	CliffSet.Space_Layer.actorZOffset = 9;
	CliffSet.Space_Layer.actorScale = 0.5;
	CliffSet.Space_Layer.shader = ShaderProgram.wallShader;
	CliffSet.Space_Layer.texture = Asset.texture.cliff_concrete;
	
	CliffSet.Installation = new CliffSet("Installation");
	CliffSet.Installation.height = -100;
	CliffSet.Installation.hasShadow = false;
	CliffSet.Installation.shader = ShaderProgram.wallShader;
	CliffSet.Installation.models = [[am.cliff_inst_a, am.cliff_inst_a2, am.cliff_inst_a3 ],[am.cliff_inst_c ],[am.cliff_inst_b],[am.cliff_inst_x]];
	CliffSet.Installation.texture = Asset.texture.antenna;
	
	CliffSet.Metal = new CliffSet("Metal");
	CliffSet.Metal.shader = ShaderProgram.wallShader;
	CliffSet.Metal.models = [[am.cliff_metal_a, am.cliff_metal_a2, am.cliff_metal_a3 ],[am.cliff_metal_c ],[am.cliff_metal_b],[am.cliff_metal_b]];
	CliffSet.Metal.texture = Asset.texture.computer;
	
	CliffSet.Space_Metal = new CliffSet("Space_Metal");
	CliffSet.Space_Metal.shader = ShaderProgram.wallShader;
	CliffSet.Space_Metal.models = CliffSet.Metal.models;
	CliffSet.Space_Metal.texture = CliffSet.Metal.texture;
	CliffSet.Space_Metal.height = 10;
	CliffSet.Space_Metal.sideHeight = 9;
	CliffSet.Space_Metal.actorZOffset = 9;
	CliffSet.Space_Metal.actorScale = 0.5;
}

	