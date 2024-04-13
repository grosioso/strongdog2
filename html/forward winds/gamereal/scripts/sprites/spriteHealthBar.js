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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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
  var SpriteHealthBar = /*#__PURE__*/function (_PIXI$Container) {
    _inherits(SpriteHealthBar, _PIXI$Container);

    var _super = _createSuper(SpriteHealthBar);

    function SpriteHealthBar(combatant) {
      var _this;

      _classCallCheck(this, SpriteHealthBar);

      _this = _super.call(this);
      _this.combatant = combatant;
      _this.length = _this.combatant.bounds.right * 2;
      _this.zIndex = 1;

      _this.setup();

      _this.update();

      return _this;
    }

    _createClass(SpriteHealthBar, [{
      key: "setup",
      value: function setup() {
        this.border = new PIXI.Graphics();
        this.fill = new PIXI.Graphics();
        this.fill.x = 1;
        this.fill.y = 1;
        game.graphics.redrawRect(this.border, {
          w: this.length,
          h: 4
        }, 3, 0, 1);
        this.addChild(this.border, this.fill);
      }
    }, {
      key: "update",
      value: function update() {
        this.updateVisibillity();

        if (this.visible) {
          this.updatePosition();
          this.updateFill();
        }
      }
    }, {
      key: "updatePosition",
      value: function updatePosition() {
        this.x = Math.floor(this.combatant.x - this.length / 2);
        this.y = Math.floor(this.combatant.y + this.combatant.bounds.up - 5);
      }
    }, {
      key: "updateFill",
      value: function updateFill() {
        var _v1$v = {
          v1: this.combatant.mhp,
          v2: this.combatant.hp
        },
            v1 = _v1$v.v1,
            v2 = _v1$v.v2;
        var size = {
          w: Math.ceil(Math.max((this.length - 2) * v2 / v1, 0)),
          h: 2
        };
        var spell = this.combatant.states.find(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              n = _ref2[0],
              s = _ref2[1];

          return n == 'guard' || n == 'freeze';
        });
        var color = spell ? 2 : 1;
        game.graphics.redrawRect(this.fill, size, color, color, 0);
      }
    }, {
      key: "updateVisibillity",
      value: function updateVisibillity() {
        var isDamaged = this.combatant.hp < this.combatant.mhp;
        var isPlayer = this.combatant == game.character;
        var isActive = this.combatant.active;
        var notDead = !(this.combatant.destroyed && this.combatant.timers.fade == 0);
        var notFallen = !this.combatant.fallen;
        var spell = this.combatant.states.find(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              n = _ref4[0],
              s = _ref4[1];

          return n == 'guard' || n == 'freeze';
        });
        this.visible = (isDamaged && isActive || spell) && notDead && notFallen || isPlayer;
      }
    }, {
      key: "dispose",
      value: function dispose() {
        // DISPOSE ?????????????
        this.border.dispose();
        this.fill.dispose();

        _get(_getPrototypeOf(SpriteHealthBar.prototype), "dispose", this).call(this);
      }
    }]);

    return SpriteHealthBar;
  }(PIXI.Container);

  return SpriteHealthBar;
});