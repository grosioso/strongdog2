"use strict";

var gl;
var gl_ext_aniso;
var gl_ext_loseContext;

var mvMatrix = mat4.create();
var mvpMatrix = mat4.create();
var modelMatrix = mat4.create();
var vMatrix = mat4.create();
var pMatrix = mat4.create();
var vpMatrix = mat4.create();
var guiMatrix = mat4.create();

var refl_mvMatrix = mat4.create();
var refl_vMatrix = mat4.create();
var refl_pMatrix = mat4.create();
var refl_vpMatrix = mat4.create();
var refl_mvLightMatrix = mat4.create();
var refl_mvFillMatrix = mat4.create(); //fill light

var mvpMatrix = mat4.create();
//var minimapMVPMatrix = mat4.create();
var mvLightMatrix = mat4.create();
var lastQuatMatrix = mat4.create();
var mvFillMatrix = mat4.create(); //fill light
var fillMatrix = mat4.create();
var lightMatrix = mat4.create();
var normalMatrix = mat3.create();
var View_Frustum = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
var View_Frustum_Points = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
var Selection_Frustum = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
var Ray_Frustum  = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
//var Shadow_Frustum  = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
//var Shadow_Frustum_Points = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];

var ParticleEffects = [];
var ShaderPrograms = [];

var shadowMVPMatrix = mat4.create();
var shadowProjMatrix = mat4.create();
var terrainTexVPMatrix = mat4.create();
var shadowViewMatrix = mat4.create();
var shadow_inv_matrix = mat4.create();
var shadowMapSize = 1024;
var terrainTexSize = 128;
var terrainTexTable = [];
var terrainFrameBuffer;
var refractionSize = 512;
var reflectionSize = 256;
var overlaySize = 256;
var shadowFramebuffer;
var shadowDepthTexture;
var rippleSize = 512;
var rippleFramebuffer;
var rippleTexture;

var particleVertexTexture;
var particlePosBuffer;

var terrianOverlayFramebuffer;
var terrainOverlayTexture;
var lightOverlayFramebuffer;
var lightOverlayTexture;
var refractionFramebuffer;
var refractionTexture;
var reflectionFramebuffer;
var reflectionTexture;
var postProcessTexture;
var postProcessFramebuffer;
var bloomTexture;
var bloomBlurTexture;
var bloomFramebuffer;
var bloomBlurFramebuffer;
var hudFramebuffer;
var hudTexture;
var hudSize = 64;

var Visible_Actors = [];
var Visible_RefractionActors = [[],[],[],[]]
var Visible_BloodDecals = [];
var Visible_Water = [];
var Visible_WaterWaves = [];
var Visible_BlendEmitters = [];
var Visible_Bounding_Boxes = [];
var Visible_ReflectionActors = [];
var Visible_ReflectionProbes = [];
var WorldGUI = [];

var Render = new Object();
Render.graphicsLevel = 0;
Render.pixelLevel = 1;
Render.drawTerrainGrid = false;
Render.drawShadows = true;
Render.drawEffects = true;
Render.drawReflections = true;
Render.drawUnitAO = true;
Render.actor_cull_outer = 30;
Render.partition_cull_radius = 2; //hack. Should implement a view-based partition culling
Render.show_whole_terrain = false;
Render.supersampling = 1;
Render.aniso = 1;
Render.shaderQuality = 1;
Render.shadowBoxSize = 1;
Render.shadowBoxSizeMultiplier = 1;
Render.lifebarScale = 1.4;
Render.frameDelta = 0;
Render.delta1 = 1;
Render.delta2 = 1;
Render.lastFrameTime = 0;
Render.frame_interp = 0;
//Render.lastShadowTime = 0;
Render.now = 0;
Render.cutoffZ = 99;
Render.cutoffZ_Terrain = 99;
Render.shadowPerturbSize = 1;
Render.drawEditorHelpers = true;
Render.alwaysDrawSpawners = false;
Render.drawBoundingBoxes = true;
Render.wireframeActors = false;
Render.maxDynamicEmitterCount = 256;
Render.drawType = 0; //lines or triangles
Render.terrainTex_startTile = [0,0];
Render.terrainTex_update_forced = false;
Render.terrainTex_update_painting = false;
Render.terrainTex_update_multiplexer = 0;
Render.terrainTex_update_passesLeft = 0;
Render.terrainTex_update_passesLeft = 0;
Render.showDamageMarkers = true;
Render.postProcess = true;
Render.pixelWidth = 100;
Render.pixelHeight = 100;
Render.shaderTime = 0; //used for scrolling/lighting effects
Render.shaderTimeSpeed = 0.008;
Render.ctr = 0;

Render.force_terrain_texture_update = function(){
	Render.terrainTex_update_forced = true;
}
Render.update_pixel_size = function(){
	Render.pixelWidth = Math.max(canvas.width,1);
	Render.pixelHeight = Math.max(canvas.height,1);
}
Render.togglePostProcess = function(bool){
	if(!Render.postProcess && bool==true){
		refreshPostProcessing();
	}
	Render.postProcess = bool;
}
//Render.shadowDrawMinTime = 20;

//bug with firefox: if context is initialized with antialias:false, depth buffer is 16-bit, not 24.
//possible solution: turn on stencil buffer as well (becomes 24depth 8stencil buffer).
function initGL(){
	gl = null;
	try{
		gl=canvas.getContext("webgl",{antialias:false,premultipliedAlpha: false,alpha: false, failIfMajorPerformanceCaveat: false});
	}catch(x){
		gl=null;
	}
	if(gl===null){
		try{
			gl=canvas.getContext("experimental-webgl",{antialias:false,premultipliedAlpha: false,alpha: false, failIfMajorPerformanceCaveat: true});
		}
		catch(x){
			gl=null;
		}
	}
	
	//gl.antialias = true;
	gl_ext_aniso = (
	  gl.getExtension('EXT_texture_filter_anisotropic') ||
	  gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
	  gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
		);

	//gl.Enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
	gl.viewportWidth = canvas.width;
	gl.viewportHeight = canvas.height;
	var ext = gl.getExtension('OES_texture_float');
	var ext2 = gl.getExtension('OES_texture_float_linear');
	if (!gl){
		alert("Failed to initialize WebGL");
	}
	
	gl_ext_loseContext = gl.getExtension("WEBGL_lose_context");
}

function webGLStart(){
	//console.log(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
	//console.log(gl.getParameter(gl.MAX_VERTEX_ATTRIBS), gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
	for(var i= 0;i< Asset.numberOfTextures;++i){
		initTexture(Textures[i], Textures[i].isTiled);
	}
	LightDecal.Init_AO_Buffer();
	shadowDepthTexture = createRenderToTextureOutput(true);
	
	for(var i=0;i<8;++i){
		terrainTexTable[i] = [];
		for(var j=0;j<8;++j){
			terrainTexTable[i][j] = createRenderToTextureOutput(true);
		}
	}

	setShadowResolution(1024);
	setTerrainTexResolution(128);
	terrainOverlayTexture = createRenderToTextureOutput(true);
	terrianOverlayFramebuffer = initRenderToTextureFramebuffer(terrainOverlayTexture , overlaySize, overlaySize, false);
	lightOverlayTexture = createRenderToTextureOutput(true);
	lightOverlayFramebuffer = initRenderToTextureFramebuffer(lightOverlayTexture , overlaySize, overlaySize, false);
	refractionTexture = createRenderToTextureOutput(true);
	refractionFramebuffer = initRenderToTextureFramebuffer(refractionTexture , refractionSize, refractionSize,false);
	reflectionTexture = createRenderToTextureOutput(true);
	reflectionFramebuffer = initRenderToTextureFramebuffer(reflectionTexture , reflectionSize, reflectionSize, false);
	rippleTexture = createRenderToTextureOutput(true);
	rippleFramebuffer = initRenderToTextureFramebuffer(rippleTexture , rippleSize, rippleSize, false);
	//postProcessTexture = createRenderToTextureOutput(true);
	//postProcessFramebuffer = initRenderToTextureFramebuffer(postProcessTexture, canvas.width, canvas.height, false);
	hudTexture = createRenderToTextureOutput(false);
	hudFramebuffer = initRenderToTextureFramebuffer(hudTexture , hudSize, hudSize, false);
	
	for(var i=0;i<Models.length;++i){
		initBuffers(Models[i]);
		//Models[i].buffersBackup = null;
	}
	initGUIAssets();
	
	var w = ParticleActor.motionRes;
	var h = Render.maxDynamicEmitterCount;
	particlePosBuffer =  new Float32Array(w*h*4);
	for(var i=0;i<h;++i){
		for(var j=0;j<w;++j){
			particlePosBuffer[4*(i*w+j)]=0;
			particlePosBuffer[4*(i*w+j)+1]=0;
			particlePosBuffer[4*(i*w+j)+2]=0;
			particlePosBuffer[4*(i*w+j)+3] =1.;
		}
	}
	particleVertexTexture = createTexture_From_Array(particlePosBuffer,h,w,true, true);
	
	for(var i=0;i<ParticleEffects.length;++i){
		initBuffers(ParticleEffects[i]);
	}
	
	gl.clearColor(0.9,0.9,0.9,1);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LESS);
	gl.blendFunc(gl.ONE_MINUS_DST_COLOR, gl.ONE);
	gl.enable(gl.CULL_FACE);
	gl.cullFace(gl.BACK);
	//gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
}

//webgl context loss handling
canvas.addEventListener("webglcontextlost", function(event){
    //event.preventDefault();
		if(DESKTOP_VERSION){
			ipcRenderer.send('voor-reload',null);
		}else{
			console.log ("CONTEXT LOST");
		}
}, false);

function gl_restore(){
	initGL();
	webGLStart();
	M.terrain.blendTexture = createTexture_From_Array(M.terrain.blendBuffer, M.terrain.texWidth, M.terrain.texHeight, true);
	M.terrain.waterTexture = createTexture_From_Array(M.terrain.waterBuffer, M.terrain.texWidth, M.terrain.texHeight, true);
	Pathfinder.FOW_Texture = createTexture_From_Array(Pathfinder.FOW_TextureBuffer,Pathfinder.FOW_Texture_Size,Pathfinder.FOW_Texture_Size, true);
	initTerrainBuffers(M.terrain);
	TextureAsset.InitTerrainTextures();
	Minimap.Initialize();
	GUI.restoreContext();
	for(var i=0;i<Actors.length;++i){
		if(Actors[i].isDecal == true){
			Actors[i].model.moveTo(Actors[i].x, Actors[i].y);
		}else if(Actors[i].isParticle == true){
			Actors[i].model.init();
		}
	}
	for(var i=0;i<ShaderPrograms.length;++i){
		ShaderPrograms[i].init();
	}
}


