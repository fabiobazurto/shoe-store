class InventoryController < ApplicationController

  before_action :set_transfer, only:[:transfer]
  
  # POST Transfer
  # Responsable to receive params to transfer product units from a source store to a destination
  #
  def transfer
    if(Inventory.transfer_products_to_store(source: @store_source,
                                         destination: @store_destination,
                                         product: @product,
                                         units: @units))
      
      render json:  @stores.to_json(include: { store_products: { include: :product } })
    else
      respond_with_unprocessable_entity
    end
    
  end

  private
  def transfer_params
    params.permit(:source, :destination, :product_id, :units)
  end

  def set_transfer
    @store_source = Store.find(transfer_params[:source]) || respond_not_found
    @store_destination = Store.find(transfer_params[:destination]) || respond_not_found
    @product = Product.find(transfer_params[:product_id]) || respond_not_found
    @units = transfer_params[:units].to_i
  end

end
