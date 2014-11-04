import { copy } from 'quiver-object'
import { async } from 'quiver-promise'
import { normalizeConfig } from '../util/config'

import { 
  ExtensibleHandler 
} from '../extensible-component'

import { 
  Component, HandlerComponent 
} from '../component'

import { RouteList } from './route-list-component'

import {
  routeBuildSpecsToRouterBuilder
} from './route-specs'

export class Router extends ExtensibleHandler {
  constructor(options={}) {
    this._routeLists = []
    this._defaultRouteList = new RouteList()

    super(options)
  }

  addRoute(route) {
    if(!(route instanceof Route)) throw new TypeError(
      'route must be instance of Route')

    this._defaultRouteList.addRoute(route)
    return this
  }

  staticRoute(path, handler) {
    this._defaultRouteList.staticRoute(path, handler)

    return this
  }

  paramRoute(path, handler) {
    this._defaultRouteList.paramRoute(path, handler)

    return this
  }

  regexRoute(regex, fields, handler) {
    this._defaultRouteList.regexRoute(regex, fields, handler)

    return this
  }

  dynamicRoute(matcher, handler) {
    this._defaultRouteList.dynamicRoute(matcher, handler)

    return this
  }

  routeList(routeList) {
    if(!(routeList instanceof RouteList)) 
      throw new TypeError('route list must be ' +
        'instance of RouteList')

    this._routeLists.push(routeList)
    return this
  }

  get routeLists() {
    return [this._defaultRouteList, ...this._routeLists]
  }

  get defaultHandler() {
    return this._defaultHandler
  }

  defaultRoute(handlerComponent) {
    if(this._defaultHandler) throw new Error(
      'router component already has default route')

    this._defaultHandler = handlerComponent
    return this
  }

  get mainHandleableBuilder() {
    var routeLists = this.routeLists

    var routeBuildSpecs = [].concat.apply([],
      routeLists.map(routeList =>
        routeList.routeBuildSpecs))

    var defaultHandler = this.defaultHandler

    if(defaultHandler) {
      routeBuildSpecs.push({
        routeType: 'default',
        builder: defaultHandler.handleableBuilder
      })
    }

    return routeBuildSpecsToRouterBuilder(
      routeBuildSpecs)
  }

  privatize(privateInstance, privateTable) {
    privateInstance._routeLists = this._routeLists.map(
      routeList => routeList.makePrivate(privateTable))

    privateInstance._defaultRouteList = 
      this._defaultRouteList.makePrivate(privateTable)

    privateInstance._defaultHandler = 
      this._defaultHandler.makePrivate(privateTable)

    super.privatize(privateInstance, privateTable)
  }

  get type() {
    return 'router'
  }

  toJson() {
    var json = super.toJson()

    json.routeLists = this.routeLists.map(routeList => routeList.toJson())

    var defaultHandler = this.defaultHandler
    if(defaultHandler)
      json.defaultHandler = defaultHandler.toJson()

    json.middlewares = this.middlewareJson()
    
    return json
  }
}

export var router = options =>
  new Router(options)

export var makeRouter = options =>
  new Router(options)