canvas.addEventListener("webglcontextrestored", gl_restore , false);


function setAniso( aniso ){
	if(!gl_ext_aniso){
		return;
	}
	Render.aniso = aniso;
	for(var i= 0;i< Textures.length;++i){
		var texture = Textures[i];
		if(texture.nearest_neighbor){continue;}
		gl.bindTexture(gl.TEXTURE_2D, texture.buffer);
		gl.texParameterf(gl.TEXTURE_2D, gl_ext_aniso.TEXTURE_MAX_ANISOTROPY_EXT, aniso);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
}

function setShadowResolution(size){
	shadowMapSize = size;
	shadowFramebuffer = initRenderToTextureFramebuffer(shadowDepthTexture , shadowMapSize, shadowMapSize, false);
}

function setTerrainTexResolution(size){
	terrainTexSize = size;
	if(terrainFrameBuffer == undefined){
		 terrainFrameBuffer = gl.createFramebuffer();
	}
	var buf = terrainFrameBuffer;
    gl.bindFramebuffer(gl.FRAMEBUFFER, buf);
    buf.width = terrainTexSize;
    buf.height = terrainTexSize;
	var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, buf.width, buf.height);
	//gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
	//tidying up
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	Render.terrainTex_updated_this_frame = false;
	Render.force_terrain_texture_update();
	
	for(var i=0;i<terrainTexTable.length;++i){
		for(var j=0;j<terrainTexTable[i].length;++j){
			gl.bindTexture(gl.TEXTURE_2D, terrainTexTable[i][j].buffer );
			if(terrainTexSize < 300){
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			}else{
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
			}
		}
	}
}

function initBuffers(_model){
	if(!gl){
		return;//if a model is loaded before initGL
	}

	_model.drawShaderFrameCombos = [];
	_model.primitiveCount = 0;
	if(_model.multiple_frames != true ){
		_model.numFrames = 1;
		_model.buffers[0] = gl.createBuffer();
		var vertices = _model.posToBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, _model.buffers[0]);
		gl.bufferData(gl.ARRAY_BUFFER, vertices,gl.STATIC_DRAW);
		_model.buffers[0].numItems = vertices.length/3;
		
		if(_model.normToBuffer != undefined){
			_model.buffers[1] = gl.createBuffer();
			var normals = _model.normToBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, _model.buffers[1]);
			gl.bufferData(gl.ARRAY_BUFFER, normals,gl.STATIC_DRAW);
			_model.buffers[1].numItems = normals.length/3;
		}
		
		_model.primitiveCount = _model.buffers[0].numItems;
		
	}else{ //frame collection import
		_model.buffers[0] = [];
		var numFrames = _model.numFrames;
		for(var i=0;i<numFrames;++i){
			_model.buffers[0][i] = gl.createBuffer();
			var vertices = _model.posToBuffer(i);
			gl.bindBuffer(gl.ARRAY_BUFFER, _model.buffers[0][i]);
			gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
			_model.buffers[0][i].numItems = vertices.length/3;
		}
		_model.primitiveCount = _model.buffers[0][0].numItems;
		
		if(_model.normToBuffer != undefined){
			_model.buffers[1] = [];
			for(var i=0;i<numFrames;++i){
				_model.buffers[1][i] = gl.createBuffer();
				var normals = _model.normToBuffer(i);
				gl.bindBuffer(gl.ARRAY_BUFFER, _model.buffers[1][i]);
				gl.bufferData(gl.ARRAY_BUFFER, normals,gl.STATIC_DRAW);
				_model.buffers[1][i].numItems = normals.length/3;
			}
		}
		
		/*_model.buffers[4] = gl.createBuffer();
		var vertIds = _model.vertIdToBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, _model.buffers[4]);
		gl.bufferData(gl.ARRAY_BUFFER, vertIds,gl.STATIC_DRAW);
		_model.buffers[4].numItems = vertIds.length;*/
	}
	
	if(_model.noTexCoords != true){
		_model.buffers[2] = gl.createBuffer();
		var texCoords = _model.texCoordToBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, _model.buffers[2]);
		gl.bufferData(gl.ARRAY_BUFFER, texCoords,gl.STATIC_DRAW);
		_model.buffers[2].numItems = texCoords.length/2;
	}
	
	if(_model.hasVertexColor == true){
		_model.buffers[3] = gl.createBuffer();
		var vertColors = _model.vertColorToBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, _model.buffers[3]);
		gl.bufferData(gl.ARRAY_BUFFER, vertColors,gl.STATIC_DRAW);
		_model.buffers[3].numItems = vertColors.length/3;
	}
	
	if(_model.waitingForLoad == false){
		if(_model.keepMeshData == false){
			if(!Asset.keepModelData){
				_model.fverts = null;
				_model.vertsArray = null;
				_model.fcolors = null;
				_model.vertColors = null;
				_model.normsArray = null;
				_model.texCoords = null;
				_model.fnorms = null;
				_model.ftexCoords = null;
			}
		}else{ //Used for custom navmeshes
			_model.getMeshNetwork();
		}
	}
}

function initTerrainTileBuffers(_model){
	_model.buffers[0] = gl.createBuffer();
	var vertices = _model.posToBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, _model.buffers[0]);
	gl.bufferData(gl.ARRAY_BUFFER, vertices,gl.STATIC_DRAW);
	_model.buffers[0].numItems = vertices.length/3;
	
	_model.primitiveCount = _model.buffers[0].numItems;
		
	_model.buffers[1] = gl.createBuffer();
	var normals = _model.normToBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, _model.buffers[1]);
	gl.bufferData(gl.ARRAY_BUFFER, normals,gl.STATIC_DRAW);
	_model.buffers[1].numItems = normals.length/3;
	
	_model.buffers[3] = gl.createBuffer();
	var vertColors = _model.vertColorToBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, _model.buffers[3]);
	gl.bufferData(gl.ARRAY_BUFFER, vertColors,gl.STATIC_DRAW);
	_model.buffers[3].numItems = vertColors.length/3;
}

function initGUIAssets(){
	GUI.rectClipVertexBuffer = gl.createBuffer();
	vertices = [ -1,1,0, -1,-1,0, 1,-1,0,  1,-1,0,  1,1,0 , -1, 1,0];
	gl.bindBuffer(gl.ARRAY_BUFFER, GUI.rectClipVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.STATIC_DRAW);
	GUI.rectClipVertexBuffer.numItems = vertices.length/3;
	
	GUI.rectCornerVertexBuffer = gl.createBuffer();
	var vertices = [ 0,0,0, 0,-1,0, 1,-1,0,  1,-1,0,  1,0,0 , 0, 0,0];
	gl.bindBuffer(gl.ARRAY_BUFFER, GUI.rectCornerVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.STATIC_DRAW);
	GUI.rectCornerVertexBuffer.numItems = vertices.length/3;
	
	GUI.rectCenterVertexBuffer = gl.createBuffer();
	vertices = [ -.5,.5,0, -.5,-.5,0, .5,-.5,0,  .5,-.5,0,  .5,.5,0 , -.5, .5,0];
	gl.bindBuffer(gl.ARRAY_BUFFER, GUI.rectCenterVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.STATIC_DRAW);
	GUI.rectCenterVertexBuffer.numItems = vertices.length/3;
	
	GUI.rectCenterXVertexBuffer = gl.createBuffer();
	vertices = [ -.5,0,0, -.5,-1,0, .5,-1,0,  .5,-1,0,  .5,0,0 , -.5,0,0];
	gl.bindBuffer(gl.ARRAY_BUFFER, GUI.rectCenterXVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.STATIC_DRAW);
	GUI.rectCenterXVertexBuffer.numItems = vertices.length/3;
	
	GUI.rectTexCoordBuffer = gl.createBuffer();
	vertices = [ 0,1, 0,0, 1,0, 1,0,  1,1, 0,1];
	gl.bindBuffer(gl.ARRAY_BUFFER, GUI.rectTexCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.STATIC_DRAW);
	GUI.rectTexCoordBuffer.numItems = vertices.length/2;
	
	GUI.minimapReticleBuffer = gl.createBuffer();
	GUI.minimapReticleBuffer.numItems = 6;
	
	GUI.asset_rectCorner[0] = GUI.rectCornerVertexBuffer;
	GUI.asset_rectCorner[1] = GUI.rectTexCoordBuffer;
	GUI.asset_rectCenter[0] = GUI.rectCenterVertexBuffer;
	GUI.asset_rectCenter[1] = GUI.rectTexCoordBuffer;
	GUI.asset_rectCenterX[0] = GUI.rectCenterXVertexBuffer;
	GUI.asset_rectCenterX[1] = GUI.rectTexCoordBuffer;
	GUI.asset_minimapReticle[0] = GUI.minimapReticleBuffer;
	GUI.asset_minimapReticle[1] = GUI.rectTexCoordBuffer;
	
	
	var texCoords = new Float32Array(12*9);
	//top row
	addQuadUV2D(texCoords,0,1,1,0.75,0.75);
	addQuadUV2D(texCoords,12,0.75,1,0.25,0.75);
	addQuadUV2D(texCoords,24,0.25,1,0,0.75);
	//middle row
	addQuadUV2D(texCoords,36,1,0.75,0.75,0.25);
	addQuadUV2D(texCoords,48,0.75,0.75,0.25,0.25);
	addQuadUV2D(texCoords,60,0.25,0.75,0,0.25);
	//bottom row
	addQuadUV2D(texCoords,72,1,0.25,0.75,0);
	addQuadUV2D(texCoords,84,0.75,0.25,0.25,0);
	addQuadUV2D(texCoords,96,0.25,0.25,0,0);
	
	GUI.rect9sliceTexCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, GUI.rect9sliceTexCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, texCoords,gl.STATIC_DRAW);
	GUI.rect9sliceTexCoordBuffer.numItems = texCoords.length/2;
}

