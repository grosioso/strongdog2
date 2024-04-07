var game;
var screen;
var resource;
var background;
var ui;
var intro;
var loading;
var sfx;
var music;
var pauseMenu;

var isSafari = false;

var key;
var map = []; 
// ------------------------------------------------------------------------------------------------------------------------------------------
// Lancement du jeu
// ------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded",function(event){

	//cas spécial: browser Safari
	isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

	game = new Game();
	screen = new Screen(1100,600);
    ui = new UI(95,23);
    resource = new Resource();
    background =  new Background(1100,600);
    intro = new Intro();
    loading = new LoadMenu();
    
    sfx = new SFX();
    music = new Music();

    pauseMenu = new PauseMenu();
    
	loading.start();
});

onkeydown = onkeyup = function(e){
    map[e.keyCode] = e.type == 'keydown';
}

var keys = {};
window.addEventListener("keydown",
    function(e){
        keys[e.code] = true;
        switch(e.code){
            case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight":
            case "Space": e.preventDefault(); break;
            default: break; // do not block other keys
        }
    },
false);

window.addEventListener('keyup',
    function(e){
        keys[e.code] = false;
    },
false);

onkeydown = onkeyup = function(e){
    var kd = e.type == 'keydown';
    map[e.keyCode] = kd;

    if (game && game.control) {
        if(e.keyCode == 38 && !game.upPress && kd) {
            game.inputBuffer.add("up");
            game.upPress = true;
        } else game.upPress = false;

        if(e.keyCode == 40 && !game.downPress && kd) {
            game.inputBuffer.add("down");
            game.downPress = true;
        } else game.downPress = false;

        if(e.keyCode == 39 && !game.rightPress && kd) {
            game.inputBuffer.add("right");
            game.rightPress = true;
        } else game.rightPress = false;

        if(e.keyCode == 37 && !game.leftPress && kd) {
            game.inputBuffer.add("left");
            game.leftPress = true;
        } else game.leftPress = false;
    }
}