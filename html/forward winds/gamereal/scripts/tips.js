"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'dataTips', 'tip'], function (game, DataTips, Tip) {
  //*******************************************************************************************************************
  // ** Tip Manager
  //*******************************************************************************************************************
  var Tips = /*#__PURE__*/function () {
    function Tips() {
      _classCallCheck(this, Tips);

      this.currentTip = null;
      this.statTooltipShown = false;
      this.initializeTips();
      this.initializeTipSprite();
    }

    _createClass(Tips, [{
      key: "initializeTips",
      value: function initializeTips() {
        var _this = this;

        this.tips = [];
        DataTips.forEach(function (data) {
          var tip = {};
          tip.shown = false;
          tip.showCondition = data.showCondition;
          tip.hideCondition = data.hideCondition;
          tip.text = data.text;
          tip.noblock = data.noblock;
          tip.position = data.position || 'default';

          _this.tips.push(tip);
        });
      }
    }, {
      key: "initializeTipSprite",
      value: function initializeTipSprite() {
        this.sprite = new Tip();
      } //*******************************************************************************************************************
      // * Update
      //*******************************************************************************************************************

    }, {
      key: "update",
      value: function update() {
        this.updateShow();
        this.updateHide();
      }
    }, {
      key: "updateShow",
      value: function updateShow() {
        var _this2 = this;

        this.tips.forEach(function (tip) {
          if (game.config.showTips && !tip.shown && tip.showCondition(game)) {
            _this2.sprite.set(tip.text, tip.position);

            _this2.currentTip = tip;
            tip.shown = true;
          }
        });
      }
    }, {
      key: "updateHide",
      value: function updateHide() {
        if (this.currentTip && this.currentTip.hideCondition(game)) {
          this.sprite.set('');
          this.currentTip = null;
        }
      } //*******************************************************************************************************************
      // * Other
      //*******************************************************************************************************************

    }, {
      key: "blockingTip",
      value: function blockingTip() {
        return this.currentTip && !this.currentTip.noblock;
      }
    }, {
      key: "hideCurrent",
      value: function hideCurrent() {
        this.sprite.set('');
        this.currentTip = null;
      }
    }]);

    return Tips;
  }();

  return Tips;
});