
makeImg = function(str){
let img = new Image();
img.loaded=false;
img.onload=function(){
this.loaded=true;
}
img.src = "images/"+str;
return img;
}

makeSnd = function(str){
let img = new Audio();
img.src = "sounds/"+str;
img.volume=0;
return img;
}

textImg=makeImg("text.png");

drawBtn=function(btn){
ctx.globalAlpha=1;
let c1="#909090", c2="#505050", c3="#404040";
ctx.fillStyle=c3; ctx.fillRect(btn.x,btn.y,btn.w,btn.h);
ctx.fillStyle=c2; ctx.fillRect(btn.x,btn.y,btn.w-2,btn.h-2);
ctx.fillStyle=c1; ctx.fillRect(btn.x+2,btn.y+2,btn.w-4,btn.h-4);
ctx.fillStyle=c2; ctx.fillRect(btn.x+btn.w-2,btn.y,1,1);
ctx.fillStyle=c2; ctx.fillRect(btn.x,btn.y+btn.h-2,1,1);

}

getCharWidth=function(index){
let w=7;
if (index==-1) w=3;
if (index==36) w=3;
if (index==37) w=4;
if (index==5) w=5;
if (index==8) w=3;
if (index==9) w=4;
if (index==11) w=3;
if (index==12) w=10;
if (index==17) w=5;
if (index==18) w=5;
if (index==19) w=5;
if (index==22) w=10;
return w;
}

getTextWidth=function(s){
let sx=0;
for (let i=0; i<s.length; i++){
let w=7, index=s.charCodeAt(i)-97;
if (index<0) index=s.charCodeAt(i)-48+26;
if (s.charCodeAt(i)==32) index=-1;
if (s.charCodeAt(i)==44) index=36;
if (s.charCodeAt(i)==46) index=37;
w=getCharWidth(index);
sx+=w;
}
return sx;
}

drawText=function(string,x=0,y=0,imgY=0){
let s=string.toLowerCase();
let sx=0;
for (let i=0; i<s.length; i++){
let w=7, index=s.charCodeAt(i)-97;
if (index<0) index=s.charCodeAt(i)-48+26;
if (s.charCodeAt(i)==32) index=-1;
if (s.charCodeAt(i)==44) index=36;
if (s.charCodeAt(i)==46) index=37;
w=getCharWidth(index);
ctx.drawImage(textImg, index*10,imgY*13,10,13, x+sx,y,10,13);
sx+=w;
}
ctx.globalAlpha=.5;	
//ctx.fillRect(x,y,sx,13);
ctx.globalAlpha=1;
}

vBlur = function(img,w,h,l=3){
let originalC = document.createElement("canvas");
originalC.width=w; originalC.height=h;
originalC.getContext("2d").drawImage(img,0,0,w,h);
let tempC = document.createElement("canvas");
tempC.width=w; tempC.height=h;
tempCtx = tempC.getContext("2d");
tempC.getContext("2d").drawImage(img,0,0,w,h);
for(let y=0; y<h; y++){
for(let i=-l; i<=l; i++){
if(y+i>=0 && y+i<h){
tempCtx.globalAlpha=(1-(Math.abs(i)+.01)/l)/2;
//if (i==0) tempCtx.globalAlpha=1;
tempCtx.drawImage(originalC, 0,y,w,1, 0,y+i,w,1);
}
}
}
return tempC;
}

drawFloor = function(img,x1,y1,z2=0,w1,
d2=1,vel=.02,x2=0,y2=0,w2=256,h2=256){	
if (y1>c.height/2){
let z1=c.width/(z2+d2-.001); let d1=c.width/(z2-.001);
let lastImgY=Math.floor(Math.floor(c.width/(z1)-z2)*h2/d2);
let lastY = Math.floor((y1-c.height/2)*(z1)+c.height/2);
for (let i=z1+vel; i<d1+vel; i+=vel){	
let imgY = Math.floor(Math.floor(c.width/i-z2)*h2/d2);
let imgH = lastImgY-imgY;
let y = Math.floor((y1-c.height/2)*i+c.height/2);
let h = lastY-y;
if (imgH!=0 && h!=0){
if(Math.abs(h)<imgH){
for (let r=0; r<imgH; r++){
ctx.globalAlpha=1/(r+1);
ctx.drawImage(img,x2,h2+r-lastImgY+y2,w2,1,
(x1-c.width/2)*i+c.width/2,y,w1*i,h);	
}
ctx.globalAlpha=1;
}else 
ctx.drawImage(img,x2,h2-lastImgY+y2,w2,imgH,
(x1-c.width/2)*i+c.width/2,y,w1*i,h);
lastImgY=imgY;
lastY = y;
}}}}

drawRoof = function(img,x1,y1,z2=0,w1,
d2=1,vel=.02,x2=0,y2=0,w2=256,h2=256){
if (y1<c.height/2){
let z1=c.width/(z2+d2-.001); let d1=c.width/(z2-.001);
let lastImgY=Math.floor(Math.floor(c.width/(z1-vel)-z2)*h2/d2);
let lastY = Math.floor((y1-c.height/2)*(z1-vel)+c.height/2);
for (let i=z1; i<d1; i+=vel){	
let imgY = Math.floor(Math.floor(c.width/i-z2)*h2/d2);
let imgH = lastImgY-imgY;
let y = Math.floor((y1-c.height/2)*i+c.height/2);
let h = lastY-y;
if (imgH!=0 && h!=0){
if(Math.abs(h)<imgH){
for (let r=0; r<imgH; r++){
ctx.globalAlpha=1/(r+1);
ctx.drawImage(img,x2,h2+r-lastImgY+y2,w2,1,
(x1-c.width/2)*i+c.width/2,y,w1*i,h);	
}
ctx.globalAlpha=1;
}else 
ctx.drawImage(img,x2,h2-lastImgY+y2,w2,imgH,
(x1-c.width/2)*i+c.width/2,y,w1*i,h);
lastImgY=imgY;
lastY = y;
}}}}

drawRightWall = function(img,x1,y1,z2=0,h1,
d2=1,vel=.02,x2=0,y2=0,w2=256,h2=256){
if (x1>c.width/2){
let z1=c.height/(z2+d2-.001); let d1=c.height/(z2-.001);
let lastImgX=Math.floor(Math.floor(c.height/(z1)-z2)*w2/d2);
let lastX = Math.floor((x1-c.width/2)*(z1)+c.width/2);
for (let i=z1+vel; i<d1+vel; i+=vel){	
let imgX = Math.floor(Math.floor(c.height/i-z2)*w2/d2);
let imgW = lastImgX-imgX;
let x = Math.floor((x1-c.width/2)*i+c.width/2);
let w = lastX-x;
if (imgW!=0 && w!=0){
if(Math.abs(w)<imgW){
for (let r=0; r<imgW; r++){
ctx.globalAlpha=1/(r+1);
ctx.drawImage(img,w2+r-lastImgX+x2,y2,1,h2,
x,(y1-c.height/2)*i+c.height/2,w,h1*i);	
}
ctx.globalAlpha=1;
}else 
ctx.drawImage(img,w2-lastImgX+x2,y2,imgW,h2,
x,(y1-c.height/2)*i+c.height/2,w,h1*i);
lastImgX=imgX;
lastX = x;
}}}}

drawLeftWall = function(img,x1,y1,z2=0,h1,
d2=1,vel=.02,x2=0,y2=0,w2=256,h2=256){
if (x1<c.width/2){
let z1=c.height/(z2+d2-.001); let d1=c.height/(z2-.001);
let lastImgX=Math.floor(Math.floor(c.height/(z1-vel)-z2)*w2/d2);
let lastX = Math.floor((x1-c.width/2)*(z1-vel)+c.width/2);
for (let i=z1; i<d1; i+=vel){
let imgX = Math.floor(Math.floor(c.height/i-z2)*w2/d2);
let imgW = lastImgX-imgX;
let x = Math.floor((x1-c.width/2)*i+c.width/2);
let w = lastX-x;
if (imgW!=0 && w!=0){
if(Math.abs(w)<imgW){
for (let r=0; r<imgW; r++){
ctx.globalAlpha=1/(r+1);
ctx.drawImage(img,w2+r-lastImgX+x2,y2,1,h2,
x,(y1-c.height/2)*i+c.height/2,w,h1*i);	
}
ctx.globalAlpha=1;
}else 
ctx.drawImage(img,w2-lastImgX,y2, imgW,h2,
x,(y1-c.height/2)*i+c.height/2, w,h1*i);
lastImgX=imgX;
lastX = x;
}}}}

