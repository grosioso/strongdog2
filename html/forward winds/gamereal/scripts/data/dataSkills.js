"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Passive Tree Data
  //*******************************************************************************************************************
  var skills = [// Page 1
  {
    icon: 32,
    multis: [['mhp', 1.25]],
    tooltip: '25% more HP.'
  }, {
    icon: 33,
    stats: [['lch', 4]],
    tooltip: '4% LEECH.'
  }, {
    icon: 34,
    stats: [['bsh', 40]],
    tooltip: '40% chance to perform\nSHIELD Strike:\nAdds 30% of DEF to ATK\nwhen calculating damage.'
  }, {
    icon: 35,
    stats: [['iml', 5]],
    tooltip: '5% BURN.'
  }, {
    icon: 36,
    multis: [['dmg', 1.12]],
    tooltip: '12% more ATK.'
  }, {
    icon: 37,
    stats: [['grd', 1]],
    tooltip: 'Grants GUARD Spell:\nClick on your character to\ngain double DEF for 3 seconds.'
  }, {
    icon: 38,
    stats: [['hpr', 2]],
    tooltip: '2% REGEN.'
  }, {
    icon: 39,
    stats: [['cri', 25]],
    tooltip: '25% CRIT.'
  }, {
    icon: 40,
    multis: [['arm', 1.20]],
    tooltip: '20% more DEF.'
  }, {
    icon: 41,
    multis: [['mhp', 1.3], ['dmg', 0.8]],
    tooltip: '30% more HP.\n20% less ATK.'
  }, {
    icon: 42,
    stats: [['cri', 35]],
    multis: [['arm', 0.9]],
    tooltip: '35% CRIT.\n10% less DEF.'
  }, {
    icon: 43,
    stats: [['frz', 1]],
    tooltip: 'Grants FREEZE Spell:\nClick on enemy to freeze\nit for 2 seconds.'
  }, // Page 2
  {
    icon: 47,
    stats: [['frz', 1], ['arr', -2], ['fbm', 2]],
    tooltip: '-2 ARROWS.\nGrants an additional FREEZE Spell.\nFrozen enemies take double\ndamage from BURN.'
  }, {
    icon: 45,
    stats: [['lch', 5], ['slm', -60]],
    tooltip: '5% LEECH.\nCRITICAL and SHIELD Strikes\nleech 60% less.'
  }, {
    icon: 46,
    stats: [['arr', -2],, ['bsh', 60]],
    tooltip: '-2 ARROWS.\nAdditional 60% chance to\nperform SHIELD Strike.'
  }, {
    icon: 44,
    stats: [['abs', 15]],
    tooltip: 'Take 15% less damage.'
  }, {
    icon: 48,
    stats: [['arr', 1]],
    tooltip: '1 ARROW.'
  }, {
    icon: 49,
    stats: [['are', 1], ['hnt', 1]],
    tooltip: 'All spent ARROWS are recovered\nwhen you use GUARD Spell.\nDamage of ARROWS is calculated\non DEF instead of ATK, but at\n30% of the value.'
  }, {
    icon: 50,
    stats: [['arf', 15]],
    tooltip: '15% of HP is added to\nATK when calculating\nARROW damage.'
  }, {
    icon: 51,
    stats: [['crm', 50]],
    multis: [['dmg', 0.85]],
    tooltip: '15% less ATK.\nCRITICAL Strikes deal 200%\ninstead of 150% damage.'
  }, {
    icon: 52,
    stats: [['iml', -5]],
    multis: [['dmg', 1.08], ['arm', 1.08]],
    tooltip: '-5% BURN.\n8% more ATK.\n8% more DEF.'
  }, {
    icon: 53,
    multis: [['mhp', 1.08], ['dmg', 1.04], ['arm', 1.06]],
    tooltip: '8% more HP.\n4% more ATK.\n6% more DEF.'
  }, {
    icon: 54,
    stats: [['rag', 1]],
    tooltip: 'Gain 1% more ATK\nwhen you are hit.\nStacks additively.'
  }, {
    icon: 55,
    stats: [['gbs', 200]],
    tooltip: 'LEECH and REGEN are\ndoubled while under\nGUARD Spell.'
  }];
  return skills;
});