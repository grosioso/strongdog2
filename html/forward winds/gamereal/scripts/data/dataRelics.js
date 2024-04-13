"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Relic Item Data
  //*******************************************************************************************************************
  var relics = [{
    icon: 160,
    name: 'No Relic',
    enemyCount: 5,
    stats: [],
    tooltip: 'First Stage'
  }, {
    icon: 161,
    name: 'Fairie Boots',
    enemyCount: 14,
    stats: [['jmp', 1]],
    tooltip: 'Second Stage'
  }, {
    icon: 162,
    name: 'A Shovel',
    enemyCount: 1,
    stats: [['swl', 1]],
    tooltip: 'Third Stage'
  }, {
    icon: 163,
    name: 'Old Mirror',
    enemyCount: 9,
    stats: [['mir', 1]],
    tooltip: 'Fourth Stage'
  }, {
    icon: 164,
    name: 'Fairie Wings',
    enemyCount: 11,
    stats: [['jmp', 2]],
    tooltip: 'Fifth Stage'
  }, {
    icon: 165,
    name: 'Glass Orbicle',
    enemyCount: 9,
    stats: [['pek', 1]],
    tooltip: 'Sixth Stage'
  }, {
    icon: 166,
    name: 'Dark Gloves',
    enemyCount: 4,
    stats: [['swl', 1], ['arc', 1]],
    tooltip: 'Seventh Stage'
  }, {
    icon: 167,
    name: 'Shadow Cloak',
    enemyCount: 6,
    stats: [['mir', 1], ['ask', 1]],
    tooltip: 'Eighth Stage'
  }, {
    icon: 168,
    name: 'Obsidian Orbicle',
    enemyCount: 12,
    stats: [['agz', 1]],
    tooltip: 'Ninth Stage'
  }];
  return relics;
});