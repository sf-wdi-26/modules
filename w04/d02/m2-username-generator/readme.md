## TDD – Username Generator Lab

Let's practice our Ruby & TDD skills!

Your goal is to write a ruby function that generates a username. It should behave in the following way:

| inputs | output |
|:------|:-------|
| James Bond 2007 | jbond07 |
| John Doe 1978 | jdoe78 |
| John Doe 1978 | jdoe78_1 |
| John Doe 1978 | jdoe78_2 |
| Chico Marx 1887 1 | seller-cmarx87 |
| Harpo Marx 1888 2 | manager-hmarx88 |
| Groucho Marx 1890 3 | admin-gmarx90 |

### Testing

We'll use `rspec`  to outline our objectives AND test our code as we go... hooray for Test Driven Development (TDD)!

`rspec` is available as a Ruby gem, so start in your terminal by running the command:

``` bash
gem install rspec
```

You might get an error here, but we believe in you. Fix it.

### Test Driven Development -- Red, Green, Refactor.

To run the tests type `rspec` into the command line

> You do **not** need to read the below instructions. The tests will provide all the errors needed to lead you down the same path...

#### Level 1
Create a function called `format_name` that accepts a user's first_name and last_name and returns a lowercase string that joins the first character of the first_name with the last_name.

Create a function called `format_year` that accepts a four digit integer representing the year (`YYYY`) and parses out the last two digits of the year and returns a a _string_ (`"YY"`).

Create a function called `build_username` that takes a user's first_name, last_name, and birth_year, and returns a string with the following format: it starts with the first letter of the first_name, followed by the last_name, followed by the last two digits of the birth_year.


#### Level 2
Create a function called `check_privilege` that takes a level (integer) and returns the corresponding user_type (string).  
* Allocate privilege using the following table:
    * 0 -> "user" (default privilege level)
    * 1 -> "seller"
    * 2 -> "manager"
    * 3 -> "admin"

Create a function called `user_type_prefix` that takes a level (integer) and returns the corresponding prefix, e.g. "admin-", "manager-", "seller-". See the tests for more details.

Update your `build_username` function to use prefixes. It should now accept a privilege_level (in addition to the other parameters), and tack it on to the beginning of the username (e.g. "seller-jdoe78"). See the tests for more details.

#### Level 3
Create a function called `generate_username` that has four arguments (first_name, last_name, birth_year, privilege_level) and returns a _unique_ username. Come up with a simple way to store usernames as you create them. 

Stretch: If a username already exists, append "_1". Then, increment the counter each time you reuse the username (e.g. "jdoe78", "jdoe78\_1", "jdoe7\_2", "bbunny60", "bbunny60\_1").

#### Bonus — Command-line inputs
* Interactively get user input from the command line and output a username to the console. I.e. when I run `ruby username.rb` I should be prompted (from the command line) for my name, birth year, etc.
* Accept command line arguments (e.g. `ruby username.rb john doe 1980`) and output a username to the console.

