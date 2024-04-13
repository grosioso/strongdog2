"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Reaction Data >>> REMEMBER TO CHECK THE ******* COMMAS <<<
  //*******************************************************************************************************************
  var dataReactions = {
    push: {
      condition: function condition() {
        return true;
      },
      data: [['stun'], ['setTimer', 'wait', 45], ['move', 'BACKWARD', 2.2], ['wait', 1], ['repeatPhase', 2, 30], ['move', 'FORWARD', 0]]
    },
    pushLong: {
      condition: function condition() {
        return true;
      },
      data: [['stun'], ['setTimer', 'wait', 70], ['move', 'BACKWARD', 12], ['accelerate', 'FORWARD', 0.2], ['wait', 1], ['repeatPhase', 3, 60]]
    },
    pushShort: {
      condition: function condition() {
        return true;
      },
      data: [['stun'], ['setTimer', 'wait', 30], ['move', 'BACKWARD', 0.6], ['accelerate', 'FORWARD', 0.02], ['wait', 1], ['repeatPhase', 2, 30], ['move', 'FORWARD', 0]]
    },
    pushExplosion: {
      condition: function condition() {
        return true;
      },
      data: [['stun'], ['setTimer', 'wait', 45], ['move', 'BACKWARD', 2.5], ['wait', 1], ['repeatPhase', 2, 30], ['move', 'FORWARD', 0]]
    },
    pushTangle: {
      condition: function condition() {
        return true;
      },
      data: [['stun'], ['setTimer', 'wait', 60], ['move', 'BACKWARD', 1.8], ['wait', 1], ['repeatPhase', 2, 30], ['move', 'FORWARD', 0]]
    },
    abyssPull: {
      condition: function condition() {
        return true;
      },
      data: [['setFrame', 'poses:1'], ['move', 'FORWARD', 7], ['setGravity', false], ['setTimer', 'phasing', 42], ['setTimer', 'wait', 42], ['wait', 42], ['setGravity', true]]
    },
    //*******************************************************************************************************************
    // ** Enemy
    //*******************************************************************************************************************
    fall: {
      condition: function condition() {
        return true;
      },
      data: [['setVariable', 'fallen', true], ['jump', 1], ['wait', 20], ['deactivate']]
    },
    pngFall: {
      condition: function condition() {
        return true;
      },
      data: [['setFrame', 'fall:0'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 1, {
        "var": 'ANIM_FRAMES:fall'
      }], ['deactivate']]
    },
    ressurectFall: {
      condition: function condition() {
        return true;
      },
      data: [['setVariable', 'fallen', true], ['setFrame', 'fall:0'], ['wait', 4], ['advanceFrame'], ['repeatPhase', 2, {
        "var": 'ANIM_FRAMES:fall'
      }], ['waitTo', 30], ['setTimer', 'ressurect', 60], ['deactivate']]
    },
    //*******************************************************************************************************************
    // ** States
    //*******************************************************************************************************************
    guardState: {
      condition: function condition() {
        return true;
      },
      data: [['addState', ['guard', {
        multis: [['arm', 2]]
      }]], ['setVariable', 'arrows', {
        "var": 'ARROW_RECOVERY'
      }], ['wait', 180], ['removeState', 'guard']]
    },
    freezeState: {
      condition: function condition() {
        return true;
      },
      data: [['addState', ['freeze', {
        stats: [['ice', 1]]
      }]], ['wait', 120], ['removeState', 'freeze']]
    },
    //*******************************************************************************************************************
    // ** Arrow Shooting
    //*******************************************************************************************************************
    bowAttack: {
      condition: function condition(game, entity) {
        return true;
      },
      data: [['generateProjectile', 'arrow']]
    }
  };
  return dataReactions;
});