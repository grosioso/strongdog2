class Checkpoint extends Entity{

    constructor(x,y){
        super("Checkpoint",x,y,1,1,"░",1);
        this.collidable = false;

        this.activated = false;
    }

    action(){

        this.color = game.player.color;

        if(game.player.x == this.x && game.player.y == this.y){
            this.str = '§';
            if (!this.activated) {
                this.activated = true;
                game.setCheckPoint(game.scene.name,game.player.x,game.player.y,this);
                sfx.checkpoint();
            }
        } else {
            this.str = "▓";
        }

        return false;
    }
}