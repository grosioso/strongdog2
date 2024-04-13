"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['game', 'worldGenerator'], function (game, WorldGenerator) {
  //*******************************************************************************************************************
  // ** The Combat Class
  //*******************************************************************************************************************
  var Combat = /*#__PURE__*/function () {
    function Combat() {
      _classCallCheck(this, Combat);

      this.worldGenerator = new WorldGenerator();
      this.camera = null;
      this.paused = false;
      this.victoryShown = false;
    }

    _createClass(Combat, [{
      key: "initialize",
      value: function initialize() {
        this.worldGenerator.generate();
        this.paused = 'start';
      }
    }, {
      key: "reset",
      value: function reset() {
        game.world.reset();
        this.worldGenerator.reset();
        this.camera = null;
        this.paused = false;
      }
    }, {
      key: "update",
      value: function update() {
        this.updateCamera();
        this.updateSpells();
        this.updateShoot();
        this.updateDefeat();
        this.updatePause();
      }
    }, {
      key: "updateCamera",
      value: function updateCamera() {
        if (this.camera != null && !this.camera.returning) {
          var speed = this.camera.speed;
          var vx = Math.max(Math.min(this.camera.destination.x - this.camera.x, this.camera.speed), -this.camera.speed);
          var vy = Math.max(Math.min(this.camera.destination.y - this.camera.y, this.camera.speed), -this.camera.speed);
          this.camera.x += vx;
          this.camera.y += vy;
        }
      }
    }, {
      key: "updateSpells",
      value: function updateSpells() {
        var states = ['freeze', 'guard'];
        game.entities.aliveEnemies().concat([game.character]).forEach(function (entity) {
          var x = entity.x + entity.bounds.left - game.graphics.layers.entities.pivot.x;
          var y = entity.y + entity.bounds.up - game.graphics.layers.entities.pivot.y;
          var rect = {
            x: x,
            y: y,
            w: entity.bounds.right * 2,
            h: entity.bounds.down * 2
          };

          if (game.input.mouseWithin(rect)) {
            states.forEach(function (state) {
              if (entity.affectable.includes(state) && !entity.destroyed && game.character[state + 's']) {
                game.graphics.setCursor('pointer');

                if (game.input.unconsumedClick) {
                  entity.addReaction(state + 'State');
                  game.character[state + 's'] -= 1;
                  game.input.consumeClick();
                }
              }
            });
          }
        });
      }
    }, {
      key: "updateShoot",
      value: function updateShoot() {
        if (game.input.unconsumedClick && game.character.arrows > 0) {
          game.character.addReaction('bowAttack');
          game.character.arrows -= 1;
        }
      }
    }, {
      key: "updateDefeat",
      value: function updateDefeat() {
        if (this.lost() && game.character.timers.fade == 0) {
          game.sceneManager.changeTo('Gameover');
        }
      }
    }, {
      key: "updatePause",
      value: function updatePause() {
        if (game.input.mouseClicked) {
          if (this.paused == 'normal' || this.paused == 'start') {
            this.paused = false;
          } else if (this.paused) {
            game.input.consumeClick();
            game.sceneManager.changeTo('Gameover');
          }
        } else if (game.input.keyPressed('p') || game.input.keyPressed(' ')) {
          if (this.paused == 'normal') {
            this.paused = false;
          } else if (this.paused == false) {
            this.paused = 'normal';
          }
        }
      }
    }, {
      key: "lost",
      value: function lost() {
        return game.character.destroyed;
      }
    }, {
      key: "setupCamera",
      value: function setupCamera(x, y) {
        var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8;
        this.camera = {};
        this.camera.x = game.character.x - game.graphics.width / 2;
        this.camera.y = Math.max(game.character.y, game.character.jumping && game.character.jumping * 16 - 12) - game.graphics.height + 2 * 16 + 12;
        this.camera.speed = speed;
        this.camera.destination = {
          x: x,
          y: y
        };
        this.camera.returning = false;
      }
    }, {
      key: "resetCamera",
      value: function resetCamera() {
        var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

        if (this.camera) {
          this.camera.returning = true;
          this.camera.speed = speed;
        }
      }
    }, {
      key: "refreshReturningCamera",
      value: function refreshReturningCamera(px, py) {
        if (this.camera != null) {
          var speed = this.camera.speed;
          var vx = Math.max(Math.min(px - this.camera.x, this.camera.speed), -this.camera.speed);
          var vy = Math.max(Math.min(py - this.camera.y, this.camera.speed), -this.camera.speed);
          this.camera.x += vx;
          this.camera.y += vy;
        }
      }
    }]);

    return Combat;
  }();

  return Combat;
});