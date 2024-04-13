"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['config'], function (config) {
  //*******************************************************************************************************************
  // ** Game Audio
  //*******************************************************************************************************************
  var Audio = /*#__PURE__*/function () {
    function Audio() {
      _classCallCheck(this, Audio);

      this.cache = {
        sfx: {},
        ost: {}
      };
      this.ost = null;
      this.sfxVolume = config.sfxDefaultVolume;
      this.ostVolume = config.ostDefaultVolume;
    }

    _createClass(Audio, [{
      key: "playSfx",
      value: function playSfx(name) {
        var sfx = this.cache.sfx[name];

        if (sfx && config.loadSfx) {
          sfx.play();
          sfx.volume(this.sfxVolume);
        }
      }
    }, {
      key: "playOst",
      value: function playOst(name) {
        var ost = this.cache.ost[name];

        if (ost && config.loadOst) {
          this.ost = ost;
          this.ost.stop();
          this.ost.volume(config.ostDefaultVolume);
          this.ost.play();
        }
      }
    }, {
      key: "stopOst",
      value: function stopOst() {
        if (this.ost && this.enableOst) {
          this.ost.fade(1, 0, 1000);
        }
      }
    }, {
      key: "setSfxVolume",
      value: function setSfxVolume(volume) {
        this.sfxVolume = volume;
      }
    }, {
      key: "setOstVolume",
      value: function setOstVolume(volume) {
        this.ostVolume = volume;

        if (this.ost) {
          this.ost.volume(volume);
        }
      }
    }, {
      key: "fadeOst",
      value: function fadeOst(on) {
        var startVolume = on ? this.ostVolume * 0.6 : this.ostVolume;
        var endVolume = on ? this.ostVolume : this.ostVolume * 0.6;

        if (this.ost) {
          this.ost.fade(startVolume, endVolume, 300);
        }
      }
    }]);

    return Audio;
  }();

  return Audio;
});