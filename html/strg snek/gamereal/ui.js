class UI {
    ui = document.getElementById("ui");


    constructor(w,h){
        ui = document.getElementById("ui");

        this.visible = [];
        for(var y=0;y<h;y++){
            this.visible[y] = [];
            for(var x=0;x<w;x++) this.visible[y][x] = true;
        }

        this.xStart = 25;
        this.yStart = 30;
        this.xText = 30;
        this.yText = 73;
    }

    displayGame(layout,w,h,entities,cptEnt,player,color){
        var layoutList = [];
        var layoutColor = [];
        var layoutOpacity = [];
        var cptLayout = 0;

        // ground layout
        layoutList[cptLayout] = [];
        if (color == null) layoutColor[cptLayout] = "white";
        else layoutColor[cptLayout] = color;
        layoutOpacity[cptLayout] = 1;

        for(var x=0;x<h;x++){
            layoutList[cptLayout][x] = [];
            for(var y=0;y<w;y++) layoutList[cptLayout][x][y] = layout[x][y]; 
        }

        if(player.displayed) addToGrid(layoutList[cptLayout],player.str,player.width,player.height,player.x,player.y);  
            cptLayout++;

        // color layouts
        for(var cpt=0;cpt<cptEnt;cpt++){
            if(entities[cpt].displayed){
                var layoutFound = false;

                for(var cpt2=0;cpt2<cptLayout;cpt2++){
                    if(entities[cpt].color == layoutColor[cpt2] && entities[cpt].opacity == layoutOpacity[cpt2]){
                        layoutFound = true;
                        addToGrid(layoutList[cpt2],entities[cpt].str,entities[cpt].width,entities[cpt].height,entities[cpt].x,entities[cpt].y);
                    }
                }
    
                if(!layoutFound){
                    layoutList[cptLayout] = this.copyLayout(w,h);
                    layoutColor[cptLayout] = entities[cpt].color;
                    layoutOpacity[cptLayout] = entities[cpt].opacity;
                    addToGrid(layoutList[cptLayout],entities[cpt].str,entities[cpt].width,entities[cpt].height,entities[cpt].x,entities[cpt].y);
                    cptLayout++;
                }
            }
        }

        // affichage
        screen.resetText();
        for(var cpt=0;cpt<cptLayout;cpt++) 
            screen.drawGrid(layoutList[cpt],this.visible,w,h,layoutColor[cpt],layoutOpacity[cpt],this.xText,this.yText);
    }

    displayMap(world){
        var size = 20;

        var ctx = this.ui.getContext("2d");

        ctx.font = "25px newConsolas";
        ctx.fillStyle = "white";
        ctx.fillText(">" + world.name,this.startX + 45, this.startY + 60);


        var x = this.startX + 45;
        var y = this.startY + 80;
        ctx.fillStyle = "white";
        
        for(var cpty=0;cpty<world.height;cpty++) {
            for(var cptx=0;cptx<world.width;cptx++) {

                if (world.layout[cptx][cpty] != null && world.isDiscovered[cptx][cpty]) {
                    ctx.fillStyle = "white";
                    ctx.fillRect(x,y,size,size);
                }

                if (cpty == world.yPlayer && cptx == world.xPlayer) {
                    ctx.font = (size - 5) + "px newConsolas";
                    ctx.fillStyle = "black";
                    ctx.fillText("§",x+((size /2) - 5),y+((size/2) + 3));
                }
                x += size + 2 ;
            }
            x = this.startX + 45;
            y += size + 2;
        }
    }

    copyLayout(w,h){
        var newLay = [];
        for(var x=0;x<h;x++){
            newLay[x] = [];
            for(var y=0;y<w;y++)
                newLay[x][y] = ' '; 
        }     
        return newLay;
    }

    displayScore(){
        var x = 55;
        var y = 47;
        screen.resetTextAbove();
        screen.writeTextAbove("SNEK lvl: " + game.player.nbSegment,x,y)
    }

    displayName(name){
        var x = 55;
        var y = 47;
        screen.resetTextAbove();
        screen.writeTextAbove(name,x,y)
    }


    displayGameOver(){
        var x = 370;
        var y = 230;

        var messages = [
            "Please wait snek.",
            "Don't give up snek!",
            "You can do it snek!",
            "Bad luck, snek.",
            "Retry now snek.",
            "Please do not touch the data snek.",
            "ENCOURAGEMENT MESSAGE MISSING",
            "Snek in, snek out.",
            "You're on your way snek.",
            "I love you snek.",
            "Try again snek.",
            "Go back snek.",
            "Snek is at it again.",
            "Everything is coming up snek.",
            "No rest for the snek.",
            "null snek",
            "You can win this one snek!",
            "snek snek snek snek snek",
            "Crying is against the rules snek.",
            "Way to go, Snek",
            "The computer is full of snek",
            "SNEK!"
        ];

        var mess = messages[Math.floor(Math.random() * messages.length)];

        screen.resetTextAbove();
        screen.drawTextAbove(resource.get("src/gameOverScreen.png"),x,y);
        screen.writeTextAbove2(mess,x+70,y+90);
    }
}