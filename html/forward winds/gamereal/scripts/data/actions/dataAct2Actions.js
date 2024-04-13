"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Act 2 Action Data >>> REMEMBER TO CHECK THE ******* COMMAS <<<
  //*******************************************************************************************************************
  var dataAct2Actions = {
    //*******************************************************************************************************************
    // ** Stage 4
    //*******************************************************************************************************************
    rockThrow: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character, entity.range) && !entity.inRange(game.character);
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['wait', 30], ['setFrame', 'shoot:0'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 3, 3], ['generateProjectile', 'rock'], ['wait', 4], ['setFrame', 'idle:0'], ['conditionalWait', 5, function (game, entity) {
        return entity.inRange(game.character) && entity.action.duration > 60;
      }], ['repeatPhase', 9, 11]]
    },
    reposition: {
      condition: function condition(game, entity) {
        return true;
      },
      data: [['teleportRelative', {
        dir: 'RANDOM',
        relative: 'PLAYER',
        distance: 16
      }], ['setDirection', 'TOWARDS_PLAYER'], ['setVariable', 'fallen', false], ['setFrame', 'rise:0'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 3, {
        "var": 'ANIM_FRAMES:rise'
      }], ['wait', 4], ['setFrame', 'idle:0']]
    },
    //*******************************************************************************************************************
    // ** Stage 5
    //*******************************************************************************************************************
    run: {
      condition: function condition(game, entity) {
        return !entity.inRange(game.character) && entity.hp / entity.mhp < 0.6;
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['setAnim', 'move'], ['move', 'FORWARD', 2], ['wait', 4], ['advanceFrame', 4]]
    },
    settle: {
      condition: function condition(game, entity) {
        return entity.frame.includes('move') && entity.inRange(game.character);
      },
      data: [['move', 'FORWARD', 0], ['setFrame', 'idle:0']],
      urgent: true
    },
    uberBash: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character) && entity.hp / entity.mhp < 0.6;
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['setAnim', 'bash'], ['wait', 4], ['advanceFrame'], ['performHit', {
        reaction: 'pushLong'
      }], ['repeatPhase', 0, {
        "var": 'ANIM_FRAMES:bash'
      }], ['wait', 30], ['generateEnemy', 'e2', {
        dir: 'FORWARD',
        relative: 'SELF',
        distance: 420
      }], ['generateEnemy', 'e5', {
        dir: 'FORWARD',
        relative: 'SELF',
        distance: 450
      }]],
      uses: 1,
      urgent: true
    },
    //*******************************************************************************************************************
    // ** Stage 6
    //*******************************************************************************************************************
    trial: {
      condition: function condition(game, entity) {
        return true;
      },
      data: [['generateEnemy', 'f2', {
        dir: 'RIGHT',
        relative: 'PLAYER',
        distance: 32
      }, false], ['conditionalWait', 1, function (game, entity) {
        return game.entities.aliveEnemies().length == 1;
      }], ['repeatPhase', 1, 60], ['generateEnemy', 'f3', {
        dir: 'LEFT',
        relative: 'PLAYER',
        distance: 32
      }, false], ['conditionalWait', 5, function (game, entity) {
        return game.entities.aliveEnemies().filter(function (e) {
          return e.x > game.character.x && e.id != 'f1';
        }).length == 0;
      }], ['repeatPhase', 4, 720], ['conditionalWait', 1, function (game, entity) {
        return game.entities.aliveEnemies().length == 1;
      }], ['repeatPhase', 6, 60], ['generateEnemy', 'f2', {
        dir: 'RIGHT',
        relative: 'PLAYER',
        distance: 18
      }, false], ['conditionalWait', 1, function (game, entity) {
        return game.entities.aliveEnemies().length == 1;
      }], ['repeatPhase', 9, 90], ['generateEnemy', 'f4', {
        dir: 'RIGHT',
        relative: 'PLAYER',
        distance: 45
      }, false], ['conditionalWait', 1, function (game, entity) {
        return game.entities.aliveEnemies().length == 1;
      }], ['repeatPhase', 12, 60], ['generateEnemy', 'f4', {
        dir: 'RIGHT',
        relative: 'PLAYER',
        distance: 70
      }, false], ['conditionalWait', 5, function (game, entity) {
        return game.entities.aliveEnemies().filter(function (e) {
          return e.x < game.character.x && e.id != 'f1';
        }).length == 0;
      }], ['repeatPhase', 15, 720], ['conditionalWait', 1, function (game, entity) {
        return game.entities.aliveEnemies().length == 1;
      }], ['repeatPhase', 17, 90], ['generateEnemy', 'f5', {
        dir: 'LEFT',
        relative: 'PLAYER',
        distance: 20
      }, false], ['conditionalWait', 1, function (game, entity) {
        return game.entities.aliveEnemies().length == 1;
      }], ['repeatPhase', 20, 60], ['generateEnemy', 'f6', {
        dir: 'LEFT',
        relative: 'PLAYER',
        distance: 42
      }, false], ['conditionalWait', 5, function (game, entity) {
        return game.entities.aliveEnemies().filter(function (e) {
          return e.x < game.character.x && e.id != 'f1';
        }).length == 0 || game.entities.aliveEnemies().filter(function (e) {
          return e.x > game.character.x && e.id != 'f1';
        }).length == 0;
      }], ['repeatPhase', 23, 720], ['conditionalWait', 1, function (game, entity) {
        return game.entities.aliveEnemies().length == 1;
      }], ['repeatPhase', 25, 90], ['generateEnemy', 'f7', {
        dir: 'FREE',
        relative: 'PLAYER',
        distance: 48
      }, false], ['conditionalWait', 1, function (game, entity) {
        return game.entities.aliveEnemies().length == 1;
      }], ['repeatPhase', 28, 60], ['generateEnemy', 'f8', {
        dir: 'RIGHT',
        relative: 'PLAYER',
        distance: 64
      }, false]],
      uses: 1
    },
    lanceThrow: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character, entity.range) && !entity.inRange(game.character);
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['wait', 30], ['setFrame', 'shoot:0'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 3, {
        "var": 'ANIM_FRAMES:shoot,-1'
      }], ['generateProjectile', {
        "var": 'IMPLICIT_PROJECTILE'
      }], ['wait', 4], ['advanceFrame'], ['wait', 4], ['setFrame', 'idle:0'], ['waitTo', 60]]
    }
  };
  return dataAct2Actions;
});