drawBg = function(img,x,y,d,w,h,x2,y2,w2,h2){
let dist = c.width/(d+2);
if (x2!=undefined) ctx.drawImage(img,x2,y2,w2,h2,
(x-c.width/2)*dist+c.width/2-1,(y-c.height/2-h)*dist+c.height/2-1,
w*dist+2,h*dist+2);
else ctx.drawImage(img,
(x-c.width/2)*dist+c.width/2-1,(y-c.height/2-h)*dist+c.height/2-1,
w*dist+2,h*dist+2);	
}

imagesLoaded=function(imgs=[]){
let t=true;
for (let i=0; i<imgs.length; i++){
if (!imgs[i].loaded) t=false;
}
return t;
}

makeObj = function(x,y,w,h){
return {x:x,y:y,w:w,h:h,clr:"#ff0000",alpha:1,
display:displayEntity};   
}

function Room(){
this.loop = function(){}
}

moveCameraX = function(room,obj){
room.oldCameraX = room.cameraX;
let cX = obj.x + obj.w/2 - c.width*2/2;
if(0>obj.x + obj.w/2 - c.width*2/2)
cX = 0;
if(obj.x+obj.w/2-c.width*2/2>room.w-c.width*2)
cX = room.w-c.width*2;
room.cameraX = Math.trunc(cX);
}

moveCameraY = function(room,obj){
room.oldCameraY = room.cameraY;
let cY = obj.y + obj.h/2 - c.height*2/2;
if(0>obj.y + obj.h/2 - c.height*2/2)
cY = 0;
if(obj.y+obj.h/2-c.height*2/2>room.h-c.height*2)
cY = room.h-c.height*2;
room.cameraY = cY;
}

displayArray = function(room,entitys){
for (let i = 0; i < entitys.length; i++){
if (entitys[i]!=undefined){
entitys[i].x -= room.cameraX;
entitys[i].y -= room.cameraY;
entitys[i].display(room);
entitys[i].x += room.cameraX;
entitys[i].y += room.cameraY;
}}}

collideObstacles = function(room,obj){
for (let obs = 0; obs < room.obstacles.length; obs++){    
if (obj != room.obstacles[obs])
collideRect(obj,room.obstacles[obs]);
}}

getHyp = function(x,y){
return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
}

hitTestObstacles = function(room,obj){
for (let obs = 0; obs < room.obstacles.length; obs++){   
if (obj != room.obstacles[obs] &&
hitTestRect(obj,room.obstacles[obs])) return true;
}
return false;
}

displayEntity = function(){
ctx.fillStyle = this.color;
if (this.alpha != undefined)
ctx.globalAlpha = this.alpha;
ctx.fillRect(this.x,this.y,this.w,this.h);
ctx.globalAlpha = 1;
}

function hitTestRectCoords(x1, y1, w1, h1, x2, y2, w2, h2){
if(w1 > 0 && h1 > 0 && w2 > 0 && h2 > 0 &&
x1 < x2 + w2 && x2 < x1 + w1 &&
y1 < y2 + h2 && y2 < y1 + h1)
return true;
return false;
}

function hitTestRect(obj1, obj2){
return hitTestRectCoords(obj1.x,obj1.y,obj1.w,obj1.h,
    obj2.x,obj2.y,obj2.w,obj2.h);
}

function collideRectCoords(obj1, w1, h1, obj2, w2, h2){
if (hitTestRectCoords(obj1.x, obj1.y, w1, h1, obj2.x, obj2.y, w2, h2)){
this.xPen = 0; this.yPen = 0;
if (obj1.x+w1/2<obj2.x+w2/2) xPen=obj1.x+w1-obj2.x;
else xPen=obj2.x+w2-obj1.x;
if (obj1.y+h1/2<obj2.y+h2/2) yPen=obj1.y+h1-obj2.y;
else yPen=obj2.y+h2-obj1.y;
if (xPen > yPen){
if (obj1.y+h1/2 > obj2.y+h2/2) obj1.y += yPen;
else obj1.y -= yPen;
}else{
if (obj1.x+w1/2 > obj2.x+w2/2) obj1.x += xPen;
else obj1.x -= xPen;
}}}

function collideRect(obj1, obj2){
collideRectCoords(obj1,obj1.w,obj1.h,
obj2,obj2.w,obj2.h);
}

function hitTestRadCoords(x1,y1,r1,x2,y2,r2){
if (Math.sqrt(Math.pow(x2+r2-x1-r1,2) + Math.pow(-y2-r2+y1+r1,2)) < r1+r2
&& hitTestRectCoords(x1, y1, r1*2, r1*2, x2, y2, r2*2, r2*2))
return true;
return false;
}

function collideRadCoords(obj1,r1,obj2,r2){
this.angle = Math.atan2(obj1.y+r1-obj2.y-r2,
obj1.x+r1-obj2.x-r2);
if (hitTestRadCoords(obj1.x,obj1.y,r1,obj2.x,obj2.y,r2)){
this.xPen = (Math.cos(Math.PI+angle)*r1 + obj1.x + r1) -
(Math.cos(angle)*r2 + obj2.x + r2);
this.yPen = (Math.sin(Math.PI+angle)*r1 + obj1.y + r1) -
(Math.sin(angle)*r2 + obj2.y + r2);
//obj1.x -= xPen;obj1.y -= yPen;
obj1.x -= xPen/2;obj1.y -= yPen/2;
obj2.x += xPen/2;obj2.y += yPen/2;
obj1.yVel -= yPen/2; obj2.yVel += yPen/2;
}}

collideRad = function(obj1,obj2){
return collideRadCoords(obj1,obj1.r,obj2,obj2.r);
}

lineOfSight = function(obj,target,obs){
slope=(target.y+target.h/2-obj.y-obj.h/2)/
(target.x+target.w/2-obj.x-obj.w/2);
x=target.x+target.w/2;y=target.y+target.h/2;
for (let i = 0; i < obs.length; i++){
tempX=(obs[i].y-obj.y-obj.h/2)/
slope+obj.x+obj.w/2;
tempY=(obs[i].x-obj.x-obj.w/2)*
slope+obj.y+obj.h/2;
if (tempY>=obs[i].y &&
tempY<=obs[i].y+obs[i].h &&
(obj.x+obj.w/2<obs[i].x &&
obs[i].x<target.x+target.w/2 ||
obj.x+obj.w/2>obs[i].x && 
obs[i].x>target.x+target.w/2)
){return false;x=obs[i].x;y=tempY;}
if (tempX>=obs[i].x &&
tempX<=obs[i].x+obs[i].w &&
(obj.y+obj.h/2<obs[i].y &&
obs[i].y<target.y+target.h/2 ||
obj.y+obj.h/2>obs[i].y && 
obs[i].y>target.y+target.h/2)
){return false;y=obs[i].y;x=tempX;}
tempX=(obs[i].y+obs[i].h-obj.y-obj.h/2)/
slope+obj.x+obj.w/2;
tempY=(obs[i].x+obs[i].w-obj.x-obj.w/2)*
slope+obj.y+obj.h/2;
if (tempY>=obs[i].y &&
tempY<=obs[i].y+obs[i].h &&
(obj.x+obj.w/2<obs[i].x+obs[i].w &&
obs[i].x+obs[i].w<target.x+target.w/2 ||
obj.x+obj.w/2>obs[i].x+obs[i].w && 
obs[i].x+obs[i].w>target.x+target.w/2)
){return false;x=obs[i].x+obs[i].w;y=tempY;}
tempY=(obs[i].x+obs[i].w-obj.x-obj.w/2)*
slope+obj.y+obj.h/2;
tempX=(obs[i].y+obs[i].h-obj.y-obj.h/2)/
slope+obj.x+obj.w/2;
if (tempX>=obs[i].x &&
tempX<=obs[i].x+obs[i].w &&
(obj.y+obj.h/2<obs[i].y+obs[i].h &&
obs[i].y+obs[i].h<target.y+target.h/2 ||
obj.y+obj.h/2>obs[i].y+obs[i].h && 
obs[i].y+obs[i].h>target.y+target.h/2)
){return false;y=obs[i].y+obs[i].h;x=tempX;}}

return true;
}

