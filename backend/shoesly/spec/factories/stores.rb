FactoryBot.define do
  factory :store do
    name { "Store1" }
    has_stock_problems { false }
    active { true }
  end
end
