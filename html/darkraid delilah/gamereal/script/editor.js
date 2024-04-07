function EditorBrushmode(_id, isTiled, hasDecal, _decaltex, hasActor, isTerrainPaint){
	this.id = _id;
	this.constrained_to_tile = isTiled;
	this.decalCursor = hasDecal;
	this.decalTexture = _decaltex;
	this.actorCursor = hasActor;
	this.isTerrainPaint = isTerrainPaint;
	this.on_set_function = null;
}

function TerrainMaterial(id, name, array){
	this.id = id;
	this.name = name;
	//a permutation of textures. 
	//Array position is the texture id in the tileset, 
	//array value is the channel number of the texture in a given tile, 
	//-1 means it's not in the tile, 0 is base texture, 1 is red channel, 2 is green, 3 is blue
	this.array = array;
}
TerrainMaterial.list = [];
TerrainMaterial.list[0] = new TerrainMaterial(0,"Default",  [1,0,3,2,-1,-1,-1,-1]);
TerrainMaterial.list[1] = new TerrainMaterial(1,"Concrete",[-1,0,3,2,1,-1,-1,-1]);
TerrainMaterial.list[2] = new TerrainMaterial(2,"Rock+Conc",[1,0,-1,3,2,-1,-1,-1]);
TerrainMaterial.list[3] = new TerrainMaterial(3,"Snow",[1,0,-1,2,-1,3,-1,-1]);
TerrainMaterial.list[4] = new TerrainMaterial(4,"Snow+Conc",[1,0,-1,-1,2,3,-1,-1]);

var Editor = new Object();
Editor.init = function(){
	Editor.brushMode_Paint = new EditorBrushmode(1,false, true, Asset.texture.circle, false, true);
	Editor.brushMode_Smooth = new EditorBrushmode(2,false, true,  Asset.texture.circle, false, true);
	Editor.brushMode_Flatten = new EditorBrushmode(3,false, true,  Asset.texture.circle, false, true);
	Editor.brushMode_Tile = new EditorBrushmode(4,true, true, Asset.texture.tileBracket, false, true);
	Editor.brushMode_TileSelect = new EditorBrushmode(5,true, true, Asset.texture.tileBracket, false, true);
	Editor.brushMode_TileMask = new EditorBrushmode(6,true, true, Asset.texture.tileBracket, false, true);
	//Editor.brushMode_TileSelect = 
	Editor.brushMode_Place = new EditorBrushmode(7,false, false, null , true, false);
	Editor.brushMode_GenPlace = new EditorBrushmode(8,false, true, Asset.texture.tileBracket , false, false);
	Editor.brushMode_Select = new EditorBrushmode(9,false, false, null , false, false);
	Editor.brushMode_TileWater = new EditorBrushmode(10,true, true, Asset.texture.tiletex_water , false, true);
	Editor.brushMode_TileMaterial = new EditorBrushmode(11,true, true, Asset.texture.tiletex_material , false, true);
	
	Editor.brushMode_Draw = new EditorBrushmode(12,false, false, null , false, false);
	Editor.brushMode_Draw.on_set_function = function(){
		Editor.reset_draw_stroke();
	}
	
	Editor.brushMode = Editor.brushMode_Select;
	Editor.cliffSet = CliffSet.Mesa;
	Editor.tileMaterial = TerrainMaterial.list[0];
	
	Utils.sort_by_name(Editor.Objects[0]);
	Utils.sort_by_name(Editor.Objects[1]);
	Utils.sort_by_name(Editor.Objects[2]);
	
	Editor.Draw_Points = [];
}

Editor.loop = function(){
	this.check_selected_types();
	for(var i=0;i<Visible_Actors.length;++i){
		Editor.update_selection_editor(Visible_Actors[i]);
	}
}

Editor.brushMap_Height = 0;
Editor.brushMap_Blendmap = 2;
Editor.brushMap_Pathing = 4;
Editor.brushMap_Cliff = 5;
Editor.brushMap_Mask = 6
Editor.brushMap_Water = 7;
Editor.drawType_points = 0;
Editor.drawType_cut = 1;
Editor.drawType_hole = 2;

Editor.object_min_distance = 0.4;
Editor.snap_grid_size = 0.5;
Editor.snap_draw_size = 0.2;

Editor.Objects = [[], [], [], []]; //list of objects on palette
//first row is units, second is doodads

//this does not take into account the grid snap
//meaning the lastPlacementPos might not be equal to the pos
//of the last placed object
Editor.lastPlacementPos = new Point(-1,-1);
Editor.lastPlacedObject = null;
Editor.PlacedUnits = [];
Editor.lastPlacedArray = null; //objects placed in the last stroke
Editor.selected = [];
Editor.selectedTiles = [];

Editor.followWallZ = false;
Editor.brushMode = null;
Editor.sculptBrushStrength = 0.4;
Editor.smoothBrushStrength = 0.6;
Editor.terrainBrushStrength = 50;
Editor.cliffLevel = 0;
Editor.cliffLevelBlending = false;
Editor.tileMaterial = null;
Editor.cliffSet = null;
Editor.brushSize = 5;
Editor.paletteId = 0;

