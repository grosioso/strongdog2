"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game'], function (game) {
  //*******************************************************************************************************************
  // ** Drawing all the sprites in the scene
  //*******************************************************************************************************************
  var SpritesetStart = /*#__PURE__*/function () {
    function SpritesetStart() {
      _classCallCheck(this, SpritesetStart);

      this.background = null; // this.logo = null
      // this.moreGames = null
      // this.likeUs = null
    }

    _createClass(SpritesetStart, [{
      key: "setup",
      value: function setup() {
        this.setupBackground(); // this.setupLogo()
        // this.setupLinks()
      }
    }, {
      key: "setupBackground",
      value: function setupBackground() {
        this.background = game.graphics.addBackground(0, 0, 'Title');
      }
    }, {
      key: "setupLogo",
      value: function setupLogo() {
        var _game$config$logo = _slicedToArray(game.config.logo, 2),
            logo = _game$config$logo[0],
            url = _game$config$logo[1];

        if (logo) {
          this.logo = game.graphics.addLogo(35, 5);
          this.logo.interactive = true;
          this.logo.cursor = 'pointer';
          this.logo.on('click', function (e) {
            var win = window.open(url, '_blank');

            if (win) {
              win.focus();
            }
          });
        }
      }
    }, {
      key: "setupLinks",
      value: function setupLinks() {
        var _this = this;

        if (game.config.armorMode) {
          var links = [['moreGames', 'More Games', 'http://armor.ag/MoreGames'], ['likeUs', 'Like Us!', 'http://www.facebook.com/ArmorGames']];
          links.forEach(function (_ref, index) {
            var _ref2 = _slicedToArray(_ref, 3),
                name = _ref2[0],
                real = _ref2[1],
                url = _ref2[2];

            _this[name] = game.graphics.addText(795, 12 + 36 * index, real);
            _this[name].style.fontSize = 24;
            _this[name].anchor.x = 1;
            _this[name].alpha = 0.8;
            _this[name].interactive = true;
            _this[name].cursor = 'pointer';

            _this[name].on('click', function (e) {
              var win = window.open(url, '_blank');

              if (win) {
                win.focus();
              }
            });
          });
        }
      }
    }, {
      key: "update",
      value: function update() {//this.updateControls()
        //this.wb.update()
      }
    }, {
      key: "dispose",
      value: function dispose(transition) {
        if (transition) {
          this.background.setTransition(8);
        } else {
          this.background.destroy();
        } // if (this.logo) {
        //   this.logo.destroy()
        // }
        // if (game.config.armorMode) {
        //   this.moreGames.destroy()
        //   this.likeUs.destroy()
        // }

      }
    }]);

    return SpritesetStart;
  }();

  return SpritesetStart;
});