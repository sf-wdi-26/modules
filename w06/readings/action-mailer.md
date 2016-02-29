# ActionMailer

---

## What is ActionMailer?

ActionMailer is a standard Rails library for sending emails very easily.

---

## Creating a Mailer

We want to send an email to the user when they post their article.

```bash
rails generate mailer article_mailer new_posting
```

```bash
create  app/mailers/article_mailer.rb
create  app/mailers/application_mailer.rb
invoke  erb
create    app/views/article_mailer
create    app/views/layouts/mailer.text.erb
create    app/views/layouts/mailer.html.erb
create    app/views/article_mailer/new_posting.text.erb
create    app/views/article_mailer/new_posting.html.erb
invoke  test_unit
create    test/mailers/article_mailer_test.rb
create    test/mailers/previews/article_mailer_preview.rb
```

---

## Adding a subject

```ruby
# app/mailers/article_mailer.rb

mail to: "to@example.org", subject: "Great article!"
```

---

## Changing the body

Mailers use views for the body of the html and text formats.

```erb
# app/views/article_mailer/new_posting.html.erb

<h1>ArticleMailer new_posting</h1>

<p>
  <%= @greeting %>,
  find me in app/views/article_mailer/new_posting.html.erb
</p>
```

---

## Adding information about the article

We can add the article title to the email body.

```erb
# app/views/article_mailer/new_posting.html.erb

<p>You posted a great article called <%= @article.title %>, nice job!</p>
```

```ruby
# app/mailers/article_mailer.rb

  def new_posting(article)
    @greeting = "Hi"
    @article = article
```

---

## Sending the email

```ruby
# app/controllers/articles_controller.rb

    if @article.save
      ArticleMailer.new_posting(@article).deliver_now
      redirect_to @article
    else
```

---

## Previewing mail

Rails creates a preview object for us, so that we can see how the mailer would look.

```ruby
# test/mailers/previews/article_mailer_preview.rb

# Preview all emails at http://localhost:3000/rails/mailers/article_mailer
class ArticleMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/article_mailer/new_posting
  def new_posting
    ArticleMailer.new_posting Article.first
  end

end
```

---

## Changing the deliver to

```ruby
# app/mailers/article_mailer.rb

mail to: @article.user.email, subject: 'Great Article!'
```

---

## linking to the article

You can use `link_to` just like in other views.

However, when using links in email, you must use \*\_url instead of \*\_path for your routes!

```erb
# app/views/article_mailer/new_posting.html.erb

<p>
  You can view it by
  <%= link_to "clicking here", article_url(@article) %>
</p>
```

---

## Using ActionMailer with ActiveJob

If ActiveJob is configured, using it to send email is very simple!

We change `deliver_now` to `deliver_later`, like so.

```ruby
ArticleMailer.new_posting(@article).deliver_later
```

---

## Bonus
# Using Mailcatcher

---

## Install mailcatcher

`mailcatcher` is a very simple and useful used for capturing development emails and showing them in a nice browser interface

```ruby
# don't ever put mailcatcher in your Gemfile!
> gem install mailcatcher
> mailcatcher

# Mailcatcher has a web interface:
> open http://localhost:1080
```

---

## Configuring Mailcatcher

Rails needs to be told to use Mailcatcher's address and port so when it sends emails, mailcatcher can catch it.

```ruby
# environments/development.rb
config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = { :address => "localhost",
  :port => 1025 }
```