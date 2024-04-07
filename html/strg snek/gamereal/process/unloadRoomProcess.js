class UnloadRoomProcess extends Process{

    constructor(){
        super('UnloadRoomProcess');
        this.lines = 0;
    }

    action(){
        if(this.lines == game.scene.room.height) return -1;

        for(var cpt=0;cpt<game.scene.room.width;cpt++){
            ui.visible[this.lines][cpt] = false;
        }

        this.lines++;
        return 0;
    }
}