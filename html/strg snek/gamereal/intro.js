class Intro{

    constructor(){
        this.isContinue = false;

        this.displayLoop = -1;
        this.controlLoop = -1;

        var str= 
        " 000000 0000000 00000    00000            000000  0   0  0000  0  0" +
        "0          0    0    0  0                0        00  0  0     0 0 " +           
        " 00000     0    00000   0  000            00000   0 0 0  0000  00  " +           
        "      0    0    0  0    0    0     00          0  0  00  0     0 0 " +           
        " 00000     0    0   0    0000      00     00000   0   0  0000  0  0";
        this.width = 67;
        this.height = 5;
        this.layout = [];

        var idStr = 0;
        for(var y=0;y<this.height;y++){
            this.layout[y] = [];
            for(var x=0;x<this.width;x++){
                this.layout[y][x] = str.charAt(idStr);
                idStr++
            }
        }

        this.cursor = 0;
    }

    start(){
        screen.resetUI();
        screen.draw(resource.get("src/introStrsnk.png"),0,0);
        screen.colorBG("black")
        this.displayLoop = setInterval(introDisp,150);
        this.controlLoop = setInterval(introControl,10);

        sfx.load();

        if(checkCookie()) this.isContinue = true;

        if (isSafari) screen.drawTextAbove(resource.get("src/warning.png"),700,450);

        screen.drawTextAbove(resource.get("src/ag.png"),100,450);
        var ag = document.getElementById("ag")
        ag.style.top = 475;
        ag.style.left = 120;
        ag.style.fontSize = 17;
        
        ag.innerHTML = "<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"http://armor.ag/MoreGames\">Play more games</a><br><br><a target=\"_blank\" rel=\"noopener noreferrer\" href=\"http://www.facebook.com/ArmorGames\">Like us !</a>";

    }

    newGame(){
        ag.innerHTML = "";
        screen.resetTextAbove();

        clearInterval(this.displayLoop);
        clearInterval(this.controlLoop);
        screen.resetUI();
        game.startIntro();
        //game.start(); // debug
    }

    continue(){
        ag.innerHTML = "";
        screen.resetTextAbove();
        
        clearInterval(this.displayLoop);
        clearInterval(this.controlLoop);
        screen.resetUI();
        loadCookie();
        game.continue();
    }

    randomize(){
        for(var y=0;y<this.height;y++) 
            for(var x=0;x<this.width;x++) 
                if(this.layout[y][x] != " ") {
                    var rd = Math.floor(Math.random() * (4 - 1 +1)) + 1;
                    if(rd == 1) this.layout[y][x] = randomChar("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
                    else this.layout[y][x] = "█"
                }
    }

}

function introDisp(){
    screen.resetText();
    intro.randomize();
    var x = 190;
    var y = 210;
    for(var cpt=0;cpt< intro.height;cpt++){
        var str = "";
        for(var cpt2=0;cpt2<intro.width;cpt2++) str += intro.layout[cpt][cpt2];
        screen.writeLine(x,y,str,"white",1);
        y += 22;    
    }

    if(!intro.isContinue){
        y += 60;
        screen.writeLine(x,y,">Press [Enter] to Start SNEK","white",1);
    } else {
        y += 60;
        screen.writeLine(x,y,">Press [Enter] to Continue SNEK","white",1);
        y += 20;
        screen.writeLine(x,y,">Press [S] to Start Over SNEK","white",1);
    }


}

function introControl(){
    if(intro.isContinue){
        if(map[13]) intro.continue();
        if(map[83]) intro.newGame();
    } else {
        if(map[13]) intro.newGame();
    }
}

