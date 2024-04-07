var s = null; //console shortcut, the first of the objects selected in editor
var up = null; //console shortcut, UnitPrototype
var game_portal = "armor"; //armor, ng, crazy, gd, kiloo
var frameMS = 16;
var fallback_MS = 50;
var game_interval = null;
var game_initialized = false;
//boolean, false if running from browser
//var DESKTOP_VERSION = window.process && window.process.versions && window.process.versions['electron'];
var DESKTOP_VERSION = false;
var DEVMODE = false;
var EDITORMODE = false;
var game_version = "Pre-Alpha 0.1.1c"
var VERSION_ID = 12; //used for map versions

var Units = [];
var Projectiles = [];
var Actors = [];
var Doodads = [];
var LightDecals = [];
var SoundObjects = [];
var Players = [];

var cam = new Camera([0,0,0], true);
var Selected = [];
var Gamestats = new Object;
Gamestats.INIT = true;
//if true, it will load stats from previous level
Gamestats.mapTransition = false;
Gamestats.GuardEnabled = true;

Gamestats.allowWander = true;
Gamestats.allowRescue = true;
Gamestats.menuPath = "maps/campaign/menu.txt";
Gamestats.lastMapFilename = "maps/tutorial.txt";
Gamestats.oneTimePickups = [];
Gamestats.saveState = null;
Gamestats.cinematicMode = false;
Gamestats.deathText = "Defeat!";
Gamestats.monster_damage_factor = 1;
Gamestats.monster_life_factor = 1;
Gamestats.startTime=Date.now();
Gamestats.name = "Anonymous";
Gamestats.lastSaveState = null;
Gamestats.autosave = false;
Gamestats.autosave_countdown = 3600;
Gamestats.mapTime = 0;
Gamestats.TIME_TICK_END= 0;
Gamestats.acceleration = 0;
//when map changes, initiate this briefing
Gamestats.briefingPromise = -1;
Gamestats.difficulty = 0;
Gamestats.defeat = false;
Gamestats.victory = false;
Gamestats.skirmishStartResource = 50;
Gamestats.Hero = null;
Gamestats.Keycards = [];
Gamestats.Secrets = [];
Gamestats.secrets_found = 0;
Gamestats.secrets_total = 0;
Gamestats.revive_time = 90;
Gamestats.revive_counter = Gamestats.revive_time;

Gamestats.HintHistory = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
Gamestats.getHintText = function(hintId){
	Gamestats.HintHistory[hintId] = 1;
	switch(hintId){
		case 0: return "Hold [SPACEBAR] to move the camere. Mouse scroll is only enabled in full-screen mode"
		case 1: return "Left-click on a unit to select it"
		case 2: return "Right-click on the ground to move your selected units"
		case 3: return "Left-click and drag to select multiple units. ["+Control.getKeyName(Control.key_addSelection)+"] + Left-click to add units to the selection"
		case 4: return "Right-clicking on an enemy will make your selected units attack it"
		case 5: return "Cassio's vehicle is repaired if an allied unit is standing near it"
		case 6: return "Use Attack [A] on the ground for an agressive move. Your units will automatically attack enemies along the way"
		case 7: return "Use Cassio's Plasma Charge ability [E] for an electric area attack"
		case 8: return "Order a selected Rover to start mining by right clicking on a Minervite Vein. Build more Rovers in the Control Hub"
		case 9: return "Order your Rover to morph into an Blackchain Core [E]. Buildings can't be built too close to a Minervite Vein"
		case 10: return "Blackchain Cores generate crypto-coin, and are required to maintain your army. Always try to have a positive coin income!"
		case 11: return "Blackchain Cores work faster in a cold chunk, but they also make it warmer. For optimal income build only 4 BCs in a single chunk"
		case 12: return "Build a Barracks to train infantry units. It is found in the Basic Structures [B] tab of a selected Rover"
		case 13: return "Select your Barracks and train Pioneers. You can queue up the training of multiple units, or cancel their training by clicking on their production line icon"
		case 14: return "Right-click on the ground to set a selected building's rally point. Units will automatically go to the rally point when trained"
		case 15: return "A Concrete Cover gives 50% damage reduction to infantry units. Right click to garrison your selected infantry in it"
		case 16: return "Build a Control Hub as close to Minervite Veins as possible"
		case 17: return "A Deposit can repair buildings and units alike. Build one from the Advanced Structures [V] tab"
		case 18: return "Press [R] to quick-select your Deposits and to call a Repair Drone"
		case 19: return "Click on the unit portrait to focus the camera on the unit"
		case 20: return "You can make a selection group by pressing ["+Control.getKeyName(Control.key_controlGroup)+"]+[any number key], and load it by pressing the number again"
		case 21: return "Double-click on a unit to select similar units on the screen. You can also press [Q]"
		case 22: return "Press [TAB] to highlight different unit types in your selection"
		case 23: return "Build Rail Turrets and Forts to defend your base. Unlike concrete covers, Forts absorb 100% of damage"
		case 24: return "You can train Laikas in the Factory. Don't forget to set a rally point for the Factory (right-click)"
		case 25: return "Use the Electropod's Repulsion ability to free the trapped Pioneers"
		case 26: return "Use the Electropod's Repulsion ability to push enemies off a cliff"
		case 27: return "Attacking from high ground grants +25% bonus damage"
		case 28: return "Construct a Hangar to train flying units"
		case 29: return "You have a Capacitor, now you can turn your Fort into a moving Lev-Fort"
		default: return "EMPTY HINT.";
	}
}

