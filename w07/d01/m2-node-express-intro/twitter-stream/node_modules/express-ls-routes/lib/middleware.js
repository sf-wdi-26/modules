var flatten = require('lodash-node/modern/arrays/flatten')

var format = require('./format')

const isExpress3 = function (app) {
  return app._router.map != null
}

const mapExpress3Routes = function (app) {
  var routesMap = app._router.map
  var methods = Object.keys(routesMap)
  return flatten(methods.map(function (method) {
    return routesMap[method].map(function (route) {
      return format.method(method) + route.path
    })
  }))
}

const mapExpress4Routes = function (app) {
  var ignoredRoutes = ['query', 'expressInit']
  return flatten(app._router.stack
    .filter(function (entry) {
      return ignoredRoutes.indexOf(entry.name) === -1
    })
    .map(function (entry) {
      var route = entry.route
      return Object.keys(route.methods)
        .filter(function (method) {
          return !!route.methods[method]
        })
        .map(function (method) {
          return format.method(method) + route.path
        })
    })
  )
}

module.exports = function (app, options) {
  return function (req, res, next) {

    req.routes = isExpress3(app) ? mapExpress3Routes(app) : mapExpress4Routes(app)
    next()
  }
}