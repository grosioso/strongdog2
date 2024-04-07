//attachment point of a model asset
function ModelPoint(){
	this.x = 0; this.y =0; this.z = 0;
	this.q = [0,0,0,1];
	this.rotX = 0;
	this.rotY = 0;
	this.rotZ = 0;
	this.scale = 1;
}

function Model3d(_hasVertexColor){
	this.sortId =  Model3d.nextSortId;
	this.name = "NONE";
	Model3d.nextSortId ++;
	this.drawShaderFrameCombos = [];
	this.vertsArray = [];
	this.normsArray = [];
	this.texCoords = [];
	this.vertColors = [];
	this.pointsArray = [[[0,0,0,0,0,0,0]]];
	this.fverts = [];
	this.fnorms = [];
	this.fcolors = [];
	this.ftexCoords = [];
	this.frameTimes = [];
	this.matIds = [];
	this.mat_id_parts = []; //[ [id, face_start, length],[id, face_start, length],[...] ]
	this.soundIds = [];
	this.numVerts = 0;
	this.numFrames = 1;
	this.numFaces = 0;
	this.numNorms = 0;
	this.numVertColors = 0;
	this.numTexCoords = 0;
	this.scale = 1;
	this.waitingForLoad = true;
	this.keepMeshData = false; //true for navmesh and other utility meshes
	
	this.cornerAsset = null; //used for walls
	this.straightAsset = null; //used for walls
	this.nubAsset = null; //used for walls
	
	this.bound_width = 0;
	this.bound_height = 0;
	this.bound_zOffset = 0;
	this.bound_xOffset = 0;
	this.bound_yOffset = 0;
	this.bound_xSize = 0;
	this.bound_ySize = 0;
	this.bound_zSize = 0;
	
	this.hasVertexColor = _hasVertexColor;
	
	this.multiple_frames = true;
	this.vertexTexture = null;

	this.buffers = [];
	//this.buffersBackup = [[[0,0,0,0,0,0,0,0,0]], [[0,0,0,0,0,0,0,0,0]], [0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0],[0,0,0]];
	this.buffersBackup = [[[0,0,0,0,0,0,0,0,0]], [[0,0,0,0,0,0,0,0,0]], [0,0,0,0,0,0]];
	this.getZAt = Model3d.getZAt;
	this.getMeshNetwork = Model3d.getMeshNetwork;
	
	this.NavTriangles = null;
	this.NavPartitions = null;
	this.navOffsetX=0;this.navOffsetY=0;
}
Model3d.nextSortId = 0;
Model3d.prototype.createBackupBuffers = function(){
	this.buffersBackup[0] = [];
	this.buffersBackup[1] = [];
	for(var i=0;i<this.numFrames;++i){
		this.buffersBackup[0][i] = this.posUnpack(i);
		this.buffersBackup[1][i] = this.normUnpack(i);
	}
	this.buffersBackup[2] = this.texCoordUnpack();
	if(this.hasVertexColor == true){
		this.buffersBackup[3] = this.vertColorUnpack();
	}
	//this.buffersBackup[4] = this.vertIdUnpack();
}

Model3d.prototype.posToBuffer = function(frame){
	return this.buffersBackup[0][frame];
}
Model3d.prototype.normToBuffer = function(frame){
	return this.buffersBackup[1][frame];
}
Model3d.prototype.texCoordToBuffer = function(){
	return this.buffersBackup[2];
}
Model3d.prototype.vertColorToBuffer = function(){
	return this.buffersBackup[3];
}
Model3d.prototype.vertIdToBuffer = function(){
	return this.buffersBackup[4];
}

