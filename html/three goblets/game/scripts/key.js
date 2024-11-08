"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['dataKeys', 'dataMaps', 'stats'], function (DataKeys, DataMaps, Stats) {
  //*******************************************************************************************************************
  // ** Key
  //*******************************************************************************************************************
  var Key = /*#__PURE__*/function () {
    function Key(level) {
      _classCallCheck(this, Key);

      this.level = level;
      this.tier = level - 1;
      this.type = 10;
      this.rarity = 0;
      this.data = DataKeys[this.tier];
      this.icon = this.data.icon;
      this.unique = true;
      this.initializeStats();
      this.generate();
    }

    _createClass(Key, [{
      key: "initializeStats",
      value: function initializeStats() {
        this.stats = new Stats();
      }
    }, {
      key: "generate",
      value: function generate() {
        this.stats.addFromData(this.data);
      }
    }, {
      key: "tooltip",
      value: function tooltip() {
        return 'Key to ' + DataMaps[this.tier].name;
      }
    }, {
      key: "graphic",
      value: function graphic() {
        return 'key' + this.icon;
      }
    }]);

    return Key;
  }();

  return Key;
});