'use strict'

should = require 'should'

path = require '../util/path'
lsRoutes = require path.toApp('middleware')

class Express3RouterFixture

  constructor: ->
    @app =
      _router:
        map: {}

  withRoute: (method, path) ->
    if not @app._router.map[method]?
      @app._router.map[method] = []

    @app._router.map[method].push {path}
    this

  build: -> @app

class Express4RouterFixture

  constructor: ->
    @app =
      _router:
        stack: []

  withRoute: (method, path, name) ->
    methods = {} # only supports one method
    methods[method] = true
    route = {methods,path}
    @app._router.stack.push {name, route}
    this

  build: -> @app


describe 'express-ls-routes', ->

  req = null

  beforeEach ->
    req = {}

  describe 'express3', ->

    router = null

    beforeEach ->
      router = new Express3RouterFixture()

    it 'handles one method one route', ->
      app = router
        .withRoute('get', '/aPath')
        .build()
      expected = [
        'GET    /aPath'
      ]
      lsRoutes(app) req, null, ->
        req.routes.should.eql expected

    it 'handles one method multiple routes', ->
      app = router
        .withRoute('get', '/aPath')
        .withRoute('get', '/anotherPath')
        .build()
      expected = [
        'GET    /aPath'
        'GET    /anotherPath'
      ]
      lsRoutes(app) req, null, ->
        req.routes.should.eql expected

    it 'handles multiple methods multiple routes', ->
      app = router
        .withRoute('get', '/aPath')
        .withRoute('get', '/anotherPath')
        .withRoute('post', '/snafu')
        .withRoute('delete', '/anotherPath/:id')
        .build()
      expected = [
        'GET    /aPath'
        'GET    /anotherPath'
        'POST   /snafu'
        'DELETE /anotherPath/:id'
      ]
      lsRoutes(app) req, null, ->
        req.routes.should.eql expected


  describe 'express4', ->

    router = null

    beforeEach ->
      router = new Express4RouterFixture()

    it 'handles one method one route', ->
      app = router
        .withRoute('get', '/aPath')
        .build()
      expected = [
        'GET    /aPath'
      ]
      lsRoutes(app) req, null, ->
        req.routes.should.eql expected

    it 'handles one method multiple routes', ->
      app = router
        .withRoute('get', '/aPath')
        .withRoute('get', '/anotherPath')
        .build()
      expected = [
        'GET    /aPath'
        'GET    /anotherPath'
      ]
      lsRoutes(app) req, null, ->
        req.routes.should.eql expected

    it 'handles multiple methods multiple routes', ->
      app = router
        .withRoute('get', '/aPath')
        .withRoute('get', '/anotherPath')
        .withRoute('post', '/snafu')
        .withRoute('delete', '/anotherPath/:id')
        .build()
      expected = [
        'GET    /aPath'
        'GET    /anotherPath'
        'POST   /snafu'
        'DELETE /anotherPath/:id'
      ]
      lsRoutes(app) req, null, ->
        req.routes.should.eql expected

    it 'ignores built in query route', ->
      app = router
        .withRoute('get', undefined, 'query')
        .withRoute('get', '/aPath')
        .build()
      expected = [
        'GET    /aPath'
      ]
      lsRoutes(app) req, null, ->
        req.routes.should.eql expected

    it 'ignores built in expressInit route', ->
      app = router
        .withRoute('get', undefined, 'expressInit')
        .withRoute('get', '/aPath')
        .build()
      expected = [
        'GET    /aPath'
      ]
      lsRoutes(app) req, null, ->
        req.routes.should.eql expected

