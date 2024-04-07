class WanderingDataReceiver extends Entity {
    constructor(x,y){
        super("WanderingDataReceiver",x,y,1,1," ");
        this.collidable = false;
        this.displayed = false;

        this.received = false;
        this.hitOnce = false;

        this.flags = [];
        this.flagsValue = [];
        this.cptFlag = 0;
    }

    action(){
        if (game.scene.room.entityGrid[this.y][this.x] != null && game.scene.room.entityGrid[this.y][this.x].name == "WanderingData"){
            this.received = true;
            game.scene.room.entityGrid[this.y][this.x].disappear = true;

            if(!this.hitOnce){
                this.hitOnce = true;
                for(var cpt=0;cpt<this.cptFlag;cpt++) game.setFlag(this.flags[cpt],this.flagsValue[cpt]);
            }
        }
    }

    addFlag(name,value){
        this.flags[this.cptFlag] = name;
        this.flagsValue[this.cptFlag] = value;
        this.cptFlag++;
    }

    reset(){
        this.received = false;
        this.hitOnce = false;
    }
    
}