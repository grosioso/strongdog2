"use strict";

function EditorAction(_type){
	this.type = _type;
	this.stroke = null;
	this.selection = [];
	this.placement = null;
	this.positions_x = [];
	this.positions_y = [];
	this.positions_z = [];
	this.rotations_z = [];
	
	this.redo_stored = false;
	this.positions_x_new = [];
	this.positions_y_new = [];
	this.positions_z_new = [];
	this.rotations_z_new = [];
	
	this.repeat = function(factor){
		if(this.type == EditorAction.type_paint){
			if(this.stroke!=null){
				this.stroke.repeat( factor );
			} 
		}else if(this.type == EditorAction.type_manipulate){
			if(this.redo_stored == false){ //if they were not yet stored
				this.store_selection_redo();
			}
			
			for(var i=0;i<this.selection.length;++i){
				if(this.selection[i].owner == null){
					this.selection[i].x += (this.positions_x_new[i] - this.positions_x[i])*factor;
					this.selection[i].y +=(this.positions_y_new[i] -this.positions_y[i])*factor;
					this.selection[i].z += (this.positions_z_new[i] -this.positions_z[i])*factor;
					this.selection[i].rotZ += (this.rotations_z_new[i] -this.rotations_z[i])*factor;
					if(this.selection[i].partitioned == true){
						Actor.updateDoodadPartition(this.selection[i]);
					}
				}
			}
		}else if(this.type == EditorAction.type_place){
			if(factor > 0){
				for(var i=0;i<this.placement.length;++i){
					if(this.placement[i].owner == null && this.placement[i].isRemoved == true){
						Actor.addToWorld(this.placement[i]);
						this.placement[i].selected = false;
						this.placement[i].isRemoved = false;
					}
				}
			}else{
				Editor.DeleteObjects(this.placement);
			}
		}else if(this.type == EditorAction.type_delete){
			if(factor > 0){
				Editor.DeleteObjects(this.selection);
			}else{
				for(var i=0;i<this.selection.length;++i){
					if(this.selection[i].owner == null && this.selection[i].isRemoved == true){
						Actor.addToWorld(this.selection[i]);
						this.selection[i].selected = false;
						this.selection[i].isRemoved = false;
					}
				}
			}
		}
	}
	
	this.store_selection = function(){
		this.selection = Editor.selected.slice();
		for(var i=0;i<this.selection.length;++i){
			if(this.selection[i].owner == null){
				this.positions_x[i] = this.selection[i].x;
				this.positions_y[i] = this.selection[i].y;
				this.positions_z[i] = this.selection[i].z;
				this.rotations_z[i] = this.selection[i].rotZ;
			}
		}
	}
	this.store_selection_redo = function(){
		this.redo_stored = true;
		for(var i=0;i<this.selection.length;++i){
			if(this.selection[i].owner == null && this.selection[i].isRemoved != true){
				this.positions_x_new[i] = this.selection[i].x;
				this.positions_y_new[i] = this.selection[i].y;
				this.positions_z_new[i] = this.selection[i].z;
				this.rotations_z_new[i] = this.selection[i].rotZ;
			}
		}
	}
}

EditorAction.stack = [];
EditorAction.stackSize = 30;
EditorAction.type_paint = 0;
EditorAction.type_place = 1;
EditorAction.type_delete = 2;
EditorAction.type_manipulate = 3;
EditorAction.undoPointer = -1;
EditorAction.Create = function(type){
	var e = new EditorAction(type);
	e.stroke = M.terrain.lastStrokeObject;
	e.placement = Editor.lastPlacedArray ? Editor.lastPlacedArray.slice() : [];
	if(this.stack.length > this.stackSize){
		for(var i=0;i<this.stack.length-1;++i){
			this.stack[i]=this.stack[i+1];
		}
		this.undoPointer = Math.max(this.undoPointer-1, -1);
	}
	
	if(e.type == EditorAction.type_manipulate || e.type == EditorAction.type_delete){
		e.store_selection();
	}
	
	this.undoPointer ++;
	this.stack.length = this.undoPointer; //delete all later actions, no branching is allowed
	this.stack.push( e );
}

EditorAction.UndoCommand = function(){
	if(EditorAction.undoPointer >= 0){
		EditorAction.stack[EditorAction.undoPointer].repeat(-1);
		EditorAction.undoPointer -- ;
	}
}
EditorAction.RedoCommand = function(){
	if(EditorAction.undoPointer < EditorAction.stack.length - 1){
		EditorAction.undoPointer ++ ;
		EditorAction.stack[EditorAction.undoPointer].repeat(1);
	}
}
EditorAction.Init = function(){
	this.undoPointer = -1;
	this.stack.length = 0;
}
//TIMELAPSE HACK
/*EditorAction.counter = 0;
EditorAction.delta = 0.1;
EditorAction.enabled = false;
EditorAction.loop = function(){
	if(this.enabled == false){this.counter = this.stack.length ;this.delta = -0.1;return;}
	if(this.counter >= this.stack.length && this.delta > 0){
		this.delta = -0.1;
	}else if(this.counter <= 0 && this.delta < 0){
		this.delta = 0.1;
	}
	this.counter += this.delta;
	if(this.counter < this.stack.length && this.counter >= 0){
		//console.log(this.stack.length - 1-Math.floor(this.counter), this.stack.length)
		var e = EditorAction.stack[Math.floor(this.counter)];
		if(e.type == 1 || e.type == 2){
			//if(Math.abs(this.counter - (Math.floor(this.counter)-0.1)) < 0.01){
				e.repeat( this.delta);
			//}
		}else{
			e.repeat( this.delta);
		}
	}
}*/

