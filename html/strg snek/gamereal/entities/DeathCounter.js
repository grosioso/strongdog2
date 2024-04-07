class DeathCounter extends Entity{

    constructor(x,y){
        super("DeathCounter",x,y,1,1,'X',1);

        this.collidable = true;
        this.inited = false;
    }

    action(){
        
        if(!this.inited){
            this.str = game.nbDeath;
            this.width = this.str.toString().length;
            this.inited = true;
        }

        return false;
    }
}