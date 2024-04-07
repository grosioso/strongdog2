
function DoodadPrototype( _id_custom, _name, _ref){
	if(_ref != null && _ref !== void 0){
		Object.assign(this, _ref);
	}else{
		this.actor_constructor = Actor.DoodadActor;
		this.cull_backfacing = true;
		this.model = Asset.model.cube;
		this.texture = Asset.texture.white;
		this.shader = ShaderProgram.standard_shadowedShader;
		this.shadowShader = ShaderProgram.shadowShader;
		this.hasShadow = false;
		this.randomRotation = true;
		this.snapToGrid = false;
		this.snapToAngle = false;
		this.collision_radius = 0.5;
		this.individual_windphase_strength = 0.5; //large scale individual wind. Will be weighted by windEffect
		this.windEffect = 0.4; //large scale wind strength
		this.floatingEffect = 1;
		this.floatingRadius = 0.5; 
		this.submergeZ = 0;
		this.boidMotionSpeed = 1;
		this.shadowZOffset = 0;
		this.alphaTreshold = 0.5;
		this.animFrame = 0;
		this.animCollection = null;
		this.randomScale = 0;
		this.scale = 1;
		this.textureVariations = null;
		this.modelVariations = null;
		this.lastTextureVariation = 0;
		this.lastModelVariation = 0;
		
		this.bounding_box_width_hittest = 1;
		this.bounding_box_height_hittest = 1;
		
		this.hasHelperActor = false;
		this.helperModel = Asset.model.dummy;
		this.bendStrength = 0;
		this.bendNearPlayer = false;
		this.minimapColor = null;
		this.rope_fixedTextureLength=true;
		this.sprite_face_camera = true;
		this.hidden_in_water = false;
		this.veryBig = false; //if true, uses different visibility check
		//this.minimapSize = 1; //number of nodes occupied by object
		this.rotXName = "RotX";
		this.rotYName = "RotY";
		this.collider_mesh = false;
		this.inherit_floor_color = true;
		
		this.contained_in_selection = false;
		this.spriteSize = [1,1];
	}
	
	this.name = _name;
	this.id_lut = _id_custom;
	for(var i=0;i<DoodadPrototype.Types.length;++i){
		if( DoodadPrototype.Types[i].id_lut == this.id_lut){
			console.warn("Unresolved id_custom collision at DoodadPrototype #"+ 
			this.id_lut + " " + this.name +" #"+ DoodadPrototype.Types[i].id_lut + " " + DoodadPrototype.Types[i].name);
		}
	}
	
	this.id = DoodadPrototype.Types.length;
	DoodadPrototype.Types.push(this);
	this.isDoodadPrototype = true;
}
DoodadPrototype.Types = [];
DoodadPrototype.LUT = [];
DoodadPrototype.getNewLUT = function(){
	var lut = [];
	for(var i=0;i<this.Types.length;++i){
		lut[i] = this.Types[i].id_lut;
	}
	return lut;
}

//saved array ids might not match with current array ids, but custom ids MUST not change during dev
//basically we are loading in the custom/automatic id pairings from a map of an older version
DoodadPrototype.decodeLUT = function(lut){
	if(lut == undefined){
		DoodadPrototype.LUT = DoodadPrototype.Types.slice();
		return;
	}
	
	var types = [];
	for(var i=0;i<lut.length;++i){ //the nth cell marks the custom id of the doodad with saved array id n
		for(var j=0;j<this.Types.length;++j){
			if(this.Types[j].id_lut == lut[i]){
				types[i] = this.Types[j];
			}
		}
	}
	DoodadPrototype.LUT = types;
}