function updateMinimapReticleBuffer(){
	var vertices = new Float32Array(18);
	var p11 = rayCastScreen(Render.pixelWidth,Render.pixelHeight,0).slice();
	var p12 = rayCastScreen(Render.pixelWidth,0,0).slice();
	var p21 = rayCastScreen(0,Render.pixelHeight,0).slice();
	var p22 = rayCastScreen(0,0,0).slice();
	//first tri
	vertices[0] = p21[0]; vertices[1] = p21[1];
	vertices[3] = p11[0]; vertices[4] = p11[1];
	vertices[6] = p12[0]; vertices[7] = p12[1];
	//second tri
	vertices[9] = p12[0]; vertices[10] = p12[1];
	vertices[12] = p22[0]; vertices[13] = p22[1];
	vertices[15] = p21[0]; vertices[16] = p21[1];
	gl.bindBuffer(gl.ARRAY_BUFFER, GUI.minimapReticleBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

}
//var TEXTELEM_DEBUG = false;
function initTextBuffers(elem){
	var text = elem.text;
	elem.asset = [];
	var size = elem.fontSize/24;
	var spaceSize = elem.fontSize * elem.spaceSize/600;
	var lineOffset = elem.fontSize/300 * elem.lineHeight;

	var offsets = elem.font.charWidths;
	var offsets_y = elem.font.charHeights;
	var coords = elem.font.charCoords;
	var align = elem.textAlign;
	
	var verts = new Float32Array(text.length*18);
	var texCoords = new Float32Array(text.length*12);
	var maxX = -999;
	var maxY = -999;
	var minX = 999;
	var minY = 999;
	
	//get all line lengths
	var lineLengths = [0];
	var lineId = 0;
	var len = 0;
	var charLength = 0;
	var wordLength=0;
	var wordCharCount = 0;
	var lineWordCount = 0;
	var lastCode = 0;
	var code = 0;
	for(var i=0;i<text.length;++i){
		lastCode = code;
		code = text.charCodeAt(i);
		var charId = code-33;
		
		if(code >=33&&code<=126){
			//add a character to current word
			charLength = offsets[charId]*size*elem.char_spacing;
			len += charLength;
			wordCharCount ++;
			wordLength += charLength;
		}else{
			//not a word
			wordLength = 0;
			wordCharCount = 0;
		}
		
		if(code == 10 || code == 11 || code == 12){
			//newline
			lineWordCount = 0;
			lineLengths[lineId] = len - 0.0001;//rounding errors can lead to bad line breaking
			lineId ++;
			len = 0;
		}else if(len > elem.textWidth && lineWordCount>0){ 
			//word is too long, take it to the next line
			len -= wordLength;
			i -= wordCharCount;
			
			wordLength = 0;
			wordCharCount = 0;
			lineWordCount = 0;
			lineLengths[lineId] = len - 0.0001;//rounding errors can lead to bad line breaking
			lineId ++;
			len = 0;
		}else if(code < 33 || code > 126){
			//white character
			len += spaceSize;
			if(lastCode >=33 && lastCode<=126){
				//a word was before the whitechar
				lineWordCount ++;
			}
		}
		//if(TEXTELEM_DEBUG){
		//	console.log(text[i], len);
		//}
	}
	lineLengths[lineId] = len;
	
	//if(TEXTELEM_DEBUG){
	//	console.log(lineLengths)
	//}
		
	//start constructing buffer
	lineId = 0;
	var offX = 0;
	var lineOffX = 0;
	if(elem.textAlign == GUI.align_center){
		lineOffX = - lineLengths[lineId]*0.5;
	}else if(elem.textAlign == GUI.align_right){
		lineOffX = elem.textWidth-lineLengths[lineId];
	}
	var offY = 0;
	var quadId = 0;
	
	for(var i=0;i<text.length;++i){
		var code = text.charCodeAt(i);
		var charId = code-33;
		
		if(offX >= lineLengths[lineId] || code == 10 || code == 11 || code == 12){
			//new line
			if(code == 12){
				offY -= 0;
			}else if(code == 11){
				offY -= lineOffset*0.75;
			}else{
				offY -= lineOffset;
			}
			
			offX = 0;
			lineId++;
			
			if(elem.textAlign == GUI.align_center){
				lineOffX = - lineLengths[lineId]*0.5;
			}else if(elem.textAlign == GUI.align_right){
				lineOffX = elem.textWidth-lineLengths[lineId];
			}
			
			if(code == 10 || code == 11 || code == 12){ //newline whitechar
				continue;
			}
		}
		
		if(code < 33 || code > 126){
			offX += spaceSize;
			//if(TEXTELEM_DEBUG){
			//	console.log(text[i], offX);
			//}
			continue;//white char
		}
		
		var charWidth = offsets[charId]*size;
		var charHeight = offsets_y[charId]*size;
		var charCoords = coords[charId];
		var charOffX = lineOffX+offX;
		var idx = quadId*18;
		addQuadPos2D(verts,idx,charOffX,offY,charWidth,charHeight)
		
		minX = Math.min(minX, charOffX);
		minY = Math.min(minY, -offY);
		maxX = Math.max(maxX, charOffX+charWidth);
		maxY = Math.max(maxY, -(offY-charHeight));
		
		idx = quadId*12;
		addQuadUV2D(texCoords, idx, charCoords[0],charCoords[1],charCoords[2],charCoords[3]);
		offX += charWidth*elem.char_spacing;
		quadId ++;
		//if(TEXTELEM_DEBUG){
		//	console.log(text[i], offX);
		//}
	}
	
	elem.asset[0] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, elem.asset[0]);
	gl.bufferData(gl.ARRAY_BUFFER, verts,gl.STATIC_DRAW);
	elem.asset[0].numItems = verts.length/3;
	
	elem.asset[1] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, elem.asset[1]);
	gl.bufferData(gl.ARRAY_BUFFER, texCoords ,gl.STATIC_DRAW);
	elem.asset[1].numItems = texCoords.length/2;
	
	elem.textBounds = [minX,minY,maxX,maxY];
}

function init9slice(elem,borderX,borderY){
	var centerW = elem.w-borderX*2;
	var centerH = elem.h-borderY*2;
	var verts = new Float32Array(18*9);
	elem.asset = [];
	centerW/=elem.w;
	centerH/=elem.h;
	borderX/=elem.w;
	borderY/=elem.h;
	//top row
	addQuadPos2D(verts,0,0,0,borderX,borderY);
	addQuadPos2D(verts,18,borderX,0,centerW,borderY);
	addQuadPos2D(verts,36,borderX+centerW,0,borderX,borderY);
	//middle row
	addQuadPos2D(verts,54,0,-borderY,borderX,centerH);
	addQuadPos2D(verts,72,borderX,-borderY,centerW,centerH);
	addQuadPos2D(verts,90,borderX+centerW,-borderY,borderX,centerH);
	//bottom row
	addQuadPos2D(verts,108,0,-borderY-centerH,borderX,borderY);
	addQuadPos2D(verts,126,borderX,-borderY-centerH,centerW,borderY);
	addQuadPos2D(verts,144,borderX+centerW,-borderY-centerH,borderX,borderY);
	
	elem.asset[0] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, elem.asset[0]);
	gl.bufferData(gl.ARRAY_BUFFER, verts ,gl.STATIC_DRAW);
	elem.asset[0].numItems = verts.length/3;
	
	elem.asset[1] = GUI.rect9sliceTexCoordBuffer;
}

function addQuadPos2D(buf, bufId, x,y,w,h){
	buf[bufId] = x;
	buf[bufId+1] = y;
	buf[bufId+2] = 0;
	buf[bufId+3] = x;
	buf[bufId+4] = y-h;
	buf[bufId+5] = 0;
	buf[bufId+6] = x+w;
	buf[bufId+7] = y-h;
	buf[bufId+8] = 0;
	buf[bufId+9] = x+w;
	buf[bufId+10] = y-h;
	buf[bufId+11] = 0;
	buf[bufId+12] = x+w;
	buf[bufId+13] = y;
	buf[bufId+14] = 0;
	buf[bufId+15] = x;
	buf[bufId+16] = y;
	buf[bufId+17] = 0;
}
//topleft xy, bottomright xy
function addQuadUV2D(buf, bufId, c0,c1,c2,c3){
	buf[bufId] = c0;
	buf[bufId+1] = c1;
	buf[bufId+2] = c0;
	buf[bufId+3] = c3;
	buf[bufId+4] = c2;
	buf[bufId+5] = c3;
	buf[bufId+6] = c2;
	buf[bufId+7] = c3;
	buf[bufId+8] = c2;
	buf[bufId+9] = c1;
	buf[bufId+10] = c0;
	buf[bufId+11] = c1;
}

function initTerrainBuffers(t){
	for(var i=0;i<t.Tiles.length;++i){
		for(var j=0;j<t.Tiles[i].length;++j){
			initTerrainTileBuffers(t.Tiles[i][j]);
		}
	}
}

function view_init(camera){
	var aspect = Render.pixelWidth/ Render.pixelHeight;
	
	//mat4.ortho(pMatrix,-camera.fov*aspect,camera.fov*aspect,-camera.fov,camera.fov,-200,200);
	mat4.perspective(pMatrix,camera.fov, aspect, camera.near, camera.far);
	mat4.identity(vMatrix);
	
	mat4.identity(lightMatrix);
	mat4.translate(lightMatrix,lightMatrix,Environment.lightPosition);
	mat4.identity(fillMatrix);
	mat4.translate(fillMatrix,fillMatrix,Environment.fillPosition);
	
	if(cam.shearPitch){
		mat4.rotate(vMatrix,vMatrix,1.57,[-1,0,0]);
		mat4.shearX(vMatrix, vMatrix,  Math.tan(Math.max(-1, Math.min(1, camera.pitch-1.57))));
	}else{
		mat4.rotate(vMatrix,vMatrix,camera.pitch,[-1,0,0]);
	}
	mat4.rotate(vMatrix,vMatrix,camera.roll,[0,1,0]);
	mat4.rotate(vMatrix,vMatrix,camera.yaw,[0,0,1]);
	mat4.mul(mvLightMatrix,vMatrix,lightMatrix);
	mat4.mul(mvFillMatrix,vMatrix,fillMatrix);
	
	var eye = camera.getEyePos();
	vec3.scale(eye,eye,-1);
	mat4.translate(vMatrix,vMatrix, eye);
	
	mat4.mul(vpMatrix, pMatrix, vMatrix);
	mat4.invert(camera.inv_PV_Matrix,vpMatrix);

	/*mat4.identity(refl_vMatrix);
	mat4.perspective(refl_pMatrix,camera.fov, aspect, 30, 500);
	var reflectionPitch = 3.1415-camera.pitch ;
	mat4.rotate(refl_vMatrix,refl_vMatrix,reflectionPitch,[-1,0,0]);
	mat4.rotate(refl_vMatrix,refl_vMatrix,camera.yaw,[0,0,1]);
	mat4.mul(refl_mvLightMatrix,refl_vMatrix,lightMatrix);
	mat4.mul(refl_mvFillMatrix,refl_vMatrix,fillMatrix);
	eye = camera.getEyePos_customAngle( -camera.yaw, reflectionPitch);
	eye[2] += Environment.waterZ*2;
	vec3.scale(eye,eye,-1);
	mat4.translate(refl_vMatrix,refl_vMatrix, eye);
	mat4.mul(refl_vpMatrix, refl_pMatrix, refl_vMatrix);*/
	
	update_frustum_planes(View_Frustum,cam.inv_PV_Matrix, [1,1],[-1,-1], View_Frustum_Points);
	
	//Initialize shadow frustum
	var shadSize = Math.max(1, cam.distance/6) * Render.shadowBoxSizeMultiplier * Environment.shadowBoxCustomScale;
	Render.shadowBoxSize = shadSize;
	mat4.ortho(shadowProjMatrix,-10 * shadSize ,+10 * shadSize,-15 * shadSize,+15 * shadSize,-20 * shadSize,40 * shadSize);
	mat4.identity(shadowViewMatrix);
	mat4.rotate(shadowViewMatrix,shadowViewMatrix,cam.yaw,[0,0,1]);
	mat4.lookAt(shadowViewMatrix, Environment.lightPosition ,[0,0,0],[0,1,0]);
	mat4.mul(shadowMVPMatrix,shadowProjMatrix,shadowViewMatrix);
	//rounding the coordinates eliminates aliasing on most frames
	//ideal would be a step that has the same size as a pixel of the shadow map.
	mat4.translate(shadowMVPMatrix, shadowMVPMatrix, 
	[Math.round(-cam.pos[0] - Environment.shadowBoxOffset[0]), 
	Math.round(-cam.pos[1] - Environment.shadowBoxOffset[1]), 
	Math.round(-cam.pos[2]) - 1 - Environment.shadowBoxOffset[2]]);
	
	//mat4.invert(shadow_inv_matrix, shadowMVPMatrix);
	//update_frustum_planes(Shadow_Frustum,shadow_inv_matrix, [1,1],[-1,-1], Shadow_Frustum_Points);
}

