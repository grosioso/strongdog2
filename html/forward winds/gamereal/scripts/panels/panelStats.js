"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

    function PanelStats(active) {
      _classCallCheck(this, PanelStats);

      return _super.call(this, active);
    }

    _createClass(PanelStats, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelStats.prototype), "initialize", this).call(this);

        this.width = 76;
        this.height = 98;
        this.x = 90;
        this.y = 10;
        this.attributeStats = [['mhp', 'HP'], ['dmg', 'ATK'], ['arm', 'DEF']];
        this.secondaryStats = ['cri', 'hpr', 'lch', 'iml', 'arr'];
        this.otherStats = [['experience', 'EXP'], ['level', 'LVL']];
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.bars.stats = {
          x: 6,
          y: 4,
          w: 56,
          h: 8,
          s: 0,
          n: 3,
          l: 1,
          delay: 20
        };
        this.bars.second = {
          x: 6,
          y: 28,
          w: 64,
          h: 8,
          s: 0,
          n: 5,
          l: 1,
          delay: 20
        };
        this.bars.other = {
          x: 6,
          y: 76,
          w: 64,
          h: 8,
          s: 0,
          n: 2,
          l: 1,
          delay: 20
        };
        this.bars.plus = {
          x: 63,
          y: 6,
          w: 7,
          h: 7,
          s: 1,
          n: 3,
          l: 1
        };
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "statsBarSetupSprites",
      value: function statsBarSetupSprites(sprites, rect, index) {
        var text = this.attributeStats[index][1];
        var value = game.character[this.attributeStats[index][0]];
        sprites.text = game.graphics.addText(rect.x, rect.y, text);
        sprites.value = game.graphics.addText(rect.x + rect.w, rect.y, value);
        sprites.value.anchor.x = 1;
      }
    }, {
      key: "secondBarSetupSprites",
      value: function secondBarSetupSprites(sprites, rect, index) {
        var stat = this.secondaryStats[index];
        var text = game.character.baseStats.realName(stat);
        var value = game.character[stat];
        sprites.text = game.graphics.addText(rect.x, rect.y, text);
        sprites.value = game.graphics.addText(rect.x + rect.w, rect.y, value);
        sprites.value.anchor.x = 1;
      }
    }, {
      key: "otherBarSetupSprites",
      value: function otherBarSetupSprites(sprites, rect, index) {
        var text = this.otherStats[index][1];
        var value = '';
        sprites.text = game.graphics.addText(rect.x, rect.y, text, 2);
        sprites.value = game.graphics.addText(rect.x + rect.w, rect.y, value, 2);
        sprites.value.anchor.x = 1;
      }
    }, {
      key: "plusBarSetupSprites",
      value: function plusBarSetupSprites(sprites, rect, index) {
        sprites.icon = game.graphics.addIcon(rect.x, rect.y, 17);
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "statsBarUpdateSprites",
      value: function statsBarUpdateSprites(sprites, rect, index) {
        var value = game.character[this.attributeStats[index][0]];
        sprites.value.text = value;
      }
    }, {
      key: "secondBarUpdateSprites",
      value: function secondBarUpdateSprites(sprites, rect, index) {
        var stat = this.secondaryStats[index];
        var value = game.character[stat];
        var textColor = value != 0 ? 3 : 2;
        sprites.value.text = value + (value != 0 && stat != 'arr' ? '%' : '');
        sprites.text.font = '10px Munro' + textColor;
        sprites.value.font = '10px Munro' + textColor;
      }
    }, {
      key: "otherBarUpdateSprites",
      value: function otherBarUpdateSprites(sprites, rect, index) {
        var value = '';

        if (index == 0) {
          value += game.character[this.otherStats[index][0]] + '/' + game.character.experienceForNextLevel();
        } else {
          value += game.character[this.otherStats[index][0]];
        }

        sprites.value.text = value;
      }
    }, {
      key: "plusBarUpdateSprites",
      value: function plusBarUpdateSprites(sprites, rect, index) {
        var canAfford = game.character.experience >= game.character.experienceForNextLevel();
        var icon = canAfford ? 16 : 17;
        sprites.icon.setIndex(icon);
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "plusBarClicked",
      value: function plusBarClicked(index) {
        if (game.character.experience >= game.character.experienceForNextLevel()) {
          game.character.levelUp(index);
          game.audio.playSfx('levelup');
        }
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************

    }, {
      key: "statsBarUpdateTooltip",
      value: function statsBarUpdateTooltip(rect, index) {
        var text = DataStats[index].tooltip;
        this.setTooltip(13, 109, text);
        game.tips.statTooltipShown = true;
      }
    }, {
      key: "secondBarUpdateTooltip",
      value: function secondBarUpdateTooltip(rect, index) {
        var text = DataStats[3 + index].tooltip;
        this.setTooltip(13, 109, text);
        game.tips.statTooltipShown = true;
      }
    }, {
      key: "otherBarUpdateTooltip",
      value: function otherBarUpdateTooltip(rect, index) {
        var tooltips = ['Your current experience and\nexperience needed for next level.', 'Your current level.'];
        var text = tooltips[index];
        this.setTooltip(13, 109, text);
      } //*******************************************************************************************************************
      // * Clickable
      //*******************************************************************************************************************

    }, {
      key: "plusBarClickable",
      value: function plusBarClickable(index) {
        return game.character.experience >= game.character.experienceForNextLevel();
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }]);

    return PanelStats;
  }(PanelBase);

  return PanelStats;
});