oselect = undefined;
bselect = undefined;
objType = 0;

selectObj = function(room){
room.oldCameraY = room.cameraY;
let objects = [room.obstacles,room.spikes];
let obs = objects[objType];
let names = ["makeObj(","new Spikes("];
let cbutton = makeObj(205,5,15,15); cbutton.color = "#a0f0a0";
let dbutton = makeObj(225,5,15,15); dbutton.color = "#f0a0a0";
let sbutton = makeObj(245,5,15,15); dbutton.color = "#a0a0f0";
let mouse = {
x:(mouseX)/.5+room.cameraX,
y:(mouseY)/.5+room.cameraY,w:1,h:1};
let xDif = (mouseX+room.cameraX-oldMouseX-room.oldCameraX)/.5;
let yDif = (mouseY+room.cameraY-oldMouseY-room.oldCameraY)/.5;
if (mouse1press && !mouse1waspress){
mouse.x-=room.cameraX; mouse.y-=room.cameraY;
if (hitTestRect(mouse,cbutton)){
obs.push(eval(names[objType]+"room.cameraX,room.cameraY,48,48)"));
}
if (hitTestRect(mouse,dbutton)){
obs.splice(oselect,1);
}
if (hitTestRect(mouse,sbutton)){
oselect=0;
objType=recur(objType+1,objects.length);
}
mouse.x+=room.cameraX; mouse.y+=room.cameraY;
s = false;
for (let i=0; i<obs.length; i++){
if (hitTestRect(obs[i],mouse)){
oselect = i; s = true;
}}
if (!s) oselect = undefined;
}
if (oselect != undefined) {	
if (mouse1press) {
obs[oselect].x += xDif;
obs[oselect].y += yDif;
}
let rect = {
x:obs[oselect].x,y:obs[oselect].y,
w:obs[oselect].w,h:obs[oselect].h};
let bs=6;
buttons = [
makeObj(rect.x-bs/2,rect.y-bs/2,bs,bs),
makeObj(rect.x+rect.w-bs/2,rect.y-bs/2,bs,bs),
makeObj(rect.x-bs/2,rect.y+rect.h-bs/2,bs,bs),
makeObj(rect.x+rect.w-bs/2,rect.y+rect.h-bs/2,bs,bs),
makeObj(rect.x-bs/2+rect.w/2,rect.y-bs/2,bs,bs),
makeObj(rect.x-bs/2+rect.w/2,rect.y-bs/2+rect.h,bs,bs),
makeObj(rect.x-bs/2,rect.y-bs/2+rect.h/2,bs,bs),
makeObj(rect.x-bs/2+rect.w,rect.y-bs/2+rect.h/2,bs,bs),
];
if (mouse2press){
if (bselect == undefined){
for (let i=0; i<buttons.length; i++){
if (hitTestRect(mouse,buttons[i]))
bselect = i;
}}} else bselect = undefined;
if (bselect != undefined) {
if (buttons[bselect].x+bs/2 == obs[oselect].x) {
obs[oselect].x += xDif; obs[oselect].w -= xDif;
}
if (buttons[bselect].y+bs/2 == obs[oselect].y) {
obs[oselect].y += yDif; obs[oselect].h -= yDif;
}
if (buttons[bselect].x+bs/2 == 
obs[oselect].x+obs[oselect].w) obs[oselect].w += xDif;
if (buttons[bselect].y+bs/2 == 
obs[oselect].y+obs[oselect].h) obs[oselect].h += yDif;
if (buttons[bselect].y+15 == obs[oselect].y) {
obs[oselect].y += yDif; obs[oselect].h -= yDif;
}}
if (!mouse1press && !mouse2press){
for (let i=0; i<obs.length; i++){
let o=obs[i];
//*
o.x--; o.y--;
o.x=Math.round(o.x/16)*16;
o.y=Math.round(o.y/16)*16;
o.w=Math.round(o.w/16)*16;
o.h=Math.round(o.h/16)*16;
//*/
}
}

if (Math.abs(obs[oselect].w < 1)) obs[oselect].w = 1;
if (Math.abs(obs[oselect].h < 1)) obs[oselect].h = 1;
ctx.strokeStyle = "#a0a0ff";
ctx.beginPath();
ctx.rect(
(rect.x-room.cameraX)*.5,(rect.y-room.cameraY)*.5,
rect.w*.5,rect.h*.5
);
ctx.lineWidth = 2;
ctx.stroke();
ctx.fillStyle="#b0d0a0";
for (let i=0; i<buttons.length; i++){
let b=buttons[i];
b.color = "#a0a0ff";
b.x-=room.cameraX; b.y-=room.cameraY; 
b.x*=.5; b.y*=.5; b.w*=.5; b.h*=.5;
b.display();
b.x/=.5; b.y/=.5; b.w/=.5; b.h/=.5;
b.x+=room.cameraX; b.y+=room.cameraY; 
}
}
ctx.globalAlpha=.2;
ctx.fillStyle="#808080";
for (let x=0; x<c.width;  x+=16){
for (let y=0; y<c.height; y+=16){
let r=1;
ctx.fillRect(x*r,(y)*r,8*r,8*r);
ctx.fillRect(x*r+8*r,(y)*r+8*r,8*r,8*r);
}
}
room.drawEnv();
ctx.globalAlpha=1;
cbutton.x*=.5; cbutton.y*=.5; cbutton.w*=.5; cbutton.h*=.5;
dbutton.x*=.5; dbutton.y*=.5; dbutton.w*=.5; dbutton.h*=.5;
sbutton.x*=.5; sbutton.y*=.5; sbutton.w*=.5; sbutton.h*=.5;
cbutton.display();
dbutton.display();
sbutton.display();
cbutton.x/=.5; cbutton.y/=.5; cbutton.w/=.5; cbutton.h/=.5;
dbutton.x/=.5; dbutton.y/=.5; dbutton.w/=.5; dbutton.h/=.5;
sbutton.x/=.5; sbutton.y/=.5; sbutton.w/=.5; sbutton.h/=.5;
ctx.fillRect(mouseX,mouseY,10,10);
displayCtx.drawImage(c,
(displayWidth/2-dw/2),
(displayHeight/2-dh/2),
dw,dh);
}

collideRect = function(obj1,obj2){
if (hitTestRectCoords(
obj1.x, obj1.y, obj1.w, obj1.h,
obj2.x, obj2.y, obj2.w, obj2.h)){
xPen = 0; this.yPen = 0;
if (obj1.x+obj1.w/2<obj2.x+obj2.w/2){
xPen = obj1.x + obj1.w - obj2.x;
}else{
xPen = obj2.x + obj2.w - obj1.x;
}
if (obj1.y+obj1.h/2<obj2.y+obj2.h/2){
yPen = obj1.y + obj1.h - obj2.y;
}else{
yPen = obj2.y + obj2.h - obj1.y;
}
if (xPen >= yPen){
if (obj1.y+obj1.h/2 > obj2.y+obj2.h/2){
obj1.y += yPen;
}else{
obj1.y -= yPen;
}}else{
if (obj1.x+obj1.w/2 > obj2.x+obj2.w/2){
obj1.x += xPen;
}else{
obj1.x -= xPen;
}}}}

makeObj = function(x,y,w=1,h=1){
return {x:x,y:y,w:w,h:h,
imgX:x,imgY:y,imgW:w,imgH:h,clr:"#ff0000",alpha:1,
display:displayEntity};   
}

makeBtn = function(x,y,w,h,s){
return {x:x,y:y,w:w,h:h,s:s};
}

randomIndex=1;
rnd=function(){
randomIndex = Math.sin(100*(randomIndex%Math.PI))/2+.5;
randomIndex = recur(randomIndex,1);
return randomIndex;
}

seq=function(randomIndex){
randomIndex = Math.sin(100*(randomIndex%Math.PI))/2+.5;
randomIndex = recur(randomIndex*400,1);
return randomIndex;
}

recur = function(n,max){
return n-Math.trunc(n/max)*max;
}