Gamestats.loop = function(){
	var tri = Gamestats.Hero.last_floor_triangle;
	if(tri){
		if(Control.gameState == Control.gameState_inGame && !M.isMenu && M.filename){
			if(Gamestats.mapTime%60 == 0 && tri /*&& Gamestats.Hero.on_the_ground*/ ){
				//TODO: bunny hopping should not be a solution to damaging floors
				var floorDamage = tri.get_floor_damage();
				if(floorDamage > 0){
					Gamestats.Hero.Hurt(floorDamage, Gamestats.Hero, Damagetype.HAZMAT);
				}
			}
		}
		var seg = tri.builderSegment;
		if(seg){
			if(seg.secretId && !Gamestats.Secrets[seg.secretId]){
				Gamestats.Secrets[seg.secretId] = 1;
				GUI.Alert("Secret Found!",true);
				Gamestats.secrets_found ++;
				SoundObject.rescue.play(0,0,0.5);
			}
		}
	}
	if(!Gamestats.Hero.alive ){
		Gamestats.Hero.eyeZ = Math.max(0.3, Gamestats.Hero.eyeZ - 0.02);
		Gamestats.revive_counter --;
		if(Gamestats.revive_counter <= 0){
			Gamestats.revive_counter = Gamestats.revive_time;
			Gamestats.RestartMap();
		}
	}
	
}

Gamestats.RestartMap = function(){
	if(!Net.online){
		if(M.filename){
			Gamestats.ExitZone(M.filename);
		}
	}else{
		GUI.Alert("Can't restart online game");
	}
	
}

Gamestats.UseEvent = function(){
	var hero = Gamestats.Hero;
	var rad = 100;
	var targetX = rad*Math.cos(1.57-cam.yaw)*Math.sin(cam.pitch) + cam.pos[0];
	var targetY = rad*Math.sin(1.57-cam.yaw)*Math.sin(cam.pitch) + cam.pos[1];
	var targetZ = -rad*Math.cos(cam.pitch) + cam.pos[2];
	
	NavNode.last_raycast_triangle = null;
	NavNode.rayCast_all([hero.x, hero.y, hero.z + hero.eyeZ] ,[targetX,targetY,targetZ]);
	if(NavNode.last_raycast_dist < 1.25){
		console.log( NavNode.last_raycast_dist );
		NavNode.last_raycast_triangle.getSector().onUse();
	}
}

Gamestats.ExitZone = function(mapname){
	Gamestats.lastMapFilename = mapname;
	M.filename = mapname;
	Asset.importMap(Gamestats.lastMapFilename);
	//Gamestats.SaveGame(false);
	Gamestats.mapTransition = true;
}

Gamestats.getSaveState = function(getMapState){
	var data = new Object();
	data.name = Gamestats.name;
	data.difficulty = Gamestats.difficulty;
	data.HintHistory = Gamestats.HintHistory;
	data.globalVariables = Trigger.globalVariables;
	data.difficulty = Gamestats.difficulty;
	if(getMapState && M.filename){
		data.saveState = Gamestats.get_MapSaveState();
	}else{
		data.saveState = null;
	}
	
	return data;
}

Gamestats.get_MapSaveState = function(){
	var saveState = new Object;
	saveState.mapName = M.filename;
	saveState.mapTime = Gamestats.mapTime;
	saveState.unitData = Unit.getSaveState();
	saveState.triggerActorData = Trigger.getActorSaveState();
	saveState.triggerData = Trigger.getSaveState();
	saveState.triggerActionHistory = Trigger.actionHistory;
	saveState.triggerTimers = Trigger.Timers;
	saveState.objectiveValues = Objective.getSaveState();
	saveState.unitGroupData = Trigger.getUnitGroupSaveSate();
	saveState.playerData = Player.getSaveState();
	saveState.upgradeData = Upgrade.getSaveState();
	saveState.fowData = Pathfinder.saveFOW();
	
	return saveState;
}