Editor.drawType = 0;
Editor.brushMap = 0;
Editor.brushChannel = 0;
Editor.brushObject = null;
Editor.brushGenObject = null;
Editor.dragRect = null;
Editor.brushPlayerId = 1;
Editor.waterGroupId = 0;
Editor.RPY = false;
Editor.mesh_edit_mode = false;

Editor.PAINT_IN_PROGRESS = false;

Editor.setBrushSize = function(val){
	Editor.brushSize = Math.min(Math.max(val, 0.1),30);
}

Editor.PaintStart = function(x,y){
	if(Editor.PAINT_IN_PROGRESS == false && GUI.Elements == GUI.Editor){
		Editor.PAINT_IN_PROGRESS = true;
		M.terrain.DeformStart(x,y, Editor.brushMap, Editor.brushChannel);
		M.terrain.lastStrokeObject = new EditorStroke();
		Editor.lastPlacedArray = [];
	}
}

Editor.PaintEnd = function(){
	Editor.PAINT_IN_PROGRESS = false;
	if(Editor.lastPlacedArray && Editor.lastPlacedArray.length > 0){ //objects have been placed
		EditorAction.Create(EditorAction.type_place);
	}else{
		EditorAction.Create(EditorAction.type_paint);
	}
	M.terrain.lastStrokeObject = null;
	Editor.lastPlacedArray = [];
}

Editor.MousePaint = function(x, y, btn){
	if(Editor.PAINT_IN_PROGRESS == false){
		return;
	}
	
	//var altPressed = Control.pressed[18];
	if(Editor.brushMode.isTerrainPaint == true){
		if(btn == 83){
			M.terrain.Deform(x,y,Editor.brushMode_Smooth.id,Editor.brushMap, Editor.brushChannel);
		}else if(btn == 70){
			M.terrain.Deform(x,y,Editor.brushMode_Flatten.id,Editor.brushMap, Editor.brushChannel);
		}else if(btn == 1){
			M.terrain.Deform(x,y,Editor.brushMode.id,Editor.brushMap, Editor.brushChannel);
		}else if(btn == 3){
			M.terrain.Deform(x,y, - Editor.brushMode.id,Editor.brushMap, Editor.brushChannel);
		}
	}else if(Editor.brushMode == Editor.brushMode_Place){
		if(btn == 1){
			Editor.placeObject(x,y);
		}
	}
}

Editor.setBrushStrength = function(val){
	Editor.terrainBrushStrength = val * 0.5;
	Editor.sculptBrushStrength = val/100 * 0.5;
}

Editor.getKernel = function(size, hardness){
	size = Math.ceil(size);
	var kern = [];
	var center = size/2;
	//var maxStrength = ; //divide with this for normalization
	for(var i=0;i<size;++i){
		kern[i] = [];
		for(var j=0;j<size;++j){
			//kern[i][j] = Math.pow((i+0.5-center)*(i+0.5-center) + (j+0.5-center)*(j+0.5-center), hardness*0.5);
			//kern[i][j] *= -1;
			//kern[i][j] += Math.pow(center, hardness) ;
			//kern[i][j] = Math.max(kern[i][j], 0);
			//kern[i][j]/= Math.pow(center, hardness);
			
			kern[i][j] = -1 * hardness * Math.sqrt((i+0.5-center)*(i+0.5-center) + (j+0.5-center)*(j+0.5-center))
			kern[i][j] += center* hardness;
			kern[i][j] /= center;
			kern[i][j] = Math.max(Math.min(kern[i][j],1), 0);
		}
	}
	return kern;
}

Editor.placeObject = function(x,y){
	var tilesRadius = 1;
	var clickedNode = Pathfinder.getNodeAt(x,y);
	if(clickedNode == undefined){return;}
	if(Editor.brushObject.type!=undefined && Node.isWalkable(clickedNode)==false){return;}
	var nx = clickedNode.nodex;
	var ny = clickedNode.nodey;
	
	var p = new Point(x,y);
	if(Editor.lastPlacedObject!=null &&  Point.distance(p, Editor.lastPlacementPos ) <  Editor.object_min_distance){
		return;
	}
	Editor.lastPlacementPos.x = x; Editor.lastPlacementPos.y = y;
	if(Editor.brushObject.type != undefined){ //place a unit	
		var placed_unit = Unit.Create(x,y, Players[Editor.brushPlayerId], Editor.brushObject);
		Editor.lastPlacedObject = placed_unit.actor;
		placed_unit.z = NavNode.get_floor_z(x,y,placed_unit.z)
		placed_unit.editorPlace = new Vector(x,y,placed_unit.z);
		placed_unit.editorAngle = Editor.lastPlacedObject.owner.angle;
		Editor.PlacedUnits.push(placed_unit);
	}else{
		Actor.remove_if_added(Control.terrainCursor);
		Editor.lastPlacedObject = DoodadPrototype.Create(x,y, Editor.brushObject, Control.terrainCursor);
		Editor.setActorCursor();
		if(Editor.lastPlacedObject.getInfoText != undefined){GUI.AddInfoText(Editor.lastPlacedObject)};
		if(Editor.lastPlacedObject.isShipActor){
			Editor.lastPlacedObject = Editor.lastPlacedObject.owner;
			Editor.lastPlacedObject.editorPlace = new Vector(x,y, Editor.lastPlacedObject.z); 
		}
	}
	if(Editor.lastPlacedArray != null){
		Editor.lastPlacedArray.push(Editor.lastPlacedObject);
	}
}

