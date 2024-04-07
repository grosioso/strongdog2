class AlarmClock extends Entity{

    constructor(x,y,){
        super("AlarmClock",x,y,1,1,"█",1);

        this.collidable = false;
    }

    action(){
        var now = new Date();
        var hour = now.getHours(); 
        var min = now.getMinutes();

        if (hour == 11 && min == 11){
            this.str = " ";
        } else {
            this.str = "█";
            if(game.player.x == this.x && game.player.y == this.y && !game.death) game.player.gameOver();
        }
    }
}