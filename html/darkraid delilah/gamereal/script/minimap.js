var Minimap = new Object();
Minimap.h = 64;
Minimap.w = 64; //size in minimap pixels
Minimap.maxDim = 64;

Minimap.color_vegetation = [0.15,0.5,0.08];
Minimap.color_rock = [0.5,0.5,0.5];
Minimap.color_black = [0.02,0,0.08];
//the factor by which the map resolution is larger than the minimap resolution
//if map is 128*128, but minimap is 64*64, factor is 2
Minimap.resolutionDivisor = 1;
Minimap.resolutionDivisor_ingame = 1;
Minimap.updateTileSize = 16;
Minimap.tileW = 8;
Minimap.tileH = 8;
Minimap.centerTarget = null;

Minimap.tileTextures = []; //first we generate a tileTexture
Minimap.texture = null;
Minimap.rtBuffer = null;

Minimap.unitArray = [];
Minimap.tintArray = [];
Minimap.tileTextureBuffers = [];
Minimap.currentTileX = 0;
Minimap.currentTileY = 0;
Minimap.centerOffsetX = 0;
Minimap.centerOffsetY = 0;
Minimap.Initialize = function(){
	Minimap.tileTextures = [];
	Minimap.unitArray = [];
	Minimap.tintArray = [];
	Minimap.tileTextureBuffers = [];
	Minimap.currentTileX = 0;
	Minimap.currentTileY = 0;
	Minimap.texture = null;
	Minimap.rtBuffer = null;
	//Minimap.rtBuffer_ZYKLON

	if(M.height > M.width){
		this.h = 64;
		this.w = 64;
		//this.w = 64 * M.width/M.height;
		this.maxDim = this.h;
	}else{
		this.h = 64;
		this.w = 64;
		//this.h = 64 * M.height/M.width;
		this.maxDim = this.w;
	}
	this.resolutionDivisor = M.maxDim/this.h;
	
	this.texture = createRenderToTextureOutput(false);
	this.rtBuffer = initRenderToTextureFramebuffer(this.texture , this.w, this.h);

	this.updateTileSize = 16;
	this.tileH = this.maxDim/this.updateTileSize;
	this.tileW = this.tileH;
	
	this.tileTextureArray = [];
	
	
	for(var i=0;i<this.h;++i){
		this.unitArray[i] = [];
		this.tintArray[i] = [];
		for(var j=0;j<this.w; ++j){
			this.unitArray[i][j] = new Uint8Array(Players.length);
			this.tintArray[i][j] = new Float32Array([1,1,1]);
		}
	}
	//ZYKLON
	/*this.tintArray_ZYKLON = [];
	for(var i=0;i<Pathfinder.mapH;++i){
		this.tintArray_ZYKLON[i] = [];
		for(var j=0;j<Pathfinder.mapW; ++j){
			this.tintArray_ZYKLON[i][j] = [1,1,1];
		}
	}*/

	for(var i=0;i<this.tileH;++i){
		Minimap.tileTextureBuffers[i] = [];
 		for(var j=0;j<this.tileW;++j){
			Minimap.tileTextureBuffers[i][j] = [];
			for(var k = 0;k<this.updateTileSize*this.updateTileSize;++k){
				Minimap.tileTextureBuffers[i][j][4*k] = 80;
				Minimap.tileTextureBuffers[i][j][4*k+1] = 80;
				Minimap.tileTextureBuffers[i][j][4*k+2] = 80;
				Minimap.tileTextureBuffers[i][j][4*k+3] = 255;
			}
		}
	}
	
	for(var i=0;i<this.tileH;++i){
		Minimap.tileTextures[i] = [];
 		for(var j=0;j<this.tileW;++j){
			Minimap.tileTextures[i][j] 
			= createTexture_From_Array(new Uint8Array(Minimap.tileTextureBuffers[i][j]), 1, 1, false);
		}
	}
}

