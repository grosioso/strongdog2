
Model3d.getMeshNetwork = function(){
	if(this.NavTriangles){
		//cleanup
		for(var i=0;i<this.NavTriangles.length;++i){
			var tri = this.NavTriangles[i];
			var sec = tri.getSector();
			if(sec){
				sec.unlink_triangle(tri);
			}
		}
	}
	
	this.NavTriangles = [];
	this.NavPartitions = [];
	var minX = 9999; var minY = 9999;
	var maxX = -9999; var maxY = -9999;
	
	if(this.isBuilderModel){
		var verts = this.verts;
	}else{
		var verts = this.vertsArray[0];
	}
	
	for(var i=0;i<this.numFaces;++i){
		if(this.isBuilderModel){
			var tri = new NavTriangle(i*3,i*3+1,i*3+2);
			//only works if segment id is equal to its position in segment array 
			tri.builderSegment = this.segments[ this.segmentIds[i] ];
			
			tri.color[0] = this.vertColors[i*9];
			tri.color[1] = this.vertColors[i*9+1];
			tri.color[2] = this.vertColors[i*9+2];
			for(var j=0;j<3;++j){
				tri.corners[j][0] = verts[tri.vertIds[j]*3];
				tri.corners[j][1] = verts[tri.vertIds[j]*3+1];
				tri.corners[j][2] = verts[tri.vertIds[j]*3+2];
				minX = Math.min(minX, tri.corners[j][0]);
				maxX = Math.max(maxX, tri.corners[j][0]);
				minY = Math.min(minY, tri.corners[j][1]);
				maxY = Math.max(maxY, tri.corners[j][1]);
			}
		}else{
			var tri = new NavTriangle(this.fverts[i][0]-1, this.fverts[i][1]-1, this.fverts[i][2]-1);
			tri.color[0] = this.vertColors[this.fcolors[i][0]-1][0];
			tri.color[1] = this.vertColors[this.fcolors[i][0]-1][1];
			tri.color[2] = this.vertColors[this.fcolors[i][0]-1][2];
			for(var j=0;j<3;++j){
				tri.corners[j][0] = verts[tri.vertIds[j]][0];
				tri.corners[j][1] = verts[tri.vertIds[j]][1];
				tri.corners[j][2] = verts[tri.vertIds[j]][2];
				minX = Math.min(minX, tri.corners[j][0]);
				maxX = Math.max(maxX, tri.corners[j][0]);
				minY = Math.min(minY, tri.corners[j][1]);
				maxY = Math.max(maxY, tri.corners[j][1]);
			}
		}
	
		tri.getPlaneEquation();
		tri.nodes = [];
		tri.calculate_bounding_sphere();
		tri.calculate_bounding_box();
		tri.makeCentralNode();

		//Build adjacent triangles
		/*var tri1 = tri;
		//could be optimized if done after partitioning
		for(var j=0;j<this.NavTriangles.length;++j){
			var tri2 = this.NavTriangles[j];
			var e = null;
			e = NavTriangle.getCommonEdge(tri1, tri2);
			if(e){
				//make nodes in the middle of common edges
				tri1.Adjacent.push(tri2);
				tri2.Adjacent.push(tri1);
				var e1 = tri1.corners[e[0]];
				var e2 = tri1.corners[e[1]];
			}
		}*/
		
		this.NavTriangles.push(tri);
	}
	
	//offset of 0.01 is needed because mesh coordinates could be integers
	this.partitionW = Math.ceil(maxX-minX + 0.01);
	this.partitionH = Math.ceil(maxY-minY + 0.01);
	this.navOffsetX = Math.ceil(minX);
	this.navOffsetY = Math.ceil(minY);
	
	//create a table of arrays, this will be the 2d LUT of triangles
	for(var i=0;i<this.partitionH;++i){
		this.NavPartitions[i] = [];
		for(var j=0;j<this.partitionW;++j){
			this.NavPartitions[i][j]=[];
		}
	}

	for(var k=0;k<this.NavTriangles.length;++k){
		var tri = this.NavTriangles[k];
		var aabb = tri.getAABB(); //[minX, minY, maxX, maxY]
		/*var overlap = 0.1;//TODO: find a better solution for this hack!
		aabb[0] -= overlap;
		aabb[1] -= overlap;
		aabb[2] += overlap;
		aabb[3] += overlap;*/
		aabb[0] = (aabb[0] - this.navOffsetX)>>0;
		aabb[1] = (aabb[1] - this.navOffsetY)>>0;
		aabb[2] = (aabb[2] - this.navOffsetX)>>0;
		aabb[3] = (aabb[3] - this.navOffsetY)>>0;
		for(var i=aabb[1];i<=aabb[3];++i){
			for(var j=aabb[0];j<=aabb[2];++j){
				this.NavPartitions[i][j].push(tri);
			}
		}		
	}
	
	//decode sectorId from matID, and get material flags
	if(this.mat_id_parts && this.mat_id_parts.length > 0){
		for(var i=0;i<this.mat_id_parts.length;++i){
			var pieceStart = this.mat_id_parts[i][1];
			var pieceLength = this.mat_id_parts[i][2];
			var sectorId = Math.floor(this.mat_id_parts[i][0] / 1024 );
			var matId = this.mat_id_parts[i][0]%1024;
			var ignore_raycast = Asset.MATERIALS[matId].ignore_raycast; //textures can be flagged as ignore_raycast
			
			for(var j=0;j<pieceLength;++j){
				var current_tri = this.NavTriangles[j + pieceStart];
				current_tri.sectorId = sectorId;
				current_tri.matId = matId;
				current_tri.ignore_raycast = ignore_raycast;
			
				var sec = current_tri.getSector();
				if(sec){
					sec.addTriangle(current_tri);
				}
			}
		}
	}
	//sound sector ids
	/*if(this.soundIds){
		for(var i=0;i<this.soundIds.length;++i){
			this.NavTriangles[i].soundId = this.soundIds[i];
		}
	}*/
}

