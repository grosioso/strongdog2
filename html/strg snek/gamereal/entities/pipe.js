class Pipe extends Entity{

    constructor(x,y,scene,xGoal,yGoal,directionGoal){
        super("Pipe",x,y,1,1,'░',1);

        this.collidable = false;
        
        this.scene = scene;
        this.xGoal = xGoal;
        this.yGoal = yGoal;
        this.directionGoal = directionGoal;

        this.start = false;
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
                if(this.scene != game.scene.name) game.loadScene(game.getScene(this.scene),this.xGoal,this.yGoal);
                else game.player.set(this.xGoal,this.yGoal);

                game.control = true;
                game.player.displayed = true;
    
                switch(this.directionGoal){
                    case "up": game.player.upMove = true;game.player.setSpeed(0.94);break;
                    case "down": game.player.downMove =  true;game.player.setSpeed(0.94);break;
                    case "left": game.player.leftMove = true;game.player.setSpeed(0.96);break;
                    case "right": game.player.rightMove = true;game.player.setSpeed(0.96);break;
                }
                
                this.start = false;
            }
        }

        return false;
    }
}