# Building Models with ActiveRecord

### Learning Objectives
*After this lesson, students will be able to:*

- Create a model that inherits from ActiveRecord class
- CRUD data in the database using our model
- Write a migration to define a database schema
- Update our database schema with another migration

### Preparation
*Before this lesson, students should already be able to:*

- Explain MVC
- Create a simple Sinatra app
- Write object oriented Ruby
- Set and get data from a SQL database

##Models - Intro

#### MVC - Models

We can apply the design pattern of MVC to make more complex applications. Models literally "model" or describe the form of an object that we will represent in our application. This model object will contain methods that set and get its data in our database. Using a model, to a large extent, abstracts the complex SQL statements of a database away from the developer.

<img style="max-height:300px;" src="http://i.stack.imgur.com/ocEWx.png"/>

##ORM

**So how does the model talk to the database?**

Well, that's where ORMs come in.  ORM stands for: **O**bject **R**elational **M**apping, and it's a technique that connects the rich objects of an application to tables in a relational database management system. Let's draw on the board how a user object, instantiated from the User class, could map to a Users table in our database.

####Example

Let's pretend we have a User class with the attributes `id`, `name`, `age`, and `address`:

```ruby
class User
  attr_accessor :id, :name, :age, :address
end
```

And let's pretend that we create a new user, Rob Stark, whose object is shown below:

```ruby
=> #<User:0x007fc8b18c5718 @address="1 Winterfell Lane", @age=16, @id=1, @name="Rob Stark", @king?=true>
```

With an ORM, we're able to take that instance of class User and map it to our relational database:

```psql
id |   name    | age |                      address                       | king?
----+-----------+-----+----------------------------------------------------+-------
  1 | Rob Stark |  16 | 1 Winterfell Lane                                  | true
(1 row)
```

Using ORMs, the properties and relationships of the objects in an application can be easily stored and retrieved from a database without writing SQL statements directly and with less database access code, overall.

##ActiveRecord

