
# Deploying to Heroku

##Instructions:
_Follow the walkthrough below. Create a readme in your homework folder including links to your deployed site(s) and submit a pull request via GitHub._

## Why Deploy?

When we have finished developing a version of our app, we might want to put it on the internet for other people to see.

#### Localhost

Most of what we've developed so far has just run on our own computers. Both our database and our web server have been on our computer. We've done this because it's much easier to develop locally because we don't actually need an internet connection.  However, people can't access it easily unless they are also on our local network.

So what are your options?

**1. Buy another Computer**

  We could just buy another computer somewhere else and use it to run our applications - or even more than one, if needed, and by the way, a server is a computer. We could connect this other computer to the internet and with a bit of configuration, we could allow people to connect to it using a URL.

  However, we'd have to buy and look after this computer, have somewhere to store it and ensure that it was working and always connected to the internet. Also, if someone hit an error when they used our app, we might have to stop and start it? Maybe there is a better way?

**2. Virtual machines**

  What if we could write a program that pretends to be a computer? If we could do this, then we could run another operating system within it? This is called a virtual machine.

**3. Cloud hosting platform**

  Heroku is a cloud-based service. Essentially it's virtual machines that run on Amazon Web Services (EC2) and hosts your application code in the cloud.  By using the git, you can deploy your code directly to Heroku's - they call them "dynos" - and seconds later your changes will be live in production.

By the way: All of Heroku lives on Amazon's Web Services

To deploy an app to Heroku, it's a fairly straightforward step-by-step process.

First you need to link your machine to your Heroku account - a similar process to what we did with Github.

Before you begin, sign up for a free account on [Heroku](https://www.heroku.com/).


##Setting up Heroku on your machine(s)


#### Add SSH-key to Heroku

Very similar to when we setup GitHub, we need to add our ssh-keys to Heroku so that Heroku can know we're authenticated users.

So let's add our ssh-key to Heroku. First, we need to copy our ssh-key:

```bash
cat ~/.ssh/id_rsa.pub | pbcopy
```

Then we need to go to [Heroku](https://www.heroku.com/).

Email > Manage Account > SSH Keys.


#### Install Heroku Toolbelt

Next we need to install the [Heroku Toolbelt](https://toolbelt.heroku.com).

This is a command-line tool that allows us to use commands in the terminal, similar to the way that we use git.

Once it is installed, you need to login with your heroku credentials:

```bash
$ heroku login
Enter your Heroku credentials.
Email: adam@example.com
Password (typing will be hidden):
Authentication successful.
```


##Deploy a Rails app

Let's make a Rails app so that we can deploy it to Heroku. You must make sure that you are not in a git tracked repo and create a new app using PostgreSQL instead of SQLite.  Postgres is a more powerful relational databse than the default, SQLite. It works well with Heroku, and can use a bunch of other data types that other databases can't: JSON, arrays and hstore (hashes).  When deploying to Heroku, you must use something other than SQLite, so we'll be using PostgreSQL.

Now, if you want your application to work locally, you must first install Postgres. (We've already done this.)

```bash
brew install postgreSQL
```

Then, create an application in a repo that isn't being tracked by git:

```
rails new heroku_app --database=postgresql
cd heroku_app
```


Let's add scaffold a quick Customer model:

```bash
$ rails g scaffold Customer name:string
```

Now open up the app in Sublime and add a root route to config/routes.rb

```ruby
root 'customers#index'
```

#### Git init

_Heroku works with git_, so you need to `git init` this directory:

```bash
git init
```


Now, you need to add all the files to be tracked by git:

```bash
git add -A
git commit -m "First commit"
```

#### Heroku create

Create a new app on Heroku:

```bash
heroku create
```


And you can push to Heroku with this command:

```bash
git push heroku master
```

#### Migrating the database

You will need to migrate the database remotely, just as you would locally. You do this with this command:

```
heroku run rake db:migrate
```

And you can open the website with:

```
heroku open
```

#### Heroku & Assets

By default Rails 4 will not serve your assets. To enable this functionality you need to go into `config/application.rb` and add this line:

```
config.serve_static_assets = true
```

Alternatively you can achieve the same result by including the rails_12factor gem in your `Gemfile`.  Inside your Gemfile, Rails gives us a way of specifying that some gems should be present in some environments. You can do so with the group method. It looks like so:

```ruby
group :production do
  gem 'pg'
  gem 'rails_12factor'
end

group :development do
  gem 'pry-rails'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'sqlite3'
end
```

This gem will configure your application to serve static assets so that you do not need to do this manually in a `config` file.

_Remember:  you will always use a few different gems for our production, development and test environments._

#### Reset the database

As we've seen, you get access to all the rake commands on heroku through `heroku run rake`.

On Heroku, PostgreSQL is a plugin added on top of your app, therefore some commands related to the database have to be executed as a command for the plugin, rather than as a command for the Rails app directly.

To get all the details about the database, type:

```bash

heroku pg:info

```

If you want to reset the database (the equivalent of `rake db:drop db:create` locally), you will need to get the URL for your database using the command:

```bash

heroku pg:reset DATABASE_URL

```

Then you'll be prompted to type the app name. This extra step helps us prevent making a mistake when typing the command, as this will reset the production database, which is a really critical action.

#### Amazon S3

Ideally, you should serve all of your assets using S3.  Heroku explains:

>"AWS Simple Storage Service, e.g. S3, is a 'highly durable and available store' and can be used to reliably store application content such as media files, static assets and user uploads. It allows you to offload your entire storage infrastructure and offers better scalability, reliability, and speed than just storing files on the filesystem.  AWS S3, or similar storage services, are important when architecting applications for scale and are a perfect complement to Heroku’s ephemeral filesystem."


Don't worry about this just yet but know that pictures and media files take up a lot of space and we can't store them in our database - that's where S3 comes in.

##Stretch: Push a Previous Project to Production

Using the previous Codealong, and the code you just wrote, take a Rails application we've created in class and push to Heroku - all by yourself!  To configure an existing app - that's been using SQLite - you'll need to configure the `Gemfile` to use PostgreSQL when you push:  

```ruby
group :production do
  gem 'pg'
end

group :development do
  gem 'sqlite3'
end
```

Once you've pushed, jump on the crazy URL Heroku generated and make sure the app's functionality is working.


