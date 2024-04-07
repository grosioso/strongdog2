function convertOBJ(obj,m){
	
	lines = obj.split('\n');
	var numFrames = 0;
	var numVerts = 0; //number of verts of currently read frame
	var numNorms = 0; //number of norms of currently read frame
	var numAtts = 0; //number of attachment points of currently read frame
	m.pointsArray = [];
	m.matIds = [];
	m.soundIds = [];
	for(var i=0;i<lines.length;++i){
		if(lines[i][0]=='f'){
			var f = lines[i].match(/\d+|\//g);
			m.fverts.push([]);
			m.ftexCoords.push([]);
			m.fnorms.push([]);
			if(m.hasVertexColor == true){m.fcolors.push([]);}
			
			for(var j = 0;j<f.length;++j){
				if(f[j] == '/'){
					++j;
					m.ftexCoords[m.numFaces].push(parseInt(f[j]));
					++j;++j;
					m.fnorms[m.numFaces].push(parseInt(f[j]));
					
					if(m.hasVertexColor == true){
						++j;++j;
						m.fcolors[m.numFaces].push(parseInt(f[j]));
					}
					
				}else{
					m.fverts[m.numFaces].push(parseInt(f[j]));
				}
			}
			m.numFaces ++;
		}
		else if(lines[i][0] == 'i'){ //material ids
			var ids = lines[i].match(/(\d+)/g);
			for(var j = 0;j<ids.length;++j){
				m.matIds.push(parseInt(ids[j]));
			}
		}
		else if(lines[i][0] == 's'){ //sound ids
			var ids = lines[i].match(/(\d+)/g);
			for(var j = 0;j<ids.length;++j){
				m.soundIds.push(parseInt(ids[j]));
			}
		}
		else if(lines[i][0] == 'm'){ //moment
			var moment = lines[i].match(/(\d+)/g);
			m.frameTimes.push(parseInt(moment[0]));
			m.normsArray.push([]);
			m.vertsArray.push([]);
			m.pointsArray.push([]);
			numFrames ++;
			numVerts = 0;
			numNorms = 0;
			numAtts = 0;
		}
		
		else if(lines[i][0]=='v' && lines[i][1]==' '){ //position vertex data
			var v = lines[i].match(/(-?\d+(\.\d*)?e.\d+)|(-?\d+(\.\d*)?)/g);

			m.vertsArray[numFrames-1].push([]);
			for(var j = 0;j<v.length;++j){
				m.vertsArray[numFrames-1][numVerts].push(parseFloat(v[j]));
			}
			
			numVerts ++;
			
		}
		else if(lines[i][0]=='v' && lines[i][1]=='n'){ //normal vertex data
			var vn = lines[i].match(/(-?\d+(\.\d*)?e.\d+)|(-?\d+(\.\d*)?)/g);
			
			m.normsArray[numFrames-1].push([]);
			for(var j = 0;j<vn.length;++j){
				m.normsArray[numFrames-1][numNorms].push(parseFloat(vn[j]));
			}
			
			numNorms ++;
			
		}
		else if(lines[i][0]=='v' && lines[i][1]=='t'){ //texcoord vertex data
			var vt = lines[i].match(/(-?\d+(\.\d*)?e.\d+)|(-?\d+(\.\d*)?)/g);
			m.texCoords.push([]);
			for(var j = 0;j<vt.length;++j){
				m.texCoords[m.numTexCoords].push(parseFloat(vt[j]));
			}
			m.numTexCoords ++;
		}
		
		else if(lines[i][0]=='v' && lines[i][1]=='c' && m.hasVertexColor == true){ //color vertex data
			var vc = lines[i].match(/(-?\d+(\.\d*)?e.\d+)|(-?\d+(\.\d*)?)/g);
			
			m.vertColors.push([]);
			for(var j = 0;j<vc.length;++j){
				m.vertColors[m.numVertColors].push(parseFloat(vc[j]));
			}
			m.numVertColors ++;
		}
		
		else if(lines[i][0]=='a'){ //attachment point data
			var a = lines[i].match(/(-?\d+(\.\d*)?e.\d+)|(-?\d+(\.\d*)?)/g);
			
			var att = new ModelPoint();
			att.x = parseFloat(a[0]);
			att.y = parseFloat(a[1]);
			att.z = parseFloat(a[2]);
			att.q[0] = parseFloat(a[3]);
			att.q[1] = parseFloat(a[4]);
			att.q[2] = parseFloat(a[5]);
			att.q[3]  = parseFloat(a[6]);
			//att.rotX = parseFloat(a[3]) * 0.01745329252;
			//att.rotY = parseFloat(a[4]) * 0.01745329252;
			//att.rotZ = parseFloat(a[5]) * 0.01745329252;
			//att.size  = parseFloat(a[6]);
			m.pointsArray[numFrames-1].push(att);
			numAtts ++;
		}
	}
	
	m.numNorms = numNorms;
	m.numVerts = numVerts;
	m.numFrames = numFrames;
	
	if(m.matIds.length > 0){
		m.sort_faces_by_material_id();
	}
}

var b64_code_lut = [
'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
'0','1','2','3','4','5','6','7','8','9','+','/'];
//b64 values of ascii charachters offset by 47
var b64_decode_lut = [62,0,0,0,63, //+ , - . /
52,53,54,55,56,57,58,59,60,61, //0,1,2,3,4,5,6,7,8,9
0,0,0,0,0,0,0, //: ; < = > ? @
0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
0,0,0,0,0,0, //[ \ ] ^ _ `
26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];

function sextetToB64Char(sextet){
	return b64_code_lut[sextet];
}

function B64CharToSextet(c){
	var cc = Math.max(43, c.charCodeAt(0));
	return b64_decode_lut[cc - 43];
}

function bitsToSextet(c1,c2,c3,c4,c5,c6){
	return (c1+c2*2+c3*4+c4*8+c5*16+c6*32);
}

//converts an any-length b64 string to an array of individual bits
function bitsFromB64( b ){
	var numSextets = b.length;
	var numBits = numSextets*6;
	var bitsArr = [];
	for(var i=0;i<numSextets;++i){
		bitsArr[i] = B64CharToSextet(b[i]).toString(2)
	}
	var bits = [];
	for(var i=0;i<numBits;++i){
		bits[i] = 0;
	}
	for(var k=0;k<numSextets;++k){
		var len = bitsArr[k].length;
		for(var i=0;i<len;++i){
			var bitChar = bitsArr[k][len-1-i];
			bits[k*6 + i] = bitChar == '1' ? 1 : 0;
		}
	}
	return bits;
}

//a = input value
//whole = number of whole bits
//frac = number of fractional bits
//signed = MSB will be reserved for sign
function to_b64_fixed(a, whole, frac, signed){
	var sextetNum = Math.ceil((whole+frac)/6);
	var bitNum = sextetNum*6;
	var bits = [];
	for(var i=0;i<bitNum;++i){
		bits[i] = 0;
	}
	
	if(a < 0){
		if(signed == true){
			bits[bitNum-1] = 1;
			a*= -1;
		}else{
			a = 0;
		}
	}
	
	
	var multiplier = 1;
	for(var i=0;i<frac;++i){
		multiplier *= 2;
	}
	var cap = 1;
	for(var i=0;i<whole;++i){
		cap *= 2;
	}
	if(signed == true){
		cap /= 2;
	}
	
	a = Math.floor( Math.min( cap -1/multiplier , a)*multiplier);
	
	bin = a.toString(2);
	
	if(signed == true){
		var len = Math.min(bin.length, bitNum-1);
	}else{
		var len = Math.min(bin.length, bitNum);
	}
	for(var i=0; i<len;++i){
		bits[i] = parseInt(bin[len-1-i]);
	}
	var b64String = "";
	for(var i=0;i<bitNum;i+=6){
		var sextet = (bits[i]+bits[i+1]*2+bits[i+2]*4+bits[i+3]*8+bits[i+4]*16+bits[i+5]*32);
		b64String += b64_code_lut[sextet];
	}
	
	return b64String;
}

//b = input base64 string
//whole = number of whole bits
//frac = number of fractional bits
//signed = MSB will be interpreted as sign
function from_b64_fixed(b, whole, frac, signed){
	var sextetNum = Math.ceil((whole+frac)/6);
	var bitNum = sextetNum*6;

	var bits = bitsFromB64(b);
	var po2 = 1; //current power of 2
	var val = 0;
	
	var bitLen = signed == true ? bitNum-1 : bitNum;
	for(var i=0;i<bitLen ;++i){
		val += po2*bits[i];
		po2 *= 2;
	}
	
	var divisor = 1;
	for(var i=0;i<frac;++i){
		divisor *= 2;
	}
	
	val /= divisor;
	if(signed == true && bits[bitNum-1] == 1){
		val *= -1;
	}

	return val;
}

function to_b64_12(val){
	sextet1 = Math.min(63, Math.max(0,Math.floor(val/64)));
	sextet2 = Math.max(0, Math.floor(val)%64);
	return sextetToB64Char(sextet1)+sextetToB64Char(sextet2);
}
function from_b64_12(char1, char2){
	return B64CharToSextet(char1)*64+B64CharToSextet(char2);
}

function to_b64_6(val){
	sextet = Math.min(63, Math.max(0,Math.floor(val)));
	return sextetToB64Char(sextet);
}
function from_b64_6(char1){
	return B64CharToSextet(char1);
}


function TestB64(a,w,f,s){
	console.log(from_b64_fixed(to_b64_fixed(a, w,f, s), w,f,s));
}

function compressModel(m){
	var str = [];
	var numData = m.numFaces*3;
	if(numData < 64){
		idSize = 6;
	}else if(numData < 4096){
		idSize = 12;
	}else{
		idSize = 18;
	}
	
	str.push(to_b64_fixed( idSize , 6, 0, false )); //how many bits for an index
	str.push(to_b64_fixed( m.numFrames, 12, 0, false )); //how many frames
	str.push(to_b64_fixed( m.numFaces, idSize, 0, false )); //how many polys
	str.push(to_b64_fixed( m.texCoords.length, idSize, 0, false )); //how many texcoords
	str.push(to_b64_fixed( m.vertColors.length, idSize, 0, false )); //how many vertcolors 
	str.push(to_b64_fixed( m.vertsArray[0].length, idSize, 0, false )); //how many vertex positions in a frame
	str.push(to_b64_fixed( m.normsArray[0].length, idSize, 0, false )); //how many normals in a frame
	str.push(to_b64_fixed( m.pointsArray[0].length, 18, 0, false )); //how many attachment points in a frame
	
	var fdata = "";
	for(var i=0;i<m.numFaces;++i){
		for(var j=0;j<3;++j){
			fdata += to_b64_fixed(m.fverts[i][j], idSize, 0, false );
			fdata += to_b64_fixed(m.fnorms[i][j], idSize, 0, false );
			fdata += to_b64_fixed(m.ftexCoords[i][j], idSize, 0, false );
			if(m.hasVertexColor == true){
				fdata += to_b64_fixed(m.fcolors[i][j], idSize, 0, false );
			}
		}
	}
	str.push(fdata);
	
	var tcoords = "";
	for(var i=0;i<m.texCoords.length;++i){
		tcoords += to_b64_fixed(m.texCoords[i][0], 6,12,true);
		tcoords += to_b64_fixed(m.texCoords[i][1], 6,12,true);
	}
	str.push(tcoords);
	
	if(m.hasVertexColor == true){ //compress vertcolor data
		var vcolors = "";
		for(var i=0;i<m.vertColors.length;++i){
			vcolors += to_b64_fixed(m.vertColors[i][0], 12,0,false); //r
			vcolors += to_b64_fixed(m.vertColors[i][1], 12,0,false); //g
 			vcolors += to_b64_fixed(m.vertColors[i][2], 12,0,false); //b
		}
		str.push(vcolors);
	}
	
	for(var k=0;k<m.frameTimes.length;++k){ //compress frame data
		var moment = to_b64_fixed(m.frameTimes[k], 12,0,false);
		str.push(moment);
		var verts = "";
		for(var i=0;i<m.numVerts;++i){
			verts += to_b64_fixed(m.vertsArray[k][i][0], 12,12,true);
			verts += to_b64_fixed(m.vertsArray[k][i][1], 12,12,true);
			verts += to_b64_fixed(m.vertsArray[k][i][2], 12,12,true);
		}	
		str.push(verts);
		var norms = "";
		for(var i=0;i<m.numNorms;++i){
			norms += to_b64_fixed(m.normsArray[k][i][0], 2,10,true);
			norms += to_b64_fixed(m.normsArray[k][i][1], 2,10,true);
			norms += to_b64_fixed(m.normsArray[k][i][2], 2,10,true);
		}	
		str.push(norms);
		for(var i=0;i<m.pointsArray[k].length;++i){
			var att = "";
			att += to_b64_fixed(m.pointsArray[k][i].x, 12,12,true);
			att += to_b64_fixed(m.pointsArray[k][i].y, 12,12,true);
			att += to_b64_fixed(m.pointsArray[k][i].z, 12,12,true);
			att += to_b64_fixed(m.pointsArray[k][i].q[0], 2,22,true); //quatx
			att += to_b64_fixed(m.pointsArray[k][i].q[1], 2,22,true); //quaty
			att += to_b64_fixed(m.pointsArray[k][i].q[2], 2,22,true); //quatz
			att += to_b64_fixed(m.pointsArray[k][i].q[3], 2,22,true); //quatw
			str.push(att);
		}
	}
	
	var comp = "";
	for(var i=0;i<str.length;++i){
		comp += str[i] + '\n';
	}
	return comp;
}

function compressModelBulk(){
	if(Asset.keepModelData == false){
		console.warn("Model data is not loaded. Set Asset.keepModelData to true and reload the game!");
		return "Model data is not loaded. Set Asset.keepModelData to true and reload the game!";
	}
	var data = new Object;
	for (var i=0;i<Models.length;++i){
		console.log(Models[i].name);
		var modelName = Models[i].name;
		data[modelName] = compressModel(Models[i]);
	}
	return JSON.stringify(data);
}

function downloadModelBulk(){
	Filesaver.saveFile(compressModelBulk(), "models.json");
}

function convertSuperDUD(obj,m){
	var lines = obj.split('\n');
	var idSize = from_b64_fixed(lines[0], 6,0,false);
	m.numFrames = from_b64_fixed(lines[1], 12,0,false);
	m.numFaces = from_b64_fixed(lines[2], idSize,0,false);
	m.numTexCoords = from_b64_fixed(lines[3], idSize,0,false);
	m.numVertColors = from_b64_fixed(lines[4], idSize,0,false);
	m.numVerts = from_b64_fixed(lines[5], idSize,0,false);
	m.numNorms = from_b64_fixed(lines[6], idSize,0,false);
	var numAtts = from_b64_fixed(lines[7], idSize,0,false);
	
	//m.hasVertexColor = m.numVertColors > 0;
	
	m.fverts = [];
	m.ftexCoords = [];
	m.fnorms = [];
	m.fcolors = [];
	
	var fdat  = lines[8];
	var fsize = m.hasVertexColor==true ? idSize/6 *12 : idSize/6 *9; //size in chars of a single triangle
	var fvertsize = m.hasVertexColor==true ? idSize/6 *4 : idSize/6 *3; //size in chars of a single face vertex
	var fdatsize = idSize/6; //size in chars of a single id
	
	for(var i=0; i<m.numFaces;++i ){
		m.fverts[i] = [];
		m.fnorms[i] = [];
		m.ftexCoords[i] = [];
		if(m.hasVertexColor == true){
			m.fcolors[i] = [];
		}
		
		var fOffs = fsize*i; //offset of the current face data in chars
		for(var j=0;j<3;++j){
			var fvOffs = fsize*i + fvertsize*j; //offset of the current facevert data in chars
			
			m.fverts[i][j] = from_b64_fixed( fdat.slice(fvOffs, fvOffs + fdatsize ), idSize, 0, false );
			m.fnorms[i][j] = from_b64_fixed( fdat.slice(fvOffs + fdatsize, fvOffs + fdatsize*2 ), idSize, 0, false );
			m.ftexCoords[i][j] = from_b64_fixed( fdat.slice(fvOffs + fdatsize*2, fvOffs + fdatsize*3), idSize, 0, false );
			if(m.hasVertexColor == true){
				m.fcolors[i][j] = from_b64_fixed( fdat.slice(fvOffs + fdatsize*3, fvOffs + fdatsize*4 ), idSize, 0, false );
			}
			//console.log(m.fnorms[i][j]);
 		}
	}
	
	var tdat  = lines[9];
	for(var i=0;i<m.numTexCoords;++i){
		m.texCoords[i] = [];
		var tOffs = 6*i; //texcoord data is 3+3 char long
		m.texCoords[i][0] = from_b64_fixed(tdat[tOffs] + tdat[tOffs+1] + tdat[tOffs+2], 6, 12, true);
		m.texCoords[i][1] = from_b64_fixed(tdat[tOffs+3] + tdat[tOffs+4] + tdat[tOffs+5], 6, 12, true);
	}
	
	if(m.hasVertexColor == true){
		var cdat  = lines[10];
		for(var i=0;i<m.numVertColors;++i){
			m.vertColors[i] = [];
			var offs = 6*i; //texcoord data is 2+2+2 char long
			m.vertColors[i][0] = from_b64_fixed(cdat[offs] + cdat[offs+1], 12, 0, false);
			m.vertColors[i][1] = from_b64_fixed(cdat[offs+2] + cdat[offs+3], 12, 0, false);
			m.vertColors[i][2] = from_b64_fixed(cdat[offs+4] + cdat[offs+5], 12, 0, false);
		}
	}
	
	var line = m.hasVertexColor ? 11 : 10;
	
	m.frameTimes = [];
	m.vertsArray = [];
	m.normsArray = [];
	m.pointsArray = [];
	
	var ftId = 0; //frame time id
	for(var i = line; i < lines.length; ++ i){
		
		if(lines[i].length == 0){
			continue;
		}
		
		m.vertsArray[ftId] = [];
		m.normsArray[ftId] = [];
		m.pointsArray[ftId] = [];
		
		m.frameTimes[ftId] = from_b64_fixed( lines[i], 12, 0, false);
		
		++i; 
		var vdat = lines[i]; //vertpos data line
		for(var j = 0;j<m.numVerts; ++j){
			m.vertsArray[ftId][j] = [];
			
			var offs = 12*j; //vertpos data is 4+4+4 char long
			//console.log(i,j,offs, vdat[offs] + vdat[offs+1] + vdat[offs+2] + vdat[offs+3]);
			m.vertsArray[ftId][j][0] = from_b64_fixed(vdat[offs] + vdat[offs+1] + vdat[offs+2] + vdat[offs+3], 12, 12, true);
			m.vertsArray[ftId][j][1] = from_b64_fixed(vdat[offs+4] + vdat[offs+5] + vdat[offs+6] + vdat[offs+7], 12, 12, true);
			m.vertsArray[ftId][j][2] = from_b64_fixed(vdat[offs+8] + vdat[offs+9] + vdat[offs+10] + vdat[offs+11], 12, 12, true);
			
		}
		++i
		var ndat = lines[i]; //normal data line
		for(var j = 0;j<m.numNorms; ++j){
			m.normsArray[ftId][j] = [];
			var offs = 6*j; //texcoord data is 2+2+2 char long
			m.normsArray[ftId][j][0] = from_b64_fixed(ndat[offs] + ndat[offs+1], 2, 10, true);
			m.normsArray[ftId][j][1] = from_b64_fixed(ndat[offs+2] + ndat[offs+3], 2, 10, true);
			m.normsArray[ftId][j][2] = from_b64_fixed(ndat[offs+4] + ndat[offs+5], 2, 10, true);
		}
		++i
		for(var j=0;j< numAtts; ++ j){
			var adat = lines[i];
			var att = new ModelPoint();
			att.x = from_b64_fixed(adat[0] + adat[1] +adat[2] + adat[3], 12, 12, true);
			att.y = from_b64_fixed(adat[4] + adat[5] +adat[6] + adat[7], 12, 12, true);
			att.z = from_b64_fixed(adat[8] + adat[9] +adat[10] + adat[11], 12, 12, true);
			att.q[0] = from_b64_fixed(adat[12] + adat[13]+ adat[14]+ adat[15], 2, 22, true);
			att.q[1] = from_b64_fixed(adat[16] + adat[17]+ adat[18]+ adat[19], 2, 22, true);
			att.q[2] = from_b64_fixed(adat[20] + adat[21]+ adat[22]+ adat[23], 2, 22, true);
			att.q[3]  = from_b64_fixed(adat[24] + adat[25]+ adat[26]+ adat[27], 2, 22, true);
			m.pointsArray[ftId].push(att);
			++i; //go to next line
		}
		--i;
		++ftId;
	}
}
