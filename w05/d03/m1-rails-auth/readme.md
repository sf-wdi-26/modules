#Auth in Rails

##Learning Objectives

By the end of this lesson...

* Implement an authentication system in Rails that securely stores users' passwords
* Spec the User model using TDD 
* Build routes, controllers, and views necessary for a user to signup & login

##Prerequisites

Before this lessons you should be able to...

* Illustrate the request/response cycle
* Compare and contrast sessions & cookies
* Build an MVC Rails application

## App Setup

Let's start a new Rails application:

* `rails new rails-auth -T -B -d postgresql`. (This command sets up a new application with no tests, no automatic bundle, and postgres as the database.)
* `cd rails-auth`
* `rake db:create`
* `subl .`

## Authentication Review

**Authentication** is the verification of a user's credentials to prove "they are who they say they are". This is fundamentally different than **authorization**, refers to the set of permissions granted to a particular user in the application.

To authenticate our users we typically ask them for a `password` we can associate with their `email` or `username`. A password is a *very* private piece of information that must be kept secret, and so, we strategically obscure it in such a way that may never be reverse-engineered by *anyone* and remains the key to **confirm the user is authentic** (authentication).

Our library of choice for password hashing is `BCrypt`, which we will add to our gemfile. In Rails, the convention is to add all our business logic into the models, so we will be writing most of our code in the `User` model.

Remember, remember: **never store plaintext passwords**, only the digested versions. 

Let's uncomment `bcrypt` at the bottom of our `Gemfile` as we will need it to digest (hash) the plain-text password and store it in a `password_digest` field of our database's `users` table.

`Gemfile`

```ruby
	# Use ActiveModel has_secure_password
	gem 'bcrypt', '~> 3.1.7'
```

Then run `bundle` to install `bcrypt` and the other gems.

### Playing With `BCrypt`

As soon as something is installed via bundler we can access it via our `rails console.` Let's play in console.


```bash
	Loading development environment (Rails 4.1.6)
 ## Let's create our first password & save the hashed output to a variable
	2.1.0 :001 > hashed_pass = BCrypt::Password.create("swordfish")
	 => "$2a$10$6MQQCxBpfu16koDVs3zkbeSXn1z4fqKx9xLp4.UOBQBDkgFaukWM2"

 ## Let's compare our password to another
 	2.1.0 :003 > BCrypt::Password.new(hashed_pass) == "tunafish"
 	=> false
 	
 ## Let's compare our password to original
 	2.1.0 :004 > BCrypt::Password.new(hashed_pass) == "swordfish"
 	=> true
 	
 ## Exit
 	2.1.0 :005 > exit
```

> Note: the `==` method for `BCrypt::Password` is different than the typical comparator in Ruby say for an `Object`.

```ruby
BCrypt::Password.instance_method(:==) == Array.instance_method(:==)
=> false
```


Hopefully this helps you begin to think about how to setup an **authenticate** method for the `User`.


## Test Setup

* Add the rspec gem to both test and development environments, then run `bundle`

```ruby
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  # Rspec allows us to write tests for rails
  gem 'rspec-rails'
end
```

* `bundle` and then run the command `rails g rspec:install` to initialize rspec as your testing suite.
	* Now a `spec` directory has been created for you

## Model Setup

Let's leave our controllers be for the time being and setup our models. Our tests depend on a `User` model existing.
NOTE: The default attribute type is string, if we don't specify.

```bash
rails g model user email:string password_digest:string
```

`email` is the natural username for our user, and the `password_digest` is where we'll store the user's hashed password.

>Note: if you ever make a mistake during a generation, you can reverse it with `rails destroy <resourceType> <resourceName>`. In this case it would simply be `rails d model user`.

Great, let's run the migrations!

```bash
rake db:migrate
```

Now we can ensure we build our `User` model to specifications by passing some tests we've been given!

* Inside the directory `spec` overwrite the existing file `/models/user_spec.rb` with the below tests.

