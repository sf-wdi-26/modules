const path = require('path')

// TODO: make the lib path a param
const appDir = process.env.TEST_COVERAGE ? 'lib-cov' : 'lib'

exports.toApp = function (pathFromAppRoot) {
  return path.resolve(appDir, pathFromAppRoot)
}