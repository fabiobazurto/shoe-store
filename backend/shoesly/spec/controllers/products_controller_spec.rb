require 'rails_helper'

RSpec.describe ProductsController, type: :controller do

  describe 'GET #index Json' do
    before do 
      products = create_list(:product, 10)
      get :index, format: :json      
    end
    
    it 'shows stores' do
      total_stores = Product.all.count
      expect(response.status).to be(200)      
      expect(json.size).to eq(total_stores)
    end
    

  end
end