Minimap.getTexture = function(){
	/*if(Control.gameState == Control.gameState_inGame){
		return this.texture_ZYKLON;
	}else{*/
		return this.texture;
	//}
}
Minimap.setPixelBlack = function(tx,ty,bufpos){
	this.tileTextureBuffers[ty][tx][bufpos] =  0;
	this.tileTextureBuffers[ty][tx][bufpos+1] = 0;
	this.tileTextureBuffers[ty][tx][bufpos+2] = 0;
	this.tileTextureBuffers[ty][tx][bufpos+3] = 255;
}
Minimap.update = function(){
	this.currentTileX ++;
	if(this.currentTileX >= this.tileW){
		this.currentTileX = 0;
		this.currentTileY = (this.currentTileY+1)% Math.ceil(this.tileH);
	}

	var tx = this.currentTileX;
	var ty = this.currentTileY;
	
	var visGroup = Control.currentPlayer.visGroup;
	var tintArr = this.tintArray;
	if(!this.centerTarget){
		var divisor = this.resolutionDivisor;
		if(M.width == M.height){
			this.centerOffsetX = 0;
			this.centerOffsetY = 0;
		}else if(M.width > M.height){
			this.centerOffsetX = 0;
			this.centerOffsetY = -(M.width-M.height)/2;
		}else{
			this.centerOffsetX = -(M.height-M.width)/2;
			this.centerOffsetY = 0;
		}
	}else{ //can be used to follow units and such
		this.centerOffsetX = (centerTarget.x-32*this.resolutionDivisor_ingame);
		this.centerOffsetY = (centerTarget.y-32*this.resolutionDivisor_ingame);
		var divisor = this.resolutionDivisor_ingame;
	}
	
			
	for(var i=0;i<this.updateTileSize;++i){
		for(var j=0;j<this.updateTileSize;++j){
			var bufpos = 4*(this.updateTileSize*i + j);
			
			var mmx = tx*this.updateTileSize + j + Math.floor(this.centerOffsetX/divisor);
			var mmy = ty*this.updateTileSize + i + Math.floor(this.centerOffsetY/divisor);
			
			var fineX = Math.floor((tx*this.updateTileSize+j)*divisor + this.centerOffsetX);
			var fineY = Math.floor((ty*this.updateTileSize+i)*divisor + this.centerOffsetY);
			if(fineX<0||fineY<0||fineX>=Pathfinder.mapW||fineY>=Pathfinder.mapH){
				this.setPixelBlack(tx,ty,bufpos);
				continue;
			}
			//var nod = Pathfinder.map[fineY][fineX];
			var fowstamp = Pathfinder.Visibility[visGroup][fineY][fineX];
			var unitColorId = -1;
			
			var mmpix = this.unitArray[mmy][mmx];
			var maxInfl = 0;
			for(var k=0;k<mmpix.length;++k){
				if(mmpix[k] > maxInfl){
					maxInfl = mmpix[k];
					unitColorId = k;
				}
			}
			var playerColor;
			if(unitColorId >= 0 && Pathfinder.FOW_Timestamp - fowstamp < 65){
				if(unitColorId == Control.currentPlayer.id){
					playerColor = Player.currentPlayerColor;	
				}else{
					playerColor = Players[unitColorId].color;
				}
				
				this.tileTextureBuffers[ty][tx][bufpos] = playerColor[0];
				this.tileTextureBuffers[ty][tx][bufpos+1] = playerColor[1];
				this.tileTextureBuffers[ty][tx][bufpos+2] = playerColor[2];
			}else{

				this.tileTextureBuffers[ty][tx][bufpos+3] = 255;
				var n = M.terrain.NormalMap[fineY][fineX];
				var light = 255;
				
				var colorBufpos = (M.terrain.texWidth *fineY + fineX)*4;
				
				this.tileTextureBuffers[ty][tx][bufpos] =  light/**M.terrain.minimapColorBuffer[colorBufpos]*/*tintArr[mmy][mmx][0];
				this.tileTextureBuffers[ty][tx][bufpos+1] = light/**M.terrain.minimapColorBuffer[colorBufpos+1]*/*tintArr[mmy][mmx][1];
				this.tileTextureBuffers[ty][tx][bufpos+2] = light/**M.terrain.minimapColorBuffer[colorBufpos+2]*/*tintArr[mmy][mmx][2];
				
				tintArr[mmy][mmx][0] *= 0.3;
				tintArr[mmy][mmx][1] *= 0.3;
				tintArr[mmy][mmx][2] *= 0.3;
			}
			
			//this.tileTextureBuffers[ty][tx][bufpos+3] = 255;
		}
	}
	updateTexture_From_Array(this.tileTextures[ty][tx], new Uint8Array(this.tileTextureBuffers[ty][tx]), this.updateTileSize, this.updateTileSize);
	minimap_framebuffer_update();
}
Minimap.addUnitAt = function(nx,ny, u){
	var xx = (nx / this.resolutionDivisor)>>0;
	var yy = (ny / this.resolutionDivisor)>>0;
	this.unitArray[yy][xx][u.owner.id] ++;
}
Minimap.removeUnitAt = function(nx,ny, u){
	var xx = (nx / this.resolutionDivisor)>>0;
	var yy = (ny / this.resolutionDivisor)>>0;
	this.unitArray[yy][xx][u.owner.id] --;
}

Minimap.removeUnit = function(u){
	this.unitArray[u.minimapY][u.minimapX][u.owner.id] --;
}
Minimap.tintAt = function(nx,ny,r,g,b){
	if(nx <0 || ny<0 ||nx>= M.width || ny>=M.height){
		return;
	}
	var xx = (nx / this.resolutionDivisor)>>0;
	var yy = (ny / this.resolutionDivisor)>>0;
	this.tintArray[yy][xx][0] = r;
	this.tintArray[yy][xx][1] = g;
	this.tintArray[yy][xx][2] = b;
}

