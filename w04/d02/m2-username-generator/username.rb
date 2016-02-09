# Make sure to run the tests in your /spec folder
# Run `rspec /spec/username_spec.rb` to get started.
def format_name(first, last)
	if first.empty? || last.empty?
		return nil
	end
	first = first.gsub(/\s+/, "")
	last = last.gsub(/\s+/, "")
	full_name = (first[0]+last).downcase
end

def format_year(year)
	@year = year
	year_string = year.to_s
	if year_string.length != 4 
		return nil
	end
	year_array = year_string.split('')
	two_dig = year_array[2] + year_array[3]
end

def build_username(first, last, year)
	full = format_name(first, last)
	formatted_year = format_year(year)
	user_name = full + formatted_year
end

# def check_priviledge(i, user_type)
# 	if i = 1 
# 		user_type = "seller"
# 	else if i = 2
# 		user_type = "manager"
# 	else if i = 3
# 		user_type = "admin"
# 	else 
# 		user_type = "user"
# 	end	
# end