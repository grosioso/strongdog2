class FlagBlockEntity extends Entity{

    constructor(x,y,flag){
        super("FlagBlock",x,y,1,1,'█',1);

        this.collidable = false;
        this.color = "default";

        this.flag = flag;
    }

    action(){
        if(game.getFlag(this.flag)){
            this.str = " ";
        } else {
            this.str = "█";
            if(game.player.x == this.x && game.player.y == this.y && !game.death) 
                game.player.gameOver()
        }

        return false;
    }
}