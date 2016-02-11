class AddPhoneNumberToManagers < ActiveRecord::Migration
  def change
    add_column :managers, :phone_number, :integer
  end
end
