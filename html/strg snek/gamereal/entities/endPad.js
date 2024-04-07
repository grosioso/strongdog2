class EndPad extends Entity{

    constructor(x,y){
        super("EndPad",x,y,1,1,"░",1);

        this.hasSeg = false;
        this.collidable = false;
    }

    action(){
        if(game.player.hasSegmentOnCoordinates(this.x,this.y)) this.hasSeg = true;
        else this.hasSeg = false;
    }
}