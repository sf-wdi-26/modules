require 'rubygems'
require 'bundler'
Bundler.require

# Models
require './models/song'

# Controllers
require './app'

use Rack::MethodOverride
run SongsApp
