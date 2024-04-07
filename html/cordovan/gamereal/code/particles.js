Kamui = function(obj,imgY=0){
this.x=obj.x+obj.w/2-32; this.y=obj.y+obj.h/2-32; this.w=64; this.h=64;
this.imgY=imgY;
this.img=makeImg("kamui.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=1;
if (this.f>25) this.dead = true;
//console.log(this.f);
}
this.display = function(){
//console.log(this);
ctx.globalAlpha = 1;
let imgX=Math.trunc(this.f)*64;
//console.log(imgX + " " + imgY);
ctx.drawImage(this.img,
imgX,this.imgY*64,64,64,
Math.trunc(this.x+this.w/2-32),
Math.trunc(this.y+this.h/2-32),64,64);
ctx.globalAlpha=1;
}
}

Splash = function(obj){
this.x=obj.x+obj.w/2-32; this.y=obj.y+obj.h-64; this.w=64; this.h=64;
this.img=makeImg("splash.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=1;
if (this.f>=12) this.dead = true;
//console.log(this.f);
}
this.display = function(){
//console.log(this);
/*
ctx.fillStyle="#f0f040";
ctx.fillRect(
trc(this.x+this.w/2-1),trc(this.y+this.h)-1,1,1);
*/
ctx.globalAlpha = .25;
//console.log(imgX + " " + imgY);
let imgX=trc(this.f)*64;
ctx.drawImage(this.img,
imgX,0,64,64,
trc(this.x+this.w/2-32),trc(this.y+this.h)-64,64,64);
ctx.globalAlpha=1;
}
}

HLine = function(obj){
this.x=obj.x; this.y=obj.y; this.w=obj.w; this.h=obj.h;
this.img=makeImg("charge.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=1;
if (this.f>15) this.dead = true;
}
this.display = function(){
ctx.globalAlpha = (1-this.f/16)*.3;
ctx.drawImage(this.img,
0,0,256,256,
trc(this.x),trc(this.y)-4,trc(this.w),trc(this.h));
ctx.globalAlpha=1;
}
}

Soul = function(obj,imgY=0){
this.x=obj.x+obj.w/2-8; this.y=obj.y+obj.h/2-8;
this.w=16; this.h=16;
this.xVel=0; this.yVel=0;
this.imgY=imgY;
this.trail=[];
this.img = makeImg("orbparticles.png");
this.f=0; this.dead=false;
this.timer=0;
this.update = function(room){
this.f+=.1;
//console.log(room.dots.length);
for (let i=0; i<4; i++){
let o=new SoulTrail(this);
o.yVel=0;
room.dots.push(o);
this.timer+=.25;
if (this.timer<50){
let d=(1-curve(this.timer/50,-1.01))*3;
this.x+=this.xVel*d; this.y+=this.yVel*d;
} else {
let a=Math.atan2(
room.player.y+room.player.h/2-this.y-this.h/2,
room.player.x+room.player.w/2-this.x-this.w/2);
let d=curve(this.timer/50-1,-1.01)*3;
this.x+=Math.cos(a)*d; this.y+=Math.sin(a)*d;
//console.log(this.x+" "+this.y);
}
}

if (hitTestRect(this,room.player) && this.timer>50) {
this.timer=150;
room.dots.push(new Blast(this));
ps(room.deathSound);
}
if (this.timer>=150) this.dead = true;

}
this.display = function(){
//ctx.drawImage(this.img,Math.trunc(this.f)*16,imgY*16,16,16,
//Math.trunc(this.x/2),Math.trunc(this.y/2),this.w,this.h);
}
}

SoulTrail = function(obj){
this.x=obj.x+obj.w/2-8; this.y=obj.y+obj.h/2-8;
this.w=16; this.h=16;
this.imgY=0; this.yVel=1;
this.img = makeImg("orbparticles.png");
this.f=0; this.dead = false;
this.update = function(){
this.f++;
if (this.f>7) this.dead = true;
}
this.display = function(){
ctx.drawImage(this.img,Math.trunc(this.f)*16,0,16,16,
Math.trunc(this.x),Math.trunc(this.y),this.w,this.h);
}
}

