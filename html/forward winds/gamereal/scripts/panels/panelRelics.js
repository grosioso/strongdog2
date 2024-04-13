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

define(['game', 'panelBase'], function (game, PanelBase) {
  //*******************************************************************************************************************
  // ** The Relic Panel
  //*******************************************************************************************************************
  var PanelRelics = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelRelics, _PanelBase);

    var _super = _createSuper(PanelRelics);

    function PanelRelics(position, active) {
      _classCallCheck(this, PanelRelics);

      return _super.call(this, position, active);
    }

    _createClass(PanelRelics, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelRelics.prototype), "initialize", this).call(this);

        this.width = 77;
        this.height = 86;
        this.x = 10;
        this.y = 10;
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.labels.relicName = {
          x: this.width - 6,
          y: 12,
          c: 2,
          a: 1
        };
        this.bars.progress = {
          x: 7,
          y: 22,
          w: 13,
          h: 49,
          s: 0,
          n: 1,
          l: 1
        };
        this.bars.relics = {
          x: 22,
          y: 22,
          w: 17,
          h: 17,
          s: -1,
          n: 9,
          l: 3
        };
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "progressBarSetupSprites",
      value: function progressBarSetupSprites(sprites, rect, index) {
        sprites.back = game.graphics.addRect(rect, null, 2, 1);
        sprites.fill = game.graphics.addRect(rect, null, null, 1);
      }
    }, {
      key: "relicsBarSetupSprites",
      value: function relicsBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, null, 2, 1, 'relicsBar');
        sprites.icon = game.graphics.addIcon(rect.x, rect.y, 0);
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "progressBarUpdateSprites",
      value: function progressBarUpdateSprites(sprites, rect, index) {
        var relic = this.relicAt(game.character.relicIndex);
        var enemyCount = game.character.relics[game.character.relicIndex].enemyCount;
        var progress = game.world.stageProgresses[game.world.stage];
        var fill = Math.min(progress / enemyCount, 1);
        var fillRect = {
          x: rect.x,
          y: rect.y,
          w: rect.w,
          h: rect.h * fill
        };
        sprites.fill.y = rect.y + rect.h * (1 - fill);
        game.graphics.redrawRect(sprites.fill, fillRect, 2, 2, 1);
      }
    }, {
      key: "relicsBarUpdateSprites",
      value: function relicsBarUpdateSprites(sprites, rect, index) {
        var relic = this.relicAt(index);
        var available = relic.available;
        var active = index == game.character.relicIndex;
        sprites.icon.setIndex(relic.icon, active);
        sprites.icon.visible = available;
        var bgColor = active ? 2 : null;
        var fgColor = active ? 3 : 2;
        sprites.rect.zIndex = active ? 1 : 0;
        game.graphics.redrawRect(sprites.rect, rect, bgColor, fgColor);
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "relicsBarClicked",
      value: function relicsBarClicked(index) {
        var relic = this.relicAt(index);

        if (relic.available) {
          game.character.activateRelic(index);
          game.combat.reset();
          game.audio.playSfx('select');
        }
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************

    }, {
      key: "relicsBarUpdateTooltip",
      value: function relicsBarUpdateTooltip(rect, index) {
        var relic = this.relicAt(index);

        if (relic.available) {
          var text = 'Allows access to ' + relic.tooltip;
          this.setTooltip(13, 109, text);
        }
      } //*******************************************************************************************************************
      // * Clickable
      //*******************************************************************************************************************

    }, {
      key: "relicsBarClickable",
      value: function relicsBarClickable(index) {
        return this.relicAt(index).available;
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "relicAt",
      value: function relicAt(index) {
        return game.character.relics[index];
      }
    }, {
      key: "relicNameLabelText",
      value: function relicNameLabelText() {
        return game.character.relics[game.character.relicIndex].name;
      }
    }]);

    return PanelRelics;
  }(PanelBase);

  return PanelRelics;
});