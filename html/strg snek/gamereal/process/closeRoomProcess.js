class CloseRoomProcess extends Process{

    constructor(scene,xGoal,yGoal,directionGoal,prevX,prevY){
        super('CloseRoomProcess');
        this.height = 538;
        this.width = 1057;

        this.scene = scene;
        this.x = xGoal;
        this.y = yGoal;
        this.prevX = prevX;
        this.prevY = prevY;
        this.directionGoal = directionGoal;
    }

    action(){
        if (this.height <= 0 || this.width <= 0) {
            game.addProcess(new OpenRoomProcess(this.scene,this.x,this.y,this.directionGoal,this.prevX,this.prevY));
            return -1;
        }

        screen.resetUI();
        screen.resetTextAbove();
        screen.draw(resource.get("src/bg.png"),0,0);
        screen.draw(resource.get("src/page.png"),25,30,this.width,this.height);

        this.height -= 15;
        this.width -= 1;

        return 0;
    }
}