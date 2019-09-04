Rails.application.routes.draw do
  devise_for :users
  root to: 'messages#index'
  resources :users, onry: [:edit, :update]
  resources :groups, onry: [:new, :create, :edit, :update]
    resources :messages, onry: [:index, :create]
end