#Nested Resources & Associations in Rails

##Learning Objectives
by the end of today, you should be able to...
- Nest resources RESTfully
- Create a `has_many` association in rails
- Represent and store other relationships (aka favorites)

<img src="http://i.giphy.com/ZXXNaKynKfrzi.gif" alt="cute otters">

---

##Setup

Let's get started by working from our [rails-review app](https://github.com/sf-wdi-14/rails-review) that we've been riffing off of this week.

Either `clone` or `pull` for the latest version.

Don't forget to `bundle` & `rake db:migrate`

**Current Goal:** Create a `users#index` page that displays all users and links out to each user's `article#index` page.

---

##Users Index

Application should have a `users#index` page.

*Add an index route in your routes.rb*
```ruby
resources :users, only: :index
```

*Generate a users controller with an index action*
```bash
rails g controller users index
```

*Fetch all users from in the index action and pass them to the view*
```ruby
@users = User.all
```

*Display your users in an unordered list*
```ruby
<ul>
  <% @users.each do |user| %>
    <li><%= user.email %></li>
  <% end %>
</ul>
```
---
##Seeding the Database

Database should have seed data.

*In your seeds.rb write the code that will delete all your users and then create 10 fake ones*

```ruby
User.destroy_all

10.times do |i|
  User.create(
    email: "user#{i}@example.com",
    password: "password",
    password_confirmation: "password"
  )
end
```

*Run the seed file*
```bash
rake db:seed
```

---
##User has many Articles

Articles should belong to a User and each User should have many Articles.

*In your user model declare a user has many articles and ensure if a user is deleted so will all the articles associated with them*
```ruby
has_many :articles, dependent: :destroy
```

*In your article model declare a article belongs to a user*
```ruby
belongs_to :user
```
---

##Add a Foreign Key to Articles

Articles should reference the Users table with a foreign key. 

*Create a new migration to work with*
```bash
rails g migration add_user_id_to_articles
```
*The migration should add a `user_id` column to our articles table*
```ruby
add_column :articles, :user_id, :integer
```
*Migrate the changes*
```bash
rake db:migrate
```

---

##Test the relationship

Users should be able to access their associated articles.

*In rails console, query a user instance for its articles*
```bash
user = User.first
user.articles
=> #<ActiveRecord::Associations::CollectionProxy []>
```
If the last line does not throw an error, but rather returns an empty array then it is working properly.

*Add an article to this user's instance*

```bash
user.articles << Article.create(
  title: "Doctors Recommend Getting 8 Centuries of Cryosleep",
  body: "Doctors at Stanford University issued a..."
)
```
Check `user.articles` again to make sure the article was associated with user correctly. If it was, woohoo!

---

##Nesting the routes

Articles should be nested under Users RESTfully.

(Note: you should never have nesting more than one levels deep)

*Nest your articles routes inside your users routes*
```ruby
resources :users, only: :index do
  resources :articles
end
```
*Check to see how your routes have been modified*
```bash
rake routes
```

---

##Link to Each Article Index

A User's emails should link to their respective `article#index` page.

*On your `user#index` make the users' emails link out to their personalized `article#index` page*

```html
<ul>
  <% @users.each do |user| %>
    <li><%= link_to user.email, user_articles_path(user) %></li>
  <% end %>
</ul>
```
*Delete all the content in your `article/index.html.erb`*

For the moment you shouldn't see any articles displayed on the page.

---

##Modify Article Index Page

Article Index page displays only the articles associated with a specific user

*Modify your `article#index` to pass the view not all the articles, but only those of the user we're nested under*
```ruby
@user = User.find(params[:user_id])
@articles = @user.articles
```
Accessing the params to pull out the user's id will determine which articles we surface.

*Display these articles in your associated view, `articles/index.html.erb`*
```html
<ul>
  <% @articles.each do |article| %>
    <h3><%= article.title %></h3>
    <p><%= article.body %></p>
  <% end %>
</ul>
```
---

##Favoriting — Models

Users can favorite Articles

*Create a new Favorites model that will create a many to many associated between Users & Articles*
```bash
rails g model favorite
```
*In the favorite model declare that it belongs to Users & Articles*
```ruby
belongs_to :user
belongs_to :article
```

---

##Favoriting — Models pt 2

*Declare that each Article has many favorites*
```ruby
  has_many :favorites
```

*Do the same as above in the User model. Then declare that we can access these articles through a method called `favorite_articles` that returns favorited articles*
```ruby
  has_many :favorites
  has_many :favorite_articles, through: :favorites, source: :article
```
This is a complex relationship, don't worry if it overwhelming at first.

---

##Favoriting — Migrations

Database should have a favorites join table that represents the M2M relationship of users that have favorited articles.

*In the migration generated with the Favorite model add references to both the users & articles tables*
```ruby
t.references :user
t.references :article
``` 
*Migrate your database*
```bash
rake db:migrate
```
---

##Favoriting an Article

A User model should be able to favorite articles

*In the Rails console, test the favorites relationship is working. This should not throw an error.*
```bash
user = User.first
user.favorite_articles
```
*Have a user favorite an article. Let's have the first user favorite the first article.*

```ruby
user = User.first
article = Article.first
user.favorite_articles << article
```

---

##To Recap
Today we learned how to...

- Nest resources RESTfully
- Create relationships between tables in our database that Active Record can leverage
- Use join tables to represent more complex relationships, such as favorites

---

##Further Reading

- [Entity Relationship Diagram](http://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)
- Rails Guide: [Active Record Associations](http://guides.rubyonrails.org/association_basics.html)
- Stack Overflow: [Post](http://stackoverflow.com/questions/7021026/ruby-on-rails-how-to-model-a-user-favorite-model#answers) on Favoriting
- Tealeaf: [Polymorphic Associations](http://www.gotealeaf.com/blog/understanding-polymorphic-associations-in-rails), ie comments on comments.

---
