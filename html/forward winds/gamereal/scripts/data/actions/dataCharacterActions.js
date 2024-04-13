"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Character Action Data >>> REMEMBER TO CHECK THE ******* COMMAS <<<
  //*******************************************************************************************************************
  var dataCharacterActions = {
    autoWalk: {
      condition: function condition(game, entity) {
        return true;
      },
      data: [['setAnim', 'move'], ['advanceFrame', 4], ['move', 'FORWARD', 1.7], ['wait', 8]]
    },
    jumpWalk: {
      condition: function condition(game, entity) {
        return !entity.onGround();
      },
      data: [['move', 'FORWARD', 0.9]]
    },
    charAttack: {
      condition: function condition(game, entity) {
        return game.entities.aliveEnemies().find(function (e) {
          return entity.inRange(e, 2, true);
        });
      },
      data: [['move', 'FORWARD', 0], ['setAnim', 'attack'], ['wait', 4], ['advanceFrame'], ['performHit'], ['repeatPhase', 2, 3], ['wait', 4], ['setFrame', 'idle:0'], ['conditionalWait', 4, function (game, entity) {
        return !entity.lastEnemyHit;
      }], ['repeatPhase', 8, 10], ['conditionalWait', 3, function (game, entity) {
        return !entity.lastEnemyHit;
      }]]
    },
    bashStrike: {
      condition: function condition(game, entity) {
        return game.entities.aliveEnemies().find(function (e) {
          return entity.inRange(e, 2, true);
        }) && entity.bsh && Math.random() <= entity.bsh / 100;
      },
      data: [['move', 'FORWARD', 0], ['setAnim', 'bash'], ['wait', 4], ['advanceFrame'], ['performHit', {
        bash: true
      }], ['repeatPhase', 2, 4], ['wait', 4], ['setFrame', 'idle:0'], ['conditionalWait', 4, function (game, entity) {
        return !entity.lastEnemyHit;
      }], ['repeatPhase', 8, 9], ['conditionalWait', 3, function (game, entity) {
        return !entity.lastEnemyHit;
      }]]
    },
    critStrike: {
      condition: function condition(game, entity) {
        return game.entities.aliveEnemies().find(function (e) {
          return entity.inRange(e, 2, true);
        }) && entity.cri && Math.random() <= entity.cri / 100;
      },
      data: [['move', 'FORWARD', 0], ['setAnim', 'crit'], ['wait', 4], ['advanceFrame'], ['performHit', {
        crit: true
      }], ['repeatPhase', 2, 3], ['wait', 4], ['setFrame', 'idle:0'], ['conditionalWait', 4, function (game, entity) {
        return !entity.lastEnemyHit;
      }], ['repeatPhase', 8, 10], ['conditionalWait', 3, function (game, entity) {
        return !entity.lastEnemyHit;
      }]]
    },
    jump: {
      condition: function condition(game, entity) {
        var tile = game.entities.tiles.getAt({
          x: entity.gridPosition.x + entity.direction * 2,
          y: entity.gridPosition.y
        });
        var tile2 = game.entities.tiles.getAt({
          x: entity.gridPosition.x + entity.direction * 2,
          y: entity.gridPosition.y - 1
        });
        return tile && !tile.passable && (!tile2 || tile2.passable) && Math.floor(entity.x) >= entity.gridPosition.x * 16 + entity.direction * 12 && entity.onGround();
      },
      data: [['jump', 2.2]]
    }
  };
  return dataCharacterActions;
});