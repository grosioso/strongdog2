var Control = new Object();
Control.scroll_speed = 0.5;
Control.scroll_speed_arrows = 0.95;
Control.scroll_speed_mouse = 0.5;
Control.alwaysMouseScroll = false;
Control.pointerLock = true;
Control.pointer_locked = false;
Control.pointer_locked_elem = document.getElementById("locked-cursor");
Control.change_spread_persistent = true;
Control.showEnemyLifebars = false;
Control.cam_rot_speed = 0.03;
Control.cam_tilt_speed_factor = 0.5;
Control.doubleClickCountdown = 0;
Control.doubleClickTimeframe_max = 16;
Control.doubleClickTimeframe_min = 2;

Control.pressed = [];
for(var i=0;i<200;++i){
	Control.pressed[i] = false;
}

Control.preventKeys = [27, 32,37,38,39,40,65,87,82,83,84,68,81,69,70,80,76,73];
Control.leftMousePressed = false;
Control.leftMousePressed_GUI = false;
Control.leftClickCancelled = false;
Control.rightMousePressed = false;
Control.rightMousePressed_GUI = false;
Control.rightClickCancelled = false;
Control.invertMouseY = false;

Control.currentCommand = null;
Control.highlitUnit = null;
Control.shipUnderTarget = null;
Control.selectionAbilities = [];
Control.ControlGroups = [];
Control.lastControlGroup = 0;
Control.controlGroupFocusCooldown = 0;
Control.selectionLeader = null;

Control.minimapDrag = false;
Control.canvasRect = canvas.getBoundingClientRect();
Control.mouseX = 0;
Control.mouseY = 0;
Control.dragSelectionRect = null;
Control.Formation = null;
Control.decalCursor = null;

function KeyBinding(name, _val1, _val2 ){
	this.name = name;
	this.value1 = _val1;
	if(_val2 === void 0){
		_val2 = 0;
	}
	this.value2 = _val2;
	KeyBinding.list.push(this);
}
KeyBinding.prototype.pressed = function(){
	return Control.pressed[this.value1] || Control.pressed[this.value2];
}
KeyBinding.prototype.isKeycode = function(code){
	return this.value1 == code || this.value2 == code;
}
KeyBinding.getArray = function(){
	var arr = [];
	for(var i=0;i<KeyBinding.list.length;++i){
		arr[i]=KeyBinding.list[i].value1;
	}
	return arr;
}
KeyBinding.loadArray = function(arr){
	for(var i=0;i<arr.length;++i){
		var kb = KeyBinding.list[i];
		if(!kb){break;}
		kb.value1 = arr[i];
	}
}
KeyBinding.list = [];

Control.key_primary = new KeyBinding("Primary Attack",1);
Control.key_secondary = new KeyBinding("Secondary Attack",3);
Control.key_forward = new KeyBinding("Move North",87, 38);
Control.key_backward = new KeyBinding("Move South",83,40);
Control.key_left = new KeyBinding("Move West", 65,37);
Control.key_right = new KeyBinding("Move East", 68,39);
Control.key_melee = new KeyBinding("Melee", 84);
Control.key_lifebars = new KeyBinding("Show/Hide lifebars",76);
Control.key_use = new KeyBinding("Use",69);
Control.key_spell = new KeyBinding("Spell",32);
Control.key_sprint = new KeyBinding("Run",81);
Control.key_inventory = new KeyBinding("Inventory",73);
Control.key_sneak = new KeyBinding("Slow Walk", 16);
//Control.key_addSelection = new KeyBinding("Add Selection", 16);
Control.key_controlGroup = new KeyBinding("Set Control Group", 17);
Control.key_eyes = new KeyBinding("Close Eyes", 999);

Control.getKeyName = function(key){
	var keyId = key.value1;
	if(keyId >= 65 && keyId < 96){
		return String.fromCharCode(keyId);
	}else if(keyId == 32){
		return "SPACEBAR";
	}else if(keyId == 1){
		return "Left Mouse";
	}else if(keyId == 3){
		return "Right Mouse";
	}else if(keyId == 8){
		return "BACKSPACE";
	}else if(keyId == 9){
		return "TAB";
	}else if(keyId == 13){
		return "ENTER";
	}else if(keyId == 16){
		return "SHIFT";
	}else if(keyId == 17){
		return "CTRL";
	}else if(keyId == 18){
		return "ALT";
	}else if(keyId == 20){
		return "CAPS";
	}else if(keyId == 27){
		return "ESC";
	}else if(keyId == 36){
		return "HOME";
	}else if(keyId == 46){
		return "DELETE";
	}
	return "KEY";
}

Control.lastPressX = 0;
Control.lastPressY = 0;
Control.terrainCursor = null;
Control.terrainCursorPos = [0,0];


Control.dragStartPoint_World = [0,0,0];
Control.clickStartPoint_Terrain = [0,0,0];
Control.unitFormationSpread_default = 0.7;
Control.unitFormationSpread = Control.unitFormationSpread_default;
Control.currentPlayer = null;

Control.gameState_inGame = 0;
Control.gameState_inEditor = 1;
Control.gameState = Control.gameState_inGame;

Control.gamePaused = false;
Control.gameLocked = false; //nothing will happen, not even draw
//if true, unit spread parameter will be remembered from the last issued order
//if false, unit spread parameter will be reset to set value at the start of every formation-drawing


