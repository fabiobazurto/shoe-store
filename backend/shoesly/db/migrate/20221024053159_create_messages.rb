class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :body
      t.boolean :delivered

      t.timestamps
    end
  end
end
