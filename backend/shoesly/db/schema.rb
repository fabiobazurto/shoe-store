# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_10_24_053159) do

  create_table "messages", charset: "utf8mb4", force: :cascade do |t|
    t.string "body"
    t.boolean "delivered"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "products", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.integer "point_of_refill", default: 100
    t.boolean "active", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "total_units", default: 0
  end

  create_table "store_products", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "store_id", null: false
    t.bigint "product_id", null: false
    t.integer "stock", null: false
    t.integer "point_of_refill", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["product_id"], name: "index_store_products_on_product_id"
    t.index ["store_id"], name: "index_store_products_on_store_id"
  end

  create_table "stores", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.boolean "has_stock_problems", default: false
    t.boolean "active", default: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "store_products", "products"
  add_foreign_key "store_products", "stores"
end
