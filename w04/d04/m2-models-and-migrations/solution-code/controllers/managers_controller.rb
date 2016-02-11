class Tunr < Sinatra::Base

  # RESTful Manager Controller Actions
  # index
  get '/managers' do
    @artists = Manager.all
    erb(:"artists/index")
  end

  # new
  get '/artists/new' do
    @manager = Manager.new
    erb(:"artists/new")
  end

  # create
  post '/artists' do
    @manager = Manager.new(params[:manager])
    if @manager.save
      redirect("/artists/#{@manager.id}")
    else
      erb(:"artists/new")
    end
  end

  # show
  get '/artists/:id' do
    @manager = Manager.find(params[:id])
    erb(:"artists/show")
  end

  # edit
  get '/artists/:id/edit' do
    @manager = Manager.find(params[:id])
    erb(:"artists/edit")
  end

  # update
  put '/artists/:id' do
    @manager = Manager.find(params[:id])
    if @manager.update_attributes(params[:manager])
      redirect("/artists/#{manager.id}")
    else
      erb(:"artists/edit")
    end
  end

  # delete
  delete '/artists/:id/delete' do
    @manager = Manager.find(params[:id])
    if @manager.destroy
      redirect('/artists')
    else
      redirect("/artists/#{@manager.id}")
    end
  end

end
