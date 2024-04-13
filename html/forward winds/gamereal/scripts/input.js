"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define([], function () {
  //*******************************************************************************************************************
  // ** Input Class - Handles input
  //*******************************************************************************************************************
  var canvas = document.getElementById("screenCanvas");

  var Input = /*#__PURE__*/function () {
    function Input() {
      var _this = this;

      _classCallCheck(this, Input);

      this.mx = 0;
      this.my = 0;
      this.mxPrev = 0;
      this.myPrev = 0;
      this.eventMouseClicked = null;
      this.eventMouseDown = null;
      this.eventMouseUp = null;
      this.eventMouseMoved = null;
      this.eventKeyPressed = null;
      this.eventsKeyDown = [];
      this.eventsKeyUp = [];
      this.mouseClicked = false;
      this.rightClicked = false;
      this.mouseDown = false;
      this.rightDown = false;
      this.mouseUp = false;
      this.rightUp = false;
      this.rightHold = false;
      this.mouseMoved = false;
      this.key = '';
      this.downKeys = {};
      this.unconsumedClick = false;
      document.addEventListener("click", function (e) {
        return _this.mouseClickedEvent(e);
      }, false);
      document.addEventListener("mousedown", function (e) {
        return _this.mousePressedEvent(e);
      }, false);
      document.addEventListener("mouseup", function (e) {
        return _this.mouseReleasedEvent(e);
      }, false);
      document.addEventListener("mousemove", function (e) {
        return _this.mouseMovedEvent(e);
      }, false);
      document.addEventListener("keypress", function (e) {
        return _this.keyPressedEvent(e);
      }, false);
      document.addEventListener("keydown", function (e) {
        return _this.keyDownEvent(e);
      }, false);
      document.addEventListener("keyup", function (e) {
        return _this.keyUpEvent(e);
      }, false);
    }

    _createClass(Input, [{
      key: "mouseClickedEvent",
      value: function mouseClickedEvent(e) {
        this.eventMouseClicked = e;
      }
    }, {
      key: "mousePressedEvent",
      value: function mousePressedEvent(e) {
        this.eventMouseDown = e;
      }
    }, {
      key: "mouseReleasedEvent",
      value: function mouseReleasedEvent(e) {
        this.eventMouseUp = e;
      }
    }, {
      key: "mouseMovedEvent",
      value: function mouseMovedEvent(e) {
        this.eventMouseMoved = e;
        var rect = canvas.getBoundingClientRect();
        this.mx = Math.floor((e.clientX - rect.left) / 4);
        this.my = Math.floor((e.clientY - rect.top) / 4);
      }
    }, {
      key: "keyPressedEvent",
      value: function keyPressedEvent(e) {
        this.eventKeyPressed = e;
      }
    }, {
      key: "keyDownEvent",
      value: function keyDownEvent(e) {
        var _this2 = this;

        var key = this.keyFromEvent(e);
        var noDefaultKeys = [' ', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
        this.eventsKeyDown.push(e);
        noDefaultKeys.forEach(function (noDefaultKey) {
          if (key == _this2.normalizedKey(noDefaultKey) && (e.target == document.body || e.target == canvas)) {
            e.preventDefault();
            return false;
          }
        });
      }
    }, {
      key: "keyUpEvent",
      value: function keyUpEvent(e) {
        this.eventsKeyUp.push(e);
      } //*******************************************************************************************************************
      // * Update
      //*******************************************************************************************************************

    }, {
      key: "update",
      value: function update() {
        this.updateMouseClicked();
        this.updateMousePressed();
        this.updateMouseReleased();
        this.updateMouseMoved();
        this.updateKeyDown();
        this.updateKeyUp();
        this.clearEvents();
      }
    }, {
      key: "updateMouseClicked",
      value: function updateMouseClicked() {
        this.mouseClicked = false;
        this.rightClicked = false;
        this.unconsumedClick = false;

        if (this.eventMouseClicked && this.eventMouseClicked.button == 0) {
          this.mouseClicked = true;
          this.unconsumedClick = true;
        } else if (this.eventMouseClicked && this.eventMouseClicked.button == 2) {
          this.rightClicked = true;
        }
      }
    }, {
      key: "updateMousePressed",
      value: function updateMousePressed() {
        this.mouseDown = false;
        this.rightDown = false;

        if (this.eventMouseDown && this.eventMouseDown.button == 0) {
          this.mouseDown = true;
        } else if (this.eventMouseDown && this.eventMouseDown.button == 2) {
          this.rightDown = true;
          this.rightHold = true;
        }
      }
    }, {
      key: "updateMouseReleased",
      value: function updateMouseReleased() {
        this.mouseUp = false;
        this.rightUp = false;

        if (this.eventMouseUp && this.eventMouseUp.button == 0) {
          this.mouseUp = true;
        } else if (this.eventMouseUp && this.eventMouseUp.button == 2) {
          this.rightUp = true;
          this.rightHold = false;
        }
      }
    }, {
      key: "updateMouseMoved",
      value: function updateMouseMoved() {
        this.mouseMoved = false;
        this.mouseMovedDistance = 0;

        if (this.eventMouseMoved) {
          this.mouseMoved = true;
          this.mouseMovedDistance = Math.sqrt(Math.pow(this.mx - this.mxPrev, 2) + Math.pow(this.my - this.myPrev, 2));
        }

        this.mxPrev = this.mx;
        this.myPrev = this.my;
      }
    }, {
      key: "updateKeyDown",
      value: function updateKeyDown() {
        var _this3 = this;

        var firstKey = this.eventsKeyDown[0];
        this.key = '';

        if (firstKey) {
          this.key = this.keyFromEvent(firstKey);
        }

        this.eventsKeyDown.forEach(function (event) {
          _this3.downKeys[_this3.keyFromEvent(event)] = true;
        });
      }
    }, {
      key: "updateKeyUp",
      value: function updateKeyUp() {
        var _this4 = this;

        this.eventsKeyUp.forEach(function (event) {
          _this4.downKeys[_this4.keyFromEvent(event)] = false;
        });
      }
    }, {
      key: "clearEvents",
      value: function clearEvents() {
        this.eventMouseClicked = null;
        this.eventMouseDown = null;
        this.eventMouseUp = null;
        this.eventMouseMoved = null;
        this.eventsKeyDown = [];
        this.eventsKeyUp = [];
      } //*******************************************************************************************************************
      // * Other Functions
      //*******************************************************************************************************************

    }, {
      key: "mouseWithin",
      value: function mouseWithin(rect) {
        return this.mx >= rect.x && this.mx < rect.x + rect.w && this.my >= rect.y && this.my < rect.y + rect.h;
      }
    }, {
      key: "mouseWithinDistance",
      value: function mouseWithinDistance(x, y, distance) {
        var mouseDistance = Math.sqrt(Math.pow(this.mx - x, 2) + Math.pow(this.my - y, 2));
        return mouseDistance < distance;
      }
    }, {
      key: "consumeClick",
      value: function consumeClick() {
        this.unconsumedClick = false;
      }
    }, {
      key: "keyFromEvent",
      value: function keyFromEvent(e) {
        if (e.key) {
          return this.normalizedKey(e.key);
        } else if (e.keyCode) {
          var keys = {
            '16': 'Shift',
            '32': ' ',
            '37': 'ArrowLeft',
            '38': 'ArrowUp',
            '39': 'ArrowRight',
            '40': 'ArrowDown'
          };
          var key = keys[e.keyCode] || String.fromCharCode(e.keyCode);
          return this.normalizedKey(key);
        }

        return '';
      }
    }, {
      key: "normalizedKey",
      value: function normalizedKey(key) {
        return key.toUpperCase();
      }
    }, {
      key: "keyPressed",
      value: function keyPressed(key) {
        return this.normalizedKey(key) == this.key;
      }
    }, {
      key: "keyDown",
      value: function keyDown(key) {
        return this.downKeys[this.normalizedKey(key)];
      }
    }]);

    return Input;
  }();

  return Input;
});