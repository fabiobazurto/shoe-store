class AddUnitsToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :total_units, :integer, default: 0
  end
end
