"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

define(['game', 'sat', 'entity', 'dataProjectiles', 'dataActions', 'action'], function (game, SAT, Entity, DataProjectiles, DataActions, Action) {
  //*******************************************************************************************************************
  // ** A projectile
  //*******************************************************************************************************************
  var Projectile = /*#__PURE__*/function (_Entity) {
    _inherits(Projectile, _Entity);

    var _super = _createSuper(Projectile);

    function Projectile(id, caster) {
      var _this;

      _classCallCheck(this, Projectile);

      _this = _super.call(this, caster.x, caster.y);

      _this.initialize(id, caster);

      return _this;
    }

    _createClass(Projectile, [{
      key: "initialize",
      value: function initialize(id, caster) {
        this.destroyed = false;
        this.caster = caster;
        this.id = id;
        this.data = DataProjectiles[id];
        this.startPos = this.data.startPos;
        this.dir = this.data.dir;
        this.movement = this.data.movement;
        this.speed = this.data.speed || null;
        this.collisionMode = this.data.collisionMode || 'shape';
        this.image = this.data.image || 'projectiles';
        this.frame = this.data.anim + ':0';
        this.mods = this.data.mods || {};
        this.lingerTime = this.data.lingerTime || 5;
        this.timers.linger = Infinity;
        this.adjustShape();
        this.initializeBounds();
        this.initializePosition();
        this.initializeDirection();
        this.initializeMovement();
        this.initializeAction();
      }
    }, {
      key: "adjustShape",
      value: function adjustShape() {
        var width = Math.round(this.getFrameData().w / 2);
        var height = Math.round(this.getFrameData().h / 2);
        this.shape = new SAT.Polygon(new SAT.Vector(this.x, this.y), [new SAT.Vector(width, height), new SAT.Vector(-width, height), new SAT.Vector(-width, -height), new SAT.Vector(width, -height)]);
      } //*******************************************************************************************************************
      // * Starting Position
      //*******************************************************************************************************************

    }, {
      key: "initializePosition",
      value: function initializePosition() {
        if (this.startPos) {
          var _this$startPos = _slicedToArray(this.startPos, 2),
              ox = _this$startPos[0],
              oy = _this$startPos[1];

          var x = this.caster.x + ox * this.caster.direction;
          var y = this.caster.y + oy;
        } else {
          var _oy = this.caster.range ? 10 : 4;

          var x = this.caster.x + this.caster.direction * (this.caster.bounds.right + this.bounds.right + 1);
          var y = this.caster.y + this.caster.bounds.down - _oy;
        }

        this.setPos(x, y);
      } //*******************************************************************************************************************
      // * Starting Movement
      //*******************************************************************************************************************

    }, {
      key: "initializeMovement",
      value: function initializeMovement() {
        var movement = this[this.movement + 'Movement']();
        this.velocity = {
          x: movement.x,
          y: movement.y
        };
        this.gravity = movement.gravity;
      }
    }, {
      key: "noneMovement",
      value: function noneMovement() {
        return {
          x: 0,
          y: 0,
          gravity: false
        };
      }
    }, {
      key: "angledProjectileMovement",
      value: function angledProjectileMovement() {
        var angle = game.character.x > this.x ? Math.PI / 4 : Math.PI / 4 * 3;
        var distance = game.character.x - this.x;
        var gravity = 0.1;
        var velocity = Math.sqrt(distance * gravity / Math.sin(2 * angle));
        var ydiff = 1 - (game.character.y - this.y) * 0.005;
        var vy = -Math.sin(angle) * velocity * ydiff;
        var vx = Math.cos(angle) * velocity * ydiff;
        return {
          x: vx,
          y: vy,
          gravity: true
        };
      }
    }, {
      key: "rangedMovement",
      value: function rangedMovement() {
        var dir = game.character.x < this.x ? -1 : 1;
        var vy = -1.8;
        var vx = Math.abs(game.character.x - this.x) / 38 * dir;
        return {
          x: vx,
          y: vy,
          gravity: true
        };
      }
    }, {
      key: "horizontalMovement",
      value: function horizontalMovement() {
        var vy = 0;
        var vx = this.direction * 4;
        return {
          x: vx,
          y: vy,
          gravity: false
        };
      }
    }, {
      key: "straightMovement",
      value: function straightMovement() {
        var rad = Math.atan2(game.character.y - this.y, game.character.x - this.x);
        var vy = Math.sin(rad) * (this.speed || 3);
        var vx = Math.cos(rad) * (this.speed || 3);
        return {
          x: vx,
          y: vy,
          gravity: false
        };
      } //*******************************************************************************************************************
      // * Starting Direction
      //*******************************************************************************************************************

    }, {
      key: "initializeDirection",
      value: function initializeDirection() {
        var dir = this.caster.direction;

        switch (this.dir) {
          case 'AIM':
            dir = game.input.mx < game.graphics.width / 2 ? -1 : 1;

          default:
            dir = dir;
        }

        this.direction = dir;
      } //*******************************************************************************************************************
      // * Starting Action
      //*******************************************************************************************************************

    }, {
      key: "initializeAction",
      value: function initializeAction() {
        this.action = null;

        if (this.data.onStart) {
          this.action = new Action(this, DataActions[this.data.onStart]);
        }
      } //*******************************************************************************************************************
      // * Update
      //*******************************************************************************************************************

    }, {
      key: "updateSpecific",
      value: function updateSpecific() {
        this.updateAction();
        this.updateLingering();
      }
    }, {
      key: "updateAction",
      value: function updateAction() {
        if (this.action && !this.action.done) {
          this.action.update();
        }
      }
    }, {
      key: "updateLingering",
      value: function updateLingering() {
        if (this.timers.linger == 0) {
          this.destroy();
        }
      }
    }, {
      key: "hit",
      value: function hit() {
        this.haltMovement();
        this.timers.linger = this.lingerTime;
        this.gravity = false;
        this.triggerOnHitAction();
      }
    }, {
      key: "triggerOnHitAction",
      value: function triggerOnHitAction() {
        if (this.data.onHit) {
          this.action = new Action(this, DataActions[this.data.onHit]);
        }
      }
    }]);

    return Projectile;
  }(Entity);

  return Projectile;
});