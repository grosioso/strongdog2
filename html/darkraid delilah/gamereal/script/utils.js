function Point(_x, _y){
	this.x = _x;
	this.y = _y;
	
}
Point.equals = function(point, otherpoint){
	return (point.x == otherpoint.x && point.y == otherpoint.y);
}
Point.distance_squared = function(point, otherpoint){
	return ((point.x-otherpoint.x) * (point.x-otherpoint.x) + (point.y-otherpoint.y) * (point.y-otherpoint.y));
}
Point.distance = function(point, otherpoint){
	return Math.sqrt((point.x-otherpoint.x) * (point.x-otherpoint.x) + (point.y-otherpoint.y) * (point.y-otherpoint.y));
}
function Point(_x, _y){
	this.x = _x;
	this.y = _y;
	
}
function RoadPoint(_x, _y, _fillet, _width){
	this.x = _x;
	this.y = _y;
	this.fillet = _fillet;
	this.width = _width;
}

function Vector(_x, _y, _z){
	this.x = _x;
	this.y = _y;
	this.z = _z;
	/*this.rotate90= function(dir){
		var helper;
		if(dir == 0){//ccw
			helper = this.x;
			this.x =  - this.y;
			this.y = helper;
		}else{//cw
			helper = this.x;
			this.x = this.y;
			this.y = -1*helper;	
		}
	}*/
}

function fix(number){
	return (number*4096<<0)/4096;
}

function fixed1(number){
	return Math.floor(number*10)/10;
}
function fixed2(number){
	return Math.floor(number*100)/100;
}
function fixed3(number){
	return Math.floor(number*1000)/1000;
}

Vector.reset = function(vec){
		vec.x = vec.y = vec.z = 0;
	}
Vector.translate = function(vec,_x, _y){
		vec.x += _x;
		vec.y += _y;
	}
Vector.translate_3d = function(vec,_x, _y, _z){
		vec.x += _x;
		vec.y += _y;
		vec.z += _z;
	}
Vector.rotate= function(vec, rads){
		var helper;
		var sn = Math.sin(rads);
		var cn = Math.cos(rads);
		helper = vec.x;
		vec.x = helper*cn - vec.y*sn;
		vec.y = helper*sn + vec.y*cn;
	}
Vector.scale = function(vec, scalar){
	vec.x *=scalar;
	vec.y *= scalar;
	vec.z *= scalar;
}
Vector.add = function(out,v1,v2){
	out.x = v1.x + v2.x;
	out.y = v1.y + v2.y;
	out.z = v1.z + v2.z;
}
Vector.subtract = function(out,v1,v2){
	out.x = v1.x - v2.x;
	out.y = v1.y - v2.y;
	out.z = v1.z - v2.z;
}
Vector.copy = function(out,v){
	out.x = v.x;
	out.y = v.y;
	out.z = v.z;
}
Vector.dot = function(v1,v2){
	return v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
}
Vector.clampMin = function(v, clamp){
	v.x = Math.min(clamp,v.x);
	v.y = Math.min(clamp,v.y);
	v.z = Math.min(clamp,v.z);
}
Vector.fix = function(v){
	v.x = (v.x*4096<<0)/4096;
	v.y = (v.y*4096<<0)/4096;
	v.z = (v.z*4096<<0)/4096;
}
Vector.distance = function(v1,v2){
	return Math.sqrt((v1.x-v2.x)*(v1.x-v2.x) + (v1.y-v2.y)*(v1.y-v2.y));
}
Vector.distance_squared = function(v1,v2){
	return  (v1.x-v2.x)*(v1.x-v2.x) + (v1.y-v2.y)*(v1.y-v2.y) + (v1.z-v2.z)*(v1.z-v2.z);
}

function Unit_Distance(u1, u2){
	return Math.sqrt((u1.x-u2.x)*(u1.x-u2.x) + (u1.y-u2.y)*(u1.y-u2.y));
}
function Unit_Distance_Squared(u1, u2){
	return  (u1.x-u2.x)*(u1.x-u2.x) + (u1.y-u2.y)*(u1.y-u2.y) ;
}

