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
  // ** Screens shown before the main game
  //*******************************************************************************************************************
  var InitScreen = /*#__PURE__*/function () {
    function InitScreen() {
      _classCallCheck(this, InitScreen);

      this.callback = null;
      this.timer = 0;
      this.logo = null;
      this.assetsLoaded = false;
      this.done = false;
    }

    _createClass(InitScreen, [{
      key: "setup",
      value: function setup(callback) {
        this.setCallback(callback);
        this.setupLogo();
        this.update();
      }
    }, {
      key: "setCallback",
      value: function setCallback(callback) {
        this.callback = callback;
      }
    }, {
      key: "refreshOverlay",
      value: function refreshOverlay() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        game.graphics.layers.base.removeChildren();
        this.overlay = game.graphics['add' + type + 'Sprite'](0, 0, name);
        this.overlay.scale.x = 0.25;
        this.overlay.scale.y = 0.25;
      }
    }, {
      key: "setupLogo",
      value: function setupLogo() {
        var _this = this;

        this.logo = game.graphics.logos[game.graphics.logos.indexOf(this.logo) + 1];

        if (this.logo) {
          this['setup' + this.logo.type + 'Logo']();
          this.timer = this.logo.duration;

          if (this.logo.link) {
            this.overlay.interactive = true;
            this.overlay.cursor = 'pointer';
            this.overlay.on('click', function (e) {
              var win = window.open(_this.logo.link, '_blank');

              if (win) {
                win.focus();
              }
            });
          }
        } else {
          this.setupLoading();
        }
      }
    }, {
      key: "setupImageLogo",
      value: function setupImageLogo() {
        this.refreshOverlay(this.logo.url);
      }
    }, {
      key: "setupVideoLogo",
      value: function setupVideoLogo() {
        this.refreshOverlay(this.logo.url, 'Video');
      }
    }, {
      key: "setupLoading",
      value: function setupLoading() {
        var _this2 = this;

        this.refreshOverlay('assets/loading');
        game.loader.load(function () {
          return _this2.everythingLoaded();
        });
        game.graphics.update();
      }
    }, {
      key: "update",
      value: function update() {
        var _this3 = this;

        var phases = {
          'Logo': this.timer > 0 && this.logo,
          'Loading': this.done == false
        };
        var phase = Object.entries(phases).find(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              name = _ref2[0],
              condition = _ref2[1];

          return condition;
        });

        if (phase) {
          requestAnimationFrame(function () {
            return _this3.update();
          });

          var _phase = _slicedToArray(phase, 2),
              name = _phase[0],
              condition = _phase[1];

          this['update' + name]();
        }
      }
    }, {
      key: "updateLogo",
      value: function updateLogo() {
        this.timer = Math.max(this.timer - 1, 0);

        if (this.timer == 0) {
          this.setupLogo();
        } else {
          this['update' + this.logo.type + 'Logo']();
        }

        game.graphics.update();
      }
    }, {
      key: "updateImageLogo",
      value: function updateImageLogo() {
        this.overlay.alpha = this.timer == 0 ? 1 : Math.min(10 - Math.abs(this.timer - 90) / 9, 1);
      }
    }, {
      key: "updateVideoLogo",
      value: function updateVideoLogo() {//this.overlay.alpha = this.timer == 0 ? 1 : (Math.min(5 - Math.abs(this.timer - 90) / 12, 1))
      }
    }, {
      key: "updateLoading",
      value: function updateLoading() {
        if (this.assetsLoaded == true) {
          this.overlay.visible = false;
          this.done = true;
          this.callback();
        }
      }
    }, {
      key: "everythingLoaded",
      value: function everythingLoaded() {
        this.assetsLoaded = true;
      }
    }]);

    return InitScreen;
  }();

  return InitScreen;
});