Model3d.prototype.buffer_from_triangle_colors = function(){
	var buf = new Float32Array(this.NavTriangles.length * 9);
	for(var i=0;i<this.NavTriangles.length;++i){
		var tri = this.NavTriangles[i];
		var idx = i * 9;
		buf[idx  ] = buf[idx+3] = buf[idx + 6] = tri.color[0];
		buf[idx+1] = buf[idx+4] = buf[idx + 7] = tri.color[1];
		buf[idx+2] = buf[idx+5] = buf[idx + 8] = tri.color[2];
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers[3]);
	gl.bufferData(gl.ARRAY_BUFFER, buf ,gl.STATIC_DRAW);
}

function NavNode(x,y, tri1, tri2){
	this.tri1 = tri1;
	this.tri2 = tri2;
	this.x = x;
	this.y = y;
	this.Adjacent = [];
	this.AdjacentCost = [];
	this.g = this.h = this.f = 0;
	this.pnode = null;
	this.status = 0;
	this.getGlobalPoint = NavNode.getGlobalPoint;
}

NavNode.LevelStart = function(){
	this.Colliders = [];
}

NavNode.getGlobalPoint = function(ship){
	return NavNode.localToGlobal(ship, this.x, this.y);
}

NavNode.localToGlobal = function(ship, xx, yy){
	var snz = Math.sin(-ship.rotZ); var csz = Math.cos(-ship.rotZ);
	var xx_global = xx*csz - yy*snz;
	var yy_global = xx*snz + yy*csz;
	xx_global += ship.x;
	yy_global += ship.y;
	return new Point(xx_global, yy_global);
}

NavNode.globalToLocal = function(ship, xx, yy){
	xx -= ship.x;
	yy -= ship.y;
	var snz = Math.sin(ship.rotZ); var csz = Math.cos(ship.rotZ);
	var xx_local= xx*csz - yy*snz;
	var yy_local = xx*snz + yy*csz;
	return new Point(xx_local, yy_local);
}

NavNode.AddCollider = function(actor){
	if(!actor){return;}
	if(!actor.model.NavTriangles){
		actor.model.getMeshNetwork();
	}
	if(this.Colliders.indexOf(actor)<0){
		this.Colliders.push(actor);
	}
}

NavNode.Colliders = [];
NavNode.olist = [];
NavNode.clist = [];
NavNode.CloseNode = Pathfinder.CloseNode;
NavNode.OpenNode = Pathfinder.OpenNode;
NavNode.OpenGateNode = NavNode.OpenNode;
NavNode.CleanupLists = Pathfinder.CleanupLists;
NavNode.GetF = Pathfinder.GetF_Abstract;
NavNode.currentnode = null;
NavNode.getMinimal_F_AndSetAsLast = Pathfinder.getMinimal_F_AndSetAsLast

NavNode.Heuristic = function(curr, dest){
	var dx = Math.abs(curr.x - dest.x);var dy = Math.abs(curr.y - dest.y);
	return (10 * (dx+dy) - 6*Math.min(dx,dy)) *1.1;
}

NavNode.Pathfind_Between_Nodes = function(startnode,destnode,task){
	startnode.g = startnode.f = startnode.g = 0;
	this.currentnode=startnode;
	this.currentnode.pnode= this.currentnode;
	this.OpenNode(this.currentnode);
	while(this.currentnode!=destnode && this.olist.length>0){
		this.olist.pop();
		this.GetF(destnode,this.currentnode);/**Could be inlined for optimization**/
		this.CloseNode(this.currentnode);//Add to closed list
		if(this.olist.length > 0){
			this.currentnode = this.getMinimal_F_AndSetAsLast(this.olist);//Get node with best F value from olistAbstract
		}
	}
	
	//We might have found a path
	if(this.currentnode!=destnode){
		console.log('NO PATH NAVMESH');
	}else{
		task.Path.push(destnode);//build path for task
		while(this.currentnode!=startnode){
			this.currentnode=this.currentnode.pgate;
			task.Path.push(this.currentnode);
			//console.log(this.currentnode.x, this.currentnode.y);
		}
	}
	this.CleanupLists();
	return;
}

NavNode.getTriangleAt = function(mesh, x_local,y_local){
	var partY =  (y_local-mesh.navOffsetY)>>0 ;
	if(partY < 0 || partY >= mesh.NavPartitions.length){
		return null;
	}
	var partX = (x_local-mesh.navOffsetX)>>0;
	if(partX < 0 || partX >= mesh.NavPartitions[0].length){
		return null;
	}
	var partition = mesh.NavPartitions[partY][partX];
	for(var i=0;i<partition.length;++i){
		if(partition[i].containsPointZ(x_local,y_local)){
			return partition[i];
		}
	}
	return null;
}

