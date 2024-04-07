function BuilderLinedef( p1,p2){
	this.p1 = p1; //reference to start vertex
	this.p2 = p2; //reference to end vertex
	
	this.frontSeg = null; //always to the right of the vector (from p1 to p2)
	this.backSeg = null;
	this.topMat = 2;
	this.bottomMat = 2;
	this.middleMat = -1;
	this.tex_offX = 0;
	this.tex_offY = 0;
	
	this.top_offX = 0;
	this.top_offY = 0;
	this.tag = 0;
	//mostly used for doors tracks
	this.extra_topZ= 0; 
	this.extra_bottomZ = 0;
	
	this.visited_by_recursion = false; //helper value
	this.helper = null; //manipulator actor
	this.temp_value = 0;//helper value
	this.sound_blocker = false;
	this.secretId = 0;
}

BuilderLinedef.prototype.copy_style = function(other){
	this.topMat = other.topMat;
	this.bottomMat = other.bottomMat;
	this.middleMat = other.middleMat;
	
	this.tex_offY = other.tex_offY;
	this.tex_offX = other.tex_offX;
	this.top_offY = other.top_offY;
	this.top_offX = other.top_offX;
	
	this.extra_bottomZ = other.extra_bottomZ;
	this.extra_topZ = other.extra_topZ;
	this.sound_blocker = other.sound_blocker;
}

BuilderLinedef.prototype.on_helper_move = function(){
	BuilderModel.ACTIVE_ACTOR.global_to_local(this.helper);
	this.move_center_to(this.helper.x,this.helper.y)
	BuilderModel.ACTIVE_ACTOR.local_to_global(this.helper);
}
BuilderLinedef.prototype.move_center_to = function(x,y){
	if(this.p1.helper && this.p1.helper.selected || this.p2.helper && this.p2.helper.selected){
		return; //don't interfere with point translation, otherwise it causes feedback loop
	}
	var xdiff = x - this.getCenterX();
	var ydiff = y - this.getCenterY();
	this.p1.x += xdiff; this.p2.x += xdiff;
	this.p1.y += ydiff; this.p2.y += ydiff;
	this.refresh_point_helpers();
}
BuilderLinedef.prototype.refresh_point_helpers = function(){
	if(this.p1.helper){
		this.p1.helper.x = this.p1.x;
		this.p1.helper.y = this.p1.y;
		BuilderModel.ACTIVE_ACTOR.local_to_global(this.p1.helper);
		this.p1.refresh_edge_helpers(this);
	}
	if(this.p2.helper){
		this.p2.helper.x = this.p2.x;
		this.p2.helper.y = this.p2.y;
		BuilderModel.ACTIVE_ACTOR.local_to_global(this.p2.helper);
		this.p2.refresh_edge_helpers(this);
	}
}
BuilderLinedef.prototype.refresh_helper = function(){
	this.helper.x = this.getCenterX();
	this.helper.y = this.getCenterY();
	this.helper.rotZ = this.getAngle();
	BuilderModel.ACTIVE_ACTOR.local_to_global(this.helper);
}

BuilderLinedef.prototype.getCenterX = function(){
	return (this.p1.x+this.p2.x) * 0.5;
}
BuilderLinedef.prototype.getCenterY = function(){
	return (this.p1.y+this.p2.y) * 0.5;
}
BuilderLinedef.prototype.getAngle = function(){
	return  -Math.atan2(this.p2.y-this.p1.y, this.p2.x-this.p1.x);
}
BuilderLinedef.prototype.getLength = function(){
	return Math.sqrt((this.p1.x-this.p2.x)*(this.p1.x-this.p2.x) + (this.p1.y-this.p2.y)*(this.p1.y-this.p2.y) );
}
BuilderLinedef.prototype.otherPoint = function(p){
	return p==this.p1?this.p2:this.p1;
}
BuilderLinedef.prototype.otherSegment = function(seg){
	return seg==this.frontSeg?this.backSeg:this.frontSeg;
}

BuilderLinedef.prototype.flip = function( ){
	var repl = this.p1;
	this.p1 = this.p2;
	this.p2 =  repl;
}
BuilderLinedef.prototype.replacePoint = function(old, p){
	if(old == this.p1){
		this.p1 = p;
	}else if(old == this.p2){
		this.p2 = p;
	}else{
		return;
	}
	p.linedefs.push(this);
	old.linedefs.splice(old.linedefs.indexOf(this),1);
}
 
//SIGNED angle difference between two connected linedefs,
//it's always in trigonometric direction, doesn't use the shortest dir
BuilderLinedef.angleDiff = function(A, B, C){
	var abx = B.x-A.x;
	var aby = B.y-A.y;
	var cbx = B.x-C.x;
	var cby = B.y-C.y;
	
	var dot = (abx*cbx + aby*cby);
	var cross = (abx*cby-aby*cbx);
	var alpha = Math.atan2(cross,dot);
	if(alpha < 0){
		alpha = 6.283+alpha;
	}
    return alpha;
}
BuilderLinedef.getCommonSegment = function(l1,l2){
	if(l1.frontSeg && (l1.frontSeg==l2.backSeg || l1.frontSeg == l2.frontSeg)){
		return l1.frontSeg;
	}else if(l1.backSeg && (l1.backSeg==l2.frontSeg || l1.backSeg == l2.backSeg)){
		return l1.backSeg;
	}
	return null;
}

function BuilderSegment(_parentMesh){
	this.parentMesh = _parentMesh;
	this.linedefs = [];
	this.floor = 0;
	this.ceiling = 1;
	this.floorMat = 5;
	this.ceilingMat = 1;
	this.brightness = 255;
	this.strobe_type = 0;
	this.strobe_strength = 0;
	this.tag = 0;

	this.id = BuilderSegment.nextId ++;
	this.temp_id = 0;//used for saving data
	this.helper = null;
	this.triangulation = [];
	this.tex_offX = 0;
	this.tex_offY = 0;
	this.top_offX = 0;
	this.top_offY = 0;
	
	this.floorLift = 0;//by default 0, no motion
	this.ceilingLift = 1; 
	
	this.last_sound_time = -1000;
}
BuilderSegment.nextId = 0;

BuilderSegment.prototype.copy_style = function(other){
	this.floorMat = other.floorMat;
	this.ceilingMat = other.ceilingMat;
	this.floor = other.floor;
	this.ceiling = other.ceiling;
	this.brightness = other.brightness;
	this.strobe_strength = other.strobe_strength;
	this.strobe_type = other.strobe_type;
	
	this.tex_offY = other.tex_offY;
	this.tex_offX = other.tex_offX;
	this.top_offY = other.top_offY;
	this.top_offX = other.top_offX;
}

//uses the ear clipping algorithm
BuilderSegment.prototype.build_triangulation = function(){
	var loops = [];
	var pointLoops = [];
	this.triangulation.length = 0;
	for(var i=0;i<this.linedefs.length;++i){
		if( !this.linedefs[i].visited_by_recursion &&
		this.linedefs[i].backSeg != this.linedefs[i].frontSeg){ //not an inner or null line
			var points = [];
			//this should ensure that winding direction is correct, otherwise we'd have to reverse the loop afterwards
			var startPoint = this.linedefs[i].backSeg == this ?  this.linedefs[i].p2 :  this.linedefs[i].p1;
			if(this.get_outer_lines_recursive(this.linedefs[i], startPoint, startPoint, points)){
				pointLoops.push(points);
			}
		}
	}
	//Merge loops into one

	var loopCount = pointLoops.length-1; 
	for(var counter = 0; counter < loopCount; ++ counter){
		var lastLoop = pointLoops[pointLoops.length-1];
		for(var i=0;i<lastLoop.length;++i){ //for each point in the last loop
			//most times it will find a result on the first point - but there are edge cases
			var p1 = lastLoop[i];
			var connectionPoint = null;
			for(var j=0;j<pointLoops.length-1;++j){ //this won't include the last loop
				//most of the time we will connect to the first loop
				//but if for some reason we don't, we can always try connecting up the holes
				var connectedId = -1;
				for(var k=0;k<pointLoops[j].length;++k){ 
					//check if we can connect the point from the main loop to the point from the hole
					//the reliable/naive way is to check every linedef of the segment
					var p2 = pointLoops[j][k];
					var no_intersect = true;
					for(L = 0;L<this.linedefs.length;++L){
						var interLine = this.linedefs[L];
						if(p1 != interLine.p1 && p1 != interLine.p2 && //ignore self
						p2 != interLine.p1 && p2 != interLine.p2 &&
						Utils.intersect_4point(p1,p2,interLine.p1, interLine.p2) >= 0){
							//intersection found, these two points can't form a loop-connecting edge
							no_intersect = false;
							break;
						}
					}
					if(no_intersect){
						connectionPoint = p2;
						connectedId = k;
						break;
					}
				}
				if(connectionPoint){ //merge the two loops with a double edge (p1->p2 and p2-> p1)
					var insertedPoints = [];
					
					var loopLen = lastLoop.length;
					for(var k=0;k<loopLen;++k){
						//the loop was broken at index i to make way for the edge
						insertedPoints.push(lastLoop[(k + i + loopLen)%loopLen ]);
					}
					insertedPoints.push(p1); //the edge going back to the other loop
					insertedPoints.push(connectionPoint); 
					//the other loop was broken at "connectedId"
					pointLoops[j].splice(connectedId+1, 0, ...insertedPoints);
					//the currently merged loop now no longer exists on its own
					pointLoops.splice(pointLoops.length-1, 1);
					break;
				}
			}
			if(connectionPoint){
				break;
			}
		}
	}
	
	//build triangle index list from point list
	var points = pointLoops[0];
	if(!points){
		console.warn("Loop construction failed");
		return;
	}
	var triCount = points.length - 2;
	for(var k=0;k<triCount;++k){
		for(var i=0;i<points.length;++i){
			var p0 = points[(i-1 + points.length)%points.length];
			var p1 = points[i];
			var p2 = points[(i+1)%points.length];
			//angle is flipped because recursion is building lineloop in reverse
			var ang = BuilderLinedef.angleDiff(p2,p1,p0);
			if(ang < 3.14){ //make sure triangle is not inside-out
				if(points.length > 3){
					//make sure p0->p2 edge is not outside of the remaining loop
					//hack: just check that p0's and p2's other neighbor is outside the triangle
						//might be enough for this algorithm
					var p_prev = points[(i-2 + points.length)%points.length];
					if( Utils.point_in_triangle(p_prev.x,p_prev.y,p0.x,p1.x,p2.x,p0.y,p1.y,p2.y)){
						continue;
					}
					var p_next = points[(i+2)%points.length];
					if( Utils.point_in_triangle(p_next.x,p_next.y,p0.x,p1.x,p2.x,p0.y,p1.y,p2.y)){
						continue;
					}
				}
				
				var no_intersect = true;
				//new triangle should not intersect other lines
				for(var j=0;j<points.length;++j){//this only checks the remaining mesh, not sure if enough
					var p_intersect1 = points[j];
					var p_intersect2 = points[(j+1)%points.length];
					if(p_intersect1==p0||p_intersect1==p2||p_intersect2==p0||p_intersect2==p2){
						continue; //ignore self
					}
					if(Utils.intersect_4point(p0,p2,p_intersect1,p_intersect2)>= 0){
						no_intersect = false;
						break;
					}
				}
				if(no_intersect){
					this.triangulation.push(p0,p1,p2);
					points.splice(i,1);//remove middle point of the triangle from the list
					break;
				}
			}
		}
	}
	//cleanup
	for(var i=0;i<this.linedefs.length;++i){
		this.linedefs[i].visited_by_recursion = false;
	}
	
	return this.triangulation;
}

