function startMobile(enterFullScreen) {
  // hide canvas for a second
  $("#canvas").css({display: "none"});
  $(".btns").css({display: "none"});

  var elem = $("#holder")[0]
  var reqFs = grabMethod(elem, "requestFullscreen");
  if (enterFullScreen && reqFs) {
    // listen for the actual change
    $(document).one("webkitfullscreenchange mozfullscreenchange fullscreenchange", function(evt) {
      finalizeMobileMode();
    });
    // request full screen mode
    reqFs.call(elem);
  } else {
    // no full-screen needed/possible
    finalizeMobileMode();
  }
}

function finalizeMobileMode() {
  $("#holder").addClass("fullscreen");
  $(".mcontrols, .mextra").addClass("visible");

  // preserve correct layout for orientation/size
  doMobileLayout();
  $(window).on("resize", doMobileLayout);
  // catch touches
  $("#holder").on("touchstart touchmove touchend", function(evt) {
    unlockAudio();
    evt.preventDefault();
    evt.stopPropagation();
  });
  // set up actual controls
  vgamepad = new VGamepad();
  stick = new VStick(vgamepad, $(".mstick"), 0.3);
  obutton = new VButton(vgamepad, $(".mbtn16"), 16);
  xbutton = new VButton(vgamepad, $(".mbtn32"), 32);
  mbutton = new VButton(vgamepad, $(".mbtn64"), 64);
  // audio unlocking on user interaction
  console.log("In mobile mode.");
}

function unlockAudio() {
  if (window.unlockAttempted) return;
  window.unlockAttempted = true;
  // create empty buffer
  var ctx = pico8AudioContext;
  if (!ctx) return;
  var buffer = ctx.createBuffer(1, 1, 22050);
  var source = ctx.createBufferSource();
  source.buffer = buffer;
  // connect to output (your speakers)
  source.connect(ctx.destination);
  // play the file
  if (source.start) {
    source.start();
  } else if (source.noteOn) {
    source.noteOn(0);
  }
}

// =================================================
// Layout
// =================================================

function doMobileLayout() {
  var w = $(window).width(), h = $(window).height();
  if (w>h) {
    doHorizLayout(w, h);
  } else {
    doVerticalLayout(w, h);
  }
  /*
  $("<div></div>").css({
    position: "fixed", top: 0, left: 0, color: "#777", fontWeight: "bold"
  }).html(window.perf)
    .appendTo($("body"));
  */
}
function doHorizLayout(w, h) {
  var canvasSize = Math.floor(Math.min(h, w*0.6));
  canvasSize = Math.floor(canvasSize / 128) * 128;
  var controlSize = w * 0.23;
  var gameX = Math.floor((w-canvasSize)/2);
  var gameY = Math.floor((h-canvasSize)/2);
  var ctrlY = (h-controlSize)/2;
  console.log("Screen: " + w + "x" + h);
  console.log("Game: " + canvasSize + "x" + canvasSize);
  console.log("Game loc:" + gameX + "," + gameY);
  $("#holder").css({height: h});
  $("#canvas")
    .css({
      width: canvasSize,
      height: canvasSize,
      left: gameX, top: gameY,
      display: "block"
    })
    .addClass("fullscreen");
  $(".mcontrols")
    .removeClass("vertical")
    .css({width: controlSize, height:controlSize, top:ctrlY});
  $(".mextra")
    .css({
      top: ctrlY - controlSize * 0.6, right: controlSize*0.25, left: null,
      width: controlSize*0.5, height: controlSize*0.5
    });
}

function doVerticalLayout(w, h) {
  var canvasSize = Math.floor(Math.min(w, h*0.63));
  canvasSize = Math.floor(canvasSize / 128) * 128;
  var controlSize = h * 0.23;
  var gameX = Math.floor((w-canvasSize)/2);
  var gameY = h * 0.02;
  var ctrlY = gameY + canvasSize + (h - gameY - canvasSize) * 0.5 - controlSize * 0.5;
  console.log("Screen: " + w + "x" + h);
  console.log("Game: " + canvasSize + "x" + canvasSize);
  console.log("Game loc:" + gameX + "," + gameY);
  $("#holder").css({height: h});
  $("#canvas")
    .css({
      width: canvasSize,
      height: canvasSize,
      left: gameX, top: gameY,
      display: "block"
    })
    .addClass("fullscreen");
  $(".mcontrols")
    .addClass("vertical")
    .css({width: controlSize, height:controlSize, top:ctrlY});
  $(".mextra")
    .css({
      top: ctrlY + controlSize * 0.5, right: w/2 - controlSize * 0.25,
      width: controlSize*0.5, height: controlSize*0.5
    });
}

