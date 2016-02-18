#Rock 'n Rails!

For this exercise we're going to be synthesizing all our Rails knowledge to build a record collection! At the bottom of this file you can find a link to a completed solution.

###User stories

*User should be able to...*

1) See all the records on `records#index`

2) See a single record on `record#show`

3) See a form to create a new record on `record#new`

4) Submit the new record form to `record#create` to create a new record and then be redirected back to record index.

###Models

A `Record` should have the following attributes:

* title — String
* artist — String
* year — Integer
* cover_art — String
* song_count — Integer

###Guidance

**See all the records on `records#index`**

* Generate a new rails application with postgres as your default database:

```bash
rails new RockNRails -T -B -d postgresql
cd RockNRails
bundle
# git init & git commit!
```

* Make sure that the postgres application is open! Otherwise the Rails server will not be able to connect to a database.

* Generate a records controller with `index` `show` `new` and `create` actions:

```bash
rails g controller records index show new create
```

* Delete the generated routes and write RESTful routes that map to our records controller.

`config/routes.rb`.

```ruby
  # route to show all records 
  get "/records" => "records#index"
  # route to show new record form
  get "/records/new" => "records#new"
  # route to create a record in the database
  post "/records" => "records#create"
  # route to show a single message
  get "/records/:id" => "records#show", as: "record"
```

* Generate a record model with the attributes `title` `artist` `year` `cover_art` and `song_count`. The new `app/models/record.rb` file won't have any real content yet, but check out the new migration file the generator makes inside `db/migrate/`.

```bash
rails g model record title:string artist:string year:integer cover_art:string song_count:integer
```

* Create a database for your application to use

```bash
rake db:create
```

* Run the migration that was generated to create a new table in the database. Afterword, check `db/shema.rb` to see the current state of your database. (Never directly edit `schema.rb`; migrations do it for you!)

```bash
rake db:migrate
```

* Play with your new `Record` model in the rails console:

```bash
rails console
> Record.all #=> []
> Record.create({title: "Test Record"})
```

* In `db/seeds.rb`, create some records!

`db/seeds.rb`.

```ruby
# Wipe the database
Record.destroy_all
# Let's create a bunch of records
Record.create([
  {
    title: "On Avery Island",
    artist: "Neutral Milk Hotel",
    year: 1996,
    cover_art: "https://upload.wikimedia.org/wikipedia/en/7/73/On_avery_island_album_cover.jpg",
    song_count: 12
  },
  {
    title: "Everything All the Time",
    artist: "Band of Horses",
    year: 2006,
    cover_art: "https://upload.wikimedia.org/wikipedia/en/5/51/BandofHorsesEverythingalltheTime.jpg",
    song_count: 10
  },
  {
    title: "The Flying Club Cup",
    artist: "Beirut",
    year: 2007,
    cover_art: "https://upload.wikimedia.org/wikipedia/en/4/4c/The_Flying_Club_Cup.jpg",
    song_count: 13
  }
])
``` 

* Run the seed file!

```bash
rake db:seed
```

* Check that everything was done correctly, run `rails console` or just `rails c` and inside run `Record.all`. Make sure that you can see an array of all the records from your seed file. Exit by typing `exit`.

* Now that we have records in the database, let's render them to the view: `views/records/index.html.erb`

`records_controller.rb`.

```ruby
def index
  @records = Record.all
end
```

`views/records/index.html.erb`.

```html
<h1>Rock 'n Rails!</h1>
<% @records.each do |record| %>
  <p>Title: <%= record.title %></p>
  <p>Artist: <%= record.artist %></p>
  <img src="<%= record.cover_art %>">
<% end %>
```

* Start the server with rails s & head to `localhost:3000/records`

**See a single record on `record#show`**

* For each record in the `record#index` view let's use `link_to` to create an anchor tag that will link to `records/:id`.  The `link_to` URL helper takes the name of a path -- you can see your app's paths prefixes in the refix column when you run `rake routes`. The full path name is the prefix plus `_path`.  We added `as:` to the route for a single record path so we could give it the prefix `record`. Now we can link to it as the `record_path` and pass it the data for each record.

`views/records/index.html.erb`.

