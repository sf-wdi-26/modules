class ChangeAddressToHomeAddressInArtists < ActiveRecord::Migration
  def change
    rename_column :artists, :address, :home_address
  end
end
