apressmenu=false; awaspressmenu=false;
wpressmenu=false; wwaspressmenu=false;
dpressmenu=false; dwaspressmenu=false;
spressmenu=false; swaspressmenu=false;
cpressmenu=false; cwaspressmenu=false;
xpressmenu=false; xwaspressmenu=false;
wpress=false; wwaspress=false; 
apress=false; awaspress=false; 
spress=false; swaspress=false;  
dpress=false; dwaspress=false;
rpress=false; rwaspress=false;
zpress=false; zwaspress=false; 
xpress=false; xwaspress=false;
cpress=false; cwaspress=false; 
vpress=false; vwaspress=false;
spacepress=false; spacewaspress=false;
escpress=false; escwaspress=false;
sftpress=false;
mouse1press=false; mouse1waspress=false;
mouse2press=false; mouse2waspress=false;

usingController=false;
atimer=0; dtimer=0;
mouseX=0; mouseY=0; oldMouseX=0; oldMouseY=0;
touches=[];

keys = [
{code:"KeyA",keyCode:65},
{code:"KeyW",keyCode:87},
{code:"KeyD",keyCode:68},
{code:"KeyS",keyCode:83},

{code:"KeyZ",keyCode:90},
{code:"KeyX",keyCode:88},
{code:"KeyC",keyCode:67}
];

buttons = [
{code:"DPadLeft",keyCode:37},
{code:"DPadUp",keyCode:38},
{code:"DPadRight",keyCode:39},
{code:"DPadDown",keyCode:40},

{code:"ButtonL",keyCode:90},
{code:"ButtonB",keyCode:88},
{code:"ButtonA",keyCode:67}
];

key=undefined;
document.addEventListener("keydown",function(e){
usingController=false;
//console.log(e.keyCode);
key = e;
e.preventDefault()
let k=e.keyCode, kc=keys;

if(k==9) escpress=true;
if(k==82) rpress = true;

if(k==37) apressmenu = true;
if(k==38) wpressmenu = true;
if(k==39) dpressmenu = true;
if(k==40) spressmenu = true;

if(k==88) xpressmenu = true;
if(k==67) cpressmenu = true;

if(k==32) spacepress = true;

if(k==kc[0].keyCode) apress = true;
if(k==kc[1].keyCode) wpress = true;
if(k==kc[2].keyCode) dpress = true;
if(k==kc[3].keyCode) spress = true;

if(k==kc[4].keyCode) zpress = true;
if(k==kc[5].keyCode) xpress = true;
if(k==kc[6].keyCode) cpress = true;
});

document.addEventListener("keyup",function(e){
usingController=false;
//console.log(e.keyCode);
e.preventDefault();
let k=e.keyCode, kc=keys;

if(k==9) escpress=false;
if(k==82) rpress = false;

if(k==37) apressmenu = false;
if(k==38) wpressmenu = false;
if(k==39) dpressmenu = false;
if(k==40) spressmenu = false;

if(k==88) xpressmenu = false;
if(k==67) cpressmenu = false;

if(k==32) spacepress = false;

if(k==kc[0].keyCode) apress = false;
if(k==kc[1].keyCode) wpress = false;
if(k==kc[2].keyCode) dpress = false;
if(k==kc[3].keyCode) spress = false;

if(k==kc[4].keyCode) zpress = false;
if(k==kc[5].keyCode) xpress = false;
if(k==kc[6].keyCode) cpress = false;
});

currentMotion=function(){
let tempMotion=5;
if (apress) tempMotion=4;
if (dpress) tempMotion=6;
if (spress) {
tempMotion=2;
if (apress) tempMotion=1;
if (dpress) tempMotion=3;
}
if (wpress) {
tempMotion=8;
if (apress) tempMotion=7;
if (dpress) tempMotion=9;
}
}

WasPressedUpdate=function(){
awaspressmenu=apressmenu;
wwaspressmenu=wpressmenu;
dwaspressmenu=dpressmenu;
swaspressmenu=spressmenu;
xwaspressmenu=xpressmenu;
cwaspressmenu=cpressmenu;
wwaspress = wpress; awaspress = apress;
swaspress = spress; dwaspress = dpress;
rwaspress = rpress;
zwaspress=zpress; xwaspress=xpress;
cwaspress=cpress; vwaspress=vpress;
spacewaspress = spacepress;
escwaspress=escpress;
mouse1waspress = mouse1press;
mouse2waspress = mouse2press;
mouse2waswaspress=mouse2waspress;
oldMouseX = mouseX; oldMouseY = mouseY;
key=undefined;
}