
function Terrain(){
	var height = 128;
	var width = 128;
	//dimensions of blend texture, always power of 2
	this.texWidth = 128;
	this.texHeight = 128;
	this.flipTerrainTiles = true;
	
	var tilesize = 8; this.tilesize = tilesize;
	var deformStrokeStartValue = 0;
	var deformStrokeStartPos = [0,0];
	var deformStrokeStartValue_Cutout = 0;
	
	this.lastStrokeObject = null;
	
	this.Tiles = [];
	
	this.blendBuffer = new Uint8Array(width*height*4);
	this.waterBuffer = new Uint8Array(width*height*4);

	this.minimapColorBuffer = [];

	this.waterTexture = null;
	this.blendTexture = null;
	
	this.waterTexture_update_requested = false;
	this.blendTexture_update_requested = false;
	this.Update_Drawloop = function(){
		if(this.waterTexture_update_requested){
			updateTexture_From_Array(this.waterTexture, this.waterBuffer, this.texHeight, this.texWidth,false);
			this.waterTexture_update_requested = false;
		}
		if(this.blendTexture_update_requested){
			updateTexture_From_Array(this.blendTexture, this.blendBuffer, this.texHeight, this.texWidth,false);
			Render.terrainTex_update_painting = true;
			this.blendTexture_update_requested = false;
		}
	}
	
	this.create_blendTexture = function(){
		this.blendTexture = createTexture_From_Array(this.blendBuffer, this.texWidth, this.texHeight, true,false);
	}
	this.update_blendTexture = function(){
		this.blendTexture_update_requested = true;
	}
	this.create_waterTexture = function(){
		this.waterTexture = createTexture_From_Array(this.waterBuffer, this.texWidth, this.texHeight, true,false);
	}
	this.update_waterTexture = function(){
		this.waterTexture_update_requested = true;
	}
	
	this.update_tile = function(t){
		this.UpdateTileNormal(t);
		this.UpdateTile_Pathfinder_Heights(t);
		t.initTerrainData();
		t.updateBoundsZ();
		initBuffers(t);
	}
	
	this.HeightMap = [];
	this.NormalMap = [];
	this.ColorMap = [];
	this.CutoutMap = [];
	this.MaskMap = [];

	
	//when data == null, we load the default empty map 
	this.init = function(data){
		width = M.width;
		height = M.height
		this.texWidth = Utils.NextPow2(width);
		this.texHeight = Utils.NextPow2(height);
		this.blendBuffer = new Uint8Array(this.texWidth*this.texHeight*4);
		this.waterBuffer = new Uint8Array(this.texWidth*this.texHeight*4);
		
		for(var i=0;i<height/tilesize;i++){
			this.Tiles[i] = [];
			for(var j=0;j<width/tilesize;j++){
				this.Tiles[i][j] = new TerrainTile(j,i,TerrainMaterial.list[0]);
			}
		}
		
		if(data != null){
			var j = 0;
			//load terrain texture Map
			var dbb= data.blendBuffer; 
			for(var i=0;i<dbb.length;i+=5){
				var b64blend = dbb[i]+dbb[i+1]+dbb[i+2]+dbb[i+3];
				var converted_rgb = from_b64_fixed(b64blend,24,0,false);
				this.blendBuffer[j] = (converted_rgb/65536)>>0;
				this.blendBuffer[j+1] = ((converted_rgb%65536)/256)>>0;
				this.blendBuffer[j+2] = (converted_rgb%256)>>0;
				this.blendBuffer[j+3] = from_b64_fixed(dbb[i+4],6,0,false)*4;
				j+=4;
			}
			j=0;
			//load AO Map
			var dwb= data.waterBuffer; 
			for(var i=0;i<dwb.length;i+=4){
				//only load rba channels
				var b64blend = dwb[i]+dwb[i+1]+dwb[i+2]+dwb[i+3];
				var converted_rgb = from_b64_fixed(b64blend,24,0,false);
				this.waterBuffer[j] = (converted_rgb/65536)>>0;
				this.waterBuffer[j+2] = ((converted_rgb%65536)/256)>>0;
				this.waterBuffer[j+3] = (converted_rgb%256)>>0;
				j+=4;
			}
		}
					
		for(var i=0;i< height;++i){
			for(var j=0;j<width;++j){
				var idx = 4*(i*width + j)
				if(data == null){
					this.blendBuffer[idx] = 0;
					this.blendBuffer[idx+1] = 0;
					this.blendBuffer[idx+2] = 0;
					this.blendBuffer[idx+3] = 255;
					this.waterBuffer[idx] = 0;
					this.waterBuffer[idx+1] = 0;
					this.waterBuffer[idx+2] = 255;
					this.waterBuffer[idx+3] = 0;
				}
								
				this.minimapColorBuffer.push(0);
				this.minimapColorBuffer.push(0);
				this.minimapColorBuffer.push(0);
				this.minimapColorBuffer.push(255);
				
				this.updateTerrainColorAt(j,i);
			}
		}
		
		//lessOrEquals is IMPORTANT. We have one more row and column of vertices than tiles
		for(var i=0;i<=height;++i){
			this.HeightMap[i] = [];
			this.NormalMap[i] = [];
			this.ColorMap[i] = [];
			this.CutoutMap[i] = [];
			this.MaskMap[i] = [];
			for(var j=0;j<=width;++j){
				//this.HeightMap[i][j] = data==null ? 0 : data.HeightMap[i][j];
				if(data==null){
					this.HeightMap[i][j] = 0;
				}else{
					var buf_id = 2*(i*(width+1)+j);
					if(  buf_id < data.HeightMap.length ){
						var b64height = data.HeightMap[buf_id]+data.HeightMap[buf_id+1];
						this.HeightMap[i][j] = from_b64_fixed(b64height,6,6,true);
					}else{
						this.HeightMap[i][j] = 0;
					}
				}
				this.NormalMap[i][j]= new Float32Array(3);
				this.ColorMap[i][j]=0;
				this.CutoutMap[i][j] = 0;
				this.MaskMap[i][j] = 0;
			}
		}
		this.create_blendTexture();
		this.create_waterTexture();
	}
	
	this.inject = function(data){
		var w =data.width; var h = data.height;
		var tw = Utils.NextPow2(w); //texture width of data is not same as map width
		//load terrain texture map
		var j=0;
		console.log(data.blendBuffer.length / 4);
		var dbb= data.blendBuffer;
		for(var i=0;i<dbb.length;i+=5){
			var xx = (j)%tw; //x pos in data
			var yy = Math.floor((j)/tw); //y pos in data
			var mapBufPos =  4*((yy+M.loadY)*this.texWidth + (xx+M.loadX))//buffer pos in destination map
			var b64blend = dbb[i]+dbb[i+1]+dbb[i+2]+dbb[i+3];
			var converted_rgb = from_b64_fixed(b64blend,24,0,false);
			this.blendBuffer[mapBufPos] = Math.floor(converted_rgb/65536);
			this.blendBuffer[mapBufPos+1] = Math.floor((converted_rgb%65536)/256);
			this.blendBuffer[mapBufPos+2] = Math.floor(converted_rgb%256);
			this.blendBuffer[mapBufPos+3] = from_b64_fixed(dbb[i+4],6,0,false)*4;
			j++;
		}
		
		//load AO Map
		j=0;
		var dwb= data.waterBuffer; 
		for(var i=0;i<dwb.length;i+=4){
			var xx = (j)%tw; //x pos in data
			var yy = Math.floor((j)/tw); //y pos in data
			var mapBufPos =  4*((yy+M.loadY)*this.texWidth + (xx+M.loadX))//buffer pos in destination map
			//only load rba channels
			var b64blend = dwb[i]+dwb[i+1]+dwb[i+2]+dwb[i+3];
			var converted_rgb = from_b64_fixed(b64blend,24,0,false);
			this.waterBuffer[mapBufPos] = Math.floor(converted_rgb/65536);
			this.waterBuffer[mapBufPos+2] = Math.floor((converted_rgb%65536)/256);
			this.waterBuffer[mapBufPos+3] = Math.floor(converted_rgb%256);
			j++;
		}
		//load height map
		for(var i=0;i<=h;++i){
			for(var j=0;j<=w;++j){
				var buf_id = 2*(i*(w+1)+j);
				if( buf_id < data.HeightMap.length ){
					var b64height = data.HeightMap[buf_id]+data.HeightMap[buf_id+1];
					this.HeightMap[i+M.loadY][j+M.loadX] = from_b64_fixed(b64height,6,6,true);
				}
			}
		}
	}
	
	this.Update_All_Tiles = function(){
		for(var i=0;i<this.Tiles.length;++i){
			for(var j=0;j<this.Tiles[i].length;++j){
				this.Tiles[i][j].initVertData();
				this.update_tile(this.Tiles[i][j]);
			}
		}
	}
	
	this.UpdateTileNormal = function(t){
		var txx = t.x-M.offsetX;
		var tyy = t.y-M.offsetY;
		var tile_top = tyy+tilesize;
		var tile_right = txx+tilesize;
		var nx =0; var ny = 0;
		for(var i=tyy; i<= tile_top;++i){
			for(var j=txx; j<= tile_right;++j){
				var norm  = this.NormalMap[i][j];
				if(j <= 0){
					nx = this.HeightMap[i][j] - this.HeightMap[i][j+1];
				}else if(j >= width){
					nx = this.HeightMap[i][j-1] - this.HeightMap[i][j];
				}else{
					nx = this.HeightMap[i][j-1] - this.HeightMap[i][j+1];
				}
				
				if(i <= 0){
					ny = this.HeightMap[i][j] - this.HeightMap[i+1][j];
				}else if(i >= height){
					ny  = this.HeightMap[i-1][j] - this.HeightMap[i][j];
				}else{
					ny  = this.HeightMap[i-1][j] - this.HeightMap[i+1][j];
				}
				
				var nz = 2.0;
				var len = Math.sqrt(nz*nz+nx*nx+ny*ny);
				norm[0]= nx/len;
				norm[1]= ny/len;
				norm[2]= nz/len;
			}
		}
	}
	
	
	
	
	this.DeformStart = function(x,y, map, channel){
			var xx = Math.max(0,Math.min(width, x));
			var yy = Math.max(0,Math.min(height, y));
			
			this.deformStrokeStartPos = [xx,yy];
			
			if(map == 2){
				if(channel == -1){
					var texChannel = 3;
				}else{
					var texChannel = this.getTileAt(xx,yy).textureMask[channel]-1;
				}
				deformStrokeStartValue = this.blendBuffer[ 4*(Math.floor(yy) *this.texWidth+ Math.floor(xx)) + texChannel];
			}else if(map == Editor.brushMap_Water){
				deformStrokeStartValue = this.waterBuffer[ 4*(Math.floor(yy) *this.texWidth+ Math.floor(xx)) + channel];
			}else{
				deformStrokeStartValue = this.getHeightAt_NoCliff(xx,yy);
			}
			
			deformStrokeStartValue_Cutout = this.CutoutMap[Math.floor(yy)][Math.floor(xx)];

			/*}else if(map == 2){
				var index = (Math.floor(y) * width + Math.floor(x)) * 4 + 1;
				deformStrokeStartValue = this.blendBuffer[index];
			}else if(map == Editor.brushMap_Cutout){*/
	}
	
	
	
	this.SetTerrainPixel = function(nx,ny,channel,val){
		var index = (ny * this.texWidth + nx) * 4 + channel; //sorfolytonos, 4 csatornas
		this.blendBuffer[index] = val;
		//CLAMP VALUE
		this.blendBuffer[index] =  Math.min(255, Math.max(0, this.blendBuffer[index]));
		
		this.updateTerrainColorAt(nx,ny);
	}
	
	this.Deform = function(x, y, mode, map, channel){
		//var kernel = [[0.1,0.15,0.1],[0.15,0.2,0.15],[0.1,0.15,0.1]];
		var kernel = Editor.getKernel(Editor.brushSize,2);
	
		if(mode == 1){
			if(map == 2 ){
				this.Deform_Apply_Stamp(x,y,kernel, Editor.terrainBrushStrength, map, channel);
			}else if(map == 0 || map == 1 || map == 4 || map == 5){
				this.Deform_Apply_Stamp(x,y,kernel, Editor.sculptBrushStrength, map, channel);
			}else if(map == Editor.brushMap_Water ){ //setfixedrotation
				if(channel == 4){
					this.Deform_Apply_Stamp(x,y,kernel, Editor.sculptBrushStrength, map, channel);
				}else{
					this.Deform_Apply_Stamp(x,y,kernel, Editor.terrainBrushStrength, map, channel);
				}
			}else if(map == 6){
				this.Deform_Apply_Stamp(x,y,kernel, 1, map, channel);
			}else if(map == 99){ //deprecated, cutout
				this.Deform_Apply_Stamp(x,y,kernel, Math.floor(Editor.sculptBrushStrength*15) , map, channel);
			}/*else if(map == Editor.brushMap_Cliff){
				Editor.autoCliff(x,y,false,clifflevel);
			}*/			
		}
		
		if(mode == -1){
			if(map == 2){
				this.Deform_Apply_Stamp(x,y,kernel, -Editor.terrainBrushStrength, map, channel);
			}else if( map == Editor.brushMap_Water){
				if(channel == 4){ //flow dir dragrotation
					kernel = Editor.getKernel(Editor.brushSize,100);
					var dragdir = (Math.atan2( this.deformStrokeStartPos[1]-y,this.deformStrokeStartPos[0]-x) / 6.28318 + 2)%1 *0.5;
					this.Deform_Apply_Stamp(this.deformStrokeStartPos[0],this.deformStrokeStartPos[1],kernel, dragdir, map, channel);
				}else{
					this.Deform_Apply_Stamp(x,y,kernel, -Editor.terrainBrushStrength, map, channel);
				}
			}else if(map == 0 || map == 1 || map == 4 || map == 5){
				this.Deform_Apply_Stamp(x,y,kernel, -Editor.sculptBrushStrength, map, channel);
			}else if(map == 6){
				this.Deform_Apply_Stamp(x,y,kernel, -1, map, channel);
			}else if(map == 99){ //deprecated, cutout
				this.Deform_Apply_Stamp(x,y,kernel, -Math.floor(Editor.sculptBrushStrength*15) , map, channel);
			}/*else if(map == Editor.brushMap_Cliff){
				Editor.autoCliff(x,y,true,clifflevel);
			}*/
		}
		
		var smoothStrength = map!=Editor.brushMap_Water? Editor.smoothBrushStrength:0.2;
		if(mode == 2){
			this.Deform_Smooth(x,y,kernel, smoothStrength, map, channel, 0);
		}
		if(mode == 3){
			this.Deform_Smooth(x,y,kernel, smoothStrength, map, channel, 3);
		}
		if(mode == 4){
			this.Deform_Set_Tile_Bias(x,y,1);
		}
		if(mode == -4){
			this.Deform_Set_Tile_Bias(x,y,-1);
		}

		if(mode == 6){
			this.Deform_Mask_Tile(x,y,true);
		}
		if(mode == -6){
			this.Deform_Mask_Tile(x,y,false);
		}
		
		if(mode == 10){
			this.Deform_Tile_Water(x,y,true);
		}
		if(mode == -10){
			this.Deform_Tile_Water(x,y,false);
		}
		
		if(mode == 11){
			this.Deform_Tile_Set_Material(x,y,Editor.tileMaterial.id);
		}
		if(mode == -11){
			this.Deform_Tile_Set_Material(x,y,0);
		}
		
		var kernelHalfSize = kernel.length/2;
		for(var i=-kernelHalfSize-1;i<kernelHalfSize+tilesize; i+=tilesize){
			if(y+i > height || y+i<0){continue;}
			for(var j=-kernelHalfSize-1;j<kernelHalfSize+tilesize;j+= tilesize){
				if(x+j > width || x+j<0){continue;}
				var t = this.Tiles[Math.floor((y+i)/tilesize)][Math.floor((x+j)/tilesize)];
				if(map == Editor.brushMap_Blendmap || mode== 4 || mode == -4){
					t.needRepaint = true;
				}else{
					this.update_tile( t );
				}
			}
		}
		
		if(map == Editor.brushMap_Blendmap || mode== 4 || mode == -4){
			this.update_blendTexture();
		}else{
			this.update_waterTexture();
			//Update decals
			for(var i=0;i<Actors.length;++i){
				var a = Actors[i];
				if(a.isDecal == true && a.model.surface == this){
					if(Math.abs(a.x - x) < (kernel.length + a.model.size) && Math.abs(a.y - y) < (kernel[0].length + a.model.size)){
						a.model.setVertData();
						initBuffers(a.model);
					}
				}
			}
		}
	}
	
	this.UpdateTile_Pathfinder_Heights = function(t){
		var txx = t.x-M.offsetX;
		var tyy = t.y-M.offsetY;
		var tile_top = tyy+tilesize;
		var tile_right = txx+tilesize;
		
		for(var i=tyy; i< tile_top;++i){
			for(var j=txx; j< tile_right;++j){
				var n = Pathfinder.map[i][j];
				var oldZ = n.averageZ;
				n.averageZ = 0.25 * (this.HeightMap[i][j]+this.HeightMap[i+1][j]+this.HeightMap[i][j+1]+this.HeightMap[i+1][j+1]);
				var aoBufferId = (i*this.texWidth + j)*4 + 1;
				var ao_terrain = (Node.getCliffLevel_AO(n)) + n.averageZ;
				if(n.structure != null){
					n.wallZ = n.structure.proto.wallZ + n.structure.z;
					if(n.structure.actor&&n.structure.actor.revealed){
						ao_terrain+=n.structure.proto.ao_structure_height;
					}
				}
				Node.set_fow_occlusionZ(n);
				this.waterBuffer[ aoBufferId ] = Math.min(255,Math.max(0, ao_terrain*256/20. +128 ));
			}
		}
		t.stored_for_structure_update = null;
	}
	
	this.updateTerrainColorAt = function(nx,ny){
		var t = this.Tiles[Math.floor(ny/tilesize)][Math.floor(nx/tilesize)];
		var index = (ny*this.texWidth + nx)*4;
		
		var color_base = M.tilesetMiniMapColors[ t.textureIDs[0]];
		var color1 = M.tilesetMiniMapColors[ t.textureIDs[1]];
		var color2 = M.tilesetMiniMapColors[ t.textureIDs[2]];
		var color3 = M.tilesetMiniMapColors[ t.textureIDs[3]];
		
		var mix1 = this.blendBuffer[index] / 255.;
		var mix2 = this.blendBuffer[index +1] /255.;
		var mix3 = this.blendBuffer[index +2] /255.;
		this.minimapColorBuffer[index] = ((color_base[0]*(1-mix1) + color1[0]*mix1)*(1-mix2) + color2[0]*mix2)*(1-mix3) + color3[0]*mix3;
		this.minimapColorBuffer[index+1] = ((color_base[1]*(1-mix1) + color1[1]*mix1)*(1-mix2) + color2[1]*mix2)*(1-mix3) + color3[1]*mix3;
		this.minimapColorBuffer[index+2] = ((color_base[2]*(1-mix1) + color1[2]*mix1)*(1-mix2) + color2[2]*mix2)*(1-mix3) + color3[2]*mix3;
	}
	
	//@stamp takes a 2d array, kernel of applied deformation)
	this.Deform_Apply_Stamp = function(x,y,stamp, strength, map, channel){
		var centerOffset = - Math.floor(stamp.length/2);
		
		for(var i=0;i<stamp.length;++i){
			if(y+i+centerOffset > height+1 || y+i+centerOffset<0){
				continue;
			}
			for(var j=0;j<stamp[i].length;++j){
				
				var vertX =  Math.floor(x) + j +centerOffset;
				var vertY =  Math.floor(y) + i +centerOffset;
					
				if(x+j+centerOffset > width+1 || x+j+centerOffset<0){
					continue;
				}
				
				if( map != Editor.brushMap_Mask){
					if(map != Editor.brushMap_Height){
						if(this.MaskMap[vertY][vertX]!=0){
							continue;
						}
					}else{
						if(this.MaskMap[vertY][vertX]!=0){
							continue;
						}
						if(vertY >0 && this.MaskMap[vertY-1][vertX]!=0){
							continue;
						}
						if(vertX >0 && this.MaskMap[vertY][vertX-1]!=0){
							continue;
						}
						if(vertX>0 && vertY >0 && this.MaskMap[vertY-1][vertX-1]!=0){
							continue;
						}
					}
				}
				
				
				if(map == Editor.brushMap_Height){
					if(channel == 0){
						this.HeightMap[vertY][vertX]+=stamp[i][j] * strength;
						if(this.lastStrokeObject){
							this.lastStrokeObject.setDataPoint(vertX,vertY,map,channel, stamp[i][j] * strength);}
					}
				}else if (map == 1){
					//Edit vertex color
					this.ColorMap[vertY][vertX][channel] +=stamp[i][j] * strength;
					//CLAMP VALUE
					this.ColorMap[vertY][vertX][channel] = Math.min(1, Math.max(0, this.ColorMap[vertY][vertX][channel]));
					
				}else if(map == Editor.brushMap_Blendmap){
					//Edit blend texture
					if(channel >= 0){
						var texChannel = this.getTileAt(vertX,vertY).textureMask[channel] -1;
					}else{
						var texChannel = 3;
					}
					var index = (vertY * this.texWidth + vertX) * 4 + texChannel; //sorfolytonos, 4 csatornas
					if(index >= this.blendBuffer.length || texChannel < 0 ){
						continue;
					}
					var oldVal = this.blendBuffer[index];
					//CLAMP VALUE
					this.blendBuffer[index] =  Math.min(255, Math.max(0, oldVal + stamp[i][j] * strength));
					if(vertX >= width || vertY >= height){
						continue;
					}
					this.updateTerrainColorAt(vertX,vertY);
					if(this.lastStrokeObject){
						this.lastStrokeObject.setDataPoint(vertX,vertY,map,channel,this.blendBuffer[index] - oldVal)};
					
				}else if(map == Editor.brushMap_Pathing){
					var tileX =  Math.floor(x) + j + centerOffset;
					var tileY =  Math.floor(y) + i + centerOffset;
					if(tileX < width && tileY < height){
						var tile = Pathfinder.map[tileY][tileX];
						var oldVal = tile.pathType;
						if(strength >= 0){
							this.Deform_Set_Walkability(tile, false, null, channel);
						}else{
							this.Deform_Set_Walkability(tile, true, null, channel);
						}
						if(this.lastStrokeObject && Control.gameState == Control.gameState_inEditor){
							this.lastStrokeObject.setDataPoint(vertX,vertY,map,channel, tile.pathType - oldVal)};
					}
				}else if(map == Editor.brushMap_Cliff){
					var tileX =  Math.floor(x) + j + centerOffset;
					var tileY =  Math.floor(y) + i + centerOffset;
					Editor.autoCliff(tileX,tileY, strength < 0 ,  Editor.cliffLevel);
				}else if(map == Editor.brushMap_Cutout){
					var tileX =  Math.floor(x) + j + centerOffset;
					var tileY =  Math.floor(y) + i + centerOffset;
					this.CutoutMap[tileY][tileX] = strength;
					
				}else if (map == Editor.brushMap_Water){
					//CLAMP VALUE
					if(channel == 4){ //set rotation using 2 channels
						var index = (vertY * this.texWidth + vertX) * 4;
						var angle = strength * 6.28318 *2;
						var val_x = (Math.sin(angle)+1)*128;
						var val_y = (Math.cos(angle)+1)*128;
						var stampval = stamp[i][j] * 0.3;
						val_x = Math.min(255,Math.max(0,(this.waterBuffer[index]*  (1-stampval) + val_x * stampval)));
						val_y = Math.min(255,Math.max(0,(this.waterBuffer[index+1]*(1-stampval) + val_y * stampval)));
						this.waterBuffer[index] =  val_x;
						this.waterBuffer[index+1] =  val_y;
					}else{
						var index = (vertY * this.texWidth + vertX) * 4 + channel; //sorfolytonos, 4 csatornas
						if(index >= this.waterBuffer.length || channel < 0 ){
							continue;
						}
						var oldVal = this.waterBuffer[index];
						this.waterBuffer[index] =  Math.min(255, Math.max(0, oldVal + stamp[i][j] * strength));
						if(this.lastStrokeObject){
							this.lastStrokeObject.setDataPoint(vertX,vertY,map,channel,this.waterBuffer[index] - oldVal)};
					}
				}
			}
		}
	}
	
	//the @structure param is not null if it is called by a structure removal/addition function.
	//Only structure removal is allowed to remove pathing from under a structure. Editor brush is not allowed to do it. Hence the param
	this.Deform_Set_Walkability = function(node, walkable_or_not, structure, pathType){
		if(pathType == 1){//ZYKLON, player blocker
			if(Node.isWalkable(node) == true){
				Node.setWalkable(node,true,pathType);
				this.ColorMap[node.nodey][node.nodex] = walkable_or_not ? 0 : 1;
				node.pathType =  walkable_or_not ? 0 : 1;
			}
			
		}else{
			if(walkable_or_not == false){
				if(Node.isWalkable(node) == true){
					this.ColorMap[node.nodey][node.nodex] = pathType;
					Node.setWalkable(node,false, pathType);
				}
			}else{
				if(Node.isWalkable(node) == false && (node.structure==null || structure != null ) ){
					this.ColorMap[node.nodey][node.nodex] = 0;
					Node.setWalkable(node,true, 0);
				}
			}
		}
		Node.set_fow_occlusionZ(node);
		Node.resetWallZ(node);
	}
	
	/*this.Deform_Tile_Select = function(x,y,select_or_not){
		var tx = Math.floor(x/tilesize);
		var ty = Math.floor(y/tilesize);
		if(ty >= this.Tiles.length || ty < 0 || tx >= this.Tiles[0].length || tx < 0){
			return;
		}
		var t = this.Tiles[ty][tx];
		if(t.selected == false){
			if(select_or_not == true){
				t.selected = true;
				Editor.selectedTiles.push(t);
			}
		}else{
			if(select_or_not == false){
				t.selected = false;
				Editor.selectedTiles.splice(Editor.selectedTiles.indexOf(t),1);
			}
		}
	}*/
	
	this.Deform_Tile_Set_Material = function(x,y,matType){
		var tx = Math.floor(x/tilesize);
		var ty = Math.floor(y/tilesize);
		if(ty >= this.Tiles.length || ty < 0 || tx >= this.Tiles[0].length || tx < 0){
			return;
		}
		var t = this.Tiles[ty][tx];
		t.textureMask = TerrainMaterial.list[matType].array;
		t.matId = matType;
		t.setTextures();
	}
	
	this.Deform_Tile_Water = function(x,y,water_or_not){
		var tx = Math.floor(x/tilesize);
		var ty = Math.floor(y/tilesize);
		if(ty >= this.Tiles.length || ty < 0 || tx >= this.Tiles[0].length || tx < 0){
			return;
		}
		var t = this.Tiles[ty][tx];
		if(t.waterActor == null){
			if(water_or_not == true){
				var a = Actor.WaterActor(DoodadPrototype.water, Editor.waterGroupId);
				a.x = t.x+4 -M.offsetX ; a.y = t.y+4 -M.offsetY; a.z = Environment.waterZ - 2;
				t.waterActor = a;
				t.waterGroupId = Editor.waterGroupId;
				Actors.push(a);
			}
		}else{
			if(water_or_not == false){
				t.waterActor.remove();
				t.waterActor = null;
			}
		}
	}
	
	this.Deform_Mask_Tile = function(x,y,mask_or_not){
		var tx = Math.floor(x/tilesize);
		var ty = Math.floor(y/tilesize);
		if(ty >= this.Tiles.length || ty < 0 || tx >= this.Tiles[0].length || tx < 0){
			return;
		}
		var t = this.Tiles[ty][tx];
		
		var val = mask_or_not==true?1:0;
		for(var i=0;i<tilesize;++i){
			for(var j=0;j<tilesize;++j){
				this.MaskMap[i + ty*tilesize][j+tx*tilesize] = val;
			}
		}
	}
	
	
	this.Deform_Set_Tile_Bias = function(x,y,operation){
		var tx = Math.floor(x/tilesize);
		var ty = Math.floor(y/tilesize);
		if(ty >= this.Tiles.length || ty < 0 || tx >= this.Tiles[0].length || tx < 0){
			return;
		}
		
		var t = this.Tiles[ty][tx];
		
		operation = operation>0 ? 1 : 0;
		
		var sides = [0,0,0,0];
		
		if(t.tileSideBias[0] == 0){
			sides[0] = 1;
			sides[2] = 0;
		}else if(t.tileSideBias[0] == 8){
			sides[0] = 0;
			sides[2] = 1;
		}else if(t.tileSideBias[0] == 4){
			if(t.tileSideBias[2] == 0){
				sides[0] = 0;
				sides[2] = 0;
			}else{
				sides[0] = 1;
				sides[2] = 1;
			}
		}
		if(t.tileSideBias[1] == 0){
			sides[1] = 1;
			sides[3] = 0;
		}else if(t.tileSideBias[1] == 8){
			sides[1] = 0;
			sides[3] = 1;
		}else if(t.tileSideBias[1] == 4){
			if(t.tileSideBias[3] == 0){
				sides[1] = 0;
				sides[3] = 0;
			}else{
				sides[1] = 1;
				sides[3] = 1;
			}
		}
		
		xx = x-tx*tilesize;
		yy = y-ty*tilesize;
		
		if(xx > yy && tilesize-xx < yy ){
			sides[0] = operation;
		}
		if(xx < yy && tilesize-xx < yy ){
			sides[1] = operation;
		}
		if(xx < yy && tilesize-xx > yy ){
			sides[2] = operation;
		}
		if(xx > yy && tilesize-xx > yy ){
			sides[3] = operation;
		}
		
		if(sides[0] == 1 && sides[2] == 0){
			t.tileSideBias[0] = 0;
			t.tileSideBias[2] = 0.045;
		}else if(sides[0] == 0 && sides[2] == 1){
			t.tileSideBias[0] = 8;
			t.tileSideBias[2] = 0.045;
		}else if(sides[0] == sides[2]){
			t.tileSideBias[0] = 4;
			if(sides[0]==0){
				t.tileSideBias[2] = 0;
			}else{
				t.tileSideBias[2] = 0.09;
			}
		}

		if(sides[1] == 1 && sides[3] == 0){
			t.tileSideBias[1] = 0;
			t.tileSideBias[3] = 0.045;
		}else if(sides[1] == 0 && sides[3] == 1){
			t.tileSideBias[1] = 8;
			t.tileSideBias[3] = 0.045;
		}else if(sides[1] == sides[3]){
			t.tileSideBias[1] = 4;
			if(sides[1]==0){
				t.tileSideBias[3] = 0;
			}else{
				t.tileSideBias[3] = 0.09;
			}
		}
	}
	
	
	this.getHeightValue = function(xx,yy){return this.HeightMap[yy][xx];} 
	this.setHeightValue = function(xx,yy,val){this.HeightMap[yy][xx] = val;};
	//mode 0 == smoothing
	//mode 1 == remove peaks
	//mode 2 == fill holes
	//mode 3 == flatten
	this.Deform_Smooth = function(x,y,stamp, strength, map, channel, mode){
		var centerOffset = - Math.floor(stamp.length/2);
		//used for operations that need the old map unmodified (e.g. smoothing);
		//Warning! beforeDeform matrix has to be larger than the original kernel
		var beforeDeform = [];
		
		if(map == 0){
			this.getArrayValue = this.getHeightValue;
			this.setArrayValue = this.setHeightValue;
		}else if(map == 2){
			if(channel >= 0){
				this.getArrayValue = function(xx,yy){var texChannel = this.getTileAt(xx,yy).textureMask[ Editor.brushChannel ] -1;
					return this.blendBuffer[4*(yy*this.texWidth+xx) + texChannel];};
				this.setArrayValue = function(xx,yy,val){var texChannel = this.getTileAt(xx,yy).textureMask[Editor.brushChannel] -1;
					this.blendBuffer[4*(yy*this.texWidth+xx)+texChannel] = val;};
			}else if(channel == -1){
				this.getArrayValue = function(xx,yy){
					return this.blendBuffer[4*(yy*this.texWidth+xx) + 3];};
				this.setArrayValue = function(xx,yy,val){
					this.blendBuffer[4*(yy*this.texWidth+xx)+3] = val;};
			}
		}else if(map == Editor.brushMap_Water){
			if(channel == 0){
				this.getArrayValue = function(xx,yy){
				return this.waterBuffer[4*(yy*this.texWidth+xx)] /*+ this.waterBuffer[4*(yy*this.texWidth+xx) + 1]-128*/;};
				this.setArrayValue = function(xx,yy,val){this.waterBuffer[4*(yy*this.texWidth+xx)] = val;};
			}else if(channel == 1){
				this.getArrayValue = function(xx,yy){return this.waterBuffer[4*(yy*this.texWidth+xx) +1];};
				this.setArrayValue = function(xx,yy,val){this.waterBuffer[4*(yy*this.texWidth+xx) +1] = val;};
			}else if(channel == 2){
				this.getArrayValue = function(xx,yy){return this.waterBuffer[4*(yy*this.texWidth+xx) +2];};
				this.setArrayValue = function(xx,yy,val){this.waterBuffer[4*(yy*this.texWidth+xx) +2] = val;};
			}else if(channel == 3){
				this.getArrayValue = function(xx,yy){return this.waterBuffer[4*(yy*this.texWidth+xx) +3];};
				this.setArrayValue = function(xx,yy,val){this.waterBuffer[4*(yy*this.texWidth+xx) +3] = val;};
			}
		}
		

		for(var i= 0;i<stamp.length+2;++i){
			beforeDeform[i] = [];
			for(var j= 0;j<stamp[0].length +2;++j){
				if(x+j+centerOffset-1 > width+1 || x+j+centerOffset-1 <0 || y+i+centerOffset-1 > height+1 || y+i+centerOffset-1 <0){
					//expanded kernel tile is out of bounds
					beforeDeform[i][j] = -9999;
				}else{
					var vertX =  Math.floor(x) + j +centerOffset-1;
					var vertY =  Math.floor(y) + i +centerOffset-1;
					beforeDeform[i][j] = this.getArrayValue(vertX,vertY);
				}
			}
		}


		
		for(var i=0;i<stamp.length;++i){
			if(y+i+centerOffset > height+1 || y+i+centerOffset<0){
				continue;
			}
			for(var j=0;j<stamp[i].length;++j){
				if(x+j+centerOffset > width+1 || x+j+centerOffset<0){
					continue;
				}
				
				var vertX =  Math.floor(x) + j +centerOffset;
				var vertY =  Math.floor(y) + i +centerOffset;
				
				if(this.MaskMap[vertY][vertX]!=0){
					continue;
				}
				if(vertY >0 && this.MaskMap[vertY-1][vertX]!=0){
					continue;
				}
				if(vertX >0 && this.MaskMap[vertY][vertX-1]!=0){
					continue;
				}
				if(vertX>0 && vertY >0 && this.MaskMap[vertY-1][vertX-1]!=0){
					continue;
				}
				
				//position of vertex in the @beforeDeform array
				var oldKernX = j +1;
				var oldKernY = i +1;

				var average = 0;
				//get the values from neighboring points;
				for(var k=-1;k<2;++k){
					for(var l=-1;l<2;++l){
						if( k+vertY > height+1 || k+vertY < 0 || l+vertX > width+1 || l+vertX < 0){
							average += beforeDeform[oldKernY][oldKernX];
						}else{
							if(beforeDeform[oldKernY + l][oldKernX + k] > -9999){
								//this means the beforeDeform kernel was out of bounds
								average += beforeDeform[oldKernY + l][oldKernX + k];
							}else{
								average += beforeDeform[oldKernY][oldKernX];
							}
						}
					}
				}
				average /= 9;
				
				var oldVal = this.getArrayValue(vertX,vertY);
				var newVal = oldVal;
				if(mode == 0){//regular smoothing
					newVal = ((oldVal+  stamp[i][j]*strength * average)/(1 + stamp[i][j]*strength));
				/*}else if(mode == 1){//remove peaks
					if(average < oldVal){
						this.setArrayValue(vertX, vertY,((oldVal+  stamp[i][j]*strength * average)/(1 + stamp[i][j]*strength)));
					}
				}else if(mode == 2){//fill holes
					if(average > oldVal){
						this.setArrayValue(vertX, vertY,((oldVal+  stamp[i][j]*strength * average)/(1 + stamp[i][j]*strength)));
					}*/
				}else if(mode == 3){//flatten
					newVal = ((oldVal +  stamp[i][j]*strength * deformStrokeStartValue)/(1 + stamp[i][j]*strength));
				}
				this.setArrayValue(vertX, vertY,newVal);
				if(this.lastStrokeObject){
					this.lastStrokeObject.setDataPoint(vertX,vertY,map,channel, newVal-oldVal);}
			}
		}
	}
	
	this.getHeightAt = function(x,y){
		x = Math.min(Math.max(x , 0), width - 0.01);
		y = Math.min(Math.max(y , 0), height - 0.01);
		
		var xf = (x>>0); var yf = (y>>0);
		
		var h11 = this.HeightMap[yf][xf];
		var h21 = this.HeightMap[yf][(x+1>>0)];
		var h12 = this.HeightMap[(y+1>>0)][xf];
		var h22 = this.HeightMap[(y+1>>0)][(x+1>>0)];
		
		var x_in_tile = x-xf;
		var y_in_tile = y-yf;
		//barycentric interpolation for the 2 triangles
		if( x_in_tile + y_in_tile < 1){
			return Utils.Interpolate_Barycentric_1x1_BottomTriangle(x_in_tile,y_in_tile, h11, h12, h21) + this.CutoutMap[yf][xf];
		}else{
			return Utils.Interpolate_Barycentric_1x1_TopTriangle(x_in_tile,y_in_tile, h22, h21, h12) + this.CutoutMap[yf][xf];
		}
	}
	
	this.getHeightAt_NoCliff = function(x,y){
		x = Math.min(Math.max(x , 0), width - 0.01);
		y = Math.min(Math.max(y , 0), height - 0.01);

		var h11 = this.HeightMap[(y>>0)][(x>>0)];
		var h21 = this.HeightMap[(y>>0)][(x+1>>0)];
		var h12 = this.HeightMap[(y+1>>0)][(x>>0)];
		var h22 = this.HeightMap[(y+1>>0)][(x+1>>0)];
		
		var x_in_tile = x-(x>>0);
		var y_in_tile = y-(y>>0);
		//barycentric interpolation for the 2 triangles
		if( x_in_tile + y_in_tile < 1){
			return Utils.Interpolate_Barycentric_1x1_BottomTriangle(x_in_tile,y_in_tile, h11, h12, h21);
		}else{
			return Utils.Interpolate_Barycentric_1x1_TopTriangle(x_in_tile,y_in_tile, h22, h21, h12);
		}
	}
	
	this.getHeightAt_Shooting = function(x,y){
		x = Math.min(Math.max(x , 0), width - 0.01);
		y = Math.min(Math.max(y , 0), height - 0.01);
		var z = 0;
		var n = Pathfinder.map[Math.floor(y)][Math.floor(x)];
		if(n.wallZ != 0 && n.pathType < 3){
			var groundZ = M.terrain.getHeightAt(x,y);
			z = Node.decodeWallZ(n, groundZ);
		}else{
			z = M.terrain.getHeightAt(x,y);
		}
		return Math.max(z, this.getWaterAt(x,y));
	}
	
	
	this.getSlopeXAt = function(x,y){
		x = Math.max(0, Math.min(x, width-1));
		y = Math.max(0, Math.min(y, height-1));
		var nx11 = this.NormalMap[ (y>>0)][ (x>>0)][0];
		var nx12 = this.NormalMap[ (y>>0)][ (x+1>>0)][0];
		var nx21 = this.NormalMap[ (y+1>>0)][ (x>>0)][0];
		var nx22 = this.NormalMap[ (y+1>>0)][ (x+1>>0)][0];
		return Utils.Interpolate_Bilinear_1x1(x-(x>>0),y-(y>>0),nx11,nx12,nx21,nx22);
	}
	this.getSlopeYAt = function(x,y){
		x = Math.max(0, Math.min(x, width-1));
		y = Math.max(0, Math.min(y, height-1));
		var ny11 = this.NormalMap[(y>>0)][(x>>0)][1];
		var ny12 = this.NormalMap[(y>>0)][(x+1>>0)][1];
		var ny21 = this.NormalMap[(y+1>>0)][(x>>0)][1];
		var ny22 = this.NormalMap[(y+1>>0)][(x+1>>0)][1];
		return Utils.Interpolate_Bilinear_1x1(x-(x>>0),y-(y>>0),ny11,ny12,ny21,ny22);
	}
	this.getSlopeZAt = function(x,y){
		x = Math.max(0, Math.min(x, width-1));
		y = Math.max(0, Math.min(y, height-1));
		var nz11 = this.NormalMap[(y>>0)][(x>>0)][2];
		var nz12 = this.NormalMap[(y>>0)][(x+1>>0)][2];
		var nz21 = this.NormalMap[(y+1>>0)][(x>>0)][2];
		var nz22 = this.NormalMap[(y+1>>0)][(x+1>>0)][2];
		return Utils.Interpolate_Bilinear_1x1(x-(x>>0),y-(y>>0),nz11,nz12,nz21,nz22);
	}
	
	this.getVertexZ = function(x,y){
		//if(Pathfinder.map[y][x].cliff)
		return this.HeightMap[y][x] + this.CutoutMap[y][x];
	}
	
	this.getVertexNorm = function(x,y){
		return this.NormalMap[y][x];
	}
	//the output uses the Utils.returnArray buffer
	this.getNormalAt = function(x,y){
		x = Math.max(0, Math.min(x, width-1));
		y = Math.max(0, Math.min(y, height-1));
		var n11 = this.NormalMap[(y>>0)][(x>>0)];
		var n12 = this.NormalMap[(y>>0)][(x+1>>0)];
		var n21 = this.NormalMap[(y+1>>0)][(x>>0)];
		var n22 = this.NormalMap[(y+1>>0)][(x+1>>0)];
		x = x-(x>>0); y = y-(y>>0);
		var nx = Utils.Interpolate_Bilinear_1x1(x,y,n11[0],n12[0],n21[0],n22[0]);
		var ny = Utils.Interpolate_Bilinear_1x1(x,y,n11[1],n12[1],n21[1],n22[1]);
		var nz = Utils.Interpolate_Bilinear_1x1(x,y,n11[2],n12[2],n21[2],n22[2]);
		return [nx,ny,nz];
	}
	
	this.quadIsOutside = function(xx,yy){
		if((xx < 0) || (xx >= width) || (yy < 0) || (yy >= height)){
			return true;
		}
		return false;
	}
	
	this.getTileAt = function(x,y){
		x = Math.min(Math.max(x , 0), width - 0.01);
		y = Math.min(Math.max(y , 0), height - 0.01);
		
		return this.Tiles[(y/tilesize)>>0][(x/tilesize)>>0];
	}
	
	this.getWaterAt = function(x,y){
		x = Math.min(Math.max(x , 0), width - 0.01);
		y = Math.min(Math.max(y , 0), height - 0.01);
		var wactor = this.Tiles[(y/tilesize)>>0][(x/tilesize)>>0].waterActor;
		return (wactor!=null?wactor.group.z:-100);
	}
	
	this.getCloudMaskAt = function(x,y){
		return this.waterBuffer[(width*(y>>0)+(x>>0))*4+2];
	}
	this.getBlendBufferAt = function(x,y,channel){
		return this.blendBuffer[(this.texWidth*(y>>0)+(x>>0))*4+channel];
	}
	this.setBlendBufferAt = function(x,y,channel,value){
		this.blendBuffer[(this.texWidth*(y>>0)+(x>>0))*4+channel] = value;
	}
	
	this.getAOBufferAt = function(x,y,channel){
		return this.waterBuffer[(this.texWidth*(y>>0)+(x>>0))*4+channel];
	}
	this.setAOBufferAt = function(x,y,channel,value){
		this.waterBuffer[(this.texWidth*(y>>0)+(x>>0))*4+channel] = value;
	}
	
	//returns one of the 4 terrain textures, based on the mixing values
	//used for debris and explosions
	this.getDebrisTextureAt = function(x,y){
		x = Math.floor(Math.max(Math.min(width-1, x), 0));
		y = Math.floor(Math.max(Math.min(height-1, y), 0));
		var tile  = this.Tiles[Math.floor(y/tilesize)][Math.floor(x/tilesize)];
		var vertid = (y*width + x)*4;
		var b3 = this.blendBuffer[vertid+2];
		if(Math.random() < b3/255.){
			
			return M.getTerrainTextureById( tile.textureMask[3]).debrisTexture;
		}
		var b2 = this.blendBuffer[vertid+1];
		if(Math.random() < b2/255.){
			return M.getTerrainTextureById( tile.textureMask[2]).debrisTexture;
		}
		var b1 = this.blendBuffer[vertid+0];
		if(Math.random() < b1/255.){
			return M.getTerrainTextureById( tile.textureMask[1]).debrisTexture;
		}
		return M.getTerrainTextureById( tile.textureMask[0]).debrisTexture;
	}
	
	this.world_move_update = function(tileOffX, tileOffY){
		var offX = tileOffX*tilesize;
		var offY = tileOffY*tilesize;
		var tsize = tilesize;
		var tileNumX = width/tsize;
		var tileNumY = height/tsize;
		
		function getNewNormsSegment(){
			var values = [];
			for(var i=0;i<tsize;++i){
				var newVal = new Float32Array(8);
				newVal[2]=1;
				values.push(newVal);
			}
			return values;
		}
		
		/*if(offY > 0){
			this.ColorM.splice(0, tsize);
			this.CutoutM.splice(0, tsize);
			this.HeightM.splice(0, tsize);
			this.NormalM.splice(0, tsize);
			
			for(var i=(height-tsize);i<height;++i){
				this.ColorMap[i]=[];
				this.CutoutMap[i]=[];
				for(var j=width -1;j>=0;--j){
					this.ColorMap[i][j] = 0;
					this.CutoutMap[i][j] = 0;
				}
			}
			for(var i=(height+1-tsize);i<height+1;++i){
				this.NormalMap[i]=[];
				this.HeightMap[i]=[];
				for(var j=width+1-1;j>=0;--j){
					this.HeightMap[i][j]=0;
					this.NormalMap[i][j]=[0,0,1];
				}
			}
			
			this.Tiles.splice(0,1);
			var ty= tileNumY-1;
			this.Tiles[ty] =  [];
			
			for(var j=0;j<tileNumX;++j){
				var t = new TerrainTile(j+M.offsetX/tilesize ,ty+M.offsetY/tilesize ,this.Materials[0]);
				this.Tiles[ty][j] = t;
				//this.UpdateTileNormal(this.Tiles[i][j]);
				//this.UpdateTile_Pathfinder_Heights(t);
				t.initVertData();
				t.initTerrainData();
				t.updateBoundsZ();
				initBuffers(t);
			}
			
			var offs = tsize*4;
			var end = this.texHeight - tsize;
			for(var i=0;i<end;i++){
				for(var j= this.texWidth*4-1;j>=0;--j){
					var idx = i*this.texWidth*4 +  j;
					this.blendBuffer[idx] = this.blendBuffer[idx+offs*this.texWidth];
				}
			}
			
		}else if(offY < 0){
			this.ColorM.length -= tsize;
			this.CutoutM.length -= tsize;
			this.HeightM.length -= tsize;
			this.NormalM.length -= tsize;
			
			var defaultArrColor = [];
			var defaultArrCutout = [];
			for(var i=0;i<width;i++){
				defaultArrColor[i] = 0;
				defaultArrCutout[i] = 0;
			}
			for(var i=0;i<tsize;++i){
				this.ColorM.unshift(defaultArrColor.slice());
				this.CutoutM.unshift(defaultArrCutout.slice());
			}
			
			var defaultArrHeight = [];
			var defaultArrNorm = [];
			for(var i=0;i<width+1;i++){
				defaultArrHeight[i] = 0;
				defaultArrNorm[i] = [0,0,1];
			}
			
			for(var i=0;i<tsize;++i){
				this.HeightM.unshift(defaultArrHeight.slice());
				this.NormalM.unshift(defaultArrNorm.slice());
			}
			
			this.Tiles.length -= 1;
			this.Tiles.unshift([]);
			
			for(var j=0;j<tileNumX;++j){
				var t = new TerrainTile(j+M.offsetX/tilesize , M.offsetY/tilesize ,this.Materials[0]);
				this.Tiles[0][j] = t;
				//this.UpdateTileNormal(this.Tiles[i][j]);
				//this.UpdateTile_Pathfinder_Heights(t);
				t.initVertData();
				t.initTerrainData();
				t.updateBoundsZ();
				initBuffers(t);
			}
			
			var offs = tsize*4;
			for(var i=this.texHeight-1;i>=tsize;i--){
				for(var j= this.texWidth*4-1;j>=0;--j){
					var idx = i*this.texWidth*4 +  j;
					this.blendBuffer[idx] = this.blendBuffer[idx-offs*this.texWidth];
				}
			}
		}*/
		
		if(offX > 0){
			
			var defaultArrColor = [];
			var defaultArrCutout = [];
			var defaultArrHeight = [];
			var defaultArrNorm = [];
			
			for(var i=0;i<tsize;i++){
				defaultArrColor[i] = 0;
				defaultArrCutout[i] = 0;
				defaultArrHeight[i] = 0;
				defaultArrNorm[i] = new Float32Array(8);
				defaultArrNorm[i][2] = 1; 
			}
			
			for(var i=0;i<height;++i){
				this.ColorMap[i].splice(0, tsize);
				this.CutoutMap[i].splice(0, tsize);
				this.ColorMap[i] = this.ColorMap[i].concat(defaultArrColor);
				this.CutoutMap[i] = this.CutoutMap[i].concat(defaultArrCutout);
			}
			for(var i=0;i<height+1;++i){
				this.HeightMap[i].splice(0, tsize);
				this.NormalMap[i].splice(0, tsize);
				this.HeightMap[i] = this.HeightMap[i].concat(defaultArrHeight);
				this.NormalMap[i] = this.NormalMap[i].concat( getNewNormsSegment() );
			} 
			for(var i=0;i<tileNumY; ++i){
				this.Tiles[i].splice(0,1);
				var t = new TerrainTile(tileNumX-1 + M.offsetX/tilesize , i+M.offsetY/tilesize ,this.Materials[0]);
				this.Tiles[i][tileNumX-1] = t;
				t.initVertData();
				t.initTerrainData();
				t.updateBoundsZ();
				initBuffers(t);
			}
			
			var offs = tsize*4;
			var end = this.texWidth*4 -offs;
			for(var i=0;i<this.texHeight;i++){
				for(var j= 0;j<end;++j){
					var idx = i*this.texWidth*4 +  j;
					this.blendBuffer[idx] = this.blendBuffer[idx+offs];
					/*this.blendBuffer[idx-1] = this.blendBuffer[idx-offs-1];
					this.blendBuffer[idx-2] = this.blendBuffer[idx-offs-2];
					this.blendBuffer[idx-3] = this.blendBuffer[idx-offs-3];*/
				}
			}
		}
		/*else if(offX < 0){
			
			var defaultArrColor = [];
			var defaultArrCutout = [];
			var defaultArrHeight = [];
			var defaultArrNorm = [];
			
			for(var i=0;i<tsize;i++){
				defaultArrColor[i] = 0;
				defaultArrCutout[i] = 0;
				defaultArrHeight[i] = 0;
				defaultArrNorm[i] = [0,0,1];
			}
			
			for(var i=0;i<height;++i){
				this.ColorMap[i].length -= tsize;
				this.CutoutMap[i].length -= tsize;
				this.ColorMap[i] = defaultArrColor.concat(this.ColorMap[i]);
				this.CutoutMap[i] = defaultArrCutout.concat(this.CutoutMap[i]);
			}
			for(var i=0;i<height+1;++i){
				this.HeightMap[i].length -= tsize;
				this.NormalMap[i].length -= tsize;
				this.HeightMap[i] = defaultArrHeight.concat(this.HeightMap[i]);
				this.NormalMap[i] = defaultArrNorm.concat(this.NormalMap[i]);
			} 
			for(var i=0;i<tileNumY; ++i){
				this.Tiles[i].length -= 1;
				var t = new TerrainTile(0 + M.offsetX/tilesize , i+M.offsetY/tilesize ,this.Materials[0]);
				this.Tiles[i].unshift(t);
				t.initVertData();
				t.initTerrainData();
				t.updateBoundsZ();
				initBuffers(t);
			}

			var offs = tsize*4;
			for(var i=0;i<this.texHeight;i++){
				for(var j= this.texWidth*4 -1;j>=offs;--j){
					var idx = i*this.texWidth*4 +  j;
					this.blendBuffer[idx] = this.blendBuffer[idx-offs];
				}
			}
		}*/
		
		this.update_blendTexture();
		
	}
	
	this.getTexCoordMultW = function(){
		return 8/this.texWidth;
	}
	this.getTexCoordMultH = function(){
		return 8/this.texHeight;
	}
	this.getTileSize = function(){
		return tilesize;
	}
	
	this.calculateAO = function(){
		var ao = [];
		for(var i=0;i<height*2; ++i){
			ao[i] = [];
			for(var j=0;j<width*2;++j){
				ao[i][j] = 0;
			}
		}
		
		for(var i=0;i<Doodads.length;++i){
			for(var j=0;j<Doodads[i].length;++j){
				for(var k=0;k<Doodads[i][j].length;++k){
					var d = Doodads[i][j][k];
					var aox = Math.floor(d.x * 2);
					var aoy = Math.floor(d.y * 2);
					console.log(ao[aoy][aox]);
					ao[aoy][aox] = Math.max(ao[aoy][aox], (d.model.bound_zSize - d.model.bound_zOffset) *d.scale ) * 100;
				}
			}
		}
		for(var i=0;i<height;++i){
			for(var j=0;j<width;++j){
				var i2 = i*2; var j2 = j*2;
				this.waterBuffer[(i*width+j)*4] = 0.25 * (ao[i2][j2]+ao[i2][j2+1]+ao[i2+1][j2]+ao[i2+1][j2+1]);
			}
		}
		
		this.update_waterTexture();
	}
	
	this.mirror = function( mirrorType, mirrorDoodads, mirrorUnits ){
		if(mirrorType < 2){
			var startY = 0;var endY = M.height/2;
			var startX = 0;var endX = M.width;
		}else{
			var startY = 0;var endY = M.height;
			var startX = 0;var endX = M.width/2;
		}
		var cliffLevel = 0;
		//Editor.cliffLevelBlending = true;
		for(var i=startY; i<endY;++i){
			for(var j=startX;j<endX;++j){
				switch(mirrorType){
					case 0: //horizonal flipped
						var i2 = M.height-i-1;
						var j2 = M.width-j-1;
						break;
					case 1: //horizontal
						var i2 = M.height-i-1;
						var j2 = j;
						break;
					case 2: //vertical flipped
						var i2 = M.height-i-1;
						var j2 = M.width-j-1;
						break;
					default: //vertical
						var i2 = i;
						var j2 = M.width-j-1;
				}
				
				this.CutoutMap[i2][j2] = this.CutoutMap[i][j];
				this.HeightMap[i2][j2] = this.HeightMap[i][j];
				var n = Pathfinder.map[i][j];
				var n2 = Pathfinder.map[i2][j2];
				n2.cliffType = n.cliffType;
				if(n2.actor){
					Editor.removeCliffTile(n2);
				}
				if(n.actor){
					Editor.cliffSet = n.actor.cliffSet;
					Editor.setCliffTile_mirrored(mirrorType, j2, i2, Editor.getCliffCode(n.cliffType), Editor.getCliffLevel(n.cliffType));
				}
				if(n.pathType != n2.pathType){
					this.Deform_Set_Walkability(n2, n.pathType<2 , null, n.pathType);
					n2.pathType = n.pathType;
				}
				for(var ch=0;ch<4;++ch){
					this.setBlendBufferAt(j2,i2,ch,this.getBlendBufferAt(j,i,ch));
					this.setAOBufferAt(j2,i2,ch,this.getAOBufferAt(j,i,ch));
				}
			}
		}
		if(mirrorDoodads){
			for(var k=0;k<Doodads.length;++k){
				for(var l=0;l<Doodads[k].length;++l){
					for(var i=0;i<Doodads[k][l].length;++i){
						var d = Doodads[k][l][i];
						switch(mirrorType){
							case 0: 
							if(d.y <= M.height/2 && d.getDoodadSaveData){
								var clone = d.getCopy();
								clone.x = M.width-d.x;
								clone.y = M.height-d.y;
								clone.rotZ = d.rotZ + 3.1415;
								Actor.addToWorld(clone);
							}break;
							case 1: 
							if(d.y <= M.height/2 && d.getDoodadSaveData){
								var clone = d.getCopy();
								clone.x = d.x
								clone.y = M.height-d.y;
								clone.rotZ =  3.1415 - d.rotZ;
								Actor.addToWorld(clone);
							}break;
							case 2: 
							if(d.x <= M.width/2 && d.getDoodadSaveData){
								var clone = d.getCopy();
								clone.x = M.width-d.x;
								clone.y = M.height-d.y;
								clone.rotZ = d.rotZ + 3.1415;
								Actor.addToWorld(clone);
							}break;
							case 3: 
							if(d.x <= M.width/2 && d.getDoodadSaveData){
								var clone = d.getCopy();
								clone.x = M.width-d.x;
								clone.y = d.y;
								clone.rotZ = 3.1415 - d.rotZ;
								Actor.addToWorld(clone);
							}
							break;
						}
					}
				}
			}
		}
		if(mirrorUnits){
			for(var i=0;i<Units.length;++i){
				var u = Units[i];
				var clone = null;
				switch(mirrorType){
					case 0: 
					if(u.y <= M.height/2 ){
						var clone = Unit.Create(M.width-u.x, M.height-u.y, u.owner, u.proto, u.angle+3.1415, false);
					}break;
					case 1: 
					if(u.y <= M.height/2 ){
						var clone = Unit.Create(u.x, M.height-u.y, u.owner, u.proto, 3.1415-u.angle, false);
					}break;
					case 2: 
					if(u.x <= M.width/2  ){
						var clone = Unit.Create(M.width-u.x, M.height-u.y, u.owner, u.proto, u.angle+3.1415, false);
					}break;
					case 3: 
					if(u.x <= M.width/2 ){
						var clone = Unit.Create(M.width-u.x, u.y, u.owner, u.proto, 3.1415-u.angle, false);
					}
					break;
				}
				if(clone){
					Editor.PlacedUnits.push(clone);
					clone.editorPlace = new Vector(clone.x, clone.y, clone.z);
					clone.editorAngle = clone.angle;
				}
			}
		}
	}
	this.mirrorQuarter = function(){
		this.mirror(1);
		this.mirror(2);
	}
}
