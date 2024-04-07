treeImg=makeImg("tree.png");
parkImg=makeImg("park objs.png");
lampImg=makeImg("lamp.png");
moonsideBldImg=makeImg("moonside buildings.png");

tc=document.createElement("canvas");
tctx=tc.getContext("2d"); 
resetc=function(){
//tctx=tc.getContext("2d");
tc.width=c.width; tc.height=c.height;
tctx.clearRect(0,0,tc.width,tc.height);
}

drawBuilding=function(canvas=c,tx=0,ty=0,r=0,drawLight=true){
let index=r;
let rnd=function(){
index=seq(index);
return index;
}
let c=canvas;
let s=8;
let img=buildingImg;
let ctx=c.getContext("2d");
let sw=5+trc(rnd()*3), sh=3+trc(rnd()*2)
let f=trc(rnd()*8);
// top
let top=trc(rnd()*2);
let windows=trc(rnd()*3)+1;
if (f>2 && windows>1) f-=3;
let awning=trc(rnd()*6);
// sw is section width
// bw is amount of sections
let bw=3+trc(rnd()*3), bh=3+trc(rnd()*2);
let w1=trc(rnd()*6), w2=trc(rnd()*6);
if (w2==w1){
if (w2==0) w2=3;
else w2--;
}

//console.log(bw*(w*windows-1)*8+8);
if (bw*(sw*windows-1)*s+s>200*s/8) {
if (windows==3) windows=1;
else {
sw-=1; bw-=1;
}
}
sw*=windows;
let transx=trc(tx), transy=trc(ty-sh*bh*s-s*2);
ctx.translate(transx,transy);
// loop horizontally
for (let sx=0; sx<bw; sx++){
ctx.translate(sx*s*(sw-1),0);
for (let sy=s; sy<bh*sh*s+s; sy+=sh*s){
// draw vertically
let streetlevel=false;
for (let y=0; y<sh; y++){
for (let x=0; x<sw; x++){
if (sy>(bh-2)*sh*s && sy<(bh-1)*sh*s && y==sh-1)
streetlevel=true;
if (sy<=(bh-1)*sh*s) ctx.fillStyle="#101010";
else ctx.fillStyle="#404040";
if (sy>(bh-2)*sh*s && sy<(bh-1)*sh*s && y==sh-1){
//ctx.fillStyle="#40f040";
ctx.drawImage(img,top*s,2*s,s,s, x*s,sy+y*s+s*streetlevel,s,s);
ctx.globalAlpha=0;
}
ctx.drawImage(img,w1*s,0,s,s, x*s,sy+y*s,s,s);
ctx.globalAlpha=.3; ctx.fillRect(x*s,sy+y*s+streetlevel*s,s,s); ctx.globalAlpha=1;
if (streetlevel && x==sw-1) sy+=s;
if (streetlevel){
ctx.drawImage(img,w1*s,0,s,s, x*s,sy+y*s,s,s);
ctx.globalAlpha=.3; ctx.fillRect(x*s,sy+y*s,s,s); ctx.globalAlpha=1;
}

}
//*
if (streetlevel){
ctx.drawImage(img,w2*s,s,s,s, 0,sy+y*s-s,s,s);
ctx.drawImage(img,w2*s,s,s,s, sw*s-s,sy+y*s-s,s,s);
}
ctx.drawImage(img,w2*s,s,s,s, 0,sy+y*s,s,s);
ctx.drawImage(img,w2*s,s,s,s, sw*s-s,sy+y*s,s,s);
//*/
}
//draw windows
//console.log(bw+" "+windows);
if (f>=4) {

for (let x=0; x<windows; x+=1){
let light=(rnd()>.66)*128;
if (light){
ctx.drawImage(img, 128+(sw-5)*s*5,10*s,(sw-2)*s,s*3, 
trc((x+1)*s*sw/2/(windows+1)*2-(sw-2)*s/2),
sy-streetlevel*8, (sw-2)*s,3*s);
if (drawLight)
ctx.drawImage(img, 128*2+(sw-5)*s*5,10*s,(sw-2)*s,s*3, 
trc((x+1)*s*sw/2/(windows+1)*2-(sw-2)*s/2),
sy-streetlevel*8, (sw-2)*s,3*s);
else {
ctx.globalCompositeOperation="destination-out";
ctx.drawImage(img, 128*2+(sw-5)*s*5,10*s,(sw-2)*s,s*3, 
trc((x+1)*s*sw/2/(windows+1)*2-(sw-2)*s/2),
sy-streetlevel*8, (sw-2)*s,3*s);
ctx.globalCompositeOperation="source-over";
}} else 
ctx.drawImage(img, (sw-5)*s*5,10*s,(sw-2)*s,s*3, 
trc((x+1)*s*sw/2/(windows+1)*2-(sw-2)*s/2),
sy-streetlevel*8, (sw-2)*s,3*s);

}} else {
for (let x=0; x<windows; x+=1){
let light=(rnd()>.66);
if (light){
ctx.drawImage(img, 128+f*3*s,3*s,3*s,3*s, 
trc((x+1)*s*sw/2/(windows+1)*2-1.5*s),
sy-streetlevel*8, 3*s,3*s);
if (drawLight)
ctx.drawImage(img, 128*2+f*3*s,3*s,3*s,3*s, 
trc((x+1)*s*sw/2/(windows+1)*2-1.5*s),
sy-streetlevel*8, 3*s,3*s);
else {
ctx.globalCompositeOperation="destination-out";
ctx.drawImage(img, 128*2+f*3*s,3*s,3*s,3*s, 
trc((x+1)*s*sw/2/(windows+1)*2-1.5*s),
sy-streetlevel*8, 3*s,3*s);
ctx.globalCompositeOperation="source-over";
}
} else 
ctx.drawImage(img, +f*3*s,3*s,3*s,3*s, 
trc((x+1)*s*sw/2/(windows+1)*2-1.5*s),
sy-streetlevel*8, 3*s,3*s);

}
}}
//draw top
for (let x=0; x<=(sw-1)*s; x+=s){
ctx.drawImage(img,top*s,2*s,s,s, x,0,s,s);
}
//draw ambient occlusion

ctx.drawImage(img, 112,4,8,4, s,sh*s*bh+s+4,sw*s+s-4-s,4);
ctx.drawImage(img, 120,0,4,8, s,s,4,sh*s*bh+s);
ctx.drawImage(img, 124,0,4,8, sw*s-s-4,s,4,sh*s*bh+s);

ctx.translate(-(sx*s*(sw-1)),0);
}

//draw awning
for (let sx=0; sx<bw; sx++){
ctx.translate( (sx*s*(sw-1)),0);
ctx.drawImage(img,32*awning+0,7*s,s,s*2, 0,s*(bh-1)*(sh)+s,s,s*2);
ctx.drawImage(img,32*awning+s,7*s,s,s*2, s,s*(bh-1)*(sh)+s,sw*s-s*2,s*2);
ctx.drawImage(img,32*awning+24,7*s,s,s*2, sw*s-s,s*(bh-1)*(sh)+s,s,s*2);
ctx.translate(-(sx*s*(sw-1)),0);
}

ctx.translate(-transx,-transy);
return (bw)*(sw-1)*s+s;
//*/
}

