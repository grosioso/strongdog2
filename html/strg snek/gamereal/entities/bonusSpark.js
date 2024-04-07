class BonusSpark extends Entity{

    constructor(x,y,direction,step){
        super("bonusSpark",x,y,1,1,' ',1);
        
        switch(step){
            case 0: case 1: this.str = randomChar("$#%@"); break;
            case 2: case 3: this.str = randomChar("^~*+o"); break;
            case 4: case 5:this.str = randomChar("°.,"); break;
        }

        this.direction = direction;
        this.step = step;
        this.collidable = false;
        this.cptDisplay = 0;
    }

    action(){
        this.cptDisplay++;
        if(this.cptDisplay >= 5){
            if (this.step < 5) {
                var xDir = this.x;
                var yDir = this.y;
                switch(this.direction){
                    case 'up': yDir--; break;
                    case 'down': yDir++; break;
                    case 'left': xDir++; break;
                    case 'right': xDir--; break;
                    case null:
                        var dir = ['up','down','left','right'];
                        var dirD = dir[Math.floor(Math.random() * dir.length)];
                        switch(dirD){
                            case 'up': yDir--; break;
                            case 'down': yDir++; break;
                            case 'left': xDir++; break;
                            case 'right': xDir--; break;
                        }
                    break;
                }
                if(game.scene.room.isInBound(xDir,yDir) && game.scene.room.isTileFree(xDir,yDir)) game.addEntity(new BonusSpark(xDir,yDir,null,this.step+1));    
            }   
            return true;            
        }
        return false;
    }
}