class World{

/*
          width X
        +------------->
        |
height Y|
        |
        |
        \/
*/

    constructor(name,width,height,startRoomX,startRoomY,startPlayerX,startPlayerY){
        this.name = name;
        this.width = width;
        this.height = height;

        this.startRoomX = startRoomX;
        this.startRoomY = startRoomY;
        this.startPlayerX = startPlayerX;
        this.startPlayerY = startPlayerY;

        this.layout = [];
        
        var idStr = 0;
        for(var x=0;x<this.width;x++){
            this.layout[x] = [];
            for(var y=0;y<this.height;y++) this.layout[x][y] = null;
        }

    }

    set(scene,x,y){
        this.layout[x][y] = scene;

        //connection left
        if(x-1 >= 0 && this.layout[x-1][y] != null){
            var scene2 = this.layout[x-1][y];
            scene.room.leftExit = scene2.name;
            scene2.room.rightExit = scene.name;
        }

        //connection right
        if(x+1 < this.width && this.layout[x+1][y] != null){
            var scene2 = this.layout[x+1][y];
            scene.room.rightExit = scene2.name;
            scene2.room.leftExit = scene.name;
        }

        //connection up
        if(y-1 >= 0 && this.layout[x][y-1] != null){
            var scene2 = this.layout[x][y-1];
            scene.room.upExit = scene2.name;
            scene2.room.downExit = scene.name;   
        }

        //connection down
        if(y+1 >= 0 && this.layout[x][y+1] != null){
            var scene2 = this.layout[x][y+1];
            scene.room.downExit = scene2.name;
            scene2.room.upExit = scene.name;
        }

    }

    get(x,y){
        return this.layout[x][y];
    }

    start(){
        game.loadScene(this.get(this.startRoomX,this.startRoomY),this.startPlayerX,this.startPlayerY);
        game.setCheckPoint(this.get(this.startRoomX,this.startRoomY).name,this.startPlayerX,this.startPlayerY)
    }
}