"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Generic Enemy Action Data >>> REMEMBER TO CHECK THE ******* COMMAS <<<
  //*******************************************************************************************************************
  var dataEnemyActions = {
    basicAttack: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['wait', 30], ['generateProjectile', 'attack'], ['waitTo', 60]]
    },
    pngAttack: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['wait', 30], ['setFrame', 'attack:0'], ['wait', 4], ['advanceFrame'], ['performHit'], ['repeatPhase', 3, {
        "var": 'ANIM_FRAMES:attack'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['waitTo', 60]]
    },
    longAttack: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['wait', 20], ['setFrame', 'attack:0'], ['wait', 4], ['advanceFrame'], ['performHit'], ['repeatPhase', 3, {
        "var": 'ANIM_FRAMES:attack'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['waitTo', 120]]
    },
    hop: {
      condition: function condition(game, entity) {
        return !entity.inRange(game.character) && entity.inRange(game.character, 72);
      },
      data: [['setAnim', 'move'], ['advanceFrame', 4], ['setDirection', 'TOWARDS_PLAYER'], ['move', 'FORWARD', 0.4], ['wait', 10]]
    },
    shoot: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character, entity.range) && !entity.inRange(game.character);
      },
      data: [['wait', 30], ['generateProjectile', 'seed'], ['wait', 30]]
    },
    pngShoot: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character, entity.range) && !entity.inRange(game.character);
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['wait', 30], ['setFrame', 'shoot:0'], ['wait', 4], ['advanceFrame'], ['generateProjectile', {
        "var": 'IMPLICIT_PROJECTILE'
      }], ['wait', 4], ['advanceFrame'], ['repeatPhase', 6, {
        "var": 'ANIM_FRAMES:shoot,-1'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['waitTo', 60]]
    },
    sharpshoot: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character, entity.range);
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['wait', 30], ['setFrame', 'shoot:0'], ['wait', 4], ['advanceFrame'], ['generateProjectile', {
        "var": 'IMPLICIT_PROJECTILE'
      }], ['wait', 4], ['advanceFrame'], ['repeatPhase', 6, {
        "var": 'ANIM_FRAMES:shoot,-1'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['waitTo', 60]]
    },
    idle: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['wait', 30]]
    },
    standby: {
      condition: function condition(game, entity) {
        return true;
      },
      data: [['wait', 5]]
    },
    spawn: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['setAnim', 'spawn'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 1, {
        "var": 'ANIM_FRAMES:spawn'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['waitTo', 30]]
    },
    pngRise: {
      condition: function condition() {
        return true;
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['setFrame', 'rise:0'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 2, {
        "var": 'ANIM_FRAMES:rise'
      }], ['wait', 4], ['setFrame', 'idle:0']]
    },
    emerge: {
      condition: function condition() {
        return true;
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['setFrame', 'emerge:0'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 2, {
        "var": 'ANIM_FRAMES:emerge'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['waitTo', 30]]
    },
    revive: {
      condition: function condition(game, entity) {
        return true;
      },
      data: [['setFrame', 'idle:0'], ['setVariable', 'fallen', false], ['wait', 5]]
    },
    die: {
      condition: function condition(game, entity) {
        return true;
      },
      data: [['selfDestruct']]
    }
  };
  return dataEnemyActions;
});