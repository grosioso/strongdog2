
Spikes = function(x,y,w=16,h=16,imgX=0){
if (w==8 || h==8){
x*=2; y*=2; w*=2; h*=2;
}
this.x=x; this.y=y; this.w=w; this.h=h; 
if (imgX==0) this.y+=4;
if (imgX==1) {this.y-=12; this.h+=6};
if (imgX==2) this.x--;
if (imgX==3) this.x++;
if (imgX>=2) this.w-=8; else this.h-=8;
if (imgX==3) this.x+=9;
else this.y+=4;
if (imgX==2||imgX==3) this.h-=4;
this.img = makeImg("spikes.png");
this.imgX=imgX;
this.display = function(){
//ctx.fillRect(this.x,this.y,this.w,this.h);
if (imgX<2){
for (let x=0; x<this.w; x+=8){
ctx.drawImage(this.img,
this.imgX*8,0,8,8,this.x+x,this.y-4+this.imgX*4,8,8);
} 
} else {
for (let y=0; y<this.h; y+=8){
if (y>=this.h-8)
ctx.drawImage(this.img,this.imgX*8,0,8,4,trc(this.x-(-2+this.imgX)*4),trc(this.y+y),8,4);
else
ctx.drawImage(this.img,this.imgX*8,0,8,8,trc(this.x-(-2+this.imgX)*4),trc(this.y+y),8,8);
} 
}
}
}