function draw_init(camera){
	gl.viewport(0,0,canvas.width, canvas.height);
	draw_buffer_reset();
}
function draw_buffer_reset(){
	gl.enable(gl.DEPTH_TEST);
	gl.depthMask(true);
	gl.clearDepth(1.);
	gl.clearColor(0,0,0,1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}


function compare_actors(a,b){
	if(a.ShaderModelFrameSortId > b.ShaderModelFrameSortId){
		return -1;
	}else if(a.ShaderModelFrameSortId < b.ShaderModelFrameSortId){
		return 1;
	}else{
		if(a.texture.sortId > b.texture.sortId){
			return -1;
		}else if(a.texture.sortId < b.texture.sortId){
			return 1;
		}else{
			return 0;
		}
		return 0;
	}
}

function compare_bloodDecals(a,b){
	if(a.shaderProgram == b.shaderProgram && a.timeLeft > b.timeLeft ){
		return -1;
	}else return 1;
}
function compare_blendEmitters(a,b){
	if(a.y > b.y){
		return -1;
	}else return 1;
}
function compare_waterLayer(a,b){
	if(a.group.id > b.group.id){
		return -1;
	}else return 1;
}

function compare_actor_texture(a,b){
	if(a.texture == b.texture){
		return 0;
	}
	return -1;
}


function check_all_actor_visibility(){
	var ctr = 0;
	var ctr_lights = 0;
	var ctr_blood = 0;
	var ctr_emitter = 0;
	var ctr_water = 0;
	var ctr_wave = 0;
	var ctrs = [0,0,0,0,0,0];
	var numberOfModelAssets = Model3d.nextSortId;
	
	var actorArrays = [Actors];
	var cull_rad = Render.partition_cull_radius;
	for(var i=-cull_rad;i<=cull_rad;++i){
		for(var j=-cull_rad;j<=cull_rad;++j){
			var partX = j+Math.floor(cam.pos[0]/16);
			var partY = i+Math.floor(cam.pos[1]/16);
			if(partY>=0&&partY<Doodads.length&&partX >= 0&&partX < Doodads[0].length){
				actorArrays.push(Doodads[partY][partX]);
			}
		}
	}
	
	Visible_ReflectionActors.length = 0;
	Visible_ReflectionProbes.length = 0;
	
	for(var k = 0;k<actorArrays.length;++k){
		for(var i = 0; i< actorArrays[k].length;++i){
			var actor = actorArrays[k][i];
			actor.checkVisibility();
			if(actor.visible == true){
				
				actor.update_drawloop();
				
				if(actor.renderLayer == 0){
					actor.ShaderModelFrameSortId = actor.shaderProgram.sortId * numberOfModelAssets
					+actor.model.sortId + actor.frame/64 + actor.nextFrame/4096;
					Visible_Actors[ctr] = actor;
					++ctr;
				}else if(actor.renderLayer == 2){
					Visible_BloodDecals[ctr_blood] = actor;
					++ctr_blood;
				}else if(actor.renderLayer == 1){
					Visible_Water[ctr_water] = actor;
					++ctr_water;
				}else if(actor.renderLayer == 3){
					Visible_BlendEmitters[ctr_emitter] = actor;
					++ctr_emitter;
				}else if(actor.renderLayer == 4){
					Visible_WaterWaves[ctr_wave] = actor;
					++ctr_wave;
				}else{
					//console.log("what layer is this?");
				}
			}
		}
	}

	Visible_Actors.length = ctr;
	Visible_BloodDecals.length = ctr_blood;
	Visible_BlendEmitters.length = ctr_emitter;
	Visible_Water.length = ctr_water;
	Visible_WaterWaves.length = ctr_wave;
	Visible_Actors.sort( compare_actors );
	Visible_ReflectionActors.sort(compare_actors);
	
	//no need for sorting, as we iterate through an already sorted array
	if(Visible_Water.length > 0){
		var ctr_refrac_array = [0,0,0,0];
		for(var i=0;i<Visible_Actors.length;++i){
			var actor = Visible_Actors[i];
			var w = M.terrain.getTileAt(actor.x, actor.y).waterActor;
			if(w != null && actor.z + actor.refractionLowerBound < w.group.z){
				Visible_RefractionActors[w.group.id][ctr_refrac_array[w.group.id]] = actor;
				ctr_refrac_array[w.group.id] ++ ;
			}
		}
		for(var i=0;i<Visible_RefractionActors.length;++i){
			if(Visible_RefractionActors[i].length > 0){
				Visible_RefractionActors[i].length = ctr_refrac_array[i];
			}
		}
	}
	
	Visible_BloodDecals.sort( compare_bloodDecals );
	Visible_BlendEmitters.sort( compare_blendEmitters);
	Visible_Water.sort( compare_waterLayer);
	
	ParticleActor.motionCount = Math.min(Render.maxDynamicEmitterCount, Math.max(1, Utils.NextPow2(1+ParticleActor.dynamic_Visible)));
	
	//once upon a time this only happened if motionCount>1, but it messed with the static emitters,
	//because the texture was not updated, but the reading coordinates were
	updateTexture_From_Array(particleVertexTexture,particlePosBuffer, ParticleActor.motionCount , ParticleActor.motionRes, true );
	
	if(Visible_Bounding_Boxes.length > 0){
		Visible_Bounding_Boxes = [];}
	if(Render.drawBoundingBoxes == true && Editor.selected.length > 0){
		for(var i=0;i<Visible_Actors.length;++i){
			var a = Visible_Actors[i];
			if(a.selected == true){
				//Visible_Bounding_Boxes.push(WorldRectActor.getVisBox(a));
				if(a.model.bound_width != undefined){
					//Visible_Bounding_Boxes.push(WorldRectActor.getSelectionBox(a));
					Visible_Bounding_Boxes.push(WorldRectActor.getSelectionMesh(a));
				}
			}
		}
	}
}

//IF YOU DON'T USE THE ATTRIBUTE, IT WILL BE REMOVED FROM THE SHADER!!! IT WILL CAUSE "index out of range" ERROR!
function draw_array_actors(arr){
	mat3.normalFromMat4(normalMatrix, vMatrix);
	var quality = Render.shaderQuality;
	var actorShader = null;
	var sh = null;
	var texture = null;
	var m;
	var frame;
	var nextFrame;
	var cullFace = true;
	gl.enable(gl.CULL_FACE);
	for(var i = 0; i< arr.length;++i){
		var actor = arr[i];
		if(actorShader!=actor.shaderProgram){
			if(sh != null){
				sh.disableAttribArrays();
				sh.shaderEnd();
			}
			m = actor.model;
			frame = actor.frame;
			nextFrame = actor.nextFrame;
			
			actorShader = actor.shaderProgram;
			sh = quality<1?actorShader.low_quality_alias:actorShader;
			gl.useProgram(sh.program);
			sh.shaderSwap(actor);
			sh.modelSwap(actor);
			sh.textureSwap(actor);
			
			if(cullFace != actor.cull_backfacing ){
				if(actor.cull_backfacing  == false){
					gl.disable(gl.CULL_FACE);
					cullFace = false;
				}else{
					gl.enable(gl.CULL_FACE);
					cullFace = true;
				}
			}
			
		}else if(m!= actor.model || actor.frame != frame || actor.nextFrame!=nextFrame){
			if(cullFace != actor.cull_backfacing ){
				if(actor.cull_backfacing  == false){
					gl.disable(gl.CULL_FACE);
					cullFace = false;
				}else{
					gl.enable(gl.CULL_FACE);
					cullFace = true;
				}
			}
			//sh.disableAttribArrays();
			m = actor.model;
			frame = actor.frame;
			nextFrame = actor.nextFrame;
			sh.modelSwap(actor);
			sh.textureSwap(actor);
		}
		if(texture != actor.texture){
			sh.textureSwap(actor);
		}
		texture = actor.texture;
		sh.set_individual_actor_data(actor);
		
		if(actor.use_material_ids){
			for(var j=0;j< m.mat_id_parts.length;++j){
				var mat = m.mat_id_parts[j];
				sh.materialSwap( actor, mat[0] );
				gl.drawArrays( Render.drawType , mat[1]*3 , mat[2]*3 );
			}
		}else{
			gl.drawArrays( Render.drawType , 0, m.primitiveCount);
		}
		
	}
	if(sh != null){
		sh.disableAttribArrays();
		sh.shaderEnd();
	}
}


function draw_terrain(t, waterGroup){
	
	
	var draw_startX = Math.max(0, Math.floor(cam.pos[0]/8) -4);
	var draw_startY = Math.max(0, Math.floor(cam.pos[1]/8) - 6);
	var draw_endX = Math.min(t.Tiles[0].length, draw_startX + 8);
	var draw_endY = Math.min(t.Tiles.length, draw_startY + 10);
	
	if(Render.show_whole_terrain){
		draw_startX = 0;
		draw_startY = 0;
		draw_endX = t.Tiles[0].length;
		draw_endY = t.Tiles.length;
	}
	
	var sh =  ShaderProgram.terrainShader;
	gl.useProgram(sh.program);
	sh.shaderSwap();
	for(var k=draw_startY;k< draw_endY;++k){
		for(var l=draw_startX;l< draw_endX;++l){
			var m = t.Tiles[k][l];
			m.frustum_cull();
			if(m.visible == false){
				continue;
			}
			if(waterGroup != null && (m.waterActor == null || m.waterActor.group != waterGroup)){
				continue;
			}
			//sh.modelSwap(m);
			//gl.drawArrays(gl.TRIANGLES, 0, m.primitiveCount);
		}
	}
	sh.disableAttribArrays();
	
	if(Render.drawTerrainGrid == true && Control.gameState == Control.gameState_inEditor){
		sh =  ShaderProgram.gridShader;
		gl.useProgram(sh.program);
		gl.uniformMatrix4fv(sh.mvpMatrixUniform, false, vpMatrix);
		gl.uniform3f(sh.worldPosUniform, -M.offsetX, -M.offsetY, 0);
		gl.enable(gl.BLEND);
		gl.depthMask(false);
		gl.disable(gl.DEPTH_TEST);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
		gl.activeTexture(gl.TEXTURE0);
		gl.uniform1i(sh.samplerUniform, 0);
		for(var k=draw_startY;k< draw_endY;++k){
			for(var l=draw_startX;l< draw_endX;++l){
				var m = t.Tiles[k][l];
				if(m.visible == false){
					continue;
				}
				if(waterGroup != null && (m.waterActor == null || m.waterActor.group != waterGroup)){
					continue;
				}
				gl.uniform4f(sh.tileSideBiasUniform, m.x + m.tileSideBias[0], m.y + m.tileSideBias[1], m.tileSideBias[2],m.tileSideBias[3]);
				sh.attributes[0].enable_and_bind( m.buffers[0]);
				sh.attributes[1].enable_and_bind( m.buffers[3]);
				if(m.selected == true){
					gl.bindTexture(gl.TEXTURE_2D, Asset.texture.circleGrid.buffer);
				}else{
					gl.bindTexture(gl.TEXTURE_2D, Asset.texture.grid.buffer);
				}
				
				gl.drawArrays(gl.TRIANGLES, 0, m.primitiveCount);

			}
		}
		sh.disableAttribArrays();
		gl.disable(gl.BLEND);
		gl.enable(gl.DEPTH_TEST);
		gl.depthMask(true);
	}
}


function drawHelperGrid(t){
	var sh =  ShaderProgram.heightShader;
	sh.shaderSwap();
	var m=Asset.model.water;
	sh.attributes[0].enable_and_bind( m.buffers[0][0]);
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, M.terrain.waterTexture.buffer);
	gl.disable(gl.CULL_FACE);
	for(var i=-2;i<2;++i){
		for(var j=-2;j<2;++j){
			gl.uniform3f(sh.modelPosUniform, j*4+Math.floor(Control.terrainCursorPos[0]),i*4+Math.floor(Control.terrainCursorPos[1]),0);
			gl.drawArrays(gl.TRIANGLES, 0, m.primitiveCount);
		}
	}
	sh.disableAttribArrays();
	gl.disable(gl.BLEND);
	gl.depthMask(true);
	gl.enable(gl.CULL_FACE);
}

