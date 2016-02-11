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

##Models - Intro (15m)

#### MVC - Models

We can apply the design pattern of MVC to make more complex applications. Models literally "model" or describe the form of an object that we will represent in our application. This model object will contain methods that sets and gets its data in our database. Using a model, to a large extent, abstracts the complex SQL statements of a database away from the developer.

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

[Rails Guides: Active Record Basics](guides.rubyonrails.org/active_record_basics.html):

> Active Record, as an ORM Framework, gives us several mechanisms, the most important being the ability to:

> - represent models and their data
- represent associations between these models
- represent inheritance hierarchies through related models
- validate models before they get persisted to the database
- perform database operations in an object-oriented fashion

Active Record is the Model in MVC. We require it in our project by adding the `gem activerecord` In other words it is the layer the system responsible for representing business data and logic.

***This will all make a lot more sense once we start using it...so, let's go!***


## Scenario

We're a successful talent management agency for those in the music industry called Tunr. We have designed a Sinatra app to manage our artists. Look in `starter-code` and take a look at the `app.rb` & `config.ru` files.

**For 5 minutes talk with a partner for a minute and discuss:**

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

As noted earlier, ActiveRecord is a gem and since we're building an app with a bunch of gems using Bundler.

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

And don't forget, what do we do every time we modify the Gemfile? `bundle install`!

<!-- TODO: continue here -->

### Setting up the Database (Code along)

#### Database configuration

Now, all our gems from the Gemfile are already being required thanks to the first few lines of `config.ru`, so that's great.

But we're about to start using a SQL database, so we gotta configure our Sinatra application so it knows how to do that.

Let's make a *directory*  called `config` in root. And inside that, `touch config/database.yml`. YAML is a nice little format that essentially works like a Ruby hash, but is written in plaintext. Key-value. Great for configuration, it'll be super easy.

```yaml
development:
  adapter: postgresql
  database: tunr_development
```

The name of the database is up to you, but `something_development` is a good pattern to get into.

That's it – because we used that particular folder & filename & key/values, our `sinatra-activerecord` gem picks that up & automatically uses it. It's really simple.

#### Makin' Models

Now that we're _almost_ configured, let's make a class that uses all this fancy stuff.  Under the models directory, create a file called ```artist.rb``` to allow an Artist class to use ActiveRecord:

```ruby
class Artist < ActiveRecord::Base
end
```

So again, this is saying: "We want a class named Artist, and it shall inherit all the code from the Active Record class, which has a bunch of handy methods already written for me."  And now, when you're working with the Artist class, you'll be able to do ```Artist.last`` in your code.  This enables ```Artist.first``` or ```Artist.new()``` or the other methods it has, without any other code having to be written, as long as we have a database.

This is where Rake comes in.

Rake technically stands for 'ruby make', which is a tool we're going to use to do tasks for us. You can program your own rake functions, but active record comes with a bunch, and we're gonna use one to create our database in Postgres.

Whereas earlier you learned to do this:

```bash
$ psql
psql (9.4.1, server 9.3.5)
Type "help" for help.

username=# create database tunr;
CREATE DATABASE
```

Now, we can wrap that up in one terminal command:

`rake db:create`

Run it. Boom, database created.

Now let's boot up our application and see what we get.

```
rackup
```

Start it up, check it out in your browser. Try clicking 'Add Artist' – crap!

![](http://s30.postimg.org/d5bpwkoo1/Screen_Shot_2015_07_10_at_10_42_37_AM.png)

## Error?? Demo (5 mins)

If you read through what this page is actually telling you, you can probably guess why this happened.

Even though we have a database (`tunr_development`) we never created any tables or schema.  We never made a table, just the database!

Just like we used a wonderful Rake command to help us quickly create a database, we have some to help us create tables, too.

> Note: Explain some of the common commands we'll be using and they'll have access to.

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

## Let's Create Some Data Tables with migrations...and without SQL! Code Along (10 mins)

You'll notice we've already set up a bit of your Rakefile for you – we're basically just using the commands that the ActiveRecord gem has built in. Don't worry about memorizing the code in this file, but _do_ make sure you understand what the commands it gives us do.

The real meat & potatoes here, after creating a database, is to create a _table_.

To create a table we need to create a "migration".  From [rubyonrails.org](rubyonrails.org):

*"Migrations are a convenient way to alter your database schema over time in a consistent and easy way. They use a Ruby DSL so that you don't have to write SQL by hand, allowing your schema and changes to be database independent. You can think of each migration as being a new 'version' of the database."*

Migrations tell your application what goes into your database, and each one is timestamped, so it knows how to walk through them over time. This is crucial, especially when on a team of developers, because it keeps your database up-to-date even when someone else changes it – the computer always has a history of changes via new migration files.

So let's build a new version of our database that has an artists table:

```bash
rake db:create_migration NAME=create_artists

