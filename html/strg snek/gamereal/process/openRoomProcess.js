class OpenRoomProcess extends Process{

    constructor(scene,xGoal,yGoal,directionGoal,prevX,prevY){
        super('OpenRoomProcess');

        this.height = 0;
        this.width = 0;

        this.scene = scene;
        this.x = xGoal;
        this.y = yGoal;
        this.prevX = prevX;
        this.prevY = prevY;
        this.directionGoal = directionGoal;
    }

    action(){
        if (this.height >= 538 && this.width >= 1057) {
            this.height = 538;
            this.width = 1057;

            game.player.x  = this.prevX;
            game.player.y = this.prevY; 
            game.loadScene(game.getScene(this.scene),this.x,this.y);

            game.control = true;
            game.player.displayed = true;

            game.displayLoop = setInterval(displayLoop,10);
            screen.resetUI();
            screen.draw(resource.get("src/snek.png"),0,0);

            game.setCheckPoint(game.scene.name,game.player.x,game.player.y);

            return -1;
        }

        screen.resetUI();
        screen.draw(resource.get("src/bg.png"),0,0);
        screen.draw(resource.get("src/page.png"),25,30,this.width,this.height);

        if(this.height < 538)  this.height += 25;
        if (this.width < 1057) this.width += 40;

        return 0;
    }
}