class CreateSongsTable < ActiveRecord::Migration
  def change
    create_table :songs do |t|
       t.string :title
       t.string :duration
       t.date :year_of_release
       t.string :album_title

       t.timestamps
     end
  end
end
