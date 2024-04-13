"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Stuff to interact With
  //*******************************************************************************************************************
  var interactibles = {
    flag: {
      frame: 'flag:0',
      interact: function interact(game) {
        game.combat.paused = true;

        if (game.combat.victoryShown) {
          game.combat.paused = 'finish';
        } else {
          game.combat.paused = 'end';
          game.scene.spriteset.background = game.graphics.addBackground(0, 0, game.config.adventaleWebsite ? 'WinscreenLink' : 'Winscreen');
          game.scene.spriteset.background.setTransition(16, 'reverse');
          game.scene.spriteset.background.x = Math.round(game.character.x - game.graphics.width / 2) - 1;
          game.scene.spriteset.background.y = game.character.y - 100;
          game.scene.spriteset.background.update();
          game.scene.spriteset.background.setParent(game.graphics.layers.entities);
          game.character.direction = -1;
          game.character.frame = 'poses:0';
          game.scene.spriteset.entities.find(function (s) {
            return s.entity == game.character;
          }).setParent(game.graphics.layers.entities);
          game.scene.spriteset.update();
          game.combat.victoryShown = true;
          game.audio.playSfx('victory');

          if (game.config.adventaleWebsite) {
            setTimeout(function () {
              var linkArea = game.graphics.newRoundedRect({
                x: 0,
                y: 0,
                w: 145,
                h: 19
              }, null, 3, 1, 2);
              linkArea.x = 15;
              linkArea.y = 120;
              linkArea.alpha = 0;
              linkArea.interactive = true;
              linkArea.hitArea = new PIXI.Rectangle(0, 0, 146, 20);

              linkArea.mouseover = function (e) {
                return linkArea.alpha = 1;
              };

              linkArea.mouseout = function (e) {
                return linkArea.alpha = 0;
              };

              linkArea.on('click', function (e) {
                var win = window.open(game.config.adventaleWebsite, '_blank');

                if (win) {
                  win.focus();
                }
              });
              game.scene.spriteset.background.addChild(linkArea);
            }, 250);
          }
        }
      }
    },
    spring: {
      frame: 'spring:0',
      interact: function interact(game) {
        var velocities = [0, 6.1, 9.6];
        var phaseTimes = [0, 0, 90];
        var yDestinations = [0, 25, 8];
        game.character.velocity.y -= velocities[game.character.jmp];
        game.character.timers.phasing = phaseTimes[game.character.jmp];
        game.character.jumping = yDestinations[game.character.jmp];
        game.character.frame = 'poses:1';
        game.audio.playSfx('levelup');
      },
      condition: function condition(game) {
        return game.character.jmp;
      }
    },
    shroom: {
      frame: 'shroom:0',
      interact: function interact(game) {
        game.character.velocity.y -= 3.25;
        game.character.jumping = 42;
        game.character.frame = 'poses:1';
        game.audio.playSfx('levelup');
      }
    },
    chest: {
      frame: 'chest:0',
      interact: function interact(game) {
        var relicIndex = game.character.relicIndex;
        game.character.gainRelic();
        game.character.frame = 'poses:0';
        game.combat.paused = relicIndex != game.character.relicIndex ? 'victory' : 'empty';

        if (game.combat.paused == 'victory') {
          game.audio.playSfx('victory');
        }
      }
    },
    dirt: {
      frame: 'dirt:0',
      isTile: true,
      interact: function interact(game, interactible) {}
    },
    mimic: {
      frame: 'mimic:0',
      interact: function interact(game) {
        game.character.action = null;
        game.character.haltMovement();
        game.character.timers.phasing = 50;
        game.character.timers.wait = 80;
      }
    },
    vortex: {
      frame: 'vortex:0',
      interact: function interact(game) {
        game.character.addReaction('abyssPull');
      },
      condition: function condition(game) {
        return game.character.arc;
      }
    },
    warp1: {
      frame: 'warp:0',
      interact: function interact(game) {
        game.character.x -= 896;
        game.character.y -= 176;
      }
    },
    warp2: {
      frame: 'warp:0',
      interact: function interact(game) {
        game.character.x -= 736;
        game.character.y += 416;
      }
    },
    cameraLocker: {
      frame: 'invisible:0',
      interact: function interact(game) {
        game.combat.setupCamera(512, 816);
      }
    },
    cameraSwitcher: {
      frame: 'invisible:0',
      interact: function interact(game) {
        game.combat.setupCamera(352, 816);
      }
    },
    cameraResetter: {
      frame: 'invisible:0',
      interact: function interact(game) {
        game.combat.resetCamera(4);
      }
    } // // Leaf Jumper
    // i1:{ color:0, interact: function(game) {
    //   game.character.velocity.y = -4.9
    //   game.character.jumping = 12
    //   game.character.timers.phasing = 45
    // }, condition: function(game) {
    //   return game.character.lfj
    // }},

  };
  return interactibles;
});