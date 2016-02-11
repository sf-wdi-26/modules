require 'sinatra'
################################
# 7 RESTful routes for Managers #
################################

# COLLECTION
# index
get '/managers' do
  @managers = Manager.all
  erb(:"managers/index")
end

# new
get '/managers/new' do
  erb(:"managers/new")
end

# create
post '/managers' do
  new_manager = Manager.create(params[:manager])
  redirect("/managers/#{new_manager.id}")
end

# MEMBER
# show
get '/managers/:id' do
  @manager = Manager.find(params[:id])
  # @managers  = Manager.where(manager_id: @manager.id)
  erb(:"managers/show")
end

# edit
get '/managers/:id/edit' do
  @manager = Manager.find(params[:id])
  erb(:"managers/edit")
end

# update
post '/managers/:id' do
  manager = Manager.find(params[:id])
  manager.update(params[:manager])
  redirect("/managers/#{manager.id}")
end

# destroy
post '/managers/:id/delete' do
  manager = Manager.find(params[:id])
  manager.destroy
  redirect('/managers')
end
