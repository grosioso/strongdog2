class EndGameProcess extends Process{

    constructor(){
        super('EndGameProcess');

        this.step = 0;

        this.opacity = 1;

        this.cpt = 0;
        this.stepText = 0;
        this.limit = 0;
    }

    action(){
        switch(this.step){
            case 0: 
                screen.drawTextAboveOpacity(resource.get("src/dark.png"),1)
                game.loadScene(game.getScene("intro0s"),1,1);
                this.step++;
                this.limit = 100;
                break;
            case 1: 
                this.cpt++;
                    if(this.cpt >= this.limit){
                        this.cpt = 0;
                        if (this.opacity <= 0) {
                            this.step++;
                            this.limit = 100;
                        } else {
                            this.opacity -= 0.05;
                            screen.resetTextAbove();
                            screen.drawTextAboveOpacity(resource.get("src/dark.png"),this.opacity);
                            this.limit = 5;
                        }
                    }
                break;
            case 2: 
                if (this.stepText > 5) {
                    this.step++;
                    this.limit = 50;
                    this.cpt = 0;
                    this.stepText = 0;
                    this.opacity = 0;
                } else {
                    this.cpt++;
                    if(this.cpt >= this.limit){
                        this.cpt = 0;
                        this.stepText++;
                        switch(this.stepText){
                            case 1: game.addEntity(new Line("NETWORK REPAIRED",2,2)); this.limit = 50; break;
                            case 2: game.addEntity(new Line("RECONNECTION WITH USER 422.124.552.21 _-BLADEXPERT777-_",2,3)); this.limit = 50; break;
                            case 3: game.addEntity(new Line("CONNECTION ESTABLISHED",2,4)); this.limit = 200; break;
                            case 4: game.addEntity(new Line(">SUPERBURGER: ily <3",2,5)); this.limit = 150; break;
                            case 5: game.addEntity(new Line(">_-BLADEXPERT777-_: lov u too <3",2,6)); this.limit = 150; break;
                        }
                    }
                }
                break;
            case 3:
                this.cpt++;
                if(this.cpt >= this.limit){
                    this.cpt = 0;
                    if (this.opacity > 1) {
                        this.step++;
                    } else {
                        this.opacity += 0.05;
                        screen.resetTextAbove();
                        screen.drawTextAboveOpacity(resource.get("src/dark.png"),this.opacity);
                        this.limit = 5;
                    }
                }
                break;
            case 4:
                screen.drawTextAbove(resource.get("src/dark.png"),0,0);
                screen.drawTextAbove(resource.get("src/credits.png"),150,75);
                return -1;
                break;
            }
        return 0;
    }
}