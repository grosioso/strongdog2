width = 256; height = 144;
displayX=0; displayY=0;
displayWidth = 500; displayHeight = 500; displaySize = 0;
dw=500; dh=500;
c = document.createElement("canvas");
c.width=256; c.height=144;
context = c.getContext("2d");
ctx=context;
displayC = document.createElement("canvas");
displayC.width = 0; 
displayC.height = 0;
displayCtx = displayC.getContext("2d");
document.body.appendChild(displayC);
c.width = width; c.height = height;
//ctx=displayCtx;
/*
displayC.style.cssText = 
"font-smooth: never;"+
"touch-action: manipulation;"+
"position: absolute; width: 100%; height: 100%;";
*/
interacted=false;

displayC.onmousedown = function(e){
if(e.button==0) mouse1press=true;
if(e.button==2) mouse2press=true;
}
displayC.onmouseup = function(e){
if(e.button==0) mouse1press=false;
if(e.button==2) mouse2press=false;
}
displayC.onmousemove = function(e){
rect = displayC.getBoundingClientRect();
mouseX=(e.clientX-displayX)*c.width /dw; 
mouseY=(e.clientY-displayY)*c.height/dh;
}
displayCtx.fillStyle = "#000000";
displayCtx.fillRect(0,0,
displayC.width,displayC.height);

GameLoop = function(){
//*
if (!armorgames){
displayC.width = window.innerWidth;  
displayC.height = window.innerHeight;
//displayC.width=c.width;
//displayC.height=c.height;
displayWidth = displayC.width;
displayHeight= displayC.height;
displaySize=displayWidth;
dw=displayWidth;
dh=dw*c.height/c.width;
if (displaySize>displayHeight &&
    displayC.width>=displayHeight*c.width/c.height) {
displaySize=displayHeight;
dh=displayHeight;
dw=dh*c.width/c.height;
}
displayX=displayWidth /2-dw/2;
displayY=displayHeight/2-dh/2;
}else {
//*/
displayWidth=1024; displayHeight=576;
displayC.width=1024; displayC.height=576;
dw=1024; dh=576;
}
room.loop();
menuUpdate();
displayCtx.webkitImageSmoothingEnabled = false;
displayCtx.mozImageSmoothingEnabled = false;
displayCtx.imageSmoothingEnabled = false;
displayCtx.drawImage(c,
Math.trunc(displayWidth/2-dw/2),
Math.trunc(displayHeight/2-dh/2),
dw,dh);
}

/*
// recording
recx=40; recy=80;
currentFrame=0;
displayC.style.cssText ="";
displayC.width=320;
displayC.height=c.height*180/4;
//displayC.height=c.height;
displayWidth = c.width;
displayHeight= c.height;
GameLoop=function(){
currentFrame++;
//room.loop();
menuUpdate();
displayCtx.webkitImageSmoothingEnabled = false;
displayCtx.mozImageSmoothingEnabled = false;
displayCtx.imageSmoothingEnabled = false;

ctx.fillStyle="#1dfa10";
ctx.fillRect(0,0,c.width,c.height);
room.update();
for (let i=0; i<room.obstacles.length; i++){
ctx.fillStyle="#ff00aa";
ctx.fillRect(room.obstacles[i].x,room.obstacles[i].y,room.obstacles[i].w,room.obstacles[i].h);
}

room.display();
displayCtx.drawImage(c,0,0,c.width,c.height);
let x=0; y=0;
displayCtx.drawImage(c,
recx,recy,c.width/3,c.height/3,
0,Math.trunc(currentFrame/2)*c.height/3+c.height,c.width/3,c.height/3);


}
//*/


saveGame=function(){};
loadGame=function(){};

progress=0
chapterProgress=0;
try{
chapterProgress=window.localStorage.getItem("progress");
} catch(e) {
console.log(e);
}
if (chapterProgress==null) chapterProgress=0;

console.log(chapterProgress);
/*
const electron = require("electron");
const {ipcRenderer} = electron;

ipcRenderer.on("Load Game",function(e,data){
let saveData=eval(data);
if (!isNaN(saveData)) {
progress=saveData;
chapterProgress=0;
}
if (!isNaN(saveData[0])) progress=saveData[0];
if (!isNaN(saveData[1])) chapterProgress=saveData[1];
if (saveData[2]!=undefined) keys=saveData[2];
});

saveGame=function(){
let s = "["+progress+","+chapterProgress+","+getKeysText()+"]";

ipcRenderer.send("Save Game",s);
}
loadGame=function(){
ipcRenderer.send("Load Game");
}

//var greenworks = require("greenworks");
//document.write(greenworks.init());
//*/

