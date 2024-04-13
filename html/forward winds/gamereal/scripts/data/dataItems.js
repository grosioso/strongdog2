"use strict";

define([''], function () {
  //*******************************************************************************************************************
  // ** Item Type Data
  //*******************************************************************************************************************
  var items = [{
    icon: 64,
    iconThreshold: 6,
    iconOffset: 0,
    name: 'Blade',
    stats: [['dmg', 1.0, 'main']]
  }, {
    icon: 80,
    iconThreshold: 6,
    iconOffset: 0,
    name: 'Armor',
    stats: [['mhp', 2.5, 'main']]
  }, {
    icon: 96,
    iconThreshold: 6,
    iconOffset: 0,
    name: 'Shield',
    stats: [['arm', 1.5, 'main']]
  }, {
    icon: 112,
    iconThreshold: 7,
    iconOffset: 2,
    name: 'Bow',
    stats: [['arr', 14, 'arrow'], ['bpw', 25, 'bowPower']]
  }];
  return items;
});