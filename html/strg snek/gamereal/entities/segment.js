class Segment extends Entity{
    constructor(x,y,scene){
        var str = randomChar("0123456789+=-/&#AEIOU%!?;█");
        super("segment",x,y,1,1,str,0);
        this.color = game.player.color;
        this.lifetime = 0;
        this.isDead = false;
        this.scene = scene;
    }

    action(){
        return this.isDead;
    }
}