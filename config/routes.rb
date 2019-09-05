Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, onry: [:edit, :update]
  resources :groups, onry: [:new, :create, :edit, :update] do
    resources :messages, onry: [:index, :create]
  end
end