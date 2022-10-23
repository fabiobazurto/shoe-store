class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.integer :point_of_refill, default: 100
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
