var Asset = new Object();
Asset.numAssets = 0;
Asset.numLoadedFiles = 0;
Asset.keepModelData = false; 
//set to true if you want to compress .dud files
//should be false in launch version
 
Asset.model = new Object();
Asset.model.notfound = null;
Asset.ModelQueue = [];
Asset.texture = new Object();
Asset.sound = new Object();
var WALL = new Object();
Asset.mapFormat = 'txt';

function TextureAsset(){
	this.img = null;
	this.name = null;
	this.loaded = false;
	this.isTiled = false;
	this.essential = false;
	this.buffer = null;
	this.img_processed = false;
	this.width = 0;
	this.height = 0;
	this.sortId = 0;
	this.nearest_neighbor = false;
	this.debrisTexture = this;
	this.decal_transparency = false;
	this.terrainOcclusion = 1.;
	this.placeholderBuffer = TextureAsset.placeholderBuffer;
	this.originalBuffer = null;
	this.isRuntime = false;//e.g. for Steam workshop map icons 
	this.channels = 4;//rgba is default
	this.animSpeed = 10;
	this.matId = 0;
	this.animSource = null;
	this.triggered_version = null; //used for switches
	this.ignore_raycast = false;
	this.floor_damage = 0;
	this.no_vertical_tiling = false; //used for linedef mid textures (railings, hanging thingys)
}

TextureAsset.prototype.generate_team_colors = function(mask){
	this.team2 = TextureAsset.CreateVariant(this,175,1,0.6, mask);
	this.team3 = TextureAsset.CreateVariant(this,-40,1.2,0.6, mask);
	this.team0 = TextureAsset.CreateVariant(this,140,0.2,0.75, mask);
	this.team4 = TextureAsset.CreateVariant(this,50,1,0.9, mask);
	
	this.team5 = TextureAsset.CreateVariant(this,-85,0.8,0.5, mask);
	this.team6 = TextureAsset.CreateVariant(this,-20,1.3,0.8, mask);
	//this.team7 = TextureAsset.CreateVariant(this,140,0.1,0.1, mask);
	this.team7 = TextureAsset.CreateTintVariant(this,[0,0.05,0.1], mask);
	this.team8 = TextureAsset.CreateVariant(this,140,1,0.7, mask);
}

TextureAsset.prototype.getTeamVariant = function(id){
	switch(id){
		case 0:return this.team0||this;
		case 1:return this;
		case 2:return this.team2||this;
		case 3:return this.team3||this;
		case 4:return this.team4||this;
		case 5:return this.team5||this;
		case 6:return this.team6||this;
		case 7:return this.team7||this;
		case 8:return this.team8||this;
		default:return this;
	}
}

TextureAsset.prototype.reload = function(){
	if( !this.name){return;}
	this.img_processed = false;
	var img = new Image();
	img.tex = this;
	this.img = img;
	img.onload = function(){
		initTexture(this.tex, this.tex.isTiled);
	}
	img.src = 'textures/'+this.name;
	//return this;
}


TextureAsset.CreateVariant = function(source, hue, sat, lum, mask){
	if(lum == void 0){ lum = 1;}
	var tex = new TextureAsset();
	tex.isTiled = source.isTiled;
	tex.nearest_neighbor = source.nearest_neighbor;
	new TexOpHS(tex,source, hue ,sat, lum, mask);
	Textures.push(tex);
	tex.sortId = Textures.length;
	return tex;
}
TextureAsset.CreateTintVariant = function(source, tint, mask){
	var tex = new TextureAsset();
	tex.isTiled = source.isTiled;
	new TexOpTint(tex,source,tint,mask);
	Textures.push(tex);
	tex.sortId = Textures.length;
	return tex;
}

TextureAsset.CreateEmpty = function(){
	var tex = TextureAsset();
	Textures.push(tex);
	return tex;
}

TextureAsset.placeholderBuffer = new Uint8Array([150,150,150,255])
TextureAsset.TextureOperationQueue = [];
TextureAsset.allLoaded = false;

TextureAsset.loop = function(){
	if(this.allLoaded == false){
		var notAllLoaded = false;
		for(var i=0;i<Textures.length;++i){
			if(Textures[i].loaded != true){
				notAllLoaded = true;
				break;
			}
		}
		if(notAllLoaded == false){
			this.allLoaded = true;
			M.terrain.create_blendTexture();
			M.terrain.update_blendTexture();
		}
	}
	if(this.TextureOperationQueue.length > 0){
		for(var i=this.TextureOperationQueue.length-1;i>=0;--i){
			if(this.TextureOperationQueue[i].attemptOperation() == true){
				this.TextureOperationQueue.splice(i,1);
			}
		}
		if(this.TextureOperationQueue.length <= 0){
			M.terrain.create_blendTexture();
			M.terrain.update_blendTexture();
		}
	}
}
TextureAsset.InitTerrainTextures = function(){
	/*Asset.texture.terrain_rock.terrainOcclusion = 0.8;
	//Asset.texture.terrain_grass.debrisTexture = Asset.texture.terrain_darkDirt;
	Asset.texture.terrain_cobble.terrainOcclusion = 0.;
	Asset.texture.terrain_grass.terrainOcclusion = 0.;
	
	new TexOpChannelSwap(Asset.texture.terrain_darkDirt,Asset.texture.terrain_darkDirt, Asset.texture.terrain_mask_1,3,0, false);
	new TexOpChannelSwap(Asset.texture.terrain_grass,Asset.texture.terrain_grass, Asset.texture.terrain_mask_1,3,1, false);
	new TexOpChannelSwap(Asset.texture.terrain_sand,Asset.texture.terrain_sand, Asset.texture.terrain_mask_1,3,2, false);
	new TexOpChannelSwap(Asset.texture.terrain_cobble,Asset.texture.terrain_cobble, Asset.texture.terrain_mask_2,3,0, false);
	new TexOpChannelSwap(Asset.texture.terrain_rock,Asset.texture.terrain_rock, Asset.texture.terrain_mask_2,3,1, false);*/
}

//used for tileset texture variation
function TexGroup(_list){
	this.list = _list;
	this.hue = 0;
	this.sat = 1;
	this.lum = 1;
	this.update = function(hsl){
		if(hsl == null || hsl == undefined){
			this.reset();
			return;
		}
		if(hsl[0]==this.hue && hsl[1]== this.sat && hsl[2]==this.lum){
			return;
		}
		this.hue = hsl[0];
		this.sat = hsl[1];
		this.lum = hsl[2];
		for(var i=0;i<this.list.length;++i){
			new TexOpHS(this.list[i],this.list[i],hsl[0],hsl[1],hsl[2])
		}
	}
	this.getHSL = function(){
		return [this.hue,this.sat,this.lum];
	}
	this.reset = function(){
		this.hue = 0;
		this.sat = 1;
		this.lum = 1;
		for(var i=0;i<this.list.length;++i){
			this.list[i].buffer = this.list[i].originalBuffer;
		}
	}
}

function TexOpChannelSwap(destination, colorAsset, specAsset,channel, maskChannel, multiply){
	this.colorAsset = colorAsset; this.specAsset = specAsset; this.channel = channel;
	this.maskChannel = maskChannel; this.multiply = multiply; this.destination = destination;
	destination.img = colorAsset.img;
	this.attemptOperation = function(){
		if(this.colorAsset.loaded == true && this.specAsset.loaded == true){
			this.destination.height = this.colorAsset.height;
			this.destination.width = this.colorAsset.width;	
			
			this.destination.buffer = replaceTextureChannel(this.colorAsset, this.specAsset, this.channel, this.maskChannel, this.multiply);
			this.destination.originalBuffer = this.destination.buffer;
			return true;
		}
		return false;
	}
	if(this.attemptOperation() == false){
		TextureAsset.TextureOperationQueue.push(this);
	}
}

function TexOpHS(destination, source, hue, sat, lum, mask){
	this.destination = destination; this.source = source;
	this.hue = hue; this.sat = sat; this.lum = lum
	this.mask = mask || null;
	if(!destination || !source){
		return;
	}
	destination.img = source.img;
	this.attemptOperation = function(){
		if(this.source.loaded == true){
											  
			this.destination.height = this.source.height;
			this.destination.width = this.source.width;								
																
			this.destination.buffer = textureHSL(this.source, this.hue, this.sat, this.lum, this.mask);
			this.destination.loaded = true;
			if(M.tileset.indexOf(destination) >= 0){
				Render.force_terrain_texture_update();
			}
			return true;
		}
		return false;
	}
	if(this.attemptOperation() == false){
		TextureAsset.TextureOperationQueue.push(this);
	}
}

function TexOpTint(destination, source, tint, mask){
	this.destination = destination; this.source = source;
	this.mask = mask; this.tint = tint;
	destination.img = source.img;
	this.attemptOperation = function(){
		if(this.source.loaded == true && this.mask.loaded == true){
											  
												
																
  
			this.destination.buffer = textureMaskTint(this.source, this.tint, this.mask);
			this.destination.loaded = true;
			return true;
		}
		return false;
	}
	if(this.attemptOperation() == false){
		TextureAsset.TextureOperationQueue.push(this);
	}
}
function UpdateTexGroup(group,h,s,l){
	for(var i=0;i<group.length;++i){
		new TexOpHS(group[i],group[i],h,s,l);
	}
}

var Images = [];
var Sounds = [];
var Models = [];
var Textures = [];

Asset.importOBJ = function(filename, hasVertexColor, notEssential){
	if(DEVMODE == false){
		return Asset.queueModelImport(filename, hasVertexColor);
	}
	var model = new Model3d(hasVertexColor);
	Models.push(model);
	if(notEssential === void 0){
		notEssential = false;
	}
	if(notEssential != true){this.numAssets ++}
	//hardcoded for length 3
	model.name = filename;
	filename = 'models/'+filename+'.dud';
	var fileRequest = new XMLHttpRequest();
	fileRequest.open("GET",filename);
	fileRequest.onloadend = function(){
		convertOBJ(fileRequest.response,model);
		model.createBackupBuffers();
		Model3d.getBounds(model);
		model.waitingForLoad = false; 
		if(notEssential == true){
			initBuffers(model);
		}else{
			fileLoaded();
		}
	};
	fileRequest.send();
	return model;
}

