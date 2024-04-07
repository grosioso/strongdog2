class Screen{
    ui = document.getElementById("ui");
	background = document.getElementById("bg");
	text = document.getElementById("text");
	textAbove = document.getElementById("textAbove");

    constructor(width,height){
        this.width = width;
        this.height = height;

		this.background.width = this.width;
		this.background.height = this.height;
		this.text.width = this.width;
		this.text.height = this.height;
        this.ui.width = this.width;
        this.ui.height = this.height;
        this.textAbove.width = this.width;
        this.textAbove.height = this.height;
    }

    draw(img,x,y,width,height){
        var ctx = this.ui.getContext("2d");	
        if(width == undefined || height == undefined) ctx.drawImage(img,x,y);
        else ctx.drawImage(img,x,y,width,height);
    }

    resetUI(){
        var ctx = this.ui.getContext("2d");	
        ctx.clearRect(0,0,this.width,this.height);
    }
    
    writeTextAbove(str,x,y){
        var ctx = this.textAbove.getContext("2d");	
        ctx.font = "14px newConsolas";
        ctx.fillStyle = "white";
        ctx.fillText(str,x,y);
    }

    writeTextAbove2(str,x,y){
        var ctx = this.textAbove.getContext("2d");	
        ctx.font = "16px newConsolas";
        ctx.fillStyle = "black";
        ctx.fillText(str,x,y);
    }

    drawTextAbove(img,x,y){
        var ctx = this.textAbove.getContext("2d");	
        ctx.drawImage(img,x,y);
    }

    drawTextAboveOpacity(img,opacity){
        var ctx = this.textAbove.getContext("2d");	
        ctx.globalAlpha = opacity;
        ctx.drawImage(img,0,0);
    }

    resetTextAbove(){
        var ctx = this.textAbove.getContext("2d");	
        ctx.clearRect(0,0,this.width,this.height);
    }

    colorBG(color){
        var ctx = this.background.getContext("2d");	
        ctx.fillStyle = color;
        ctx.globalAlpha = 1;
        ctx.fillRect(0, 0, this.width, this.height);
    }

    drawTile(x,y,sizeX, sizeY, color,opacity){
        var ctx = this.background.getContext("2d");	
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fillRect(x, y, sizeX, sizeY);
    }

    drawGrid(grid,visibility,width,height,color,opacity,x,y){
        var xl = x;
        var yl = y;
        var str = '';
        for(var y=0;y<height;y++){
            str = '';
            for(var x=0;x<width;x++) 
                if(visibility[y][x]) str += grid[y][x];
                else str += ' ';
            this.writeLine(xl,yl,str,color,opacity);
            yl += 22;
        }
    }

    writeLine(x,y,str,color,opacity){
        var ctx = this.text.getContext("2d");	
        ctx.font = "20px newConsolas";
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.fillText(str,x,y);
    }

    resetBG(){
        var ctx = this.background.getContext("2d");	
        ctx.clearRect(0,0,this.width,this.height);
    }

    resetText(){
        var ctx = this.text.getContext("2d");	
        ctx.clearRect(0,0,this.width,this.height);
    }

}
