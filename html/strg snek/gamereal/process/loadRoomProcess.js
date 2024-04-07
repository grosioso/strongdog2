class LoadRoomProcess extends Process{

    constructor(){
        super('LoadRoomProcess');
        this.lines = 0;
    }

    action(){
        if(this.lines == game.scene.room.height) return -1;

        for(var cpt=0;cpt<game.scene.room.width;cpt++){
            ui.visible[this.lines][cpt] = true;
        }

        this.lines++;
        return 0;
    }
}