NavNode.getTopTriangleAt = function(collider, mesh, x_local,y_local, z_limit ){
	var partY =  (y_local-mesh.navOffsetY)>>0 ;
	if(partY < 0 || partY >= mesh.NavPartitions.length){
		return null;
	}
	var partX = (x_local-mesh.navOffsetX)>>0;
	if(partX < 0 || partX >= mesh.NavPartitions[0].length){
		return null;
	}
	z_limit += collider.z;
	var partition = mesh.NavPartitions[partY][partX];
	var maxTri = null;
	var minTri = null;
	var minZ = 999;
	for(var i=0;i<partition.length;++i){
		var tri = partition[i];
		if(tri.plane[2] > 0.2 && //not wall or ceiling
		tri.containsPointZ(x_local,y_local)){
			var zz = tri.getZAt(x_local, y_local) + collider.z;
			if(minZ > zz){
				minZ = zz;
				minTri = tri;
			}
			if(zz <= z_limit && zz > NavNode.last_floor_z){
				NavNode.last_floor_z = zz;
				NavNode.last_collider = collider;
				NavNode.last_raycast_dist = z_limit-zz;
				maxTri = tri;
			}
		}
	}
	if(!maxTri && minTri){ //fallback to lowest triangle if we are under the floor
		maxTri = minTri;
		NavNode.last_floor_z = minZ;
		//NavNode.last_collider = collider;
		//NavNode.last_raycast_dist = z_limit-minZ;
	}
	return maxTri;
}

NavNode.getZAt_walkable= function(mesh, x_local, y_local){
	var tri = NavNode.getTriangleAt(mesh, x_local, y_local);
	if(tri && tri.walkable){
		return tri.getZAt(x_local, y_local);
	}
	return -999;
}
 

NavNode.getTriangleAt_global = function(ship, xx,yy){
	var p = NavNode.globalToLocal(ship,xx,yy);
	return NavNode.getTriangleAt(ship.collider, p.x, p.y);
}

NavNode.globalToLocal_3d = function(out, ship,v){
	out[0]=v[0]-(ship.x_last);
	out[1]=v[1]-(ship.y_last);
	out[2]=v[2]-(ship.z_last);
	vec3.rotate_collider(out,out,ship);
	return out;
}

NavNode.localToGlobal_3d = function(out, ship, v){
	vec3.rotate_collider_inverse(out,v,ship);
	out[0] += (ship.x_last);
	out[1] += (ship.y_last);
	out[2] += (ship.z_last);
	return out;
}

NavNode.get_floor_z = function(x,y,z){
	vec3.set(NavNode.ray_start, x,y,z+0.6);
	vec3.set(NavNode.ray_end , x,y,z);
	NavNode.last_floor_z = -99999;
	NavNode.last_raycast_dist = 99999;
	NavNode.last_collider = null;
	var collider; var tri = null;
	for(var i=0;i<this.Colliders.length;++i){
		collider = this.Colliders[i];
		if(collider.not_floor){
			continue;
		}
		
		if(collider.rotX_last||collider.rotY_last){
			var hit = NavNode.rayCast_ship(collider, collider.model,NavNode.ray_start,NavNode.ray_end);
			if(hit){//difference in z will be the same as the distance along the ray
				//if object is not scaled...
				var floorZ = NavNode.ray_start[2] - Math.sqrt(NavNode.last_raycast_dist);
				if(floorZ > NavNode.last_floor_z){
					NavNode.last_floor_z = floorZ;
					tri = NavNode.last_raycast_triangle;
				}				
			}
		}else{//optimized algorithm if z coordinates are not affected by rotation
			NavNode.globalToLocal_3d( NavNode.ray_start_local , collider, NavNode.ray_start);
			tri = this.getTopTriangleAt( collider, collider.model,NavNode.ray_start_local[0], NavNode.ray_start_local[1],NavNode.ray_start_local[2] ) || tri;
		}
	}
	NavNode.last_raycast_triangle = tri;
	return tri ? NavNode.last_floor_z : 0;
}
NavNode.get_ceiling_z = function(x,y,z){
	vec3.set(NavNode.ray_start, x,y,z-0.6);
	vec3.set(NavNode.ray_end , x,y,z);
	NavNode.last_floor_z = 99999;
	NavNode.last_raycast_dist = 99999;
	NavNode.last_collider = null;
	var collider; var tri = null;
	for(var i=0;i<this.Colliders.length;++i){
		collider = this.Colliders[i];
		if(collider.not_floor){
			continue;
		}
		var hit = NavNode.rayCast_ship(collider, collider.model,NavNode.ray_start,NavNode.ray_end);
		if(hit){//difference in z will be the same as the distance along the ray
			//if object is not scaled...
			var floorZ = NavNode.ray_start[2] - Math.sqrt(NavNode.last_raycast_dist);
			floorZ = hit[2];
			if(floorZ < NavNode.last_floor_z){
				NavNode.last_floor_z = floorZ;
				tri = NavNode.last_raycast_triangle;
			}				
		}
	}
	NavNode.last_raycast_triangle = tri;
	return tri ? NavNode.last_floor_z : 1;
}


