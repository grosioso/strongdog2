"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'stats', 'dataItems'], function (game, Stats, DataItems) {
  //*******************************************************************************************************************
  // ** An Item
  //*******************************************************************************************************************
  var ItemUsable = /*#__PURE__*/function () {
    function ItemUsable(data, level) {
      _classCallCheck(this, ItemUsable);

      this.data = data;
      this.level = level;
      this.stats = new Stats();
      this.potion = true;
      this.generate();
    } //*******************************************************************************************************************
    // * Generate
    //*******************************************************************************************************************


    _createClass(ItemUsable, [{
      key: "generate",
      value: function generate() {
        this.icon = this.data.icon || 128 + Math.floor(this.level / 7);

        if (this.data.effect.includes('Stat')) {
          this[this.data.effect + 'Generate'].apply(this, _toConsumableArray(this.data.params));
        }
      }
    }, {
      key: "customStatGenerate",
      value: function customStatGenerate(statData) {
        this.stats.addFromData(statData);
      }
    }, {
      key: "randomStatGenerate",
      value: function randomStatGenerate() {
        var stat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var names = ['dmg', 'mhp', 'arm'];
        var type = stat ? names.indexOf(stat) : Math.floor(Math.random() * 3);
        var base = DataItems[type].stats[0][1];
        var statName = stat || names[type];
        var statData = {
          stats: [[statName, this.getValue(base)]]
        };
        this.stats.addFromData(statData);
      }
    }, {
      key: "getValue",
      value: function getValue(base) {
        var formula = function formula(level) {
          return Math.floor(base * (0.8 * level + 2.2 * Math.pow(level, 1.3) + 0.4 * Math.pow(1.2, level)));
        };

        var tierLevel = this.level;
        var value = formula(tierLevel) - formula(Math.max(tierLevel - 2, 0));

        var _final = Math.ceil(value * (0.75 + Math.random() * 0.5));

        return _final;
      } //*******************************************************************************************************************
      // * Use
      //*******************************************************************************************************************

    }, {
      key: "use",
      value: function use() {
        this[this.data.effect + 'Use'].apply(this, _toConsumableArray(this.data.params));
      }
    }, {
      key: "customStatUse",
      value: function customStatUse() {
        this.applyStats();
      }
    }, {
      key: "randomStatUse",
      value: function randomStatUse() {
        this.applyStats();
      }
    }, {
      key: "applyStats",
      value: function applyStats() {
        game.character.potionStats.push(this.stats);
      }
    }, {
      key: "experienceUse",
      value: function experienceUse(amount) {
        game.character.experience += amount;
      }
    }, {
      key: "skillPointUse",
      value: function skillPointUse(points) {
        game.character.skillPoints += points;
      }
    }, {
      key: "unlockArcheryUse",
      value: function unlockArcheryUse() {
        game.character.gainItem(game.loot.generateShopItem(3));
        game.loot.unlockItemType(4);
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "mainStatValue",
      value: function mainStatValue() {
        return this.stats[this.data.stat];
      }
    }, {
      key: "tooltip",
      value: function tooltip() {
        var customTooltip = this.data.tooltip;
        var statTooltip = this.stats.tooltip(true);
        return customTooltip || statTooltip;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          potion: true,
          level: this.level,
          data: this.data,
          statData: this.stats.toJSON()
        };
      }
    }]);

    return ItemUsable;
  }();

  return ItemUsable;
});