//sound can go through 1 sound_blocker linedef when strength == 1
BuilderSegment.prototype.propagate_sound_recursive = function(strength){
	this.last_sound_time = Gamestats.mapTime;
	for(var i=0;i<this.linedefs.length;++i){
		var ld = this.linedefs[i];
		var nextSeg = ld.otherSegment(this);
		if(nextSeg && nextSeg.last_sound_time < Gamestats.mapTime
		&& nextSeg.get_room_height() > 0.05){
			if( !ld.sound_blocker ){ 
				nextSeg.propagate_sound_recursive(strength);
			}else if(strength > 0){
				nextSeg.propagate_sound_recursive(strength - 1);
			}
		}
	}
}
BuilderSegment.prototype.get_room_height = function(){
	//this.zOffset
	var sector = NavSector.getById(this.tag);
	return (this.ceiling + sector.zOffset*this.ceilingLift) - (this.floor+sector.zOffset*this.floorLift);
}

BuilderSegment.prototype.get_outer_lines_recursive = function(startLine, startPoint, goalPoint,points ){
	startLine.visited_by_recursion = true;
	var nextPoint = startLine.otherPoint(startPoint);
	var found_goal = false;
	if(nextPoint == goalPoint ){ //the loop has been closed
		found_goal = true;
	}else{
		for(var i = 0;i<nextPoint.linedefs.length;++i){
			var nextLine = nextPoint.linedefs[i];
			if((nextLine.backSeg == this || nextLine.frontSeg == this)//line is a part of this seg
				&& nextLine.backSeg != nextLine.frontSeg //line is not an inner line of this seg
				&& !nextLine.visited_by_recursion){ 
				if(this.get_outer_lines_recursive(nextLine, nextPoint, goalPoint, points)){
					found_goal = true;
					break;
				}
				
			}
		}
	}
	if(found_goal){ //using this IF will ignore all dead ends, but loop order is reversed
		points.push(startPoint);
	}
	return found_goal;
}

BuilderSegment.prototype.getCenterX = function(){
	var centerX = 0;
	for(var i=0;i<this.linedefs.length;++i){
		centerX += this.linedefs[i].p1.x;
		centerX += this.linedefs[i].p2.x;
	}
	return centerX / this.linedefs.length/2;
}

BuilderSegment.prototype.getCenterY = function(){
	var centerY = 0;
	for(var i=0;i<this.linedefs.length;++i){
		centerY += this.linedefs[i].p1.y;
		centerY += this.linedefs[i].p2.y;
	}
	return centerY / this.linedefs.length/2;
}
BuilderSegment.prototype.reposition_helper = function(){
	this.helper.x = this.getCenterX();
	this.helper.y = this.getCenterY();
	BuilderModel.ACTIVE_ACTOR.local_to_global(this.helper);
}

BuilderSegment.prototype.set_floor = function(z){
	this.floor = z;
	/*for(var i=0;i<this.linedefs.length;++i){
		var ld = this.linedefs[i];
		var lineZ = z;
		//if(ld.backSeg && ld.frontSeg){
		//	lineZ = 0.5*(ld.backSeg.floor + ld.frontSeg.floor)
		//}
		if(ld.helper){
			ld.helper.z = lineZ;
			if(ld.p1.helper){
				ld.p1.helper.z = lineZ;
			}
			if(ld.p2.helper){
				ld.p2.helper.z = lineZ;
			}
		}
	}*/
}

BuilderSegment.prototype.move_center_to = function(x,y){
	var xdiff = x - this.getCenterX();
	var ydiff = y - this.getCenterY();

	for(var i=0;i<this.linedefs.length;++i){
		var ld = this.linedefs[i];
		if(!ld.p1.touched){
			ld.p1.touched = true;
			ld.p1.x += xdiff;
			ld.p1.y += ydiff;
		}
		if(!ld.p2.touched){
			ld.p2.touched = true;
			ld.p2.x += xdiff;
			ld.p2.y += ydiff;
		}
	}
	//cleanup;
	for(var i=0;i<this.linedefs.length;++i){
		this.linedefs[i].p1.touched = false;
		this.linedefs[i].p2.touched = false;
	}
}

function BuilderPoint(x,y){
	this.x = x;
	this.y = y;
	this.linedefs = [];
	this.temp_id = 0; //used for saving 
	this.helper = null;
	this.touched = false; //used for various operations
}

BuilderPoint.prototype.on_helper_move = function(){
	BuilderModel.ACTIVE_ACTOR.global_to_local(this.helper);
	this.x = this.helper.x;
	this.y = this.helper.y;
	BuilderModel.ACTIVE_ACTOR.local_to_global(this.helper);
	this.refresh_edge_helpers(null);
}
//you can optionally ignore a linedef, intended for when the fuction is called from that linedef
BuilderPoint.prototype.refresh_edge_helpers = function(except){
	for(var i=0;i<this.linedefs.length;++i){
		if(this.linedefs[i].helper && this.linedefs[i] != except
		&& !this.linedefs[i].helper.selected ){
			this.linedefs[i].refresh_helper();
		}
	}
}

//get an array of every segment that contain this point
BuilderPoint.prototype.collectSegments = function(arr){
	for(var i=0;i<this.linedefs.length;++i){
		var ld = this.linedefs[i];
		if(ld.frontSeg && arr.indexOf(ld.frontSeg)<0){
			arr.push(ld.frontSeg);
		}
		if(ld.backSeg && arr.indexOf(ld.backSeg)<0){
			arr.push(ld.backSeg);
		}
	}
}

BuilderPoint.not_on_same_line = function(p1, p2){
	if(!p1 || !p2 || p1==p2){return true;}
	for(var i=0;i<p1.linedefs.length;++i){
		if(p1.linedefs[i].otherPoint(p1) == p2){
			return false;
		}
	}
	return true;
}

BuilderSegment.prototype.setLinedefs = function(linedefs){
	this.linedefs = linedefs.slice();
	for(var i=0;i<this.linedefs.length;++i){
		if(this.linedefs[i].frontSeg && this.linedefs[i].frontSeg != this){
			this.linedefs[i].backSeg = this;
		}else{
			this.linedefs[i].frontSeg = this;
		}
	}
}

//even-odd rule algorithm
//point is inside if a ray to infinity intersects the edges an odd number of times
//even works with concave shapes and holes
//in this case let's use the positive x direction as the ray (from the point to the right)
BuilderSegment.prototype.point_in_polygon = function(x,y){
	var intersects = 0;
	for(var i=0;i<this.linedefs.length;++i){
		var ld = this.linedefs[i];
		if(ld.backSeg == ld.frontSeg){//inner edges MUST be ignored
			continue;
		}
		if (x == ld.p1.x &&  y == ld.p1.y){ //point is a corner point
			return true;}
		if ((ld.p1.y > y) != (ld.p2.y > y)){
			//slope = (x-poly[i][0])*(poly[j][1]-poly[i][1])-(poly[j][0]-poly[i][0])*(y-poly[i][1])
			var slope = (x-ld.p1.x)*(ld.p2.y-ld.p1.y)-(ld.p2.x-ld.p1.x)*(y-ld.p1.y);
			if(slope == 0){//point is on boundary
				return true;
			}
			if ((slope < 0) != ( ld.p2.y < ld.p1.y )){
				intersects ++;
			}
		}
	}
	return intersects%2 == 1;
}
BuilderSegment.prototype.set_perimeter_bottom_texture = function(texId){
	for(var i=0;i<this.linedefs.length;++i){
		var other = this.linedefs[i].otherSegment(this);
		if(!other || other.floor >= this.floor){
			this.linedefs[i].bottomMat = texId;
		}
	}
}
BuilderSegment.prototype.set_perimeter_top_texture = function(texId){
	for(var i=0;i<this.linedefs.length;++i){
		var other = this.linedefs[i].otherSegment(this);
		if(!other || other.ceiling <= this.ceiling){
			this.linedefs[i].topMat = texId;
		}
	}
}

function BuilderModel(){
	this.isBuilderModel = true;
	this.actor_instance = null; //for sound playing we store an actor that uses this model
	this.multiple_frames = true; this.numFrames = 1;
	this.needs_update = false;
	this.hasVertexColor = true;
	this.sortId = 99;
	this.verts = [];
	this.norms = [];
	this.texCoords = [];
	this.vertColors = [];
	this.segmentIds = [];
	this.buffers = [];
	this.mat_id_parts = [];
	
	this.segments = [];
	this.points = [];
	this.linedefs = [];
	
	this.getMeshNetwork = Model3d.getMeshNetwork;
}
BuilderModel.list = [];
BuilderModel.Create = function(){
	var m = new BuilderModel();
	this.list.push(m);
	return m;
}
BuilderModel.Init = function(){
	this.list =[];
	this.ACTIVE = null;
	this.ACTIVE_ACTOR = null;
}
//saves data of all BuilderModel objects on the map
BuilderModel.save_all_data = function(){
	var arr = [];
	for(var i=0;i<this.list.length;++i){
		arr.push(this.list[i].getSaveData());
	}
	return arr;
}
BuilderModel.load_all_data = function(arr){
	if(!arr){return;}
	for(var i=0;i<arr.length;++i){
		var m = BuilderModel.Create();
		m.loadSaveData(arr[i]);
		m.triangulate_all();
		m.makeGeometry();
	}
}

//creates a loop segment, using selected objects as vertices
BuilderModel.prototype.linedefs_from_selection = function(){
	var lineLoop = [];
	if(Editor.selected.length > 1){
		var o1 = Editor.selected[0];
		var p1 = this.addPoint(o1.x,o1.y);
		var p_first = p1;
		for(var i=1;i<Editor.selected.length;++i){
			var o2 = Editor.selected[i];
			var p2 = this.addPoint(o2.x,o2.y);
			lineLoop.push( this.addLinedef(p1,p2) );
			p1 = p2;
		}
		lineLoop.push( this.addLinedef(p1,p_first)); //close the loop
		this.addSegment(lineLoop);
	}
	Editor.DeleteSelected();
}

BuilderModel.select_segment_global = function(x,y, additive){
	var selPoint = new Point(x,y);
	BuilderModel.ACTIVE_ACTOR.global_to_local_2d(selPoint);
	var seg = BuilderModel.ACTIVE.get_segment_at(selPoint.x, selPoint.y);
	if(seg && !seg.helper.selected){
		if(!additive){
			Editor.EmptySelection();
		}
		Editor.AddObjectToSelection(seg.helper);
	}
}

BuilderModel.make_hole_global  = function(sel){
	for(var i=0;i<sel.length;++i){
		BuilderModel.ACTIVE_ACTOR.global_to_local(sel[i]);
	}
	BuilderModel.ACTIVE.hole_from_selection(sel);
}

BuilderModel.prototype.hole_from_selection = function(sel){
	var lineLoop = [];
	if(sel.length > 2){
		var o1 = sel[0];
		var p1 = this.addPoint(o1.x,o1.y);
		var p_first = p1;
		var centerX = o1.x;
		var centerY = o1.y;
		for(var i=1;i<sel.length;++i){
			var o2 = sel[i];
			var p2 = this.addPoint(o2.x,o2.y);
			centerX += o2.x;
			centerY += o2.y;
			//notice that the point order is swapped!
			lineLoop.push( this.addLinedef(p2,p1) );
			p1 = p2;
		}
		lineLoop.push( this.addLinedef(p_first,p2)); //close the loop
		
		centerX /= sel.length;
		centerY /= sel.length;
		
		var centerSeg =  this.get_segment_at(centerX, centerY);
		if(centerSeg){
			//add lineloop to the segment over which we drew the shape
			for(var i=0;i<lineLoop.length;++i){
				centerSeg.linedefs.push(lineLoop[i]);
				lineLoop[i].backSeg = centerSeg;
			}
			centerSeg.build_triangulation();
		}
		//turn shape into its own segment
		var newseg = this.addSegment(lineLoop);
		newseg.build_triangulation();
		this.addSegmentHelper(newseg);
		if(centerSeg){
			newseg.copy_style(centerSeg);
		}
	
		this.needs_update = true;
		
		for(var i=0;i<lineLoop.length;++i){
			this.addEdgeHelper(lineLoop[i]);
			if(!lineLoop[i].p1.helper){this.addPointHelper(lineLoop[i].p1);}
			if(!lineLoop[i].p2.helper){this.addPointHelper(lineLoop[i].p2);}
		}
	}else{
		console.warn("3 points needed");
	}
}