Gamestats.SaveGame = function(getMapState){
	if(M.isMenu || !M.lastLoadedData){return;}
	Gamestats.lastSaveState = Gamestats.getSaveState(getMapState);
	Gamestats.autosave_countdown = 3600;
	if(DESKTOP_VERSION){
		Filesaver.saveFile(JSON.stringify(Gamestats.lastSaveState), "savestate.json", "savegames");
		//ipcRenderer.send('voor-save', {name:Gamestats.name, data:JSON.stringify(Gamestats.lastSaveState)});
	}
}

//data only used in DESKTOP version
Gamestats.LoadGame = function(data){
	EDITORMODE = false;
	if(data){
		Gamestats.lastSaveState = data;
		Gamestats.mapTransition=true;
		Gamestats.name = data.name || "Anonymous";
		Gamestats.difficulty = data.difficulty || 0;
		if(data.HintHistory){					  
			for(var i=0;i<data.HintHistory.length;++i){
				Gamestats.HintHistory[i] = data.HintHistory[i];
			}
		}
		if(data.globalVariables){
			Trigger.globalVariables = data.globalVariables;
		}else{
			Trigger.resetGlobalVariables();
		}
		if(data.lastMap === "maps/null.txt"){
			data.lastMap = "maps/tutorial.txt";
		}
		Gamestats.saveState = data.saveState;
		Asset.importMap(data.saveState.mapName);
	}else {
		Gamestats.NewGame();
		GUI.Alert("Missing data. Starting new game.")
	}
}

//filename param optional, for custom maps
Gamestats.NewGame = function(filename){
	Loot.init();
	if(filename === void 0){
		EDITORMODE = false;
		filename = "maps/tutorial.txt";
	}else{
		Gamestats.name = "CUSTOM";
	}
	Gamestats.lastMapFilename = filename;
	Gamestats.level_end_ammo = null;
	Gamestats.mapTransition = false;
	Gamestats.saveState = null;
	Gamestats.startTime=Date.now();
	Asset.importMap( filename );
	for(var i=0;i<30;++i){
		Gamestats.HintHistory[i] = 0;
	}
	Trigger.resetGlobalVariables();
}
Gamestats.SaveAndExit = function(){
	Gamestats.SaveGame(true);
	EDITORMODE = false;
	Gamestats.Surrender();
}
Gamestats.Surrender = function(){
	Net.quit();
	Gamestats.level_end_ammo = null;
	Gamestats.mapTransition = false;
	EDITORMODE = false;
	Asset.importMap(Gamestats.menuPath);
}
Gamestats.setCinematicMode = function(bool){
	Gamestats.cinematicMode = bool;
	if(Gamestats.cinematicMode){
		Control.SetCommand(Command.Idle);
	}
}

Gamestats.updateMonsterLevel = function(){
	var difficultyDamageFactor = 1;
	var difficultyLifeFactor = 1;
	this.loot_level = M.monsterLevel;
	if(this.difficulty == 1){
		difficultyDamageFactor = 0.70;
		difficultyLifeFactor = 0.85;
	}else if(this.difficulty >= 3){
		difficultyDamageFactor = 1.4;
		difficultyLifeFactor = 1.2;
		this.loot_level += 2;
	}
	this.monster_damage_factor = difficultyDamageFactor * (1+M.monsterLevel/30.);
	this.monster_life_factor = difficultyLifeFactor * (1+M.monsterLevel/30.);
}

Gamestats.GetStartLocations = function(){
	for(var i=0;i<Actors.length;++i){
		var a = Actors[i];
		if(a.proto == DoodadPrototype.StartLocation){
			Gamestats.Hero.x = a.x;
			Gamestats.Hero.y = a.y;
			Gamestats.Hero.z = a.z;
			cam.yaw = 3.1415 + a.rotZ;
		}
		if(a.model.isBuilderModel){
			NavNode.AddCollider(a);
		}
	}
}


Gamestats.Victory = function(){
	var mapId = Gamestats.LevelPaths.indexOf(M.filename) +1;
	GUI.set_gui_story(mapId);
	Music.ChangeTrack(1);
}

Gamestats.Defeat = function(){}

function setWindowScale(w,h){
	w = Math.max(60,w * 1366);
	h = Math.max(90,h * 768);
	//canvas.style.width =  "1366px"; 
	//canvas.style.height = "768px"; 
	canvas.width = w;
	canvas.height = h;
	GUI.refresh_all_positions();
}

function fileLoaded(){
	if(game_initialized){return;}
	++ Asset.numLoadedFiles;
	LoadingScreen.Update();
	if(Asset.numLoadedFiles == Asset.numAssets){
		Game_Init();
		/*if(game_portal == "armor"){
			document.getElementById("playbutton").style.display = "inline";
		}else{
			Game_Init();
			if(game_portal == "gd"){
				gd_ad_start();
			}
		}*/
	}
	if(Asset.numLoadedFiles > Asset.numAssets){
		console.log("WARNING! ASSET NUMBER MISMATCH!")
	}
}

