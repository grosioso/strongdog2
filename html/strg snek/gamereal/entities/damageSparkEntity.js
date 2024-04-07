class DamageSparkEntity extends Entity{

    constructor(x,y,step,isRed){
        super("damageSpark",x,y,1,1,' ',0.85);

        if(isRed != undefined && isRed == true) {
            this.red = true;
            this.color = "red";
        } else this.red = false;
        
        if(this.red){
            this.str = randomChar("01");
        } else {
            switch(step){
                case 0: this.str = randomChar("$#%@"); break;
                case 1: this.str = randomChar("^~*+o"); break;
                case 2: this.str = randomChar("°.,"); break;
            }
        }

        this.step = step;
        this.collidable = false;
        this.cptDisplay = 0;
    }

    action(){
        this.cptDisplay++;
        if(this.cptDisplay >= 5){
            if (this.step < 2) {
                var xDir = this.x;
                var yDir = this.y;
                var dir = ['up','down','left','right'];
                var dirD = dir[Math.floor(Math.random() * dir.length)];
                switch(dirD){
                    case 'up':
                        yDir--;
                        break;
    
                    case 'down':
                        yDir++;
                        break;
    
                    case 'left':
                        xDir++;
                        break;
    
                    case 'right':
                        xDir--;
                        break;
                }
                if(game.scene.room.isInBound(xDir,yDir) && game.scene.room.isTileFree(xDir,yDir)) game.addEntity(new DamageSparkEntity(xDir,yDir,this.step+1,this.red));    
            }   
            return true;            
        }
        return false;
    }
}