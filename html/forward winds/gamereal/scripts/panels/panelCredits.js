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
  // ** Credits
  //*******************************************************************************************************************
  var credits = ['Game: Adventale', 'Munro Font: Ten by Twenty', '-----------', 'Javascript libraries used:', 'Require.js, Howler.js, PIXI.js, SAT.js', '-----------', 'Main tools used:', 'Atom: Writing code', 'Aseprite: Pixel art', 'Tiled: Map layout']; //*******************************************************************************************************************
  // ** The Settings panel
  //*******************************************************************************************************************

  var PanelCredits = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelCredits, _PanelBase);

    var _super = _createSuper(PanelCredits);

    function PanelCredits(position, active) {
      _classCallCheck(this, PanelCredits);

      return _super.call(this, position, active);
    }

    _createClass(PanelCredits, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelCredits.prototype), "initialize", this).call(this);

        this.width = 156;
        this.height = 108;
        this.x = 10;
        this.y = 10;
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.bars.credits = {
          x: 6,
          y: 6,
          w: 148,
          h: 8,
          s: 0,
          n: 12,
          l: 1
        };
        this.bars.returnBackground = {
          x: 48,
          y: 107,
          w: 60,
          h: 17,
          s: 0,
          n: 1,
          l: 1
        };
        this.bars.returnButton = {
          x: 54,
          y: 102,
          w: 48,
          h: 15,
          s: 1,
          n: 1,
          l: 1
        };
      } //*******************************************************************************************************************
      // * Create Sprites
      //*******************************************************************************************************************

    }, {
      key: "creditsBarSetupSprites",
      value: function creditsBarSetupSprites(sprites, rect, index) {
        var text = credits[index] || '';
        sprites.name = game.graphics.addText(rect.x + rect.w / 2, rect.y, text);
        sprites.name.anchor.x = 0.5;
      }
    }, {
      key: "returnBackgroundBarSetupSprites",
      value: function returnBackgroundBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 1, 0, 1);
        sprites.clean = game.graphics.addRect({
          x: rect.x + 1,
          y: rect.y,
          w: rect.w - 2,
          h: 1
        }, 1, 1, 1);
      }
    }, {
      key: "returnButtonBarSetupSprites",
      value: function returnButtonBarSetupSprites(sprites, rect, index) {
        sprites.rect = game.graphics.addRect(rect, 1, 2, 1);
        sprites.name = game.graphics.addText(rect.x + rect.w / 2, rect.y + 2, 'BACK');
        sprites.name.anchor.x = 0.5;
      } //*******************************************************************************************************************
      // * Update Sprites
      //*******************************************************************************************************************

    }, {
      key: "creditsBarUpdateSprites",
      value: function creditsBarUpdateSprites(sprites, rect, index) {//Nothing to update
      }
    }, {
      key: "returnBackgroundBarUpdateSprites",
      value: function returnBackgroundBarUpdateSprites(sprites, rect, index) {//Nothing to update
      }
    }, {
      key: "returnButtonBarUpdateSprites",
      value: function returnButtonBarUpdateSprites(sprites, rect, index) {//Nothing to update
      } //*******************************************************************************************************************
      // * Input
      //*******************************************************************************************************************

    }, {
      key: "returnButtonBarClicked",
      value: function returnButtonBarClicked(index) {
        game.panels.activate(['Main'], ['Credits']);
        game.input.consumeClick();
        game.audio.playSfx('switch');
      } //*******************************************************************************************************************
      // * Tooltips
      //*******************************************************************************************************************
      //*******************************************************************************************************************
      // * Clickable
      //*******************************************************************************************************************

    }, {
      key: "returnButtonBarClickable",
      value: function returnButtonBarClickable(index) {
        return true;
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }]);

    return PanelCredits;
  }(PanelBase);

  return PanelCredits;
});