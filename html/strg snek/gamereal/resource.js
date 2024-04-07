class Resource{
    
    constructor(){
        this.file = [];
        this.cptRes = 0;
    }

    addResource(file){
        this.file[this.cptRes] = new Image();
        this.file[this.cptRes].nom = file;
        this.file[this.cptRes].type = "img";
        this.cptRes++;
    }
    
    addMusic(file){
        this.file[this.cptRes] = new Audio();
        this.file[this.cptRes].nom = file;
        this.file[this.cptRes].loop = true;
        this.file[this.cptRes].type = "audio";
        this.cptRes++;
    }
    
    addSFX(file){
        this.file[this.cptRes] = new Audio();
        this.file[this.cptRes].nom = file;
        this.file[this.cptRes].type = "audio";
        this.cptRes++;
    }
    
    get(nom){
        for(var cpt=0;cpt<this.cptRes;cpt++)
            if(this.file[cpt].nom == nom) return this.file[cpt];
        
        return -1;
    }
}