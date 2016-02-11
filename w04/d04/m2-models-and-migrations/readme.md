#Tunr

> _This is a suggested pair programming activity._

You and the people at Tunr want to add some functionality to your talent management application. You your parter get the benefit of starting with the existing application that can already CRUD artists. Now Tunr has hired you guys to also keep track of their managers and songs!

## Requirements

- Sprint 1: Create a manager class that inherits from ActiveRecord

  - For this class, create a table in your database and the corresponding forms that collect and display information about the manager's name, email, and office number.
  - Make sure that the new file is being required in your `config.ru`

- Sprint 2: Create a song class that inherits from ActiveRecord

  - For this class, create a table in your database and the corresponding forms that collect and display information about the song title, duration, year of release, and album title.

- Sprint 3:

  - Add a phone number (in addition to the existing office number) column to the manager table as an integer
  - Change the phone number column to a string
  - Rename the phone number column to "cell phone number" in the managers table
  - Remove the downloads column from the song table as an integer
  - Add a column to the song table called artist last name


- Sprint 4: make sure all is working well. Add a record for an `artist`, `manager`, and `song`:

  **Artist**:  

    - Name: Luciano Pavarotti
    - Photo URL: "http://artcreationforever.com/images/luciano-pavarotti/luciano-pavarotti-03.jpg"
    - Nationality: Italian
    - Instrument: Voice
    - Home Address: 1 Strada Roma

  **Manager**:  

    - Name: Ricky Bobby
    - Email: rbobby@gmail.com
    - Office Number: 516-877-0304  
    - Cell Phone Number: 718-989-1231

  **Song**:  
  
    - Title: The Best Song Ever
    - Duration: 3:31
    - Date of Release: 7/13/2015
    - Album Title: Best Album Ever
    - Artist Last Name: Pavarotti
 
* Actually, edit `Pavarotti`'s nationality to `Italiano`, bene!

**Bonus:**

- An artist can have many songs and a manager can have many artists: configure your app to make sure it is configured with these relationships using [official docs](http://guides.rubyonrails.org/association_basics.html). P.S. We're learning this next week.
	* _Hint: In addition to the code you have to add to the models, you'll have to add foreign keys to both the `artists` and `songs` tables._


## Starting Advice

* Use the code in `starter-code` to get started!
* Don't forget to `bundle`, `rake db:create`, `rake db:migrate`, `rackup` etc...
* [ActiveRecord Official Docs](http://guides.rubyonrails.org/active_record_basics.html)
* If you need help to incorporate the requirements below, build on what you did in the previous lesson.
* Keep an eye on your `schema.rb` file to see that your migrations are working properly!
* Think about the most appropriate datatype for each migration.
* If you get stuck, get unstuck! Advice for getting unstuck includes:
	* Not freezing up and continually to trying new things (googling, reading docs, experimenting, etc)
	* Identifing once you are stuck, as you have already tried all options you can think of
	* Honing in on your gap in knowledge b phrasing a specific question
	* Close your knowledge gap by ASKING that question to someone!

## Deliverable

A whole bunch of migrations, and your `schema.rb` file should look like this:

![](http://s29.postimg.org/4sw62q90n/Screen_Shot_2015_07_13_at_12_00_36_PM.png)

## Additional Resources

- [ActiveRecord Official Docs](http://edgeguides.rubyonrails.org/active_record_migrations.html)
- Active Record [data types](http://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/TableDefinition.html#method-i-column):
	- :boolean
	- :datetime
	- :decimal
	- :float
	- :integer
	- :references
	- :string
	- :text
	- :timestamp
- Checkout sinatra's autoreload [gem](https://rubygems.org/gems/sinatra-auto-reload/versions/0.0.6) if you're tired on constantly restarting your server.
