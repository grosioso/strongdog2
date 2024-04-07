class Wave extends Entity{

    constructor(x,y){
        super("Wave",x,y,54,5,
            "        ████████████                                  " +
            "   █████            ███                               " +
            "███                    ███                          ██" +
            "                          ██                ████████  " +
            "                            ████████████████          "  
        ,1);

        this.collidable = true;

        this.cpt = 0;
        this.cycleDisp = 0

        this.animation = new AnimationASCII(4);
        this.animation.addStep(
            "        ████████████                                  " +
            "   █████            ███                               " +
            "███                    ███                          ██" +
            "                          ██                ████████  " +
            "                            ████████████████          "  
        );
        this.animation.addStep(
            "                                                      " +
            "        ███████████                                   " +
            "████████           ███████                 ███████████" +
            "                          ████      ███████           " +
            "                             ███████                  "  
        );
        this.animation.addStep(
            "                                                      " +
            "                                                      " +
            "██████████████████████████████████████████████████████" +
            "                                                      " +
            "                                                      "  
        );
        this.animation.addStep(
            "                                                      " +
            "                               ██████████████████████ " +
            "██                         ████                      █" +
            "  █████████████████████████                           " +
            "                                                      "  
        );
        this.animation.addStep(
            "                              ████████████████████    " +
            "                            ██                    ███ " +
            "██                        ██                         █" +
            "  ███                  ███                            " +
            "     ██████████████████                               "  
        );
        this.animation.addStep(
            "                                                      " +
            "                               ██████████████████████ " +
            "██                         ████                      █" +
            "  █████████████████████████                           " +
            "                                                      "  
        );
        this.animation.addStep(
            "                                                      " +
            "                                                      " +
            "██████████████████████████████████████████████████████" +
            "                                                      " +
            "                                                      "  
        );
        this.animation.addStep(
            "                                                      " +
            "        ███████████                                   " +
            "████████           ███████                 ███████████" +
            "                          ████      ███████           " +
            "                             ███████                  "  
        );
    }

    action(){
        this.str = this.animation.nextStep();
        return false;
    }
}