function Unit_Distance_3d(u1, u2){
	return Math.sqrt((u1.x-u2.x)*(u1.x-u2.x) + (u1.y-u2.y)*(u1.y-u2.y) + (u1.z-u2.z)*(u1.z-u2.z));
}
function Unit_Point_Distance(u, p){
	return Math.sqrt((u.x-p.x)*(u.x-p.x) + (u.y-p.y)*(u.y-p.y));
}
function Actor_Point_Distance(a, p){
	return Math.sqrt((a.x-p.x)*(a.x-p.x) + (a.y-p.y)*(a.y-p.y));
}
function drawLine(x1,y1,x2,y2){
	var dist = 8*Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
	if(dist > 100){dist = 100;}
	for(var j=0;j<dist;++j){
		ctx.fillRect((x1*j + x2*(dist-j))/dist*16, (y1*j + y2*(dist-j))/dist*16, 2,2);
	}
}


var Utils = new Object();
Utils.DO_NOTHING = function(){};
Utils.FALSE = function(){return false;}
Utils.TRUE = function(){return true;}
Utils.EMPTY_STRING = "";
Utils.normal_flat = [0,0,1];
//a plane can be defined by 4 values (ax + by + cz + d = 0)
//you can get the values from the cross product of 2 vectors
Utils.distance_xxyy = function(x1, x2, y1, y2){
	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}
Utils.distance_xxyyzz = function(x1, x2, y1, y2, z1, z2){
	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) + (z1-z2)*(z1-z2));
}
Utils.length_xyz = function(x,y,z){
	return Math.sqrt(x*x+y*y+z*z);
}
Utils.distance_array3d = function(a1,a2){
	return Math.sqrt((a1[0]-a2[0])*(a1[0]-a2[0]) + (a1[1]-a2[1])*(a1[1]-a2[1]) + (a1[2]-a2[2])*(a1[2]-a2[2]));
}
Utils.distance_array3d_squared = function(a1,a2){
	return (a1[0]-a2[0])*(a1[0]-a2[0]) + (a1[1]-a2[1])*(a1[1]-a2[1]) + (a1[2]-a2[2])*(a1[2]-a2[2]);
}
Utils.distance_squared_xxyy = function(x1,x2,y1,y2){
	return ((x1-x2) * (x1-x2) + (y1-y2) * (y1-y2));
}

Utils.point_between_points_at_max_distance = function(p1, p2, dist){
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;
	var len = Math.sqrt(dx*dx + dy*dy);
	if(len > dist){
		return new Point(p1.x + dx*dist/len, p1.y + dy*dist/len);
	}else{
		return new Point(p2.x, p2.y);
	}
}
Utils.point_between_points_at_max_distance_xxyy = function(x1, x2, y1, y2, dist){
	var dx = x2 - x1;
	var dy = y2 - y1;
	var len = Math.sqrt(dx*dx + dy*dy);
	if(len > dist){
		return new Point(x1 + dx*dist/len, y1 + dy*dist/len);
	}else{
		return new Point(x2, y2);
	}
}

Utils.angle_between_points = function(p1,p2){
	return Math.atan2(p1.x-p2.x, p1.y-p2.y);
}

Utils.planeFromPoints = function(p1,p2,p3){
	var v1 = []; var v2 = []; var vn = [];
	vec3.subtract(v1,p2,p1);
	vec3.subtract(v2,p3,p1);
	vec3.cross(vn, v1, v2);
	vec3.normalize(vn,vn);
	var d = -1 * (vn[0]*p1[0] + vn[1]*p1[1] + vn[2]*p1[2]);
	return[vn[0],vn[1],vn[2],d];
}

//M in rect iff (if and only if)
//(0<AM⋅AB<AB⋅AB)&&(0<AM⋅AD<AD⋅AD)
Utils.pointInRect = function(p, r1,r2,r3){
}

function check_If_Bounds_In_Frustum_Plane(_plane, minPoint, maxPoint){
	if(_plane[0]*maxPoint[0]  + _plane[1]*maxPoint[1] + _plane[2]*maxPoint[2] + _plane[3] > 0){
		return true;
	}
	if(_plane[0]*minPoint[0]  + _plane[1]*maxPoint[1] + _plane[2]*maxPoint[2] + _plane[3] > 0){
		return true;
	}
	if(_plane[0]*maxPoint[0]  + _plane[1]*minPoint[1] + _plane[2]*maxPoint[2] + _plane[3] > 0){
		return true;
	}
	if(_plane[0]*maxPoint[0]  + _plane[1]*maxPoint[1] + _plane[2]*minPoint[2] + _plane[3] > 0){
		return true;
	}
	if(_plane[0]*minPoint[0]  + _plane[1]*minPoint[1] + _plane[2]*maxPoint[2] + _plane[3] > 0){
		return true;
	}
	if(_plane[0]*minPoint[0]  + _plane[1]*maxPoint[1] + _plane[2]*minPoint[2] + _plane[3] > 0){
		return true;
	}
	if(_plane[0]*maxPoint[0]  + _plane[1]*minPoint[1] + _plane[2]*minPoint[2] + _plane[3] > 0){
		return true;
	}
	if(_plane[0]*minPoint[0]  + _plane[1]*minPoint[1] + _plane[2]*minPoint[2] + _plane[3] > 0){
		return true;
	}
	return false;
}

