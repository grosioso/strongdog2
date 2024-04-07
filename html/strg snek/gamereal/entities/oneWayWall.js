class OneWayWall extends Entity{

    constructor(x,y,direction){
        var str = "";
        switch(direction){
            case "up": str="↑";break;
            case "down": str="↓";break;
            case "left": str="←";break;
            case "right": str="→";break;
        }
        super("oneWay",x,y,1,1,str,0);
        this.direction = direction;
        this.collidable = false;
        this.color = "default";
    }

    action(){
        this.manageOpacity();
        
        if(game.player.x == this.x && game.player.y == this.y && !game.death){
            switch(this.direction){
                case "up": if(!game.player.upMove) game.player.gameOver(); break;
                case "down": if(!game.player.downMove) game.player.gameOver(); break;
                case "left": if(!game.player.leftMove) game.player.gameOver(); break;
                case "right": if(!game.player.rightMove) game.player.gameOver(); break;
            }
        }
    }

    manageOpacity(){
        var distX = Math.abs(this.x - game.player.x);
        var distY = Math.abs(this.y - game.player.y);

        if((game.player.upMove && this.direction == "up") ||
            (game.player.downMove && this.direction == "down") ||
            (game.player.leftMove && this.direction == "left") ||
            (game.player.rightMove && this.direction == "right")){
            if(distX < 2 && distY < 2) this.opacity = 0;
            else if (distX < 3 && distY < 3) this.opacity = 0.1;
            else if (distX < 4 && distY < 4) this.opacity = 0.2;
            else if (distX < 5 && distY < 5) this.opacity = 0.3;
            else if (distX < 6 && distY < 6) this.opacity = 0.5;
            else if (distX < 7 && distY < 7) this.opacity = 0.7;
            else this.opacity = 1;
        } else{
            this.opacity = 1;
        }

    }
}