class BugWall extends Entity{

    constructor(x,y){
        var str = randomChar("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
        super("BugWall",x,y,1,1,str,0);
        
        this.cpt = 0;
        this.color = "default";
    }

    action(){
        this.cpt++;
        if(this.cpt > 10){
            this.cpt = 0;
            var rd = Math.floor(Math.random() * (10 - 1 +1)) + 1;
            if(rd == 1) this.str = randomChar("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
            else this.str = "█"
        }
    }
}