//from vertex index face format to buffer format
Model3d.prototype.posUnpack = function(frame){
	var buf = new Float32Array(this.numFaces*9);
	var nextId = 0;
	var verts = this.vertsArray[frame];
	
	for(i=0;i<this.numFaces;++i){
		for(j=0;j<this.fverts[i].length;++j){
			if( !verts[this.fverts[i][j]-1]){
				console.log(verts, this.fverts, i, j)
			}				
			buf[nextId]=(verts[this.fverts[i][j]-1][0] * this.scale);
			nextId++;
			buf[nextId]=(verts[this.fverts[i][j]-1][1] * this.scale);
			nextId++;
			buf[nextId]=(verts[this.fverts[i][j]-1][2] * this.scale);
			nextId++;
		}
	}
	return buf;
}
Model3d.prototype.normUnpack = function(frame){
	var buf = new Float32Array(this.numFaces*9);
	var nextId = 0;
	var norms = this.normsArray[frame];
	for(i=0;i<this.numFaces;++i){
		for(j=0;j<this.fverts[i].length;++j){
			if(this.fnorms[i].length > j){
				buf[nextId]=norms[this.fnorms[i][j]-1][0];
				nextId++;
				buf[nextId]=norms[this.fnorms[i][j]-1][1];
				nextId++;
				buf[nextId]=norms[this.fnorms[i][j]-1][2];
				nextId++;
			}
		}
	}
	return buf;
}
Model3d.prototype.vertColorUnpack = function(){
	var buf = new Float32Array(this.numFaces*9);
	var nextId = 0;
	for(i=0;i<this.numFaces;++i){
		for(j=0;j<this.fcolors[i].length;++j){
			if(this.fcolors[i].length > j){
				buf[nextId]=this.vertColors[this.fcolors[i][j]-1][0];
				nextId++;
				buf[nextId]=this.vertColors[this.fcolors[i][j]-1][1];
				nextId++;
				buf[nextId]=this.vertColors[this.fcolors[i][j]-1][2];
				nextId++;
			}
		}
	}
	return buf;
}
Model3d.prototype.texCoordUnpack = function(){
	var buf = new Float32Array(this.numFaces*6);
	var nextId = 0;
	for(i=0;i<this.numFaces;++i){
		for(j=0;j<this.ftexCoords[i].length;++j){
			if(this.ftexCoords[i].length > j){
				buf[nextId]=this.texCoords[this.ftexCoords[i][j]-1][0];
				nextId++;
				buf[nextId]=this.texCoords[this.ftexCoords[i][j]-1][1];
				nextId++;
			}
		}
	}
	return buf;
}
Model3d.prototype.vertIdUnpack = function(){
	var buf = new Float32Array(this.numFaces*3);
	for(i=0;i<buf.length;++i){
		buf[i]=i;
	}
	return buf;
}
//sort the triangles to make draw calls simpler,
//and create consecutive pieces that have the same sector ID and material ID
//Must also sort soundIds, since that is per-triangle data
Model3d.prototype.sort_faces_by_material_id = function(){
	this.mat_id_parts = [];
	var faceIdParts = [];
	var ids_found = 0;
	for(var i=0;i<this.matIds.length;++i){//preprocessing
		var id = this.matIds[i]; //each sub-array's arraypos is equal to the material id
		if(!faceIdParts[id]){ 
			faceIdParts[id] = [];
			ids_found ++;
		}
		faceIdParts[id].push(i); //a sub-array only contains face ids that have the same material id
	}
	
	if(ids_found == 1){//only 1 id, no sorting needed
		this.mat_id_parts[0] = [ this.matIds[0], 0, this.numFaces ];
	}else{
		var fverts_old = this.fverts.slice();
		var fnorms_old = this.fnorms.slice();
		var ftexCoords_old = this.ftexCoords.slice();
		var fcolors_old = this.fcolors.slice();
		var soundIds_old = this.soundIds.slice();
		
		var pasteId = 0;
		for(var i=0;i<faceIdParts.length;++i){
			if(! faceIdParts[i]){continue;}
			
			this.mat_id_parts.push( [i, pasteId, faceIdParts[i].length] ); // [id, face_start, length]
			
			for(var j=0;j<faceIdParts[i].length;++j){
				var faceId = faceIdParts[i][j];
				
				this.fverts[pasteId] = fverts_old[faceId];
				this.fnorms[pasteId] = fnorms_old[faceId];
				this.ftexCoords[pasteId] = ftexCoords_old[faceId];
				this.fcolors[pasteId] = fcolors_old[faceId];
				this.soundIds[pasteId] = soundIds_old[faceId];
				pasteId++;
			}
		}
	}
	
	this.matIds = null; //data no longer needed
}


Model3d.setImportScale = function(model,scale){
	model.scale = scale;
}
Model3d.getBounds = function(m){
	var vbuf = m.buffersBackup[0][0];
	var maxX = -999; var maxY = -999; var maxZ = -999; 
	var minX = 999; var minY = 999; var minZ = 999;
	for(var i=0;i<vbuf.length;i+=3){
		maxX = Math.max(maxX, vbuf[i]);
		maxY = Math.max(maxY, vbuf[i+1]);
		maxZ = Math.max(maxZ, vbuf[i+2]);
		minX = Math.min(minX, vbuf[i]);
		minY = Math.min(minY, vbuf[i+1]);
		minZ = Math.min(minZ, vbuf[i+2]);
	}
	m.bound_width = Math.max( Math.max( Math.abs(maxX),Math.abs(minX)), Math.max( Math.abs(maxY),Math.abs(minY)))*2 + 0.5;
	m.bound_height = maxZ-minZ;
	m.bound_zOffset = minZ;
	
	m.bound_xSize = maxX-minX;
	m.bound_ySize = maxY-minY;
	m.bound_zSize = m.bound_height;
	m.bound_xOffset = (maxX+minX)*0.5;
	m.bound_yOffset = (maxY+minY)*0.5;
}