Player = function(x=10,y=250,w,h){
this.x=x;this.y=y;
this.w=12; this.h=28;
this.img=makeImg("player.png");
this.chargeImg=makeImg("charge.png");
this.auraImg=makeImg("aura.png");
this.nenImg=makeImg("nen.png");
this.birdImg=makeImg("bird.png");
this.slashSound=makeSnd("throw.wav");
this.stepsSound=makeSnd("steps.wav");
this.steps1Sound=makeSnd("steps1.wav"); this.steps1Sound.volume=0;
this.steps2Sound=makeSnd("steps2.wav"); this.steps2Sound.volume=0;
this.speed=1; this.yVel=0; this.xVel=0; this.angle=0;
this.chargef=0; this.legsf=0; this.f=0; this.throwf=0; this.squashf=0;
this.deathTimer=20; this.dead=false; this.canJump=true; 
this.jumping=false; this.idle=true; this.crouching=false;
this.facing="right"; 
this.motions=[]; this.actions=[]; this.actionsf=0;
this.hurt = function(){
if (!this.dead) 
this.dead = true;
}
this.update=function(room,index){
this.y=Math.trunc(this.y*=1000)/1000;
this.motions.push(currentMotion());
if (this.motions.length>15) {
this.motions.splice(0,1);
}
this.crouching=false;
if (this.dead) {
if (this.deathTimer==20 && this.actions.length==0){
room.dots.push(new Poof(this));
ps(room.deathSound)
}
this.deathTimer--;
}
if (this.deathTimer<=0 && this.actions.length==0) room.restart();
this.oldx=this.x; this.oldy=this.y;
this.wpress=wpress, this.apress=apress,
this.dpress=dpress,
this.mouse1p=mouse1press, this.mouse1wasp=mouse1waspress;
if (this.actions.length==0) room.transport(this);
if (this.deathTimer>=20) this.act(room,index);
collideObstacles(room,this);
}
this.act=function(room,index){
this.y+=this.yVel;
let tempCanJump=this.canJump;
this.canJump=false;	
collideObstacles(room,this);
let tempYVel=this.yVel;
if (hitTestObstacles(room,makeObj(this.x,this.y-1,this.w,this.h)) && this.yVel<0) this.yVel=0;
if (hitTestObstacles(room,makeObj(this.x,this.y+1,this.w,this.h)) && this.yVel>0) this.yVel=0;
this.y+=8; this.h-=7;
if (hitTestObstacles(room,this)) {
if (this.yVel!=tempYVel && tempYVel>1.5) {
collideObstacles(room,this);
room.dots.push(new Dust(this,1));
}
if (!tempCanJump) {
this.squashf=10*tempYVel/5;
ps(this.steps1Sound);
}
this.canJump=true;
}
for (let i=0; i<room.plates.length; i++){
let o=room.plates[i];
if (hitTestRect(this,o)){
this.canJump=true;
this.y=o.y-this.h+4;
this.yVel=0;
if (this.yVel!=tempYVel && tempYVel>1.5) {
this.squashf=10*tempYVel/5;
room.dots.push(new Dust(this,1));
}}}
this.y-=8; this.h+=7;
this.yVel+=.3;
if (this.yVel>8) this.yVel=8;
if (this.squashf>0) this.squashf--;
this.cloneUpdate(room);
if (this.idle && this.legsf>=9) this.legsf=0;
if (this.legsf>=10) this.legsf=0;
}
this.baseUpdate=function(room){
this.legsf+=.2; 
let wp=wpress, wwasp=wwaspress, ap=apress, sp=spress, dp=dpress,
mouse1p=mouse1press, mouse1wasp=mouse1waspress;
let a = Math.atan2(
mouseY*2+room.cameraY-this.y-this.h/3-4,
mouseX*2+room.cameraX-this.x-this.w/2);
this.angle=a;
if (this.actions.length>0){
wp=this.actions[this.actionsf][0];
wwasp=this.actions[this.actionsf][1];
ap=this.actions[this.actionsf][2];
sp=this.actions[this.actionsf][3];
dp=this.actions[this.actionsf][4];
mouse1p=this.actions[this.actionsf][5];
mouse1wasp=this.actions[this.actionsf][6];
this.facing=this.actions[this.actionsf][7];
a=this.actions[this.actionsf][8];
this.actionsf++;
if (this.actionsf>=this.actions.length) this.actionsf=0;
}
if (this.throwf>0) this.throwf--;

if (mouse1p && !mouse1wasp){
ps(room.throwSound);
this.throwf=10;
let k = new Kunai();
k.x=this.x-4+this.w/2;  k.y=this.y+this.h/3; k.angle=a;
k.red=this.actions.length>0;
k.w=Math.abs(Math.cos(k.angle))*20+4;
for (let u=0; u<20; u++){
if (hitTestRect(this,k)){
k.x+=Math.cos(k.angle)*2;  k.y+=Math.sin(k.angle)*2;
}}
k.x+=Math.cos(k.angle)*2;  k.y+=Math.sin(k.angle)*2;
room.kunais.push(k);
}


/*
let ax=axes[2], ay=axes[3];

let hyp=Math.sqrt(ax*ax+ay*ay);
let angle = Math.atan2(ay,ax);
if (hyp>.7 && this.throwf==0){
ps(room.throwSound);
this.throwf=10;
let k = new Kunai();
k.x=this.x-4+this.w/2;  k.y=this.y+this.h/3; k.angle=angle;
k.red=this.actions.length>0;
k.w=Math.abs(Math.cos(k.angle))*20+4;
for (let u=0; u<20; u++){
if (hitTestRect(this,k)){
k.x+=Math.cos(k.angle)*2;  k.y+=Math.sin(k.angle)*2;
}}
k.x+=Math.cos(k.angle)*2;  k.y+=Math.sin(k.angle)*2;
room.kunais.push(k);
}
*/


if (ap || dp) {
this.legsf+=.05;
if (this.idle) this.legsf=0;
this.idle=false;
if (this.legsf>3 && this.legsf<=3.2 && this.canJump) {
ps(this.steps1Sound);
room.dots.push(new Splash(this));
}
if (this.legsf>=9 && this.legsf<9.2 && this.canJump) {
ps(this.steps2Sound);
room.dots.push(new Splash(this));
}
} else {
this.idle=true;
}
if (!this.canJump) {
this.stepsSound.pause(); this.stepsSound.currentTime=0;
this.legsf=0;
}
if (sp && this.canJump) {
this.crouching=true;
if (!swaspress) this.squashf=5;
}
if (this.actions.length==0){ 
if (mouseX*2<this.x+this.w/2) this.facing="left";
else this.facing="right";
}
if (!this.crouching){
if(ap) {if (this.xVel>0) this.xVel=0; this.xVel-=.8; this.facing="left";} 
if(dp) {if (this.xVel<0) this.xVel=0; this.xVel+=.8; this.facing="right";}

if(!ap && !dp){
if (this.xVel>0) this.xVel-=.4;
if (this.xVel<0) this.xVel+=.4;
if (Math.abs(this.xVel)<1) this.xVel=0;
}
if (this.xVel> 2.3) this.xVel= 2.3;
if (this.xVel<-2.3) this.xVel=-2.3;
this.x+=this.xVel;
if(wp && !wwasp && this.canJump) {
this.jumping=true;
this.yVel=-5.4;
this.y--;
room.dots.push(new Dust(this,0,.55));
this.y++;
ps(this.steps1Sound); ps(this.steps2Sound);
} 
if (this.jumping){
if (!wp) this.jumping=false;
if (!this.jumping) this.yVel=0;
if (this.yVel>-.5) this.jumping=false;
}
}
}

this.cloneUpdate=function(room){
this.baseUpdate(room);
if (this.actions.length==0){
if (spacepress){
if (room.clonetimer==0) ps(room.funnySound[2]);
if (room.clonetimer<100)
room.actions.push([
wpress,wwaspress,apress,spress,dpress,
mouse1press,mouse1waspress,
this.facing,this.angle
]);
room.clonetimer++;
} 
if (room.clonetimer == 100 ||
   (!spacepress && spacewaspress && room.clonetimer<100)){
let p=new Player();
p.x=this.x; p.y=this.y;
p.clone=true; p.actions=room.actions;
room.dots.push(new Blast(p));
ps(room.summonSound);
room.clones.push(p);
console.log("clone pushed");
room.actions=[];
}
if (!spacepress) {
room.actions=[];
room.clonetimer=0;
}
}
}

this.display = function(room){
this.steps1Sound.volume = 1*volume;
this.steps2Sound.volume = 1*volume;
this.slashSound.volume = .5*volume;
this.stepsSound.volume = 1*volume;

if (this.deathTimer>=20){
ctx.fillStyle = "#afc160";
ctx.globalAlpha=.5;
let cx=this.x+this.w/2, cy=this.y+this.h/2;
ctx.globalAlpha=1;
if (this.facing == "left"){
ctx.translate(Math.trunc((this.x+this.w/2))*2,0);
ctx.scale(-1,1);
}
ctx.translate(Math.trunc(this.x)+this.w/2,Math.round(this.y+this.h/2));
let imgX=0, imgY=0;
imgX = Math.floor(this.legsf)*32; imgY = 0;
if (!this.idle || !this.canJump) imgY+=32;
if (!this.canJump){
imgY=96;
if (this.yVel < -1) imgX=0;
else if (this.yVel > 1) imgX=96;
else if (this.yVel<0) imgX=32;
else imgX=64;
}
if (this.crouching) {
imgX=96+32+32; imgY=64;
}
if (this.throwf>0) {imgX=192; imgY=64;}
let width=(Math.abs(this.yVel)-2.5)/4;
if (width<0) width=0;
if (this.yVel>0) width=0;
let height=0;
if (this.squashf>0) height=this.squashf/3/12;
width*=30; height*=30;
ctx.drawImage(this.img,imgX,imgY+4+128*(this.actions.length>0),32,32-4,
-(14*1-width/4),-this.h/2+4-18+32-(32*1-height/2),(32*1-width/2),(32*1-height/2)-4);
ctx.globalAlpha=1;
ctx.translate(-Math.trunc(this.x)-this.w/2,-Math.round(this.y+this.h/2));
// translate back
if (this.facing == "left"){
ctx.scale(-1,1);
ctx.translate(-Math.trunc(this.x+this.w/2)*2,0);
}	
ctx.globalAlpha=1;
}
ctx.fillStyle="#a0c0e0";
if (this.actions.length==0) ctx.globalAlpha=room.clonetimer/100/2+.25; 
else ctx.globalAlpha=0;
if (room.clonetimer>100 || room.clonetimer==0) ctx.globalAlpha=0;
ctx.drawImage(this.nenImg,
recur(room.clonetimer*2,32)*64,64,64,64,
this.x+this.w/2-32,this.y+this.h/2-32,64,64);
ctx.globalAlpha=1;
}

this.displayHud=function(room){
}
}

