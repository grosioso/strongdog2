
Menu=function(){
this.buttons=[];
this.mouse=makeObj(0,0,1,1);
this.cursor=makeObj(-10,0,1,1);
this.cursorf=0;
this.menutime=0;
this.camx=0; this.camy=0;
this.update=function(){}
this.displayCursor=function(){
let b=this.buttons;
let c=makeObj(-50,0,1,1);
for (let i=0; i<b.length; i++){
if (hitTestRect(this.mouse,b[i])) c=b[i];
}
ctx.fillStyle="#a0c0f0";
ctx.fillRect(c.x-2-this.camx,c.y-2+this.camy,2,c.h+2);
ctx.fillRect(c.x-this.camx,c.y-2+this.camy,c.w+2,2);
ctx.fillRect(c.x-this.camx-2,c.y+c.h+this.camy,c.w+2,2);
ctx.fillRect(c.x-this.camx+c.w,c.y+this.camy,2,c.h+2);
ctx.fillStyle="#ffffff";
ctx.globalAlpha=(Math.sin(this.cursorf*.2)/2+.5)*.4;
ctx.fillRect(c.x-2-this.camx,c.y-2+this.camy,2,c.h+2);
ctx.fillRect(c.x-this.camx,c.y-2+this.camy,c.w+2,2);
ctx.fillRect(c.x-this.camx-2,c.y+c.h+this.camy,c.w+2,2);
ctx.fillRect(c.x-this.camx+c.w,c.y+this.camy,2,c.h+2);
ctx.globalAlpha=1;

}
this.pushed=function(index){
if (hitTestRect(this.mouse,this.buttons[index])) return true;
else return false;
}
this.buttonsUpdate=function(){
//console.log(this.mouse);
if (usingmouse){
this.mouse=makeObj(mouseX,mouseY-this.camy,1,1);
} else {

//console.log(this.mouse);
let mouse=this.mouse;
let b=this.buttons;
let c=this.cursor;
this.cursorf++;
c.x+=(mouse.x-c.x)/2; c.y+=(mouse.y-c.y)/2;
c.w+=(mouse.w-c.w)/2; c.h+=(mouse.h-c.h)/2;
let xVel=0, yVel=0;
if (this.menutime>27) this.menutime=20; 
//if (!wpressmenu && !apressmenu && !spressmenu && !dpressmenu) this.menutime=0;
if (wpressmenu) yVel=-12;
if (apressmenu) xVel=-12;
if (spressmenu) yVel= 12;
if (dpressmenu) xVel= 12;

if (wpressmenu && !wwaspressmenu) {xVel=0;   yVel=-12; this.menutime=0;}
if (apressmenu && !awaspressmenu) {xVel=-12; yVel=0;   this.menutime=0;}
if (spressmenu && !swaspressmenu) {xVel=0;   yVel= 12; this.menutime=0;}
if (dpressmenu && !dwaspressmenu) {xVel= 12; yVel=0;   this.menutime=0;}

let index=-1;
//console.log(mouse);
for (let i=0; i<b.length; i++){
if (hitTestRect(mouse,b[i])){
index=i;
}
}
if (index>=0){
mouse.x=b[index].x; mouse.y=b[index].y; 
mouse.w=b[index].w; mouse.h=b[index].h;
} else if (b.length>0){
mouse.x=b[0].x; mouse.y=b[0].y; 
mouse.w=b[0].w; mouse.h=b[0].h;
c.x=mouse.x; c.y=mouse.y;
c.w=mouse.w; c.h=mouse.h;
index=0;
}
//console.log(xVel+" "+yVel);
//console.log(this.menutime);
if (this.buttons.length>0){
if (xVel!=0||yVel!=0){
if (this.menutime==0 || this.menutime==20){
if (index<0){
index=0;
}else{
for (let t=0; t<50; t++){
mouse.x+=xVel; mouse.y+=yVel;
for (let i=0; i<b.length; i++){
if (i!=index && hitTestRect(mouse,b[i])) {
t=50;
index=i;
i=b.length;
}}}}}
this.menutime++;
//console.log(this.menutime);
} else this.menutime=0;
if (index>=0){
//console.log(index);
mouse.x=b[index].x; mouse.y=b[index].y; 
mouse.w=b[index].w; mouse.h=b[index].h;
}
}
}

}
}
getMenu=function(menuName=""){
let tm=new Menu();

if (menuName=="pauseMenu"){
tm.btnImg=makeImg("menubuttons.png");
for (let i=0; i<4; i++){
tm.buttons.push(makeObj(128+8-96/2,32+i*19,80,16));
}
tm.update=function(){
//if (xpressmenu && !xwaspressmenu) menuOpen=false;	
let btnImg=this.btnImg;
pauseMenu.buttonsUpdate();
let mouse=this.mouse;
let b=pauseMenu.buttons;
if (mouse1press && !mouse1waspress){
mouse1press=false;
for (let i=0; i<b.length; i++){
if (hitTestRect(mouse,b[i])){
if (i==0) menuOpen=false;
if (i==1){
room.restart();
room.update();
menuOpen=false;
}
if (i==2) pauseMenu=getMenu("optionsMenu");
if (i==3){	
saveGame();
menuOpen=false;
let tempRoom = getRoom("title");
baseEnergy=3;
tempRoom.update();
tempRoom.update();
changeRoom(tempRoom);
}
// skip
// fullscreen
ps(selectedSound);
}
}
}

this.camy=10;
//if (mouse.y>c.height/2) this.camy=-mouse.y+c.height/2+10;
//*

if (room.name!="select" && room.name!="title") {
showNum(room.level,5,5);
}
showStars();
for (let i=0; i<b.length; i++){
let bs=b[i];
bs.y+=this.camy;
if (i==0) ctx.drawImage(btnImg,80,0,80,16,bs.x,bs.y,bs.w,bs.h);
if (i==1) ctx.drawImage(btnImg,0,16,80,16,bs.x,bs.y,bs.w,bs.h);
if (i==2) ctx.drawImage(btnImg,80,128,80,16,bs.x,bs.y,bs.w,bs.h);
if (i==3) ctx.drawImage(btnImg,80,32,80,16,bs.x,bs.y,bs.w,bs.h);
bs.y-=this.camy;
}

//*/
ctx.drawImage(menuImg,0,0,c.width,32,0,this.camy-8,c.width,32);		
/*
ctx.drawImage(menuImg,0,32,c.width,32,0,100+this.camy,c.width,32);
ctx.drawImage(menuImg,0,64,c.width,32,0,145+this.camy,c.width,32);
*/
//ctx.drawImage(menuImg,0,96,c.width,64,0,98+this.camy,c.width,64);
//drawText("press tab to open menu",64,125)
this.displayCursor();
}
}

if (menuName=="optionsMenu"){
tm.btnImg=makeImg("menubuttons.png");
for (let i=0; i<3; i++){
tm.buttons.push(makeObj(128+8-96/2,16+i*20,80,16));
};
for (let i=0; i<10; i++){
tm.buttons=tm.buttons.concat([
makeObj(128+8-8+20*(i-5),80+20,16,16),
]);
}
tm.update=function(){
this.buttonsUpdate();
let mouse=this.mouse;
let b=pauseMenu.buttons;
let volb=3;
//if (xpressmenu && !xwaspressmenu) pauseMenu=getMenu("pauseMenu");
if (mouse1press && !mouse1waspress){
for (let i=0; i<tm.buttons.length; i++){
if (hitTestRect(mouse,b[i])){
mouse1press=false;

if (i>=volb && i<volb+10) volume=(i-volb)/10;
if (i<volb){
if (i==0) fastArt=!fastArt;
if (i==1) openFullscreen();
if (i==2) pauseMenu=getMenu("pauseMenu");
}
}
}
ps(selectedSound);
}

this.camy=this.cursor.y-c.height/2;
this.camy=-10;
if (this.camy<-20) this.camy=-20;
if (this.camy>90) this.camy=90;
this.camy*=-1;
this.camy=Math.trunc(this.camy);
//*

for (let i=0; i<10+volb; i++){
let bs=b[i];
bs.y+=this.camy;
if (i==0) ctx.drawImage(this.btnImg,
80,144+16*!fastArt,80,16,bs.x,bs.y,bs.w,bs.h);
if (i==1) ctx.drawImage(this.btnImg,0,32+16*!document.fullscreen,80,16,bs.x,bs.y,bs.w,bs.h);
if (i==2) {
drawBtn(bs);
drawText("back",bs.x+bs.w/2-getTextWidth("back")/2,bs.y+2);
}
bs.y-=this.camy;
if (i>=volb){
bs.y+=this.camy;
ctx.fillStyle="#202020"; ctx.fillRect(bs.x,bs.y,bs.w,bs.h);
ctx.fillStyle="#a0a0a0"; ctx.fillRect(bs.x+2,bs.y+2,bs.w-4,bs.h-4);
ctx.fillStyle="#404040";
if (volume*10<i-volb) ctx.fillRect(bs.x+2,bs.y+2,bs.w-4,bs.h-4);
bs.y-=this.camy;
}
}
//*/
ctx.drawImage(menuImg,0,64,c.width,32,0,this.camy-16,c.width,32);
ctx.drawImage(menuImg,0,32,c.width,32,0,68+this.camy,c.width,32);
this.displayCursor();
}
}

if (menuName=="tipsMenu"){
for (let i=0; i<7; i++){
tm.buttons.push(makeObj(8,8+i*25,80,22));
};
tm.index=-1;
tm.img=makeImg("tips buttons.png");
tm.tipsImg=makeImg("tips.png");
tm.update=function(){
this.buttonsUpdate();
let mouse=this.mouse;
let b=pauseMenu.buttons;
//if (xpressmenu && !xwaspressmenu) pauseMenu=getMenu("optionsMenu");
for (let i=0; i<7; i++){
if (hitTestRect(mouse,b[i])) this.index=i; 

//ps(room.selectedSound);
}

this.camy=this.cursor.y-c.height/2;;
if (this.camy<0) this.camy=0;
if (this.camy>50) this.camy=50;
this.camy*=-1;
this.camy=Math.trunc(this.camy);
//*


ctx.drawImage(this.tipsImg, 0,this.index*c.height,c.width,c.height, 0,0,c.width,c.height);

for (let i=0; i<7; i++){
let bs=b[i];
bs.y+=this.camy;
ctx.drawImage(this.img,0,i*22,80,22,bs.x,bs.y,bs.w,bs.h);
bs.y-=this.camy;
}
//*/
this.displayCursor();
}
}

if (menuName=="buttonsMenu"){
tm.buttons=[
makeBtn(c.width/2-40,8+20*0,80,16,"default"),

makeBtn(c.width/2-40,8+20*1+10,80,16,"left"),
makeBtn(c.width/2-40,8+20*2+10,80,16,"up"),
makeBtn(c.width/2-40,8+20*3+10,80,16,"right"),
makeBtn(c.width/2-40,8+20*4+10,80,16,"down"),

makeBtn(c.width/2-40,8+20*5+20,80,16,"skill"),
makeBtn(c.width/2-40,8+20*6+20,80,16,"dash"),
makeBtn(c.width/2-40,8+20*7+20,80,16,"jump")
];
tm.index=-1;
tm.img=makeImg("menubuttons.png");
tm.writing=false;
tm.update=function(){
if (this.writing){
if (key!=undefined) {
if (keys[this.index].keyCode!=key.keyCode){
for (let i=0; i<keys.length; i++){
if (keys[i].keyCode==key.keyCode) 
keys[i]=keys[this.index];
}
keys[this.index]={code:key.code,keyCode:key.keyCode};
saveGame();
}
this.writing=false;
this.menutime=1;
apressmenu=false;
wpressmenu=false;
dpressmenu=false;
spressmenu=false;

zpressmenu=false;
xpressmenu=false;
mouse1press=false;
}
}else{
//console.log(this.index);
if (mouse1press && !mouse1waspress) {
if (this.index>=0) this.writing=true;
else {
keys = [
{code:"ArrowLeft",keyCode:37},
{code:"ArrowUp",keyCode:38},
{code:"ArrowRight",keyCode:39},
{code:"ArrowDown",keyCode:40},

{code:"KeyZ",keyCode:90},
{code:"KeyX",keyCode:88},
{code:"KeyC",keyCode:67}
];
}
}
this.buttonsUpdate();
let mouse=this.mouse;
let b=pauseMenu.buttons;
//if (xpressmenu && !xwaspressmenu) pauseMenu=getMenu("optionsMenu");
for (let i=0; i<8; i++){
if (hitTestRect(mouse,b[i])) this.index=i-1; 
//ps(room.selectedSound);
}
this.camy=this.cursor.y-c.height/2;;
if (this.camy<0) this.camy=0;
if (this.camy>50) this.camy=50;
this.camy*=-1;
this.camy=Math.trunc(this.camy);
}
//*
let s=this.buttons[0].s;
this.buttons[0].y+=this.camy;
drawBtn(this.buttons[0]);
drawText(s,this.buttons[0].x+this.buttons[0].w/2-getTextWidth(s)/2,this.buttons[0].y+2);
this.buttons[0].y-=this.camy;
for (let i=0; i<7; i++){
let bs=this.buttons[i+1];
bs.y+=this.camy;
drawBtn(bs);
let s=bs.s;
drawText(s,bs.x-4-getTextWidth(s),bs.y+2);
if (keys[i]!=undefined && (!this.writing || this.index!=i)){
if (i==1) console.log(getTextWidth(keys[i].code)/2);
drawText(keys[i].code,bs.x+bs.w/2+2-getTextWidth(keys[i].code)/2,bs.y+2);
}
bs.y-=this.camy;
}
//*/
this.displayCursor();
}
}

if (menuName=="chapterMenu"){
tm.btnImg=makeImg("select images.png");
tm.world=0;
for (let i=0; i<progress+1; i++){
if (i<7)
tm.buttons.push(makeObj(c.width/2+i*32,-16,22,35));
}
tm.update=function(){
let btnImg=this.btnImg;
this.camy=10;
let b=this.buttons;
let mouse=this.mouse;
this.camx=this.cursor.x-128+b[0].w/2;
this.displayCursor();
ctx.drawImage(btnImg,160,16,32,32, 128-16,0,32,32);
for (let i=0; i<this.buttons.length; i++){
let bs=b[i];
ctx.drawImage(btnImg,160+i*16,-16,16,32,bs.x-this.camx+3,bs.y+8,16,32);
}
}
}

if (menuName=="startMenu"){
tm.btnImg=makeImg("select images.png");
tm.logoImg=makeImg("armor games logo.png");
tm.buttons=[
makeObj(c.width/2-40,47,80,16),
];
if (armorgames){
tm.buttons=tm.buttons.concat([
makeObj(c.width/2-130+10,95,130,40),
makeObj(c.width/2+20,95,100,16),
makeObj(c.width/2+20,120,100,16)
]);
} else tm.buttons[0].y+=10;
tm.update=function(){
let btnImg=this.btnImg;
let b=this.buttons;
let mouse=this.mouse;
//this.camx=this.cursor.x-128+b[0].w/2;
this.displayCursor();
for (let i=0; i<b.length; i++){
let bs=b[i];
if (i==0){
drawBtn(bs);
drawText("start",bs.x+bs.w/2-getTextWidth("start")/2,bs.y+2);
}
}
if (mouse1press && !mouse1waspress){
for (let i=0; i<b.length; i++){
if (hitTestRect(mouse,b[i])){
mouse1press=false;
ps(selectedSound);
if (i==0) changeRoom(getRoom("select"));
}
}
}
}
}

if (menuName=="levelMenu"){
tm.index=0;
tm.img=makeImg("levels.png");
tm.img2=makeImg("tips buttons.png");
tm.update=function(){
this.buttons=[];
for (let i=0; i<29; i++){
this.buttons.push(makeObj(10+i*48-trc(i/5)*5*48,29+trc(i/5)*19,44,16));
}
if (mouse1press && !mouse1waspress){
for (let i=0; i<this.buttons.length; i++){
if (this.pushed(i) && !(progress==this.index && chapterProgress<i)) {
ps(selectedSound)
let tr=getRoom("carmine"+(i+1),10);
tr.restart();
changeRoom(tr);
let h=16;
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
}
}
tm.display=function(){
//ctx.drawImage(this.img2,0,22*this.index,80,22,c.width/2-40,2,80,22);
for (let i=0; i<this.buttons.length; i++){
let b=this.buttons[i];
ctx.drawImage(this.img,0,i*16,44,16,b.x,b.y,b.w,b.h);
if (progress==this.index && chapterProgress<i){ 
ctx.fillStyle="#000000";
ctx.globalAlpha=.5;
ctx.fillRect(b.x,b.y,b.w,b.h);
ctx.globalAlpha=1;
}
}
this.displayCursor();
}
}

if (armorgames){
if (menuName=="startMenu"){
tm=new Menu();
tm.btnImg=makeImg("select images.png");
tm.logoImg=makeImg("armor games logo.png");
tm.buttons=[
makeObj(c.width/2-40,47,80,16),
makeObj(c.width/2-130+10,95,130,40),
makeObj(c.width/2+20,95,100,16),
makeObj(c.width/2+20,120,100,16)
];
tm.update=function(){
let btnImg=this.btnImg;
let b=this.buttons;
let mouse=this.mouse;
//this.camx=this.cursor.x-128+b[0].w/2;
this.displayCursor();
for (let i=0; i<b.length; i++){
let bs=b[i];
if (i==0){
drawBtn(bs);
drawText("start",bs.x+bs.w/2-getTextWidth("start")/2,bs.y+2);
}

if (armorgames) drawText("press tab to open options",
c.width/2-getTextWidth("press tab to open options")/2,70,1);
if (i==1) ctx.drawImage(this.logoImg,b[1].x,b[1].y,b[1].w,b[1].h);
if (i==2) drawText("like us",bs.x+bs.w/2-getTextWidth("like us")/2,bs.y+2);
if (i==3) drawText("play more games",bs.x+bs.w/2-getTextWidth("play more games")/2,bs.y+2);
}
if (mouse1press && !mouse1waspress){
for (let i=0; i<b.length; i++){
if (hitTestRect(mouse,b[i])){
mouse1press=false;
ps(selectedSound);
if (i==0) changeRoom(getRoom("select"));
if (i==1) window.open("https://armor.ag/MoreGames");
if (i==2) window.open("https://www.twitter.com/ArmorGames");
if (i==3) window.open("https://armor.ag/MoreGames");
}
}
}
}
}
if (menuName=="optionsMenu"){
tm=new Menu();
tm.btnImg=makeImg("menubuttons.png");
for (let i=0; i<2; i++){
tm.buttons.push(makeObj(128+8-96/2,16+i*20,80,16));
};
for (let i=0; i<10; i++){
tm.buttons=tm.buttons.concat([
makeObj(128+8-8+20*(i-5),80+20,16,16),
]);
}
tm.update=function(){
this.buttonsUpdate();
let mouse=this.mouse;
let b=pauseMenu.buttons;
let volb=2;
//if (xpressmenu && !xwaspressmenu) pauseMenu=getMenu("pauseMenu");
if (mouse1press && !mouse1waspress){
for (let i=0; i<tm.buttons.length; i++){
if (hitTestRect(mouse,b[i])){
mouse1press=false;
ps(selectedSound);
if (i>=volb && i<volb+10) volume=(i-volb)/10;
if (i<volb){
if (i==0) fastArt=!fastArt;
if (i==1) pauseMenu=getMenu("pauseMenu");
}
}
}
ps(room.selectedSound);
}

this.camy=this.cursor.y-c.height/2;
this.camy=-10;
if (this.camy<-20) this.camy=-20;
if (this.camy>90) this.camy=90;
this.camy*=-1;
this.camy=Math.trunc(this.camy);
//*

for (let i=0; i<10+volb; i++){
let bs=b[i];
bs.y+=this.camy;
if (i==0) ctx.drawImage(this.btnImg,
80,144+16*!fastArt,80,16,bs.x,bs.y,bs.w,bs.h);
if (i==1) {
drawBtn(bs);
drawText("back",bs.x+bs.w/2-getTextWidth("back")/2,bs.y+2);
}
bs.y-=this.camy;
if (i>=volb){
bs.y+=this.camy;
ctx.fillStyle="#202020"; ctx.fillRect(bs.x,bs.y,bs.w,bs.h);
ctx.fillStyle="#a0a0a0"; ctx.fillRect(bs.x+2,bs.y+2,bs.w-4,bs.h-4);
ctx.fillStyle="#404040";
if (volume*10<i-volb) ctx.fillRect(bs.x+2,bs.y+2,bs.w-4,bs.h-4);
bs.y-=this.camy;
}
}
//*/
ctx.drawImage(menuImg,0,64,c.width,32,0,this.camy-16,c.width,32);
ctx.drawImage(menuImg,0,32,c.width,32,0,68+this.camy,c.width,32);
this.displayCursor();
}
}
}
return tm;
}