DoodadPrototype.Initialize = function(){
	var at = Asset.texture;
	var am = Asset.model;
	
	d = new DoodadPrototype(1,"DEPRECATED", null);
	d.scale = 1;
	//d.modelVariations = [Asset.model.coll_test,Asset.model.coll2,Asset.model.coll3]
	d.actor_constructor = Actor.PlatformActor;
	//d.model = Asset.model.coll_test;
	d.shader = ShaderProgram.doomShader;
	d.shadowShader = ShaderProgram.shadow_full_rotationShader;
	
	DoodadPrototype.BuilderMesh = d = new DoodadPrototype(2,"BuilderMesh",null);
	d.scale = 1;
	d.actor_constructor = Actor.BuilderActor;
	d.shader = ShaderProgram.doomShader;
	d.randomRotation = false;
	Editor.Objects[1].push(d);
	
	/*DoodadPrototype.Caution = d = new DoodadPrototype(2,"Caution", null);
	d.modelVariations = [am.caution1, am.caution2];
	d.scale = 0.6;
	d.hasShadow = false;
	d.texture = Asset.texture.caution
	d.actor_constructor = Actor.DoodadActor;
	Editor.Objects[1].push(d);*/
	
	d = new DoodadPrototype(3,"Shrub", null);
	d.model = Asset.model.sprite;
	d.scale = 1;
	d.textureVariations = [at.doodad_shrub, at.doodad_tree];
	d.shader = ShaderProgram.spriteShader;
	d.actor_constructor = Actor.DoodadActor;
	Editor.Objects[1].push(d);
	
	d = DoodadPrototype.Nub = new DoodadPrototype(4,"StreetNub", d);
	d.model = Asset.model.sprite_4x1;
	d.textureVariations = null;
	d.scale = 1;
	d.texture = Asset.texture.doodad_street;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(18,"Lamp_med", d);
	d.texture = Asset.texture.doodad_lamp;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(6,"Trashbin", d);
	d.texture = Asset.texture.doodad_bin;
	d.model = Asset.model.sprite_2x1;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(7,"Hanged", d);
	d.texture = at.doodad_hanged;
	d.textureVariations = [at.doodad_hanged, at.doodad_impaled, at.doodad_impaled2, at.doodad_impaled3];
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(8,"Thuja", d);
	d.texture = at.doodad_thuja;
	d.textureVariations = null;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(21,"Chimney", d);
	d.texture = at.doodad_chimney;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(12,"Anointed", d);
	d.texture = at.doodad_anointed;
	d.scale = 8;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(15,"Statue", d);
	d.texture = at.doodad_statue;
	d.textureVariations = [at.doodad_statue, at.doodad_statue_demon];
	d.scale = 2;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(9,"Smallstuff", d);
	d.textureVariations = [at.doodad_small1, at.doodad_small2, at.doodad_small3, at.doodad_melon, at.doodad_clock, at.doodad_small4];
	d.scale = 0.25;
	d.model = am.sprite;
	Editor.Objects[1].push(d);
	
	DoodadPrototype.Chandelier = d = new DoodadPrototype(10,"Chandelier", d);
	d.textureVariations = [at.doodad_chandelier];
	d.scale = 1;
	d.model = am.sprite;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(11,"Neon", d);
	d.model = Asset.model.sprite_1x2;
	d.scale = 1;
	d.animCollection = Anim.Empty;
	d.spriteSize = Actor.SpriteSize_1x1;
	d.textureVariations = [at.doodad_neon, at.doodad_neon2];
	d.sprite_face_camera = false;
	d.inherit_floor_color = false;
	d.cull_backfacing = false;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(5,"Posters", d);
	d.model = Asset.model.sprite_2x1;
	d.textureVariations = [at.doodad_poster1, at.doodad_poster2, at.doodad_poster3];
	d.inherit_floor_color = true;
	d.cull_backfacing = true;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(19,"Signs", d);
	d.model = Asset.model.sprite_1x2;
	d.scale = 0.5;
	d.textureVariations = [at.doodad_sign1, at.doodad_sign2, at.doodad_sign3, at.doodad_sign4, at.doodad_sign5];
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(22,"Signs Vertical", d);
	d.textureVariations = [at.doodad_sign_vertical1];
	d.model = Asset.model.sprite_4x1;
	d.scale = 2;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(13,"Fire", DoodadPrototype.Chandelier);
	d.texture = at.doodad_fire;
	d.model = Asset.model.sprite;
	d.scale = 0.5;
	d.animCollection = Anim.FireAnim;
	d.spriteSize = [0.25,1];
	d.textureVariations = [at.doodad_fire, at.doodad_fire2];
	d.inherit_floor_color = false;
	Editor.Objects[1].push(d);
	
	d = DoodadPrototype.Candle = new DoodadPrototype(17,"Candle", d);
	d.texture = at.doodad_candle;
	d.scale = 0.25;
	d.model = am.sprite_2x1;
	d.spriteSize = [1,0.5];
	d.textureVariations = null;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(14,"Punks", d);
	d.texture = at.band;
	d.scale = 1;
	d.textureVariations = null;
	d.inherit_floor_color = true;
	d.model = am.sprite;
	d.spriteSize = Actor.SpriteSize_8x8;
	d.modelVariations = [Anim.PunkGuitarAnim, Anim.PunkBassAnim,Anim.PunkDrumAnim,Anim.DancerAnim,Anim.Punk1Anim,Anim.Punk2Anim,Anim.PunkChomperAnim];
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(32,"LIGHT",null);
	d.actor_constructor= Actor.LampActor;
	d.model = Asset.model.trigger_alert;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(34,"Tint",d);
	d.scale = 1;
	d.texture = at.tint_gradient;
	d.textureVariations = [at.tint_gradient,at.tint_gradient2,at.tint_gradient3];
	d.shader = ShaderProgram.multiplyShader;
	Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(16,"black", null);
	d.texture = at.black;
	d.shader = ShaderProgram.standard_shadowedShader;
	d.model = am.beacon;
	d.shadowShader = ShaderProgram.shadowShader;
	//d.veryBig = true;
	d.hasHelperActor = true;
	d.helperModel = am.dummy;
	Editor.Objects[1].push(d);

	/*d = new DoodadPrototype(28,"Rotor", d);
	d.modelVariations = null;
	d.shader = ShaderProgram.standard_full_rotationShader;
	d.shadowShader = ShaderProgram.shadow_full_rotationShader;
	d.actor_constructor = Actor.RotatingDoodad;
	Editor.Objects[1].push(d);*/
	
	/*DoodadPrototype.Nebula = d = new DoodadPrototype(19,"Nebula", DoodadPrototype.Hose);
	d.modelVariations = [am.water];
	d.randomScale = 0;
	d.scale = 1;
	d.shader = ShaderProgram.backgroundShader;
	d.textureVariations = [at.nebula ];
	d.hasShadow = false;
	d.hasHelperActor = true;
	d.helperModel = am.water;
	d.actor_constructor = Actor.BackgroundActor;
	Editor.Objects[1].push(d);*/

	
	/*d = new DoodadPrototype(105,"waterDoodad", null);
	d.texture = at.waternorm;
	d.model = am.water;
	d.modelVariations = null; d.textureVariations = null;
	d.hasShadow = false;
	d.scale = 1;
	d.shader = ShaderProgram.waterShader;
	d.hidden_in_water = true;
	Editor.Objects[1].push(d);*/
	
	d = new DoodadPrototype(45,"ELEVATION", null);
	d.actor_constructor = Actor.ElevationActor;
	d.shader = ShaderProgram.standard_no_specShader;
	d.texture = at.fireball;
	d.hasShadow = false;
	d.snapToGrid = true;
	Editor.Objects[2].push(d);
	DoodadPrototype.Elevation = d;
	
	DoodadPrototype.TriggerCircle = d = new DoodadPrototype(46,"Trigger Circle", d);
	d.actor_constructor = Actor.TriggerCircle;
	d.texture = at.white;
	d.snapToGrid = false;
	d.shader = ShaderProgram.tintedShader;
	d.model = am.spawntrigger;
	d.rotXName="TriggerID";
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(47,"Patrol Point", d);
	d.actor_constructor = Actor.TriggerPatrolPoint;
	d.model = am.trigger_patrol;
	d.hasHelperActor = false;
	Editor.Objects[2].push(d);
	
	DoodadPrototype.TriggerSpawnArea = d = new DoodadPrototype(48,"Spawner Circle", d);
	d.actor_constructor = Actor.TriggerSpawnArea;
	d.hasHelperActor = true;
	d.model = am.spawnsource;
	Editor.Objects[2].push(d);
	
	DoodadPrototype.EndlessSpawnArea = d = new DoodadPrototype(42,"Endless Spawner", d);
	d.actor_constructor = Actor.EndlessSpawnArea;
	//d.hasHelperActor = false;
	Editor.Objects[2].push(d);
	
	d = DoodadPrototype.AlertArea = new DoodadPrototype(49,"Alert Circle", d);
	d.actor_constructor = Actor.TriggerEffectArea;
	d.hasHelperActor = false;
	d.model = am.trigger_alert;
	Editor.Objects[2].push(d);

	DoodadPrototype.TriggerMessagePoint = d = new DoodadPrototype(51,"Speech Point", DoodadPrototype.AlertArea);
	d.actor_constructor = Actor.TriggerMessagePoint;
	d.hasHelperActor = false;
	d.model = am.trigger_message;
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(77,"Exit Area", d);
	d.actor_constructor = Actor.TriggerBeacon;
	d.shader = ShaderProgram.waveShader;
	d.texture = at.beacon;
	d.model = am.beacon;
	d.scale = 2;
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(67,"POI (AI Resource)", DoodadPrototype.TriggerCircle);
	d.actor_constructor = Actor.POI;
	d.shader = ShaderProgram.waveShader;
	d.rotXName = "ID";
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(52,"Water", null);
	d.actor_constructor = Actor.WaterActor;
	d.model = am.water;
	d.hasShadow = false;
	d.scale = 1;
	d.texture = at.waternorm;
	d.shader = ShaderProgram.waterShader;
	//d.shadowShader = ShaderProgram.shadowShader;
	d.snapToGrid = true;
	DoodadPrototype.water = d;
	//Editor.Objects[1].push(d);
	
	d = new DoodadPrototype(70,"Decal_Multiply", null);
	d.actor_constructor = Actor.DecalSpawner;
	d.hasShadow = false;
	d.texture = at.waternorm;
	d.textureVariations = [at.blood, at.scorch, at.blood_small, at.blood2_small];
	d.shader = ShaderProgram.decalShader;
	d.model = am.spawntrigger;
	d.rotXName = "Cutoff";
	d.rotYName = "Opacity";
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(71,"Decal_Cutout", d);
	d.shader = ShaderProgram.roadShader;
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(72,"Decal_Puddle", d);
	d.shader = ShaderProgram.puddleShader;
	d.textureVariations = [at.puddle,at.marble,at.black];
	d.scale = 2;
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(74,"ProjectileObstacle", null);
	d.shader = ShaderProgram.standard_no_specShader;
	d.texture = at.fireball;
	d.actor_constructor = Actor.ProjectileObstacle;
	d.hasShadow = false;
	d.model = am.obstacle;
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(96,"PressureObstacle", null);
	d.shader = ShaderProgram.standard_no_specShader;
	d.texture = at.white;
	d.actor_constructor = Actor.PressureObstacle;
	d.hasShadow = false;
	d.model = am.obstacle;
	d.rotXName = "Strength";
	Editor.Objects[2].push(d);

	d = new DoodadPrototype(114,"Camera Point", d);
	d.actor_constructor = Actor.CameraPoint;
	d.model = am.camera;
	d.texture = at.white;
	d.shader = ShaderProgram.tintedShader;
	d.shadowShader = ShaderProgram.shadowShader;
	d.rotXName = "ID";
	d.rotYName = "Pitch";
	DoodadPrototype.CameraPoint = d;
	Editor.Objects[2].push(d);
	
	DoodadPrototype.StartLocation = d = new DoodadPrototype(20,"Start Location", d);
	d.actor_constructor = Actor.TriggerBaseActor;
	d.hasShadow = false;
	d.texture= Asset.texture.cyan;
	d.model = am.dummy;
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(80,"ReflectionProbe", null);
	d.shader = ShaderProgram.standard_no_specShader;
	d.texture = at.white;
	d.actor_constructor = Actor.ReflectionProbe;
	d.hasShadow = false;
	d.model = am.spawntrigger;
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(108,"ReflectedCliff", null);
	d.shader = ShaderProgram.standard_no_specShader;
	d.texture = at.black;
	d.actor_constructor = Actor.ReflectedDoodad;
	d.hasShadow = false;
	d.hasHelperActor = true;
	d.scale = 1;
	d.randomScale = 0;
	d.model = am.barrel; d.helperModel = d.model;
	d.textureVariations = [at.black, at.black,at.cliff1]
	d.modelVariations = [am.unitshadow, am.cliff_arch3,am.reflected_cliff];
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(27,"Nebula_reflected", DoodadPrototype.Nebula);
	d.actor_constructor = Actor.ReflectedBackground;
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(109,"ReflectedLight", d);
	d.shader = ShaderProgram.waveShader;
	d.texture = at.white;
	d.textureVariations = null;
	d.modelVariations = [am.cliff_arch3];
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(123,"ShadowDummy", DoodadPrototype.CameraPoint);
	d.shader = ShaderProgram.standard_no_specShader;
	d.texture = at.invisible;
	d.actor_constructor = Actor.DoodadActor;
	d.hasShadow = true;
	d.modelVariations = null;
	d.model = am.cliff_arch3;
	d.veryBig = true;
	d.hasHelperActor = true;
	d.helperModel = am.cliff_arch3;
	d.shadowShader = ShaderProgram.shadowShader;
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(33,"ShadowFan", d);
	d.actor_constructor = Actor.RotatingDoodad;
	d.model = am.rotor;
	d.veryBig = false;
	d.helperModel = d.model;
	Editor.Objects[2].push(d);
	
	d = new DoodadPrototype(92,"FogLevel", null);
	d.shader = ShaderProgram.standard_no_specShader;
	d.texture = at.white;
	d.actor_constructor = Actor.FogLevelActor;
	d.hasShadow = false;
	d.model = am.trigger_gate;
	Editor.Objects[2].push(d);

}

