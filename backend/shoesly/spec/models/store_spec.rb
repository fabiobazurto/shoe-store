require 'rails_helper' # loads helper

RSpec.describe Store, type: :model do
  it 'creates a store' do
    result = create(:store)
    expect(result.save!).to be_truthy
  end
end
