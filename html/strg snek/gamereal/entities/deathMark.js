class DeathMark extends Entity{

    constructor(scene,x,y,isList){
        super("DeathMark",x,y,1,1,'§',1);

        this.collidable = false;
        this.color = "grey";

        if(!isList) game.deathMarkList.add(scene,x,y);
    }

    action(){
        if(game.player.x == this.x && game.player.y == this.y) this.str = " ";
        else this.str = "§";
        
        return false;
    }
}