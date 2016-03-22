#!/usr/bin/env node

'use strict'

var fs = require('fs')
var path = require('path')

var format = require('../lib/format')

var DEFAULT_ROUTES_PATH = path.join('app', 'config', 'routes.js')
var ROUTES_FILE_PATH = path.resolve(process.env.npm_package_config_routes || DEFAULT_ROUTES_PATH)


fs.readFile(ROUTES_FILE_PATH, 'UTF-8', function (err, data) {
  if (err) {
    return console.log('Routes file not found at ' + err.path +
      '\nUse the default location at app/config/routes.js or ' +
      '\nRun via npm scripts and specify your own location via config.routes in package.json')
  }

  var regex = /(app|server)\.(put|get|post|del|delete|head|options)\(['"](.+)['"],/i
  var routes = data.split('\n').map(function (line) {
    var match = regex.exec(line)
    if (match) {
      return format.method(match[2]) + match[3]
    }
  }).filter(function (line) {
    return line != null
  }).join('\n')

  console.log(routes)
})