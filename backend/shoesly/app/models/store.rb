class Store < ApplicationRecord
  has_many :store_products
  has_many :products, through: :store_products

  def check_stock_of(product_id)
    stock_product = store_products.where(product_id: product_id).first
    stock_product.stock
  end
end