BuilderModel.prototype.addSegment = function(lineLoop){
	var seg = new BuilderSegment(this);
	if(lineLoop){
		seg.setLinedefs(lineLoop);
	}
	this.segments.push(seg);
	return seg;
}

BuilderModel.prototype.addLinedef = function(p1,p2){
	var ld = new BuilderLinedef(p1,p2);
	this.linedefs.push(ld);
	p1.linedefs.push(ld);
	p2.linedefs.push(ld);
	return ld;
}

BuilderModel.prototype.addPoint = function(x,y){
	var p = new BuilderPoint(x,y);
	this.points.push(p);
	return p;
}

//removed a point from a non-intersection
BuilderModel.prototype.deletePoint = function(point){
	if(point.linedefs.length > 2){
		console.warn("Intersection points can't be deleted");
		return;
	}
	if(point.linedefs.length == 1){
		this.removeLinedef(point.linedefs[0]);
	}else if(point.linedefs.length == 2){
		var obsoleteLine = point.linedefs[0];
		var remainderLine = point.linedefs[1];
		var remainderPoint = obsoleteLine.otherPoint(point);
		if(remainderLine.frontSeg && remainderLine.frontSeg.linedefs.length <= 3
		|| remainderLine.backSeg && remainderLine.backSeg.linedefs.length <= 3){
			console.warn("Can't delete point. Would lead to 0 area segment");
			return;
		}
		
		remainderPoint.linedefs.push( remainderLine );
		if(point == remainderLine.p1){
			remainderLine.p1 = remainderPoint;
		}else{
			remainderLine.p2 = remainderPoint;
		}
		this.removeLinedef(obsoleteLine);

		remainderPoint.refresh_edge_helpers(null);
	}
	
	this.points.splice ( this.points.indexOf(point), 1);
	if(point.helper && !point.helper.isRemoved){
		point.helper.remove();
	}
}
//welds the two endpoints of the linedef into one point in the center
BuilderModel.prototype.weldEdge = function(ld){
	this.removeLinedef(ld);
	this.points.splice(this.points.indexOf(ld.p2),1);
	ld.p2.helper.remove();
	
	//add linedefs from the deleted point to the remaining point
	for(var i=0;i<ld.p2.linedefs.length;++i){
		ld.p1.linedefs.push(ld.p2.linedefs[i]);
		if(ld.p2.linedefs[i].p1 == ld.p2){
			ld.p2.linedefs[i].p1 = ld.p1;
		}else{
			ld.p2.linedefs[i].p2 = ld.p1;
		}
	}
	ld.p1.x = ld.getCenterX();
	ld.p1.y = ld.getCenterY();
	ld.p1.helper.x = ld.p1.x; ld.p1.helper.y = ld.p1.y;
	ld.p1.refresh_edge_helpers(null);
}
//deletes and edge, merging the two segments on its sides
BuilderModel.prototype.destroyEdge  = function(ld){
	var seg = ld.frontSeg;
	if(ld.backSeg == ld.frontSeg){
		this.removeLinedef(ld);
	}else if(ld.backSeg == null || ld.frontSeg == null){
		console.warn("Can't destroy outer edge");
	}else{
		this.merge_segments(ld.frontSeg, ld.backSeg);
		this.removeLinedef(ld);
	}
	return ld.frontSeg;
}

BuilderModel.prototype.merge_segments = function(seg1,seg2){
	var lineCount = seg2.linedefs.length;
	for(var i=lineCount-1;i>=0;--i){
		BuilderModel.swap_linedef_segment(seg2.linedefs[i], seg2,seg1);
	}
	this.segments.splice(this.segments.indexOf(seg2),1);
	if(seg2.helper && !seg2.helper.isRemoved){
		seg2.helper.remove();
	}
}

//turn segment into a hole
BuilderModel.prototype.destroySegment = function(seg){
	var null_linedefs = [];
	for(var i=0;i<seg.linedefs.length;++i){
		if(seg.linedefs[i].frontSeg == seg){
			seg.linedefs[i].frontSeg = null;
		}
		if(seg.linedefs[i].backSeg == seg){
			seg.linedefs[i].backSeg = null;
		}
		if(seg.linedefs[i].frontSeg == seg.linedefs[i].backSeg){
			null_linedefs.push(seg.linedefs[i]);
		}
	}
	for(var i=0;i<null_linedefs.length;++i){
		this.removeLinedef(null_linedefs[i]);
	}
	this.segments.splice(this.segments.indexOf(seg),1);
}

BuilderModel.prototype.removeLinedef = function(ld){
	this.linedefs.splice(this.linedefs.indexOf(ld),1);
	ld.p1.linedefs.splice(ld.p1.linedefs.indexOf(ld),1);
	ld.p2.linedefs.splice(ld.p2.linedefs.indexOf(ld),1);
	if(ld.backSeg){
		ld.backSeg.linedefs.splice(ld.backSeg.linedefs.indexOf(ld),1);
	}
	if(ld.frontSeg && ld.frontSeg != ld.backSeg){
		ld.frontSeg.linedefs.splice(ld.frontSeg.linedefs.indexOf(ld),1);
	}
	if(ld.helper && !ld.helper.isRemoved){ld.helper.remove();}
}

//inserts a new point in the middle of a linedef
//alpha: the factor along the line at which the point is inserted (0 - 1)
//returns: resulting point and linedef in an array
BuilderModel.prototype.bisect = function(linedef, premade_point, alpha){
	var pmid = premade_point;
	var oldLength = linedef.getLength();
	if(!pmid){
		alpha = alpha || 0.5;
		pmid = this.addPoint((1-alpha)*linedef.p1.x+alpha*linedef.p2.x, (1-alpha)*linedef.p1.y+alpha*linedef.p2.y);
	}else{
		alpha = Utils.distance_xxyy(linedef.p1.x, pmid.x, linedef.p1.y, pmid.y) / oldLength;
	}
	var newline = this.addLinedef(linedef.p1, pmid);
	newline.copy_style(linedef);
	
	console.log(oldLength, alpha);
	linedef.top_offX -= oldLength*alpha;
	linedef.tex_offX -= oldLength*alpha;
	
	//p1 is no longer part of original linedef, it is replaced with newline
	linedef.p1.linedefs.splice( linedef.p1.linedefs.indexOf(linedef) , 1);
	linedef.p1 = pmid;
	pmid.linedefs.push(linedef);

	//inherit segment stuff
	newline.backSeg = linedef.backSeg;
	newline.frontSeg = linedef.frontSeg;
	if(linedef.backSeg){
		linedef.backSeg.linedefs.push(newline);
	}
	if(linedef.frontSeg){
		linedef.frontSeg.linedefs.push(newline);
	}
	return [pmid,newline];
}

BuilderModel.trisect_selection = function(){
	if(Editor.selected.length > 0){
		var o = Editor.selected[0];
		if(o.linkedObject && o.linkedModel==BuilderModel.ACTIVE && o.type == 1){
			var res = o.linkedModel.bisect(o.linkedObject,null, 0.3333);
			if(res){
				BuilderModel.ACTIVE.addPointHelper(res[0]);
				BuilderModel.ACTIVE.addEdgeHelper(res[1]);
			}
			res = o.linkedModel.bisect(o.linkedObject,null, 0.5);
			if(res){
				BuilderModel.ACTIVE.addPointHelper(res[0]);
				BuilderModel.ACTIVE.addEdgeHelper(res[1]);
			}
		}
	}
}
	
/*BuilderModel.prototype.intersect_selected_edges = function(){
	if(Editor.selected.length >= 2 &&
	Editor.selected[0].linkedObject && Editor.selected[0].linkedObject.p1
	&&  Editor.selected[1].linkedObject && Editor.selected[1].linkedObject.p1){
		var interPoint = this.add_intersect_linedefs(Editor.selected[0].linkedObject, Editor.selected[1].linkedObject);
		if(interPoint){
			this.addPointHelper(interPoint);
		}			
	}else{
		console.warn("selection must be 2 edges");
	}
}*/

//l1: linedef about to be cut
//x1,x2,y1,y2: points of the cutting segment
BuilderModel.prototype.add_intersect = function(l1, x1,x2,y1,y2 ){
	var s1_x = l1.p2.x-l1.p1.x;
	var s1_y = l1.p2.y-l1.p1.y;
	var s2_x = x2-x1;
	var s2_y = y2-y1;
	
	var divisor = (-s2_x * s1_y + s1_x * s2_y);
	var startDiffX = (l1.p1.x - x1);
	var startDiffY = (l1.p1.y - y1);
	var s= (-s1_y * startDiffX + s1_x * startDiffY) / divisor;
	var t= ( s2_x * startDiffY - s2_y * startDiffX ) / divisor;
	if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        var interX = l1.p1.x + (t * s1_x);
		var interY = l1.p1.y + (t * s1_y);
		//TODO: edge cases where s==0 or 1, or t==0 or 1 we may use existing points
		var interPoint = this.addPoint(interX, interY);
		this.bisect(l1, interPoint);
		return interPoint;
    }
	//no intersection found
	return null;
}
//similar to add_intersect, but it is using two existing linedefs
/*BuilderModel.prototype.add_intersect_linedefs = function(l1, l2){
	var s1_x = l1.p2.x-l1.p1.x;
	var s1_y = l1.p2.y-l1.p1.y;
	var s2_x = l2.p2.x-l2.p1.x;
	var s2_y = l2.p2.y-l2.p1.y;
	var divisor = (-s2_x * s1_y + s1_x * s2_y);
	//startpoint difference (l1.p1, l2.p1)
	var startDiffX = (l1.p1.x - l2.p1.x);
	var startDiffY = (l1.p1.y - l2.p1.y);
	var s= (-s1_y * startDiffX + s1_x * startDiffY) / divisor;
	var t= ( s2_x * startDiffY - s2_y * startDiffX ) / divisor;
	
	if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        var interX = l1.p1.x + (t * s1_x);
		var interY = l1.p1.y + (t * s1_y);
		//TODO: edge cases where s==0 or 1, or t==0 or 1 we may use existing points
		var interPoint = this.addPoint(interX, interY);
		this.bisect(l1, interPoint);
		this.bisect(l2, interPoint);
		return interPoint;
    }
	//no intersection found
	return null;
}*/

//top is max Y, not min Y
BuilderModel.rect_linedef_bound_check = function(rleft, rright, rbottom, rtop , ld){
	var lleft = Math.min(ld.p1.x, ld.p2.x);
	var lright = Math.max(ld.p1.x, ld.p2.x);
	var lbottom = Math.min(ld.p1.y, ld.p2.y);
	var ltop = Math.max(ld.p1.y, ld.p2.y);
	return (lleft <= rright &&
			rleft <= lright &&
          ltop >= rbottom &&
          rtop >= lbottom)
}
BuilderModel.get_pointArr_bounds = function(pointArr){
	var rleft = 99999;
	var rright = -99999;
	var rbottom = 99999;
	var rtop = -99999;
	for(var i=0;i<pointArr.length;++i){
		rleft = Math.min(rleft, pointArr[i].x);
		rright = Math.max(rright, pointArr[i].x);
		rbottom = Math.min(rbottom, pointArr[i].y);
		rtop = Math.max(rtop, pointArr[i].y);
	}
	return [rleft,rright,rbottom,rtop];
}

