class EndingEntity extends Entity{

    constructor(pad1,pad2,x,y){
        super("EndingEntity",x,y,1,1," ",1);

        this.pad1 = pad1;
        this.pad2 = pad2
    }

    action(){
        if(this.pad1.hasSeg && this.pad2.hasSeg){
            game.control = false;
            game.player.upMove = false;
            game.player.downMove = false;
            game.player.leftMove = false;
            game.player.rightMove = false;
            game.inputBuffer.emptyBuffer();

            game.player.endingMode = true;
        }
    }
}