drawWindows=function(canvas=c,tx=0,ty=0,r=0,drawLight=true){
let index=r;
let rnd=function(){
index=seq(index);
return index;
}
let c=canvas;
let s=8;
let img=buildingImg;
let ctx=c.getContext("2d");
let sw=5+trc(rnd()*3), sh=3+trc(rnd()*2)
let f=trc(rnd()*8);
// top
let top=trc(rnd()*2);
let windows=trc(rnd()*3)+1;
if (f>2 && windows>1) f-=3;
let awning=trc(rnd()*6);
// sw is section width
// bw is amount of sections
let bw=3+trc(rnd()*3), bh=3+trc(rnd()*2);
let w1=trc(rnd()*6), w2=trc(rnd()*6);
if (w2==w1){
if (w2==0) w2=3;
else w2--;
}

//console.log(bw*(w*windows-1)*8+8);
if (bw*(sw*windows-1)*s+s>200*s/8) {
if (windows==3) windows=1;
else {
sw-=1; bw-=1;
}
}
sw*=windows;
let transx=trc(tx), transy=trc(ty-sh*bh*s-s*2);
ctx.translate(transx,transy);
// loop horizontally
for (let sx=0; sx<bw; sx++){
ctx.translate(sx*s*(sw-1),0);
for (let sy=s; sy<bh*sh*s+s; sy+=sh*s){
// draw vertically
let streetlevel=false;
for (let y=0; y<sh; y++){
for (let x=0; x<sw; x++){
if (sy>(bh-2)*sh*s && sy<(bh-1)*sh*s && y==sh-1)
streetlevel=true;
if (sy<=(bh-1)*sh*s) ctx.fillStyle="#101010";
else ctx.fillStyle="#404040";
if (sy>(bh-2)*sh*s && sy<(bh-1)*sh*s && y==sh-1){
//ctx.fillStyle="#40f040";
//ctx.drawImage(img,top*s,2*s,s,s, x*s,sy+y*s+s*streetlevel,s,s);
//ctx.globalAlpha=0;
}
//ctx.drawImage(img,w1*s,0,s,s, x*s,sy+y*s,s,s);
//ctx.globalAlpha=.3; ctx.fillRect(x*s,sy+y*s+streetlevel*s,s,s); ctx.globalAlpha=1;
if (streetlevel && x==sw-1) sy+=s;
if (streetlevel){
//ctx.drawImage(img,w1*s,0,s,s, x*s,sy+y*s,s,s);
//ctx.globalAlpha=.3; ctx.fillRect(x*s,sy+y*s,s,s); ctx.globalAlpha=1;
}

}
//*
if (streetlevel){
//ctx.drawImage(img,w2*s,s,s,s, 0,sy+y*s-s,s,s);
//ctx.drawImage(img,w2*s,s,s,s, sw*s-s,sy+y*s-s,s,s);
}
//ctx.drawImage(img,w2*s,s,s,s, 0,sy+y*s,s,s);
//ctx.drawImage(img,w2*s,s,s,s, sw*s-s,sy+y*s,s,s);
//*/
}
//draw windows
//console.log(bw+" "+windows);
if (f>=4) {

for (let x=0; x<windows; x+=1){
let light=(rnd()>.66)*128;

if (light){
ctx.drawImage(img, 128+(sw-5)*s*5,10*s,(sw-2)*s,s*3, 
trc((x+1)*s*sw/2/(windows+1)*2-(sw-2)*s/2),
sy-streetlevel*8, (sw-2)*s,3*s);
if (drawLight)
ctx.drawImage(img, 128*2+(sw-5)*s*5,10*s,(sw-2)*s,s*3, 
trc((x+1)*s*sw/2/(windows+1)*2-(sw-2)*s/2),
sy-streetlevel*8, (sw-2)*s,3*s);
else {
ctx.globalCompositeOperation="destination-out";
ctx.drawImage(img, 128*2+(sw-5)*s*5,10*s,(sw-2)*s,s*3, 
trc((x+1)*s*sw/2/(windows+1)*2-(sw-2)*s/2),
sy-streetlevel*8, (sw-2)*s,3*s);
ctx.globalCompositeOperation="source-over";
}} else 
ctx.drawImage(img, (sw-5)*s*5,10*s,(sw-2)*s,s*3, 
trc((x+1)*s*sw/2/(windows+1)*2-(sw-2)*s/2),
sy-streetlevel*8, (sw-2)*s,3*s);

}} else {
for (let x=0; x<windows; x+=1){
let light=(rnd()>.66);

if (light){
ctx.drawImage(img, 128+f*3*s,3*s,3*s,3*s, 
trc((x+1)*s*sw/2/(windows+1)*2-1.5*s),
sy-streetlevel*8, 3*s,3*s);
if (drawLight)
ctx.drawImage(img, 128*2+f*3*s,3*s,3*s,3*s, 
trc((x+1)*s*sw/2/(windows+1)*2-1.5*s),
sy-streetlevel*8, 3*s,3*s);
else {
ctx.globalCompositeOperation="destination-out";
ctx.drawImage(img, 128*2+f*3*s,3*s,3*s,3*s, 
trc((x+1)*s*sw/2/(windows+1)*2-1.5*s),
sy-streetlevel*8, 3*s,3*s);
ctx.globalCompositeOperation="source-over";
}
} else 
ctx.drawImage(img, +f*3*s,3*s,3*s,3*s, 
trc((x+1)*s*sw/2/(windows+1)*2-1.5*s),
sy-streetlevel*8, 3*s,3*s);

}
}}
//draw top
for (let x=0; x<=(sw-1)*s; x+=s){
//ctx.drawImage(img,top*s,2*s,s,s, x,0,s,s);
}
//draw ambient occlusion

//ctx.drawImage(img, 112,4,8,4, s,sh*s*bh+s+4,sw*s+s-4-s,4);
//ctx.drawImage(img, 120,0,4,8, s,s,4,sh*s*bh+s);
//ctx.drawImage(img, 124,0,4,8, sw*s-s-4,s,4,sh*s*bh+s);

ctx.translate(-(sx*s*(sw-1)),0);
}

//draw awning
for (let sx=0; sx<bw; sx++){
ctx.translate( (sx*s*(sw-1)),0);
//ctx.drawImage(img,32*awning+0,7*s,s,s*2, 0,s*(bh-1)*(sh)+s,s,s*2);
//ctx.drawImage(img,32*awning+s,7*s,s,s*2, s,s*(bh-1)*(sh)+s,sw*s-s*2,s*2);
//ctx.drawImage(img,32*awning+24,7*s,s,s*2, sw*s-s,s*(bh-1)*(sh)+s,s,s*2);
ctx.translate(-(sx*s*(sw-1)),0);
}

ctx.translate(-transx,-transy);
return (bw)*(sw-1)*s+s;
//*/
}

