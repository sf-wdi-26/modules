class AddArtistLastNameToSongTable < ActiveRecord::Migration
  def change
    add_column :songs, :artist_last_name, :string
  end
end