```ruby
require "rails_helper"

describe User, type: :model do

  it "can create a new user" do
    expect(User.new).to be_a User
  end

  context 'Initialization' do
    let(:user) { User.new }

    it "allows the getting of a password" do
      expect(user).to respond_to(:password)
    end

    it "allows the setting of a password" do
      expect(user).to respond_to(:password=).with(1).argument
    end

    it "creates a password digest when a password has been set" do
      #password digest starts as nil
      expect(user.password_digest).to be_nil
      #password is set
      user.password = "swordfish"
      #password digest is created after password is set
      expect(user.password_digest).not_to be_nil
    end
    it "ensures the password digest is not the password" do
      user.password = "swordfish"
      expect(user.password_digest).not_to eq(user.password)
    end
  end

  context 'Validation' do
    let(:user) do
      #create a user in active memory
      User.new({
        email: "bana@na.com",
        password: "adsf1234",
        password_confirmation: "adsf1234"
      })
    end
    it "validates presence of password_digest" do
      #clear values of password & password_confirmation
      user.password_digest = nil
      expect(user).not_to be_valid
    end

    it "validates presence of email" do
      #clear values of email
      user.email = nil
      expect(user).not_to be_valid
    end

    it "validates password & password confirmation match" do
      user.password_confirmation = "not the same"
      expect(user).not_to be_valid
    end
  end

  context 'Authentication' do
    before(:all) do
      #clear all users
      User.destroy_all
      #save a user to the database
      @user = User.create({
        email: "shmee@me.com",
        password: "jumanji",
        password_confirmation: "jumanji"
      })
    end
    it "restricts passwords from saving to the db" do
      found_user = User.all.first
      expect(found_user.password).to eq(nil)
    end

    describe "#authenticate" do
      it "returns the user when the correct password is provided" do
        expect(@user.authenticate("jumanji")).to eq(@user)
      end

      it "returns false when an incorrect password is provided" do
        expect(@user.authenticate("ijnamuj")).to eq(false)
      end
    end

    describe "::confirm" do
      it "checks if a specified user & password combination exists" do
        user_email = "shmee@me.com"
        user_password = "jumanji"
        found_user = User.find_by_email(user_email)
        expect(User.confirm(user_email, user_password)).to eq(found_user.authenticate(user_password))
      end
    end
  end
end
```

Run them with:

```bash
rspec
```

## Authentication (TDD Style)

In the process of passing these tests we will build all the logic for an authentication system! You should never have to write this code from scratch, but it is very important you understand what is going on.

>Exercise: Think, pair, share on what the below code is doing (7 minutes).

```ruby
class User < ActiveRecord::Base
  BCrypt::Engine.cost = 12

  # email & password_digest fields must exist
  validates :email, :password_digest, presence: true
  # a user must have a password & password confirmation field
  # the fields are match against each other but never persisted to the database
  validates_confirmation_of :password
  # TODO: add validator for unique emails

  # to authenticate the user using bcrypt's built in 
  def authenticate(unencrypted_password)
    secure_password = BCrypt::Password.new(self.password_digest)
    # check that a hashed version of the unencrypted password is the same as the secure password
    # the method `==` has been modified for `secure_password` to first hash whatever it's comparing to
    if secure_password == unencrypted_password
      # return the user
      self
    else
      false
    end
  end

  def password=(unencrypted_password)
    #raise scope of password to instance
    @password = unencrypted_password
    self.password_digest = BCrypt::Password.create(@password)
  end

  def password
    #get password, equivalent to `attr_reader :password`
    @password
  end

  # class method `::confirm`
  def self.confirm(email_param, password_param)
    # add a unique email validator later
    user = User.find_by_email(email_param)
    user.authenticate(password_param)
  end

end
```


## Routes, Controllers, & Views for Signup

###User stories...

A user should be able to... 


* go to `/signup` and have the application execute the `users#new` action to render `/views/users/new.html.erb`.

* see a `form_for` on `users#new` that displays email, password, and password_confirmation data.

* POST the form on `users#new` to `users#create` which creates a new user, logs them in, and redirects to `user#show`.

* go to `/users/:id/` and see their profile page.

Let's get started!

## Routes

Let's edit our `config/routes.rb` file...


```ruby
Rails.application.routes.draw do

  root to: "welcome#index"

  get "/login", to: "sessions#new"

  post "/sessions", to: "sessions#create"

  get "/sign_up", to: "users#new", as: "sign_up"

  resources :users

end
```

If you haven't seen it before, `resources` will auto generate all the RESTful routes for a `User`.

Run `rake routes` to see all the application's routes.

## Home Page

**Challenge:** Start your application and pass these user stories. On the `root_path`:

* A user can see a welcome message`
* A user can click a "Sign Up" button that directs them to the `sign_up_path`

## Controllers

* Let's create `UsersController` with the command: `rails g controller users new create show`

* Let's add a private method that creates strong parameters for specific attributes of the user

You should end up something along the lines of...

```ruby
class UsersController < ApplicationController
  
  def new
  end

  def create
    # TODO: once the controller is implemented don't forget to also sign the user in
  end

  def show
  end

  private
  
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end
```

##Challenge: Implement Signup

####Step 1

* For your `/sign_up` route, which hits the action `users#new`, render a file `new.html.erb` in `/views/users`.

####Step 2

* In that view add a `form_for` referencing user; have it post to `users#create` with `email`, `password` and `password_confirmation`.

####Step 3

* Create the user in `users#create` and when done have it redirect to `user#show` (later we will have them also be logged-in in this step)
	* Bonus: create a condition that checks if the user was saved correctly. Hint: first build the user in memory with `.new` then check `if @user.save` proceed as normal `else` render the signup page again.

####Step 4

