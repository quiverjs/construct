"use strict";
Object.defineProperties(exports, {
  TransformFilter: {get: function() {
      return TransformFilter;
    }},
  __esModule: {value: true}
});
var resolve = $traceurRuntime.assertObject(require('quiver-promise')).resolve;
var copy = $traceurRuntime.assertObject(require('quiver-object')).copy;
var StreamFilter = $traceurRuntime.assertObject(require('./filter.js')).StreamFilter;
var HandlerComponent = $traceurRuntime.assertObject(require('./component.js')).HandlerComponent;
var loadStreamHandler = $traceurRuntime.assertObject(require('./util/loader.js')).loadStreamHandler;
var validModes = {
  'in': true,
  'out': true,
  'inout': true
};
var echoHandler = (function(args, streamable) {
  return resolve(streamable);
});
var wrapHandler = (function(handler) {
  return (function(args) {
    for (var restArgs = [],
        $__1 = 1; $__1 < arguments.length; $__1++)
      restArgs[$__1 - 1] = arguments[$__1];
    return handler.apply(null, $traceurRuntime.spread([copy(args)], restArgs));
  });
});
var inTransformHandler = (function(handler, mode) {
  return mode != 'out' ? wrapHandler(handler) : echoHandler;
});
var wrapMainHandler = (function(handler, mode) {
  return mode == 'in' ? handler : wrapHandler(handler);
});
var outTransformHandler = (function(handler, mode) {
  return mode != 'in' ? handler : echoHandler;
});
var TransformFilter = function TransformFilter(handlerComponent) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  if (!(handlerComponent instanceof HandlerComponent)) {
    throw new TypeError('input handler component must be of type HandlerComponent');
  }
  this._transformComponent = handlerComponent;
  var transformMode = $traceurRuntime.assertObject(options).transformMode;
  if (!validModes[transformMode]) {
    throw new TypeError('invalid transform mode provided in options');
  }
  var loadOptions = $traceurRuntime.assertObject(options).loadOptions;
  var streamFilter = (function(config, handler) {
    return loadStreamHandler(config, handlerComponent, handlerComponent.handleableBuilder).then((function(transformHandler) {
      var transformIn = inTransformHandler(transformHandler, transformMode);
      var mainHandler = wrapMainHandler(handler, transformMode);
      var transformOut = outTransformHandler(transformHandler, transformMode);
      return (function(args, streamable) {
        return transformIn(args, streamable).then((function(transformedIn) {
          return mainHandler(args, transformedIn).then((function(resultStreamable) {
            return transformOut(args, resultStreamable);
          }));
        }));
      });
    }));
  });
  options.safeWrapped = true;
  $traceurRuntime.superCall(this, $TransformFilter.prototype, "constructor", [streamFilter, options]);
};
var $TransformFilter = TransformFilter;
($traceurRuntime.createClass)(TransformFilter, {get transformComponent() {
    return this._transformComponent;
  }}, {}, StreamFilter);
