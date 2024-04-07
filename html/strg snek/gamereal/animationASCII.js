class AnimationASCII{

    constructor(speed){
        this.nbStep = 0;
        this.cptStep = 0;
        this.steps = [];

        this.speed = speed || 0;

        this.cpt = 0;
    }

    nextStep(){
        this.cpt++;
        if (this.cpt >= this.speed) {
            this.cpt = 0;
            this.cptStep++;
        }
        if (this.cptStep >= this.nbStep) this.cptStep = 0;
        return this.steps[this.cptStep];
    }

    addStep(str){
        this.steps[this.nbStep] = str;
        this.nbStep++;
    }
}