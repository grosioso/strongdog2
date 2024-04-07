class TileBG {

    constructor(x,y,sizeX,sizeY){
        this.color = "white";
        this.active = false;
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    draw(opacity){
        screen.drawTile(this.x,this.y,this.sizeX,this.sizeY,this.color,opacity);
    }
}