Editor.setBrushMode = function(mode){
	if(mode.actorCursor == true && Editor.brushMode.actorCursor == true){
		Actor.remove_if_added(Control.terrainCursor);
		Editor.setActorCursor();
	}

	if(mode != Editor.brushMode){
		if(mode.on_set_function){
			mode.on_set_function();
		}
		if(Editor.brushMode.decalCursor == true){
			if(mode.actorCursor == true){
				if(Editor.brushObject == null){
					Editor.brushObject = UnitPrototype.Crusader;
				}
				Control.terrainCursor = Editor.brushObject.actor_constructor(Editor.brushObject, null);
				Actors.push(Control.terrainCursor);
				Control.terrainCursor.texture = Control.terrainCursor.texture_default;
			}
		}else if(Editor.brushMode.actorCursor == true){
			Actor.remove_if_added(Control.terrainCursor);
		}else{
			if(mode.actorCursor == true){
				Editor.setActorCursor();
			}
		}
		
		if(mode.decalCursor == false){
			Control.decalCursor.nodraw = true;
		}else{
			Control.decalCursor.nodraw = false;
			Control.terrainCursor = Control.decalCursor;
		}
	}
	Editor.brushMode = mode;
}

Editor.setBrushObject = function(obj){
	Editor.brushObject = obj;
	Editor.setBrushMode(Editor.brushMode_Place);
}

Editor.cursorUpdate = function(){
	if(Control.gameState != Control.gameState_inEditor){
		Control.terrainCursor.texture = Control.currentCommand.cursorTexture;
		
	}else if(Editor.brushMode.decalCursor == true){
		Control.terrainCursor.texture = Editor.brushMode.decalTexture;
	}
	
	if(Editor.brushMode == Editor.brushMode_Tile || Editor.brushMode == Editor.brushMode_Place){
		var cursorPos = [Control.mouseWorldPoint[0],Control.mouseWorldPoint[1],Control.mouseWorldPoint[2]] ;
	}else{
		var cursorPos = Control.getZMousePoint(0);
	}
	Control.terrainCursorPos[0] = cursorPos[0]; 
	Control.terrainCursorPos[1] = cursorPos[1];

	if(Editor.brushMode.constrained_to_tile == true){
		Control.terrainCursor.angle = 0;
		Control.terrainCursor.setPosAndSize([Math.floor(cursorPos[0]/8)*8+4, Math.floor(cursorPos[1]/8)*8+4], 8);
		
	}else if(Editor.brushMode.actorCursor == true){
		if(Editor.brushObject.snapToGrid == true || Editor.brushObject.isStructure == true){
			Control.terrainCursor.x = Math.floor(cursorPos[0])+0.5;
			Control.terrainCursor.y =  Math.floor(cursorPos[1])+0.5;
		}else{
			Control.terrainCursor.x = cursorPos[0];
			Control.terrainCursor.y = cursorPos[1]; 
		}
		if(Editor.brushObject.actor_constructor == Actor.FloatingActor){
			Control.terrainCursor.z = Environment.waterZ - Editor.brushObject.submergeZ;
		}else{
			//Control.terrainCursor.z = M.terrain.getHeightAt(cursorPos[0], cursorPos[1]);
			Control.terrainCursor.z = NavNode.get_floor_z(cursorPos[0], cursorPos[1], 10);
			if(Editor.followWallZ == true){
				Control.terrainCursor.z = Math.max(Control.terrainCursor.z, Pathfinder.getNodeAt_Robust(cursorPos[0], cursorPos[1]).wallZ)
			}
		}
		
	}else if(Editor.brushMode.decalCursor == true){
		Control.terrainCursor.angle = Editor.sculptBrushStrength * 6.283* -2;
		Control.terrainCursor.setPosAndSize(cursorPos, Math.ceil(Editor.brushSize));
	}
}

Editor.setActorCursor = function(){
	Control.terrainCursor = Editor.brushObject.actor_constructor(Editor.brushObject, null);
	Actors.push(Control.terrainCursor);
}

