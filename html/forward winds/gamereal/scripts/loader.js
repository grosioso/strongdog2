"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'config', 'howler', 'pixi'], function (game, config, Howler, PIXI) {
  //*******************************************************************************************************************
  // ** Asset Loader
  //*******************************************************************************************************************
  var Loader = /*#__PURE__*/function () {
    function Loader() {
      _classCallCheck(this, Loader);

      this.callback = null;
      this.remaining = 0;
      this.total = 0;
      this.backgroundSprite = null;
      this.progressSprite = null;
    }

    _createClass(Loader, [{
      key: "sfxFiles",
      value: function sfxFiles() {
        return config.loadSfx == false ? [] : ['attack', 'brew', 'buzzer', 'congratulation', 'drink', 'enemy_roar', 'equip', 'fell', 'hit', 'intro', 'levelup', 'select', 'smelt', 'switch', 'victory'];
      }
    }, {
      key: "ostFiles",
      value: function ostFiles() {
        return config.loadOst == false ? [] : ['track'];
      }
    }, {
      key: "imageFiles",
      value: function imageFiles() {
        return ['agLogoIcon', 'entities.json', 'fwIconset', 'fwTileset', 'fwBackground', 'fwTitle', 'fwWinscreen', 'fwWinscreenLink' // 'MunroFont.fnt'
        ];
      }
    }, {
      key: "load",
      value: function load(callback) {
        this.callback = callback;
        this.addLoadingSprites();
        this.calculateRemaining();
        this.loadAudio();
        this.loadImages();
        this.checkLoadingFinished();
      }
    }, {
      key: "calculateRemaining",
      value: function calculateRemaining() {
        this.remaining = this.sfxFiles().length + this.ostFiles().length + 1;
        this.total = this.remaining;
      }
    }, {
      key: "addLoadingSprites",
      value: function addLoadingSprites() {
        this.backgroundSprite = game.graphics.addBackground(0, 0, 'Loadscreen');
        this.progressSprite = game.graphics.addLoadingBar(88, 30, this);
        game.graphics.update();
      }
    }, {
      key: "loadAudio",
      value: function loadAudio() {
        var _this = this;

        var sfxEntries = this.sfxFiles().map(function (name) {
          return {
            name: name,
            folder: 'sfx',
            cache: 'sfx'
          };
        });
        var ostEntries = this.ostFiles().map(function (name) {
          return {
            name: name,
            folder: 'ost',
            cache: 'ost'
          };
        });
        var all = sfxEntries.concat(ostEntries);
        all.forEach(function (_ref) {
          var name = _ref.name,
              folder = _ref.folder,
              cache = _ref.cache;
          var path = "assets/".concat(folder, "/").concat(name);
          var audio = new Howler.Howl({
            loop: folder == 'ost',
            src: [path + '.ogg', path + '.m4a'],
            onload: function onload() {
              return _this.onLoad();
            },
            onloaderror: function onloaderror() {
              return _this.onError();
            }
          });
          game.audio.cache[cache][name] = audio;
        });
      }
    }, {
      key: "loadImages",
      value: function loadImages() {
        var _this2 = this;

        var images = this.imageFiles();
        images.forEach(function (name) {
          var ext = name.includes('.') ? '' : '.png';
          var path = "assets/".concat(name).concat(ext);
          PIXI.Loader.shared.add(path);
        });
        PIXI.Loader.shared.load(function (loader, resources) {
          game.graphics.generateIconsetVariations();

          _this2.onLoad();
        });
      }
    }, {
      key: "onLoad",
      value: function onLoad() {
        this.remaining -= 1;
        this.refreshVisuals();
        this.checkLoadingFinished();
      }
    }, {
      key: "refreshVisuals",
      value: function refreshVisuals() {
        this.progressSprite.update();
        game.graphics.update();
      }
    }, {
      key: "onError",
      value: function onError() {
        console.log('Error Loading File');
      }
    }, {
      key: "checkLoadingFinished",
      value: function checkLoadingFinished() {
        if (this.remaining == 0) {
          this.progressSprite.destroy();
          this.backgroundSprite.destroy();

          if (config.showAdventaleLogo) {
            this.displayAdventaleLogo();
          } else {
            this.callback();
          }
        }
      }
    }, {
      key: "displayAdventaleLogo",
      value: function displayAdventaleLogo() {
        var _this3 = this;

        this.backgroundSprite = game.graphics.addBackground(0, 0, 'AdventaleLogo');

        if (config.adventaleWebsite) {
          this.backgroundSprite.interactive = true;
          this.backgroundSprite.cursor = 'pointer';
          this.backgroundSprite.on('click', function (e) {
            var win = window.open(config.adventaleWebsite, '_blank');

            if (win) {
              win.focus();
            }
          });
        }

        game.graphics.update();
        game.audio.playSfx('intro');
        setTimeout(function () {
          _this3.backgroundSprite.destroy();

          _this3.callback();
        }, 2800);
      }
    }]);

    return Loader;
  }();

  return Loader;
});