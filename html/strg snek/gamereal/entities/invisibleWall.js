class InvisibleWall extends Entity{

    constructor(x,y){
        super("invisibleWall",x,y,1,1,'█',0);
        this.opacity = 0;
        this.color = "default";
    }

    action(){
        var distX = Math.abs(this.x - game.player.x);
        var distY = Math.abs(this.y - game.player.y);

        if(distX < 2 && distY < 2) this.opacity = 1;
        else if (distX < 3 && distY < 3) this.opacity = 0.7;
        else if (distX < 4 && distY < 4) this.opacity = 0.5;
        else if (distX < 5 && distY < 5) this.opacity = 0.3;
        else if (distX < 6 && distY < 6) this.opacity = 0.2;
        else if (distX < 7 && distY < 7) this.opacity = 0.1;

        else this.opacity = 0;
    }
}