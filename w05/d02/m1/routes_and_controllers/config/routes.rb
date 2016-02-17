Rails.application.routes.draw do
  get '/about_us', to: 'home#about_us'
  get '/jobs', to: 'home#jobs'
end
# 