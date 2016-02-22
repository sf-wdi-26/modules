# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Testing with RSpec


| Objectives |
| :---- |
| Identify various aspects of Rails apps that we might want to test.|
| Test model methods using rspec-rails. |
| Test controller actions using rspec-rails. |

## Resources

| Resource | Description |
| :-------- | ----------- |
| [RSpec matchers](https://www.relishapp.com/rspec/rspec-expectations/v/3-0/docs/built-in-matchers) | Reference for RSpec |
| [shoulda](http://matchers.shoulda.io/docs/v3.1.0/) | Magic for model specs |
| [FactoryGirl](https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md) | Factories let you build up objects quickly for your specs |
| [DatabaseCleaner](https://github.com/DatabaseCleaner/database_cleaner) | Cleans out your database before each test. |


## rspec-rails

RSpec is a testing gem for Ruby. It helps us write tests that sound like user stories or planning comments ("This method does..."). <a href"https://github.com/rspec/rspec-rails" target="_blank">rspec-rails</a> is a testing framework specifically for Rails. We'll use rspec-rails to test our models and controllers.

rspec-rails helps us implement the four-phase testing methodology (with setup, exercise, verify, and tear down steps). Here's what a simple rspec-rails test might look like:

```ruby
#
# spec/models/pet_spec.rb
#

RSpec.describe Pet, type: :model do

  # setup
  let(:pet) { Pet.create({name: "Morocco", age: 3}) }

  describe "#is_cute?" do
    it "returns true" do
      expect(pet.is_cute?).to be true   #exercise and verify   
    end
  end

  # teardown is automatic

end
```

### Adding rspec-rails to Your Project

1. Add rspec-rails to your Gemfile in the `development` and `test` groups:

  ```ruby
  #
  # Gemfile
  #
   group :development, :test do
     gem 'rspec-rails'
   end
  ```

1. Run `bundle install` (or `bundle` for short) in your terminal so that rspec-rails is actually added to your project.

1. Add tests to your rails project using the terminal:

  ```bash
  $ rails g rspec:install
  ```

  This creates a `spec` directory. It also adds `spec/spec_helper.rb` and `.rspec` files that are used for configuration. See those files for more information.

1. Configure your specs by going into the `.rspec` file and removing the line that says `--warnings` if there is one.  Consider adding `--format documentation`

1. If you created models before adding rspec-rails, create a spec file for each of your models. (This is only necessary if you had a model created before you installed rspec-rails.)

  ```bash
  $ rails g rspec:model MODEL_NAME
  ```

### Running RSpec-rails Tests

Typical spec folders and files for a Rails project include:

* `spec/models/user_spec.rb`
* `spec/controllers/users_controller_spec.rb`
* `spec/views/user/show.html.erb_spec.rb`
* `spec/features/signup_spec.rb`

> As you can see spec files should always be named ending in `_spec.rb`.

To run **all** test specs, go to the terminal and type `rspec` or `bundle exec rspec`.

To run only a specific set of tests, type `rspec` and the file path for the tests you want to run in the terminal:

  ```bash
  # run only model specs
  rspec spec/models

  # run only specs for `ArticlesController`
  rspec spec/controllers/articles_controller_spec.rb

  # To run a single spec inside a file:
  rspec spec/controllers/articles_controller_spec.rb -e 'is cute'
  ```

  Run `rspec` from the terminal now to check that your install worked.

## Writing rspec-rails Tests
<!--
### Cool Tool: FFaker

FFaker generates random data for us! We can use it to create fake data for tests. For example, `FFaker::Name.first_name` generates a fake first name. `FFaker::Internet.email` generates a fake email. To see more that FFaker can do, check out the [FFaker docs](http://www.rubydoc.info/github/emmanueloga/ffaker/FFaker) and/or this [handy FFaker cheatsheet](http://ricostacruz.com/cheatsheets/ffaker.html).

**Bonus:** Later, we can use FFaker to seed our database (but hold off!).

  ```ruby
  #
  # db/seeds.rb
  #

  25.times do
    Student.create(
      first_name: FFaker::Name.first_name,
      last_name: FFaker::Name.last_name,
      grade: rand(9..12),
      yearbook_quote: FFaker::HipsterIpsum.sentence(5)
    )
  end
  ```

  ```bash
  $ rake db:seed
  ```

To add FFaker to your project, put it in your Gemfile for the development and test groups:

  ```ruby
  #
  # Gemfile
  #
  group :development, :test do
    gem 'ffaker'
  end
  ```

Then run `bundle` in your terminal. -->

### Anatomy of a test

A test should consist of:

1. Setup: Using `let` or `before` or `subject` to preconfigure data that is needed to test or set the test subject.  You can keep your code dry by re-using these across multiple tests.

1. Definition: A name for the test.  This should use an active verb.  Ex. "is invalid without an email".  This should also be descriptive enough that it can be used as **documentation** by other developers.  _This isn't strictly one of the 4 parts of a test, but it IS really important_, future developers will like you if your test name tells them what the code should do.

1. Exercise: Any code inside the test-block itself that makes a change to the object under test prior to validating that it behaves properly.

1. Validation: Finally validating that the Object Under Test has behaved in the expected way.  This usually involves using `expect`.

1. Tear-down: Cleaning up after the test.  Usually this is handled for you by RSpec and may include using DatabaseCleaner to wipe the testing database.

#### Setup

```ruby
  subject(:cat) { Animal.new(type: 'cat', name: 'fluffy') }
  let(:food) { Food.new }

  before do
    food.flavor = 'chicken gizzards'
  end
```

* Use `subject` to define the item being tested.
* Use `let` to set variables for a test.  
  * These are reset when each test starts!
* Use `before` to set more complex pre-test steps.
  * before blocks can use variables defined in `let`
* `let!`, `subject`, `before` and `after` blocks are all run for each test.  Values in them are reset for each test.   

#### Definition & Exercise

```ruby
  describe '#eat' do
    it "isn't hungry after eating" do
      cat.eat(food)
```

* Use active verbs for test names.
 * use 'it is valid' rather than 'it should be valid'
 * `it` is for individual tests, divide the tests up using `describe` and `context`
* Exercise can be any extra logic that needs to be run to combine the **object under test** with its **collaborators**, or to run the method you are testing.  
 * Sometimes exercise and validation are on the same line; that's ok.

#### Validation

This is where we make **assertions** about the **object under test** and its behavior.

```ruby
   expect(cat.hungry?).to be false
```
* In general test one and only one thing per test.  
  * However that can sometimes mean using more than one `expect`.

#### Tear down

Usually RSpec and other gems we might be using take care of most of this for us. However in some cases you may need to do some sort of cleanup.

```ruby
after do
  cat.pet
end
```

### What do we test?

* isolation
* behavior
* by component

We try to test each component or piece independently.  Code written following good object-oriented practices and with concerns well separated is far easier to test.  So, if we write our tests before our code our tests can help to push us to write good object-oriented code and to separate concerns.  
Break tests into test files for each class.  And then groups of tests for each method in the class.  And then possibly into `context`s for specific conditions under which the method may be used.  (E.g. with valid or invalid data, with strings or integers, when x=true or x=false).  

Isolate tests from each other.  One test should **never depend on another test** to change or prepare something.  Each test should be able to run on its own without the others.  

Test behavior.  

### Testing Models

We can set up a `User` instance for testing purposes with `User.create` or we can use a tool called FactoryGirl to do this for us.

  ```ruby
  #
  # spec/models/user_spec.rb
  #
  require 'rails_helper'
  RSpec.describe User, type: :model do

    subject(:user) { FactoryGirl.create(:user) }

  end

  #
  # spec/factories/user.rb
  #
  FactoryGirl.define do
    factory :user do
      sequence(:email) { |n| "g#{n}@g.com" }
      password "testtest"
      first_name 'Jon'
      last_name 'Snow'
      confirmed_at { Time.now }
    end
  end
  ```

> It's also possible to use FFaker to generate some data either for `User.create` or for FactoryGirl.  But FFaker can run into intermittent issues because it can produce duplicate data or results you may not expect.  Therefore many people prefer to use FactoryGirl `sequence`.  

Assuming we've already set `user` with first and last names, we can then test that the `full_name` method correctly calculates the full name:

  ```ruby
  #
  # spec/models/user_spec.rb
  #
  require 'rails_helper'
  RSpec.describe User, type: :model do

    ...

    describe "#full_name" do
      it "joins first name and last name" do
        expect(user.full_name).to eq("#{user.first_name} #{user.last_name}")
      end
    end

  end
  ```

<!-- exclude if model validations not studied -->
#### shoulda

Previously we talked about model validations.  You'll probably want to test these.  The `shoulda` gem provides an easier way to write specs for common model validations.

Validating that a Post is invalid without a title:

```ruby
    it "is invalid without a title" do
      post = Post.new(description: 'foo')
      expect(post.valid?).to be false
    end
  end

```

The same test as above written using shoulda:
```ruby
it { should validate_presence_of(:title) }
```

* shoulda also provides test helpers for controllers
* See the [shoulda docs](http://matchers.shoulda.io/docs/v3.1.0/)

### Testing Controllers

To test authentication, we need to define a `current_user` before each of our tests run. The last line in this `before do` block --   `allow_any_instance_of(...` -- creates a "stub" (fake) `current_user` instance method for the ApplicationController and sets it up as a getter that only ever returns the `@current_user` we made with ffaker.

  ```ruby
  #
  # spec/controllers/articles_controller_spec.rb
  #
  require 'rails_helper'
  RSpec.describe ArticlesController, type: :controller do

    let(:signed_in_user) { FactoryGirl.create(:user) }

    before do
      # stub a method on ApplicationController
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(signed_in_user)
    end

    describe "GET #index" do
      it "assigns @articles" do
        all_articles = Article.all
        get :index
        expect(assigns(:articles)).to eq(all_articles)
      end

      it "renders the :index view" do
        get :index
        expect(response).to render_template(:index)
      end
    end

    describe "GET #new" do
      it "assigns @article" do
        get :new
        expect(assigns(:article)).to be_instance_of(Article)
      end

      it "renders the :new view" do
        get :new
        expect(response).to render_template(:new)
      end
    end

    describe "POST #create" do
      context "success" do
        it "adds new article to current_user" do
          articles_count = signed_in_user.articles.count
          post :create, article: {title: "blah", content: "blah"}
          expect(signed_in_user.articles.count).to eq(articles_count + 1)
        end

        it "redirects to 'article_path' after successful create" do
          post :create, article: {title: "blah", content: "blah"}
          expect(response.status).to be(302)
          expect(response.location).to match(/\/articles\/\d+/)
        end
      end

      context "failure" do
        it "redirects to 'new_article_path' when create fails" do
          # create blank article (assumes validations are set up in article model for presence of title and content)
          post :create, article: { title: nil, content: nil}
          expect(response).to redirect_to(new_article_path)
        end
      end
    end
  end
  ```

### Testing Views

We could use a tool like <a href="https://github.com/jnicklas/capybara" target="_blank">Capybara</a> to test client-side views and interactions (e.g. does clicking on "Logout" do what we expect?). We won't cover view testing today, though!

## Maintaining tests

It's extremely important to maintain tests (especially on the master branch) and deal with test failures as soon as possible.  If tests are left to languish until there are many failures, your tests lose their value and become untrustworthy.  The investment your team made in testing is wasted.

Intermittent test failures are the bane of many a developers life.  It's important to track these down too...they're usually caused by a poorly written test.

## Other Tools

* [FactoryGirl](https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md)
* [shoulda](http://matchers.shoulda.io/docs/v3.1.0/) - Make Rails model tests super easy.
* [DatabaseCleaner](https://github.com/DatabaseCleaner/database_cleaner) - used to wipe the database before each test, not necessary on smaller apps as tests are rolled-back.

## Challenges


Fork and clone the <a href="https://github.com/sf-wdi-25/testing_inventory" target="_blank">rspec_testing app</a>. Follow the instructions there.