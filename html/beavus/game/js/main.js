var screenWidth = 800;
var screenHeight = 450;
var rotDevice;
var world;
var levl = 0;
var mu;
var vol = 1;
var ld;
var wait = 0;
var clickFX;
function addFocusAndDesktopDetection() {
  game.input.onDown.add(function (e) {
    if (e.isMouse) {
      game.device.desktop = true;
    }
    window.self.focus();
  }, this);
  game.input.keyboard.onDownCallback = function (e) {
    game.device.desktop = true;
  };
}
function unlockAllLevels() {
  if (!game) {
    return;
  }
  game.ldat = 16;
  if (levl == -1) {
    newState();
  }
}
var MainState = {
  preload: function () {
    addFocusAndDesktopDetection();
    world = this;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    game.stage.backgroundColor = "#000000";
    game.stage.disableVisibilityChange = true;
    game.load.image("rotateDevice", "assets/img/rotateDevice.png");
    game.load.image("CoolmathGamesLogo", "assets/img/CoolmathGamesLogo.jpg");
    game.load.image("loading1", "assets/img/loading1.png");
    game.load.image("preloadBar", "assets/img/preloadBar.png");
  },
  create: function () {
    var logo = this.add.sprite(0, 0, "CoolmathGamesLogo");
    logo.width = 800;
    logo.height = 450;
    logo.sendToBack();
    game.splashCT = 60 * 3;
    storageAvailable();
    if (game.storageAvailable) {
      game.ldat = localStorage.getItem("ldatBeavus");
    }
    if (!game.ldat) {
      game.ldat = 1;
    }
    game.scale.onOrientationChange.add(oriChange, game);
    oriChange();
  },
  update: function () {
    game.splashCT--;
    if (game.splashCT <= 0) {
      game.state.start("Loader");
    }
  },
};
function oriChange(e) {
  var ori = "landscape";
  if (
    game.scale.screenOrientation === "portrait-primary" ||
    game.scale.screenOrientation === "portrait-secondary"
  ) {
    ori = "portrait";
  }
  if (ori == "landscape") {
    if (rotDevice) {
      rotDevice.destroy();
      rotDevice = null;
    }
    if (!game.keepPaused) {
      game.paused = false;
    }
  } else {
    game.keepPaused = null;
    if (game.paused) {
      game.keepPaused = true;
    }
    game.paused = true;
    rotDevice = game.add.sprite(0, 0, "rotateDevice");
    rotDevice.anchor.setTo(0);
    rotDevice.fixedToCamera = true;
  }
}
var arr = ["coolmathgames.com"];
function storageAvailable() {
  game.storageAvailable = true;
  if (typeof localStorage === "object") {
    try {
      localStorage.setItem("localStorage", 1);
      localStorage.removeItem("localStorage");
    } catch (e) {
      Storage.prototype._setItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function () {};
      game.storageAvailable = false;
    }
  } else {
    game.storageAvailable = false;
  }
}
function newState() {
  game.paused = false;
  game.world.setBounds(0, 0, 800, 450);
  if (levl > 16) {
    levl = -9;
  }
  if (levl > 0) {
    game.state.start("Level");
    return;
  }
  if (levl == 0) {
    game.state.start("Title");
    return;
  }
  if (levl == -1) {
    game.state.start("LevelSelect");
    return;
  }
  if (levl == -9) {
    game.state.start("GameOver");
    return;
  }
}
function click() {}
var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO);
game.preserveDrawingBuffer = true;
game.state.add("Main", MainState);
game.state.add("Loader", LoaderState);
game.state.add("Title", TitleState);
game.state.add("LevelSelect", LevelSelectState);
game.state.add("Level", LevelState);
game.state.add("GameOver", GameOverState);
var tld = window.self.location.hostname.split(".").splice(-2).join(".");
if (arr.indexOf(tld) >= 0) {
  game.state.start("Main");
} else {
  game.state.start("Main");
}
function settings(st) {
  addFocusAndDesktopDetection();
  st.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  st.scale.pageAlignHorizontally = true;
  st.scale.pageAlignVertically = true;
  game.stage.backgroundColor = "#000000";
}
function muPlay(st, vol) {
  var m = false;
  if (mu && mu.key != st) {
    var m = mu.mute;
    mu.stop();
    mu.destroy();
    mu = null;
  }
  if (!mu) {
    mu = game.add.audio(st);
    mu.mute = m;
    mu.xVol = vol;
    game.sound.setDecodedCallback([mu], soundsDecoded, game);
  }
}
function fxPlay(fx) {
  if (!game.muteFX) {
    fx.play();
  }
}
function clickSound() {
  if (!game.muteFX) {
    clickFX.play();
  }
}
function soundsDecoded() {
  mu.play(null, 0, vol * mu.xVol, true);
  setMuFXBtns();
}
