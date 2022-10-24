FactoryBot.define do
  factory :message do
    body { "MyString" }
    delivered { false }
  end
end
