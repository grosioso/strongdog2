function Shader(type){
	this.content = "";
	this.type = type;
	this.data = null;
	this.name = Shader.name_default;
	this.loaded = false;
}
Shader.name_default = "DEFAULT_SHADER";

Shader.getShader = function(shader) {
	if (shader.type == 1) {
		shader.data = gl.createShader(gl.FRAGMENT_SHADER);
	}else{
		shader.data = gl.createShader(gl.VERTEX_SHADER);
	}
	shader.content = Shader.replaceMacros(shader.content)
	gl.shaderSource(shader.data, shader.content);
	gl.compileShader(shader.data);
	if (!gl.getShaderParameter(shader.data, gl.COMPILE_STATUS)) {
		console.error(gl.getShaderInfoLog(shader.data));
		console.log(shader.content)
		return null;
	}
}

Shader.Macros = [
[["MACRO_SHADOW_DETAILED"],
["vec4 shadowfrag = texture2D( uShadowSampler , vShadowPos.xy + vec2(pcf, pcf));\
vec4 shadowfrag2 = texture2D( uShadowSampler , vShadowPos.xy + vec2(-pcf, pcf));\
vec4 shadowfrag3 = texture2D( uShadowSampler , vShadowPos.xy + vec2(pcf, -pcf));\
vec4 shadowfrag4 = texture2D( uShadowSampler , vShadowPos.xy + vec2(-pcf,-pcf));\
float shadow = (\
step(vShadowPos.z-shadowBias, shadowfrag.a + shadowfrag.b*0.00390625)  + \
step(vShadowPos.z-shadowBias, shadowfrag2.a + shadowfrag2.b*0.00390625)  +\
step(vShadowPos.z-shadowBias, shadowfrag3.a + shadowfrag3.b*0.00390625)+\
step(vShadowPos.z-shadowBias, shadowfrag4.a + shadowfrag4.b*0.00390625))*0.25;"]],
[["MACRO_VFILL"],
["vFill = max(dot(transformedNormal, (uFillPos)), 0.0) *uFillColor;"]],
[["MACRO_DISTANCE_FOG"],
["float distanceFog = (((gl_FragCoord.z*0.5 + 0.5)/ gl_FragCoord.w )-uFogSize.y )/(uFogSize.x);\
	vec3 fogColor = mix(max(uFogColor, color), uFogColor, min(1., 0.2 + distanceFog*0.5) );\
	distanceFog = clamp(distanceFog, 0., 1.);"]],

[["MACRO_HORIZONTAL_FOG"],
["float horizontalFog = clamp((uFogSize.w-vModelPos.z - fowTex.a*16. )/uFogSize.z , 0., 1.);\
	shadow *= 1.-horizontalFog*uZFogColor.a;"]],
	
[["MACRO_MULT_DISTANCE_FOG"],
["float distanceFog = (((gl_FragCoord.z*0.5 + 0.5)/ gl_FragCoord.w )-uFogSize.y)/(uFogSize.x);"]],
	
[["MACRO_MULT_HORIZONTAL_FOG"],
["float horizontalFog = clamp((uFogSize.w-vModelPos.z - fowTex.a*16. )/uFogSize.z , 0., 1.);"]],

[["MACRO_REFLECTION_HDR"],
["2."]],

[["MACRO_fowTex"],
["vec2 fowCoord = vec2(0.5, 0.5) + (vModelPos.xy - uFowPos.xy) * uFowPos.z;\
	vec4 fowTex = texture2D(uFowSampler,fowCoord);\
	float fow = min(1.,2.*fowTex.b);"]],	
	
[["MACRO_FragColor_OPAQUE"],
//["gl_FragColor = vec4(mix( mix(color   , uZFogColor.rgb ,horizontalFog),  fogColor , distanceFog )* fowTex.r,uCutoffZ - vModelPos.z);"]],
["MACRO_SATURATION gl_FragColor = vec4(mix(mix( mix(color   , uZFogColor.rgb ,horizontalFog),  fogColor , distanceFog ),MACRO_FOW_COLOR,1.-fow), uCutoffZ - vModelPos.z-0.13);"]],
[["MACRO_FragColor_BLENDED"],
["MACRO_SATURATION gl_FragColor = vec4(mix(mix( mix(color   , uZFogColor.rgb ,horizontalFog),  fogColor , distanceFog ),MACRO_FOW_COLOR,1.-fow), tex.a);"]],
[["MACRO_FragColor_WATER"],
["gl_FragColor = vec4(mix( mix(color   , mix(uFogColor*0.4, uZFogColor.rgb,fow), horizontalFog),  mix(uFogColor*0.4,fogColor,fow) , distanceFog ),  1.)"]],
[["MACRO_FragColor_TERRAIN"],
//["gl_FragColor = vec4(mix( mix(color   , uZFogColor.rgb ,horizontalFog),  fogColor , distanceFog )* fowTex.r , uCutoffZ - vModelPos.z - tex.a*0.3);"]],
["MACRO_SATURATION gl_FragColor = vec4(mix(mix( mix(color   , uZFogColor.rgb ,horizontalFog),  fogColor , distanceFog ),MACRO_FOW_COLOR,1.-fow), uCutoffZ - vModelPos.z - tex.a*0.3);"]],
[["MACRO_SATURATION"],
["float lum =color.r*0.2126+color.g*0.7152+color.b*0.0722;\
 float sat = fow*fow+0.15;\
 color.rgb = color.rgb*sat+lum*(1.-sat);"]],
[["MACRO_FOW_COLOR"],
["uFogColor*0.4"]],
[["MACRO_AO"],
["(clamp((vModelPos.z+2.)*0.5-(fowTex.r-0.5)*10.,0.2,1.))"]],
[["MACRO_LOCAL_RGB"],
["float localStrength = max(0.01, fowTex.r+fowTex.g+fowTex.b);\
vec3 local = 5. *  fowTex.rgb / localStrength * floor(localStrength*16.)/16.;"]],
[["MACRO_LOCAL_LIGHT"],
["vec3 local = max(0., 2.*fowTex.b-1.) * uLocalLightColor;"]],
[["MACRO_LOCAL_REFLECTION"],
["vec3 reflLocal = (fowTex.b*0.2+max(0., 2.*reflFowTex.b-1.)*2.)* uLocalLightColor;"]],

[["MACRO_DECODE_DYNAMIC_PARTICLE_POS"],
["worldPos += tex.rgb;"]],  //for FLOAT texture
//["worldPos += (tex.rgb - vec3(0.5,0.5,0.5)) * 16.;"]]  //for uint8 texture
[["MACRO_SHADOW_TERRAIN"],
["vec2 shadowPerturb = vec2(0., tex.a-0.5) * uShadowPerturb;\
vec3 shadowPos = vShadowPos; shadowPos.xy-=shadowPerturb;\
vec4 shadowfrag = texture2D( uShadowSampler , shadowPos.xy + vec2(pcf, pcf));\
vec4 shadowfrag2 = texture2D( uShadowSampler , shadowPos.xy + vec2(-pcf, pcf));\
vec4 shadowfrag3 = texture2D( uShadowSampler , shadowPos.xy + vec2(pcf, -pcf));\
vec4 shadowfrag4 = texture2D( uShadowSampler , shadowPos.xy + vec2(-pcf,-pcf));\
float shadow = (step(shadowPos.z, shadowfrag.a+ shadowfrag.b*0.00390625)+ step(shadowPos.z, shadowfrag2.a+ shadowfrag2.b*0.00390625)+\
step(shadowPos.z, shadowfrag3.a+ shadowfrag3.b*0.00390625)+step(shadowPos.z,shadowfrag4.a+shadowfrag4.b*0.00390625))*0.25;"
]]
]

Shader.replaceMacros = function(content){
	for(var i=0;i<Shader.Macros.length;++i){
		content = content.replace(Shader.Macros[i][0], Shader.Macros[i][1]);
	}
	return content;
}

function ShaderAttribute(){
	this.name = "just_another_shader_attrib";
	this.loc = null;
	this.size = 3;
	
	this.enable_and_bind = function( buffer ){
		gl.enableVertexAttribArray(this.loc);
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.vertexAttribPointer(this.loc , this.size , gl.FLOAT, false, 0, 0);
	}
}

ShaderAttribute.VertexPosition = function(){
	var a = new ShaderAttribute();
	a.name = "aVertexPosition";
	a.size = 3;
	return a;
}
ShaderAttribute.VertexColor = function(){
	var a = new ShaderAttribute();
	a.name = "aVertexColor";
	a.size = 3;
	return a;
}
ShaderAttribute.VertexTexCoord = function(){
	var a = new ShaderAttribute();
	a.name = "aVertexTexCoord";
	a.size = 2;
	return a;
}
ShaderAttribute.VertexNormal = function(){
	var a = new ShaderAttribute();
	a.name = "aVertexNormal";
	a.size = 3;
	return a;
}
ShaderAttribute.VertexScreenPosition = function(){
	var a = new ShaderAttribute();
	a.name = "aVertexScreenPosition";
	a.size = 3;
	return a;
}
ShaderAttribute.Vertex2DPosition = function(){
	var a = new ShaderAttribute();
	a.name = "aVertex2DPosition";
	a.size = 2;
	return a;
}
ShaderAttribute.VertexPositionNext = function(){
	var a = new ShaderAttribute();
	a.name = "aVertexPositionNext";
	a.size = 3;
	return a;
}
ShaderAttribute.VertexNormalNext = function(){
	var a = new ShaderAttribute();
	a.name = "aVertexNormalNext";
	a.size = 3;
	return a;
}
ShaderAttribute.VertexId = function(){
	var a = new ShaderAttribute();
	a.name = "aVertexid";
	a.size = 1;
	return a;
}