// =================================================
// Virtual gamepad
// =================================================

function VGamepad() {
  this.buttons = 0;
  this.preloadControlsImages();
}
VGamepad.prototype = {
  preloadControlsImages: function() {
    preloadingImages = [];
    for (var i = 1; i <= 14; i++) {
      var img = new Image();
      img.src = "mobile-controls/controls" + i + ".png";
      preloadingImages.push(img);
    }
  },
  setDirection: function(x, y) {
    var dirButtons = 0;
    var btns = [x<0,x>0,y<0,y>0];
    var btnValue = 1;
    for (var i = 0; i < 4; i++) {
      if (btns[i]) dirButtons |= btnValue
      $(".mbtn" + btnValue).toggleClass("pressed", btns[i]);
      btnValue <<= 1;
    }
    this.buttons = (this.buttons &~ 0xF) | dirButtons;
    this.propagateState();
  },
  setButton: function(btn, pressed) {
    this.buttons = (this.buttons &~ btn) | (pressed ? btn : 0);
    $(".mbtn" + btn).toggleClass("pressed", pressed);
    this.propagateState();
  },
  propagateState: function() {
    updateExternalGamepad(0, this.buttons);
  }
};

// =================================================
// Control stick
// =================================================

function VStick(vg, $elem, deadZone) {
  this.vg = vg;
  this.$elem = $elem;
  this.deadZone = deadZone;
  this.state = VStick.DEAD;
  this.recalculate();
  this.attachHandlers();
}
VStick.DEAD = {x:0, y:0}
VStick.DIR = [
  {x:-1,y:0,l:1.2}, {x:-1,y:-1,l:2}, {x:0,y:-1,l:3.2}, {x:1,y:-1,l:4},
  {x:1,y:0,l:5.2}, {x:1,y:1,l:6}, {x:0,y:1,l:7.2}, {x:-1,y:1,l:8}
]
VStick.prototype = {
  attachHandlers: function() {
    this.$elem.on("touchstart touchmove", this.handleTouch.bind(this));
    this.$elem.on("touchend", this.handleEnd.bind(this));
  },
  recalculate: function() {
    var o = this.$elem.offset(),
        w = this.$elem.width(),
        h = this.$elem.height();
    this.center = {x: o.left + w/2, y: o.top + h/2};
    this.size = w/2;
  },
  handleTouch: function(evt) {
    this.updateState(this.stateFromTouch(evt.touches[0]));
    evt.preventDefault();
  },
  handleEnd: function(evt) {
    this.updateState(VStick.DEAD);
    evt.preventDefault();
  },
  updateState: function(state) {
    if (state == this.state) return;
    this.state = state;
    this.vg.setDirection(state.x, state.y);
  },
  stateFromTouch: function(tch) {
    this.recalculate();
    var c = this.center, s = this.size;
    var x = (tch.clientX - c.x) / s,
        y = (tch.clientY - c.y) / s;
    var distance = Math.sqrt(x*x+y+y);
    if (distance < this.deadZone)
      return VStick.DEAD;

    var angle = Math.atan2(y, x);
    var normalized = (angle / Math.PI * 4 + 4.6) % 8
    for (var bucket = 0; ; bucket++) {
      var dir = VStick.DIR[bucket];
      if (normalized <= dir.l)
        return dir;
    }
  }
}

// =================================================
// Control buttons
// =================================================

function VButton(vg, $elem, buttonValue) {
  this.vg = vg;
  this.$elem = $elem;
  this.value = buttonValue;
  this.attachHandlers();
}
VButton.prototype = {
  attachHandlers: function() {
    this.$elem.on("touchstart", this.handleTouch.bind(this,true));
    this.$elem.on("touchend", this.handleTouch.bind(this,false));
  },
  handleTouch: function(touched, evt) {
    this.vg.setButton(this.value, touched);
    evt.preventDefault();
  }
}

// =================================================
// Helpers
// =================================================

function grabMethod(object, name) {
  if (object[name]) return object[name];
  var capitalized = name.substring(0,1).toUpperCase() + name.substring(1)
  var mozName = "moz" + capitalized
  var wkName = "webkit" + capitalized
  if (object[mozName]) return object[mozName]
  if (object[wkName]) return object[wkName]
  return null;
}
