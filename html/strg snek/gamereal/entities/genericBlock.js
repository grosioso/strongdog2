class GenericBlock extends Entity{

    constructor(x,y,str,color){
        super("Generic",x,y,1,1,str,1);
       
        this.color = color;

    }

    action(){
        return false;
    }
}