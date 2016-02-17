class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t| #t stands for table
      t.string :name #add a name attribute of type string to the table
      t.string :photo_url #also add a photo_url attribute of type string
      t.string :nationality # finally add a nationality attribute of type string
      t.timestamps #this will add timestamps for time created and time updated automagically!
    end
  end
end