Control.mouseShootingPoint = [0,0,0];
Control.mouseWorldPoint = [0,0,0];


Control.Init = function(){
	Control.currentCommand = Command.Idle();
	Control.dragSelectionRect = new DragSelectionRect();
	Control.Formation = new DragWorldRect();
	Control.chunkActor = WorldRectActor.BuildingChunk(null);
	WorldGUI=[];
	WorldGUI.push(Control.chunkActor);
	Control.ControlGroups = [];
	Control.currentPlayer = Players[0];
	if(EDITORMODE){
		Control.setGameState( Control.gameState_inEditor);
	}else{
		Control.setGameState( Control.gameState_inGame);
	}
	Control.gamePaused = false;
	Control.minimapDrag = false;
}

Control.update_gameloop = function(){
	Control.UpdateHighlitUnit();
	if(Control.doubleClickCountdown > 0){Control.doubleClickCountdown--;}
	if(Control.controlGroupFocusCooldown > 0){Control.controlGroupFocusCooldown--;}
	Control.currentCommand.loop();
	Control.CheckPressed();
	//check for dead control group members
	for(var i=0;i<Control.ControlGroups.length;++i){
		if(Control.ControlGroups[i] && Control.ControlGroups[i].length){
			if(Control.ControlGroups[i][0].alive == false){
				Control.ControlGroups[i].splice(0,1);
			}
		}
	}
	if(this.selectionLeader && this.selectionLeader.selected && this.selectionLeader.owner == this.currentPlayer
	&& this.selectionLeader.proto.showHeatWhenSelected){
		Control.chunkActor.building = this.selectionLeader.actor;
	}else if(!Control.currentCommand.buildingCursor || Control.chunkActor.building&&Control.chunkActor.building.owner){
		Control.chunkActor.building = null;
	}
}

Control.world_move_update = function(offX, offY){
	if(Control.Formation != null){
		Control.Formation.x -= offX;
		Control.Formation.y -= offY;
	}
	Control.dragStartPoint_World[0] -= offX;
	Control.dragStartPoint_World[1] -= offY;
	Control.clickStartPoint_Terrain[0] -= offX;
	Control.clickStartPoint_Terrain[1] -= offY;
	Control.moveCamera(-offX, -offY);
}

Control.setCameraPos = function(_x,_y){
	var pos_backup = [cam.pos_ref[0], cam.pos_ref[1], cam.pos_ref[2]];
	cam.pos_ref[1] = Math.min( cam.bound_top ,Math.max(cam.bound_bottom,_y));
	cam.pos_ref[0] = Math.min( cam.bound_right ,Math.max(cam.bound_left,_x ));
	cam.pos[1] += cam.pos_ref[1] - pos_backup[1];
	cam.pos[0] += cam.pos_ref[0] - pos_backup[0];
}
Control.moveCamera = function(offx,offy){
	Control.setCameraPos(cam.pos_ref[0] +offx,  cam.pos_ref[1] +offy);
}

Control.Set_Pause_Game = function(state){
	if(M.isMenu){
		return;
	}
	
	if(!Net.online){
		Control.gamePaused = state;
	}else{
		Control.gamePaused = false;
	}
	
	if(state==true){
		GUI.set_gui_menu();
		Music.MultiplyCurrentVolume(1);
		if(SoundObject.currentVoice){
			SoundObject.currentVoice.pause();
		}
	}else{
		GUI.remove_menu_tabs();
		Control.setGameState(Control.gameState);
		if(SoundObject.currentVoice && SoundObject.currentVoice.seek()>0){
			SoundObject.currentVoice.play();
		}
	}
}

Control.LockGame = function(){
	Control.gameLocked = true;
}
Control.UnlockGame = function(){
	Control.gameLocked = false;
}

Control.setGameState = function( state){
	//if(state == Control.gameState){return;}
	if(state == Control.gameState_inEditor){
		Actor.remove_if_added(Control.terrainCursor);
		GUI.set_gui_editor();
		Control.terrainCursor = Control.decalCursor;
		Actors.push(Control.terrainCursor );
		Editor.spawnHelperActors();
		Control.changeCurrentPlayer(0);
		Control.SetCommand(Command.Idle_Editor);
		Render.drawEditorHelpers = true;
		Render.drawBoundingBoxes = true;
		Gamestats.GuardEnabled = false;
		cam.setBoundsToMapSize();
		cam.shearPitch = false;
	}else if(state == Control.gameState_inGame){
		GUI.Elements = GUI.InGame;
		Editor.EmptySelection();
		
		EditorAction.Init();
		Editor.removeHelperActors();
		Actor.remove_if_added(Control.terrainCursor);
		if(M.isMenu){
			Control.changeCurrentPlayer(0);
		}else{
			Control.changeCurrentPlayer(Player.defaultHumanPlayer);
			if(Gamestats.Hero){
				Control.AddUnitToSelection(Gamestats.Hero);
			}
		}
		//Render.drawTerrainGrid = false;
		Render.drawEditorHelpers = false;
		Render.drawBoundingBoxes = false;
		Render.wireframeActors = false;
		Gamestats.GuardEnabled = true;
		Control.SetCommand(Command.Idle);
		cam.setBounds();
		cam.shearPitch = true;
	}
	
	Control.gameState = state;
}

