"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'spritesetCombat'], function (game, SpritesetCombat) {
  //*******************************************************************************************************************
  // ** Combat (Main Gameplay) Scene
  //*******************************************************************************************************************
  var SceneCombat = /*#__PURE__*/function () {
    function SceneCombat() {
      _classCallCheck(this, SceneCombat);

      this.spriteset = new SpritesetCombat();
      this.speed = 1;
    }

    _createClass(SceneCombat, [{
      key: "enter",
      value: function enter() {
        this.spriteset.reset();
        this.spriteset.setup();
        this.spriteset.update();
      }
    }, {
      key: "update",
      value: function update() {
        this.updateSpeed();
        this.updateCursor();

        if (game.combat.paused) {
          if (game.graphics.transitioningBackground) {
            game.graphics.transitioningBackground.update();
          } else {
            game.combat.update();
          }
        } else {
          for (var i = 0; i < this.speed; i++) {
            game.combat.update();

            if (game.sceneManager.sceneActive(this)) {
              game.entities.update();
              this.spriteset.update();
            }
          }
        }
      }
    }, {
      key: "updateSpeed",
      value: function updateSpeed() {
        this.speed = game.config.cheats && game.input.keyDown('q') ? 10 : 1;
        game.audio.ost && game.config.cheats ? game.audio.ost.rate(this.speed) : '';
      }
    }, {
      key: "updateCursor",
      value: function updateCursor() {
        if (game.combat.paused) {
          game.graphics.setCursor('pointer');
        } else if (game.character.arrows > 0) {
          game.graphics.setCursor('default');
        }
      }
    }, {
      key: "exit",
      value: function exit() {
        game.combat.reset();
        this.spriteset.dispose();
      }
    }]);

    return SceneCombat;
  }();

  return SceneCombat;
});