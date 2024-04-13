"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game'], function (game) {
  //*******************************************************************************************************************
  // ** The Tooltip - Enough Said
  //*******************************************************************************************************************
  var Tooltip = /*#__PURE__*/function () {
    function Tooltip() {
      _classCallCheck(this, Tooltip);

      this.text = '';
      this.x = 0;
      this.y = 0;
      this.align = 'down';
      this.panel = null;
      this.setup();
    }

    _createClass(Tooltip, [{
      key: "setup",
      value: function setup() {
        this.sprites = {
          bg: null,
          text: null
        };
        this.sprites.bg = game.graphics.addRect({
          x: 0,
          y: 0,
          w: 0,
          h: 0
        }, 1, 0, 0, 'gui');
        this.sprites.text = game.graphics.addText(0, 0, '');
        this.sprites.bg.setParent(game.graphics.layers.tooltip);
        this.sprites.text.setParent(game.graphics.layers.tooltip);
        Object.values(this.sprites).forEach(function (s) {
          return s.visible = false;
        });
      } //*******************************************************************************************************************
      // * Base Functions
      //*******************************************************************************************************************

    }, {
      key: "set",
      value: function set(x, y, text, panel) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.panel = panel;
        this.refresh();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.set(0, 0, '', null);
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.sprites.text.visible = this.text != '';
        this.sprites.bg.visible = this.text != '';
        this.sprites.text.text = this.text;
        var width = this.sprites.text.width + 6;
        var height = this.sprites.text.height + 4;
        var x = this.x;
        var y = this.y;
        x = Math.round(Math.max(Math.min(x, 176 - width), 4));
        y = Math.round(Math.max(Math.min(y, this.panelBounds().lower - height), this.panelBounds().upper));
        this.sprites.text.x = x + 3;
        this.sprites.text.y = y + 1;
        this.sprites.bg.x = x;
        this.sprites.bg.y = y;
        game.graphics.redrawRect(this.sprites.bg, {
          w: width,
          h: height
        }, 1, 0);
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "getSize",
      value: function getSize() {
        return {
          w: this.sprites.bg.width,
          h: this.sprites.bg.height
        };
      }
    }, {
      key: "panelBounds",
      value: function panelBounds() {
        var upper = this.panel ? this.panel.y : 4;
        var lower = this.panel ? this.panel.y + this.panel.height : 144 - 4;
        return {
          upper: upper,
          lower: lower
        };
      }
    }]);

    return Tooltip;
  }();

  return Tooltip;
});