Control.SetCommand = function(command_constructor){
	if(Control.currentCommand.buildingCursor){
		Actor.remove_if_added(Control.terrainCursor);
	}
	Control.currentCommand = command_constructor();
	Control.currentCommand.setCursorId(1);
	if(Control.currentCommand.dragScreen == false){
		Control.dragSelectionRect.disable();
	}
	if(Control.currentCommand.dragWorld == false){
		Control.Formation.disable();
	}
}
Control.SetCommandWithAbility = function(command_constructor, ability){
	Control.SetCommand(command_constructor);
	Control.currentCommand.ability = ability;

	if(Control.currentCommand.buildingCursor){
		var type = UnitPrototype[ability.trainingType];
		Control.terrainCursor = Actor.StructureActor(type, null);
		Control.terrainCursor.shaderProgram = ShaderProgram.waveShader;
		Control.terrainCursor.hasShadow = false;
		Actors.push(Control.terrainCursor);
		WorldRectActor.AddBuildingGrid(Control.terrainCursor,type);
		if(type.structureHeat != 0){
			Control.chunkActor.building = Control.terrainCursor;
		}
	}
}

Control.DragSelection_Handle = function(){
	if(Control.currentCommand.dragScreen == false){return;}
	if(Math.abs(this.mouseX - this.lastPressX)>15 || Math.abs(this.mouseY - this.lastPressY)> 15){
		if(this.dragSelectionRect.enabled == false){
			Control.dragSelectionRect.enable(this.lastPressX, this.lastPressY);
		}
		
	}
	if(this.dragSelectionRect.enabled == true){
		this.dragSelectionRect.update();
	}
}

Control.DragFormation_Handle = function(){
	if(Control.currentCommand.dragWorld == false){return;}
	if(Selected.length <= 1){
		return;
	}
	if(this.Formation.enabled == false){
		Control.Formation.enable(Control.clickStartPoint_Terrain[0], Control.clickStartPoint_Terrain[1],Control.clickStartPoint_Terrain[2]);
	}
	Control.Formation.update();
}

Control.PlayerHasControlOverSelection = function(){
	if(Selected.length > 0 && Selected[0].owner == Control.currentPlayer){
		return true;
	}else{
		return false;
	}
}
Control.AllySelected = function(){
	if(Selected.length > 0 && Selected[0].owner.team == Control.currentPlayer.team){
		return true;
	}else{
		return false;
	}
}


Control.Selection_End = function(cancelled){
	if(Control.dragSelectionRect.enabled == true){
		Control.dragSelectionRect.disable();
		if(cancelled == false){
			Control.SelectPreselectedUnits();
			if(this.selectionLeader){
				Unit.quote_selected(this.selectionLeader);
			}
		}
	}else if(cancelled == false){
		Control.SelectSingleUnit();
		if(this.selectionLeader && this.selectionLeader.owner == Control.currentPlayer){
			Unit.quote_selected(this.selectionLeader);
		}
	}
}

Control.SelectPreselectedUnits = function(){
	if(!Control.key_addSelection.pressed()){
		Control.EmptySelection();
	}
	var structure_candidates = [];
	for(var i=Units.length-1;i>=0;i--){
		var u = Units[i];
		if(u.actor.preselected == true && u.selected == false){
			if(u.owner == Control.currentPlayer){
				if(u.isStructure){
					structure_candidates.push(u);
				}else{
					Control.AddUnitToSelection(u);
				}	
			}
			u.actor.preselected = false;
		}
	}
	
	//only drag-select structures if no non-structures were selected
	if(Selected.length == 0 || Selected[0].isStructure){
		for(var i=0;i<structure_candidates.length;++i){
			Control.AddUnitToSelection(structure_candidates[i]);
		}
	}
}

Control.EmptySelection = function(){
	for(var i=Selected.length-1;i>=0;i--){
		Selected[i].selected = false;
	}
	Selected = [];
	Control.selectionAbilities = [];
	Control.selectionLeader = null;
	//GUI.AbilityPanel.setButtonOffset(0);
}

Control.MakeControlGroup = function(id){
	if(!Control.PlayerHasControlOverSelection()||id<0||id>9){
		return;
	}
	Control.ControlGroups[id] = [];
	for(var i=0;i<Selected.length;++i){
		if(Selected[i].alive){
			Control.ControlGroups[id].push(Selected[i]);
		}
	}
}

Control.AddToControlGroup = function(id){
	if(!Control.PlayerHasControlOverSelection()||id<0||id>9){
		return;
	}
	for(var i=0;i<Selected.length;++i){
		if(Selected[i].alive && Control.ControlGroups[id].indexOf(Selected[i])<0 ){
			Control.ControlGroups[id].push(Selected[i]);
		}
	}
}

Control.SelectControlGroup = function(id){
	if(id<0||id>9){
		return;
	}
	var cg = Control.ControlGroups[id];
	if(!cg || cg.length == 0){return;}
	Control.EmptySelection();
	for(var i=0;i<cg.length;++i){
		if(cg[i].alive && cg[i].owner == Control.currentPlayer){
			Control.AddUnitToSelection(cg[i]);
		}
	}
	if(Control.lastControlGroup == id && Control.controlGroupFocusCooldown > 0){
		Control.goToSelected();
	}
	Control.lastControlGroup = id;
	Control.controlGroupFocusCooldown = 60;
	//we filtered out obsolete units into Selected, 
	//now we paste back the filtered array into the CG
	cg = Selected.slice();
	if(Selected[0]){
		Unit.quote_selected(Selected[0]);
	}
}