//we create a new tex table and put the reusable textures in, with the right offset
//then we only draw the missing textures 
function draw_terrainTexture(t){
	
	var forced_all = Render.terrainTex_update_forced;
	var forced_painting = Render.terrainTex_update_painting;
	Render.terrainTex_update_forced = false;
	Render.terrainTex_update_painting = false;
	
	var drawW = terrainTexTable[0].length ; var drawH = terrainTexTable.length;
	var tab_startX = Math.floor(cam.pos[0]/8) - 4;
	var tab_startY = Math.floor(cam.pos[1]/8) - 4;

	var diffX = tab_startX - Render.terrainTex_startTile[0];
	var diffY = tab_startY - Render.terrainTex_startTile[1];
	var firstPass = false;
	if(forced_all != true && (diffX != 0 || diffY != 0)){
		firstPass = true;
		Render.terrainTex_update_passesLeft = terrainTexTable.length;
	}
	Render.terrainTex_startTile[0] = tab_startX;
	Render.terrainTex_startTile[1] = tab_startY;
	if(forced_all != true && forced_painting != true && Render.terrainTex_update_passesLeft <= 0){return;}
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, terrainFrameBuffer);
	gl.viewport(0,0,terrainTexSize,terrainTexSize);
	mat4.identity(terrainTexVPMatrix);
	mat4.scale(terrainTexVPMatrix, terrainTexVPMatrix, [0.25,0.25,0]);
	mat4.translate(terrainTexVPMatrix, terrainTexVPMatrix, [-4,-4,0]);
	
	var sh =  ShaderProgram.terrainTextureShader;
	gl.useProgram(sh.program);
	sh.shaderSwap();

	var newTable = [];
	for(var i=0;i<drawH;++i){
		newTable[i] = [];
		var oldTableY = (i + diffY + drawH*10) % (drawH);
		for(var j=0;j<drawW;++j){
			var oldTableX = (j + diffX + drawW*10) % (drawW);
			if(oldTableY <0 || oldTableX <0){
				console.log("TEXTURE CELL!");
				continue;
			}
			newTable[i][j] = terrainTexTable[oldTableY][oldTableX];
			var tex = newTable[i][j];
			if(!tex){
				console.log("TEXTURE!");
				continue;
			}
			var last_update_finished = true; 
			
			var tileY = i+tab_startY;
			var tileX = j+tab_startX;
			if(tileY < 0 ||tileY >= t.Tiles.length || tileX < 0 || tileX >= t.Tiles[0].length){
				continue;
			}
			var m = t.Tiles[tileY][tileX];
			
			var forced = forced_all || m.needRepaint;
			if(firstPass == true){
				if(m.texUpdateFinished == false){
					//the last process might not have had time to finish all 8 passes
					last_update_finished = false;
				}
				m.texUpdateFinished = false;
			}
			
			if( forced != true){
				if(firstPass==true && last_update_finished == true){
					//tile is part of old table and is up to date
					if(j + diffX == oldTableX && i+diffY == oldTableY){
						m.texUpdateFinished = true;
					}
				}
				if((j+i) %terrainTexTable.length != Render.terrainTex_update_multiplexer ){
					//tile is not on the currently updated diagonal
					continue;
				}
			}
			if(m.texUpdateFinished == true && forced != true){
				continue; 
			}
			
			gl.bindTexture(gl.TEXTURE_2D, tex.buffer);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, terrainTexSize, terrainTexSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex.buffer , 0);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
			m.terrainTex  = tex;
			sh.modelSwap(m);
			gl.drawArrays(gl.TRIANGLES, 0, m.primitiveCount);
			m.texUpdateFinished = true;
			m.needRepaint = false;
			if(terrainTexSize > 300){
				gl.bindFramebuffer(gl.FRAMEBUFFER, null);
				gl.bindTexture(gl.TEXTURE_2D, tex.buffer);
				gl.generateMipmap(gl.TEXTURE_2D);
				gl.bindFramebuffer(gl.FRAMEBUFFER, terrainFrameBuffer);
			}
		}
	}
	
	terrainTexTable = newTable;
	sh.disableAttribArrays();
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.depthMask(true);
	
	Render.terrainTex_update_multiplexer ++;
	Render.terrainTex_update_multiplexer %= terrainTexTable.length;
	Render.terrainTex_update_passesLeft --;
}

function draw_lifebars(){
	var sh = ShaderProgram.lifebarShader;
	gl.useProgram(sh.program);

	sh.shaderSwap();
	
	for(var i=0;i<Visible_Actors.length;++i){
		var a = Visible_Actors[i];
		if(a.owner == null || a.owner.alive == false || !a.owner.proto || a.owner.proto.isItem){continue;}
		
		if(a.owner.selected /*|| Control.highlitUnit == a.owner*/){
			sh.set_individual_actor_data(a);
			gl.drawArrays(gl.TRIANGLES, 0, GUI.rectCenterVertexBuffer.numItems);
		}
	}
}

function draw_rippleTexture(){
	gl.bindFramebuffer(gl.FRAMEBUFFER, rippleFramebuffer );
	gl.viewport(0,0,rippleSize,rippleSize);
	gl.clearColor(0.50,0.50,0.5,0.5);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	if(Render.drawEffects){
		var vpMatrix_backup = mat4.create();
		mat4.copy(vpMatrix_backup, vpMatrix);
		mat4.identity(vpMatrix);
		var gridPerBuf = Pathfinder.FOW_Texture_Size * 0.5;
		//gridPerBuf = 4;
		vpMatrix[0] /= gridPerBuf;
		vpMatrix[5] /= gridPerBuf;
		vpMatrix[10] /= gridPerBuf;
		mat4.translate(vpMatrix, vpMatrix, [-Pathfinder.FOW_last_update_pos[0], -Pathfinder.FOW_last_update_pos[1],0])
		draw_array_actors(Visible_WaterWaves);
		mat4.copy(vpMatrix, vpMatrix_backup);
	}
	gl.bindFramebuffer(gl.FRAMEBUFFER, null );
	

}

