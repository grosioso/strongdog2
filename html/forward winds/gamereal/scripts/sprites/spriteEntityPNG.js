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

define(['game', 'pixi'], function (game, PIXI) {
  //*******************************************************************************************************************
  // ** Sprite of an Entity (Image versioin)
  //*******************************************************************************************************************
  var SpriteEntity = /*#__PURE__*/function (_PIXI$Sprite) {
    _inherits(SpriteEntity, _PIXI$Sprite);

    var _super = _createSuper(SpriteEntity);

    function SpriteEntity(entity) {
      var _this;

      _classCallCheck(this, SpriteEntity);

      _this = _super.call(this, PIXI.Loader.shared.resources["assets/entities.json_image"].texture);
      _this.entity = entity;

      _this.updateFrame();

      return _this;
    }

    _createClass(SpriteEntity, [{
      key: "update",
      value: function update() {
        this.updateFrame();
        this.updatePosition();
        this.updateZIndex();
        this.updateDirection();
        this.updateVisibility();
      }
    }, {
      key: "updateFrame",
      value: function updateFrame() {
        this.frameData = this.entity.getFrameData();
        var fx = PIXI.Loader.shared.resources["assets/entities.json"].data.frames[this.entity.image + '.png'].frame.x;
        var fy = PIXI.Loader.shared.resources["assets/entities.json"].data.frames[this.entity.image + '.png'].frame.y;
        var frameRect = new PIXI.Rectangle(this.frameData.x + fx, this.frameData.y + fy, this.frameData.w, this.frameData.h);

        if (!this.texture) {
          debugger;
        }

        this.texture = new PIXI.Texture(this.texture.baseTexture, frameRect);
      }
    }, {
      key: "updatePosition",
      value: function updatePosition() {
        var ox = Math.round(this.frameData.w / -2);
        var oy = Math.round(this.frameData.h / -2);
        this.x = Math.floor(this.entity.x + (ox + this.frameData.ox) * this.entity.direction);
        this.y = Math.floor(this.entity.y + oy + this.frameData.oy);
      }
    }, {
      key: "updateZIndex",
      value: function updateZIndex() {
        var _this$entity$frame$sp = this.entity.frame.split(':'),
            _this$entity$frame$sp2 = _slicedToArray(_this$entity$frame$sp, 2),
            anim = _this$entity$frame$sp2[0],
            index = _this$entity$frame$sp2[1];

        var focused = ['attack', 'spin', 'bash', 'crit', 'claw'];
        this.zIndex = focused.includes(anim) ? 1 : 0;

        if (this.entity.constructor.name == 'Projectile') {
          this.zIndex = 2;
        }
      }
    }, {
      key: "updateDirection",
      value: function updateDirection() {
        this.scale.x = this.entity.direction;
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
      key: "setFrame",
      value: function setFrame(frame) {}
    }]);

    return SpriteEntity;
  }(PIXI.Sprite);

  return SpriteEntity;
});