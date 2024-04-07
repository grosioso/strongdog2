class ColorPad extends Entity{

    constructor(x,y,color,){
        super("ColorPad",x,y,1,1,"░",1);
       this.collidable = false;
        this.color = color;
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
        
        if(game.player.x == this.x && game.player.y == this.y)  {
            game.player.color = this.color;
        }
    }
}