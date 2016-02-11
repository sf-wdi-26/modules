class AddAddressToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :address, :string
  end
end