function ShaderProgram(  _vs, _fs){
	this.program = null;
	this.attributes = [];
	this.vs = _vs;
	this.fs = _fs;
	this.isAnimatedShadow = false;
	this.isTexturedShadow = false;
	this.sortId = ShaderProgram.nextShaderId;
	this.drawModelSet = null;
	this.lastTerrainTile = null;
	this.lastTerrainMaterial = null;
	this.last_draw_unlit = false; //for particles
	this.last_waterGroup = null; //for water groups
	this.last_model = null;
	this.full_rot_alias = this;
	this.single_rot_alias = this;
	this.low_quality_alias = this;
	this.force_recompile = false;
	ShaderProgram.nextShaderId++;
	ShaderPrograms.push(this);
	
	this.init = ShaderProgram.init;
	this.disableAttribArrays = ShaderProgram.disableAttribArrays;
	
	this.shaderSwap = Utils.DO_NOTHING;
	this.textureSwap = function(actor){
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, actor.texture.buffer);
	}
	this.modelSwap = Utils.DO_NOTHING;
	this.set_individual_actor_data = Utils.DO_NOTHING;
	this.shaderEnd = Utils.DO_NOTHING;
	
	this.setShadowUniforms = ShaderProgram.setShadowUniforms;
	this.setLightUniforms = ShaderProgram.setLightUniforms;
	this.setFogUniforms = ShaderProgram.setFogUniforms;
	this.setEnvironmentUniforms = ShaderProgram.setEnvironmentUniforms;
	this.setEnvironmentUniforms_Multiply = ShaderProgram.setEnvironmentUniforms_Multiply;
	this.setEnvironmentUniforms_Additive = ShaderProgram.setEnvironmentUniforms_Additive;
	this.setEnvironmentUniforms_Terrain = ShaderProgram.setEnvironmentUniforms_Terrain;
	this.setLitUnlitUniforms = ShaderProgram.setLitUnlitUniforms;
	this.setCliffUniforms = ShaderProgram.setCliffUniforms;
	this.setOverlayUniforms = ShaderProgram.setOverlayUniforms;
	this.setIndividualWindActorData = ShaderProgram.setIndividualWindActorData;
	this.setIndividualWindShadowData = ShaderProgram.setIndividualWindShadowData;
	this.recompile = ShaderProgram.recompile;
	this.materialSwap = ShaderProgram.materialSwap;
}

ShaderProgram.init = function(){
	this.program = gl.createProgram();
	this.force_recompile = false;
	gl.attachShader(this.program, this.vs.data);
	gl.attachShader(this.program, this.fs.data);
	gl.linkProgram(this.program);
	if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
	  console.log("Failed to link shader", this.vs.name, this.fs.name);
	}
	
	for(var i=0;i< this.attributes.length ;++i){
		this.attributes[i].loc = gl.getAttribLocation(this.program, this.attributes[i].name);
		if(this.attributes[i].loc < 0){
			this.attributes[i].loc = i;
		}
	}
	
	this.pMatrixUniform = gl.getUniformLocation(this.program, "uPMatrix");
	this.mvpMatrixUniform = gl.getUniformLocation(this.program, "uMVPMatrix");
	this.modelMatrixUniform = gl.getUniformLocation(this.program, "uMMatrix");
	this.vMatrixUniform = gl.getUniformLocation(this.program, "uVMatrix");
	this.vpMatrixUniform = gl.getUniformLocation(this.program, "uVPMatrix");
	this.vpInvMatrixUniform = gl.getUniformLocation(this.program, "uVPInvMatrix");
	this.nMatrixUniform = gl.getUniformLocation(this.program, "uNMatrix");
	this.eyePosUniform = gl.getUniformLocation(this.program, "uEyePos");
	this.lightPosUniform = gl.getUniformLocation(this.program, "uLightPos");
	this.lightColorUniform = gl.getUniformLocation(this.program, "uLightColor");
	this.fillPosUniform = gl.getUniformLocation(this.program, "uFillPos");
	this.fillColorUniform = gl.getUniformLocation(this.program, "uFillColor");
	this.ambientColorUniform = gl.getUniformLocation(this.program, "uAmbientColor");
	this.localLightColorUniform = gl.getUniformLocation(this.program, "uLocalLightColor");
	this.intensityUniform = gl.getUniformLocation(this.program, "uIntensity");
	this.samplerUniform = gl.getUniformLocation(this.program, "uSampler");
	this.sampler1Uniform = gl.getUniformLocation(this.program, "uSampler1");
	this.sampler2Uniform = gl.getUniformLocation(this.program, "uSampler2");
	this.sampler3Uniform = gl.getUniformLocation(this.program, "uSampler3");
	this.sampler4Uniform = gl.getUniformLocation(this.program, "uSampler4");
	this.sampler5Uniform = gl.getUniformLocation(this.program, "uSampler5");
	this.blendSamplerUniform = gl.getUniformLocation(this.program, "uBlendSampler");
	this.terrainSamplerUniform = gl.getUniformLocation(this.program, "uTerrainSampler");
	this.refractionSamplerUniform = gl.getUniformLocation(this.program, "uRefractionSampler");
	this.reflectionSamplerUniform = gl.getUniformLocation(this.program, "uReflectionSampler");
	this.rippleSamplerUniform = gl.getUniformLocation(this.program, "uRippleSampler");
	this.foamSamplerUniform = gl.getUniformLocation(this.program, "uFoamSampler");
	this.fowSamplerUniform = gl.getUniformLocation(this.program, "uFowSampler");
	//this.envSamplerUniform = gl.getUniformLocation(this.program, "uEnvSampler");
	this.vertexSampler = gl.getUniformLocation(this.program, "uVertexSampler");
	this.fowPosUniform = gl.getUniformLocation(this.program,"uFowPos");
	this.cloudPosUniform = gl.getUniformLocation(this.program,"uCloudPos");
	this.cloudParamsUniform = gl.getUniformLocation(this.program,"uCloudParams");
	this.fogZPosUniform = gl.getUniformLocation(this.program,"uFogZPos");
	this.fogZParamsUniform = gl.getUniformLocation(this.program,"uFogZParams");
	this.fogZConsistencyUniform = gl.getUniformLocation(this.program,"uFogZConsistency");
	this.alphaTresholdUniform = gl.getUniformLocation(this.program, "uAlphaTreshold");
	this.transparencyUniform = gl.getUniformLocation(this.program, "uTransparency");
	this.shadowSamplerUniform = gl.getUniformLocation(this.program, "uShadowSampler");
	this.terrainTexCoordMultiplierUniform = gl.getUniformLocation(this.program, "uTerrainTexCoordMultiplier");
	this.terrainTexCoordOffsetUniform = gl.getUniformLocation(this.program, "uTerrainTexCoordOffset");
	this.tileSideBiasUniform = gl.getUniformLocation(this.program, "uTileSideBias");
	this.fogColorUniform = gl.getUniformLocation(this.program, "uFogColor");
	this.zFogColorUniform = gl.getUniformLocation(this.program, "uZFogColor");
	this.fogSizeUniform = gl.getUniformLocation(this.program, "uFogSize");
	this.groundColorUniform = gl.getUniformLocation(this.program, "uGroundColor");
	this.skyColorUniform = gl.getUniformLocation(this.program, "uSkyColor");
	this.cloudColorUniform = gl.getUniformLocation(this.program, "uCloudColor"); //for water cloud reflections
	//this.saturationUniform = gl.getUniformLocation(this.program, "uSaturation");
	this.tintUniform = gl.getUniformLocation(this.program, "uTint");
	this.guiPosUniform = gl.getUniformLocation(this.program, "uGUIPos");
	this.guiScaleUniform = gl.getUniformLocation(this.program, "uGUIScale");
	this.textureRectUniform = gl.getUniformLocation(this.program, "uTextureRect");
	this.shadowMVPMatrixUniform = gl.getUniformLocation(this.program, "uShadowMVPMatrix");
	this.shadowPerturbUniform = gl.getUniformLocation(this.program, "uShadowPerturb");
	this.modelPosUniform = gl.getUniformLocation(this.program, "uModelPos");
	this.lifebarStatsUniform = gl.getUniformLocation(this.program, "uLifebarStats");
	this.lifebarMaxUniform = gl.getUniformLocation(this.program, "uLifebarMax");
	this.scaleUniform = gl.getUniformLocation(this.program,"uScale");
	this.animInterpUniform = gl.getUniformLocation(this.program, "uAnimInterp");
	this.worldPosUniform = gl.getUniformLocation(this.program, "uWorldPos");
	this.rotationSinCosUniform = gl.getUniformLocation(this.program, "uRotationSinCos"); //for single-axis rotation
	this.rotationSinUniform = gl.getUniformLocation(this.program, "uRSin");
	this.rotationCosUniform = gl.getUniformLocation(this.program, "uRCos");
	this.windOffsetUniform = gl.getUniformLocation(this.program,"uWindOffset");
	this.windVectorUniform = gl.getUniformLocation(this.program,"uWindVector");
	this.waterOffsetUniform = gl.getUniformLocation(this.program, "uWaterOffset");
	this.waterWavinessUniform = gl.getUniformLocation(this.program, "uWaterWaviness")
	this.shoreFactorUniform = gl.getUniformLocation(this.program, "uShoreFactor")
	this.refractionTintUniform = gl.getUniformLocation(this.program, "uRefractionTint");
	this.reflectionParamsUniform = gl.getUniformLocation(this.program, "uReflectionParams");
	this.distortionParamsUniform = gl.getUniformLocation(this.program, "uDistortionParams")
	this.glossinessUniform = gl.getUniformLocation(this.program, "uGlossiness");
	this.terrainOcclusionUniform = gl.getUniformLocation(this.program,"uTerrainOcclusion");
	this.cliffDeformMatrixUniform = gl.getUniformLocation(this.program,"uCDMatrix");
	this.cliffDeformUniform = gl.getUniformLocation(this.program,"uCliffDeform");
	this.texVariationUniform = gl.getUniformLocation(this.program,"uTexVariation");
	this.tilePosUniform = gl.getUniformLocation(this.program,"uTilePos");
	this.aspectRatioUniform = gl.getUniformLocation(this.program, "uAspectRatio");
	this.ParticleParamsUniform = gl.getUniformLocation(this.program, "uParticleParams");
	this.PixelMiddleOffsetUniform = gl.getUniformLocation(this.program, "uPixelMiddleOffset");
	this.cutoffZUniform = gl.getUniformLocation(this.program, "uCutoffZ");
	this.fillFactorUniform = gl.getUniformLocation(this.program, "uFillFactor");
	this.catenaryUniform = gl.getUniformLocation(this.program, "uCatenary");
	this.ropeParamsUniform = gl.getUniformLocation(this.program, "uRopeParams");
	this.screenHolesUniform = gl.getUniformLocation(this.program, "uScreenHoles");
	this.boundZUniform = gl.getUniformLocation(this.program, "uBoundZ");
	this.groundLevelUniform = gl.getUniformLocation(this.program, "uGroundLevel");
	this.screenPixelSizeUniform = gl.getUniformLocation(this.program, "uScreenPixelSize");
	this.textureDimsUniform = gl.getUniformLocation(this.program, "uTextureDims");
	this.VTFramesUniform = gl.getUniformLocation(this.program, "uVTFrames");
	this.timeUniform = gl.getUniformLocation(this.program, "uTime");
	this.texOffsetUniform = gl.getUniformLocation(this.program, "uTexOffset");
	this.texScaleUniform = gl.getUniformLocation(this.program, "uTexScale");
	this.triangleCornersUniform = gl.getUniformLocation(this.program, "uTriangleCorners");
	this.floorZUniform  = gl.getUniformLocation(this.program, "uFloorZ"); 
	this.uZOffset = gl.getUniformLocation(this.program, "uZOffset");
	return this;
}