Control.MakeOrSelectControlGroup = function(id){
	if(Control.key_addSelection.pressed()){
		if(Control.ControlGroups[id] && Control.ControlGroups[id].length > 0){
			Control.AddToControlGroup(id);
		}else{
			Control.MakeControlGroup(id);
		}
	}else if(Control.key_controlGroup.pressed()){
		Control.MakeControlGroup(id);
	}else{
		Control.SelectControlGroup(id);
	}
}


Control.SelectTerrainTile = function(){
	var p = rayCastScreen(Control.mouseX, Control.mouseY, 0);
	var tile = M.terrain.getTileAt(p[0], p[1]);
	console.log(tile.x,tile.y);
}

Control.GetUnitUnderCursor = function(filter, breakOnFirst){
	var clipPoint = [GUI.pixelToClipX(this.mouseX), GUI.pixelToClipY(this.mouseY)];
	var clipPoint_min  = [clipPoint[0]  - 0.002, clipPoint[1] - 0.002];
	var clipPoint_max  = [clipPoint[0]  + 0.002, clipPoint[1] + 0.002];
	update_frustum_planes(Ray_Frustum, cam.inv_PV_Matrix, clipPoint_max, clipPoint_min,null);
	
	var selection_candidates = [];
	for(var i=Visible_Actors.length-1;i>=0;i--){
		var a = Visible_Actors[i];
		if(a.owner == null || filter(a.owner) == false){
			continue;
		}
		if(a.hitTest(Ray_Frustum) == true){
			selection_candidates.push(a.owner);
			if(breakOnFirst == true){ //we won't get a random unit form under the cursor, but always the same one
				break;
			}
		}
	}
	
	var selectedUnit = null;
	if(selection_candidates.length > 0){
		//selectedUnit = Utils.randomElem(selection_candidates); MAKES WHOLE GAME NON-DETERMINISTIC
		selectedUnit = Utils.randomElem_clientSide(selection_candidates);
	}
	return selectedUnit;
}

Control.SelectSingleUnit = function(){
	var sel = Control.GetUnitUnderCursor(Unit.isHighlightable, false);
	if(sel != null){
		if(!Control.key_addSelection.pressed()){
			Control.EmptySelection();
		}
		Control.AddUnitToSelection(sel);
	}
}

Control.SelectNextUnitType = function(){
	if(!Control.selectionLeader || !Control.PlayerHasControlOverSelection()){return;}
	var types = [];//list of unique unit types in selection
	for(var i=0;i<Selected.length;++i){
		if(i>0){
			if(Selected[i-1].proto!=Selected[i].proto && types.indexOf(Selected[i].proto)<0){
				types.push(Selected[i].proto);
			}
		}else{
			types.push(Selected[i].proto);
		}
	}
	if(types.length<2){return;}
	
	var currentId = types.indexOf(Control.selectionLeader.proto);
	currentId = (currentId+1)%types.length //cycle to front if unit type is last in selection
	var nextType = types[currentId];
	
	for(var i=0;i<Selected.length;++i){
		if(Selected[i].proto == nextType){
			Control.selectionLeader = Selected[i];
			Unit.quote_selected(Control.selectionLeader);
			return;
		}
	}
}

Control.SelectExplicitUnit = function(u){
	Control.EmptySelection();
	Control.AddUnitToSelection(u);
	Unit.quote_selected(u);
}

Control.UpdateHighlitUnit = function(){
	Control.highlitUnit = Control.GetUnitUnderCursor(Unit.isHighlightable, true);
}

Control.AddUnitToSelection = function(unit){
	if(unit.selected == false && unit.alive == true){
		unit.selected = true;
		Selected.push(unit);
		if(Selected.length == 1 ||
		(Selected.length>1 && Selected[Selected.length-2].proto != unit.proto)){
			Control.AddSelectedUnitAbilities(unit);
		}	
		if(Control.selectionLeader){
			if(Control.selectionLeader.proto.selectionPriority < unit.proto.selectionPriority){
				Control.selectionLeader = unit;
			}
		}else{
			Control.selectionLeader = unit;
		}
	}
}
Control.AddSelectedUnitAbilities = function(unit){
	var abs = unit.Abilities;
	for(var i=0;i<abs.length;++i){
		var same = false;
		for(var j=0;j<Control.selectionAbilities.length;++j){
			if(Control.selectionAbilities[j].proto == abs[i].proto){
				same = true; break;
			}
		}
		if(same == false){
			Control.selectionAbilities.push(abs[i]);
		}
	}
}

Control.RemoveUnitFromSelection = function(unit){
	if(unit.selected == true){
		unit.selected = false;
		Selected.splice(Selected.indexOf(unit), 1);
		if(unit == Control.selectionLeader){
			if(Selected[0]){
				Control.selectionLeader = Selected[0];
			}else{
				Control.selectionLeader = null;
			}
		}
	}
}

Control.goToSelected = function(){
}

//param is AbilityInstance
Control.AbilityButtonClicked = function(abilityInstance){
}

Control.CancelAbility = function(){
}

