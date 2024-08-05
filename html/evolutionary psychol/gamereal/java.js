var myCanvas=document.getElementById("myCanvas");
var myContext=myCanvas.getContext("2d");

var backCanvas=document.getElementById("backCanvas");
var backContext=backCanvas.getContext("2d");

var miniCanvas = document.createElement("canvas");
miniCanvas.width =800*.8;
miniCanvas.height=600*.8;
var miniContext = miniCanvas.getContext('2d');


var ww=miniCanvas.width;
var hh=miniCanvas.height;
var mX=(ww/2);
var mY=(hh/2)-20;

var wws=myCanvas.width;
var hhs=myCanvas.height;

myContext.imageSmoothingEnabled = false;
backContext.imageSmoothingEnabled = false;
miniContext.imageSmoothingEnabled = false;




function stuff(fileName,place,x,y,solid,interactive,t,n){
  var img = new Image();
  img.src = "img/"+fileName+".gif";
  this.name=fileName;
  this.img=img;

  this.place=place || 0;
	this.x=x || 0;
	this.y=y || 0;

  this.t=t
  if(this.t!=0){
    this.ct=0;
    this.cn=0;
  }
  this.n=n || 1;

  if(interactive){
    this.name=interactive[0];
    this.function=interactive[1];
    appleI[this.place].push(this);
  }

  if(solid){
    appleS[this.place].push(this);
  }

  this.id=apple.length;
  if(this.place=="all"){
    for(var i=0;i<apple.length;i++){
      apple[i].push(this);
    }
  }else{
    apple[this.place].push(this);
  }
};
function removeStuff(arrayA,stuff){
  function iguales(element){
    return element==stuff;
  }

  var i=arrayA.findIndex(iguales);
  if(i!=-1){
    arrayA.splice(i,1);
  }
}
var interactiveGlow=0;
var interactiveGlowMax=20;
var interactiveGlowState=true;


var ppp_center=0;
var ppp_mine=1;
var ppp_forest=2;
var ppp_house=3;
var ppp_theVoid=4;
var ppp_tetris=5;

var place=0;
var apple=[];
var appleS=[];
var appleI=[];
var portals=[];
for(var i=0;i<=5;i++){
  apple.push([]);
  appleS.push([]);
  appleI.push([]);
  portals.push([]);
}
var backColor=["#7cc800","#222222","#000","#4a3b3b","rgba(0,0,0,0)"];

function appleRemove(place,stuff){
  function iguales(element){
    return element==stuff;
  }

  var i=apple[place].findIndex(iguales);
  if(i!=-1){
    apple[place].splice(i,1);
  }

  i=appleS[place].findIndex(iguales);
  if(i!=-1){
    apple[place].splice(i,1);
  }
  i=appleI[place].findIndex(iguales);
  if(i!=-1){
    apple[place].splice(i,1);
  }
}


var showPortals=false;
portals[0].push({to:ppp_mine,x:-15,y:-240,tx:ww/2,ty:hh-20,mX:0,mY:0});
portals[0].push({to:ppp_forest,x:240,y:-25,tx:176,ty:230,mX:0,mY:0});
portals[0].push({to:ppp_house,x:23,y:-22,tx:0,ty:75,mX:314,mY:159});
portals[1].push({to:0,x:ww/2,y:hh-10,tx:-15,ty:-226,mX:-(-ww/2),mY:-(-480)});
portals[2].push({to:0,x:166,y:230,tx:221,ty:-24,mX:139,mY:242});
portals[3].push({to:0,x:3,y:90,tx:22,ty:-8,mX:310,mY:268});
function portal(i){
  gotoPlace(portals[place][i].tx,portals[place][i].ty,portals[place][i].mX,portals[place][i].mY,portals[place][i].to);
}



var myMouse=new stuff("pacDot","all");
var myMouseImg = new Image();
myMouseImg.src = "img/hand.gif";


new stuff("fondo",0,0,1);
new stuff("doorLight",1,320,420);

new stuff("house_floor",3,0,1);
new stuff("house_chair1",3,0,1,true);
new stuff("house_chair2",3,20,15,true);
new stuff("house_chair3",3,0,42,true);
new stuff("house_chair4",3,-30,15,true);
new stuff("house_chemini",3,10,-58,true);
new stuff("house_table",3,0,20,true);
var bed=new stuff("bed",ppp_house,72,-25,true,[txt("sleep"),bedFunction]);
bed.glow=true;

var me=new stuff("blue","all",0,0);

var pink=new stuff("pink",0,-25,-5,true,[txt("talk"),pinkTalk]);
pink.glow=true;
var workbench=new stuff("workbench",0,65,-25,true,[txt("use"),workbenchF]);

var houseA=[];
houseA.push(new stuff("house3",0,22,-49));
houseA.push(new stuff("house2",0,22,-50));
houseA.push(new stuff("house1",0,22,-49));
houseA.reverse();
houseA[1].display=false;
houseA[2].display=false;

//outer limit
var wallsXY=[254,124,240,124,226,126,213,127,266,113,257,104,247,94,265,123,201,128,188,129,176,129,
163,130,150,132,137,134,123,134,110,135,96,135,82,134,68,134,56,131,42,131,28,129,16,127,2,127,
-11,127,-23,127,-37,128,-51,130,-64,133,-77,134,-90,135,-103,135,-115,133,-128,132,-143,134,
-156,135,-168,135,-181,136,-193,136,-205,136,-219,136,-231,138,-243,136,-249,125,-254,113,-253,
100,-260,88,-259,76,-249,68,-243,64,-236,55,-238,43,-243,31,-237,21,-238,8,-240,-4,-242,-16,-236,
-27,-236,-40,-246,-49,-239,-58,-241,-69,-247,-80,-247,-92,-235,-98,-229,-97,-229,-109,-221,-113,
-224,-124,-230,-136,-222,-144,-222,-156,-236,-162,-237,-173,-242,-181,-258,-188,-253,-169,-265,
-175,-256,-200,-242,-201,-228,-202,-222,-208,-209,-214,-195,-212,-188,-209,-178,-214,-167,-220,
-152,-221,-139,-218,-128,-224,-118,-232,-102,-234,-87,-233,-72,-234,-64,-228,-51,-228,-45,-237,
-34,-244,-28,-255,-15,-259,-4,-256,1,-244,12,-240,23,-236,34,-241,46,-247,57,-252,72,-252,83,
-244,94,-242,108,-248,122,-246,132,-240,143,-237,157,-239,170,-239,180,-231,176,-224,179,-213,
182,-203,176,-194,183,-184,195,-176,204,-165,200,-169,206,-153,199,-146,207,-140,216,-132,223,
-125,225,-114,220,-105,227,-97,234,-88,240,-79,241,-66,237,-58,233,-48,236,-40,248,-37,260,-34,
269,-28,262,-18,252,-13,239,-10,232,1,239,12,247,18,251,30,250,43,246,55,243,59,246,71,251,82,244,86];

//house
wallsXY.push(1,-25,10,-25,19,-33,29,-34,36,-26,42,-26,41,-36,9,-35,2,-35,0,-42,10,-42,20,-42,32,-42,40,-41);


for(var i=0;i<wallsXY.length;i+=2){
  appleS[0].push({x:wallsXY[i],y:wallsXY[i+1],img:{width:10,height:10},n:1});
  //new stuff("invisibleWall",0,wallsXY[i],wallsXY[i+1],true);
}



document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);
keyList = {};
function keyDownHandler(event){
  keyList[event.keyCode]=true;
  console.log(event.keyCode);
  event.preventDefault();
}
function keyUpHandler(event){
  keyList[event.keyCode]=false;
  event.preventDefault();
}
window.onblur= function() {
  for(var i in keyList){
      keyList[i]=false;
  }
}
var key_W="W".charCodeAt(0);
var key_D="D".charCodeAt(0);
var key_S="S".charCodeAt(0);
var key_A="A".charCodeAt(0);
var key_Q="Q".charCodeAt(0);
var key_SPACE=" ".charCodeAt(0);
var key_ENTER=13;
var key_ESC=27;
var key_UP=38;
var key_RIGHT=39;
var key_DOWN=40;
var key_LEFT=37;


var vel=2;

var Iword="";


var gameLoopInterval=false;
function startGameLoop(){
  if(gameLoopInterval==false){
    gameLoopInterval=setInterval(gameLoop,1000/30);
  }
}
function stopGameLoop(){
  clearInterval(gameLoopInterval);
  gameLoopInterval=false;
}
startGameLoop();


// ARMOR GAMES
var armorVideoDiv=document.getElementById('armorVideoDiv');
var armorVideo=document.getElementById('armorVideo');
armorVideo.addEventListener("ended",function(){
  startGameLoop();
  armorVideoDiv.remove();
});
setTimeout(function(){
  armorVideo.play();
  setTimeout(function(){
    if(armorVideo.currentTime==0){
      armorVideo.muted=true;
      armorVideo.play();
    }
  },300);
  setTimeout(function(){
    startGameLoop();
    armorVideoDiv.remove();
  },6000);
},8000);

armorVideoDiv.addEventListener("click",function(){
  window.open("https://armor.ag/MoreGames", "_blank");
});





