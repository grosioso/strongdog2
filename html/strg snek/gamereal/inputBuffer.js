class InputBuffer{

    constructor(){
        this.buffer = [];
        this.cptBuffer = 0;
    }

    add(direction){
        if(this.cptBuffer < 2){
            this.buffer[this.cptBuffer] = direction;
            this.cptBuffer++;
        }
    }

    emptyBuffer(){
        this.buffer.splice(0,this.buffer.length);
        this.cptBuffer = 0;
    }

    movement(){        
        var validMove = false;
        while(!validMove && this.cptBuffer > 0){
            switch(this.buffer[0]){
                case "up":
                    if(!game.player.downMove && !game.player.upMove){
                        game.player.upMove = true;
                        game.player.downMove = false;
                        game.player.leftMove = false;
                        game.player.rightMove = false;
                        validMove = true;
                        sfx.move();
                    }
                    break;
    
                case "down":
                    if(!game.player.upMove && !game.player.downMove){
                        game.player.downMove = true;
                        game.player.upMove = false;
                        game.player.leftMove = false;
                        game.player.rightMove = false;
                        validMove = true;
                        sfx.move();
                    }
                    break;
    
                case "right":
                    if(!game.player.leftMove && !game.player.rightMove){
                        game.player.downMove = false;
                        game.player.upMove = false;
                        game.player.leftMove = false;
                        game.player.rightMove = true;
                        validMove = true;
                        sfx.move();
                    }
                    break;
    
                case "left":
                    if(!game.player.rightMove && !game.player.leftMove){
                        game.player.downMove = false;
                        game.player.upMove = false;
                        game.player.leftMove = true;
                        game.player.rightMove = false;
                        validMove = true;
                        sfx.move();
                    }
                    break;
            }

            this.buffer.shift();
            this.cptBuffer--;
        }
    }
}