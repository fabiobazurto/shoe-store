Rails.application.routes.draw do
  post 'inventory/transfer'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :stores, only: [:index], format: :json
  resources :products, only: [:index], format: :json
end
