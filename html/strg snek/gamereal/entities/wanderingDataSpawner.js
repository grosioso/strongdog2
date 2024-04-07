class WanderingDataSpawner extends Entity {

    constructor(x,y,direction,rateMin,rateMax,speedBullet){
        super("WanderingDataSpawner",x,y,1,1," ");

        this.direction = direction;
        this.speedBullet = speedBullet;

        this.rateMin = rateMin;
        this.rateMax = rateMax;
        this.rate = Math.floor(Math.random() * (this.rateMax - this.rateMin +1)) + this.rateMin;
        this.cpt = 0;

        this.collidable = false;
        this.displayed = false;

        this.receiver = null;
    }

    action(){
        if(this.receiver == null){
            this.cpt++;
            if(this.cpt >= this.rate){
                this.cpt =  0;
                this.rate = Math.floor(Math.random() * (this.rateMax - this.rateMin +1)) + this.rateMin;
                if (game.scene.room.isTileFree(this.x,this.y) == true)game.addEntity(new WanderingDataEntity(this.x,this.y,this.direction,this.speedBullet));
            }
        } else {
            if(this.receiver.received){
                this.receiver.received = false;
                if (game.scene.room.isTileFree(this.x,this.y) == true) game.addEntity(new WanderingDataEntity(this.x,this.y,this.direction,this.speedBullet));
            }
        }
    }
}