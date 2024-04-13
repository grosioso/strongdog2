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

define(['game', 'sat', 'entity', 'dataInteractibles'], function (game, SAT, Entity, DataInteractibles) {
  //*******************************************************************************************************************
  // ** An Interactive Object
  //*******************************************************************************************************************
  var Interactible = /*#__PURE__*/function (_Entity) {
    _inherits(Interactible, _Entity);

    var _super = _createSuper(Interactible);

    function Interactible(x, y, id, gridPosition) {
      var _this;

      _classCallCheck(this, Interactible);

      _this = _super.call(this, x, y);
      _this.gridPosition = gridPosition;
      _this.data = DataInteractibles[id];
      _this.frame = _this.data.frame;
      _this.isTile = _this.data.isTile || false;
      _this.image = _this.frame ? 'interactibles' : null;
      _this.color = _this.data.color;
      _this.velocity = {
        x: 0,
        y: 0
      };
      _this.active = _this.data.condition ? _this.data.condition(game) : true;
      _this.solid = false;

      _this.initializeShape();

      return _this;
    }

    _createClass(Interactible, [{
      key: "trigger",
      value: function trigger(_char, response) {
        if (response.overlapV.y != 0 || response.overlapV.x != 0) {
          this.active = false;
          this.redraw = true;

          if (this.frame) {
            this.frame = this.frame.replace('0', '1');
          }

          this.data.interact(game, this);
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        this.active = this.data.condition ? this.data.condition(game) : true;

        if (this.frame) {
          this.frame = this.data.frame;
        }

        this.redraw = true;
      }
    }]);

    return Interactible;
  }(Entity);

  return Interactible;
});