db/migrate/20150710152405_create_artists.rb
```

Keep in mind those numbers will be different for you – it's a timestamp, which is the date & time the file was created.

You'll notice you have to pass a "NAME" parameter to your migration and that a file is created for you in a new db/migrate folder, with the name of your migration and a timestamp. So easy.

Now let's visit the ```db/migrate/20150710152405_create_artists.rb``` and put the finishing touches on our table:

> Note: Explain the block and how it creates the necessary columns.

```ruby
class CreateArtists < ActiveRecord::Migration
  def change
     create_table :artists do |t|
        t.string :name
        t.string :photo_url
        t.string :nationality

        t.timestamps
  end
end
```

Run the migration with ```rake db:migrate```. That'll fetch any migrations it hasn't run yet and run 'em.

```bash
== 20150710152405 CreateArtistsTable: migrating ===============================
== 20150710152405 CreateArtistsTable: migrated (0.0000s) ======================
```

And we have a table! Nice work!  And _now_ you've got a `schema.rb` file – this file is _sacred_. Not to be touched, only to be admired. It's a snapshot of the current state of your database, and rake is the only one who should be modifying it, ever.

If ever you're unsure what a database looks like, browse your `schema.rb`.

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

Gorgeous, success! Now we change it.

## Changes to our DB - Demo (10 mins)

Just like we can write migrations to create tables, we can write migrations to add, change or delete attributes, update data types, change table names, and even delete tables.

We decided we want to collect data about the instruments the artists play, so we need to create a migration:

```bash
rake db:create_migration NAME=add_instrument_to_artists
db/migrate/20150710154423_add_instrument_to_artists.rb
```

In ```db/migrate/20150710154423_add_instrument_to_artists.rb```:

```ruby
class AddInstrumentToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :instruments, :string
  end
end
```

You can probably guess what this line - ```add_column :artists, :instruments, :string``` - says: "add a column to the artists table called 'instruments' with a string as its data type".  Run the migration with ```rake db:migrate``` and BAM, you have a new column.

Do this _every_ time you need to change your database – whether it's adding or removing. Changing the database in any way means making a new migration, and telling the computer what you need done. Think of it as an assistant; you don't do the tedious Postgres work, you just tell it what needs doing and tell it to go do it.

#### Changing or deleting column

By now, you've felt the pattern: create a migration, add the appropriate code to the migration, and then run the migration.  Same applies for each time you want to modify your database.  In the case of a updating a column, you would:

```bash
rake db:create_migration NAME=change_column_in_artists_to_new_column
```

In the migration add:

```ruby
def change
  rename_column :table, :old_column, :new_column
end
```

Then:

```bash
rake db:migrate
```

According to [the official ActiveRecord docs](http://edgeguides.rubyonrails.org/active_record_migrations.html), these are all the migration definitions the change method allows you to use in a migration:

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

As always, if you can't remember the exact syntax, take to the Google!


## Independent Practice (10 minutes)

> ***Note:*** _This can be a pair programming activity or done independently._

For the last part of class, the guys at Tunr, decided they need more information about the people they represent.  Do the following to make it happen:

- Add another column to your Artists table named "Address" that stores string data (be careful with the datatype on this one - it's not what you think)
- Add a column with a different data type, and then delete it
- Update an existing column to have a different name

#### Bonus:

- Update the artist show page to display the new data
- Try using `tux` to add/edit/destroy instances of Artist models (and thus, records in your database)
- Register a new artist using the ```artists/new``` end point


## Conclusion (5 mins)
- What is ActiveRecord and how does it interact with your database?
- What are migrations?
- Briefly, describe how to configure your Sinatra app to use ActiveRecord.