buildingImg=makeImg("building genorator.png");
building2Img=makeImg("building genorator small.png");
buildingNightImg=makeImg("building genorator night.png");

drawTiles=function(room,canvas,img,bgObs=undefined){
let obs=room.obstacles;
if (bgObs!=undefined) obs=bgObs;
let bCtx=canvas.getContext("2d");
ctx.globalAlpha=.5;
ctx.fillStyle="#000000";
let sw=room.w/8+3, sh=room.h/8+1+.5;
for (let i=0; i<obs.length; i++){
obs[i].x+=16;
}
//console.log(sw+" "+sh);
let otherTiles=getTileArray(obs,sw*8,sh*8);
///canvas.width=room.w; canvas.height=room.h;
ctx.globalAlpha=1;
let r=1;
for (let x=0; x<sw+2; x++){
for (let y=0; y<sh+2; y++){
//if (tiles[x+y*sw]==1 && tiles[x+(y-1)*sw]==0)
let imgX=0, imgY=0;
let t=otherTiles[x+y*sw];
if (t==-1) {imgX=5; imgY=0;}
if (t==0) {imgX=1; imgY=0;}
if (t==1) {imgX=2; imgY=1;}
if (t==2) {imgX=1; imgY=2;}
if (t==3) {imgX=0; imgY=1;}
if (t==4) {imgX=0; imgY=0;}
if (t==5) {imgX=2; imgY=0;}
if (t==6) {imgX=2; imgY=2;}
if (t==7) {imgX=0; imgY=2;}
if (t==8) {imgX=3; imgY=0;}
if (t==9) {imgX=4; imgY=0;}
if (t==10) {imgX=4; imgY=1;}
if (t==11) {imgX=3; imgY=1;}

if (t==14) {imgX=1; imgY=1;}

r = Math.sin(100*(r%Math.PI))/2+.5;
if (t!=undefined) {
if (imgY==0)
bCtx.drawImage(img, imgX*8,imgY*8+24,8,8, x*8,y*8+8+2,8,8);
bCtx.drawImage(img, imgX*8,imgY*8,8,8, x*8,y*8+16+2,8,8);
}
bCtx.font = "8px ariel";
bCtx.fillStyle = "#ffffff";
//if (t!=undefined) bCtx.fillText(t,x*8-9,y*8-9);
}}
for (let i=0; i<obs.length; i++){
obs[i].x-=16;
}
}