getSeed=function(room){
let r=0;
if (room.obstacles.length>0) r=
recur((room.obstacles[0].w+room.obstacles[0].h+room.obstacles[0].x+
(2+room.obstacles[0].y)*(2+room.obstacles.length))/100,1);
return r;
}

ga=function(n){
ctx.globalAlpha=n;
}

trc=function(n){
return Math.trunc(n);
}

pt = function(x,y){
return {x:x*16,y:y*16};
}

getHyp = function(x,y){
return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
}

curve=function(num,rate=100){
// -1.01 slow decrease
// 100 linear
//  .01 slow increase
let t=-(1/(num/(rate+1)-1)+1)*rate;
if (num<0) t=0;
if (num>1) t=1;
return t;
}

getFace = function(obj){
return (obj.facing=="right")*2-1;
}

ps = function(snd){
snd.currentTime=0; snd.play();
}

makeHole = function(hole,obs){
let color = obs[0].color;
let tempObs = new Array(obs.length*4);
for (i=0; i<obs.length; i++){
if (obs[i] != undefined){
if (obs[i].alpha > 0){
if (hitTestRect(hole,obs[i])){
tempObs[i*4  ] = makeObj(obs[i].x,obs[i].y,
obs[i].w,hole.y-obs[i].y);
tempObs[i*4+1] = makeObj(obs[i].x,obs[i].y,
hole.x-obs[i].x,obs[i].h);
tempObs[i*4+2] = makeObj(obs[i].x,hole.y+hole.h,
obs[i].w,obs[i].y+obs[i].h-hole.y-hole.h);
tempObs[i*4+3] = makeObj(hole.x+hole.w,obs[i].y,
obs[i].x+obs[i].w-hole.x-hole.w,obs[i].h);
// copied from space wizard
for (e=0; e<4; e++){
let eobj=tempObs[i*4+e];
if (eobj!=undefined){
eobj.imgX=obs[i].imgX+
(eobj.x-obs[i].x)*obs[i].imgW/obs[i].w;
eobj.imgY=obs[i].imgY+
(eobj.y-obs[i].y)*obs[i].imgH/obs[i].h;
eobj.imgW=eobj.w*obs[i].imgW/obs[i].w; 
eobj.imgH=eobj.h*obs[i].imgH/obs[i].h; 
eobj.alpha = obs[i].alpha;
if (eobj.w<=0 || eobj.h<=0)
tempObs[i*4+e] = undefined;
}
}
// copied from space wizard
} else tempObs[i*4] = obs[i];
} else {
tempObs[i*4] = obs[i];
}
}}
let size = 0;
for (let i=0;i<tempObs.length; i++){
if (tempObs[i]!=undefined) size++;
}
let newObs= new Array(size);
let offSet=0;
for (let i=0; i<tempObs.length; i++){
if (tempObs[i]!=undefined){
newObs[i-offSet] = makeObj(
tempObs[i].x,tempObs[i].y,tempObs[i].w,tempObs[i].h);
newObs[i-offSet].imgX=tempObs[i].imgX;
newObs[i-offSet].imgY=tempObs[i].imgY;
newObs[i-offSet].imgW=tempObs[i].imgW;
newObs[i-offSet].imgH=tempObs[i].imgH;
newObs[i-offSet].color = color;
if (tempObs[i].alpha==0){
newObs[i-offSet] = tempObs[i];
}
} else offSet++;
}
if (newObs!=undefined) return newObs;
else return obs;
}

crossSlopes = function(line1,line2){
fPoint = {x:0,y:0};
slope1 = (line1.y2-line1.y1)/
         (line1.x2-line1.x1);
if (slope1 == Infinity) slope1 = 0;
slope2 = (line2.y2-line2.y1)/
         (line2.x2-line2.x1);
if (slope2 == Infinity) slope2 = 0;
yInt1 = line1.y1 - line1.x1 * slope1;
yInt2 = line2.y1 - line2.x1 * slope2;
fPoint.x = (yInt2-yInt1)/(slope1-slope2);
fPoint.y = slope1*fPoint.x + yInt1;
return fPoint;
}

lineInLine = function(line1,line2){
let f = true;
let fpoint = crossSlopes(line1,line2);
let startX = line1.x1; endX = line1.x2;
let startY = line1.y1; endY = line1.y2;
if(endX<startX){startX=line1.x2;endX=line1.x1;}
if(endY<startY){startY=line1.y2;endY=line1.y1;}
if(!(startX<fpoint.x&&fpoint.x<endX&&
     startY<fpoint.y&&fpoint.y<endY)) f=false;
startX = line2.x1; endX = line2.x2;
startY = line2.y1; endY = line2.y2;
if(endX<startX){startX=line2.x2;endX=line2.x1;}
if(endY<startY){startY=line2.y2;endY=line2.y1;}
if(!(startX<fpoint.x&&fpoint.x<endX&&
    startY<fpoint.y&&fpoint.y<endY)) f=false;
return f;
}

stupidLineInRect=function(line,obj){
if (lineInLine(line,{x1:obj.x,y1:obj.y,
x2:obj.x+.001,y2:obj.y+obj.h})) return true;
if (lineInLine(line,{x1:obj.x,y1:obj.y,
x2:obj.x+obj.w,y2:obj.y+.001})) return true;
if (lineInLine(line,{x1:obj.x+obj.w,y1:obj.y,
x2:obj.x+obj.w+.001,y2:obj.y+obj.h})) return true;
if (lineInLine(line,{x1:obj.x,y1:obj.y+obj.h+.001,
x2:obj.x+obj.w,y2:obj.y+obj.h})) return true;
return false;
}

getLine = function(obj,target,obs){
//obj.x+=obj.w/2; obj.y+=obj.h/2;
//target.x+=target.w/2; target.y+=target.h/2;
slope=(target.y-obj.y)/(target.x-obj.x);
line = {x1:obj.x,y1:obj.y,x2:target.x,y2:target.y};
x2=target.x; y2=target.y;
for (i = 0; i < obs.length; i++){
if (obs[i]!=undefined){
obs[i].x-=target.size;   obs[i].y-=target.size;
obs[i].w+=target.size*2; obs[i].h+=target.size*2;
for (e = 0; e < 4; e++){
if (e == 0){
tempX=obs[i].x; 
tempY=slope*(tempX-obj.x)+obj.y; 
tempN=tempY; minN=obs[i].y; maxN=minN+obs[i].h;
} else if (e == 1) {
tempY=obs[i].y; 
tempX=1/slope*(tempY-obj.y)+obj.x;
tempN=tempX; minN=obs[i].x; maxN=minN+obs[i].w;
} else if (e == 2){
tempX=obs[i].x+obs[i].w;
tempY=slope*(tempX-obj.x)+obj.y; 
tempN=tempY; minN=obs[i].y; maxN=minN+obs[i].h;
} else if (e == 3){
tempY=obs[i].y+obs[i].h;
tempX=1/slope*(tempY-obj.y)+obj.x; 
tempN=tempX; minN=obs[i].x; maxN=minN+obs[i].w;
}
if ((Math.abs(tempX-obj.x) < Math.abs(x2-obj.x) ||
     Math.abs(tempY-obj.y) < Math.abs(y2-obj.y))&&
  (obj.x < tempX && tempX < target.x ||
     obj.x > tempX && tempX > target.x ||
   obj.y < tempY && tempY < target.y ||
     obj.y > tempY && tempY > target.y) &&
     tempN > minN && tempN < maxN) {
x2 = tempX; y2 = tempY;
}}
obs[i].x+=target.size;   obs[i].y+=target.size;
obs[i].w-=target.size*2; obs[i].h-=target.size*2;
}}
//obj.x-=obj.w/2; obj.y-=obj.h/2;
//target.x-=target.w/2; target.y-=target.h/2;
return {x:x2,y:y2};
}