NavNode.sphere_collision_all = function(p, radius){
	NavNode.last_raycast_dist = 99999;
	NavNode.last_coll_adjacent = null;
	var end = null; var collider;
	for(var i=0;i<this.Colliders.length;++i){
		collider = this.Colliders[i];
		end = this.sphere_collision_ship(collider, collider.model, p, radius) || end;
	}
	NavNode.last_raycast_dist = Math.sqrt(NavNode.last_raycast_dist);
	return end;
}

NavNode.rayCast_all = function(ray_start,ray_end){
	NavNode.last_raycast_dist = 99999;
	NavNode.last_raycast_triangle = null;
	var end = null; var collider;
	for(var i=0;i<this.Colliders.length;++i){
		collider = this.Colliders[i];
		end = this.rayCast_ship(collider, collider.model, ray_start, ray_end) || end;
	}
	NavNode.last_raycast_dist = Math.sqrt(NavNode.last_raycast_dist);
	return end;
}

NavNode.last_floor_z = -9999;
NavNode.last_raycast_dist = 9999;
NavNode.last_raycast_triangle = null;
NavNode.last_coll_edgeId = -1; //-1 if last coll was not with edge, but with face, otherwise 0/1/2
NavNode.ray_start = new Float32Array(3)
NavNode.ray_end = new Float32Array(3)
NavNode.ray_start_local = new Float32Array(3)
NavNode.ray_end_local = new Float32Array(3)
NavNode.ray_dir = new Float32Array(3)
NavNode.coll_center = new Float32Array(3)
NavNode.coll_center_local = new Float32Array(3)
NavNode.ray_result = new Float32Array(3)
NavNode.helperVec = new Float32Array(3)
NavNode.last_collider = null;

NavNode.rayCast_ship = function(collider, mesh, ray_start, ray_end){
	NavNode.globalToLocal_3d( NavNode.ray_start_local, collider, ray_start);
	NavNode.globalToLocal_3d( NavNode.ray_end_local , collider, ray_end);
	vec3.subtract(NavNode.ray_dir, NavNode.ray_end_local, NavNode.ray_start_local);
	var p = null;
	var tri = null;
	var hash = Math.random();
	
	var lgx = Math.floor(NavNode.ray_start_local[0]); //local grid X - not the same as partition x
	var lgy = Math.floor(NavNode.ray_start_local[1]); //local grid Y
	
	var x0 = NavNode.ray_start_local[0]-mesh.navOffsetX;
	var y0 = NavNode.ray_start_local[1]-mesh.navOffsetY;
	var x1 = NavNode.ray_end_local[0]-mesh.navOffsetX;
	var y1 = NavNode.ray_end_local[1]-mesh.navOffsetY;
	//Grid cells are 1.0 X 1.0.
	let xx = Math.floor(x0);
	let yy = Math.floor(y0);
	let diffX = x1 - x0;
	let diffY = y1 - y0;
	let stepX = Math.sign(diffX);
	let stepY = Math.sign(diffY);
	//Ray/Slope related maths.
	//Straight distance to the first vertical grid boundary.
	let xOffset = x1 > x0 ?(Math.ceil(x0) - x0) :(x0 - Math.floor(x0));
	//Straight distance to the first horizontal grid boundary.
	let yOffset = y1 > y0 ?(Math.ceil(y0) - y0) :(y0 - Math.floor(y0));
	//Angle of ray/slope.
	let angle = Math.atan2(-diffY, diffX);
	//NOTE: These can be divide by 0's, but JS just yields Infinity! :)
	//How far to move along the ray to cross the first vertical grid cell boundary.
	let tMaxX = xOffset / Math.cos(angle);
	//How far to move along the ray to cross the first horizontal grid cell boundary.
	let tMaxY = yOffset / Math.sin(angle);
	//How far to move along the ray to move horizontally 1 grid cell.
	let tDeltaX = 1.0 / Math.cos(angle);
	//How far to move along the ray to move vertically 1 grid cell.
	let tDeltaY = 1.0 / Math.sin(angle);
	let manhattanDistance = Math.abs(Math.floor(x1) - Math.floor(x0)) +
	Math.abs(Math.floor(y1) - Math.floor(y0));
	
	for (let t = 0; t <= manhattanDistance; ++t) {
		if(xx >= 0 && yy >= 0 && xx < mesh.partitionW && yy <mesh.partitionH){
			var parti = mesh.NavPartitions[yy][xx];
			for(var k=0;k<parti.length;++k){
				tri = parti[k];
				if(tri.last_check_hash == hash || tri.ignore_raycast){continue;}
				tri.last_check_hash = hash; //remember that this triangle was checked by this search
				var hit = tri.rayCast(NavNode.ray_result , NavNode.ray_start_local , NavNode.ray_dir);
				if(hit){
					//with a naive partition check a triangle hit can happen in a
					//partition that comes before the partition of the expected hit
					//solution: make sure the hit happened in current partition
					if(hit[0]>=lgx&&hit[0]<=lgx+1&&hit[1]>=lgy&&hit[1]<=lgy+1){
						var dist = vec3.squaredDistance( NavNode.ray_start_local , hit);
						if(dist < NavNode.last_raycast_dist){
							if(!p){
								p = new Float32Array(3)
							}
							vec3.copy(p, NavNode.ray_result);
							NavNode.last_raycast_triangle = tri;
							NavNode.last_raycast_dist = dist;
						}
					}else{
						//set it to something else than hash, so that in can be checked again in another partition
						tri.last_check_hash =0; 
					}
				}
			}
		}
		if(p){ //end of partition. If we have a hit, we can exit
			p = NavNode.localToGlobal_3d(p, collider, p);
			NavNode.last_collider = collider;
			return p;
		}
		
		//Only move in either X or Y coordinates, not both.
		if (Math.abs(tMaxX) < Math.abs(tMaxY)) {
			tMaxX += tDeltaX;
			xx += stepX;
			lgx += stepX;
		} else {
			tMaxY += tDeltaY;
			yy += stepY;
			lgy += stepY;
		}
	}
	return null;
}

