FactoryBot.define do
  factory :store_product do
    store { nil }
    product { nil }
    stock { 1 }
    point_of_refill { 1 }
  end
end
