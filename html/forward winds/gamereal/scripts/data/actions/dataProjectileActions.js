"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Projectile Action Data >>> REMEMBER TO CHECK THE ******* COMMAS <<<
  //*******************************************************************************************************************
  var dataProjectileActions = {
    tanglePull: {
      data: [['setDirection', 'BACKWARD'], ['move', 'BACKWARD', 1.9], ['setTimer', 'linger', 20], ['setAnim', 'animation'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 4, {
        "var": 'ANIM_FRAMES:animation'
      }]]
    },
    shatter: {
      data: [['setAnim', 'animation'], ['wait', 4], ['setTimer', 'linger', 5], ['advanceFrame'], ['repeatPhase', 1, {
        "var": 'ANIM_FRAMES:animation'
      }]]
    },
    leafStrike: {
      data: [['setGravity', true], ['setDirection', 'BACKWARD'], ['accelerate', 'FORWARD', {
        "var": 'RAND_RANGE_FLOAT:0.4,1.4'
      }], ['accelerateVertically', {
        "var": 'RAND_RANGE_FLOAT:-1.6,-2.2'
      }], ['wait', {
        "var": 'RAND_RANGE:25,35'
      }], ['setDirection', 'AWAY_FROM_PLAYER'], ['switchProjectileMovement', 'straight', 7]]
    }
  };
  return dataProjectileActions;
});