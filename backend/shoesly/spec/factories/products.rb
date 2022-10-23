FactoryBot.define do
  factory :product do
    name { "MyString" }
    point_of_refill { 1 }
    active { false }
  end
end
