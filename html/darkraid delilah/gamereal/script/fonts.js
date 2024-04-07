//starting pixel posX of character on a 1024*1024 character sheet 

var kerning2 = [
0, 6, 15, 25, 34, 47, 59, 66, 72, 79, 88, 97, 103, 110, 116, -124,
0, 10, 17, 27, 36, 46, 55, 64, 74, 83, 92, 98, 105, 115, 126, 136, 145, -158, 
0, 11, 22, 33, 44, 53, 61, 73, 85, 91, 100, 111, 120, 134, 145, 158, 167, 179, 189, 198, 209, 219, 230, 245, -256,
0, 10, 21, 28, 36, 42, 52, 60, -66, 
0, 9, 19, 27, 37, 46, 54, 64, 73, 78, 85, 94, 99, 113, 122, 133, 142, 153, 160, 167, 175, 184, 193, 206, 216, 225, -233,
0, 8, 14, 22, 31  ];


//[a,b] : elem at "a" has height "b", default height is 64
//var kerning2_explicitHeights = [[41,78],[65,50],[70,79],[73,74],[79,77],[80,77],[88,77]];//J,b,h,j,p,q,y
var kerning2_explicitHeights = [];
//size is the size of the sheet in rowsize
//1024 needs a resize of 1, 256 needs a resize of 4
function Font(kerning, heights, resize){
	this.charWidths = [];
	this.charHeights = [];
	this.charCoords = [];
	
	var row =0;
	var prevX = 0;
	var charId = 0;
	for(var i=1;i<kerning.length;++i){
		var x_end = kerning[i] * resize;
		if(kerning[i] < 0){
			x_end = -x_end;
		}
		if(x_end < prevX){
			i++;
			row++;
			prevX=0;
			x_end = kerning[i] * resize;
		}
		
		this.charWidths[i-row-1] = (x_end-prevX) / 1024.;
		this.charCoords[i-row-1] = [(prevX)/1024., 1-(row*64)/1024., (x_end)/1024., 1-(row*64+64)/1024.]//topleft xy and bottomright xy
		this.charHeights[i-row-1] = this.charCoords[i-row-1][1]-this.charCoords[i-row-1][3]
		prevX = x_end;
	}
	for(var i=0;i<heights.length;++i){
		var charId = heights[i][0];
		//set char lower corner y to explicit value
		this.charCoords[charId][3] -= (heights[i][1]-64)/1024.;
		this.charHeights[charId] = this.charCoords[charId][1]-this.charCoords[charId][3]
	}
}
Font.Standard = new Font(kerning2, kerning2_explicitHeights, 4);

//gets the X positions of red pixels, useful for fontsheets. Don't use in retail, only for precalc.
function getKerning(asset,width ){
	var cdat = getTextureData(asset);
	var kern = [];
	var last = 0;
	for(var i=0; i<cdat.length;i+=4){
		if(cdat[i] > 200 && cdat[i+1] < 100){
			var xx = (i/4)%width;
			if(last>xx){ //negative marks end of line
				kern[kern.length-1] *= -1;
			}
			kern.push(xx);
			last = xx;
		}
	}
	console.log(kern);
}