function Game_PREINIT(){
	initGL();
	Asset.ImportAll();
	ShaderProgram.init_all_shaders();
	if(game_portal == "gd"){
		gd_override_functions();
		//gd_ad_start();
	}
}

function Game_Init(){
	game_initialized = true;
	if(DEVMODE == false && Asset.keepModelData == true){
		console.warn("Asset.keepModelData is true, while DEVMODE is off! Memory is being wasted.")
	}
	Players = [];
	for(var i=0;i<9;++i){
		Players[i] = new Player(i,i);
	}
	//Init arrays
	Actors = [];
	Units = []
	
	ShaderProgram.Check_Shader_Loading();
	webGLStart();
	//init_color_palette();
	TextureAsset.InitTerrainTextures();
	Control.setCameraPos(32,32,0);
	Control.AssignEventListeners();
	Render.drawTerrainGrid = false;
	Render.lastFrameTime = Date.now();
	SoundObject.Init();
	Music.Init();
	Render.drawTerrainGrid = false;
	CliffSet.init();
	if(DESKTOP_VERSION){
		Net.init();
	}
	Upgrade.init();
	Ability.init();
	BloodType.init();
	AIPersona.init();
	PlayerRoleEntry.BuildList();
	setGraphicsLevel(0);
	setPixelLevel(1);
	if(DESKTOP_VERSION){
		ipcRenderer.send('config-load');
	}

	M.Initialize(64,64);
	//Asset.importMap("maps/just_another_voor_map.txt");
	Portrait.init();
	UnitPrototype.Initialize();
	u = UnitPrototype;
	DoodadPrototype.Initialize();
	Editor.init();
	GUI.Init();
	InitBriefings();
	loadingCanvas.parentNode.style.width = '1px';
	loadingCanvas.parentNode.style.visibility = 'hidden';
	loadingCanvas.style.width = '1px';
	loadingCanvas.style.visibility = 'hidden';
	
	if(DEVMODE == true){
		LevelStart();
	}else{
		Asset.importMap(Gamestats.menuPath);
	}
}

function LevelStart(){
	frame_multiplexer = 0;
	RAND.reset();
	Command.last_repeat_id = 0;
	cam.LevelStart();
	EditorAction.Init();
	NavNode.LevelStart();
	Units = [];
	Net.levelStart();
	UnitPrototype.levelStart();
	Actors = [];
	LightDecals = [];
	Projectiles = [];
	GUI.Reset();
	GUI.Reset_Alerts();
	GUI.Editor = null;
	GUI.Fade.opacity = 1.1;
	Control.decalCursor = new DecalActor(5, 5, 2,0,ShaderProgram.decalShader, Asset.texture.circle);
	Control.EmptySelection();
	Player.Init();
	Control.Init();
	Trigger.init();
	Ability.LevelStart();
	Upgrade.LevelStart();
	Gamestats.deathText = "Defeat!";
	Gamestats.acceleration = 0;
	Gamestats.mapTime = 0;
	Gamestats.Keycards = [false,false,false,false];
	Gamestats.Secrets = [0,0,0,0,0,0,0,0,0,0,0];
	Gamestats.secrets_found = 0;
	Gamestats.secrets_total = NavSector.get_secret_count();
	Task.utility_timestamp = 0;
	SoundObject.LevelStart();
	NavSector.LevelStart();
	//SoundSector.LevelStart();
	
	Gamestats.cinematicMode = false;
	Gamestats.mapTransition = false;
	Gamestats.defeat = false;
	Gamestats.victory = false;
	Gamestats.updateMonsterLevel();

	//Actors.push(Actor.rayActor());
	cam.targetUnit = null;
	if(M.isMenu){
		cam.setPos(16,8.5,0);
		Control.gamePaused = false;
		GUI.set_gui_menu();
	}
	
	if(Gamestats.INIT == true){
		Gamestats.INIT = false;
		loop();
		game_interval = setInterval(loop, frameMS);
		requestAnimationFrame( displayLoop );
	}
	
	Unit.Create(10,10, Players[1], UnitPrototype.Hero);
	Gamestats.Hero = Units[0];
	Gamestats.Hero.lightsource = LightDecal.Create(0,0.25,1);
	Gamestats.Hero.lightsource.addToActor(Gamestats.Hero.actor);
	HeroAmmo.Init();
	Weapon.Init();
	Gamestats.Hero.arsenal[1].equip(false);
	Gamestats.Hero.arsenal[0].equip(true);
	cam.targetUnit = Gamestats.Hero;
	Control.EmptySelection();
	Control.AddUnitToSelection(Gamestats.Hero);
}

function setGameSpeed(_ms){
	frameMS = Math.max(1,_ms);
	clearInterval(game_interval);
	//SoundObject.ambience1.setPitch(16/frameMS);
	//SoundObject.ambience2.setPitch(16/frameMS);
	game_interval = setInterval(loop, frameMS);
}

