class Song < ActiveRecord::Base
  def to_s
    "#{title} (#{published_in})"
  end
end