function gameLoop(){
  for(i=0;i<vel;i++){
    if (keyList[key_W] || keyList[key_UP]){
      me.y-=1;
      if(hitTest()){
        me.y+=1;
        if(place==ppp_forest){
          if(!PointHitTest(me.x-5,me.y-6)){me.x-=1;}
          else if(!PointHitTest(me.x+5,me.y-6)){me.x+=1;}
        }
      }
    }
    if (keyList[key_D] || keyList[key_RIGHT]){
      me.x+=1;
      if(hitTest()){
        me.x-=1;
        if(place==ppp_forest){
          if(!PointHitTest(me.x+6,me.y-5)){me.y-=1;}
          else if(!PointHitTest(me.x+6,me.y+5)){me.y+=1;}
        }
      }
    }
    if (keyList[key_S] || keyList[key_DOWN]){
      me.y+=1;
      if(hitTest()){
        me.y-=1;
        if(place==ppp_forest){
          if(!PointHitTest(me.x-5,me.y+5)){me.x-=1;}
          else if(!PointHitTest(me.x+5,me.y+5)){me.x+=1;}
        }
      }
    }
    if (keyList[key_A] || keyList[key_LEFT]){
      me.x-=1;
      if(hitTest()){
        me.x+=1;
        if(place==ppp_forest){
          if(!PointHitTest(me.x-6,me.y-5)){me.y-=1;}
          else if(!PointHitTest(me.x-6,me.y+5)){me.y+=1;}
        }
      }
    }
  }
  if (keyList[key_A] || keyList[key_S] || keyList[key_D] || keyList[key_W]  || keyList[key_UP]  || keyList[key_DOWN]  || keyList[key_LEFT]  || keyList[key_RIGHT]){
    //mouseMoveF(currentMouseMoveEvent);
    foodS(-0.01);

  }
  miniContext.beginPath();

  miniContext.fillStyle=backColor[place];
  miniContext.fillRect(0,0,ww,hh);

  if(interactiveGlow<=0 || interactiveGlow>=interactiveGlowMax){
    interactiveGlowState=!interactiveGlowState;
  }
  if (interactiveGlowState){
    interactiveGlow--;
  }else{
    interactiveGlow++;
  }
  for(i=0;i<apple[place].length;i++){
    if(currentMouseMoveApple==apple[place][i]){
      miniContext.shadowColor='#ffff00';
      miniContext.shadowBlur=10;
    }else if(apple[place][i].glow==true){
      miniContext.shadowColor='#ffff00';
      miniContext.shadowBlur=interactiveGlow;
    }else{
      miniContext.shadowColor="";
      miniContext.shadowBlur="";
    }



    if(apple[place][i].t!=0){
      apple[place][i].ct--;
      if(apple[place][i].ct<=0){
        apple[place][i].ct=apple[place][i].t;
        apple[place][i].cn++;
        if(apple[place][i].cn==apple[place][i].n){
          apple[place][i].cn=0;
        }
      }

      if(apple[place][i].display!=false){
        miniContext.drawImage(apple[place][i].img,
          apple[place][i].cn*(apple[place][i].img.width/apple[place][i].n),0,
          (apple[place][i].img.width/apple[place][i].n),apple[place][i].img.height,
          apple[place][i].x+mX-(apple[place][i].img.width/apple[place][i].n/2),apple[place][i].y+mY-(apple[place][i].img.height/2),
          (apple[place][i].img.width/apple[place][i].n),apple[place][i].img.height);
        }
    }else{
      if(apple[place][i].display!=false){
        miniContext.drawImage(apple[place][i].img,apple[place][i].x+mX-(apple[place][i].img.width/2),apple[place][i].y+mY-(apple[place][i].img.height/2));
      }
    }
  }
  miniContext.shadowColor="";
  miniContext.shadowBlur="";

  //mous test
  // miniContext.fillStyle="#000";
  // miniContext.fillRect((posS.x*0.85)-21,posS.y*0.8,3,3);

  miniContext.strokeStyle="#ffffff";
  for(i=0;i<portals[place].length;i++){
    if(showPortals){
      miniContext.beginPath();
      miniContext.arc(portals[place][i].x+mX,portals[place][i].y+mY,3,0,2*Math.PI);
      miniContext.stroke();
    }


    if(distancia(portals[place][i].x,portals[place][i].y,me.x,me.y)<10){
      gotoPlace(portals[place][i].tx,portals[place][i].ty,portals[place][i].mX,portals[place][i].mY,portals[place][i].to);
    }
  }


  switch(place){
    case 0:///////////////////////////////////////////////////////////////// CENTER

      happyCamBorder(200,-200,200,-200);

      if(angActive){
        miniContext.strokeStyle="rgba(255,255,255,0.4)";
        miniContext.lineCap="round";

        for(i=1;i<9;i++){
          miniContext.beginPath();
          miniContext.lineWidth=i*0.5;
          miniContext.arc(me.x+mX,me.y+mY,12,angi+((angf-angi)*i/10),0.0001+angi+((angf-angi)*(i+1)/10));
          miniContext.stroke();
        }
        angf+=(2*Math.PI)*0.09;
        if(angf>angi+(2*Math.PI)*0.4){
          angActive=false;
        }
      }

      if(rainActive){
        miniContext.lineWidth=1;
        miniContext.strokeStyle="#d5e3ff"
        miniContext.beginPath();
        for(var i=0;i<rainX.length;i++){
          miniContext.moveTo(rainX[i]+mX,rainY[i]+mY);
          miniContext.lineTo(rainX[i]+mX+20,rainY[i]+mY-30);
          rainX[i]+=rainVX;
          rainY[i]+=rainVY;
          if(rainX[i]>me.x+(ww/2) || rainX[i]<me.x-(ww/2) || rainY[i]>me.y+(hh/2) || rainY[i]<me.y-(hh/2)){

            if(myRand(0,1)){
              rainX[i]=myRand(me.x-(ww/2),me.x+(ww/2));
              rainY[i]=me.y-hh/2;
            }else{
              rainX[i]=me.x+(ww/2);
              rainY[i]=myRand(me.y-(hh/2),me.y+(hh/2));
            }

          }
        }
        miniContext.stroke();
      }



    break;
    case 1:///////////////////////////////////////////////////////////////// MINE
      //wall
      if(me.y>hh-15){
        me.y=hh-15;
      }
      //bullets
      miniContext.fillStyle="#ffffff";
      for(i=0;i<bullets.length;i++){
        bullets[i].x+=bullets[i].vx*bulletV;
        bullets[i].y+=bullets[i].vy*bulletV;

        if(gunLevel==3 || gunLevel==4){
          if((!bullets[i].target || bullets[i].target.dead) && bullets[i].t2<0){
            var k=-1;
            var disTmp=10000;
            var forntDistance=100;
            //miniContext.fillRect(bullets[i].x+(bullets[i].vx*forntDistance),bullets[i].y+(bullets[i].vy*forntDistance),2,2);
            for(ii=0;ii<rocks.length;ii++){
              var dis=distancia(bullets[i].x+(bullets[i].vx*forntDistance),bullets[i].y+(bullets[i].vy*forntDistance),rocks[ii].x,rocks[ii].y);
              if(dis<disTmp){
                disTmp=dis;
                k=ii;
              }
            }
            if(k!=-1){
              bullets[i].target=rocks[k];
            }
            if(beettle.active){
              var dis=distancia(bullets[i].x+(bullets[i].vx*forntDistance),bullets[i].y+(bullets[i].vy*forntDistance),beettle.x,beettle.y);
              if(dis<disTmp){
                bullets[i].target=beettle;
              }
            }
          }else{
            bullets[i].t2--;
          }


          if(bullets[i].target){

            var vecX=bullets[i].target.x-bullets[i].x;
            var vecY=bullets[i].target.y-bullets[i].y;
            var angTarget=Math.atan2(vecY,vecX)+Math.PI;

            var angMe=Math.atan2(bullets[i].vy,bullets[i].vx)+Math.PI;

            switch(gunLevel){
              case 3:
                var powerSteering=0.02;
                var powerSpeed=1.5;
              break;
              case 4:
              var powerSteering=0.01;
              var powerSpeed=1.5;
              break;
            }


            if((angMe-angTarget>0 && angMe-angTarget<Math.PI) || (angMe-angTarget<-Math.PI && angMe-angTarget>-2*Math.PI)){
              //console.log("left");
              var angMe=Math.atan2(bullets[i].vy,bullets[i].vx)-(Math.PI*2*powerSteering);
            }else{
              //console.log("right");
              var angMe=Math.atan2(bullets[i].vy,bullets[i].vx)+(Math.PI*2*powerSteering);
            }
            var vxTarget=Math.cos(angMe);
            var vyTarget=Math.sin(angMe);
            bullets[i].vx=vxTarget*powerSpeed;
            bullets[i].vy=vyTarget*powerSpeed;
          }
        }


        if(bullets[i].t<0 || bullets[i].x<0 || bullets[i].x>ww || bullets[i].y<0 || bullets[i].y>hh){
          bullets.splice(i,1);
        }else{
          miniContext.fillRect(bullets[i].x+mX,bullets[i].y+mY,2,2);
          bullets[i].t--;
        }
      }


      //beettles
      if(beettle.active){

        var vecX=me.x-beettle.x;
        var vecY=me.y-beettle.y;
        var angTarget=Math.atan2(vecY,vecX)+Math.PI;

        var angMe=Math.atan2(beettle.vy,beettle.vx)+Math.PI;

        var powerSteering=0.01;
        var powerSpeed=1;

        if((angMe-angTarget>0 && angMe-angTarget<Math.PI) || (angMe-angTarget<-Math.PI && angMe-angTarget>-2*Math.PI)){
          //console.log("left");
          var angMe=Math.atan2(beettle.vy,beettle.vx)-(Math.PI*2*powerSteering);
        }else{
          //console.log("right");
          var angMe=Math.atan2(beettle.vy,beettle.vx)+(Math.PI*2*powerSteering);
        }
        var vxTarget=Math.cos(angMe);
        var vyTarget=Math.sin(angMe);
        beettle.vx=vxTarget*powerSpeed;
        beettle.vy=vyTarget*powerSpeed;

        var beettleV=2;
        beettle.x+=beettle.vx*beettleV;
        beettle.y+=beettle.vy*beettleV;

        miniContext.strokeStyle="#ff0000";
        miniContext.fillRect(beettle.x,beettle.y,1,1);

        miniContext.save();
        miniContext.translate(beettle.x,beettle.y);
        miniContext.rotate(angMe+(Math.PI*2*(1/4)));

        miniContext.strokeStyle="#00ffd1";
        miniContext.fillRect(beettle.x,beettle.y,1,1);

        miniContext.drawImage(beettle.img,
          beettle.cn*(beettle.img.width/beettle.n),0,
          (beettle.img.width/beettle.n),beettle.img.height,
          -(beettle.img.width/beettle.n/2),-(beettle.img.height/2),
          (beettle.img.width/beettle.n),beettle.img.height);
        miniContext.restore();


        for(var i=0;i<bullets.length;i++){//kill beettle drop gem
          if(distancia(beettle.x,beettle.y,bullets[i].x,bullets[i].y)<14){
            beettle.active=false;
            bullets.splice(i,1);
            gemStuffA[currentGemLvl].display=true;
            gemStuffA[currentGemLvl].x=beettle.x;
            gemStuffA[currentGemLvl].y=beettle.y;
            gemOnGround=gemStuffA[currentGemLvl];

            currentGemLvl++;
            break;
          }
        }
      }

      var deadHited=false;
      if(distancia(beettle.x,beettle.y,me.x,me.y)<18 && beettle.active){//DEAD hit in the head
        deadHited=true;
      }



      //GEM
      if(gemOnGround!=false && distancia(me.x,me.y,gemOnGround.x,gemOnGround.y)<10){
        gemS(1,gemOnGround.img);
        gemOnGround.display=false;
        gemOnGround=false;
        makeBeep(0.05,1900,-5,0.01,0.01,0.5,1);
      }

      //rocks
      miniContext.lineWidth=1;
      miniContext.strokeStyle="#c4c4c4";
      for(i=0;i<rocks.length;i++){
        rocks[i].x+=rocks[i].vx*rocksV;
        rocks[i].y+=rocks[i].vy*rocksV;

        if(rocks[i].x<-10){
          rocks[i].x=ww+9;
        }else if(rocks[i].x>ww+10){
          rocks[i].x=-9
        }
        if(rocks[i].y<-10){
          rocks[i].vy=-rocks[i].vy;
        }else if(rocks[i].y>hh+10){
          rocks[i].y=-9;
        }

        var hit=false;
        for(ii=0;ii<bullets.length;ii++){
          if(distancia(rocks[i].x,rocks[i].y,bullets[ii].x,bullets[ii].y)<10*rocks[i].type){
            hit=true;
            break;
          }
        }

        var draw=true;
        if(hit){
          rocks[i].dead=true;
          if(rocks[i].type>1){
            rocks[i].type--;
            rocks.push({x:rocks[i].x+bullets[ii].vx*10*(rocks[i].type+1),y:rocks[i].y+bullets[ii].vy*10*(rocks[i].type+1),vx:rocks[i].vx+bullets[ii].vx,vy:rocks[i].vy+bullets[ii].vy,id:myRand(0,1000),type:rocks[i].type});
            //{x:myRand(0,ww),y:-9,vx:myRand(-100,100)/100,vy:myRand(-100,100)/100,id:myRand(0,1000),type:myRand(1,2)}
            makeBeep(0.05,40+myRand(0,20),7,0.01,0.01,1,0.1);
          }else{
            rocks.splice(i,1);
            stoneS(1);
            stoneTemp++;
            draw=false;
            makeBeep(0.05,60+myRand(0,20),7,0.01,0.01,1,0.1);
          }
          bullets.splice(ii,1);

        }

        if(draw){
          Math.seed=rocks[i].id;
          miniContext.beginPath();
          miniContext.arc(rocks[i].x+mX,rocks[i].y+mY,10*rocks[i].type,0,0);
          for(k=0;k<10;k++){
            miniContext.arc(rocks[i].x+mX,rocks[i].y+mY,myRandS(5,10)*rocks[i].type,(2*Math.PI/10)*(k+1),(2*Math.PI/10)*(k+1));
          }
          miniContext.arc(rocks[i].x+mX,rocks[i].y+mY,10*rocks[i].type,2*Math.PI,2*Math.PI);
          miniContext.stroke();

          if(distancia(rocks[i].x,rocks[i].y,me.x,me.y)<10*rocks[i].type){//DEAD hit in the head
            deadHited=true;
          }
        }


      }


      if(deadHited==true){//dead function
        makeBeep(4,2800,-40,0.5,5,.5,5);
        makeBeep(0.1,30,20,0.01,0.1,.1,0.001);
        place=0;

        freezeF();

        fadeToBlack(function(){
          freezeFoff();

          if(Ttime<Tday+(Tnight/2)){
            Ttime=Tday+(Tnight/2);
          }


          if(!deadFlag){
            showCorazones();
            mensaje(txt("pinkHitMessage"));

            pinkTalkState=3;

            stoneS(-stoneTemp/1.5);
            foodS(-foodN/2);
            loveS(-1);
          }else{
            stoneS(-stoneN);
            foodS(-foodN);
          }

            gotoPlace(0,0,ww/2,hh/2,0);

            pink.x=-30;
            pink.y=-173;
            me.x=-6;
            me.y=-173;

        });
      }
      break;
      case 2:///////////////////////////////////////////////////////////////// FOREST

        // //Math.floor(me.x/10)
        // for(i=0;i<foodDots.length;i++){
        //   if(distancia(foodDots[i].x,foodDots[i].y,me.x,me.y)<6){
        //     foodS(1);
        //     apple[2].splice(apple[2].indexOf(foodDots[i]),1);
        //     foodDots.splice(i,1);
        //   }
        // }

        //next level
        var lvlChangeFlag=false;
        if(me.x>470){
          me.x=180;
          forestLevel++;
          lvlChangeFlag=true;
        }else if(me.x<180 && forestLevel>0){
          me.x=460;
          forestLevel--;
          lvlChangeFlag=true;
        }
        if(lvlChangeFlag){
          lvlChangeFlagF();
        }

        //me
        ix=Math.ceil((me.x+5)/10)-19;
        iy=Math.ceil((me.y+5)/10)-10;
        // if(ix!=pix || iy!=piy){
        //   console.log(ix,iy);
        //   pix=ix;
        //   piy=iy;
        // }

        if( (fMap[iy-1][ix]==2 && fMap[iy+1][ix]==2) ||
            (fMap[iy-1][ix]==2 && me.y<((iy+10)*10)-9) ||
            (fMap[iy+1][ix]==2 && me.y>((iy+10)*10)-9)
        ){
          me.y=((iy+10)*10)-9;
        }

        if( (fMap[iy][ix-1]==2 && fMap[iy][ix+1]==2) ||
            (fMap[iy][ix-1]==2 && me.x<((ix+19)*10)-9) ||
            (fMap[iy][ix+1]==2 && me.x>((ix+19)*10)-9)
        ){
          me.x=((ix+19)*10)-9;
        }


        miniContext.drawImage(me.img,me.x+mX-5,me.y+mY-5);



        //dots
        miniContext.fillStyle="#ffffff";

        var radius=(forestLevel*0.4)+0.6;
        if(radius>4){
          radius=4;
        }
        for(i=0;i<dotX[forestLevel].length;i++){

          if(distancia(me.x,me.y,dotX[forestLevel][i],dotY[forestLevel][i])<6){
            dotX[forestLevel].splice(i,1);
            dotY[forestLevel].splice(i,1);
            foodS(forestLevel+1);
            makeBeep(0.05,60-(forestLevel*3),1,0.01,0.01,3,0.01);
          }

          miniContext.beginPath();
          miniContext.arc(dotX[forestLevel][i]+1,dotY[forestLevel][i]+1,radius,0,2*Math.PI);
          miniContext.fill();
          //miniContext.fillRect(dotX[forestLevel][i],dotY[forestLevel][i],2,2);
        }


        //MALOS
        var deadHited=false;

        for(var k=0;k<maloX.length;k++){

          miniContext.fillStyle="#a80606";
          miniContext.fillRect(maloX[k]-5,maloY[k]-5,10,10);
          if(maloT[k]>0){
            maloT[k]--;
          }else{
            var n=0
            var p1=false;
            var p2=false;
            var p3=false;
            var p4=false;
            if(fMap[maloYi[k]+1][maloXi[k]+0]!=2 && maloVY[k]!=-1 && (me.y>maloY[k] || maloVY[k]==1)){
              n++;
              p1=true;
            }
            if(fMap[maloYi[k]-1][maloXi[k]+0]!=2 && maloVY[k]!=1 && (me.y<maloY[k] || maloVY[k]==-1)){
              n++;
              p2=true;
            }
            if(maloXi[k]+1<29 && fMap[maloYi[k]+0][maloXi[k]+1]!=2 && maloVX[k]!=-1 && (me.x>maloX[k] || maloVX[k]==1)){
              n++;
              p3=true;
            }
            if(maloXi[k]-1>0 && fMap[maloYi[k]+0][maloXi[k]-1]!=2 && maloVX[k]!=1 && (me.x<maloX[k] || maloVX[k]==-1)){
              n++;
              p4=true;
            }

            if(n==0){
              maloVY[k]=-maloVY[k];
              maloVX[k]=-maloVX[k];
              maloYi[k]+=maloVY[k];
              maloXi[k]+=maloVX[k];
            }

            var nn=myRand(1,n);
            if(p1 && nn>0){
              nn--;
              if(nn==0){
                maloYi[k]++;
                maloVY[k]=1;
                maloVX[k]=0;
              }
            }
            if(p2 && nn>0){
              nn--;
              if(nn==0){
                maloYi[k]--;
                maloVY[k]=-1;
                maloVX[k]=0;
              }
            }
            if(p3 && nn>0){
              nn--;
              if(nn==0){
                maloXi[k]++;
                maloVY[k]=0;
                maloVX[k]=1;
              }
            }
            if(p4 && nn>0){
              nn--;
              if(nn==0){
                maloXi[k]--;
                maloVY[k]=0;
                maloVX[k]=-1;
              }
            }

            maloT[k]=10
          }
          if(maloT[k]<10){
            maloX[k]+=maloVX[k];
            maloY[k]+=maloVY[k];
          }

          if(distancia(me.x,me.y,maloX[k],maloY[k])<10){//DEAD
            deadHited=true;
          }
        }


        if(deadHited==true){//dead function
          makeBeep(4,2800,-40,0.5,5,.5,5);
          makeBeep(0.1,30,20,0.01,0.1,.1,0.001);
          place=0;

          freezeF();
          fadeToBlack(function(){
            freezeFoff();


            forestLevel=0;
            lvlChangeFlagF();




            if(!deadFlag){
              showCorazones();
              mensaje(txt("pinkHitMessage"));

              pinkTalkState=3;

              foodS(-foodN/1.5);
              loveS(-1);
            }else{
              stoneS(-stoneN);
              foodS(-foodN);
            }

            gotoPlace(0,0,ww/2,hh/2,0);

            pink.x=192;
            pink.y=-26;
            me.x=192;
            me.y=-8;
          });
        }


        //berry
        for(var i=0;i<berryA[forestLevel].length;i++){
          if(distancia(me.x,me.y,berryA[forestLevel][i].x,berryA[forestLevel][i].y)<10){
            berryS(1,berryA[forestLevel][i].img);
            //makeBeep(0.051,400,0.05,0.05,0.2,0.3);
            makeBeep(0.05,800,-5,0.01,0.01,.5,0.5);

            removeStuff(apple[ppp_forest],berryA[forestLevel][i]);
            removeStuff(berryA[forestLevel],berryA[forestLevel][i]);
            i--;
          }
        }


        //Draw Map

        miniContext.fillStyle="rgb("+99/(forestLevel+1)+","+65/(forestLevel+1)+","+65/(forestLevel+1)+")";
        miniContext.strokeStyle="#fff"
        miniContext.lineWidth=1;
        miniContext.beginPath();
        for(i=0;i<fMap.length;i++){
          for(ii=0;ii<fMap[i].length;ii++){
            if(fMap[i][ii]==2){
              miniContext.fillRect((ii*10)+fMapX,(i*10)+fMapY,10,10);
              if(fMap[i][ii+1]!=2){
                miniContext.moveTo((ii*10)+fMapX+10,(i*10)+fMapY);
                miniContext.lineTo((ii*10)+fMapX+10,(i*10)+fMapY+10);
              }
            }
          }
        }
        miniContext.stroke();

      break;
      case 3:///////////////////////////////////////////////////////////////// HOUSE
        happyCam();
        if(me.y>80){
          me.y=80;
        }else if(me.y<-40){
          me.y=-40;
        }
        if(me.x>81){
          me.x=81;
        }else if(me.x<-81){
          me.x=-81;
        }


      break;
      case 4:///////////////////////////////////////////////////////////////// theVoid
      miniContext.clearRect(0,0,miniCanvas.width,miniCanvas.height);
      //backContext.clearRect(0,0,backCanvas.width,backCanvas.height);

      backContext.fillStyle="rgba(0,0,0,.05)";
      backContext.fillRect(0,0,backCanvas.width,backCanvas.height);

      miniContext.fillStyle=grd;
      //miniContext.fillRect(0,0,ww,hh);

      var ww2=ww/2;
      var hh2=hh/2;
      // var imageData = miniContext.getImageData(0,0,ww,hh);
      // var data = imageData.data;
      for(var i=0;i<starX.length;i++){
        starT[i]--;

        var dis=distancia(starX[i],starY[i],ww2,hh2)
        starX[i]+=starVX[i]*dis*0.002;
        starY[i]+=starVY[i]*dis*0.002;

        miniContext.fillStyle="rgb("+starColor[i][0]+","+starColor[i][1]+","+starColor[i][2]+")";
        //drawStar(miniContext,starX[i],starY[i],4,(dis*0.01*starSize[i])+1.8,(dis*0.01*starSize[i])-0.1);
        miniContext.fillRect(starX[i],starY[i],(dis*0.01*starSize[i])+0.3,(dis*0.01*starSize[i])+0.3);

        // var index=(Math.round(starY[i])*ww+Math.round(starX[i]))*4;
        // data[index]   = 255;	// red
        // data[++index] = 0;	// green
        // data[++index] = 0;	// blue
        // data[++index] = 255;

        if(starT[i]<=0){
          starT[i]=myRand(0,100);
          starX[i]=myRand(0,ww);
          starY[i]=myRand(0,hh);
          var vx=(ww/2)-starX[i];
          var vy=(hh/2)-starY[i];
          var norm=Math.sqrt(Math.pow(vx,2)+Math.pow(vy,2));
          starVX[i]=vx/norm;
          starVY[i]=vy/norm;
          starColor[i]=starColorA[myRand(0,starColorA.length-1)];
          //starColor[i]=[myRand(0,255),myRand(0,255),myRand(0,255)];
          starSize[i]=myRand(0,100)/100;

          if(myRand(0,100)<5){
            starVX[i]=-starVX[i];
            starVY[i]=-starVY[i];
            starSize[i]=starSize[i]*0.2;
          }
        }
      }
      //miniContext.putImageData(imageData, 0, 0);

      break;
      case 5:///////////////////////////////////////////////////////////////// TETRIS
        miniContext.drawImage(tetrisBack,0,0,640,480);

        miniContext.fillStyle="#ffffff";
        miniContext.lineWidth=1;
        miniContext.strokeStyle="#f5f5f5";

        miniContext.rect(tetrisSx,tetrisSy,tetrisSize*10,tetrisSize*20);

        for(var i=0;i<10;i++){
          for(var ii=0;ii<20;ii++){
            if(tetrisMap[i][ii]!=0){
              miniContext.fillRect((i*tetrisSize)+tetrisSx,(ii*tetrisSize)+tetrisSy,tetrisSize,tetrisSize);
              miniContext.rect((i*tetrisSize)+tetrisSx,(ii*tetrisSize)+tetrisSy,tetrisSize,tetrisSize);
            }
          }
        }
        miniContext.stroke();

        var houseX=0;
        var houseY=-55;
        miniContext.beginPath();
        for(var i=0;i<houseMaxA[houseLevel];i++){
          if(i<tetrisRaws){
            miniContext.fillRect(70,360-((100/houseMaxA[houseLevel])*(i+1))+houseY,100,(100/houseMaxA[houseLevel]));
          }
          miniContext.rect(70,360-((100/houseMaxA[houseLevel])*(i+1))+houseY,100,(100/houseMaxA[houseLevel]));
        }
        miniContext.stroke();

        miniContext.fillStyle="#666666";
        miniContext.fillRect(150,260+houseY,20,-50);

        miniContext.fillStyle="#712424";
        miniContext.beginPath();
        miniContext.moveTo(40,260+houseY);
        miniContext.lineTo(200,260+houseY);
        miniContext.lineTo(120,210+houseY);
        miniContext.closePath();
        miniContext.fill();



      break;
  }

  miniContext.fillStyle="black";
  miniContext.textAlign="center";
  miniContext.font = "25px Arial";
  miniContext.fillText(Iword,ww/2,hh-50);


  // myContext.clearRect(0,0,ww,hh);
  // myContext.globalAlpha = pixelAlpha;
  // for(i=0;i<ww;i+=pixelSize){
  //   for(ii=0;ii<hh;ii+=pixelSize){
  //     myContext.drawImage(pixels,i,ii,pixelSize,pixelSize);
  //   }
  // }
  // myContext.globalAlpha = 1;


  //myContext.drawImage(miniCanvas,30,10,737,579);


  if(freezeScreen){
    if(freezeScreenFirst){
      freezeContext.drawImage(miniCanvas,0,0);
      freezeScreenFirst=false;
    }
    miniContext.drawImage(freezeCanvas,0,0);
  }
  if(fadeAlpha>0){
    miniContext.fillStyle="rgba(0,0,0,"+fadeAlpha+")";
    miniContext.fillRect(0,0,miniCanvas.width,miniCanvas.width);
  }

  if(place==ppp_theVoid){
    miniContext.drawImage(myMouseImg,myMouse.x+mX-(myMouseImg.width/2),myMouse.y+mY-(myMouseImg.height/2));
  }


  // miniContext.globalAlpha = .3;
  // miniContext.drawImage(miniCanvas,-2,0);
  // miniContext.drawImage(miniCanvas,+2,0);
  // miniContext.globalAlpha = 1;

  backContext.globalAlpha = .7;
  for(i=0;i<gA.length-1;i++){
    var sH=(hhs)+gA[i][1];
    backContext.drawImage(
      miniCanvas,
      //Source x,y
      gA[i][0]*ww,0,
      //Source width, heigth of squere to take
      (gA[i+1][0]-gA[i][0])*ww,hh,
      // target x,y
      gA[i][0]*(wws*.925)+30,-(sH-hhs)/2,
      // target width, heigth, deform original squere
      (gA[i+1][0]-gA[i][0])*(wws*.925),sH
    );
  }





  //if(place!=ppp_theVoid){

  backContext.globalAlpha = .3;
  backContext.drawImage(backCanvas,-1.5,0);
  backContext.drawImage(backCanvas,+1.5,0);



  myContext.clearRect(0,0,myCanvas.width,myCanvas.height);
  myContext.globalAlpha = .10;
  myContext.fillStyle=pixelsPatern;
  myContext.fillRect(30,10,740,575);



  backContext.globalAlpha = 1;
  backContext.drawImage(monitorCover,0,0);
  myContext.globalAlpha = 1;
  myContext.drawImage(monitorCover,0,0);

  myContext.globalAlpha = .1;
  myContext.scale(-1,1);

  myContext.drawImage(backCanvas,30,25,100,hhs,-30,0,30,hhs+50);
  myContext.drawImage(backCanvas,wws-130,25,100,hhs,-wws,0,30,hhs+50);

  myContext.scale(-1,1);
  myContext.scale(1,-1);

  myContext.drawImage(backCanvas,25,30,wws,50,-15,-15,wws+90,30);
  myContext.drawImage(backCanvas,25,hhs-70,wws,50,-15,-hhs,wws+90,15);

  myContext.scale(1,-1);
  myContext.globalAlpha = 1;



}

