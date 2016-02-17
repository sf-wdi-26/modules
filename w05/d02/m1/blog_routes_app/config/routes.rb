Rails.application.routes.draw do
  resources :posts
  get '/faqs', to: 'pages#faqs'
  get '/team', to: 'pages#team'
  get '/terms_and_conditions', to: 'pages#terms_and_conditions'
end


