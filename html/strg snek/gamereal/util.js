function addToGrid(grid,str,width,height,x,y){
    var obj = [];
    var idStr = 0;
    for (var cpt=y;cpt<y+height;cpt++){
        for(var cpt2=x;cpt2<x+width;cpt2++){
            grid[cpt][cpt2] = str.charAt(idStr);
            idStr++;
        }
    }
	return grid;
}

/*
          width X
        +------------->
        |
height Y|
        |
        |
        \/
*/

function textToGrid(str,w,h){
    var idStr = 0;
    var grid = [];
    for(var y=0;y<h;y++){
        grid[y] = [];
        for(var x=0;x<w;x++){
            grid[y][x] = str.charAt(idStr);
            idStr++
        }
    }

    return grid;
}

function randomChar(str){
    var list = str.split('');
    return list[Math.floor(Math.random() * list.length)];
}

function randomString(str,lenght){
    var final = '';
    for(var cpt=0;cpt<lenght;cpt++)
        final += randomChar(str);

    return final;
}

function uuidv4() {
    const a = crypto.getRandomValues(new Uint16Array(8));
    let i = 0;
    return '00-0-4-1-000'.replace(/[^-]/g, 
            s => (a[i++] + s * 0x10000 >> s).toString(16).padStart(4, '0')
    );
}