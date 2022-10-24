class Inventory
  DEFAULT_MINIMUM_STOCK = 20.freeze

  # transfer between stores doesn't change product total units
  def self.transfer_products_to_store(source:, destination:, product:, units:)
    source_product = source.store_products.where(product: product).first
    destination_product =  destination.store_products.where(product: product).first
    outcome = false

    if source_product.stock> Inventory::DEFAULT_MINIMUM_STOCK
      source_product.stock -= units
      destination_product.stock +=units

      # Transaction
      ActiveRecord::Base.transaction do
        outcome = source_product.save && destination_product.save
        raise ActiveRecord::Rollback unless outcome
      end
    end
    source_product.reload
    destination_product.reload
#    Message.new(  body:"{\"store\": \"#{source.name}\",\"model\": \"#{product.name}\", \"inventory\": \"#{source_product.stock}\" }"  , delivered: false).save
 #   Message.new(  body:"{\"store\": \"#{destination.name}\",\"model\": \"#{product.name}\", \"inventory\": \"#{destination_product.stock}\" }"  , delivered: false).save

     Websocket.send({store: source.name, model: product.name, inventory: source_product })
     Websocket.send({store: destination.name, model: product.name, inventory: destination_product })    
    outcome
  end
end
