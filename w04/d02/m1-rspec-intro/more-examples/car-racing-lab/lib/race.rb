require_relative 'car'


class Race

	def initialize
		car1 = Car.new
		car2 = Car.new
		randomSpeed = rand(1..100)
		car1.accelerate(randomSpeed)
		car2.accelerate(randomSpeed)
		@cars = []
		@cars.push(car1, car2)
	end

	def cars
		@cars
	end

	def winner
		car1.speed > car2.speed ? cars[0] : cars[1]
	end

	def loser 
		 winner == cars1 ? cars[1] : cars[0]
	end
end
