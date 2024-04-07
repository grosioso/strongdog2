class WanderingDataEntity extends Entity{

    constructor(x,y,direction,speed){
        var str = randomChar("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
        var spd = 1;
        if (speed != undefined) spd = speed;
        super("WanderingData",x,y,1,1,str,spd);

        this.cpt = 0;
        this.direction =  direction;

        this.bounced = false;
        this.kill = false;
        this.disappear = false;
    }

    action(){
        // disparait par collision
        if(this.kill) {this.die(); return true;}

        //récupéré par receiver
        if(this.disappear)return true;

        this.cpt++;
        if(this.cpt == 2){
            switch(this.direction){
                case "up": this.upMove = true; break;
                case "down": this.downMove = true; break;
                case "left": this.leftMove = true; break;
                case "right": this.rightMove = true; break;
            }
        }

        if (this.leftMove && !game.scene.room.isInBound(this.x-1,this.y)) return true;
        if (this.rightMove && !game.scene.room.isInBound(this.x+this.width,this.y)) return true;
        if (this.upMove && !game.scene.room.isInBound(this.x,this.y-1)) return true;
        if (this.downMove && !game.scene.room.isInBound(this.x,this.y+this.height)) return true;

        if (this.leftMove && game.scene.room.isInBound(this.x-1,this.y) && game.scene.room.layout[this.y][this.x-1] != ' ') {this.die(); return true;}
        if (this.rightMove && game.scene.room.isInBound(this.x+this.width,this.y) && game.scene.room.layout[this.y][this.x+this.width] != ' ') {this.die(); return true;}
        if (this.upMove && game.scene.room.isInBound(this.x,this.y-1) && game.scene.room.layout[this.y-1][this.x] != ' ') {this.die(); return true;}
        if (this.downMove && game.scene.room.isInBound(this.x,this.y+this.height) && game.scene.room.layout[this.y+this.height][this.x] != ' ') {this.die(); return true;}


    }

    encounter(ent){
            this.kill = true;
    }

    die(){
        for(var cpt=0;cpt<3;cpt++) game.addEntity(new DamageSparkEntity(this.x,this.y,0));
    }
}