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

    outcome
  end
end
