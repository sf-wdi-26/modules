require "bundler/setup"
require "sinatra/activerecord"
require "sinatra"

# Load models
require_relative 'models/artist'


# Load controllers
require_relative 'controllers/artists_controller'


# Load ActiveRecord and connect to the DB
ActiveRecord::Base.establish_connection({
  database: 'tunr',
  adapter: 'postgresql'
})

# Close connection
after do
  ActiveRecord::Base.connection.close
end

# General route actions
get '/' do
  erb :home
end

get '/about' do
  erb :about
end
