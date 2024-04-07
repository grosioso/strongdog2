class Player extends Entity{

    constructor(x,y){
        super("player",x,y,1,1,'§',0.96);

        this.horizontalSpeed = 0.96;
        this.horizontalDash = 0.98;
        this.verticalSpeed = 0.94;
        this.verticalDash = 0.96;
        
        this.dash = false;

        this.previousX = x;
        this.previousY = y;

        this.nbSegment = 3;
        this.segments = [];

        this.endingMode = false;
        this.ended = false;
        this.cptEnd = 0;
    }

    move(){
        if (this.endingMode) this.end();
        else {
            this.speedManagement();
            if(!game.isDead){
                this.cptSpeed++;
                if(this.cptSpeed >= this.speed){
                    this.cptSpeed = 0;
    
                    game.inputBuffer.movement();
    
                    if (this.rightMove) {
                        var ret = game.scene.room.moveEntity(this,this.x,this.y,this.x+1,this.y);
                        if (ret == true) {
                            this.previousX = this.x;
                            this.previousY = this.y;
                            this.x++;
                        } else if(ret != false)  game.encounter(this,ret);
                    }
        
                    if (this.leftMove) {
                        var ret = game.scene.room.moveEntity(this,this.x,this.y,this.x-1,this.y);
                        if (ret == true) {
                            this.previousX = this.x;
                            this.previousY = this.y;
                            this.x--;
                        } else if(ret != false)  game.encounter(this,ret);
                    }
        
                    if (this.upMove) {
                        var ret = game.scene.room.moveEntity(this,this.x,this.y,this.x,this.y-1);
                        if (ret == true) {
                        this.previousX = this.x;
                        this.previousY = this.y;          
                        this.y--;
                        } else if(ret != false)  game.encounter(this,ret);
                    }
        
                    if (this.downMove) {
                        var ret = game.scene.room.moveEntity(this,this.x,this.y,this.x,this.y+1);
                        if (ret == true) {
                            this.previousX = this.x;
                            this.previousY = this.y;     
                            this.y++;
                        } else if(ret != false)  game.encounter(this,ret);
                    }
                    this.gameOverCheck(ret);
                    this.sectionManagement(ret);
    
                    game.bufferMove = false;
                }    
            }
        }
    }

    sectionManagement(isNewSeg){
        if (isNewSeg == true) this.addSegment(this.previousX,this.previousY,game.scene.name);

        for(var cpt=0;cpt<this.segments.length;cpt++){
            this.segments[cpt].lifetime++;
            if (this.segments[cpt].lifetime >= this.nbSegment-1){
                this.segments[cpt].isDead = true;
                this.segments.splice(cpt, 1);
            }
        }
    }
    
    sectionManagement2(isNewSeg,x,y){
        if (isNewSeg == true) this.addSegment(x,y,game.scene.name);

        for(var cpt=0;cpt<this.segments.length;cpt++){
            this.segments[cpt].lifetime++;
            if (this.segments[cpt].lifetime >= this.nbSegment-1){
                this.segments[cpt].isDead = true;
                this.segments.splice(cpt, 1);
            }
        }
    }

    addSegment(x,y,room){
        var seg = new Segment(x,y,room);
        if(room == game.scene.name) game.addEntity(seg);
        this.segments.push(seg);
    }

    teleportSegment(){
        for(var cpt=0;cpt<this.segments.length;cpt++)
            if(game.scene.name == this.segments[cpt].scene) 
                game.addEntity(this.segments[cpt]);
    }

    removeAllSegments(){
        this.segments.splice(0,this.nbSegment);
    }

    speedManagement(){
        if(this.dash){
            if(this.rightMove || this.leftMove) this.setSpeed(this.horizontalDash);
            if(this.upMove || this.downMove) this.setSpeed(this.verticalDash);
        } else {
            if(this.rightMove || this.leftMove) this.setSpeed(this.horizontalSpeed);
            if(this.upMove || this.downMove) this.setSpeed(this.verticalSpeed);
        }
    }

    gameOverCheck(ret){
        if(this.downMove || this.upMove || this.leftMove || this.rightMove )
            if(ret != true) this.gameOver();
    }

    gameOver(){
        game.inputBuffer.emptyBuffer();
        game.gameOver();
        for(var cpt=0;cpt<this.segments.length;cpt++){
            this.segments[cpt].isDead = true;
            if(game.scene.name == this.segments[cpt].scene) 
                for(var cpt2=0;cpt2<6;cpt2++)
                    game.addEntity(new DamageSparkEntity(this.segments[cpt].x,this.segments[cpt].y,0));
        }

        this.removeAllSegments();
    }

    hasSegmentOnCoordinates(x,y){
        if(this.x == x && this.y == y) return true;
        for(var cpt=0;cpt<this.segments.length;cpt++){
            if(this.segments[cpt].x == x && this.segments[cpt].y == y)
                return true;
        }

        return false;
    }
    
    end(){
        if (!this.ended){
            this.segments[this.cptEnd].str = "█"
            this.cptEnd++;
    
            if(this.cptEnd == this.segments.length -1){
                game.end();
                this.ended = true;
            }
        }
    }
}