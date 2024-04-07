class Clock extends Entity{

    constructor(x,y,hour1,hour2,min1,min2){
        super("Clock",x,y,1,1," ",1);

        this.hour1 = hour1;
        this.hour2 = hour2;
        this.min1 = min1;
        this.min2 = min2;
        
        this.computeTime();

        this.collidable = true;
    }

    action(){
        this.computeTime();
        return false;
    }

    computeTime(){
        var now = new Date();
        var hour = now.getHours(); 
        var min = now.getMinutes();

        this.hour1.setValue(Math.floor(hour/10));
        this.hour2.setValue(hour%10);
        this.min1.setValue(Math.floor(min/10));
        this.min2.setValue(min%10);
    }
}