Editor.getNextDoodadVariation = function(a, offs){
	if(a.proto){
		if(a.proto.textureVariations){
			a.texture_variation+=offs+a.proto.textureVariations.length;
			a.texture_variation%= a.proto.textureVariations.length;
			a.proto.lastTextureVariation = a.texture_variation;
			a.texture = a.texture_default = 
				a.proto.textureVariations[a.texture_variation];
		}
		if(a.proto.modelVariations){
			a.model_variation+=offs+a.proto.modelVariations.length;
			a.model_variation%= a.proto.modelVariations.length;
			a.proto.lastModelVariation = a.model_variation;
			if(a.proto.modelVariations[0][0]){//animation variation
				a.animCollection = a.proto.modelVariations[a.model_variation];
				a.startAnimation(Anim.stand);
			}else{//model variation
				a.model = a.shadowModel = a.proto.modelVariations[a.model_variation];
			}
		}
	}
}

Editor.getNextCliffVariation = function(offs){
	var n = Pathfinder.getNodeAt_Robust(Control.mouseWorldPoint[0], Control.mouseWorldPoint[1]);
	if(n.actor != null ){
		if(n.actor.cliffSet){
			var modelVars = n.actor.cliffSet.models[n.actor.cliffModelType];
			n.actor.model_variation += offs + modelVars.length;
			n.actor.model_variation%= modelVars.length;
			n.actor.model = modelVars[n.actor.model_variation];
			n.actor.shadowModel = n.actor.model;
		}
	}
}

Editor.DeleteSelected= function(){
	EditorAction.Create(EditorAction.type_delete);
	Editor.DeleteObjects(Editor.selected);
}

Editor.DeleteObjects = function(arr){
	for(var i= arr.length-1;i>=0;i--){
		var o = arr[i];
		if(o.isRemoved == true){continue;}
		o.selected = false;
		o.preselected = false;
		if(o.editorDeleteAction){
			o.editorDeleteAction();
			if(o.isRemoved == true){continue;}
		}
		if(o.owner != undefined && o.owner != null){
			o.owner.Remove();
			if(o.owner.editorPlace != null){
				if(o.owner.tagId > -1){
					Trigger.Tags[o.owner.tagId].clear();
				}
				Editor.PlacedUnits.splice(Editor.PlacedUnits.indexOf(o.owner), 1);
			}
		}else{
			o.remove();
			if(o.linkedObject && o.linkedObject.remove){
				o.linkedObject.remove();
			}
		}
	}
	Editor.selected = [];
}

Editor.EmptySelection = function(){
	for(var i=Editor.selected.length-1;i>=0;i--){
		Editor.selected[i].selected = false;
		Editor.selected[i].texture = Editor.selected[i].texture_default;
	}
	Editor.selected = [];
}

Editor.SelectPreselectedObjects = function(){
	var additive = Control.pressed[17];
	var subtractive = !additive && Control.pressed[18];
	if(!additive && !subtractive){
		Editor.EmptySelection();
	}
	
	for(var i=Visible_Actors.length-1;i>=0;i--){
		var a =Visible_Actors[i];
		if(a.preselected == true){
			 
			if(a.owner != null && Editor.paletteId == 0 || a.owner == null && Editor.paletteId != 0){
				if(!subtractive && a.selected==false){
					a.selected = true;
					Editor.selected.push(a);
				}else if(subtractive && a.selected == true){
					Editor.RemoveObjectFromSelection(a);
				}
			}
			 
			a.preselected = false;
		}
	}
}
Editor.Selection_End = function(cancelled){
	if(Control.dragSelectionRect.enabled == true){
		Control.dragSelectionRect.disable();
		if(cancelled == false){
			Editor.SelectPreselectedObjects();
		}
	}else if(cancelled == false){
		Editor.SelectSingleObject();
	}
}

Editor.AddObjectToSelection = function(object){
	if(object.selected == false){
		object.selected = true;
		Editor.selected.push(object);
	}
}

Editor.RemoveObjectFromSelection = function(object){
	if(object.selected == true){
		object.selected = false;
		Editor.selected.splice(Editor.selected.indexOf(object), 1);
	}
}

Editor.RemoveTypeFromSelection = function(proto){
	for(var i=Editor.selected.length-1;i>=0;i--){
		if(Editor.selected[i].proto == proto){
			Editor.RemoveObjectFromSelection(Editor.selected[i]);
		}
	}
}
//deselect everything that is not of type {proto}
Editor.KeepTypeFromSelection = function(proto){
	for(var i=Editor.selected.length-1;i>=0;i--){
		if(Editor.selected[i].proto != proto){
			Editor.RemoveObjectFromSelection(Editor.selected[i]);			
		}
	}
}

