class Teleporter extends Entity{

    constructor(x,y,roomDest,xDest,yDest){
        super("Teleporter",x,y,1,1,' ',1);
        this.collidable = false;


    }

    action(){


        if(game.player.x == this.x && game.player.y == this.y)  {
            
        } 

        return false;
    }
}