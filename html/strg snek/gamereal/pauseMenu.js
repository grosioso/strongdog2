class PauseMenu{

    constructor(){
        this.inputLoop = -1;
        this.pPress = false;
    }

    start(){
       clearInterval(game.displayLoop);
       clearInterval(game.controlLoop);
       clearInterval(game.gameLoop);

       screen.drawTextAbove(resource.get("src/pause.png"),400,250);
       screen.drawTextAbove(resource.get("src/control.png"),850,350);
        
       this.pPress = true;
       this.inputLoop = setInterval(inputLoopPause,5);

       music.setVolume(0.05);
    }

    return(){
        clearInterval(this.inputLoop);
        screen.resetTextAbove();
        game.delayPause = 20;
        game.displayLoop = setInterval(displayLoop,10);
        game.gameLoop = setInterval(gameLoop,15);
        game.controlLoop = setInterval(controlLoop2,5);
        pauseMenu.pPress = false;
        music.setVolume(0.20);
    }
}

function inputLoopPause(){
    if (map[80]) {
        if(!pauseMenu.pPress) pauseMenu.return();
        pauseMenu.pPress = true;
    } else pauseMenu.pPress = false;

    if (map[77]) {
        if(!game.mPress) music.toggle();
        game.mPress = true;
    } else game.mPress = false;

    //SFX
    if (map[76]) {
        if(!game.lpress) sfx.toogleSFX();
        game.lpress = true;
    } else game.lpress = false;
}