//////////////////////////// cameras
function happyCamBorder(aX,bX,aY,bY){
  if(me.x<aX && me.x>bX){
    var vmx=(me.x+mX)-(ww/2);
    mX+=Math.round(-(vmx*0.08));
  }else{
    if(me.x>aX){
      var vmx=(aX+mX)-(ww/2);
      mX+=Math.round(-(vmx*0.08));
    }else if(me.x>bX){
      var vmx=(-bX+mX)-(ww/2);
      mX+=Math.round(-(vmx*0.08));
    }
  }
  if(me.y<aY && me.y>bY){
    var vmy=(me.y+mY)-(hh/2);
    mY+=Math.round(-(vmy*0.08));
  }else{
    if(me.y>aY){
      var vmy=(aY+mY)-(hh/2);
      mY+=Math.round(-(vmy*0.08));
    }else if(me.y>bY){
      var vmy=(-bY+mY)-(hh/2);
      mY+=Math.round(-(vmy*0.08));
    }
  }


}
function happyCam(){
    var vmx=(me.x+mX)-(ww/2);
    mX+=Math.round(-(vmx*0.08));

    var vmy=(me.y+mY)-(hh/2);
    mY+=Math.round(-(vmy*0.08));
}
//////////////////////////// monitor
var pixelsPatern;
var pixels = new Image();
pixels.onload = function () {
  pixelsPatern=myContext.createPattern(pixels,"repeat");
}
pixels.src = "img/pixel.gif";


var myImageData;
var pixelAlpha=0.1;

var glassSteps=20;
var glassStrenght=60;
var gdx=glassStrenght/glassSteps;
var gA=[];
for(i=0;i<glassSteps*100;i++){
  gA.push([i/(glassSteps*100),(Math.sin((Math.PI/(glassSteps*100))*i)*glassStrenght)-glassStrenght]);
}
for(i=0;i<gA.length;i++){
  while(i+1<gA.length && Math.abs(gA[i][1]-gA[i+1][1])<gdx){
    gA.splice(i+1,1);
  }
}
gA.push([1,-glassStrenght]);

var monitorCover = new Image();
monitorCover.src = "img/monitorCover.gif";

//////////////////// MOUSE click
//var asdasd=new stuff("pink",0,0,0,true);

