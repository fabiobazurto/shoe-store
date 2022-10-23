class CreateStores < ActiveRecord::Migration[6.1]
  def change
    create_table :stores do |t|
      t.string :name, null: false
      t.boolean :has_stock_problems, default: false
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
