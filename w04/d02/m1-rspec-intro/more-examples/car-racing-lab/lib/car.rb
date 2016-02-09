class Car
  #write Car class code here
  attr_accessor :speed
  def initialize
  	@speed = 0
  end
  def accelerate(speed)
  	@speed += speed
  end
end
