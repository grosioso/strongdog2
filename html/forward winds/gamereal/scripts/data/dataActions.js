"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(['data/actions/dataAct1Actions', 'data/actions/dataAct2Actions', 'data/actions/dataAct3Actions', 'data/actions/dataCharacterActions', 'data/actions/dataEnemyActions', 'data/actions/dataProjectileActions', 'data/actions/dataReactions'], function (dataAct1Actions, dataAct2Actions, dataAct3Actions, dataCharacterActions, dataEnemyActions, dataProjectileActions, dataReactions) {
  //*******************************************************************************************************************
  // ** Action Data >>> REMEMBER TO CHECK THE COMMAS <<<
  //*******************************************************************************************************************
  var actions = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, dataAct1Actions), dataAct2Actions), dataAct3Actions), dataCharacterActions), dataEnemyActions), dataProjectileActions), dataReactions);

  return actions;
});