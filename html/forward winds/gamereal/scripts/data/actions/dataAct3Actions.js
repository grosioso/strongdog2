"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Act 3 Action Data >>> REMEMBER TO CHECK THE ******* COMMAS <<<
  //*******************************************************************************************************************
  var dataAct3Actions = {
    //*******************************************************************************************************************
    // ** Stage 7
    //*******************************************************************************************************************
    summonHealingWard: {
      condition: function condition(game, entity) {
        return entity.hp / entity.mhp < 0.80;
      },
      data: [['generateEnemy', 'g5', {
        dir: 'LEFT',
        relative: 'SELF',
        distance: 90,
        height: -1
      }]],
      uses: 1
    },
    healSummoner: {
      condition: function condition(game, entity) {
        return true;
      },
      data: [['wait', 90], ['addReaction', '@SUMMONER', 'wardHealingState'], ['setAnim', 'shine'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 3, {
        "var": 'ANIM_FRAMES:shine'
      }], ['wait', 4], ['setFrame', 'idle:0']],
      uses: 1
    },
    wardHealingState: {
      condition: function condition(game, entity) {
        return true;
      },
      data: [['addState', ['wardHealing', {
        stats: [['hpr', 25]]
      }]], ['wait', 180], ['removeState', 'wardHealing']]
    },
    summonExplosiveWard: {
      data: [['selfDestruct'], ['setTimer', 'fade', 0], ['generateEnemy', 'g6', {
        dir: 'LEFT',
        relative: 'SELF',
        distance: 0,
        height: 6
      }]]
    },
    wardExplode: {
      condition: function condition(game, entity) {
        return true;
      },
      data: [['setAnim', 'countdown'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 1, 2], ['wait', 78], ['advanceFrame'], ['wait', 4], ['repeatPhase', 5, 6], ['repeatPhase', 4, 2], ['wait', 78], ['advanceFrame'], ['wait', 4], ['repeatPhase', 10, 3], ['setAnim', 'explode'], ['performHit', {
        reaction: 'pushExplosion'
      }], ['wait', 4], ['advanceFrame'], ['repeatPhase', 14, {
        "var": 'ANIM_FRAMES:explode'
      }], ['selfDestruct']]
    },
    summonShootingWards: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['wait', 30], ['generateEnemy', 'g7', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 58
      }], ['wait', 65], ['generateEnemy', 'g7', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 71
      }], ['wait', 65], ['generateEnemy', 'g7', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 83
      }], ['wait', 30]],
      uses: 1
    },
    summonTrioWards: {
      condition: function condition(game, entity) {
        return entity.hp / entity.mhp < 0.40;
      },
      data: [['generateProjectile', 'apull'], ['wait', 30], ['generateEnemy', 'g5', {
        dir: 'LEFT',
        relative: 'SELF',
        distance: 38
      }], ['generateEnemy', 'g7', {
        dir: 'LEFT',
        relative: 'SELF',
        distance: 101
      }], ['generateEnemy', 'g7', {
        dir: 'LEFT',
        relative: 'SELF',
        distance: 123
      }]],
      uses: 1
    },
    //*******************************************************************************************************************
    // ** Stage 8
    //*******************************************************************************************************************
    mutateH: {
      data: [['setAnim', 'mutate'], ['wait', 4], ['performHit', {
        dmgMulti: 0,
        reaction: 'push',
        sfx: 'enemy_roar'
      }], ['advanceFrame'], ['repeatPhase', 1, 9], ['generateEnemy', 'h7', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 88
      }, false], ['advanceFrame'], ['wait', 4], ['repeatPhase', 6, {
        "var": 'ANIM_FRAMES:mutate,-9'
      }], ['generateEnemy', 'h2', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 0
      }], ['generateEnemy', 'h7', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 32
      }], ['generateEnemy', 'h7', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 50
      }], ['selfDestruct']]
    },
    mutateHH: {
      data: [['setAnim', 'mutate'], ['wait', 4], ['performHit', {
        dmgMulti: 0,
        reaction: 'push',
        sfx: 'enemy_roar'
      }], ['advanceFrame'], ['repeatPhase', 1, 4], ['generateEnemy', 'h8', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 32,
        height: 42
      }], ['generateEnemy', 'h8', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 48,
        height: 48
      }], ['generateEnemy', 'h8', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 64,
        height: 40
      }], ['advanceFrame'], ['wait', 4], ['repeatPhase', 8, {
        "var": 'ANIM_FRAMES:mutate,-4'
      }], ['generateEnemy', 'h3', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 1
      }, false], ['selfDestruct']]
    },
    mutateE: {
      data: [['setAnim', 'death'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 1, {
        "var": 'ANIM_FRAMES:death'
      }], ['wait', 4], ['selfDestruct'], ['generateEnemy', 'h5', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 0
      }, false]]
    },
    mutateEE: {
      data: [['setAnim', 'death'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 1, {
        "var": 'ANIM_FRAMES:death'
      }], ['wait', 4], ['selfDestruct'], ['generateEnemy', 'h6', {
        dir: 'RIGHT',
        relative: 'SELF',
        distance: 0
      }, false]]
    },
    spike: {
      data: [['setAnim', 'attack'], ['advanceFrame'], ['performHit'], ['wait', 4], ['repeatPhase', 1, {
        "var": 'ANIM_FRAMES:attack'
      }], ['wait', 4], ['selfDestruct']]
    },
    dive: {
      condition: function condition(game, entity) {
        return !game.entities.aliveEnemies().find(function (e) {
          return e.id == 'h6';
        });
      },
      data: [// Is this too slow?
      ['setGravity', true], ['setVariable', 'floating', false], ['jump', -6]],
      uses: 1,
      urgent: true
    },
    eyeshoot: {
      condition: function condition(game, entity) {
        return true;
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['wait', 30], ['setFrame', 'shoot:0'], ['wait', 4], ['advanceFrame'], ['generateProjectile', 'orb'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 6, {
        "var": 'ANIM_FRAMES:shoot,-1'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['waitTo', 120]]
    },
    //*******************************************************************************************************************
    // ** Stage 9
    //*******************************************************************************************************************
    gnaw: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character, 6);
      },
      data: [['wait', 4], ['setAnim', 'attack'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 2, 2], ['wait', 4], ['advanceFrame'], ['repeatPhase', 5, 2], ['resetHitTrigger'], ['performHit'], ['wait', 4], ['advanceFrame'], ['wait', 4], ['resetHitTrigger'], ['performHit'], ['setFrame', 'attack:2'], ['resetReapats'], ['repeatPhase', 5, 88], ['setAnim', 'idle']]
    },
    takeoff: {
      condition: function condition(game, entity) {
        return true;
      },
      data: [['jump', 0.6], ['wait', 4], ['setVariable', 'floating', true], ['setVariable', 'gravity', false], ['jump', 0], ['setDirection', 'TOWARDS_PLAYER'], ['setFrame', 'emerge:0'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 7, {
        "var": 'ANIM_FRAMES:emerge'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['waitTo', 30]],
      uses: 1
    },
    summonCrawloid: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['wait', 75], ['setAnim', 'spew'], ['wait', 4], ['performHit', {
        dmgMulti: 0,
        reaction: 'push',
        sfx: 'enemy_roar'
      }], ['advanceFrame'], ['repeatPhase', 2, 4], ['wait', 4], ['advanceFrame'], ['repeatPhase', 6, {
        "var": 'ANIM_FRAMES:spew,-4'
      }], ['generateEnemy', 'i5', {
        dir: 'TOWARDS_PLAYER',
        relative: 'SELF',
        distance: 32
      }, false], ['wait', 4], ['setFrame', 'idle:0'], ['wait', 180]],
      uses: 3
    },
    rockbigThrow: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character, entity.range) && !entity.inRange(game.character);
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['wait', 30], ['setFrame', 'shoot:0'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 3, 6], ['generateProjectile', 'rockbig'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 7, {
        "var": 'ANIM_FRAMES:shoot,-6'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['wait', 4], ['conditionalWait', 5, function (game, entity) {
        return entity.inRange(game.character) && entity.action.duration > 60;
      }], ['repeatPhase', 11, 11]]
    },
    trembleCyclops: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['setAnim', 'tremblefull'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 1, 4], ['wait', 4], ['setFrame', 'tremblefull:6'], ['wait', 5], ['advanceFrame'], ['wait', 5], ['resetReapats'], ['repeatPhase', 5, 128], ['setFrame', 'idle:0']]
    },
    // Part 2
    bloomShatter: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['combatSetupCamera', 42 * 16 - 2, 16 * 16], ['setTimer', '@CHARACTER', 'relish', 60], ['move', '@CHARACTER', 'RIGHT', 0], ['setAnim', 'shatter'], ['advanceFrame'], ['performHit'], ['wait', 4], ['repeatPhase', 4, {
        "var": 'ANIM_FRAMES:shatter'
      }], ['selfDestruct']]
    },
    leafShoot: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character, entity.range) && !entity.inRange(game.character);
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['wait', {
        "var": 'RAND_RANGE:15,55'
      }], ['setFrame', 'shoot:0'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 3, 5], ['generateProjectile', 'leaf'], ['wait', {
        "var": 'RAND_RANGE:2,6'
      }], ['generateProjectile', 'leaf'], ['wait', {
        "var": 'RAND_RANGE:2,6'
      }], ['generateProjectile', 'leaf'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 12, {
        "var": 'ANIM_FRAMES:shoot,-5'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['waitTo', 120]]
    },
    // Part 3
    giveFreeItem: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character, 128);
      },
      data: [['giveItem']],
      uses: 1
    },
    abyssAttack: {
      condition: function condition(game, entity) {
        return entity.inRange(game.character);
      },
      data: [['setDirection', 'TOWARDS_PLAYER'], ['wait', 26], ['setFrame', 'attack:0'], ['wait', 4], ['advanceFrame'], ['performHit'], ['repeatPhase', 3, {
        "var": 'ANIM_FRAMES:attack'
      }], ['wait', 4], ['setFrame', 'idle:0'], ['waitTo', 60]]
    }
  };
  return dataAct3Actions;
});