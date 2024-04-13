"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Enemy Data
  //*******************************************************************************************************************
  var enemies = {
    // Stage 1
    a1: {
      level: 1,
      image: 'a1_slime'
    },
    a2: {
      level: 2,
      image: 'a1_rock'
    },
    a3: {
      level: 3,
      image: 'a1_rabbit',
      trigger: ['a2', 1],
      mhp: 0.8,
      actions: ['hop'],
      emergeAction: 'emerge'
    },
    a4: {
      level: 4,
      image: 'a1_boss',
      mhp: 2,
      dmg: 1.5,
      stageboss: true
    },
    // Stage 2
    b1: {
      level: 5,
      image: 'a2_plant',
      exp: 1.5
    },
    b2: {
      level: 6,
      image: 'a2_flower',
      range: 64,
      actions: ['pngShoot']
    },
    b3: {
      level: 7,
      image: 'a2_grassplant',
      mhp: 2.0
    },
    b4: {
      level: 8,
      image: 'a2_wildflower',
      mhp: 0.7,
      dmg: 1.4,
      trigger: ['b3', 1],
      range: 64,
      actions: ['pngShoot']
    },
    b5: {
      level: 10,
      image: 'a2_root',
      dmg: 0.4,
      actions: ['spinAttack']
    },
    b6: {
      level: 11,
      image: 'a2_bush',
      actions: ['doubleAttack']
    },
    b7: {
      level: 12,
      image: 'a2_weed',
      mhp: 1.2,
      actions: ['idle']
    },
    b8: {
      level: 13,
      image: 'a2_beastplant',
      mhp: 2.0,
      dmg: 0.8,
      range: 120,
      actions: ['trishot', 'tremble'],
      stageboss: true
    },
    // Stage 3
    c1: {
      level: 15,
      image: 'a3_molo',
      mhp: 6.0,
      dmg: 1.5,
      arm: 1.2,
      exp: 8.0,
      actions: ['moleAdPhase', 'moleAdPhaseII', 'moleRoar', 'clawAttack', 'longAttack'],
      stageboss: true
    },
    c2: {
      level: 14,
      image: 'a3_spiky',
      mhp: 2.0,
      dmg: 1.0,
      exp: 1.5
    },
    // Stage 4
    d1: {
      level: 16,
      image: 'a4_sentrylight',
      arm: 1.3,
      dmg: 1.5
    },
    d2: {
      level: 17,
      image: 'a4_sentrythrower',
      revive: ['d3', 1],
      range: 80,
      arm: 1.1,
      actions: ['rockThrow']
    },
    d3: {
      level: 18,
      image: 'a4_sentryheavy',
      mhp: 1.5,
      dmg: 1.0
    },
    d4: {
      level: 19,
      image: 'a4_illubirdgeneral',
      mhp: 1.7,
      dmg: 1.0
    },
    d5: {
      level: 20,
      image: 'a4_illubirdsniper',
      mhp: 0.4,
      arm: 0.2,
      dmg: 1.3,
      trigger: ['d4', 1],
      projectile: 'garrow',
      range: 64,
      actions: ['pngShoot'],
      emergeAction: 'emerge'
    },
    d6: {
      level: 21,
      image: 'a4_ghoul',
      mhp: 1.8,
      dmg: 1.2,
      actions: ['hop', 'settle']
    },
    d7: {
      level: 21,
      image: 'a4_skeleton',
      revive: ['d7', 1],
      reviveAction: 'reposition',
      mhp: 1.2,
      arm: 1.4,
      dmg: 1.1
    },
    // Stage 5
    e1: {
      level: 22,
      image: 'a5_peon',
      mhp: 0.8,
      dmg: 1.4
    },
    e2: {
      level: 23,
      image: 'a5_general',
      mhp: 2.0,
      arm: 1.2,
      dmg: 1.2
    },
    e3: {
      level: 24,
      image: 'a5_archer',
      dmg: 0.8,
      projectile: 'garrow',
      range: 80,
      actions: ['pngShoot']
    },
    e4: {
      level: 24,
      image: 'a5_archer',
      dmg: 0.8,
      trigger: ['e3', 1],
      projectile: 'garrow',
      range: 80,
      actions: ['pngShoot'],
      emergeAction: 'emerge'
    },
    e5: {
      level: 25,
      image: 'a5_sniper',
      trigger: ['e3', 1],
      mhp: 1.4,
      projectile: 'garrow',
      range: 80,
      actions: ['sharpshoot'],
      emergeAction: 'emerge'
    },
    e6: {
      level: 26,
      image: 'a5_lord',
      mhp: 3.5,
      arm: 1.2,
      actions: ['run', 'settle', 'uberBash'],
      stageboss: true
    },
    // Stage 6
    f1: {
      level: 40,
      image: 'a6_fairy',
      mhp: 20,
      actions: ['trial'],
      stageboss: true
    },
    f2: {
      level: 27,
      image: 'a6_firsty',
      mhp: 2,
      exp: 2.0,
      actions: ['hop', 'settle']
    },
    f3: {
      level: 28,
      image: 'a6_stabby',
      dmg: 1.5,
      actions: ['hop', 'settle']
    },
    f4: {
      level: 29,
      image: 'a6_shooty',
      projectile: 'garrow',
      range: 80,
      actions: ['sharpshoot']
    },
    f5: {
      level: 30,
      image: 'a6_tanky',
      mhp: 2.0,
      exp: 2.0
    },
    f6: {
      level: 31,
      image: 'a6_throwy',
      projectile: 'shuriken',
      range: 80,
      actions: ['sharpshoot']
    },
    f7: {
      level: 32,
      image: 'a6_greaty',
      mhp: 3,
      dmg: 1.5,
      exp: 3.0,
      actions: ['hop', 'settle', 'longAttack']
    },
    f8: {
      level: 32,
      image: 'a6_lancy',
      mhp: 0.7,
      projectile: 'lance',
      range: 80,
      actions: ['lanceThrow']
    },
    // Stage 7
    g1: {
      level: 33,
      image: 'a7_one',
      mhp: 2.0,
      dmg: 1.5,
      arm: 1.2,
      exp: 2,
      actions: ['summonHealingWard']
    },
    g2: {
      level: 34,
      image: 'a7_two',
      mhp: 2.0,
      dmg: 1.4,
      arm: 1.1,
      gravity: false,
      exp: 2,
      onDeath: 'summonExplosiveWard'
    },
    g3: {
      level: 35,
      image: 'a7_three',
      mhp: 4.0,
      dmg: 1.0,
      arm: 1.2,
      actions: ['summonShootingWards', 'idle']
    },
    g4: {
      level: 36,
      image: 'a7_four',
      mhp: 4.0,
      dmg: 1.5,
      arm: 1.1,
      exp: 2,
      actions: ['summonTrioWards'],
      stageboss: true
    },
    g5: {
      level: 33,
      image: 'a7_wardh',
      mhp: 0.8,
      arm: 0.6,
      actions: ['healSummoner', 'idle']
    },
    g6: {
      level: 34,
      image: 'a7_warde',
      mhp: 3.5,
      dmg: 5.0,
      gravity: false,
      actions: ['wardExplode']
    },
    g7: {
      level: 34,
      image: 'a7_wards',
      arm: 0.6,
      projectile: 'spore',
      range: 80,
      actions: ['sharpshoot']
    },
    // Stage 8
    h1: {
      level: 38,
      image: 'a8_head',
      mhp: 2.0,
      dmg: 1.2,
      arm: 1.0,
      projectile: 'acid',
      range: 100,
      actions: ['pngShoot'],
      onDeath: 'mutateH'
    },
    h2: {
      level: 39,
      image: 'a8_header',
      mhp: 1.6,
      dmg: 2.0,
      arm: 1.1,
      onDeath: 'mutateHH'
    },
    h3: {
      level: 40,
      image: 'a8_headest',
      mhp: 3.0,
      dmg: 0.6,
      arm: 1.1,
      stageboss: true
    },
    h4: {
      level: 37,
      image: 'a8_egg',
      mhp: 2.0,
      arm: 1.0,
      actions: ['idle'],
      onDeath: 'mutateE'
    },
    h5: {
      level: 38,
      image: 'a8_egger',
      mhp: 1.8,
      arm: 0.8,
      actions: ['idle'],
      trigger: ['h1', 1, 'dead'],
      onDeath: 'mutateEE',
      spawnInactive: true
    },
    h6: {
      level: 39,
      image: 'a8_eggest',
      mhp: 2.8,
      arm: 1.2,
      actions: ['idle'],
      trigger: ['h2', 1, 'dead'],
      spawnInactive: true
    },
    h7: {
      level: 39,
      image: 'a8_spike',
      arm: 0.3,
      dmg: 2.0,
      actions: ['idle'],
      onDeath: 'spike'
    },
    h8: {
      level: 40,
      image: 'a8_eye',
      arm: 0.3,
      dmg: 1.2,
      gravity: false,
      floating: true,
      actions: ['dive', 'eyeshoot']
    },
    h9: {
      level: 40,
      proportions: {
        w: 10,
        h: 10
      },
      image: 'a8_mainbody',
      gravity: false,
      trigger: ['h3', 1, 'dead'],
      emergeAction: 'die'
    },
    // Stage 9
    i1: {
      level: 41,
      image: 'a9_wormoid',
      mhp: 1.5,
      dmg: 2.0
    },
    i2: {
      level: 42,
      image: 'a9_jelloid',
      mhp: 1.0,
      dmg: 1.4,
      projectile: 'bubble',
      range: 90,
      trigger: ['any', 1],
      actions: ['pngShoot'],
      emergeAction: 'emerge'
    },
    i3: {
      level: 42,
      image: 'a9_slurpoid',
      mhp: 1.4,
      dmg: 0.6,
      actions: ['gnaw']
    },
    i4: {
      level: 43,
      image: 'a9_eyeoid',
      mhp: 1.2,
      dmg: 1.5,
      projectile: 'eyebeam',
      range: 90,
      trigger: ['any', 3],
      actions: ['pngShoot'],
      emergeAction: 'takeoff'
    },
    i5: {
      level: 43,
      image: 'a9_crawloid',
      mhp: 1.8,
      dmg: 2.0
    },
    i6: {
      level: 43,
      image: 'a9_spawnoid',
      mhp: 2.0,
      arm: 1.6,
      actions: ['summonCrawloid', 'idle']
    },
    i7: {
      level: 44,
      image: 'a9_cycloid',
      mhp: 2.5,
      dmg: 3.0,
      actions: ['longAttack']
    },
    i8: {
      level: 44,
      image: 'a9_cycrocid',
      mhp: 3.0,
      dmg: 3.5,
      range: 70,
      actions: ['rockbigThrow', 'tremble']
    },
    i9: {
      level: 44,
      image: 'a9_bloom',
      mhp: 1.2,
      actions: ['idle'],
      exp: 2,
      onDeath: 'bloomShatter'
    },
    i10: {
      level: 45,
      image: 'a9_springshoot',
      mhp: 2.2,
      dmg: 0.9,
      trigger: ['i9', 1, 'defeated'],
      range: 120,
      actions: ['leafShoot'],
      emergeAction: 'emerge'
    },
    i11: {
      level: 46,
      image: 'a9_abyssform',
      mhp: 8.0,
      dmg: 3.0,
      arm: 1.2,
      exp: 4,
      actions: ['giveFreeItem', 'abyssAttack'],
      stageboss: true
    }
  };
  return enemies;
});