closestWall = function(obj,obs,room){
let roofs = [];
for (let i=0; i<obs.length; i++){
if (obs[i].y+obs[i].h>0 && obs[i].y+obs[i].h<320 && 
(obs[i].x<320 || obs[i].x+obs[i].w>0))
roofs.push({
x1:obs[i].x,y1:obs[i].y+obs[i].h,
x2:obs[i].x+obs[i].w,y2:obs[i].y+obs[i].h+.001});
}
let length = 10000;
let pos = undefined;
for (let a=0; a<Math.PI*2-.1; a+=.005){
let line={
x1:obj.x+obj.w/2,y1:obj.y+obj.h/2,
x2:obj.x+obj.w/2+Math.cos(a)*700,y2:obj.y+obj.h/2+Math.sin(a)*700};
for (let i=0; i<roofs.length; i++){
let point = crossSlopes(line,roofs[i]);
let position = makeObj(point.x,point.y+1,1,obj.h); 
if (lineInLine(line,roofs[i]) && 
    !hitTestObstacles(room,position)){
let tempLength = Math.sqrt(
Math.pow(position.x+position.w/2-obj.x-obj.w/2,2)+
Math.pow(position.y+position.h/2-obj.y-obj.h/2,2));	
//console.log(position);
if (tempLength<length){
length=tempLength;
pos = position;
}
}
}
}
if (pos!=undefined){
pos.x-=obj.w/2; pos.w=obj.w;
}
return pos;
}

orbImg=makeImg("orbs.png");

drawOrb=function(x,y,a=1,c="#a0d0a0"){
ctx.drawImage(orbImg, 0,0,16,16, Math.trunc(x-8),Math.trunc(y-8),16,16);
ctx.fillStyle=c;
ctx.translate(Math.trunc(x),Math.trunc(y));
ctx.fillRect(-1,-3,2,6);
ctx.fillRect(-3,-1,6,2);
ctx.fillRect(-2,-2,4,4);
for (let i=0; i<1; i+=.25){
ctx.rotate(-(Math.PI*2*i));
if (i-a+.25>=.25){
ctx.drawImage(orbImg, 16,0,16,16, -8,-8,16,16);
} else if (i-a+.25>0){
ctx.drawImage(orbImg, 16+Math.trunc(6-(i-a+.25)*6/.25)*16,0,16,16, -8,-8,16,16);

}
ctx.rotate( (Math.PI*2*i));
}

ctx.translate(-Math.trunc(x),-Math.trunc(y));
}

drawBlinks=function(room,obj){
let e=obj;
if (e.realX!=undefined) e=makeObj(e.realX,e.realY,e.realW,e.realH);
if (rnd()<.8){
let o=new Spark(e);
o.update = function(){
this.f+=.25;
this.x+=this.xVel; this.y+=this.yVel;
if (this.f>25) this.dead = true;
}

let a=Math.random()*Math.PI*2;
o.xVel=Math.cos(a)*(Math.random()*1.8+.2)*.5;
o.yVel=Math.sin(a)*(Math.random()*1.8+.2)*.5;
o.x+=o.xVel*e.w/2; o.y+=o.yVel*e.h/2;
o.f=Math.random()*3+3;
room.dots.push(o);
}
}

drawGlints=function(room,obj){
for (let s=0; s<3; s++){
let o=new OrbParticle(obj);
o.x+=Math.random()*32-16;
o.y+=Math.random()*32-16;
o.f=Math.random()*3+3;
room.dots.push(o);
}
}

drawSparks=function(room,obj){
for (let s=0; s<40; s++){
let o=new Spark(obj);
o.x+=Math.random()*32-16;
o.y+=Math.random()*32-16;
o.xVel=Math.random()*4-2;
o.yVel=Math.random()*3-3;
o.f=Math.random()*3+3;
o.img=makeImg("orbparticles2.png");
o.update = function(){
this.f+=.25;
this.x+=this.xVel; this.y+=this.yVel;
if (this.f>25) this.dead = true;
}

room.dots.push(o);
}
}

drawSoul=function(room,obj){
for (let s=0; s<15; s++){
let o=new Soul(obj);
//o.x+=Math.random()*32-16;
//o.y+=Math.random()*32-16;
o.f=Math.random()*3+3;
let a=Math.random()*Math.PI*2, d=Math.random()*2+2;
o.xVel=Math.cos(a)*d*1.5; o.yVel=Math.sin(a)*d;
o.f=Math.random()*3+3;
room.dots.push(o);
room.dots.push(new SoulTrail(o));
}
}

drawSomeGlints=function(room,obj){
for (let s=0; s<1; s++){
let o=new OrbParticle(obj);
o.x+=Math.random()*32-16;
o.y+=Math.random()*32-16;
o.f=Math.random()*3+3;
room.dots.push(o);
}
}

collideObstacles = function(room,obj){
let obs = room.getObs();
for (let o = 0; o< obs.length; o++){    
collideRect(obj,obs[o]);
}
}

hitTestObstacles = function(room,obj){
let obs = room.getObs();
for (let o = 0; o< obs.length; o++){    
if (hitTestRect(obj,obs[o])) return true;
}
return false;
}

getSouls = function(entitys){
let souls = new Array(entitys.length);
for (let i=0; i<entitys.length; i++){
let ien = entitys[i];
for (let e=0; e<entitys.length; e++){
if (i!=e && entitys[i]!=undefined && entitys[e]!=undefined){
if (
(!entitys[i].waszapping && !entitys[e].waszapping) ||
(entitys[i].waszapping && entitys[e].waszapping)

){
let een = entitys[e];
if (Math.abs(ien.y+ien.h/2-een.y-een.h/2)<ien.h/3+een.h/3){
if ((souls[i]==undefined && souls[e]==undefined)){
souls[souls[i]] = undefined;
souls[souls[e]] = undefined;
souls[i]=e; souls[e]=i;
} else {
//souls[i]=-1; souls[e]=-1;
let dist1=Math.abs(entitys[e].x+entitys[e].w/2-
entitys[i].x-entitys[i].w/2);

if (souls[e] != undefined){
let dist2=Math.abs(entitys[e].x+entitys[e].w/2-
entitys[souls[e]].x-entitys[souls[e]].w/2);
if (dist1<dist2){
if (souls[i] != undefined){
let dist3=Math.abs(entitys[i].x+entitys[i].w/2-
entitys[souls[i]].x-entitys[souls[i]].w/2);
if (dist1<dist3){
souls[souls[i]] = undefined;
souls[souls[e]] = undefined;
souls[i]=e; souls[e]=i;}
} else {
souls[souls[i]] = undefined;
souls[souls[e]] = undefined;
souls[i]=e; souls[e]=i;}
}
}
if (souls[i] != undefined){
let dist2=Math.abs(entitys[i].x+entitys[i].w/2-
entitys[souls[i]].x-entitys[souls[i]].w/2);
if (dist1<dist2){
if (souls[souls[e]] != undefined){
let dist3=Math.abs(entitys[e].x+entitys[e].w/2-
entitys[souls[e]].x-entitys[souls[e]].w/2);
if (dist1<dist3){
souls[souls[i]] = undefined;
souls[souls[e]] = undefined;
souls[i]=e; souls[e]=i;}
} else {
souls[souls[i]] = undefined;
souls[souls[e]] = undefined;
souls[i]=e; souls[e]=i;}
}}}}}}}}
return souls;
}


slashSound = makeSnd("slashSound.wav");
selectedSummon = -1;

lineRect = function(line,rect){
slope=(line.y1-line.y2)/(line.x1-line.x2);
x = line.x1; y = line.y1;
w = line.x2-line.x1; h = line.y2-line.y1;
if (line.x2 < line.x1){
x = line.x2; w = line.x1-line.x2;	
}
if (line.y2 < line.y1){
y = line.y2; h = line.y1-line.y2;
}
if (
x < rect.x + rect.w &&x + w > rect.x &&
y < rect.y + rect.h &&y + h > rect.y){
return true;
}
return false;
}

getMotion=function(motions,motion){
let stage=0;
for (let i=0; i<motions.length; i++){
if (motions[i]==motion[stage]) {
stage++
if (stage>=motion.length) return true;
}
}
return false;
}

getm = function(obj,m){
let tempm=[];
for (let i=0; i<m.length; i++){
if (obj.facing=="left"){
     if (m[i]==3) tempm.push(1);
else if (m[i]==6) tempm.push(4);
else if (m[i]==9) tempm.push(7);

else if (m[i]==1) tempm.push(3);
else if (m[i]==4) tempm.push(6);
else if (m[i]==7) tempm.push(9);
else tempm.push(m[i]);
} else tempm.push(m[i]);
}
return getMotion(obj.motions,tempm);
}

