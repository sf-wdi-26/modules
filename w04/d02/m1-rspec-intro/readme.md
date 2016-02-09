#Testing

### Objectives
*After this lesson, students will be able to:*

- Compare and contrast the cost/benefit of TDD
- Use `rspec` to impliment a TDD approach to writing code

Test Driven Development (TDD) originated in the agile community and is a practice that many developers take very seriously.

##TDD Philosophy — "Red, Green, Refactor"

* Write a single test, describing an aspect of the program. Run the test and watch it fail _we're seeing **RED**._
* Write "just enough" code, the simplest possible, to make the test pass and _turn them **GREEN**_. 
* We're ready to _stop and **REFACTOR**_!

![TDD circle](https://leantesting-wp.s3.amazonaws.com/resources/wp-content/uploads/2015/02/tdd-circle-of-life.png)


|Pros|Cons|
|---|---|
|Lower future development effort & cost|Higher initial development effort & cost|
|Higher code quality||
|Improved design of code||

##Makeup of Test

**What is a test?** This is a valid question, but it's less complicated that you might assume. A test is simply a predefined assumption or expectation.

A test comprises of these main components:

* Setup
* Execution
* Validation

Let's image we will write a test for method we are about to impliment, `add_two_numbers`. The following is an example of a test written in psuedo-code:

```
#Setup
first_num = 7
second_num = 3

#Execution
output = add_two_numbers(7,3)

#Validation (returns true or false)
output == 10
```

The example code above is representative of how any testing works. In this simplified example we see that we must first **setup** a contrived scenario by defining `first_num` and `second_num`. Once our method is executed we *test* that the **output** matches our **expectation**. If it does, our tests pass!

##Testing Tips

* DO run the tests frequently
* DO read the output carefully
* DON'T write too many tests at once
* DON'T write tests that are too large

##Implementation

For Ruby, we'll use a tool called `rspec`  to write & run tests. Today we won't have to worry about writing them, but will have some practice passing them.

`rspec` is available as a Ruby gem, so start in your terminal by running the command:

``` bash
gem install rspec
```

##Challenge — Valid IP

Write a method that takes a string as input. It should return true if
the input is a valid IPv4 address (ie. anything between `0.0.0.0` and
`255.255.255.255` is valid).

Run `rspec` in this directory to see failing tests (make sure you have installed the gem first). Once you see failing tests write code in the `ip_address_validator.rb` file to make them pass.

Make sure your code is
* DRY
* Named semantically
* Small
