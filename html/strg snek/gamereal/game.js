var map = []; 

class Game{
    
    constructor(){
        this.displayLoop = -1;
        this.controlLoop = -1;
        this.gameLoop = -1;

        this.player = new Player(10,10);
        this.death = false;
        this.control = true;
        this.inputBuffer = new InputBuffer();

        this.checkX = 0;
        this.checkY = 0;
        this.checkColor = "white";
        this.checkRoom = null;
        this.previousCheck = null;

        this.entities = [];
        this.cptEnt = 0;

        this.scene = null;
        this.colorScene = null;

        this.listScene = [];
        this.cptScene = 0;

        this.flagName = [];
        this.flagValue = [];
        this.cptFlag = 0;

        this.powerPillTaken = new PowerPillTaken();
        this.deathMarkList = new DeathMarkList();

        this.process = [];
        this.cptProcess = 0;

        this.world = null;

        this.downPress = false;
        this.upPress = false;
        this.leftPress = false;
        this.rightPress = false;
        this.mPress = false;
		this.pPress  = false;
		this.lpress = false;
        this.spacePress = false;

        this.delayPause = 0;

        this.nbDeath = 0;
        this.timeStart = 0;
    }

    startIntro(){
        init();
        initBonus();

        this.gameLoop = setInterval(gameLoop,15);
        this.death = true;
        this.addProcess(new StartGameProcess());
    }

    startPlay(){
        screen.resetUI();
        screen.resetTextAbove();
        screen.draw(resource.get("src/snek.png"),0,0);
        this.world.start();

        clearInterval(this.displayLoop);
        this.displayLoop = setInterval(displayLoop,10);
        this.controlLoop = setInterval(controlLoop2,5);

        music.load("sound/towerDefenseTheme.mp3");
        music.setVolume(0.20);
    }

    start(){
        screen.draw(resource.get("src/snek.png"),0,0);

        init();
        initBonus();
        this.world.start();

        this.timeStart = Date.now();

        this.displayLoop = setInterval(displayLoop,10);
        this.gameLoop = setInterval(gameLoop,15);
        this.controlLoop = setInterval(controlLoop2,5);

        music.load("sound/towerDefenseTheme.mp3");
        music.setVolume(0.20);
    }

    continue(){
        screen.draw(resource.get("src/snek.png"),0,0);
        init();
        initBonus();
        
        game.deathMarkList.putMarks();

        game.loadScene(game.getScene(game.checkRoom),game.checkX,game.checkY);    

        this.timeStart = Date.now();

        this.displayLoop = setInterval(displayLoop,10);
        this.gameLoop = setInterval(gameLoop,15);
        this.controlLoop = setInterval(controlLoop2,5);

        music.load("sound/towerDefenseTheme.mp3");
        music.setVolume(0.20);
    }

    addEntity(ene){
        if(ene.color == "default") ene.color = this.colorScene;
        this.entities[this.cptEnt] = ene;
        if(ene.collidable) this.scene.room.positionEntity(ene);
        this.cptEnt++;
    }

    removeEntity(id){
        this.scene.room.removeEntity(this.entities[id]);
        this.entities.splice(id,1);
		this.cptEnt--;
    }

    removeAllEntities(){
        var total = this.cptEnt;
        for(var cpt=0;cpt<total;cpt++) this.removeEntity(0);
    }

    addScene(s){
        this.listScene[this.cptScene] = s;
        this.cptScene++;
    }

    getScene(name){
        for(var cpt=0;cpt<this.cptScene;cpt++)
            if (this.listScene[cpt].name == name) return this.listScene[cpt];

        return -1;
    }

    setFlag(name,value){
        if(!this.isFlag(name)){
            this.flagName[this.cptFlag] = name;
            this.flagValue[this.cptFlag] = value;
            this.cptFlag++;
        } else {
            for(var cpt=0;cpt<this.cptFlag;cpt++) 
                if(this.flagName[cpt] == name) 
                    this.flagValue[cpt] = value;
        }
    }

    isFlag(name){
        for(var cpt=0;cpt<this.cptFlag;cpt++)
            if(this.flagName[cpt] == name) return true;

        return false;
    }

    getFlag(name){
        for(var cpt=0;cpt<this.cptFlag;cpt++)
            if(this.flagName[cpt] == name) return this.flagValue[cpt];

        return false;
    }

    removeFlag(id){
        this.flagName.splice(id,1);
        this.flagValue.splice(id,1);
		this.cptFlag--;
    }

    removeAllFlags(){
        var total = this.cptFlag;
        for(var cpt=0;cpt<total;cpt++) this.removeFlag(0);
    }

    addProcess(pro){
        this.process[this.cptProcess] = pro;
        this.cptProcess++;
    }

    removeProcess(id){
        this.process.splice(id,1);
		this.cptProcess--;
    }