Minimap.unitUpdate = function(u){
	/*var xx_old = Math.floor(n_old.nodex / this.resolutionDivisor);
	var yy_old = Math.floor(n_old.nodey / this.resolutionDivisor);
	var xx_new= Math.floor(n_new.nodex / this.resolutionDivisor);
	var yy_new = Math.floor(n_new.nodey / this.resolutionDivisor);
	if(xx_old!=xx_new || yy_old != yy_new){
		this.unitArray[yy_old][xx_old][ownerId] --;
		this.unitArray[yy_new][xx_new][ownerId] ++;
	}*/
	var xx =(u.x/this.resolutionDivisor)>>0;
	var yy =(u.y/this.resolutionDivisor)>>0;
	if(u.minimapX != xx || u.minimapY != yy){
		this.unitArray[u.minimapY][u.minimapX][u.owner.id] --;
		this.unitArray[yy][xx][u.owner.id] ++;
		u.minimapX = xx; u.minimapY = yy;
	}
}


Minimap.generate_tintArray = function(){
	var divisor = this.resolutionDivisor;
	for(var i=0;i<Doodads.length;++i){
		for(var j=0;j<Doodads[i].length;++j){
			for(var k=0;k<Doodads[i][j].length;++k){
				var d = Doodads[i][j][k];
				if(d.proto != null && d.proto.minimapColor != null || d.cliffSet){
					var n = Pathfinder.getNodeAt(d.x, d.y);
					if(n){
						if(d.cliffSet){
							if(n.walkable_private){
								//don't tint walkable cliff tiles, because those are ramps
								continue;
							}
							var color = d.cliffSet.minimapColor;
						}else{
							var color = d.proto.minimapColor;
						}
						this.tintArray[ (n.nodey/divisor>>0)][ (n.nodex/divisor>>0)]
						= color;
					}
				}
			}
		}
	}
	for(var i=0;i<Pathfinder.mapH;++i){
		for(var j=0;j<Pathfinder.mapW;++j){
			if(M.terrain.CutoutMap[i][j] < -5){
				this.tintArray[(i/divisor)>>0][(j/divisor)>>0] = Minimap.color_black;
			}
		}
	}
}

Minimap.zoomIn = function(){
	Minimap.resolutionDivisor_ingame= Math.min(4,Minimap.resolutionDivisor_ingame+0.5);
}
Minimap.zoomOut = function(){
	Minimap.resolutionDivisor_ingame= Math.max(1,Minimap.resolutionDivisor_ingame-0.5);
}
Minimap.saveThumbnail = function(){
	var buf = M.terrain.minimapColorBuffer;
	var tintArr = this.tintArray;
	var pixels = M.terrain.minimapColorBuffer.length/4;
	var savedBuf = "";
	var light = 0.5;
	for(var i=0;i<64;++i){
		var fineY = Math.floor(i*this.resolutionDivisor + this.centerOffsetY);
		for(var j=0;j<64;++j){
			var fineX = Math.floor(j*this.resolutionDivisor + this.centerOffsetX);
			if(fineX<0||fineX>=M.width || fineY<0||fineY>=M.height){
				savedBuf += sextetToB64Char(0);
				continue;
			}
			var n = M.terrain.NormalMap[fineY][fineX];
			
			if(Pathfinder.map[fineY][fineX].structure && Pathfinder.map[fineY][fineX].structure.proto.isResource){
				light = 100;
			}else{
				light = Math.max(0, Math.min( 1,(n[0]*-0.4 + n[1]*-0.3 + n[2]*0.8)));
			}
			var tintX = j + Math.floor(this.centerOffsetX/this.resolutionDivisor);
			var tintY =	i + Math.floor(this.centerOffsetY/this.resolutionDivisor);	
			var colorBufpos = (M.terrain.texWidth *fineY + fineX)*4;
			var r = buf[colorBufpos]*light*tintArr[tintY][tintX][0];
			var g = buf[colorBufpos+1]*light*tintArr[tintY][tintX][1];
			var b = buf[colorBufpos+2]*light*tintArr[tintY][tintX][2];
			//var pixSum = (r>>6)+(g>>6<<2)+(b>>6<<4);*/
			var pixSum = Math.min(255, (r+g+b)/3<<0)>>2;
			savedBuf += sextetToB64Char(pixSum);
		}
	}
	return savedBuf;
}
Minimap.loadThumbnail = function(data){
	var buf = new Uint8Array(data.length*4);
	var pixCount = data.length;
	for(var i=0;i<pixCount;++i){
		var pixSum = B64CharToSextet(data[i]);
		/*buf[i*4] = pixSum & 3 << 4;
		buf[i*4 + 1] = pixSum & 12 << 2;
		buf[i*4 + 2] = pixSum & 48;*/
		buf[i*4] = pixSum<<2;
		buf[i*4+1] = pixSum<<2;
		buf[i*4+2] = pixSum<<2;
		buf[i*4 + 3] = 255;
	}
	return createTexture_From_Array( buf , 64, 64, false); 
}
