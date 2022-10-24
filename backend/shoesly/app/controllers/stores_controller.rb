# literal

# StoresController
# Responsible to response Store information
class StoresController < ApplicationController
  def index
    @stores = Store.includes(:store_products)
    json_docs = @stores.map{|store|
      { id: store.id,
        name: store.name,
        has_stock_problems: store.has_stock_problems,
        store_products: store.store_products.map{ |products|
          { id: products.product_id, name: products.product.name, stock: products.stock }
        }
      }
    }
    render json: json_docs # @stores.to_json(include: { store_products: { include: :product } })
  end
end