    loadScene(scene,x,y){
        this.removeAllEntities();
        this.scene = scene;
        if(scene.color != null) this.colorScene = scene.color;
        this.player.set(x,y);
        this.player.teleportSegment();
        this.addEntity(this.player);
        for (var cpt=0;cpt<scene.cptEntity;cpt++){
            if (scene.entities[cpt].active){
                scene.entities[cpt].reset();
                this.addEntity(scene.entities[cpt]); 
            }
        }

        this.scene = scene;

        //check flag
        if(scene.flag != null)
            this.setFlag(scene.flag,scene.flagVal);
        
    }

    gameOver(){
        sfx.death();

        this.nbDeath++;
        this.death = true;
        this.control = false;
        this.player.downMove = false;
        this.player.upMove = false;
        this.player.leftMove = false;
        this.player.rightMove = false;
        this.inputBuffer.emptyBuffer();
        this.addProcess(new GameOverProcess());
    }

    encounter(ent1,ent2){
        ent1.encounter(ent2);
        ent2.encounter(ent1);
    }

    setCheckPoint(room,x,y,check){
        if (this.previousCheck != null) this.previousCheck.activated = false;
        this.checkRoom = room;
        this.checkX = x;
        this.checkY = y;
        this.checkColor = this.colorScene;
        this.previousCheck = check;
        saveCookie();
    }

    end(){
        this.player.str = " ";

        clearInterval(this.controlLoop);
        clearInterval(this.displayLoop);
        game.displayLoop = setInterval(displayIntroLoop,10);

        this.addProcess(new EndGameProcess());
    }
}

function displayLoop(){
    screen.colorBG("black");
    background.step();

    ui.displayGame(game.scene.room.layout,game.scene.room.width,game.scene.room.height,game.entities,game.cptEnt,game.player,game.colorScene);

    if(!game.death) {
        if(game.scene.displayName == null)
            ui.displayScore();
        else 
            ui.displayName(game.scene.displayName);
    }
}

function displayIntroLoop(){
    screen.colorBG("black");
    ui.displayGame(game.scene.room.layout,game.scene.room.width,game.scene.room.height,game.entities,game.cptEnt,game.player,game.colorScene);
    //ui.displayName(game.scene.displayName);
}

function gameLoop(){

        // check entités
        for(var cpt=0;cpt<game.cptEnt;cpt++){
            var isDeath = game.entities[cpt].action();
            if (!isDeath) game.entities[cpt].move();
            else {
                game.scene.room.removeEntity(game.entities[cpt]);
                game.removeEntity(cpt);
            }
        }

        // check process
        for(var cpt=0;cpt<game.cptProcess;cpt++){
            var isEnd = game.process[cpt].action();
            if (isEnd == -1)  game.removeProcess(cpt);
        }

        //check de changement de room
        if(game.player.upMove && game.player.y == 0 && game.scene.room.upExit != null){
            game.player.sectionManagement2(true,game.player.x,game.player.y);
            var r = game.getScene(game.scene.room.upExit)
            game.loadScene(r,game.player.x,r.room.height-1);
        }

        if(game.player.downMove && game.player.y == game.scene.room.height-1 && game.scene.room.downExit != null){
            game.player.sectionManagement2(true,game.player.x,game.player.y);
            var r = game.getScene(game.scene.room.downExit)
            game.loadScene(r,game.player.x,0);
        }

        if(game.player.leftMove && game.player.x == 0 && game.scene.room.leftExit != null){
            game.player.sectionManagement2(true,game.player.x,game.player.y);
            var r = game.getScene(game.scene.room.leftExit)
            game.loadScene(r,r.room.width-1,game.player.y);
        }

        if(game.player.rightMove && game.player.x == game.scene.room.width-1 && game.scene.room.rightExit != null){
            game.player.sectionManagement2(true,game.player.x,game.player.y);
            var r = game.getScene(game.scene.room.rightExit)
            game.loadScene(r,0,game.player.y);
        }
}

function controlLoop2(){
    if(game.control){
/* 
        if(map[38] && !game.upPress) {
            game.inputBuffer.add("up");
            game.upPress = true;
        } else game.upPress = false;

        if(map[40] && !game.downPress) {
            game.inputBuffer.add("down");
            game.downPress = true;
        } else game.downPress = false;

        if(map[39] && !game.rightPress) {
            game.inputBuffer.add("right");
            game.rightPress = true;
        } else game.rightPress = false;

        if(map[37] && !game.leftPress) {
            game.inputBuffer.add("left");
            game.leftPress = true;
        } else game.leftPress = false;
*/

        

        if(map[32]) {
            game.player.dash = true;
            if (!game.spacePress) sfx.dash();
            game.spacePress = true;
        } else{
            game.player.dash = false;
            game.spacePress = false;
        }

        //Music
		if (map[77]) {
			if(!game.mPress) music.toggle();
			game.mPress = true;
		} else game.mPress = false;

        //SFX
		if (map[76]) {
			if(!game.lpress) sfx.toogleSFX();
			game.lpress = true;
		} else game.lpress = false;
		
		//pause
        if(game.delayPause == 0){
            if (map[80]) {
                if(!game.pPress) pauseMenu.start();
                game.pPress = true;
            } else game.pPress = false;
        } else {
            game.delayPause--;
        }

    }
}
