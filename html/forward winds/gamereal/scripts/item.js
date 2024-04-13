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

define(['stats', 'dataItems'], function (Stats, DataItems) {
  //*******************************************************************************************************************
  // ** An Item
  //*******************************************************************************************************************
  var Item = /*#__PURE__*/function () {
    function Item(type, level, rarity) {
      _classCallCheck(this, Item);

      this.type = type;
      this.level = level;
      this.rarity = rarity;
      this.data = DataItems[this.type];
      this.stats = new Stats();
      this.generate();
    }

    _createClass(Item, [{
      key: "generate",
      value: function generate() {
        var _this = this;

        this.icon = this.getIcon();
        this.data.stats.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 3),
              stat = _ref2[0],
              base = _ref2[1],
              formula = _ref2[2];

          _this.stats[stat] = _this.getValue(base, formula);
        });
      }
    }, {
      key: "getIcon",
      value: function getIcon() {
        var tierLevel = this.level + this.rarity * 0.5;
        return this.data.icon + Math.min(Math.floor((tierLevel + this.data.iconOffset) / this.data.iconThreshold), 12);
      }
    }, {
      key: "getValue",
      value: function getValue(base, formula) {
        return this[formula + 'Formula'](base);
      }
    }, {
      key: "mainFormula",
      value: function mainFormula(base) {
        var tierLevel = this.level + this.rarity * 0.5;
        return Math.ceil(base * (1.3 * Math.pow(tierLevel, 1.3) + 1.1 * Math.pow(1.2, tierLevel)));
      }
    }, {
      key: "bowPowerFormula",
      value: function bowPowerFormula(base) {
        var tierLevel = this.level + this.rarity * 0.5;
        var effectiveTierLevel = Math.max(tierLevel - 12 * this.stats.arr, 1);
        return 80 + Math.ceil(base * Math.pow(effectiveTierLevel, 0.5));
      }
    }, {
      key: "arrowFormula",
      value: function arrowFormula(base) {
        var tierLevel = this.level + this.rarity * 0.5;
        var effectiveTierLevel = tierLevel + 2;
        return Math.max(Math.floor(1 / base * effectiveTierLevel), 1);
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "tooltip",
      value: function tooltip() {
        if (this.type == 3) {
          return "".concat(this.stats.bpw, "% DMG, ").concat(this.stats.arr, "A");
        } else {
          return this.stats.tooltip();
        }
      }
    }, {
      key: "liquid",
      value: function liquid() {
        return 15 + Math.round(4 * Math.pow(1.4, this.level));
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          type: this.type,
          level: this.level,
          rarity: this.rarity
        };
      }
    }]);

    return Item;
  }();

  return Item;
});