Utils.frustum_Cull_AABB = function(minPoint, maxPoint, _frustum_planes_array){
		for(var i=0;i<6;++i){
			if(check_If_Bounds_In_Frustum_Plane(_frustum_planes_array[i],minPoint, maxPoint) == false){
				return false;
			}
		}

		return true;
}

Utils.frustum_Cull_Sphere = function(centerPoint, radius, _frustum_planes_array){
	for(var i=0;i<6;++i){
		var p = _frustum_planes_array[i];
		if(
		p[0]*centerPoint[0]+ p[1]*centerPoint[1] + p[2]*centerPoint[2] + p[3] < -radius){
			return false;
		}
	}
	return true;
}

Utils.returnArray = new Float32Array(8);

//lerp where t is between 0 and 1
Utils.LERP1  = function(t, x1,x2){
	return x1 + (x2-x1)*t;
}

Utils.LERP3  = function(t, x1,x2){
	return [x1[0] + (x2[0]-x1[0])*t, x1[1] + (x2[1]-x1[1])*t, x1[2] + (x2[2]-x1[2])*t];
}


Utils.Cos_Interp1  = function(t, x1,x2){
	var mu2 = (1-Math.cos(t*3.1415))/2;
   return(x1*(1-mu2)+x2*mu2);
}

//bilinear interpolation over a 1x1 sized square
Utils.Interpolate_Bilinear_1x1 = function(x,y, q11, q12, q21, q22){
	return (1-x)*(1-y)*q11 + (x)*(1-y)*q12 + (1-x)*(y)*q21 + (x)*(y)*q22;
}
Utils.Fade = function(x){
	var x2 = x*x;
	var x3 = x2*x;
	var x4 = x2*x2;
	return x = 6*x4*x - 15*x4 + 10*x3;
}
Utils.Interpolate_Fade_1x1 = function(x,y, q11, q12, q21, q22){
	var x2 = x*x;
	var x3 = x2*x;
	var x4 = x2*x2;
	var x5 = x4*x;
	x = 6*x5 - 15*x4 + 10*x3;
	var y2 = y*y;
	var y3 = y2*y;
	var y4 = y2*y2;
	var y5 = y4*y;
	y = 6*y5 - 15*y4 + 10*y3;
	return (1-x)*(1-y)*q11 + (x)*(1-y)*q12 + (1-x)*(y)*q21 + (x)*(y)*q22;
}

