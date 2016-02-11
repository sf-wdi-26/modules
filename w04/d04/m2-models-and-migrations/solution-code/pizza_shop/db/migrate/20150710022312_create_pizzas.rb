class CreatePizzas < ActiveRecord::Migration
  def change
    create_table(:pizzas) do |t|
      t.column(:name, :string)
      t.column(:sauce, :string)
      t.column(:cheese, :boolean)
      t.column(:mushrooms, :boolean)
      t.column(:extra_toppings, :string)

      t.timestamps()
    end
  end
end
