class GameOverProcess extends Process{

    constructor(){
        super('GameOverProcess');
        this.step = 0;
        this.proc = null
        this.cpt = 25;
    }

    action(){

        switch(this.step){
            case 0: this.cpt--;
                    if(this.cpt == 0) {
                        this.proc = new UnloadRoomProcess();
                        this.step++;
                        ui.displayGameOver();
                        this.cpt = 0;
                    }
                    break;
            case 1: this.cpt++;
                    if(this.cpt > 1){
                        this.cpt = 0;
                        var ret = this.proc.action();
                        if (ret == -1){
                            // checkpoint 
                            game.scene.addEntity(new DeathMark(game.scene.name,game.player.x,game.player.y));
                            game.loadScene(game.getScene(game.checkRoom),game.checkX,game.checkY);    
                            game.colorScene = game.checkColor;
                            saveCookie();

                            //process
                            this.proc = new LoadRoomProcess();
                            game.player.color = "white";
                            this.step++;
                        }
                    }
                    break;
            case 2: var ret = this.proc.action();
                    if (ret == -1){
                        game.death = false;
                        game.control = true;
                        return -1
                    }
                    break;
            }
        return 0;
    }
}
