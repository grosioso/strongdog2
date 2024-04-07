class Mask extends Entity{
    constructor(x,y){
        super("mask",x,y,1,1,"X",0);
        this.death = false;
    }

    action(){
        return this.death;
    }
}