var pos={x:0,y:0};
var resourcesDiv=document.getElementById("resourcesDiv");
backCanvas.addEventListener("mousedown",myCanvasFDown);
function myCanvasFDown(event){
  pos = getMousePos(myCanvas, event);
  pos.x=(pos.x*0.85)-21;
  pos.y=pos.y*0.8;

  var interactiveFlag=false;
  if(interactiveAppleActive){
    // currentMouseMoveApple.function();
    interactiveFlag=true;
    makeBeep(0.05,400,-5,0.01,0.4,.1,0.1);
  }

  switch(place){
      case 0:

      ///hit wolfs
      var vx=pos.x-(me.x+mX);
      var vy=pos.y-(me.y+mY);
      var ang=Math.atan2(vy,vx);
      angi=ang-((2*Math.PI)*0.21);
      angf=angi;
      angActive=true;

      if(!interactiveFlag){
        makeBeep(0.1,80,5,0.01,0.4,.1,0.5);
      }


      var hip=Math.sqrt(Math.pow(vx,2)+Math.pow(vy,2));
      var vx1=vx/hip;
      var vy1=vy/hip;
      for(var i=0;i<wolfA.length;i++){
        if(distancia(wolfA[i].x,wolfA[i].y,me.x+(vx1*12),me.y+(vy1*12))<15){//hit wolf test
          makeBeep(0.3,80,10,0.01,0.4,.1,1);

          apple[0].splice(apple[0].findIndex(
            function(element){
              return element==wolfA[i];
            }
          ),1);
          appleS[0].splice(appleS[0].findIndex(
            function(element){
              return element==wolfA[i];
            }
          ),1);



          wolfA.splice(i,1);
          wolfN--;
          wolfCurrent--;

          ///add pending wolfs
          if(wolfCurrent<wolfN){
            var x;
            var y;

            var XisSmall=true;
            var Xmax=161;
            var Xmin=-213;
            if(me.x+(ww/2)>Xmax && me.x-(ww/2)<Xmin){
              var x=myRand(Xmin,Xmax);
              XisSmall=false;
            }else if(me.x+(ww/2)>Xmax){
              var x=myRand(Xmin,me.x-(ww/2));
            }else if(me.x-(ww/2)<Xmin){
              var x=myRand(me.x+(ww/2),Xmax);
            }else{
              if(myRand(0,1)){
                var x=myRand(Xmin,me.x-(ww/2));
              }else{
                var x=myRand(me.x+(ww/2),Xmax);
              }
            }

            var YisSmall=true;
            var Ymax=117;
            var Ymin=-199;
            if(me.y+(hh/2)>Ymax && me.y-(hh/2)<Ymin){
              var y=myRand(Ymin,Ymax);
              YisSmall=false;
            }else if(me.y+(hh/2)>Ymax){
              var y=myRand(Ymin,me.y-(hh/2));
            }else if(me.y-(hh/2)<Ymin){
              var y=myRand(me.y+(hh/2),Ymax);
            }else{
              if(myRand(0,1)){
                var y=myRand(Ymin,me.y-(hh/2));
              }else{
                var y=myRand(me.y+(hh/2),Ymax);
              }
            }

            var spaceFlag=true;
            if(XisSmall && YisSmall){
              if(myRand(0,1)){
                x=myRand(Xmin,Xmax);
              }else{
                y=myRand(Ymin,Ymax);
              }
            }else if(!XisSmall && !YisSmall){
              spaceFlag=false;
            }

            if(spaceFlag){
              var wof=new stuff("wolf",0,x,y,true,false,30,2)
              wolfA.push(wof);
            }else{
              setTimeout(function(){
                var k=myRand(0,wolfA.length-1)
                var wof=new stuff("wolf",0,wolfA[k].x,wolfA[k].y,true,false,30,2)
                wolfA.push(wof);
                moveWolf(wof);

              },myRand(500,5000));
            }
            wolfCurrent++;



          }

          wolfDiv.innerHTML=wolfN+" wolfs remaining";
          break;
        }
      }

      ///////////add walls
      var vx=Math.round(pos.x-mX);
      var vy=Math.round(pos.y-mY);
      // new stuff("pink",0,Math.round(vx),Math.round(vy),true);


      break;
      case 1:

        var vx=pos.x-(me.x+mX);
        var vy=pos.y-(me.y+mY);
        var norm=Math.sqrt(Math.pow(vx,2)+Math.pow(vy,2));
        var vxu=vx/norm;
        var vyu=vy/norm;
        switch(gunLevel){
            case 0:
            if(foodS(-1)){
              bullets.push({x:me.x,y:me.y,vx:vxu,vy:vyu,t:30});
              makeBeep(0.05,200,-2,0.01,0.01,1,0.1);
            }
            break;
            case 1:
            if(foodS(-8)){
              var ang=Math.atan2(vyu,vxu);
              var myAng=2*Math.PI*(1/4);

              if(gun2parFlag){
                var myBulletN=11;
              }else{
                var myBulletN=12;
              }
              gun2parFlag=!gun2parFlag;

              var angStart=ang-(myAng/2);
              var angStep=myAng/myBulletN;

              for(var i=0;i<myBulletN;i++){
                var vxTarget=Math.sin(-(  angStart+(angStep*i)-(2*Math.PI*(1/4)) ));
                var vyTarget=Math.cos(-(  angStart+(angStep*i)-(2*Math.PI*(1/4)) ));
                bullets.push({x:me.x,y:me.y,vx:vxTarget,vy:vyTarget,t:30});
              }
              makeBeep(0.05,200,-2,0.01,0.01,1,0.1);
            }
            break;
            case 2:
            if(foodS(-4)){
              var myBulletN=50;
              var myBulletLength=10;
              for(var i=0;i<myBulletN;i++){
                bullets.push({x:me.x+(vyu*10)+(vxu*(i/myBulletN)*myBulletLength),y:me.y+(-vxu*10)+(vyu*(i/myBulletN)*myBulletLength),vx:vxu*2,vy:vyu*2,t:30});
                bullets.push({x:me.x+(vyu*15)+(vxu*(i/myBulletN)*myBulletLength),y:me.y+(-vxu*15)+(vyu*(i/myBulletN)*myBulletLength),vx:vxu*2,vy:vyu*2,t:30});
                bullets.push({x:me.x-(vyu*10)+(vxu*(i/myBulletN)*myBulletLength),y:me.y-(-vxu*10)+(vyu*(i/myBulletN)*myBulletLength),vx:vxu*2,vy:vyu*2,t:30});
                bullets.push({x:me.x-(vyu*15)+(vxu*(i/myBulletN)*myBulletLength),y:me.y-(-vxu*15)+(vyu*(i/myBulletN)*myBulletLength),vx:vxu*2,vy:vyu*2,t:30});
              }
              makeBeep(0.05,200,-2,0.01,0.01,1,0.1);
            }
            break;
            case 3:
            if(foodS(-1)){
              bullets.push({x:me.x,y:me.y,vx:vxu,vy:vyu,t:130,t2:10});
              makeBeep(0.05,200,-2,0.01,0.01,1,0.1);
            }
            break;
            case 4:
            if(foodS(-0.5)){
              gun4F();
              gun4firingInteval=setInterval(gun4F,100);
            }
            break;
          }
      break;
  }



}

//////////////////// MOUSE up
backCanvas.addEventListener("mouseup",myCanvasFUp);
function myCanvasFUp(event){
  switch(place){
      case 1:
        switch(gunLevel){
          case 4:
            clearInterval(gun4firingInteval);
          break;
        }
      break;
    }
}

//////////////////// MOUSE move

var mouseImg = document.getElementById("mouseImg");

document.addEventListener("mousemove",mouseImgF);
function mouseImgF(event){
  mouseImg.style.top=event.clientY+1+"px";
  mouseImg.style.left=event.clientX-5+"px";
}

var currentMouseMoveEvent;
var currentMouseMoveApple;
var interactiveAppleActive=false;
backCanvas.addEventListener("mousemove",mouseMoveF);
function mouseMoveF(event){
  currentMouseMoveEvent=event;

  if(currentMouseMoveEvent!=null){
    pos = getMousePos(myCanvas, event);
  }else{
    pos = {x:-1000,y:-1000};
  }

  pos.x=(pos.x*0.85)-21;
  pos.y=pos.y*0.8;
  var vx=Math.round(pos.x-mX);
  var vy=Math.round(pos.y-mY);

  // asdasd.x=vx;
  // asdasd.y=vy;

  myMouse.x=vx+2;
  myMouse.y=vy+9;

  var hit=false;
  for(var i=appleI[place].length-1;i>=0;i--){
    if(
      (appleI[place][i].x+appleI[place][i].img.width/2)>=vx &&
      (appleI[place][i].x-appleI[place][i].img.width/2)<=vx &&
      (appleI[place][i].y+appleI[place][i].img.height/2)>=vy &&
      (appleI[place][i].y-appleI[place][i].img.height/2)<=vy
    ){
      hit=true;
      break;
    }
  }
  if(hit && interactiveFirstOverFlag){
    Iword=appleI[place][i].name;
    currentMouseMoveApple=appleI[place][i];
    interactiveAppleActive=true;
    appleI[place][i].glow=null;

    interactiveFirstOverFun=currentMouseMoveApple.function;
    backCanvas.addEventListener("click",interactiveFirstOverFun);

    interactiveFirstOverFlag=false;
  }else if(!hit){
    currentMouseMoveApple=null;
    Iword="";
    interactiveAppleActive=false;

    if(interactiveFirstOverFlag==false){
      backCanvas.removeEventListener("click",interactiveFirstOverFun);
    }
    interactiveFirstOverFlag=true;
  }
}
var interactiveFirstOverFlag=true;
var interactiveFirstOverFun;

/////////////////////mouse out
backCanvas.addEventListener("mouseout",mouseOutF);
function mouseOutF(event){
  myMouse.x=-1000;
  myMouse.y=-1000;

  switch(place){
      case 1:
        switch(gunLevel){
          case 4:
            clearInterval(gun4firingInteval);
          break;
        }
      break;
    }
}


///////////////////////////////////////////WOLFS

var angActive=false;
var angi=0;
var angf=0;
var wolfA=[];
wolfA.push(new stuff("wolf",0,8,-150,true,false,30,2));

var wolfN=1;
var wolfCurrent=1;
function addWolfs(){
  if(dayN<21){

    wolfN=Math.exp(dayN/3.5)+myRand(-dayN,dayN);
    //wolfN=(dayN*15)+myRand(-dayN,dayN);
  }else{
    wolfN=Math.exp(dayN/6.16)+myRand(-dayN,dayN);
    //wolfN=(dayN*22.5)+myRand(-dayN,dayN);
  }

  if(wolfN<1){
    wolfN=1;
  }
  wolfN=Math.floor(wolfN);

  if(wolfN<=100){
    wolfCurrent=wolfN;
  }else{
    wolfCurrent=100;
  }


  for(var i=0;i<wolfCurrent;i++){
    wolfA.push(new stuff("wolf",0,myRand(-213,161),myRand(-199,117),true,false,30,2));
  }
  wolfDiv.innerHTML=wolfN+txt("wolfs_remaining");
}
function moveWolf(wolf,t,x,y){
  t=t||70;
  if(t==70){
    x=myRand(-100,100);
    y=myRand(-100,100);
    var norm=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    x=x/norm/5;
    y=y/norm/5;
  }

  wolf.x+=x;
  wolf.y+=y;
  t--;
  if(t>0){
    setTimeout(function(){
      moveWolf(wolf,t,x,y);
    },1000/30);
  }


}
///////////////////////////////////////////STONE

//gotoPlace(300,300,0,0,1);
var gunLevel=0;
var gunLevelMax=4;

var gun2parFlag=true;

var bulletV=5;
var bullets=[];

var rocksV=2;
var rocks=[];

//rocks.push({x:200,y:200,vx:0,vy:0,id:myRand(0,1000),type:myRand(1,2)});

var pukeRockInterval;
var pukeRockT=0;
var pukeRockTmax=20;
var pukeRockTmaxToday=20;
var pukeRockChangeT=0;
var pukeRockChangeTmax=20*5;
function rockMorningReset(){
  pukeRockTmaxToday=20+myRand(-3,3);

}
function pukeRock(){
  if(pukeRockT<=0){
    pukeRockT=pukeRockTmax;
    rocks.push({x:-9,y:myRand(0,hh),vx:myRand(-200,200)/100,vy:myRand(-200,200)/100,id:myRand(0,1000),type:myRand(1,2)});
  }else{
    pukeRockT--;
  }

  if(pukeRockChangeT<=0){
    pukeRockChangeT=pukeRockChangeTmax;
    pukeRockTmax--;
    console.log(pukeRockTmax);
  }else{
    pukeRockChangeT--;
  }
}

var stoneN=0;
var stoneNumberDiv=document.getElementById("stoneNumberDiv");
var stoneTemp=0;
var firstStone=true;

function stoneS(n){
  if(stoneN+n>=0){
    stoneN+=n;
    stoneAnimTarget=stoneN;
    stoneAnimation();


    if(firstStone && stoneN>=4){
      workbench.glow=true;
      firstStone=false;
    }
    return true;
  }else{
    return false;
  }
}
var stoneA=[];
function stoneCenter(){

  for(var i=0;i<stoneA.length;i++){
    //appleRemove(0,stoneA[i])
    removeStuff(apple[0],stoneA[i]);
    removeStuff(appleS[0],stoneA[i]);
  }
  stoneA=[];

  var x=0;
  var y=0;
  var z=0;
  var row=0;
  var xx=31;
  var yy=-220;
  for(var i=0;i<stoneN;i++){
    if(z==0){
      stoneA.push(new stuff("stone",ppp_center,xx+(x*6)+(z*0)+(-y*0)+(row*70)+myRand(-0.1,0.1),yy+(y*4)+(-z*4)+myRand(-0.1,0.1),true));
    }else{
      stoneA.push(new stuff("stone",ppp_center,xx+(x*6)+(z*0)+(-y*0)+(row*70)+myRand(-0.1,0.1),yy+(y*4)+(-z*4)+myRand(-0.1,0.1)));
    }

    x++;
    if(x>=10){
      x=0;
      z++;
    }
    if(z>=4){
      z=0;
      y++;
    }
    if(y>=10){
      y=0;
      x=0;
      z=0;
      row++;
    }
    if(row>=2){
      break;
    }

  }
}


var stoneAnimCurrent=stoneN;
var stoneAnimTarget=stoneN;
var stoneAnimActive=false;
function stoneAnimation(){
  if(!stoneAnimActive){
    stoneAnimActive=true;
    stoneAnimation2();
  }
}

