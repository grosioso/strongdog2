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
  // ** Sprite of an Entity
  //*******************************************************************************************************************
  var SpriteEntity = /*#__PURE__*/function (_PIXI$Graphics) {
    _inherits(SpriteEntity, _PIXI$Graphics);

    var _super = _createSuper(SpriteEntity);

    function SpriteEntity(entity) {
      var _this;

      _classCallCheck(this, SpriteEntity);

      _this = _super.call(this);
      _this.entity = entity;
      _this.points = entity.shape.points;

      _this.drawEntity();

      return _this;
    }

    _createClass(SpriteEntity, [{
      key: "drawEntity",
      value: function drawEntity() {
        var _this2 = this;

        var color = this.entity.active ? this.entity.color : 1;
        var fillColor = game.graphics.colors[color];
        var borderColor = game.graphics.colors[this.darken(color)];
        var firstPoint = this.points[0];
        this.lineStyle(1, borderColor, 1, 0);
        this.beginFill(fillColor);
        this.moveTo(firstPoint.x, firstPoint.y);
        this.points.forEach(function (point) {
          _this2.lineTo(point.x, point.y);
        });
        this.lineTo(firstPoint.x, firstPoint.y - 1);
        this.endFill();
      }
    }, {
      key: "update",
      value: function update() {
        this.updatePosition();
        this.updateSize();
        this.updateVisibility();
        this.updateRedraw();
      }
    }, {
      key: "updatePosition",
      value: function updatePosition() {
        this.x = Math.floor(this.entity.x);
        this.y = Math.floor(this.entity.y);
      }
    }, {
      key: "updateSize",
      value: function updateSize() {
        this.scale.x = this.entity.size;
        this.scale.y = this.entity.size;
      }
    }, {
      key: "updateVisibility",
      value: function updateVisibility() {
        var destroyed = this.entity.destroyed;
        var fading = this.entity.fadeTime > 0 && Math.floor(this.entity.timers.fade / 3) % 2 == 1;
        var outOfBounds = Math.abs(this.x - game.character.x) > 150 || Math.abs(this.y - (game.character.y - 30)) > 120;
        this.visible = (!destroyed || fading) && !outOfBounds;
      }
    }, {
      key: "updateRedraw",
      value: function updateRedraw() {
        if (this.entity.redraw) {
          this.clear();
          this.drawEntity();
          this.entity.redraw = false;
        }
      }
    }, {
      key: "brighten",
      value: function brighten(color) {
        return color - 1;
      }
    }, {
      key: "darken",
      value: function darken(color) {
        return (color + 1) % 4;
      }
    }]);

    return SpriteEntity;
  }(PIXI.Graphics);

  return SpriteEntity;
});