"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

define(['game', 'panelBase', 'dataStats'], function (game, PanelBase, DataStats) {
  //*******************************************************************************************************************
  // ** Panel for Stat display
  //*******************************************************************************************************************
  var PanelStats = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelStats, _PanelBase);

    var _super = _createSuper(PanelStats);

    function PanelStats(position, active) {
      _classCallCheck(this, PanelStats);

      return _super.call(this, position, active);
    }

    _createClass(PanelStats, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelStats.prototype), "initialize", this).call(this);

        this.basicStats = [['mhp', 3.2, 1 / 2], ['dmg', 1.3, 1 / 3], ['arm', 1.1, 1 / 2], ['aps', 0.6, 1 / 6]];
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.labels.basicPoints = {
          x: 4,
          y: 56
        };
        this.bars.stats = {
          x: 8,
          y: 4,
          w: 128,
          h: 11,
          s: 1,
          n: 4,
          l: 1
        };
        this.bars.plus = {
          x: 141,
          y: 5,
          w: 9,
          h: 9,
          s: 3,
          n: 4,
          l: 1
        };
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "statsBarSetupSprites",
      value: function statsBarSetupSprites(sprites, rect, index) {
        sprites.stat = game.graphics.addText(rect.x, rect.y, '');
        sprites.value = game.graphics.addText(rect.x + rect.w, rect.y, '');
        sprites.value.anchor.x = 1.0;
      }
    }, {
      key: "plusBarSetupSprites",
      value: function plusBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 0, 2);
        sprites.icon = game.graphics.addText(rect.x + rect.w / 2, rect.y + rect.h / 2, '+');
        sprites.icon.anchor.x = 0.5;
        sprites.icon.anchor.y = 0.5;
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "statsBarUpdateSprites",
      value: function statsBarUpdateSprites(sprites, rect, index) {
        var stat = DataStats.find(function (s) {
          return s.index == index;
        });
        sprites.stat.text = stat ? stat.real : '';
        sprites.value.text = stat ? game.player[stat.name] : '';
        sprites.stat.tint = stat && game.player[stat.name] > 0 ? 0xffffff : 0x4f4f4f;
        sprites.value.tint = stat && game.player[stat.name] > 0 ? 0xffffff : 0x4f4f4f;
      }
    }, {
      key: "plusBarUpdateSprites",
      value: function plusBarUpdateSprites(sprites, rect, index) {
        var havePoints = game.player.basicPoints > 0;
        var borderColor = havePoints ? 3 : 2;
        sprites.rect.visible = this.availableAt(index);
        sprites.icon.visible = this.availableAt(index);
        sprites.icon.tint = havePoints ? 0xffffff : 0x4f4f4f;
        game.graphics.redrawRect(sprites.rect, rect, 0, borderColor);
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "plusBarClicked",
      value: function plusBarClicked(index) {
        var _this$basicStats$inde = _slicedToArray(this.basicStats[index], 3),
            name = _this$basicStats$inde[0],
            value = _this$basicStats$inde[1],
            allowed = _this$basicStats$inde[2];

        if (game.player.basicPoints > 0 && this.availableAt(index)) {
          game.player.basicStats[name] += this.addValue(index);
          game.player.basicSpent[name] += 1;
          game.player.basicPoints -= 1;
          game.audio.playSound('stat');
        }

        game.player.refreshStats();
        game.player.reset();
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************

    }, {
      key: "statsBarUpdateTooltip",
      value: function statsBarUpdateTooltip(rect, index) {
        var stat = DataStats.find(function (s) {
          return s.index == index;
        });
        this.setTooltip(rect.x, rect.y, stat ? stat.tooltip : '');
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "basicPointsLabelText",
      value: function basicPointsLabelText() {
        var s = game.player.basicPoints > 1 ? 's' : '';
        return game.player.basicPoints > 0 ? '' + game.player.basicPoints + ' point' + s : '';
      }
    }, {
      key: "addValue",
      value: function addValue(index) {
        var current = this.totalPointsSpent() + 1;
        return this.valueAtBasicLevel(current, index) - this.valueAtBasicLevel(current - 1, index);
      }
    }, {
      key: "valueAtBasicLevel",
      value: function valueAtBasicLevel(basicLevel, index) {
        var _this$basicStats$inde2 = _slicedToArray(this.basicStats[index], 3),
            name = _this$basicStats$inde2[0],
            value = _this$basicStats$inde2[1],
            allowed = _this$basicStats$inde2[2];

        if (index == 3) {
          return (8 * basicLevel + 0.03 * Math.pow(basicLevel, 2)) * value;
        }

        return (6 * basicLevel + 3 * Math.pow(basicLevel, 2)) * value;
      }
    }, {
      key: "totalPointsSpent",
      value: function totalPointsSpent() {
        return Object.values(game.player.basicSpent).reduce(function (t, v) {
          return t + v;
        }, 0);
      }
    }, {
      key: "currentBasicValue",
      value: function currentBasicValue(index) {
        var _this$basicStats$inde3 = _slicedToArray(this.basicStats[index], 3),
            name = _this$basicStats$inde3[0],
            value = _this$basicStats$inde3[1],
            allowed = _this$basicStats$inde3[2];

        return game.player.basicStats[name]; // let basicLevel = game.player.basicSpent[name]
        // return this.valueAtBasicLevel(basicLevel, index)
      }
    }, {
      key: "maximumPotentialValue",
      value: function maximumPotentialValue(index) {
        var basicLevel = this.totalPointsSpent() + 1;
        return this.valueAtBasicLevel(basicLevel, index);
      }
    }, {
      key: "availableAt",
      value: function availableAt(index) {
        var _this$basicStats$inde4 = _slicedToArray(this.basicStats[index], 3),
            name = _this$basicStats$inde4[0],
            value = _this$basicStats$inde4[1],
            allowed = _this$basicStats$inde4[2];

        return this.currentBasicValue(index) < allowed * this.maximumPotentialValue(index); // let [name, value, allowed] = this.basicStats[index]
        // return game.player.basicSpent[name] < allowed * game.player.lvl
      }
    }]);

    return PanelStats;
  }(PanelBase);

  return PanelStats;
});