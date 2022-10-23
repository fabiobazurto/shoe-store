FactoryBot.define do
  factory :product do
    name { Faker::Company.name }
    total_units { 100 }
    point_of_refill { 20 }
    active { true }
  end
end
