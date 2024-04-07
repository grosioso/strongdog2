
CarmineRoom=function(tr){
let roomName="level"+tr.level;

if (roomName == "level1"){
// intro
tr.tutorial = "press wasd to move, w to jump. tab to open menu";
tr.obstacles = [
makeObj(-32,272,752,192+16*12),
makeObj(176,240,416,48),
makeObj(336,192,320,64),
];
}
if (roomName == "level2"){
// intro
tr.tutorial = "hold space to create a clone.";
tr.obstacles = [
makeObj(-96,288,624,192+16*2),
];
tr.plates = [new Plate(170,280)];
tr.platforms = [new Gate(370,226,tr.plates[0])];
}
if (roomName == "level3"){
tr.tutorial = "clones will repeat what you did while you were holding space bar.";
tr.replayImg=makeImg("twice1.png");
tr.obstacles = [
makeObj(-96,288,624,192+16*3),
];
tr.plates = [new Plate(100,280)];
tr.platforms = [
new Gate(289,225,tr.plates[0]),
new Gate(339,225,tr.plates[0],true),
new Gate(389,225,tr.plates[0])
];
}
if (roomName == "level4"){
tr.tutorial = "horizontally aligned clones will both die.";
tr.replayImg=makeImg("twice2.png");
tr.obstacles = [
makeObj(-96,288,624,192+16*3),
];
tr.plates = [new Plate(100,280),new Plate(350,280)];
tr.platforms = [
new Gate(200,225,tr.plates[0]),
new Gate(450,225,tr.plates[1])
];
}
if (roomName == "level5"){
tr.tutorial = "releasing space early will create a shorter loop.";
tr.replayImg=makeImg("twice3.png");
tr.obstacles = [
makeObj(-608,336,2144,176),
makeObj(416,240,832,288),
makeObj(-544,304,1520,192),
makeObj(-576,224,672,224),
makeObj(128,224,976,48),
];
tr.plates = [
new Plate(380,232+64),
];
tr.platforms = [
new Gate(385,67+28+48+16,tr.plates[0])
];
}
if (roomName == "level6"){
tr.obstacles = [
makeObj(-224,288,880,224),
makeObj(-128,240,288,80),
];
tr.plates = [new Plate(120,280-48),new Plate(170,280)];
tr.platforms = [new Gate(350,226,tr.plates[0]),new Gate(410,226,tr.plates[1])];
}
if (roomName == "level7"){
tr.obstacles = [
makeObj(-160,288,752,224),
makeObj(144+48,256,400,112),
makeObj(-32,256,112,112),
];
tr.plates = [new Plate(85,280),new Plate(153,280)];
tr.platforms = [new Gate(330,226-32,tr.plates[0]),new Gate(400,226-32,tr.plates[1])];
}
if (roomName == "level8"){
tr.obstacles = [
makeObj(-160,288,752,240+16*1),
makeObj(-32,64,176,208-16),
];
tr.plates = [new Plate(60,280)];
tr.platforms = [
new Gate(269,225,tr.plates[0]),
new Gate(339,225,tr.plates[0],true),
new Gate(409,225,tr.plates[0])
];
}
if (roomName == "level9"){
tr.obstacles = [
makeObj(-224,288,880,224),
makeObj(96,256,32,80),
];
tr.plates = [new Plate(130,280),new Plate(60,280)];
tr.platforms = [new Gate(350,226,tr.plates[0]),new Gate(410,226,tr.plates[1])];
shiftRoom(tr,0,-32);
}
if (roomName == "level10"){
unlockMedal("10");
tr.tutorial="press mouse 1 to throw knives, aim knives with the mouse";
tr.obstacles = [
makeObj(-176,288,880,208),
makeObj(320,64,320,80),
makeObj(368,80,224,128),
makeObj(320,192,480,32),
];
tr.targets = [
new Switch(330,150)
];
tr.platforms = [
new Gate(340,225,tr.targets[0])
];
}
if (roomName == "level11"){
tr.obstacles = [
makeObj(-176,288,880,208),
makeObj(410,64,320,80),
makeObj(458,80,224,128),
makeObj(410,192,480,32),
];
tr.targets = [
new Switch(410,150)
];
tr.platforms = [
new Gate(180,225,tr.targets[0]),
new Gate(320,225,tr.targets[0],true)
];
}
if (roomName == "level12"){
tr.obstacles = [
makeObj(-160,336,1248,64),
makeObj(304,224,384,272),
makeObj(-96,304,624,192),
makeObj(-32,208,112,96),
makeObj(0,256,96,96),
makeObj(128,208,320+32,32),
];
tr.plates = [
new Plate(266,296)
]
tr.targets = [
new Switch(360,90)
];
tr.platforms = [
new Gate(140,240,tr.targets[0]),
new Gate(190,240,tr.targets[0],true),
new Gate(350,144,tr.plates[0]),
];
}
if (roomName == "level13"){
tr.obstacles = [
makeObj(-160,336,1248,64+32),
makeObj(336,224,384,272),
makeObj(-96,304,624,192),
makeObj(-32,208,112,96),
makeObj(0,256,96,96),
makeObj(128,208,320+32,32),
];
tr.targets = [
new Switch(300,246)
];
tr.spikes = [
new Spikes(140,288,180,16)
]
tr.platforms = [
new Gate(180,145,tr.targets[0]),
new Gate(260,145,tr.targets[0],true),
new Gate(340,145,tr.targets[0])
];
}
if (roomName == "level14"){
tr.obstacles = [
makeObj(-160,336,1248,64),
makeObj(320,192,512,320),
makeObj(-96,304,624,192),
makeObj(-80,176,192,144),
makeObj(-96,160,320,48),
makeObj(272,160,224,48)
];
tr.targets = [
new Switch(120,216)
];
tr.spikes = [
//new Spikes(120,288,190,16)
];
tr.platforms = [
new Gate(350,98,tr.targets[0]),
];
}
if (roomName == "level15"){
tr.obstacles = [
makeObj(-224,336,1376,64),
makeObj(416,64,432,176),
makeObj(-160,304,752,192),
makeObj(-176,144,288,192),
makeObj(-80,128,448,32),
makeObj(144,208,368,48),
];
tr.plates = [
new Plate(60,120),
new Plate(110,120),
new Plate(160,120),
new Plate(210,120)
];
tr.platforms = [
new Gate(170,144,tr.plates[2]),
new Gate(350,144,tr.plates[3]),
new Gate(170,240,tr.plates[1]),
new Gate(350,240,tr.plates[0])
];
}
if (roomName == "level16"){
tr.obstacles = [
makeObj(-96,288,624,192+16*4),
];
tr.plates = [
new Plate(60,280),new Plate(110,280),new Plate(160,280)
];
tr.platforms = [
new Gate(270,226,tr.plates[0]),
new Gate(330,226,tr.plates[2]),
new Gate(390,226,tr.plates[1])
];
}
if (roomName == "level17"){
tr.obstacles = [makeObj(-224,336,1376,64),makeObj(-160,272,752,192),makeObj(-208,176,448,192),makeObj(448,192,192,128),makeObj(304,176,224,32),makeObj(208,224,48,64),];
tr.plates = [
new Plate(160,168),
new Plate(30,168)
];
tr.targets=[new Switch(405,220)];
tr.spikes=[new Spikes(304,256,160,16)];
tr.platforms = [
new Gate(440,107,tr.targets[0]),
new Gate(320,210,tr.plates[0]),
new Gate(370,210,tr.plates[1])
];
}
if (roomName == "level18"){
tr.obstacles = [
makeObj(-736,336,2400,176),
makeObj(464,176,960,352),
makeObj(-672,304,1776,192),
makeObj(-704,160,880,304),
makeObj(224,160,1104,48),
makeObj(336,256,272,80),
];
tr.plates = [
new Plate(425,248),
];
tr.platforms = [
new Gate(430,67+28,tr.plates[0])
];
}
if (roomName == "level19"){
tr.obstacles = [
makeObj(-736,336,2400,176),
makeObj(240,176,1120,352),
makeObj(-672,304,1776,192),
makeObj(-704,160,848,304),
makeObj(192,160,1104,48),
makeObj(48,240,160,32),
];
tr.plates = [
new Plate(149,248+48),
];
tr.platforms = [
new Gate(385,67+28,tr.plates[0])
];
}
if (roomName == "level20"){
unlockMedal("20");
tr.obstacles =[makeObj(-352,336,1632,64),makeObj(-288,304,1008,192),makeObj(-272,160,400,208),makeObj(448,192,320,176),makeObj(160,160,560,48),];
tr.plates = [
new Plate(410,296),
];
tr.targets=[new Switch(406,220)];
tr.platforms = [
new Gate(420,100,tr.plates[0]),

new Gate(230,242,tr.targets[0]),
new Gate(300,242,tr.targets[0],true),
new Gate(360,242,tr.targets[0]),
];
}
if (roomName == "level21"){
tr.obstacles = [
makeObj(-224,336,1376,64),
makeObj(384,192,576,320),
makeObj(-160,304,752,192),
makeObj(-160,176,304,144),
makeObj(176,176,384,48),
makeObj(176,192,160,80),
];
tr.targets=[new Switch(350,225)];
tr.platforms = [
new Gate(350,110,tr.targets[0]),
];
}
if (roomName == "level22"){
tr.obstacles = [
makeObj(-288,336,1504,96),
makeObj(400,176,448,336),
makeObj(-224,304,880,192),
makeObj(-160,160,288,192),
makeObj(160,160,448,32),
makeObj(160,176,112,48),
makeObj(304,176,224,96),
makeObj(80,256,192,80),
];
tr.targets = [
new Switch(272,192)
];
tr.platforms = [
new Gate(370,145-48,tr.targets[0]),
new Gate(290,145-48,tr.targets[0],true),
new Gate(210,145-48,tr.targets[0])
];
}
if (roomName == "level23"){
tr.obstacles = [makeObj(-160,288,752,192+16*1),makeObj(112,240,416,80),];
tr.plates = [
new Plate(120,280-48),new Plate(170,280-48),new Plate(220,280-48),new Plate(30,280)
];
tr.platforms = [
new Gate(320,226-48,tr.plates[2]),
new Gate(360,226-48,tr.plates[1]),
new Gate(400,226-48,tr.plates[0]),
new Gate(470,226-48,tr.plates[3])
];
}
if (roomName == "level24"){
tr.obstacles = [
makeObj(-160,336,1248,64*2),
makeObj(-96,272,624,192),
makeObj(-144,224,192,144),
makeObj(-16,176,96,64),
];
tr.plates = [
new Plate(180,264),
new Plate(50,264)
];
tr.platforms = [
new Gate(90,210,tr.plates[0]),
new Gate(320,210,tr.plates[1]),
new Gate(370,210,tr.plates[1],true)
];
}
if (roomName == "level25"){
tr.obstacles = [
makeObj(-608,336,2144,448+16*1),
makeObj(-592,112,640,208),
makeObj(-464,96,544,48),
makeObj(-496,176,816,32),
makeObj(-400,304,1328,144),
makeObj(352,64,48,208),
makeObj(144,240,240,32),
makeObj(224,128,96,64),
makeObj(-320,192,432,144),
];
tr.plates = [
new Plate(158,169),
new Plate(49,169)
];
tr.platforms = [
new Gate(90,110,tr.plates[0]),
new Gate(415,240,tr.plates[1]),
new Gate(465,240,tr.plates[1],true)
];
}

if (roomName == "level26"){
tr.obstacles = [
makeObj(-224,336,1376,128),
makeObj(-160,288,752,192),
makeObj(-144,208,240,96),
makeObj(160,256,32,64),
];
tr.plates = [
new Plate(60,200),new Plate(160,248)
];
tr.platforms = [
new Gate(258,225,tr.plates[1]),
new Gate(308,225,tr.plates[1],true),
new Gate(358,225,tr.plates[1]),
new Gate(408,225,tr.plates[0])
];
}
if (roomName == "level27"){
tr.obstacles = [
makeObj(-288,336,1504,64+16),
makeObj(400,192,512,272),
makeObj(-224,304,880,192),
makeObj(-176,176,240,112),
makeObj(128,176,544,32),
makeObj(-128,272,224,96),
makeObj(256,192,32,80),
makeObj(208,288,96,96),
makeObj(-144,224,224,96),
];
tr.targets = [
new Switch(360,266)
];
tr.plates = [
new Plate(218,280)
]

tr.platforms = [
new Gate(180,114,tr.targets[0]),
new Gate(260,114,tr.targets[0],true),
new Gate(340,114,tr.plates[0])
];

}
if (roomName == "level28"){
tr.obstacles = [
makeObj(-480,336,1888,176+16*1),
makeObj(400,160,704,288),
makeObj(-416,304,1264,192),
makeObj(-368,128,544,224),
makeObj(208,128,752,48),
makeObj(160,240,208,32),
makeObj(64,208,176,48),
makeObj(176,224,128,32),
];
tr.plates = [
new Plate(190,232+64),
];
tr.platforms = [
new Gate(390,67,tr.plates[0])
];
}
if (roomName == "level29"){
unlockMedal("End");
tr.player.x = 5; tr.player.y=150;
tr.obstacles = [
makeObj(-208,304,1024,176),
makeObj(384,64,416,432),
];
tr.f = - 120;
tr.img = new Image();
tr.img.src = "end.png";
tr.display = function(){
let tempC = document.createElement("canvas");
tempC.width=c.width; tempC.height=c.height;
let tempCtx = tempC.getContext("2d");
tempCtx.drawImage(c,0,0,tempC.width,tempC.height);
ctx.globalAlpha=1;
this.displayCity();
ctx.globalAlpha=1;
this.f++;
if (this.f > 0) {
ctx.globalAlpha = .5;
ctx.fillStyle = "#000000";
ctx.fillRect(0,0,c.width,c.height);
ctx.globalAlpha = 1;
drawText("the end",100,60,1);
}
}
}

}


