class Swirl extends Entity{

    constructor(x,y){
        super("Swirl",x,y,31,11,
        "               |               " +
        "               |               " +
        "               |               " +
        "               |               " +
        "               |               " +
        "-------------(( ))-------------" +
        "               |               " +
        "               |               " +
        "               |               " +
        "               |               " +
        "               |               "
        ,1);

        this.collidable = true;

        this.cpt = 0;
        this.cycleDisp = 0

        this.animation = new AnimationASCII(6);
        this.animation.addStep(
        "                  |            " +
        "                  |            " +
        "                 |             " +
        "-----          |               " +
        "     ----      |               " +
        "         ----(( ))----         " +
        "               |      ----     " +
        "               |          -----" +
        "              |                " +
        "             |                 " +
        "             |                 "
        );

        this.animation.addStep(
        "     \\                   /     " +
        "       \\               /       " +
        "         \\           /         " +
        "           \\       /           " +
        "             \\   /             " +
        "             (( ))             " +
        "            /     \\            " +
        "          /         \\          " +
        "        /             \\        " +
        "      /                 \\      " +
        "    /                     \\    "
        );

        this.animation.addStep(
        "             |                 " +
        "             |                 " +
        "              |                " +
        "               |          -----" +
        "               |      ----     " +
        "         ----(( ))----         " +
        "     ----      |               " +
        "-----          |               " +
        "                 |             " +
        "                  |            " +
        "                  |            " 
        );

        this.animation.addStep(
        "               |               " +
        "               |               " +
        "               |               " +
        "               |               " +
        "               |               " +
        "-------------(( ))-------------" +
        "               |               " +
        "               |               " +
        "               |               " +
        "               |               " +
        "               |               "
        )
}

    action(){
        this.str = this.animation.nextStep();
        return false;
    }
}