getBigRoom=function(){
room = getRoom("ammo1");
room.w*=12;
for (let i=2; i<12; i++){
let tempRoom=getRoom("ammo"+i);
for (let o=0; o<tempRoom.obstacles.length; o++){
let obj=tempRoom.obstacles[o];
if (obj.x<0) {
obj.w+=obj.x;
obj.x=0;
}
if (obj.x+obj.w>c.width){
obj.w=c.width-obj.x;
}
obj.x+=c.width*(i-1);
}
for (let o=0; o<tempRoom.spikes.length; o++){
let obj=tempRoom.spikes[o];
if (obj.x<0) {
obj.w+=obj.x;
obj.x=0;
}
if (obj.x+obj.w>c.width){
obj.w=c.width-obj.x;
}
obj.x+=c.width*(i-1);
}
room.obstacles=room.obstacles.concat(tempRoom.obstacles);
room.spikes=room.spikes.concat(tempRoom.spikes);
}
}

displayArray = function(room,entitys){
for (let i = 0; i < entitys.length; i++){
let obj=entitys[i];
if (obj){
obj.x*=.5; obj.y*=.5; obj.w*=.5; obj.h*=.5;
obj.x -= room.cameraX; obj.y -= room.cameraY;
obj.display(room);
obj.x += room.cameraX; obj.y += room.cameraY;
obj.x/=.5; obj.y/=.5; obj.w/=.5; obj.h/=.5;
}}}

moveObs = function(x=0,y=0){
for (let i=0; i<room.obstacles.length; i++){
room.obstacles[i].x+=x;
room.obstacles[i].y+=y;
}
}

shiftRoom=function(tr,x=0,y=0){
for (let i=0; i<tr.spikes.length; i++){
tr.spikes[i].x+=x; tr.spikes[i].y+=y;
}
for (let i=0; i<tr.obstacles.length; i++){
tr.obstacles[i].x+=x; tr.obstacles[i].y+=y;
}
for (let i=0; i<tr.platforms.length; i++){
tr.platforms[i].x+=x; tr.platforms[i].y+=y;
}
for (let i=0; i<tr.plates.length; i++){
tr.plates[i].x+=x; tr.plates[i].y+=y;
}
for (let i=0; i<tr.targets.length; i++){
tr.targets[i].x+=x; tr.targets[i].y+=y;
}
}

numberImage=makeImg("numbers.png");
showNum=function(s,x,y){
let str=trc(s)+"";
for (let i=0; i<str.length; i++){
if (!isNaN(str[i]))
ctx.drawImage(numberImage,eval(str[i])*16,0,16,16,Math.round(x)+i*8,Math.round(y),16,16)
}
}

showText = function(s,x,y){	
//TalkingSound.play();
//TalkingSound.volume=volume;
//    font-smooth: never;
//    -webkit-font-smoothing : none;
ctx.font = "10px ariel";
ctx.fillStyle = "#000000";
ctx.imageSmoothingEnabled=false;

for (let ox=-1;ox<=1;ox++){
for (let oy=-1;oy<=1;oy++){
ctx.fillText(s,trc(x+ox),trc(y+oy));
}}
ctx.fillStyle = "#ffffff";
ctx.fillText(s,trc(x),trc(y));
//ctx.font = "30px ";
//ctx.fillText("youve never been true to me",10,110);
}

let starImg=makeImg("fire.png");

showStars=function(f=0){
let imgX=0, imgY=0;	
if (f<-50) imgY=(f+50)*32/50;
if (f>50) imgY=(f-50)*32/50;
//ctx.drawImage(starImg,32*0,0,32,32,imgX,imgY,32,32);
//showNum(progress,16+imgX,20+imgY);
}
//
// phone controls
//
wasTouching=[false,false,false,false,false];

touchUpdate=function(){

if (touches.length>0){
//wpress=false;
//apress=false;
//dpress=false;
}
let touching=[false,false,false,false,false];
let b=[
makeObj(0,192,96,96),
makeObj(96,192,96,96),
makeObj(320,192,96,96),
makeObj(416,192,96,96),
makeObj(416,0,96,96)
]
for (let i=0; i<touches.length; i++){
//console.log("mouse 1");
mouse1press=true;
let touchX=(touches[i].clientX-displayX)*c.width /dw; 
let touchY=(touches[i].clientY-displayY)*c.height/dh;
mouseX=touchX; mouseY=touchY;
let mouse=makeObj(touchX,touchY,1,1);
for (let e=0; e<b.length; e++){
touching[e]=hitTestRect(mouse,b[e]);
}

}
if (touching[0]!=wasTouching[0]) zpress=touching[0];
if (touching[1]!=wasTouching[1]) xpress=touching[1];
if (touching[2]!=wasTouching[2]) apress=touching[2];
if (touching[3]!=wasTouching[3]) dpress=touching[3];
if (touching[4]!=wasTouching[4]) escpress=touching[4];
for (let e=0; e<b.length; e++){
wasTouching[e]=touching[e];
}
}

document.addEventListener("touchmove", function(e){
touches = e.touches;
});
document.addEventListener("touchstart", function(e){
inMobile=true;
touches = e.touches;
mouse1press=true;
});
document.addEventListener("touchend", function(e){
touches = e.touches;
mouse1press=false;
wpress=false;
apress=false;
dpress=false;
});
window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+evilfox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
if (window.mobileAndTabletCheck()) inMobile=true;

//
// controller controls
//
oldb=[];

controllerUpdate=function(){
if (controllers[0]!=undefined && controllers[0].buttons!=undefined){

let b = new Array(controllers[0].buttons.length);
let info="";
for (let i=0; i<b.length; i++){
//console.log(i);
if (controllers[0].buttons[i].value!=undefined)
info+=" "+controllers[0].buttons[i].value;
}
//console.log(info);
for (let i=0; i<b.length; i++){
if (controllers[0].buttons[i].pressed!=undefined){
b[i]=controllers[0].buttons[i].pressed;
usingController=true;
}
//if (b[i]) console.log(i);

}
b[6]=(b[6]>.5);
b[7]=(b[7]>.5);

if (controllers[0].axes!=undefined && controllers[0].axes.length>=4){
let axes=controllers[0].axes;

if (axes[1]<-.5) b[12]=true;
if (axes[0]<-.5) b[14]=true;
if (axes[1]> .5) b[13]=true;
if (axes[0]> .5) b[15]=true;

}

if (oldb!=undefined){
if (b[12]!=oldb[12]) wpressmenu = b[12];
if (b[14]!=oldb[14]) apressmenu = b[14];
if (b[13]!=oldb[13]) spressmenu = b[13];
if (b[15]!=oldb[15]) dpressmenu = b[15];

if (b[0]!=oldb[0]) cpressmenu = b[0];
if (b[1]!=oldb[1]) xpressmenu = b[1];
if (b[2]!=oldb[2]) xpressmenu = b[2];
if (b[3]!=oldb[3]) cpressmenu = b[3];

if (b[0]!=oldb[0]) cpress = b[0];
if (b[1]!=oldb[1]) xpress = b[1];
if (b[2]!=oldb[2]) xpress = b[2];
if (b[3]!=oldb[3]) cpress = b[3];

if (b[4]!=oldb[4]) zpress = b[4];
if (b[5]!=oldb[5]) zpress = b[5];

if (b[9]!=oldb[9]) escpress = b[9];

if (b[12]!=oldb[12]) wpress = b[12];
if (b[14]!=oldb[14]) apress = b[14];
if (b[13]!=oldb[13]) spress = b[13];
if (b[15]!=oldb[15]) dpress = b[15];

let lr   =(b[4]||b[5]);
let oldlr=(oldb[4]||oldb[5]);
if (lr!=oldlr) spacepress=lr;
axes=controllers[0].axes;
}
oldb=new Array(17);
for (let i=0; i<b.length; i++){
oldb[i]=b[i];
}


} else {
axes = undefined;
}
}

function openFullscreen() {
let elem = document.documentElement;
if (!document.fullscreen){
if (elem.requestFullscreen) elem.requestFullscreen();
else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}else{
if (document.exitFullscreen) document.exitFullscreen();
else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
else if (document.msExitFullscreen) document.msExitFullscreen();
}
}

