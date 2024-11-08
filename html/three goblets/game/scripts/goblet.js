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

define(['dataGoblets', 'stats'], function (DataGoblets, Stats) {
  //*******************************************************************************************************************
  // ** Goblet
  //*******************************************************************************************************************
  var Goblet = /*#__PURE__*/function () {
    function Goblet(level) {
      _classCallCheck(this, Goblet);

      this.level = level;
      this.type = 9;
      this.rarity = 0;
      this.data = DataGoblets[this.level - 1];
      this.icon = this.data.icon;
      this.duration = this.data.duration;
      this.unique = true;
      this.initializeStats();
      this.generate();
    }

    _createClass(Goblet, [{
      key: "initializeStats",
      value: function initializeStats() {
        this.stats = new Stats();
      }
    }, {
      key: "generate",
      value: function generate() {
        this.stats.addFromData(this.data);
        this.mainStat = this.stats.getFirst();
      }
    }, {
      key: "tooltip",
      value: function tooltip(player) {
        var _this = this;

        var stats = ['hph', 'buf', 'spe', 'bld', 'ste', 'pla', 'men', 'gdr', 'bst'];
        var text = '';
        text += 'Used when Life drops below ' + (100 - 25 * this.level) + '%.\n';
        Object.entries(this.data.tooltips).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              name = _ref2[0],
              tooltip = _ref2[1];

          if (player[name] > 0 || name == _this.mainStat.name) {
            text += tooltip(player, _this);
          }
        });
        text += 'Lasts ' + this.getDuration(player) + ' seconds.';
        return text;
      }
    }, {
      key: "graphic",
      value: function graphic() {
        return 'goblet' + this.icon;
      } //*******************************************************************************************************************
      // * Stat Calculations
      //*******************************************************************************************************************

    }, {
      key: "getDuration",
      value: function getDuration(player) {
        return this.duration + (this.level == 1 ? player.gdr : 0);
      }
    }, {
      key: "getStateStats",
      value: function getStateStats(player) {
        var stats = {
          stats: [],
          inc: [],
          multis: [],
          added: []
        };
        this['get' + this.stats.realName(this.data.stats[0][0]) + 'StateStats'](stats, player);
        this.addGeneralStateStats(stats, player);
        return stats;
      }
    }, {
      key: "getBuffStateStats",
      value: function getBuffStateStats(stats, player) {
        stats.inc.push(['dmg', this.mainStat.value / 100]);
        stats.stats.push(['lfl', player.bld]);
        stats.multis.push(['arm', 1 + player.bld / 10]);
      }
    }, {
      key: "getSpeedStateStats",
      value: function getSpeedStateStats(stats, player) {
        stats.inc.push(['aps', this.mainStat.value / 100]);
        stats.multis.push(['aps', 1 + player.bst / 100]);
      }
    }, {
      key: "getHealStateStats",
      value: function getHealStateStats(stats, player) {
        stats.added.push(['mhp', 'hpr', this.mainStat.value / 100]);
      }
    }, {
      key: "addGeneralStateStats",
      value: function addGeneralStateStats(stats, player) {}
    }]);

    return Goblet;
  }();

  return Goblet;
});