DoodadPrototype.loadInstance = function(instData){
	if(this.LUT[instData[0]] == undefined){
		return;
	}
	var type = this.LUT[instData[0]];
	if(instData[8] ==undefined){instData[8]=0;}
	if(instData[9] ==undefined){instData[9]=0;}
	type.lastTextureVariation = instData[8];
	type.lastModelVariation = instData[9];
	
	var d = DoodadPrototype.Create( instData[1]+M.loadX, instData[2]+M.loadY, type, null, instData[3]);
	d.z = instData[3];
	if(d.setDoodadLoadData != undefined){
		d.setDoodadLoadData(instData);
	}else{
		d.rotX = instData[4];
		d.rotY = instData[5];
		d.rotZ = instData[6];
		d.scale = instData[7];
	}
	
	if(d.getInfoText != undefined){GUI.AddInfoText(d)};
	if(d.afterLoad != undefined){
		d.afterLoad();
	}
}

DoodadPrototype.Create = function(x, y, proto, cursor, loadZ){
	if(cursor === undefined || cursor == null || cursor.getCopy == undefined){
		var a = proto.actor_constructor(proto);
	}else{
		var a = cursor.getCopy();
	}
	a.proto = proto;
	
	var placeZ = 0;
	if(a.floating == true){
		placeZ = Environment.waterZ - proto.submergeZ;
	}else{
		if(Editor.followWallZ == true){
			placeZ = Math.max(M.terrain.getHeightAt(x, y), Pathfinder.getNodeAt_Robust(x, y).wallZ);
		}else{
			placeZ = NavNode.get_floor_z(x, y, 10);
		}
	}
	if(proto.snapToGrid == false){
		a.moveTo(x,y, placeZ);
	}else{
		a.moveTo(Math.floor(x)+0.5,Math.floor(y)+0.5,placeZ);
	}
	
	if(proto == DoodadPrototype.BuilderMesh){
		a.model = BuilderModel.Create();
		a.model.makeGeometry();
		BuilderModel.set_active(a);
	}
	/*if(loadZ && loadZ < Environment.doodad_partitioning_z_limit){
		a.partitioned = false;
	}*/
	//for triggers, spawners, waveSpawners, all things that should not be partitioned
	Actor.addToWorld(a);
	//if(a.collider_mesh){
	//	if(a.model.
	//}
	
	
	if(a.hidden_ingame == true || a.triggerId!=undefined){
		a.nodraw = !Render.drawEditorHelpers && !Render.alwaysDrawSpawners;
	}
	
	if(Control.gameState == Control.gameState_inEditor && a.hasHelperActor == true){
		var helper = Actor.EditorActor(a);
		Actors.push(helper);
	}
	
	if(a.lightsource != null){
		LightDecals.push(a.lightsource);
	}

	return a;
}

