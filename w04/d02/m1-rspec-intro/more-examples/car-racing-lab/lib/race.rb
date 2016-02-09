require_relative 'car'

class Race

  def initialize
    car1 = Car.new
    car2 = Car.new
    car1.accelerate(rand(1..100))
    car2.accelerate(rand(1..100))
    @cars = []
    @cars.push(car1, car2)
  end

  def cars
    @cars
  end

  def winner
  end

end