var frame_multiplexer = 0;

function loop(){
	Render.frameDelta = 1;
	SoundObject.MainLoop();
	TextureAsset.loop();
	Render.update_pixel_size();
	GUI.Update_Alerts();

	Net.online = Net.isClient || Net.isServer;
	/*if(Net.online){
		Net.loop();
		if(Net.Connections[0] && Net.Connections[0].lastPacketGot && Net.ahead_of_others()){
			Pathfinder.FOW_Texture_Update();
			return;
		}
		//Net.STORE_DEBUG();
	}*/

	frame_multiplexer ++;
	if(Control.gameLocked == true){return;}
	Control.mouseWorldPoint = Control.getTerrainMousePoint();
	s = Editor.getSelectedShortcut();
	
	if(Control.gamePaused == false){
		Gamestats.mapTime ++;
		//Pathfinder.FOW_Timestamp ++;
		Pathfinder.FOW_Texture_Update();
		//Pathfinder.Update_Abstract_Map();
	}
	
	if(frame_multiplexer%2 == 0){
		if(Control.gamePaused == false){
			Gamestats.loop();
			Task.utility_timestamp ++;
			for(var i=Players.length-1;i>=0;i--){
				Players[i].loop();
			}
			for(var i=Pathfinder.MoveOrders.length-1;i>=0;i--){
				Pathfinder.MoveOrders[i].loop();
			}
			for(var i=Projectiles.length-1;i>=0;i--){
				Projectiles[i].loop_first();
			}
			if(Control.gameState == Control.gameState_inGame){
				Trigger.update();
			}
			
			for(var i=NavNode.Colliders.length-1;i>=0;--i){
				if(NavNode.Colliders[i].dynamic){
					NavNode.Colliders[i].update_collider_dynamic();
				}
			}
			
			for(var i=Units.length-1;i>=0;i--){
				Units[i].loop_first();
			}
			
			//it's important to update the hero actor in the same tick as the colliders
			Gamestats.Hero.actor.update_gameloop();
			cam.gameloop();
			
		}
	}else{
		if(Control.gamePaused == false){
			if(GUI.StatusPortrait){
				GUI.StatusPortrait.update_face();
			}
			for(var i=NavSector.UpdateList.length-1;i>=0;i--){
				NavSector.UpdateList[i].update();
			}
			
			for(var i=Units.length-1;i>=0;i--){
				Units[i].loop_second();
			}
			for(var i=Actors.length-1;i>=0;i--){
				if(Actors[i].update_gameloop != undefined && Actors[i].owner != Gamestats.Hero){
					Actors[i].update_gameloop();
				}
			}
			Actor.doodad_gameloop_global();
			Environment.Update_Gameloop();
			
			if(GUI.Elements_Actors.length > 0){
				for(var i=GUI.Elements_Actors.length-1;i>=0;i--){
					if(GUI.Elements_Actors[i].update_gameloop != undefined){
						GUI.Elements_Actors[i].update_gameloop();
					}
				}
			}
			
		}
	}
	if(Control.gameState == Control.gameState_inEditor){
		Editor.loop();
	}
	Gamestats.TIME_TICK_END = Date.now();
	Control.update_gameloop();
	GUI.clickedElemLoop();
}	

function displayLoop(){
	var t_now = Date.now();
	Render.now = t_now;
	//time since the last loop_second (which contains the actor loop)
	Render.frame_interp = Math.min(1, (Render.now-Gamestats.TIME_TICK_END)/frameMS );
	//this is some hack, but it mitigates jittering of the frame-rate independent drawloop
	Render.delta2 = Render.delta1;
	Render.delta1 = Math.min(3, (t_now - Render.lastFrameTime) / frameMS);
	Render.frameDelta = Math.min(Render.delta2, Render.delta1);
	Render.shaderTime += Render.frameDelta * Render.shaderTimeSpeed;
	//Render.frameDelta = Math.min(3, (t_now - Render.lastFrameTime) / frameMS);
	Render.update_pixel_size();
	Render.lastFrameTime = t_now;
	Render.terrainTex_updated_this_frame = false;
	Pathfinder.bend_timestamp += Render.frameDelta;
	
	if(Control.pressed[32] &&  Control.gameState != Control.gameState_inGame && !Control.gamePaused && !M.isMenu ){
		GUI.ScrollCompass.setVisibility(true);
		ScrollView(Control.scroll_speed * (0.1*cam.distance+0.2));
	}else{
		if(GUI.ScrollCompass){
			GUI.ScrollCompass.setVisibility(false);
		}
	}
	
	cam.loop();
	Asset.animate_textures();
	
	//cam.pos[2] = M.terrain.getHeightAt(cam.pos[0],cam.pos[1]);
	try{
		view_init(cam);
		Control.DragSelection_Handle();
		Control.DragFormation_Handle();
		
		Control.mouseWorldPoint = Control.getTerrainMousePoint();
		Control.mouseShootingPoint = Control.getTerrainMousePoint(M.terrain.getHeightAt_Shooting);
		if(Control.gamePaused == false){
			Environment.Update_Drawloop();
		}
		M.terrain.Update_Drawloop();
		draw();
	}catch(e){
		console.warn(e);
	}
	if(GPU_FAIL){
		setTimeout(displayLoop, fallback_MS);
	}else{
		requestAnimationFrame( displayLoop );
	}
	
	//setTimeout(displayLoop, frameMS);
	//setTimeout(displayLoop, Math.min(66, Math.max(16, frameMS * Render.frameDelta - 1)));
	
}

