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
  // ** Sprite of a Control
  //*******************************************************************************************************************
  var SpriteLogo = /*#__PURE__*/function (_PIXI$Graphics) {
    _inherits(SpriteLogo, _PIXI$Graphics);

    var _super = _createSuper(SpriteLogo);

    function SpriteLogo() {
      var _this;

      _classCallCheck(this, SpriteLogo);

      _this = _super.call(this);
      _this.alpha = 0.8;
      _this.mainColor = 0x4f5391;
      _this.armor = null;
      _this.games = null;

      _this.drawLogo();

      _this.setupText();

      return _this;
    } //*******************************************************************************************************************
    // * Drawing logo
    //*******************************************************************************************************************


    _createClass(SpriteLogo, [{
      key: "drawLogo",
      value: function drawLogo() {
        this.drawShield();
        this.drawDagger();
        this.drawCrown();
        this.drawBorder();
      }
    }, {
      key: "drawShield",
      value: function drawShield() {
        this.beginFill(this.mainColor);
        this.moveTo(0, 0);
        this.quadraticCurveTo(15, 10, 30, 10);
        this.lineTo(30, 55);
        this.quadraticCurveTo(28, 82, 0, 90);
        this.quadraticCurveTo(-28, 82, -30, 55);
        this.lineTo(-30, 10);
        this.quadraticCurveTo(-15, 10, 0, 0);
        this.endFill();
      }
    }, {
      key: "drawDagger",
      value: function drawDagger() {
        var _this2 = this;

        this.beginFill(0x000000);
        var directions = [1, -1];
        directions.forEach(function (d) {
          _this2.moveTo(0 * d, 72);

          _this2.lineTo(1 * d, 68);

          _this2.quadraticCurveTo(4 * d, 66, 2 * d, 66);

          _this2.lineTo(2 * d, 58);

          _this2.lineTo(9 * d, 58);

          _this2.quadraticCurveTo(9 * d, 52, 6 * d, 56);

          _this2.lineTo(4 * d, 55);

          _this2.lineTo(3 * d, 42);

          _this2.lineTo(0 * d, 40);
        });
      }
    }, {
      key: "drawCrown",
      value: function drawCrown() {
        var _this3 = this;

        var directions = [1, -1];
        directions.forEach(function (d) {
          _this3.moveTo(0 * d, 35);

          _this3.lineTo(10 * d, 35);

          _this3.lineTo(18 * d, 21);

          _this3.lineTo(12 * d, 27);

          _this3.lineTo(9 * d, 25);

          _this3.quadraticCurveTo(13 * d, 32, 6 * d, 33);

          _this3.quadraticCurveTo(0 * d, 30, 5 * d, 22);

          _this3.quadraticCurveTo(0 * d, 26, 2 * d, 20);

          _this3.quadraticCurveTo(2 * d, 25, 0 * d, 16);

          _this3.moveTo(2 * d, 37);

          _this3.lineTo(9 * d, 37);

          _this3.lineTo(12 * d, 45);
        });
      }
    }, {
      key: "drawBorder",
      value: function drawBorder() {
        var _this4 = this;

        this.endFill();
        this.lineStyle(2, 0x000000);
        var directions = [1, -1];
        directions.forEach(function (d) {
          _this4.moveTo(0 * d, 3);

          _this4.quadraticCurveTo(15 * d, 13, 27 * d, 13);

          _this4.lineTo(27 * d, 52);

          _this4.quadraticCurveTo(28 * d, 78, 0 * d, 87);
        });
      } //*******************************************************************************************************************
      // * Supplemental text
      //*******************************************************************************************************************

    }, {
      key: "setupText",
      value: function setupText() {
        //Armor
        this.armor = new PIXI.Text('Armor');
        this.armor.style = {
          fill: this.mainColor,
          fontFamily: 'impact',
          fontSize: 24
        };
        this.armor.x = 32;
        this.armor.y = 7;
        this.addChild(this.armor); //Games

        this.games = new PIXI.Text('Games');
        this.games.style = {
          fill: this.mainColor,
          fontFamily: 'impact',
          fontSize: 19
        };
        this.games.x = 31;
        this.games.y = 28;
        this.addChild(this.games);
      }
    }]);

    return SpriteLogo;
  }(PIXI.Graphics);

  return SpriteLogo;
});