//a sarokertekek megadasa a derekszogtol kezdodik, oramutato jarasaval megegyezo iranyban
Utils.Interpolate_Barycentric_1x1_TopTriangle = function(x,y, q22, q21, q12){
	var area21 = (1-y) * 0.5; //alap a szemkozti oldal
	var area12 = (1-x) * 0.5; //alap a szemkozti oldal
	var area22 = 0.5 - area21 - area12; //0.5 a teljes haromszog terulete
	
	return (area21 * q21 + area22 * q22 + area12*q12) * 2;// *2 mert osztjuk a teljes terulettel, ami 1/2
}
//a sarokertekek megadasa a derekszogtol kezdodik, oramutato jarasaval megegyezo iranyban
Utils.Interpolate_Barycentric_1x1_BottomTriangle = function(x,y, q11, q12, q21){
	var area21 = x * 0.5; //alap a szemkozti oldal
	var area12 = y * 0.5; //alap a szemkozti oldal
	var area11 = 0.5 - area21 - area12; //0.5 a teljes haromszog terulete
	
	return (area21 * q21 + area11 * q11 + area12*q12) * 2;// *2 mert osztjuk a teljes terulettel, ami 1/2
}
Utils.point_in_triangle = function(px,py,p0x,p1x,p2x,p0y,p1y,p2y){
	var Area = 0.5 *(-p1y*p2x + p0y*(-p1x + p2x) + p0x*(p1y - p2y) + p1x*p2y);
	var s = 1/(2*Area)*(p0y*p2x - p0x*p2y + (p2y - p0y)*px + (p0x - p2x)*py);
	var t = 1/(2*Area)*(p0x*p1y - p0y*p1x + (p0y - p1y)*px + (p1x - p0x)*py);
	return s>=0 && t>=0 && 1-s-t>=0;
}
//area = length(cross((p2-p1),(p3-p1))) / 2
Utils.triangle_area_3d = function(p1,p2,p3){
	var a1 = p2[0]-p1[0];
	var a2 = p2[1]-p1[1];
	var a3 = p2[2]-p1[2];
	
	var b1 = p3[0]-p1[0];
	var b2 = p3[1]-p1[1];
	var b3 = p3[2]-p1[2];
	
	return 0.5 * Utils.length_xyz(a2*b3-a3*b2, -a1*b3+a3*b1, a1*b2-a2*b1 );
}
//ABC triangle
Utils.point_in_triangle_3d = function(P, A, B, C){
	var areaABC = Utils.triangle_area_3d(A,B,C);
	var u = Utils.triangle_area_3d(C,A,P) / areaABC;
	var v = Utils.triangle_area_3d(A,B,P) / areaABC; 	
	var w = Utils.triangle_area_3d(B,C,P) / areaABC;

	return Math.abs(u+v+w-1)<0.01 && (u>=0&&u<=1) && (v>=0&&v<=1) && (w>=0&&w<=1);
}

//method: offset the plane so that the point will coincide with the origin
//then calculate the origin distance
//then reverse the offset (distance won't change, but the point position will
Utils.closest_point_to_plane = function(out, p, plane){
	//a*px+b*py+c*pz + d
	//because plane equation was normalized
	//otherwise should be divided by sqrt(a*a+b*b+c*c)
	var dist = vec3.dot(p, plane) + plane[3];
	
	out[0] = p[0] - dist*plane[0];
	out[1] = p[1] - dist*plane[1];
	out[2] = p[2] - dist*plane[2];

	return out;
}

//where derivative of the distance function across param t is zero
Utils.closest_point_to_line = function(out, q, p1,p2){
	var t= - Utils.dot_xxyyzz(p1[0]-q[0] , p2[0]-p1[0] , p1[1]-q[1] , p2[1]-p1[1] , p1[2]-q[2], p2[2]-p1[2]);
	t /= Utils.distance_array3d_squared(p1,p2);
	out[0] = p1[0] + (p2[0]-p1[0])*t;
	out[1] = p1[1] + (p2[1]-p1[1])*t;
	out[2] = p1[2] + (p2[2]-p1[2])*t;
}

//(x1,y1), (x2,y2) are the endpoints, (x,y) is the target point
Utils.point_to_line_dist_2d = function(x, y, x1, y1, x2, y2){
	var A = x - x1;
	  var B = y - y1;
	  var C = x2 - x1;
	  var D = y2 - y1;

	  var dot = A * C + B * D;
	  var len_sq = C * C + D * D;
	  var param = -1;
	  if (len_sq != 0) //in case of 0 length line
		  param = dot / len_sq;
	  var xx, yy;
	  if (param < 0) {
		xx = x1;
		yy = y1;
	  }else if (param > 1) {
		xx = x2;
		yy = y2;
	  }else {
		xx = x1 + param * C;
		yy = y1 + param * D;
	  }
	  var dx = x - xx;
	  var dy = y - yy;
	  return Math.sqrt(dx * dx + dy * dy);
}


//rounds number up to the next power-of-two (e.g. 1000->1024, 192->256)
Utils.NextPow2 = function(x){
	return Math.round(Math.pow(2, Math.ceil(Math.log(x)/Math.log(2))));
}

Utils.dot2 = function (v1, v2){
	return v1[0]*v2[0] + v1[1]*v2[1];
}
Utils.cross2 = function(v1,v2){
	return v1[0]*v2[1]-v1[1]*v2[0];
}
Utils.dot_xxyy = function(x1,x2,y1,y2){
	return x1*x2 + y1*y2;
} 
Utils.dot_xxyyzz = function(x1,x2,y1,y2,z1,z2){
	return x1*x2 + y1*y2 + z1*z2;
} 

