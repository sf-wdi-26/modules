class Comedian
  def initialize options = {}
    @name = options[:name]                                         # OK
    @opener = options[:opening_joke] || "How you feelin tonight?!" # GOOD
    @closer = options.fetch(:closing_joke, "Goodnight!")           # GREAT
  end
end

mitch = Comedian.new({
  name:   "Mitch Hedberg",
  opener: "I haven’t slept for 10 days, because that would be too long",
  closer: "I got an ant farm; them fellas don’t grow shit."
})

steven = Comedian.new({
  name:   "Steven Wright",
  opener: "I used to be a narrator for bad mimes",
  closer: "I have a map of the United States. It’s actual size."
})

generic_comic = Comedian.new

p mitch
p steven
p generic_comic
