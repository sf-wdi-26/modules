Rails.application.routes.draw do
  get 'sessions/new'

  get 'sessions/create'

  root to: 'welcome#index'
  #login form 
  get '/login', to: 'sessions#new'
  #login 
  post '/sessions', to: 'sessions#create'
  #sign up
  get '/signup', to: 'users#new', as: 'sign_up'
  resources :users
end