function draw_shadowmap(){
	var sh = ShaderProgram.shadow_no_rotationShader;
	gl.useProgram(sh.program);
	var m;
	
	gl.viewport(0,0,shadowMapSize,shadowMapSize);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, shadowFramebuffer);
	//gl.colorMask(false, false, false, false);
	gl.clearColor(1.,1.,1.,1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	//gl.
	
	if(Render.drawShadows == false){
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		return;
	}
	
	gl.enable(gl.CULL_FACE);
	gl.cullFace(gl.FRONT);
	gl.uniformMatrix4fv(sh.shadowMVPMatrixUniform, false, shadowMVPMatrix);
	
	var t = M.terrain;
	// we can use a small negative z-offset to avoid artifacting
	gl.uniform3f(sh.modelPosUniform, -M.offsetX, -M.offsetY, -0.1);
	var draw_startX = Math.max(0, Math.floor(cam.pos[0]/8) -4);
	var draw_startY = Math.max(0, Math.floor(cam.pos[1]/8) - 6);
	var draw_endX = Math.min(t.Tiles[0].length, draw_startX + 8);
	var draw_endY = Math.min(t.Tiles.length, draw_startY + 10);
	var flatTreshold = Environment.getNormalizedLightZ();
	for(var k=draw_startY;k< draw_endY;++k){
		for(var l=draw_startX;l< draw_endX;++l){
			var m = t.Tiles[k][l];
			if(m.visible == false){
				continue;
			}
			//HACK! If it's flat, it won't cast shadow
			if(m.minZNormal > flatTreshold){
				continue;
			} 
			sh.attributes[0].enable_and_bind(m.buffers[0]);
			gl.drawArrays(gl.TRIANGLES, 0, m.buffers[0].numItems);
		}
	}
	gl.disableVertexAttribArray(sh.attributes[0]);
	var frame = 0;
	var nextFrame = 0;
	var texture = null;
	//Draw shadows	into shadowmap
	m = Models[4];
	sh.attributes[0].enable_and_bind( m.buffers[0][0]);
	
	for(var i=0;i<Visible_Actors.length;++i){
			var actor = Visible_Actors[i];
			if(actor.hasShadow == false){
				continue;
			}
			
			if(actor.shadowShader != sh){
				sh.shaderEnd();
				sh = actor.shadowShader;
				gl.useProgram(sh.program);
				sh.shaderSwap(actor);
				if(sh.isAnimatedShadow == true){
					m = actor.model; frame = actor.frame; nextFrame=actor.nextFrame;
				}else{
					m = actor.shadowModel;
				}
				sh.modelSwap(actor);
			}else{ 
				if(sh.isAnimatedShadow == false){
					if(actor.shadowModel != m){
						m = actor.shadowModel;
						sh.modelSwap(actor);
					}
				}else{
					if(actor.model != m || actor.frame != frame || actor.nextFrame != nextFrame){
						m = actor.model;
						sh.modelSwap(actor);
						frame = actor.frame;
						nextFrame = actor.nextFrame;
					}
				}
				if(sh.isTexturedShadow == true){
					if(texture != actor.texture){
						sh.textureSwap(actor);
						texture = actor.texture;
					}
				}
			}
			sh.set_individual_actor_data(actor);
			gl.drawArrays(gl.TRIANGLES, 0, m.primitiveCount);
	}
	
	sh.disableAttribArrays();
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	
	/*gl.bindTexture(gl.TEXTURE_2D, shadowDepthTexture.buffer);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.generateMipmap(gl.TEXTURE_2D);*/
	
	gl.cullFace(gl.BACK);
}

function terrainOverlay_framebuffer_update(){
	gl.disable(gl.DEPTH_TEST);
	gl.depthMask(false);
	var gridPerBuf = Pathfinder.FOW_Texture_Size;
	var texPos = Pathfinder.FOW_last_update_pos;
	gl.viewport(0,0,overlaySize,overlaySize);
	
	//draw local lights and ao decals
	gl.bindFramebuffer(gl.FRAMEBUFFER, lightOverlayFramebuffer );
	gl.clearColor(0,0,0,0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE_MINUS_DST_COLOR, gl.ONE);
	var sh = ShaderProgram.localLightShader;
	gl.useProgram(sh.program);
	sh.attributes[0].enable_and_bind( LightDecal.PosBuffer );
	sh.attributes[1].enable_and_bind( GUI.rectTexCoordBuffer);
	
	gl.activeTexture(gl.TEXTURE0);
	gl.uniform1i(sh.samplerUniform, 0);
	
	var tex = null;
	var li;
	var size = 1;
	var intensity = 1;
	for(var i = LightDecals.length-1;i>=0;--i){
		li = LightDecals[i];
		li.update();
		if(li.visible == true){
			if(li.texture != tex ){
				tex = li.texture;
				gl.bindTexture(gl.TEXTURE_2D, tex.buffer );
			}
			size = li.size/gridPerBuf;
			gl.uniform1f(sh.intensityUniform, li.intensity);
			gl.uniform2f(sh.modelPosUniform, (-texPos[0]*2 + li.x*2)/gridPerBuf , (-texPos[1]*2 + li.y*2)/gridPerBuf, li.intensity);
			gl.uniform2f(sh.rotationSinCosUniform, Math.sin(li.angle)*size, Math.cos(li.angle)*size);
			gl.drawArrays(gl.TRIANGLES, 0, 6);	
		}
	}

	gl.disable(gl.BLEND);
	sh.disableAttribArrays();
	
	//now let's combine everything in the final overlay buffer
	/*sh = ShaderProgram.terrianOverlayShader;
	gl.useProgram(sh.program);
	gl.viewport(0,0,overlaySize,overlaySize);
	gl.bindFramebuffer(gl.FRAMEBUFFER, terrianOverlayFramebuffer );
	gl.uniform2f(sh.terrainTexCoordMultiplierUniform, M.terrain.getTexCoordMultW(), M.terrain.getTexCoordMultH());
	
	gl.uniform2f(sh.guiPosUniform, 0 , 0);
	gl.uniform2f(sh.guiScaleUniform, 2, 2);
	gl.uniform4f(sh.textureRectUniform, 0,0,1,1);
	gl.uniform2f(sh.rotationSinCosUniform,0,1);
	gl.uniform1f(sh.aspectRatioUniform,1);
	
	gl.uniform3f(sh.modelPosUniform,  Pathfinder.FOW_last_update_pos[0], Pathfinder.FOW_last_update_pos[1], 0);
	//Cloud params
	var scale2 = Environment.cloudSecondLayerScale;
	var speed2 = Environment.cloudSecondLayerSpeed;
	gl.uniform4f(sh.cloudParamsUniform, Environment.cloudStrength, Environment.cloudOpacity, scale2, Environment.cloudSecondLayerOpacity);
	gl.uniform4f(sh.cloudPosUniform, 
	(Math.floor(texPos[0])  - Environment.cloudOffset[0]+M.offsetX)/gridPerBuf, 
	(Math.floor(texPos[1])  - Environment.cloudOffset[1]+M.offsetY)/gridPerBuf,
	//second layer pos
	Math.floor(texPos[0])/gridPerBuf*scale2  - (Environment.cloudOffset[0]*speed2*scale2 -M.offsetX*scale2) /gridPerBuf, 
	Math.floor(texPos[1])/gridPerBuf*scale2  - (Environment.cloudOffset[1]*speed2*scale2 -M.offsetY*scale2) /gridPerBuf);
	
	//height fog params
	scale2 = Environment.fogZSecondLayerScale;
	speed2 = Environment.fogZSecondLayerSpeed;
	gl.uniform4f(sh.fogZParamsUniform, Environment.fogZStrength, Environment.fogZOpacity, scale2, Environment.fogZSecondLayerOpacity);
	gl.uniform4f(sh.fogZPosUniform, 
	(Math.floor(texPos[0])  - Environment.fogZOffset[0]+M.offsetX)/gridPerBuf, 
	(Math.floor(texPos[1])  - Environment.fogZOffset[1]+M.offsetY)/gridPerBuf,
	//second layer pos
	Math.floor(texPos[0])/gridPerBuf*scale2  - (Environment.fogZOffset[0]*speed2*scale2 -M.offsetX*scale2) /gridPerBuf, 
	Math.floor(texPos[1])/gridPerBuf*scale2  - (Environment.fogZOffset[1]*speed2*scale2 -M.offsetY*scale2) /gridPerBuf);
	gl.uniform1f(sh.fogZConsistencyUniform, Environment.fogZConsistency);
	
	//rg: 2 channels of unit ao; b: local lights; a: custom z-fog level
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, Pathfinder.FOW_Texture.buffer);
	gl.uniform1i(sh.sampler1Uniform, 0);
	
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, Environment.cloudTexture.buffer );
	gl.uniform1i(sh.sampler2Uniform, 1);
	
	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_2D, Environment.fogZTexture.buffer );
	gl.uniform1i(sh.sampler3Uniform, 2);
	
	gl.activeTexture(gl.TEXTURE3);
	gl.bindTexture(gl.TEXTURE_2D,M.terrain.waterTexture.buffer);
	gl.uniform1i(sh.sampler4Uniform, 3);
	
	gl.activeTexture(gl.TEXTURE4);
	gl.bindTexture(gl.TEXTURE_2D, lightOverlayTexture.buffer);
	gl.uniform1i(sh.sampler5Uniform,4 );
	
	sh.attributes[0].enable_and_bind( GUI.rectCenterVertexBuffer);
	sh.attributes[1].enable_and_bind( GUI.rectTexCoordBuffer);
	
	gl.drawArrays(gl.TRIANGLES, 0, GUI.rectCenterVertexBuffer.numItems);
	sh.disableAttribArrays();*/
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	//gl.bindTexture(gl.TEXTURE_2D, terrainOverlayTexture.buffer);
	//gl.generateMipmap(gl.TEXTURE_2D);
}

