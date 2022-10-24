class ProductsController < ApplicationController
  def index
    @products = Product.all.order(:name)
    render json: @products
  end
end
