class LoadMenu{

    constructor(){
        this.displayLoop = -1;
		this.inputLoop = -1;

        this.imageLoad = new Image();
        this.imageBar = new Image();

        this.splash = false;
        this.done = false
    }

    start(){
        this.imageLoad.src = "src/loadScreen.png"
        this.imageBar.src = "src/loadBar.png"
        this.imageLoad.onload = startLoad;
        
        loadSplash();
    }
        
}

function startLoad(){
    screen.draw(loading.imageLoad,0,0);
    loading.displayLoop = setInterval(displayLoopLoadMenu,10);
    loading.inputLoop = setInterval(inputLoopLoadMenu,10);
    load();
}
   
function inputLoopLoadMenu(){
    if (cptRess>=resource.cptRes && loading.splash) {
        if (!this.done){
            screen.drawTextAboveOpacity(resource.get("src/loadFinished.png"),1)
            this.done = true;
        } else{
            if(map[13]){
                clearInterval(loading.displayLoop);
                clearInterval(loading.inputLoop);
                //intro.start();
                agIntro();
            }
        }
    }
}

function displayLoopLoadMenu(){
    var x = 432;
    var y = 345;
    for (var cpt2=0;cpt2<Math.floor((cptRess/resource.cptRes)*35);cpt2++) {
        screen.draw(loading.imageBar,x,y);
        x += 8;
    }
}