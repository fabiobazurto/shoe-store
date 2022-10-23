require 'rails_helper'

RSpec.describe StoresController, type: :controller do

  describe 'GET #index Json' do
    before do 
      stores = create_list(:store, 10)
      products = create_list(:product, 10)
      
      create(:store_product, store: stores.first, product: products.first )
      get :index, format: :json      
    end
    
    it 'shows stores' do
      total_stores = Store.all.count
      expect(response.status).to be(200)      
      expect(json.size).to eq(total_stores)
    end
    
    it 'shows stores with store_products' do
      total_stores = Store.all.count
      store_with_children = json.first
      expect(response.status).to be(200)
      expect(store_with_children.has_key?('store_products')).to be(true)
    end 
  end
end