//param is Ability, not instance
Control.SetAbilityTarget = function(targetUnit, ability, unitArr){
	//if(Control.PlayerHasControlOverSelection() == false){
		//return;
	//}
	unitArr = unitArr || Selected;
	if(targetUnit){
		if(!ability.targetCondition(targetUnit)){
			targetUnit = null;
			GUI.Alert("Invalid Target");
		}
	}
	if(targetUnit){
		Ability.lastTargetObject = targetUnit;
	}else{
		Ability.lastTargetObject = new Point(Control.clickStartPoint_Terrain[0],Control.clickStartPoint_Terrain[1]);
	}
	
	if(ability.targetDummy == true && !targetUnit){
		Ability.lastTargetObject = new AbilityTargetDummyUnit(Control.clickStartPoint_Terrain[0],Control.clickStartPoint_Terrain[1]);
	}

	for(var i=unitArr.length-1;i>=0;--i){
		sel_ab = Unit.getAbilityInstance(unitArr[i], ability);
		if(sel_ab != null){
			sel_ab.endCall(Ability.lastTargetObject);
		}
	}
}

function DragWorldRect(){
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.w = 10;
	this.h = 5;
	
	this.actor = new WorldRectActor();
	this.smallActor = new WorldRectActor();
	
	this.rows = 10;
	this.cols = 10;
	this.angle = 0;
	this.spread = Control.unitFormationSpread;
	this.enabled = false;
}
DragWorldRect.prototype.enable = function(_x, _y, _z){
	this.enabled = true;
	this.x = _x;
	this.y = _y;
	this.z = _z;
	this.spread = Control.unitFormationSpread;
	if(WorldGUI.indexOf(this.actor)<0){
		WorldGUI.push(this.actor)
		WorldGUI.push(this.smallActor);
	}
}
DragWorldRect.prototype.disable = function(){
	this.enabled = false;
	this.actor.remove();
	this.smallActor.remove();
}
DragWorldRect.prototype.update = function(){
	if(Selected.length <= 1){
		return;
	}
	var dragEndPoint_World = rayCastScreen(Control.mouseX, Control.mouseY, 0);
	
	this.angle = Math.atan2(dragEndPoint_World[1] - Control.dragStartPoint_World[1], dragEndPoint_World[0] - Control.dragStartPoint_World[0]);
	var drag_length = Utils.distance_xxyy(dragEndPoint_World[0],Control.dragStartPoint_World[0], dragEndPoint_World[1] ,Control.dragStartPoint_World[1]);
	drag_length *= 0.2
	drag_length += 0.5;
	drag_length = Math.max(1, drag_length);
	var numOfSelected = Selected.length;
	this.rows = Math.ceil(Math.sqrt(numOfSelected) / drag_length);
	this.cols = Math.ceil(numOfSelected /this.rows);
	this.w= this.rows * this.spread;
	this.h= this.cols * this.spread;
	this.update_actors();
}
DragWorldRect.prototype.update_actors = function(){
	this.actor.x = this.x; this.actor.y = this.y; this.actor.z = this.z;
	this.smallActor.x = this.x;this.smallActor.y = this.y;this.smallActor.z = this.z;
	this.actor.rotZ = this.angle; this.smallActor.rotZ = this.angle;
	this.actor.scaleX = this.w; this.actor.scaleY = this.h;
	var spread_scale_fact = this.spread / Control.unitFormationSpread_default;
	spread_scale_fact *= spread_scale_fact;
	this.smallActor.scaleX = 0.5/spread_scale_fact;
	this.smallActor.scaleY = 0.5 * spread_scale_fact;
}
DragWorldRect.prototype.mouseWheel_resize = function(delta){
	if(this.enabled == true){
		this.spread += delta*0.05;
		this.spread = Math.max(Math.min(this.spread, 1.5), 0.5);
		if(Control.change_spread_persistent == true){ //THIS IS SOME UGLY HACK, needs cleanup
			Control.unitFormationSpread = Control.Formation.spread;
		}
	}
}
DragWorldRect.fromNetData = function(arr){
	//[formation.angle, formation.cols, formation.rows, formation.spread]
	var f = new DragWorldRect();
	f.angle = arr[0];
	f.cols = arr[1];
	f.rows = arr[2];
	f.spread = arr[3];
	return f;
}

function DragSelectionRect(){
	this.startX = 0;
	this.startY = 0;
	this.endX = 0;
	this.endY = 0;
	this.enabled = false;
	
	this.guiElem = GUI.DragSelectionGUIElem();
	
	this.enable = function(_sx, _sy){
		this.startX = _sx;
		this.endX = _sx;
		this.startY = _sy;
		this.endY = _sy;
		this.enabled = true;
		GUI.AddElem( this.guiElem );
	}
	this.disable = function(){
		this.enabled = false;
		this.guiElem.removeFromGUI(GUI.Elements);
	}
	
	this.translate = function(x,y){
		this.startX -= x;
		this.startY -= y;
	}
	
	this.update = function(){
		this.endX = Control.mouseX;
		this.endY = Control.mouseY;

		if((this.startX-this.endX) * (this.startY-this.endY) < 0){
			var startCorner = [GUI.pixelToClipX(this.startX),GUI.pixelToClipY(this.startY)];
			var endCorner = [GUI.pixelToClipX(this.endX),GUI.pixelToClipY(this.endY)];
		}else{
			var startCorner = [GUI.pixelToClipX(this.endX),GUI.pixelToClipY(this.startY)];
			var endCorner = [GUI.pixelToClipX(this.startX),GUI.pixelToClipY(this.endY)];
		}
		update_frustum_planes(Selection_Frustum, cam.inv_PV_Matrix, startCorner,endCorner, null);
	}
	
	this.getWidth = function(){return this.endX - this.startX;}
	this.getHeight = function(){return this.endY - this.startY;}
}