selectObj = function(room){
for (let i=0; i<room.spikes.length; i++){
if (room.spikes[i].imgY==1) room.spikes[i].y+=6;
room.spikes[i].imgX=.01;
}
room.oldCameraY = room.cameraY;
let objects = [room.obstacles,room.spikes];
let obs = objects[objType];
let names = ["makeObj(","new Spikes("];
let cbutton = makeObj(205,5,15,15); cbutton.color = "#a0f0a0";
let dbutton = makeObj(225,5,15,15); dbutton.color = "#f0a0a0";
let sbutton = makeObj(245,5,15,15); dbutton.color = "#a0a0f0";
let mouse = {
x:(mouseX)/.5+room.cameraX,
y:(mouseY)/.5+room.cameraY,w:1,h:1};
let xDif = (mouseX+room.cameraX-oldMouseX-room.oldCameraX)/.5;
let yDif = (mouseY+room.cameraY-oldMouseY-room.oldCameraY)/.5;
// mouse buttons
if (mouse1press && !mouse1waspress){
mouse.x-=room.cameraX; mouse.y-=room.cameraY;
if (hitTestRect(mouse,cbutton)){
obs.push(eval(names[objType]+"room.cameraX,room.cameraY,48,48)"));
}
if (hitTestRect(mouse,dbutton)){
obs.splice(oselect,1);
}
if (hitTestRect(mouse,sbutton)){
oselect=undefined;
objType=recur(objType+1,objects.length);
}
mouse.x+=room.cameraX; mouse.y+=room.cameraY;
s = false;
for (let i=0; i<obs.length; i++){
if (hitTestRect(obs[i],mouse)){
oselect = i; s = true;
}}
if (!s) oselect = undefined;
}
// keyboard buttons 
if (zpress && !zwaspress){
obs.push(eval(names[objType]+
"trc((room.cameraX+mouseX*2)/16)*16,"+
"trc((room.cameraY+mouseY*2)/16)*16,16,16)"));
}
if (oselect!=undefined && xpress && !xwaspress){
obs.splice(oselect,1);
oselect=undefined;
}
if (cpress && !cwaspress){
oselect=undefined;
objType=recur(objType+1,objects.length);
}

if (oselect != undefined) {	
if (mouse1press) {
obs[oselect].x += xDif;
obs[oselect].y += yDif;
}
let rect = {
x:obs[oselect].x,y:obs[oselect].y,
w:obs[oselect].w,h:obs[oselect].h};
let bs=10;
buttons = [
makeObj(rect.x-bs/2,rect.y-bs/2,bs,bs),
makeObj(rect.x+rect.w-bs/2,rect.y-bs/2,bs,bs),
makeObj(rect.x-bs/2,rect.y+rect.h-bs/2,bs,bs),
makeObj(rect.x+rect.w-bs/2,rect.y+rect.h-bs/2,bs,bs),
makeObj(rect.x-bs/2+rect.w/2,rect.y-bs/2,bs,bs),
makeObj(rect.x-bs/2+rect.w/2,rect.y-bs/2+rect.h,bs,bs),
makeObj(rect.x-bs/2,rect.y-bs/2+rect.h/2,bs,bs),
makeObj(rect.x-bs/2+rect.w,rect.y-bs/2+rect.h/2,bs,bs),
];
if (mouse2press){
if (bselect == undefined){
for (let i=0; i<buttons.length; i++){
if (hitTestRect(mouse,buttons[i]))
bselect = i;
}}} else bselect = undefined;
if (bselect != undefined) {
if (buttons[bselect].x+bs/2 == obs[oselect].x) {
obs[oselect].x += xDif; obs[oselect].w -= xDif;
}
if (buttons[bselect].y+bs/2 == obs[oselect].y) {
obs[oselect].y += yDif; obs[oselect].h -= yDif;
}
if (buttons[bselect].x+bs/2 == 
obs[oselect].x+obs[oselect].w) obs[oselect].w += xDif;
if (buttons[bselect].y+bs/2 == 
obs[oselect].y+obs[oselect].h) obs[oselect].h += yDif;
if (buttons[bselect].y+15 == obs[oselect].y) {
obs[oselect].y += yDif; obs[oselect].h -= yDif;
}}
if (!mouse1press && !mouse2press){
for (let i=0; i<obs.length; i++){
let o=obs[i];
//*
o.x--; o.y--;
o.x=Math.round(o.x/16)*16;
o.y=Math.round(o.y/16)*16;
o.w=Math.round(o.w/16)*16;
o.h=Math.round(o.h/16)*16;
//*/
}
}

if (Math.abs(obs[oselect].w < 1)) obs[oselect].w = 1;
if (Math.abs(obs[oselect].h < 1)) obs[oselect].h = 1;
ctx.strokeStyle = "#a0a0ff";
ctx.beginPath();
ctx.rect(
(rect.x-room.cameraX)*.5,(rect.y-room.cameraY)*.5,
rect.w*.5,rect.h*.5
);
ctx.lineWidth = 2;
ctx.stroke();
ctx.fillStyle="#b0d0a0";
for (let i=0; i<buttons.length; i++){
let b=buttons[i];
b.color = "#a0a0ff";
b.x-=room.cameraX; b.y-=room.cameraY; 
b.x*=.5; b.y*=.5; b.w*=.5; b.h*=.5;
b.display();
b.x/=.5; b.y/=.5; b.w/=.5; b.h/=.5;
b.x+=room.cameraX; b.y+=room.cameraY; 
}
}
ctx.globalAlpha=.2;
ctx.fillStyle="#808080";
for (let x=0; x<c.width;  x+=16){
for (let y=0; y<c.height; y+=16){
let r=1;
ctx.fillRect(x*r,(y)*r,8*r,8*r);
ctx.fillRect(x*r+8*r,(y)*r+8*r,8*r,8*r);
}
}
room.drawEnv();
ctx.globalAlpha=1;
cbutton.x*=.5; cbutton.y*=.5; cbutton.w*=.5; cbutton.h*=.5;
dbutton.x*=.5; dbutton.y*=.5; dbutton.w*=.5; dbutton.h*=.5;
sbutton.x*=.5; sbutton.y*=.5; sbutton.w*=.5; sbutton.h*=.5;
cbutton.display();
dbutton.display();
ctx.fillStyle="#f0a0a0";
sbutton.display();
drawText(names[objType],sbutton.x,sbutton.y,1);
ctx.fillStyle="#f0a0a0";
cbutton.x/=.5; cbutton.y/=.5; cbutton.w/=.5; cbutton.h/=.5;
dbutton.x/=.5; dbutton.y/=.5; dbutton.w/=.5; dbutton.h/=.5;
sbutton.x/=.5; sbutton.y/=.5; sbutton.w/=.5; sbutton.h/=.5;
ctx.fillRect(mouseX,mouseY,10,10);
displayCtx.drawImage(c,
(displayWidth/2-dw/2),
(displayHeight/2-dh/2),
dw,dh);
}

