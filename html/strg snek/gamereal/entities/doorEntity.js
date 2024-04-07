class DoorEntity extends Entity{

    constructor(x,y,direction,valueOpen){
        super("door",x,y,1,1,' ',1);

        this.direction = direction;
        this.open = false;
        this.inited = false;
        
        this.collidable = false;
        this.displayed = true;

        this.length = 0;
        this.chars = [];

        this.valueOpen = valueOpen;

        this.color = "default";
    }

    action(){
        if(this.valueOpen != null){
            if(this.valueOpen <= game.player.nbSegment) this.open = true;
            else this.open = false;
        }

        if(!this.open){
            if (!this.inited){
                var x = this.x;
                var y = this.y;
        
                do{
                    game.scene.room.layout[y][x] = randomChar("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
                    this.chars[this.length] = game.scene.room.layout[y][x];
                    if(this.length == 0) this.str = this.chars[this.length];
                    this.length++;
                    switch(this.direction){
                        case 'up': y--;break;
                        case 'down': y++;break;
                        case 'left': x--;break;
                        case 'right': x++;break;
                    }
                } while (game.scene.room.layout[y][x] == ' '); 
                this.inited = true;
            } else {
                for(var cpt=this.length-1;cpt>0;cpt--) this.chars[cpt] = this.chars[cpt-1];
                this.chars[0] = randomChar("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

                var x = this.x;
                var y = this.y;

                for(var cpt=0;cpt<this.length;cpt++){
                    if(cpt == 0) this.str = this.chars[cpt];
                    else game.scene.room.layout[y][x] = this.chars[cpt];
                    switch(this.direction){
                        case 'up': y--;break;
                        case 'down': y++;break;
                        case 'left': x--;break;
                        case 'right': x++;break;
                    }
                }
            }
        } else {
            if (!this.inited){
                //ignore
            } else {
                for(var cpt=this.length-1;cpt>0;cpt--) this.chars[cpt] = this.chars[cpt-1];
                this.chars[0] = ' ';

                var x = this.x;
                var y = this.y;

                for(var cpt=0;cpt<this.length;cpt++){
                    game.scene.room.layout[y][x] = this.chars[cpt];
                    switch(this.direction){
                        case 'up': y--;break;
                        case 'down': y++;break;
                        case 'left': x--;break;
                        case 'right': x++;break;
                    }
                }
            }
        }
    }

    reset(){
        var x = this.x;
        var y = this.y;
        for(var cpt=0;cpt<this.length;cpt++){
            game.scene.room.layout[y][x] = ' ';
            switch(this.direction){
                case 'up': y--;break;
                case 'down': y++;break;
                case 'left': x--;break;
                case 'right': x++;break;
            }
        }
        this.inited = false;
        this.length = 0;
        this.chars = [];
    }
}