NavNode.sphere_collision_ship = function(collider, mesh, coll_center , radius){
	NavNode.globalToLocal_3d( NavNode.coll_center_local , collider, coll_center);
	var p = null;
	var tri = null;
	//offset by 0.5 to search in 2x2, no offset needed for 3x3
	var partX = (NavNode.coll_center_local[0] - mesh.navOffsetX - 0.5) >> 0;
	var partY = (NavNode.coll_center_local[1] - mesh.navOffsetY - 0.5) >> 0;
	var hash = Math.random(); //triangles in this search cycle store a uniqe hash
	//so that the same triangle won't be checked in multiple partitions
	for(var i=0;i<2;++i){ //search partitions in a 2x2 area
		if(partY + i >= 0 && partY + i < mesh.partitionH){
			for(var j=0;j<2;++j){
				if(partX + j >= 0 && partX + j < mesh.partitionW){
					var parti = mesh.NavPartitions[partY + i][partX + j];
					for(var k=0;k<parti.length;++k){
						tri = parti[k];
						if(tri.last_check_hash == hash){
							continue; //already checked in another partition
						}
						tri.last_check_hash = hash;
						var hit = tri.sphere_collision( NavNode.coll_center_local , radius);
						if(hit){
							if(NavTriangle.last_coll_dist < NavNode.last_raycast_dist){
								if(!p){ p = new Float32Array(3) }
								vec3.copy(p, hit );
								NavNode.last_raycast_triangle = tri;
								NavNode.last_raycast_dist = NavTriangle.last_coll_dist;
								NavNode.last_coll_edgeId = NavTriangle.last_coll_edgeId;
							}
						}
					}
				}
			}
		}
	}
	if(p){
		p = NavNode.localToGlobal_3d(p,collider,p);
		NavNode.last_collider = collider;
	}
	return p;
}

NavNode.hitScan_unit = function(ray_start,ray_end,shooter){
	//first check collision with map geometry, and only do unit search to that dist
	var hitPos = NavNode.rayCast_all(ray_start,ray_end);
	var scan_dist = 9999;
	
	if(hitPos){//only do unit search up to the hit surface
		scan_dist = Utils.distance_array3d(ray_start, hitPos);
		ray_end[0] = hitPos[0];
		ray_end[1] = hitPos[1];
		ray_end[2] = hitPos[2];
		NavNode.ray_result = hitPos;
	}else{ //do unit search to infinity
		ray_end[0] += (ray_end[0]-ray_start[0]) * 999;
		ray_end[1] += (ray_end[1]-ray_start[1]) * 999;
		ray_end[2] += (ray_end[2]-ray_start[2]) * 999;
	}

	//traverse the nodemap to find units along the ray
	var x0 = ray_start[0]>>0;
	var y0 = ray_start[1]>>0;
	var x1 = ray_end[0]>>0;
	var y1 = ray_end[1]>>0;
	var dx = Math.abs(x1 - x0);
	var dy = Math.abs(y1 - y0);
	var xx = x0;
	var yy = y0;
	var n = 1 + dx + dy;//number of nodes to be intersected
	var x_inc = (x1 > x0) ?1 : -1;
	var y_inc = (y1 > y0) ? 1 : -1;
	var error = dx - dy;//difference between current node center and actual line position
	dx *=2;
	dy *=2;
	
	//unit search is done in 3 lanes (because of coll radius), but the offset dir depends on the ray dir
	//if the line is mostly vertical, the offset is horizontal and vice-versa
	var offset_x = (Math.abs(dx) < Math.abs(dy))?1:0; //is the line mostly vertical?
	var offset_y = 1 - offset_x;
	
	for (;n>0 && xx>0 && xx<Pathfinder.mapW-1 && yy>0 && yy<Pathfinder.mapH-1 ;--n){
		//do search in 3 rows because of partitioning
		for(var i=-1;i<2;++i){
			var nod = Pathfinder.map[yy + i*offset_y][xx + i*offset_x];
			for(var u=nod.firstColl;u;u=u.nextColl){
				if(u != shooter && u.alive){
					//use cylinder center for closest point search, might be more precise?
					if(u.on_ceiling){
						vec3.set(NavNode.coll_center, u.x, u.y, u.z - u.cylinder_height*0.5);
					}else{
						vec3.set(NavNode.coll_center, u.x, u.y, u.z + u.cylinder_height*0.5);
					}
					
					//get the point on the ray that is closest to the unit
					Utils.closest_point_to_line( NavNode.coll_center , NavNode.coll_center , ray_start, ray_end);
					if(Utils.distance_xxyy(u.x, NavNode.coll_center[0], u.y, NavNode.coll_center[1]) < u.hardRadius
					
					&& (u.on_ceiling && NavNode.coll_center[2]<u.z && NavNode.coll_center[2] > u.z-u.cylinder_height
						|| !u.on_ceiling && NavNode.coll_center[2]>u.z && NavNode.coll_center[2] < u.z+u.cylinder_height )//cylinder Z hit test
					
					&& scan_dist > Utils.distance_array3d(NavNode.coll_center, ray_start) //not behind an obstacle
					){
						return u;
					}
				}
			}
		}
		
		if (error > 0){
			xx += x_inc;
			error -= dy;
		}else{
			yy += y_inc;
			error += dx;
		}
	}

	return null;
}

