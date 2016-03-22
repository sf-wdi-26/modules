def validIP?(address)
  # code here
  valid = true
  address_split = address.split('.')

  valid = false if address_split.length < 4 || address_split.length > 6
  address_split

  address_split.each do |num, i|
  	num = num.to_i
	valid = false if num < 0 || num > 255
  end
  return valid
end