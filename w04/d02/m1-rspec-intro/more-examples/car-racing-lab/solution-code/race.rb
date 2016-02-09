require_relative 'car'

class Race
  
  def initialize
    # initialize two new cars
    @cars = [Car.new, Car.new]
    # generate random speeds for each car
    random = Random.new
    @cars[0].accelerate(random.rand(100))
    @cars[1].accelerate(random.rand(100))
  end

  # cars getter method
  def cars
    @cars
  end

  # declare a winner
  def winner
    # winner is the car with the greatest speed
    cars[0].speed > cars[1].speed ? cars[0] : cars[1]
  end

  def loser
    # loser is the car that's not the winner
    winner == cars[0] ? cars[1] : cars[0]
  end
end