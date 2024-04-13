"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define([''], function () {
  //*******************************************************************************************************************
  // ** A Collection of Tiles
  //*******************************************************************************************************************
  var Tiles = /*#__PURE__*/function () {
    function Tiles(width, height) {
      _classCallCheck(this, Tiles);

      this.width = width;
      this.height = height;
      this.list = [];
      this.terrain = {};
    }

    _createClass(Tiles, [{
      key: "push",
      value: function push(tile) {
        this.list.push(tile);
        this.terrain["".concat(tile.gridPosition.x, ",").concat(tile.gridPosition.y)] = tile;
      }
    }, {
      key: "getAt",
      value: function getAt(pos) {
        return this.terrain['' + pos.x + ',' + pos.y];
      }
    }]);

    return Tiles;
  }();

  return Tiles;
});