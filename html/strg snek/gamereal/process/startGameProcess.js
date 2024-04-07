class StartGameProcess extends Process{

    constructor(){
        super('StartGameProcess');

        this.step = 0;

        this.height = 289;
        this.width = 807;
        this.x = 157;
        this.y = 145;

        this.cpt = 0;
        this.stepText = 0;
        this.limit = 0;

        this.skippable = false;
    }

    action(){
        game.death = false;

        // skip button
        if( this.skippable && map[13]){
            screen.resetUI();
            screen.resetTextAbove();
            screen.resetText();
            game.loadScene(game.getScene("intro0s"),1,1);
            game.player.displayed = true;
            game.startPlay();
            return -1;
        }

        // process
        switch(this.step){
            case 0: 
                if (this.height <= 0 || this.width <= 0) {
                    this.step++;

                    this.x = 25;
                    this.y = 30;
                    this.skippable = true;
                } else {
                    screen.resetUI();
                    screen.draw(resource.get("src/bg.png"),0,0);
                    screen.draw(resource.get("src/introLoad.png"),this.x,this.y,this.width,this.height);
                    game.player.displayed = false;
                    this.height -= 5;
                    this.width -= 15;
                }
                break;
            case 1: 
                if (this.height >= 538 && this.width >= 1057) {
                    this.step++;
                    this.limit = 50;
                    game.loadScene(game.getScene("intro0s"),1,1);
                    screen.resetUI();
                    screen.resetTextAbove();
                    screen.resetText();
                    screen.draw(resource.get("src/snek.png"),0,0);
                    game.displayLoop = setInterval(displayIntroLoop,10);
                } else {
                    screen.resetUI();
                    screen.draw(resource.get("src/bg.png"),0,0);
                    screen.draw(resource.get("src/page.png"),this.x,this.y,this.width,this.height);
            
                    if(this.height < 538)  this.height += 25;
                    if (this.width < 1057) this.width += 40;
                }
                break;
            case 2: 
                if (this.stepText > 14) {
                    this.step++;
                    this.limit = 50;
                    this.cpt = 0;
                    this.stepText = 0;
                    game.loadScene(game.getScene("intro0s"),1,1);
                } else {
                    this.cpt++;
                    if(this.cpt >= this.limit){
                        this.cpt = 0;
                        this.stepText++;
                        switch(this.stepText){
                            case 1: game.addEntity(new Line("ESTABLISH CONNECTION...",2,2)); this.limit = 50; break;
                            case 2: game.addEntity(new Line("CONNECTION WITH USER 422.124.552.21 _-BLADEXPERT777-_",2,3)); this.limit = 50; break;
                            case 3: game.addEntity(new Line("CONNECTION ESTABLISHED - YOU ARE NOW TALKING - SAY HI",2,4)); this.limit = 100; break;
                            case 4: game.addEntity(new Line(">SUPERBURGER: hi!",2,5)); this.limit = 100; break;
                            case 5: game.addEntity(new Line(">_-BLADEXPERT777-_: Heyoooo",2,6)); this.limit = 100; break;
                            case 6: game.addEntity(new Line(">SUPERBURGER: how yuo been?",2,7)); this.limit = 100; break;
                            case 7: game.addEntity(new Line(">_-BLADEXPERT777-_: Fine and you",2,8)); this.limit = 100; break;
                            case 8: game.addEntity(new Line(">SUPERBURGER: awsome as alway",2,9)); this.limit = 50; break;
                            case 9: game.addEntity(new Line(">SUPERBURGER: miss u <3",2,10)); this.limit = 100; break;
                            case 10: game.addEntity(new Line(">_-BLADEXPERT777-_: aawww me too<3",2,11)); this.limit = 100; break;
                            case 11: game.addEntity(new Line(">SUPERBURGER: i wanted to tel u",2,12)); this.limit = 70; break;
                            case 12: game.addEntity(new Line(">SUPERBURGER: dont tell anyone",2,13)); this.limit = 100; break;
                            case 13: game.addEntity(new Line(">_-BLADEXPERT777-_: ?",2,14)); this.limit = 10; break;
                            case 14: game.addEntity(new Line(">",2,15)); this.limit = 100; break;
                        }
                    }
                }
                break;
            case 3:
                if (this.stepText > 5) {
                    game.player.displayed = true;
                    game.startPlay();
                    return -1;
                } else {
                    this.cpt++;
                    if(this.cpt >= this.limit){
                        this.cpt = 0;
                        this.stepText++;
                        switch(this.stepText){
                            case 1: game.addEntity(new Line("CONNECTION LOST",2,4)); this.limit = 100; break;
                            case 2: game.addEntity(new Line("TRYING TO RECONNECT",2,5)); this.limit = 100; break;
                            case 3: game.addEntity(new Line("AN UNKNOWN ERROR IS DISRUPTING THE SYSTEM",2,6)); this.limit = 100; break;
                            case 4: game.addEntity(new Line("RUN STRG.SNEK TO SEARCH FOR SOLUTIONS",2,7)); this.limit = 100; break;
                            case 5: game.addEntity(new Line("PRESS THE ARROW KEYS TO CONTROL SNEK",2,8)); this.limit = 20; break;
                        }
                    }
                }
                break;
            }
        return 0;
    }
}
