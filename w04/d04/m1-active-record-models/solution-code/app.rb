class Tunr < Sinatra::Base

  # General route actions
  get '/' do
    erb :home
  end

  get '/about' do
    erb :about
  end

  # RESTful Artist Controller Actions
  # index
  get '/artists' do
    @artists = Artist.all
    erb(:"artists/index")
  end

  # new
  get '/artists/new' do
    @artist = Artist.new
    erb(:"artists/new")
  end

  # create
  post '/artists' do
    @artist = Artist.new(params[:artist])
    if @artist.save
      redirect("/artists/#{@artist.id}")
    else
      erb(:"artists/new")
    end
  end

  # show
  get '/artists/:id' do
    @artist = Artist.find(params[:id])
    erb(:"artists/show")
  end

  # edit
  get '/artists/:id/edit' do
    @artist = Artist.find(params[:id])
    erb(:"artists/edit")
  end

  # update
  put '/artists/:id' do
    @artist = Artist.find(params[:id])
    if @artist.update_attributes(params[:artist])
      redirect("/artists/#{artist.id}")
    else
      erb(:"artists/edit")
    end
  end

  # delete
  delete '/artists/:id/delete' do
    @artist = Artist.find(params[:id])
    if @artist.destroy
      redirect('/artists')
    else
      redirect("/artists/#{@artist.id}")
    end
  end

end
