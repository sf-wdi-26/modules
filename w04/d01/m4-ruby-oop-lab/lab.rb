class Animal 
	attr_accessor (:type)
	def initialize(type)
		@type = type
	end
	def eat (food)
		p "i eats #{food}"
	end
	def sleep
		@state = "sleeping"
	end
	def wake 
		@state = "awake"
	end
end

fooRat = Animal.new("fooRat")
fooRat.eat("goldBarz")
fooRat.sleep

class Person < Animal
	@@count = 0
	attr_accessor :age, :gender, :name
	def initialize age, gender, name
		@type = "person"
		@age = age
		@gender = gender
		@name = name
		@@count+=1
	end
	def eat (food)
		if food == "person"
			p "no eat that"
		else 
			p "#{food} is yum"
		end
	end
	def greet 
		p "yo i'm #{name}, and im a #{gender} of #{age}"
	end
end

fooHead = Person.new(666, "herm", "foopHead")