var stoneAnimation2step=true;
function stoneAnimation2(){
  stoneAnimCurrent+=((stoneAnimTarget-stoneAnimCurrent)/10);

  if(Math.abs(stoneAnimCurrent-stoneAnimTarget)<1){
    stoneAnimCurrent=stoneAnimTarget;
    stoneAnimActive=false;
  }else{
    setTimeout(stoneAnimation2,50);
  }
  stoneNumberDiv.innerHTML=Math.ceil(stoneAnimCurrent);
}


//probabylity test
// var resultados=[];
// for(var i=0;i<100000;i++){
//   n=0;
//   d=0;
//   while(n<4){
//     if(myRand(0,100)<25/3){
//       n++;
//     }
//     d++;
//   }
//   if(resultados[d]==null){
//     resultados[d]=0;
//   }
//   resultados[d]++;
// }
// console.log(resultados);



var gun4firingInteval;
function gun4F(vyu,vxu){
  if(foodS(-1) && place==ppp_mine){
    var vx=pos.x-(me.x+mX);
    var vy=pos.y-(me.y+mY);
    var norm=Math.sqrt(Math.pow(vx,2)+Math.pow(vy,2));
    var vxu=vx/norm;
    var vyu=vy/norm;

    var myBulletN=10;
    for(var i=0;i<myBulletN;i++){
      bullets.push({x:me.x,y:me.y,vx:vxu,vy:vyu,t:130,t2:10});
    }
    makeBeep(0.05,200,-2,0.01,0.01,1,0.1);
  }else{
    clearInterval(gun4firingInteval);
  }
}


///////////////////////////////////////////FOOD
// Ttime=-1000;
// portal(1);
// var pix=0;
// var piy=0;

var maloX=[];
var maloY=[];
var maloT=[];
var maloVX=[];
var maloVY=[];
var maloXi=[];
var maloYi=[];

var forestLevel=0;

var dotX=[];
var dotY=[];
var berryA=[[]];

function lvlChangeFlagF(){
  rainNoise.volume.value=-25-(forestLevel*3);

  maloX=[];
  maloY=[];
  maloT=[];
  maloVX=[];
  maloVY=[];
  maloXi=[];
  maloYi=[];
  for(var i=0;i<forestLevel;i++){
    var r1=myRand(1,fMap.length-2);
    var r2=myRand(1,fMap[0].length-2);
    while(fMap[r1][r2]!=1){
      r1=myRand(1,fMap.length-2);
      r2=myRand(1,fMap[0].length-2);
    }
    maloX.push(((r2+19)*10)-9);
    maloY.push(((r1+10)*10)-9);
    maloT.push(0);
    maloVX.push(1);
    maloVY.push(0);
    maloXi.push(r2);
    maloYi.push(r1);
  }

  fillDots();
}



function fillDots(){
  if(dotX.length<=forestLevel){
    dotX.push([]);
    dotY.push([]);
    for(i=0;i<fMap.length;i++){
      for(ii=0;ii<fMap[i].length;ii++){
        if(fMap[i][ii]==1 && myRand(0,100)<100/((forestLevel+1)*0.7)){
          dotX[dotX.length-1].push(((ii+19)*10)-9-2);
          dotY[dotY.length-1].push(((i+10)*10)-9-1);
        }
        if(fMap[i][ii]==1){
          newBerryF(((ii+19)*10)-9-2,((i+10)*10)-9-1);
        }
      }
    }
  }else{
    for(var k=0;k<berryA.length;k++){
      if(berryA[k]!=null){
        for(var i=0;i<berryA[k].length;i++){
          berryA[k][i].display=false;
        }
      }
    }


    for(var i=0;i<berryA[forestLevel].length;i++){
      berryA[forestLevel][i].display=true;
    }

  }
}