//use only for shader development
ShaderProgram.recompile = function(){
	this.force_recompile = true;
	this.vs.loaded = false;
	this.vs.data = null;
	this.fs.loaded = false;
	this.fs.data = null;
	Asset.importShader(this.vs.name, this.vs);
	Asset.importShader(this.fs.name, this.fs);
}

ShaderProgram.disableAttribArrays = function(){
	for(var i=0;i< this.attributes.length ;++i){
		gl.disableVertexAttribArray(this.attributes[i].loc);
	}
}

ShaderProgram.setShadowUniforms = function(){
	gl.uniformMatrix4fv(this.shadowMVPMatrixUniform, false, shadowMVPMatrix);
	gl.activeTexture(gl.TEXTURE7);
	gl.bindTexture(gl.TEXTURE_2D, shadowDepthTexture.buffer);
	gl.uniform1i(this.shadowSamplerUniform, 7);
	gl.uniform1f(this.shadowPerturbUniform, 0.01/(Render.shadowBoxSize+0.01) * Render.shadowPerturbSize);
}
	
ShaderProgram.setLightUniforms = function(){
	gl.uniform3f(this.lightPosUniform, mvLightMatrix[12], mvLightMatrix[13],mvLightMatrix[14]);
	gl.uniform3f(this.lightColorUniform, Environment.lightColor[0],Environment.lightColor[1],Environment.lightColor[2]);
	gl.uniform3f(this.fillPosUniform, mvFillMatrix[12], mvFillMatrix[13],mvFillMatrix[14]);
	gl.uniform3f(this.fillColorUniform, Environment.fillColor[0],Environment.fillColor[1],Environment.fillColor[2]);
	gl.uniform3f(this.localLightColorUniform, Environment.localLight[0],Environment.localLight[1],Environment.localLight[2]);
	gl.uniform3f(this.ambientColorUniform, Environment.ambientColor[0], Environment.ambientColor[1],Environment.ambientColor[2]);
}
	
ShaderProgram.setFogUniforms = function(){
	gl.uniform3f(this.fogColorUniform, Environment.fogColor[0],Environment.fogColor[1],Environment.fogColor[2]);
	gl.uniform4f(this.zFogColorUniform, Environment.fogZColor[0],Environment.fogZColor[1],Environment.fogZColor[2],Environment.fogZColor[3]);
	gl.uniform4f(this.fogSizeUniform, Environment.fogLength, Environment.fogStart, Environment.fogZLength, Environment.fogZStart);
}
	
ShaderProgram.setEnvironmentUniforms = function(){
	this.setLightUniforms();
	this.setFogUniforms();
	gl.uniform1f(this.cutoffZUniform, Render.cutoffZ);
}

ShaderProgram.setEnvironmentUniforms_Multiply = function(){
	gl.uniform4f(this.fogSizeUniform, Environment.fogLength, Environment.fogStart, Environment.fogZLength, Environment.fogZStart);
	gl.uniform3f(this.lightPosUniform, mvLightMatrix[12], mvLightMatrix[13],mvLightMatrix[14]);
	gl.uniform3f(this.lightColorUniform, Environment.lightColor[0],Environment.lightColor[1],Environment.lightColor[2]);
	gl.uniform3f(this.localLightColorUniform, Environment.localLight[0],Environment.localLight[1],Environment.localLight[2]);
	gl.uniform3f(this.fillPosUniform, mvFillMatrix[12], mvFillMatrix[13],mvFillMatrix[14]);
	gl.uniform3f(this.fillColorUniform, Environment.fillColor[0],Environment.fillColor[1],Environment.fillColor[2]);
	gl.uniform3f(this.ambientColorUniform, 0, 0, 0);
}

ShaderProgram.setEnvironmentUniforms_Additive = function(){ //if we are not using the additive fragment shader
	gl.uniform4f(this.fogSizeUniform, Environment.fogLength, Environment.fogStart, Environment.fogZLength, Environment.fogZStart);
	gl.uniform3f(this.fogColorUniform, 0,0,0);
	gl.uniform3f(this.lightColorUniform, 0,0,0);
	gl.uniform3f(this.lightPosUniform,0,0,1);
	gl.uniform3f(this.localLightColorUniform, 0,0,0);
	gl.uniform3f(this.fillColorUniform, 0,0,0);
	gl.uniform3f(this.ambientColorUniform, 1,1,1);
	gl.uniform1f(this.cutoffZUniform, Render.cutoffZ);
}
	
ShaderProgram.setEnvironmentUniforms_Terrain = function(){
	this.setFogUniforms();
	
	gl.uniform3f(this.lightPosUniform, Environment.lightPosition[0], Environment.lightPosition[1], Environment.lightPosition[2]);
	gl.uniform3f(this.lightColorUniform, Environment.lightColor[0],Environment.lightColor[1],Environment.lightColor[2]);
	gl.uniform3f(this.fillPosUniform, Environment.fillPosition[0],Environment.fillPosition[1],Environment.fillPosition[2]);
	gl.uniform3f(this.fillColorUniform, Environment.fillColor[0],Environment.fillColor[1],Environment.fillColor[2]);
	gl.uniform3f(this.localLightColorUniform, Environment.localLight[0],Environment.localLight[1],Environment.localLight[2]);
	gl.uniform3f(this.ambientColorUniform, Environment.ambientColor[0], Environment.ambientColor[1],Environment.ambientColor[2]);
	
	gl.uniform1f(this.cutoffZUniform, Render.cutoffZ_Terrain);
}
	
ShaderProgram.setLitUnlitUniforms = function(lit){
	if(lit){
		gl.uniform3f(this.lightColorUniform, Environment.lightColor[0],Environment.lightColor[1],Environment.lightColor[2]);
		gl.uniform3f(this.fillColorUniform, Environment.fillColor[0],Environment.fillColor[1],Environment.fillColor[2]);
		//gl.uniform3f(this.localLightColorUniform, Environment.localLight[0],Environment.localLight[1],Environment.localLight[2]);
		gl.uniform3f(this.ambientColorUniform, Environment.ambientColor[0], Environment.ambientColor[1],Environment.ambientColor[2]);
	}else{
		gl.uniform3f(this.lightColorUniform, 0,0,0);
		//gl.uniform3f(this.localLightColorUniform, 0,0,0);
		gl.uniform3f(this.fillColorUniform, 255,0,0);
		gl.uniform3f(this.ambientColorUniform, 1,1,1);
	}
}
	