Poof = function(obj){
this.x=obj.x+obj.w/2-32; this.y=obj.y+obj.h/2-32;
this.w=64; this.h=64;
this.img=makeImg("poof.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=1;
if (this.f>25) this.dead = true;
}
this.display = function(){
//console.log(this);
//if (this.f <5) ctx.globalAlpha = (1-this.f/5);
//else ctx.globalAlpha = 1;
//console.log("update");
ctx.drawImage(this.img,
Math.trunc(this.f)*64,0,64,64,
Math.trunc(this.x+this.w/2-32),Math.trunc(this.y+this.h/2-32),64,64);
ctx.globalAlpha=1;
}
}

Blast = function(obj){
this.x=obj.x; this.y=obj.y; this.w=obj.w; this.h=obj.h;
this.img = makeImg("blast.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=.5;
if (this.f>5) this.dead = true;
}
this.display = function(){
//console.log(this);
if (this.f <5) ctx.globalAlpha = (1-this.f/5);
else ctx.globalAlpha = 1;
ctx.drawImage(this.img,
Math.trunc(this.f)*64,0,64,64,
Math.trunc(this.x+this.w/2-32),
Math.trunc(this.y+this.h)-64+16,64,64);
ctx.globalAlpha=1;
}
}

SunRay = function(obj){
this.x=obj.x+obj.w/2-1; this.y=-obj.h;
this.w=2; this.h=obj.h+obj.y;
this.img=makeImg("poof.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=1;
if (this.f>25) this.dead = true;
}
this.display = function(){
//console.log(this);
//if (this.f <5) ctx.globalAlpha = (1-this.f/5);
//else ctx.globalAlpha = 1;
//console.log("update");
ctx.fillStyle="#f0f0f0";
ctx.globalAlpha=5/this.f;
//console.log("crowded");
ctx.fillRect(Math.trunc(this.x),Math.trunc(this.y),this.w,this.h);
ctx.globalAlpha=1;
}
}

Zip = function(obj,imgY=0){
this.x=obj.x+obj.w/2-32; this.y=obj.y+obj.h/2-32-5;
this.w=64; this.h=64;
this.imgY=imgY;
this.img=makeImg("zip.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=1;
if (this.f>25) this.dead = true;
}
this.display = function(){
//console.log(this);
//if (this.f <5) ctx.globalAlpha = (1-this.f/5);
//else ctx.globalAlpha = 1;
//console.log("update");
ctx.drawImage(this.img,
Math.trunc(this.f)*64,imgY*64,64,64,
Math.trunc(this.x),Math.trunc(this.y),this.w,this.h);
ctx.globalAlpha=1;
}
}

Spit = function(obj,imgY=0){
this.x=obj.x+obj.w/2-32; this.y=obj.y+obj.h/2-32; this.w=64; this.h=64;
this.img=makeImg("spit.png");
this.f=0; this.dead = false;
this.imgY=imgY;
this.update = function(){
this.f+=.5;
if (this.f>25) this.dead = true;
//console.log(this.f);
}
this.display = function(){
//console.log(this);
ctx.globalAlpha = 1;
let imgX=Math.trunc(this.f)*64;
//console.log(imgX + " " + imgY);
ctx.drawImage(this.img,
imgX,this.imgY*64,64,64,
Math.trunc(this.x+this.w/2-32),
Math.trunc(this.y+this.h/2-32),64,64);
ctx.globalAlpha=1;
}
}

Spark = function(obj,imgY=0){
this.x=obj.x+obj.w/2-8; this.y=obj.y+obj.h/2-8;
this.w=16; this.h=16;
this.imgY=imgY;
this.img=makeImg("orbparticles.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=.1;
this.y+=this.f/10;
if (this.f>25) this.dead = true;
}
this.display = function(){
//console.log(this);
//if (this.f <5) ctx.globalAlpha = (1-this.f/5);
//else ctx.globalAlpha = 1;
//console.log("update");
ctx.drawImage(this.img,
Math.trunc(this.f)*16,imgY*16,16,16,
Math.trunc(this.x),Math.trunc(this.y),this.w,this.h);
ctx.globalAlpha=1;
}
}

