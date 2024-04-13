"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Tip Data
  //*******************************************************************************************************************
  var tips = [// Level Up
  {
    text: 'You\'ll get that slime yet.\nLevel up one of the three main Stats\nby clicking the button next to it.',
    showCondition: function showCondition(game) {
      return game.character.experience >= game.character.experienceForNextLevel() && game.panels.isActive('Stats');
    },
    hideCondition: function hideCondition(game) {
      return game.character.level > 1;
    }
  }, // Continue
  {
    text: 'Click around here to Revive.',
    noblock: true,
    showCondition: function showCondition(game) {
      return game.tips.tips[0].shown == true && game.tips.currentTip == null;
    },
    hideCondition: function hideCondition(game) {
      return !game.panels.isActive('Stats');
    }
  }, // Alchemy
  {
    text: 'Right click on items to Smelt them.',
    showCondition: function showCondition(game) {
      return game.character.items.find(function (i) {
        return game.character.equips.findIndex(function (e) {
          return e && e.type == i.type;
        }) !== -1;
      }) && game.panels.isActive('Stats');
    },
    hideCondition: function hideCondition(game) {
      return game.alchemy.liquid > 0;
    }
  }, // Alchemy II
  {
    text: 'Click on the alchemy bar\nto receive a potion.',
    showCondition: function showCondition(game) {
      return game.alchemy.liquid >= game.alchemy.required;
    },
    hideCondition: function hideCondition(game) {
      return game.alchemy.liquid < game.alchemy.required;
    }
  }, // Stat Tooltips
  {
    text: 'Some skills give special Stats.\nTo see what each stat does, briefly\n hold your cursor over it.',
    showCondition: function showCondition(game) {
      return game.panels.isActive('Skills');
    },
    hideCondition: function hideCondition(game) {
      return game.tips.statTooltipShown;
    }
  }, // Relics
  {
    text: 'You have obtained a new relic.\nRelics grant access to new stages.\nThey provide no other bonuses.',
    showCondition: function showCondition(game) {
      return game.character.relicIndex == 1;
    },
    hideCondition: function hideCondition(game) {
      return game.panels.isActive('Stats');
    }
  }, // Potion Choices
  {
    text: 'Sometimes you have to choose\none of multiple potions.\nChoose wisely.',
    showCondition: function showCondition(game) {
      return game.alchemy.brewed.length > 0;
    },
    hideCondition: function hideCondition(game) {
      return game.alchemy.brewed.length == 0;
    }
  }, // Potion Choices - Permanence
  {
    text: 'Multipliers from potions stack with all\nfuture changes to Stats.\nFeel free to use them anytime.',
    showCondition: function showCondition(game) {
      return game.alchemy.brewed.length > 0 && game.alchemy.brewed.find(function (p) {
        return p.data.params[0] && p.data.params[0].multis;
      });
    },
    hideCondition: function hideCondition(game) {
      return game.alchemy.brewed.length == 0;
    }
  }, // Bows - Stats
  {
    text: 'Bows deal damage based on ATK:\n%DMG: Damage multiplier of ARROWS.\nA: Number of ARROWS.',
    showCondition: function showCondition(game) {
      return game.character.items.find(function (i) {
        return i.type == 3;
      });
    },
    hideCondition: function hideCondition(game) {
      return !game.character.items.find(function (i) {
        return i.type == 3;
      });
    }
  }, // Bows - Mechanics
  {
    text: 'Shoot arrows anytime in either\ndirection by clicking left or right\nof your character.',
    position: 'upper',
    showCondition: function showCondition(game) {
      var showTip = game.character.arrows && game.entities.aliveEnemies().find(function (e) {
        return game.character.inRange(e, 32, true);
      });

      if (showTip) {
        game.combat.paused = 'normal';
      }

      return showTip;
    },
    hideCondition: function hideCondition(game) {
      return game.combat.paused == false;
    }
  }, // Skills - Second Page
  {
    text: 'You have unlocked a new skill page.\ntoggle between pages with the switch\n near the skill points.',
    showCondition: function showCondition(game) {
      return game.character.secondSkillPageAvailable() && game.panels.isActive('Skills');
    },
    hideCondition: function hideCondition(game) {
      return game.panels.getPanel('Skills').page !== 0;
    }
  }, // Skills - Refund
  {
    text: 'You can freely refund any obtained\nskill by simply clicking on it.',
    showCondition: function showCondition(game) {
      return game.character.skills.reduce(function (a, s) {
        return a += s.active ? 1 : 0;
      }, 0) >= 3 && game.character.skillPoints == 0;
    },
    hideCondition: function hideCondition(game) {
      return game.character.skillPoints != 0;
    }
  }];
  return tips;
});