function NavTriangle(p1Id, p2Id, p3Id){
	this.vertIds = [p1Id,p2Id,p3Id];
	this.corners = [ new Float32Array(3),  new Float32Array(3), new Float32Array(3)];
	this.nodes = [];
	this.Adjacent = [];
	//params of ax+by+cz+d = 0;
	this.plane = new Float32Array(4);
	this.walkable = false;
	this.actor = null;
	this.center = new Float32Array(3);
	this.color = new Float32Array(3);
	this.texture = null;
	this.sphere_radius = 1;
	this.sectorId = 0;
	this.builderSegment = null;
	this.matId = 0;
	this.soundId = 0;
	this.ignore_raycast = false;
	this.last_check_hash = 0;
	
	this.bound_x_min = 0;
	this.bound_x_max = 0;
	this.bound_y_min = 0;
	this.bound_y_max = 0;
	this.bound_z_min = 0;
	this.bound_z_max = 0;
}
 
NavTriangle.prototype.getZAt = function(xx,yy){
	//solve plane equation for z
	var a = this.plane[0];
	var b = this.plane[1];
	var c = this.plane[2];
	var d = this.plane[3];
	return -(a*xx+b*yy+d)/c;
}

NavTriangle.prototype.containsPointZ = function(xx,yy){
	var c = this.corners;
	return Utils.point_in_triangle(xx,yy,c[0][0], c[1][0], c[2][0], c[0][1], c[1][1], c[2][1]);
}

NavTriangle.prototype.rayCast = function(out, ray_origin, ray_vector){
	var dirDotPlane = vec3.dot(ray_vector,  this.plane );
	//solution of a*x+ b*y+c*d, to check if origin is behind the triangle
	var orig_plane_pos = vec3.dot(ray_origin, this.plane) + this.plane[3];
	if(dirDotPlane < 0 && orig_plane_pos > 0){ //filter out triangles that face away or parallel or behind ray start
		//t is a factor where t*ray is the plane intersection (if ray length were 1, t would be intersection distance)
		var t = -(vec3.dot(ray_origin, this.plane )+this.plane[3])/dirDotPlane;
		out[0] = ray_origin[0]+t*ray_vector[0];
		out[1] = ray_origin[1]+t*ray_vector[1];
		out[2] = ray_origin[2]+t*ray_vector[2];
		if(Utils.point_in_triangle_3d(out, this.corners[0], this.corners[1], this.corners[2])){
			return out;
		}
	}
	return null;
}

NavTriangle.prototype.makeCentralNode = function(){
	this.nodes.push( new NavNode(this.center[0], this.center[1], this, null));
}
//get axis aligned bounding box, returns minCorner x,y, maxCorner x,y
NavTriangle.prototype.getAABB  = function(){
	var maxX = -9999;
	var maxY = -9999;
	var minX = 9999;
	var minY = 9999;
	for(var i=0;i<this.corners.length;++i){
		minX = Math.min(minX, this.corners[i][0]);
		maxX = Math.max(maxX, this.corners[i][0]);
		minY = Math.min(minY, this.corners[i][1]);
		maxY = Math.max(maxY, this.corners[i][1]);
	}
	return [minX,minY,maxX,maxY];
}