Editor.SelectSingleObject = function(){
	var clipPoint = [GUI.pixelToClipX(Control.mouseX), GUI.pixelToClipY(Control.mouseY)];
	var clipPoint_min  = [clipPoint[0]  - 0.002, clipPoint[1] - 0.002];
	var clipPoint_max  = [clipPoint[0]  + 0.002, clipPoint[1] + 0.002];
	update_frustum_planes(Ray_Frustum, cam.inv_PV_Matrix, clipPoint_max, clipPoint_min, null);
	var selection_candidates = [];
	
	if(Control.pressed[18]){//alt+click removes item from selection
		for(var i=Editor.selected.length-1;i>=0;i--){
			var a = Editor.selected[i];		
			if(a.hitTest(Ray_Frustum) == true && a.selectable_editor == true){
				selection_candidates.push(a);
			}
		}
	}else{
		for(var i=Visible_Actors.length-1;i>=0;i--){
			var a = Visible_Actors[i];		
			if(a.hitTest(Ray_Frustum) == true && a.selectable_editor == true
			&& !a.selected){
				selection_candidates.push(a);
			}
		}
	}

	if(selection_candidates.length > 0){
		if(!Control.pressed[17] && !Control.pressed[18] && !Control.pressed[16]){
			//start a brand new selection
			Editor.EmptySelection();
		}
		var selectedObject = Utils.randomElem(selection_candidates);
		
		if(Control.pressed[18]){ //alt+click removes item
			Editor.RemoveObjectFromSelection(selectedObject);
		}else if(Control.pressed[16] && selectedObject.linkedObject){ //shortest path edge select, shift+click
			if(selectedObject.type == 1){
				BuilderModel.select_shortest_path(selectedObject);
			}
		}else{
			Editor.AddObjectToSelection(selectedObject);
		}
	}
}


Editor.update_selection_editor = function(a){
	if(a.selectable_editor == false || a.nodraw == true){
		return;
	}
	if(Control.dragSelectionRect.enabled == true){
		var corner1 = [a.x - a.bounding_box_width_hittest*0.5, a.y- a.bounding_box_width_hittest*0.5, a.z];
		var corner2 = [a.x + a.bounding_box_width_hittest*0.5, a.y+ a.bounding_box_width_hittest*0.5, a.z + a.bounding_box_height];
		if(Utils.frustum_Cull_AABB(corner1,corner2,Selection_Frustum) == true){
			a.preselected = true;
		}else{
			a.preselected = false;
		}
	}
}

Editor.check_selected_types = function(){
	for(var i=0; i<DoodadPrototype.Types.length; ++i){
		DoodadPrototype.Types[i].contained_in_selection = false;
	}
	for(var i=0;i<Editor.selected.length;++i){
		if(Editor.selected[i].proto && !Editor.selected[i].owner){
			Editor.selected[i].proto.contained_in_selection = true;
		}
	}
}

Editor.Set_Grid_Size = function(val){
	if(val > 0.8){
		this.snap_grid_size = 0.5;
		Asset.texture.grid = Asset.texture.grid_2x2;
	}else if(val > 0.4){
		this.snap_grid_size = 0.25;
		Asset.texture.grid = Asset.texture.grid_4x4;
	}else{
		this.snap_grid_size = 0.125;
		Asset.texture.grid = Asset.texture.grid_8x8;
	}
}

Editor.SnapSelected = function(){
	if(Editor.selected.length<=0){return;}
	var o = Editor.selected[0];
	if(o.owner == null){
		var oldX = o.x;
		var oldY = o.y;
		o.x = Math.floor((o.x +this.snap_grid_size/2)/this.snap_grid_size)*this.snap_grid_size;
		o.y = Math.floor((o.y +this.snap_grid_size/2)/this.snap_grid_size)*this.snap_grid_size;
		o.rotZ = Math.round(o.rotZ/1.5708*2)*1.5708/2;
		if(o.update_linked_object){
			o.update_linked_object();
		}
		var transX = o.x-oldX; var transY = o.y-oldY;
		for(var i=1;i<Editor.selected.length;++i){ //builderModel vertex update
			if(Editor.selected[i].linkedObject && Editor.selected[i].linkedModel && Editor.selected[i].type == 0){
				Editor.selected[i].x += transX;
				Editor.selected[i].y += transY;
				Editor.selected[i].update_linked_object();
			}
		}
	}
	
}

Editor.MoveSelection = function(){
	if (Editor.selected.length == 0){
		return;
	}
	var cx = Control.terrainCursorPos[0];
	var cy = Control.terrainCursorPos[1];
	var selectionCenter = new Point(0,0);
	for(var i=0;i<Editor.selected.length;++i){
		selectionCenter.x += Editor.selected[i].x;
		selectionCenter.y += Editor.selected[i].y;
	}
	selectionCenter.x/=Editor.selected.length;
	selectionCenter.y/=Editor.selected.length;
	transX = cx-selectionCenter.x;
	transY = cy-selectionCenter.y ;
	
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.owner == null){//move a doodad
			if(o.isAttachment != true){
				if(o.baseActor && o.baseActor.isShip){ //move doodad on ship
					var localPos = NavNode.globalToLocal(o.baseActor, o.x+transX, o.y+transY);
					var attachId = o.baseActor.attachments.indexOf(o);
					o.baseActor.pointsArray[attachId].x = localPos.x;
					o.baseActor.pointsArray[attachId].y = localPos.y;
				}else{
					Editor.setDoodadPosition(o, o.x+transX, o.y+transY);
				}
			}
		}else{//move a unit
			var u = o.owner;
			Unit.setPosInstant(u, u.x + transX, u.y+transY, u.z);
			if(u.editorPlace != null){ //unit is not spawned, but placed in editor
				u.editorPlace.x = u.x;
				u.editorPlace.y = u.y;
				u.editorPlace.z = u.z;
			}
		}
	}
}

