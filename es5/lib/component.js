"use strict";
Object.defineProperties(exports, {
  Component: {get: function() {
      return Component;
    }},
  MiddlewareComponent: {get: function() {
      return MiddlewareComponent;
    }},
  HandlerComponent: {get: function() {
      return HandlerComponent;
    }},
  __esModule: {value: true}
});
var loadHandleable = $traceurRuntime.assertObject(require('./util/loader.js')).loadHandleable;
var Component = function Component() {
  var options = arguments[0] !== (void 0) ? arguments[0] : {};
  var name = $traceurRuntime.assertObject(options).name;
  this._name = name;
};
($traceurRuntime.createClass)(Component, {
  get name() {
    return this._name;
  },
  get type() {
    return 'component';
  },
  toJson: function() {
    var json = {type: this.type};
    if (this.name)
      json.name = this.name;
    return json;
  },
  toString: function() {
    return JSON.stringify(this.toJson(), undefined, 2);
  },
  inspect: function() {
    return this.toString();
  }
}, {});
var MiddlewareComponent = function MiddlewareComponent() {
  $traceurRuntime.defaultSuperCall(this, $MiddlewareComponent.prototype, arguments);
};
var $MiddlewareComponent = MiddlewareComponent;
($traceurRuntime.createClass)(MiddlewareComponent, {
  get handleableMiddleware() {
    throw new Error('unimplemented in abstract class');
  },
  addMiddleware: function(MiddlewareComponent) {
    throw new Error('unimplemented in abstract class');
  },
  get type() {
    return 'middleware';
  }
}, {}, Component);
var HandlerComponent = function HandlerComponent() {
  $traceurRuntime.defaultSuperCall(this, $HandlerComponent.prototype, arguments);
};
var $HandlerComponent = HandlerComponent;
($traceurRuntime.createClass)(HandlerComponent, {
  get handleableBuilder() {
    throw new Error('unimplemented in abstract class');
  },
  addMiddleware: function(MiddlewareComponent) {
    throw new Error('unimplemented in abstract class');
  },
  loadHandleable: function(config, options) {
    return loadHandleable(config, this, options);
  },
  loadHandler: function(config, options) {
    return loadHandleable(config, this, options);
  },
  get type() {
    return 'handler';
  }
}, {}, Component);
