class PipeBonus extends Entity{

    constructor(x,y,scene,xGoal,yGoal,directionGoal){
        super("PipeBonus",x,y,1,1,'░',1);

        this.collidable = false;
        
        this.scene = scene;
        this.xGoal = xGoal;
        this.yGoal = yGoal;
        this.directionGoal = directionGoal;

        this.start = false;
        this.procs = false;
        
        this.cpt = 0;
        this.cycleDisp = 0
    }

    action(){
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

        if(game.player.x == this.x && game.player.y == this.y && !this.start){
            game.control = false;
            game.player.upMove = false;
            game.player.downMove = false;
            game.player.leftMove = false;
            game.player.rightMove = false;
            game.inputBuffer.emptyBuffer();

            game.player.displayed = false;
            game.player.setSpeed(1);
            this.start = true;
            sfx.pipe();
        } 

        if(this.start){
            if(game.player.segments.length == 0){
                this.start = false;
                clearInterval(game.displayLoop);
                game.addProcess(new CloseRoomProcess(this.scene,this.xGoal,this.yGoal,this.directionGoal,game.player.x,game.player.y));
                game.player.x  = -1;
                game.player.y = -1; 
            }
        }

        return false;
    }
}