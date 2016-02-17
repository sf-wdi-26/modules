Rails.application.routes.draw do

  root to: "welcome#index"

  get "/login", to: "sessions#new"

  post "/sessions", to: "sessions#create"

  delete "/sessions", to: "sessions#destroy"

  get "/sign_up", to: "users#new", as: "sign_up"

  resources :users, only: [:new, :create, :show, :index]

  # handles all unknown requests and sends them home
  get "*path" => "welcome#index"

end