//dx, dy optional, used for mouse scrolling
function ScrollView(scroll_speed, dx, dy){
	scroll_speed *= Render.frameDelta;
	var point_before_move = worldPointToPixel(cam.pos[0],cam.pos[1],cam.pos[2]);
	
	var scroll_angle= cam.yaw + Math.atan2((Control.mouseY-Render.pixelHeight/2),(Control.mouseX-Render.pixelWidth/2));
	if(Control.gameState == Control.gameState_inEditor){
		Control.setCameraPos(cam.pos[0]+ Math.cos(scroll_angle)*scroll_speed, cam.pos[1]- Math.sin(scroll_angle)*scroll_speed);
	}else{
		if(dx || dy){
			cam.scroll(dx,dy);
		}else{
			cam.scroll(Math.cos(scroll_angle)*scroll_speed, -Math.sin(scroll_angle)*scroll_speed);
		}
	}
	if(GUI.ScrollCompass){
		GUI.ScrollCompass.angle = -1.57-scroll_angle+cam.yaw;
	}
	
	var point_after_move = worldPointToPixel(cam.pos[0],cam.pos[1],cam.pos[2]);

	if(Control.dragSelectionRect != null){
		Control.dragSelectionRect.translate(point_after_move[0] - point_before_move[0], point_after_move[1]-point_before_move[1]);
	}
}
function draw(){
	if(gl.isContextLost() == true || Control.gameLocked == true){
		return;
	}
	if(DESKTOP_VERSION == true || DEVMODE == false){
		if( canvas.scrollWidth != window.innerWidth || canvas.scrollHeight != window.innerHeight
		|| Render.ctr == 2){ //also refresh the GUI at game init, it will fix menu misalignemnts
			GUI.Realign();
			
			if(Render.postProcess){
				refreshPostProcessing();
			}
		}
	}

	Render.drawType = gl.TRIANGLES;
	
	ParticleActor.resetCounters();
	
	if(!Control.gamePaused){
		check_all_actor_visibility();
	}
	
	if(Render.ctr==20){
		setAniso(2);
	}
	if(Render.ctr < 100){
		Render.ctr ++;
	}
	
	//draw_shadowmap();
	terrainOverlay_framebuffer_update();
	draw_init(cam);
	
	if(Control.gameState == Control.gameState_inEditor){
		Editor.cursorUpdate();
	}else{
		//Control.UpdateHighlitUnit();
	}
	
	for(var i=0;i<Environment.waterGroups.length;++i){
		Environment.waterGroups[i].hasVisiblePart = false;
	}
	
	/*if(Visible_Water.length > 0){
		draw_rippleTexture();
		
		for(var i=0;i<Visible_Water.length;++i){
			Visible_Water[i].group.hasVisiblePart = true;
		}
		if(Render.wireframeActors == true){
			Render.drawType = gl.LINES;
		}
		draw_refraction();
		Render.drawType = gl.TRIANGLES;
	}
	draw_reflection();*/
	
	if(Render.postProcess){
		gl.bindFramebuffer(gl.FRAMEBUFFER, postProcessFramebuffer);
		draw_buffer_reset();
		gl.viewport(0,0,Render.pixelWidth  ,Render.pixelHeight  );
		
	}	
	
	if(Control.key_eyes.pressed()){
		gl.clearColor(0,0,0,0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		GUI.GunSprite.setVisibility(false);
	}else{
		GUI.GunSprite.setVisibility(true);
		gl.depthMask(false);
		Environment.skyActor.update_drawloop();
		draw_array_actors([Environment.skyActor]);
		gl.depthMask(true);
			
		//draw_array_actors(Visible_Water);
		
		if(Render.wireframeActors == true){
			Render.drawType = gl.LINES;
		}
		draw_array_actors(Visible_Actors);
		if(Render.drawEffects == true){
			draw_array_actors(Visible_BloodDecals);
			draw_array_actors(Visible_BlendEmitters);
		}
		Render.drawType = gl.TRIANGLES;
		
		if(Editor.brushMap == Editor.brushMap_Water && Editor.brushChannel == 0 && Control.gameState == Control.gameState_inEditor){
			drawHelperGrid(M.terrain);
		}
		
		WorldRectActor.update();
		if(Render.drawBoundingBoxes == true){
			Render.drawType = gl.LINES;
			draw_array_actors(Visible_Bounding_Boxes);
			Render.drawType = gl.TRIANGLES;
			draw_array_actors(Visible_Bounding_Boxes);
		}
		
		for(var i = WorldGUI.length-1;i>=0;--i){
			WorldGUI[i].update_drawloop();
		}
		draw_array_actors(WorldGUI);
		draw_terrain(M.terrain, null);
		
		gl.clear(gl.DEPTH_BUFFER_BIT);
		//gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		if(GUI.Elements_Actors.length>0){
			draw_gui_actors();
		}
	}
	
	
		
	if(Render.postProcess){
		/*gl.bindFramebuffer(gl.FRAMEBUFFER, bloomFramebuffer);
		draw_screen_pass(  postProcessTexture, ShaderProgram.bloomShader );
		gl.bindFramebuffer(gl.FRAMEBUFFER, bloomBlurFramebuffer);
		draw_screen_pass(  bloomTexture, ShaderProgram.bloomBlurShader );*/
		gl.viewport(0,0,Render.pixelWidth  ,Render.pixelHeight );
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		draw_screen_pass(  postProcessTexture, ShaderProgram.postProcessShader );
	}
	
	
	if(GUI.enabled == true){
		if(!Gamestats.cinematicMode){
			//draw_lifebars();
		}
		
		Minimap.update();
		/*if(GUI.Minimap != null){
			GUI.Minimap.update();
		}*/
		if(GUI.BattlePanel != null){
			GUI.BattlePanel.update();
		}
		GUI.draw();
	}
}