function TerrainTile(_x,_y, _tileMaterial){
	this.hasVertexColor = true;
	this.noTexCoords = true;
	
	var size = 8;
	var verts = new Float32Array(size*size*18);
	var norms = new Float32Array(size*size*18);
	var vertColors = new Float32Array(size*size*18);
	var waterActor = null;
	
	this.minZ = 9999.0;//needed for visibility check
	this.maxZ = -9999.0;//needed for visibility check
	this.minZNormal = 99;
	
	this.x = _x * size;
	this.y = _y * size;
	this.visible = false;
	//used for managing unit placement terrain+ao change
	this.stored_for_structure_update = null;
	
	this.textures = [];
	this.textureIDs = [];
	//this.tileSideBias = [4,4,0.09,0.09];
	this.tileSideBias = [4,4,0.0,0.0];
	this.textureMask = _tileMaterial.array;
	this.matId =_tileMaterial.id;
	this.selected = false;
	this.terrainTex = null;
	
	this.texUpdateFinished = false; //used for terrainTexture tile update
	this.needRepaint = false; //true if touched by blendmap editor brush
	
	var heightMap = M.terrain.HeightMap;
	var normalMap = M.terrain.NormalMap;
	var colorMap = M.terrain.ColorMap;
	var cutoutMap =  M.terrain.CutoutMap;
	//maskMap;
	
	this.setTextures = function(){
		for(i=0;i<this.textureMask.length;++i){
			if(this.textureMask[i] >= 0){
				this.textures[this.textureMask[i]] = M.getTerrainTextureById(i);
				this.textureIDs[this.textureMask[i]] = i;
			}
		}
	}
	this.setTextures();
	
	
	this.buffers = [];
	
	this.initVertData = function(){
		for(var i=0;i<size;++i){
			for(var j=0;j<size;++j){
				var x1 = j+this.x;
				var x2 = j+this.x+1;
				var y1 = i+this.y;
				var y2 = i+this.y+1;
				var idx = (i*size+j)*18;
				
				//FIRST TRIANGLE
				verts[idx]=x1;
				verts[idx+1]=y1;
				verts[idx+2]=0;
				verts[idx+3]=x2;
				verts[idx+4]=y1;
				verts[idx+5]=0;
				verts[idx+6]=x1;
				verts[idx+7]=y2;
				verts[idx+8]=0;
				norms[idx]=0;
				norms[idx+1]=0;
				norms[idx+2]=1;
				norms[idx+3]=0;
				norms[idx+4]=0;
				norms[idx+5]=1;
				norms[idx+6]=0;
				norms[idx+7]=0;
				norms[idx+8]=1;
				//SECOND TRIANGLE
				verts[idx+9]=x1;
				verts[idx+10]=y2;
				verts[idx+11]=0;
				verts[idx+12]=x2;
				verts[idx+13]=y1;
				verts[idx+14]=0;
				verts[idx+15]=x2;
				verts[idx+16]=y2;
				verts[idx+17]=0;
				norms[idx+9]=0;
				norms[idx+10]=0;
				norms[idx+11]=1;
				norms[idx+12]=0;
				norms[idx+13]=0;
				norms[idx+14]=1;
				norms[idx+15]=0;
				norms[idx+16]=0;
				norms[idx+17]=1;
				
				//first tri colors
				vertColors[idx]=0;
				vertColors[idx+1]=0;
				vertColors[idx+2]=1;
				vertColors[idx+3]=0;
				vertColors[idx+4]=0;
				vertColors[idx+5]=1;
				vertColors[idx+6]=0;
				vertColors[idx+7]=0;
				vertColors[idx+8]=1;
				//second tri colors
				vertColors[idx+9]=0;
				vertColors[idx+10]=0;
				vertColors[idx+11]=1;
				vertColors[idx+12]=0;
				vertColors[idx+13]=0;
				vertColors[idx+14]=1;
				vertColors[idx+15]=0;
				vertColors[idx+16]=0;
				vertColors[idx+17]=1;
			}
		}
	}
	
	
	this.copyTerrainVertexZ = function(ii, jj, offi, offj, vertID){
		var x=this.x - M.offsetX;
		var y=this.y - M.offsetY;
		//mivel a puffer sorfolytonos, nem hasznalhatjuk a 2d-s cimzest a vert-ben
		//*18, mert 18 vert adat van egy tileban(6 vertex*(x,y,z)); +2, mert a Z a 2-es indexu
		var offs = cutoutMap[ii+y][jj+x];
		if(normalMap[ii+y][jj+x][3] > 0){
			offs += normalMap[ii+offi+y][jj+offj+x][4];
		}
		verts[(ii*size +jj)*18 + 2 + vertID*3] = heightMap[ii+offi+y][jj+offj+x] + offs;
	}
		
	this.copyTerrainVertexNorm = function(ii, jj, offi, offj, vertID){
		var x=this.x - M.offsetX;
		var y=this.y - M.offsetY;
		var n = normalMap[ii+offi+y][jj+offj+x];
		
		norms[(ii*size +jj)*18 + 0 + vertID*3] = n[0];
		norms[(ii*size +jj)*18 + 1 + vertID*3] = n[1];
		norms[(ii*size +jj)*18 + 2 + vertID*3] = n[2];
		this.minZNormal = Math.min(n[2], this.minZNormal);
	}
	
	this.copyTerrainColor = function(ii, jj, offi, offj, vertID){
		var x=this.x - M.offsetX;
		var y=this.y - M.offsetY;
		if(colorMap[ii+ y][jj+ x] <= 0){
			vertColors[(ii*size +jj)*18 + 0 + vertID*3] = 0;
			vertColors[(ii*size +jj)*18 + 1 + vertID*3] = 0;
			vertColors[(ii*size +jj)*18 + 2 + vertID*3] = 0;
		}else if(colorMap[ii+ y][jj+ x] == 1){
			vertColors[(ii*size +jj)*18 + 0 + vertID*3] = 0.25;
			vertColors[(ii*size +jj)*18 + 1 + vertID*3] = 0.5;
			vertColors[(ii*size +jj)*18 + 2 + vertID*3] = 0;
		}else if(colorMap[ii+ y][jj+ x] == 2){
			vertColors[(ii*size +jj)*18 + 0 + vertID*3] = 0;
			vertColors[(ii*size +jj)*18 + 1 + vertID*3] = 1;
			vertColors[(ii*size +jj)*18 + 2 + vertID*3] = 0;
		}else if(colorMap[ii+ y][jj+ x] == 3){
			vertColors[(ii*size +jj)*18 + 0 + vertID*3] = 0.5;
			vertColors[(ii*size +jj)*18 + 1 + vertID*3] = 0.5;
			vertColors[(ii*size +jj)*18 + 2 + vertID*3] = 0;
		}else{
			vertColors[(ii*size +jj)*18 + 0 + vertID*3] = 1;
			vertColors[(ii*size +jj)*18 + 1 + vertID*3] = 0;
			vertColors[(ii*size +jj)*18 + 2 + vertID*3] = 0;
		}
	}
	this.flipTile_mainDiag = function(ii,jj){
		var x_no_offset = this.x; var y_no_offset = this.y;
		var x1 = jj+x_no_offset;
		var x2 = jj+x_no_offset+1;
		var y1 = ii+y_no_offset;
		var y2 = ii+y_no_offset+1;
		var idx = (ii*size+jj)*18;
		verts[idx+6]=x2;
		verts[idx+7]=y2;
		verts[idx+12]=x1;
		verts[idx+13]=y1;
	}
		
	this.flipTile_antiDiag = function(ii,jj){
		var x_no_offset = this.x; var y_no_offset = this.y;
		var x1 = jj+x_no_offset;
		var x2 = jj+x_no_offset+1;
		var y1 = ii+y_no_offset;
		var y2 = ii+y_no_offset+1;
		var idx = (ii*size+jj)*18;
		verts[idx+6]=x1;
		verts[idx+7]=y2;
		verts[idx+12]=x2;
		verts[idx+13]=y1;
	}
	
	this.initTerrainData = function( ){
		var x=this.x - M.offsetX;
		var y=this.y - M.offsetY;
		
		this.minZNormal = 99;
		
		for(var i=0;i<size;++i){
			for(var j=0;j<size;++j){
				this.copyTerrainColor(i,j,0,0,0, colorMap);
				this.copyTerrainColor(i,j,0,1,1, colorMap);
				this.copyTerrainColor(i,j,1,0,2, colorMap);
				this.copyTerrainColor(i,j,1,0,3, colorMap);
				this.copyTerrainColor(i,j,0,1,4, colorMap);
				this.copyTerrainColor(i,j,1,1,5, colorMap);
				
				this.copyTerrainVertexZ(i,j,0,0,0,heightMap);
				this.copyTerrainVertexZ(i,j,0,1,1,heightMap);
				this.copyTerrainVertexZ(i,j,1,0,3,heightMap);
				this.copyTerrainVertexZ(i,j,1,1,5,heightMap);
				
				this.copyTerrainVertexNorm(i,j,0,0,0, normalMap);
				this.copyTerrainVertexNorm(i,j,0,1,1, normalMap);
				this.copyTerrainVertexNorm(i,j,1,0,3, normalMap);
				this.copyTerrainVertexNorm(i,j,1,1,5, normalMap);
					
				//update tile diagonal orientation
				if(Math.abs(heightMap[i+y+1][j+x]-heightMap[i+y][j+x+1]) > Math.abs(heightMap[i+y][j+x]-heightMap[i+y+1][j+x+1]) 
					&& M.terrain.flipTerrainTiles == true){
					this.flipTile_mainDiag(i,j);

					this.copyTerrainVertexZ(i,j,1,1,2,heightMap);
					this.copyTerrainVertexZ(i,j,0,0,4,heightMap);

					this.copyTerrainVertexNorm(i,j,1,1,2, normalMap);
					this.copyTerrainVertexNorm(i,j,0,0,4, normalMap);
				}else{
					this.flipTile_antiDiag(i,j);
					
					this.copyTerrainVertexZ(i,j,1,0,2,heightMap);
					this.copyTerrainVertexZ(i,j,0,1,4,heightMap);

					this.copyTerrainVertexNorm(i,j,1,0,2, normalMap);
					this.copyTerrainVertexNorm(i,j,0,1,4, normalMap);
				}
			}
		}
	}
	
	this.updateBoundsZ = function(){
		this.maxZ = -9999;
		this.minZ = 9999;
		for(var i=0;i<size;++i){
			for(var j=0;j<size;++j){
				for(var vertID=0;vertID<6;++vertID){
					var z = verts[(i*size + j)*18 + vertID*3 + 2];
					if(z < this.minZ){
						this.minZ = z;
					}
					if(z > this.maxZ){
						this.maxZ = z;
					}
				}
			}
		}
	}
	//preconstructed for allocation optimization;
	var cull_minpoint = [0,0,0];
	var cull_maxpoint =[0,0,0];
	this.frustum_cull = function(){
		//Az elozo verzio megnezte hogy a 8 sarokpont kozul latszik-e barmelyik. De elofordulhat az is, hogy
		//egyik sarokpont sem latszik, mert az alja a kep alatt, a teteje a kep folott van. Ezert a sikokat kell vizsgalni
		this.visible = true;
		var xx = this.x - M.offsetX;
		var yy = this.y - M.offsetY;
		cull_minpoint[0]=xx;cull_minpoint[1]=yy;cull_minpoint[2]=this.minZ;
		cull_maxpoint[0]=xx+size;cull_maxpoint[1]=yy+size;cull_maxpoint[2]=this.maxZ;
		if(Utils.frustum_Cull_AABB(cull_minpoint, cull_maxpoint, View_Frustum) == false){
			this.visible = false;
		}
	}
	
	this.posToBuffer = function(){
		return verts;
	}
	this.normToBuffer = function(){
		return norms;
	}
	this.vertColorToBuffer = function(){
		return vertColors;
	}
}


