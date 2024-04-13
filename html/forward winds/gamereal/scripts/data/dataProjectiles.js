"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Projectile Data
  //*******************************************************************************************************************
  var projectiles = {
    arrow: {
      anim: 'arrow',
      startPos: [0, 2],
      movement: 'horizontal',
      dir: 'AIM'
    },
    attack: {
      anim: 'attack',
      movement: 'none'
    },
    seed: {
      anim: 'seed',
      startPos: [2, -2],
      movement: 'ranged'
    },
    seed_b: {
      anim: 'seed',
      startPos: [14, -6],
      movement: 'ranged'
    },
    rock: {
      anim: 'rock',
      image: 'proj_rock',
      startPos: [5, -8],
      movement: 'angledProjectile',
      mods: {
        dmgMulti: 2.5
      },
      onHit: 'shatter',
      collisionMode: 'atkbox'
    },
    garrow: {
      anim: 'arrow',
      startPos: [0, -1],
      movement: 'horizontal'
    },
    shuriken: {
      anim: 'shuriken',
      startPos: [2, 2],
      movement: 'ranged',
      collisionMode: 'atkbox'
    },
    lance: {
      anim: 'lance',
      image: 'proj_lance',
      startPos: [5, -4],
      movement: 'horizontal',
      collisionMode: 'atkbox'
    },
    spore: {
      anim: 'spore',
      startPos: [-2, 0],
      movement: 'ranged'
    },
    apull: {
      anim: 'apull',
      image: 'proj_apull',
      startPos: [22, 5],
      movement: 'none',
      mods: {
        dmgMulti: 0,
        reaction: 'pushTangle'
      },
      onHit: 'tanglePull'
    },
    acid: {
      anim: 'spore',
      startPos: [4, 6],
      movement: 'horizontal'
    },
    orb: {
      anim: 'spore',
      startPos: [0, 2],
      movement: 'straight'
    },
    bubble: {
      anim: 'spore',
      startPos: [3, -6],
      movement: 'ranged'
    },
    eyebeam: {
      anim: 'spore',
      startPos: [8, -1],
      movement: 'horizontal'
    },
    rockbig: {
      anim: 'rockbig',
      image: 'proj_rockbig',
      startPos: [8, -10],
      movement: 'angledProjectile',
      onHit: 'shatter',
      collisionMode: 'atkbox'
    },
    leaf: {
      anim: 'seed',
      startPos: [4, -11],
      lingerTime: 3,
      movement: 'none',
      onStart: 'leafStrike'
    },
    hattack: {
      anim: 'attack',
      startPos: [30, 10],
      movement: 'none'
    },
    push: {
      anim: 'splash',
      movement: 'none',
      mods: {
        dmgMulti: 0,
        reaction: 'push'
      }
    }
  };
  return projectiles;
});