ShaderProgram.setCliffUniforms = function(actor){
	var hmap = M.terrain.HeightMap;
	var normMap = M.terrain.NormalMap;
	var gx = Math.max(Math.min((actor.x>>0), M.width-1), 0); //gridX
	var gy = Math.max(Math.min((actor.y>>0), M.height-1), 0); //gridY
	var clifflevel = M.terrain.CutoutMap[gy][gx] - actor.z + actor.cliffSet.actorZOffset;
	var nm11 = normMap[gy][gx];
	var nm12 = normMap[gy+1][gx];
	var nm21 = normMap[gy][gx+1];
	var nm22 = normMap[gy+1][gx+1];
	this.matBuffer[0] = nm11[0];
	this.matBuffer[1] = nm12[0];
	this.matBuffer[2] = nm21[0];
	this.matBuffer[3] = nm22[0];
	this.matBuffer[4] = nm11[1];
	this.matBuffer[5] = nm12[1];
	this.matBuffer[6] = nm21[1];
	this.matBuffer[7] = nm22[1];
	this.matBuffer[8] = nm11[2];
	this.matBuffer[9] = nm12[2];
	this.matBuffer[10] = nm21[2];
	this.matBuffer[11] = nm22[2];
	this.matBuffer[12] = hmap[gy][gx]+clifflevel ;
	this.matBuffer[13] = hmap[gy+1][gx]+clifflevel;
	this.matBuffer[14] = hmap[gy][gx+1]+clifflevel;
	this.matBuffer[15] = hmap[gy+1][gx+1]+clifflevel;
	gl.uniformMatrix4fv(this.cliffDeformMatrixUniform,false, this.matBuffer);
}

ShaderProgram.setOverlayUniforms = function(){
	gl.activeTexture(gl.TEXTURE6);
	//gl.bindTexture(gl.TEXTURE_2D, terrainOverlayTexture.buffer);
	gl.bindTexture(gl.TEXTURE_2D, lightOverlayTexture.buffer);
	gl.uniform3f(this.fowPosUniform, Pathfinder.FOW_last_update_pos[0], Pathfinder.FOW_last_update_pos[1], 1/Pathfinder.FOW_Texture_Size);
	gl.uniform1i(this.fowSamplerUniform, 6);
}
	
	
ShaderProgram.setIndividualWindActorData = function(actor){
	gl.uniform3f( this.modelPosUniform, actor.x, actor.y, actor.z);
	gl.uniform2f( this.rotationSinCosUniform, Math.sin( -actor.rotZ )*actor.scale, Math.cos( -actor.rotZ )*actor.scale);
	gl.uniform3f( this.windOffsetUniform, 
			(Math.sin(actor.windPhase)*Environment.windStrength*actor.individual_windphase_strength + Environment.windVector[0]+actor.bendVector[0])*actor.windEffect, 
			(Math.cos(actor.windPhase)*Environment.windStrength*actor.individual_windphase_strength + Environment.windVector[1]+actor.bendVector[1])*actor.windEffect,
			Environment.detailWindOffset + actor.windOffset);
}
ShaderProgram.setIndividualWindShadowData = function(actor){
	gl.uniform3f( this.modelPosUniform, actor.x, actor.y, actor.z + actor.shadowZOffset);
	gl.uniform2f( this.rotationSinCosUniform, Math.sin( -actor.rotZ )*actor.scale, Math.cos( -actor.rotZ )*actor.scale);
	gl.uniform3f( this.windOffsetUniform, 
			(Math.sin(actor.windPhase)*Environment.windStrength*actor.individual_windphase_strength + Environment.windVector[0]+actor.bendVector[0])*actor.windEffect, 
			(Math.cos(actor.windPhase)*Environment.windStrength*actor.individual_windphase_strength + Environment.windVector[1]+actor.bendVector[1])*actor.windEffect,
			Environment.detailWindOffset + actor.windOffset);
}
ShaderProgram.materialSwap = function(actor, matId){
	gl.activeTexture(gl.TEXTURE0);
	var sectorId = Math.floor(matId/1024);
	var tex = Asset.MATERIALS[matId % 1024];
	var sec = NavSector.getById(sectorId);
	if(sec.use_triggered_textures && tex.triggered_version){
		tex = tex.triggered_version;
	}
	gl.bindTexture(gl.TEXTURE_2D, tex.buffer);
	gl.uniform1f(this.uZOffset, sec.zOffset  + sec.dz*Render.frame_interp );
	gl.uniform2f(this.texScaleUniform, 64/tex.width, 64/tex.height);
	gl.uniform2f(this.texOffsetUniform, sec.texOffX*Render.shaderTime%16, sec.texOffY*Render.shaderTime%16);
	if(tex.decal_transparency){
		gl.enable(gl.BLEND);
		gl.depthMask(false);
	}else{
		gl.disable(gl.BLEND);
		gl.depthMask(true);
	}
}

//if a new fs or vs is loaded, check if any shaders can be compiled
//if last_load is null, compile any uncompiled shader
ShaderProgram.Check_Shader_Loading = function(last_load){
	if(!gl){return;}
	if(last_load && last_load.data == null){
		Shader.getShader(last_load);
	}
	for(var i=0;i<ShaderPrograms.length;++i){
		var sh = ShaderPrograms[i];
		if(sh.program && !sh.force_recompile){continue;}//already compiled
		if(sh.vs.loaded && sh.fs.loaded && (!last_load || sh.vs==last_load || sh.fs == last_load)){
			sh.init();
		}
	}
}