function DecalModel(_spawnX, _spawnY, _zoffset, _size, _angle){
	this.sortId = Math.random();
	var verts = [];
	var norms = [];
	var texCoords = [];
	this.buffers = [];
	
	this.multiple_frames = true; this.numFrames = 1;
	
	var x = _spawnX;
	var y = _spawnY;
	var zoffset = _zoffset;
	this.size = _size; 
	this.angle = _angle;
	var sinA = Math.sin(this.angle);
	var cosA = Math.cos(this.angle);
	//var texXDir = 1;
	//var texYDir = 1;

	this.moveTo = function(_x,_y){
		x = _x;
		y = _y;
		this.setVertData();
		initBuffers(this);
	}
	this.setAngle = function(_angle){
		this.angle = _angle;
		sinA = Math.sin(_angle);
		cosA = Math.cos(_angle);
	}

	this.setVertData = function(){
		//verts.length =  0;
		//norms.length =  0;
		//texCoords.length =  0;
		
		var dim = Math.round(this.size+1); //dimension of grid;
		var numtiles = dim*dim;
		
		verts =  new Float32Array(numtiles*18);
		norms =  new Float32Array(numtiles*18);
		texCoords =  new Float32Array(numtiles*12);
		
		var surface = M.terrain;
		var startX = Math.floor(x - this.size/2);
		var startY = Math.floor(y - this.size/2);
		
		function addTile(offX, offY, surface, decalsize){
			var x1 = offX + startX;
			var y1 = offY + startY;
			var x2 = x1 + 1;
			var y2 = y1 + 1;
			
			var offU = (startX - x + offX);
			var offV = (startY - y + offY);
			var texU = (cosA*offU -sinA *offV)/ decalsize + 0.5;
			var texV = (sinA*offU +cosA *offV)/ decalsize + 0.5;
			
			//texture coord offset by a single tile
			var texUOffsetU = cosA/decalsize; //(1,0)*(cosA, -sinA)
			var texUOffsetV = sinA/decalsize; //(1,0)*(sinA, cosA)
			
			var texVOffsetU = -sinA/decalsize;  //(0,1)*(cosA, -sinA)
			var texVOffsetV = cosA/decalsize; //(0,1)*(sinA, cosA)
			
			var z11 = surface.getVertexZ(x1,y1) + zoffset;
			var z12 = surface.getVertexZ(x1,y2) + zoffset;
			var z21 = surface.getVertexZ(x2,y1) + zoffset;
			var z22 = surface.getVertexZ(x2,y2) + zoffset;
			
			var n11 = surface.getVertexNorm(x1,y1);
			var n12 = surface.getVertexNorm(x1,y2);
			var n21 = surface.getVertexNorm(x2,y1);
			var n22 = surface.getVertexNorm(x2,y2);
			
			var z11 = surface.getVertexZ(x1,y1) + zoffset;
			var z12 = surface.getVertexZ(x1,y2) + zoffset;
			var z21 = surface.getVertexZ(x2,y1) + zoffset;
			var z22 = surface.getVertexZ(x2,y2) + zoffset;
			
			var n11 = surface.getVertexNorm(x1,y1);
			var n12 = surface.getVertexNorm(x1,y2);
			var n21 = surface.getVertexNorm(x2,y1);
			var n22 = surface.getVertexNorm(x2,y2);
			
			
			var idx = 18*(offY+dim*offX);
			var idxUV = 12*(offY+dim*offX);
			
			//for world offset
			//x1 -= x;
			//x2 -= x;
			//y1 -= y;
			//y2 -= y;
			
			//FIRST TRIANGLE
			verts[idx] = x1;
			verts[idx+1] = y1;
			verts[idx+2] = z11;
			verts[idx+3] = x2;
			verts[idx+4] = y1;
			verts[idx+5] = z21;
			
			norms[idx] = n11[0];
			norms[idx+1] = n11[1];
			norms[idx+2] = n11[2];
			norms[idx+3] = n21[0];
			norms[idx+4] = n21[1];
			norms[idx+5] = n21[2];
			
			texCoords[idxUV] = texU;
			texCoords[idxUV+1] = texV;
			texCoords[idxUV+2] = texU+texUOffsetU;
			texCoords[idxUV+3] = texV+texUOffsetV;
			
			//SECOND TRIANGLE
			verts[idx+9] = x1;
			verts[idx+10] = y2;
			verts[idx+11] = z12;
			verts[idx+15] = x2;
			verts[idx+16] = y2;
			verts[idx+17] = z22;
			
			norms[idx+9] = n12[0];
			norms[idx+10] = n12[1];
			norms[idx+11] = n12[2];
			norms[idx+15] = n22[0];
			norms[idx+16] = n22[1];
			norms[idx+17] = n22[2];
			
			texCoords[idxUV+6] = texU+texVOffsetU;
			texCoords[idxUV+7] = texV+texVOffsetV;
			texCoords[idxUV+10] = texU+texUOffsetU+texVOffsetU;
			texCoords[idxUV+11] = texV+texVOffsetV + texUOffsetV;
			
			if(Math.abs(z12-z21) > Math.abs(z11-z22)){
				verts[idx+6] = x2;
				verts[idx+7] = y2;
				verts[idx+8] = z22 ; 
				
				verts[idx+12] = x1;
				verts[idx+13] = y1;
				verts[idx+14] = z11;
				
				norms[idx+6] = n22[0];
				norms[idx+7] = n22[1];
				norms[idx+8] = n22[2];
			
				norms[idx+12] = n11[0];
				norms[idx+13] = n11[1];
				norms[idx+14] = n11[2];
				
				texCoords[idxUV+4] = texU+texUOffsetU+texVOffsetU
				texCoords[idxUV+5] = texV+texVOffsetV + texUOffsetV;
				
				texCoords[idxUV+8] = texU;
				texCoords[idxUV+9] = texV;
			}else{
				verts[idx+6] = x1;
				verts[idx+7] = y2;
				verts[idx+8] = z12;
				
				verts[idx+12] = x2;
				verts[idx+13] = y1;
				verts[idx+14] = z21;
				
				norms[idx+6] = n12[0];
				norms[idx+7] = n12[1];
				norms[idx+8] = n12[2];
			
				norms[idx+12] = n21[0];
				norms[idx+13] = n21[1];
				norms[idx+14] = n21[2];
				
				texCoords[idxUV+4] = texU+texVOffsetU;
				texCoords[idxUV+5] = texV+texVOffsetV;
				
				texCoords[idxUV+8] = texU+texUOffsetU;
				texCoords[idxUV+9] = texV+texUOffsetV;
			}
		}
		
		for(var i=0;i<dim;++i){
			for(var j=0;j<dim;++j){
				if(surface.quadIsOutside(startX + j, startY + i) == true){
					continue;
				}
				addTile(j, i, surface, this.size);
			}
		}
	}
	
	this.initVertData=this.setVertData;
	
	this.posToBuffer = function(){return verts;}
	this.normToBuffer = function(){return norms;}
	this.texCoordToBuffer = function(){return texCoords;}
	this.vertIdToBuffer = function(){return texCoords;}
	
	this.initVertData();
	initBuffers(this);
}

