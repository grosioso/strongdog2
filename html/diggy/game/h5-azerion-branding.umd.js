(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.h5branding = global.h5branding || {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var es6Promise = createCommonjsModule(function (module, exports) {
	/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See http://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   v4.2.8+1e68dce6
	 */

	(function (global, factory) {
		module.exports = factory() ;
	}(commonjsGlobal, (function () {
	function objectOrFunction(x) {
	  var type = typeof x;
	  return x !== null && (type === 'object' || type === 'function');
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}



	var _isArray = void 0;
	if (Array.isArray) {
	  _isArray = Array.isArray;
	} else {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = void 0;
	var customSchedulerFn = void 0;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see http://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var vertx = Function('return this')().require('vertx');
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = void 0;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && typeof commonjsRequire === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;


	  if (_state) {
	    var callback = arguments[_state - 1];
	    asap(function () {
	      return invokeCallback(_state, child, callback, parent._result);
	    });
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve$1(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(2);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then$$1.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then$$1) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then$$1, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return resolve(promise, value);
	    }, function (reason) {
	      return reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$1) {
	  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$1 === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$1)) {
	      handleForeignThenable(promise, maybeThenable, then$$1);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function resolve(promise, value) {
	  if (promise === value) {
	    reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    var then$$1 = void 0;
	    try {
	      then$$1 = value.then;
	    } catch (error) {
	      reject(promise, error);
	      return;
	    }
	    handleMaybeThenable(promise, value, then$$1);
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;


	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = void 0,
	      callback = void 0,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = void 0,
	      error = void 0,
	      succeeded = true;

	  if (hasCallback) {
	    try {
	      value = callback(detail);
	    } catch (e) {
	      succeeded = false;
	      error = e;
	    }

	    if (promise === value) {
	      reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	  }

	  if (promise._state !== PENDING) ; else if (hasCallback && succeeded) {
	    resolve(promise, value);
	  } else if (succeeded === false) {
	    reject(promise, error);
	  } else if (settled === FULFILLED) {
	    fulfill(promise, value);
	  } else if (settled === REJECTED) {
	    reject(promise, value);
	  }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      resolve(promise, value);
	    }, function rejectPromise(reason) {
	      reject(promise, reason);
	    });
	  } catch (e) {
	    reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	}

	var Enumerator = function () {
	  function Enumerator(Constructor, input) {
	    this._instanceConstructor = Constructor;
	    this.promise = new Constructor(noop);

	    if (!this.promise[PROMISE_ID]) {
	      makePromise(this.promise);
	    }

	    if (isArray(input)) {
	      this.length = input.length;
	      this._remaining = input.length;

	      this._result = new Array(this.length);

	      if (this.length === 0) {
	        fulfill(this.promise, this._result);
	      } else {
	        this.length = this.length || 0;
	        this._enumerate(input);
	        if (this._remaining === 0) {
	          fulfill(this.promise, this._result);
	        }
	      }
	    } else {
	      reject(this.promise, validationError());
	    }
	  }

	  Enumerator.prototype._enumerate = function _enumerate(input) {
	    for (var i = 0; this._state === PENDING && i < input.length; i++) {
	      this._eachEntry(input[i], i);
	    }
	  };

	  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
	    var c = this._instanceConstructor;
	    var resolve$$1 = c.resolve;


	    if (resolve$$1 === resolve$1) {
	      var _then = void 0;
	      var error = void 0;
	      var didError = false;
	      try {
	        _then = entry.then;
	      } catch (e) {
	        didError = true;
	        error = e;
	      }

	      if (_then === then && entry._state !== PENDING) {
	        this._settledAt(entry._state, i, entry._result);
	      } else if (typeof _then !== 'function') {
	        this._remaining--;
	        this._result[i] = entry;
	      } else if (c === Promise$1) {
	        var promise = new c(noop);
	        if (didError) {
	          reject(promise, error);
	        } else {
	          handleMaybeThenable(promise, entry, _then);
	        }
	        this._willSettleAt(promise, i);
	      } else {
	        this._willSettleAt(new c(function (resolve$$1) {
	          return resolve$$1(entry);
	        }), i);
	      }
	    } else {
	      this._willSettleAt(resolve$$1(entry), i);
	    }
	  };

	  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
	    var promise = this.promise;


	    if (promise._state === PENDING) {
	      this._remaining--;

	      if (state === REJECTED) {
	        reject(promise, value);
	      } else {
	        this._result[i] = value;
	      }
	    }

	    if (this._remaining === 0) {
	      fulfill(promise, this._result);
	    }
	  };

	  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
	    var enumerator = this;

	    subscribe(promise, undefined, function (value) {
	      return enumerator._settledAt(FULFILLED, i, value);
	    }, function (reason) {
	      return enumerator._settledAt(REJECTED, i, reason);
	    });
	  };

	  return Enumerator;
	}();

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject$1(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {Function} resolver
	  Useful for tooling.
	  @constructor
	*/

	var Promise$1 = function () {
	  function Promise(resolver) {
	    this[PROMISE_ID] = nextId();
	    this._result = this._state = undefined;
	    this._subscribers = [];

	    if (noop !== resolver) {
	      typeof resolver !== 'function' && needsResolver();
	      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	    }
	  }

	  /**
	  The primary way of interacting with a promise is through its `then` method,
	  which registers callbacks to receive either a promise's eventual value or the
	  reason why the promise cannot be fulfilled.
	   ```js
	  findUser().then(function(user){
	    // user is available
	  }, function(reason){
	    // user is unavailable, and you are given the reason why
	  });
	  ```
	   Chaining
	  --------
	   The return value of `then` is itself a promise.  This second, 'downstream'
	  promise is resolved with the return value of the first promise's fulfillment
	  or rejection handler, or rejected if the handler throws an exception.
	   ```js
	  findUser().then(function (user) {
	    return user.name;
	  }, function (reason) {
	    return 'default name';
	  }).then(function (userName) {
	    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	    // will be `'default name'`
	  });
	   findUser().then(function (user) {
	    throw new Error('Found user, but still unhappy');
	  }, function (reason) {
	    throw new Error('`findUser` rejected and we're unhappy');
	  }).then(function (value) {
	    // never reached
	  }, function (reason) {
	    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	  });
	  ```
	  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	   ```js
	  findUser().then(function (user) {
	    throw new PedagogicalException('Upstream error');
	  }).then(function (value) {
	    // never reached
	  }).then(function (value) {
	    // never reached
	  }, function (reason) {
	    // The `PedgagocialException` is propagated all the way down to here
	  });
	  ```
	   Assimilation
	  ------------
	   Sometimes the value you want to propagate to a downstream promise can only be
	  retrieved asynchronously. This can be achieved by returning a promise in the
	  fulfillment or rejection handler. The downstream promise will then be pending
	  until the returned promise is settled. This is called *assimilation*.
	   ```js
	  findUser().then(function (user) {
	    return findCommentsByAuthor(user);
	  }).then(function (comments) {
	    // The user's comments are now available
	  });
	  ```
	   If the assimliated promise rejects, then the downstream promise will also reject.
	   ```js
	  findUser().then(function (user) {
	    return findCommentsByAuthor(user);
	  }).then(function (comments) {
	    // If `findCommentsByAuthor` fulfills, we'll have the value here
	  }, function (reason) {
	    // If `findCommentsByAuthor` rejects, we'll have the reason here
	  });
	  ```
	   Simple Example
	  --------------
	   Synchronous Example
	   ```javascript
	  let result;
	   try {
	    result = findResult();
	    // success
	  } catch(reason) {
	    // failure
	  }
	  ```
	   Errback Example
	   ```js
	  findResult(function(result, err){
	    if (err) {
	      // failure
	    } else {
	      // success
	    }
	  });
	  ```
	   Promise Example;
	   ```javascript
	  findResult().then(function(result){
	    // success
	  }, function(reason){
	    // failure
	  });
	  ```
	   Advanced Example
	  --------------
	   Synchronous Example
	   ```javascript
	  let author, books;
	   try {
	    author = findAuthor();
	    books  = findBooksByAuthor(author);
	    // success
	  } catch(reason) {
	    // failure
	  }
	  ```
	   Errback Example
	   ```js
	   function foundBooks(books) {
	   }
	   function failure(reason) {
	   }
	   findAuthor(function(author, err){
	    if (err) {
	      failure(err);
	      // failure
	    } else {
	      try {
	        findBoooksByAuthor(author, function(books, err) {
	          if (err) {
	            failure(err);
	          } else {
	            try {
	              foundBooks(books);
	            } catch(reason) {
	              failure(reason);
	            }
	          }
	        });
	      } catch(error) {
	        failure(err);
	      }
	      // success
	    }
	  });
	  ```
	   Promise Example;
	   ```javascript
	  findAuthor().
	    then(findBooksByAuthor).
	    then(function(books){
	      // found books
	  }).catch(function(reason){
	    // something went wrong
	  });
	  ```
	   @method then
	  @param {Function} onFulfilled
	  @param {Function} onRejected
	  Useful for tooling.
	  @return {Promise}
	  */

	  /**
	  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	  as the catch block of a try/catch statement.
	  ```js
	  function findAuthor(){
	  throw new Error('couldn't find that author');
	  }
	  // synchronous
	  try {
	  findAuthor();
	  } catch(reason) {
	  // something went wrong
	  }
	  // async with promises
	  findAuthor().catch(function(reason){
	  // something went wrong
	  });
	  ```
	  @method catch
	  @param {Function} onRejection
	  Useful for tooling.
	  @return {Promise}
	  */


	  Promise.prototype.catch = function _catch(onRejection) {
	    return this.then(null, onRejection);
	  };

	  /**
	    `finally` will be invoked regardless of the promise's fate just as native
	    try/catch/finally behaves
	  
	    Synchronous example:
	  
	    ```js
	    findAuthor() {
	      if (Math.random() > 0.5) {
	        throw new Error();
	      }
	      return new Author();
	    }
	  
	    try {
	      return findAuthor(); // succeed or fail
	    } catch(error) {
	      return findOtherAuther();
	    } finally {
	      // always runs
	      // doesn't affect the return value
	    }
	    ```
	  
	    Asynchronous example:
	  
	    ```js
	    findAuthor().catch(function(reason){
	      return findOtherAuther();
	    }).finally(function(){
	      // author was either found, or not
	    });
	    ```
	  
	    @method finally
	    @param {Function} callback
	    @return {Promise}
	  */


	  Promise.prototype.finally = function _finally(callback) {
	    var promise = this;
	    var constructor = promise.constructor;

	    if (isFunction(callback)) {
	      return promise.then(function (value) {
	        return constructor.resolve(callback()).then(function () {
	          return value;
	        });
	      }, function (reason) {
	        return constructor.resolve(callback()).then(function () {
	          throw reason;
	        });
	      });
	    }

	    return promise.then(callback, callback);
	  };

	  return Promise;
	}();

	Promise$1.prototype.then = then;
	Promise$1.all = all;
	Promise$1.race = race;
	Promise$1.resolve = resolve$1;
	Promise$1.reject = reject$1;
	Promise$1._setScheduler = setScheduler;
	Promise$1._setAsap = setAsap;
	Promise$1._asap = asap;

	/*global self*/
	function polyfill() {
	  var local = void 0;

	  if (typeof commonjsGlobal !== 'undefined') {
	    local = commonjsGlobal;
	  } else if (typeof self !== 'undefined') {
	    local = self;
	  } else {
	    try {
	      local = Function('return this')();
	    } catch (e) {
	      throw new Error('polyfill failed because global object is unavailable in this environment');
	    }
	  }

	  var P = local.Promise;

	  if (P) {
	    var promiseToString = null;
	    try {
	      promiseToString = Object.prototype.toString.call(P.resolve());
	    } catch (e) {
	      // silently ignored
	    }

	    if (promiseToString === '[object Promise]' && !P.cast) {
	      return;
	    }
	  }

	  local.Promise = Promise$1;
	}

	// Strange compat..
	Promise$1.polyfill = polyfill;
	Promise$1.Promise = Promise$1;

	return Promise$1;

	})));




	});

	es6Promise.polyfill();

	// From http://github.com/medialize/URI.js/blob/gh-pages/src/SecondLevelDomains.js
	var list;
	var Sld = /** @class */ (function () {
	    function Sld() {
	    }
	    Sld.has = function (domain) {
	        var tldOffset = domain.lastIndexOf('.');
	        if (tldOffset <= 0 || tldOffset >= domain.length - 1) {
	            return false;
	        }
	        var sldOffset = domain.lastIndexOf('.', tldOffset - 1);
	        if (sldOffset <= 0 || sldOffset >= tldOffset - 1) {
	            return false;
	        }
	        var sldList = list[domain.slice(tldOffset + 1)];
	        if (!sldList) {
	            return false;
	        }
	        return sldList.indexOf(' ' + domain.slice(sldOffset + 1, tldOffset) + ' ') >= 0;
	    };
	    Sld.is = function (domain) {
	        var tldOffset = domain.lastIndexOf('.');
	        if (tldOffset <= 0 || tldOffset >= domain.length - 1) {
	            return false;
	        }
	        var sldOffset = domain.lastIndexOf('.', tldOffset - 1);
	        if (sldOffset >= 0) {
	            return false;
	        }
	        var sldList = list[domain.slice(tldOffset + 1)];
	        if (!sldList) {
	            return false;
	        }
	        return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
	    };
	    Sld.get = function (domain) {
	        var tldOffset = domain.lastIndexOf('.');
	        if (tldOffset <= 0 || tldOffset >= domain.length - 1) {
	            return null;
	        }
	        var sldOffset = domain.lastIndexOf('.', tldOffset - 1);
	        if (sldOffset <= 0 || sldOffset >= tldOffset - 1) {
	            return null;
	        }
	        var sldList = list[domain.slice(tldOffset + 1)];
	        if (!sldList) {
	            return null;
	        }
	        if (sldList.indexOf(' ' + domain.slice(sldOffset + 1, tldOffset) + ' ') < 0) {
	            return null;
	        }
	        return domain.slice(sldOffset + 1);
	    };
	    return Sld;
	}());
	var Domain = /** @class */ (function () {
	    function Domain() {
	    }
	    Domain.setList = function (newList) {
	        list = newList || {};
	    };
	    Domain.getDomain = function (host) {
	        if (!list) {
	            return null;
	        }
	        // if hostname consists of 1 or 2 segments, it must be the domain
	        var t = host.match(/\./g);
	        if (t && t.length < 2) {
	            return host;
	        }
	        // grab tld and add another segment
	        var tld = this.getTld(host);
	        if (!tld) {
	            return null;
	        }
	        var end = host.length - tld.length - 1;
	        end = host.lastIndexOf('.', end - 1) + 1;
	        return host.substring(end) || '';
	    };
	    Domain.getTld = function (host) {
	        if (!list) {
	            return '';
	        }
	        var pos = host.lastIndexOf('.');
	        var tld = host.substring(pos + 1);
	        if (list[tld.toLowerCase()]) {
	            return Sld.get(host) || tld;
	        }
	        return tld;
	    };
	    Domain.KEY = 'Domains';
	    return Domain;
	}());

	var Loader = /** @class */ (function () {
	    function Loader() {
	        this.cache = {};
	    }
	    Object.defineProperty(Loader, "instance", {
	        get: function () {
	            if (Loader.classInstance === undefined) {
	                Loader.classInstance = new Loader();
	            }
	            return Loader.classInstance;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Loader.prototype.load = function (key, url, contentType) {
	        var _this = this;
	        if (this.contains(key)) {
	            return Promise.reject('Already in cache.');
	        }
	        this.cache[key] = { url: url, data: null };
	        return this.requestXhr(url, contentType)
	            .then(function (data) { return _this.loadComplete(key, data); })
	            .catch(function (e) {
	            _this.remove(key);
	            return Promise.reject(e);
	        });
	    };
	    Loader.prototype.loadComplete = function (key, data) {
	        if (!this.contains(key)) {
	            return Promise.reject('Item was removed from cache before loading was complete.');
	        }
	        try {
	            var json = JSON.parse(data);
	            this.cache[key].data = json;
	            return Promise.resolve(json);
	        }
	        catch (error) {
	            return Promise.reject('There was an error parsing JSON file.');
	        }
	    };
	    Loader.prototype.remove = function (key) {
	        if (this.contains(key)) {
	            delete this.cache[key];
	        }
	    };
	    Loader.prototype.get = function (key) {
	        if (!this.contains(key)) {
	            return null;
	        }
	        return this.cache[key].data;
	    };
	    Loader.prototype.contains = function (key) {
	        return this.cache.hasOwnProperty(key);
	    };
	    Loader.prototype.isLoading = function (key) {
	        return this.contains(key) && this.cache[key].data === null;
	    };
	    Loader.prototype.isLoaded = function (key) {
	        return this.contains(key) && this.cache[key].data !== null;
	    };
	    Loader.prototype.loadScript = function (url, deferred, callback) {
	        return new Promise(function (resolve, reject) {
	            var tag = document.createElement('script');
	            tag.src = url;
	            tag.async = false;
	            tag.onload = function () {
	                if (typeof callback === 'function') {
	                    callback();
	                }
	                resolve();
	            };
	            document.head.appendChild(tag);
	        });
	    };
	    Loader.prototype.requestXhr = function (url, contentType) {
	        if (contentType === void 0) { contentType = 'application/json'; }
	        var xhr;
	        if (window.XMLHttpRequest) {
	            xhr = new XMLHttpRequest();
	        }
	        else {
	            return Promise.reject('Unable to send request, XMLHttpRequest not supported.');
	        }
	        return new Promise(function (resolve, reject) {
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState === 4) {
	                    if (xhr.status === 200) {
	                        resolve(xhr.responseText);
	                        xhr.onreadystatechange = null;
	                    }
	                    else if (xhr.status > 0) {
	                        reject("There was a problem with the request: status " + xhr.status);
	                        xhr.onreadystatechange = null;
	                    }
	                }
	            };
	            try {
	                xhr.open('GET', url, true);
	                xhr.setRequestHeader('Content-Type', contentType);
	                xhr.send();
	            }
	            catch (e) {
	                reject('Error: Unable to send request, CORS not allowed.');
	            }
	        });
	    };
	    return Loader;
	}());

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */

	function __awaiter(thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	function __generator(thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	}

	exports.BrandingDomain = void 0;
	(function (BrandingDomain) {
	    BrandingDomain[BrandingDomain["Neutral"] = 0] = "Neutral";
	    BrandingDomain[BrandingDomain["Yepi"] = 1] = "Yepi";
	    BrandingDomain[BrandingDomain["Spele"] = 2] = "Spele";
	    BrandingDomain[BrandingDomain["Funnygames"] = 3] = "Funnygames";
	    BrandingDomain[BrandingDomain["Kizi"] = 4] = "Kizi";
	    BrandingDomain[BrandingDomain["PlayCell"] = 5] = "PlayCell";
	    BrandingDomain[BrandingDomain["GameCell"] = 6] = "GameCell";
	    BrandingDomain[BrandingDomain["Bild"] = 7] = "Bild";
	    BrandingDomain[BrandingDomain["AGame"] = 8] = "AGame";
	    BrandingDomain[BrandingDomain["Admeen"] = 9] = "Admeen";
	    BrandingDomain[BrandingDomain["PlayTime"] = 10] = "PlayTime";
	    BrandingDomain[BrandingDomain["Zigiz"] = 11] = "Zigiz";
	})(exports.BrandingDomain || (exports.BrandingDomain = {}));

	/**
	 * These are all the valid targets we have for UTM campaign links
	 */
	exports.UtmTargets = void 0;
	(function (UtmTargets) {
	    UtmTargets[UtmTargets["splashscreen"] = 0] = "splashscreen";
	    UtmTargets[UtmTargets["logo"] = 1] = "logo";
	    UtmTargets[UtmTargets["facebook"] = 2] = "facebook";
	    UtmTargets[UtmTargets["twitter"] = 3] = "twitter";
	    UtmTargets[UtmTargets["playstore"] = 4] = "playstore";
	    UtmTargets[UtmTargets["appstore"] = 5] = "appstore";
	    UtmTargets[UtmTargets["more_games"] = 6] = "more_games";
	    UtmTargets[UtmTargets["download_game"] = 7] = "download_game";
	    UtmTargets[UtmTargets["walkthrough"] = 8] = "walkthrough";
	    UtmTargets[UtmTargets["disclaimer"] = 9] = "disclaimer";
	    UtmTargets[UtmTargets["highscores"] = 10] = "highscores";
	})(exports.UtmTargets || (exports.UtmTargets = {}));

	var CrossPromo = /** @class */ (function () {
	    function CrossPromo() {
	    }
	    /**
	     * Gets the protocol relevant to platform (desktop vs app)
	     *
	     * @param isDevice
	     * @returns {string}
	     */
	    CrossPromo.getProtocol = function (isDevice) {
	        var protocol = isDevice ? 'http://' : '//';
	        return protocol;
	    };
	    /**
	     * Gets UTM content value
	     *
	     * @param type
	     * @returns {string}
	     */
	    CrossPromo.getUtmContent = function (type) {
	        return typeof type === 'string' ? type : exports.UtmTargets[type];
	    };
	    /**
	     * Gets domain url
	     *
	     * @param domain
	     * @param protocol
	     * @returns {string}
	     */
	    CrossPromo.getDomainURL = function (domain, protocol) {
	        var url;
	        switch (domain) {
	            case exports.BrandingDomain.Spele:
	                url = protocol + 'www.spele.nl';
	                break;
	            case exports.BrandingDomain.Yepi:
	                url = protocol + 'www.yepi.com';
	                break;
	            case exports.BrandingDomain.Admeen:
	                url = 'http://media.admeen.com/branding/link.php';
	                break;
	            case exports.BrandingDomain.PlayCell:
	                url = protocol + 'www.playcell.com';
	                break;
	            case exports.BrandingDomain.GameCell:
	                url = protocol + 'www.gamecell.com';
	                break;
	            case exports.BrandingDomain.Kizi:
	                url = protocol + 'www.kizi.com';
	                break;
	            case exports.BrandingDomain.Bild:
	                url = protocol + 'www.bildspielt.de';
	                break;
	            case exports.BrandingDomain.Funnygames:
	                url = protocol + 'www.funnygames.nu';
	                break;
	            case exports.BrandingDomain.PlayTime:
	                url = protocol + 'playtime.nl';
	                break;
	            default:
	            case exports.BrandingDomain.AGame:
	                url = protocol + 'www.agame.com';
	                break;
	            case exports.BrandingDomain.Zigiz:
	                url = protocol + 'm.zigiz.com';
	                break;
	        }
	        return url;
	    };
	    /**
	     * Get default campaign url
	     *
	     * @returns {string}
	     */
	    CrossPromo.getPromoURL = function (domain, url, host, gameTitle, utmContent) {
	        if (window.hasOwnProperty('_YaSDK') || window.hasOwnProperty('YaGames')) {
	            return 'http://yandex.ru/games/search?query=z_publisher%3Aorange%20games/';
	        }
	        if (domain === exports.BrandingDomain.Admeen) {
	            return 'http://media.admeen.com/branding/link.php';
	        }
	        if (domain === exports.BrandingDomain.Bild) {
	            return url;
	        }
	        return url +
	            '/?utm_source=' +
	            host +
	            '&utm_medium=html5&utm_term=' +
	            gameTitle +
	            '&utm_content=' +
	            utmContent +
	            '&utm_campaign=Gamedistribution';
	    };
	    return CrossPromo;
	}());

	// This all here is for cache busting;
	function addScript(src, buster, callback) {
	    var s = document.createElement('script');
	    s.setAttribute('src', src + '?v=' + buster);
	    if (typeof callback === 'function') {
	        s.onload = callback;
	    }
	    document.body.appendChild(s);
	}
	var PortalScripts = /** @class */ (function () {
	    function PortalScripts() {
	    }
	    PortalScripts.loadPortalScript = function (siteLockList) {
	        if (siteLockList &&
	            siteLockList.hasOwnProperty('minijuegos') &&
	            siteLockList['minijuegos'].indexOf(Utils.getSourceSite()) !== -1) {
	            if (window.mpConfig !== undefined) {
	                window.mpConfig.partner = 'orange-games';
	            }
	            else {
	                window.mpConfig = {
	                    partner: 'orange-games'
	                };
	            }
	            // Abuse addScript that is in each game, or if it isn't there, do nothing
	            addScript('http://ext.minijuegosgratis.com/external-host/main.js', Date.now() / 1000);
	        }
	        if (siteLockList &&
	            siteLockList.hasOwnProperty('kongregate') &&
	            siteLockList['kongregate'].indexOf(Utils.getSourceSite()) !== -1) {
	            // Abuse addScript that is in each game, or if it isn't there, do nothing
	            addScript('http://cdn1.kongregate.com/javascripts/kongregate_api.js', Date.now() / 1000, function () {
	                if (typeof kongregateAPI !== 'undefined') {
	                    kongregateAPI.loadAPI(function () {
	                        window.kongregate = kongregateAPI.getAPI();
	                    });
	                }
	            });
	        }
	        if (siteLockList &&
	            siteLockList.hasOwnProperty('newgrounds') &&
	            siteLockList['newgrounds'].indexOf(Utils.getSourceSite()) !== -1) {
	            // Abuse addScript that is in each game, or if it isn't there, do nothing
	            addScript('http://cdn.fbrq.io/@azerion/splash/assets/scripts/newgroundsio.min.js', Date.now() / 1000);
	        }
	    };
	    return PortalScripts;
	}());

	var Branding = /** @class */ (function () {
	    function Branding() {
	    }
	    Branding.preload = function (version) {
	        var promise = Promise.all([
	            Loader.instance.load(Domain.KEY, Utils.ASSET_LOCATION + "json/domains.json?v=" + version, 'text/plain'),
	            Loader.instance.load(Branding.SITELOCK_PORTALS, Utils.ASSET_LOCATION + "json/sitelock.json?v=" + version, 'text/plain')
	        ]);
	        Promise.all([
	            Loader.instance.load(Branding.INTERNAL_PORTALS_KEY, Utils.ASSET_LOCATION + "json/internal.json?v=" + version, 'text/plain'),
	            Loader.instance.load(Branding.CONTRACTED_PORTALS_KEY, Utils.ASSET_LOCATION + "json/contracted.json?v=" + version, 'text/plain'),
	            Loader.instance.load(Branding.SPECIAL_PORTALS_KEY, Utils.ASSET_LOCATION + "json/special.json?v=" + version, 'text/plain')
	        ]);
	        return promise
	            .then(function (data) {
	            var domains = data[0];
	            var sitelock = data[1];
	            Domain.setList(domains);
	            PortalScripts.loadPortalScript(sitelock);
	            Branding.setSiteLock(sitelock);
	        })
	            .catch(function () {
	            console.warn('Unable to parse json');
	        });
	    };
	    Branding.setSiteLock = function (data) {
	        Branding.siteLocks = data;
	    };
	    Object.defineProperty(Branding, "brandingLogoUrl", {
	        /**
	         * Gets the url of the image needed for the branding logo.
	         *
	         * @returns {string} Endpoint url for the image to load.
	         */
	        get: function () {
	            var imageName;
	            if (Utils.isOnDevice() || Branding.isAirfi()) {
	                Utils.ASSET_LOCATION = 'assets/';
	            }
	            else if (Utils.getSourceSite(true) === 'fbrq.io') {
	                Utils.ASSET_LOCATION = 'http://' + window.location.host + '/@azerion/splash/assets/';
	            }
	            // If you are testing the splash screen locally with new assets that aren't uploaded yet, you need to make sure that Utils.ASSET_LOCATION is always set to 'assets/'.
	            // Please uncomment the next line if testing locally. Please do so in the Preloader.ts as well.
	            // Utils.ASSET_LOCATION = 'assets/';
	            switch (Utils.getBrandingDomain()) {
	                case exports.BrandingDomain.Spele:
	                    imageName = 'spele';
	                    break;
	                case exports.BrandingDomain.PlayCell:
	                    imageName = 'playcell';
	                    break;
	                case exports.BrandingDomain.GameCell:
	                    imageName = 'gamecell';
	                    break;
	                case exports.BrandingDomain.Yepi:
	                    imageName = 'yepi';
	                    break;
	                case exports.BrandingDomain.Admeen:
	                    imageName = 'admeen';
	                    break;
	                case exports.BrandingDomain.Bild:
	                    imageName = 'bild';
	                    break;
	                case exports.BrandingDomain.Kizi:
	                    imageName = 'kizi';
	                    break;
	                case exports.BrandingDomain.Funnygames:
	                    imageName = 'funnygames';
	                    break;
	                case exports.BrandingDomain.PlayTime:
	                    imageName = 'playtime';
	                    break;
	                default:
	                case exports.BrandingDomain.AGame:
	                    imageName = 'agame';
	                    break;
	                case exports.BrandingDomain.Zigiz:
	                    imageName = 'zigiz';
	                    break;
	            }
	            return Utils.ASSET_LOCATION + 'images/branding_logo_' + imageName + '_small.png';
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Branding, "brandingBackgroundColor", {
	        get: function () {
	            var bgColor;
	            switch (Utils.getBrandingDomain()) {
	                case exports.BrandingDomain.Spele:
	                    bgColor = '#4a72ad';
	                    break;
	                case exports.BrandingDomain.PlayCell:
	                    bgColor = '#52a1e1';
	                    break;
	                case exports.BrandingDomain.GameCell:
	                    bgColor = '#c600b2';
	                    break;
	                case exports.BrandingDomain.Yepi:
	                    bgColor = '#0573a7';
	                    break;
	                case exports.BrandingDomain.AGame:
	                    bgColor = '#0C486C';
	                    break;
	                case exports.BrandingDomain.Admeen:
	                    bgColor = '#4267B2';
	                    break;
	                case exports.BrandingDomain.Bild:
	                    bgColor = '#de0000';
	                    break;
	                default:
	                case exports.BrandingDomain.Kizi:
	                    bgColor = '#012f50';
	                    break;
	                case exports.BrandingDomain.Funnygames:
	                    bgColor = '#33b0ff';
	                    break;
	                case exports.BrandingDomain.PlayTime:
	                    bgColor = '#023a63';
	                    break;
	                case exports.BrandingDomain.Zigiz:
	                    bgColor = '#023a63';
	                    break;
	            }
	            return bgColor;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Checks whether outgoing links are blocked, dependent on domain or platform
	     *
	     * @returns {boolean}
	     */
	    Branding.blockedDomain = function () {
	        return Utils.isOnDevice() || Branding.isSpecial();
	    };
	    /**
	     * Create campaign url
	     *
	     * @returns {string}
	     */
	    Branding.createCampaignURL = function (gameTitle, type) {
	        var host = Utils.getSourceSite();
	        var domain = Utils.getBrandingDomain();
	        var protocol = CrossPromo.getProtocol(Utils.isOnDevice());
	        var url = CrossPromo.getDomainURL(domain, protocol);
	        var utmContent = CrossPromo.getUtmContent(type);
	        return CrossPromo.getPromoURL(domain, url, host, gameTitle, utmContent);
	    };
	    /**
	     * Fetches a UTM campaign link based on the website the game is loaded from
	     *
	     * @param gameTitle
	     * @param type
	     */
	    Branding.openCampaignLink = function (gameTitle, type) {
	        var win;
	        var completeURl = Branding.createCampaignURL(gameTitle, type);
	        if (!Branding.blockedDomain()) {
	            win = window.open(completeURl);
	            if (win && win.focus) {
	                win.focus();
	            }
	        }
	    };
	    /**
	     * Check if the game is loaded on a host we have internally whitelisted here at azerion
	     *
	     * @returns {boolean}
	     */
	    Branding.isInternal = function () {
	        return Branding.hostMatchesList(Loader.instance.get(Branding.INTERNAL_PORTALS_KEY));
	    };
	    /**
	     * Check if the game is loaded on a partner we have internally whitelisted here at azerion
	     *
	     * @returns {boolean}
	     */
	    Branding.isContracted = function () {
	        return Branding.hostMatchesList(Loader.instance.get(Branding.CONTRACTED_PORTALS_KEY));
	    };
	    /**
	     * Check if the game is loaded on a partner we have internally whitelisted here at azerion
	     *
	     * @returns {boolean}
	     */
	    Branding.isSpecial = function () {
	        return Branding.hostMatchesList(Loader.instance.get(Branding.SPECIAL_PORTALS_KEY));
	    };
	    Branding.isAdmeen = function () {
	        if (!Branding.siteLocks || !Branding.siteLocks.hasOwnProperty('admeen')) {
	            return false;
	        }
	        var admeen = Branding.siteLocks['admeen'];
	        return Branding.hostMatchesList(admeen);
	    };
	    /**
	     *  Special check for Kongregate so we can implement a special API
	     *
	     * @returns {boolean}
	     */
	    Branding.isKongregate = function () {
	        if (!Branding.siteLocks || !Branding.siteLocks.hasOwnProperty('kongregate')) {
	            return false;
	        }
	        var kongregate = Branding.siteLocks['kongregate'];
	        return Branding.hostMatchesList(kongregate);
	    };
	    /**
	     *  Special check for Kongregate so we can implement a special API
	     *
	     * @returns {boolean}
	     */
	    Branding.isNewgrounds = function () {
	        if (!Branding.siteLocks || !Branding.siteLocks.hasOwnProperty('newgrounds')) {
	            return false;
	        }
	        var newgrounds = Branding.siteLocks['newgrounds'];
	        return Branding.hostMatchesList(newgrounds);
	    };
	    /**
	     * Bild is a special case where we have a custom preloader, but also some test domains
	     * @returns {boolean}
	     */
	    Branding.isBild = function () {
	        // Official domain, for which we don't need an extra check:
	        // Utils.getSourceSite() === 'bildspielt.de'
	        if (window.location.host === 'bild.fbrq.io' ||
	            window.location.host.indexOf('contentfleet.com') !== -1) {
	            return true;
	        }
	        return false;
	    };
	    /**
	     * For playtime we might want specific features like webrtc multiplayer
	     * @returns {boolean}
	     */
	    Branding.isPlaytime = function () {
	        return window.location.host.indexOf('playtime.nl') !== -1;
	    };
	    /**
	     * Bip is a similar setup to bild where it also has a custom test environment on fbrq
	     *
	     * @returns {boolean}
	     */
	    Branding.isBip = function () {
	        // Official domain, for which we don't need an extra check:
	        if (window.location.search.indexOf('bipgaming') !== -1 ||
	            window.location.host === 'bip.fbrq.io') {
	            return true;
	        }
	        return false;
	    };
	    Branding.isPlaycellApp = function () {
	        if (window.location.search.indexOf('playcellApp') !== -1) {
	            return true;
	        }
	        return false;
	    };
	    /**
	     * Check if the portal is agame.com (Spil)
	     *
	     * @returns {boolean}
	     */
	    Branding.isAGame = function () {
	        return window.location.search.indexOf('agame') !== -1;
	    };
	    /**
	     * Simple check if we are on an Airfi device
	     *
	     * @returns {boolean}
	     */
	    Branding.isAirfi = function () {
	        return window.hasOwnProperty('airfi') ? window.airfi : false;
	    };
	    Branding.outGoingLinksAllowed = function () {
	        if (Branding.isAirfi() || Branding.isSpecial() || Branding.isContracted()) {
	            return false;
	        }
	        if (window.hasOwnProperty('fbrqLA')) {
	            return window.fbrqLA;
	        }
	        return true;
	    };
	    /**
	     * Helper method for checking if a host is in a list
	     *
	     * @param list
	     * @returns {boolean}
	     */
	    Branding.hostMatchesList = function (portals) {
	        portals = portals || [];
	        var host = Utils.getSourceSite();
	        for (var id = 0; id < portals.length; id++) {
	            if (host === portals[id]) {
	                return true;
	            }
	        }
	        return false;
	    };
	    // The image key for the logo we load
	    Branding.LOGO_KEY = 'branding_logo';
	    // The key for the json document that contains a list of all whitelisted portals
	    Branding.INTERNAL_PORTALS_KEY = 'branding_portals';
	    Branding.CONTRACTED_PORTALS_KEY = 'branding_contracted';
	    Branding.SPECIAL_PORTALS_KEY = 'branding_special';
	    Branding.SITELOCK_PORTALS = 'sitelock_portals';
	    Branding.DOMAIN_OVERWRITE = null;
	    Branding.analyticsEnabled = true;
	    return Branding;
	}());

	var Utils = /** @class */ (function () {
	    function Utils() {
	    }
	    /**
	     * assigns host name
	     *
	     * @returns {Promise}
	     */
	    Utils.loadHost = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var host, result, e_1;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        host = document.referrer || window.location.host;
	                        if (!window.hasOwnProperty('gdsdk')) return [3 /*break*/, 4];
	                        _a.label = 1;
	                    case 1:
	                        _a.trys.push([1, 3, , 4]);
	                        return [4 /*yield*/, window['gdsdk'].getSession()];
	                    case 2:
	                        result = _a.sent();
	                        host = result.location.parentDomain;
	                        return [3 /*break*/, 4];
	                    case 3:
	                        e_1 = _a.sent();
	                        console.log(e_1);
	                        return [3 /*break*/, 4];
	                    case 4:
	                        Utils.HOST = host;
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    /**
	     * detects if website is in iframe. if yes, returns only domain name
	     *
	     * @returns {string}
	     */
	    Utils.getSourceSite = function (forceLocal) {
	        if (forceLocal === void 0) { forceLocal = false; }
	        var host = Utils.HOST;
	        if (forceLocal) {
	            host = window.location.host;
	        }
	        if (host.indexOf('embed.gamedistribution.com') !== -1 &&
	            window.location.search.indexOf('gd_sdk_referrer_url') !== -1) {
	            host = Utils.getUrlParameter('gd_sdk_referrer_url') || host;
	        }
	        host = decodeURIComponent(host);
	        // So here we check any exceptions regarding host matching, usually this is for test environments
	        if (Branding.isBild()) {
	            return 'bildspielt.de';
	        }
	        if (Branding.isBip()) {
	            return 'bipgaming.com';
	        }
	        // find & remove protocol (http, ftp, etc.) and get domain
	        if (host.indexOf('://') > -1) {
	            host = host.split('/')[2];
	        }
	        else {
	            host = host.split('/')[0];
	        }
	        // find & remove port number
	        host = host.split(':')[0];
	        var newHost = Domain.getDomain(host);
	        if (newHost !== null) {
	            return newHost;
	        }
	        // find and remove subdomains
	        if (host.split('.').length === 3) {
	            host = host.substr(host.indexOf('.') + 1);
	        }
	        return host;
	    };
	    /**
	     * Special method that is used to check for current branding inorder to load the correct splash screen.
	     *
	     * Notable exception: Bip
	     * Eventhough bipgaming has a special entry for testing, it does not have it's own splashscreen/branding
	     *
	     * @returns {any}
	     */
	    Utils.getBrandingDomain = function () {
	        if (window.hasOwnProperty('fbrqBD') && window.fbrqBD in exports.BrandingDomain) {
	            return window.fbrqBD;
	        }
	        if (Branding.DOMAIN_OVERWRITE) {
	            return Branding.DOMAIN_OVERWRITE;
	        }
	        var source = Utils.getSourceSite();
	        if (Branding.isAdmeen()) {
	            return exports.BrandingDomain.Admeen;
	        }
	        if (Branding.isPlaycellApp() || Branding.isBip()) {
	            return exports.BrandingDomain.PlayCell;
	        }
	        switch (source) {
	            case 'spele.nl':
	                return exports.BrandingDomain.Spele;
	            case 'yepi.com':
	                return exports.BrandingDomain.Yepi;
	            case 'oyunskor.com':
	            case 'barbioyunu.com.tr':
	            case 'bebekoyunu.com.tr':
	            case 'oyunkolu.com':
	            case 'oyungemisi.com':
	            case 'oyunlar1.com':
	            case 'oyunkuzusu.com':
	            case 'kraloyun.com':
	            case 'rekoroyun.com':
	            case 'oyundedem.com':
	            case 'oyunoyna.com':
	            case 'pastaoyunu.com.tr':
	            case 'playcell.com':
	                return exports.BrandingDomain.PlayCell;
	            case 'gamecell.com':
	                return exports.BrandingDomain.GameCell;
	            case 'playxl.com':
	                return exports.BrandingDomain.Admeen;
	            case 'kizi.com':
	                return exports.BrandingDomain.Kizi;
	            case 'bildspielt.de':
	                return exports.BrandingDomain.Bild;
	            case 'funnygames.nl':
	                return exports.BrandingDomain.Funnygames;
	            case 'playtime.nl':
	                return exports.BrandingDomain.PlayTime;
	            default:
	            case 'agame.com':
	                return exports.BrandingDomain.AGame;
	            case 'gmbl.nl':
	            case 'zigiz.com':
	                return exports.BrandingDomain.Zigiz;
	            case 'coolmathgames.com':
	                return exports.BrandingDomain.Neutral;
	        }
	    };
	    Utils.getReferrer = function (host) {
	        if (host.indexOf('?ref=') !== -1) {
	            return host.substr(host.indexOf('?ref=') + 5);
	        }
	        return host;
	    };
	    /**
	     * Checks if the site is loaded in an iFrame or not
	     *
	     * @returns {boolean}
	     */
	    Utils.inIframe = function () {
	        try {
	            return window.self !== window.top;
	        }
	        catch (e) {
	            return true;
	        }
	    };
	    Utils.inGDGameZone = function () {
	        return document.referrer.indexOf('html5.gamedistribution.com') !== -1;
	    };
	    /**
	     * Nicely returns the domain + protocol of any given URI
	     *
	     * @param uri
	     * @returns {string|number}
	     */
	    Utils.getDomain = function (uri) {
	        var parser = document.createElement('a');
	        parser.href = uri;
	        return parser.origin;
	    };
	    /**
	     * Funky check for AppStore website loaders
	     *
	     * @param game
	     * @returns {boolean}
	     */
	    Utils.isOnDevice = function () {
	        // TODO: do device check here
	        if (typeof window.cordova !== 'undefined') {
	            return !/(gamedistribution\.com)/.test(window.location.hostname);
	        }
	        return false;
	    };
	    /**
	     * Horrible check for local infra, but otherwise I have no idea how to funky funky authentication issues
	     *
	     * @returns {boolean}
	     */
	    Utils.isTc = function () {
	        return /(teamcity\.azerdev\.com)/.test(window.location.host);
	    };
	    /**
	     * Fetches a random number between Min and Max
	     *
	     * @param min
	     * @param max
	     * @returns {number}
	     */
	    Utils.getRandomRange = function (min, max) {
	        return (Math.random() * (max - min) + min) | 0;
	    };
	    Utils.getUrlParameter = function (name) {
	        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	        var results = regex.exec(location.search);
	        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	    };
	    /**
	     * Converts the time in seconds to a textable string
	     *
	     * @param time
	     */
	    Utils.intTimeToString = function (time) {
	        var hours = Math.floor(time / 3600);
	        var minutes = Math.floor((time % 3600) / 60);
	        var seconds = time % 60;
	        var sHours = hours < 10 ? '0' + hours : hours.toString();
	        var sMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
	        var sSeconds = seconds < 10 ? '0' + seconds : seconds.toString();
	        return sHours + ':' + sMinutes + ':' + sSeconds;
	    };
	    Utils.LANGUAGE = 'en';
	    Utils.HOST = document.referrer || window.location.host;
	    Utils.ASSET_LOCATION = window.hasOwnProperty('fbrqSA') && window['fbrqSA'] === true
	        ? 'assets/'
	        : 'http://cdn.fbrq.io/@azerion/splash/assets/';
	    return Utils;
	}());

	var progressbar = createCommonjsModule(function (module, exports) {
	(function(f){{module.exports=f();}})(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	(function () {
	  var root = this || Function('return this')();

	/**
	 * Shifty Core
	 * By Jeremy Kahn - jeremyckahn@gmail.com
	 */

	var Tweenable = (function () {

	  // Aliases that get defined later in this function
	  var formula;

	  // CONSTANTS
	  var DEFAULT_SCHEDULE_FUNCTION;
	  var DEFAULT_EASING = 'linear';
	  var DEFAULT_DURATION = 500;
	  var UPDATE_TIME = 1000 / 60;

	  var _now = Date.now
	       ? Date.now
	       : function () {return +new Date();};

	  var now = typeof SHIFTY_DEBUG_NOW !== 'undefined' ? SHIFTY_DEBUG_NOW : _now;

	  if (typeof window !== 'undefined') {
	    // requestAnimationFrame() shim by Paul Irish (modified for Shifty)
	    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    DEFAULT_SCHEDULE_FUNCTION = window.requestAnimationFrame
	       || window.webkitRequestAnimationFrame
	       || window.oRequestAnimationFrame
	       || window.msRequestAnimationFrame
	       || (window.mozCancelRequestAnimationFrame
	       && window.mozRequestAnimationFrame)
	       || setTimeout;
	  } else {
	    DEFAULT_SCHEDULE_FUNCTION = setTimeout;
	  }

	  function noop () {
	    // NOOP!
	  }

	  /**
	   * Handy shortcut for doing a for-in loop. This is not a "normal" each
	   * function, it is optimized for Shifty.  The iterator function only receives
	   * the property name, not the value.
	   * @param {Object} obj
	   * @param {Function(string)} fn
	   * @private
	   */
	  function each (obj, fn) {
	    var key;
	    for (key in obj) {
	      if (Object.hasOwnProperty.call(obj, key)) {
	        fn(key);
	      }
	    }
	  }

	  /**
	   * Perform a shallow copy of Object properties.
	   * @param {Object} targetObject The object to copy into
	   * @param {Object} srcObject The object to copy from
	   * @return {Object} A reference to the augmented `targetObj` Object
	   * @private
	   */
	  function shallowCopy (targetObj, srcObj) {
	    each(srcObj, function (prop) {
	      targetObj[prop] = srcObj[prop];
	    });

	    return targetObj;
	  }

	  /**
	   * Copies each property from src onto target, but only if the property to
	   * copy to target is undefined.
	   * @param {Object} target Missing properties in this Object are filled in
	   * @param {Object} src
	   * @private
	   */
	  function defaults (target, src) {
	    each(src, function (prop) {
	      if (typeof target[prop] === 'undefined') {
	        target[prop] = src[prop];
	      }
	    });
	  }

	  /**
	   * Calculates the interpolated tween values of an Object for a given
	   * timestamp.
	   * @param {Number} forPosition The position to compute the state for.
	   * @param {Object} currentState Current state properties.
	   * @param {Object} originalState: The original state properties the Object is
	   * tweening from.
	   * @param {Object} targetState: The destination state properties the Object
	   * is tweening to.
	   * @param {number} duration: The length of the tween in milliseconds.
	   * @param {number} timestamp: The UNIX epoch time at which the tween began.
	   * @param {Object} easing: This Object's keys must correspond to the keys in
	   * targetState.
	   * @private
	   */
	  function tweenProps (forPosition, currentState, originalState, targetState,
	    duration, timestamp, easing) {
	    var normalizedPosition =
	        forPosition < timestamp ? 0 : (forPosition - timestamp) / duration;


	    var prop;
	    var easingObjectProp;
	    var easingFn;
	    for (prop in currentState) {
	      if (currentState.hasOwnProperty(prop)) {
	        easingObjectProp = easing[prop];
	        easingFn = typeof easingObjectProp === 'function'
	          ? easingObjectProp
	          : formula[easingObjectProp];

	        currentState[prop] = tweenProp(
	          originalState[prop],
	          targetState[prop],
	          easingFn,
	          normalizedPosition
	        );
	      }
	    }

	    return currentState;
	  }

	  /**
	   * Tweens a single property.
	   * @param {number} start The value that the tween started from.
	   * @param {number} end The value that the tween should end at.
	   * @param {Function} easingFunc The easing curve to apply to the tween.
	   * @param {number} position The normalized position (between 0.0 and 1.0) to
	   * calculate the midpoint of 'start' and 'end' against.
	   * @return {number} The tweened value.
	   * @private
	   */
	  function tweenProp (start, end, easingFunc, position) {
	    return start + (end - start) * easingFunc(position);
	  }

	  /**
	   * Applies a filter to Tweenable instance.
	   * @param {Tweenable} tweenable The `Tweenable` instance to call the filter
	   * upon.
	   * @param {String} filterName The name of the filter to apply.
	   * @private
	   */
	  function applyFilter (tweenable, filterName) {
	    var filters = Tweenable.prototype.filter;
	    var args = tweenable._filterArgs;

	    each(filters, function (name) {
	      if (typeof filters[name][filterName] !== 'undefined') {
	        filters[name][filterName].apply(tweenable, args);
	      }
	    });
	  }

	  var timeoutHandler_endTime;
	  var timeoutHandler_currentTime;
	  var timeoutHandler_isEnded;
	  var timeoutHandler_offset;
	  /**
	   * Handles the update logic for one step of a tween.
	   * @param {Tweenable} tweenable
	   * @param {number} timestamp
	   * @param {number} delay
	   * @param {number} duration
	   * @param {Object} currentState
	   * @param {Object} originalState
	   * @param {Object} targetState
	   * @param {Object} easing
	   * @param {Function(Object, *, number)} step
	   * @param {Function(Function,number)}} schedule
	   * @param {number=} opt_currentTimeOverride Needed for accurate timestamp in
	   * Tweenable#seek.
	   * @private
	   */
	  function timeoutHandler (tweenable, timestamp, delay, duration, currentState,
	    originalState, targetState, easing, step, schedule,
	    opt_currentTimeOverride) {

	    timeoutHandler_endTime = timestamp + delay + duration;

	    timeoutHandler_currentTime =
	    Math.min(opt_currentTimeOverride || now(), timeoutHandler_endTime);

	    timeoutHandler_isEnded =
	      timeoutHandler_currentTime >= timeoutHandler_endTime;

	    timeoutHandler_offset = duration - (
	      timeoutHandler_endTime - timeoutHandler_currentTime);

	    if (tweenable.isPlaying()) {
	      if (timeoutHandler_isEnded) {
	        step(targetState, tweenable._attachment, timeoutHandler_offset);
	        tweenable.stop(true);
	      } else {
	        tweenable._scheduleId =
	          schedule(tweenable._timeoutHandler, UPDATE_TIME);

	        applyFilter(tweenable, 'beforeTween');

	        // If the animation has not yet reached the start point (e.g., there was
	        // delay that has not yet completed), just interpolate the starting
	        // position of the tween.
	        if (timeoutHandler_currentTime < (timestamp + delay)) {
	          tweenProps(1, currentState, originalState, targetState, 1, 1, easing);
	        } else {
	          tweenProps(timeoutHandler_currentTime, currentState, originalState,
	            targetState, duration, timestamp + delay, easing);
	        }

	        applyFilter(tweenable, 'afterTween');

	        step(currentState, tweenable._attachment, timeoutHandler_offset);
	      }
	    }
	  }


	  /**
	   * Creates a usable easing Object from a string, a function or another easing
	   * Object.  If `easing` is an Object, then this function clones it and fills
	   * in the missing properties with `"linear"`.
	   * @param {Object.<string|Function>} fromTweenParams
	   * @param {Object|string|Function} easing
	   * @return {Object.<string|Function>}
	   * @private
	   */
	  function composeEasingObject (fromTweenParams, easing) {
	    var composedEasing = {};
	    var typeofEasing = typeof easing;

	    if (typeofEasing === 'string' || typeofEasing === 'function') {
	      each(fromTweenParams, function (prop) {
	        composedEasing[prop] = easing;
	      });
	    } else {
	      each(fromTweenParams, function (prop) {
	        if (!composedEasing[prop]) {
	          composedEasing[prop] = easing[prop] || DEFAULT_EASING;
	        }
	      });
	    }

	    return composedEasing;
	  }

	  /**
	   * Tweenable constructor.
	   * @class Tweenable
	   * @param {Object=} opt_initialState The values that the initial tween should
	   * start at if a `from` object is not provided to `{{#crossLink
	   * "Tweenable/tween:method"}}{{/crossLink}}` or `{{#crossLink
	   * "Tweenable/setConfig:method"}}{{/crossLink}}`.
	   * @param {Object=} opt_config Configuration object to be passed to
	   * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
	   * @module Tweenable
	   * @constructor
	   */
	  function Tweenable (opt_initialState, opt_config) {
	    this._currentState = opt_initialState || {};
	    this._configured = false;
	    this._scheduleFunction = DEFAULT_SCHEDULE_FUNCTION;

	    // To prevent unnecessary calls to setConfig do not set default
	    // configuration here.  Only set default configuration immediately before
	    // tweening if none has been set.
	    if (typeof opt_config !== 'undefined') {
	      this.setConfig(opt_config);
	    }
	  }

	  /**
	   * Configure and start a tween.
	   * @method tween
	   * @param {Object=} opt_config Configuration object to be passed to
	   * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
	   * @chainable
	   */
	  Tweenable.prototype.tween = function (opt_config) {
	    if (this._isTweening) {
	      return this;
	    }

	    // Only set default config if no configuration has been set previously and
	    // none is provided now.
	    if (opt_config !== undefined || !this._configured) {
	      this.setConfig(opt_config);
	    }

	    this._timestamp = now();
	    this._start(this.get(), this._attachment);
	    return this.resume();
	  };

	  /**
	   * Configure a tween that will start at some point in the future.
	   *
	   * @method setConfig
	   * @param {Object} config The following values are valid:
	   * - __from__ (_Object=_): Starting position.  If omitted, `{{#crossLink
	   *   "Tweenable/get:method"}}get(){{/crossLink}}` is used.
	   * - __to__ (_Object=_): Ending position.
	   * - __duration__ (_number=_): How many milliseconds to animate for.
	   * - __delay__ (_delay=_): How many milliseconds to wait before starting the
	   *   tween.
	   * - __start__ (_Function(Object, *)_): Function to execute when the tween
	   *   begins.  Receives the state of the tween as the first parameter and
	   *   `attachment` as the second parameter.
	   * - __step__ (_Function(Object, *, number)_): Function to execute on every
	   *   tick.  Receives `{{#crossLink
	   *   "Tweenable/get:method"}}get(){{/crossLink}}` as the first parameter,
	   *   `attachment` as the second parameter, and the time elapsed since the
	   *   start of the tween as the third. This function is not called on the
	   *   final step of the animation, but `finish` is.
	   * - __finish__ (_Function(Object, *)_): Function to execute upon tween
	   *   completion.  Receives the state of the tween as the first parameter and
	   *   `attachment` as the second parameter.
	   * - __easing__ (_Object.<string|Function>|string|Function=_): Easing curve
	   *   name(s) or function(s) to use for the tween.
	   * - __attachment__ (_*_): Cached value that is passed to the
	   *   `step`/`start`/`finish` methods.
	   * @chainable
	   */
	  Tweenable.prototype.setConfig = function (config) {
	    config = config || {};
	    this._configured = true;

	    // Attach something to this Tweenable instance (e.g.: a DOM element, an
	    // object, a string, etc.);
	    this._attachment = config.attachment;

	    // Init the internal state
	    this._pausedAtTime = null;
	    this._scheduleId = null;
	    this._delay = config.delay || 0;
	    this._start = config.start || noop;
	    this._step = config.step || noop;
	    this._finish = config.finish || noop;
	    this._duration = config.duration || DEFAULT_DURATION;
	    this._currentState = shallowCopy({}, config.from || this.get());
	    this._originalState = this.get();
	    this._targetState = shallowCopy({}, config.to || this.get());

	    var self = this;
	    this._timeoutHandler = function () {
	      timeoutHandler(self,
	        self._timestamp,
	        self._delay,
	        self._duration,
	        self._currentState,
	        self._originalState,
	        self._targetState,
	        self._easing,
	        self._step,
	        self._scheduleFunction
	      );
	    };

	    // Aliases used below
	    var currentState = this._currentState;
	    var targetState = this._targetState;

	    // Ensure that there is always something to tween to.
	    defaults(targetState, currentState);

	    this._easing = composeEasingObject(
	      currentState, config.easing || DEFAULT_EASING);

	    this._filterArgs =
	      [currentState, this._originalState, targetState, this._easing];

	    applyFilter(this, 'tweenCreated');
	    return this;
	  };

	  /**
	   * @method get
	   * @return {Object} The current state.
	   */
	  Tweenable.prototype.get = function () {
	    return shallowCopy({}, this._currentState);
	  };

	  /**
	   * @method set
	   * @param {Object} state The current state.
	   */
	  Tweenable.prototype.set = function (state) {
	    this._currentState = state;
	  };

	  /**
	   * Pause a tween.  Paused tweens can be resumed from the point at which they
	   * were paused.  This is different from `{{#crossLink
	   * "Tweenable/stop:method"}}{{/crossLink}}`, as that method
	   * causes a tween to start over when it is resumed.
	   * @method pause
	   * @chainable
	   */
	  Tweenable.prototype.pause = function () {
	    this._pausedAtTime = now();
	    this._isPaused = true;
	    return this;
	  };

	  /**
	   * Resume a paused tween.
	   * @method resume
	   * @chainable
	   */
	  Tweenable.prototype.resume = function () {
	    if (this._isPaused) {
	      this._timestamp += now() - this._pausedAtTime;
	    }

	    this._isPaused = false;
	    this._isTweening = true;

	    this._timeoutHandler();

	    return this;
	  };

	  /**
	   * Move the state of the animation to a specific point in the tween's
	   * timeline.  If the animation is not running, this will cause the `step`
	   * handlers to be called.
	   * @method seek
	   * @param {millisecond} millisecond The millisecond of the animation to seek
	   * to.  This must not be less than `0`.
	   * @chainable
	   */
	  Tweenable.prototype.seek = function (millisecond) {
	    millisecond = Math.max(millisecond, 0);
	    var currentTime = now();

	    if ((this._timestamp + millisecond) === 0) {
	      return this;
	    }

	    this._timestamp = currentTime - millisecond;

	    if (!this.isPlaying()) {
	      this._isTweening = true;
	      this._isPaused = false;

	      // If the animation is not running, call timeoutHandler to make sure that
	      // any step handlers are run.
	      timeoutHandler(this,
	        this._timestamp,
	        this._delay,
	        this._duration,
	        this._currentState,
	        this._originalState,
	        this._targetState,
	        this._easing,
	        this._step,
	        this._scheduleFunction,
	        currentTime
	      );

	      this.pause();
	    }

	    return this;
	  };

	  /**
	   * Stops and cancels a tween.
	   * @param {boolean=} gotoEnd If `false` or omitted, the tween just stops at
	   * its current state, and the `finish` handler is not invoked.  If `true`,
	   * the tweened object's values are instantly set to the target values, and
	   * `finish` is invoked.
	   * @method stop
	   * @chainable
	   */
	  Tweenable.prototype.stop = function (gotoEnd) {
	    this._isTweening = false;
	    this._isPaused = false;
	    this._timeoutHandler = noop;

	    (root.cancelAnimationFrame            ||
	    root.webkitCancelAnimationFrame     ||
	    root.oCancelAnimationFrame          ||
	    root.msCancelAnimationFrame         ||
	    root.mozCancelRequestAnimationFrame ||
	    root.clearTimeout)(this._scheduleId);

	    if (gotoEnd) {
	      applyFilter(this, 'beforeTween');
	      tweenProps(
	        1,
	        this._currentState,
	        this._originalState,
	        this._targetState,
	        1,
	        0,
	        this._easing
	      );
	      applyFilter(this, 'afterTween');
	      applyFilter(this, 'afterTweenEnd');
	      this._finish.call(this, this._currentState, this._attachment);
	    }

	    return this;
	  };

	  /**
	   * @method isPlaying
	   * @return {boolean} Whether or not a tween is running.
	   */
	  Tweenable.prototype.isPlaying = function () {
	    return this._isTweening && !this._isPaused;
	  };

	  /**
	   * Set a custom schedule function.
	   *
	   * If a custom function is not set,
	   * [`requestAnimationFrame`](http://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)
	   * is used if available, otherwise
	   * [`setTimeout`](http://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout)
	   * is used.
	   * @method setScheduleFunction
	   * @param {Function(Function,number)} scheduleFunction The function to be
	   * used to schedule the next frame to be rendered.
	   */
	  Tweenable.prototype.setScheduleFunction = function (scheduleFunction) {
	    this._scheduleFunction = scheduleFunction;
	  };

	  /**
	   * `delete` all "own" properties.  Call this when the `Tweenable` instance
	   * is no longer needed to free memory.
	   * @method dispose
	   */
	  Tweenable.prototype.dispose = function () {
	    var prop;
	    for (prop in this) {
	      if (this.hasOwnProperty(prop)) {
	        delete this[prop];
	      }
	    }
	  };

	  /**
	   * Filters are used for transforming the properties of a tween at various
	   * points in a Tweenable's life cycle.  See the README for more info on this.
	   * @private
	   */
	  Tweenable.prototype.filter = {};

	  /**
	   * This object contains all of the tweens available to Shifty.  It is
	   * extensible - simply attach properties to the `Tweenable.prototype.formula`
	   * Object following the same format as `linear`.
	   *
	   * `pos` should be a normalized `number` (between 0 and 1).
	   * @property formula
	   * @type {Object(function)}
	   */
	  Tweenable.prototype.formula = {
	    linear: function (pos) {
	      return pos;
	    }
	  };

	  formula = Tweenable.prototype.formula;

	  shallowCopy(Tweenable, {
	    'now': now
	    ,'each': each
	    ,'tweenProps': tweenProps
	    ,'tweenProp': tweenProp
	    ,'applyFilter': applyFilter
	    ,'shallowCopy': shallowCopy
	    ,'defaults': defaults
	    ,'composeEasingObject': composeEasingObject
	  });

	  // `root` is provided in the intro/outro files.

	  // A hook used for unit testing.
	  if (typeof SHIFTY_DEBUG_NOW === 'function') {
	    root.timeoutHandler = timeoutHandler;
	  }

	  // Bootstrap Tweenable appropriately for the environment.
	  if (typeof exports === 'object') {
	    // CommonJS
	    module.exports = Tweenable;
	  } else if (typeof root.Tweenable === 'undefined') {
	    // Browser: Make `Tweenable` globally accessible.
	    root.Tweenable = Tweenable;
	  }

	  return Tweenable;

	} ());
	(function () {

	  Tweenable.shallowCopy(Tweenable.prototype.formula, {
	    easeInQuad: function (pos) {
	      return Math.pow(pos, 2);
	    },

	    easeOutQuad: function (pos) {
	      return -(Math.pow((pos - 1), 2) - 1);
	    },

	    easeInOutQuad: function (pos) {
	      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,2);}
	      return -0.5 * ((pos -= 2) * pos - 2);
	    },

	    easeInCubic: function (pos) {
	      return Math.pow(pos, 3);
	    },

	    easeOutCubic: function (pos) {
	      return (Math.pow((pos - 1), 3) + 1);
	    },

	    easeInOutCubic: function (pos) {
	      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,3);}
	      return 0.5 * (Math.pow((pos - 2),3) + 2);
	    },

	    easeInQuart: function (pos) {
	      return Math.pow(pos, 4);
	    },

	    easeOutQuart: function (pos) {
	      return -(Math.pow((pos - 1), 4) - 1);
	    },

	    easeInOutQuart: function (pos) {
	      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,4);}
	      return -0.5 * ((pos -= 2) * Math.pow(pos,3) - 2);
	    },

	    easeInQuint: function (pos) {
	      return Math.pow(pos, 5);
	    },

	    easeOutQuint: function (pos) {
	      return (Math.pow((pos - 1), 5) + 1);
	    },

	    easeInOutQuint: function (pos) {
	      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,5);}
	      return 0.5 * (Math.pow((pos - 2),5) + 2);
	    },

	    easeInSine: function (pos) {
	      return -Math.cos(pos * (Math.PI / 2)) + 1;
	    },

	    easeOutSine: function (pos) {
	      return Math.sin(pos * (Math.PI / 2));
	    },

	    easeInOutSine: function (pos) {
	      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
	    },

	    easeInExpo: function (pos) {
	      return (pos === 0) ? 0 : Math.pow(2, 10 * (pos - 1));
	    },

	    easeOutExpo: function (pos) {
	      return (pos === 1) ? 1 : -Math.pow(2, -10 * pos) + 1;
	    },

	    easeInOutExpo: function (pos) {
	      if (pos === 0) {return 0;}
	      if (pos === 1) {return 1;}
	      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(2,10 * (pos - 1));}
	      return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
	    },

	    easeInCirc: function (pos) {
	      return -(Math.sqrt(1 - (pos * pos)) - 1);
	    },

	    easeOutCirc: function (pos) {
	      return Math.sqrt(1 - Math.pow((pos - 1), 2));
	    },

	    easeInOutCirc: function (pos) {
	      if ((pos /= 0.5) < 1) {return -0.5 * (Math.sqrt(1 - pos * pos) - 1);}
	      return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
	    },

	    easeOutBounce: function (pos) {
	      if ((pos) < (1 / 2.75)) {
	        return (7.5625 * pos * pos);
	      } else if (pos < (2 / 2.75)) {
	        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
	      } else if (pos < (2.5 / 2.75)) {
	        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
	      } else {
	        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
	      }
	    },

	    easeInBack: function (pos) {
	      var s = 1.70158;
	      return (pos) * pos * ((s + 1) * pos - s);
	    },

	    easeOutBack: function (pos) {
	      var s = 1.70158;
	      return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
	    },

	    easeInOutBack: function (pos) {
	      var s = 1.70158;
	      if ((pos /= 0.5) < 1) {
	        return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));
	      }
	      return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
	    },

	    elastic: function (pos) {
	      // jshint maxlen:90
	      return -1 * Math.pow(4,-8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
	    },

	    swingFromTo: function (pos) {
	      var s = 1.70158;
	      return ((pos /= 0.5) < 1) ?
	          0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
	          0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
	    },

	    swingFrom: function (pos) {
	      var s = 1.70158;
	      return pos * pos * ((s + 1) * pos - s);
	    },

	    swingTo: function (pos) {
	      var s = 1.70158;
	      return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
	    },

	    bounce: function (pos) {
	      if (pos < (1 / 2.75)) {
	        return (7.5625 * pos * pos);
	      } else if (pos < (2 / 2.75)) {
	        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
	      } else if (pos < (2.5 / 2.75)) {
	        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
	      } else {
	        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
	      }
	    },

	    bouncePast: function (pos) {
	      if (pos < (1 / 2.75)) {
	        return (7.5625 * pos * pos);
	      } else if (pos < (2 / 2.75)) {
	        return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
	      } else if (pos < (2.5 / 2.75)) {
	        return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
	      } else {
	        return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
	      }
	    },

	    easeFromTo: function (pos) {
	      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,4);}
	      return -0.5 * ((pos -= 2) * Math.pow(pos,3) - 2);
	    },

	    easeFrom: function (pos) {
	      return Math.pow(pos,4);
	    },

	    easeTo: function (pos) {
	      return Math.pow(pos,0.25);
	    }
	  });

	}());
	(function () {
	  // port of webkit cubic bezier handling by http://www.netzgesta.de/dev/
	  function cubicBezierAtTime(t,p1x,p1y,p2x,p2y,duration) {
	    var ax = 0,bx = 0,cx = 0,ay = 0,by = 0,cy = 0;
	    function sampleCurveX(t) {
	      return ((ax * t + bx) * t + cx) * t;
	    }
	    function sampleCurveY(t) {
	      return ((ay * t + by) * t + cy) * t;
	    }
	    function sampleCurveDerivativeX(t) {
	      return (3.0 * ax * t + 2.0 * bx) * t + cx;
	    }
	    function solveEpsilon(duration) {
	      return 1.0 / (200.0 * duration);
	    }
	    function solve(x,epsilon) {
	      return sampleCurveY(solveCurveX(x, epsilon));
	    }
	    function fabs(n) {
	      if (n >= 0) {
	        return n;
	      } else {
	        return 0 - n;
	      }
	    }
	    function solveCurveX(x, epsilon) {
	      var t0,t1,t2,x2,d2,i;
	      for (t2 = x, i = 0; i < 8; i++) {
	        x2 = sampleCurveX(t2) - x;
	        if (fabs(x2) < epsilon) {
	          return t2;
	        }
	        d2 = sampleCurveDerivativeX(t2);
	        if (fabs(d2) < 1e-6) {
	          break;
	        }
	        t2 = t2 - x2 / d2;
	      }
	      t0 = 0.0;
	      t1 = 1.0;
	      t2 = x;
	      if (t2 < t0) {
	        return t0;
	      }
	      if (t2 > t1) {
	        return t1;
	      }
	      while (t0 < t1) {
	        x2 = sampleCurveX(t2);
	        if (fabs(x2 - x) < epsilon) {
	          return t2;
	        }
	        if (x > x2) {
	          t0 = t2;
	        }else {
	          t1 = t2;
	        }
	        t2 = (t1 - t0) * 0.5 + t0;
	      }
	      return t2; // Failure.
	    }
	    cx = 3.0 * p1x;
	    bx = 3.0 * (p2x - p1x) - cx;
	    ax = 1.0 - cx - bx;
	    cy = 3.0 * p1y;
	    by = 3.0 * (p2y - p1y) - cy;
	    ay = 1.0 - cy - by;
	    return solve(t, solveEpsilon(duration));
	  }
	  /**
	   *  getCubicBezierTransition(x1, y1, x2, y2) -> Function
	   *
	   *  Generates a transition easing function that is compatible
	   *  with WebKit's CSS transitions `-webkit-transition-timing-function`
	   *  CSS property.
	   *
	   *  The W3C has more information about CSS3 transition timing functions:
	   *  http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
	   *
	   *  @param {number} x1
	   *  @param {number} y1
	   *  @param {number} x2
	   *  @param {number} y2
	   *  @return {function}
	   *  @private
	   */
	  function getCubicBezierTransition (x1, y1, x2, y2) {
	    return function (pos) {
	      return cubicBezierAtTime(pos,x1,y1,x2,y2,1);
	    };
	  }
	  // End ported code

	  /**
	   * Create a Bezier easing function and attach it to `{{#crossLink
	   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  This
	   * function gives you total control over the easing curve.  Matthew Lein's
	   * [Ceaser](http://matthewlein.com/ceaser/) is a useful tool for visualizing
	   * the curves you can make with this function.
	   * @method setBezierFunction
	   * @param {string} name The name of the easing curve.  Overwrites the old
	   * easing function on `{{#crossLink
	   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}` if it
	   * exists.
	   * @param {number} x1
	   * @param {number} y1
	   * @param {number} x2
	   * @param {number} y2
	   * @return {function} The easing function that was attached to
	   * Tweenable.prototype.formula.
	   */
	  Tweenable.setBezierFunction = function (name, x1, y1, x2, y2) {
	    var cubicBezierTransition = getCubicBezierTransition(x1, y1, x2, y2);
	    cubicBezierTransition.displayName = name;
	    cubicBezierTransition.x1 = x1;
	    cubicBezierTransition.y1 = y1;
	    cubicBezierTransition.x2 = x2;
	    cubicBezierTransition.y2 = y2;

	    return Tweenable.prototype.formula[name] = cubicBezierTransition;
	  };


	  /**
	   * `delete` an easing function from `{{#crossLink
	   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  Be
	   * careful with this method, as it `delete`s whatever easing formula matches
	   * `name` (which means you can delete standard Shifty easing functions).
	   * @method unsetBezierFunction
	   * @param {string} name The name of the easing function to delete.
	   * @return {function}
	   */
	  Tweenable.unsetBezierFunction = function (name) {
	    delete Tweenable.prototype.formula[name];
	  };

	})();
	(function () {

	  function getInterpolatedValues (
	    from, current, targetState, position, easing, delay) {
	    return Tweenable.tweenProps(
	      position, current, from, targetState, 1, delay, easing);
	  }

	  // Fake a Tweenable and patch some internals.  This approach allows us to
	  // skip uneccessary processing and object recreation, cutting down on garbage
	  // collection pauses.
	  var mockTweenable = new Tweenable();
	  mockTweenable._filterArgs = [];

	  /**
	   * Compute the midpoint of two Objects.  This method effectively calculates a
	   * specific frame of animation that `{{#crossLink
	   * "Tweenable/tween:method"}}{{/crossLink}}` does many times over the course
	   * of a full tween.
	   *
	   *     var interpolatedValues = Tweenable.interpolate({
	   *       width: '100px',
	   *       opacity: 0,
	   *       color: '#fff'
	   *     }, {
	   *       width: '200px',
	   *       opacity: 1,
	   *       color: '#000'
	   *     }, 0.5);
	   *
	   *     console.log(interpolatedValues);
	   *     // {opacity: 0.5, width: "150px", color: "rgb(127,127,127)"}
	   *
	   * @static
	   * @method interpolate
	   * @param {Object} from The starting values to tween from.
	   * @param {Object} targetState The ending values to tween to.
	   * @param {number} position The normalized position value (between `0.0` and
	   * `1.0`) to interpolate the values between `from` and `to` for.  `from`
	   * represents `0` and `to` represents `1`.
	   * @param {Object.<string|Function>|string|Function} easing The easing
	   * curve(s) to calculate the midpoint against.  You can reference any easing
	   * function attached to `Tweenable.prototype.formula`, or provide the easing
	   * function(s) directly.  If omitted, this defaults to "linear".
	   * @param {number=} opt_delay Optional delay to pad the beginning of the
	   * interpolated tween with.  This increases the range of `position` from (`0`
	   * through `1`) to (`0` through `1 + opt_delay`).  So, a delay of `0.5` would
	   * increase all valid values of `position` to numbers between `0` and `1.5`.
	   * @return {Object}
	   */
	  Tweenable.interpolate = function (
	    from, targetState, position, easing, opt_delay) {

	    var current = Tweenable.shallowCopy({}, from);
	    var delay = opt_delay || 0;
	    var easingObject = Tweenable.composeEasingObject(
	      from, easing || 'linear');

	    mockTweenable.set({});

	    // Alias and reuse the _filterArgs array instead of recreating it.
	    var filterArgs = mockTweenable._filterArgs;
	    filterArgs.length = 0;
	    filterArgs[0] = current;
	    filterArgs[1] = from;
	    filterArgs[2] = targetState;
	    filterArgs[3] = easingObject;

	    // Any defined value transformation must be applied
	    Tweenable.applyFilter(mockTweenable, 'tweenCreated');
	    Tweenable.applyFilter(mockTweenable, 'beforeTween');

	    var interpolatedValues = getInterpolatedValues(
	      from, current, targetState, position, easingObject, delay);

	    // Transform values back into their original format
	    Tweenable.applyFilter(mockTweenable, 'afterTween');

	    return interpolatedValues;
	  };

	}());
	(function (Tweenable) {

	  // CONSTANTS

	  var R_NUMBER_COMPONENT = /(\d|\-|\.)/;
	  var R_FORMAT_CHUNKS = /([^\-0-9\.]+)/g;
	  var R_UNFORMATTED_VALUES = /[0-9.\-]+/g;
	  var R_RGB = new RegExp(
	    'rgb\\(' + R_UNFORMATTED_VALUES.source +
	    (/,\s*/.source) + R_UNFORMATTED_VALUES.source +
	    (/,\s*/.source) + R_UNFORMATTED_VALUES.source + '\\)', 'g');
	  var R_RGB_PREFIX = /^.*\(/;
	  var R_HEX = /#([0-9]|[a-f]){3,6}/gi;
	  var VALUE_PLACEHOLDER = 'VAL';

	  // HELPERS

	  /**
	   * @param {Array.number} rawValues
	   * @param {string} prefix
	   *
	   * @return {Array.<string>}
	   * @private
	   */
	  function getFormatChunksFrom (rawValues, prefix) {
	    var accumulator = [];

	    var rawValuesLength = rawValues.length;
	    var i;

	    for (i = 0; i < rawValuesLength; i++) {
	      accumulator.push('_' + prefix + '_' + i);
	    }

	    return accumulator;
	  }

	  /**
	   * @param {string} formattedString
	   *
	   * @return {string}
	   * @private
	   */
	  function getFormatStringFrom (formattedString) {
	    var chunks = formattedString.match(R_FORMAT_CHUNKS);

	    if (!chunks) {
	      // chunks will be null if there were no tokens to parse in
	      // formattedString (for example, if formattedString is '2').  Coerce
	      // chunks to be useful here.
	      chunks = ['', ''];

	      // If there is only one chunk, assume that the string is a number
	      // followed by a token...
	      // NOTE: This may be an unwise assumption.
	    } else if (chunks.length === 1 ||
	      // ...or if the string starts with a number component (".", "-", or a
	      // digit)...
	    formattedString.charAt(0).match(R_NUMBER_COMPONENT)) {
	      // ...prepend an empty string here to make sure that the formatted number
	      // is properly replaced by VALUE_PLACEHOLDER
	      chunks.unshift('');
	    }

	    return chunks.join(VALUE_PLACEHOLDER);
	  }

	  /**
	   * Convert all hex color values within a string to an rgb string.
	   *
	   * @param {Object} stateObject
	   *
	   * @return {Object} The modified obj
	   * @private
	   */
	  function sanitizeObjectForHexProps (stateObject) {
	    Tweenable.each(stateObject, function (prop) {
	      var currentProp = stateObject[prop];

	      if (typeof currentProp === 'string' && currentProp.match(R_HEX)) {
	        stateObject[prop] = sanitizeHexChunksToRGB(currentProp);
	      }
	    });
	  }

	  /**
	   * @param {string} str
	   *
	   * @return {string}
	   * @private
	   */
	  function  sanitizeHexChunksToRGB (str) {
	    return filterStringChunks(R_HEX, str, convertHexToRGB);
	  }

	  /**
	   * @param {string} hexString
	   *
	   * @return {string}
	   * @private
	   */
	  function convertHexToRGB (hexString) {
	    var rgbArr = hexToRGBArray(hexString);
	    return 'rgb(' + rgbArr[0] + ',' + rgbArr[1] + ',' + rgbArr[2] + ')';
	  }

	  var hexToRGBArray_returnArray = [];
	  /**
	   * Convert a hexadecimal string to an array with three items, one each for
	   * the red, blue, and green decimal values.
	   *
	   * @param {string} hex A hexadecimal string.
	   *
	   * @returns {Array.<number>} The converted Array of RGB values if `hex` is a
	   * valid string, or an Array of three 0's.
	   * @private
	   */
	  function hexToRGBArray (hex) {

	    hex = hex.replace(/#/, '');

	    // If the string is a shorthand three digit hex notation, normalize it to
	    // the standard six digit notation
	    if (hex.length === 3) {
	      hex = hex.split('');
	      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	    }

	    hexToRGBArray_returnArray[0] = hexToDec(hex.substr(0, 2));
	    hexToRGBArray_returnArray[1] = hexToDec(hex.substr(2, 2));
	    hexToRGBArray_returnArray[2] = hexToDec(hex.substr(4, 2));

	    return hexToRGBArray_returnArray;
	  }

	  /**
	   * Convert a base-16 number to base-10.
	   *
	   * @param {Number|String} hex The value to convert
	   *
	   * @returns {Number} The base-10 equivalent of `hex`.
	   * @private
	   */
	  function hexToDec (hex) {
	    return parseInt(hex, 16);
	  }

	  /**
	   * Runs a filter operation on all chunks of a string that match a RegExp
	   *
	   * @param {RegExp} pattern
	   * @param {string} unfilteredString
	   * @param {function(string)} filter
	   *
	   * @return {string}
	   * @private
	   */
	  function filterStringChunks (pattern, unfilteredString, filter) {
	    var pattenMatches = unfilteredString.match(pattern);
	    var filteredString = unfilteredString.replace(pattern, VALUE_PLACEHOLDER);

	    if (pattenMatches) {
	      var pattenMatchesLength = pattenMatches.length;
	      var currentChunk;

	      for (var i = 0; i < pattenMatchesLength; i++) {
	        currentChunk = pattenMatches.shift();
	        filteredString = filteredString.replace(
	          VALUE_PLACEHOLDER, filter(currentChunk));
	      }
	    }

	    return filteredString;
	  }

	  /**
	   * Check for floating point values within rgb strings and rounds them.
	   *
	   * @param {string} formattedString
	   *
	   * @return {string}
	   * @private
	   */
	  function sanitizeRGBChunks (formattedString) {
	    return filterStringChunks(R_RGB, formattedString, sanitizeRGBChunk);
	  }

	  /**
	   * @param {string} rgbChunk
	   *
	   * @return {string}
	   * @private
	   */
	  function sanitizeRGBChunk (rgbChunk) {
	    var numbers = rgbChunk.match(R_UNFORMATTED_VALUES);
	    var numbersLength = numbers.length;
	    var sanitizedString = rgbChunk.match(R_RGB_PREFIX)[0];

	    for (var i = 0; i < numbersLength; i++) {
	      sanitizedString += parseInt(numbers[i], 10) + ',';
	    }

	    sanitizedString = sanitizedString.slice(0, -1) + ')';

	    return sanitizedString;
	  }

	  /**
	   * @param {Object} stateObject
	   *
	   * @return {Object} An Object of formatManifests that correspond to
	   * the string properties of stateObject
	   * @private
	   */
	  function getFormatManifests (stateObject) {
	    var manifestAccumulator = {};

	    Tweenable.each(stateObject, function (prop) {
	      var currentProp = stateObject[prop];

	      if (typeof currentProp === 'string') {
	        var rawValues = getValuesFrom(currentProp);

	        manifestAccumulator[prop] = {
	          'formatString': getFormatStringFrom(currentProp)
	          ,'chunkNames': getFormatChunksFrom(rawValues, prop)
	        };
	      }
	    });

	    return manifestAccumulator;
	  }

	  /**
	   * @param {Object} stateObject
	   * @param {Object} formatManifests
	   * @private
	   */
	  function expandFormattedProperties (stateObject, formatManifests) {
	    Tweenable.each(formatManifests, function (prop) {
	      var currentProp = stateObject[prop];
	      var rawValues = getValuesFrom(currentProp);
	      var rawValuesLength = rawValues.length;

	      for (var i = 0; i < rawValuesLength; i++) {
	        stateObject[formatManifests[prop].chunkNames[i]] = +rawValues[i];
	      }

	      delete stateObject[prop];
	    });
	  }

	  /**
	   * @param {Object} stateObject
	   * @param {Object} formatManifests
	   * @private
	   */
	  function collapseFormattedProperties (stateObject, formatManifests) {
	    Tweenable.each(formatManifests, function (prop) {
	      var currentProp = stateObject[prop];
	      var formatChunks = extractPropertyChunks(
	        stateObject, formatManifests[prop].chunkNames);
	      var valuesList = getValuesList(
	        formatChunks, formatManifests[prop].chunkNames);
	      currentProp = getFormattedValues(
	        formatManifests[prop].formatString, valuesList);
	      stateObject[prop] = sanitizeRGBChunks(currentProp);
	    });
	  }

	  /**
	   * @param {Object} stateObject
	   * @param {Array.<string>} chunkNames
	   *
	   * @return {Object} The extracted value chunks.
	   * @private
	   */
	  function extractPropertyChunks (stateObject, chunkNames) {
	    var extractedValues = {};
	    var currentChunkName, chunkNamesLength = chunkNames.length;

	    for (var i = 0; i < chunkNamesLength; i++) {
	      currentChunkName = chunkNames[i];
	      extractedValues[currentChunkName] = stateObject[currentChunkName];
	      delete stateObject[currentChunkName];
	    }

	    return extractedValues;
	  }

	  var getValuesList_accumulator = [];
	  /**
	   * @param {Object} stateObject
	   * @param {Array.<string>} chunkNames
	   *
	   * @return {Array.<number>}
	   * @private
	   */
	  function getValuesList (stateObject, chunkNames) {
	    getValuesList_accumulator.length = 0;
	    var chunkNamesLength = chunkNames.length;

	    for (var i = 0; i < chunkNamesLength; i++) {
	      getValuesList_accumulator.push(stateObject[chunkNames[i]]);
	    }

	    return getValuesList_accumulator;
	  }

	  /**
	   * @param {string} formatString
	   * @param {Array.<number>} rawValues
	   *
	   * @return {string}
	   * @private
	   */
	  function getFormattedValues (formatString, rawValues) {
	    var formattedValueString = formatString;
	    var rawValuesLength = rawValues.length;

	    for (var i = 0; i < rawValuesLength; i++) {
	      formattedValueString = formattedValueString.replace(
	        VALUE_PLACEHOLDER, +rawValues[i].toFixed(4));
	    }

	    return formattedValueString;
	  }

	  /**
	   * Note: It's the duty of the caller to convert the Array elements of the
	   * return value into numbers.  This is a performance optimization.
	   *
	   * @param {string} formattedString
	   *
	   * @return {Array.<string>|null}
	   * @private
	   */
	  function getValuesFrom (formattedString) {
	    return formattedString.match(R_UNFORMATTED_VALUES);
	  }

	  /**
	   * @param {Object} easingObject
	   * @param {Object} tokenData
	   * @private
	   */
	  function expandEasingObject (easingObject, tokenData) {
	    Tweenable.each(tokenData, function (prop) {
	      var currentProp = tokenData[prop];
	      var chunkNames = currentProp.chunkNames;
	      var chunkLength = chunkNames.length;

	      var easing = easingObject[prop];
	      var i;

	      if (typeof easing === 'string') {
	        var easingChunks = easing.split(' ');
	        var lastEasingChunk = easingChunks[easingChunks.length - 1];

	        for (i = 0; i < chunkLength; i++) {
	          easingObject[chunkNames[i]] = easingChunks[i] || lastEasingChunk;
	        }

	      } else {
	        for (i = 0; i < chunkLength; i++) {
	          easingObject[chunkNames[i]] = easing;
	        }
	      }

	      delete easingObject[prop];
	    });
	  }

	  /**
	   * @param {Object} easingObject
	   * @param {Object} tokenData
	   * @private
	   */
	  function collapseEasingObject (easingObject, tokenData) {
	    Tweenable.each(tokenData, function (prop) {
	      var currentProp = tokenData[prop];
	      var chunkNames = currentProp.chunkNames;
	      var chunkLength = chunkNames.length;

	      var firstEasing = easingObject[chunkNames[0]];
	      var typeofEasings = typeof firstEasing;

	      if (typeofEasings === 'string') {
	        var composedEasingString = '';

	        for (var i = 0; i < chunkLength; i++) {
	          composedEasingString += ' ' + easingObject[chunkNames[i]];
	          delete easingObject[chunkNames[i]];
	        }

	        easingObject[prop] = composedEasingString.substr(1);
	      } else {
	        easingObject[prop] = firstEasing;
	      }
	    });
	  }

	  Tweenable.prototype.filter.token = {
	    'tweenCreated': function (currentState, fromState, toState, easingObject) {
	      sanitizeObjectForHexProps(currentState);
	      sanitizeObjectForHexProps(fromState);
	      sanitizeObjectForHexProps(toState);
	      this._tokenData = getFormatManifests(currentState);
	    },

	    'beforeTween': function (currentState, fromState, toState, easingObject) {
	      expandEasingObject(easingObject, this._tokenData);
	      expandFormattedProperties(currentState, this._tokenData);
	      expandFormattedProperties(fromState, this._tokenData);
	      expandFormattedProperties(toState, this._tokenData);
	    },

	    'afterTween': function (currentState, fromState, toState, easingObject) {
	      collapseFormattedProperties(currentState, this._tokenData);
	      collapseFormattedProperties(fromState, this._tokenData);
	      collapseFormattedProperties(toState, this._tokenData);
	      collapseEasingObject(easingObject, this._tokenData);
	    }
	  };

	} (Tweenable));

	}).call(null);

	},{}],2:[function(require,module,exports){
	// Circle shaped progress bar

	var Shape = require('./shape');
	var utils = require('./utils');

	var Circle = function Circle(container, options) {
	    // Use two arcs to form a circle
	    // See this answer http://stackoverflow.com/a/10477334/1446092
	    this._pathTemplate =
	        'M 50,50 m 0,-{radius}' +
	        ' a {radius},{radius} 0 1 1 0,{2radius}' +
	        ' a {radius},{radius} 0 1 1 0,-{2radius}';

	    this.containerAspectRatio = 1;

	    Shape.apply(this, arguments);
	};

	Circle.prototype = new Shape();
	Circle.prototype.constructor = Circle;

	Circle.prototype._pathString = function _pathString(opts) {
	    var widthOfWider = opts.strokeWidth;
	    if (opts.trailWidth && opts.trailWidth > opts.strokeWidth) {
	        widthOfWider = opts.trailWidth;
	    }

	    var r = 50 - widthOfWider / 2;

	    return utils.render(this._pathTemplate, {
	        radius: r,
	        '2radius': r * 2
	    });
	};

	Circle.prototype._trailString = function _trailString(opts) {
	    return this._pathString(opts);
	};

	module.exports = Circle;

	},{"./shape":7,"./utils":9}],3:[function(require,module,exports){
	// Line shaped progress bar

	var Shape = require('./shape');
	var utils = require('./utils');

	var Line = function Line(container, options) {
	    this._pathTemplate = 'M 0,{center} L 100,{center}';
	    Shape.apply(this, arguments);
	};

	Line.prototype = new Shape();
	Line.prototype.constructor = Line;

	Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
	    svg.setAttribute('viewBox', '0 0 100 ' + opts.strokeWidth);
	    svg.setAttribute('preserveAspectRatio', 'none');
	};

	Line.prototype._pathString = function _pathString(opts) {
	    return utils.render(this._pathTemplate, {
	        center: opts.strokeWidth / 2
	    });
	};

	Line.prototype._trailString = function _trailString(opts) {
	    return this._pathString(opts);
	};

	module.exports = Line;

	},{"./shape":7,"./utils":9}],4:[function(require,module,exports){
	module.exports = {
	    // Higher level API, different shaped progress bars
	    Line: require('./line'),
	    Circle: require('./circle'),
	    SemiCircle: require('./semicircle'),
	    Square: require('./square'),

	    // Lower level API to use any SVG path
	    Path: require('./path'),

	    // Base-class for creating new custom shapes
	    // to be in line with the API of built-in shapes
	    // Undocumented.
	    Shape: require('./shape'),

	    // Internal utils, undocumented.
	    utils: require('./utils')
	};

	},{"./circle":2,"./line":3,"./path":5,"./semicircle":6,"./shape":7,"./square":8,"./utils":9}],5:[function(require,module,exports){
	// Lower level API to animate any kind of svg path

	var Tweenable = require('shifty');
	var utils = require('./utils');

	var EASING_ALIASES = {
	    easeIn: 'easeInCubic',
	    easeOut: 'easeOutCubic',
	    easeInOut: 'easeInOutCubic'
	};

	var Path = function Path(path, opts) {
	    // Throw a better error if not initialized with `new` keyword
	    if (!(this instanceof Path)) {
	        throw new Error('Constructor was called without new keyword');
	    }

	    // Default parameters for animation
	    opts = utils.extend({
	        duration: 800,
	        easing: 'linear',
	        from: {},
	        to: {},
	        step: function() {}
	    }, opts);

	    var element;
	    if (utils.isString(path)) {
	        element = document.querySelector(path);
	    } else {
	        element = path;
	    }

	    // Reveal .path as public attribute
	    this.path = element;
	    this._opts = opts;
	    this._tweenable = null;

	    // Set up the starting positions
	    var length = this.path.getTotalLength();
	    this.path.style.strokeDasharray = length + ' ' + length;
	    this.set(0);
	};

	Path.prototype.value = function value() {
	    var offset = this._getComputedDashOffset();
	    var length = this.path.getTotalLength();

	    var progress = 1 - offset / length;
	    // Round number to prevent returning very small number like 1e-30, which
	    // is practically 0
	    return parseFloat(progress.toFixed(6), 10);
	};

	Path.prototype.set = function set(progress) {
	    this.stop();

	    this.path.style.strokeDashoffset = this._progressToOffset(progress);

	    var step = this._opts.step;
	    if (utils.isFunction(step)) {
	        var easing = this._easing(this._opts.easing);
	        var values = this._calculateTo(progress, easing);
	        var reference = this._opts.shape || this;
	        step(values, reference, this._opts.attachment);
	    }
	};

	Path.prototype.stop = function stop() {
	    this._stopTween();
	    this.path.style.strokeDashoffset = this._getComputedDashOffset();
	};

	// Method introduced here:
	// http://jakearchibald.com/2013/animated-line-drawing-svg/
	Path.prototype.animate = function animate(progress, opts, cb) {
	    opts = opts || {};

	    if (utils.isFunction(opts)) {
	        cb = opts;
	        opts = {};
	    }

	    var passedOpts = utils.extend({}, opts);

	    // Copy default opts to new object so defaults are not modified
	    var defaultOpts = utils.extend({}, this._opts);
	    opts = utils.extend(defaultOpts, opts);

	    var shiftyEasing = this._easing(opts.easing);
	    var values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);

	    this.stop();

	    // Trigger a layout so styles are calculated & the browser
	    // picks up the starting position before animating
	    this.path.getBoundingClientRect();

	    var offset = this._getComputedDashOffset();
	    var newOffset = this._progressToOffset(progress);

	    var self = this;
	    this._tweenable = new Tweenable();
	    this._tweenable.tween({
	        from: utils.extend({ offset: offset }, values.from),
	        to: utils.extend({ offset: newOffset }, values.to),
	        duration: opts.duration,
	        easing: shiftyEasing,
	        step: function(state) {
	            self.path.style.strokeDashoffset = state.offset;
	            var reference = opts.shape || self;
	            opts.step(state, reference, opts.attachment);
	        },
	        finish: function(state) {
	            if (utils.isFunction(cb)) {
	                cb();
	            }
	        }
	    });
	};

	Path.prototype._getComputedDashOffset = function _getComputedDashOffset() {
	    var computedStyle = window.getComputedStyle(this.path, null);
	    return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'), 10);
	};

	Path.prototype._progressToOffset = function _progressToOffset(progress) {
	    var length = this.path.getTotalLength();
	    return length - progress * length;
	};

	// Resolves from and to values for animation.
	Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
	    if (opts.from && opts.to) {
	        return {
	            from: opts.from,
	            to: opts.to
	        };
	    }

	    return {
	        from: this._calculateFrom(easing),
	        to: this._calculateTo(progress, easing)
	    };
	};

	// Calculate `from` values from options passed at initialization
	Path.prototype._calculateFrom = function _calculateFrom(easing) {
	    return Tweenable.interpolate(this._opts.from, this._opts.to, this.value(), easing);
	};

	// Calculate `to` values from options passed at initialization
	Path.prototype._calculateTo = function _calculateTo(progress, easing) {
	    return Tweenable.interpolate(this._opts.from, this._opts.to, progress, easing);
	};

	Path.prototype._stopTween = function _stopTween() {
	    if (this._tweenable !== null) {
	        this._tweenable.stop();
	        this._tweenable = null;
	    }
	};

	Path.prototype._easing = function _easing(easing) {
	    if (EASING_ALIASES.hasOwnProperty(easing)) {
	        return EASING_ALIASES[easing];
	    }

	    return easing;
	};

	module.exports = Path;

	},{"./utils":9,"shifty":1}],6:[function(require,module,exports){
	// Semi-SemiCircle shaped progress bar

	var Shape = require('./shape');
	var Circle = require('./circle');
	var utils = require('./utils');

	var SemiCircle = function SemiCircle(container, options) {
	    // Use one arc to form a SemiCircle
	    // See this answer http://stackoverflow.com/a/10477334/1446092
	    this._pathTemplate =
	        'M 50,50 m -{radius},0' +
	        ' a {radius},{radius} 0 1 1 {2radius},0';

	    this.containerAspectRatio = 2;

	    Shape.apply(this, arguments);
	};

	SemiCircle.prototype = new Shape();
	SemiCircle.prototype.constructor = SemiCircle;

	SemiCircle.prototype._initializeSvg = function _initializeSvg(svg, opts) {
	    svg.setAttribute('viewBox', '0 0 100 50');
	};

	SemiCircle.prototype._initializeTextContainer = function _initializeTextContainer(
	    opts,
	    container,
	    textContainer
	) {
	    if (opts.text.style) {
	        // Reset top style
	        textContainer.style.top = 'auto';
	        textContainer.style.bottom = '0';

	        if (opts.text.alignToBottom) {
	            utils.setStyle(textContainer, 'transform', 'translate(-50%, 0)');
	        } else {
	            utils.setStyle(textContainer, 'transform', 'translate(-50%, 50%)');
	        }
	    }
	};

	// Share functionality with Circle, just have different path
	SemiCircle.prototype._pathString = Circle.prototype._pathString;
	SemiCircle.prototype._trailString = Circle.prototype._trailString;

	module.exports = SemiCircle;

	},{"./circle":2,"./shape":7,"./utils":9}],7:[function(require,module,exports){
	// Base object for different progress bar shapes

	var Path = require('./path');
	var utils = require('./utils');

	var DESTROYED_ERROR = 'Object is destroyed';

	var Shape = function Shape(container, opts) {
	    // Throw a better error if progress bars are not initialized with `new`
	    // keyword
	    if (!(this instanceof Shape)) {
	        throw new Error('Constructor was called without new keyword');
	    }

	    // Prevent calling constructor without parameters so inheritance
	    // works correctly. To understand, this is how Shape is inherited:
	    //
	    //   Line.prototype = new Shape();
	    //
	    // We just want to set the prototype for Line.
	    if (arguments.length === 0) {
	        return;
	    }

	    // Default parameters for progress bar creation
	    this._opts = utils.extend({
	        color: '#555',
	        strokeWidth: 1.0,
	        trailColor: null,
	        trailWidth: null,
	        fill: null,
	        text: {
	            style: {
	                color: null,
	                position: 'absolute',
	                left: '50%',
	                top: '50%',
	                padding: 0,
	                margin: 0,
	                transform: {
	                    prefix: true,
	                    value: 'translate(-50%, -50%)'
	                }
	            },
	            autoStyleContainer: true,
	            alignToBottom: true,
	            value: null,
	            className: 'progressbar-text'
	        },
	        svgStyle: {
	            display: 'block',
	            width: '100%'
	        },
	        warnings: false
	    }, opts, true);  // Use recursive extend

	    // If user specifies e.g. svgStyle or text style, the whole object
	    // should replace the defaults to make working with styles easier
	    if (utils.isObject(opts) && opts.svgStyle !== undefined) {
	        this._opts.svgStyle = opts.svgStyle;
	    }
	    if (utils.isObject(opts) && utils.isObject(opts.text) && opts.text.style !== undefined) {
	        this._opts.text.style = opts.text.style;
	    }

	    var svgView = this._createSvgView(this._opts);

	    var element;
	    if (utils.isString(container)) {
	        element = document.querySelector(container);
	    } else {
	        element = container;
	    }

	    if (!element) {
	        throw new Error('Container does not exist: ' + container);
	    }

	    this._container = element;
	    this._container.appendChild(svgView.svg);
	    if (this._opts.warnings) {
	        this._warnContainerAspectRatio(this._container);
	    }

	    if (this._opts.svgStyle) {
	        utils.setStyles(svgView.svg, this._opts.svgStyle);
	    }

	    // Expose public attributes before Path initialization
	    this.svg = svgView.svg;
	    this.path = svgView.path;
	    this.trail = svgView.trail;
	    this.text = null;

	    var newOpts = utils.extend({
	        attachment: undefined,
	        shape: this
	    }, this._opts);
	    this._progressPath = new Path(svgView.path, newOpts);

	    if (utils.isObject(this._opts.text) && this._opts.text.value !== null) {
	        this.setText(this._opts.text.value);
	    }
	};

	Shape.prototype.animate = function animate(progress, opts, cb) {
	    if (this._progressPath === null) {
	        throw new Error(DESTROYED_ERROR);
	    }

	    this._progressPath.animate(progress, opts, cb);
	};

	Shape.prototype.stop = function stop() {
	    if (this._progressPath === null) {
	        throw new Error(DESTROYED_ERROR);
	    }

	    // Don't crash if stop is called inside step function
	    if (this._progressPath === undefined) {
	        return;
	    }

	    this._progressPath.stop();
	};

	Shape.prototype.destroy = function destroy() {
	    if (this._progressPath === null) {
	        throw new Error(DESTROYED_ERROR);
	    }

	    this.stop();
	    this.svg.parentNode.removeChild(this.svg);
	    this.svg = null;
	    this.path = null;
	    this.trail = null;
	    this._progressPath = null;

	    if (this.text !== null) {
	        this.text.parentNode.removeChild(this.text);
	        this.text = null;
	    }
	};

	Shape.prototype.set = function set(progress) {
	    if (this._progressPath === null) {
	        throw new Error(DESTROYED_ERROR);
	    }

	    this._progressPath.set(progress);
	};

	Shape.prototype.value = function value() {
	    if (this._progressPath === null) {
	        throw new Error(DESTROYED_ERROR);
	    }

	    if (this._progressPath === undefined) {
	        return 0;
	    }

	    return this._progressPath.value();
	};

	Shape.prototype.setText = function setText(newText) {
	    if (this._progressPath === null) {
	        throw new Error(DESTROYED_ERROR);
	    }

	    if (this.text === null) {
	        // Create new text node
	        this.text = this._createTextContainer(this._opts, this._container);
	        this._container.appendChild(this.text);
	    }

	    // Remove previous text and add new
	    if (utils.isObject(newText)) {
	        utils.removeChildren(this.text);
	        this.text.appendChild(newText);
	    } else {
	        this.text.innerHTML = newText;
	    }
	};

	Shape.prototype._createSvgView = function _createSvgView(opts) {
	    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	    this._initializeSvg(svg, opts);

	    var trailPath = null;
	    // Each option listed in the if condition are 'triggers' for creating
	    // the trail path
	    if (opts.trailColor || opts.trailWidth) {
	        trailPath = this._createTrail(opts);
	        svg.appendChild(trailPath);
	    }

	    var path = this._createPath(opts);
	    svg.appendChild(path);

	    return {
	        svg: svg,
	        path: path,
	        trail: trailPath
	    };
	};

	Shape.prototype._initializeSvg = function _initializeSvg(svg, opts) {
	    svg.setAttribute('viewBox', '0 0 100 100');
	};

	Shape.prototype._createPath = function _createPath(opts) {
	    var pathString = this._pathString(opts);
	    return this._createPathElement(pathString, opts);
	};

	Shape.prototype._createTrail = function _createTrail(opts) {
	    // Create path string with original passed options
	    var pathString = this._trailString(opts);

	    // Prevent modifying original
	    var newOpts = utils.extend({}, opts);

	    // Defaults for parameters which modify trail path
	    if (!newOpts.trailColor) {
	        newOpts.trailColor = '#eee';
	    }
	    if (!newOpts.trailWidth) {
	        newOpts.trailWidth = newOpts.strokeWidth;
	    }

	    newOpts.color = newOpts.trailColor;
	    newOpts.strokeWidth = newOpts.trailWidth;

	    // When trail path is set, fill must be set for it instead of the
	    // actual path to prevent trail stroke from clipping
	    newOpts.fill = null;

	    return this._createPathElement(pathString, newOpts);
	};

	Shape.prototype._createPathElement = function _createPathElement(pathString, opts) {
	    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	    path.setAttribute('d', pathString);
	    path.setAttribute('stroke', opts.color);
	    path.setAttribute('stroke-width', opts.strokeWidth);

	    if (opts.fill) {
	        path.setAttribute('fill', opts.fill);
	    } else {
	        path.setAttribute('fill-opacity', '0');
	    }

	    return path;
	};

	Shape.prototype._createTextContainer = function _createTextContainer(opts, container) {
	    var textContainer = document.createElement('div');
	    textContainer.className = opts.text.className;

	    var textStyle = opts.text.style;
	    if (textStyle) {
	        if (opts.text.autoStyleContainer) {
	            container.style.position = 'relative';
	        }

	        utils.setStyles(textContainer, textStyle);
	        // Default text color to progress bar's color
	        if (!textStyle.color) {
	            textContainer.style.color = opts.color;
	        }
	    }

	    this._initializeTextContainer(opts, container, textContainer);
	    return textContainer;
	};

	// Give custom shapes possibility to modify text element
	Shape.prototype._initializeTextContainer = function(opts, container, element) {
	    // By default, no-op
	    // Custom shapes should respect API options, such as text.style
	};

	Shape.prototype._pathString = function _pathString(opts) {
	    throw new Error('Override this function for each progress bar');
	};

	Shape.prototype._trailString = function _trailString(opts) {
	    throw new Error('Override this function for each progress bar');
	};

	Shape.prototype._warnContainerAspectRatio = function _warnContainerAspectRatio(container) {
	    if (!this.containerAspectRatio) {
	        return;
	    }

	    var computedStyle = window.getComputedStyle(container, null);
	    var width = parseFloat(computedStyle.getPropertyValue('width'), 10);
	    var height = parseFloat(computedStyle.getPropertyValue('height'), 10);
	    if (!utils.floatEquals(this.containerAspectRatio, width / height)) {
	        console.warn(
	            'Incorrect aspect ratio of container',
	            '#' + container.id,
	            'detected:',
	            computedStyle.getPropertyValue('width') + '(width)',
	            '/',
	            computedStyle.getPropertyValue('height') + '(height)',
	            '=',
	            width / height
	        );

	        console.warn(
	            'Aspect ratio of should be',
	            this.containerAspectRatio
	        );
	    }
	};

	module.exports = Shape;

	},{"./path":5,"./utils":9}],8:[function(require,module,exports){
	// Square shaped progress bar
	// Note: Square is not core part of API anymore. It's left here
	//       for reference. square is not included to the progressbar
	//       build anymore

	var Shape = require('./shape');
	var utils = require('./utils');

	var Square = function Square(container, options) {
	    this._pathTemplate =
	        'M 0,{halfOfStrokeWidth}' +
	        ' L {width},{halfOfStrokeWidth}' +
	        ' L {width},{width}' +
	        ' L {halfOfStrokeWidth},{width}' +
	        ' L {halfOfStrokeWidth},{strokeWidth}';

	    this._trailTemplate =
	        'M {startMargin},{halfOfStrokeWidth}' +
	        ' L {width},{halfOfStrokeWidth}' +
	        ' L {width},{width}' +
	        ' L {halfOfStrokeWidth},{width}' +
	        ' L {halfOfStrokeWidth},{halfOfStrokeWidth}';

	    Shape.apply(this, arguments);
	};

	Square.prototype = new Shape();
	Square.prototype.constructor = Square;

	Square.prototype._pathString = function _pathString(opts) {
	    var w = 100 - opts.strokeWidth / 2;

	    return utils.render(this._pathTemplate, {
	        width: w,
	        strokeWidth: opts.strokeWidth,
	        halfOfStrokeWidth: opts.strokeWidth / 2
	    });
	};

	Square.prototype._trailString = function _trailString(opts) {
	    var w = 100 - opts.strokeWidth / 2;

	    return utils.render(this._trailTemplate, {
	        width: w,
	        strokeWidth: opts.strokeWidth,
	        halfOfStrokeWidth: opts.strokeWidth / 2,
	        startMargin: opts.strokeWidth / 2 - opts.trailWidth / 2
	    });
	};

	module.exports = Square;

	},{"./shape":7,"./utils":9}],9:[function(require,module,exports){
	// Utility functions

	var PREFIXES = 'Webkit Moz O ms'.split(' ');
	var FLOAT_COMPARISON_EPSILON = 0.001;

	// Copy all attributes from source object to destination object.
	// destination object is mutated.
	function extend(destination, source, recursive) {
	    destination = destination || {};
	    source = source || {};
	    recursive = recursive || false;

	    for (var attrName in source) {
	        if (source.hasOwnProperty(attrName)) {
	            var destVal = destination[attrName];
	            var sourceVal = source[attrName];
	            if (recursive && isObject(destVal) && isObject(sourceVal)) {
	                destination[attrName] = extend(destVal, sourceVal, recursive);
	            } else {
	                destination[attrName] = sourceVal;
	            }
	        }
	    }

	    return destination;
	}

	// Renders templates with given variables. Variables must be surrounded with
	// braces without any spaces, e.g. {variable}
	// All instances of variable placeholders will be replaced with given content
	// Example:
	// render('Hello, {message}!', {message: 'world'})
	function render(template, vars) {
	    var rendered = template;

	    for (var key in vars) {
	        if (vars.hasOwnProperty(key)) {
	            var val = vars[key];
	            var regExpString = '\\{' + key + '\\}';
	            var regExp = new RegExp(regExpString, 'g');

	            rendered = rendered.replace(regExp, val);
	        }
	    }

	    return rendered;
	}

	function setStyle(element, style, value) {
	    var elStyle = element.style;  // cache for performance

	    for (var i = 0; i < PREFIXES.length; ++i) {
	        var prefix = PREFIXES[i];
	        elStyle[prefix + capitalize(style)] = value;
	    }

	    elStyle[style] = value;
	}

	function setStyles(element, styles) {
	    forEachObject(styles, function(styleValue, styleName) {
	        // Allow disabling some individual styles by setting them
	        // to null or undefined
	        if (styleValue === null || styleValue === undefined) {
	            return;
	        }

	        // If style's value is {prefix: true, value: '50%'},
	        // Set also browser prefixed styles
	        if (isObject(styleValue) && styleValue.prefix === true) {
	            setStyle(element, styleName, styleValue.value);
	        } else {
	            element.style[styleName] = styleValue;
	        }
	    });
	}

	function capitalize(text) {
	    return text.charAt(0).toUpperCase() + text.slice(1);
	}

	function isString(obj) {
	    return typeof obj === 'string' || obj instanceof String;
	}

	function isFunction(obj) {
	    return typeof obj === 'function';
	}

	function isArray(obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]';
	}

	// Returns true if `obj` is object as in {a: 1, b: 2}, not if it's function or
	// array
	function isObject(obj) {
	    if (isArray(obj)) {
	        return false;
	    }

	    var type = typeof obj;
	    return type === 'object' && !!obj;
	}

	function forEachObject(object, callback) {
	    for (var key in object) {
	        if (object.hasOwnProperty(key)) {
	            var val = object[key];
	            callback(val, key);
	        }
	    }
	}

	function floatEquals(a, b) {
	    return Math.abs(a - b) < FLOAT_COMPARISON_EPSILON;
	}

	// http://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements
	function removeChildren(el) {
	    while (el.firstChild) {
	        el.removeChild(el.firstChild);
	    }
	}

	module.exports = {
	    extend: extend,
	    render: render,
	    setStyle: setStyle,
	    setStyles: setStyles,
	    capitalize: capitalize,
	    isString: isString,
	    isFunction: isFunction,
	    isObject: isObject,
	    forEachObject: forEachObject,
	    floatEquals: floatEquals,
	    removeChildren: removeChildren
	};

	},{}]},{},[4])(4)
	});
	});

	function getCss() {
	    return "\n        #h5branding-center {\n            position: absolute;\n            top: 45%;\n            left: 50%;\n            transform: translate(-50%, -20%);\n            text-align: center;\n            width: 100%;\n        }\n        #h5branding-wrapper {\n            position: relative;\n            z-index: 665;\n            width: 150px;\n            height: 150px;\n            display:inline-block;\n            margin: 35px 40px 96px 40px;\n        }\n\n        #h5branding-version {\n            position: absolute;\n            right: 10px;\n            font-family: Helvetica, Arial, sans-serif;\n            color: #ffffff;\n            font-size: 0.8em;\n            top: 10px;\n            display: none;\n        }\n\n        #h5branding-wrapper > #h5branding-bar, #h5branding-wrapper > img {\n            box-shadow: inset 10px 10px 20px 5px rgba(0, 0, 0, 0.5);\n            border-radius: 50%;\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n        }\n\n        #h5branding-ad {\n            position: relative;\n            z-index: 667;\n            border-radius: 5px;\n            border: 3px solid white;\n            background: rgba(256, 256, 256, 0.2);\n            width: 336px;\n            height: 280px;\n            display: none;\n            margin: 0px 10px 0px 10px;\n        }\n\n        #h5branding-wrapper > img {\n            /* Needs appropriate vendor prefixes */\n            box-sizing: border-box;\n\n            /* This needs to be equal to strokeWidth */\n            padding: 4%;\n        }\n\n        #h5branding-wrapper > img {\n            border-radius: 50%;\n            box-shadow: inset 0 5px 5px rgba(0, 0, 0, 0.5), 5px 5px 7px rgba(0, 0, 0, 0.3);\n        }\n\n        #h5branding-container {\n            box-sizing: border-box;\n            position: absolute;\n            z-index: 664;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background-color: #000;\n            overflow: hidden;\n        }\n\n        #h5branding-background {\n            position: absolute;\n            top: -25%;\n            left: -25%;\n            width: 150%;\n            height: 150%;\n            background-blend-mode: multiply;\n            background-size: cover;\n            filter: blur(40px) brightness(1.5);\n        }\n\n        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n             /* IE10+ CSS styles go here */\n             #h5branding-background {\n                background-image: none !important;\n             }\n        }\n\n        #h5branding-logo {\n            position: absolute;\n            margin: 0 auto;\n            left: 0;\n            right: 0;\n            text-align: center;\n            top: 10%;\n        }\n\n        #h5branding-logo > img {\n            height: 150px;\n        }\n\n        #h5branding-title {\n            position: absolute;\n            width: 100%;\n            background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.5) 50%, transparent);\n            color: #fff;\n            text-shadow: 0 0 1px rgba(0, 0, 0, 0.7);\n            bottom:10%;\n            padding: 15px 0;\n            text-align: center;\n            font-size: 18px;\n            font-family: Helvetica, Arial, sans-serif;\n            font-weight: bold;\n            line-height: 100%;\n        }\n\n        #h5branding-button {\n            /* border: 0; */\n            padding: 10px 22px;\n            border-radius: 5px;\n            border: 3px solid white;\n            background: linear-gradient(0deg, #dddddd, #ffffff);\n            color: #222;\n            text-transform: uppercase;\n            text-shadow: 0 0 1px #fff;\n            font-family: Helvetica, Arial, sans-serif;\n            font-weight: bold;\n            font-size: 18px;\n            cursor: pointer;\n            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n            display: none;\n            width: 150px;\n            position: absolute;\n            top: 170px;\n            margin: 0 auto;\n            left: 0;\n            right: 0;\n        }\n\n        @media (orientation: portrait) and (max-width: 1080px) {\n            #h5branding-logo > img {\n                height: initial;\n                width:100%;\n            }\n        }\n\n        @media (orientation: landscape) and (max-height: 640px) {\n            #h5branding-title {\n                display: none;\n            }\n\n            #h5branding-logo > img {\n                height: 100px;\n            }\n        }\n\n        @media (orientation: landscape) and (max-height: 460px) {\n            #h5branding-title {\n                display: none;\n            }\n\n            #h5branding-wrapper {\n                width: 110px;\n                height: 110px;\n                margin: 0;\n            }\n\n            #h5branding-logo {\n                top: 0;\n                transform: scale(0.7, 0.7);\n            }\n\n            #h5branding-button {\n                top: initial;\n                width: 110px;\n                font-size: 14px;\n                position: absolute;\n                top: 140px;\n                left: 0;\n                right: 0;\n            }\n\n            #h5branding-ad {\n               display: none !important;\n            }\n        }\n\n        @media (orientation: portrait) and (max-width: 250px) {\n            #h5branding-logo {\n                top: 2%;\n            }\n        }\n\n        @media (orientation: landscape) and (max-width: 330px) {\n             #h5branding-button {\n                top: 120px;\n            }\n\n            #h5branding-logo > img {\n                height: 70px;\n            }\n        }\n\n        @media (max-width: 600px) and (max-height: 850px) {\n            #h5branding-ad {\n               display: none !important;\n            }\n        }\n\n        @media (max-width: 600px) and (max-height: 1100px) {\n            #h5branding-center {\n                top: 40%;\n            }\n\n            #h5branding-title {\n               bottom: 5%\n            }\n        }\n\n        @media (max-width: 600px) and (max-height: 900px) {\n            #h5branding-title {\n               display: none\n            }\n        }\n\n        @media (orientation: landscape) and (min-width: 800px) {\n            #h5branding-wrapper {\n                margin-left: 120px;\n                margin-right: 120px;\n            }\n        }\n\n        ";
	}

	function getHtml(gameLogo, gameTitle) {
	    return "\n        <div id=\"h5branding-background\"></div>\n        <div id=\"h5branding-version\"></div>\n        <div id=\"h5branding-logo\"></div>\n        <div id=\"h5branding-center\">\n            <div id=\"h5branding-ad\"></div>\n            <div id=\"h5branding-wrapper\">\n                <img src=\"" + gameLogo + "\" />\n                <div id=\"h5branding-bar\"></div>\n                <button id=\"h5branding-button\" onclick=\"h5branding.SplashLoader.getInstance().onPlayButtonClick();\">Play</button>\n            </div>\n        </div>\n        <div id=\"h5branding-title\">" + gameTitle + "</div>\n    ";
	}

	var SplashLoader = /** @class */ (function () {
	    function SplashLoader(options) {
	        this.circleLoader = null;
	        this.loaded = false;
	        this.showPlayButton = typeof playBtn !== 'undefined' ? playBtn : true;
	        this.progress = 0;
	        this.options = {
	            gameId: '12346',
	            gameTitle: 'Place Holder',
	            gameName: 'place-holder',
	            libs: [],
	            version: 'dev',
	            barColor: 'white',
	            gaMeasurementId: 'none'
	        };
	        this.options.gameId = options.gameId;
	        this.options.gameTitle = options.gameTitle;
	        this.options.version = options.version;
	        this.options.barColor = options.barColor ? options.barColor : this.options.barColor;
	        this.options.libs = options.libs;
	        this.options.gaMeasurementId = options.gaMeasurementId;
	    }
	    SplashLoader.getInstance = function (options) {
	        if (!SplashLoader.instance) {
	            if (!options) {
	                throw new Error('Can not create new SplashLoader instance without options!');
	            }
	            SplashLoader.instance = new SplashLoader(options);
	        }
	        return SplashLoader.instance;
	    };
	    SplashLoader.prototype.create = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var css, html, head, style, container, body, versionDiv;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0:
	                        css = getCss();
	                        html = getHtml(this.getGameLogoUrl(), this.options.gameTitle);
	                        head = document.head || document.getElementsByTagName('head')[0];
	                        style = document.createElement('style');
	                        style.type = 'text/css';
	                        if (style.styleSheet) {
	                            style.styleSheet.cssText = css;
	                        }
	                        else {
	                            style.appendChild(document.createTextNode(css));
	                        }
	                        head.appendChild(style);
	                        container = document.createElement('div');
	                        container.innerHTML = html;
	                        container.id = "h5branding-container";
	                        body = document.body || document.getElementsByTagName('body')[0];
	                        body.insertBefore(container, body.firstChild);
	                        this.circleLoader = new progressbar.Circle('#h5branding-bar', {
	                            strokeWidth: 3,
	                            color: this.options.barColor
	                        });
	                        versionDiv = document.getElementById('h5branding-version');
	                        if (versionDiv) {
	                            versionDiv.innerHTML = this.options.version;
	                        }
	                        return [4 /*yield*/, this.loadLibs()];
	                    case 1:
	                        _a.sent();
	                        return [4 /*yield*/, Utils.loadHost()];
	                    case 2:
	                        _a.sent();
	                        return [4 /*yield*/, this.loadBranding()];
	                    case 3:
	                        _a.sent();
	                        this.loaded = true;
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    SplashLoader.prototype.loadBranding = function () {
	        return __awaiter(this, void 0, void 0, function () {
	            var background, logoContainer, logo;
	            return __generator(this, function (_a) {
	                switch (_a.label) {
	                    case 0: return [4 /*yield*/, Branding.preload(Date.now().toString())
	                        // Apply background
	                    ];
	                    case 1:
	                        _a.sent();
	                        background = document.getElementById('h5branding-background');
	                        if (background) {
	                            background.style.backgroundImage = "url(" + this.getGameLogoUrl() + ")";
	                            background.style.backgroundColor = Branding.brandingBackgroundColor;
	                        }
	                        logoContainer = document.getElementById('h5branding-logo');
	                        if (logoContainer && Utils.getBrandingDomain() !== exports.BrandingDomain.Neutral) {
	                            logo = document.createElement('img');
	                            logo.src = Branding.brandingLogoUrl.replace('_small', '');
	                            logoContainer.appendChild(logo);
	                        }
	                        return [2 /*return*/];
	                }
	            });
	        });
	    };
	    SplashLoader.prototype.loadLibs = function () {
	        var _this = this;
	        var scripts = this.options.libs.map(function (url, index) {
	            return Loader.instance.loadScript(url, true, function () {
	                _this.setScriptloadProgress(scripts.length, index + 1);
	            });
	        });
	        return Promise.all(scripts);
	    };
	    Object.defineProperty(SplashLoader.prototype, "bannerAllowed", {
	        get: function () {
	            var width = document.body.clientWidth;
	            var height = document.body.clientHeight;
	            return (this.progress < 100 &&
	                !(width > height && height <= 460) &&
	                !(width < 600 && height < 850));
	        },
	        enumerable: false,
	        configurable: true
	    });
	    SplashLoader.prototype.showBanner = function () {
	        if (!this.bannerAllowed) {
	            return null;
	        }
	        var banner = document.getElementById('h5branding-ad');
	        if (!banner) {
	            return null;
	        }
	        banner.style.display = 'inline-flex';
	        // TODO: show/hide ad container
	        return banner;
	    };
	    SplashLoader.prototype.setScriptloadProgress = function (maxScripts, increment) {
	        var progress = (0.3 * increment) / maxScripts;
	        this.circleLoader.animate(progress, null, function () {
	            /**/
	        });
	    };
	    SplashLoader.prototype.setLoadProgress = function (progress) {
	        var _this = this;
	        if (!this.loaded) {
	            return;
	        }
	        progress = 30 + progress * 0.7;
	        this.progress = progress;
	        if (progress === 100) {
	            var button_1 = document.querySelector('#h5branding-button');
	            this.circleLoader.animate(1, null, function () {
	                if (!Utils.inGDGameZone() && button_1 && true === _this.showPlayButton) {
	                    button_1.style.display = 'block';
	                }
	                else if (Utils.inGDGameZone() || false === _this.showPlayButton) {
	                    _this.onPlayButtonClick();
	                }
	            });
	        }
	        else {
	            this.circleLoader.animate(progress / 100, null, function () {
	                /**/
	            });
	        }
	    };
	    SplashLoader.prototype.setButtonCallback = function (cb) {
	        this.buttonCallback = cb;
	    };
	    SplashLoader.prototype.onPlayButtonClick = function () {
	        if (!this.buttonCallback) {
	            return;
	        }
	        this.buttonCallback();
	    };
	    SplashLoader.prototype.destroy = function () {
	        var element = document.querySelector('#h5branding-container');
	        if (element !== null && element.parentNode !== null) {
	            element.parentNode.removeChild(element);
	        }
	    };
	    SplashLoader.prototype.getGameLogoUrl = function () {
	        return 'assets/icon.jpeg';
	    };
	    return SplashLoader;
	}());

	exports.Branding = Branding;
	exports.Domain = Domain;
	exports.SplashLoader = SplashLoader;
	exports.Utils = Utils;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=h5-azerion-branding.umd.js.map
