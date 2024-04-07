class Room{

/*
          width X
        +------------->
        |
height Y|
        |
        |
        \/
*/

    constructor(name,width,height,str){
        this.name = name;

        this.width = width;
        this.height = height;

        this.layout = [];
        this.entityGrid = [];

        var idStr = 0;
        for(var y=0;y<this.height;y++){
            this.layout[y] = [];
            this.entityGrid[y] = [];
            for(var x=0;x<this.width;x++){
                this.layout[y][x] = str.charAt(idStr);
                this.entityGrid[y][x] = null;
                idStr++
            }
        }

        this.leftExit = null;
        this.rightExit = null;
        this.upExit = null;
        this.downExit = null;
    }

    positionEntity(ent){
        for(var x=0;x<ent.width;x++)
            for(var y=0;y<ent.height;y++)
                if (this.isInBound(ent.x + x,ent.y + y)) this.entityGrid[ent.y + y][ent.x + x] = ent;
    }

    posEnt(ent,x,y){
        for(var cx=0;cx<ent.width;cx++)
            for(var cy=0;cy<ent.height;cy++)
                this.entityGrid[y + cy][x + cx] = ent;
    }

    removeEntity(ent){
        if(ent.collidable){
            for(var cx=0;cx<ent.width;cx++)
                for(var cy=0;cy<ent.height;cy++){
                    this.entityGrid[ent.y + cy][ent.x + cx] = null;
                }
        }
    }

    moveEntity(ent,prevX,prevY,x,y){
        if (!ent.collidable) return true;
        this.removeEntity(ent);
        var ret = this.isTilesFree(x,y,ent.width,ent.height,ent.key);
        if(ret == true) this.posEnt(ent,x,y);
        else this.posEnt(ent,prevX,prevY);

        return ret;
    }

    isInBound(x,y){
        if(x >= 0 && y >= 0 && x < this.width && y < this.height) return true;
        return false;
    }
    
    isCollisionLeft(ent){
        if (ent.leftMove && this.isTilesFree(ent.x-1,ent.y,ent.width,ent.height,ent.key) != true) return true;
        return false;
    }

    isCollisionRight(ent){
        if (ent.rightMove && this.isTilesFree(ent.x+1,ent.y,ent.width,ent.height,ent.key) != true) return true;
        return false;
    }

    isCollisionUp(ent){
        if (ent.upMove && this.isTilesFree(ent.x,ent.y-1,ent.width,ent.height,ent.key) != true) return true;
        return false;
    }

    isCollisionDown(ent){
        if (ent.downMove && this.isTilesFree(ent.x,ent.y+1,ent.width,ent.height,ent.key) != true) return true;
        return false;
    }

    collisionEntity(ent){
        debug.entityName = ent.name;
        debug.x = ent.x;
        debug.y = ent.y;
        debug.inbound = this.isInBound(ent.x,ent.y);

        if (ent.leftMove){
            var tst = this.isTilesFree(ent.x-1,ent.y,ent.width,ent.height,ent.key);
            if (tst != true && tst != false) return tst;
        }

        if (ent.rightMove){
            var tst = this.isTilesFree(ent.x+1,ent.y,ent.width,ent.height,ent.key);
            if (tst != true && tst != false) return tst;
        } 

        if (ent.upMove){
            var tst = this.isTilesFree(ent.x,ent.y-1,ent.width,ent.height,ent.key);
            if (tst != true && tst != false) return tst;
        }

        if (ent.downMove) {
            var tst = this.isTilesFree(ent.x,ent.y+1,ent.width,ent.height,ent.key);
            if (tst != true && tst != false) return tst;
        }            
        
        return -1;
    }

    isTileFree(x,y,key){
        if(key != undefined){
            if (this.isInBound(x,y) && this.layout[y][x] == ' ' && (this.entityGrid[y][x] == null || this.entityGrid[y][x].key == key)) return true;
            if (this.isInBound(x,y) && this.entityGrid[y][x] != null) return this.entityGrid[y][x];
        } else {
            if (this.isInBound(x,y) && this.layout[y][x] == ' ' && this.entityGrid[y][x] == null) return true;
            if (this.isInBound(x,y) && this.entityGrid[y][x] != null) return this.entityGrid[y][x];
        }
        return false;
    }

    isTilesFree(x,y,width,height,key){
        for(var cx=0;cx<width;cx++){
            for(var cy=0;cy<height;cy++){
                var ret =  this.isTileFree(x + cx,y + cy,key);
                if (ret != true)  return ret;
            }
        }
        return true;
    }
}