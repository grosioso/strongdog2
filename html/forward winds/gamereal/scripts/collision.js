"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['sat'], function (SAT) {
  //*******************************************************************************************************************
  // ** Checking collision
  //*******************************************************************************************************************
  var response = new SAT.Response();

  var Collision = /*#__PURE__*/function () {
    function Collision() {
      _classCallCheck(this, Collision);
    }

    _createClass(Collision, [{
      key: "perform",
      value: function perform(array1, array2, aCollide, bCollide) {
        var _this = this;

        var displace = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var rects = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
          a: 'shape',
          b: 'shape'
        };
        array1.forEach(function (a) {
          array2.forEach(function (b) {
            //if (a.constructor.name == 'Character' && b.id == 'a1' && rects.a == 'atkbox') debugger
            //if (a.constructor.name == 'Projectile') debugger
            var _this$check = _this.check(a[rects.a], b[rects.b]),
                collided = _this$check.collided,
                response = _this$check.response;

            if (collided) {
              if (b.solid && displace) {
                var ax = _this.getSmallerValue(-response.overlapV.x, -a.velocity.x);

                var ay = _this.getSmallerValue(-response.overlapV.y, -a.velocity.y);

                var bx = _this.getSmallerValue(-response.overlapV.x, -b.velocity.x);

                var by = _this.getSmallerValue(-response.overlapV.y, -b.velocity.y);

                a.move(ax, ay);
                b.move(bx, by);
                a.haltMovement(b, response);
              }

              if (response.overlapV.x || response.overlapV.y) {
                aCollide ? a[aCollide](b, response) : '';
                bCollide ? b[bCollide](a, response) : '';
              }
            }
          });
        });
      }
    }, {
      key: "getSmallerValue",
      value: function getSmallerValue(n, m) {
        return Math.abs(n) < Math.abs(m) ? n : m;
      }
    }, {
      key: "check",
      value: function check(shape1, shape2) {
        response.clear();
        var collided = SAT.testPolygonPolygon(shape1, shape2, response);
        return {
          collided: collided,
          response: response
        };
      }
    }]);

    return Collision;
  }();

  return Collision;
});