"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['pixi', 'dataWorld', 'spriteText', 'spriteIcon', 'spriteHealthBar', 'spritePauseHeader', 'spriteLogo', 'spriteTile', 'spriteEntity', 'spriteEntityPNG', 'spriteBackground', 'spriteLoadingBar', 'spriteBrandingIcon'], function (PIXI, DataWorld, SpriteText, SpriteIcon, SpriteHealthBar, SpritePauseHeader, SpriteLogo, SpriteTile, SpriteEntity, SpriteEntityPNG, SpriteBackground, SpriteLoadingBar, SpriteBrandingIcon) {
  var canvas = document.getElementById("screenCanvas");

  canvas.oncontextmenu = function (e) {
    e.preventDefault();
  };

  PIXI.utils.skipHello();
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  PIXI.settings.ROUND_PIXELS = true;
  PIXI.custom = {};
  var colors = [0x000000, 0xebffed, 0x93bda1, 0x4d6b5a]; //*******************************************************************************************************************
  // ** Graphics - Handles low level PIXI communication
  //*******************************************************************************************************************

  var Graphics = /*#__PURE__*/function () {
    function Graphics() {
      _classCallCheck(this, Graphics);

      this.width = 176;
      this.height = 144;
      this.scale = 4;
      this.canvas = document.getElementById("screenCanvas");
      this.center = {
        x: this.width / 2,
        y: this.height / 2
      };
      this.cursor = 'default';
      this.map = null;
      this.colors = colors;
      this.containers = {};
      this.transitioningBackground = null;
      this.initializeRenderer();
      this.initializeStage();
      this.initializeLayers();
    }

    _createClass(Graphics, [{
      key: "initializeRenderer",
      value: function initializeRenderer() {
        this.renderer = new PIXI.Renderer({
          view: this.canvas,
          width: this.width * this.scale,
          height: this.height * this.scale,
          backgroundColor: colors[1]
        });
        document.body.appendChild(this.renderer.view);
      }
    }, {
      key: "initializeStage",
      value: function initializeStage() {
        this.stage = new PIXI.Container();
        this.stage.scale.x = this.scale;
        this.stage.scale.y = this.scale;
      }
    }, {
      key: "initializeLayers",
      value: function initializeLayers() {
        var _this = this;

        this.layers = {};
        this.layers.base = new PIXI.Container();
        this.layers.entities = new PIXI.Container();
        this.layers.hui = new PIXI.Container();
        this.layers.bui = new PIXI.Container();
        this.layers.gui = new PIXI.Container();
        this.layers.tooltip = new PIXI.Container();
        this.layers.entities.sortableChildren = true;
        Object.values(this.layers).forEach(function (l) {
          return _this.stage.addChild(l);
        });
      } //*******************************************************************************************************************
      // * Update / Render Frame
      //*******************************************************************************************************************

    }, {
      key: "update",
      value: function update() {
        this.updateRenderer();
        this.updateCursor();
      }
    }, {
      key: "updateRenderer",
      value: function updateRenderer() {
        this.renderer.render(this.stage);
      }
    }, {
      key: "updateCursor",
      value: function updateCursor() {
        canvas.style.cursor = this.cursor;
        this.cursor = 'default';
      } //*******************************************************************************************************************
      // * Add Sprites
      //*******************************************************************************************************************

    }, {
      key: "addRect",
      value: function addRect(rect, fillColor, borderColor) {
        var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var layer = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'gui';
        var basic = this.newRect(rect, fillColor, borderColor, width);
        basic.x = rect.x;
        basic.y = rect.y;

        if (this.layers[layer]) {
          this.layers[layer].addChild(basic);
        } else {
          if (!this.containers[layer]) {
            this.containers[layer] = new PIXI.Container();
            this.containers[layer].sortableChildren = true;
            this.layers.gui.addChild(this.containers[layer]);
          }

          this.containers[layer].addChild(basic);
        }

        return basic;
      }
    }, {
      key: "addRoundedRect",
      value: function addRoundedRect(rect, fillColor, borderColor) {
        var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var rounding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
        var layer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'gui';
        var basic = this.newRoundedRect(rect, fillColor, borderColor, width, rounding);
        basic.x = rect.x;
        basic.y = rect.y;
        this.layers[layer].addChild(basic);
        return basic;
      }
    }, {
      key: "addContainer",
      value: function addContainer(x, y) {
        var sprite = new PIXI.Container();
        return this.add(sprite, x, y, 'gui');
      }
    }, {
      key: "addText",
      value: function addText(x, y) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        var text = args[0],
            _args$ = args[1],
            color = _args$ === void 0 ? 3 : _args$;
        var sprite = new PIXI.BitmapText(text.toString(), {
          font: "10px Munro".concat(color)
        });
        return this.add(sprite, x, y, 'gui');
      }
    }, {
      key: "addTile",
      value: function addTile(x, y) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        var sprite = _construct(SpriteTile, args);

        return this.add(sprite, x, y, 'base');
      }
    }, {
      key: "addEntity",
      value: function addEntity(x, y) {
        for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          args[_key3 - 2] = arguments[_key3];
        }

        var sprite = _construct(SpriteEntity, args);

        return this.add(sprite, x, y, 'entities');
      }
    }, {
      key: "addEntityPNG",
      value: function addEntityPNG(x, y) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
          args[_key4 - 2] = arguments[_key4];
        }

        var sprite = _construct(SpriteEntityPNG, args);

        return this.add(sprite, x, y, 'entities');
      }
    }, {
      key: "addIcon",
      value: function addIcon(x, y) {
        for (var _len5 = arguments.length, args = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
          args[_key5 - 2] = arguments[_key5];
        }

        var sprite = _construct(SpriteIcon, args);

        return this.add(sprite, x, y, 'gui');
      }
    }, {
      key: "addHealthBar",
      value: function addHealthBar(x, y) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
          args[_key6 - 2] = arguments[_key6];
        }

        var sprite = _construct(SpriteHealthBar, args);

        return this.add(sprite, x, y, 'entities');
      }
    }, {
      key: "addPauseHeader",
      value: function addPauseHeader(x, y) {
        for (var _len7 = arguments.length, args = new Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
          args[_key7 - 2] = arguments[_key7];
        }

        var sprite = _construct(SpritePauseHeader, args);

        return this.add(sprite, x, y, 'hui');
      }
    }, {
      key: "addBackground",
      value: function addBackground(x, y) {
        for (var _len8 = arguments.length, args = new Array(_len8 > 2 ? _len8 - 2 : 0), _key8 = 2; _key8 < _len8; _key8++) {
          args[_key8 - 2] = arguments[_key8];
        }

        var sprite = _construct(SpriteBackground, args);

        return this.add(sprite, x, y, 'bui');
      }
    }, {
      key: "addLoadingBar",
      value: function addLoadingBar(x, y) {
        for (var _len9 = arguments.length, args = new Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
          args[_key9 - 2] = arguments[_key9];
        }

        var sprite = _construct(SpriteLoadingBar, args);

        return this.add(sprite, x, y, 'gui');
      }
    }, {
      key: "addBrandingIcon",
      value: function addBrandingIcon(x, y) {
        for (var _len10 = arguments.length, args = new Array(_len10 > 2 ? _len10 - 2 : 0), _key10 = 2; _key10 < _len10; _key10++) {
          args[_key10 - 2] = arguments[_key10];
        }

        var sprite = _construct(SpriteBrandingIcon, args);

        return this.add(sprite, x, y, 'gui');
      }
    }, {
      key: "add",
      value: function add(sprite, x, y, layer) {
        sprite.x = x;
        sprite.y = y;
        this.layers[layer].addChild(sprite);
        return sprite;
      } //*******************************************************************************************************************
      // * New
      //*******************************************************************************************************************

    }, {
      key: "newRect",
      value: function newRect(rect, fillColor, borderColor, width) {
        var sprite = new PIXI.Graphics();
        this.drawRect(sprite, rect, fillColor, borderColor, width);
        return sprite;
      }
    }, {
      key: "newRoundedRect",
      value: function newRoundedRect(rect, fillColor, borderColor, width, rounding) {
        var sprite = new PIXI.Graphics();
        this.drawRoundedRect(sprite, rect, fillColor, borderColor, width, rounding);
        return sprite;
      } //*******************************************************************************************************************
      // * Redraw
      //*******************************************************************************************************************

    }, {
      key: "drawRect",
      value: function drawRect(sprite, rect, fillColorId, borderColorId, width) {
        var fillColor = colors[fillColorId];
        var borderColor = colors[borderColorId];
        var fillAlpha = fillColorId === null ? 0 : 1;
        var borderAlpha = borderColorId === null ? 0 : 1;
        sprite.beginFill(fillColor, fillAlpha);
        sprite.lineStyle(width, borderColor, borderAlpha, 0);
        sprite.drawRect(0, 0, rect.w, rect.h);
        sprite.endFill();
      }
    }, {
      key: "drawRoundedRect",
      value: function drawRoundedRect(sprite, rect, fillColorId, borderColorId, width, rounding) {
        var fillColor = colors[fillColorId];
        var borderColor = colors[borderColorId];
        var fillAlpha = fillColorId === null ? 0 : 1;
        var borderAlpha = borderColorId === null ? 0 : 1;
        sprite.beginFill(fillColor, fillAlpha);
        sprite.lineStyle(width, borderColor, borderAlpha);
        sprite.drawRoundedRect(0.5, -0.5, rect.w, rect.h, rounding);
        sprite.endFill();
        sprite.cacheAsBitmap = true;
      }
    }, {
      key: "redrawRect",
      value: function redrawRect(sprite, size, fillColor, borderColor) {
        var width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
        sprite.clear();
        this.drawRect(sprite, size, fillColor, borderColor, width);
      }
    }, {
      key: "redrawRoundedRect",
      value: function redrawRoundedRect(sprite, size, fillColor, borderColor) {
        var width = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
        var rounding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
        sprite.cacheAsBitmap = false;
        sprite.clear();
        this.drawRoundedRect(sprite, size, fillColor, borderColor, width, rounding);
      } //*******************************************************************************************************************
      // * Generation
      //*******************************************************************************************************************

    }, {
      key: "generateColoredFonts",
      value: function generateColoredFonts() {
        var data = PIXI.Loader.shared.resources['assets/MunroFont.fnt'].data;
        var fontImage = PIXI.Loader.shared.resources['assets/MunroFont_0.png'].data;
        colors.forEach(function (color, index) {
          var canvas = document.createElement('Canvas');
          var ctx = canvas.getContext('2d');
          ctx.drawImage(fontImage, 0, 0);
          ctx.globalCompositeOperation = 'source-in';
          ctx.fillStyle = '#' + '0'.repeat(6 - color.toString(16).length) + color.toString(16);
          ctx.fillRect(0, 0, 256, 256);
          var sprite = new PIXI.Sprite.from(canvas);
          var texture = sprite.texture;
          PIXI.BitmapText.fonts['Munro' + index] = PIXI.BitmapText.registerFont(data, texture);
        });
      }
    }, {
      key: "generateIconsetVariations",
      value: function generateIconsetVariations() {
        var iconsetImage = PIXI.Loader.shared.resources['assets/fwIconset.png'].data;
        var color = this.colors[2];
        var canvas = document.createElement('Canvas');
        var ctx = canvas.getContext('2d');
        ctx.canvas.width = 256;
        ctx.canvas.height = 256;
        ctx.drawImage(iconsetImage, 0, 0);
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillStyle = '#' + '0'.repeat(6 - color.toString(16).length) + color.toString(16);
        ctx.fillRect(0, 0, 256, 256);
        var sprite = new PIXI.Sprite.from(canvas);
        var texture = sprite.texture;
        PIXI.custom.iconsets = {
          enabled: PIXI.Loader.shared.resources['assets/fwIconset.png'].texture,
          disabled: texture
        };
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "setLayer",
      value: function setLayer(sprite, name) {
        sprite.setParent(this.layers[name]);
      }
    }, {
      key: "setCursor",
      value: function setCursor(type) {
        this.cursor = type;
      }
    }, {
      key: "getFrameData",
      value: function getFrameData(image, frame) {
        var _frame$split = frame.split(':'),
            _frame$split2 = _slicedToArray(_frame$split, 2),
            anim = _frame$split2[0],
            index = _frame$split2[1];

        if (!PIXI.Loader.shared.resources["assets/entities.json"].data) debugger;
        var data = PIXI.Loader.shared.resources["assets/entities.json"].data.frames[image + '.png'].anim;

        if (!data) {
          return {};
        }

        if (data[anim] === undefined) debugger;
        var frameData = data[anim][index]; //frameData.fx =

        return frameData;
      }
    }, {
      key: "getFrameCount",
      value: function getFrameCount(image, anim) {
        return PIXI.Loader.shared.resources["assets/entities.json"].data.frames[image + '.png'].anim[anim].length;
      }
    }]);

    return Graphics;
  }();

  return Graphics;
});