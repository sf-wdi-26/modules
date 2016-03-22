class Student
	attr_accessor(:first_name, :last_name)
	def initialize
		p "I'm ready to get some knowledge"
	end
	def greeting
		p "Hi my name is #{first_name} #{last_name}"
	end
end