Control.changeCurrentPlayer = function(playerId){
	Control.currentPlayer = Players[playerId];
	Control.EmptySelection();
	Control.SetCommand( Command.Idle);
}

//fires only on press, not if it's already pressed
Control.PressHandler = function(key){
	if(GUI.activeInputField){
		return;
	}
	if(GUI.currentKeyBinding != null){
		GUI.currentKeyBinding.setValue(key);
		return;
	}
	Control.pressed[key] = true;
	if(GUI.keyOverrideElem){
		return;
	}
 
	if(key == 80 || key == 27){ //P or Esc
		Control.Set_Pause_Game(!Control.gamePaused);
		//World.queueMoveOperation(1,0);
	}
	if(Control.gameState == Control.gameState_inEditor){
		if(key == 88){ //X
			GUI.enabled = !GUI.enabled;
			Render.drawEditorHelpers = GUI.enabled && Control.gameState == Control.gameState_inEditor;
		}else if(key == 107){ //+
			//if(Control.gameState == Control.gameState_inEditor){Environment.windStrength_ref += 0.1;}
		}else if(key == 109){ //-
			//if(Control.gameState == Control.gameState_inEditor){Environment.windStrength_ref -= 0.1;}
		}else if(key == 71){ //G
			Render.drawTerrainGrid = !Render.drawTerrainGrid;
		}else if(key == 83){//S
			if(BuilderModel.ACTIVE){
				var additive = Control.pressed[16];
				BuilderModel.select_segment_global(Control.terrainCursorPos[0],Control.terrainCursorPos[1], additive);
			}
			//Editor.PaintStart(Control.terrainCursorPos[0], Control.terrainCursorPos[1]);
		}else if(key == 65){ //A
			Editor.SnapSelected();
		}else if(key == 46){ //Delete
			Editor.DeleteSelected();
		}else if(key == 67){ //C
			Editor.cloneSelected();
		}else if(key == 68){ //D
			if(BuilderModel.ACTIVE){
				BuilderModel.trisect_selection();
			}				
		}else if(key == 77){ //M
			if(BuilderModel.ACTIVE){ 
				BuilderModel.make_segment_at_mouse();
			}
		}else if(key == 84){ //T
			if(BuilderModel.ACTIVE){ 
				BuilderModel.align_selection_texture();
			}
		}else if(key == 70){//F
			if(BuilderModel.ACTIVE){ 
				BuilderModel.flip_selection();
			}
		}else if(key == 13 || key == 9){ //TAB or ENTER
			GUI.set_gui_properties();
		}else if(key == 72){ //H
			Render.wireframeActors = !Render.wireframeActors;
		}else if(key == 36){ //HOME
			cam.setDefaultParams();
		}else if(key == 192){ //`
			Editor.refreshHelperActors();
		}
		
		if(key == 87 || key == 90 || key == 69){
			EditorAction.Create(EditorAction.type_manipulate);
		}
		if(key == 81){
			if(Editor.selected.length == 0){
				Editor.getNextDoodadVariation(Control.terrainCursor,-1);
				Editor.getNextCliffVariation(-1);
			}else{
				Editor.getNextDoodadVariation(Editor.selected[0],-1);
			}
		}
		if(key == 82){
			if(Editor.selected.length == 0){
				Editor.getNextDoodadVariation(Control.terrainCursor,1);
				Editor.getNextCliffVariation(1);
			}else{
				Editor.getNextDoodadVariation(Editor.selected[0],1);
			}
		}
	}else{ //IN-GAME CONTROLS
		if(DEVMODE || EDITORMODE){
			if(key == 88){//X
				GUI.enabled = !GUI.enabled;
			}else if(key == 84){//T
				Control.setGameState(Control.gameState_inEditor);
			}
		}
		
		if(Control.key_use.isKeycode(key)){
			Gamestats.UseEvent();
		}
		
		if(key == 49){
			Weapon.setWeapon(0);
		}else if(key == 50){
			Weapon.setWeapon(1);
		}else if(key == 51){
			Weapon.setWeapon(2);
		}else if(key == 52){
			Weapon.setWeapon(3);
		}else if(key == 53){
			Weapon.setWeapon(4);
		}else if(key == 54){
			Weapon.setWeapon(5);
		}else if(key == 55){
			Weapon.setWeapon(6);
		}else if(key == 56){
			Weapon.setWeapon(7);
		}else if(key == 57){
			Weapon.setWeapon(8);
		}else if(key == 48){
			Weapon.setWeapon(9);
		}
	}
}

Control.ReleaseHandler = function(key){
	Control.pressed[key] = false;
	if(Control.gameState == Control.gameState_inEditor){
		if(key == 83 || key == 70){
			Editor.PaintEnd();
		}
		if(BuilderModel.ACTIVE && Editor.selected.length>0){
			if(key == 87 || key == 65){
				BuilderModel.ACTIVE.update_selection_edge_helpers(Editor.selected);
				BuilderModel.ACTIVE.update_selection_triangulation(Editor.selected);
			}
		}
	}
}