function setGraphicsLevel(level){
	level = Math.min(4, Math.max(0,Math.floor(level)));
	Render.graphicsLevel = level;
	if(level == 0){
		setTerrainTexResolution(512);
		setShadowResolution(2048);
		Render.drawShadows = true;
		Render.drawEffects = true;
		Render.drawUnitAO = true;
		Render.drawReflections = true;
		Render.shaderQuality = 1;
		Render.postProcess = true;
		setAniso(2);
	}else if(level == 1){
		setTerrainTexResolution(512);
		setShadowResolution(1024);
		Render.drawShadows = true;
		Render.drawEffects = true;
		Render.drawUnitAO = true;
		Render.drawReflections = true;
		Render.postProcess = false;
		Render.shaderQuality = 1;
		setAniso(2);
	}else if(level == 2){
		setTerrainTexResolution(256);
		setShadowResolution(512);
		Render.drawShadows = true;
		Render.drawEffects = true;
		Render.drawUnitAO = false;
		Render.drawReflections = false;
		Render.postProcess = false;
		Render.shaderQuality = 1;
		setAniso(1);
	}else{
		setTerrainTexResolution(128);
		setShadowResolution(8);
		Render.drawShadows = false;
		Render.drawEffects = false;
		Render.drawUnitAO = false;
		Render.drawReflections = false;
		Render.postProcess = false;
		Render.shaderQuality = 0;
		setAniso(1);
	
	}	
	return Render.graphicsLevel;
}

function setPixelLevel(level){
	level = Math.min(4, Math.max(0,Math.floor(level)));
	Render.pixelLevel = level;
	if(level == 0){
		setSupersampling(1.5);
	}else if(level == 1){
		setSupersampling(1);
	}else if(level == 2){
		setSupersampling(0.85);
	}else if(level == 3){
		setSupersampling(0.75);
	}else{
		setSupersampling(0.5);
	}
	return Render.pixelLevel;
}

function setSupersampling(factor){
	Render.supersampling = factor;
	factor = Math.min(2,factor);
	canvas.style.height = "600px"; 
	canvas.style.width =  "1066px"; 
	canvas.width = Math.round(canvas.scrollWidth * factor*1); 
	canvas.height = Math.round(canvas.scrollHeight * factor);
}