Blood = function(x=0,y=0,w=32,h=32){
this.x=x; this.y=y; this.w=w; this.h=h;
this.img = makeImg("death.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=.5;
if (this.f>5) this.dead = true;
}
this.display = function(){
//console.log(this);
if (this.f <5) ctx.globalAlpha = (1-this.f/5);
else ctx.globalAlpha = 1;
ctx.drawImage(this.img,
Math.trunc(this.f)*256,0,256,256,
Math.trunc(this.x+this.w/2-32),
Math.trunc(this.y+this.h)-64+16,64,64);
ctx.globalAlpha=1;
}
}

Jump = function(obj,worked=false,size=.69){
size*=1.2;
this.x=obj.x+obj.w/2-70*size; this.y=obj.y+obj.h/2-70*size;
this.w=140*size; this.h=140*size;
this.img = makeImg("radius.png");
this.f=0; this.dead = false; this.worked=worked;
this.update = function(){
this.f+=4+!this.worked*2;
if (this.f>=100) this.dead = true;
}
this.display = function(){
//console.log(this);
ctx.globalAlpha=1-this.f/100;
ctx.drawImage(this.img,
256-this.worked*256,0,256,256,
this.x+this.w/4,this.y+this.h/4,this.w/2,this.h/2);
ctx.globalAlpha=1;
}
}

OrbParticle = function(obj,imgY=0){
this.x=obj.x+obj.w/2-8; this.y=obj.y+obj.h/2-8;
this.w=16; this.h=16;
this.imgY=imgY;
this.img=makeImg("orbparticles.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=.1;
this.y+=this.f/10;
if (this.f>25) this.dead = true;
}
this.display = function(){
//console.log(this);
//if (this.f <5) ctx.globalAlpha = (1-this.f/5);
//else ctx.globalAlpha = 1;
//console.log("update");
ctx.drawImage(this.img,
Math.trunc(this.f)*16,imgY*16,16,16,
Math.trunc(this.x),Math.trunc(this.y),this.w,this.h);
ctx.globalAlpha=1;
}
}

CloudParticle = function(obj,imgY=0){
this.x=obj.x+obj.w/2-8; this.y=obj.y+obj.h/2-8;
this.w=16; this.h=16;
this.imgY=imgY;
this.img=makeImg("cloudparticles.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=.1;
this.y+=this.f/10;
if (this.f>25) this.dead = true;
}
this.display = function(){
//console.log(this);
//if (this.f <5) ctx.globalAlpha = (1-this.f/5);
//else ctx.globalAlpha = 1;
//console.log("update");
ctx.drawImage(this.img,
Math.trunc(this.f)*16,imgY*16,16,16,
Math.trunc(this.x),Math.trunc(this.y),this.w,this.h);
ctx.globalAlpha=1;
}
}

PearlDust = function(obj,imgY=0){
this.x=obj.x+obj.w/2-6; this.y=obj.y+obj.h/2-6;
this.w=12; this.h=12;
this.imgY=imgY;
this.img=makeImg("orbparticles.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=.05;
//this.y+=this.f/10;
if (this.f>=8) this.dead = true;
}
this.display = function(){
//console.log(this);
//if (this.f <5) ctx.globalAlpha = (1-this.f/5);
//else ctx.globalAlpha = 1;
//console.log("update");
ctx.drawImage(this.img,
Math.trunc(this.f)*16,imgY*16,16,16,
Math.trunc(this.x),Math.trunc(this.y),this.w,this.h);
ctx.globalAlpha=1;
}
}

Dust = function(obj,type=1){
this.x=obj.x+obj.w/2-8; this.y=obj.y+obj.h-16;
this.w=16; this.h=16;
this.type=type;
this.img=makeImg("dust.png");
this.f=0; this.dead = false;
this.update = function(){
this.f+=1;
if (this.f>160) this.dead = true;
}
this.display = function(){
ctx.drawImage(this.img,
Math.trunc(this.f)*16,this.type*16,16,16,
Math.round(this.x+this.w/2)-8,Math.round(this.y+this.h-16),16,16);
ctx.globalAlpha=1;
}
}