BuilderModel.helper_is_builderPoint = function(p){
	return p.linkedObject && p.linkedModel && p.type == 0;
}

BuilderModel.cut_shape_global = function(cutterPoints){
	for(var i=0;i<cutterPoints.length;++i){
		BuilderModel.ACTIVE_ACTOR.global_to_local(cutterPoints[i]);
	}
	BuilderModel.ACTIVE.cut_shape(cutterPoints);
}

//step 1: pre-filter lines that are near the cutter shape
//step 2: insert points where the cutter intersects a linedef
//2b: construct the final cutting path in a way that point order is maintained
//step 3: connect the cutter points with edges using the new points in between
BuilderModel.prototype.cut_shape = function(cutterPoints){
	var pcount = cutterPoints.length;
	var prefilter_lines = [];
	var cutterRect = BuilderModel.get_pointArr_bounds(cutterPoints);
	for(var i=0;i<this.linedefs.length;++i){
		if(BuilderModel.rect_linedef_bound_check(cutterRect[0],cutterRect[1],cutterRect[2],cutterRect[3], this.linedefs[i])){
			prefilter_lines.push(this.linedefs[i]);
		}
	}
	var cutting_result_order = []; //all cutter and result points -> linedefs will connect these
	for(var i=0;i<pcount-1;++i){
		//start of a new line, that is part of the cutter shape
		if(BuilderModel.helper_is_builderPoint(cutterPoints[i])){
			//a point in the cut-shape can be the same as a point in the object
			cutting_result_order.push(cutterPoints[i].linkedObject);
		}else{
			cutting_result_order.push(this.addPoint( cutterPoints[i].x, cutterPoints[i].y) );
		}
		var cutting_result_line = []; //new points that have resulted from this cutter segment
		var cutting_result_dist = []; //distance of new point from segment start - need for point order
		for(var j=0;j<prefilter_lines.length;++j){
			var interLine = prefilter_lines[j];
			if(cutterPoints[i].linkedObject == interLine.p1 || cutterPoints[i].linkedObject == interLine.p2
			|| cutterPoints[i+1].linkedObject == interLine.p1 || cutterPoints[i+1].linkedObject == interLine.p2){
				continue;
			}else{
				var interPoint = this.add_intersect(interLine,
				cutterPoints[i].x,cutterPoints[i+1].x,cutterPoints[i].y,cutterPoints[i+1].y );
				console.log(interPoint);
			}
			if(interPoint){
				cutting_result_line.push(interPoint);
				//we can use fast distance, since only the order matters
				cutting_result_dist.push( Math.abs(cutterPoints[i].x-interPoint.x )+Math.abs(cutterPoints[i].y-interPoint.y) );
			}
			
		}
		//we need to add the new points to the cut path sorted along the cutting segment
		//this is O(n^2), but the number of new points resulting from a straight isn't a lot
		for(var k = 0;k<cutting_result_line.length;++k){
			var minDist = cutting_result_dist[0];
			var minId = 0;
			for(var kk = 1;kk<cutting_result_line.length;++kk){
				if(cutting_result_dist[kk] < minDist){
					minDist = cutting_result_dist[kk];
					minId = kk;
				}
			}
			var minPoint = cutting_result_line[minId];
			cutting_result_order.push(minPoint);
			cutting_result_dist[minId] = 99999;//this won't be selected anymore
		}
		//we must add the linedefs resulting from the intersections to the search set
		//because the cutter shape might intersect the linedef multiple times
		for(var k=0;k<cutting_result_line.length;++k){
			prefilter_lines.push( this.linedefs[this.linedefs.length-k-1]);
		}
	}
	//finish the cutting path by adding in the last point
	if(BuilderModel.helper_is_builderPoint(cutterPoints[pcount-1])){
		cutting_result_order.push(cutterPoints[pcount-1].linkedObject);
	}else{
		cutting_result_order.push(this.addPoint( cutterPoints[pcount-1].x, cutterPoints[pcount-1].y));
	}
	console.log(cutting_result_order);
	//now we must connect the point path with new linedefs	
	for(var i=0;i<cutting_result_order.length-1;++i){
		var p1 = cutting_result_order[i];
		var p2 = cutting_result_order[i+1];
		  
		if(p1.linedefs.length==0 || p2.linedefs.length==0){
			//this new linedef will not result in geo splitting
			var newline = this.addLinedef(p1,p2);
			//add the new linedef to a sector (if possible)
			var seg = this.get_segment_at( newline.getCenterX(), newline.getCenterY() );
			newline.backSeg = newline.frontSeg = seg;
			if(seg){
				seg.linedefs.push(newline);
			}
		}else{
			this.splitSegment(p1,p2);
		}
	}
	
	//add helpers
	for(var i=0;i<cutting_result_order.length;++i){ 
		if(!cutting_result_order[i].helper){
			this.addPointHelper(cutting_result_order[i]);
		}
	}
	var cut_start_id = 0; //this id makes sure that same points aren't deleted from both directions
	//cleanup: delete parts of the cutShape that are outside existing geometry
	for(var i=0;i<cutting_result_order.length;++i){//from start
		if(cutting_result_order[i].linedefs.length < 2){
			this.deletePoint(cutting_result_order[i]);
		}else{
			cut_startId = i;
			break;
		}
		cut_start_id++;
	}
	for(var i=cutting_result_order.length-1;i > cut_start_id;--i){//from end
		if(cutting_result_order[i].linedefs.length < 2){
			this.deletePoint(cutting_result_order[i]);
		}else{
			break;
		}
	}

	this.needs_update = true;
}
//a segment and a point must be selected
//or only a point, if the point has 2 linedefs
BuilderModel.prototype.chamfer_towards_mouse = function(point){
	var anchor = new Point(Control.terrainCursorPos[0], Control.terrainCursorPos[1]);
	BuilderModel.ACTIVE_ACTOR.global_to_local_2d(anchor);
	var result = this.chamfer(point, anchor)
	if(result){
		this.addPointHelper(result[0]);
		this.addEdgeHelper(result[1]);
		this.needs_update = true;
	}
}

BuilderModel.prototype.chamfer = function(point, anchor){
	//sides are compared to the point->anchor vector
	var leftSide = [];
	var rightSide = [];
	for(var i=0;i<point.linedefs.length;++i){
		var ld = point.linedefs[i];
		var p3 = ld.otherPoint(point);
		var ang = BuilderLinedef.angleDiff(anchor,point, p3);
		//build 2 arrays for each side of the anchor line
		//the linedefs are sorted on insertion by their angle to the anchor
		//so in the end the first elems of the arrays will give the sectors to the chamfer
		var pushArr = leftSide;
		if(ang > 3.1415){
			pushArr = rightSide;
		}
		ld.temp_value = ang;
		if(pushArr.length == 0){
			pushArr.push(ld);
		}else{
			var insert_happened = false;
			for(var k=0;k<pushArr.length;++k){
				if(pushArr[k].temp_value > ld.temp_value){
					pushArr.splice(k, 0, ld);
					insert_happened = true;
					break;
				}
			}
			if(!insert_happened){
				pushArr.push(ld);
			}
		}//the 2 sorted arrays are now complete
	}
	//console.log(leftSide, rightSide);
	if(leftSide.length==0||rightSide.length==0){
		console.warn("Bad chamfer angle");
		return null;
	}
	
	var dir = Math.atan2( point.x-anchor.x, point.y-anchor.y)+1.57;
	var newpoint = this.addPoint(point.x+Math.sin(dir)*0.25, point.y+Math.cos(dir)*0.25);
	var newline = this.addLinedef(point,newpoint);
	newline.copy_style(leftSide[0]);
	
	console.log(leftSide, rightSide);
	for(var i=0;i<leftSide.length;++i){
		leftSide[i].replacePoint(point, newpoint)
	}
	if(rightSide.length == 1){
		newline.backSeg = rightSide[0].backSeg;
		newline.frontSeg = rightSide[0].frontSeg;
	}else if(leftSide.length == 1){
		newline.backSeg = leftSide[0].backSeg;
		newline.frontSeg = leftSide[0].frontSeg;
	}else{
		newline.frontSeg = BuilderLinedef.getCommonSegment(leftSide[0], rightSide[rightSide.length-1] );
		newline.backSeg = BuilderLinedef.getCommonSegment(leftSide[leftSide.length-1], rightSide[0] ); 
	}

	if(newline.frontSeg){
		newline.frontSeg.linedefs.push(newline);
	}
	if(newline.backSeg && newline.backSeg != newline.frontSeg){
		newline.backSeg.linedefs.push(newline);
	}
	
	return[newpoint, newline];
}

BuilderModel.extrude_selection = function(){
	if(BuilderModel.ACTIVE){
		if(Editor.selected.length > 0 && Editor.selected[0].linkedObject
		&& Editor.selected[0].type == 1){
			var seg = BuilderModel.ACTIVE.extrude(Editor.selected[0].linkedObject);
			if(seg){
				seg.build_triangulation();
			}
		}
	}
}

//creates a new segment by offsetting the input linedef
BuilderModel.prototype.extrude = function(linedef){
	if(linedef.backSeg && linedef.frontSeg){
		console.warn("Can only extrude outer edges");
		return null;
	}
	var oldSeg = linedef.frontSeg || linedef.backSeg;
	
	var angle = -linedef.getAngle()+1.57;
	var offX = Math.cos(angle);
	var offY = Math.sin(angle);
	var p1 = this.addPoint(linedef.p1.x + offX, linedef.p1.y + offY);
	var p2 = this.addPoint(linedef.p2.x + offX, linedef.p2.y + offY);
	
	var ld = this.addLinedef(p1,p2);
	var side1 = this.addLinedef(linedef.p1, p1);
	var side2 = this.addLinedef(p2, linedef.p2);
	
	ld.copy_style(linedef);
	side1.copy_style(linedef);
	side2.copy_style(linedef);
	
	var seg = this.addSegment([linedef, side1, ld, side2]);
	seg.copy_style(oldSeg);
	
	this.addPointHelper(p1);
	this.addPointHelper(p2);
	this.addEdgeHelper(side1);
	this.addEdgeHelper(side2);
	this.addEdgeHelper(ld);
	this.addSegmentHelper(seg);
	
	this.needs_update = true;
	return seg;
}

BuilderModel.bridge_selection = function(){
	if(BuilderModel.ACTIVE){
		if(Editor.selected.length >=2){
			if(Editor.selected[0].type == 1 && Editor.selected[1].type){
				BuilderModel.ACTIVE.bridge_edges(Editor.selected[0].linkedObject, Editor.selected[1].linkedObject);
			}
		}
	}
}
//creates a new sector by connecting two linedefs with 2 new lines
BuilderModel.prototype.bridge_edges = function(l1, l2){
	if(l1.p1 == l2.p1 || l1.p1 == l2.p2){
		console.warn("Cannot bridge neighboring linedefs");
		return;
	}
	if(l1.frontSeg && l1.backSeg || l2.frontSeg && l2.backSeg){
		console.warn("Can only bridge outer wall edges");
		return;
	}
	var ref_segment = l1.frontSeg||l1.backSeg;
	
	var swap = false;
	//this would create an X shape between the linedefs, we don't want that
	if(Utils.intersect_4point(l1.p1, l2.p1, l1.p2, l2.p2 ) > 0){
		swap = true;
	}
	if(!swap){
		var nl1 = this.addLinedef( l1.p1, l2.p1 );
		var nl2 = this.addLinedef( l2.p2, l1.p2 );
	}else{
		var nl1 = this.addLinedef( l1.p1, l2.p2 );
		var nl2 = this.addLinedef( l2.p1, l1.p2 );
	}
	nl1.copy_style(l1);
	nl2.copy_style(l1);
	var newseg = this.addSegment([l1, nl1, l2, nl2]);
	newseg.copy_style(ref_segment);
	this.addEdgeHelper(nl1);
	this.addEdgeHelper(nl2);
	this.addSegmentHelper(newseg);
}