Editor.RotateSelection = function(){
	if(Control.terrainCursor.rotZ){//rotate the terrain cursor
		if(Control.pressed[17]){
			Control.terrainCursor.rotZ -= 0.05;
		}else{
			Control.terrainCursor.rotZ += 0.05;
		}
	}
	
	if (Editor.selected.length == 0){
		return;
	}
	
	var cx = Control.terrainCursorPos[0];
	var cy = Control.terrainCursorPos[1];
	var pivot = Utils.lastElem(Editor.selected);
	
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
			
		var newAngle = Math.atan2(o.x-cx, o.y-cy);	
		if(o.owner != null){
			var u = o.owner;
			if(u.isShip){
				u.rotZ = newAngle;
			}else{
				Unit.setFacingInstant(u,newAngle+3.1415);
				if(u.editorPlace != null){ //unit is not spawned, but placed in editor
					u.editorAngle = u.angle;
				}
			}
		}else{
			if(o.isAttachment == true){
				
			}else{
				if(o.baseActor && o.baseActor.isShip){
					var attachId = o.baseActor.attachments.indexOf(o);
					o.baseActor.pointsArray[attachId].rotZ = newAngle - o.baseActor.rotZ;
				}else{
					
					if(Editor.selected.length > 1 && !Control.pressed[17] || Control.pressed[18]){//rotate relative to pivot
						var rpy_backup = this.RPY;
						this.RPY = true; //force RPY rotation on
						var angleDelta = Math.atan2(pivot.x-cx, pivot.y-cy) - Editor.GetRot(pivot, 2);

						if(!Control.pressed[18]){ //rotate around pivot
							var offX = o.x-pivot.x;
							var offY = o.y-pivot.y;
							var sn = Math.sin(-angleDelta); var cs = Math.cos(-angleDelta);
							Editor.setDoodadPosition(o, pivot.x + cs*offX - sn*offY, pivot.y + sn*offX + cs*offY);
						}
						Editor.SetRot(o, Editor.GetRot(o, 2) + angleDelta, 2);
						this.RPY = rpy_backup;
					}else{//rotate individually to face cursor
						if(Control.pressed[16]){//hold shift to snap
							Editor.SetRot(o, Math.floor(o.rotZ/1.5708*2)*1.5708/2 , 2);
						}else{
							Editor.SetRot(o, newAngle, 2);
						}
					}
					if(o.editor_only == true){
						o.update_linked_object();
					}
					
				}
			}
		}
	}
}

Editor.setDoodadPosition = function(o,x,y){
	o.x = x; o.y = y;
	if(o.editor_only == true){
		o.update_linked_object();
	}else if(o.proto && o.proto.snapToGrid == true){
		o.x = Math.floor(o.x) + 0.5;
		o.y = Math.floor(o.y) + 0.5;
	}
	if(o.partitioned == true){
		Actor.updateDoodadPartition(o);
	}
	if(o.decal && o.decal.partitioned){
		Actor.updateDoodadPartition(o.decal);
	}
	o.x_last = o.x;
	o.y_last = o.y;
}

//axes are: 0-X 1-Y 2-Z
Editor.SetRotSelection = function(newRot, axis){
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.owner == null){
			Editor.SetRot(o, newRot, axis)
		}
	}
}

Editor.SetRot = function(o,newRot,axis){
	if(this.RPY == true){
		var rotZYX = Utils.euler_xyz_to_zxy(o.rotX,o.rotY,o.rotZ);
		rotZYX[axis] = newRot;
		var rot = Utils.euler_zxy_to_xyz(rotZYX[0],rotZYX[1],rotZYX[2]);
		o.rotX = rot[0];
		o.rotY = rot[1];
		o.rotZ = rot[2];
	}else{
		if(axis == 0){
			o.rotX = newRot;
		}else if(axis == 1){
			o.rotY = newRot;
		}else{
			o.rotZ = newRot;
		}
	}
	if(o.editor_only == true){
		o.update_linked_object();
	}
	o.rotZ_last = o.rotZ;
	o.rotX_last = o.rotX;
	o.rotY_last = o.rotY;
}

Editor.GetRot = function(o, axis){
	if(this.RPY == true){
		var rot = Utils.euler_xyz_to_zxy(o.rotX,o.rotY,o.rotZ);
		return rot[axis];
	}
	
	if(axis == 0){
		return o.rotX;
	}else if(axis == 1){
		return o.rotY;
	}else{
		return o.rotZ;
	}
}

//valType 0 : set wanderChance of selected units
//valType 1 : set wanderRadius of selected units
Editor.SetWanderParamSelection = function(val, valType){
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.owner != null){
			if(valType == 0){
				o.owner.wanderChance = val;
			}else{
				o.owner.wanderRadius = val;
			}
		}
	}
}
	