Asset.importBOR = function(filename, hasVertexColor, notEssential){
	if(DEVMODE == false){
		return Asset.queueModelImport(filename, hasVertexColor);
	}
	var model = new Model3d(hasVertexColor);
	Models.push(model);
	if(notEssential === void 0){
		notEssential = false;
	}
	if(notEssential != true){this.numAssets ++}
	model.name = filename;
	filename = 'models/'+filename;
	var fileRequest = new XMLHttpRequest();
	fileRequest.open("GET",filename);
	fileRequest.onloadend = function(){
		convertSuperDUD(fileRequest.response,model);
		model.createBackupBuffers();
		Model3d.getBounds(model);
		model.waitingForLoad = false; 
		if(notEssential == true){
			initBuffers(model);
		}else{
			fileLoaded();
		}
	};
	fileRequest.send();
	return model;
}

Asset.importModelBulk = function(){
	var fileRequest = new XMLHttpRequest();
	this.numAssets ++;
	fileRequest.open("GET","models.json");
	fileRequest.onloadend = function(){
		var data = JSON.parse(fileRequest.response);
		Asset.modelData = data;
		for(var i=0;i<Asset.ModelQueue.length;++i){
			var model = Asset.ModelQueue[i];
			convertSuperDUD(data[model.name],model);
			model.createBackupBuffers();
			Model3d.getBounds(model);
			model.waitingForLoad = false;
			initBuffers(model);
		}
		fileLoaded();
		Asset.ModelQueue = [];
		Asset.modelData = null;
	};
	fileRequest.send();
}

Asset.queueModelImport = function(filename, hasVertexColor){
	var model = new Model3d(hasVertexColor);
	Models.push(model);
	Asset.ModelQueue.push(model);
	//hardcoded for length 3
	model.name = filename;
	return model;
}

Asset.reloadModel = function(model){
	if(DEVMODE == false){
		return; //not supported in release mode
	}
	filename = 'models/'+model.name+'.dud';
	var fileRequest = new XMLHttpRequest();
	fileRequest.open("GET",filename);
	fileRequest.onloadend = function(){
		model.vertsArray = [];
		model.normsArray = [];
		model.texCoords = [];
		model.vertColors = [];
		model.fverts = [];
		model.fnorms = [];
		model.fcolors = [];
		model.ftexCoords = [];
		model.frameTimes = [];
		model.numVerts = 0;
		model.numFrames = 1;
		model.numFaces = 0;
		model.numNorms = 0;
		model.numVertColors = 0;
		model.numTexCoords = 0;
	
		convertOBJ(fileRequest.response, model);
		model.createBackupBuffers();
		Model3d.getBounds(model);
		initBuffers(model);
	};
	fileRequest.send();
	return model;
}

Asset.importSound = function(filename){
	this.numAssets ++;
	pathname = 'sounds/'+filename;
	var sound = new Howl({src: [pathname],
		onload:fileLoaded()
	});
	
	Sounds.push(sound);
	sound.name = filename;
	sound.src = pathname;
	return sound;
}

Asset.importStory = function(filename){
	var sound = Asset.importSound(filename);
	SoundObject.Voices.push(sound);
	return sound;
}

//runtime textures are not stored, they can be loaded at any time from anywhere
Asset.importTexture = function(filename, tiled, nearest_neighbor, runtime , essential){
	if(essential === void 0){
		essential = false;
	}
	if(!DESKTOP_VERSION){essential = true;}
	
	var img = new Image();
	var tex = new TextureAsset();
	tex.name = filename;
	tex.img = img;
	tex.isRuntime = runtime;
	tex.nearest_neighbor = false || nearest_neighbor;

	if(!runtime){
		var pathname = 'textures/'+filename;
		Textures.push(tex);
		tex.sortId = Textures.length;
		tex.essential = essential;
		if(essential == true){this.numAssets ++;}
	}else{
		var pathname = filename;
		tex.essential = false;
	}
	
	img.onload = function(){
		tex.width = this.width;
		tex.height = this.height;
		tex.loaded = true;
		if(tex.essential == true){
			fileLoaded();
		}
		initTexture(tex, tex.isTiled);
	};
	
	img.onerror = function(e){
		tex.loaded = true;
		if(tex.essential == true){
			fileLoaded();
		}
		initTexture(tex, tex.isTiled);
	}
	img.src = pathname;
	
	tex.isTiled = tiled;
	return tex;
}

Asset.importWall = function(filename){
	var tex = Asset.importTexture(filename, true, true);
	tex.matId = Asset.MATERIALS.length;
	Asset.MATERIALS.push(tex);
	return tex;
}

Asset.importMap = function(filename, injectPos){
	var fileRequest = new XMLHttpRequest();
	fileRequest.open("GET",filename);
	fileRequest.onloadend = function(){
		var string = fileRequest.response;
		//try{
			data = JSON.parse(string);
			if(injectPos){
				M.injectMap(data, injectPos[0],injectPos[1]);
			}else{
				M.filename = filename;
				M.loadMap(data);
			}
			
			Control.UnlockGame();
		/*}catch(err){
			GUI.Alert("Invalid map file. Going Back to menu");
			Asset.importMap("maps/menu.txt");
		}*/
	};
	fileRequest.onerror = function(){
		GUI.Alert("Missing map file. Going Back to menu");
		Asset.importMap("maps/campaign/menu.txt");
	}
	fileRequest.send();
	if(!Gamestats.INIT){
		GUI.Reset();
		GUI.AddOverlayText("Loading").opacity = 1;
		draw();
	}
	Net.mapImport(filename);
	Control.LockGame();
}

//DESKTOP version only
Asset.importSaveGame = function(filename){
	var fileRequest = new XMLHttpRequest();
	fileRequest.open("GET","savegames/"+filename);
	fileRequest.onloadend = function(){
		var string = fileRequest.response;
		var data = JSON.parse(string);
		Gamestats.LoadGame(data);
		Control.UnlockGame();
	};
	fileRequest.send();
	Control.LockGame();
}


Asset.importShader = function(filename, shader){
	this.numAssets ++;
	shader.name = filename;
	var fileRequest = new XMLHttpRequest();
	fileRequest.open("GET","shaders/"+filename);
	fileRequest.onloadend = function(){
		shader.content = fileRequest.response;
		shader.loaded = true;
		fileLoaded();
		ShaderProgram.Check_Shader_Loading(shader);
	};
	fileRequest.send();
}

Asset.animate_textures = function(){
	for(var i=0;i<Asset.ANIM_tex_list.length;++i){
		var tex = Asset.ANIM_tex_list[i];
		var time = Math.floor(Render.shaderTime * tex.animSpeed);
		if(tex.animSource){
			var texFrame = time % tex.animSource.length;
			tex.buffer = tex.animSource[texFrame].buffer;
		}
	}
	if(Control.gameState == Control.gameState_inGame){
		Asset.MATERIALS[0] = Asset.texture.invisible;
	}else{
		Asset.MATERIALS[0] = Asset.texture.invisible_EDITOR;
	}
}

var vs1 = new Shader(0);
var vs1_fullrot = new Shader(0);
var vs_static = new Shader(0);
var vs1_attachment = new Shader(0);
var vs_nospec = new Shader(0);
var fs1 = new Shader(1);
var fs_no_spec = new Shader(1);
var fs_shadowed = new Shader(1);
var fs_glowmap = new Shader(1);
var fs_additive = new Shader(1);
var fs_puddle = new Shader(1);
var fs_dead = new Shader(1);

var ui_vs = new Shader(0);
var ui_fs = new Shader(1);

var shadow_vs = new Shader(0);
var shadow_vegetation_vs = new Shader(0);
var shadow_no_rotation_vs = new Shader(0);
var shadow_full_rotation_vs = new Shader(0);
var shadow_fs = new Shader(1);

var shadow_animated_vs = new Shader(0);
var shadow_cutout_fs = new Shader(1);
var terrain_shadowed_vs = new Shader(0);
var terrain_shadowed_fs = new Shader(1);

var terrain_grid_vs = new Shader(0);
var terrain_grid_fs = new Shader(1);
var terrain_texture_fs = new Shader(1);
var terrain_texture_vs = new Shader(0);
var world_gui_vs = new Shader(0);
var world_gui_fs = new Shader(1);
var decal_vs = new Shader(0);
var fs_mult = new Shader(1);
var fs_road = new Shader(1);
var lifebar_fs = new Shader(1);
var lifebar_vs = new Shader(0);

var particle_vs = new Shader(0);
var particle_fs = new Shader(1);
var water_vs = new Shader(0);
var water_fs = new Shader(1);
var sky_fs = new Shader(1);
var fs_gun = new Shader(1);

var vegetation_vs = new Shader(0);
var vegetation_fs = new Shader(1);
var vegetation_anim_vs = new Shader(0);
var vegetation_grass_vs = new Shader(0);
var cliff_fs = new Shader(1);
var cliff_vs = new Shader(0);
var cliff_cave_vs = new Shader(0);
var terrainmesh_vs = new Shader(0);
var terrainmesh_fs = new Shader(1);
var wall_vs = new Shader(0);

var shadow_cliff_vs = new Shader(0);
var terrain_overlay_fs = new Shader(1);
var local_light_fs = new Shader(1);
var local_light_vs = new Shader(0);
var ripple_fs = new Shader(1);
var heightmap_vs = new Shader(0);
var ray_fs = new Shader(1);
var vs_rope = new Shader(0);
var sail_fs = new Shader(1);
var fs_rain = new Shader(1);
var fs_glass = new Shader(1);
var vs_vt = new Shader(0);
var vs_sprite = new Shader(0);
var vs_doom = new Shader(0);
var fs_doom = new Shader(1);
var vs_triangle = new Shader(0);

var screen_vs = new Shader(0);
var screen_fs = new Shader(1);
var bloom_fs = new Shader(1);
var bloom_blur_fs = new Shader(1);


Asset.numberOfImages = 0;
Asset.numberOfTextures = 0;

