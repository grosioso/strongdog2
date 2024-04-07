class Scene{

    constructor(name){
        this.name = name;
        this.room = null;
        this.entities = []
        this.cptEntity = 0;

        this.generic = [];
        this.genericValue = [];
        this.flagValue = [];
        this.cptGeneric = 0;

        this.uniqueEnt = [];
        this.uniqueEntValue = [];
        this.cptUnique = 0;

        this.color = null;
        this.displayName = null;

        this.flag = null;
        this.flagVal= null;
    }

    setRoom (room){
        this.room = room;

        for(var y=0;y<this.room.height;y++){
            for(var x=0;x<this.room.width;x++){
                //Entity générique
                for(var cpt=0;cpt<this.cptGeneric;cpt++){
                    if (this.room.layout[y][x] == this.genericValue[cpt]){
                        this.room.layout[y][x] = ' ';
                        var ent = '';
                        switch(this.generic[cpt]){
                            case "powerPill": ent = new PowerPill(this.name,x,y,true);break;
                            case "powerPillNoCheckpoint": ent = new PowerPill(this.name,x,y,false);break;
                            case "wanderingDown" : ent = new WanderingDataSpawner(x,y,"down",5,15);break;
                            case "wanderingLeft" : ent = new WanderingDataSpawner(x,y,"left",5,15);break;
                            case "wanderingRight" : ent = new WanderingDataSpawner(x,y,"right",5,15);break;
                            case "wanderingUp" : ent = new WanderingDataSpawner(x,y,"up",5,15);break;
                            case "lowWanderingDown" : ent = new WanderingDataSpawner(x,y,"down",15,30);break;
                            case "lowWanderingLeft" : ent = new WanderingDataSpawner(x,y,"left",15,30);break;
                            case "lowWanderingRight" : ent = new WanderingDataSpawner(x,y,"right",15,30);break;
                            case "lowWanderingUp" : ent = new WanderingDataSpawner(x,y,"up",15,30);break;
                            case "oneWayUp" : ent = new OneWayWall(x,y,"up");break;
                            case "oneWayDown" : ent = new OneWayWall(x,y,"down");break;
                            case "oneWayLeft" : ent = new OneWayWall(x,y,"left");break;
                            case "oneWayRight" : ent = new OneWayWall(x,y,"right");break;
                            case "wanderingReceiver" : ent = new WanderingDataReceiver(x,y);break;
                            case "invisibleWall" : ent = new InvisibleWall(x,y);break;
                            case "fakeWall" : ent = new FakeWall(x,y);break;
                            case "bugWall" : ent = new BugWall(x,y);break;
                            case "blueWall" : ent = new GenericBlock(x,y,"█","blue");break;
                            case "yellowWall" : ent = new GenericBlock(x,y,"█","yellow");break;
                            case "greenWall" : ent = new GenericBlock(x,y,"█","green");break;
                            case "purpleWall" : ent = new GenericBlock(x,y,"█","#800080");break;
                        }
                        ent.flag = this.flagValue[cpt];
                        this.addEntity(ent);
                    }
                }

                //Entity unique
                for(var cpt=0;cpt<this.cptUnique;cpt++){
                    if (this.room.layout[y][x] == this.uniqueEntValue[cpt]){
                        this.room.layout[y][x] = ' ';
                        this.uniqueEnt[cpt].x = x;
                        this.uniqueEnt[cpt].y = y;
                        this.addEntity(this.uniqueEnt[cpt]);
                    }
                }
            }
        }
    }

    addEntity(ent){
        this.entities[this.cptEntity] = ent;
        this.cptEntity++
    }

    addGeneric(ent,str,flag){
        this.generic[this.cptGeneric] = ent;
        this.genericValue[this.cptGeneric] = str;
        if (flag != undefined) this.flagValue[this.cptGeneric] = flag;
        else this.flagValue[this.cptGeneric] = null;
        this.cptGeneric++;
    }

    addUniqueEnt(ent,str){
        this.uniqueEnt[this.cptUnique] = ent;
        this.uniqueEntValue[this.cptUnique] = str;
        this.cptUnique++
    }

    setFlag(name,value){
        this.flag = name;
        this.flagVal = value;
    }
}