BuilderModel.prototype.edge_to_seg = function(ld){
	var p1 = ld.p1;
	var p2 = ld.p2;
	
	var bisect_result = this.bisect(ld);
	var newpoint = bisect_result[0];
	var newline = bisect_result[1];
	var ang = ld.getAngle();
	newpoint.x+=Math.sin(ang);
	newpoint.y+=Math.cos(ang);
	this.addPointHelper(newpoint);
	this.splitSegment(p1,p2);
}

BuilderModel.align_selection_texture = function(){
	var anchorX = Control.terrainCursorPos[0];
	var anchorY = Control.terrainCursorPos[1];
	BuilderModel.ACTIVE.needs_update = true;
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.linkedObject && o.linkedModel && o.type <= 1){
			if(o.type == 0){ //point selection
				var alignPoint = o.linkedObject;
			}else{ //edge selection
				var ld = o.linkedObject;
				if(Utils.distance_xxyy(ld.p1.helper.x,anchorX,ld.p1.helper.y,anchorY)<
				Utils.distance_xxyy(ld.p2.helper.x,anchorX,ld.p2.helper.y,anchorY)){
					var alignPoint = ld.p1;
				}else{
					var alignPoint = ld.p2;
				}
			}
			//if point is selected, align the closest edge to the mouse with the second closest
			//if edge is selected ,align it with the closest edge to the mouse (or second closest if selected edge is closest)
			var p1 = alignPoint; 
			var minDist = 9999;
			var secondDist = 9999;
			var minLine = null;
			var secondLine = null;
			for(var j=0;j<p1.linedefs.length;++j){ //get closest and second closest line to the mouse
				var p2 = p1.linedefs[j].otherPoint(p1);
				var dist = Utils.point_to_line_dist_2d(anchorX,anchorY,p1.helper.x,p1.helper.y,p2.helper.x,p2.helper.y);
				if(dist < minDist){
					secondDist = minDist;
					minDist = dist;
					secondLine = minLine;
					minLine = p1.linedefs[j];
				}else if(dist < secondDist){
					secondDist = dist;
					secondLine = p1.linedefs[j];
				}
			}
			
			if(o.type == 1){
				if(o.linkedObject != minLine){
					secondLine = minLine;
					minLine = o.linkedObject;
				}
			}
			
			if(minLine && secondLine){
				if(minLine.p1 == p1){
					minLine.tex_offX = (secondLine.tex_offX - secondLine.getLength());
					minLine.top_offX = (secondLine.top_offX - secondLine.getLength());
				}else{
					minLine.tex_offX = (secondLine.tex_offX + minLine.getLength());
					minLine.top_offX = (secondLine.top_offX + minLine.getLength());
				}
				minLine.tex_offY = secondLine.tex_offY;
				minLine.top_offY = secondLine.top_offY;
			}
		}
	}
}

BuilderModel.merge_selection = function(){
	if(BuilderModel.ACTIVE){
		for(var i=Editor.selected.length-1;i>=0;--i){
			var o = Editor.selected[i];
			if(o.linkedObject && o.type == 1){
				var merged_seg = BuilderModel.ACTIVE.destroyEdge(o.linkedObject);
				if(merged_seg){
					merged_seg.build_triangulation();
					merged_seg.reposition_helper();
					BuilderModel.ACTIVE.needs_update = true;
				}
			}
		}
	}
}
//select all edges that are part of selected segments
BuilderModel.select_segment_edges = function(){
	var oldSelection = Editor.selected.slice();
	if(!Control.pressed[17]){//hold CTRL for additive selection
		Editor.EmptySelection();
	}
	if(BuilderModel.ACTIVE){
		for(var k=0;k < oldSelection.length;++k){
			var o = oldSelection[k];
			if(o && o.linkedObject && o.type == 2){
				var seg = o.linkedObject;
				for(var i=0;i<seg.linedefs.length;++i){
					Editor.AddObjectToSelection(seg.linedefs[i].helper);
				}
			}
		}
	}
}
//select all points that are part of selected segments
BuilderModel.select_segment_points = function(){
	var oldSelection = Editor.selected.slice();
	if(!Control.pressed[17]){//hold CTRL for additive selection
		Editor.EmptySelection();
	}
	if(BuilderModel.ACTIVE){
		for(var k=0;k<oldSelection.length;++k){
			var o = oldSelection[k];
			if(o && o.linkedObject && o.type == 2){
				var seg = o.linkedObject;
				for(var i=0;i<seg.linedefs.length;++i){
					Editor.AddObjectToSelection(seg.linedefs[i].p1.helper);
					Editor.AddObjectToSelection(seg.linedefs[i].p2.helper);
				}
			}
		}
	}
}
	
BuilderModel.split_selection = function(){
	if(BuilderModel.ACTIVE){
		if(Editor.selected.length > 1){
			var h1 = Editor.selected[0];
			var h2 = Editor.selected[1];
			if(h1.linkedObject && h1.type == 0 
			&& h2.linkedObject && h2.type == 0){
				var ld = BuilderModel.ACTIVE.splitSegment(h1.linkedObject , h2.linkedObject );
				if(ld){
					BuilderModel.ACTIVE.needs_update = true;
					ld.backSeg.reposition_helper();
					ld.backSeg.build_triangulation();
					ld.frontSeg.reposition_helper();
					ld.frontSeg.build_triangulation();
				}
			}
		}
	}
}

BuilderModel.select_shortest_path = function( sel_end ){
	if(BuilderModel.ACTIVE){
		for(var i=Editor.selected.length-1;i>=0;--i){
			var o = Editor.selected[i];
			if(o.linkedObject && o.type == 1){
				var ld = o.linkedObject;
				var goal = sel_end.linkedObject;
				var start = o.linkedObject;
				start.temp_value = 0;
				var path = [];
				var visited = [start];
				var front = [start];
				
				//a very unoptimzed implementation of BFS
				for(var k=0;k<100;++k){
					var found = false;
					for(var i=0;i<front.length;++i){
						if(front[i] == goal){ //found goal, trace back the steps using parent ids
							var parentLine = goal;
							while(parentLine != start){
								Editor.AddObjectToSelection(parentLine.helper);
								parentLine = visited[parentLine.temp_value];
							}
							found = true;
							break;
						}
					}
					
					if(!found){
						var nextFront = [];
						for(var i=0;i<front.length;++i){
							var neighbors = front[i].p1.linedefs.concat(front[i].p2.linedefs);
								for(var j=0;j<neighbors.length;++j){
								if(visited.indexOf( neighbors[j] ) < 0){
									neighbors[j].temp_value = visited.indexOf(front[i]);//pointer to parent linedef
									visited.push(neighbors[j]);
									nextFront.push(neighbors[j]);
								}
							}
						}
						front = nextFront;
					}
				}
				break;
			}
		}
	}
}
 
BuilderModel.set_selected_texture = function(texId, tex_op){
	if(!BuilderModel.ACTIVE || Editor.selected.length <= 0){return;}
	var m =BuilderModel.ACTIVE;
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(!o.linkedObject || o.linkedModel != m || o.type == 0){
			continue;
		}
		if(o.type == 1){
			if(tex_op == 3){
				o.linkedObject.bottomMat = texId;
			}else if(tex_op ==4 ){
				o.linkedObject.topMat = texId;
			}else if(tex_op == 5){
				o.linkedObject.middleMat = texId;
			}
		}else if(o.type == 2){
			if(tex_op == 1){
				o.linkedObject.floorMat = texId;
			}else if(tex_op == 2){
				o.linkedObject.ceilingMat = texId;
			}
		}
	}
	BuilderModel.ACTIVE.needs_update = true;
}

BuilderModel.flip_selection = function(){
	for(var i=0;i<Editor.selected.length;++i){
		var o = Editor.selected[i];
		if(o.linkedObject && o.type == 1){
			o.linkedObject.flip();
			o.rotZ += 3.1415;
			o.linkedModel.needs_update = true;
		}
	}
}

BuilderModel.prototype.clone_selected_segment = function(){
	if(Editor.selected.length > 0){
		var helper = Editor.selected[0];
		if(helper.linkedObject && helper.type == 2){
			var seg = helper.linkedObject;
			var new_lines = [];
			var new_points = [];
			
			for(var i=0;i<seg.linedefs.length;++i){
				var ld = seg.linedefs[i];
				var p1 = this.get_or_add_point_from_set(ld.p1.x + 1, ld.p1.y, new_points, true);
				var p2 = this.get_or_add_point_from_set(ld.p2.x + 1, ld.p2.y, new_points, true);
				var newline = this.addLinedef(p1,p2);
				new_lines.push(newline);
				newline.copy_style(ld);
			}
			var newseg = this.addSegment(new_lines);
			newseg.copy_style(seg);
			
			for(var i=0;i<new_points.length;++i){
				this.addPointHelper(new_points[i]);
			}
			for(var i=0;i<new_lines.length;++i){
				this.addEdgeHelper(new_lines[i]);
			}
			this.addSegmentHelper(newseg);
			
			BuilderModel.ACTIVE.needs_update = true;
		}
	}
}

//UTILITY FUNCTION
//find a point contained in the set by location, or add it if no point is at the coordinates
BuilderModel.prototype.get_or_add_point_from_set = function(x,y, set, add_to_set ){
	for(var i=0;i<set.length;++i){
		if(Utils.distance_xxyy(set[i].x,x, set[i].y,y) < 0.01){
			return set[i];
		}
	}
	var newpoint = this.addPoint(x,y);
	if(add_to_set){
		set.push(newpoint);
	}
	return newpoint;
}