Utils.compareArrays = function(a,b){
	if(a.length == b.length){
		for(var i=0;i<a.length;++i){
			if(a[i]!=b[i]){
				return false;
			}
		}
		return true;
	}
	return false;
}
 
//returns the t factor of the a1-a2 linesegment (-1 if no intersect)
Utils.intersect_4point = function(a1,a2,b1,b2){
	var s1_x = a2.x-a1.x;
	var s1_y = a2.y-a1.y;
	var s2_x = b2.x-b1.x;
	var s2_y = b2.y-b1.y;
	
	var divisor = (-s2_x * s1_y + s1_x * s2_y);
	var startDiffX = (a1.x - b1.x);
	var startDiffY = (a1.y - b1.y);
	var s= (-s1_y * startDiffX + s1_x * startDiffY) / divisor;
	var t= ( s2_x * startDiffY - s2_y * startDiffX ) / divisor;
	if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
		return t;
	}
	//no intersection found
	return -1;
}

Utils.randomElem = function(arr){
	return arr[(RAND()*arr.length*0.99999)>>0];
}
Utils.randomElem_clientSide = function(arr){
	return arr[Math.floor(Math.random()*arr.length*0.99999)];
}
Utils.lastElem = function(arr){
	if(arr.length > 0){
		return arr[arr.length-1];
	}
	return null;
}
Utils.randomFirstElem = function(arr, k){
	return arr[Math.floor(RAND()*Math.min(arr.length, k)*0.999)];
}

Utils.push_if_not_contained = function(arr, elem){
	if(arr.indexOf(elem)<0){
		arr.push(elem);
	}
}

Utils.sort_by_name = function(arr){
	arr.sort(function(a,b){return a.name<b.name?-1:1});
}