function RoadModel(_actor){
	this.sortId = Math.random()+1;
	var x = 0;
	var y = 0;
	this.verts = [];
	this.norms = [];
	this.texCoords = [];
	this.buffers = [];
	this.actor = _actor;
	this.spline = [];
	this.surface = M.terrain;
	this.multiple_frames = true; this.numFrames = 1;

	this.textureLength = this.actor.textureLength;
	this.maxWidth = 3; 
	this.widthsegs = 3; //number of segements along width
	
	this.refresh = function(_spline){
		this.textureLength = this.actor.textureLength;
		this.spline = [];
		var maxWidth = 0;
		for(var i=0; i<_spline.length;++i){
			this.spline.push([_spline[i].x, _spline[i].y, _spline[i].fillet, _spline[i].width]);
			maxWidth = Math.max(_spline[i].width, maxWidth);
		}
		this.maxWidth = maxWidth;
		this.widthsegs = Math.ceil(this.maxWidth);
		this.initVertData();
	}
	
	this.addSegment = function(segId, startpoint, endpoint, startdir, enddir, startWidth, endWidth, seglen, totallen, stripStart, stripEnd){
		var xs = startpoint[0];
		var xe = endpoint[0];
		var ys = startpoint[1];
		var ye = endpoint[1];

		var cs = Math.cos(startdir); var ss = Math.sin(startdir);
		var ce = Math.cos(enddir); var se = Math.sin(enddir);
		//rotated (0,1) vector
		var offXs = -ss*startWidth;
		var offYs = cs*startWidth;
		var offXe = -se*endWidth;
		var offYe = ce*endWidth;

		var x11 = xs +offXs * stripStart;
		var x12 = xe +offXe * stripStart;
		var x21 = xs +offXs * stripEnd;
		var x22 = xe +offXe * stripEnd;
		
		var y11 = ys +offYs * stripStart;
		var y12 = ye +offYe * stripStart;
		var y21 = ys +offYs * stripEnd;
		var y22 = ye +offYe * stripEnd;
		if(this.surface){
			var z11 = this.surface.getHeightAt(x11,y11);
			var z12 = this.surface.getHeightAt(x12,y12);
			var z21 = this.surface.getHeightAt(x21,y21);
			var z22 = this.surface.getHeightAt(x22,y22);
		
			var n11 = this.surface.getNormalAt(x11,y11);
			var n12 = this.surface.getNormalAt(x12,y12);
			var n21 = this.surface.getNormalAt(x21,y21);
			var n22 = this.surface.getNormalAt(x22,y22);
		}else{
			var z11 = startpoint[2];
			var z12 = endpoint[2];
			var z21 = startpoint[2];
			var z22 = endpoint[2];
			var n11 = Utils.normal_flat;
			var n12 = Utils.normal_flat;
			var n21 = Utils.normal_flat;
			var n22 = Utils.normal_flat;
		}
		
		var u1 = stripStart+0.5;
		var u2 = stripEnd+0.5;
		var v1 = totallen;
		var v2 = totallen+seglen;
		
		var idx = 18*segId;
		var idxUV = 12*segId;
		
		//FIRST TRIANGLE
		this.verts[idx] = x11;
		this.verts[idx+1] = y11;
		this.verts[idx+2] = z11;
		this.verts[idx+3] = x21;
		this.verts[idx+4] = y21;
		this.verts[idx+5] = z21;
		this.verts[idx+6] = x12;
		this.verts[idx+7] = y12;
		this.verts[idx+8] = z12;
		
		this.norms[idx] = n11[0];
		this.norms[idx+1] = n11[1];
		this.norms[idx+2] = n11[2];
		this.norms[idx+3] = n21[0];
		this.norms[idx+4] = n21[1];
		this.norms[idx+5] = n21[2];
		this.norms[idx+6] = n12[0];
		this.norms[idx+7] = n12[1];
		this.norms[idx+8] = n12[2];
		
		this.texCoords[idxUV] = u1;
		this.texCoords[idxUV+1] = v1;
		this.texCoords[idxUV+2] = u2;
		this.texCoords[idxUV+3] = v1;
		this.texCoords[idxUV+4] = u1;
		this.texCoords[idxUV+5] = v2;
		
		//SECOND TRIANGLE
		this.verts[idx+9] = x12;
		this.verts[idx+10] = y12;
		this.verts[idx+11] = z12;
		this.verts[idx+12] = x21;
		this.verts[idx+13] = y21;
		this.verts[idx+14] = z21;
		this.verts[idx+15] = x22;
		this.verts[idx+16] = y22;
		this.verts[idx+17] = z22;
		
		this.norms[idx+9] = n12[0];
		this.norms[idx+10] = n12[1];
		this.norms[idx+11] = n12[2];
		this.norms[idx+12] = n21[0];
		this.norms[idx+13] = n21[1];
		this.norms[idx+14] = n21[2];
		this.norms[idx+15] = n22[0];
		this.norms[idx+16] = n22[1];
		this.norms[idx+17] = n22[2];
		
		this.texCoords[idxUV+6] = u1;
		this.texCoords[idxUV+7] = v2;
		this.texCoords[idxUV+8] = u2;
		this.texCoords[idxUV+9] = v1;
		this.texCoords[idxUV+10] = u2;
		this.texCoords[idxUV+11] = v2;
	}
		
	this.setVertData = function(){
		var width = this.maxWidth;
		var segs = [];
		
		var dir = 0;
		var prevdir = 0;
		//get curve subdivision
		for(var i=0;i<this.spline.length-1;++i){
			var p1 = this.spline[i]; var p2 = this.spline[i+1];
			
			dir = Math.atan2(p2[1]-p1[1], p2[0]-p1[0]);

			var d1 = (p1[2]+6.283)%6.283;
			var d2 = (p2[2]+6.283)%6.283;
			if(d1-d2 > 3.1415){
				d2 +=6.283;
			}else if(d2-d1 > 3.1415){
				d1 +=6.283;
			}
			var dirdiff = Math.abs(d2-d1);
			
			var dist = Math.sqrt((p1[0]-p2[0])*(p1[0]-p2[0]) + (p1[1]-p2[1])*(p1[1]-p2[1]));
			
			var nseg = Math.round(dirdiff*3 + Math.sqrt(dist) + 1);
			var amp = dist*0.75; //amplitude of curve
			var my1 = Math.sin(d1)*amp;  //iranytenyezok
			var my2 = Math.sin(d2)*amp;
			var mx1 = Math.cos(d1)*amp; 
			var mx2 = Math.cos(d2)*amp;
			
			for(var j=0;j<nseg;++j){
				var t1 = j/nseg; //interpolation factor
				var t2 = (j+1)/nseg;
				
				var pc1s = [ p1[0]+(mx1*t1), p1[1]+(my1*t1) ]; //curve point
				var pc1e = [ p1[0]+(mx1*t2), p1[1]+(my1*t2) ];
				
				var pc2s = [ p2[0]-(mx2*(1-t1)), p2[1]-(my2*(1-t1)) ]; //curve point
				var pc2e = [ p2[0]-(mx2*(1-t2)), p2[1]-(my2*(1-t2)) ];
				
				//interpolate between the 2 tangents
				var pcs = [pc1s[0]*(1-t1) +pc2s[0]*(t1),pc1s[1]*(1-t1) +pc2s[1]*(t1)]; //curve segment start point
				var pce = [pc1e[0]*(1-t2) +pc2e[0]*(t2),pc1e[1]*(1-t2) +pc2e[1]*(t2)]; //curve segment end point
				
				var t = (t1+t2)*0.5;
				var dc_point = d1*(1-t) + d2*(t);
				var derivX_point = Math.cos(dc_point);
				var derivY_point = Math.sin(dc_point);
				var derivX = -1*(p1[0]+mx1*t) + (1-t)*mx1 + (p2[0]-mx2*t)+ t*mx2;
				var derivY = -1*(p1[1]+my1*t) + (1-t)*my1 + (p2[1]-my2*t)+ t*my2
				//only use analytic tangent at middle, use interpolated tangent near start and endpoint;
				derivX = Utils.LERP1(Math.abs(t-0.5)*2, derivX,derivX_point); 
				derivY = Utils.LERP1(Math.abs(t-0.5)*2, derivY,derivY_point); 
				var seglen = Math.sqrt((pcs[0]-pce[0])*(pcs[0]-pce[0]) + (pcs[1]-pce[1])*(pcs[1]-pce[1]));
				//startpoint,endpoint,startDir,endDir,uv length, width
				segs.push([pcs,pce,derivX,derivY, seglen * this.textureLength, Utils.LERP1(t1,p1[3],p2[3])])
			}
		}
		this.segmentsToMesh(segs);
		initBuffers(this);
	}
	this.segmentsToMesh = function(segs){
		//get strips subdivision
		var numtiles = segs.length * this.widthsegs;
		this.verts =  new Float32Array(numtiles*18);
		this.norms =  new Float32Array(numtiles*18);
		this.texCoords =  new Float32Array(numtiles*12);
		var totalLength = 0;
		for(var i=0;i<segs.length;i++){
			var dirX_s = segs[i][2]; var dirX_e = segs[i][2]; 
			var dirY_s = segs[i][3]; var dirY_e = segs[i][3]; 
			var w_s  = segs[i][5]; var w_e = segs[i][5];
			if(i > 0){
				dirX_s = (segs[i][2] + segs[i-1][2])*0.5;
				dirY_s = (segs[i][3] + segs[i-1][3])*0.5;
				w_s = (segs[i][5] + segs[i-1][5])*0.5;
			}
			if(i<segs.length-1){
				dirX_e = (segs[i][2] + segs[i+1][2])*0.5;
				dirY_e = (segs[i][3] + segs[i+1][3])*0.5;
				w_e = (segs[i][5] + segs[i+1][5])*0.5;
			}
			var dir_s = Math.atan2(dirY_s, dirX_s);
			var dir_e = Math.atan2(dirY_e, dirX_e);
			var singleStripWidth = 1/this.widthsegs;
			for(var j=0;j<this.widthsegs;++j){
				this.addSegment(i*this.widthsegs+j, segs[i][0], segs[i][1], dir_s,dir_e, w_s,w_e, segs[i][4], totalLength, 0.5-singleStripWidth*(j), 0.5-singleStripWidth*(j+1));
			}
			totalLength += segs[i][4];
		}
	}
	
	this.posToBuffer = function(){return this.verts;}
	this.normToBuffer = function(){return this.norms;}
	this.texCoordToBuffer = function(){return this.texCoords;}
	this.initVertData = this.setVertData;
	//this.initVertData();
}