//connects 2 of the selected points with a new linedef and splits the segment
//returns the splitting linedef
BuilderModel.prototype.splitSegment = function(p1, p2){
	//find the segment that is being split - both points must be a part of it
	var commonSeg = [];
	for(var i=0;i<p1.linedefs.length;++i){
		var ld1 = p1.linedefs[i];
		for(var j=0;j<p2.linedefs.length;++j){
			var ld2 = p2.linedefs[j];
			if(ld1 == ld2){
				console.warn("Split endpoints can't be on same linedef");
				return null;
			}
			
			if(ld1.backSeg && (ld1.backSeg==ld2.backSeg|| ld1.backSeg==ld2.frontSeg)){
				if(commonSeg.indexOf( ld1.backSeg )<0){//add if not in array already
					commonSeg.push(ld1.backSeg);
				}
			}
			if(ld1.frontSeg && (ld1.frontSeg==ld2.backSeg|| ld1.frontSeg==ld2.frontSeg)){
				if(commonSeg.indexOf( ld1.frontSeg )<0){//add if not in array already
					commonSeg.push(ld1.frontSeg);
				}
			}
		}
	}
	var seg = null
	for(var i=0;i<commonSeg.length;++i){
		//hack: if the midpoint is in the polygon, that should be the split segment
		if(commonSeg[i].point_in_polygon( (p1.x+p2.x)/2, (p1.y+p2.y)/2)){
			seg = commonSeg[i];
			break;
		}
	}
	if(!seg){console.warn("No common segment");return null;}
	
	var newline = this.addLinedef(p1,p2);
	newline.backSeg = seg;
	newline.frontSeg = seg;
	seg.linedefs.push(newline);
	this.addEdgeHelper(newline);
	var lineLoop = [];
	//recursively build up the lineloop of a new segment
	var found_a_loop = this.get_smallest_edge_loop_recursive(newline,newline.p1,newline.p1,lineLoop);
	console.log(found_a_loop);
		if(found_a_loop && lineLoop.length > 0 && lineLoop.length < seg.linedefs.length){
		//we could build a loop that will be the shape of the new segment
		var newseg = new BuilderSegment(this);
		this.segments.push(newseg);
		//all the lines that are in the new loop must be removed from the old segment
		//and added to the new segment, UNLESS it is a border line between the two segments
		for(var i=0;i<lineLoop.length;++i){
			if(lineLoop[i].backSeg == lineLoop[i].frontSeg){
				//this is either the newline, or part of a larger cut-shape that is in progress
				lineLoop[i].frontSeg = newseg;
				newseg.linedefs.push(lineLoop[i]);
			}else{
				BuilderModel.swap_linedef_segment( lineLoop[i], seg, newseg );
			}
		}
		//we must also check if there were holes in the old segment that now should be in the new segment
		var holeLines = []; //accumulate lines, adding them during search would interfere with poly check
		for(var i=0;i<seg.linedefs.length;++i){
			var ld = seg.linedefs[i];
			if(!ld.visited_by_recursion && ld.frontSeg!=newseg&&ld.backSeg!=newseg &&
			newseg.point_in_polygon( ld.getCenterX(), ld.getCenterY()) ){
				//line is inside newseg but isn't part of the loop -> it must be a hole or a dead end
				holeLines.push(ld);
			}
		}
		for(var i=0;i<holeLines.length;++i){
			BuilderModel.swap_linedef_segment( holeLines[i], seg, newseg );
		}
		newseg.copy_style(seg);
		this.addSegmentHelper(newseg);
	}//otherwise search has failed or there is still only one polygon
	//cleanup
	for(var i=0;i<lineLoop.length;++i){
		lineLoop[i].visited_by_recursion = false;
		
	}
	return newline;
}

BuilderModel.recursion_winding_sum = 0;
//splitting a segment will create 2 line loops with opposing chirality
//but since one segment will be the original, we only need to traverse one of the new polygons
//chirality: -1 if you want a polygon winding in the opposite direction(e.g. for holes)
BuilderModel.prototype.get_smallest_edge_loop_recursive = function(startLine, startPoint, goalPoint, lineLoop, chirality ){
	chirality = chirality || 1;
	startLine.visited_by_recursion = true;
	lineLoop.push(startLine);
	var nextPoint = startLine.otherPoint(startPoint);
	if(nextPoint == goalPoint && lineLoop.length > 1){
		return true;
	}
	var found_goal = false;
	//linedef endpoints might be flipped
	
	var nextLine = null;
	if(nextPoint.linedefs.length == 2){ //only one way to move forward
		nextLine = (startLine == nextPoint.linedefs[0])?nextPoint.linedefs[1]:nextPoint.linedefs[0];
	}else{ //we are at a fork
	//we must follow the leftmost (or rightmost?)  to close the loop without containing other edges
		var minAngle = 9999;
		for(var i=0;i<nextPoint.linedefs.length;++i){
			var lnext = nextPoint.linedefs[i];
			if(lnext==startLine){continue};
			var angleToNext = BuilderLinedef.angleDiff(startPoint, nextPoint, lnext.otherPoint(nextPoint) );
			angleToNext *= chirality;
			if(angleToNext < minAngle){
				minAngle = angleToNext;
				nextLine = lnext;
			}
		}

		BuilderModel.recursion_winding_sum += (minAngle<3.1415?minAngle:minAngle-6.283);
	}
	
	if(nextLine && !nextLine.visited_by_recursion){
		found_goal = this.get_smallest_edge_loop_recursive(nextLine, nextPoint, goalPoint, lineLoop, chirality )
	}
	return found_goal;
}



//ld will be linked to s2 instead of s1
BuilderModel.swap_linedef_segment = function(ld, s1, s2){
	if(s2.linedefs.indexOf(ld) < 0){
		s2.linedefs.push(ld);
	}
	var oldIdx = s1.linedefs.indexOf(ld);
	if(oldIdx >= 0){
		s1.linedefs.splice(oldIdx, 1);
	}
	if(ld.frontSeg == s1){
		ld.frontSeg = s2;
	}
	if(ld.backSeg == s1){
		ld.backSeg = s2;
	}
}

BuilderModel.prototype.get_segment_at = function(x,y){
	for(var i=0;i<this.segments.length;++i){
		if(this.segments[i].point_in_polygon(x,y)){
			return this.segments[i];
		}
	}
	return null;
}

BuilderModel.make_segment_at_mouse = function(){
	var point = new Point(Control.terrainCursorPos[0],Control.terrainCursorPos[1]);
	BuilderModel.ACTIVE_ACTOR.global_to_local_2d(point);
	BuilderModel.ACTIVE.make_segment_at(point.x,point.y);
}

//method:
//1. find the line that is closest to the point (must be outer wall or null line)
//2. build a loop starting from the line
//3. make the segment
BuilderModel.prototype.make_segment_at = function(x,y){
	var intersects = 0;
	var ray_start = new Point(x,y);
	var ray_length = 100;
	var ray_end = new Point(x-ray_length,y);
	var closest_intersect_t = 99999;
	var closest = null; //closest intersected line
	//the first intersected line in the -x direction will be the start of the 
	for(var i=0;i<this.linedefs.length;++i){
		var ld = this.linedefs[i];
		if ((ld.p1.y > y) != (ld.p2.y > y)){
			var ray_t = Utils.intersect_4point(ray_start, ray_end, ld.p1,ld.p2);
			//because one of the lines is always the horizontal ray,
			//the minimal distance will be ray_length*ray_t 
			if(ray_t >= 0){
				if(closest_intersect_t > ray_t){
					closest_intersect_t = ray_t;
					closest = this.linedefs[i];
				}
			}
		}
	}
	if(!closest){
		console.warn("Found no line to the left of point");
		return null;
	}

	//should work, because frontseg is always to the right of the linedef dir,
	if(closest.frontSeg && closest.p1.y < closest.p2.y 
	|| closest.backSeg && closest.p1.y > closest.p2.y){
		console.warn("Loop line is not an outer line");
		return null;
	}
	
	var lineLoop = [];
	var newseg = null;
	BuilderModel.recursion_winding_sum = 0;
	if(closest.frontSeg || closest.backSeg){
		var found_a_loop = this.get_smallest_edge_loop_recursive(closest,closest.p1,closest.p1,lineLoop, -1);
	}else{
		if(closest.p2.y > closest.p1.y){
			var found_a_loop = this.get_smallest_edge_loop_recursive(closest,closest.p2,closest.p2,lineLoop, -1);
		}else{
			var found_a_loop = this.get_smallest_edge_loop_recursive(closest,closest.p2,closest.p2,lineLoop, 1);
		}
	}
	console.log(BuilderModel.recursion_winding_sum / lineLoop.length);
	//cleanup
	for(var i=0;i<lineLoop.length;++i){
		lineLoop[i].visited_by_recursion = false;
	}
	
	if(found_a_loop){
		var neighborSeg = null;//try to find a neighborSeg to copy its style 
		for(var i=0;i<lineLoop.length;++i){
			neighborSeg = lineLoop[i].backSeg||lineLoop[i].frontSeg;
			if(neighborSeg){break;}
		}
		newseg = this.addSegment(lineLoop);
		if(neighborSeg){
			newseg.copy_style(neighborSeg);
		}//otherwise new segment will have default height, texture, brightness, etc
		this.addSegmentHelper(newseg);
		newseg.build_triangulation();
		this.needs_update = true;
	}else{
		console.warn("No loop found around point");
	}
	
	return newseg;
}

BuilderModel.elem_sort_func = function(a,b){
	return Math.sign(a.tag-b.tag);
}