Editor.SetScaleSelection = function(newScale){
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.owner == null){
			o.scale = newScale;
			if(o.editor_only == true){
				if(o.update_linked_scale){
					o.update_linked_scale();
				}else{
					o.update_linked_object();
				}
			}
		}
	}
}

Editor.SetZSelection = function(newZ){
	var firstZ = 0;
	var gotFirstZ = false;
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.owner == null || o.isShipActor){
			if(gotFirstZ == false){
				gotFirstZ = true;
				firstZ = o.z;
			}
			o.z = newZ + o.z-firstZ;
			o.z_last = o.z;
		}else{//unit
			o.owner.z = newZ;
			if(o.owner.editorPlace){//hand-placed unit
				o.owner.editorPlace.z = newZ;
			}
		}
		if( o.update_linked_height){
			o.update_linked_height();
		}
	}
}

Editor.SetZ_scroll = function(delta){
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.owner == null && o.isAttachment != true){
			o.z += delta * 0.1;
			o.z_last = o.z;
			if( o.update_linked_height){
				o.update_linked_height();
			}
		}else if(o.owner.editorPlace){
			o.z += delta*0.1;
			o.owner.editorPlace.z = o.z
		}
	}
}


Editor.ResetHeightSelection = function(){
	if (Editor.selected.length == 0){
		return;
	}
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.owner == null){
			//o.z = M.terrain.getHeightAt(o.x,o.y);
			o.z = NavNode.get_floor_z(o.x,o.y,o.z+0.01);
			o.z_last = o.z;
		}
	}
}

Editor.spawnHelperActors = function(){
	for(var i=Actors.length-1;i>=0;--i){
		var o = Actors[i];
		if(o.editor_only != true && o.hasHelperActor == true){
			Actors.push(Actor.EditorActor(o));
		}
		if(o.spline != undefined){ //generate the spline handler points
 			for(var j=0;j<o.spline.length;++j){
				var a = Actor.EditorSplinePoint(o.spline[j], o);
				Actors.push(a);
			}
		}
	}
	if(BuilderModel.ACTIVE){
		BuilderModel.spawnHelpers(BuilderModel.ACTIVE);
	}
	
	for(var i=Doodads.length-1;i>=0;--i){
		for(var j=Doodads[i].length-1;j>=0;--j){
			for(var k=0;k<Doodads[i][j].length;++k){
				var o = Doodads[i][j][k];
				if(o.editor_only != true && o.hasHelperActor == true){
					Actors.push(Actor.EditorActor(o));
				}
			}
		}
	}
}

Editor.removeHelperActors = function(){
	for(var i=Actors.length-1;i>=0;--i){
		if(Actors[i].editor_only == true){
			Actors[i].remove();
		}
	}
}

Editor.refreshHelperActors = function(){
	Editor.removeHelperActors();
	Editor.spawnHelperActors();
}

Editor.cloneSelected = function(){
	for(var i=0;i<this.selected.length;++i){
		var ss = this.selected[i];
		if(ss.owner == null && ss.getCopy != undefined){
			var clone = ss.getCopy();
			Actor.addToWorld(clone);
			ss.x += 0.25;
			ss.y += 0.25;
			if(clone.getInfoText != undefined){GUI.AddInfoText(clone)};
			
			if(clone.editor_only != true && clone.hasHelperActor == true){
				Actors.push(Actor.EditorActor(clone));
			}
		}
		if(ss.copySpecial){
			ss.copySpecial();
		}
	}
}

Editor.getSelectedShortcut = function(){
	if(Editor.selected.length <= 0){return null;}
	var ss = Editor.selected[0]; 
	if(ss.owner != null && ss.owner != undefined){
		ss = ss.owner;
	}
	return ss;
}