editing = false; drawbg=true;

tcode=function(i){
if (usingController) return buttons[i].code;
else return keys[i].code;
}

getKeysText = function(){
let s="[";
for (let i=0; i<keys.length; i++){
s=s.concat('{code:"'+keys[i].code+'",keyCode:'+keys[i].keyCode+'},');
}
s=s.concat("]");
return s;
}

hasKunai=false;
volume=.5;
failure=0;
room="";
menuOpen = false;
baseEnergy=3;
energyGain=true;
var PI=Math.PI;
inMobile=false;
fullscreened=false;
fastArt=false;
rightclickable=false;
armorgames=true;
usingmouse=true;

document.addEventListener("contextmenu",function(e) {
    //	Do something
if (!rightclickable){
    e.preventDefault();
    e.stopPropagation();
}
});


nextBgm="";
currentBgm="";
fps=16;
fadeoutBgm=0;

setBgm=function(str){
if (nextBgm!=str && fadeoutBgm==0) fadeoutBgm=100;
nextBgm=str;
}

bgmUpdate=function(){
bgm.volume=volume*1;
if (fadeoutBgm>0) {
if (fadeoutBgm>50)
bgm.volume=volume*(fadeoutBgm-50)/50*1;
else bgm.volume=0;
}
if (fadeoutBgm>0) fadeoutBgm--;
if (fadeoutBgm==1){
fadeoutBgm=0;
currentBgm=nextBgm;
bgm.pause(); 
bgm=makeSnd(nextBgm); 
bgm.currentTime=0;
}

if (bgm.currentTime==0) ps(bgm);
bgm.play();
}

changeRoom = function(nr,x,y){
failure=0;
if (x!=undefined) nr.startx=x;
if (y!=undefined) nr.starty=y;
if (nr.startx!=undefined) nr.player.x=nr.startx;
if (nr.starty!=undefined) nr.player.y=nr.starty;
if (nr.lastFrame!=undefined){
nr.fadef=1;
nr.lastFrame.getContext("2d").drawImage(c,0,0,c.width,c.height);
}
room.display=function(){};
room = nr;
}

windSnd = makeSnd("wind.wav");
windSnd.volume=.3;
windSnd.play();
windSnd.loop=true;
windSnd.onended = function(){
    this.currentTime = 0;
    this.play(); 
}

menuButtonImg=makeImg("menuButton.png");
menuImg=makeImg("menu.png");
arrowImg=makeImg("arrows.png");
fullscreenImg=makeImg("fullscreen.png");
ticSound = makeSnd("tic.wav");
selectedSound = makeSnd("selected.wav");

invincible=false;
starsOn=true;
slowdown=false;
slowfall=false;
pauseMenu=getMenu("pauseMenu");
logoImg=makeImg("armor games logo.png");

menuUpdate = function(){
if (escpress && !escwaspress) {
if (!menuOpen) pauseMenu=getMenu("pauseMenu");
menuOpen=!menuOpen; 
menux=0; menuy=0;	
}
if (menuOpen){
pauseMenu.update();
}
let wmb=makeObj(256-30+1,-5,30,40);
ctx.globalAlpha=.7;
ctx.drawImage(logoImg,
0,0,30,40,wmb.x,wmb.y,wmb.w,wmb.h);
ctx.globalAlpha=1;
if (mouse1press && !mouse1waspress && hitTestRect(
makeObj(mouseX,mouseY,1,1),wmb)){
mouse1press=false;
window.open("https://armor.ag/MoreGames");
}
}

draw = function(){
controllerUpdate();
windSnd.volume=volume*.7;
ticSound.volume=volume*.5; 
selectedSound.volume=volume*.5;
if (windSnd.currentTime==0)ps(windSnd);
windSnd.play();
windSnd.loop=true;

bgmUpdate();
GameLoop();
if (editing) selectObj(room);
WasPressedUpdate();

setTimeout(function(){draw();}, fps+slowdown*32);
}

volume=.4;
bgm=makeSnd("bgm silence.wav");
room = getRoom("title");
//room = getRoom("carmine16");
//armorgames=true;
if (armorgames){
vid = document.createElement("video");
vid.width=1024; vid.height=576;
vid.src="intro.m4v";
vid.type="video/mp4";
vid.id='vid';
document.body.appendChild(vid);
vid.play();
vid.onclick=function(){
mouse1press=false;
window.open("https://armor.ag/MoreGames");
}
if (vid.paused){
vid.muted=true;
vid.play();
}
vid.onended=function(){
draw();
vid.remove();
}
} else 
draw();

// or || \