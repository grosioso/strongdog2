"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game'], function (game) {
  //*******************************************************************************************************************
  // ** A Helpful Tip
  //*******************************************************************************************************************
  var Tip = /*#__PURE__*/function () {
    function Tip() {
      _classCallCheck(this, Tip);

      this.text = '';
      this.x = 0;
      this.y = 0;
      this.position = 'default';
      this.setup();
    }

    _createClass(Tip, [{
      key: "setup",
      value: function setup() {
        this.sprites = {
          bg: null,
          text: null
        };
        this.sprites.bg = game.graphics.addRoundedRect({
          x: 6,
          y: 111,
          w: 163,
          h: 28
        }, 2, 2, 3, 3);
        this.sprites.text = game.graphics.addText(0, 110, '', 3);
        this.sprites.text.x = game.graphics.center.x;
        this.sprites.text.anchor.x = 0.5;
        this.sprites.text.font.align = 'center';
        this.sprites.bg.visible = false;
      } //*******************************************************************************************************************
      // * Base Functions
      //*******************************************************************************************************************

    }, {
      key: "set",
      value: function set(text, position) {
        this.text = text;
        this.position = position;
        this.refresh();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.set('');
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.sprites.text.visible = this.text != '';
        this.sprites.bg.visible = this.text != '';
        this.sprites.text.text = this.text;
        this.sprites.text.y = this.position == 'upper' ? 30 : 110;
        this.sprites.bg.y = this.position == 'upper' ? 31 : 111;
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }]);

    return Tip;
  }();

  return Tip;
});