NavTriangle.last_common_edge = new Int32Array(3);
//2 triangles have 1 common edge if they have 2 common vetices
NavTriangle.getCommonEdge = function(t1, t2){
	t1 = t1.vertIds; t2 = t2.vertIds;
	var commonVerts = 0;
	for(var i=0;i<3;++i){
		if(t1[i] == t2[0] || t1[i] == t2[1] || t1[i] == t2[2]){
			NavTriangle.last_common_edge[commonVerts] = i;
			commonVerts ++;
		}
	}
	if(commonVerts == 2){
		return NavTriangle.last_common_edge;
	}
	return null;
}
//return the adjacent triangle that has the edge consiting of this.vertIds[v1] and this.vertIds[v2]
NavTriangle.prototype.getAdjacentByVertId = function(v1, v2){
	var id1 = this.vertIds[v1];
	for(var i=0;i<this.Adjacent.length;++i){
		var adj = this.Adjacent[i].vertIds;
		if(adj[0] == id1 || adj[1] == id1 || adj[2] == id1 ){
			var id2 = this.vertIds[v2];
			if(adj[0] == id2 || adj[1] == id2 || adj[2] == id2){
				return this.Adjacent[i];
			}
		}
	}
	return null;
}
NavTriangle.prototype.getAdjacentByEdgeId = function(id){
	switch(id){
		case 0: return this.getAdjacentByVertId(0,1);
		case 1: return this.getAdjacentByVertId(1,2);
		default: return this.getAdjacentByVertId(0,2);
	}
}
NavTriangle.prototype.getPlaneEquation = function(){
	//get plane equation
	var x1 = this.corners[0][0];
	var x2 = this.corners[1][0];
	var x3 = this.corners[2][0];
	var y1 = this.corners[0][1];
	var y2 = this.corners[1][1];
	var y3 = this.corners[2][1];
	var z1 = this.corners[0][2];
	var z2 = this.corners[1][2];
	var z3 = this.corners[2][2];
	var a1 = x2 - x1; 
	var b1 = y2 - y1; 
	var c1 = z2 - z1; 
	var a2 = x3 - x1; 
	var b2 = y3 - y1; 
	var c2 = z3 - z1;
	var a = b1 * c2 - b2 * c1; 
	var b = a2 * c1 - a1 * c2; 
	var c = a1 * b2 - b1 * a2; 
	//normalize
	var denum = Utils.length_xyz(a,b,c);
	a/= denum;
	b/= denum;
	c/= denum;
	var d = (- a * x1 - b * y1 - c * z1); 
	this.plane[0] = a;
	this.plane[1] = b;
	this.plane[2] = c;
	this.plane[3] = d;
}

//Not minimal, but easy to calculate
NavTriangle.prototype.calculate_bounding_sphere = function(){
	 // Calculate relative distances
	var c = this.corners;
	
	this.center[0] = 0.3333*(c[0][0]+c[1][0]+c[2][0]);
	this.center[1] = 0.3333*(c[0][1]+c[1][1]+c[2][1]);
	this.center[2] = 0.3333*(c[0][2]+c[1][2]+c[2][2]);
	var d1 = Utils.distance_array3d(this.center, c[0]);
	var d2 = Utils.distance_array3d(this.center, c[1]);
	var d3 = Utils.distance_array3d(this.center, c[2]);
	
	this.sphere_radius = Math.max(d1,Math.max(d2,d3));
}
NavTriangle.prototype.calculate_bounding_box = function(){
	this.bound_x_min = Math.min(Math.min(this.corners[0][0],this.corners[1][0]),this.corners[2][0]);
	this.bound_x_max = Math.max(Math.max(this.corners[0][0],this.corners[1][0]),this.corners[2][0]);
	this.bound_y_min = Math.min(Math.min(this.corners[0][1],this.corners[1][1]),this.corners[2][1]);
	this.bound_y_max = Math.max(Math.max(this.corners[0][1],this.corners[1][1]),this.corners[2][1]);
	this.bound_z_min = Math.min(Math.min(this.corners[0][2],this.corners[1][2]),this.corners[2][2]);
	this.bound_z_max = Math.max(Math.max(this.corners[0][2],this.corners[1][2]),this.corners[2][2]);
}

NavTriangle.prototype.bounding_box_sphere_coll_check = function(p,rad){
	//start check with z axis to filter out floor and ceiling quickly
	return p[2] <= this.bound_z_max + rad && p[2] >= this.bound_z_min - rad
	&& p[1] <= this.bound_y_max + rad && p[1] >= this.bound_y_min - rad
	&& p[0] <= this.bound_x_max + rad && p[0] >= this.bound_x_min - rad
}

NavTriangle.prototype.getSector = function(){
	return NavSector.List[this.sectorId] || NavSector.List[0];
}
/*NavTriangle.prototype.getSoundSector = function(){
	return SoundSector.List[this.soundId] || SoundSector.List[0];
}*/
 
NavTriangle.prototype.get_angle_2d = function(){
	return Math.atan2(this.plane[1],this.plane[0]);
}

NavTriangle.result = new Float32Array(3);
NavTriangle.result2 = new Float32Array(3);
NavTriangle.result3 = new Float32Array(3);
NavTriangle.last_coll_dist = 0;
NavTriangle.last_coll_edgeId = -1; //-1 if last checked coll was not with edge, but with face, otherwise 0/1/2

