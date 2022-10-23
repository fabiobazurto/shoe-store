class Product < ApplicationRecord
  has_many :stores, through: :store_products
end