RoadModel.Curve = function(_actor){
	var m = new RoadModel(_actor);
	m.surface = null;
	m.widthsegs = 1;
	
	m.refresh = function(){
		this.textureLength = this.actor.textureLength;
		this.initVertData();
	}
	m.initVertData = m.setVertData = function(){
		var nseg = this.actor.segments;
		var stepsize = 1/nseg;
		var width = this.actor.width;
		var segs = [];
		for(var j=0;j<nseg;++j){
			var t1 = j*stepsize; //interpolation factor
			var t2 = t1+stepsize;
			var pcs = this.actor.curveFunction(t1); //local start point, before rotaion
			var pce = this.actor.curveFunction(t2); //local end point
			//pythagorean
			var seglen = Math.sqrt((pcs[0]-pce[0])*(pcs[0]-pce[0])+
			(pcs[1]-pce[1])*(pcs[1]-pce[1])+
			(pcs[2]-pce[2])*(pcs[2]-pce[2]));
			//3d startpoint,3d endpoint,startDir,endDir,uv length, width
			segs.push([pcs,pce,0,0, seglen * this.textureLength, width])
		}
			
		this.segmentsToMesh(segs);
		initBuffers(this);
	}
	return m;
}

function ParticleModel(_numparts, _angle){
	this.sortId = Math.random()+2;
	this.numparts = _numparts;
	
	this.verts = [];
	this.norms = [];
	this.texCoords = [];
	
	this.buffers = [];
	
	this.moveTo = function(){};
	
	this.horizontalSpeed = 1;
	this.verticalSpeed = 0.1;
	this.horizontalSpeedVariation = 1;
	this.verticalSpeedVariation = 0.2;
	this.angle = _angle;
	this.consistency = 0.1;
	this.randomSize = 2.5;
	this.constSize = 2.5;
	this.stretch_z = 1;
	this.angleVariation = 1.5;
	
	this.spread_x = 0;
	this.spread_y = 0;
}