Control.CheckPressed = function(){
	if(GUI.activeInputField || GUI.keyOverrideElem){
		return;
	}
	
	if(Control.gameState == Control.gameState_inEditor){
		if(Control.pressed[83]==true){
			Editor.MousePaint(Control.terrainCursorPos[0],Control.terrainCursorPos[1],83);
		}else if(Control.pressed[70]==true){
			Editor.MousePaint(Control.terrainCursorPos[0],Control.terrainCursorPos[1],70);
		}else if(Control.pressed[87]==true){
			Editor.MoveSelection();
		}else if(Control.pressed[69]==true){
			Editor.RotateSelection();
		}
		/*if(Control.pressed[66]==true){
			Editor.MoveBoundingBox();
		}
		if(Control.pressed[78]==true){
			Editor.ResizeBoundingBox();
		}*/

		if(Control.pressed[35]==true){
			Editor.ResetHeightSelection(-0.1);
		}
		
		if(Control.pressed[90]==true){//Z
			if(Editor.mesh_edit_mode){
				Editor.SetLight_Selection(1-(Control.mouseY / canvas.height));
			}else{
				Editor.SetZSelection(-Control.mouseY/40 + 10);
			}
			
		}
		if(Control.pressed[76]==true){ //L
			if(Editor.mesh_edit_mode){
				Editor.SetStrobeStrength_Selection(1-(Control.mouseY / canvas.height));
			}
		}
		if(Control.pressed[76]==true){ //O
		}
		if(Control.pressed[37]==true){
			cam.yaw += Control.cam_rot_speed;
		}
		if(Control.pressed[39]==true){
			cam.yaw -= Control.cam_rot_speed;
		}
		if(Control.pressed[40]==true){
			cam.pitch += Control.cam_rot_speed*Control.cam_tilt_speed_factor;
		}
		if(Control.pressed[38]==true){
			cam.pitch -= Control.cam_rot_speed*Control.cam_tilt_speed_factor;
		}
	}else{
		//INGAME
	}
}


Control.getZMousePoint = function(intersectZ){
	return rayCastScreen(Control.mouseX, Control.mouseY, intersectZ).slice();
}

Control.getTerrainMousePoint = function(heightFunction){
	if(heightFunction === void 0){
		heightFunction = M.terrain.getHeightAt_NoCliff;
	}
	var eyepos = cam.getEyePos();
	//binaris kereses, meg kell talalni a kamerahoz legkozelebbi terrain feluletet, kezdjuk a kameratol, megyunk a terrain fele
	var intersectZ = Math.min(eyepos[2], 15);
	var cursorpos;
	
	for(var i = 0; i< 20 ; ++i){
		cursorpos = rayCastScreen(Control.mouseX, Control.mouseY, intersectZ);
		if(cursorpos[2] < heightFunction.call(M.terrain, cursorpos[0], cursorpos[1])){
			for(var j=0;j<10;++j){
				intersectZ += 0.1;
				cursorpos = rayCastScreen(Control.mouseX, Control.mouseY, intersectZ);
				if(cursorpos[2] > heightFunction.call(M.terrain, cursorpos[0], cursorpos[1])){
					break;
				}
			}
			break;
		}
		intersectZ -= 1;
	}
	return [cursorpos[0],cursorpos[1],cursorpos[2]];
}

Control.mouseWheel_Handler = function(wheelDelta){
	var delta = wheelDelta;
	if(GUI.mouseWheelCheck(delta) == false){
		if(Control.currentCommand.mouseWheel){
			Control.currentCommand.mouseWheel(delta);
		}
	}
}

Control.updateMousePos = function(e){
	if(Control.pointer_locked){
		Control.mouseX = Math.max(0, Math.min(Render.pixelWidth-1, Control.mouseX + e.movementX* Render.supersampling));
		Control.mouseY = Math.max(0, Math.min(Render.pixelHeight-1,Control.mouseY + e.movementY* Render.supersampling));
		if(GUI.Elements != GUI.InGame){
			Control.pointer_locked_elem.style.left = ""+(Control.mouseX / Render.supersampling-Control.currentCommand.cursorOffset[0])+"px";
			Control.pointer_locked_elem.style.top = ""+(Control.mouseY / Render.supersampling-Control.currentCommand.cursorOffset[1])+"px";
		}else{ //Hide mouse cursor
			Control.pointer_locked_elem.style.left = "-50px";
			Control.pointer_locked_elem.style.top = "-50px";
		}
	}else{
		var screenScalingX = canvas.scrollWidth/Render.pixelWidth;
		var screenScalingY = canvas.scrollHeight/Render.pixelHeight;
		
		Control.mouseX = (e.clientX - Control.canvasRect.left)/screenScalingX;
		Control.mouseY = (e.clientY - Control.canvasRect.top)/screenScalingY;
	}
	
	if(cam.mouseLook && !Control.gamePaused && (Control.gameState==Control.gameState_inGame
	|| Control.pressed[2] )){
		cam.mouse_update(e.movementX, e.movementY);
	}
}

