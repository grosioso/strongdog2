"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(['config'], function (config) {
  //*******************************************************************************************************************
  // ** Class handling api stuff
  //*******************************************************************************************************************
  var Api = /*#__PURE__*/function () {
    function Api() {
      _classCallCheck(this, Api);

      this.request = null;
      this.winnerNames = [];
      this.username = 'Guest';
      this.source = config.api;
      this.clientApi = null;
      this.currentPage = 0;
      this.pageCount = 0;
      this.initializeClientApi();
    }

    _createClass(Api, [{
      key: "initializeClientApi",
      value: function initializeClientApi() {
        var _this = this;

        if (config.api == 'Kongregate') {
          var script = document.createElement('script');

          script.onload = function () {
            kongregateAPI.loadAPI(function () {
              _this.clientApi = kongregateAPI.getAPI();

              _this.refreshUsername();

              _this.clientApi.services.addEventListener('login', function () {
                return _this.refreshUsername();
              });
            });
          };

          script.src = 'https://cdn1.kongregate.com/javascripts/kongregate_api.js';
          document.getElementsByTagName('head')[0].appendChild(script);
        }
      } //*******************************************************************************************************************
      // * Refresh username
      //*******************************************************************************************************************

    }, {
      key: "refreshUsername",
      value: function refreshUsername() {
        var userId = this.clientApi.services.getUserId();

        if (userId == 0) {
          this.username = 'Guest (Login to submit)';
        } else {
          this.username = this.clientApi.services.getUsername();
        }
      } //*******************************************************************************************************************
      // * Load players who Won
      //*******************************************************************************************************************

    }, {
      key: "changePage",
      value: function changePage(change) {
        this.currentPage = Math.max(Math.min(this.currentPage + change, this.pageCount - 1), 0);
        this.winnerNames = [];
        this.refresh();
      }
    }, {
      key: "refresh",
      value: function refresh() {
        var _this2 = this;

        if (config.api != 'None') {
          this.request = new XMLHttpRequest();
          this.request.addEventListener("load", function () {
            return _this2.parseData();
          });
          this.request.addEventListener("error", function () {
            return _this2.error();
          });
          this.request.open("GET", this['url' + this.source]());
          this.request.send();
        }
      }
    }, {
      key: "parseData",
      value: function parseData() {
        var data = JSON.parse(this.request.response);
        var parsed = this['parse' + this.source + 'Data'](data);
        this.winnerNames = parsed.names;
        this.pageCount = parsed.pageCount;

        if (!this.winnerNames.includes(this.username) && this.currentPage == 0) {
          this.winnerNames.push(this.username);
        }
      }
    }, {
      key: "parsePoeData",
      value: function parsePoeData(data) {
        var names = data.entries ? data.entries.map(function (e) {
          return e.character.name;
        }) : [];
        var pageCount = 3;
        return {
          names: names,
          pageCount: pageCount
        };
      }
    }, {
      key: "parseTypicodeData",
      value: function parseTypicodeData(data) {
        var names = data.map(function (e) {
          return e.name;
        });
        var pageCount = 0;
        return {
          names: names,
          pageCount: pageCount
        };
      }
    }, {
      key: "parseKongregateData",
      value: function parseKongregateData(data) {
        var names = data.lifetime_scores.map(function (e) {
          return e.username;
        });
        var pageCount = data.page_count;
        return {
          names: names,
          pageCount: pageCount
        };
      }
    }, {
      key: "error",
      value: function error() {
        console.log('Failed to retreive data from API.');
      } //*******************************************************************************************************************
      // * Get Urls
      //*******************************************************************************************************************

    }, {
      key: "urlPoe",
      value: function urlPoe() {
        var limit = 100;
        var offset = 15000 / limit * this.currentPage;
        return "http://api.pathofexile.com/ladders/Betrayal?offset=".concat(offset, "&limit=").concat(limit);
      }
    }, {
      key: "urlTypicode",
      value: function urlTypicode() {
        return 'https://jsonplaceholder.typicode.com/users';
      }
    }, {
      key: "urlKongregate",
      value: function urlKongregate() {
        return "https://api.kongregate.com/api/high_scores/lifetime/136620.json?lifetime_page=".concat(this.currentPage + 1);
      } //*******************************************************************************************************************
      // * Submit Stat
      //*******************************************************************************************************************

    }, {
      key: "submitStat",
      value: function submitStat(stat, value) {
        var _this3 = this;

        this['submit' + this.source + 'Stat'](stat, value);
        setInterval(function () {
          _this3['submit' + _this3.source + 'Stat'](stat, value);
        }, 1000);
      }
    }, {
      key: "submitNoneStat",
      value: function submitNoneStat(stat, value) {//console.log(`Fake submitted stat: "${stat}" of value ${value}`)
      }
    }, {
      key: "submitTypicodeStat",
      value: function submitTypicodeStat(stat, value) {
        console.log("Fake submitted stat to Typicode: \"".concat(stat, "\" of value ").concat(value));
      }
    }, {
      key: "submitKongregateStat",
      value: function submitKongregateStat(stat, value) {
        if (this.clientApi) {
          this.clientApi.stats.submit(stat, value);
        } else {
          console.log('Not connected to Kongregate!');
        }
      }
    }]);

    return Api;
  }();

  return Api;
});