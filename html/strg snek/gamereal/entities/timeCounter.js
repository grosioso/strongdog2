class TimeCounter extends Entity{

    constructor(x,y){
        super("TimeCounter",x,y,1,1,'X',1);

        this.collidable = true;
        this.inited = false;
    }

    action(){
        if(!this.inited){
            this.str = Math.floor((Date.now - game.timeStart)/ 1000);
            this.width = this.str.toString().length;
            this.inited = true;
        }
        

        return false;
    }
}