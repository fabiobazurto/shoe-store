# literal

# StoresController
# Responsible to response Store information
class StoresController < ApplicationController
  def index
    @stores = Store.includes(:store_products)
    render json: @stores.to_json(include: { store_products: { include: :product } })
  end
end
