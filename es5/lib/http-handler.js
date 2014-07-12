"use strict";
Object.defineProperties(exports, {
  HttpHandlerBuilder: {get: function() {
      return HttpHandlerBuilder;
    }},
  HttpHandler: {get: function() {
      return HttpHandler;
    }},
  httpHandlerBuilder: {get: function() {
      return httpHandlerBuilder;
    }},
  httpHandler: {get: function() {
      return httpHandler;
    }},
  __esModule: {value: true}
});
var resolve = $traceurRuntime.assertObject(require('quiver-promise')).resolve;
var loadHttpHandler = $traceurRuntime.assertObject(require('./util/loader.js')).loadHttpHandler;
var $__1 = $traceurRuntime.assertObject(require('./util/wrap.js')),
    safeBuilder = $__1.safeBuilder,
    safeHandler = $__1.safeHandler;
var HandleableBuilder = $traceurRuntime.assertObject(require('./handleable-builder.js')).HandleableBuilder;
var HttpHandlerBuilder = function HttpHandlerBuilder(httpHandlerBuilder) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  this._httpHandlerBuilder = safeBuilder(httpHandlerBuilder, options);
  $traceurRuntime.superCall(this, $HttpHandlerBuilder.prototype, "constructor", [null, options]);
};
var $HttpHandlerBuilder = HttpHandlerBuilder;
($traceurRuntime.createClass)(HttpHandlerBuilder, {
  get mainHandleableBuilder() {
    var builder = this.httpHandlerBuilder;
    return (function(config) {
      return builder(config).then((function(httpHandler) {
        return ({httpHandler: httpHandler});
      }));
    });
  },
  get httpHandlerBuilder() {
    if (!this._httpHandlerBuilder)
      throw new Error('httpHandlerBuilder is not defined');
    return this._httpHandlerBuilder;
  },
  get handlerLoader() {
    return loadHttpHandler;
  },
  get type() {
    return 'Http Handler Builder';
  }
}, {}, HandleableBuilder);
var HttpHandler = function HttpHandler(httpHandler) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  this._httpHandler = safeHandler(httpHandler, options);
  $traceurRuntime.superCall(this, $HttpHandler.prototype, "constructor", [null, options]);
};
var $HttpHandler = HttpHandler;
($traceurRuntime.createClass)(HttpHandler, {
  get httpHandlerBuilder() {
    var handler = this.httpHandler;
    return (function(config) {
      return resolve(handler);
    });
  },
  get httpHandler() {
    if (!this._httpHandler)
      throw new Error('httpHandler is not defined');
    return this._httpHandler;
  },
  get type() {
    return 'Http Handler';
  }
}, {}, HttpHandlerBuilder);
var httpHandlerBuilder = (function(builder, options) {
  return new HttpHandlerBuilder(builder, options);
});
var httpHandler = (function(handler, options) {
  return new HttpHandler(handler, options);
});