NavTriangle.prototype.sphere_collision = function(p, rad){
	//pre-search using axis-aligned bounding box
	if(this.bounding_box_sphere_coll_check(p,rad) == false){
		return null;
	}
	
	var rad_squared = rad*rad;
	Utils.closest_point_to_plane( NavTriangle.result , p , this.plane);
	
	/*if(	this.plane[0]*(p[0]-NavTriangle.result[0]) + 
		this.plane[1]*(p[1]-NavTriangle.result[1]) + 
		this.plane[2]*(p[2]-NavTriangle.result[2]) < 0){
		return null; //use dot product to check if triangle is facing away from player
		//this would lead to worse precision, sphere radii should be twice as large...
	}*/
	
	var dist = vec3.squaredDistance(NavTriangle.result , p);
	if(dist < rad_squared){
		if(Utils.point_in_triangle_3d(NavTriangle.result, this.corners[0],this.corners[1],this.corners[2])){
			NavTriangle.last_coll_dist =  dist ;
			NavTriangle.last_coll_edgeId = -1;
			return NavTriangle.result;
		}
	}
	
	//(disabled) HACK! temprorary. only check wall triangle edges
	//check triangle edge hits
	//if(Math.abs( this.plane[2] < 0.9 )){
		Utils.closest_point_to_line(NavTriangle.result , p , this.corners[0],this.corners[1]);
		Utils.closest_point_to_line(NavTriangle.result2 , p , this.corners[1],this.corners[2]);
		Utils.closest_point_to_line(NavTriangle.result3 , p , this.corners[0],this.corners[2]);
		var dist1 = vec3.squaredDistance(NavTriangle.result , p);
		var dist2 = vec3.squaredDistance(NavTriangle.result2 , p);
		var dist3 = vec3.squaredDistance(NavTriangle.result3 , p);
		var closest = NavTriangle.result;
		dist = dist1;
		
		if(dist2 < dist1){ //get closest edge hit
			closest = NavTriangle.result2; dist = dist2;
			if(dist3 < dist2){
				closest = NavTriangle.result3; dist = dist3;
			}
			NavTriangle.last_coll_edgeId = 1;
		}else if(dist3<dist1){
			closest = NavTriangle.result3; dist = dist3;
			NavTriangle.last_coll_edgeId = 2;
		}else{
			NavTriangle.last_coll_edgeId = 0;
		}
		
		//might be able to optimize this
		if(dist < rad_squared && Utils.point_in_triangle_3d(closest , this.corners[0],this.corners[1],this.corners[2])){
			NavTriangle.last_coll_dist =  dist ;
			return closest;
		}
	//}		
	
	
	return null;
}

NavTriangle.prototype.PropagateSound = function(){
	if(this.builderSegment){
		console.log(this.builderSegment.id);
		this.builderSegment.propagate_sound_recursive(1);
	}
}

NavTriangle.prototype.SoundCheck = function(){
	return (this.builderSegment && Gamestats.mapTime - this.builderSegment.last_sound_time < 30);
}

NavTriangle.prototype.get_floor_damage = function(){
	return Asset.MATERIALS[this.matId].floor_damage;
}

// a sector of triangles, across all colliders
//used for sound propagation
/*function SoundSector(id){
	this.id = id;
	//a sound starts out with a given volume
	//every sector decreases it by its sound_occlusion value
	//sector 0 has an occlusion of 9999
	this.sound_occlusion = 1;
	this.last_sound_time = 0;
	this.f = 0; //used for pathfinding/sound propagation
	this.status = 0;//used for pathfinding/sound propagation
	this.pnode = null;//used for pathfinding/sound propagation
	this.Adjacent = [];
}
SoundSector.List = [];
SoundSector.LevelStart = function(){
	this.List = [];
	for(var i=0;i<50;++i){
		this.List[i] = new SoundSector(i);
	}
	this.List[0].sound_occlusion = 9999;
}
SoundSector.Build_Adjacency = function(){
	for(var i=0;i<NavNode.Colliders.length;++i){
		var mesh = NavNode.Colliders[i].model;
		for(var j=0;j<mesh.NavTriangles.length;++j){
			var tri = mesh.NavTriangles[j];
			var mySec = this.List[tri.soundId];
			if(!mySec){continue;}
			
			for(var k=0;k<tri.Adjacent.length;++k){
				var otherSec =  tri.Adjacent[k].getSoundSector();
				if(otherSec && otherSec != mySec && mySec.Adjacent.indexOf(otherSec)<0){
					mySec.Adjacent.push(otherSec);
				}
			}
		}
	}
}
//uses Dijkstra to propagate sound along the path of least occlusion
SoundSector.PropagateSound = function(startTriangle, volume){
	var currentSec =  startTriangle.getSoundSector();
	currentSec.f = currentSec.sound_occlusion;
	currentSec.pnode= currentSec;
	currentSec.last_sound_time = Gamestats.mapTime;
	NavNode.OpenNode(currentSec);
	while(NavNode.olist.length>0 && currentSec.f <= volume){
		NavNode.olist.pop();
		currentSec.last_sound_time = Gamestats.mapTime;
		for(var i=0;i<currentSec.Adjacent.length;++i){
			var sec = currentSec.Adjacent[i];
			if(sec.status != 2){//node is not closed
			   if(sec.status != 1){//node is untouched
					sec.f = currentSec.f + sec.sound_occlusion;
					sec.pnode = currentSec;
					NavNode.OpenNode( sec );
				}else{//node is open
					if(sec.f > currentSec.f + sec.sound_occlusion && sec.pnode != currentSec){//Get the shortest path of the two
						sec.f = currentSec.f + sec.sound_occlusion;
						sec.pnode = currentSec;
					}
				}
			}
		}
		
		NavNode.CloseNode( currentSec );//Add to closed list
		if(NavNode.olist.length > 0){
			currentSec = NavNode.getMinimal_F_AndSetAsLast(NavNode.olist);//Get node with best F value from olistAbstract
		}
		console.log(currentSec.id, currentSec.f);
	}
	NavNode.CleanupLists();
	return;
}*/