ParticleModel.prototype.setVertData = function(){
	this.verts = verts =  new Float32Array(this.numparts*18);
	this.norms = norms =  new Float32Array(this.numparts*18);
	this.texCoords = texCoords =  new Float32Array(this.numparts*12);
	
	//pre-generate the depth component of the normal
	//we use some tricks to avoid sorting
	/*var partz = new Float32Array(this.numparts);
	partz[0]=0;
	for(var i=1;i<this.numparts; ++i){
		partz[i] = partz[i-1]+Math.random()+0.01;
	}
	for(var i=0;i<this.numparts; ++i){
		partz[i] /= -partz[this.numparts-1];//normalize
		
	}
	for(var i=0;i<this.numparts; ++i){
		partz[i]-=partz[this.numparts-1]*0.5; //set to middle
	}*/
	
	var nrm = [0,0,0];
	for(var i=0;i<this.numparts; ++i){
		var idx = 18*(i);
		var idxUV = 12*(i);
		
		var psize = Math.random()*this.randomSize + this.constSize; 
		var pangle = (Math.random()-0.5)*6.28;
		var partX = this.spread_x * (Math.random()-0.5);
		var partY = this.spread_y * (Math.random()-0.5);
	 
		var uv1 = (Math.cos(pangle)-Math.sin(pangle)) *0.5;
		var uv2 = (Math.sin(pangle)+Math.cos(pangle)) *0.5;
	
		//position Z channel is used for time offset
		var z = 1. - Math.random()*this.consistency;
		
		var partDir = this.angle + (Math.random()-0.5)*this.angleVariation;
		var cs = Math.cos(partDir);
		var sn = Math.sin(partDir);
		
		var horizSpeed = this.horizontalSpeed + (Math.random()-0.5) * this.horizontalSpeedVariation;
		nrm[0] = horizSpeed*cs;
		//nrm[1] = partz[i];
		nrm[1] = horizSpeed*sn;
		nrm[2] = this.verticalSpeed      + (Math.random()-0.5) * this.verticalSpeedVariation;
		
		//FIRST TRIANGLE
		verts[idx] = -psize +partX ; 
		verts[idx+1] = -psize * this.stretch_z + partY;
		verts[idx+2] = z;
		verts[idx+3] = psize + partX;
		verts[idx+4] = -psize * this.stretch_z + partY;
		verts[idx+5] = z;
		verts[idx+6] = -psize + partX;
		verts[idx+7] = psize * this.stretch_z + partY;
		verts[idx+8] = z;
		
		norms[idx] = nrm[0];
		norms[idx+1] = nrm[1];
		norms[idx+2] = nrm[2];
		norms[idx+3] = nrm[0];
		norms[idx+4] = nrm[1];
		norms[idx+5] = nrm[2];
		norms[idx+6] = nrm[0];
		norms[idx+7] = nrm[1];
		norms[idx+8] = nrm[2];
		
		texCoords[idxUV] = -uv1 +0.5;
		texCoords[idxUV+1] = -uv2 +0.5;
		texCoords[idxUV+2] = uv2 +0.5;
		texCoords[idxUV+3] = -uv1 +0.5;
		texCoords[idxUV+4] = -uv2 +0.5;
		texCoords[idxUV+5] = uv1 +0.5;

		//SECOND TRIANGLE
		verts[idx+9] = -psize +partX;
		verts[idx+10] = psize * this.stretch_z + partY;
		verts[idx+11] = z;
		verts[idx+12] = psize +partX;
		verts[idx+13] = -psize * this.stretch_z + partY;
		verts[idx+14] = z;
		verts[idx+15] = psize +partX;
		verts[idx+16] = psize * this.stretch_z + partY;
		verts[idx+17] = z;
		
		norms[idx+9] = nrm[0];
		norms[idx+10] = nrm[1];
		norms[idx+11] = nrm[2];
		norms[idx+12] = nrm[0];
		norms[idx+13] = nrm[1];
		norms[idx+14] = nrm[2];
		norms[idx+15] = nrm[0];
		norms[idx+16] = nrm[1];
		norms[idx+17] = nrm[2];
		
		texCoords[idxUV+6] = -uv2+0.5;
		texCoords[idxUV+7] = uv1+0.5;
		texCoords[idxUV+8] = uv2+0.5;
		texCoords[idxUV+9] = -uv1+0.5;
		texCoords[idxUV+10] = uv1+0.5;
		texCoords[idxUV+11] = uv2+0.5;
	}
}
ParticleModel.prototype.initVertData = ParticleModel.prototype.setVertData;

ParticleModel.prototype.posToBuffer = function(){
	return verts;
}
ParticleModel.prototype.normToBuffer = function(){
	return norms;
}
ParticleModel.prototype.texCoordToBuffer = function(){
	return texCoords;
}
ParticleModel.prototype.init = function(){
	this.initVertData();
	initBuffers(this);
}