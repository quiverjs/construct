"use strict";
var $__traceur_64_0_46_0_46_8__,
    $___46__46__47_lib_47_export_46_js__,
    $__chai__,
    $__chai_45_as_45_promised__;
($__traceur_64_0_46_0_46_8__ = require("traceur"), $__traceur_64_0_46_0_46_8__ && $__traceur_64_0_46_0_46_8__.__esModule && $__traceur_64_0_46_0_46_8__ || {default: $__traceur_64_0_46_0_46_8__});
var $__0 = ($___46__46__47_lib_47_export_46_js__ = require("../lib/export.js"), $___46__46__47_lib_47_export_46_js__ && $___46__46__47_lib_47_export_46_js__.__esModule && $___46__46__47_lib_47_export_46_js__ || {default: $___46__46__47_lib_47_export_46_js__}),
    pipeline = $__0.pipeline,
    simpleHandler = $__0.simpleHandler,
    simpleHandlerLoader = $__0.simpleHandlerLoader;
var chai = ($__chai__ = require("chai"), $__chai__ && $__chai__.__esModule && $__chai__ || {default: $__chai__}).default;
var chaiAsPromised = ($__chai_45_as_45_promised__ = require("chai-as-promised"), $__chai_45_as_45_promised__ && $__chai_45_as_45_promised__.__esModule && $__chai_45_as_45_promised__ || {default: $__chai_45_as_45_promised__}).default;
chai.use(chaiAsPromised);
let should = chai.should();
describe('pipeline handler test', (function() {
  it('simple pipeline', (function() {
    let handler1 = simpleHandler((function(args) {
      return 'hello, ' + args.name;
    }), 'void', 'text');
    let handler2 = simpleHandler((function(args, input) {
      return input.toUpperCase();
    }), 'text', 'text');
    let handler3 = simpleHandler((function(args, input) {
      return ({
        status: 'ok',
        result: input
      });
    }), 'text', 'json');
    let main = pipeline().addPipe(handler1).addPipe(handler2).addPipe(handler3).setLoader(simpleHandlerLoader('void', 'json'));
    return main.loadHandler({}).then((function(handler) {
      return handler({name: 'bob'}).then((function(result) {
        result.status.should.equal('ok');
        result.result.should.equal('HELLO, BOB');
      }));
    }));
  }));
}));