[Rails Guides: Active Record Basics](http://guides.rubyonrails.org/active_record_basics.html):

> Active Record, as an ORM Framework, gives us several mechanisms, the most important being the ability to:

> - represent models and their data
- represent associations between these models
- represent inheritance hierarchies through related models
- validate models before they get persisted to the database
- perform database operations in an object-oriented fashion

Active Record is the Model in MVC. In other words it is the layer in the system responsible for representing business data and logic. We require it in our project by adding the `gem activerecord`

***This will all make a lot more sense once we start using it...so, let's go!***


## Scenario

We're a successful talent management agency for those in the music industry called Tunr. We have designed a Sinatra app to manage our artists. Look in `starter-code` and take a look at the `app.rb` & `config.ru` files.

**For 5 minutes talk with a partner and discuss:**

* differences from our Sinatra apps in the beginning of the week
* what you think each line does and how they relate to the rest of the app
* Do you notice any odd methods in the seven restful actions? I do:

```ruby
Artist.all #what?
#...
Artist.create(params[:artist]) #who?
#...
Artist.find(params[:id]) #nah uh!!
```

### Clarifying our starting point

These `.all`, `.create`, `.find` ActiveRecord methods will write the SQL for us, and once we've connected our database, we can pull any associated model data from it easily. Before we do that, let's set up our project to use ActiveRecord and configure which database we'll talk to:

#### Including ActiveRecord

As noted earlier, ActiveRecord is a gem and since we're building an app with a bunch of gems using Bundler, let's look at the Gemfile.

**Gemfile**

```ruby
source "https://rubygems.org"  #tells your app where to get the gems from
gem "sinatra" #allows us to use and run Sinatra record
gem "sinatra-activerecord" #allows us to use Sinatra with ActiveRecord
gem "rake" #gives us tasks and dependencies that can be specified in standard Ruby syntax (don't worry about it if you don't get it)
gem "activerecord" #gives us all the excellent class methods you see above (and more) and allows for object relational mapping
gem "pg" #allows us to use postgresql as a DBMS for our app
gem "tux" #allows us to have an interactive shell to play with object creation
```

...and don't forget: what do we do every time we modify the Gemfile? `bundle install`!

### Setting up the Database (Code along optional)

#### Database configuration

Now, all our gems from the Gemfile are already being required thanks to the first few lines of `config.ru`, so that's great.

But we're about to start using a SQL database, so we gotta configure our Sinatra application so it knows how to do that.

Let's make a *directory*  called `config` in root. And inside that, `touch config/database.yml`. YAML is a nice little format that essentially works like a Ruby hash, but is written in plaintext key-value. Great for configuration, it'll be super easy.

```yaml
development:
  adapter: postgresql
  database: tunr_development
```

The name of the database is up to you, but `something_development` is a good pattern to get into. A typical application would have three databases, the other two being `something_production` and `something_test` for production and test environments respectively.

#### Makin' Models

Now that we're _almost_ configured, let's make a class that uses all this fancy stuff.  Under the models directory, create a file called ```artist.rb``` to allow an Artist class to use ActiveRecord:

```ruby
class Artist < ActiveRecord::Base
end
```

So again, this is saying: "We want a class named Artist, and it shall inherit all the code from the Active Record class, which has a bunch of handy methods already written for me."  And now, when you're working with the Artist class, you'll be able to do `Artist.create` in your code to create a new Artist in the database or `Artist.first` to grab the first one in the database and so on...

This is where Rake comes in.

Rake technically stands for 'ruby make', which is a tool we're going to use to run predefined tasks for us. You can program your own rake tasks, but active record comes with a bunch already preset ones, which we can use to set up the database we'll store our data in database in Postgres. First we need to create a database...

Earlier you learned to do this:

```bash
$ psql
psql (9.4.1, server 9.3.5)
Type "help" for help.

username=# create database tunr;
CREATE DATABASE
```

Now, we can wrap that up in one terminal command with rake's help. 

>Before you do this make sure your Postgres application/server is open and running.

`rake db:create`

Run it. Boom, database created.

Now let's boot up our application and see what we get. In the root of the application run:

```
rackup
```

Start it up, check it out in your browser. Try clicking 'Add Artist' – shucks!

![](http://s30.postimg.org/d5bpwkoo1/Screen_Shot_2015_07_10_at_10_42_37_AM.png)

## Error?? Demo

If you read through what this page is actually telling you, you can probably guess why this happened.

We never actually required our new model into our application. In your `config.ru` add the line `require './models/artist'` **above** the require statement for the `app`.

Try it again... Do we hit another error? Maybe something along the lines of `PG::UndefinedTable: ERROR: relation "artists" does not exist`.

Even though we have a database (`tunr_development`) we never created any tables or schema.  We never made an Artist table, just the database!

Just like we used a wonderful Rake command to help us quickly create a database, we have some to help us create tables, too.

> Here's a pretty comprehensive list of rake commands you can run on the database.

```bash
$ rake -T

rake db:create              # Creates the database f...
rake db:create_migration    # Create a migration (pa...
rake db:drop                # Drops the database fro...
rake db:fixtures:load       # Load fixtures into the...
rake db:migrate             # Migrate the database (...
rake db:migrate:status      # Display status of migr...
rake db:rollback            # Rolls the schema back ...
rake db:schema:cache:clear  # Clear a db/schema_cach...
rake db:schema:cache:dump   # Create a db/schema_cac...
rake db:schema:dump         # Create a db/schema.rb ...
rake db:schema:load         # Load a schema.rb file ...
rake db:seed                # Load the seed data fro...
rake db:setup               # Create the database, l...
rake db:structure:dump      # Dump the database stru...
rake db:structure:load      # Recreate the databases...
rake db:version             # Retrieves the current ...
```

## Let's Create Some Data Tables with migrations...and without SQL!

You'll notice we've already set up a bit of your Rakefile for you – we're basically just using the commands that the ActiveRecord gem has built in. Don't worry about memorizing the code in this file, but _do_ make sure you understand what the commands it gives us do.

The real meat & potatoes here, after creating a database, is to create a _table_ in the database.

To create a table we need to create a "migration".

#### Migrations
*"Migrations are a convenient way to alter your database schema over time in a consistent and easy way. They use a Ruby DSL [Domain Specific Language] so that you don't have to write SQL by hand, allowing your schema and changes to be database independent. You can think of each migration as being a new 'version' of the database."*

[Read more here](http://guides.rubyonrails.org/active_record_migrations.html)

Migrations are instructions for an iteration to your database's architecture. Each one's name is generated for you and timestamped, so it knows how to walk through them over time to repeat the same instructions on any new computer that needs to migrate to the same database state. A proper understanding of this is crucial, especially when on a team of developers, because it keeps your local databases in sync when changes are made on one computer. When the rest of the team `pull`s the new migration files migration the full set of them are a perfect record of all changes that have been made over time.

So let's build a new version of our database that has an artists table:

```bash
rake db:create_migration NAME=create_artists
```

A file is generated in `db/migrate/`. The string of numbers at the beginning is a Unix timestamp, while the remainder is what you just named it.

Now let's open the generated file and put the finishing touches on our table:

```ruby
class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t| #t stands for table
      t.string :name #add a name attribute of type string to the table
      t.string :photo_url #also add a photo_url attribute of type string
      t.string :nationality # finally add a nationality attribute of type string
      t.timestamps #this will add timestamps for time created and time updated automagically!
    end
  end
end

```

Run the migration with `rake db:migrate`. That'll run any migrations that haven't been run yet and make the appropriate changes to the database.

```bash
== 20150710152405 CreateArtistsTable: migrating ===============================
== 20150710152405 CreateArtistsTable: migrated (0.0000s) ======================
```

###Sacred Cows

And we have a table! Nice work!  And _now_ you've got a `schema.rb` file that was generated for you – this file is _sacred_. **Not** to be touched, only to be admired. It's a snapshot of the current state of your database, and rake is the only one who should be modifying it, ever. Similarly, never change a migration file after it has been run. Repeat after me: "I shall never change a migration file after it has been run." Again! You can get a quick view of which files have been run by entering `rake db:migrate:status`; the files that have been run have a status of `up`, while those that have not have a status of `down`. Your file should have an `up` status now.

<img style="max-height: 200px;" src="http://www.thebrsblog.com/wp-content/uploads/2012/04/httpwww-andrewolsen-netwp-contentuploads201105sacred-cow.jpg"/>

Peep your `schema.rb` to see what your database looks like!

```ruby
ActiveRecord::Schema.define(version: 20150710152405) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artists", force: :cascade do |t|
    t.string   "name"
    t.string   "photo_url"
    t.string   "nationality"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
```

Gorgeous, success! Now let's change it again!

## Changes to our DB - Demo

Just like we can write migrations to create tables, we can write migrations to add, change or delete attributes, update data types, change table names, and even delete tables. The entire purpose of migrations are to make architectural changes to the database.

We have also decided we want to collect data about the instruments the artists play, so we need to add a column to house that data. Let's create another migration:

```bash
rake db:create_migration NAME=add_instrument_to_artists
db/migrate/20150710154423_add_instrument_to_artists.rb
```

In the new migration:

```ruby
class AddInstrumentToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :instruments, :string
  end
end
```

You can probably guess what this line - `add_column :artists, :instruments, :string` - says: "add a column to the artists table called 'instruments' with a string as its data type".  Run `rake db:migrate:status` for "funzies" (you should have two migration files, one `up` and one `down`), but when you want to migrate run `rake db:migrate` and BAM, you have a new column.

Make a migration _every_ time you need to change your database – whether it's adding or removing things, no exceptions! Changing the database in any way means making a new migration, and telling the computer what you need done. Think of it as an assistant; you don't do the tedious Postgres work, you just tell it what needs doing and tell it to go do it. If you make changes in other ways to your local database, a team member who has cloned the same project will lose state with you. Running migrations of your other team members *is how* both of your separate local databases stay in state!

#### Changing or deleting column

By now, you've seen the pattern:

* create a migration
* add the appropriate code to the migration
* run the migration.

Same pattern applies for each time you want to modify your database. For example in the case of a updating a column, you would write something along the lines of:

```bash
rake db:create_migration NAME=change_column_in_artists_to_new_column_name
```
Note the `NAME` doesn't matter, but it's a good idea to be descriptive.

In the migration add:

```ruby
def change
  rename_column :table, :old_column_name, :new_column_name
end
```

Then:

```bash
rake db:migrate
```

According to [the official ActiveRecord docs](http://guides.rubyonrails.org/active_record_migrations.html), these are all the migration methods that can be run inside `change`:

- add_column
- add_index
- add_reference
- add_timestamps
- add_foreign_key
- create_table
- create_join_table
- drop_table (must supply a block)
- drop_join_table (must supply a block)
- remove_timestamps
- rename_column
- rename_index
- remove_reference
- rename_table

As always, if you can't remember the exact syntax, reference the [rails guides](http://guides.rubyonrails.org/)!

##Taking a step Back

**So we've created our model, but how is the application actually going to know when to CRUD the data?** The typical way to do this is for your front-end to hit a RESTUL route which executes a corresponding CRUD action on your database using your model. In fact take five minutes to with a neighbor look at the `app.rb` file again and try to figure out what is going on. Answer these questions:

* Which route gets hit when the application is hit with a `POST` to `/artists`
* What, step by step, happens in the above request?
* If a `POST` creates a new artist, where does the information (such as name, photo_url, etc) come into the application from?

##Playing with our Data

**Ok great, I can rely on my application to CRUD data if all my routes are setup and I get a specific request from the front-end, but that seems like a lot of work... what if I just want to do it manually in the console?** Good news, that's totally encouraged! Getting your hand dirty in that fashion is a good way to actually get to play with the models, see how they are working and quickly give yourself some test data to work with (a `seed.rb` file is an even faster way to give yourself fake data to work with, but we'll talk about that later).

We have a gem available to us called `tux`. It will pop us into a ruby environment within the *context* of our application. Run:

```bash
tux
```

###Creating

```ruby
>> david_bowie = Artist.new
>> david_bowie.name = "David Bowie"
>> david_bowie.nationality = "British"
>> david_bowie.save
```

Here's `.create`, which does the same thing as `.new` and `.save`, but just in one step...

```ruby
>> Artist.create({name: "Drake", nationality: "Canadian"})
```

###Reading

Now we can see how many artists we have `Artist.count` and see them all with `Artist.all`

###Updating

First we must find the artist to update and then change an attribute.

```ruby
>> drake = Artist.find_by_name("Drake")
>> drake.nationality = "Canadian, aye!"
>> drake.save
```

###Deleting

We will now delete David Bowie, a moment of silence please...

> It is best practice to use an `id` for finding an entry in the table. Assuming David Bowie is number `1` (which he is)...

```ruby
>> david = Arist.find(1)
>> david.destroy
```

(´;︵;`)


###More CRUD actions

For a comprehensive set of all the CRUD actions active record can perform checkout out the CRUD section of [Active Record Basics](http://guides.rubyonrails.org/active_record_basics.html#crud-reading-and-writing-data) on Ruby Guides!

## Independent Practice

> _This a recommended pair programming activity._

For the last part of class, the guys at Tunr, decided they need more information about the people they represent. Do the following to make it happen:

- Add another column to your Artists table named "Address" that stores string data (be careful with the datatype on this one - it's not what you think)
- Add a column with a different data type, and then delete it
- Update an existing column to have a different name

#### Bonus:

- Update the artist show page to display the new data
- Try using `tux` to add/edit/destroy instances of Artist models (and thus, records in your database)
- Register a new artist using the ```artists/new``` end point


## Conclusion
- What is ActiveRecord and how does it interact with your database?
- What are migrations?
- Briefly, describe how to configure your Sinatra app to use ActiveRecord Models with your database.