function EditorStrokeLine(){
	this.data = [];
	this.startX = 99999; this.endX = -99999;
	this.storeData = EditorStrokeLine.storeData;
	this.emptyAt = EditorStrokeLine.emptyAt;
}

EditorStrokeLine.storeData = function(x, val){
	var oldStart = this.startX; var oldEnd = this.endX;
	this.startX = Math.min(x,this.startX);
	this.endX = Math.max(x,this.endX);
	if(oldStart!=this.startX || oldEnd!=this.endX){
		var newDat = new Float32Array(this.endX-this.startX + 1);
		for(var i=oldStart;i<=oldEnd;++i){
			newDat[i-this.startX] = this.data[i-oldStart]; //copy the old values with offset
		}

		this.data = newDat;
	}
	
	this.data[x-this.startX] += val; //update delta value
}
EditorStrokeLine.emptyAt = function(x){
	if(x > this.endX || x < this.startX){return true;}
	return this.data[x-this.startX] == 0;
}

function EditorStroke(){
	this.startY = 99999; this.endY = -99999;
	this.data = [];
	this.map = 0; this.channel = 0;
	var terr = M.terrain;
	
	this.storeData = function(x,y,val){
		var oldStart = this.startY; var oldEnd = this.endY;
		this.startY = Math.min(y,this.startY);
		this.endY = Math.max(y+1,this.endY);
		if(oldStart!=this.startY || oldEnd!=this.endY){
			var newDat = [];
			for(var i=this.startY; i<=this.endY;++i){//create an empty column of new length
				newDat[i-this.startY] = null 
			}
			for(var i=oldStart;i<=oldEnd;++i){
				newDat[i-this.startY] = this.data[i-oldStart]; //copy the old values with offset
			}
			this.data = newDat;
		}
		if(this.data[y-this.startY] == null){
			var lin = new EditorStrokeLine();
			this.data[y-this.startY] = lin;
		}
		this.data[y-this.startY].storeData(x,val); //insert newest value
	}
	
	this.emptyAt = function(x,y){
		if(y > this.endY || y < this.startY){return true;}
		var line = this.data[y-this.startY];
		if(line == null){return true;}
		return line.emptyAt(x);
	}
	
	this.applyDataPoint = function(vertX, vertY, val){
		var map = this.map; var channel = this.channel;
		if(map == Editor.brushMap_Height){
			terr.HeightMap[vertY][vertX] += val;
		}else if(map == Editor.brushMap_Blendmap){
			if(channel >= 0){
				var texChannel = terr.getTileAt(vertX,vertY).textureMask[channel] -1;
			}else{
				var texChannel = 3;
			}
			var index = (vertY * terr.texWidth + vertX) * 4 + texChannel;
			terr.blendBuffer[index] = Math.max(0,Math.min(255,terr.blendBuffer[index]+val ));

		}else if(map == Editor.brushMap_Water){
			var index = (vertY * terr.texWidth + vertX) * 4 + channel;
			terr.waterBuffer[index] = Math.max(0,Math.min(255,terr.waterBuffer[index]+val ));
		}else if(map == Editor.brushMap_Pathing){
			var nod = Pathfinder.map[vertY][vertX];
			var newVal = nod.pathType + val;
			var walkable = val <= 1; //pathtype lower than 2 is walkable
			M.terrain.Deform_Set_Walkability(nod, walkable , null, newVal);
		}else if(map == Editor.brushMap_Cliff){
			var newVal = val + M.getCliffNodeData(vertX, vertY);
			var nod = Pathfinder.map[vertY][vertX];
			if(nod.actor){
				nod.actor.remove();
				nod.actor = null;
			}
			M.SetCliffNodeFromData(vertX, vertY, newVal);
		}
	}
	
	this.setDataPoint = function(vertX, vertY, map, channel, val){
		this.map = map; this.channel = channel;
		this.storeData(vertX, vertY, val);
	}
	
	this.repeat = function( factor ){ //-1 for undo, 1 for redo
		var cliffset_backup = Editor.cliffSet;
		var minX= 99999; var maxX=-99999;
		var minY= this.startY; var maxY = this.endY;
		for(var i=0;i<this.data.length;++i){
			var line = this.data[i];
			if(line != null){
				for(var j=0;j<line.data.length;++j){
					if(line.data[j] != 0){
						minX = Math.min(minX, j+line.startX);
						maxX = Math.max(maxX, j+line.startX);
						this.applyDataPoint(j+line.startX, i+this.startY, line.data[j] * factor);
					}
				}
			}
		}
		if(this.map == Editor.brushMap_Blendmap){
			terr.update_blendTexture();
			Render.force_terrain_texture_update();
		}else if(this.map == Editor.brushMap_Water){
			terr.update_waterTexture();
		}else if(this.map == Editor.brushMap_Height || this.map == Editor.brushMap_Pathing
		|| this.map == Editor.brushMap_Cliff){
			maxX = Math.min(maxX+8, M.width-1);
			maxY = Math.min(maxY+8, M.height-1);
			for(var i=minY;i<=maxY;i+=terr.tilesize){
				for(var j=minX;j<=maxX;j+=terr.tilesize){
					var t = terr.Tiles[(i/terr.tilesize)>>0][(j/terr.tilesize)>>0];
					terr.update_tile(t);
				}
			}
			terr.update_waterTexture();
		}
		Editor.cliffSet = cliffset_backup;
	}
	
}