Editor.reset_draw_stroke = function(){
	this.Draw_Points.length = 0;
}
Editor.place_draw_point = function(x,y){
	if(BuilderModel.ACTIVE){
		if(Editor.drawType == Editor.drawType_points){
			var nearPoint = BuilderModel.ACTIVE.getNearHelper(x,y, Editor.snap_draw_size);
			if(nearPoint){
				nearPoint.texture = Asset.texture.fireball;
				this.Draw_Points.push(nearPoint);
			}else{
				var newPoint = BuilderModel.ACTIVE.addPoint(x,y);
				BuilderModel.ACTIVE_ACTOR.global_to_local_2d(newPoint);
				BuilderModel.ACTIVE.addPointHelper(newPoint);
				this.Draw_Points.push(newPoint.helper);
			}
		}else if(Editor.drawType == Editor.drawType_cut){
			var nearPoint = BuilderModel.ACTIVE.getNearHelper(x,y, Editor.snap_draw_size);
			if(nearPoint){
				nearPoint.texture = Asset.texture.fireball;
				this.Draw_Points.push(nearPoint);
			}else{
				var a = Actor.Cut_Draw_Point(x,y);
				this.Draw_Points.push(a);
				Actors.push(a);
			}
		}else if(Editor.drawType == Editor.drawType_hole){
			var a = Actor.Cut_Draw_Point(x,y);
			this.Draw_Points.push(a);
			Actors.push(a);
		}
	}
}
Editor.finish_drawing_stroke = function(){
	if(BuilderModel.ACTIVE){
		if(Editor.drawType == Editor.drawType_points){
			for(var i=0 ;i<this.Draw_Points.length-1;++i){
				if(BuilderPoint.not_on_same_line(this.Draw_Points[i].linkedObject, this.Draw_Points[i+1].linkedObject)){
					//don't allow connection to itself or its neighbor
					//console.log(this.Draw_Points[i].linkedObject, this.Draw_Points[i+1].linkedObject);
					var ld = BuilderModel.ACTIVE.addLinedef(this.Draw_Points[i].linkedObject, this.Draw_Points[i+1].linkedObject );
					if(ld){
						BuilderModel.ACTIVE.addEdgeHelper(ld);
					}
				}
			}
		}else if(Editor.drawType == Editor.drawType_cut){
			BuilderModel.cut_shape_global(Editor.Draw_Points);
			for(var i=this.Draw_Points.length-1;i>=0;--i){
				if(!this.Draw_Points[i].linkedObject){
					this.Draw_Points[i].remove();
				}
			}
		}else if(Editor.drawType == Editor.drawType_hole){
			BuilderModel.make_hole_global(Editor.Draw_Points);
			for(var i=this.Draw_Points.length-1;i>=0;--i){
				if(!this.Draw_Points[i].linkedObject){
					this.Draw_Points[i].remove();
				}
			}
		}
	}
	this.reset_draw_stroke();
}

/*Editor.toggle_mesh_edit_mode = function(){
	if(Editor.mesh_edit_mode){
		Editor.mesh_edit_mode = false;
		Editor.removeFaceHelperActors();
	}else{
		Editor.mesh_edit_mode = true;
		var helperPos = new Float32Array(3);
		for(var k = 0;k<NavNode.Colliders.length;++k){
			var coll = NavNode.Colliders[k];
			var m = coll.model;
			for(var i=0;i < m.NavTriangles.length;++i){
				var tri = m.NavTriangles[i];
				var a = Actor.EditorFacePoint(coll, tri);
				NavNode.localToGlobal_3d(helperPos, coll, tri.center);
				a.x = helperPos[0];
				a.y = helperPos[1];
				a.z = helperPos[2];
				
				Actors.push(a);
			}
		}
	}
}

Editor.removeFaceHelperActors = function(){
	for(var i=Actors.length-1;i>=0;--i){
		if(Actors[i].linkedTriangle){
			Actors[i].remove();
		}
	}
}

Editor.SetLight_Selection = function(scale, strobe_strength){
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.linkedTriangle){
			if(!strobe_strength){
				o.linkedTriangle.color[0] = Math.max(0,Math.min(255, 16 * Math.round( 16*scale)));
			}else{
				scale = Math.max(0, Math.min(0.99, scale*1.2-0.1));//remap so that it's easier to set it to 0 or 1
				o.linkedTriangle.color[1] = Math.floor(o.linkedTriangle.color[1]) + scale;
			}
			o.update_linked_object();
		}
	}
}
Editor.SetStrobeStrength_Selection = function(scale){
	Editor.SetLight_Selection(scale, true);
}
//each element is the beginning offset of a new strobe category
//0-1: 1/8 strobe
//2-5: 1/4 strobe ... and so on
Editor.strobe_type_offsets = [0,2,5,13,29,45,53,61,69,70,86];
Editor.SetStrobeType_Selection = function(type, offset){
	var strobeType = (Editor.strobe_type_offsets[type] || 0) + (offset || 0);
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.linkedTriangle){
			o.linkedTriangle.color[1] = strobeType + (o.linkedTriangle.color[1] % 1);
			o.update_linked_object();
		}
	}
}
Editor.SetTextureSpeed_Selection = function(scaleX, scaleY){
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.linkedTriangle){
			o.linkedTriangle.color[2] = Math.floor((scaleX-0.5)*256)*2;
			o.linkedTriangle.color[2] += (scaleY-0.5)*2;
			o.update_linked_object();
		}
	}
}

Editor.copied_triangle_color = [128,0,0];
Editor.copy_triangle_color = function( ){
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.linkedTriangle){
			Editor.copied_triangle_color[0]=o.linkedTriangle.color[0];
			Editor.copied_triangle_color[1]=o.linkedTriangle.color[1];
			Editor.copied_triangle_color[2]=o.linkedTriangle.color[2];
			return;
		}
	}
}
Editor.paste_triangle_color = function( ){
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.linkedTriangle){
			o.linkedTriangle.color[0]=Editor.copied_triangle_color[0];
			o.linkedTriangle.color[1]=Editor.copied_triangle_color[1];
			o.linkedTriangle.color[2]=Editor.copied_triangle_color[2];
			o.update_linked_object();
		}
	}
}*/