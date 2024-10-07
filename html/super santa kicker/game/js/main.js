var screenWidth = 720;
var screenHeight = 440;
var rotDevice;
var world;
var levl = 0;
var mu;
var vol = 1;
var ld;
var wait = 0;
var clickFX;
var screenShot;

function unlockAllLevels() {
    if (!game) {
        return;
    }
    game.ldat = 36;
    if (levl == -1) {
        newState();
    }
}

function addFocusAndDesktopDetection() {
    game.input.onDown.add(function(e) {
        if (e.isMouse) {
            game.device.desktop = true;
        }
        window.self.focus();
    }, this);
    game.input.keyboard.onDownCallback = function(e) {
        game.device.desktop = true;
    };
}
var MainState = {
    preload: function() {
        addFocusAndDesktopDetection();
        world = this;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        game.stage.backgroundColor = "#000000";
        game.load.image('black', 'assets/pics/black.gif');
        game.load.image('rotateDevice', 'assets/pics/rotateDevice.gif');
        game.load.image('CoolmathGamesLogo', 'assets/pics/CoolmathGamesLogo.jpg');
        game.load.image('loading1', 'assets/pics/loading1.gif');
        game.load.image('preloadBar', 'assets/pics/preloadBar.gif');
    },
    create: function() {
        world.logo = this.add.sprite(0, 0, 'CoolmathGamesLogo');
        world.logo.anchor.setTo(0);
        world.logo.sendToBack();
        game.splashCT = 60 * 3;
        storageAvailable();
        if (game.storageAvailable) {
            game.ldat = localStorage.getItem('ldatSSK');
        }
        if (!game.ldat) {
            game.ldat = 1;
        }
    },
    update: function() {
        game.splashCT--;
        if (game.splashCT <= 0) {
            game.state.start('Loader');
            game.scale.onOrientationChange.add(oriChange, game);
            oriChange();
        }
    },
    render: function() {
        if (rotDevice) {
            rotDevice.x = game.camera.x;
            rotDevice.y = game.camera.y;
            game.world.bringToTop(rotDevice);
        }
    }
};

function oriChange(e) {
    var ori = 'landscape';
    if (game.scale.screenOrientation === 'portrait-primary' || game.scale.screenOrientation === 'portrait-secondary') {
        ori = 'portrait';
    }
    if (ori == 'landscape') {
        if (rotDevice) {
            rotDevice.destroy();
            rotDevice = null;
        }
        if (!game.keepPaused) {
            game.paused = false;
            muResume();
        }
    } else {
        game.keepPaused = null;
        if (game.paused) {
            game.keepPaused = true;
        }
        muPause();
        rotDevice = game.add.group();
        rotDevice.x = game.camera.x;
        rotDevice.y = game.camera.y;
        rotDevice.rd = rotDevice.create(0, 0, 'rotateDevice');
        game.paused = true;
    }
}
var arr = ['coolmath-games.com', 'coolmathgames.com', 'cmatgame.local'];

function storageAvailable() {
    game.storageAvailable = false;
    game.ldat = 1;
    if (typeof localStorage === 'object') {
        try {
            localStorage.setItem('localStorage', 1);
            localStorage.removeItem('localStorage');
            game.storageAvailable = true;
        } catch (e) {
            Storage.prototype._setItem = Storage.prototype.setItem;
            Storage.prototype.setItem = function() {};
            game.storageAvailable = false;
        }
    } else {
        game.storageAvailable = false;
    }
}

function newState() {
    game.paused = false;
    if (levl > 36) {
        levl = -9;
    }
    if (levl > 0) {
        game.state.start('Level');
        return;
    }
    if (levl == 0) {
        game.state.start('Title');
        return;
    }
    if (levl == -1) {
        game.state.start('LevelSelect');
        return;
    }
    if (levl == -9) {
        game.state.start('GameOver');
        return;
    }
}

function click() {}
var game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO);
game.preserveDrawingBuffer = true;
game.state.add('Main', MainState);
game.state.add('Loader', LoaderState);
game.state.add('Title', TitleState);
game.state.add('Level', LevelState);
game.state.add('LevelSelect', LevelSelectState);
game.state.add('GameOver', GameOverState);
var tld = window.self.location.hostname.split(".").splice(-2).join('.');
if (arr.indexOf(tld) >= 0) {
    game.state.start('Main');
} else {
    game.state.start('Main');
}

function settings(st) {
    addFocusAndDesktopDetection();
    st.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    st.scale.pageAlignHorizontally = true;
    st.scale.pageAlignVertically = true;
    game.stage.backgroundColor = "#000000";
}

function muPlay(st, vol, loop) {
    var m = false;
    if (mu && mu.key != st) {
        var m = mu.mute;
        mu.stop();
        mu.destroy();
        mu = null;
    }
    if (!mu) {
        mu = game.add.audio(st);
        mu.loop = false;
        if (loop) {
            mu.loop = true;
        }
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

function muPause() {
    if (mu) {
        mu.pause();
    }
}

function muResume() {
    if (mu) {
        mu.resume();
    }
}

function soundsDecoded() {
    mu.play(null, 0, vol * mu.xVol, mu.loop);
    setMuFXBtns();
}

function muteFX() {
    if (game.muteFX) {
        game.muteFX = false;
        clickSound();
    } else {
        clickSound();
        game.muteFX = true;
    }
    setMuFXBtns();
}

function muteMu() {
    clickSound();
    if (game.muteMu) {
        game.muteMu = false;
    } else {
        game.muteMu = true;
    }
    mu.mute = game.muteMu;
    setMuFXBtns();
}

function setMuFXBtns() {
    if (!game.btnMu) {
        return;
    }
    if (game.muteMu) {
        game.btnMu.frame = 1;
    } else {
        game.btnMu.frame = 0;
    }
    if (game.muteFX) {
        game.btnFX.frame = 1;
    } else {
        game.btnFX.frame = 0;
    }
}