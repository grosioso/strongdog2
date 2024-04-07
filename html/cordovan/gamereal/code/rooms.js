tries = 8;
function getRoom(roomName,x,y){
let tr = new Room();
tr.x=0; tr.y=0; tr.w=c.width*2; tr.h=c.height*2;
tr.name = roomName;
tr.summonSound = makeSnd("fire.wav");
tr.ticSound = makeSnd("tic.wav");
tr.selectedSound = makeSnd("selected.wav");
tr.deathSound = makeSnd("death.wav");
tr.throwSound = makeSnd("throw.wav");
tr.tinkSound = makeSnd("tink.wav");
tr.gateSound = makeSnd("button sound.wav");
tr.fireSound = makeSnd("funnysound1.wav");
tr.doorSound = makeSnd("button sound.wav");
tr.noiseSound = makeSnd("noise.wav");
tr.toneSound = makeSnd("tone.wav");
tr.clickSound = makeSnd("click.wav");

tr.tree1Img = makeImg("tree1.png"); tr.tree2Img = makeImg("tree2.png");
tr.tree3Img = makeImg("tree3.png"); tr.tree4Img = makeImg("tree4.png");
tr.tree5Img = makeImg("pine1.png"); tr.tree6Img = makeImg("pine2.png");

tr.funnySound = [
makeSnd("funnysound1.wav"),makeSnd("funnysound2.wav"),
makeSnd("funnysound3.wav"),makeSnd("funnysound4.wav"),
makeSnd("funnysound5.wav"),makeSnd("funnysound6.wav"),
makeSnd("funnysound7.wav")
];
//if (x>160) tr.player.facing="left";
tr.startx=undefined; tr.starty=undefined;
tr.lastX=0; tr.lastY=0;
tr.envdrawn=false;
tr.skipping = false;
tr.kunais = new Array();
tr.kunai=undefined;
tr.dots = new Array();
tr.playerMoves = new Array(240);
tr.player=new Player(100,200);
tr.trees=[]; tr.obstacles=[];
tr.lamps=[]; tr.spikes=[]; 
tr.powerups=[]; tr.actions=[];
tr.orbs=[]; tr.boxes=[]; tr.displays=[]; tr.platforms=[];
tr.plates=[]; tr.clones=[]; tr.targets=[];
tr.replayFrame=0;
tr.clonetimer=0;
tr.treef=0;
tr.screenShake=0;
tr.timer=60;
tr.fadef=0;
tr.goodows=[
//pt(5,6),pt(11,6),pt(17,6),
//pt(5,12),pt(11,12),pt(18,14),pt(24,14),
];
tr.lastFrame=document.createElement("canvas");
tr.lastFrame.width=c.width;
tr.lastFrame.height=c.height;

tr.displayObstacles = function(){
ctx.fillStyle="#41465C";
for (let o=0; o<this.obstacles.length; o++){
let obj = this.obstacles[o];
obj.x*=.5; obj.y*=.5; obj.w*=.5; obj.h*=.5;
//ctx.fillRect(obj.x-this.cameraX,obj.y-this.cameraY,obj.w,obj.h);
obj.x/=.5; obj.y/=.5; obj.w/=.5; obj.h/=.5;
}
let obs = this.getObs();
let img = this.bricksImg;
for (let o=0; o<obs.length; o++){
let obj=obs[o];
ctx.globalAlpha = obj.alpha;
obj.x*=.5; obj.y*=.5; obj.w*=.5; obj.h*=.5;
obj.x-=this.cameraX;
obj.y-=this.cameraY;
//*
ctx.drawImage(img,
obj.x+room.cameraX+16,obj.y+this.cameraY,obj.w,obj.h,
obj.x,obj.y-(this.getName()=="form" || this.getName()=="undead"),obj.w,obj.h,
);
//*/
obj.x+=this.cameraX;
obj.y+=this.cameraY;
obj.x/=.5; obj.y/=.5; obj.w/=.5; obj.h/=.5;
}
//ctx.drawImage(img,0,0,c.width,c.height);
ctx.globalAlpha=1;
}

tr.drawEnv=function(){
drawCity(this);
}
tr.loop = function(){
if (this.fadef<=0 || this.fadef>100){
if (!menuOpen) this.update();
this.display();
if (menuOpen) {
ctx.fillStyle="#000000";
ctx.globalAlpha=.65;
ctx.fillRect(0,0,c.width,c.height);
ctx.globalAlpha=1;
}
}
if (this.fadef>0){
if (this.fadef<100 && this.fadef>0)
ctx.drawImage(this.lastFrame,0,0,c.width,c.height);
else this.display();
ctx.globalAlpha=curve(1-Math.abs(this.fadef-100)/100,1000);
ctx.fillStyle="#000000"
ctx.fillRect(0,0,c.width,c.height)
ctx.globalAlpha=1;
this.fadef+=5;
if (this.fadef>200) this.fadef=0;
}
//menuUpdate();
}
tr.skip=function(){
this.player.x=600;
}
tr.restart=function(){
if (this.powerups.length>0) failure=8.5;
let room=getRoom(this.name);
room.player.x=10;

let h=16;
room.player.y=room.h;
for (let i=0; i<tr.h; i+=h){
room.player.y-=h;
room.player.h-=10;
if(!hitTestObstacles(room,room.player)){
room.player.y+=h;
i=tr.h;
}
room.player.h+=10;
}


let tempFailure=failure;
changeRoom(room);
failure=tempFailure;
}
tr.randomNumber=0;
tr.displayFrontObs=function(){
for (let o=0; o<this.obstacles.length; o++){
let obj=this.obstacles[o];
obj.x*=.5; obj.y*=.5; obj.w*=.5; obj.h*=.5;
//*
ctx.drawImage(this.bricksImg,
obj.x+room.cameraX+16,obj.y+this.cameraY+16+2,obj.w,obj.h-2,
obj.x,obj.y+4,obj.w,obj.h-2,
);
//*/

obj.x/=.5; obj.y/=.5; obj.w/=.5; obj.h/=.5;
}

}
tr.shiftObs=function(x=0,y=0){
for (let i=0; i<this.obstacles.length; i++){
this.obstacles[i].x+=x;
this.obstacles[i].y+=y;
}
}
tr.spaceUpdate = function(){
this.replayFrame++;
if (this.replayFrame>170) this.replayFrame=0;
if (!fastArt && rnd()<1){
for (let i=0; i<1; i++){
let r=makeObj(Math.random()*c.width*2-1,1,1);
for (let t=0; t<30; t++){
r.y+=10;
let hit=false;
for (let o=0; o<this.obstacles.length; o++){
if (hitTestRect(r,this.obstacles[o])) hit=true;
}
if (hit){
collideObstacles(this,r);
r.y+=rnd()*10-4;
this.dots.push(new Splash(r));
t=30;
}}}}

if (room.player.y<0) {
room.player.y=0;
room.player.yVel=0;
}
this.treef++;
if (this.treef>=64) this.treef=0;
this.randomNumber+=Math.random()-.5;
for (let i=0; i<this.dots.length; i++){
if (this.dots[i]!=undefined){
this.dots[i].update(this);
}}
for (let i=0; i<this.dots.length; i++){
if (this.dots[i]!=undefined && this.dots[i].dead) {
this.dots.splice(i,1);
i=0;
}}
//*
if (rpress && !rwaspress) {
this.restart();
if (failure>5) failure=5;
}
//*/
for (let i=0; i<this.plates.length; i++){
this.plates[i].update(this,i,this.entitys.concat(this.clones));
}
for (let i=0; i<this.platforms.length; i++){
this.platforms[i].update(this,i);
}
for (let i=0; i<this.targets.length; i++){
this.targets[i].update(this,i,this.entitys.concat(this.clones));
}
//
// clone stuff
//
for (let i=0; i<this.clones.length; i++){
collideObstacles(this,this.clones[i]);
this.clones[i].update(this,i);
if (this.clones[i].x<0) this.clones[i].x=0;
if (this.clones[i].x>c.width*2-10) this.clones[i].x=c.width*2-10;
for (let s=0; s<this.spikes.length; s++){
if (hitTestRect(this.clones[i],this.spikes[s])) 
	this.clones[i].hurt();
}
}

for (let k=0; k<this.clones.length; k++){
for (let c=0; c<this.clones.length; c++){
if (k!=c && 
Math.abs(this.clones[k].y+this.clones[k].h/2-
this.clones[c].y-this.clones[c].h/2) < 10){
let ck=this.clones[k]; this.clones[k].hurt();
let cc=this.clones[c]; this.clones[c].hurt();
let width=Math.abs(cc.x+cc.w/2-ck.x-ck.w/2);
this.dots.push(new HLine(makeObj(
cc.x/2+cc.w/4+ck.x/2+ck.w/4-width/2,
cc.y/2+cc.h/4+ck.y/2+ck.h/4-4,width,12)));
}}
}
for (let k=0; k<this.clones.length; k++){
if (this.clones[k].dead) {
ps(this.deathSound);
this.dots.push(new Blast(this.clones[k]));
this.clones.splice(k,1);
k--;
}
}
for (let i=0; i<this.entitys.length; i++){
let e=this.entitys[i];
e.update(this,i);
// crush
collideObstacles(this,e); collideObstacles(this,e);
if (hitTestObstacles(this,e)) e.hurt();
for (let s=0; s<this.spikes.length; s++){	
if (hitTestRect(e,this.spikes[s]))  e.hurt();
}
}
this.collideObstacles(this.player);
for (let i=0; i<this.kunais.length; i++){
let k=this.kunais[i];
k.oldx=k.x; k.oldy=k.y;
if (k!=undefined){
let hit=false;
for (let w=0; w<12; w++){
let o=makeObj(
k.x+k.w/2-2+Math.cos(k.angle)*(w-6)*1.4,
k.y+k.h/2-1+Math.sin(k.angle)*(w-6)*1.4,2,2);
//console.log(o);
if (hitTestObstacles(this,o)) hit=true;
} 
if (k.stopped!=true) k.update(this,i);	
if (k.dead || !hitTestRect(this,k) || hit){
if (hit) {
this.tinkSound.currentTime=0;
this.tinkSound.play();
}
this.kunais.splice(i,1); i--;
}
}}

moveCameraX(this,this.player);
moveCameraY(this,this.player);
}
tr.displayEnv=function(){
//*/
ctx.fillStyle="#AFD8EE"; ctx.globalAlpha=.4;
displayArray(this.spikes);
displayArray(this,this.plates);
displayArray(this,this.entitys);
this.displayObstacles();
ctx.globalCompositeOperation="source-over";
}
tr.displayCity = function(imgY = 0){
this.deathSound.volume=volume*.5;
this.noiseSound.volume=volume*.5;
this.throwSound.volume=volume*.5;
this.gateSound.volume=volume*.1;
this.summonSound.volume=volume*.5;
this.tinkSound.volume=volume*.3;
this.ticSound.volume=volume*.5;
this.selectedSound.volume=volume*.5;
this.doorSound.volume=volume*.3;
this.toneSound.volume=volume*.2;
this.clickSound.volume=volume*.5;
this.cameraX*=.5; this.cameraY*=.5;
for (let i=0; i<this.funnySound.length; i++){
this.funnySound[i].volume=volume*.2;
}
if (!this.envdrawn) {
this.lamps=[];
this.trees=[];
this.shades=[];
this.drawEnv();
}
ctx.fillStyle="#202020";
ctx.imageSmoothingEnabled=false;
let floorY=275, roofY=100;
ctx.fillStyle="#504044";
//ctx.fillRect(0,0,c.width,c.height);
ctx.globalAlpha=1;
ctx.clearRect(0,0,c.width,c.height);
//*
this.displayEnv();
if (this.player.displayHud!=undefined)
this.player.displayHud(this);
this.cameraX/=.5; this.cameraY/=.5;
if (this.replayImg!=undefined){
ctx.globalAlpha=1;
ctx.fillStyle="#000000";
ctx.fillRect(2,2,85+2,48+2);
ctx.drawImage(this.replayImg,
0,Math.trunc(this.replayFrame/2)*48,85,48,3,3,85,48);
ctx.globalAlpha=1;
}
//*
if (this.tutorial!=undefined) {

if (this.replayImg!=undefined) {
let lines=[];
let x=0, w=0, index=0, width=c.width;
for (let i=0; i<this.tutorial.length; i++){
w+=getCharWidth(this.tutorial.charAt(i));
if (w-x>180) {
for (let e=0; e<this.tutorial.length; e++){
if (this.tutorial.charCodeAt(i-1)==32) e=this.tutorial.length+1;
else i--;
if (i<index) {e=this.tutorial.length+1; i=this.tutorial.length+1;}
}
lines.push(this.tutorial.substring(index,i));
x=w; index=i;
}
}
lines.push(this.tutorial.substring(index));
for (let i=0; i<lines.length; i++){
drawText(lines[i],95,(i)*15+6,1);
}
} else {
let lines=[];
let x=0, w=0, index=0, width=c.width;
for (let i=0; i<this.tutorial.length; i++){
w+=getCharWidth(this.tutorial.charAt(i));
if (w-x>c.width) {
for (let e=0; e<this.tutorial.length; e++){
if (this.tutorial.charCodeAt(i)==32) e=this.tutorial.length+1;
else i--;
if (i<index) {e=this.tutorial.length+1; i=this.tutorial.length+1;}
}
lines.push(this.tutorial.substring(index,i));
x=w;
index=i;
}
}
lines.push(this.tutorial.substring(index));
for (let i=0; i<lines.length; i++){
drawText(lines[i],trc(c.width/2-getTextWidth(lines[i])/2),(i)*15+3,1);
}}}}
tr.getObs=function(){
let obs=this.obstacles.concat(this.platforms);
return obs;
}
tr.transport=function(e){
let name=this.name,number=0;
for (let i=0; i<this.name.length; i++){
if (!isNaN(name)){
name=this.name.substr(0,i);
number=eval(this.name.substr(i));
i=name.length+1;
} else name=name.substr(1,name.length-1);
}
if (e.x<0) {
if (number==1) changeRoom(getRoom("select"));
else {
let rume=getRoom(name+(number-1),tr.w-8-room.player.w,tr.h)
rume.player.x=rume.w-rume.player.w-2;
changeRoom(rume);
}
}
if (e.x+e.w>this.w) {
changeRoom(getRoom(name+(number+1),10));
}
let h=16;
if (e.x<=0 || e.x+e.w>=this.w){
room.player.y=room.h;
for (let i=0; i<room.h; i+=h){
room.player.y-=h;
room.player.h-=10;
if(!hitTestObstacles(room,room.player)){
room.player.y+=h;
i=room.h;
}
room.player.h+=10;
}
}
}
tr.getName=function(){
let n=tr.name,number=0;
for (let i=0; i<tr.name.length; i++){
if (!isNaN(n)){
n=tr.name.substr(0,i);
number=eval(tr.name.substr(i));
i=n.length+1;
} else n=n.substr(1,n.length-1);
}
return n;
}
let n=tr.name,number=0;
for (let i=0; i<tr.name.length; i++){
//console.log(i+" "+name);
if (!isNaN(n)){
n=tr.name.substr(0,i);
number=eval(tr.name.substr(i));
i=n.length+1;
} else n=n.substr(1,n.length-1);
}
if (n=="carmine" && chapterProgress<number) {
chapterProgress=number-1;
try{
window.localStorage.setItem('progress',chapterProgress);
} catch(e){
console.log(e);
}
}
tr.update = function(){
if (!editing)
this.spaceUpdate();
}
tr.display=function(){
this.displayCity();
}
if (chapterProgress<number-1) chapterProgress=number-1;
//console.log(chapterProgress);
if (roomName == "title"){
setBgm("bgm ultradead.mp3");
tr.f=0;
tr.m=getMenu("startMenu");
tr.player = new Player(1240,-5182);
tr.obstacles = [
makeObj(-32,256-16,800,112+16*12),
makeObj(-16,176+16,80,96),
makeObj(256+32,192+16,400,96),
];
for (let i=0; i<tr.obstacles.length; i++){
let o=tr.obstacles[i];
if (o.x<=0) {o.x-=64, o.w+=64;}
if (tr.w==512 && o.x+o.w>=448) {o.w+=64;}
o.x+=32; o.y-=32;
}
for (let i=0; i<tr.spikes.length; i++){
let o=tr.spikes[i];
o.x+=32; o.y-=32;
}
tr.drawEnv=function(){
for (let i=0; i<tr.obstacles.length; i++){
tr.obstacles[i].x*=.5; tr.obstacles[i].y*=.5;
tr.obstacles[i].w*=.5; tr.obstacles[i].h*=.5;
}
drawCity(this);
for (let i=0; i<tr.obstacles.length; i++){
tr.obstacles[i].x/=.5; tr.obstacles[i].y/=.5;
tr.obstacles[i].w/=.5; tr.obstacles[i].h/=.5;
}
}
tr.img=makeImg("vogel im kafig.png");
tr.bgObs=[
//makeObj(-32,144+32-50,160,96),makeObj(416,160+32-50,144,112),makeObj(368,144+32-50,96,96)
];
tr.transport=function(){}

tr.update=function(){
if (!fastArt && rnd()<1){
for (let i=0; i<1; i++){
let r=makeObj(Math.random()*c.width*2-1,1,1);
for (let t=0; t<30; t++){
r.y+=10;
let hit=false;
for (let o=0; o<this.obstacles.length; o++){
if (hitTestRect(r,this.obstacles[o])) hit=true;
}
if (hit){
collideObstacles(this,r);
r.y+=rnd()*10-4;
this.dots.push(new Splash(r));
t=30;
}}}}
for (let i=0; i<this.dots.length; i++){
if (this.dots[i]!=undefined){
this.dots[i].update(this);
}}
for (let i=0; i<this.dots.length; i++){
if (this.dots[i]!=undefined && this.dots[i].dead) {
this.dots.splice(i,1);
i=0;
}}
this.f++;
this.treef++;
if (this.treef>=64) this.treef=0;
}
tr.transport=function(){};
tr.display=function(){
this.player.y=-1000;
this.displayCity();
ctx.drawImage(this.img,0,Math.sin(this.f/10)-10,256,144);
if (!menuOpen){
this.m.buttonsUpdate();
this.m.update();
}
// selected icon
}

}
type=tr.getName();
tr.level=number;
if (roomName == "select"){
setBgm("bgm ultradead.mp3");
tr.f=0;
tr.player = new Player(4140,-5182);
tr.world=0;
tr.lastWorld=0;
tr.menulevel=0;
tr.changef=0;
tr.verb="";
tr.obstacles = [
makeObj(-32,256,800,112),
makeObj(-16,176+16,80,96),
makeObj(256+32,192+16,400,96),
];
for (let i=0; i<tr.obstacles.length; i++){
let o=tr.obstacles[i];
if (o.x<=0) {o.x-=64, o.w+=64;}
if (tr.w==512 && o.x+o.w>=448) {o.w+=64;}
o.x+=32; o.y-=32;
}
for (let i=0; i<tr.spikes.length; i++){
let o=tr.spikes[i];
o.x+=32; o.y-=32;
}
tr.drawEnv=function(){
for (let i=0; i<tr.obstacles.length; i++){
tr.obstacles[i].x*=.5; tr.obstacles[i].y*=.5;
tr.obstacles[i].w*=.5; tr.obstacles[i].h*=.5;
}
drawCity(this);
for (let i=0; i<tr.obstacles.length; i++){
tr.obstacles[i].x/=.5; tr.obstacles[i].y/=.5;
tr.obstacles[i].w/=.5; tr.obstacles[i].h/=.5;
}
}
tr.bgObs=[
makeObj(32,144+32,160,96),makeObj(416,160+32,144,112),makeObj(368,144+32,96,96)
];
tr.currentMenu=1;
//tr.cm=getMenu("chapterMenu");
tr.lm=getMenu("levelMenu");
tr.img=makeImg("levels.png");
tr.img2=makeImg("select images.png");
tr.update=function(){
if (rnd()<1){
for (let i=0; i<1; i++){
let r=makeObj(Math.random()*c.width*2-1,1,1);
for (let t=0; t<30; t++){
r.y+=10;
let hit=false;
for (let o=0; o<this.obstacles.length; o++){
if (hitTestRect(r,this.obstacles[o])) hit=true;
}
if (hit){
collideObstacles(this,r);
r.y+=rnd()*10-4;
this.dots.push(new Splash(r));
t=30;
}}}}
for (let i=0; i<this.dots.length; i++){
if (this.dots[i]!=undefined){
this.dots[i].update(this);
}}
for (let i=0; i<this.dots.length; i++){
if (this.dots[i]!=undefined && this.dots[i].dead) {
this.dots.splice(i,1);
i=0;
}}
this.f++;
this.treef++;
if (this.treef>=64) this.treef=0;
if (this.currentMenu==1) {
//if (xpress && !xwaspress) this.currentMenu=0;
this.lm.buttonsUpdate();
this.lm.update();
}
}
tr.transport=function(){};
tr.display=function(){
this.player.y=-1000;
this.displayCity();
if (this.currentMenu==1) {
ctx.fillStyle="#000000";
ctx.globalAlpha=.5;
//ctx.fillRect(0,0,c.width,c.height);
ctx.globalAlpha=1;
this.lm.display();
} else showStars();
// selected icon
}
}

if (type=="carmine"){
setBgm("bgm ultradead.mp3");
let tempPlayer=new Player(tr.player.x,tr.player.y);
tempPlayer.form=0;
tr.player=tempPlayer;
CarmineRoom(tr);
let ox=0; oy=-48;
for (let i=0; i<tr.obstacles.length; i++){
let o=tr.obstacles[i];
if (o.x<=0) {o.x-=64, o.w+=64;}
if (tr.w==512 && o.x+o.w>=448) {o.w+=64;}
o.x+=ox; o.y+=oy;
o.x=trc(o.x/16)*16; o.y=trc(o.y/16)*16;
o.w=trc(o.w/16)*16; o.h=trc(o.h/16)*16;
}
for (let i=0; i<tr.entitys.length; i++){let o=tr.entitys[i]; o.x+=ox; o.y+=oy;}
for (let i=0; i<tr.plates.length; i++){let o=tr.plates[i]; o.x+=ox; o.y+=oy;}
for (let i=0; i<tr.targets.length; i++){let o=tr.targets[i]; o.x+=ox; o.y+=oy;}
for (let i=0; i<tr.spikes.length; i++){let o=tr.spikes[i]; o.x+=ox; o.y+=oy;}
for (let i=0; i<tr.platforms.length; i++){
let o=tr.platforms[i]; o.x+=ox; o.y+=oy;
o.y=Math.round(o.y/16)*16;
}
tr.drawEnv=function(){
for (let i=0; i<tr.obstacles.length; i++){
tr.obstacles[i].x*=.5; tr.obstacles[i].y*=.5;
tr.obstacles[i].w*=.5; tr.obstacles[i].h*=.5;
}
drawCity(this);
for (let i=0; i<tr.obstacles.length; i++){
tr.obstacles[i].x/=.5; tr.obstacles[i].y/=.5;
tr.obstacles[i].w/=.5; tr.obstacles[i].h/=.5;
}
}
//if (roomName=="ammo13") tr=getRoom("select");
}

hasKunai=true;
if (roomName=="end"){
tr.player.y=-1000;
tr.img=makeImg("end.png");
tr.f=0;
tr.transport=function(){}
tr.update=function(){
this.f++;
if (this.f>300) changeRoom(getRoom("title"));
}
tr.display=function(){
ctx.fillStyle="#000000";
ctx.fillRect(0,0,256,144);
ctx.drawImage(this.img,0,0,256,144);
}
}

tr.entitys.push(tr.player);

if (x!=undefined) {
tr.player.x=x;
if (y!=undefined)
tr.player.y=y;
if (x>room.w/2) tr.player.facing="left";
}

let h=tr.player.h;
tr.player.y=c.height-h;
for (let i=0; i<c.height; i+=h){
tr.player.y-=h;
if(!hitTestObstacles(tr,tr.player)){
tr.player.y+=h;
i=c.height;
}
}
return tr;
};