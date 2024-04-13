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

define(['game', 'pixi', 'spriteIcon'], function (game, PIXI, SpriteIcon) {
  //*******************************************************************************************************************
  // ** Sprite for displaying info while Paused
  //*******************************************************************************************************************
  var SpritePauseHeader = /*#__PURE__*/function (_PIXI$Container) {
    _inherits(SpritePauseHeader, _PIXI$Container);

    var _super = _createSuper(SpritePauseHeader);

    function SpritePauseHeader() {
      var _this;

      _classCallCheck(this, SpritePauseHeader);

      _this = _super.call(this);

      _this.setupBackground();

      _this.setupText();

      _this.setupIcon();

      return _this;
    }

    _createClass(SpritePauseHeader, [{
      key: "setupBackground",
      value: function setupBackground() {
        this.background = game.graphics.newRoundedRect({
          x: 0,
          y: 0,
          w: 0,
          h: 0
        }, 1, 1, 3, 3);
        this.addChild(this.background);
      }
    }, {
      key: "setupText",
      value: function setupText() {
        this.text = new PIXI.BitmapText('', {
          font: "10px Munro2"
        });
        this.text.anchor.x = 0.5;
        this.text.font.align = 'center';
        this.addChild(this.text);
      }
    }, {
      key: "setupIcon",
      value: function setupIcon() {
        this.icon = new SpriteIcon(1);
        this.icon.y = -1;
        this.addChild(this.icon);
      }
    }, {
      key: "update",
      value: function update() {
        this.updateText();
        this.updateBackground();
        this.updateIcon();
        this.updateVisibility();
      }
    }, {
      key: "updateText",
      value: function updateText() {
        var text = this.getHeader();
        this.text.text = text;
        this.text.y = this.showingRelic() ? 5 : 0;
      }
    }, {
      key: "updateBackground",
      value: function updateBackground() {
        var textLines = this.text.text.split('\n').length;
        var width = this.text.width + 5;
        var height = textLines * 8 + (this.showingRelic() ? 9 : 4);
        this.background.x = -Math.round(width / 2) - 1;
        game.graphics.redrawRoundedRect(this.background, {
          w: width,
          h: height
        }, 1, 1, 3, 3);
      }
    }, {
      key: "updateIcon",
      value: function updateIcon() {
        this.icon.setIndex(game.character.relics[game.character.relicIndex].icon);
        this.icon.x = this.background.x + 39;
      }
    }, {
      key: "updateVisibility",
      value: function updateVisibility() {
        var visible = game.combat.paused && this.text.text != 'nopause';
        this.text.visible = visible;
        this.background.visible = visible;
        this.icon.visible = this.showingRelic();
      }
    }, {
      key: "getHeader",
      value: function getHeader() {
        var headers = {
          normal: 'Paused.',
          start: 'Click to start moving forward.',
          finish: 'Yay!\nClick to continue.',
          victory: 'Obtained      ' + game.character.relics[game.character.relicIndex].name + '.\nClick to continue.',
          empty: 'Empty.\nClick to continue.'
        };
        return headers[game.combat.paused] || 'nopause';
      }
    }, {
      key: "showingRelic",
      value: function showingRelic() {
        return game.combat.paused == 'victory';
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.text.destroy();
        this.background.destroy();

        _get(_getPrototypeOf(SpritePauseHeader.prototype), "destroy", this).call(this);
      }
    }]);

    return SpritePauseHeader;
  }(PIXI.Container);

  return SpritePauseHeader;
});