```html
<h1>Rock 'n Rails!</h1>
<% @records.each do |record| %>
  <p>Title: <%= record.title %></p>
  <p>Artist: <%= record.artist %></p>
  <img src="<%= record.cover_art %>">
  <!-- link to a show page -->
  <br>
  <%= link_to "Show page", record_path(record) %>
<% end %>
``` 

* The `records#show` controller#action now needs to get the id from the parameters and use it to find the matching record in the database and pass it to the view.

records_controller.rb

```ruby
  def show
    @record = Record.find(params[:id])
  end
```

* In your `records#show` view, `views/records/show.html.erb` display the record that is being passed in.

```html
<img src="<%= @record.cover_art %>">
<h1><%= @record.title %></h1>
<h2>by <%= @record.artist %></h2>
<p>Year: <%= @record.year %></p>
<p>Song Count: <%= @record.song_count %></p>
```

**See a form to create a new record on `record#new`**

* Let's create a link on *every* page that will get us to a form that creates a new record, which lives on `/records/new`. We can edit the `application.html.erb` file which lives in `views/layouts/` to accomplish this. Inside the file add a `link_to` just about the `yield` statement in the `<body>`.

```html
<body>

<!--Every page will have this link to create a new record-->
<%= link_to "Make a New Record", records_new_path %><br>

<%= yield %>

</body>
```

* Now we have to edit the view in `/records/new.html.erb` and give it a form to create a new record. Let's make all fields required.

```html
<%= form_for @record do |f| %>
  <span>Title: </span>
  <%= f.text_field :title, required: true %><br>
  <span>Artist: </span>
  <%= f.text_field :artist, required: true %><br>
  <span>Year: </span>
  <%= f.number_field :year, required: true %><br>
  <span>Cover art: </span>
  <%= f.url_field :cover_art, required: true %><br>
  <span>Song count: </span>
  <%= f.number_field :song_count, required: true %><br>
  <%= f.submit %>
<% end %>
```

* This form will not work yet. That's because we reference `@record` in the form but it's not defined. Let's define `@record` in our controller and pass it into our view. All we need it to be equal to is a new instance of a the `Record` model.

`app/controllers/records_controller.rb`

```ruby
  def new
    @record = Record.new
  end
```

**Submit the new record form to `record#create` to create a new record and then be redirected back to record index.**

* Now that our form works, it will automatically `POST` to `/records`, which hits our action#controller `records#create`. Nothing is happening in that controller as of yet, so Rails assumes we want to render `views/records/create.html.erb` view, which was created for us when we used rails generate to make the controller (`rails g controller records index show new create`). Remember, the default behavior of a controller method is to render the corresponding view! Go ahead and remove `views/records/create.html.erb`. 

* Instead of displaying a view, we want to actually create a new record with this route. In order to do that we must pull out the data submitted from our form -- it will be in the `params` object -- and create a new record with it. We'll then have it redirect to the main records route, where our new record should appear at the bottom of the list!

`app/controllers/records_controller.rb`.

```ruby
  def create
    Record.create(
      # this is known as strong parameters, and is done for security purposes
      params.require(:record).permit(:title, :artist, :year, :cover_art, :song_count)
    )
    redirect_to('/records')
  end
```

* You may wonder what all the business is with `.require(:record).permit(...)` is. This is known as [**strong parameters**](http://edgeguides.rubyonrails.org/action_controller_overview.html#strong-parameters) and tells our applications these are the fields we will accept. Its good security practice to help prevent users accidentally updating sensitive model attributes.

* Additionally we can refactor this code to make it look better. We can **encapsulate** our strong parameter logic into a method called `record_params`. Let's make that a private method, since only the controller itself will ever use it. At the bottom of `RecordController` we can write:

`app/controllers/records_controller.rb`.

```ruby
# public methods up here

  private

  def record_params
    params.require(:record).permit(:title, :artist, :year, :cover_art, :song_count)
  end
  
end # end of class
```

* Now our `create` method can take advantage of the `record_params` method, which simply will output an object of key value pairs our `Record` model can use to create a new record. Also let's tell it to redirect to the index page once it's created the record.

`app/controllers/records_controller.rb`.

```ruby
  def create
    Record.create(record_params)
    redirect_to('/records')
  end
```

Congrats! We've complete all the user stories! Reference a version of this app with the user stories complete [here](https://github.com/sf-wdi-26/rock-n-rails).

 

