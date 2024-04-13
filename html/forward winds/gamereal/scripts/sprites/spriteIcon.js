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

define(['pixi'], function (PIXI) {
  //*******************************************************************************************************************
  // ** An Icon
  //*******************************************************************************************************************
  var SpriteIcon = /*#__PURE__*/function (_PIXI$Sprite) {
    _inherits(SpriteIcon, _PIXI$Sprite);

    var _super = _createSuper(SpriteIcon);

    function SpriteIcon(index) {
      var _this;

      _classCallCheck(this, SpriteIcon);

      _this = _super.call(this, PIXI.Loader.shared.resources['assets/fwIconset.png'].texture);

      _this.setIndex(index);

      return _this;
    }

    _createClass(SpriteIcon, [{
      key: "update",
      value: function update() {}
    }, {
      key: "setIndex",
      value: function setIndex(index) {
        var enabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (index !== this.index || enabled !== this.enabled) {
          var x = index % 16 * 16;
          var y = Math.floor(index / 16) * 16;
          var w = 16;
          var h = 16;
          var baseTexture = PIXI.custom.iconsets[enabled ? 'enabled' : 'disabled'].baseTexture;
          this.texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(x, y, w, h));
          this.index = index;
          this.enabled = enabled;
        }
      }
    }]);

    return SpriteIcon;
  }(PIXI.Sprite);

  return SpriteIcon;
});