"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'spritesetGameover'], function (game, SpritesetGameover) {
  //*******************************************************************************************************************
  // ** The Gameover/Restart Scene
  //*******************************************************************************************************************
  var SceneGameover = /*#__PURE__*/function () {
    function SceneGameover() {
      _classCallCheck(this, SceneGameover);

      this.spriteset = new SpritesetGameover();
      this.brandingIcon = null;
      this.restartRect = {
        x: 0,
        y: game.graphics.height - 34,
        w: game.graphics.width,
        h: 34
      };
    }

    _createClass(SceneGameover, [{
      key: "enter",
      value: function enter() {
        game.audio.fadeOst(false); // testing

        game.storage.save();
        this.spriteset.setup();
        this.brandingIcon = game.graphics.addBrandingIcon(1, 111);
        this.showPanels();
      }
    }, {
      key: "showPanels",
      value: function showPanels() {
        game.panels.activate(['Stats', 'Items', 'Switcher']);
      }
    }, {
      key: "update",
      value: function update() {
        this.clearTooltips();
        this.updateInput();

        if (game.sceneManager.sceneActive(this)) {
          this.brandingIcon.visible = !game.tips.blockingTip();
          this.spriteset.update();
        }
      }
    }, {
      key: "clearTooltips",
      value: function clearTooltips() {
        game.tooltips.forEach(function (t) {
          return t.clear();
        });
      }
    }, {
      key: "updateInput",
      value: function updateInput() {
        if (game.input.mouseWithin(this.restartRect)) {
          game.graphics.setCursor('pointer');

          if (game.input.mouseClicked) {
            if (game.tips.blockingTip()) {
              game.tips.hideCurrent();
            } else {
              if (!game.input.mouseWithin(this.brandingIcon.getMyRect())) {
                game.sceneManager.changeTo('Combat');
              }
            }
          }
        }
      }
    }, {
      key: "exit",
      value: function exit() {
        game.audio.fadeOst(true); // testing

        game.storage.save();
        game.combat.resetInstructionsShown = true;
        game.panels.deactivate(['Stats', 'Items', 'Skills', 'Relics', 'Settings', 'Switcher']);
        this.spriteset.dispose();
        this.brandingIcon.destroy();
      }
    }]);

    return SceneGameover;
  }();

  return SceneGameover;
});