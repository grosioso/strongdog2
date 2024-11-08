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
  // ** The Forge Panel
  //*******************************************************************************************************************
  var PanelFin = /*#__PURE__*/function (_PanelBase) {
    _inherits(PanelFin, _PanelBase);

    var _super = _createSuper(PanelFin);

    function PanelFin(position, active) {
      _classCallCheck(this, PanelFin);

      return _super.call(this, position, active);
    }

    _createClass(PanelFin, [{
      key: "initialize",
      value: function initialize() {
        _get(_getPrototypeOf(PanelFin.prototype), "initialize", this).call(this);

        this.showFirst = false;
      }
    }, {
      key: "setupElements",
      value: function setupElements() {
        this.labels.congrats = {
          x: 4,
          y: 2
        }; //this.labels.and = {x:79, y:24, a:0.5}
        //this.labels.thanks = {x:79, y:34, a:0.5}
      } //*******************************************************************************************************************
      // * Refresh
      //*******************************************************************************************************************

    }, {
      key: "refresh",
      value: function refresh() {
        _get(_getPrototypeOf(PanelFin.prototype), "refresh", this).call(this);

        this.showFirst = !game.world.shownFin;
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "congratsLabelText",
      value: function congratsLabelText() {
        if (this.showFirst) {
          return "Congratulations and thanks for\nplaying! If you wish to continue, you\ncan now use Keys to access new\nareas within the Magic Orb.\nYou have also unlocked a new page\nof skills.";
        } else {
          return "\n                 Once again,\n              Congratulations!\n                      and\n            Thanks for Playing!\n";
        }
      }
    }, {
      key: "andLabelText",
      value: function andLabelText() {
        return 'and';
      }
    }, {
      key: "thanksLabelText",
      value: function thanksLabelText() {
        return 'Thanks for playing!';
      }
    }]);

    return PanelFin;
  }(PanelBase);

  return PanelFin;
});