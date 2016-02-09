# Car Race

###Challenge

Build out code in the `lib` directory that simulates a car race!

###Steps

* run `rspec` in the main directory to see your failing tests
* READ THE ERRORS and methodically pass each one by one
* Once you get the errors into passing tests, see if you can refactor (remember: "red, green, refactor")

Once the tests are passing you should have:

- a Car class that can accelerate to a certain speed
- a Race class that when instantiated instantiates two cars and accelerates each to a random speed between 0-100
- an instance method on the Race class called `winner` that returns the winning car (determined by a greater speed)
- an instance method on the Race class called `loser` that returns the losing car (determined by a lesser speed)

& you will be able to run:

```ruby
race = Race.new
race.winner
# => <Car ...>
race.loser
# => <Car ...>
```
