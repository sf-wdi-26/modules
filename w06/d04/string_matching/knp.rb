class KMP
  attr_reader :results
  def initialize string, pattern
    @string = string
    @pattern = pattern
    @string_length = string.length
    @pattern_length = pattern.length
    @table = kmp_table
    @results = []
    kmp
  end

  def kmp_table
    # Creates an array to hold our table.
    # The array is initialized with 0 as its first element because it cannot be a prefix of itself.
    prefix_table = [0]
    # Match_count tells us how many matches we have found that match the beginning of our string (the prefix).
    match_count = 0
    # lets increment, shall we?
    (1...@pattern_length).each do |pattern_counter|
      # If we found matches previously but the current one is not a match..
      if (match_count > 0 && (@pattern[match_count] != @pattern[pattern_counter]))
        # set current match to:
        match_count = prefix_table[match_count -1] || 0
      end
      # If we found a new match, increment up our match_count
      if @pattern[match_count] == @pattern[pattern_counter]
        match_count += 1
      end
      # Puts the match_count in the prefix table
      prefix_table[pattern_counter] = match_count
    end
    p prefix_table
    return prefix_table
  end

  def kmp
    string_counter, pattern_counter, potential_match_index = 0, 0, 0
    string_length = @string.length
    prefix_table_length = @table.length

    # While we didn't reach the end of the string
    while string_length - potential_match_index > prefix_table_length - 1 do
      # While the we didn't reach the end of the pattern and theres a match
      while pattern_counter < prefix_table_length - 1  && @string[string_counter ] == @pattern[pattern_counter] do
        # increment up both
        string_counter += 1
        pattern_counter += 1
      end
      # Got a complete match?
      if pattern_counter >= prefix_table_length - 1
        # Put that thing in th@results!
      @results << potential_match_index
      end
       # If this is the beginning of a potential match?
      if @table[pattern_counter - 1] !=nil && @table[pattern_counter - 1] > 0
        # reset the potential_match_index to the string_counter minus the number of chars we've matched in the prefix
        potential_match_index = string_counter - @table[pattern_counter -1]
        # or, if the string counter equals the potential match index
      else
        if string_counter == potential_match_index
          string_counter += 1
        end
        # set potential_match_index to the string_counter
        potential_match_index = string_counter
      end
      # If we're not on the first letter in pattern, in which case we won't get to skip ahead..
      if pattern_counter > 0
        # reset pattern counter by what it returns in the prefix table
        pattern_counter = @table[pattern_counter -1]
      end
    end
    @results
  end
end

KMP.new("cozacocacolacococacolacocacoladjejdeicocacola", "cocacola")
# tests
puts "KNP"
puts '*' * 40

# match
test_str     = "cozacocacolacococacolacocacoladjejdeicocacola"
test_pattern = "cocacola"
should_be    = [4, 14, 22, 37]
test         = KMP.new test_str, test_pattern

p test.results
raise "This is wrong" unless test.results == should_be

# no match

test_str2     = "How do you do? Great thanks!"
test_pattern2 = "potato"
should_be2    = []
test2         = KMP.new test_str2, test_pattern2

p test2.results
raise "This is wrong" unless test2.results == should_be2
