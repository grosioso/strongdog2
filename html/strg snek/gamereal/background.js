class Background {

    constructor(width,height){
        this.sizeX = 100;
        this.sizeY = 100;

        this.maxX = width/this.sizeX;
        this.maxY = height/this.sizeY;

        this.layout = [];
        for(var y=0;y<this.maxY;y++){
            this.layout[y] = [];
            for (var x=0;x<this.maxX;x++){
                this.layout[y][x] = new TileBG(x*this.sizeX,y*this.sizeY,this.sizeX,this.sizeY);
            }
        }

        this.opacity = 0;
        this.fadeIn = false;
        this.fadeOut = false;
        this.coolDown = 10;
    }

    step(){

        if(this.coolDown > 0){
            this.coolDown--;
            if (this.coolDown == 0) {
                this.fadeIn = true;
                var next = false;
                for(var y=0;y<this.maxY;y++){
                    for (var x=0;x<this.maxX;x++){
                        this.layout[y][x].active = false;
                        if ((Math.floor(Math.random() * 3) + 1) == 3){
                            if (!next){
                                this.layout[y][x].active = true;
                                next = true;
                            } else {
                                next =false;
                            }
                        }
                        else{
                            this.layout[y][x].active =false;
                            next = false;
                        }
                    }
                }
            }
        }

        if (this.fadeIn){
            this.opacity += 0.005;
            if(this.opacity >= 0.15){
                this.fadeIn = false;
                this.fadeOut = true;
            }
        }

        if(this.fadeOut){
            this.opacity -= 0.003;
            if(this.opacity <= 0){
                this.opacity = 0;
                this.fadeIn = false;
                this.fadeOut = false;
                this.coolDown = 10;
            }
        }

        for(var y=0;y<this.maxY;y++)
            for (var x=0;x<this.maxX;x++)
                if (this.layout[y][x].active) {
                    this.layout[y][x].draw(this.opacity);
                }
                
    }
}