ShaderProgram.nextShaderId = 0;
ShaderProgram.init_all_shaders = function(){
	ShaderPrograms = [];
	ShaderProgram.nextShaderId = 0;
	//IF YOU DON'T USE THE ATTRIBUTE, IT WILL BE REMOVED FROM THE SHADER!!! IT WILL CAUSE "index out of range" ERROR!
	var sh = new ShaderProgram(vs1,fs1);
	sh.attributes = [ ShaderAttribute.VertexPosition(), ShaderAttribute.VertexNormal(), ShaderAttribute.VertexTexCoord(), 
	ShaderAttribute.VertexPositionNext(),ShaderAttribute.VertexNormalNext()];
	sh.shaderSwap = function(actor){
		this.last_model = null;
		//this.setShadowUniforms();
		gl.uniform1i(this.samplerUniform, 0);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false, vpMatrix);
		gl.uniformMatrix4fv(this.vMatrixUniform, false, vMatrix); //For specular only
		gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);
		
		gl.uniform3f(this.groundColorUniform, Environment.groundColor[0],Environment.groundColor[1],Environment.groundColor[2]);
		this.setEnvironmentUniforms();
		gl.uniform3f(this.skyColorUniform, Environment.skyColor[0], Environment.skyColor[1],Environment.skyColor[2]);
		this.setOverlayUniforms();
		this.setShadowUniforms();
		gl.uniform1f(this.alphaTresholdUniform, 0.5);
		var eyepos = cam.getEyePos();
		gl.uniform3f(this.eyePosUniform, eyepos[0], eyepos[1], eyepos[2]);
		gl.uniform4f(this.cloudColorUniform, Environment.cloudColor[0], Environment.cloudColor[1],Environment.cloudColor[2],Environment.cloudColor[3]*Environment.cloudOpacity);
	}
	sh.modelSwap = function(actor){
		m = actor.model;
		//if(m!=this.last_model){
		//	this.last_model = m;
			this.attributes[2].enable_and_bind( m.buffers[2]);
		//}
		this.attributes[0].enable_and_bind( m.buffers[0][actor.frame]);
		this.attributes[1].enable_and_bind( m.buffers[1][actor.frame]);
		this.attributes[3].enable_and_bind( m.buffers[0][actor.nextFrame]);
		this.attributes[4].enable_and_bind( m.buffers[1][actor.nextFrame]);
	}
	sh.set_individual_actor_data = function(actor){
		gl.uniform1f( this.animInterpUniform, actor.frameInterp);
		gl.uniform2f( this.rotationSinCosUniform, Math.sin( -actor.rotZ )*actor.scale, Math.cos( -actor.rotZ )*actor.scale);
		gl.uniform3f( this.modelPosUniform, actor.x, actor.y, actor.z);
	}
	this.standard_single_rotationShader = sh;
	
	sh = new ShaderProgram(vs1,fs_no_spec);
	sh.attributes = this.standard_single_rotationShader.attributes.slice(); //copy array;
	sh.modelSwap = this.standard_single_rotationShader.modelSwap;
	sh.shaderSwap = function(actor){
		this.last_model = null;
		gl.uniform1i(this.samplerUniform, 0);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false, vpMatrix);
		gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);
		this.setEnvironmentUniforms();
		this.setOverlayUniforms();
		gl.uniform1f(this.alphaTresholdUniform, 0.5);
		gl.disable(gl.DEPTH_TEST);
	}
	sh.shaderEnd = function(){
		gl.enable(gl.DEPTH_TEST);
	}
	sh.set_individual_actor_data = this.standard_single_rotationShader.set_individual_actor_data;
	this.standard_no_specShader = sh;
 
	var sh = new ShaderProgram(vs_sprite,fs_doom);
	sh.attributes = [ ShaderAttribute.VertexPosition(), ShaderAttribute.VertexTexCoord()];
	sh.shaderSwap = function(actor){
		this.last_model = null;
		gl.uniform1i(this.samplerUniform, 0);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false, vpMatrix);
		gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);
		
		this.setEnvironmentUniforms();
		this.setOverlayUniforms();
		this.setShadowUniforms();
		
		gl.uniform1f(this.alphaTresholdUniform, 0.5);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, Asset.texture.lightmap.buffer );
		gl.uniform1i(this.blendSamplerUniform , 1);
		gl.uniform1f(this.timeUniform, Render.shaderTime);
	}
	sh.modelSwap = function(actor){
		m = actor.model;
		if(m!=this.last_model){
			this.last_model = m;
			this.attributes[0].enable_and_bind( m.buffers[0][0]);
			this.attributes[1].enable_and_bind( m.buffers[2]);
		}
	}
	sh.set_individual_actor_data = function(actor){
		if(actor.sprite_face_camera){
			gl.uniform2f( this.rotationSinCosUniform, Math.sin( -cam.yaw )*actor.scale, Math.cos( -cam.yaw )*actor.scale);
		}else{
			gl.uniform2f( this.rotationSinCosUniform, Math.sin( -actor.rotZ )*actor.scale, Math.cos( -actor.rotZ )*actor.scale);
		}
		
		gl.uniform3f( this.modelPosUniform, actor.x, actor.y, actor.z);
		
		if(actor.floor_triangle){
			gl.uniform3f( this.fillColorUniform, actor.floor_triangle.color[0] + Environment.fillColor[0], actor.floor_triangle.color[1], actor.floor_triangle.color[2]);
		}else{
			gl.uniform3f( this.fillColorUniform, 255 + Environment.fillColor[0] ,0,0);
		}
		
		var fr = Math.abs(actor.frame);
		 
		var spriteSize = actor.spriteSize;
		var spriteH = spriteSize[0];
		var spriteW = spriteSize[1];
		 
		var spriteRow = Math.floor(1/spriteW);
		var spriteCol = 1/spriteH;
		 
		//gl.uniform4f( this.textureRectUniform, (fr%8)/8, (7-Math.floor(fr/8))/8, 1/8, 1/8);
		//gl.uniform4f( this.textureRectUniform, (fr%8 +1)/8, (7-Math.floor(fr/8))/8, -1/8, 1/8);
		if(actor.frame >= 0){
			gl.uniform4f( this.textureRectUniform, (fr%spriteRow)*spriteW, (spriteCol-1-Math.floor(fr/spriteRow))*spriteH, spriteW, spriteH);
		}else{
			gl.uniform4f( this.textureRectUniform, (fr%spriteRow +1)*spriteW, (spriteCol-1-Math.floor(fr/spriteRow))*spriteH, -spriteW, spriteH);
		}
	}
	this.spriteShader = sh;
	
	sh = new ShaderProgram(vs_doom,fs_doom);
	sh.attributes = [ ShaderAttribute.VertexPosition(), ShaderAttribute.VertexNormal(), ShaderAttribute.VertexTexCoord(), ShaderAttribute.VertexColor()];
	sh.shaderSwap = function(actor){
		gl.uniform1i(this.samplerUniform, 0);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false, vpMatrix);
		gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);
		this.setEnvironmentUniforms();
		this.setOverlayUniforms();
		this.setShadowUniforms();
		gl.uniform1f(this.alphaTresholdUniform, 0.1);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, Asset.texture.lightmap.buffer );
		gl.uniform1i(this.blendSamplerUniform , 1);
		gl.uniform1f(this.timeUniform, Render.shaderTime);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
	}
	sh.modelSwap = function(actor){
		this.attributes[0].enable_and_bind( actor.model.buffers[0][actor.frame]);
		this.attributes[1].enable_and_bind( actor.model.buffers[1][actor.frame]);
		this.attributes[2].enable_and_bind( actor.model.buffers[2] );
		this.attributes[3].enable_and_bind( actor.model.buffers[3] );
	}
	sh.set_individual_actor_data = function(actor){
		var packedInterp = actor.frameInterp + 1; //add 1 so it will never be 0;
		gl.uniform3f( this.rotationSinUniform, Math.sin(-actor.rotX)*actor.scale, Math.sin(actor.rotY)*packedInterp, Math.sin( -actor.rotZ )*actor.scaleZ); 
		gl.uniform3f( this.rotationCosUniform, Math.cos(-actor.rotX)*actor.scale, Math.cos(actor.rotY)*packedInterp, Math.cos( -actor.rotZ )*actor.scaleZ); 
		gl.uniform3f( this.modelPosUniform, actor.x, actor.y, actor.z);
	}
	this.doomShader = sh;
	
	sh = new ShaderProgram(vs1_fullrot,fs1);
	sh.attributes = this.standard_single_rotationShader.attributes.slice(); //copy array;
	sh.modelSwap = this.standard_single_rotationShader.modelSwap;
	sh.shaderSwap = this.standard_single_rotationShader.shaderSwap;
	sh.set_individual_actor_data = function(actor){
		var packedInterp = actor.frameInterp + 1; //add 1 so it will never be 0;
		gl.uniform3f( this.rotationSinUniform, Math.sin(-actor.rotX)*actor.scale, Math.sin(actor.rotY)*packedInterp, Math.sin( -actor.rotZ )*actor.scaleZ); 
		gl.uniform3f( this.rotationCosUniform, Math.cos(-actor.rotX)*actor.scale, Math.cos(actor.rotY)*packedInterp, Math.cos( -actor.rotZ )*actor.scaleZ); 
		gl.uniform3f( this.modelPosUniform, actor.x, actor.y, actor.z);
	}
	this.standard_full_rotationShader = sh;
	
	sh = new ShaderProgram(vs1_fullrot,fs_shadowed);
	sh.attributes = this.standard_single_rotationShader.attributes.slice(); //copy array;
	sh.modelSwap = this.standard_single_rotationShader.modelSwap;
	sh.shaderSwap = this.standard_single_rotationShader.shaderSwap;
	sh.set_individual_actor_data = this.standard_full_rotationShader.set_individual_actor_data;
	this.standard_full_rotation_no_specShader = sh;
	
	sh = new ShaderProgram(vs1,fs_no_spec);
	sh.attributes = this.standard_single_rotationShader.attributes.slice(); //copy array;
	sh.modelSwap = this.standard_single_rotationShader.modelSwap;
	sh.shaderSwap = this.standard_single_rotationShader.shaderSwap;
	sh.set_individual_actor_data_BASE = this.standard_single_rotationShader.set_individual_actor_data;
	sh.set_individual_actor_data  = function(actor){
		this.set_individual_actor_data_BASE(actor);
		gl.uniform3f( this.ambientColorUniform, actor.tint[0], actor.tint[1], actor.tint[2]);
	}
	this.tintedShader = sh;
	
	sh = new ShaderProgram(vs1,fs_glowmap);
	sh.attributes = this.standard_single_rotationShader.attributes.slice(); //copy array;
	sh.modelSwap = this.standard_single_rotationShader.modelSwap;
	sh.shaderSwap = this.standard_single_rotationShader.shaderSwap;
	sh.set_individual_actor_data = this.standard_single_rotationShader.set_individual_actor_data;
	this.standard_glowmapShader = sh;
	
	sh = new ShaderProgram(vs_nospec, fs_shadowed);
	sh.attributes = this.standard_single_rotationShader.attributes.slice(); //copy array;
	sh.modelSwap = this.standard_single_rotationShader.modelSwap;
	sh.shaderSwap = function(actor){
		this.setShadowUniforms();
		gl.uniform1f(this.alphaTresholdUniform, 0.5);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false,vpMatrix);
		gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);
		this.setEnvironmentUniforms();
		this.setOverlayUniforms();
	}
	sh.set_individual_actor_data = this.standard_single_rotationShader.set_individual_actor_data;
	this.standard_shadowedShader = sh;
	
	sh = new ShaderProgram(shadow_vs, shadow_fs);
	sh.attributes = [ ShaderAttribute.VertexPosition()];
	sh.shaderSwap = function(actor){
		gl.uniformMatrix4fv(this.shadowMVPMatrixUniform, false, shadowMVPMatrix);
	}
	sh.modelSwap = function(actor){
		this.attributes[0].enable_and_bind( actor.shadowModel.buffers[0][0]);
	}
	sh.set_individual_actor_data = function(actor){
		gl.uniform3f( this.modelPosUniform, actor.x, actor.y, actor.z + actor.shadowZOffset);
		gl.uniform2f( this.rotationSinCosUniform, Math.sin( -actor.rotZ )*actor.scale, Math.cos( -actor.rotZ )*actor.scale);
	}
	this.shadowShader = sh;
	
	sh = new ShaderProgram(shadow_animated_vs,shadow_fs);
	sh.attributes = [ ShaderAttribute.VertexPosition(), ShaderAttribute.VertexPositionNext()];
	sh.shaderSwap = this.shadowShader.shaderSwap;
	sh.modelSwap = function(actor){
		this.attributes[0].enable_and_bind( actor.model.buffers[0][actor.frame]);
		this.attributes[1].enable_and_bind( actor.model.buffers[0][actor.nextFrame]);
	}
	sh.set_individual_actor_data = function(actor){
		gl.uniform1f( this.animInterpUniform, actor.frameInterp);
		gl.uniform3f( this.modelPosUniform, actor.x, actor.y, actor.z + actor.shadowZOffset);
		gl.uniform2f( this.rotationSinCosUniform, Math.sin( -actor.rotZ )*actor.scale, Math.cos( -actor.rotZ )*actor.scale);
	}
	sh.isAnimatedShadow = true;
	this.shadow_animatedShader = sh;
 	
	var sh = new ShaderProgram(shadow_no_rotation_vs,shadow_fs);
	sh.attributes = [ ShaderAttribute.VertexPosition()];
	
	sh.shaderSwap = this.shadowShader.shaderSwap;
	sh.modelSwap = this.shadowShader.modelSwap;
	sh.set_individual_actor_data = function(actor){
		gl.uniform3f( this.modelPosUniform, actor.x, actor.y, actor.z+actor.shadowZOffset);
	}
	this.shadow_no_rotationShader = sh;	
	
	var sh = new ShaderProgram(shadow_full_rotation_vs,shadow_fs);
	sh.attributes = [ ShaderAttribute.VertexPosition()];
	
	sh.shaderSwap = this.shadowShader.shaderSwap;
	sh.modelSwap = this.shadowShader.modelSwap;
	sh.set_individual_actor_data = function(actor){
		gl.uniform3f( this.rotationSinUniform, Math.sin(-actor.rotX)*actor.scale, Math.sin(actor.rotY), Math.sin( -actor.rotZ )); 
		gl.uniform3f( this.rotationCosUniform, Math.cos(-actor.rotX)*actor.scale, Math.cos(actor.rotY), Math.cos( -actor.rotZ )); 
		gl.uniform3f( this.modelPosUniform, actor.x, actor.y, actor.z);
	}
	this.shadow_full_rotationShader = sh;	
	
	
	sh = new ShaderProgram(terrain_shadowed_vs,terrain_shadowed_fs);
	sh.attributes = [ ShaderAttribute.VertexPosition(), ShaderAttribute.VertexNormal()];
	sh.shaderSwap = function(){ 
		mat4.identity(modelMatrix);
		gl.disable(gl.BLEND);
		gl.depthMask(true);
		gl.enable(gl.CULL_FACE);
		this.setEnvironmentUniforms_Terrain();
		this.setOverlayUniforms();
		this.setShadowUniforms();
		
		gl.uniformMatrix4fv(this.modelMatrixUniform, false,modelMatrix);
		//mat4.translate(modelMatrix,modelMatrix,[-M.offsetX, -M.offsetY, 0]);
		gl.uniform3f(this.worldPosUniform, -M.offsetX, -M.offsetY, 0);
		gl.uniformMatrix4fv(this.mvpMatrixUniform, false,vpMatrix);

	}
	sh.modelSwap = function(m){
		this.attributes[0].enable_and_bind( m.buffers[0]);
		this.attributes[1].enable_and_bind( m.buffers[1]);
		
		if(m.terrainTex != null){
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, m.terrainTex.buffer);
			gl.uniform1i(this.terrainSamplerUniform, 0);
		}else{
			
		}
		gl.uniform2f(this.tilePosUniform, m.x, m.y);
	}
	this.terrainShader = sh;
	
	sh = new ShaderProgram(terrain_texture_vs,terrain_texture_fs);
	sh.attributes = [ ShaderAttribute.VertexPosition()];
	sh.shaderSwap = function(){ 
		mat4.identity(modelMatrix);
		gl.disable(gl.BLEND);
		gl.depthMask(false);
		gl.uniformMatrix4fv(this.modelMatrixUniform, false,modelMatrix);
		gl.uniform3f(this.worldPosUniform, -M.offsetX, -M.offsetY, 0);
		gl.uniformMatrix4fv(this.mvpMatrixUniform, false,terrainTexVPMatrix);
		gl.uniform2f(this.terrainTexCoordMultiplierUniform, M.terrain.getTexCoordMultW(), M.terrain.getTexCoordMultH());
	}
	
	sh.modelSwap = sh.modelSwap = function(m){
		this.attributes[0].enable_and_bind( m.buffers[0]);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, m.textures[0].buffer);
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, m.textures[1].buffer);
		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture(gl.TEXTURE_2D, m.textures[2].buffer);
		gl.activeTexture(gl.TEXTURE3);
		gl.bindTexture(gl.TEXTURE_2D, m.textures[3].buffer);
		gl.activeTexture(gl.TEXTURE4);
		gl.bindTexture(gl.TEXTURE_2D, M.terrain.blendTexture.buffer);
		gl.uniform1i(this.sampler1Uniform, 0);
		gl.uniform1i(this.sampler2Uniform, 1);
		gl.uniform1i(this.sampler3Uniform, 2);
		gl.uniform1i(this.sampler4Uniform, 3);
		gl.uniform1i(this.blendSamplerUniform, 4);
		gl.uniform3f(this.terrainOcclusionUniform, m.textures[1].terrainOcclusion, m.textures[2].terrainOcclusion, m.textures[3].terrainOcclusion);
		//we decrease the texcoords a little on the sides, to avoid artifacting
		gl.uniform4f(this.tileSideBiasUniform, m.x + m.tileSideBias[0], m.y + m.tileSideBias[1], m.tileSideBias[2],m.tileSideBias[3]);
		gl.uniform3f(this.worldPosUniform, -M.offsetX - m.x, -M.offsetY - m.y, 0);
	}
	this.terrainTextureShader = sh;
	
	sh = new ShaderProgram(ui_vs, ui_fs);
	sh.attributes = [ ShaderAttribute.VertexScreenPosition(), ShaderAttribute.VertexTexCoord()];
	this.guiShader = sh;
	
	sh = new ShaderProgram(ui_vs, fs_gun);
	sh.attributes = [ ShaderAttribute.VertexScreenPosition(), ShaderAttribute.VertexTexCoord()];
	sh.shaderSwap = function(){
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, Asset.texture.lightmap.buffer );
		gl.uniform1i(this.blendSamplerUniform , 1);
		gl.uniform1f(this.timeUniform , Render.shaderTime );
		if(Gamestats.Hero.last_floor_triangle){
			var tri = Gamestats.Hero.last_floor_triangle;
			var light = Math.min(255, tri.color[0] + Environment.fillColor[0]*4);
			if(Gamestats.Hero.weapon && Gamestats.Hero.weapon.always_lit || 
				Gamestats.Hero.leftWeapon && Gamestats.Hero.leftWeapon.always_lit ){
				light = 255;
			}
			gl.uniform3f(this.fillColorUniform, light, tri.color[1],tri.color[2]);
		}else{
			gl.uniform3f(this.fillColorUniform, 255, 0,0);
		}
	}
	this.gunShader = sh;
	
	sh = new ShaderProgram(screen_vs, screen_fs);
	sh.attributes = [ ShaderAttribute.VertexScreenPosition(), ShaderAttribute.VertexTexCoord()];
	sh.shaderSwap = function(){
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, bloomBlurTexture.buffer);
		gl.uniform1i(this.sampler1Uniform, 1);
		
		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture(gl.TEXTURE_2D, Asset.texture.lut.buffer);
		gl.uniform1i(this.sampler2Uniform, 2);
	}
	this.postProcessShader = sh;
 
	sh = new ShaderProgram(terrain_grid_vs,terrain_grid_fs);
	sh.attributes = [ ShaderAttribute.VertexPosition(),ShaderAttribute.VertexColor()];
	this.gridShader = sh;
	
	sh = new ShaderProgram(heightmap_vs,terrain_grid_fs);
	sh.attributes = [ ShaderAttribute.VertexPosition()];
	sh.shaderSwap = function(){
		gl.useProgram(this.program);
		gl.uniformMatrix4fv(this.mvpMatrixUniform, false, vpMatrix);
		gl.uniform3f(this.worldPosUniform, -M.offsetX, -M.offsetY, 0);
		gl.enable(gl.BLEND);
		gl.depthMask(false);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, Asset.texture.grid.buffer);
		gl.uniform1i(this.samplerUniform, 0);
		gl.uniform1i(this.blendSamplerUniform, 1);
		gl.uniform2f(this.terrainTexCoordMultiplierUniform, M.terrain.getTexCoordMultW(), M.terrain.getTexCoordMultH());
	}
	this.heightShader = sh;
	
	sh = new ShaderProgram(world_gui_vs,world_gui_fs);
	sh.attributes = [ ShaderAttribute.VertexPosition(), ShaderAttribute.VertexTexCoord()];
	sh.shaderSwap = function(actor){
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false,vpMatrix);
		gl.depthMask(false);
	}
	sh.modelSwap = function(actor){
		this.attributes[0].enable_and_bind( actor.model.buffers[0][0]);
		this.attributes[1].enable_and_bind( actor.model.buffers[2]);
	}
	sh.set_individual_actor_data = function(actor){
		mat4.identity(modelMatrix);
		mat4.translate(modelMatrix,modelMatrix,[actor.x,actor.y,actor.z]);
		mat4.rotate(modelMatrix,modelMatrix,actor.rotZ,[0,0,1]);
		mat4.scale(modelMatrix,modelMatrix,[actor.scaleX, actor.scaleY, actor.scaleZ]);
		gl.uniformMatrix4fv(this.modelMatrixUniform, false,modelMatrix);
		if(Render.drawType == gl.TRIANGLES){
			gl.uniform3f(this.tintUniform, actor.tint[0], actor.tint[1],actor.tint[2]);
			if(actor.depth_test == true){gl.enable(gl.DEPTH_TEST);}else{gl.disable(gl.DEPTH_TEST);}
		}else{
			gl.uniform3f(this.tintUniform, actor.tint_wire[0], actor.tint_wire[1],actor.tint_wire[2]);
			gl.disable(gl.DEPTH_TEST);
		}
	}
	sh.shaderEnd = function(){
		gl.disable(gl.BLEND);
		gl.enable(gl.DEPTH_TEST);
		gl.depthMask(true);
	}
	this.worldGuiShader = sh;
	
	sh = new ShaderProgram(vs_triangle, world_gui_fs);
	sh.attributes = [ ShaderAttribute.VertexPosition(), ShaderAttribute.VertexTexCoord()];
	sh.shaderSwap = function(actor){
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false,vpMatrix);
		gl.enable(gl.DEPTH_TEST);
		gl.depthMask(false);
	}
	sh.modelSwap = this.worldGuiShader.modelSwap;
	sh.set_individual_actor_data = function(actor){
		var mesh = actor.linkedObject;
		gl.uniform3f( this.rotationSinUniform, Math.sin(-mesh.rotX)*actor.scale, Math.sin(mesh.rotY), Math.sin( -mesh.rotZ )); 
		gl.uniform3f( this.rotationCosUniform, Math.cos(-mesh.rotX)*actor.scale, Math.cos(mesh.rotY), Math.cos( -mesh.rotZ )); 
		gl.uniform3f( this.modelPosUniform, actor.x, actor.y, actor.z);
		var c = actor.linkedTriangle.corners;
		var g = actor.linkedTriangle.center;
		var n = actor.linkedTriangle.plane;
		var offX = n[0]*0.1 - g[0];
		var offY = n[1]*0.1 - g[1];
		var offZ = n[2]*0.1 - g[2];
		var corners = [
		c[0][0]+offX,c[0][1]+offY,c[0][2]+offZ,
		c[1][0]+offX,c[1][1]+offY,c[1][2]+offZ,
		c[2][0]+offX,c[2][1]+offY,c[2][2]+offZ];
		gl.uniformMatrix3fv(this.triangleCornersUniform, false, corners );
		if(actor.selected){ //add oscillating glow if mesh triangle is selected
			var vibe = (Math.sin(Render.shaderTime * 25)+1) * 0.5;
			gl.uniform3f(this.tintUniform, actor.tint[0] +vibe, actor.tint[1]+vibe,actor.tint[2]+vibe);
		}else{
			gl.uniform3f(this.tintUniform, actor.tint[0], actor.tint[1],actor.tint[2]);
		}
	}
	sh.sortId = -99;
	sh.shaderEnd = this.worldGuiShader.shaderEnd;
	this.triangleShader = sh;
	
	sh = new ShaderProgram(ui_vs,terrain_overlay_fs );
	sh.attributes = [ ShaderAttribute.VertexScreenPosition(), ShaderAttribute.VertexTexCoord()];
	this.terrianOverlayShader = sh;
	
	sh = new ShaderProgram(local_light_vs, local_light_fs);
	sh.attributes = [ ShaderAttribute.Vertex2DPosition(), ShaderAttribute.VertexTexCoord()];
	this.localLightShader = sh;
	
	
	sh = new ShaderProgram(lifebar_vs,lifebar_fs);
	sh.attributes = [ ShaderAttribute.VertexScreenPosition()];
	sh.lastMax = 0;
	sh.lastUnitType = null;
	sh.shaderSwap = function(){
		this.lastMax = -1;
		this.lastUnitType = null;
		gl.uniformMatrix4fv(this.vpMatrixUniform, false,vpMatrix);
		this.attributes[0].enable_and_bind( GUI.rectCenterVertexBuffer);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, Asset.texture.lifebar.buffer);
		gl.uniform1i(this.sampler2Uniform, 1);
		//gl.uniform1f(this.scaleUniform, Render.lifebarScale);
	}
	sh.set_individual_actor_data = function(a){
		if(this.lastMax != a.owner.hp_max){
			this.lastMax = a.owner.hp_max;
			gl.uniform1f(this.lifebarMaxUniform, a.owner.hp_max);
		}
		if(this.lastUnitType != a.owner.proto ){
			this.lastUnitType = a.owner.proto ;
			gl.uniform1f(this.scaleUniform, a.owner.proto.lifebarWidth / GUI.aspectRatio);
		}
		gl.uniform3f(this.modelPosUniform, a.x,a.y,a.z + a.owner.proto.lifebarZ );
		gl.uniform1f(this.lifebarStatsUniform,a.owner.hp/a.owner.hp_max);
	}
	this.lifebarShader = sh;
	
	sh = new ShaderProgram(decal_vs, fs_mult);
	sh.attributes = [ ShaderAttribute.VertexPosition(), ShaderAttribute.VertexTexCoord()];
	sh.shaderSwap = function(actor){
		gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
		gl.enable(gl.BLEND);

		gl.uniformMatrix4fv(this.mvpMatrixUniform, false, vpMatrix);
		gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);
		
		this.setOverlayUniforms();
		this.setEnvironmentUniforms_Multiply();
	}
	sh.shaderEnd = function(){
		gl.disable(gl.BLEND);
		gl.depthMask(true);
	};
	sh.modelSwap = function(actor){
		m = actor.model;
		this.attributes[0].enable_and_bind( m.buffers[0][0]);
		this.attributes[1].enable_and_bind( m.buffers[2]);
		gl.uniform1f(this.alphaTresholdUniform, actor.alphaCutoff);
		//gl.uniform3f(this.modelPosUniform, actor.x, actor.y, actor.z);
		gl.uniform1f(this.transparencyUniform, 1 - Math.min(1, actor.timeLeft*0.0005));
		gl.depthMask(actor.depthMask);
	}
	sh.sortId = -100;
	this.decalShader = sh;
 	
	sh = new ShaderProgram(particle_vs, particle_fs);
	sh.attributes = [ ShaderAttribute.VertexPosition(), ShaderAttribute.VertexNormal(), ShaderAttribute.VertexTexCoord()];
	sh.set_individual_actor_data = function(actor){
		gl.uniform3f(this.modelPosUniform, actor.x,actor.y,actor.z);
		gl.uniform4f(this.ParticleParamsUniform, actor.age*0.01, actor.growth, actor.gravity_current, actor.motionChannel/ParticleActor.motionCount);
		gl.uniform1f(this.transparencyUniform, actor.opacity);
		
		if(this.last_draw_unlit != actor.unlit){
			this.setLitUnlitUniforms( !actor.unlit );
		}
		if(actor.floor_triangle){
			gl.uniform3f( this.fillColorUniform, actor.floor_triangle.color[0]+Environment.fillColor[0], actor.floor_triangle.color[1], actor.floor_triangle.color[2]);
		}else{
			gl.uniform3f( this.fillColorUniform, 255+Environment.fillColor[0],0,0);
		}
		gl.uniform1f(this.floorZUniform, actor.floorZ);
		//this.floorZUniform  = gl.getUniformLocation(this.program, "uFloorZ"); 
		
		
		if(this.last_draw_blended != actor.alphaBlended){
			if(actor.alphaBlended){
				gl.enable(gl.BLEND);
				gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
				gl.depthMask(false);
			}else{
				gl.depthMask(true);
				gl.disable(gl.BLEND);
			}
		}

		this.last_draw_unlit = actor.unlit;
		this.last_draw_blended = actor.alphaBlended;
		
	}
	sh.modelSwap = function(actor){
		m = actor.model;
		this.attributes[0].enable_and_bind( m.buffers[0]);
		this.attributes[1].enable_and_bind( m.buffers[1]);
		this.attributes[2].enable_and_bind( m.buffers[2]);
	}
	sh.shaderSwap = function(actor){
		gl.uniformMatrix4fv(this.pMatrixUniform, false,pMatrix);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false,vpMatrix);
		gl.uniform1f(this.alphaTresholdUniform, 0.05);
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, Asset.texture.lightmap.buffer );
		gl.uniform1i(this.blendSamplerUniform , 1);
		gl.uniform1f(this.timeUniform , Render.shaderTime );
		/*gl.depthMask(false);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);*/
		this.last_draw_unlit = false;
		this.last_draw_blended = false;
		this.setEnvironmentUniforms();
		this.setOverlayUniforms();
	 
		gl.activeTexture(gl.TEXTURE7);
		gl.bindTexture(gl.TEXTURE_2D, particleVertexTexture.buffer);
		gl.uniform1i(this.vertexSampler, 7);
		gl.uniform1f(this.PixelMiddleOffsetUniform, 0.5/ParticleActor.motionCount);
	}
	sh.shaderEnd = function(){
		gl.depthMask(true);
		gl.disable(gl.BLEND);
	}
	this.particleShader = sh;
 	
	sh = new ShaderProgram(vs1,fs_additive);
	sh.attributes = this.standard_single_rotationShader.attributes.slice(); //copy array;
	sh.modelSwap = this.standard_single_rotationShader.modelSwap;
	sh.sortId = -101;
	sh.shaderSwap = function(actor){
		gl.depthMask(false);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.ONE, gl.ONE);
		
		gl.uniform1f(this.alphaTresholdUniform, 0.5);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false,vpMatrix);
		gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);
		this.setEnvironmentUniforms_Additive();
		this.setOverlayUniforms();
	}
	sh.shaderEnd = function(){
		gl.disable(gl.BLEND);
		gl.depthMask(true);
	}
	sh.set_individual_actor_data_BASE = this.standard_single_rotationShader.set_individual_actor_data;
	sh.set_individual_actor_data = function(actor){
		this.set_individual_actor_data_BASE(actor);
		if(actor.tint){
			gl.uniform3f(this.ambientColorUniform, actor.tint[0],actor.tint[1],actor.tint[2]);
		}else{
			gl.uniform3f(this.ambientColorUniform, actor.opacity,actor.opacity,actor.opacity );
		}
	}
	this.waveShader = sh;
	
	sh = new ShaderProgram(vs1_fullrot,fs_additive);
	sh.attributes = this.standard_full_rotationShader.attributes.slice(); //copy array;
	sh.modelSwap = this.standard_full_rotationShader.modelSwap;
	sh.sortId = -101;
	sh.shaderSwap = this.waveShader.shaderSwap;
	sh.shaderEnd = this.waveShader.shaderEnd;
	sh.set_individual_actor_data_BASE = this.standard_full_rotationShader.set_individual_actor_data;
	sh.set_individual_actor_data = this.waveShader.set_individual_actor_data;
	this.additive_full_rotationShader = sh;
	
	sh = new ShaderProgram(vs1_fullrot ,fs_mult);
	sh.attributes = this.standard_full_rotation_no_specShader.attributes.slice(); //copy array;
	sh.modelSwap = this.standard_full_rotation_no_specShader.modelSwap;
	sh.sortId = -103;
	sh.shaderSwap = function(actor){
		gl.depthMask(false);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
		gl.uniform1f(this.alphaTresholdUniform, 0.5);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false,vpMatrix);
		gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);
		this.setEnvironmentUniforms_Multiply();
		this.setOverlayUniforms();
	}
	sh.shaderEnd = this.waveShader.shaderEnd;
	sh.set_individual_actor_data_BASE = this.standard_full_rotation_no_specShader.set_individual_actor_data;
	sh.set_individual_actor_data = function(actor){
		this.set_individual_actor_data_BASE(actor);
		gl.uniform1f(this.transparencyUniform,1 - actor.opacity);
	}
	this.multiplyShader = sh;
	
	sh = new ShaderProgram(vs1,fs_rain);
	sh.attributes = this.standard_single_rotationShader.attributes.slice(); //copy array;
	sh.modelSwap = this.standard_single_rotationShader.modelSwap;
	sh.sortId = -102;
	sh.shaderSwap = function(actor){
		gl.depthMask(false);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.ONE, gl.ONE);
		gl.uniform1f(this.alphaTresholdUniform, 0.5);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false,vpMatrix);
		gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);
		this.setEnvironmentUniforms_Additive();
		this.setOverlayUniforms();
		
		gl.activeTexture(gl.TEXTURE3);
		gl.bindTexture(gl.TEXTURE_2D, M.terrain.waterTexture.buffer);
		gl.uniform1i(this.blendSamplerUniform, 3);
		gl.uniform2f(this.terrainTexCoordMultiplierUniform, M.terrain.getTexCoordMultW(), M.terrain.getTexCoordMultH());
	}
	sh.shaderEnd = this.waveShader.shaderEnd;
	sh.set_individual_actor_data_BASE = this.standard_single_rotationShader.set_individual_actor_data;
	sh.set_individual_actor_data = this.waveShader.set_individual_actor_data;
	this.rainShader = sh;
	
	/*sh = new ShaderProgram(vs1,ripple_fs);
	sh.attributes = this.standard_single_rotationShader.attributes.slice(); //copy array;
	sh.modelSwap = this.standard_single_rotationShader.modelSwap;
	sh.sortId = -101;
	sh.shaderSwap = function(actor){
		gl.depthMask(false);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.DST_COLOR, gl.SRC_COLOR);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false,vpMatrix);
	}
	sh.shaderEnd = function(){
		gl.disable(gl.BLEND);
		gl.depthMask(true);
	}
	sh.set_individual_actor_data_BASE = this.standard_single_rotationShader.set_individual_actor_data;
	sh.set_individual_actor_data = function(actor){
		this.set_individual_actor_data_BASE(actor);
		gl.uniform1f(this.intensityUniform, actor.opacity);
	}
	this.rippleShader = sh;*/
 
	/*sh = new ShaderProgram(vs_static, fs_puddle);
	sh.attributes = [ ShaderAttribute.VertexPosition(), ShaderAttribute.VertexNormal(), ShaderAttribute.VertexTexCoord()]; //copy array;
	sh.shaderSwap = function(actor){
		this.setShadowUniforms();
		gl.uniform1f(this.alphaTresholdUniform, 0.98);
		gl.uniformMatrix4fv(this.vpMatrixUniform, false,vpMatrix);
		gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);
		this.setEnvironmentUniforms();
		this.setOverlayUniforms();
		
		gl.activeTexture(gl.TEXTURE4);
		gl.bindTexture(gl.TEXTURE_2D, reflectionTexture.buffer);
		gl.uniform1i(this.reflectionSamplerUniform, 4);
		gl.uniform2f(this.screenPixelSizeUniform, canvas.width, canvas.height);
		
		gl.depthMask(false);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	}
	sh.set_individual_actor_data = function(actor){
		gl.uniform3f(this.modelPosUniform, 0,0,0);
		gl.uniform1f(this.transparencyUniform, Math.min(1, actor.timeLeft*0.0005));
	}
	sh.modelSwap = function(actor){
		m = actor.model;
		this.attributes[0].enable_and_bind( m.buffers[0][0]);
		this.attributes[1].enable_and_bind( m.buffers[1][0]);
		this.attributes[2].enable_and_bind( m.buffers[2]);
		gl.uniform1f(this.alphaTresholdUniform, actor.alphaCutoff);
		//gl.uniform1f(this.transparencyUniform, 1 - Math.min(1, actor.timeLeft*0.0005));
	}
	sh.shaderEnd = function(){
		gl.disable(gl.BLEND);
		gl.depthMask(true);
	}
	this.puddleShader = sh;*/
	
	/*var sh = new ShaderProgram(vs_rope,fs_shadowed);
	sh.attributes = [ ShaderAttribute.VertexPosition(), ShaderAttribute.VertexNormal(), ShaderAttribute.VertexTexCoord()];
	sh.shaderSwap = this.standard_single_rotationShader.shaderSwap;
	sh.modelSwap = this.roadShader.modelSwap;
	sh.set_individual_actor_data = function(actor){
		gl.uniform3f( this.catenaryUniform, actor.a_factor, actor.b_factor, actor.c_factor);
		//rope arclength, length of xy projection(x length in local space), arclength zero offset (a*sinh(b/a))
		gl.uniform4f( this.ropeParamsUniform, actor.ropeLength, actor.xyLength, actor.a_factor*Math.sinh(actor.b_factor/actor.a_factor), actor.textureLength);
		gl.uniform2f( this.rotationSinCosUniform, Math.sin( -actor.rotZ )*actor.scale_current, Math.cos( -actor.rotZ )*actor.scale_current);
		gl.uniform3f( this.modelPosUniform, actor.x, actor.y, actor.z);
	}
	this.ropeShader = sh;*/
	
	sh = new ShaderProgram(vs_nospec, sky_fs);
	sh.attributes = this.standard_no_specShader.attributes.slice();
	sh.shaderSwap = function(){
		gl.uniformMatrix4fv(this.vpMatrixUniform, false, vpMatrix);
		//gl.uniform3f(this.groundColorUniform, Environment.groundColor[0],Environment.groundColor[1],Environment.groundColor[2]);
		//this.setEnvironmentUniforms();
		gl.uniform3f(this.skyColorUniform, Environment.skyColor[0], Environment.skyColor[1],Environment.skyColor[2]);
		var cloudColor = Environment.cloudColor_skyReflection ? Environment.cloudColor_skyReflection : Environment.cloudColor;
		gl.uniform4f(this.cloudColorUniform, cloudColor[0], cloudColor[1],cloudColor[2],cloudColor[3]*Environment.cloudOpacity);
		gl.uniform2f(this.cloudPosUniform, Environment.cloudOffset[0], Environment.cloudOffset[1]);
		gl.uniform2f(this.texOffsetUniform, 0.5*cam.yaw / -1.57 + Environment.skyOffset[0], Environment.skyOffset[1] );
		gl.uniform1f(this.texScaleUniform, 1024/Environment.skyTexture.width);
	}
	sh.modelSwap = this.standard_no_specShader.modelSwap;
	sh.set_individual_actor_data = this.standard_no_specShader.set_individual_actor_data;
	this.skyShader = sh;
	
	var sh = new ShaderProgram(vs1_fullrot, fs_additive);
	sh.attributes = [ ShaderAttribute.VertexPosition(), ShaderAttribute.VertexNormal(), ShaderAttribute.VertexTexCoord(), 
	ShaderAttribute.VertexPositionNext(),ShaderAttribute.VertexNormalNext()];
	sh.shaderSwap = function(actor){
		gl.uniformMatrix4fv(this.vpMatrixUniform, false, vpMatrix);
		gl.uniformMatrix3fv(this.nMatrixUniform, false, normalMatrix);
		this.setEnvironmentUniforms_Additive();
		gl.uniform4f(this.fogSizeUniform,10,9999, 10,-100);
		gl.uniform3f( this.ambientColorUniform,Environment.backgroundColor[0],Environment.backgroundColor[1],Environment.backgroundColor[2]);
		this.setOverlayUniforms();
		gl.uniform1f(this.alphaTresholdUniform, 0.1);
		gl.depthMask(false);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.ONE, gl.ONE);
	}
	sh.modelSwap = this.standard_single_rotationShader.modelSwap;
	sh.set_individual_actor_data = function(actor){
		var packedInterp = actor.frameInterp + 1; //add 1 so it will never be 0;
		var scale =actor.scale* 2;
		gl.uniform3f( this.rotationSinUniform, Math.sin(-actor.rotX)*scale, Math.sin(actor.rotY)*packedInterp, Math.sin( -actor.rotZ )*actor.scaleZ); 
		gl.uniform3f( this.rotationCosUniform, Math.cos(-actor.rotX)*scale, Math.cos(actor.rotY)*packedInterp, Math.cos( -actor.rotZ )*actor.scaleZ); 
		gl.uniform3f( this.modelPosUniform, actor.x_draw, actor.y_draw, actor.z-2*scale);

	}
	sh.shaderEnd = function(){
		gl.disable(gl.BLEND);
		gl.depthMask(true);
	}
	sh.sortId = -99;
	this.backgroundShader = sh;
	
	ShaderProgram.standard_single_rotationShader.full_rot_alias = ShaderProgram.standard_full_rotationShader;
	ShaderProgram.standard_shadowedShader.full_rot_alias = ShaderProgram.standard_full_rotation_no_specShader;
	ShaderProgram.standard_full_rotation_no_specShader.single_rot_alias = ShaderProgram.standard_shadowedShader;
	ShaderProgram.standard_full_rotationShader.single_rot_alias = ShaderProgram.standard_single_rotationShader;
	
	ShaderProgram.standard_single_rotationShader.low_quality_alias = ShaderProgram.standard_no_specShader;
	ShaderProgram.standard_full_rotationShader.low_quality_alias = ShaderProgram.standard_full_rotation_no_specShader;
}


