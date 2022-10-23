class StoreProduct < ApplicationRecord
  belongs_to :store
  belongs_to :product

  validates :stock, numericality: { greather_than:  Inventory::DEFAULT_MINIMUM_STOCK }
end