function saveConfig(){
	if(!DESKTOP_VERSION){return;}
	var config = new Object();
	config.pixelLevel = Render.pixelLevel;
	config.graphicsLevel = Render.graphicsLevel;
	config.masterVolume = SoundObject.masterVolume;
	config.musicVolume = Music.volume;
	config.portraitVolume = SoundObject.portraitVolume ||0.01;
	config.relativeMove = Gamestats.relativeMove;
	config.keys = KeyBinding.getArray();										 
	config.autosave = Gamestats.autosave;
	config.scrollSpeed = Control.scroll_speed;
	config.scrollSpeedArrows = Control.scroll_speed_arrows;
	config.alwaysMouseScroll = Control.alwaysMouseScroll;
	config.pointerLock = Control.pointerLock;
	//config.guiScale = GUI.scale;
	//config.guiOffset = GUI.battlePanelPosition;
	config.windowed = !Control.checkFullScreen();																			   
	ipcRenderer.send('config-save',config);
}
function loadConfig(config){
	setPixelLevel(config.pixelLevel||0);
	setGraphicsLevel(config.graphicsLevel);
	Music.SetVolume(config.musicVolume);
	SoundObject.SetMasterVolume(config.masterVolume);
	SoundObject.SetPortraitVolume(config.portraitVolume || 1);
	Gamestats.relativeMove = config.relativeMove;
	Gamestats.autosave = config.autosave || false;
	Control.alwaysMouseScroll = config.alwaysMouseScroll || false;
	Control.pointerLock = config.pointerLock || false;
	//GUI.scale  = Math.max(0.2,config.guiScale) || 1;
	//GUI.battlePanelPosition = Math.max(0.035,config.guiOffset) || 0.035;								 						 
	if(config.keys){
		KeyBinding.loadArray(config.keys);
	}
	if(config.windowed && Control.checkFullScreen() || !config.windowed && !Control.checkFullScreen()){
		Control.fullScreen()
	}	
	if(config.scrollSpeed){Control.scroll_speed = config.scrollSpeed; 
	}
	if(config.scrollSpeedArrows){Control.scroll_speed_arrows = config.scrollSpeedArrows;
	}
}

function callback_borington(){
	var win = window.open('http://www.facebook.com/boringtonproductions/', '_blank');
	if (win) {
		win.focus();
	} else {
		alert('Popup blocked');
	}
}
function callback_discord(){
	var win = window.open('https://discord.com/channels/744543799677812831/744543799677812834', '_blank');
	if (win) {
		win.focus();
	} else {
		alert('Popup blocked');
	}
}
function callback_portal(){
	if(game_portal == "armor"){
		var win = window.open('http://armor.ag/MoreGames', '_blank');
	}else if(game_portal == "crazy"){
		var win = window.open('https://www.crazygames.com/', '_blank');
	}else if(game_portal == "ng"){
		var win = window.open('https://borington.newgrounds.com/games', '_blank');
	}
	
	if (win) {
		win.focus();
	} else {
		alert('Popup blocked');
	}
}

function callback_portal_fb(){
	if(game_portal == "armor"){
		var win = window.open('http://www.facebook.com/ArmorGames', '_blank');
	}else if(game_portal == "crazy"){
		var win = window.open('https://www.facebook.com/crazygamesofficial/', '_blank');
	}
	
	if (win) {
		win.focus();
	} else {
		alert('Popup blocked');
	}
}

function callback_steam(){
	var win = window.open('https://store.steampowered.com/app/2002610/Delilah/', '_blank');
	if (win) {
		win.focus();
	} else {
		alert('Popup blocked');
	}
}
function callback_rum(){
	var win = window.open('https://store.steampowered.com/app/1210800/Rum__Gun/', '_blank');
	if (win) {
		win.focus();
	} else {
		alert('Popup blocked');
	}
}

//var intro_video = document.getElementById("intro_video");
//if(game_portal != "armor"){
//    intro_video.parentNode.removeChild(intro_video);
//} 
function PlayButtonClicked(){	
	if(game_portal == "armor"){
		intro_video.play();
		intro_video.onclick = callback_portal;
		document.getElementById("playbutton").style.display = "none";
		setTimeout(Video_End, 5800);
	}else{
		Game_Init();
	}	
}
function Video_End(){
	intro_video.src =""; // empty source
	intro_video.load();
	intro_video.style.display = "none";
	intro_video.parentNode.removeChild(intro_video);
	Game_Init();
}

Gamestats.LevelNames=[
"I - Central Station",
"II - Plaza Spree",
"III - Blood Haven",
]
Gamestats.LevelPaths=[
"maps/station.txt",
"maps/spooky.txt",
"maps/map1.txt",
]
function InitBriefings(){
	Gamestats.Story = 
	" It's been more than a century since the invasion. Earth is divided between the Liberated Human Nations \
	and the Governments of Hell. You were born and raised in such a land, the Infernal Circle of Transylvania.\n\
	Thanks to your talents in the dark arts, you got a job as an Enforcer; a rarity for a human. \
	One day, your team was preparing a raid on the notorious Blackblood Gang...";
	Gamestats.Epilogue = "You survived, for now..." 
	
Gamestats.DemoText = 
"Thank you for playing Darkraid: Delilah\n\
Don't forget to wishlist the sequel, Delilah, on Steam!\nThe game will include:\n\
- 30 levels across 7 unique episodes\n\
- Two playable main characters\n\
- Many more weapons\n\
- Dozens of monsters types\n\
- More difficulty modes\n\
- Map editor\n\n\n\n\
Want to support the developer? Check out our other games, Rum & Gun and BlackChain!";

Gamestats.Briefings = [];
}