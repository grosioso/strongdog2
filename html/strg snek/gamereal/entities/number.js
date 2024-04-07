class NumberEntity extends Entity{

    constructor(x,y,val){
        super("NumberEntity",x,y,8,10,
        "        " +
        "        " +
        "        " +
        "        " +
        "        " +
        "        " +
        "        " +
        "        " +
        "        " +
        "        "
        ,1);
        this.value = val;
        this.setValue(this.value);
    }

    action(){ return false;}

    setValue(val){
        this.value = val;
        switch(val){
            case 0: 
                this.str =
                "  ████  " +
                " █    █ " +
                "█      █" +
                "█      █" +
                "█      █" +
                "█      █" +
                "█      █" +
                "█      █" +
                " █    █ " +
                "  ████  "
                break;
            case 1: 
                this.str=
                "    █   "+
                "   ██   "+
                " ██ █   "+
                "    █   "+
                "    █   "+
                "    █   "+
                "    █   "+
                "    █   "+
                "    █   "+
                "    █   " 
                break;
            case 2: 
                this.str=
                "  █████ "+
                " █     █"+
                "█      █"+
                "      █ "+
                "     █  "+
                "    █   "+
                "   █    "+
                "  █     "+
                " █      "+
                "████████" 
                break;
            case 3: 
                this.str=
                "  ████  " +
                " █    █ " +
                "█      █" +
                "       █" +
                "    ███ " +
                "      █ " +
                "       █" +
                "█      █" +
                " █    █ " +
                "  ████  "  
                break;
            case 4: 
                this.str=
                "      █ " +
                "     ██ " +
                "    █ █ " +
                "   █  █ " +
                "  █   █ " +
                " █    █ " +
                "████████" +
                "      █ " +
                "      █ " +
                "      █ "  
                break;
            case 5: 
                this.str = 
                "████████" +
                "█       " +
                "█       " +
                "█       " +
                "██████  " +
                "      █ " +
                "       █" +
                "       █" +
                "      █ " +
                "██████  "  
                break;
            case 6: 
                this.str =
                "  █████ " +
                " █     █" +
                "█       " +
                "█       " +
                "█ ████  " +
                "██    █ " +
                "█      █" +
                "█      █" +
                " █    █ " +
                "  ████  "
                break;
            case 7: 
                this.str=
                "████████" +
                "       █" +
                "      █ " +
                "     █  " +
                "  █████ " +
                "   █    " +
                "  █     " +
                " █      " +
                "█       " +
                "        "  
                break;
            case 8: 
                this.str = 
                "  ████  " +
                " █    █ " +
                "█      █" +
                "█      █" +
                " ██████ " +
                " █    █ " +
                "█      █" +
                "█      █" +
                " █    █ " +
                "  ████  "
                break;
            case 9: 
                this.str=
                "  ████  " +
                " █    █ " +
                "█      █" +
                "█      █" +
                " █    ██" +
                "  ████ █" +
                "       █" +
                "█      █" +
                " █    █ " +
                "  ████  " 
                break;
        }
    }
}