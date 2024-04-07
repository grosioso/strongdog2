class Line extends Entity{

    constructor(txt,x,y){
        var lgt = txt.length;
        super("Line",x,y,lgt,1,txt,1);
    }

    action(){
        return false;
    }
}