//converts linedef and segment data into a real 3d model
BuilderModel.prototype.makeGeometry = function(){
	var M_TRIS = []; //after the triangle counting pass tells us how many triangles does each mat_id have
	var M_IDS = [];//during the buffer filling pass tells us where the next tri of a given mat_id will be in the buffer
	for(var i=0;i<Asset.MATERIALS.length;++i){
		M_TRIS[i] = 0;
		M_IDS[i] = 0;
	}
	//make sure that segment id is the same as its position in the array
	for(var i=0;i<this.segments.length;++i){
		this.segments[i].id = i;
	}
	//pre-sort all linedefs and segments by tagId (not matId, since we have multiple of those per elem)
	var elems = this.linedefs.concat(this.segments);
	elems.sort(BuilderModel.elem_sort_func);
	//using a merged and sorted array guarantees that triangles of the same tags are consequent
	
	var tris = 0;
	//count up all the wall quads that need to be triangulated
	for(var i=0;i< elems.length;++i){
		var e = elems[i];
		if(e.p1){ //linedef
			if(e.frontSeg){
				if(e.backSeg){
					if(e.frontSeg.ceiling != e.backSeg.ceiling){
						M_TRIS[ e.topMat ] += 2;
						tris += 2; //ceiling height difference
					}
					if(e.frontSeg.floor != e.backSeg.floor){
						M_TRIS[ e.bottomMat ] += 2;
						tris += 2; //floor height difference
					}
					if(e.middleMat >=0){ //4 because it's front+back
						M_TRIS[ e.middleMat ]  += 4;
						tris += 4; //linedef has a middle texture
					}
				}else{ // front seg only, outer wall
					M_TRIS[ e.bottomMat ]  += 2;
					tris += 2; //simple wall with no backside
				}
			}else if(e.backSeg){ //back seg only, flipped outer wall
				M_TRIS[ e.bottomMat ]  += 2;
				tris += 2;
			}
		}else{ //segment
			var segTris = e.triangulation.length/3;
			M_TRIS[ e.floorMat ]  += segTris;
			M_TRIS[ e.ceilingMat ] += segTris;
			tris += segTris * 2;
		}
	}
	
	//the triangle indexing of a mat_id part will start where the previous one ends
	var mat_tris_accum = 0;
	for(var i=0;i<Asset.MATERIALS.length;++i){
		M_IDS[i] = mat_tris_accum;
		mat_tris_accum += M_TRIS[i];
	}

	//now that we now how many triangles the model has, we can init the buffer arrays
	if(this.numFaces != tris){ //if triangle count is the same, no need to re-allocate arrays
		this.numFaces = tris
		this.verts = new Float32Array(tris*9);
		this.norms = new Float32Array(tris*9);
		this.texCoords = new Float32Array(tris*6);
		this.vertColors = new Float32Array(tris*9);
		this.segmentIds = new Int16Array(tris);
		this.matTagIds = new Int16Array(tris); //matId +1024*tagId
	}
	
	for(var i=0;i< elems.length;++i){
		var e = elems[i];
		if(e.p1){ //linedef triangulation (quads)
			var x1 = e.p1.x;
			var y1 = e.p1.y;
			var x2 = e.p2.x;
			var y2 = e.p2.y;
			var angle = -Math.atan2(x2-x1,y2-y1);
			var nx = Math.cos(angle);
			var ny = Math.sin(angle);
			
			if(e.backSeg){
				var back_strobe =  e.backSeg.strobe_type + (e.backSeg.strobe_strength/256)%1;
			}
			if(e.frontSeg){
				var front_strobe =  e.frontSeg.strobe_type + (e.frontSeg.strobe_strength/256)%1;
				if(e.backSeg){
					if(e.frontSeg.ceiling != e.backSeg.ceiling){ //ceiling height difference
						var z1 = Math.min(e.frontSeg.ceiling, e.backSeg.ceiling) + Math.min(0, e.extra_topZ);
						var z2 = Math.max(e.frontSeg.ceiling, e.backSeg.ceiling) + Math.max(0, e.extra_topZ);
						if(e.frontSeg.ceiling < e.backSeg.ceiling){
							var liftZ = e.frontSeg.ceilingLift;
							this.addWallQuad(M_IDS[e.topMat] ,x2,x1,y2,y1, z1,z2,nx,ny,e.backSeg.brightness,back_strobe,e.top_offX,e.top_offY,e.backSeg.id, e.topMat+e.tag*1024, liftZ); 
						}else{
							var liftZ = e.backSeg.ceilingLift;
							this.addWallQuad(M_IDS[e.topMat] ,x1,x2,y1,y2, z1,z2,-nx,-ny,e.frontSeg.brightness,front_strobe, e.top_offX,e.top_offY,e.frontSeg.id, e.topMat+e.tag*1024, liftZ); 
						}
						M_IDS[e.topMat] += 2;
					}
					if(e.frontSeg.floor != e.backSeg.floor){ //floor height difference
						var z1 = Math.min(e.frontSeg.floor, e.backSeg.floor) - Math.max(0, e.extra_bottomZ);
						var z2 = Math.max(e.frontSeg.floor, e.backSeg.floor) - Math.min(0, e.extra_bottomZ);
						if(e.frontSeg.floor > e.backSeg.floor){
							var liftZ = e.frontSeg.floorLift;
							this.addWallQuad(M_IDS[e.bottomMat] ,x2,x1,y2,y1, z1,z2,nx,ny,e.backSeg.brightness,back_strobe,e.tex_offX,e.tex_offY,e.backSeg.id, e.bottomMat+e.tag*1024, liftZ  ); 
						}else{
							var liftZ = e.backSeg.floorLift;
							this.addWallQuad(M_IDS[e.bottomMat] ,x1,x2,y1,y2, z1,z2,-nx,-ny,e.frontSeg.brightness,front_strobe,e.tex_offX,e.tex_offY,e.frontSeg.id, e.bottomMat+e.tag*1024, liftZ  ); 
						}
						M_IDS[e.bottomMat] += 2;
					}
					if(e.middleMat >=0){  //linedef has a middle texture, between floor and ceil
						var matTag = e.middleMat+e.tag*1024;
						var midTex = Asset.MATERIALS[e.middleMat];
						if(midTex.no_vertical_tiling){//non-repeating mid textures (railings, hanging bits)
							var z1 = Math.max(-e.tex_offY, Math.max(e.frontSeg.floor, e.backSeg.floor));
							var z2 = -e.tex_offY+midTex.height/64//Math.min(-e.tex_offY+midTex.height/64, Math.min(e.frontSeg.ceiling, e.backSeg.ceiling));	
						}else{
							var z1 = Math.max(e.frontSeg.floor, e.backSeg.floor);
							var z2 = Math.min(e.frontSeg.ceiling, e.backSeg.ceiling);
						}
						
						var liftZ = e.tag==e.frontSeg.tag?e.frontSeg.floorLift:e.backSeg.floorLift;//could be part of a larger elevator
						this.addWallQuad(M_IDS[e.middleMat] ,x1,x2,y1,y2, z1,z2,nx,ny, e.frontSeg.brightness,front_strobe,e.tex_offX,e.tex_offY,e.frontSeg.id, matTag, liftZ );
						M_IDS[e.middleMat]  += 2;
						this.addWallQuad(M_IDS[e.middleMat] ,x2,x1,y2,y1, z1,z2, nx, ny, e.backSeg.brightness,back_strobe,e.tex_offX,e.tex_offY,e.backSeg.id, matTag, liftZ );
						M_IDS[e.middleMat]  += 2;
					}
				}else{ // front seg only, outer wall, //simple wall with no backside
					var z1 = e.frontSeg.floor - e.extra_bottomZ;
					var z2 = e.frontSeg.ceiling + e.extra_topZ;
					var liftZ = e.frontSeg.floorLift;
					
					this.addWallQuad(M_IDS[e.bottomMat] ,x1,x2,y1,y2, z1,z2,nx,ny, e.frontSeg.brightness,front_strobe,e.tex_offX,e.tex_offY,e.frontSeg.id, e.bottomMat+e.tag*1024,liftZ ); 
					M_IDS[e.bottomMat]  +=2;
				}
			}else if(e.backSeg){//back seg only, flipped outer wall
				var z1 = e.backSeg.floor - e.extra_bottomZ;
				var z2 = e.backSeg.ceiling + e.extra_topZ;
				var liftZ = e.backSeg.floorLift;
				
				this.addWallQuad(M_IDS[e.bottomMat] ,x2,x1,y2,y1, z1,z2,nx,ny, e.backSeg.brightness,back_strobe,e.tex_offX,e.tex_offY,e.backSeg.id, e.bottomMat+e.tag*1024,liftZ ); 
				M_IDS[e.bottomMat]  +=2;
			}
		}else{ //add segment floor & ceiling triangulation
			var trion = e.triangulation;
			var strobe = e.strobe_type + (e.strobe_strength/256)%1;
			var floorMatTag = e.floorMat+e.tag*1024;
			var ceilMatTag = e.ceilingMat+e.tag*1024;
 
			for(var j=0;j<trion.length;j+=3){
				this.addFloorTriangle(M_IDS[e.floorMat] , 
				trion[j].x, trion[j+1].x, trion[j+2].x,
				trion[j].y, trion[j+1].y, trion[j+2].y, e.floor, 1, e.brightness,strobe, e.tex_offX,e.tex_offY, e.id, floorMatTag, e.floorLift );
				M_IDS[e.floorMat] ++;
				//inverse vertex order and normal for ceiling
				this.addFloorTriangle(M_IDS[e.ceilingMat] , 
				trion[j+2].x, trion[j+1].x, trion[j].x,
				trion[j+2].y, trion[j+1].y, trion[j].y, e.ceiling, -1, e.brightness,strobe, e.top_offX,e.top_offY, e.id, ceilMatTag, e.ceilingLift);
				M_IDS[e.ceilingMat] ++;
			}
		}
	}
	
	//Initialize mat_id_parts
	this.mat_id_parts = [];
	if(tris){
		var count = 1;
		var prev_matTag = this.matTagIds[0];
		for(var i=1;i<tris;++i){
			if(this.matTagIds[i]!=prev_matTag){ //matId part is over, now we know its size
				this.mat_id_parts.push( [prev_matTag, i-count, count] );
				count = 0;
			}
			prev_matTag = this.matTagIds[i];
			count++;
		}
		this.mat_id_parts.push( [prev_matTag,tris-count, count ] ); //last matId part
	}
	
	initBuffers(this);
}

BuilderModel.prototype.posToBuffer = function(){return this.verts;}
BuilderModel.prototype.normToBuffer = function(){return this.norms;}
BuilderModel.prototype.texCoordToBuffer = function(){return this.texCoords;}
BuilderModel.prototype.vertColorToBuffer = function(){return this.vertColors;}
BuilderModel.prototype.refresh = function(){
	this.makeGeometry();
	initBuffers(this);
}

BuilderModel.prototype.addWallQuad = function(triangleId , x1, x2, y1, y2, z1, z2, nx, ny, bright,strobe, uOff, vOff, segId, matTag, liftZ){
	var idx = triangleId * 9;
	var idxUV = triangleId * 6;
	this.segmentIds[triangleId] = segId;
	this.segmentIds[triangleId+1] = segId;
	this.matTagIds[triangleId] = matTag;
	this.matTagIds[triangleId+1] = matTag;
	
	var u1= 0*ny-0*nx + uOff;
	var v1=z1 + vOff;
	var u2=(x2-x1)*ny-(y2-y1)*nx + uOff;
	var v2=z2 + vOff;
	
	//FIRST TRIANGLE
	this.verts[idx] = x1;
	this.verts[idx+1] = y1;
	this.verts[idx+2] = z1;
	this.verts[idx+3] = x2;
	this.verts[idx+4] = y2;
	this.verts[idx+5] = z2;
	this.verts[idx+6] = x1;
	this.verts[idx+7] = y1;
	this.verts[idx+8] = z2;
	
	this.norms[idx] = nx;
	this.norms[idx+1] = ny;
	this.norms[idx+2] = 0;
	this.norms[idx+3] = nx;
	this.norms[idx+4] = ny;
	this.norms[idx+5] = 0;
	this.norms[idx+6] = nx;
	this.norms[idx+7] = ny;
	this.norms[idx+8] = 0;
	
	this.texCoords[idxUV] = u1;
	this.texCoords[idxUV+1] = v1;
	this.texCoords[idxUV+2] = u2;
	this.texCoords[idxUV+3] = v2;
	this.texCoords[idxUV+4] = u1;
	this.texCoords[idxUV+5] = v2;
	
	this.vertColors[idx] = bright;
	this.vertColors[idx+1] = strobe;
	this.vertColors[idx+2] = liftZ;
	this.vertColors[idx+3] = bright;
	this.vertColors[idx+4] = strobe;
	this.vertColors[idx+5] = liftZ;
	this.vertColors[idx+6] = bright;
	this.vertColors[idx+7] = strobe;
	this.vertColors[idx+8] = liftZ;
	
	//SECOND TRIANGLE
	this.verts[idx+9] = x1;
	this.verts[idx+10] = y1;
	this.verts[idx+11] = z1;
	this.verts[idx+12] = x2;
	this.verts[idx+13] = y2;
	this.verts[idx+14] = z1;
	this.verts[idx+15] = x2;
	this.verts[idx+16] = y2;
	this.verts[idx+17] = z2;
	
	this.norms[idx+9] = nx;
	this.norms[idx+10] = ny;
	this.norms[idx+11] = 0;
	this.norms[idx+12] = nx;
	this.norms[idx+13] = ny;
	this.norms[idx+14] = 0;
	this.norms[idx+15] = nx;
	this.norms[idx+16] = ny;
	this.norms[idx+17] = 0;
	
	this.texCoords[idxUV+6] = u1;
	this.texCoords[idxUV+7] = v1;
	this.texCoords[idxUV+8] = u2;
	this.texCoords[idxUV+9] = v1;
	this.texCoords[idxUV+10] = u2;
	this.texCoords[idxUV+11] = v2;
	
	this.vertColors[idx+9] = bright;
	this.vertColors[idx+10] = strobe;
	this.vertColors[idx+11] = liftZ;
	this.vertColors[idx+12] = bright;
	this.vertColors[idx+13] = strobe;
	this.vertColors[idx+14] = liftZ;
	this.vertColors[idx+15] = bright;
	this.vertColors[idx+16] = strobe;
	this.vertColors[idx+17] = liftZ;
}