function draw_refraction(){
	var fogZColor_backup = Environment.fogZColor;
	var fogZStart_backup = Environment.fogZStart;
	var fogZLength_backup = Environment.fogZLength;
	var fogStart_backup = Environment.fogStart;
	var vpMatrix_backup = mat4.clone(vpMatrix);
	
	
	gl.viewport(0,0,refractionSize,refractionSize);
	gl.bindFramebuffer(gl.FRAMEBUFFER, refractionFramebuffer);
	//gl.clearColor(Environment.waterFogZColor[0],Environment.waterFogZColor[1],Environment.waterFogZColor[2],1);
	gl.clearColor(0,0,0,1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	

	for(var i=0;i<Environment.waterGroups.length;++i){
		if(Environment.waterGroups[i].hasVisiblePart == true){
			Environment.waterGroups[i].setAsCurrent();
			
			Environment.fogStart = 500;
			Environment.fogZColor = Environment.waterFogZColor;
			Environment.fogZStart =  Environment.waterFogZStart + Environment.waterZ;
			Environment.fogZLength = Environment.waterFogZLength;
			mat4.copy(vpMatrix, vpMatrix_backup);
			mat4.translate(vpMatrix,vpMatrix, [0,0,Environment.waterZ]);
			mat4.scale(vpMatrix,vpMatrix,[1,1,Environment.waterShortening]); //simulating "real" refraction
			mat4.translate(vpMatrix,vpMatrix, [0,0,-Environment.waterZ]);
			
			Render.cutoffZ = Environment.waterZ + 0.35;
			Render.cutoffZ_Terrain = Environment.waterZ + 0.3;
			if(Visible_RefractionActors[i].length > 0){
				draw_array_actors(Visible_RefractionActors[i]);
			}
			draw_terrain(M.terrain, Environment.waterGroups[i]);
		}
	}
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.viewport(0,0,Render.pixelHeight ,Render.pixelWidth);
	
	Render.cutoffZ = Render.cutoffZ_Terrain = 99;
	
	Environment.fogZColor = fogZColor_backup;
	Environment.fogZStart =  fogZStart_backup;
	Environment.fogZLength = fogZLength_backup;
	Environment.fogStart = fogStart_backup;
	mat4.copy(vpMatrix, vpMatrix_backup);
}

function draw_reflection(){
	gl.viewport(0,0,reflectionSize,reflectionSize);
	gl.bindFramebuffer(gl.FRAMEBUFFER, reflectionFramebuffer);
	gl.clearColor(Environment.skyColor[0]*0.5, Environment.skyColor[1]*0.5,  Environment.skyColor[2]*0.5, 1.);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	if(Render.drawReflections == true){
		var colorParamList = [
			Environment.lightColor, 
			Environment.ambientColor,
			Environment.fillColor,
			Environment.fogColor,
			Environment.fogZColor,
			Environment.skyColor,
			Environment.cloudColor,
			Environment.groundColor
		];
		//Fake HDR, all params contributing to color are divided,and the multiplied in the shader
		//This avoids using a float texture
		for(var i=0;i<colorParamList.length;++i){
			colorParamList[i][0] *= 0.5;
			colorParamList[i][1] *= 0.5;
			colorParamList[i][2] *= 0.5;
		}
	
		var vMatrix_backup = vMatrix;
		var vpMatrix_backup = vpMatrix;
		var pMatrix_backup = pMatrix;
	
	
		vpMatrix = refl_vpMatrix;
		vMatrix = refl_vMatrix;
		pMatrix = refl_pMatrix;
		
		Render.cutoffZ = 1000;
		//explanation: in the fs_shadowed shader if cutoffZ > 500 then it will cut from BELOW, not under
		//the formula is: cutoff_inverse = cutoff-1000, therefore a value of 1000 will cut everyting below 0
		Environment.skyActor.update_drawloop();
		draw_array_actors([Environment.skyActor]);
		draw_array_actors(Visible_ReflectionActors);
		Render.cutoffZ = 99;
		
		for(i=0;i<Visible_ReflectionProbes.length;++i){
			var probe = Visible_ReflectionProbes[i];
			probe.ReflectionArray.sort(compare_actors);
			mat4.copy(vMatrix, refl_vMatrix)
			mat4.translate(vMatrix, vMatrix, [0,0,-probe.z*2]);
			mat4.mul(vpMatrix, pMatrix, vMatrix);
			draw_array_actors(probe.ReflectionArray);
		}
		//draw_terrain(M.terrain, false);
		
		vMatrix = vMatrix_backup;
		vpMatrix = vpMatrix_backup;
		pMatrix = pMatrix_backup;
		
		for(var i=0;i<colorParamList.length;++i){
			colorParamList[i][0] *= 2;
			colorParamList[i][1] *= 2;
			colorParamList[i][2] *= 2;
		}
	}
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.viewport(0,0,Render.pixelWidth,Render.pixelHeight);
}

function draw_gui_actors(){
	var aspect = gl.viewportWidth/gl.viewportHeight;
	mat4.perspective(pMatrix,0.2, aspect, 0.5, 30);
	mat4.identity(guiMatrix);
	//mat4.rotate(guiMatrix,guiMatrix,0.8,[-1,0,0]);
	mat4.translate(guiMatrix,guiMatrix,[0,0,-20]);
	mat4.mul(guiMatrix, pMatrix, guiMatrix);
	
	for(var i=0;i<GUI.Elements_Actors.length;++i){
		GUI.Elements_Actors[i].visible = true;
		GUI.Elements_Actors[i].update_drawloop();
	}
	
	var overlayBackup = terrainOverlayTexture;
	var vpBackup = vpMatrix;
	terrainOverlayTexture = Asset.texture.terrainOverlay_empty;
	vpMatrix = guiMatrix;
	draw_array_actors(GUI.Elements_Actors);
	vpMatrix = vpBackup;
	terrainOverlayTexture = overlayBackup;
}

function minimap_framebuffer_update(){
	gl.disable(gl.DEPTH_TEST);
	gl.depthMask(false);
	
	var sh = ShaderProgram.guiShader;
	gl.useProgram(sh.program);
	gl.uniform3f(sh.tintUniform, 1,1,1);
	gl.uniform2f(sh.rotationSinCosUniform, Math.sin(0),Math.cos(0));
	gl.uniform1f(sh.aspectRatioUniform,1);
	gl.uniform4f(sh.textureRectUniform, 0,0,1,1);
	
	var tx = Minimap.currentTileX;
	var ty = Minimap.currentTileY;
	
	/*if(Control.gameState == Control.gameState_inGame){
		//ZYKLON
		gl.viewport(0,0,64,64);
		var tileCount = 64/Minimap.updateTileSize;
		gl.bindFramebuffer(gl.FRAMEBUFFER, Minimap.rtBuffer_ZYKLON);
	}else{*/
		gl.viewport(0,0,Minimap.maxDim,Minimap.maxDim);
		var tileCount = Math.max(Minimap.h, Minimap.w) / Minimap.updateTileSize;
		gl.bindFramebuffer(gl.FRAMEBUFFER, Minimap.rtBuffer);
	//}
	
	gl.uniform2f(sh.guiPosUniform, (tx/tileCount -0.5)*2 , ((1+ty)/tileCount -0.5)*2 );
	gl.uniform2f(sh.guiScaleUniform, 2/tileCount,2/tileCount);
		
	sh.attributes[0].enable_and_bind( GUI.rectCornerVertexBuffer);
	sh.attributes[1].enable_and_bind( GUI.rectTexCoordBuffer);
	gl.activeTexture(gl.TEXTURE0);
	gl.uniform1i(sh.sampler2Uniform, 1);
	gl.bindTexture(gl.TEXTURE_2D, Minimap.tileTextures[ty][tx].buffer);
	gl.drawArrays(gl.TRIANGLES, 0, GUI.rectCornerVertexBuffer.numItems);
	
	sh.disableAttribArrays();
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.viewport(0,0,Render.pixelWidth,Render.pixelHeight);
	
	gl.enable(gl.DEPTH_TEST);
	gl.depthMask(true);
}

function refreshPostProcessing(){
	if(!postProcessTexture){
		postProcessTexture = createRenderToTextureOutput(false);
		bloomTexture = createRenderToTextureOutput(true);
		bloomBlurTexture = createRenderToTextureOutput(true);
	}
	if(postProcessFramebuffer){
		gl.deleteFramebuffer(postProcessFramebuffer);
		gl.deleteFramebuffer(bloomFramebuffer);
		gl.deleteFramebuffer(bloomBlurFramebuffer);
	}
	postProcessFramebuffer = initRenderToTextureFramebuffer(postProcessTexture, canvas.width   , canvas.height   , false);
	//bloomFramebuffer = initRenderToTextureFramebuffer(bloomTexture, Math.ceil(canvas.width/2), Math.ceil(canvas.height/2), false);
	//bloomBlurFramebuffer = initRenderToTextureFramebuffer(bloomBlurTexture, Math.ceil(canvas.width/4), Math.ceil(canvas.height/4), false);
}


function draw_screen_pass( texture, shader ){
	if(!texture || !texture.buffer){
		return;
	}
	gl.depthMask(false);
	var sh = shader;
	gl.useProgram(sh.program);
	sh.shaderSwap();
	sh.attributes[0].enable_and_bind( GUI.rectClipVertexBuffer );
	sh.attributes[1].enable_and_bind( GUI.rectTexCoordBuffer );
	
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture.buffer);
	
	gl.drawArrays(gl.TRIANGLES, 0, GUI.rectClipVertexBuffer.numItems);
	sh.disableAttribArrays();
	gl.depthMask(true);
}

function draw_ui(arr,  custom_aspect_ratio ){
	gl.depthMask(false);
	gl.depthFunc(gl.EQUAL);
	
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	var sh = ShaderProgram.guiShader;
	gl.useProgram(sh.program);
	var prevTextureRect = [0,0,1,1];
	var sh = null;
	var prevAngle = 0;
	var aspect = custom_aspect_ratio || 1/GUI.getAspectRatio();
	
	for(var i = 0;i< arr.length;++i){
		var e = arr[i];
		if(e.visible == false || e.opacity < 0.05 || e.asset[0].numItems <= 0){
			continue;
		}
		
		if(e.shader != sh){
			if(sh){
				sh.disableAttribArrays();
			}
			sh = e.shader;
			gl.useProgram(sh.program);
			sh.shaderSwap();
			gl.uniform2f(sh.rotationSinCosUniform, Math.sin(0),Math.cos(0));
			gl.uniform1f(sh.aspectRatioUniform, aspect );
		}
		
			sh.attributes[0].enable_and_bind( e.asset[0]);
			sh.attributes[1].enable_and_bind( e.asset[1]);
			sh.textureSwap(e);
			if(e.alphaBlended == true){
				gl.enable(gl.BLEND);
				gl.uniform1f(sh.transparencyUniform, e.opacity);
			}else{
				gl.disable(gl.BLEND);
			}
			
			if(e.mask_read == true){
				gl.depthFunc(gl.EQUAL);
			}else{
				gl.depthFunc(gl.ALWAYS);
			}
			
			if(e.mask_write == true){
				gl.depthMask(true);
			}else{
				gl.depthMask(false);
			}
			
			gl.uniform2f(sh.guiPosUniform, GUI.screenToClipX(e.getAlignedX() ), GUI.screenToClipY( e.getAlignedY()) );
			gl.uniform2f(sh.guiScaleUniform, e.w*2,e.h*2);
			gl.uniform3f(sh.tintUniform, e.color[0], e.color[1], e.color[2]);
			gl.uniform1f(sh.alphaTresholdUniform, e.alphaCutoff);
			if(prevTextureRect != e.textureRect){
				gl.uniform4f(sh.textureRectUniform, e.textureRect[0],e.textureRect[1],e.textureRect[2],e.textureRect[3]);
				prevTextureRect = e.textureRect;
			}
			if(prevAngle != e.angle){
				prevAngle = e.angle;
				gl.uniform2f(sh.rotationSinCosUniform, Math.sin(e.angle),Math.cos(e.angle));
			}
			
			if(e.linesOnly == false){
				gl.drawArrays(gl.TRIANGLES, 0, Math.floor(e.asset[0].numItems*e.prim_count_factor));
			}else{
				gl.drawArrays(gl.LINE_LOOP, 0, e.asset[0].numItems);
			}
	}
	if(sh){
		sh.disableAttribArrays();
	}
	
	gl.enable(gl.DEPTH_TEST);
	gl.depthMask(true);
	gl.depthFunc(gl.LESS);
	gl.disable(gl.BLEND);
}
	
