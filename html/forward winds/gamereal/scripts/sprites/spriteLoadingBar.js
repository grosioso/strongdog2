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

define(['pixi', 'game'], function (PIXI, game) {
  //*******************************************************************************************************************
  // ** A bar that shows hp
  //*******************************************************************************************************************
  var SpriteLoadingBar = /*#__PURE__*/function (_PIXI$Container) {
    _inherits(SpriteLoadingBar, _PIXI$Container);

    var _super = _createSuper(SpriteLoadingBar);

    function SpriteLoadingBar(loader) {
      var _this;

      _classCallCheck(this, SpriteLoadingBar);

      _this = _super.call(this);
      _this.loader = loader;
      _this.label = null;
      _this.progress = null;
      _this.zIndex = 1;

      _this.setup();

      return _this;
    }

    _createClass(SpriteLoadingBar, [{
      key: "setup",
      value: function setup() {
        this.label = new PIXI.BitmapText('LOADING:', {
          font: "10px Munro2"
        });
        this.progress = new PIXI.BitmapText('', {
          font: "10px Munro2"
        });
        this.label.anchor.x = 0.5;
        this.progress.anchor.x = 0.5;
        this.progress.y = 8;
        this.addChild(this.label);
        this.addChild(this.progress);
      }
    }, {
      key: "update",
      value: function update() {
        this.updateProgress();
      }
    }, {
      key: "updateProgress",
      value: function updateProgress() {
        this.progress.text = '' + Math.floor((this.loader.total - this.loader.remaining) / this.loader.total * 100) + '%';
      }
    }]);

    return SpriteLoadingBar;
  }(PIXI.Container);

  return SpriteLoadingBar;
});