Kunai = function(){
this.x=0;this.y=0;this.w=24;this.h=6;
this.oldx=0; this.oldy=0;
this.angle = 0; this.stopped = false;
this.red=false;
this.dead=false;
this.img = makeImg("kunai.png");
this.update = function(room){
this.x+=Math.cos(this.angle)*3;
this.y+=Math.sin(this.angle)*3;
this.w=Math.abs(Math.cos(this.angle))*20+4;
let point=makeObj(this.x+this.w/2-3+Math.cos(this.angle)*13,this.y+this.h/2-3+Math.sin(this.angle)*13,6,6);
if (hitTestRect(point,room.player)) room.player.dead=true;
for (let i=0; i<room.clones.length; i++){
if (hitTestRect(point,room.clones[i])) room.clones[i].dead=true;
}
}
this.display=function(){
//if (this.stopped) ctx.globalAlpha=.5;
ctx.translate(this.x+this.w/2,this.y+this.h/2);
ctx.rotate(this.angle);
ctx.imageSmoothingEnabled=true;
ctx.drawImage(this.img,0,this.red*24,24,24,-12,-12,24,24);
ctx.imageSmoothingEnabled=false;
ctx.rotate(-this.angle);
ctx.translate(-this.x-this.w/2,-this.y-this.h/2);
ctx.globalAlpha=1;
ctx.fillStyle="#f0c010";
for (let i=0; i<12; i++){
let o=makeObj(
this.x+this.w/2-1+Math.cos(this.angle)*(i-6)*1.4,
this.y+this.h/2-1+Math.sin(this.angle)*(i-6)*1.4,
2,2);
} 
}
}

