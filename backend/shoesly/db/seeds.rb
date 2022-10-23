# frozen_string_literal: true

Store.delete_all
Product.delete_all

['ALDO Centre Eaton', 'ALDO Destiny USA Mall', 'ALDO Pheasant Lane Mall', 'ALDO Holyoke Mall', 'ALDO Maine Mall', 'ALDO Crossgates Mall', 'ALDO Burlington Mall', 'ALDO Solomon Pond Mall', 'ALDO Auburn Mall', 'ALDO Waterloo Premium Outlets'].each do |store_name|
  Store.create(name: store_name)
end

%w[ADERI MIRIRA CAELAN BUTAUD SCHOOLER SODANO MCTYRE CADAUDIA RASIEN WUMA GRELIDIEN CADEVEN SEVIDE ELOILLAN BEODA VENDOGNUS ABOEN ALALIWEN GREG BOZZA].each do |product_name|
  Product.create(name: product_name, total_units: [10,50,100].sample, point_of_refill: 25)
end

RANDOMNESS = Array(1..7)

# For each store, I'll assign a stock on the stock
Store.all.each do |store|
  RANDOMNESS.sample.times do
    product = Product.where.not(id: store.products.pluck(:id)).first
    store.store_products.build(product: product,
                               stock: (product.total_units * 0.3).to_i,
                               point_of_refill: Inventory::DEFAULT_MINIMUM_STOCK).save
  end
end