Asset.ImportAll = function(){
	var at = Asset.texture;
	
	//SHADERS
	this.importShader("vs1.txt",vs1);
	this.importShader("vs1_fullrot.txt",vs1_fullrot);
	this.importShader("vs1_attachment.txt",vs1_attachment);
	this.importShader("vs1_nospec.txt",vs_nospec);
	this.importShader("vs_static.txt",vs_static);
	this.importShader("fs1.txt",fs1);
	this.importShader("fs_no_spec.txt",fs_no_spec);
	this.importShader("fs_shadowed.txt",fs_shadowed);
	this.importShader("fs_glowmap.txt",fs_glowmap);
	this.importShader("fs_additive.txt",fs_additive);
	this.importShader("fs_puddle.txt",fs_puddle);
	this.importShader("fs_dead.txt",fs_dead);
	
	this.importShader("ui_vs.txt",ui_vs);
	this.importShader("ui_fs.txt",ui_fs);
	this.importShader("shadow_fs.txt",shadow_fs);
	this.importShader("shadow_cutout_fs.txt",shadow_cutout_fs);
	this.importShader("shadow_vs.txt",shadow_vs);
	this.importShader("shadow_animated_vs.txt",shadow_animated_vs);
	this.importShader("shadow_vegetation_vs.txt",shadow_vegetation_vs);
	this.importShader("shadow_cliff_vs.txt",shadow_cliff_vs);
	this.importShader("shadow_no_rotation_vs.txt",shadow_no_rotation_vs);
	this.importShader("shadow_full_rotation_vs.txt",shadow_full_rotation_vs);
	this.importShader("terrain_shadowed_fs.txt",terrain_shadowed_fs);
	this.importShader("terrain_shadowed_vs.txt",terrain_shadowed_vs);
	

	this.importShader("terrain_grid_vs.txt",terrain_grid_vs);
	this.importShader("terrain_grid_fs.txt",terrain_grid_fs);
	this.importShader("terrain_texture_vs.txt",terrain_texture_vs);
	this.importShader("terrain_texture_fs.txt",terrain_texture_fs);
	this.importShader("world_gui_vs.txt",world_gui_vs);
	this.importShader("world_gui_fs.txt",world_gui_fs);
	this.importShader("decal_vs.txt",decal_vs);
	this.importShader("fs_mult.txt",fs_mult);
	this.importShader("fs_road.txt",fs_road);
	
	this.importShader("lifebar_vs.txt",lifebar_vs);
	this.importShader("lifebar_fs.txt",lifebar_fs);
	this.importShader("particle_vs.txt",particle_vs);
	this.importShader("particle_fs.txt",particle_fs);
	this.importShader("water_vs.txt",water_vs);
	this.importShader("water_fs.txt",water_fs);
	this.importShader("sky_fs.txt",sky_fs);
	this.importShader("fs_gun.txt",fs_gun);

	this.importShader("vegetation_vs.txt",vegetation_vs);
	this.importShader("vegetation_fs.txt",vegetation_fs);
	this.importShader("vegetation_anim_vs.txt",vegetation_anim_vs);
	this.importShader("vegetation_grass_vs.txt",vegetation_grass_vs);
	this.importShader("cliff_vs.txt",cliff_vs);
	this.importShader("cliff_fs.txt",cliff_fs);
	this.importShader("cliff_cave_vs.txt",cliff_cave_vs);
	this.importShader("terrainmesh_vs.txt",terrainmesh_vs);
	this.importShader("terrainmesh_fs.txt",terrainmesh_fs);
	this.importShader("wall_vs.txt",wall_vs);
	this.importShader("terrain_overlay_fs.txt",terrain_overlay_fs);
	this.importShader("local_light_vs.txt",local_light_vs);
	this.importShader("local_light_fs.txt",local_light_fs);
	this.importShader("ripple_fs.txt",ripple_fs);
	this.importShader("heightmap_vs.txt",heightmap_vs);
	this.importShader("ray_fs.txt",ray_fs);
	this.importShader("vs_rope.txt",vs_rope);
	this.importShader("sail_fs.txt",sail_fs);
	this.importShader("fs_rain.txt",fs_rain);
	this.importShader("fs_glass.txt",fs_glass);
	this.importShader("vs_vt.txt",vs_vt);
	this.importShader("screen_vs.txt", screen_vs);
	this.importShader("screen_fs.txt", screen_fs);
	this.importShader("bloom_fs.txt", bloom_fs);
	this.importShader("bloom_blur_fs.txt", bloom_blur_fs);
	this.importShader("vs_sprite.txt", vs_sprite);
	this.importShader("vs_doom.txt", vs_doom);
	this.importShader("fs_doom.txt", fs_doom);
	this.importShader("vs_triangle.txt", vs_triangle);
	//MODELS
	Model3d.nextSortId = 0;
	Asset.importModelBulk();
	
	Asset.model.crate = Asset.queueModelImport('crate', false);
	Asset.model.flak = Asset.queueModelImport('flak', false);
	Model3d.setImportScale(Asset.model.flak, 5);
	Asset.model.unitshadow = Asset.queueModelImport('unitshadow', false);
	Asset.model.cube = Asset.queueModelImport('cube1x1', false);
	Asset.model.camera = Asset.importOBJ('camera', false);
	Asset.model.private = Asset.queueModelImport('colonial', false);

	Asset.model.water = Asset.queueModelImport('water_detailed', false);
	Asset.model.normtest = Asset.queueModelImport('normtest', false);
	Asset.model.rect_center = Asset.queueModelImport('rect_center', false);
	Asset.model.skyPlane  = Asset.queueModelImport('rect_center', false);
	Model3d.setImportScale(Asset.model.skyPlane, 600);
	Asset.model.beacon  = Asset.queueModelImport('rect_center', false);
	Model3d.setImportScale(Asset.model.beacon, 2);
	Asset.model.dummy  = Asset.queueModelImport('dummy', false);
	Asset.model.dummy_elevation  = Asset.queueModelImport('dummy_elevation', false);
	Asset.model.dummy_wave = Asset.queueModelImport('dummy_wave', false);
	Asset.model.dummy_linedef  = Asset.importOBJ('dummy_linedef', false);
	Asset.model.dummy_linedef_soundblocker  = Asset.importOBJ('dummy_linedef_soundblocker', false);
	
	Asset.model.unitshadow_animal = Asset.queueModelImport('unitshadow_animal', false);
	
	Asset.model.unitshadow_medium = Asset.queueModelImport('unitshadow', false);
	Model3d.setImportScale(Asset.model.unitshadow_medium, 1.5);

	Asset.model.cannonDebris = Asset.importOBJ('cannon_debris', false);
	Asset.model.bloodsplatter = Asset.queueModelImport('bloodsplatter', false);
	
	Asset.model.bullet = Asset.queueModelImport('flak', false);
	Model3d.setImportScale(Asset.model.bullet, 2);
	Asset.model.bullet_sniper = Asset.importOBJ('bullet_sniper', false);
	
	Asset.model.spawntrigger = Asset.queueModelImport('trigger_switch', false, true);
	Asset.model.spawnsource = Asset.queueModelImport('trigger_spawn', false, true);
	Asset.model.trigger_alert = Asset.queueModelImport('trigger_alert', false, true);
	Asset.model.trigger_message = Asset.queueModelImport('trigger_message', false, true);
	Asset.model.trigger_keyhole = Asset.queueModelImport('trigger_keyhole', false, true);
	Asset.model.trigger_gate = Asset.queueModelImport('trigger_gate', false, true);
	Asset.model.trigger_patrol = Asset.queueModelImport('trigger_patrol', false, true);

	Asset.model.ripple = Asset.queueModelImport('ripple', false, true);
	Asset.model.volume = Asset.queueModelImport('volume', false, true);
	Asset.model.fireball = Asset.queueModelImport('fireball', false, true);
	Asset.model.rain = Asset.queueModelImport('rain', false,false);
	Asset.model.snowfall = Asset.importOBJ('snowfall', false);
	
	Asset.model.rope = Asset.importOBJ('rope', false, true);
	Asset.model.rope2 = Asset.importOBJ('rope2', false, true);
	Asset.model.rope_end = Asset.importOBJ('rope_end', false, true);
	Asset.model.obstacle = Asset.importOBJ('obstacle', false);
	//Asset.model.reflected_cliff = Asset.importOBJ('reflected_cliff', false);
	//Asset.model.butterfly= Asset.importOBJ('butterfly', false);
	Asset.model.reflect = Asset.importOBJ('reflect', false);
	Asset.model.soundwave = Asset.importOBJ('soundwave', false);
	Asset.model.lock_on = Asset.importOBJ('lock_on', false);
	
	Asset.model.laser = Asset.importOBJ('laser', false); 

	Asset.model.medkit  = Asset.importOBJ('medkit', false); 
	Asset.model.bubble = Asset.importOBJ('bubble', false); 
	//Asset.model.coll_test = Asset.importOBJ('coll_test',true);
	//Asset.model.coll_test.keepMeshData = true;
	//Asset.model.coll2 = Asset.importOBJ('coll2',true);
	//Asset.model.coll2.keepMeshData = true;
	//Asset.model.coll3 = Asset.importOBJ('coll3',true);
	//Asset.model.coll3.keepMeshData = true;
	Asset.model.sprite = Asset.importOBJ('sprite',false);
	Asset.model.sprite_flipped = Asset.importOBJ('sprite_flipped',false);
	Asset.model.sprite_center = Asset.importOBJ('sprite_center',false);
	Asset.model.sprite_2x1 = Asset.importOBJ('sprite_2x1',false);
	Asset.model.sprite_1x2 = Asset.importOBJ('sprite_1x2',false);
	Asset.model.sprite_4x1 = Asset.importOBJ('sprite_4x1',false);
	Asset.model.face_center = Asset.importOBJ('face_center',false);
	Asset.model.skybox = Asset.importOBJ('skybox',false);
	Asset.model.ammo_screen = Asset.importOBJ('ammo_screen',false);
	
	//TEXTURES
	/*at.terrain_darkDirt = Asset.importTexture('tex4.jpg', true);
	at.terrain_rock = Asset.importTexture('terrain_rock.jpg', true);
	at.terrain_grass = Asset.importTexture('tex_greengrass.jpg', true);
	at.terrain_cobble = Asset.importTexture('terrain_cobble.jpg', true);
	at.terrain_sand = Asset.importTexture('terrain_sand.png', true);
	at.terrain_dryGrass = TextureAsset.CreateVariant(at.terrain_sand, -150,0.9,1.15);
	at.terrain_mask_1 = Asset.importTexture('terrain_mask_1.png', true);
	at.terrain_mask_2 = Asset.importTexture('terrain_mask_2.png', true);*/
	
	at.editor = Asset.importTexture('editor.png', true);
	at.gui = Asset.importTexture('guiTexture.png', true, true, false, true);
	at.logo = Asset.importTexture('logo.png', true, true);
	//at.guiPanel	= Asset.importTexture('guiPanel.png',false,false);
	at.guiPanel	= Asset.importTexture('guiPanel.png',false,true);
	at.icons = Asset.importTexture('icons.png', true, true);
	at.circle = Asset.importTexture('circle.png', false);
	at.ping = Asset.importTexture('ping.png', false);
	at.font1 =  Asset.importTexture('font1.png', false, true);	
	at.grid_2x2 = Asset.importTexture('grid_2x2.png', true, true);	
	at.grid_4x4 = Asset.importTexture('grid_4x4.png', true, true);	
	at.grid_8x8 = Asset.importTexture('grid_8x8.png', true, true);	
	at.grid = at.grid_2x2;
	at.minimapReticle = Asset.importTexture('minimapReticle.png',false,false);
	at.tileBracket = Asset.importTexture('tiletex.png', false);
	at.lifebar = Asset.importTexture('lifebar.png', false);
	at.circleGrid = Asset.importTexture('gridtex_selected.png', true);	
	at.cliff1 =  Asset.importTexture('cliff.png', true);
	at.cliff2 =  Asset.importTexture('tex_cliff2.png', true);
	at.targetLine = Asset.importTexture('TargetLine.png', true);
	
	at.explosion = Asset.importTexture('explosion.png', true, true);
	at.cloudLayer = Asset.importTexture('tex_cloud2.jpg', true, true);
	at.light_muzzle = Asset.importTexture('tex_light.png', true);
	at.ao = Asset.importTexture('tex_ao.png', true);
	at.ao2 = Asset.importTexture('tex_ao2.png', true);
	at.button = Asset.importTexture('tex_button.png',true);
	at.slider = Asset.importTexture('sliderFill.png',true,true);
	at.ammo_screen = Asset.importTexture('ammo_screen.png',true);
	at.smoke = Asset.importTexture('smoke.png', false, true);
	at.smoke_black = Asset.importTexture('smoke1.png', false, true);
	at.smoke_red = Asset.importTexture('smoke_red.png', false, true);
	at.smoke_green = Asset.importTexture('smoke_green.png', false, true);
	at.overlayFog = Asset.importTexture('fogtex.png', true);
	//at.waternorm = Asset.importTexture('waternorm.png', true, true);
	//at.foam = Asset.importTexture('foam.png', true, true);
	
	at.fireball = Asset.importTexture('fireball.png', true);
	at.bloodspit = Asset.importTexture('bloodspit.png', true);
	at.cannonball = Asset.importTexture('tex_cannonball.png', true);
	at.dust = Asset.importTexture('dust1.png', false);
	at.dust_light = Asset.importTexture('dust2.png', false);
	at.splash = Asset.importTexture('splash.png', false, true);
	at.splash_big = Asset.importTexture('splash_big.png', false);
	at.blood = Asset.importTexture('blood.png', false, true);
	at.blood_small = Asset.importTexture('blood_small.png', false);
	at.bloodsplatter = Asset.importTexture('bloodsplat.png', true);
	at.glass_shard = Asset.importTexture('glass_shard.png', false, true);
	
	at.blood2 = TextureAsset.CreateVariant(at.blood, 60,0.5);
	at.blood2_small = TextureAsset.CreateVariant(at.blood_small, 60,0.5);
	at.bloodsplatter2 = TextureAsset.CreateVariant(at.bloodsplatter, 60,0.5);
	
	at.blood3 = TextureAsset.CreateVariant(at.blood, -45,0.7);
	at.blood3_small = TextureAsset.CreateVariant(at.blood_small, -45,0.7);
	at.bloodsplatter3 = TextureAsset.CreateVariant(at.bloodsplatter, -45,0.7);
	
	at.bloodsplatter_bone = Asset.importTexture('bloodsplat_bone.png', true);
	at.lock_on = Asset.importTexture('lock_on.png', true,true);
	at.scorch = Asset.importTexture('scorch.png', false);
	at.marble = Asset.importTexture('marble.png',false);
	at.puddle = Asset.importTexture('puddle.png',false);
	at.sparks = Asset.importTexture('sparks.png', true);
	at.rocks = Asset.importTexture('rocks.png', true);
	at.rocks2 = Asset.importTexture('rocks2.png', true);

	at.tiletex_water = Asset.importTexture('tiletex_water.png', false);
	at.tiletex_material = Asset.importTexture('tiletex_material.png', false);

	at.gray = Asset.importTexture('gray.png', false);
	at.white = Asset.importTexture('white.png', false);
	at.selection_red = TextureAsset.CreateTintVariant(at.white,[1,0.5,0.5],at.white);
	at.cyan = TextureAsset.CreateTintVariant(at.white,[0,1,1],at.white);
	at.black = TextureAsset.CreateVariant(at.white, 0,0,0);
	at.terrainOverlay_empty = TextureAsset.CreateTintVariant(at.white,[0,1,0.5],at.white);
	
	at.ripple = Asset.importTexture('ripple.jpg', false);

	at.rain = Asset.importTexture('rain.png',true, true);
	at.beacon = Asset.importTexture('beacon.png',true);
	at.techring = Asset.importTexture('techring.png',true);
	
	at.tint_gradient = Asset.importTexture('tint_gradient.png', false);
	at.tint_gradient2 = TextureAsset.CreateVariant(at.tint_gradient, 33,1);
	at.tint_gradient3 = TextureAsset.CreateVariant(at.tint_gradient, 93,1);
	at.invisible = Asset.importTexture('invisible.png',true);
	at.invisible_EDITOR = Asset.importTexture('invisible_EDITOR.png',true,true);
	at.stun = Asset.importTexture('stun.png',false,true);
	at.menu_overlay = Asset.importTexture('menu_overlay.png',false,true);
	
	at.cooldown = Asset.importTexture('cooldown.png',false);
	at.crosshair = Asset.importTexture('crosshair.png',false,true);
	at.bulletHole = Asset.importTexture('bulletHole.png',true,true);
	at.laser_repair = Asset.importTexture('laser_repair.png',false,false);
	at.nebula = Asset.importTexture('nebula.jpg',false,false);
	
	at.projectiles = Asset.importTexture('projectiles.png',true,true);
	at.projectiles2 = Asset.importTexture('projectiles2.png',true,true);
	at.projectile_axe = Asset.importTexture('projectile_axe.png',true,true);
	at.projectile_bullet = Asset.importTexture('projectile_bullet.png',true,true);
	at.projectile_scream = Asset.importTexture('projectile_scream.png',true,true);
	
	Asset.MATERIALS = [at.invisible];
	at.invisible.ignore_raycast = true;
	at.invisible_EDITOR.ignore_raycast = true;
	
	WALL.reactor = Asset.importWall('wall/reactor.png',true,true);
	WALL.layers = Asset.importWall('wall/layers.png',true,true);
	WALL.asphalt = Asset.importWall('wall/asphalt.png',true,true);
	WALL.asphalt_broken = Asset.importWall('wall/asphalt_broken.png',true,true);
	WALL.asphalt_cracked = Asset.importWall('wall/asphalt_cracked.png',true,true);
	WALL.bloc = Asset.importWall('wall/bloc.png',true,true);
	WALL.bloc_ruined = Asset.importWall('wall/bloc_ruined.png',true,true);
	WALL.bloc_burnt = Asset.importWall('wall/bloc_burnt.png',true,true);
	WALL.bloc_burnt_transition = Asset.importWall('wall/bloc_burnt_transition.png',true,true);
	WALL.terrace = Asset.importWall('wall/terrace.png',true,true);
	WALL.terrace_broken = Asset.importWall('wall/terrace_broken.png',true,true);
	WALL.layers_dark = Asset.importWall('wall/layers_dark.png',true,true);
	WALL.cliff = Asset.importWall('wall/cliff.png',true,true);
	WALL.cliff_ruin = Asset.importWall('wall/cliff_ruin.png',true,true);
	WALL.layers_reactor = Asset.importWall('wall/layers_reactor.png',true,true);
	WALL.metal_beam = Asset.importWall('wall/metal_beam.png',true,true);
	WALL.junk = Asset.importWall('wall/junk.png',true,true);
	WALL.industrial = Asset.importWall('wall/industrial.png',true,true);
	WALL.industrial_old = Asset.importWall('wall/industrial_old.png',true,true);
	WALL.cliff_bloc = Asset.importWall('wall/cliff_bloc.png',true,true);
	WALL.skyscraper_ruin = Asset.importWall('wall/skyscraper_ruin.png',true,true);
	WALL.clay = Asset.importWall('wall/clay.png',true,true);
	WALL.step_rock_black = Asset.importWall('wall/step_rock_black.png',true,true);
	WALL.brick_old = Asset.importWall('wall/brick_old.png',true,true);
	WALL.cliff_ceiling = Asset.importWall('wall/cliff_ceiling.png',true,true);
	WALL.shop = Asset.importWall('wall/shop.png',true,true);
	WALL.sidewalk = Asset.importWall('wall/sidewalk.png',true,true);
	WALL.ceiling_metal = Asset.importWall('wall/ceiling_metal.png',true,true);
	WALL.reactor_leak = Asset.importWall('wall/reactor_leak.png',true,true);
	WALL.reactor_metal = Asset.importWall('wall/reactor_metal.png',true,true);
	WALL.ceiling_diagonal  = Asset.importWall('wall/ceiling_diagonal.png',true,true);
	WALL.piskota  = Asset.importWall('wall/piskota.png',true,true);
	WALL.piskota_broken = Asset.importWall('wall/piskota_broken.png',true,true);
	WALL.piskota_red = Asset.importWall('wall/piskota_red.png',true,true);
	WALL.carpet_blue = Asset.importWall('wall/carpet_blue.png',true,true);
	WALL.sand = Asset.importWall('wall/sand.png',true,true);
	WALL.generic_gray = Asset.importWall('wall/generic_gray.png',true,true);
	WALL.junk_cliff = Asset.importWall('wall/junk_cliff.png',true,true);
	WALL.window_metal = Asset.importWall('wall/window_metal.png',true,true);
	WALL.window_metal.ignore_raycast = true;
	WALL.window_barracks = Asset.importWall('wall/window_barracks.png',true,true);
	WALL.window_barracks.ignore_raycast = true;
	WALL.bodies = Asset.importWall('wall/bodies.png',true,true);
	WALL.wires = Asset.importWall('wall/wires.png',true,true);
	WALL.generic_brown = Asset.importWall('wall/generic_brown.png',true,true);
	WALL.octagon_lamp = Asset.importWall('wall/octagon_lamp.png',true,true);
	WALL.step = Asset.importWall('wall/step.png',true,true);
	WALL.reactor_mix = Asset.importWall('wall/reactor_mix.png',true,true);
	WALL.tek_floor_dark = Asset.importWall('wall/tek_floor_dark.png',true,true);
	WALL.comp = Asset.importWall('wall/comp.png',true,true);
	WALL.comp_panel = Asset.importWall('wall/comp_panel.png',true,true);
	WALL.tek_floor_gray = Asset.importWall('wall/tek_floor_gray.png',true,true);
	WALL.structure = Asset.importWall('wall/structure.png',true,true);
	WALL.structure_horizontal = Asset.importWall('wall/structure_horizontal.png',true,true);
	WALL.comp_lamp = Asset.importWall('wall/comp_lamp.png',true,true);
	WALL.comp_all = Asset.importWall('wall/comp_all.png',true,true);
	WALL.floor_soviet = Asset.importWall('wall/floor_soviet.png',true,true);
	WALL.book = Asset.importWall('wall/book.png',true,true);
	WALL.brutal = Asset.importWall('wall/brutal.png',true,true);
	WALL.column = Asset.importWall('wall/column.png',true,true);
	WALL.column_green = Asset.importWall('wall/column_green.png',true,true);
	WALL.gothic = Asset.importWall('wall/gothic.png',true,true);
	WALL.gothic_glass = Asset.importWall('wall/gothic_glass.png',true,true);
	WALL.gothic_glass2 = Asset.importWall('wall/gothic_glass2.png',true,true);
	WALL.catacomb = Asset.importWall('wall/catacomb.png',true,true);
	WALL.catacomb_frame = Asset.importWall('wall/catacomb_frame.png',true,true);
	WALL.bodies_buried = Asset.importWall('wall/bodies_buried.png',true,true);
	WALL.gate_small = Asset.importWall('wall/gate_small.png',true,true);
	WALL.gate_tech = Asset.importWall('wall/gate_tech.png',true,true);
	WALL.tek_floor = Asset.importWall('wall/tek_floor.png',true,true);
	WALL.hex = Asset.importWall('wall/hex.png',true,true);
	WALL.hex_metal = Asset.importWall('wall/hex_metal.png',true,true);
	WALL.pyramid = Asset.importWall('wall/pyramid.png',true,true);
	WALL.grill = Asset.importWall('wall/grill.png',true,true);
	WALL.grill_blood = Asset.importWall('wall/grill_blood.png',true,true);
	WALL.grate = Asset.importWall('wall/grate.png',true,true);
	WALL.propaganda = Asset.importWall('wall/propaganda.png',true,true);
	WALL.staircase = Asset.importWall('wall/staircase.png',true,true);
	WALL.staircase_slope = Asset.importWall('wall/staircase_slope.png',true,true);
	WALL.railing_bloc = Asset.importWall('wall/railing_bloc.png',true,true);
	WALL.railing_bloc_slope = Asset.importWall('wall/railing_bloc_slope.png',true,true);
	WALL.railing_bloc.ignore_raycast = true;
	WALL.railing_bloc.no_vertical_tiling = true;
	WALL.railing_bloc_slope.ignore_raycast = true;
	WALL.railing_bloc_slope.no_vertical_tiling = true;
	WALL.staircase_door = Asset.importWall('wall/staircase_door.png',true,true);
	WALL.staircase_door2 = Asset.importWall('wall/staircase_door2.png',true,true);
	WALL.staircase_door3 = Asset.importWall('wall/staircase_door3.png',true,true);
	
	at.bloodfall0 = Asset.importTexture('bloodfall0.png',true,true);
	at.bloodfall1 = Asset.importTexture('bloodfall1.png',true,true);
	at.bloodfall2 = Asset.importTexture('bloodfall2.png',true,true);
	at.bloodfall3 = Asset.importTexture('bloodfall3.png',true,true);
	WALL.bloodfall = TextureAsset.CreateVariant(at.bloodfall0, 0,1);
	Asset.MATERIALS.push(WALL.bloodfall);
	at.water_blood0 = Asset.importTexture('water_blood0.png',true,true);
	at.water_blood1 = Asset.importTexture('water_blood1.png',true,true);
	at.water_blood2 = Asset.importTexture('water_blood2.png',true,true);
	at.water_blood3 = Asset.importTexture('water_blood3.png',true,true);
	WALL.water_blood = TextureAsset.CreateVariant(at.water_blood0, 0,1);
	Asset.MATERIALS.push(WALL.water_blood);
	
	WALL.metal_lights = Asset.importWall('wall/metal_lights.png',true,true);
	WALL.hazard_concrete = Asset.importWall('wall/hazard_concrete.png',true,true);
	WALL.comp_circuit = Asset.importWall('wall/comp_circuit.png',true,true);
	WALL.comp_terminal = Asset.importWall('wall/comp_terminal.png',true,true);
	WALL.gravel = Asset.importWall('wall/gravel.png',true,true);
	WALL.gold = Asset.importWall('wall/gold.png',true,true);
	WALL.memorial = Asset.importWall('wall/memorial.png',true,true);
	WALL.galvanized_gilded = Asset.importWall('wall/galvanized_gilded.png',true,true);
	WALL.galvanized = Asset.importWall('wall/galvanized.png',true,true);
	WALL.led_blue = Asset.importWall('wall/led_blue.png',true,true);
	WALL.led_orange = Asset.importWall('wall/led_orange.png',true,true);
	WALL.grass = Asset.importWall('wall/grass.png',true,true);
	WALL.city = Asset.importWall('wall/city.png',true,true);
	WALL.city_gray = Asset.importWall('wall/city_gray.png',true,true);
	WALL.skyscraper = Asset.importWall('wall/skyscraper.png',true,true);
	WALL.skyscraper2 = Asset.importWall('wall/skyscraper2.png',true,true);
	
	at.water0 = Asset.importTexture('water0.png',true,true);
	at.water1 = Asset.importTexture('water1.png',true,true);
	at.water2 = Asset.importTexture('water2.png',true,true);
	at.water3 = Asset.importTexture('water3.png',true,true);
	WALL.water = TextureAsset.CreateVariant(at.water0, 0,1);
	Asset.MATERIALS.push(WALL.water);
	at.waterfall0 = Asset.importTexture('waterfall0.png',true,true);
	at.waterfall1 = Asset.importTexture('waterfall1.png',true,true);
	at.waterfall2 = Asset.importTexture('waterfall2.png',true,true);
	at.waterfall3 = Asset.importTexture('waterfall3.png',true,true);
	WALL.waterfall = TextureAsset.CreateVariant(at.waterfall0, 0,1);
	Asset.MATERIALS.push(WALL.waterfall);
	
	WALL.guts = Asset.importWall('wall/guts.png',true,true);
	WALL.guts_brain = Asset.importWall('wall/guts_brain.png',true,true);
	WALL.guts_dark = Asset.importWall('wall/guts_dark.png',true,true);
	WALL.guts_small = Asset.importWall('wall/guts_small.png',true,true);
	WALL.guts_pink = Asset.importWall('wall/guts_pink.png',true,true);
	WALL.grunge = Asset.importWall('wall/grunge.png',true,true);
	WALL.grunge_brown = Asset.importWall('wall/grunge_brown.png',true,true);
	WALL.panel = Asset.importWall('wall/panel.png',true,true);
	WALL.panel_red = Asset.importWall('wall/panel_red.png',true,true);
	WALL.panel_gilded = Asset.importWall('wall/panel_gilded.png',true,true);
	WALL.panel_lamp = Asset.importWall('wall/panel_lamp.png',true,true);
	WALL.panel_vent = Asset.importWall('wall/panel_vent.png',true,true);
	WALL.panel_smallgreeble = Asset.importWall('wall/panel_smallgreeble.png',true,true);
	WALL.tgm = Asset.importWall('wall/tgm.png',true,true);
	WALL.tgm_corner = Asset.importWall('wall/tgm_corner.png',true,true);
	WALL.tgm2 = Asset.importWall('wall/tgm2.png',true,true);
	WALL.santier = Asset.importWall('wall/santier.png',true,true);
	WALL.terrace2 = Asset.importWall('wall/terrace2.png',true,true);
	WALL.house = Asset.importWall('wall/house.png',true,true);
	WALL.house_wall = Asset.importWall('wall/house_wall.png',true,true);
	WALL.house2 = Asset.importWall('wall/house2.png',true,true);
	WALL.house3 = Asset.importWall('wall/house3.png',true,true);
	WALL.posta = Asset.importWall('wall/posta.png',true,true);
	WALL.bloc2 = Asset.importWall('wall/bloc2.png',true,true);
	WALL.bloc_red = Asset.importWall('wall/bloc_red.png',true,true);
	WALL.magazin = Asset.importWall('wall/magazin.png',true,true);
	WALL.door_bloc = Asset.importWall('wall/door_bloc.png',true,true);
	WALL.gate_beast = Asset.importWall('wall/gate_beast.png',true,true);
	WALL.gold2 = Asset.importWall('wall/gold2.png',true,true);
	WALL.glass_window = Asset.importWall('wall/glass_window.png',true,true);
	WALL.glass_window_broken = Asset.importWall('wall/glass_window_broken.png',true,true);
	WALL.glass_window.triggered_version = WALL.glass_window_broken;
	WALL.glass = Asset.importWall('wall/glass.png',true,true);
	WALL.railing_glass = Asset.importWall('wall/railing_glass.png',true,true);
	WALL.cfr = Asset.importWall('wall/cfr.png',true,true);
	WALL.cfr_inside = Asset.importWall('wall/cfr_inside.png',true,true);
	WALL.cfr_wheel = Asset.importWall('wall/cfr_wheel.png',true,true);
	WALL.rails = Asset.importWall('wall/rails.png',true,true);
	WALL.pod = Asset.importWall('wall/pod.png',true,true);
	WALL.galvanized_tile = Asset.importWall('wall/galvanized_tile.png',true,true);
	WALL.galvanized_beam = Asset.importWall('wall/galvanized_beam.png',true,true);
	WALL.galvanized_lamp = Asset.importWall('wall/galvanized_lamp.png',true,true);
	WALL.galvanized_locker = Asset.importWall('wall/galvanized_locker.png',true,true);
	WALL.pipes = Asset.importWall('wall/pipes.png',true,true);
	WALL.pipes_brown = Asset.importWall('wall/pipes_brown.png',true,true);
	WALL.lamp_grill_green = Asset.importWall('wall/lamp_grill_green.png',true,true);
	WALL.panel_tile = Asset.importWall('wall/panel_tile.png',true,true);
	WALL.marble_leak = Asset.importWall('wall/marble_leak.png',true,true);
	WALL.marble = Asset.importWall('wall/marble.png',true,true);
	WALL.lamp = Asset.importWall('wall/lamp.png',true,true);
	WALL.cyber_rust = Asset.importWall('wall/cyber_rust.png',true,true);
	WALL.marble_deco = Asset.importWall('wall/marble_deco.png',true,true);
	WALL.marble_brick = Asset.importWall('wall/marble_brick.png',true,true);
	WALL.marble_checker = Asset.importWall('wall/marble_checker.png',true,true);
	WALL.herringbone = Asset.importWall('wall/herringbone.png',true,true);
	WALL.metal_tall = Asset.importWall('wall/metal_tall.png',true,true);
	WALL.metal_saturn = Asset.importWall('wall/metal_saturn.png',true,true);
	WALL.gresia_dirty = Asset.importWall('wall/gresia_dirty.png',true,true);
	WALL.cement_small = Asset.importWall('wall/cement_small.png',true,true);
	WALL.cement = Asset.importWall('wall/cement.png',true,true);
	WALL.lamp_grill_red = Asset.importWall('wall/lamp_grill_red.png',true,true);
	WALL.lamp_grill = Asset.importWall('wall/lamp_grill.png',true,true);
	WALL.lamp_grill_blue = Asset.importWall('wall/lamp_grill_blue.png',true,true);
	WALL.pavement = Asset.importWall('wall/pavement.png',true,true);
	WALL.cracked = Asset.importWall('wall/cracked.png',true,true);
	WALL.cracked2 = Asset.importWall('wall/cracked2.png',true,true);
	WALL.lumber = Asset.importWall('wall/lumber.png',true,true);
	WALL.lumber_ruin = Asset.importWall('wall/lumber_ruin.png',true,true);
	WALL.staircase_gas = Asset.importWall('wall/staircase_gas.png',true,true);
	WALL.plaster = Asset.importWall('wall/plaster.png',true,true);
	WALL.plaster_ruin = Asset.importWall('wall/plaster_ruin.png',true,true);
	WALL.lino = Asset.importWall('wall/lino.png',true,true);
	WALL.lino2 = Asset.importWall('wall/lino2.png',true,true);
	WALL.tile_brown = Asset.importWall('wall/tile_brown.png',true,true);
	WALL.tile_green = Asset.importWall('wall/tile_green.png',true,true);
	WALL.floor_mosaic = Asset.importWall('wall/floor_mosaic.png',true,true);
	WALL.gresia_white = Asset.importWall('wall/gresia_white.png',true,true);
	WALL.bathroom = Asset.importWall('wall/bathroom.png',true,true);
	WALL.plywood = Asset.importWall('wall/plywood.png',true,true);
	WALL.plywood_tile = Asset.importWall('wall/plywood_tile.png',true,true);
	WALL.drawer = Asset.importWall('wall/drawer.png',true,true);
	WALL.wood_metal = Asset.importWall('wall/wood_metal.png',true,true);
	WALL.wood = Asset.importWall('wall/wood.png',true,true);
	WALL.wood_horizontal = Asset.importWall('wall/wood_horizontal.png',true,true);
	WALL.skin = Asset.importWall('wall/skin.png',true,true);
	WALL.skin_pipes = Asset.importWall('wall/skin_pipes.png',true,true);
	WALL.skin_hanging = Asset.importWall('wall/skin_hanging.png',true,true);
	WALL.skin_hanging.ignore_raycast = true;
	WALL.skin_hanging.no_vertical_tiling = true;
	WALL.ceiling_green = Asset.importWall('wall/ceiling_green.png',true,true);
	WALL.ceiling_red = Asset.importWall('wall/ceiling_red.png',true,true);
	WALL.blood_border = Asset.importWall('wall/blood_border.png',true,true);
	WALL.tv = Asset.importWall('wall/tv.png',true,true);
	at.news0 = Asset.importTexture('news0.png',true,true);
	at.news1 = Asset.importTexture('news1.png',true,true);
	at.news2 = Asset.importTexture('news2.png',true,true);
	WALL.news = TextureAsset.CreateVariant(at.news0, 0,1);
	Asset.MATERIALS.push(WALL.news);
	WALL.tv.triggered_version = WALL.news;
	WALL.panel_bloody = Asset.importWall('wall/panel_bloody.png',true,true);
	WALL.panel_pipes = Asset.importWall('wall/panel_pipes.png',true,true);
	WALL.industrial_transition = Asset.importWall('wall/industrial_transition.png',true,true);
	WALL.industrial_guts = Asset.importWall('wall/industrial_guts.png',true,true);
	WALL.gate_bloody = Asset.importWall('wall/gate_bloody.png',true,true);
	WALL.gate_metal_demon = Asset.importWall('wall/gate_metal_demon.png',true,true);
	WALL.door = Asset.importWall('wall/door.png',true,true);
	WALL.trak = Asset.importWall('wall/trak.png',true,true);
	WALL.hard_green = Asset.importWall('wall/hard_green.png',true,true);
	WALL.hard_tan = Asset.importWall('wall/hard_tan.png',true,true);
	WALL.hard_dark = Asset.importWall('wall/hard_dark.png',true,true);
	WALL.bosch = Asset.importWall('wall/bosch.png',true,true);
	WALL.magma = Asset.importWall('wall/magma.png',true,true);
	WALL.carpet_red = Asset.importWall('wall/carpet_red.png',true,true);
	WALL.brushed = Asset.importWall('wall/brushed.png',true,true);
	WALL.brushed_tile = Asset.importWall('wall/brushed_tile.png',true,true);
	WALL.brushed_brown = Asset.importWall('wall/brushed_brown.png',true,true);
	WALL.brushed_tan = Asset.importWall('wall/brushed_tan.png',true,true);
	WALL.bloc_empty = Asset.importWall('wall/bloc_empty.png',true,true);
	WALL.deco_red = Asset.importWall('wall/deco_red.png',true,true);
	WALL.plywood_worn = Asset.importWall('wall/plywood_worn.png',true,true);
	WALL.bloc_cluj = Asset.importWall('wall/bloc_cluj.png',true,true);
	WALL.layers_bloc = Asset.importWall('wall/layers_bloc.png',true,true);
	WALL.blood_border_asphalt = Asset.importWall('wall/blood_border_asphalt.png',true,true);
	WALL.keys = Asset.importWall('wall/keys.png',true,true);
	WALL.floor_brown = Asset.importWall('wall/floor_brown.png',true,true);	
	WALL.switch_gilded = Asset.importWall('wall/switch_gilded.png',true,true);
	WALL.switch_gilded_on = Asset.importWall('wall/switch_gilded_on.png',true,true);
	WALL.switch_gilded.triggered_version = WALL.switch_gilded_on;
	WALL.stucco = Asset.importWall('wall/stucco.png',true,true);
	WALL.metal_screws = Asset.importWall('wall/metal_screws.png',true,true);
	WALL.bloc_to_metal = Asset.importWall('wall/bloc_to_metal.png',true,true);
	WALL.house_corpse = Asset.importWall('wall/house_corpse.png',true,true);
	WALL.floor_station = Asset.importWall('wall/floor_station.png',true,true);
	WALL.pipes_wires = Asset.importWall('wall/pipes_wires.png',true,true);
	WALL.house_to_metal = Asset.importWall('wall/house_to_metal.png',true,true);
	WALL.bloc2_skulls = Asset.importWall('wall/bloc2_skulls.png',true,true);
	WALL.slab_flat = Asset.importWall('wall/slab_flat.png',true,true);
	WALL.slab_flat_grime = Asset.importWall('wall/slab_flat_grime.png',true,true);
	WALL.slab_small = Asset.importWall('wall/slab_small.png',true,true);
	WALL.panel_floor = Asset.importWall('wall/panel_floor.png',true,true);
	WALL.plumbing = Asset.importWall('wall/plumbing.png',true,true);
	WALL.plumbing_dark = Asset.importWall('wall/plumbing_dark.png',true,true);
	WALL.posters = Asset.importWall('wall/posters.png',true,true);
	WALL.corridor_wood = Asset.importWall('wall/corridor_wood.png',true,true);
	WALL.corridor_gray = Asset.importWall('wall/corridor_gray.png',true,true);
	WALL.mold = Asset.importWall('wall/mold.png',true,true);
	WALL.mold_wood = Asset.importWall('wall/mold_wood.png',true,true);
	WALL.office_floor = Asset.importWall('wall/office_floor.png',true,true);
	WALL.office = Asset.importWall('wall/office.png',true,true);
	WALL.parquet = Asset.importWall('wall/parquet.png',true,true);
	WALL.plywood_metal = Asset.importWall('wall/plywood_metal.png',true,true);
	WALL.plywood_slope = Asset.importWall('wall/plywood_slope.png',true,true);
	WALL.stainless = Asset.importWall('wall/stainless.png',true,true);
	WALL.stainless_dark = Asset.importWall('wall/stainless_dark.png',true,true);
	WALL.wood_gilded = Asset.importWall('wall/wood_gilded.png',true,true);
	
	WALL.decal_fountain = Asset.importWall('wall/decal_fountain.png',true,true);
	WALL.decal_fountain.decal_transparency = true;
	WALL.decal_switch_off = Asset.importWall('wall/decal_switch_off.png',true,true);
	WALL.decal_switch_off.decal_transparency = true;
	WALL.decal_switch_on = Asset.importWall('wall/decal_switch_on.png',true,true);
	WALL.decal_switch_on.decal_transparency = true;
	WALL.decal_switch_off.triggered_version = WALL.decal_switch_on;
	
	at.lut = Asset.importTexture('lut.png',false,true); 
	at.lightmap = Asset.importTexture('lightmap.png',true,true); 
	at.palette = Asset.importTexture('palette.png',true,true); 
	at.chomper = Asset.importTexture('chomper.png',false,true);
	at.zombie = Asset.importTexture('zombie.png',false,true); 
	at.minigun = Asset.importTexture('minigun.png',false,true); 
	at.sword = Asset.importTexture('sword.png',false,true); 
	at.doublebarrel = Asset.importTexture('doublebarrel.png',false,true); 
	at.rocket = Asset.importTexture('rocket.png',false,true); 
	at.pistol = Asset.importTexture('pistol.png',false,true); 
	at.plasmagun = Asset.importTexture('plasmagun.png',false,true); 
	at.fist = Asset.importTexture('fist.png',false,true); 
	at.claw = Asset.importTexture('claw.png',false,true); 
	at.sky = Asset.importTexture('sky.png',true,true); 
	at.sky2 = Asset.importTexture('sky2.png',true,true); 
	at.sky3 = Asset.importTexture('sky3.png',true,true); 
	
	at.enforcer = Asset.importTexture('enforcer.png',true,true); 
	at.painlord = Asset.importTexture('painlord.png',true,true); 
	at.painking = Asset.importTexture('painking.png',true,true);
	at.evileye = Asset.importTexture('evileye.png',true,true);
	at.painking_wounded = Asset.importTexture('painking_wounded.png',true,true);
	at.ghast = Asset.importTexture('ghast.png',true,true);
	at.valkyrie = Asset.importTexture('valkyrie.png',true,true);
	at.ranger = Asset.importTexture('ranger.png',true,true); 
	at.ranger_male = Asset.importTexture('ranger_male.png',true,true); 
	at.ranger_demon = Asset.importTexture('ranger_demon.png',true,true); 
	at.scout = Asset.importTexture('scout.png',true,true); 
	at.scout_male = Asset.importTexture('scout_male.png',true,true); 
	at.scout_demon = Asset.importTexture('scout_demon.png',true,true); 
	at.scout_ally = Asset.importTexture('scout_ally.png',true,true); 
	at.rascal = Asset.importTexture('rascal.png',true,true); 
	at.skeleton = Asset.importTexture('skeleton.png',true,true); 
	at.behemoth = Asset.importTexture('behemoth.png',true,true); 
	at.behemoth_wounded = Asset.importTexture('behemoth_wounded.png',true,true);
	at.angler = Asset.importTexture('angler.png',true,true); 
	at.stillborn = Asset.importTexture('stillborn.png',true,true); 
	at.fallen = Asset.importTexture('fallen.png',true,true);
	at.maniac = Asset.importTexture('maniac.png',true,true);
	at.cultist = Asset.importTexture('cultist.png',true,true);
	at.ghoul = Asset.importTexture('ghoul.png',true,true);
	at.succubus = Asset.importTexture('succubus.png',true,true); 
	at.arachnose = Asset.importTexture('arachnose.png',true,true); 
	at.succubus_police = Asset.importTexture('succubus_police.png',true,true); 
	at.monk = Asset.importTexture('monk.png',true,true);
	at.scholar = Asset.importTexture('scholar.png',true,true);
	at.rednose = Asset.importTexture('rednose.png',true,true); 	
	at.health = Asset.importTexture('health.png',true,true);
	at.item_medkit = Asset.importTexture('item_medkit.png',true,true);
	at.item_hazmat = Asset.importTexture('item_hazmat.png',true,true);
	at.item_shotgun = Asset.importTexture('item_shotgun.png',true,true);
	at.item_plasmagun = Asset.importTexture('item_plasmagun.png',true,true);
	at.item_claw = Asset.importTexture('item_claw.png',true,true);
	at.item_ak = Asset.importTexture('item_ak.png',true,true);
	at.item_plasma = Asset.importTexture('item_plasma.png',true,true);
	at.item_minigun = Asset.importTexture('item_minigun.png',true,true);
	at.item_bodyarmor = Asset.importTexture('item_bodyarmor.png',true,true);
	at.item_booster = Asset.importTexture('item_booster.png',true,true);
	at.item_bullet = Asset.importTexture('item_bullet.png',true,true);
	at.item_rocket = Asset.importTexture('item_rocket.png',true,true);
	at.item_shells = Asset.importTexture('item_shells.png',true,true);
	at.item_armor = Asset.importTexture('item_armor.png',true,true);
	at.item_box_rockets = Asset.importTexture('item_box_rockets.png',true,true);
	at.key_red = Asset.importTexture('key_red.png',true,true);
	at.key_blue = Asset.importTexture('key_blue.png',true,true);
	at.key_green = Asset.importTexture('key_green.png',true,true);
	at.bullet = Asset.importTexture('bullet.png',false,true);	
	at.mantis_sheet = Asset.importTexture('mantis_sheet.png',false,true);
	at.portrait_imp = Asset.importTexture('portrait_imp.png',false,true);
	at.portrait = Asset.importTexture('portrait.png',false,true);
	at.bloodsplat = Asset.importTexture('bloodsplat.png',false,true);
	at.blood_particle = Asset.importTexture('blood_particle.png',false,true);
	at.evilsign = Asset.importTexture('evilsign.png',false,true);
	at.doodad_shrub = Asset.importTexture('shrub.png',true,true);
	at.doodad_tree = Asset.importTexture('doodad_tree.png',true,true);
	at.doodad_lamp = Asset.importTexture('doodad_lamp.png',true,true);
	at.doodad_anointed = Asset.importTexture('doodad_anointed.png',true,true);
	at.doodad_statue = Asset.importTexture('statue.png',true,true);
	at.doodad_statue_demon = Asset.importTexture('statue_demon.png',true,true);
	at.doodad_thuja = Asset.importTexture('doodad_thuja.png',true,true);
	at.doodad_hanged = Asset.importTexture('doodad_hanged.png',true,true); 
	at.doodad_impaled = Asset.importTexture('doodad_impaled.png',true,true);
	at.doodad_impaled2 = Asset.importTexture('doodad_impaled2.png',true,true);
	at.doodad_impaled3 = Asset.importTexture('doodad_impaled3.png',true,true);
	at.doodad_street = Asset.importTexture('doodad_street.png',true,true);
	at.doodad_bin = Asset.importTexture('doodad_bin.png',true,true);
	at.doodad_lamp = Asset.importTexture('doodad_lamp.png',true,true);
	at.doodad_small1 = Asset.importTexture('doodad_small1.png',true,true);
	at.doodad_small2 = Asset.importTexture('doodad_small2.png',true,true);
	at.doodad_small3 = Asset.importTexture('doodad_small3.png',true,true);
	at.doodad_small4 = Asset.importTexture('doodad_small4.png',true,true);
	at.doodad_melon = Asset.importTexture('doodad_melon.png',true,true);
	at.doodad_clock = Asset.importTexture('doodad_clock.png',true,true);
	at.doodad_candle = Asset.importTexture('doodad_candle.png',true,true);
	at.doodad_fire = Asset.importTexture('fire.png',true,true);
	at.doodad_fire2 = Asset.importTexture('fire2.png',true,true);
	at.doodad_chandelier = Asset.importTexture('doodad_chandelier.png',true,true);
	at.doodad_neon = Asset.importTexture('doodad_neon.png',true,true);
	at.doodad_neon2 = Asset.importTexture('doodad_neon2.png',true,true);
	at.doodad_poster1 = Asset.importTexture('doodad_poster1.png',true,true);
	at.doodad_poster2 = Asset.importTexture('doodad_poster2.png',true,true);
	at.doodad_poster3 = Asset.importTexture('doodad_poster3.png',true,true);
	at.doodad_sign1 = Asset.importTexture('doodad_sign1.png',true,true);
	at.doodad_sign2 = Asset.importTexture('doodad_sign2.png',true,true);
	at.doodad_sign3 = Asset.importTexture('doodad_sign3.png',true,true);
	at.doodad_sign4 = Asset.importTexture('doodad_sign4.png',true,true);
	at.doodad_sign5 = Asset.importTexture('doodad_sign5.png',true,true);
	at.doodad_sign_vertical1 = Asset.importTexture('doodad_sign_vertical1.png',true,true);
	at.doodad_chimney = Asset.importTexture('doodad_chimney.png',true,true);
	at.band = Asset.importTexture('band.png',true,true);
	
	at.static = Asset.importTexture('static.png', true);
	at.portraitBorder = Asset.importTexture('portraitBorder.png',false,false);
	at.menu = Asset.importTexture('menu.png',false,true);
	at.heat = Asset.importTexture('heat.png',false,false);
	at.shockwave = Asset.importTexture('shockwave.png',false,false);
	//if(DESKTOP_VERSION){
	//	at.steam = Asset.importTexture('developer.png',false,true);
		at.editor_tutorial = Asset.importTexture('editor_tutorial.png',false,true);
	//}else{
		at.steam = Asset.importTexture('steam.png',false,true);
		at.discord = Asset.importTexture('discord.png',false,true);
		at.banners = Asset.importTexture('banners.jpg',false,true);
		//at.editor_tutorial = at.steam;
	//}
	
	
	if(game_portal =="crazy"){
		at.logo_portal = Asset.importTexture('crazy_logo.png',false,true);
	}
	
	this.numberOfTextures = Textures.length;
	
	//MUSIC
	//ne tartalmazzon nagybetut, mert azt a firefox nem szereti
	Asset.sound.hit1 = Asset.importSound('hit1.wav');
	Asset.sound.hit2 =Asset.importSound('hit2.wav');
	Asset.sound.hit3 =Asset.importSound('hit3.wav');
	Asset.sound.railgun = Asset.importSound('railgun.wav');
	Asset.sound.gate = Asset.importSound('gate.wav');
	Asset.sound.gate_close = Asset.importSound('gate_close.wav');
	Asset.sound.gate_stop = Asset.importSound('gate_stop.wav');
	
	Asset.sound.crumble = Asset.importSound('death_rocket.wav');
	Asset.sound.death_missile = Asset.importSound('death_missile.wav');
	//Asset.sound.step = Asset.importSound('sound_step.wav');
	Asset.sound.oof_human1 = Asset.importSound('oof_human1.wav');
	Asset.sound.oof_human2 = Asset.importSound('oof_human2.wav');
	Asset.sound.oof_human3 = Asset.importSound('oof_human3.wav');
	Asset.sound.shotgun = Asset.importSound('shotgun.wav');
	Asset.sound.shotgun_enemy = Asset.importSound('shotgun_enemy.wav');
	Asset.sound.minigun = Asset.importSound('minigun.wav');
	Asset.sound.laser = Asset.importSound('laser_updated.wav');
	Asset.sound.laser_high = Asset.importSound('laser_high.wav');
	//Asset.sound.laser_starship = Asset.importSound('laser_starship.wav');
	//Asset.sound.laser_starship2 = Asset.importSound('laser_starship2.wav');
	Asset.sound.oof_cannon= Asset.importSound('oof_cannon.wav');
	Asset.sound.death_human1 = Asset.importSound('death_human1.wav');
	Asset.sound.death_human2 = Asset.importSound('death_human2.wav');
	Asset.sound.death_human3 = Asset.importSound('death_human3.wav');
	Asset.sound.shot_grenade = Asset.importSound('shot_grenade.wav');
	//Asset.sound.rocket = Asset.importSound('shot_rocket.wav');
	Asset.sound.rocket = Asset.importSound('rocket.wav');
	Asset.sound.ssg = Asset.importSound('ssg.wav');
	Asset.sound.ak = Asset.importSound('ak.wav');
	Asset.sound.shock = Asset.importSound('shock.wav');
	Asset.sound.charge = Asset.importSound('charge.wav');
	Asset.sound.pistol = Asset.importSound('pistol.wav');
	Asset.sound.shot_walker = Asset.importSound('shot_walker.wav');
	Asset.sound.drill = Asset.importSound('drill.wav');
	Asset.sound.repair = Asset.importSound('repair.wav');
	Asset.sound.repair_launch = Asset.importSound('repair_launch.wav');
	Asset.sound.hit_big = Asset.importSound('hit_big.wav');
	Asset.sound.chomp = Asset.importSound('chomp.wav');
	Asset.sound.bite_zombie1 = Asset.importSound('bite_zombie1.wav');
	Asset.sound.bite_zombie2 = Asset.importSound('bite_zombie2.wav');
	Asset.sound.smoke_grenade = Asset.importSound('smoke_grenade.wav');
	Asset.sound.thump1 = Asset.importSound('thump1.wav');
	Asset.sound.death_laika = Asset.importSound('death_laika.wav');
	Asset.sound.death_fallen = Asset.importSound('death_fallen.wav');
	Asset.sound.death_behemoth = Asset.importSound('death_behemoth.wav');
	Asset.sound.death_skeleton = Asset.importSound('death_skeleton.wav');
	Asset.sound.death_chomper = Asset.importSound('death_chomper.wav');
	Asset.sound.death_maniac = Asset.importSound('death_maniac.wav');
	Asset.sound.death_maniac2 = Asset.importSound('death_maniac2.wav');
	Asset.sound.oof_chomper = Asset.importSound('oof_chomper.wav');
	Asset.sound.oof_chomper2 = Asset.importSound('oof_chomper2.wav');
	Asset.sound.chase_chomper = Asset.importSound('chomper_chase.wav');
	Asset.sound.chase_chomper2 = Asset.importSound('chomper_chase2.wav');
	Asset.sound.chase_chomper3 = Asset.importSound('chomper_chase3.wav');
	Asset.sound.chase_chomper4 = Asset.importSound('chomper_chase4.wav');
	Asset.sound.chase_maniac = Asset.importSound('chase_maniac.wav');
	Asset.sound.chase_maniac2 = Asset.importSound('chase_maniac2.wav');
	Asset.sound.chase_maniac3 = Asset.importSound('chase_maniac3.wav');
	Asset.sound.chase_maniac4 = Asset.importSound('chase_maniac4.wav');
	Asset.sound.chase_outcast = Asset.importSound('chase_outcast.wav');
	Asset.sound.chase_outcast2 = Asset.importSound('chase_outcast2.wav');
	Asset.sound.chase_outcast3 = Asset.importSound('chase_outcast3.wav');
	Asset.sound.chase_behemoth = Asset.importSound('chase_behemoth.wav');
	Asset.sound.chase_behemoth2 = Asset.importSound('chase_behemoth2.wav');
	Asset.sound.death_outcast = Asset.importSound('death_outcast.wav');
	Asset.sound.death_outcast2 = Asset.importSound('death_outcast2.wav');
	Asset.sound.death_nose  = Asset.importSound('death_nose.wav');
	Asset.sound.death_rascal = Asset.importSound('death_rascal.wav');
	Asset.sound.oof_rascal1 = Asset.importSound('oof_rascal1.wav');
	Asset.sound.oof_rascal2 = Asset.importSound('oof_rascal2.wav');
	Asset.sound.oof_zombie = Asset.importSound('oof_zombie.wav');
	Asset.sound.oof_zombie2 = Asset.importSound('oof_zombie2.wav');
	Asset.sound.oof_succubus = Asset.importSound('oof_succubus.wav');
	Asset.sound.oof_succubus2 = Asset.importSound('oof_succubus2.wav');
	Asset.sound.chase_zombie = Asset.importSound('chase_zombie.wav');
	Asset.sound.chase_zombie2 = Asset.importSound('chase_zombie2.wav');
	Asset.sound.chase_zombie3 = Asset.importSound('chase_zombie3.wav');
	Asset.sound.chase_zombie4 = Asset.importSound('chase_zombie4.wav');
	Asset.sound.chase_rascal = Asset.importSound('chase_rascal.wav');
	Asset.sound.chase_rascal2 = Asset.importSound('chase_rascal2.wav');
	Asset.sound.chase_rascal3 = Asset.importSound('chase_rascal3.wav');
	Asset.sound.chase_rascal4 = Asset.importSound('chase_rascal4.wav');
	Asset.sound.chase_succubus = Asset.importSound('chase_succubus.wav');
	Asset.sound.chase_succubus2 = Asset.importSound('chase_succubus2.wav');
	Asset.sound.chase_deserter = Asset.importSound('chase_deserter.wav');
	Asset.sound.chase_deserter2 = Asset.importSound('chase_deserter2.wav');
	Asset.sound.oof_fallen = Asset.importSound('oof_fallen.wav');
	Asset.sound.oof_maniac = Asset.importSound('oof_maniac.wav');
	Asset.sound.death_mangler = Asset.importSound('death_mangler.wav');
	Asset.sound.death_monk = Asset.importSound('death_monk.wav');
	Asset.sound.death_succubus = Asset.importSound('death_succubus.wav');
	Asset.sound.alert_outcast = Asset.importSound('alert_outcast.wav');
	Asset.sound.alert_outcast2 = Asset.importSound('alert_outcast2.wav');
	Asset.sound.alert_chomper = Asset.importSound('alert_chomper.wav');
	Asset.sound.alert_rascal = Asset.importSound('alert_rascal.wav');
	Asset.sound.alert_rascal2 = Asset.importSound('alert_rascal2.wav');
	Asset.sound.alert_zombie = Asset.importSound('alert_zombie.wav');
	Asset.sound.alert_zombie2 = Asset.importSound('alert_zombie2.wav');
	Asset.sound.alert_maniac = Asset.importSound('alert_maniac.wav');
	Asset.sound.alert_maniac2 = Asset.importSound('alert_maniac2.wav');
	//Asset.sound.alert_maniac3 = Asset.importSound('alert_maniac3.wav');
	Asset.sound.alert_monk = Asset.importSound('alert_monk.wav');
	Asset.sound.alert_behemoth = Asset.importSound('alert_behemoth.wav');
	Asset.sound.alert_mangler = Asset.importSound('alert_mangler.wav');
	Asset.sound.alert_nose  = Asset.importSound('alert_nose.wav');
	Asset.sound.alert_ghast  = Asset.importSound('alert_ghast.wav');
	Asset.sound.oof_mangler  = Asset.importSound('oof_mangler.wav');
	Asset.sound.oof_bathory  = Asset.importSound('oof_bathory.wav');
	Asset.sound.oof_bathory2  = Asset.importSound('oof_bathory2.wav');
	Asset.sound.oof_bathory3  = Asset.importSound('oof_bathory3.wav');
	
	Asset.sound.death_building = Asset.importSound('death_building.wav');
	Asset.sound.death_tank = Asset.importSound('death_tank.wav');
	Asset.sound.death_walker = Asset.importSound('death_walker.wav');
	Asset.sound.hint = Asset.importSound('hint.wav');
	Asset.sound.hint2 = Asset.importSound('hint2.wav');
	Asset.sound.mouseover = Asset.importSound('mouseover.wav');
	//Asset.sound.bigsplash = Asset.importSound('bigsplash.wav');
	//Asset.sound.thunder = Asset.importSound('thunder1.wav');
	Asset.sound.push = Asset.importSound('push.wav');
	Asset.sound.fireball = Asset.importSound('fireball.wav');
	Asset.sound.fireball2 = Asset.importSound('fireball2.wav');
	Asset.sound.fireball_hit = Asset.importSound('fireball_hit.wav');
	Asset.sound.plasmapistol = Asset.importSound('plasmapistol.wav');
	Asset.sound.claw = Asset.importSound('claw.wav');
	Asset.sound.whoosh = Asset.importSound('whoosh2.wav');
	Asset.sound.whirl = Asset.importSound('whirl.wav');
	Asset.sound.scream_ghoul = Asset.importSound('scream_ghoul.wav');
	Asset.sound.scream_soul = Asset.importSound('scream_soul.wav');
	Asset.sound.plasmagun = Asset.importSound('plasma.wav');
	Asset.sound.soulfire = Asset.importSound('soulfire.wav');
	Asset.sound.shot_arachnose = Asset.importSound('shot_arachnose.wav');
	Asset.sound.glass_break = Asset.importSound('glass_break.wav');
	Asset.sound.jump = Asset.importSound('jump.wav');
	Asset.sound.pickup = Asset.importSound('pickup.wav');
	Asset.sound.button = Asset.importSound('button.wav');
	Asset.sound.puk = Asset.importSound('puk.wav');
	
	Asset.sound.phoneme_tv2 = Asset.importStory('phoneme_tv2.wav');
	Asset.sound.phoneme2 = Asset.importStory('phoneme2.wav');
	Asset.sound.phoneme_tv = Asset.importStory('phoneme_tv.wav');
	Asset.sound.phoneme3 = Asset.importStory('phoneme3.wav');
	Asset.sound.phoneme4 = Asset.importStory('phoneme4.wav');
	Asset.sound.phoneme5 = Asset.importStory('phoneme5.wav');
	Asset.sound.phoneme6 = Asset.importStory('phoneme6.wav');
	
	Asset.sound.heartbeat = Asset.importSound('heartbeat.wav');
	Asset.sound.step_water = Asset.importSound('sound_step_water.wav');
	Asset.sound.panel_in = Asset.importSound('panel_in.wav');
	Asset.sound.panel_out = Asset.importSound('panel_out.wav');
	Asset.sound.laika_walk_loop = Asset.importSound('laika_walk_loop.wav');
	Asset.sound.music1 = Asset.importSound('tracka.mp3');
	Asset.sound.music3 = Asset.importSound('station.mp3');
	Asset.sound.music4 = Asset.importSound('spooky.mp3');
	
	TexGroup.sand = new TexGroup([at.terrain_sand, at.rocks, at.terrain_grass]);
	TexGroup.rock = new TexGroup([at.rocks2,at.rock_beach, at.terrain_rock,at.cliff1,at.cliff2,at.crater]);
	TexGroup.vegetation = new TexGroup([ at.terrain_cobble]);
	TexGroup.dirt = new TexGroup([at.terrain_darkDirt, at.road, at.puddle]);
	TexGroup.concrete = new TexGroup([at.floor_noisy]);

	Asset.ANIM_tex_list = [WALL.bloodfall, WALL.waterfall, WALL.water_blood, WALL.water, WALL.news];
	WALL.bloodfall.animSource = [at.bloodfall0, at.bloodfall1, at.bloodfall2, at.bloodfall3];
	WALL.bloodfall.animSpeed = 8;
	WALL.waterfall.animSource = [at.waterfall0, at.waterfall1, at.waterfall2, at.waterfall3];
	WALL.waterfall.animSpeed = 8;
	WALL.news.animSource = [at.news0, at.news1, at.news2];
	WALL.water_blood.animSource = [at.water_blood0, at.water_blood1, at.water_blood2, at.water_blood3];
	WALL.water.animSource = [at.water0, at.water1, at.water2, at.water3];
	Asset.SKIES = [at.sky, at.sky2, at.sky3];
	
	WALL.water_blood.floor_damage = 5;
}

LoadingScreen.Init();
