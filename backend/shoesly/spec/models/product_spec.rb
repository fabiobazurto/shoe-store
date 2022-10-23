require 'rails_helper' # loads helper

RSpec.describe Product, type: :model do
  it 'creates a valid product' do
    result = create(:product)
    expect(result.save!).to be_truthy
  end
end
