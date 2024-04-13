"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'pixi', 'howler'], function (game, PIXI, Howler) {
  //*******************************************************************************************************************
  // ** The Intro resource Preloader
  //*******************************************************************************************************************
  var Preloader = /*#__PURE__*/function () {
    function Preloader() {
      _classCallCheck(this, Preloader);

      this.onFullLoad = function () {
        return console.log('No Callback Specified');
      };

      this.timer = 1;
      this.logoLoader = new PIXI.Loader();
      this.logo = null;
      this.logoAudio = null;
      this.audioLoaded = false;
      this.audioPlaying = false;
      this.logoReady = false;
      this.essentialReady = false;
      this.videoExtension = this.getVideoExtension();
    }

    _createClass(Preloader, [{
      key: "load",
      value: function load(callback) {
        this.setCallback(callback);
        this.preloadEssential();
        this.loadLogo();
        this.loadLogoAudio();
      }
    }, {
      key: "preloadEssential",
      value: function preloadEssential() {
        var _this = this;

        var essential = ['assets/fwLoadscreen.png', 'assets/fwAdventaleLogo.png', 'assets/MunroFont.fnt'];
        essential.forEach(function (path) {
          PIXI.Loader.shared.add(path);
        });
        PIXI.Loader.shared.load(function (loader, resources) {
          game.graphics.generateColoredFonts();
          _this.essentialReady = true;

          _this.update();
        });
      }
    }, {
      key: "setCallback",
      value: function setCallback(callback) {
        this.onFullLoad = callback;
      }
    }, {
      key: "loadLogo",
      value: function loadLogo() {
        var _this2 = this;

        var _game$config$logo = _slicedToArray(game.config.logo, 2),
            logo = _game$config$logo[0],
            url = _game$config$logo[1];

        if (logo) {
          var loader = this.logoLoader;
          loader.add('logo', 'assets/videos/' + logo + '.' + this.videoExtension);
          loader.onComplete.add(function (l, r) {
            return _this2.onComplete(l, r, url);
          });
          loader.load();
        } else {
          this.logoReady = true;
          this.timer = 1;
          this.update();
        }
      }
    }, {
      key: "loadLogoAudio",
      value: function loadLogoAudio() {
        var _this3 = this;

        var _game$config$logo2 = _slicedToArray(game.config.logo, 2),
            logo = _game$config$logo2[0],
            url = _game$config$logo2[1];

        if (logo) {
          var source = 'assets/videos/' + logo + '.' + this.videoExtension;
          this.logoAudio = new Howler.Howl({
            src: [source],
            volume: 0.5,
            onload: function onload(a, b) {
              _this3.audioLoaded = true;
            }
          });
        }
      }
    }, {
      key: "onComplete",
      value: function onComplete(loader, resources, url) {
        var resource = resources.logo;
        var videoTexture = PIXI.Texture.from(resource.url);
        videoTexture.baseTexture.resource.source.muted = true;
        game.graphics.renderer.backgroundColor = game.graphics.colors[0];
        this.logo = new PIXI.Sprite(videoTexture);
        this.logo.scale.x = 0.25;
        this.logo.scale.y = 0.25;
        this.logo.x = 88 - resource.data.videoWidth / 2 / 4;
        this.logo.y = 77 - resource.data.videoHeight / 2 / 4;
        this.logo.interactive = true;
        this.logo.cursor = 'pointer';
        this.logo.on('click', function (e) {
          var win = window.open(url, '_blank');

          if (win) {
            win.focus();
          }
        });
        game.graphics.layers.base.addChild(this.logo);
        this.timer = Math.ceil(resource.data.duration * 60);
        this.logoReady = true;
        this.update();
      }
    }, {
      key: "update",
      value: function update() {
        var _this4 = this;

        if (this.timer > 0 && this.essentialReady && this.logoReady) {
          var callback = function callback() {
            _this4.update();
          };

          requestAnimationFrame(callback);
          game.graphics.update();
          this.updateAudio();
          this.updateTimer();
          this.updateEnd();
        }
      }
    }, {
      key: "updateAudio",
      value: function updateAudio() {
        if (this.logoAudio && this.audioLoaded && !this.audioPlaying) {
          this.logoAudio.volume(0.25);
          this.logoAudio.play();
          this.logoAudio.seek(this.logoAudio.duration() - this.timer / 60);
          this.audioPlaying = true;
        }
      }
    }, {
      key: "updateTimer",
      value: function updateTimer() {
        this.timer = Math.max(this.timer - 1, 0);
      }
    }, {
      key: "updateEnd",
      value: function updateEnd() {
        if (this.timer == 0) {
          this.exitPreload();
          this.onFullLoad();
        }
      }
    }, {
      key: "exitPreload",
      value: function exitPreload() {
        if (this.logo) {
          this.logo.destroy();
          game.graphics.renderer.backgroundColor = game.graphics.colors[1];
        }

        this.logoLoader.reset(); //PIXI.utils.clearTextureCache()
      }
    }, {
      key: "getVideoExtension",
      value: function getVideoExtension() {
        var supports = {
          ogv: false,
          webm: false,
          m4v: false
        };
        var v = document.createElement('video');
        supports.ogv = !!(v.canPlayType && v.canPlayType('video/ogv; codecs="theora, vorbis"'));
        supports.webm = !!(v.canPlayType && v.canPlayType('video/webm; codecs="vp8, vorbis"'));
        supports.m4v = !!(v.canPlayType && v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));

        var _ref = Object.entries(supports).filter(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              ext = _ref4[0],
              supported = _ref4[1];

          return supported;
        })[0] || [],
            _ref2 = _slicedToArray(_ref, 1),
            extension = _ref2[0];

        return extension;
      }
    }]);

    return Preloader;
  }();

  return Preloader;
});