getTileArray=function(o,w=c.width,h=c.height){
let sw=trc(w/8), sh=trc(h/8), obs=o;
let shadowTiles=new Array(sw*sh);
let tiles=new Array(sw*sh);
for (let i=0; i<tiles.length; i++){
tiles[i]=0;
}
for (let i=0; i<obs.length; i++){
let obj=obs[i];
for (let x=obj.x/8; x<(obj.x/8+obj.w/8); x++){
for (let y=obj.y/8; y<(obj.y/8+obj.h/8); y++){
(x>=0&& x<=sw && y>=0 && y<=sh)
if (x>=0&& x<sw && y>=0 && y<sh)
tiles[x+y*sw]=1;
}}}
for (let x=0; x<sw; x++){
for (let y=0; y<sh; y++){
tiles[x+0+(y+0)*sw]=
tiles[x+0+(y+0)*sw]+(2-tiles[x+0+(y+0)*sw])*(
(tiles[x+0+(y+0)*sw]>0)&&(
(tiles[x+1+(y+1)*sw]>0||x==sw-1||y==sh-1) &&
(tiles[x+1+(y-1)*sw]>0||x==sw-1||y==0) && 
(tiles[x-1+(y+1)*sw]>0||x==0||y==sh-1) && 
(tiles[x-1+(y-1)*sw]>0||x==0||y==0) &&
(tiles[x+1+(y+0)*sw]>0||x==sw-1) &&
(tiles[x-1+(y+0)*sw]>0||x==0)  && 
(tiles[x+0+(y+1)*sw]>0||y==sh-1) && 
(tiles[x+0+(y-1)*sw]>0||y==0)));
}}
for (let x=0; x<sw; x++){
for (let y=0; y<sh; y++){
tiles[x+0+(y+0)*sw]++;
}}
for (let x=0; x<sw; x++){
for (let y=0; y<sh; y++){
if (tiles[x+y*sw]>2) shadowTiles[x+y*sw]=14;
if (tiles[x+y*sw]==2){
let g=function(xx,yy){
if (xx+x<0||xx+x>sw-1||yy+y<0||yy+y>sh-1) return 2;
return tiles[x+xx+(yy+y)*sw];
}
let eq=function(a1,a2){
let g=true;
for (let i=0; i<9; i++){
g = g&&(a2[i]==9||a1[i]==a2[i]||
(a2[i]==8&&(a1[i]==2||a1[i]==3))||
(a2[i]==7&&(a1[i]==1||a1[i]==2)));
}
return g;
}
let rad=[
g(-1,-1),g(0,-1),g(1,-1),
g(-1, 0),g(0, 0),g(1, 0),
g(-1, 1),g(0, 1),g(1, 1)
];
let imgX=-1;
if (eq(rad,[9,7,9,7,2,8,9,8,8])) imgX=4;
if (eq(rad,[9,7,9,8,2,7,8,8,9])) imgX=5;
if (eq(rad,[8,8,9,8,2,7,9,7,9])) imgX=6;
if (eq(rad,[9,8,8,7,2,8,9,7,9])) imgX=7;
if (eq(rad,[9,7,9,2,2,2,8,8,8])) imgX=0;
if (eq(rad,[8,2,9,8,2,7,8,2,9])) imgX=1;
if (eq(rad,[8,8,8,2,2,2,9,7,9])) imgX=2;
if (eq(rad,[9,2,8,7,2,8,9,2,8])) imgX=3;
if (eq(rad,[9,8,8,8,2,8,8,8,8])) imgX=8;
if (eq(rad,[8,8,9,8,2,8,8,8,8])) imgX=9;
if (eq(rad,[8,8,8,8,2,8,8,8,9])) imgX=10;
if (eq(rad,[8,8,8,8,2,8,9,8,8])) imgX=11;
if (eq(rad,[8,8,1,8,2,8,1,8,8])) imgX=12;
if (eq(rad,[1,8,8,8,2,8,8,8,1])) imgX=13;
shadowTiles[x+y*sw] = imgX;
}}}
return shadowTiles;
}

var ngio;
//*
/* handle loaded medals */
function onMedalsLoaded(result) {
	if (result.success) medals = result.medals;
}

/* handle loaded scores */
function onScoreboardsLoaded(result) {
	if (result.success) scoreboards = result.scoreboards;
}

function unlockMedal(medal_name) {
try {
	/* If there is no user attached to our ngio object, it means the user isn't logged in and we can't unlock anything */
	if (!ngio.user) return;
	var medal;

	for (var i = 0; i < medals.length; i++) {

		medal = medals[i];

		/* look for a matching medal name */
		if (medal.name == medal_name) {

			/* we can skip unlocking a medal that's already been earned */
			if (!medal.unlocked) {

				/* unlock the medal from the server */
				ngio.callComponent('Medal.unlock', {id:medal.id}, function(result) {

					if (result.success) onMedalUnlocked(result.medal);

				});
			}

			return;
		}
	}
} catch (e){
console.log(e);
}
}
function onLoggedIn() {
	console.log("Welcome " + ngio.user.name + "!");
unlockMedal("Start");
}

function onLoginFailed() {
	console.log("There was a problem logging in: " . ngio.login_error.message );
}

function onLoginCancelled() {
	console.log("The user cancelled the login.");
}

/*
 * Before we do anything, we need to get a valid Passport session.  If the player
 * has previously logged in and selected 'remember me', we may have a valid session
 * already saved locally.
 */
function initSession() {
	ngio.getValidSession(function() {
		if (ngio.user) {
			/* 
			 * If we have a saved session, and it has not expired, 
			 * we will also have a user object we can access.
			 * We can go ahead and run our onLoggedIn handler here.
			 */
			onLoggedIn();
		} else {
			/*
			 * If we didn't have a saved session, or it has expired
			 * we should have been given a new one at this point.
			 * This is where you would draw a 'sign in' button and
			 * have it execute the following requestLogin function.
			 */
		}

	});
}

/* 
 * Call this when the user clicks a 'sign in' button from your game.  It MUST be called from
 * a mouse-click event or pop-up blockers will prevent the Newgrounds Passport page from loading.
 */
function requestLogin() {
	ngio.requestLogin(onLoggedIn, onLoginFailed, onLoginCancelled);
	/* you should also draw a 'cancel login' buton here */
}

/*
 * Call this when the user clicks a 'cancel login' button from your game.
 */
function cancelLogin() {
	/*
	 * This cancels the login request made in the previous function. 
	 * This will also trigger your onLoginCancelled callback.
	 */
	ngio.cancelLoginRequest();
}

/*
 * If your user is logged in, you should also draw a 'sign out' button for them
 * and have it call this.
 */
function logOut() {
	ngio.logOut(function() {
		/*
		 * Because we have to log the player out on the server, you will want
		 * to handle any post-logout stuff in this function, wich fires after
		 * the server has responded.
		 */
	});
}

//newgrounds shit
/*
try {
ngio = new Newgrounds.io.core("55336:7cEz3x8E", "eG1Ti1g11w/AglUFHMbg8w==");
} catch(e) {
console.log(e);
}
var medals, scoreboards;
function onMedalUnlocked(medal) {
	console.log('MEDAL GET:', medal.name);
}

try {
ngio.queueComponent("Medal.getList", {}, onMedalsLoaded);
ngio.queueComponent("ScoreBoard.getBoards", {}, onScoreboardsLoaded);
ngio.executeQueue();
} catch(e){
console.log(e);
}

try {
requestLogin();
} catch(e) {
console.log(e);
}
//*/


roomType=0; // 0=form 1=cloud 2=azalea

getObstaclesText = function(obs){
string = "[\n";
for (let i=0; i<obs.length; i++){
let o=obs[i];

if (roomType==0) {o.x-=0; o.y+=48;}

string += "makeObj("+
Math.floor(obs[i].x)+","+Math.floor(obs[i].y)+","+
Math.floor(obs[i].w)+","+Math.floor(obs[i].h)+")";
if (i!=obs.length) string+=",\n";

if (roomType==0) {o.x+=0; o.y-=48;}
}
string += "];\n"
return string;
}

getSpikesText = function(obs){
string = "[\n";
for (let i=0; i<obs.length; i++){
let o=obs[i];
let imgX=0;
for (let e=0; e<room.obstacles.length; e++){
let otl=room.obstacles[e];
if (o.w<=16){
if (!hitTestRect(otl,o) && hitTestRect(otl,makeObj(o.x-16,o.y,o.w,o.h))) imgX=2;
if (!hitTestRect(otl,o) && hitTestRect(otl,makeObj(o.x+16,o.y,o.w,o.h))) imgX=3;
} else {
if (!hitTestRect(otl,o) && hitTestRect(otl,makeObj(o.x,o.y-16,o.w,o.h))) imgX=1;
if (!hitTestRect(otl,o) && hitTestRect(otl,makeObj(o.x,o.y+16,o.w,o.h))) imgX=0;
}
}
if (roomType==0) {o.x-=64; o.y-=16;}
console.log(imgX);
string += "new Spikes("+
Math.floor(obs[i].x)+","+Math.floor(obs[i].y)+","+
Math.floor(obs[i].w)+","+Math.floor(obs[i].h)+")";
if (i!=obs.length) string+=",\n";

if (roomType==0) {o.x+=64; o.y+=16;}
}
string += "];\n"
return string;
}

getRoomText=function(){
let s="CarmineRoom=function(tr){\n";
s+="tr.obstacles="+getObstaclesText(room.obstacles);
s+="tr.spikes="+getSpikesText(room.spikes);
s+="};";
return s;
}