* `users#show` will find the [current user](#current_user) and display their profile page

##Session Management

<h3 id="session_creation">Login</h3>

Since creating a session is essentially what we mean when want to login, and logging out is destroying a session. We have a single controller dedicated to session management, `SessionsController`.

`app/controllers/sessions_controller.rb`

```ruby
class SessionsController < ApplicationController
  def new
    #TODO: render a login view
  end

  def create
    #call the User#confirm method
    if User.confirm(params[:email], params[:password])
      # this creates the session, logging in the user
      session[:user_id] = user.id
      #redirect to the show page
      redirect_to user_path(user.id)
    else
      #there was an error logging the user in
      redirect_to login_path
    end
  end
  
  def destroy
    #TODO: logout the current user
  end
  
end

```
After we authenticate someone we set `session[:user_id] = user.id`. This allows the `user.id` to be stored in a cookie for lookup later.

Now that we know how to login a user with `session[:user_id] = user.id` let's also make sure to do that when a user is signed up (it is good UX for a signup to automatically perform a login).

Tip: Try running `rake notes` to see all the items that have been marked as `TODO` in the comments.

<h3 id="current_user">Current user</h3>

Since we need to authenticate each request and to do so we have to read the `user_id` out of the `session` object, let's consider making a few helper methods to do so.

A login for a user is when we set a unique identifier for a user in their session, aka `session[:user_id] = user.id`, so they are able to maintain their logged-in state by sending that unique piece of data back to us each time they send a new request. What is we could have a helper method that does this for us and caches the value of the  `current_user` for the duration of each request?

```ruby
class ApplicationController < ActionController::Base
  def current_user
    @current_user ||= session[:user_id] && User.find_by_id(session[:user_id])
  end
  helper_method :current_user #make it available in views
end
```

The above method defines `@current_user` if it is not already defined. The way the `&&` operator works is that it will keep evaluating if `session[:user_id]` is defined and then set `@current_user` to whatever the last item evaluated is; in this case it would be `User.find_by_id(session[:user_id])`, so the user itself.

The method `current_user` in is very useful for:

* **Conditional views** based on the `current_user`'s state
	* I.e. is a login or logout button displayed in the nav_bar?
* **Authorization** to view resources
	* I.e. test if `current_user` is the user who's resources are being CRUDed.

<h3 id="logout">Logout</h3>

In the `session#destroy` controller action set the `session[:user_id]` to `nil` and redirect to your `root_path`

## More Notes

###Refactor

* Using [`has_secure_password`](http://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html#method-i-has_secure_password) can magically refactor a lot of our password storing logic in the User model. Try it out and see if the tests still pass...

![success!](http://i.giphy.com/b6oC7bEdJD26c.gif)


###Authorization

You can secure your routes with a `:before_action` [filter](http://guides.rubyonrails.org/action_controller_overview.html#filters). This code can be run before any `controller#action` in the application. For example let's say a user must be logged before they can see all the `posts` in the application. You could create a private method in the application controller with a name such as `require_login`.

application_controller.rb

```ruby
class ApplicationController < ActionController::Base
 
  private
 
  def require_login
    if !current_user
      redirect_to root_path #halt's request cycle
    end
  end
end
```

Now use a `before_action` to run the `require_login` method before any actions the `PostController` will perform.

posts_controller.rb

```ruby
class PostController < ApplicationController
  before_action :require_login
  def index
  end
end
```

Checkout the `only` & `except` [options](http://guides.rubyonrails.org/action_controller_overview.html#highlighter_858492) for more versatility.

<h3 id="flash_msgs">Bonus: Adding Flash Messages</h3>

We want to notify users of any errors. Rails patterns use a [flash hash](http://guides.rubyonrails.org/action_controller_overview.html#the-flash) to do so.

session_controller.rb

```ruby
class SessionsController < ApplicationController
  def new
  end

  def create
    user_params = params.require(:user)
    user = User.confirm(user_params[:email], user_params[:password])
    if user
      # use our handy login method
      login(user)
      redirect_to user_path(user.id)
    else
       # Flash an error message
      flash[:error] = "Failed To Authenticate. Please try again."
      redirect_to "/login"
    end

  end
end
```

Install the [twitter-bootstrap-rails](https://github.com/seyhunak/twitter-bootstrap-rails) gem and require it by running `rails generate bootstrap:install static`

We can then render these message and style them with a class that matches their name on all pages.

application.html.erb

```html+erb
<!-- include this just above the yield -->
<%= bootstrap_flash %>

<%= yield %>

```

Now you need to pass in flash messages to your views! For example my user controller could look like this.

user_controller.rb

```ruby
class UsersController < ApplicationController
  before_action :require_login, only: :index

  # to illustrate a before_action
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      #login user
      session[:user_id] = @user.id
      #redirect to user#show w/ success message
      redirect_to @user, flash: { success: "Successfully signed up!" }
    else
      #there was an error, go back to signup page & display message
      redirect_to sign_up_path, flash: { error: @user.errors.full_messages.to_sentence }
    end
  end

  def show
    @user = current_user
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
```