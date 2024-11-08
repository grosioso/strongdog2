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

define(['game', 'howler'], function (game, Howler) {
  //*******************************************************************************************************************
  // ** Responsible for preloading assets
  //*******************************************************************************************************************
  var Loader = /*#__PURE__*/function () {
    function Loader() {
      _classCallCheck(this, Loader);

      this.remaining = 0;

      this.callback = function () {};

      this.audioExtension = this.checkOggSupport() ? '.ogg' : '.m4a';
      this.videoExtension = this.getVideoExtension();
      game.graphics.setVideoExtension(this.videoExtension);
    }

    _createClass(Loader, [{
      key: "graphicFiles",
      value: function graphicFiles() {
        return [];
      }
    }, {
      key: "soundFiles",
      value: function soundFiles() {
        return !game.config.loadAudio ? [] : ['attack', 'battle', 'buzzer', 'claim', 'equip', 'hit', 'pick', 'put', 'select', 'sell', 'stat', 'victory'];
      }
    }, {
      key: "soundtrackFiles",
      value: function soundtrackFiles() {
        return !game.config.loadAudio ? [] : ['soundtrack'];
      }
    }, {
      key: "load",
      value: function load(callback) {
        this.setCallback(callback);
        this.setRemaining();
        this.loadGraphics();
        this.loadSounds();
        this.loadSoundtracks();
      }
    }, {
      key: "setCallback",
      value: function setCallback(callback) {
        this.callback = callback;
      }
    }, {
      key: "setRemaining",
      value: function setRemaining() {
        this.remaining = 1 + this.soundFiles().length + this.soundtrackFiles().length;
      }
    }, {
      key: "loadGraphics",
      value: function loadGraphics() {
        var _this = this;

        game.graphics.loadResources(function () {
          return _this.onLoad();
        });
      }
    }, {
      key: "loadSounds",
      value: function loadSounds() {
        var _this2 = this;

        var files = this.soundFiles();
        files.forEach(function (name) {
          var path = 'assets/sounds/' + name + _this2.audioExtension;
          var audio = new Howler.Howl({
            src: [path],
            onload: function onload() {
              return _this2.onLoad();
            },
            onloaderror: function onloaderror() {
              return _this2.onError();
            },
            autoplay: false
          });
          game.audio.prepareSound(name, audio);
        });
      }
    }, {
      key: "loadSoundtracks",
      value: function loadSoundtracks() {
        var _this3 = this;

        var files = this.soundtrackFiles();
        files.forEach(function (name) {
          var path = 'assets/soundtracks/' + name + _this3.audioExtension;
          var audio = new Howler.Howl({
            src: [path],
            onload: function onload() {
              return _this3.onLoad();
            },
            onloaderror: function onloaderror() {
              return _this3.onError();
            },
            autoplay: false
          });
          game.audio.prepareSoundtrack(audio);
        });
      }
    }, {
      key: "onLoad",
      value: function onLoad() {
        this.remaining -= 1;

        if (this.remaining == 0) {
          this.callback();
        }
      }
    }, {
      key: "onError",
      value: function onError() {
        console.log('Error loading asset!');
      }
    }, {
      key: "checkOggSupport",
      value: function checkOggSupport() {
        var a = document.createElement('audio');
        return !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
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
      } //*******************************************************************************************************************
      // ** Preload
      //*******************************************************************************************************************

    }, {
      key: "preload",
      value: function preload(callback) {
        this.setCallback(callback);
        this.loadInitRemaining();
        this.loadInitGraphics();
      }
    }, {
      key: "loadInitRemaining",
      value: function loadInitRemaining() {
        this.remaining = 1;
      }
    }, {
      key: "loadInitGraphics",
      value: function loadInitGraphics() {
        var _this4 = this;

        game.graphics.loadInitResources(game.config, function () {
          return _this4.onLoad();
        });
      }
    }]);

    return Loader;
  }();

  return Loader;
});