BuilderModel.prototype.addFloorTriangle = function(triangleId , x1, x2, x3, y1, y2, y3, z, nz, bright,strobe, uOff, vOff, segId, matTag, liftZ ){
	var idx = triangleId * 9;
	var idxUV = triangleId * 6;
	this.segmentIds[triangleId] = segId;
	this.matTagIds[triangleId] = matTag;
	
	this.verts[idx] = x1;
	this.verts[idx+1] = y1;
	this.verts[idx+2] = z;
	this.verts[idx+3] = x2;
	this.verts[idx+4] = y2;
	this.verts[idx+5] = z;
	this.verts[idx+6] = x3;
	this.verts[idx+7] = y3;
	this.verts[idx+8] = z ;
	
	this.norms[idx] = 0;
	this.norms[idx+1] = 0;
	this.norms[idx+2] = nz;
	this.norms[idx+3] = 0;
	this.norms[idx+4] = 0;
	this.norms[idx+5] = nz;
	this.norms[idx+6] = 0;
	this.norms[idx+7] = 0;
	this.norms[idx+8] = nz;
	
	this.texCoords[idxUV] = x1 + uOff;
	this.texCoords[idxUV+1] = y1 + vOff;
	this.texCoords[idxUV+2] = x2 + uOff;
	this.texCoords[idxUV+3] = y2 + vOff;
	this.texCoords[idxUV+4] = x3 + uOff ;
	this.texCoords[idxUV+5] = y3 + vOff;
	
	this.vertColors[idx] = bright;
	this.vertColors[idx+1] = strobe;
	this.vertColors[idx+2] = liftZ;
	this.vertColors[idx+3] = bright;
	this.vertColors[idx+4] = strobe;
	this.vertColors[idx+5] = liftZ;
	this.vertColors[idx+6] = bright;
	this.vertColors[idx+7] = strobe;
	this.vertColors[idx+8] = liftZ;
}
BuilderModel.prototype.replace_material = function(m1, m2){
	for(var i=0;i<this.segments.length;++i){
		var seg = this.segments[i];
		if(seg.ceilingMat == m1.matId){
			seg.ceilMat = m2.matId;
		}
		if(seg.floorMat == m1.matId){
			seg.floorMat = m2.matId;
		}
	}
	for(var i=0;i<this.linedefs.length;++i){
		var ld = this.linedefs[i];
		if(ld.bottomMat == m1.matId){
			ld.bottomMat = m2.matId;
		}
		if(ld.topMat == m1.matId){
			ld.topMat = m2.matId;
		}
		if(ld.middleMat == m1.matId){
			ld.middleMat = m2.matId;
		}
	}
	this.needs_update = true;
}

BuilderModel.prototype.triangulate_all = function(){
	for(var i=0;i<this.segments.length;++i){
		this.segments[i].build_triangulation();
	}
}
//arr: selected objects -> only update those segments that touch the manipulated objects
BuilderModel.prototype.update_selection_triangulation = function(arr){
	var segs = [];
	for(var i=0;i<arr.length;++i){
		if(arr[i].linkedObject && arr[i].linkedModel == this){
			if(arr[i].type == 0){ //vertex manipulator
				arr[i].linkedObject.collectSegments(segs)
			}else if(arr[i].type == 1){ //edge manipulator
				arr[i].linkedObject.p1.collectSegments(segs);
				arr[i].linkedObject.p2.collectSegments(segs);
			}
		}
	}
	for(var i=0;i<segs.length;++i){
		segs[i].build_triangulation();
		if(segs[i].helper){
			segs[i].reposition_helper();
		}
	}
	if(segs.length > 0){
		this.needs_update = true;
	}
}
//this is needed because selected edge helper positions don't update while vertices are being moved
//-> they're not allowed to, because they would interfere with the move operation
BuilderModel.prototype.update_selection_edge_helpers  =function(sel){
	for(var i=0;i<sel.length;++i){
		if(sel[i].linkedModel == this && sel[i].type==1){
			sel[i].linkedObject.refresh_helper();
		}
	}
}

BuilderModel.prototype.getNearHelper = function(x,y,r){
	for(var i=0;i<this.points.length;++i){
		if(Math.abs(x-this.points[i].helper.x)+Math.abs(y-this.points[i].helper.y)<r){
			return this.points[i].helper;
		}
	}
	return null;
}

BuilderModel.prototype.addPointHelper = function(p){
	var helper = Actor.EditorBuilderPoint(p, this, 0);
	Actors.push(helper);
	BuilderModel.ACTIVE_ACTOR.local_to_global(helper);
}
BuilderModel.prototype.addEdgeHelper = function(ld){
	var helper = Actor.EditorBuilderPoint(ld, this, 1);
	Actors.push(helper);
	BuilderModel.ACTIVE_ACTOR.local_to_global(helper);
}
BuilderModel.prototype.addSegmentHelper = function(seg){
	var helper = Actor.EditorBuilderPoint(seg, this, 2);
	Actors.push(helper);
	BuilderModel.ACTIVE_ACTOR.local_to_global(helper);
}
BuilderModel.prototype.getSaveData = function(){
	var pdata = [];
	var ldata = [];
	var sdata = [];
	for(var i=0;i<this.points.length;++i){
		this.points[i].temp_id = i;
		pdata.push(this.points[i].x);
		pdata.push(this.points[i].y);
	}
	for(var i=0;i<this.segments.length;++i){
		var seg = this.segments[i];
		seg.temp_id = i;
		var dat = [seg.id, seg.floor, seg.ceiling, 
		seg.floorMat, seg.ceilingMat, 
		seg.tex_offX,seg.tex_offY,seg.top_offX,seg.top_offY, 
		seg.brightness,seg.strobe_type,seg.strobe_strength, seg.tag,
		seg.floorLift, seg.ceilingLift, seg.secretId];
		sdata.push(dat);
	}
	for(var i=0;i<this.linedefs.length;++i){
		var ld = this.linedefs[i];
		var dat = [ld.p1.temp_id,ld.p2.temp_id, 
		ld.frontSeg?ld.frontSeg.temp_id:-1,
		ld.backSeg?ld.backSeg.temp_id:-1,
		ld.tag, ld.extra_bottomZ, ld.extra_topZ,
		ld.bottomMat,ld.topMat,ld.middleMat,
		ld.tex_offX,ld.tex_offY,ld.top_offX,ld.top_offY, ld.sound_blocker?1:0];
		
		ldata.push(dat);
	}
	return [pdata,ldata,sdata];
}

BuilderModel.prototype.loadSaveData = function(data){
	if(this == BuilderModel.ACTIVE){
		BuilderModel.removeHelpers(this);
	}
	var pdata = data[0];
	var ldata = data[1];
	var sdata = data[2];
	this.points = [];
	this.segments = [];
	this.linedefs = [];
	
	for(var i=0;i<pdata.length;i+=2){
		this.addPoint( pdata[i],pdata[i+1] );
	}
	for(var i=0;i<sdata.length;++i){
		var seg = this.addSegment();
		seg.id = sdata[i][0];
		seg.floor = sdata[i][1];
		seg.ceiling = sdata[i][2];
		seg.floorMat = sdata[i][3];
		seg.ceilingMat = sdata[i][4];
		seg.tex_offX = sdata[i][5];
		seg.tex_offY = sdata[i][6];
		seg.top_offX = sdata[i][7];
		seg.top_offY = sdata[i][8];
		seg.brightness = sdata[i][9];
		seg.strobe_type = sdata[i][10];
		seg.strobe_strength = sdata[i][11];
		seg.tag = sdata[i][12];
		seg.floorLift = sdata[i][13];
		seg.ceilingLift = sdata[i][14];
		seg.secretId = sdata[i][15];
	}
	for(var i=0;i<ldata.length;++i){
		var p1 = this.points[ldata[i][0]];
		var p2 = this.points[ldata[i][1]];
		var ld = this.addLinedef(p1,p2);
		if(ldata[i][2]>=0){
			ld.frontSeg = this.segments[ldata[i][2]];
			ld.frontSeg.linedefs.push(ld);
		}
		if(ldata[i][3]>=0){
			ld.backSeg = this.segments[ldata[i][3]];
			ld.backSeg.linedefs.push(ld);
		}
		ld.tag = ldata[i][4];
		ld.extra_bottomZ = ldata[i][5];
		ld.extra_topZ = ldata[i][6];
		ld.bottomMat = ldata[i][7];
		ld.topMat = ldata[i][8];
		ld.middleMat = ldata[i][9];
		ld.tex_offX = ldata[i][10];
		ld.tex_offY = ldata[i][11];
		ld.top_offX = ldata[i][12];
		ld.top_offY = ldata[i][13];
		ld.sound_blocker = ldata[i][14] ? 1 : 0 ;
	}
	this.triangulate_all();
	this.needs_update = true;
	if(this == BuilderModel.ACTIVE){
		BuilderModel.spawnHelpers(this);
	}
}

BuilderModel.ACTIVE = null;
BuilderModel.ACTIVE_ACTOR  = null;
BuilderModel.set_active = function(a){
	if(BuilderModel.ACTIVE && BuilderModel.ACTIVE_ACTOR != a){
		BuilderModel.removeHelpers(BuilderModel.ACTIVE);
	}
	BuilderModel.ACTIVE = a.model;
	BuilderModel.ACTIVE_ACTOR = a;
	BuilderModel.spawnHelpers(BuilderModel.ACTIVE);
}

Actor.BuilderActor = function(proto){
	var a = Actor.PlatformActor(proto, null);
	//var a = new Actor( proto.model , ShaderProgram.doomShader, proto.texture, null);
	a.proto = proto;
	a.hasHelperActor = true;
	a.selectable_editor = false;
	//a.use_material_ids = true;
	a.checkVisibility =  function(){
		this.model.actor_instance = this;
		if(this.model.needs_update){
			this.model.refresh();
			this.model.needs_update = false;
		}
		this.visible = true;
	}
	
	a.local_to_global = function(helper){
		var oldX = helper.x; var oldY = helper.y;
		var sn = Math.sin(-this.rotZ);
		var cs = Math.cos(-this.rotZ);
		helper.x = oldX*cs-oldY*sn;
		helper.y = oldX*sn+oldY*cs;
		
		helper.x += this.x;
		helper.y += this.y;
		helper.z += this.z;
		helper.rotZ += this.rotZ;
	}
	a.global_to_local = function(helper){
		helper.x -= this.x;
		helper.y -= this.y;
		helper.z -= this.z;
		
		var oldX = helper.x; var oldY = helper.y;
		var sn = Math.sin(this.rotZ);
		var cs = Math.cos(this.rotZ);
		helper.x = oldX*cs-oldY*sn;
		helper.y = oldX*sn+oldY*cs;
		helper.rotZ -= this.rotZ;
	}
	
	a.global_to_local_2d = function(helper){
		helper.x -= this.x;
		helper.y -= this.y;
		var oldX = helper.x; var oldY = helper.y;
		var sn = Math.sin(this.rotZ);
		var cs = Math.cos(this.rotZ);
		helper.x = oldX*cs-oldY*sn;
		helper.y = oldX*sn+oldY*cs;
	}
	
	a.getDoodadSaveData = function(){
		return [this.proto.id, fixed3(this.x),fixed3(this.y),fixed3(this.z),
		fixed3(this.rotX),fixed3(this.rotY),fixed3(this.rotZ),this.scale, 
		BuilderModel.list.indexOf(this.model)];
	}
	
	a.setDoodadLoadData = function(instData){
		this.rotX = instData[4];
		this.rotY = instData[5];
		this.rotZ = instData[6];
		this.scale = instData[7];
		this.model = BuilderModel.list[instData[8]];
		if(!this.model){
			console.warn("Missing BuilderModel mesh");
			this.model = Asset.model.cube;
		}
	}
 
	return a;
}

BuilderModel.spawnHelpers = function(m){
	for(var i=0; i<m.points.length;++i){
		m.addPointHelper(m.points[i]);
	}
	for(var i=0;i<m.linedefs.length;++i){
		m.addEdgeHelper(m.linedefs[i]);
	}
	for(var i=0;i<m.segments.length;++i){
		m.addSegmentHelper(m.segments[i]);
	}
}	
BuilderModel.removeHelpers = function(m){
	for(var i=Actors.length-1;i>=0;--i){
		if(Actors[i].linkedModel == m){
			Actors[i].remove();
		}
	}
}	