var fMap=[
[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
[2,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
[2,1,2,2,2,2,1,2,2,2,2,2,2,1,2],
[2,1,2,2,2,2,1,2,2,2,2,2,2,1,2],
[2,1,2,2,2,2,1,2,2,2,2,2,2,1,2],
[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[2,1,2,2,2,2,1,2,2,1,2,2,2,2,2],
[2,1,2,2,2,2,1,2,2,1,2,2,2,2,2],
[2,1,1,1,1,1,1,2,2,1,1,1,1,1,2],
[2,2,2,2,2,2,1,2,2,2,2,2,2,0,2],
[0,0,0,0,0,2,1,2,2,2,2,2,2,0,2],
[0,0,0,0,0,2,1,2,0,0,0,0,0,0,0],
[0,0,0,0,0,2,1,2,0,0,0,0,0,0,0],
[2,2,2,2,2,2,1,2,0,0,0,0,0,0,0],
[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
[2,2,2,2,2,2,1,2,0,0,0,0,0,0,0],
[0,0,0,0,0,2,1,2,0,0,0,0,0,0,0],
[0,0,0,0,0,2,1,2,0,0,0,0,0,0,0],
[0,0,0,0,0,2,1,2,2,0,2,2,2,2,2],
[2,2,2,2,2,2,1,2,2,0,2,2,2,2,2],
[2,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
[2,1,2,2,2,2,1,2,2,2,2,2,2,1,2],
[2,1,2,2,2,2,1,2,2,2,2,2,2,1,2],
[2,1,1,1,2,2,1,1,1,1,1,1,1,1,1],
[2,2,2,1,2,2,1,2,2,1,2,2,2,2,2],
[2,2,2,1,2,2,1,2,2,1,2,2,2,2,2],
[2,1,1,1,1,1,1,2,2,1,1,1,1,1,2],
[2,1,2,2,2,2,2,2,2,2,2,2,2,1,2],
[2,1,2,2,2,2,2,2,2,2,2,2,2,1,2],
[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var k=fMap[0].length;
for(i=0;i<fMap.length;i++){
  for(ii=k-1;ii>=0;ii--){
    fMap[i].push(fMap[i][ii]);
  }
}

var fMapX=175;
var fMapY=86;

fillDots();

// var foodDots=[];
// for(i=0;i<fMap.length;i++){
//   for(ii=0;ii<fMap[i].length;ii++){
//
//     switch(fMap[i][ii]){
//       case 0:
//       break;
//       case 1:
//         foodDots.push(new stuff("pacDot",2,(ii*10)+fMapX,(i*10)+fMapY));
//       break;
//       case 2:
//         new stuff("pacWood",2,(ii*10)+fMapX,(i*10)+fMapY,true);
//       break;
//       default:
//     }
//
//   }
// }
// apple[2].push(me);
//

var foodNumberDiv=document.getElementById("foodNumberDiv");
var foodRealNumberDiv=document.getElementById("foodRealNumberDiv");
var foodN=51;
var foodMax=100;
function foodS(n){
  n=n || 0;

  if(foodN+n>=0){
    foodN+=n;
    if(foodN>foodMax){
      foodN=foodMax;
    }
    foodAnimTarget=foodN;
    foodAnimation();
    foodRealNumberDiv.innerHTML=Math.round(foodN);


    return true;
  }else{
    return false;
  }
}
foodS();

var foodAnimCurrent=foodN;
var foodAnimTarget=foodN;
var foodAnimStep=1;
var foodAnimActive=false;
function foodAnimation(){
  if(!foodAnimActive){
    foodAnimActive=true;
    foodAnimation2();
  }
}

function foodAnimation2(){
  if(foodAnimCurrent<foodAnimTarget){
    foodAnimCurrent+=foodAnimStep;
  }else if(foodAnimCurrent>foodAnimTarget){
    foodAnimCurrent-=foodAnimStep;
  }

  if(Math.abs(foodAnimCurrent-foodAnimTarget)<foodAnimStep*2){
    foodAnimCurrent=foodAnimTarget;
    foodAnimActive=false;
  }else{
    setTimeout(foodAnimation2,20);
  }
  foodNumberDiv.style.width=((100/foodMax)*foodAnimCurrent)+"px";
}


////////////////////////////////// TETRIS
var tetrisRaws=0;
var houseLevel=0;
var houseDefenceA=[10,600,1000];
var houseMaxA=[25,30,35];

var monopoliDiv=document.getElementById("monopoliDiv");
var monopoliDef=[
  document.getElementById("monopoliDef1"),
  document.getElementById("monopoliDef2"),
  document.getElementById("monopoliDef3")
];
monopoliDef[0].innerHTML=houseDefenceA[0];
monopoliDef[1].innerHTML=houseDefenceA[1];
monopoliDef[2].innerHTML=houseDefenceA[2];
var monopoliDefColor="#31ff00";
monopoliDef[houseLevel].style.color=monopoliDefColor;


//place=5;
var tetrisInterval;
function workbenchF(){

  tetrisSpeed=30;
  tetrisDTmax=10;
  tetrisX=3;
  tetrisY=0;

  gotoPlace(-10000,-10000,0,0,ppp_tetris);
  mensaje(null,575,487,-2,null,tetrixExit);
  resourcesDiv.style.display="none";
  dayCircleImg.style.display="none";
  dayNDiv.style.display="none";
  tetrisStoneDiv.style.display="block";
  monopoliDiv.style.display="block";
  tetrisStoneDivF();

  keyList[key_W]=false;
  keyList[key_S]=false;
  keyList[key_D]=false;
  keyList[key_A]=false;

  keyList[key_UP]=false;
  keyList[key_RIGHT]=false;
  keyList[key_DOWN]=false;
  keyList[key_LEFT]=false;



  tetrisMap=[[],[],[],[],[],[],[],[],[],[]];
  for(var i=0;i<10;i++){
    for(var ii=0;ii<20;ii++){
      tetrisMap[i].push([0]);
    }
  }

  if(stoneN>=4){
    stoneS(-4);
    tetrisStoneDivF();
    tetrisFF();
    setTimeout(function(){
      tetrisInterval=setInterval(tetrisFF,tetrisSpeed);
    },500);
  }
}

function tetrixExit(){
  clearInterval(tetrisInterval);
  resourcesDiv.style.display="block";
  tetrisStoneDiv.style.display="none";
  dayCircleImg.style.display="block";
  dayNDiv.style.display="block";
  monopoliDiv.style.display="none";
  gotoPlace(64,-39,250,273,0);
}

var tetrisStoneDiv=document.getElementById("tetrisStoneDiv");
var tetrisStoneNumberDiv=document.getElementById("tetrisStoneNumberDiv");
function tetrisStoneDivF(){
  if(stoneN>=4){
    tetrisStoneNumberDiv.className="tetrisStoneDiv2A";
  }else{
    tetrisStoneNumberDiv.className="tetrisStoneDiv2B";
  }
  tetrisStoneNumberDiv.innerHTML=Math.floor(stoneN);
}
var tetrisBack = new Image();
tetrisBack.src = "img/tetrisTable.gif";

var tetrisMap;

var tetrisPiceList=[];
tetrisPiceList.push([
  [0,1,0,0],
  [0,1,1,0],
  [0,1,0,0],
  [0,0,0,0]
]);
tetrisPiceList.push([
  [0,0,0,0],
  [0,1,1,0],
  [0,1,1,0],
  [0,0,0,0]
]);
tetrisPiceList.push([
  [0,1,0,0],
  [0,1,0,0],
  [0,1,0,0],
  [0,1,0,0]
]);
tetrisPiceList.push([
  [0,1,0,0],
  [0,1,0,0],
  [0,1,1,0],
  [0,0,0,0]
]);
tetrisPiceList.push([
  [0,0,1,0],
  [0,0,1,0],
  [0,1,1,0],
  [0,0,0,0]
]);
tetrisPiceList.push([
  [0,1,0,0],
  [0,1,1,0],
  [0,0,1,0],
  [0,0,0,0]
]);
tetrisPiceList.push([
  [0,0,1,0],
  [0,1,1,0],
  [0,1,0,0],
  [0,0,0,0]
]);
var tetrisX=4;
var tetrisY=0;
var tetrisPice=JSON.parse(JSON.stringify(tetrisPiceList[myRand(0,tetrisPiceList.length-1)]));

// document.addEventListener("keydown",tetrisKeyDown,false);
// function tetrisKeyDown(event){
//   keyList[event.keyCode]=true;
//   if(keyList[key_W] || keyList[key_A] || keyList[key_S] || keyList[key_D]){
//     tetrisF();
//   }
//
// }

var tetrisSize=18;
var tetrisSx=245;
var tetrisSy=70;


var tetrisKeyDown=[];
var tetrisKeyDownTime=10;


var tetrisSpeed=25;//actual number defined in another line

var tetrisDT=0;
var tetrisDTmax=10;//

var tetrisSkeyT=0;//not used
var tetrisSkeyTc=1;
var tetrisSkeyTmax=0;

var tetrisAlredyHit=false;


function tetrisFF(){
  tetrisDT++;
  tetrisF();
}
function tetrisF(){
  for(var i=0;i<tetrisPice.length;i++){
    for(var ii=0;ii<tetrisPice[i].length;ii++){
      if(tetrisPice[i][ii]==1){
        tetrisMap[tetrisX+ii][tetrisY+i]=0;
      }
    }
  }


  if(keyList[key_W] || keyList[key_SPACE] || keyList[key_UP]){
    tetrisKeyDown[key_W]++;
  }else{
    tetrisKeyDown[key_W]=0;
  }
  if((keyList[key_W] || keyList[key_SPACE] || keyList[key_UP]) && (tetrisKeyDown[key_W]==1 || tetrisKeyDown[key_W]>tetrisKeyDownTime)){

    var tmp=JSON.parse(JSON.stringify(tetrisPice));
    for(var i=0;i<4;i++){
      for(var ii=0;ii<4;ii++){
        tetrisPice[ii][3-i]=tmp[i][ii];
      }
    }

    //moves pice arround when rotating so it dosent gets stuck
    for(var k=0;k<3;k++){
      var ok=true;
      loop1:
      for(var i=0;i<tetrisPice.length;i++){
        for(var ii=0;ii<tetrisPice[i].length;ii++){
          if(tetrisPice[i][ii]==1){
            if(tetrisX+ii<0 || tetrisX+ii>=10 || tetrisY+i<0 || tetrisY+i>=20){
              ok=false;
              break loop1;
            }
            if(tetrisMap[tetrisX+ii][tetrisY+i]!=0){
              ok=false;
              break loop1;
            }
          }
        }
      }
      if(!ok){
        if(k==0){
          tetrisX+=1;
        }else if(k==1){
          tetrisX-=2;
        }else if(k==2){
          tetrisX+=1;
          tetrisPice=JSON.parse(JSON.stringify(tmp));
        }
      }else{
        break;
      }

    }

  }


  if(keyList[key_D] || keyList[key_RIGHT]){
    tetrisKeyDown[key_D]++;
  }else{
    tetrisKeyDown[key_D]=0;
  }
  if((keyList[key_D] || keyList[key_RIGHT]) && (tetrisKeyDown[key_D]==1 || tetrisKeyDown[key_D]>tetrisKeyDownTime)){
    var ok=true;
    loop1:for(var i=0;i<tetrisPice.length;i++){
      for(var ii=0;ii<tetrisPice[i].length;ii++){
        if(tetrisPice[i][ii]==1){
          if(tetrisX+ii+1>tetrisMap.length-1 || tetrisMap[tetrisX+ii+1][tetrisY+i]!=0){
            ok=false;
            break loop1;
          }
        }
      }
    }
    if(ok){
      tetrisX++;
    }
  }

  if(keyList[key_A] || keyList[key_LEFT]){
    tetrisKeyDown[key_A]++;
  }else{
    tetrisKeyDown[key_A]=0;
  }
  if((keyList[key_A] || keyList[key_LEFT]) && (tetrisKeyDown[key_A]==1 || tetrisKeyDown[key_A]>tetrisKeyDownTime)){
    var ok=true;
    loop1:for(var i=0;i<tetrisPice.length;i++){
      for(var ii=0;ii<tetrisPice[i].length;ii++){
        if(tetrisPice[i][ii]==1){
          if(tetrisX+ii-1<0 || tetrisMap[tetrisX+ii-1][tetrisY+i]!=0){
            ok=false;
            break loop1;
          }
        }
      }
    }
    if(ok){
      tetrisX--;
    }
  }


  if(tetrisSkeyT<=0){
    tetrisSkeyT=tetrisSkeyTmax;
  }else{
    tetrisSkeyT-=tetrisSkeyTc;
  }
  if (((keyList[key_S] || keyList[key_DOWN]) && tetrisSkeyT<=0)  || tetrisDT>tetrisDTmax){
    var ok=true;
    loop1:for(var i=0;i<tetrisPice.length;i++){
      for(var ii=0;ii<tetrisPice[i].length;ii++){
        if(tetrisPice[i][ii]==1){
          if(tetrisY+i+1<0 || tetrisMap[tetrisX+ii][tetrisY+i+1]!=0){
            ok=false;
            break loop1;
          }
        }
      }
    }
    if(ok){
      tetrisY++;
      tetrisDT=0;
      tetrisAlredyHit=false;
    }else{//pice hits bottom
      if(tetrisAlredyHit){
        clearInterval(tetrisInterval);
      }
      tetrisAlredyHit=true;

      for(var i=0;i<tetrisPice.length;i++){
        for(var ii=0;ii<tetrisPice[i].length;ii++){
          if(tetrisPice[i][ii]==1){
            tetrisMap[tetrisX+ii][tetrisY+i]=1;
          }
        }
      }

      if(stoneS(-4)){
        tetrisStoneDivF();
        tetrisX=3;
        tetrisY=0;
        tetrisPice=JSON.parse(JSON.stringify(tetrisPiceList[myRand(0,tetrisPiceList.length-1)]));
      }else{
        clearInterval(tetrisInterval);
      }



      for(var i=0;i<20;i++){//remove raw
        var rem=true;
        for(var ii=0;ii<10;ii++){
          if(tetrisMap[ii][i]!=1){
            rem=false;
            break;
          }
        }
        if(rem){
          tetrisRaws++;

          tetrisDTmax-=0.1*5;
          tetrisSpeed-=0.11*5;

          clearInterval(tetrisInterval);
          tetrisInterval=setInterval(tetrisFF,tetrisSpeed);


          if(tetrisRaws>=houseMaxA[houseLevel]-1){


            tetrisRaws=0;

            if(houseLevel>=houseA.length-1){

            }else{
              appleRemove(0,houseA[houseLevel]);
            }

            houseLevel++;

            houseA[houseLevel].display=true;

            if(houseLevel>houseMaxA.length-1){
              houseDefenceA.push(houseDefenceA[houseMaxA.length-1]+10);
              houseMaxA.push(houseMaxA[houseMaxA.length-1]+10);
            }

            monopoliDef[0].style.color="";
            monopoliDef[1].style.color="";
            monopoliDef[2].style.color="";
            monopoliDef[houseLevel].style.color=monopoliDefColor;

            clearMensaje();
            tetrixExit();

          }
          for(var k=0;k<10;k++){
            for(var kk=i;kk>0;kk--){
              tetrisMap[k][kk]=tetrisMap[k][kk-1];
            }
          }
        }
      }

    }
  }

  for(var i=0;i<tetrisPice.length;i++){
    for(var ii=0;ii<tetrisPice[i].length;ii++){
      if(tetrisPice[i][ii]==1){
        tetrisMap[tetrisX+ii][tetrisY+i]=1;
      }
    }
  }

}



////////////////////////////////// bunch of stuff

var freezeScreen=false;
var freezeScreenFirst;
var freezeCanvas = document.createElement("canvas");
freezeCanvas.width = miniCanvas.width;
freezeCanvas.height = miniCanvas.width;
var freezeContext = freezeCanvas.getContext('2d');
function freezeF(){
  if(!freezeScreen){
    freezeScreen=true;
    freezeScreenFirst=true;
  }
}
function freezeFoff(){
  freezeScreen=false;
}
var fadeAlpha=0;
var fadeActive=false;
function fadeToBlack(f){
  if(!fadeActive){
    fadeActive=true;
    fadeAlpha=0;
    function lessB(){
      fadeAlpha+=0.05;
      if(fadeAlpha>=1){
        if(f){
          f();
        }
        setTimeout(moreB,100);
      }else{
        setTimeout(lessB,40);
      }

    }
    setTimeout(lessB,40);

    function moreB(){
      fadeAlpha-=0.02;
      if(fadeAlpha<=0){
        fadeActive=false;
      }else{
        setTimeout(moreB,50);
      }
    }
  }
}

function gotoPlace(meXf,meYf,mXf,mYf,placeID){
  me.x=meXf;
  me.y=meYf;
  mX=mXf;
  mY=mYf;
  place=placeID;

  wolfDiv.style.display="none";
  tutorialDiv.style.display="none";
  gearImg.style.display="block";


  switch(place){
      case ppp_center:

          resourcesDiv.className="resourcesDiv";
          wolfDiv.style.display="block";
          followMeBanish();
          tutorialDivCave.style.display="none";

          rocks=[{x:ww/2,y:hh/2,vx:1,vy:0,id:myRand(0,1000),type:2}];
          clearInterval(pukeRockInterval);
          pukeRockTmax=pukeRockTmaxToday;

          stoneCenter();
          rainNoise.volume.value=-15;
      break;
      case ppp_mine:

          pukeRockInterval=setInterval(pukeRock,50);
          bullets=[];
          stoneTemp=0;
          //resourcesDiv.className="resourcesDiv2";

          rainNoise.volume.value=-25;
          if(tutorialDivCaveFlag){
            tutorialDivCave.style.display="block";
            backCanvas.addEventListener("click",tutorialDivCaveBanishTrigger);
          }
      break;
      case ppp_forest:
        rainNoise.volume.value=-25
      break;
      case ppp_house:
        rainNoise.volume.value=-30;
      break;
      case ppp_theVoid:
        followMeMain.style.display="none";
        rainNoise.stop();
        autoFilter.stop();
        gearImg.style.display="none";
      break;
      case ppp_tetris:
          rainNoise.volume.value=-10;
          gearImg.style.display="none";
      break;
  }

  if(winFlag){
    if(place==ppp_house || place==ppp_center){
      winDiv.style.display="block";
    }else{
      winDiv.style.display="none";
    }
  }

  placeQueDo();
}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
function distancia(x,y,xx,yy){
  return Math.sqrt(Math.pow(x-xx,2)+Math.pow(y-yy,2));
}
function myRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

Math.seededRandom = function(max, min) {
  max = max || 1;
  min = min || 0;

  Math.seed = (Math.seed * 9301 + 49297) % 233280;
  var rnd = Math.seed / 233280;

  return min + rnd * (max - min);
}
function myRandS(min, max) {
  return Math.floor(Math.seededRandom() * (max - min + 1)) + min;
}


function hitTest(){
  var hit=false;
  for(var i=0;i<appleS[place].length;i++){
    var w=(appleS[place][i].img.width/appleS[place][i].n);
    var h=appleS[place][i].img.height
    if(
      appleS[place][i].x-(w/2)<me.x+5 &&
      appleS[place][i].x+(w/2)>me.x-5 &&
      appleS[place][i].y-(h/2)<me.y+5 &&
      appleS[place][i].y+(h/2)>me.y-5
    ){
      hit=true;
      break;
    }
  }
  return hit;
}
function PointHitTest(x,y){
  var hit=false;
  for(var i=0;i<appleS[place].length;i++){
    if(
      (appleS[place][i].x+appleS[place][i].img.width/2)>=x &&
      (appleS[place][i].x-appleS[place][i].img.width/2)<=x &&
      (appleS[place][i].y+appleS[place][i].img.height/2)>=y &&
      (appleS[place][i].y-appleS[place][i].img.height/2)<=y
    ){
      hit=true;
      break;
    }
  }
  return hit;
}

function drawStar(ctx,cx,cy,spikes,outerRadius,innerRadius){
  var rot=Math.PI/2*3;
  var x=cx;
  var y=cy;
  var step=Math.PI/spikes;

  ctx.beginPath();
  ctx.moveTo(cx,cy-outerRadius)
  for(i=0;i<spikes;i++){
    x=cx+Math.cos(rot)*outerRadius;
    y=cy+Math.sin(rot)*outerRadius;
    ctx.lineTo(x,y)
    rot+=step

    x=cx+Math.cos(rot)*innerRadius;
    y=cy+Math.sin(rot)*innerRadius;
    ctx.lineTo(x,y)
    rot+=step
  }
  ctx.lineTo(cx,cy-outerRadius);
  ctx.closePath();
  //ctx.lineWidth=5;
  //ctx.strokeStyle='blue';
  //ctx.stroke();
  //ctx.fillStyle=fillStyle;
  ctx.fill();
}

//////////////////////////////// Menu sistem

var messageQue=[];

var mensajesDiv=document.getElementById("mensajesDiv");
var mensajeText=document.getElementById("mensajeText");
var mensajeButt1=document.getElementById("mensajeButt1");
var mensajeButt2=document.getElementById("mensajeButt2");
function mensaje(text,x,y,skew,b1text,b1f,b2text,b2f){
  if(!sameMesaje && mensajesDiv.style.display=="block"){
    //then que message
    messageQue.push([text,x,y,skew,b1text,b1f,b2text,b2f]);
  }else{

    //stopGameLoop();
    sameMesaje=false;


    text=text || false;
    // x=x || 272;
    // y=y || 212;
    skew=skew || 0;
    b1text=b1text || false;
    b1f=b1f || false;
    b2text=b2text || false;
    b2f=b2f || false;

    mensajesDiv.style.transform="skewY("+skew+"deg)";

    if(mensajesDiv.style.display!="block"){
      menuTransformTemp=mensajesDiv.style.transform;
      menuScale=.4;
      menuAnimation();
    }
    mensajesDiv.style.display="block";

    if(text){
      mensajeText.style.display="block";
      mensajeText.innerHTML=text;
      mensajesDiv.className="mensajesDiv"
      if(text.length>60){
        mensajesDiv.style.width="300px";
      }else{
        mensajesDiv.style.width="200px";
      }
    }else{
      mensajeText.style.display="none";
      mensajesDiv.className="mensajesDiv2"
      mensajesDiv.style.width="";
    }


    if(b1text){
      mensajeButt1.innerHTML=b1text;
    }else{
      mensajeButt1.innerHTML=txt("Continue");
    }
    if(b1f){
      mensajeButt1.addEventListener("click",b1f);
      mensajeButt1.addEventListener("click",lol1);
      mensajeButt2.addEventListener("click",lol1);
      function lol1(){
        mensajeButt1.removeEventListener("click",b1f);
        mensajeButt1.removeEventListener("click",lol1);
        mensajeButt2.removeEventListener("click",lol1);
      };
      clearMensajeF1=lol1;
    }else{//Corazones1
      clearMensajeF1=function(){};
      mensajeButt1.addEventListener("click",remCorazon);
    }

    if(b2text){
      mensajeButt2.innerHTML=b2text;
      mensajeButt2.style.display="inline-block";
    }else{
      mensajeButt2.style.display="none";
      document.addEventListener("keydown",mensajeENTER, false);
    }
    if(b2f){
      mensajeButt2.addEventListener("click",b2f);
      mensajeButt2.addEventListener("click",lol2);
      mensajeButt1.addEventListener("click",lol2);
      function lol2(){
        mensajeButt2.removeEventListener("click",b2f);
        mensajeButt2.removeEventListener("click",lol2);
        mensajeButt1.removeEventListener("click",lol2);
      };
      clearMensajeF2=lol2;
    }else{//Corazones2
      clearMensajeF2=function(){};
      mensajeButt2.addEventListener("click",remCorazon);
    }


    if(!x){
      mensajesDiv.style.left=(400-(mensajesDiv.clientWidth/2))+"px";
    }else{
      mensajesDiv.style.left=x+"px";
    }
    if(!y){
      mensajesDiv.style.top=(300-(mensajesDiv.clientHeight*.75))+"px";
    }else{
      mensajesDiv.style.top=y+"px";
    }

    //move to the bottom of the EventListener list
    //asi que no ejecuta el mensajeNotShow que tenia pendiente
    mensajeButt1.removeEventListener("click",mensajeNotShow);
    mensajeButt2.removeEventListener("click",mensajeNotShow);
    mensajeButt1.addEventListener("click",mensajeNotShow);
    mensajeButt2.addEventListener("click",mensajeNotShow);
  }
}
function mensajeNotShow(){

  mensajesDiv.style.display="none";
  mensajeText.innerHTML="";
  mensajeButt1.innerHTML="";
  mensajeButt2.innerHTML="";
  startGameLoop();

  if(messageQue.length>0){
    window.mensaje.apply(window,messageQue[0]);
    messageQue.shift();
  }
}

var clearMensajeF1;
var clearMensajeF2;
function clearMensaje(){
  if(mensajesDiv.style.display!="none"){
    clearMensajeF1();
    clearMensajeF2();
    mensajeNotShow();
  }
}


function mensajeENTER(event){
  if(event.keyCode==key_ENTER){
    document.removeEventListener("keydown",mensajeENTER, false);
    mensajeButt1.click();
  }
}

mensajeButt1.addEventListener("click",mensajeBeep);
mensajeButt2.addEventListener("click",mensajeBeep);
function mensajeBeep(){
  makeBeep(0.05,400+myRand(-20,20),-5,0.01,0.4,.1,0.1);
}

//if this is true the new incoming message is parte of the last one, not a new unrelated one
var sameMesaje=false;
mensajeButt1.addEventListener("click",sameMesajeF);
mensajeButt2.addEventListener("click",sameMesajeF);
function sameMesajeF(){
  sameMesaje=true;
}


var menuScale=1;
var menuTransformTemp;
function menuAnimation(){
  menuScale=menuScale*1.3;
  mensajesDiv.style.transform=menuTransformTemp+"scale("+menuScale+")";
  if(menuScale<1){
    setTimeout(menuAnimation,20);
  }else{
    mensajesDiv.style.transform=menuTransformTemp+"scale(1)";
  }
};

//////////////////////////////// Menus Functions
//////////////////////////////// Interactive Object Functions


///////////////////////////////////////SLEEP

function bedFunction(){

  player.pause();
  player.src="";


  clearInterval(Tinterval);

  fadeToBlack(function(){
    freezeFoff();
    resourcesDiv.style.display="none";
    dayCircleImg.style.display="none";
    dayNDiv.style.display="none";
    tutorialDiv.style.display="none";

    mensaje(0,334,529,0,0,wakeUpFromTheVoid);
    //mensaje(0,603,496,-3,0,wakeUpFromTheVoid);
    //mensaje(0,577,492,-2,0,wakeUpFromTheVoid);
    //mensaje(0,324,511,0,0,wakeUpFromTheVoid);
    gotoPlace(0,0,0,0,ppp_theVoid);
    dayNightSet(0);

    newDream();
  });
}


var youtubeFirstTime=true;
function newDream(){
  if(place==ppp_theVoid){
    // wtfPLAY();
    var i=myRand(1,12);
    var i=String(i);
    if(i.length==1){
      i="0"+i;
    }
    player.src="https://ia904504.us.archive.org/2/items/meditations_0708_librivox/meditations_"+i+"_marcusaurelius_64kb.mp3"
    player.play();

    largerPlayerVol=0;
    lautherPlayer();
  }
}

var largerPlayerVol=0;
function lautherPlayer(){
  largerPlayerVol+=0.001;
  player.volume=largerPlayerVol;

  if(largerPlayerVol<0.5 && place==ppp_theVoid){
    setTimeout(lautherPlayer,8000);
  }
}



function wakeUpFromTheVoid(){
  if(!deadFlag){
    var mes=  "<a class='greenAttac'>"+houseDefenceA[houseLevel]+"</a>"+txt("home_def")+"<br>";
        mes+= "<a class='redAttac'>"+wolfA.length+"</a>"+txt("wolfs")+"<br>";

    var total=houseDefenceA[houseLevel]-wolfA.length;
    if(total<0){
      mes+= "= <a class='redAttac'>"+total+"</a><br>";
    }else{
      mes+= "= <a class='greenAttac'>"+total+"</a><br>";
    }

    if(total<0){
      mes+="<a class='redAttac'>"+txt("someone_broke")+"</a>";
    }else if(wolfA.length==0){
      mes+=txt("quiet_night");
    }else{
      mes+=txt("wolves_were");
    }

    if(total<0){
      mensaje(mes,null,null,null,null,function(){
        duelF(total);
      });
    }else{
      mensaje(mes,null,null,null,null,wakeUpContinueOk);
    }
  }else{
    wakeUpContinueDead();
  }

  Ttime=0;

  resourcesDiv.style.display="block";
  dayCircleImg.style.display="block";
  dayNDiv.style.display="block";
  gotoPlace(0,59,314,548,ppp_house);

  player.pause();
  player.src="";

  dayN++;
  wolfA=[];
  for(var i=0;i<apple[0].length;i++){
    if(apple[0][i].name=="wolf"){
      apple[0].splice(i,1);
      i--;
    }
  }
  for(var i=0;i<appleS[0].length;i++){
    if(appleS[0][i].name=="wolf"){
      appleS[0].splice(i,1);
      i--;
    }
  }
  wolfDiv.innerHTML=wolfA.length+txt("wolfs_remaining");

  forestLevel=0;
  lvlChangeFlagF();//forest level change

  while(berryA.length>0){
    if(berryA[0]!=null){
      while(berryA[0].length>0){
        removeStuff(appleS[ppp_forest],berryA[0][0]);
        berryA[0].shift();
      }
    }
    berryA.shift();
  }
  dotX=[];
  dotY=[];
  berryA=[[]];
  fillDots();

  beettleMonring();
  rockMorningReset();
  raindDay();
}
function wakeUpContinueOk(){
  if(!winFlag){
    dayS();
  }

  Tinterval = setInterval(Tfunction,1000);
  dayQueDo();
  if(!winFlag){
    newDayLove();
  }
  pink.x=-25;
  pink.y=-5;

  pinkTalkActive=true;

  if(!winFlag){
    addWolfs();
  }

  loveMessageDone=false;
  giftActive=true;
  pinkTalkState=1;

  if(dayN==5){
    followMeShow();
  }else if(dayN==20){
    followMeShow();
  }else if(dayN==40){
    followMeShow();
  }

}
function wakeUpContinueDead(){
  Tinterval = setInterval(Tfunction,1000);
  dayQueDo();
}

////////////////////////////////DayQue
dayQueA=[];
function dayQue(f,inNdays,dead){
  dead=dead || false;
  if(dayQueA[inNdays]==null){
    dayQueA[inNdays]=[];
  }
  dayQueA[inNdays].push([f,dead]);
}

var deadFlag=false;
function dayQueDo(){
  dayQueA.shift();
  if(dayQueA[0]!=null){
    for(var i=0;i<dayQueA[0].length;i++){
      if(dayQueA[0][i][1]==deadFlag){
        dayQueA[0][i][0]();
      }
    }
  }

}


placeQueA=[];
function placeQue(f,place){
  if(placeQueA[place]==null){
    placeQueA[place]=[];
  }
  placeQueA[place].push(f);
}
function placeQueDo(){
  if(placeQueA[place]!=null){
    for(var i=0;i<placeQueA[place].length;i++){
      placeQueA[place][i]();
    }
  }
  placeQueA[place]=[];
}


///////////////////////////////////////pink talk
var pinkTalkActive=true;
var pinkTalkState=0;
var loveMessageDone=false;
var loveMessageOfTheDay;

function pinkTalk(){
  if(pinkTalkActive){
    showCorazones();
    switch(pinkTalkState) {
      case 0:
        mensaje(txt("hunt_today"),0,0,0,txt("yes"),okIhope,txt("no"),okIhope);
        function okIhope(){mensaje(txt("ok_I_hope"));}

        pinkTalkActive=false;
        pinkTalkState=1;
      break;
      case 1:
        if(!loveMessageDone){
          loveMessageOfTheDay=txt("pinkLoveMes");
          mensaje(loveMessageOfTheDay,0,0,0,txt("give_gift"),giveGiftF,txt("love_you_too"),null);
          loveMessageDone=true;

        }else{
          mensaje(txt("loveMessageDouble")+". "+loveMessageOfTheDay,0,0,0,txt("give_gift"),giveGiftF,txt("love_you_too"));
        }

      break;
      case 2:
        mensaje(txt("thank_for_gift"),0,0,0,txt("give_gift"),giveGiftF,txt("love_you_too"));
      break;
      case 3:
        mensaje(txt("sure_okay"));
      break;
    }


  }
}



var giftActive=true;
function giveGiftF(){
  if(giftActive){
    if(gemS(-1)){
      giftActive=false;
      pinkTalkState=2;
      loveS(1);

      mensaje(txt("this_is_lovely"),0,0,0,txt("ok"));
      dayQue(function(){
        placeQue(function(){
          gunLevel++;
          mensaje(txt("a_new_pickaxe"));
        },0);
      },2);



    }else if(berryS(-1)){
      giftActive=false;
      pinkTalkState=2;
      loveS(1);

      var foodImprovement=0;
      foodImprovement+=30;
      while(berryS(-1)){
        foodImprovement+=30;
      }

      mensaje(txt("look_so_pretty"),0,0,0,txt("ok"));
      dayQue(function(){
        placeQue(function(){
          foodMax+=foodImprovement;
          foodS();
          mensaje(txt("very_nutritious"));
        },0);
      },1);




    }else if(foodN>=50 && stoneN>=50){
      foodS(-50);
      stoneS(-50);
      giftActive=false;
      pinkTalkState=3;
      loveS(0.4);
      mensaje(txt("I_was_hungry"));
    }else{
      mensaje(txt("not_carrying"));
    }

  }else{
    mensaje(txt("another_gift"));
  }
}

//////////////////////////love

var corazonDiv=document.getElementById("corazonDiv");
var corazonBarra=document.getElementById("corazonBarra");
var corazonPMDiv=document.getElementById("corazonPMDiv");
var love=4;
function loveS(value){
  value= value || 0;

  love+=value;
  if(love<0){
    love=0;
  }else if(love>10){
    love=10;
  }
  loveAnimTarget=love;
  loveAnimation();
}



var loveAnimCurrent=love;
var loveAnimTarget=love;
var loveAnimStep=0.05;
var loveAnimActive=false;
function loveAnimation(){
  if(!loveAnimActive){
    loveAnimActive=true;
    corazonPMDiv.style.opacity=1;
    loveAnimation2();
  }
}

var loveAnimation2step=true;
function loveAnimation2(){
  if(loveAnimCurrent<loveAnimTarget){
    loveAnimCurrent+=loveAnimStep;
    corazonPMDiv.innerHTML="+"
    corazonPMDiv.style.color="#00ff21";

  }else if(loveAnimCurrent>loveAnimTarget){
    loveAnimCurrent-=loveAnimStep;
    corazonPMDiv.innerHTML="-"
    corazonPMDiv.style.color="#ff0000";
  }


  if(Math.abs(loveAnimCurrent-loveAnimTarget)<loveAnimStep*2){
    loveAnimCurrent=loveAnimTarget;
    loveAnimActive=false;
  }else{
    setTimeout(loveAnimation2,250);
  }

  if(loveAnimation2step){
    corazonBarra.style.width=(130*(loveAnimCurrent/10))+"px";

  }else{
    corazonBarra.style.width=(130*(loveAnimTarget/10))+"px";
    if(mensajesDiv.style.display=="block" && corazonPMDiv.style.opacity==1){
      if(loveAnimCurrent<loveAnimTarget){
        makeBeep(0.1,700,-10,0.01,0.01,.1,0.1);
      }else{
        //makeBeep(0.02,10,30,0.01,0.01,1,0.2);
      }
    }

  }
  loveAnimation2step=!loveAnimation2step;

}

loveS();

function newDayLove(){
  if(love>3){
    loveS(-0.1);
  }else{
    loveS(0.1);
  }
}

function remCorazon(){//Corazones
  corazonDiv.style.display="none";
  mensajeButt1.removeEventListener("click",remCorazon);

}
function showCorazones(){
  corazonDiv.style.display="block";
  corazonPMDiv.style.opacity=0;
}

/////////////////////////////////////// GEMS

var beettle=new stuff("beettle",1,100,100,false,false,3,4);
beettle.vx=1;
beettle.vy=1;
beettle.display=false;
beettle.active=false;
gemOnGround=false;

var currentGemLvl=0;

var gemStuffA=[];
for(var i=0;i<4;i++){
  gemStuffA.push(new stuff("gem0"+(i+1),1));
  gemStuffA[i].display=false;
}

var gemsDiv=document.getElementById("gemsDiv");
var gemsDivParent=document.getElementById("gemsDivParent");

var gemImgA=[];
for(var i=1;i<=4;i++){
  var img = new Image();
  img.src = "img/gem0"+i+".gif";
  gemImgA.push(img);
}

var gemN=0;
function gemS(n,img){
  if(gemN+n>=0){
    if(img){
      gemsDiv.appendChild(img);
      gemsDivParent.style.display="block";
    }
    if(n==-1){
      gemsDiv.removeChild(gemsDiv.childNodes[0]);
    }
    gemN+=n;

    return true;
  }else{
    return false;
  }
}

var beettleDoneN=0;
function beettleMonring(){
  if(myRand(0,100)<25 && beettleDoneN<gunLevelMax){
    console.log("beettle active");
    beettleDoneN++;
    beettle.active=true;
    beettle.x=myRand(0,ww);
    beettle.y=0;
  }
}

//////////////berry


var berryImgA=[];
for(var i=1;i<=4;i++){
  var img = new Image();
  img.src = "img/berry0"+i+".gif";
  berryImgA.push(img);
}


function newBerryF(x,y){
  if(berryA[forestLevel]==null){
    berryA[forestLevel]=[];
  }
  if(myRand(1,31*30)<1+forestLevel){

    berryA[forestLevel].push(new stuff("berry0"+myRand(1,4),2,x,y));

    if(berryA[forestLevel-1]!=null){
      for(var i=0;i<berryA[forestLevel-1].length;i++){
        berryA[forestLevel-1][i].display=false;
      }
    }

  }
}


var berryN=0;
var berryDiv=document.getElementById("berryDiv");
var berryDivParent=document.getElementById("berryDivParent");
function berryS(n,img){
  if(berryN+n>=0){
    if(img){
      berryDiv.appendChild(img);
      berryDivParent.style.display="block";
    }
    if(n==-1){
      berryDiv.removeChild(berryDiv.childNodes[0]);
    }
    berryN+=n;

    return true;
  }else{
    return false;
  }
}

//////////////////////////////// YT

var player = new Audio();



//////////////////////////////// Day Night
var nightHue=18;
var nightBright=.5;
var nightSat=.5;
var nightShadow1=130;
var nightShadow2=200;

function dayNightSet(stg){
  backCanvas.style.filter="hue-rotate("+(rainHue+((nightHue-0)*stg))+"deg) brightness("+(1+((nightBright-1)*stg))+") saturate("+(1+((nightSat-1)*stg))+")";
  myCanvas.style.boxShadow ="inset 0px 0px "+(0+((nightShadow2-0)*stg))+"px "+(0+((nightShadow1-0)*stg))+"px #000";
}

var dayN=1;
var Tday=60;
var Tnight=60;
var Ttime=0;
var dayCircleImg=document.getElementById("dayCircleImg");
dayCircleImg.style.transform="rotate("+(-90)+"deg)";
function Tfunction(){
  if(Ttime>Tday){
    dayNightSet((Ttime-Tday)/Tnight);
  }
  if(Ttime>Tday+Tnight){
    console.log("wtf");
    mensaje(txt("fall_asleep"),null,null,null,null,bedFunction);
    clearInterval(Tinterval);
    freezeF();

    if(place==ppp_tetris){
      clearMensaje();
    }

    setTimeout(function(){
      tetrixExit();
      place=ppp_house;
    },100);




  }
  Ttime+=1;

  dayCircleImg.style.transform="rotate("+((270*(Ttime/(Tday+Tnight)))-90)+"deg)";
}
var Tinterval = setInterval(Tfunction,1000);

///////////////////////////////////END


function duelF(total){

  var mes=  "<a class='greenAttac'>"+(Math.round(love*10)/10)+"</a>"+txt("love")+"<br>";
      mes+= "<a class='redAttac'>"+(Math.round(-total*10)/10)+"</a>"+txt("inside_the_house")+"<br>";

  var total2=love+total;
  if(total2<0){
    mes+= "= <a class='redAttac'>"+(Math.round(total2*10)/10)+"</a><br>";
  }else{
    mes+= "= <a class='greenAttac'>"+(Math.round(total2*10)/10)+"</a><br>";
  }

  showCorazones();
  mensaje(mes,null,null,null,null,function(){
    corazonDiv.style.display="none";
    duelF2(total2);
  });
  loveS(total);

}

function duelF2(total2){
  if(total2<0){
    mensaje(txt("impregnated"),null,null,null,null,wakeUpContinueDead);

    removeStuff(apple[0],pink);
    removeStuff(appleS[0],pink);
    removeStuff(appleI[0],pink);
    pinkFat=new stuff("pink",ppp_house,72,-33,false,[txt("talk"),function(){}]);
    dayQue(function(){

      removeStuff(apple[0],pinkFat);
      removeStuff(appleS[0],pinkFat);
      removeStuff(appleI[0],pinkFat);

      removeStuff(apple[ppp_house],pinkFat);
      pinkFat=new stuff("pinkFat",ppp_house,72,-33,false,[txt("talk"),function(){}]);
    },2,true);

    dayQue(attacEvent,3,true);
    deadFlag=true;
  }else{
    mensaje(txt("you_survived"),null,null,null,null,wakeUpContinueOk);
  }
}

var pinkFat;
function attacEvent(){
  removeStuff(apple[ppp_house],pinkFat);
  new stuff("pink",ppp_house,70,-30);
  wolfDead=new stuff("wolf1",ppp_house,30,-8);
  attacEvent2();

  resourcesDiv.style.display="none";
  dayCircleImg.style.display="none";
  dayNDiv.style.display="none";
}

var wolfDead;
var wolfDeadT=250;
function attacEvent2(){
  me.x=30;
  me.y=71;
  if(wolfDeadT<=0){
    wolfDead.y+=1.5;
  }else{
    wolfDeadT--;
  }

  if(distancia(me.x,me.y,wolfDead.x,wolfDead.y)<12){
    fadeAlpha=0;
    fadeAlpha=10000;
    resourcesDiv.style.display="none";
    setInterval(function(){
      me.x=30;
      me.y=71;
      Ttime=0;
    },10);
  }else{
    setTimeout(attacEvent2,10);
  }
}

///////////////////////tutorialDiv
var tutorialDiv=document.getElementById("tutorialDiv");
var tutorialDivOpacity=1;
document.addEventListener("keydown",tutorialDivFf);
function tutorialDivFf(){
  document.removeEventListener("keydown",tutorialDivFf);
  tutorialDivF();
  followMeBanish();
}
function tutorialDivF(){

  if(tutorialDivOpacity>0){
    tutorialDivOpacity-=0.008;
    tutorialDiv.style.opacity=tutorialDivOpacity;
    setTimeout(tutorialDivF,30);
  }else{
    tutorialDiv.style.display="none";
  }
}



var tutorialDivCave=document.getElementById("tutorialDivCave");
var tutorialDivCaveOpacity=1;
var tutorialDivCaveFlag=true;
function tutorialDivCaveBanish(){

  if(tutorialDivCaveOpacity>0){
    tutorialDivCaveOpacity-=0.08;
    tutorialDivCave.style.opacity=tutorialDivCaveOpacity;
    setTimeout(tutorialDivCaveBanish,10);
  }else{
    tutorialDivCave.style.display="none";
  }
}
function tutorialDivCaveBanishTrigger(){
  backCanvas.removeEventListener("click",tutorialDivCaveBanishTrigger);
  tutorialDivCaveBanish();
  tutorialDivCaveFlag=false;
}



///////////////////////void stars
//bedFunction();

var grd=miniContext.createLinearGradient(200,0,ww/2,hh);
grd.addColorStop(0,"rgba(0,0,0,0)");
grd.addColorStop(1,"rgba(0,180,255,0.1)");

var starX=[];
var starY=[];
var starVX=[];
var starVY=[];
var starT=[];
var starColor=[];
var starSize=[];
var starColorA=[
  [255,0,0],
  [0,255,0],
  [0,0,255],
  [0,255,0],
  [0,0,255],
  [255,255,0],
  [255,255,255]
]
var starColorA=[
  [0,0,255],
  [47,207,253],
  [48,207,253],
  [47,137,249],

  [0,0,255],
  [47,207,253],
  [48,207,253],
  [47,137,249],
  [0,0,255],
  [47,207,253],
  [48,207,253],
  [47,137,249],

  [255,255,255],
  [255,255,255],
  [255,255,255],

  [0,0,255],
  [47,207,253],
  [48,207,253],
  [47,137,249],

  [0,0,255],
  [47,207,253],
  [48,207,253],
  [47,137,249],
  [0,0,255],
  [47,207,253],
  [48,207,253],
  [47,137,249],

  [255,255,255],
  [255,255,255],
  [255,255,255],





  [255,0,0],
  [0,255,0],
  [0,0,255],
  [0,255,255],
  [0,230,255],
  [255,255,0],
  [255,255,255]
]
for(var i=0;i<1000;i++){
starX.push(0);
starY.push(0);
starVX.push(0);
starVY.push(0);
starT.push(0);
starColor.push(0);
starSize.push(0);
}


/////////////////////// WIN

var dayNDiv=document.getElementById("dayNDiv");
var winDiv=document.getElementById("winDiv");
var winN=42;
var winFlag=false;

dayNDiv.innerHTML=txt("dayNDiv")+winN;
function dayS(){
  winN--;
  dayNDiv.innerHTML=txt("dayNDiv")+winN;
  if(winN<=0){
    winFlag=true;
    winDiv.style.display="block";
    followMeShow();
  }
}

//rain

var rainX=[];
var rainY=[];
for(var i=0;i<9*10;i++){
  rainX.push(myRand(me.x-(ww/2),me.x+(ww/2)));
  rainY.push(myRand(me.y-(hh/2),me.y+(hh/2)));
}
var rainVX=-2;
var rainVY=3;
//    filter: hue-rotate(33deg);

var rainActive=false;
var rainHue=0;
function raindDay(){
  if(myRand(0,5)==0){
    rainActive=true;
    rainHue=10;
    rainNoise.start()
    autoFilter.start()
  }else{
    rainActive=false;
    rainHue=0;
    rainNoise.stop()
    autoFilter.stop()
  }
  backCanvas.style.filter="hue-rotate("+rainHue+"deg)";
}



var rainNoise = new Tone.Noise("white");
var autoFilter = new Tone.AutoFilter({
	"frequency" : "240s",
	"min" : 10400,
	"max" : 10050
}).connect(Tone.Master);
rainNoise.connect(autoFilter);

function makeBeep(time,frequency,volume,attack,decay,sustain,release){
  time=time || 0.5;
  frequency=frequency || 200;
  volume=volume || 1;
  attack=attack || 0.1;
  decay=decay || 0.2;
  sustain=sustain || 1;
  release=release || 0.8;

  if(attack>=time){
    attack=time*.99;
  }
  if(decay>=time){
    decay=time*.99;
  }

  var osc = new Tone.Oscillator(frequency);
  osc.volume.value=volume;
  var env = new Tone.AmplitudeEnvelope({
  "attack" : attack,
  "decay" : decay,
  "sustain" : sustain,
  "release" : release,
  });
  osc.connect(env);
  env.toMaster();
  osc.start();
  env.triggerAttackRelease(time);

  setTimeout(function(){
    env.dispose();
    osc.dispose();
  },(time+release+sustain)*1000);

}

/////////////////textScript
function txt(textName){
  return textScript[textName][myRand(0,textScript[textName].length-1)]
}
function updateLen(){
  document.getElementById("stoneTitle").innerHTML=txt("STONE");
  document.getElementById("foodTitle").innerHTML=txt("ENERGY");
  document.getElementById("gemsTitle").innerHTML=txt("GEMS");
  document.getElementById("berryTitle").innerHTML=txt("BERRIES");
  document.getElementById("stoneTetrisTitle").innerHTML=txt("stoneTetrisTitle");
  document.getElementById("wolfDiv").innerHTML=txt("one_wolf_remaining");
  document.getElementById("tutorialDivText1").innerHTML=txt("move_arround");
  document.getElementById("tutorialDivText2").innerHTML=txt("click_things");
  document.getElementById("tutorialDivText3").innerHTML=txt("survive_30");
  document.getElementById("winDiv1").innerHTML=txt("kingdom_safe");
  document.getElementById("winDiv2").innerHTML=txt("YOU_WON");
  document.getElementById("followMeA").innerHTML=txt("followMeA");
  document.getElementById("optionsA").innerHTML=txt("optionsA");
  document.getElementById("volumeA").innerHTML=txt("volumeA");
  document.getElementById("blindA").innerHTML=txt("blindA");
  document.getElementById("languageA").innerHTML=txt("languageA");
  // document.getElementById("showVideosA").innerHTML=txt("showVideosA");

  document.getElementById("tutorialDivCaveText").innerHTML=txt("tutorialDivCaveText");
  document.getElementById("followMeSmall").innerHTML=txt("followMeSmall");
  document.getElementById("followMeMainText").innerHTML=txt("followMeMainText");
}
updateLen();
/////////////////options

var gearImg=document.getElementById("gearImg");
gearImg.addEventListener("click",gearImgF);
function gearImgF(){
  if(optionsDiv.style.display=="block"){
    optionsXF();
  }else{
    optionsDiv.style.display="block";
  }
  backCanvas.addEventListener("click",optionsXF);
}

var optionsDiv=document.getElementById("optionsDiv");
var optionsX=document.getElementById("optionsX");
optionsX.addEventListener("click",optionsXF);
function optionsXF(){
  optionsDiv.style.display="none";
  backCanvas.removeEventListener("click",optionsXF);
}

var volumeInput=document.getElementById("volumeInput");
volumeInput.addEventListener("change",volumeInputF);
function volumeInputF(){
  Tone.Master.volume.value=volumeInput.value;
  if(volumeInput.value==volumeInput.min){
    Tone.Master.mute=true;
  }else{
    Tone.Master.mute=false;
  }
}

var colorInput=document.getElementById("colorInput");
colorInput.addEventListener("change",colorInputF);
colorInput.addEventListener("mousedown",function(){
  colorInput.addEventListener("mousemove",colorInputF);
});
colorInput.addEventListener("mouseup",function(){
  colorInput.removeEventListener("mousemove",colorInputF);
});
function colorInputF(){
  document.body.style.filter="hue-rotate("+colorInput.value+"deg)"
}


var idiomaInput=document.getElementById("idiomaInput");
var userLang = navigator.language || navigator.userLanguage;
if(userLang=="es-ES" || userLang=="es"){
  idiomaInput.value="ES";
}else{
  idiomaInput.value="ENG";
}
idiomaInput.addEventListener("change",idiomaInputF);
function idiomaInputF(){
  console.log(idiomaInput.value);
  if(idiomaInput.value=="ES"){
    var script = document.createElement('script');
    script.onload = function () {
      updateLen();
    };
    script.src = "textScript_ES.js";
    document.head.appendChild(script);
  }else{
    var script = document.createElement('script');
    script.onload = function () {
      updateLen();
    };
    script.src = "textScript_ENG.js";
    document.head.appendChild(script);
  }

}

var videoInput=document.getElementById("videoInput");

/////////////// follow me
var followMe=document.getElementById("followMeMain");
var followMeOpacity=1;
function followMeBanish(){
  if(followMeOpacity>0){
    followMeOpacity-=0.01;
    followMe.style.opacity=followMeOpacity;
    setTimeout(followMeBanish,100);
  }else{
    followMe.style.display="none";
  }
}
function followMeShow(){
  followMeOpacity=1;
  followMe.style.opacity=followMeOpacity;
  followMe.style.display="block";
}
