"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['area', 'dataAreas', 'dataMaps'], function (Area, DataAreas, DataMaps) {
  //*******************************************************************************************************************
  // ** Generates Areas
  //*******************************************************************************************************************
  var areaGenerator = /*#__PURE__*/function () {
    function areaGenerator() {
      _classCallCheck(this, areaGenerator);
    }

    _createClass(areaGenerator, [{
      key: "generateArea",
      value: function generateArea(id) {
        return new Area(id, DataAreas);
      }
    }, {
      key: "generateMap",
      value: function generateMap(id) {
        return new Area(id, DataMaps);
      }
    }]);

    return areaGenerator;
  }();

  return areaGenerator;
});