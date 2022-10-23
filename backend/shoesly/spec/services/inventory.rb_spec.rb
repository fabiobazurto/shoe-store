require 'rails_helper' # loads helper

RSpec.describe Inventory do
  it 'transfers products to store' do
    product = create(:product)
    store_with_low_stock = create(:store, has_stock_problems: true)
    store_full_stock = create(:store, has_stock_problems: true)
    create(:store_product, store: store_with_low_stock, product: product, stock: 8)
    create(:store_product, store: store_full_stock, product: product, stock: 65)

    Inventory.transfer_products_to_store(source: store_full_stock,
                                         destination: store_with_low_stock,
                                         product: product,
                                         units: 20)
    expect(store_with_low_stock.check_stock_of(product.id)).to be >8
    expect(store_full_stock.check_stock_of(product.id)).to eq(45)
  end

  it 'transfers products to store from a low stock' do
    product = create(:product)
    store_with_low_stock = create(:store, has_stock_problems: true)
    store_full_stock = create(:store, has_stock_problems: true)
    create(:store_product, store: store_with_low_stock, product: product, stock: 8)
    create(:store_product, store: store_full_stock, product: product, stock: 15)

    Inventory.transfer_products_to_store(source: store_full_stock,
                                         destination: store_with_low_stock,
                                         product: product,
                                         units: 20)
    expect(store_with_low_stock.check_stock_of(product.id)).to eq(8)
    expect(store_full_stock.check_stock_of(product.id)).to eq(15)
  end
end
