class Tunr < Sinatra::Base

  # RESTful Manager Controller Actions
  # index
  get '/managers' do
    @managers = Manager.all
    erb(:"managers/index")
  end

  # new
  get '/managers/new' do
    @manager = Manager.new
    erb(:"managers/new")
  end

  # create
  post '/managers' do
    @manager = Manager.new(params[:manager])
    if @manager.save
      redirect("/managers/#{@manager.id}")
    else
      erb(:"managers/new")
    end
  end

  # show
  get '/managers/:id' do
    @manager = Manager.find(params[:id])
    erb(:"managers/show")
  end

  # edit
  get '/managers/:id/edit' do
    @manager = Manager.find(params[:id])
    erb(:"managers/edit")
  end

  # update
  put '/managers/:id' do
    @manager = Manager.find(params[:id])
    if @manager.update_attributes(params[:manager])
      redirect("/managers/#{manager.id}")
    else
      erb(:"managers/edit")
    end
  end

  # delete
  delete '/managers/:id/delete' do
    @manager = Manager.find(params[:id])
    if @manager.destroy
      redirect('/managers')
    else
      redirect("/managers/#{@manager.id}")
    end
  end

end
