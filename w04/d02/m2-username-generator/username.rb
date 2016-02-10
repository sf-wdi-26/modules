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

$user_types = ["user", "seller", "manager", "admin"]

def check_privilege(type=0)
  if type >= 0
    $user_types[type] || $user_types.last
  else
    $user_types.first
  end
end