class PowerPill extends Entity{

    constructor(scene, x,y,isCheckpoint){
        var str = randomChar("0123456789+=-/&#AEIOU%!?;█");
        super("PowerPill",x,y,1,1,str,1);

        this.collidable = false;

        this.cpt = 0;
        this.cycleDisp = 0
        this.cycleStr = 0;

        this.isCheckpoint = isCheckpoint;

        if(game.powerPillTaken.check(scene,x,y)) this.active = false;
    }

    action(){
        this.cycleStr++;
        if(this.cycleStr > 10){
            this.cycleStr =0;
            this.str = randomChar("0123456789+=-/&#AEIOU%!?;█");
        }

        this.cycleDisp++;
        if(this.cycleDisp > 5){
            this.cycleDisp = 0;
            switch(this.cpt){
                case 1: this.opacity = 1; break;
                case 2: this.opacity = 0.8; break;
                case 3: this.opacity = 0.6; break;
                case 4: this.opacity = 0.4; break;
                case 5: this.opacity = 0.2; break;
                case 6: this.opacity = 0.4; break;
                case 7: this.opacity = 0.6; break;
                case 8: this.opacity = 0.8; break;
                case 9: this.opacity = 1; break;
            }
            this.cpt++;
            if(this.cpt > 9) this.cpt = 0;
        }

        if(game.player.x == this.x && game.player.y == this.y)  {

            sfx.token();

            game.player.nbSegment++;

            if(!game.player.upMove) game.addEntity(new BonusSpark(game.player.x,game.player.y,"up",0));
            if(!game.player.downMove) game.addEntity(new BonusSpark(game.player.x,game.player.y,"down",0));
            if(!game.player.leftMove) game.addEntity(new BonusSpark(game.player.x,game.player.y,"left",0));
            if(!game.player.rightMove) game.addEntity(new BonusSpark(game.player.x,game.player.y,"right",0));

            // info pour cookies
            game.powerPillTaken.add(game.scene.name,this.x,this.y);

            // set checkpoint
            if(this.isCheckpoint) game.setCheckPoint(game.scene.name,game.player.x,game.player.y);

            this.active = false;
            return true;
        } 
        return false;
    }
}