class Entity{

    constructor(name,x,y,width,height,str,speed){
        this.name = name;
        this.type = "none";
        
        this.color = "white";
        this.opacity = 1;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.str = str;

        this.speed = 100 - (100 * speed);
        this.cptSpeed = 0;

        this.upMove = false;
        this.downMove = false;
        this.leftMove = false;
        this.rightMove = false;

        this.collidable = true;
        this.displayed = true;

        this.flag = null;

        this.key = uuidv4();

        this.active = true;
    }

    isMoving(){
        if (this.upMove || this.downMove || this.leftMove || this.rightMove) return true;
        return false;
    }

    set(x,y){
        this.x = x;
        this.y = y;
    }

    setSpeed (spd){
        this.speed = 100 - (100 * spd);
    }

    move(){
        this.cptSpeed++;
        if(this.cptSpeed >= this.speed){
            this.cptSpeed = 0;
            if (this.rightMove) {
                var ret = game.scene.room.moveEntity(this,this.x,this.y,this.x+1,this.y);
                if (ret == true) this.x++;
                else if(ret != false)  game.encounter(this,ret);
            }

            if (this.leftMove) {
                var ret = game.scene.room.moveEntity(this,this.x,this.y,this.x-1,this.y);
                if (ret == true) this.x--;
                else if(ret != false)  game.encounter(this,ret);
            }

            if (this.upMove) {
               var ret = game.scene.room.moveEntity(this,this.x,this.y,this.x,this.y-1);
               if (ret == true) this.y--;
               else if(ret != false)  game.encounter(this,ret);
            }

            if (this.downMove) {
                var ret = game.scene.room.moveEntity(this,this.x,this.y,this.x,this.y+1);
                if (ret == true) this.y++;
                else if(ret != false)  game.encounter(this,ret);
            }
        }
    }

    action(){}

    encounter(ent){}

    reset(){}
}