Gate = function(x=0,y=0,btn,initial=false){
this.x=x; this.y=y; this.w=12; this.h=64; this.alpha=0;
this.realX=0; this.realY=0; this.realW=4; this.realH=64;
this.openbuffer=0;
this.initial = initial;
this.button=btn;
this.img=makeImg("gate.png");
this.f = 0; this.stopped = false;
this.open = false;
this.inited = this.inited;
this.timer = 10;
this.update = function(){
if (this.timer>0) this.timer--;
if (this.open!=this.button.on && this.timer==0 && this.openbuffer==0) {
room.doorSound.currentTime=0;
room.doorSound.play();
}
if (this.openbuffer==0){
this.open=this.button.on;
if (this.button.on) this.openbuffer=7;
}
if (this.openbuffer>0) this.openbuffer--;
if (!this.inited) {
this.open = !this.open;
this.inited=true;
}
if (this.open!=this.initial) {
if (this.h==64) {
this.realX=this.x; this.realY=this.y; 
this.realW=32; this.realH=64;
this.y+=65;
}
this.h=4;
if (this.f < 2) this.f+=.25;
} else {
if (this.h==4) {
this.y-=65;
this.realX=this.x; this.realY=this.y; 
this.realW=12; this.realH=64;
}
this.h=64;
if (this.f >= 1) this.f-=.25;
}
}
this.display = function(){
//ctx.fillRect(this.realX-room.cameraX,this.realY-room.cameraY,
//this.realW,this.realH);
let imgX=Math.floor(this.f)*16; 
let realY=0;
if (this.h==2) realY=-65/2;
//console.log(this.y+realY);
ctx.drawImage(this.img,imgX,0,16,32,
Math.floor(this.x),Math.floor(this.y+realY),16,32);
}
}

Switch = function(x=0,y=0){
this.x=x; this.y=y; this.w=32; this.h=32;
this.on = false; this.wason = false;
this.img=makeImg("switch.png");
this.update=function(room,index){
for (let et=0; et<room.kunais.length; et++){
if (room.kunais[et]!=undefined&&
    hitTestRect(this,room.kunais[et])) {
this.on = !this.on;
room.kunais[et].dead=true;
}}
//if (this.wason!=this.on) this.sound.play();
this.wason=this.on;
}
this.display=function(){
//ctx.fillRect(this.x,this.y,this.w,this.h);
this.imgY=0; if (this.on) this.imgY=16; 
ctx.drawImage(this.img,0,this.imgY,16,16,trc(this.x),trc(this.y),this.w,this.h);
}
}

Plate = function(x=0,y=0){
this.x=x; this.y=y; this.w=32; this.h=8;
this.on = false; this.wason = false;
this.img=makeImg("button.png");
this.update=function(room,index,entitys){
this.on = false;
for (let et=0; et<entitys.length; et++){
if (!entitys[et].dead&& 
    entitys[et].cloneXDist == undefined && 
    hitTestRect(this,entitys[et])) {
this.on = true;
}
}
this.wason=this.on;
}
this.display=function(){
this.imgY=0; if (this.on) this.imgY=4; 
ctx.drawImage(this.img,0,this.imgY,16,4,
Math.floor(this.x),Math.floor(this.y),this.w,this.h);
}
}

exitImg=makeImg("transitions.png");

displayExit=function(e){
if (e.name=="level12") 
ctx.drawImage(exitImg,
getZoneNumber(zone)*32,0,32,320,320-32,0,32,320);
}

function Room(){
this.x = 0; this.y = 0;
this.w = 1000; this.h = 1000;
this.oldCameraX = 0; this.oldCameraY=0;
this.cameraX = 0; this.cameraY = 0;
this.obstacles = [];
this.entitys = [];
this.clouds=[];
this.getObs=function(){
return this.obstacles.concat(this.platforms);
}
this.hitTestObstacles=function(e){
return hitTestObstacles(this,e);
}
this.collideObstacles=function(e){
collideObstacles(this,e);
}
this.loop = function(){
this.update();
this.display();
}
this.update = function(){}
this.display = function(){
displayArray(room,this.entitys);
}
}
