require 'rails_helper'

RSpec.describe InventoryController, type: :controller do
  describe 'POST #transfer' do
    before(:each) do
      @product = create(:product)
      @store_with_low_stock = create(:store, has_stock_problems: true)
      @another_store_with_low_stock = create(:store, has_stock_problems: true)      
      @store_full_stock = create(:store, has_stock_problems: false)
      create(:store_product, store: @store_with_low_stock, product: @product, stock: 8)
      create(:store_product, store: @another_store_with_low_stock, product: @product, stock: 8)      
      create(:store_product, store: @store_full_stock, product: @product, stock: 65)
    end

    it 'returns http success' do
      post :transfer, params: { source: @store_full_stock.id,
                                destination: @store_with_low_stock.id,
                                product_id: @product.id,
                                units: 20 }
      expect(response).to have_http_status(:success)
    end

    it 'transfers units from a store to another' do
      post :transfer, params: { source: @store_full_stock.id,
                                destination: @store_with_low_stock.id,
                                product_id: @product.id,
                                units: 20 }
      expect(@store_with_low_stock.check_stock_of(@product.id)).to be > 8
      expect(@store_full_stock.check_stock_of(@product.id)).to eq(45)
    end
    
    it 'returns unprocesable entity' do
      post :transfer, params: { source: @another_store_with_low_stock.id,
                                destination: @store_with_low_stock.id,
                                product_id: @product.id,
                                units: 20 }
      expect(response.status).to eq(422)
      expect(@store_with_low_stock.check_stock_of(@product.id)).to eq(8)
    end    
  end
end
