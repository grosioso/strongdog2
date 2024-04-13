"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

define(['game', 'pixi'], function (game, PIXI) {
  //*******************************************************************************************************************
  // ** Sprite of a Tile
  //*******************************************************************************************************************
  var SpriteBackground = /*#__PURE__*/function (_PIXI$Sprite) {
    _inherits(SpriteBackground, _PIXI$Sprite);

    var _super = _createSuper(SpriteBackground);

    function SpriteBackground(image) {
      var _this;

      _classCallCheck(this, SpriteBackground);

      _this = _super.call(this, PIXI.Loader.shared.resources['assets/fw' + image + '.png'].texture);

      _this.resetTransition();

      return _this;
    }

    _createClass(SpriteBackground, [{
      key: "resetTransition",
      value: function resetTransition() {
        this.transition = {};
        this.transition.speed = 0;
        this.transition.duration = 0;
        this.transition.timer = 0;
        this.transition.type = null;
      }
    }, {
      key: "update",
      value: function update() {
        this.updateTimer();
        this.updateTransition();
      }
    }, {
      key: "updateTimer",
      value: function updateTimer() {
        this.transition.timer = Math.max(this.transition.timer - 1, 0);
      }
    }, {
      key: "updateTransition",
      value: function updateTransition() {
        if (this.transition.timer == 0 && this.transition.duration != 0) {
          this.endTransition();
        } else {
          this[this.transition.type + 'UpdateTransition']();
        }
      }
    }, {
      key: "normalUpdateTransition",
      value: function normalUpdateTransition() {
        this.x = -Math.floor((this.transition.duration - this.transition.timer) / 2) * this.transition.speed;
      }
    }, {
      key: "reverseUpdateTransition",
      value: function reverseUpdateTransition() {
        var t = (this.transition.duration - this.transition.timer + 1) / 2;
        var w = Math.floor(t) * this.transition.speed;
        var h = Math.floor(t * game.graphics.height / game.graphics.width) * this.transition.speed;
        var baseTexture = this.texture.baseTexture;
        this.texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 0, Math.min(w, game.graphics.width), Math.min(h, game.graphics.height)));
      }
    }, {
      key: "setTransition",
      value: function setTransition(speed) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'normal';
        this.transition.speed = speed;
        this.transition.duration = game.graphics.width / speed * 2;
        this.transition.timer = this.transition.duration;
        this.transition.type = type;
        game.graphics.transitioningBackground = this;
      }
    }, {
      key: "endTransition",
      value: function endTransition() {
        if (this.transition.type == 'normal') {
          this.destroy();
        }

        this.resetTransition();
        game.graphics.transitioningBackground = null;
      }
    }, {
      key: "setIndex",
      value: function setIndex() {
        var index = this.tile.id;
        var x = index % 16 * 16;
        var y = Math.floor(index / 16) * 16;
        var w = 16;
        var h = 16;
        var baseTexture = this.texture.baseTexture;
        this.texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(x, y, w, h));
        this.index = index;
      }
    }]);

    return SpriteBackground;
  }(PIXI.Sprite);

  return SpriteBackground;
});