drawBgObjects=function(room,canvas,img,objects=[]){

let bCtx=canvas.getContext("2d");
let sw=room.w/8+3, sh=room.h/8+1+.5;
let shadowTiles=getTileArray(room.obstacles,sw*8,sh*8);
ctx.globalAlpha=1;
let r=getSeed(room);
let freeSpace=[];
let trees=[];
let lamps=[makeObj(-256,0,96,96)];

for (let x=0; x<sw; x++){
for (let y=0; y<sh; y++){
let imgX=0, imgY=0;
let t=shadowTiles[x+y*sw];
//trees
if (t==0 && x>0) {
r = seq(r);
let b=makeObj(x*8-64/2,y*8-96,64,96);
let hit=false;
if (hitTestObstacles(room,b)) hit=true;
for (let i=0; i<trees.length; i++){
if (hitTestRect(
makeObj(x*8-256/2,y*8-256,256,256),trees[i])) hit=true;
}
if (r<.96) hit=true;
if (!hit) trees.push(b);
}
}}
for (let x=0; x<sw; x++){
for (let y=0; y<sh; y++){
let imgX=0, imgY=0;
let t=shadowTiles[x+y*sw];
//lamps
if (t==0 && x>0) {
r = seq(r*10);
let b=makeObj(x*8-64/2+16,y*8-64+16,64,64);
let hit=false;
b.x++; b.y++; b.w-=2; b.h-=2;
b.x-=16; b.y-=16;
b.x+=8; b.w-=16;
if (hitTestObstacles(room,makeObj(b.x+b.w/2-16,b.y,32,b.h))) hit=true;
b.x-=8; b.w+=16;
b.x+=16; b.y+=16;
b.x--; b.y--; b.w+=2; b.h+=2;
for (let i=0; i<lamps.length; i++){
if (hitTestRect(b,lamps[i])) hit=true;
}
for (let i=0; i<trees.length; i++){
r=seq(r);
let s=96;
let t=makeObj(trees[i].x+trees[i].w/2-s/2,trees[i].y+trees[i].h-s+4,s,s);
if (hitTestRect(b,t)) hit=true;
}
if (r>.8) hit=true;
if (!hit) lamps.push(b);
}

// misc
if (t==0 && shadowTiles[x-1+y*sw]==0 && shadowTiles[x+1+y*sw]==0) {
let b=makeObj(x*8-64/2-8,y*8-64+4-8,64,64);
let hit=false;
for (let i=0; i<freeSpace.length; i++){
if (hitTestRect(b,freeSpace[i])) hit=true;
}
if (!hit) freeSpace.push(b);
}
}}
t=0;

for (let i=0; i<freeSpace.length; i++){
b=freeSpace[i];
r=seq(r*12);
if (r<.01) r=seq(r);
if (r<.01) r=seq(r);
if (r<.01) r=seq(r);
r*=1;
//*
b.y-=3;
if (r<.1)
bCtx.drawImage(treeImg, 320,0,32,16, b.x+b.w/2+16-8,b.y+b.h-16+16+4,32,16);
else if (r<.2)
bCtx.drawImage(treeImg, 224,0,32,16, b.x+b.w/2+16-8,b.y+b.h-16+16+4,32,16);
else if (r<.3)
bCtx.drawImage(treeImg, 224,16,32,16, b.x+b.w/2+16-8,b.y+b.h-16+16+4,32,16);
else if (r<.4)
bCtx.drawImage(treeImg, 320+32,0,32,16, b.x+b.w/2+16-8,b.y+b.h-16+16+4,32,16);
else if (r<.5)
bCtx.drawImage(treeImg, 320-32,0,32,16, b.x+b.w/2+16-8,b.y+b.h-16+16+4,32,16);
else if (r<.6)
bCtx.drawImage(treeImg, 288,32,48,32, b.x+b.w/2+16-8+4,b.y+b.h-32+16+4,48,32);
b.y+=3;
//*/
}
for (let i=0; i<lamps.length; i++){
b=lamps[i];
room.shades.push(b);
r=seq(r);
bCtx.drawImage(treeImg, 128+32*Math.trunc(r*1.3),0,32,64, b.x+b.w/2-16,b.y+b.h-64-3,32,64);
}

ctx.globalAlpha=1;
//*/
room.trees=trees;
}