Control.AssignEventListeners = function(){
	function preventDefault(e) {
	  e = e || window.event;
	  if (e.preventDefault)
		  e.preventDefault();
	  e.returnValue = false;  
	}
	
	document.addEventListener('wheel', function(e) {
    	preventDefault(e);
		
		if(e.wheelDelta != undefined){ //Chromium
			Control.mouseWheel_Handler(e.wheelDelta/120.);
		}else if(e.deltaY != undefined){ //Firefox
			Control.mouseWheel_Handler(-e.deltaY/3.);
		}
		
	}, {passive:false});

	//window.onmousewheel = document.onmousewheel = window.onwheel;

	window.onbeforeunload = function () {//Prevent Ctrl+W
		if(DESKTOP_VERSION){
			e.preventDefault();
		}
		return " ";
	};
	
	window.onkeydown=function(e){
		if(Control.pressed[e.keyCode] == false){
			Control.PressHandler(e.keyCode);
		}
		if(Control.preventKeys.indexOf(e.keyCode)>=0){
			preventDefault(e);
		}
		if(GUI.keyOverrideElem){
			GUI.keyOverrideElem.keyPress( e );
		}

		if(GUI.activeInputField == null){
			if(e.keyCode == 13 && Control.gameState == Control.gameState_inGame){
				GUI.ChatPanel.toggle();
			}
			return;
		}else{
			if(e.keyCode == 27 && GUI.ChatPanel){
				GUI.ChatPanel.cancel();
			}else{
				GUI.activeInputField.keyPress( e );
			}
		}
	};
		
	window.onkeyup=function(e){
		Control.ReleaseHandler(e.keyCode);
	}


	canvas.onmousedown = function(e){
		
		if(Control.pointerLock){
			canvas.requestPointerLock();
			Control.pointer_locked_elem.style.visibility = "visible"
			Control.pointer_locked = true;
		}else if(Control.pointer_locked){
			document.exitPointerLock();
			Control.pointer_locked_elem.style.visibility = "hidden"
			Control.pointer_locked = false;
		}
		
		Control.updateMousePos(e);
		Control.lastPressX = Control.mouseX;
		Control.lastPressY = Control.mouseY;
		
		if(e.which === 2){
			e.preventDefault();
		}
		if(GUI.clickCheck(e.which) == true){
			return;
		}
		
		Control.dragStartPoint_World = rayCastScreen(Control.mouseX, Control.mouseY, 0).slice();
		Control.clickStartPoint_Terrain = Control.getTerrainMousePoint();
		
		
		if(e.which == 1){
			Control.leftMousePressed = true;
			if(!Gamestats.cinematicMode || Control.gameState == Control.gameState_inEditor){
				Control.currentCommand.leftClickPress();
			}
		}else if(e.which == 3){
			Control.rightMousePressed = true;
			if(!Gamestats.cinematicMode || Control.gameState == Control.gameState_inEditor){
				Control.currentCommand.rightClickPress();
			}
		} 
		Control.PressHandler(e.which);
	}
	
	
	canvas.onmousemove = function(e){
		Control.updateMousePos(e);
	};
	
	canvas.onmouseup = function(e){
		Control.minimapDrag = false;
		GUI.releaseClickedElem();
		
		if(e.which == 1){
			Control.leftMousePressed = false;
			Control.leftMousePressed_GUI = false;
			var doubleClick = false;
			if(Control.doubleClickCountdown <= Control.doubleClickTimeframe_min){
				//we're out of double click window, reset double click countdown
				Control.doubleClickCountdown = Control.doubleClickTimeframe_max;
			}else{
				Control.doubleClickCountdown = 0;
				doubleClick = true;
			}
			if(Control.currentCommand){
				if(doubleClick == false || Control.currentCommand.doubleClick == null){
					Control.currentCommand.leftClickRelease();
				}else{
					Control.currentCommand.doubleClick();
				}
			}
		}else if(e.which == 3){
			if(Control.rightMousePressed){
				Control.currentCommand.rightClickRelease();
			}
			Control.rightMousePressed = false;
			Control.rightMousePressed_GUI = false;
		}
		
		Control.ReleaseHandler(e.which);
	}
	canvas.oncontextmenu = function(e){
		return false;
	}

	
	window.addEventListener('blur',
	function(e){
		Control.leftMousePressed = false;
		Control.rightMousePressed = false;
		for(var i=0;i<Control.pressed.length;++i){
			Control.pressed[i] = false;
		}
	});
	
}

Control.checkFullScreen = function(){
	if(DESKTOP_VERSION){
		return(!window.screenTop && !window.screenY);
	}else{
		return (document["mozFullScreen"] || document["webkitIsFullScreen"] || !!document["msFullscreenElement"] 
		|| document["fullScreen"] || document["fullScreenElement"]);
	}
}
 
Control.fullScreen = function(){
	if(DESKTOP_VERSION){
		ipcRenderer.send("voor-fullscreen",null);
	}else{
		if( Control.checkFullScreen() ){
			if (document.exitFullscreen) {
				document.exitFullscreen();
			  } else if (document.mozCancelFullScreen) { /* Firefox */
				document.mozCancelFullScreen();
			  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
				document.webkitExitFullscreen();
			  } else if (document.msExitFullscreen) { /* IE/Edge */
				document.msExitFullscreen();
			  }
		}else{
			var elem = document.documentElement;
			if (elem["requestFullscreen"])
				elem["requestFullscreen"]();
			else if (elem["mozRequestFullScreen"])
				elem["mozRequestFullScreen"]();
			else if (elem["msRequestFullscreen"])
				elem["msRequestFullscreen"]();
			else if (elem["webkitRequestFullScreen"])
			{
				if (typeof Element !== "undefined" && typeof Element["ALLOW_KEYBOARD_INPUT"] !== "undefined")
					elem["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]);
				else
					elem["webkitRequestFullScreen"]();
			}
		}
	}
}