function initTexture(texAsset, repeat){
	if(!gl || texAsset.img_processed){
		return;
	}
	
	var texture = gl.createTexture();

	gl.bindTexture(gl.TEXTURE_2D, texture);
	
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	if(texAsset.loaded == true){
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,gl.RGBA, gl.UNSIGNED_BYTE, texAsset.img);
		texAsset.img_processed = true;
		texAsset.img.onload = null;
		texAsset.img.onerror = null;
		texAsset.img.src = '';
		texAsset.img = null;
	}else{ //placeholder 1*1 texture
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1,1, 0,gl.RGBA, gl.UNSIGNED_BYTE, texAsset.placeholderBuffer);
	}
	
	if(repeat){
		if(repeat == 2){
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
		}else{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		}
		
	}else{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	}
	
	if(texAsset.nearest_neighbor){
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		//gl.generateMipmap(gl.TEXTURE_2D);
	}else if(!texAsset.isRuntime){
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.generateMipmap(gl.TEXTURE_2D);
	}else{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	}
	
    gl.bindTexture(gl.TEXTURE_2D, null);
	
	texAsset.buffer = texture;
	texAsset.originalBuffer = texture;
	return texAsset;
}

//data: 4 channels in a 1D buffer
function createTexture_From_Array(_data, height, width, filtered, isFloat, mipmap, isTiled, channels){
	if(filtered == undefined){ console.log('Warning, missing argument.')}
	if(isFloat === void 0){ isFloat = false;}
	if( mipmap === void 0){  mipmap = false;}
	if( isTiled === void 0){  isTiled = false;}
	if(channels === void 0){ channels = 4;}
	var texAsset = new TextureAsset();
	var texture = gl.createTexture();
	texAsset.buffer = texture;
	texAsset.channels = channels;
	texAsset.width = width;
	texAsset.height = height;
	gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
	if(isTiled == true){
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	}else{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	}
	
	
	if(!isFloat){
		if(channels >= 4){
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width,height,0,gl.RGBA, gl.UNSIGNED_BYTE, _data);
		}else if(channels == 3){
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width,height,0,gl.RGB, gl.UNSIGNED_BYTE, _data);
		}else if(channels == 2){
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE_ALPHA, width,height,0,gl.LUMINANCE_ALPHA, gl.UNSIGNED_BYTE, _data);
		}else{
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width,height,0,gl.LUMINANCE, gl.UNSIGNED_BYTE, _data);
		}
	}else{
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width,height,0,gl.RGBA, gl.FLOAT, _data);
	}
	if(filtered == true){
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	}else{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	}
	if( mipmap==true){
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.generateMipmap(gl.TEXTURE_2D);
	}else{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	}
    gl.bindTexture(gl.TEXTURE_2D, null);
	return texAsset;
}

function updateTexture_From_Array(texture,_data, height , width, isFloat){
	var channels = texture.channels;
	if(isFloat === void 0){ isFloat = false}
	gl.bindTexture(gl.TEXTURE_2D, texture.buffer);
	if(!isFloat){
		if(channels >= 4){
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width,height,0,gl.RGBA, gl.UNSIGNED_BYTE, _data);
		}else if(channels == 3){
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width,height,0,gl.RGB, gl.UNSIGNED_BYTE, _data);
		}else if(channels == 2){
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE_ALPHA, width,height,0,gl.LUMINANCE_ALPHA, gl.UNSIGNED_BYTE, _data);
		}else{
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width,height,0,gl.LUMINANCE, gl.UNSIGNED_BYTE, _data);
		}
	}else{
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width,height,0,gl.RGBA, gl.FLOAT, _data);
	}
	gl.bindTexture(gl.TEXTURE_2D, null);
}


function initRenderToTextureFramebuffer(texAsset, w, h, floatTex){
	var buf = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, buf);
    buf.width = w;
    buf.height = h;
	
	var tex = texAsset.buffer;
	
	gl.bindTexture(gl.TEXTURE_2D, tex);
	if(floatTex == true){
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, buf.width, buf.height, 0, gl.RGBA, gl.FLOAT, null);
	}else{
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, buf.width, buf.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	}
	
	var renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, buf.width, buf.height);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);
	//tidying up
	gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	return buf;
}

function createRenderToTextureOutput(filtered, mipmap){
	var texAsset = new TextureAsset();
	var tex = gl.createTexture();
	texAsset.buffer = tex;
	
    gl.bindTexture(gl.TEXTURE_2D, tex);
	if(filtered == true){
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); //warning, if used for shadowmap, this is a hack!
	}else{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	}
	if(mipmap == true){
	   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	}else{
	   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	}
    
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.bindTexture(gl.TEXTURE_2D, null);
	return texAsset;
}

function getTextureData(texAsset){
	// Push Texture data to GPU memory
	var tex = texAsset.originalBuffer;

	// Create a framebuffer backed by the texture
	var framebuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);

	// Read the contents of the framebuffer (data stores the pixel data)
	var data = new Uint8Array(texAsset.width * texAsset.height * 4);
	gl.readPixels(0, 0, texAsset.width, texAsset.height, gl.RGBA, gl.UNSIGNED_BYTE, data);

	gl.deleteFramebuffer(framebuffer);
	return data;
}

//return webgl texture, not texAsset!
function replaceTextureChannel(colorAsset, specAsset,channel, maskChannel, multiply){
	var cdat = getTextureData(colorAsset);
	var sdat = getTextureData(specAsset);
	if(multiply == false){
		for(var i=0; i<sdat.length;i+=4){
			cdat[i+channel] = sdat[i+maskChannel];
		}
	}else{
		for(var i=0; i<sdat.length;i+=4){
			cdat[i+channel] = cdat[i+channel] * sdat[i+maskChannel] / 256;
		}
	}
	return createTexture_From_Array(cdat, colorAsset.height, colorAsset.width, true, false, true,colorAsset.isTiled).buffer;
}

function textureHSL(asset, hue, sat, lum, maskAsset){
	var dat = getTextureData(asset);
	if(maskAsset){
		var mdat = getTextureData(maskAsset);
	}
	for(var i=0; i<dat.length;i+=4){
		var r = dat[i] / 256.;
		var g = dat[i+1] / 256.;
		var b = dat[i+2] / 256.;
		var cmax = Math.max(r,Math.max(g,b));
		var cmin = Math.min(r,Math.min(g,b));
		var delta = cmax - cmin;
		var h = 0;
		if (delta != 0) {
			if (cmax == r){
				h = 60 * (((g - b) / delta) % 6);
			}else if (cmax == g) {
				h = 60 * (((b - r) / delta) + 2);
			}else{
				h = 60 * (((r - g) / delta) + 4);
			}
		}
		var l = (cmax+cmin)/2;
		var s = delta==0?0:(delta/(1-Math.abs(2*l -1)));
		h = (h+hue + 720)%360;
		s *= sat;
		l *= lum;
		var c = (1-Math.abs(2*l-1))*s;
		var x = c*(1-Math.abs((h/60)%2 - 1));
		var m = l-c*0.5;
		if(h<60){
			r=c; g=x; b=0;
		}else if(h < 120){
			r=x; g=c; b=0;
		}else if(h<180){
			r=0; g=c; b=x;
		}else if(h<240){
			r=0; g=x; b=c;
		}else if(h<300){
			r=x; g=0; b=c;
		}else{
			r=c; g=0; b=x;
		}
		
		if(maskAsset){
			r = Math.max(Math.min(255, (r+m)*256),0);
			g = Math.max(Math.min(255, (g+m)*256),0);
			b = Math.max(Math.min(255, (b+m)*256),0);
			var mask = mdat[i];
			var maskNeg = 255-mask;
			dat[i] =  (r*mask+dat[i]*maskNeg)/255;
			dat[i+1] =  (g*mask+dat[i+1]*maskNeg)/255;
			dat[i+2] =  (b*mask+dat[i+2]*maskNeg)/255;
		}else{
			dat[i] = Math.max(Math.min(255, (r+m)*256),0);
			dat[i+1] = Math.max(Math.min(255, (g+m)*256),0);
			dat[i+2] = Math.max(Math.min(255, (b+m)*256),0);
		}
		
	}
	
	return createTexture_From_Array(dat, asset.height, asset.width, true, false,true,asset.isTiled).buffer;
}

function textureMaskTint(sourceAsset, tint, maskAsset){
	var cdat = getTextureData(sourceAsset);
	var mdat = getTextureData(maskAsset);
	for(var i=0; i<cdat.length;i+=4){
		var mask = mdat[i];
		var maskNeg = 255-mask;
		cdat[i] =  Math.min(255,(cdat[i]*(maskNeg) + cdat[i] * tint[0]*(mask))/255);
		cdat[i+1] =  Math.min(255,(cdat[i+1]*(maskNeg) + cdat[i+1] * tint[1]*(mask))/255);
		cdat[i+2] =  Math.min(255,(cdat[i+2]*(maskNeg) +cdat[i+2] * tint[2]*(mask))/255);
	}
	return createTexture_From_Array(cdat, sourceAsset.height, sourceAsset.width, true, false, true,sourceAsset.isTiled).buffer;
}

function palette_to_lut(palette, lutAsset){
	var pal = getTextureData(palette);
	var lut = getTextureData(lutAsset);
	var paletteLength = 256*4;
	for(var i=0; i<lut.length;i+=4){
		var minR = 0;
		var minG = 0;
		var minB = 0;
		var minDiff = 9999;var diff = 0;
		for(var j=0;j<paletteLength;j+=4){ //get the color from the palette that is closest to the source color
			diff = Utils.distance_xxyyzz( lut[i],pal[j], lut[i+1],pal[j+1], lut[i+2], pal[j+2]);
			/*var rmean = 0.5*(lut[i]+pal[j])
			var dr = lut[i]-lut[j];
			var dg = lut[i+1]-lut[j+1];
			var db = lut[i+2]-lut[j+2];
			diff = Math.sqrt((2+rmean/256)*dr*dr+4*dg*dg+(2+(255-rmean)/256)*db*db)*/
			if(diff < minDiff){
				minDiff = diff;
				minR = pal[j];
				minG = pal[j+1];
				minB = pal[j+2];
			}
		}
		lut[i] = minR;
		lut[i+1] = minG;
		lut[i+2] = minB;
	}
	return createTexture_From_Array(lut, lutAsset.height, lutAsset.width, false, false, false,lutAsset.isTiled).buffer;
}

function init_color_palette(){
	Asset.texture.lut.buffer = palette_to_lut(Asset.texture.palette, Asset.texture.lut);
}