Rails.application.routes.draw do
  get    "/post"          , to: "post#index"
  post   "/post/new"      , to: "post#create"
  get    "/post/new"      , to: "post#new"
  get    "/post/:id/edit" , to: "post#edit"
  get    "/post/:id"      , to: "post#show"
  put    "/post/:id"      , to: "post#update"
  delete "/post/:id"     , to: "post#destroy"
end
