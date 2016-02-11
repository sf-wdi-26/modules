class RenamePhoneNumberToCellPhoneNumberInManagers < ActiveRecord::Migration
  def change
    rename_column :managers, :phone_number, :cell_phone_number
  end
end