//Fisher-Yates (aka Knuth) Shuffle
Utils.shuffleArray = function(arr){
	var currentIndex = arr.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(RAND() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
}

/*Utils.removeRandomElem = function(arr){
	var id = Math.floor(RAND()*arr.length*0.999);
	arr.splice(id,1);
}*/

Utils.smooth_decay_3 = function(arr, ref, fac){
	arr[0] += (ref[0]-arr[0])*fac;
	arr[1] += (ref[1]-arr[1])*fac;
	arr[2] += (ref[2]-arr[2])*fac;
}
//TODO
Utils.conversionMatrix = mat3.create();
//zxy is roll-pitch-yaw
Utils.euler_xyz_to_zxy = function(x,y,z){
	mat3.identity(Utils.conversionMatrix);
	var rm = Utils.conversionMatrix;
	
	mat3.mul(rm, rm, mat3.rotationZ(z));
	mat3.mul(rm, rm, mat3.rotationY(y));
	mat3.mul(rm, rm, mat3.rotationX(x));

	var rotX = Math.asin(rm[7]);
	var cx = Math.cos(rotX);
	var rotY = Math.atan2( -rm[6]/cx, rm[8]/cx );
	var rotZ = Math.atan2( -rm[1]/cx, rm[4]/cx );
	return [rotX,rotY,rotZ];
}

Utils.quatFromXYZ = function(out, x,y,z){
	mat3.identity(Utils.conversionMatrix);
	var rm = Utils.conversionMatrix;
	
	mat3.mul(rm, rm, mat3.rotationX(x));
	mat3.mul(rm, rm, mat3.rotationY(y));
	mat3.mul(rm, rm, mat3.rotationZ(z));
	quat.fromMat3(out,rm);
}
//in: roll,pitch,yaw
Utils.euler_zxy_to_xyz = function(x,y,z){
	mat3.identity(Utils.conversionMatrix);
	var rm = Utils.conversionMatrix;
	
	mat3.mul(rm, rm, mat3.rotationY(y));
	mat3.mul(rm, rm, mat3.rotationX(x));
	mat3.mul(rm, rm, mat3.rotationZ(z));
	
	var rotY = Math.asin(rm[2]);
	var cy = Math.cos(rotY);
	var rotX = Math.atan2( -rm[5]/cy, rm[8]/cy );
	var rotZ = Math.atan2( -rm[1]/cy, rm[0]/cy );
	return [rotX,rotY,rotZ];
}

//for monotonous functions use binary search
Utils.solve_monotonous = function(fun, bound_low, bound_high, error){
	var x; var y;
	var y_low = fun(bound_low);
	var y_high = fun(bound_high);
	if(y_low * y_high >= 0){
		return y_low;
	}
	for(var i=0;i<30;++i){
		x = (bound_low+bound_high)/2;
		y = fun(x);
		//console.log(i,y);
		if(Math.abs(y)<error){
			return x;
		}
		if(y_low*y < 0){ //sign is different, zero is in between
			y_high =  y;
			bound_high = x;
		}else{
			y_low = y;
			bound_low = x;
		}
	}
}

//sets the given frustum limited to a rect. In the case of a view frustum, the corners are (1,1) and (-1,-1),
//but if we want to create a partial frustum, e.g. for drag-selection, we can give a larger or smaller rect
function update_frustum_planes(frustum, inv_mat, corner1, corner2, point_output){
	if(point_output === void 0){point_output = null;}
	var fc =
	mat4.fromValues(corner1[0],corner1[1],1,1, corner2[0],corner1[1],1,1, corner2[0],corner2[1],1,1,	corner1[0],corner2[1],1,1); //far corners
	
	//clip space to world space
	mat4.mul(fc, inv_mat , fc);
	mat4.scale_vec4(fc,fc,[1/fc[3], 1/fc[7], 1/fc[11], 1/fc[15]]);

	var nc =
	mat4.fromValues(corner1[0],corner1[1],-1,1, corner2[0],corner1[1],-1,1, corner2[0],corner2[1],-1,1,	corner1[0],corner2[1],-1,1);//near corners
	mat4.mul(nc, inv_mat , nc);
	mat4.scale_vec4(nc,nc,[1/nc[3], 1/nc[7], 1/nc[11], 1/nc[15]]);
	
	//a plane can be defined by 4 values (ax + by + cz + d = 0)
	frustum[0] = Utils.planeFromPoints([fc[4],fc[5],fc[6]],[fc[0],fc[1],fc[2]],  [nc[0],nc[1],nc[2]]);//top
	frustum[1] = Utils.planeFromPoints([fc[12],fc[13],fc[14]], [fc[8],fc[9],fc[10]], [nc[8],nc[9],nc[10]]);//bottom
	frustum[2] = Utils.planeFromPoints([fc[8],fc[9],fc[10]], [fc[4],fc[5],fc[6]], [nc[4],nc[5],nc[6]]);//left
	frustum[3] = Utils.planeFromPoints([fc[0],fc[1],fc[2]], [fc[12],fc[13],fc[14]], [nc[12],nc[13],nc[14]]);//right
	frustum[4] = Utils.planeFromPoints([nc[4],nc[5],nc[6]],[nc[0],nc[1],nc[2]],  [nc[8],nc[9],nc[10]]);//near
	frustum[5] = Utils.planeFromPoints([fc[0],fc[1],fc[2]], [fc[4],fc[5],fc[6]], [fc[8],fc[9],fc[10]]);//far
	
	if(point_output != null){
		point_output[0] = [nc[0],nc[1],nc[2]];
		point_output[1] = [nc[4],nc[5],nc[6]];
		point_output[2] = [nc[8],nc[9],nc[10]];
		point_output[3] = [nc[12],nc[13],nc[14]];
		point_output[4] = [fc[0],fc[1],fc[2]];
		point_output[5] = [fc[4],fc[5],fc[6]];
		point_output[6] = [fc[8],fc[9],fc[10]];
		point_output[7] = [fc[12],fc[13],fc[14]];
	}
}

//give the WORLD positions of the 8 corner points of the frustum
//and the orientation dir of the boundingbox (e.g. sun direction)
//could be used for cascade shadow mapping in the future
function get_frustum_bounding_box(corners, dir){
	var c = corners;
	var nc = //near corners
	mat4.fromValues(c[0][0],c[0][1],c[0][2],1,c[1][0],c[1][1],c[1][2],1,c[2][0],c[2][1],c[2][2],1,c[3][0],c[3][1],c[3][2],1);
	var fc = //far corners
	mat4.fromValues(c[4][0],c[4][1],c[4][2],1,c[5][0],c[5][1],c[5][2],1,c[6][0],c[6][1],c[6][2],1,c[7][0],c[7][1],c[7][2],1);
	for(var i=0;i<16; i+=4){
		nc[i] -= cam.pos[0];
		nc[i+1] -= cam.pos[1];
		nc[i+2] -= cam.pos[2];
		fc[i] -= cam.pos[0];
		fc[i+1] -= cam.pos[1];
		fc[i+2] -= cam.pos[2];
	}
	var orientmat = mat4.create()
	var inv_orientmat = mat4.create();
	mat4.lookAt(orientmat, dir,[0,0,0],[0,1,0]);
	mat4.invert(inv_orientmat, orientmat);
	mat4.mul(nc,inv_orientmat, nc);
	mat4.mul(fc,inv_orientmat, fc);
	var mincorner = [9999,9999,9999];
	var maxcorner = [-9999,-9999,-9999];
	for(var i=0;i<16;i+=4){
		mincorner[0] = Math.min(mincorner[0],Math.min(nc[i], fc[i]));
		mincorner[1] = Math.min(mincorner[1],Math.min(nc[i+1], fc[i+1]));
		mincorner[2] = Math.min(mincorner[2],Math.min(nc[i+2], fc[i+2]));
		maxcorner[0] = Math.max(maxcorner[0],Math.max(nc[i], fc[i]));
		maxcorner[1] = Math.max(maxcorner[1],Math.max(nc[i+1], fc[i+1]));
		maxcorner[2] = Math.max(maxcorner[2],Math.max(nc[i+2], fc[i+2]));
	}
	var bb = mat4.create();
	//out-l-r-b-t-n-f
	mat4.ortho(bb, mincorner[0], maxcorner[0],mincorner[1],maxcorner[1],mincorner[2],maxcorner[2] );
	mat4.mul(bb,bb,orientmat );
	mat4.translate(bb,bb,[-cam.pos[0],-cam.pos[1],-cam.pos[2]]);
	return bb;
}

//preconstructed for memory optimization
var rayCast_clipPos = vec4.create();
var rayCast_pointerRay = [0,0,0];
//WARNING: returns reference to last calculated point; use array.slice() to copy the data
function rayCastScreen(sx, sy, intersectZ){
	var clipPos = rayCast_clipPos;
	//screen pos is between (-1,-1) and (1,1)
	clipPos[0] = GUI.pixelToClipX(sx);
	clipPos[1] = GUI.pixelToClipY(sy);
	clipPos[2] = 0;
	clipPos[3] = 1;
	mat4.mul(clipPos, cam.inv_PV_Matrix,clipPos );

	vec4.scale(clipPos, clipPos, 1/clipPos[3]); //divide by w
	//Now we have the clip space pos. We can get a vector from this and the camera pos.
	//then we can find the intersection with the terrain (or it's simpler at z==0);
	var pointerRay = rayCast_pointerRay;
	pointerRay[0] = pointerRay[1] = pointerRay[2] = 0;
	var eyePos = cam.getEyePos();
	vec3.subtract(pointerRay,eyePos,clipPos);
	//a vektort akkorara kell meretezni, hogy a z egyenlo legyen intersectZ-vel
	vec3.scale(pointerRay, pointerRay, -1 * (eyePos[2]-intersectZ)/pointerRay[2]);
	vec3.add(pointerRay,pointerRay,eyePos);
	return pointerRay;
}

function worldPointToPixel(wx,wy,wz){
	var worldPos = vec4.fromValues(wx,wy,wz,1);
	mat4.mul(worldPos, vpMatrix ,worldPos);
	vec4.scale(worldPos, worldPos, 1/worldPos[3]);//divide by w
	return ([ GUI.clipToPixelX(worldPos[0]) , GUI.clipToPixelY(worldPos[1]) ]);
}

function worldPointToGUI(wx,wy,wz){
	var worldPos = vec4.fromValues(wx,wy,wz,1);
	mat4.mul(worldPos, vpMatrix ,worldPos);
	vec4.scale(worldPos, worldPos, 1/worldPos[3]);//divide by w
	return ([ GUI.clipToScreenX(worldPos[0]) , GUI.clipToScreenY(worldPos[1]) ]);
}
	
function worldPointToClip(wx,wy,wz){
	var worldPos = vec4.fromValues(wx,wy,wz,1);
	mat4.mul(worldPos, vpMatrix ,worldPos);
	vec4.scale(worldPos, worldPos, 1/worldPos[3]);//divide by w
	return ([ worldPos[0], worldPos[1]]);
}

function getAttachmentAngles(quat, baseRot){

	mat4.identity(modelMatrix);
	
	mat4.translate(modelMatrix, modelMatrix, [actor.x, actor.y, actor.z]);
	modelMatrix[0]*=actor.scale;
	modelMatrix[5]*=actor.scale;
	modelMatrix[10]*= actor.scale;
	mat4.rotate(modelMatrix,modelMatrix, -actor.baseActorRotZ, [0,0,1]);
	
	mat4.fromQuat(lastQuatMatrix, actor.quaternion);
	mat4.mul(modelMatrix, modelMatrix, lastQuatMatrix);
}

/* SCREEN SPACE TO WORLD SPACE Here's how to do it exactly, step by step.

0) Obtain your mouse coordinates within the client area
1) Get your Projection matrix and View matrix if no Model matrix required.
2) Multiply Projection * View
3) Inverse the results of multiplication
4) Construct a vector4 consisting of
x = mouseposition.x within a range of window x - transform to values between -1 and 1
y = mouseposition.y within a range of window y - transform to values between -1 and 1 - remember to invert mouseposition.y if needed
z = the depth value ( this can be obtained with glReadPixel) - you can manually go from -1 to 1 ( zNear, zFar )
w = 1.0
5) Multiply the vector by inversed matrix created before
6) Divide result vector by it's w component after matrix multiplication ( perspective division )*/

//fills a recursive array structure with numbers 1 to n
//example: [0,1,[2,3,[4],[5]],6]
function fill_array_tree_with_ints_preorder(arr){
	var arr_copy = arr.slice();
	fill_array_tree_with_ints_preorder_recursion(arr_copy, 0);
	return arr_copy;
}
function fill_array_tree_with_ints_preorder_recursion(arr, num){
	for(var i=0;i<arr.length;++i){
		if(arr[i].length == undefined){
			arr[i] = num;
			num++;
		}else{
			arr[i] = arr[i].slice();
			num = fill_array_tree_with_ints_preorder_recursion(arr[i], num);
		}
	}
	return num;
}

function MinHeap(){
	var arr = [];
	var heapSize = 0;
	this.getSize = function(){
		return heapSize;
	}
	this.print = function(){
		for(var i=0;i<heapSize;++i){
			console.log(i,getVal(i));
			if(i > 10){break;}
		}
	}
	this.insertKey = function(elem){
		heapSize++;
		var i = heapSize - 1;
		arr[i] = elem;
		
		while(i != 0 && getVal(parent(i)) > getVal(i)){
			swap(i, parent(i));
			i = parent(i);
		}
		
	}
	
	this.decreaseKey = function(i, val){
		arr[i] = val;
		while(i != 0 && getVal(parent(i)) > getVal(i)){
			swap(i, parent(i));
			i = parent(i);
		}
	}
	
	this.extractMin = function(){
		if(heapSize == 1){
			heapSize --;
			return arr[0];
		}
		var root = arr[0];
		arr[0] = arr[heapSize-1];
		heapSize--;
		this.MinHeapify(0);
		return root;
	}
	this.getMin = function(){
		return arr[0];
	}
	
	this.removeKey = function(i){
		this.decreaseKey(i, -1000);
		this.extractMin();
	}
	
	this.MinHeapify = function(i){
		var l = left(i);
		var r = right(i);
		var smallest = i;
		if(l < heapSize && getVal(l)<getVal(smallest) ){
			smallest = l;
		}
		if(r < heapSize && getVal(r)<getVal(smallest)){
			smallest = r;
		}
		if(smallest != i){
			swap(i, smallest);
			this.MinHeapify(smallest);
		}
	}
	
	function swap(id1, id2){
		var temp = arr[id1];
		arr[id1] = arr[id2];
		arr[id2] = temp;
	}
	
	function getVal(id){
		return arr[id].f_hotspot;
	}
	//left child id
	function left(i){
		return 2*i+1;
	}
	//right child id
	function right(i){
		return 2*i+2;
	}
	function parent(i){
		return Math.floor((i-1)/2);
	}
}

//Used for gameplay related number generation.
//for graphics or editor we can keep using Math.random
function RAND(){
    RAND.seed = ( 48271 * RAND.seed )% 2147483647;
    return (RAND.seed%10000) /10000;
}
RAND.seed = 1;
RAND.reset = function(){
	this.seed = 1;
}
RAND.check=function(){
}
RAND.integer = function(max){
	return ~~(RAND()*10000)%max
}
RAND.integer_client = function(max){
	return ~~(Math.random()*10000)%max
}