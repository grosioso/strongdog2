class PowerPillTaken{

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
        var pills = str.split('|');
        var nb = pills.length;

        for (var cpt=0;cpt<nb;cpt++){
            var pill = pills[cpt].split(",");
            this.add(pill[0],parseInt(pill[1]),parseInt(pill[2]));
        }
    }
}