class DeathMarkList{

    constructor(){
        this.nb = 0;
        this.roomP = [];
        this.x = [];
        this.y = [];
    }

    add(room,x,y){
        this.roomP[this.nb] = room;
        this.x[this.nb] = x;
        this.y[this.nb] = y;
        this.nb++;
    }

    check(room,x,y){
        for (var cpt=0;cpt<this.nb;cpt++){
            if(this.roomP[cpt] == room && this.x[cpt] == x && this.y[cpt] == y) 
                return true;
        }

        return false;
    }

    serialize(){
        var str = "";
        for (var cpt=0;cpt<this.nb;cpt++){
            var part = this.roomP[cpt] + "," + this.x[cpt] + "," + this.y[cpt];
            if(cpt != 0) str += "|";
            str += part;
        }

        return str;
    }

    deserialize(str){

        var deaths = str.split('|');
        var nb = deaths.length;
        for (var cpt=0;cpt<nb;cpt++){
            var death = deaths[cpt].split(",");
            this.add(death[0],parseInt(death[1]),parseInt(death[2]));
        }
    }

    putMarks(){
        for (var cpt=0;cpt<this.nb;cpt++){
            var sce = game.getScene(this.roomP[cpt]);
            if (sce != -1) sce.addEntity(new DeathMark(this.roomP[cpt],this.x[cpt],this.y[cpt],true));
        }
    }
}