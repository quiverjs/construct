"use strict";
Object.defineProperties(exports, {
  Route: {get: function() {
      return Route;
    }},
  StaticRoute: {get: function() {
      return StaticRoute;
    }},
  DynamicRoute: {get: function() {
      return DynamicRoute;
    }},
  RegexRoute: {get: function() {
      return RegexRoute;
    }},
  ParamRoute: {get: function() {
      return ParamRoute;
    }},
  __esModule: {value: true}
});
var urlManagedBuilder = $traceurRuntime.assertObject(require('./util/url.js')).urlManagedBuilder;
var $__1 = $traceurRuntime.assertObject(require('./component.js')),
    Component = $__1.Component,
    HandlerComponent = $__1.HandlerComponent;
var $__1 = $traceurRuntime.assertObject(require('./util/route.js')),
    regexMatcher = $__1.regexMatcher,
    paramMatcher = $__1.paramMatcher,
    paramUrlBuilder = $__1.paramUrlBuilder;
var Route = function Route(handlerComponent) {
  var options = arguments[1] !== (void 0) ? arguments[1] : {};
  if (!(handlerComponent instanceof HandlerComponent))
    throw new TypeError('input handler component must be of type HandlerComponent');
  this._handlerComponent = handlerComponent;
  var urlBuilder = $traceurRuntime.assertObject(options).urlBuilder;
  this._urlBuilder = urlBuilder;
};
($traceurRuntime.createClass)(Route, {
  get handleableBuilder() {
    var handlerComponent = this.handlerComponent;
    var urlBuilder = this.urlBuilder;
    return urlManagedBuilder(handlerComponent, urlBuilder);
  },
  get handlerComponent() {
    return this._handlerComponent;
  },
  get urlBuilder() {
    return this._urlBuilder;
  }
}, {}, Component);
var StaticRoute = function StaticRoute(handlerComponent, staticPath) {
  var options = arguments[2] !== (void 0) ? arguments[2] : {};
  if (!(handlerComponent instanceof HandlerComponent))
    throw new TypeError('handler must be of type HandlerComponent');
  if (typeof(staticPath) != 'string')
    throw new TypeError('staticPath must be provided as string');
  this._staticPath = staticPath;
  var staticUrlBuilder = (function() {
    return staticPath;
  });
  options.urlBuilder = options.urlBuilder || staticUrlBuilder;
  $traceurRuntime.superCall(this, $StaticRoute.prototype, "constructor", [handlerComponent, options]);
};
var $StaticRoute = StaticRoute;
($traceurRuntime.createClass)(StaticRoute, {
  addRoute: function(routeIndex, handler) {
    routeIndex.addStaticRoute(this.staticPath, handler);
  },
  get staticPath() {
    return this._staticPath;
  }
}, {}, Route);
var DynamicRoute = function DynamicRoute(handlerComponent, matcher) {
  var options = arguments[2] !== (void 0) ? arguments[2] : {};
  if (typeof(matcher) != 'function')
    throw new TypeError('matcher must be of type function');
  this._matcher = matcher;
  $traceurRuntime.superCall(this, $DynamicRoute.prototype, "constructor", [handlerComponent, options]);
};
var $DynamicRoute = DynamicRoute;
($traceurRuntime.createClass)(DynamicRoute, {
  addRoute: function(routeIndex, handler) {
    routeIndex.addDynamicRoute(this.matcher, handler);
  },
  get matcher() {
    return this._matcher;
  }
}, {}, Route);
var RegexRoute = function RegexRoute(handlerComponent, regex) {
  var matchFields = arguments[2] !== (void 0) ? arguments[2] : [];
  var options = arguments[3] !== (void 0) ? arguments[3] : {};
  if (!(regex instanceof RegExp))
    throw new TypeError('regex must be regular expression');
  this._regex = regex;
  var matcher = regexMatcher(regex, matchFields);
  $traceurRuntime.superCall(this, $RegexRoute.prototype, "constructor", [handlerComponent, matcher, options]);
};
var $RegexRoute = RegexRoute;
($traceurRuntime.createClass)(RegexRoute, {get regex() {
    return this._regex;
  }}, {}, DynamicRoute);
var ParamRoute = function ParamRoute(handlerComponent, paramPath) {
  var options = arguments[2] !== (void 0) ? arguments[2] : {};
  if (typeof(paramPath) != 'string')
    throw new TypeError('param path must be of type string');
  this._paramPath = paramPath;
  var matcher = paramMatcher(paramPath);
  options.urlBuilder = options.urlBuilder || paramUrlBuilder(paramPath);
  $traceurRuntime.superCall(this, $ParamRoute.prototype, "constructor", [handlerComponent, matcher, options]);
};
var $ParamRoute = ParamRoute;
($traceurRuntime.createClass)(ParamRoute, {get paramPath() {
    return this._paramPath;
  }}, {}, DynamicRoute);
