## Sinatra from Scratch

__1. Make a root project directory with a name that describes your app. Change directory inside and run Bundle init.__

``` bash
mkdir songs-app
cd songs-app
bundle init

```

__2. Create a Gemfile in the root directory. We've used these:__

``` ruby
source "https://rubygems.org"
gem "sinatra"
gem "sinatra-activerecord"
gem "rake"
gem "activerecord"
gem "pg"
gem "tux", "~>0.3.0"

```

__3. Create a config.ru file in the root directory with:__

``` ruby
require 'rubygems'
require 'bundler'
Bundler.require

require './models/song'
require './app'

run SongsApp

```
In the last line above you will replace "SongsApp" with the name of your app. The name is defined in `app.rb`

__4. Set up controller with your `app.rb`__

``` ruby
class SongsApp < Sinatra::Base
end

```

It is best practice to name your class in the singular. The class is a blueprint. You only need one to instantiate multiple objects. In this case, there is only one app.

__5. Update your controller `app.rb` with a basic route so you can test the connection__

``` ruby
class SongsApp < Sinatra::Base
    get '/' do
        "Hello, World!"
    end
end

```

__6. Test your app!__

``` bash
bundle
gem install shotgun
shotgun

```
We don't need to put `shotgun` in the Gemfile because it's a development tool. (It's not part of the app.)
Navigate to http://localhost:9393 to make sure it's working

__7. Next we can either make more routes or begin with our models. We chose to make a model.__

``` bash
mkdir models
touch models/song.rb

```

Note the `models` folder is optional in Sinatra, but we required this path in our `config.ru`

__8. Open the `song.ru` file and create your class__

``` ruby
class Song < ActiveRecord::Base
end	

```

We will return to our Song class when we are ready to make our CRUD methods.

__9. Create your database via config/database.yml__

```bash
mkdir config
touch config/database.yml

```
...in `database.yml`...

```yml
development:
	adapter: postgresql
	database: songs_app_development

```

__10. Make db/migrage/ folder structure and Rakefile__

```bash
mkdir db
mkdir db/migrate
touch Rakefile

```

__11. Edit the Rakefile__

```ruby
require "sinatra/activerecord"
require "sinatra/activerecord/rake"

namespace :db do
  task :load_config
end

```

__12. Create the database__

```bash
rake db:create

```

__13. Create your first migration__

```bash
rake db:create_migration NAME=create_songs

```

This creates a file in `db/migrate/` beginning with a timestamp

__14. Edite your new migration file for what you want to do in your migration__

```ruby
class CreateSongs < ActiveRecord::Migration
	def change
		create_table :songs do |t|
			t.string :title 
			t.string :artist 
			t.string :genre 
			t.timestamps
		end
	end
end

```

In class we used `create_table :songs do |table|` but it is the standard practice to use the letter `t`. The .string method takes one argument for the name of the column. The .column method takes two arguments, `:name` and `:data_type`

__15. Run your migration and test again!__

```bash
rake db:migrate

```

This will update the `schema.rb` file as well as the database itself.

__16. OPTIONAL. Make another migration__

```bash
rake db:creat_migration NAME=add_release_date_to_songs
```

This creates a new migration file.

```ruby
class AddReleaseDateToSongs < ActiveRecord::Migration
	def change
		add_column :songs, :release_date, :string
	end
end

```

```bash
rake db:migrate

```

__18. Add a song!__

Fire up `tux` and enter

```ruby
Song.create({title: "Ice Ice Baby", 
	artist: "Vanilla Ice", genre: "Too cold to hold",
	release_date: "1990"})
	
Song.create({title: "Fenix_Funk", artist: "AFX", genre: "Acid Techno", release_date: "2004"})

```

__19. Let's make some routes in `app.rb`!__

``` ruby
class SongsApp < Sinatra::Base
    get '/' do
        "Hello, World!"
    end
    
    get '/songs' do
    	@songs = Song.all
    	erb :"index"
    end
end

```

Adding the instance variable `@songs` will let us connect our model to our view.

__20. Make a view folder, layout.erb file and add some HTML and ruby__

```bash
mkdir views
touch views/layout.erb
touch views/index.erb

```
`layout.erb` will contain our main page template

`index.erb` will display dynamic content from our database.

```ruby
<!DOCTYPE html>
<html>
	<head>
		<title>Songs App</title>
	</head>
	<body>
		<h1>Songify</h1>
		<%= yield %>
	</body>
</html>

```

__21. Add some stuff to the index.erb__

```ruby
<ul>
<% @songs.each do | song | %>
	<li>
		<p><strong>"<%= song.title %>", 
		by <%= song.artist %></strong>, 
		<%= song.genre %>, 
		<%= song.release_date %></p>
	</li>
<% end %>
</ul>

```

__22. Make a route to view individual songs.__

Add this to `app.rb`...

```ruby

get '/songs/:id' do
	@songs = Song.all
	@songs = Song.find(params[:id])
	@song.titls
end

```

__23. Now we need a form to create a new song.__


Here is some code for a basic form. Add to `new.erb`:

```ruby
<h1>Create New Song</h1>
<form method="POST" action="/songs">
	Title: <br>
	<input type="text" name="song[title]" value="Title"><br>
	Artist: <br>
	<input type="text" name="song[artist]" value="Artist"><br>
	<input type="submit" value="Submit">
</form>

```

__24. Now we need a route to post data from the form.__

Make the new route in `app.rb`. (Additional changes have been made to keep track of in-class work)

``` 

class SongsApp < Sinatra::Base
    get '/' do
	    @songs = Song.all
	    p "Songs from controller:" # p will print to the console
	    p @songs
	    p "****"
	    erb :index   
    end
    
    get '/songs' do
    	@songs = Song.all
    	erb :"index"
	end


	get '/songs/new' do 
		erb :new
	end
	
	post '/songs' do
		# uncomment the next line to print the params in the console:
		# p params  
		@song = Song.create(params[:song])
		@song.save
		redirect "/"
	end
	
	get '/songs/:id' do
		@songs = Song.all
		@song = Song.find(params[:id])
		@song.title   # this should display the title, for testing
	end
end


```

__25. Delete Route__

```
touch views/show.erb

```
...in `show.erb`...

```
<%= @song.title %>
<%= @song.artist %>
<%= @songs.release_date %>


<form action="/songs/<%= @song.id %>" method="post" class='delete'>
  <input type="hidden" name="_method" value="delete">
  <input type='submit' value="Delete">
</form>

```

...in `app.rb`...


```ruby
delete '/songs/:id' do
	@song = Song.find(params[:id])
	@song.destroy
	redirect("/songs")
end

```