grassImg=makeImg("bricks.png");
moonsideImg=makeImg("bricks4.png");
shadowImg=makeImg("bricks2.png");
objects2Img=makeImg("objects2.png");
bricks3Img=makeImg("bricks3.png");
bgImage = makeImg("bg.png");
light1Img=makeImg("light1.png");
skyImg=makeImg("sky.png");

drawCity=function(tr){
tr.rainImg=makeImg("rain.png");
tr.displayTrees=function(){
//*
let imgX=0, imgY=0;
imgX=this.treef*128;
while (imgX>=1024) {imgX-=1024; imgY+=128;}
//console.log(this.cameraX+" "+this.cameraY);
for (let i=0; i<this.trees.length; i++){
let b=this.trees[i];
let img=this.tree1Img;
if (recur(i,3)==0) img=this.tree2Img;
if (recur(i,3)==1) img=this.tree3Img;
ctx.fillStyle="#f010c0";
ctx.drawImage(img,imgX,imgY,128,128, 
b.x+b.w/2-128/2+8-this.cameraX,b.y+b.h-128+4-8-this.cameraY,128,128);

}
//*/
}
tr.displayObstacles = function(){
let bldx=(Math.cos(getSeed(this)*1000)+1)*800/2;
if (!fastArt){
resetc();
ctx=tctx;
//*
ctx.globalAlpha=1;
displayArray(this,this.platforms);
this.cameraY-=8;
this.displayTrees();
this.cameraY+=8;
displayArray(this,this.spikes);
displayArray(this,this.targets);
displayArray(this,this.plates);
displayArray(this,this.clones);
displayArray(this,this.kunais);
displayArray(this,this.clouds);
displayArray(this,this.dots);
displayArray(this,this.entitys);
displayArray(this,this.dots);	
//*/
ctx=context;
}

for (let o=0; o<this.obstacles.length; o++){
let obj = this.obstacles[o];
obj.x*=.5; obj.y*=.5; obj.w*=.5; obj.h*=.5;
obj.x/=.5; obj.y/=.5; obj.w/=.5; obj.h/=.5;
}
let obs = this.obstacles;
let img = this.bricksImg;
for (let o=0; o<obs.length; o++){
let obj=obs[o];
obj.x*=.5; obj.y*=.5; obj.w*=.5; obj.h*=.5;
obj.x-=this.cameraX; obj.y-=this.cameraY;

if (!fastArt){
ctx.translate(0,  obj.y-4);
ctx.scale(1,-1);
ctx.drawImage(skyImg,
trc(bldx)+obj.x,obj.y-2-1-12+3,obj.w,8,
obj.x,-8,obj.w,8);

ctx.drawImage(this.bgImg,
obj.x+16,obj.y-2+8-1,obj.w,8,
obj.x,-8,obj.w,8);

ctx.drawImage(tc,
obj.x,obj.y-2-2,obj.w,8,
obj.x,-8,obj.w,8);
//*

//*/
ctx.scale(1,-1);

ctx.translate(0,-(obj.y-4));


ctx.globalAlpha=.7;
}
//bricks
ctx.drawImage(img,
obj.x+room.cameraX+16,obj.y+this.cameraY-2,obj.w,obj.h+16+2,
obj.x,obj.y-16,obj.w,obj.h+16+2);
ctx.globalAlpha=1;


//*/
obj.x+=this.cameraX; obj.y+=this.cameraY;
obj.x/=.5; obj.y/=.5; obj.w/=.5; obj.h/=.5;
}
ctx.globalAlpha=1;
}
tr.displayEnv=function(){
//*
let r=seq(this.obstacles.length);
if (r<1.7){
for (let o=0; o<this.obstacles.length; o++){
let obj=this.obstacles[o];
r=seq(r*10);
if (r<.5 && obj.w/2>24){
for (let i=0; i<obj.w/2-24; i+=24){	
//console.log(makeObj(obj.x+i,obj.y-24,32,24));
ctx.fillStyle="#f020a0";
let hit=false;
for (let a=0; a<this.obstacles.length; a++){
if (hitTestRect(this.obstacles[a],
(room,makeObj(obj.x+i+1,obj.y-24+1,32-2,24-2)))) hit=true;
}
}}
}}
//*/
let n=this.getName();
ctx.globalAlpha=1;
this.displayObstacles();
this.displayTrees();
displayArray(this,this.platforms);
displayArray(this,this.spikes);
displayArray(this,this.targets);
displayArray(this,this.plates);
displayArray(this,this.clones);
displayArray(this,this.kunais);
displayArray(this,this.clouds);
displayArray(this,this.dots);
this.displayFrontObs();
displayArray(this,this.entitys);
displayArray(this,this.dots);
ctx.fillStyle="#8B9091";
ctx.globalCompositeOperation="destination-over";
let bldx=(Math.cos(getSeed(this)*1000)+1)*800/2;
if (drawbg) {
ctx.drawImage(this.bgImg,-this.cameraX-16,-this.cameraY-16,tr.w+32,tr.h+32);
ctx.drawImage(skyImg,bldx,0,320,180,0,0,320,180);
}
// draw mountains
ctx.globalCompositeOperation="source-over";
ctx.drawImage(this.rainImg,0,recur(this.treef/64,1)*1152-1152,256,1152);
}

if (imagesLoaded([shadowImg,treeImg,bgImage])) tr.envdrawn=true;
// canvases
tr.bricksImg = document.createElement("canvas");
tr.bricksImg.width =tr.w+32; 
tr.bricksImg.height=tr.h+32;
tr.bgImg=document.createElement("canvas");
tr.bgImg.width=tr.w+32; tr.bgImg.height=tr.h+32;
// drawBricks
drawTiles(tr,tr.bricksImg,shadowImg);
//draw buildings
let ictx=tr.bgImg.getContext("2d");
{
let bldx=0, lowesty=0;
for (let i=0; i<tr.obstacles.length; i++){
let y=tr.obstacles[i].y;
if (y>lowesty) lowesty=y;
}
if (lowesty>tr.h) lowesty=tr.h; 
randomIndex=getSeed(tr);
bldx=-trc(seq(randomIndex)*10)*16;
for (let i=0; bldx<tr.w; i++){
bldx+=drawBuilding(tr.bgImg,bldx+16,lowesty+16-3,randomIndex,false);
randomIndex=seq(randomIndex+bldx);
if (seq(bldx)<.3) bldx+=32;
}
}
//*/
// draw objects
drawBgObjects(tr,tr.bgImg,shadowImg);
ictx.fillStyle="#8B9091";
ictx.globalAlpha=.4;
ictx.globalCompositeOperation="source-atop";
ictx.fillRect(0,0,tr.w+32,tr.h+32);
ictx.globalCompositeOperation="source-over";
ictx.globalAlpha=1;
if (true){
ictx.globalCompositeOperation="destination-over";
let bldx=0, lowesty=0;
for (let i=0; i<tr.obstacles.length; i++){
let y=tr.obstacles[i].y;
if (y>lowesty) lowesty=y;
}
if (lowesty>tr.h) lowesty=tr.h; 
randomIndex=getSeed(tr);
bldx=-trc(seq(randomIndex)*10)*16;
//*
for (let i=0; bldx<tr.w; i++){
bldx+=drawWindows(tr.bgImg,bldx+16,lowesty+16-3,randomIndex,true);
randomIndex=seq(randomIndex+bldx);
if (seq(bldx)<.3) bldx+=32;
}
//*/
ictx.globalCompositeOperation="source-over";
}
}
