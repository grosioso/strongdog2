"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Act 1 Action Data >>> REMEMBER TO CHECK THE ******* COMMAS <<<
  //*******************************************************************************************************************
  var dataAct1Actions = {
    //*******************************************************************************************************************
    // ** Stage 1
    //*******************************************************************************************************************
    //*******************************************************************************************************************
    // ** Stage 2
    //*******************************************************************************************************************
    spinAttack: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['wait', 25], ['setFrame', 'spin:0'], ['wait', 5], ['advanceFrame'], ['performHit'], ['wait', 1], ['repeatPhase', 3, 3], ['resetHitTrigger'], ['setFrame', 'spin:0'], ['repeatPhase', 3, 5], ['setFrame', 'spin:4'], ['wait', 5], ['setFrame', 'idle:0'], ['wait', 10]]
    },
    doubleAttack: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['wait', 30], ['setFrame', 'attack:0'], ['wait', 5], ['advanceFrame'], ['resetHitTrigger'], ['performHit'], ['repeatPhase', 2, 2], ['wait', 5], ['repeatPhase', 1, 2], ['setFrame', 'idle:0']],
      uses: 1
    },
    trishot: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character, entity.range) && !entity.inRange(game.character);
      },
      data: [['wait', 25], ['setFrame', 'shoot:0'], ['wait', 5], ['setFrame', 'shoot:1'], ['generateProjectile', 'seed_b'], ['wait', 15], ['repeatPhase', 4, 3], ['setFrame', 'shoot:2'], ['wait', 5], ['setFrame', 'idle:0'], ['wait', 25]]
    },
    tremble: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['setAnim', 'tremble'], ['wait', 5], ['advanceFrame', 2], ['repeatPhase', 1, 9]]
    },
    //*******************************************************************************************************************
    // ** Stage 3
    //*******************************************************************************************************************
    clawAttack: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character) && entity.hp / entity.mhp < 0.2 + Math.random() * 0.7;
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['wait', 30], ['setFrame', 'claw:0'], ['wait', 4], ['advanceFrame'], ['performHit', {
        dmgMulti: 2
      }], ['repeatPhase', 3, {
        "var": 'ANIM_FRAMES:claw'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['waitTo', 120]],
      uses: 5
    },
    moleRoar: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character) && entity.hp / entity.mhp < Math.random() * 0.9;
      },
      data: [['setAnim', 'roar'], ['wait', 4], ['advanceFrame'], ['performHit', {
        dmgMulti: 0,
        reaction: 'push',
        sfx: 'enemy_roar'
      }], ['repeatPhase', 1, {
        "var": 'ANIM_FRAMES:roar'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['generateEnemy', 'c2', {
        dir: 'FORWARD',
        relative: 'SELF',
        distance: 54
      }]],
      uses: 1
    },
    moleAdPhase: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character) && entity.hp / entity.mhp < 0.66;
      },
      data: [['giveItem'], ['setAnim', 'dig'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 2, {
        "var": 'ANIM_FRAMES:dig'
      }], ['wait', 4], ['generateEnemy', 'c2', {
        dir: 'FORWARD',
        relative: 'SELF',
        distance: 86
      }], ['teleport', 140], ['setDirection', 'TOWARDS_PLAYER'], ['setAnim', 'digup'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 10, {
        "var": 'ANIM_FRAMES:digup'
      }], ['setFrame', 'idle:0']],
      uses: 1,
      urgent: true
    },
    moleAdPhaseII: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character) && entity.hp / entity.mhp < 0.33;
      },
      data: [['giveItem'], ['setAnim', 'dig'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 2, {
        "var": 'ANIM_FRAMES:dig'
      }], ['wait', 4], ['generateEnemy', 'c2', {
        dir: 'FORWARD',
        relative: 'SELF',
        distance: 86
      }], ['teleport', 140], ['setDirection', 'TOWARDS_PLAYER'], ['setAnim', 'digup'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 10, {
        "var": 'ANIM_FRAMES:digup'
      }], ['setFrame', 'idle:0']],
      uses: 1,
      urgent: true
    }
  };
  return dataAct1Actions;
});