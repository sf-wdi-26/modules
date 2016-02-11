require 'sinatra'
################################
# 7 RESTful routes for Artists #
################################

# COLLECTION
# index
get '/artists' do
  @artists = Artist.all
  erb(:"artists/index")
end

# new
get '/artists/new' do
  erb(:"artists/new")
end

# create
post '/artists' do
  new_artist = Artist.create(params[:artist])
  redirect("/artists/#{new_artist.id}")
end

# MEMBER
# show
get '/artists/:id' do
  @artist = Artist.find(params[:id])
  # @songs  = Song.where(artist_id: @artist.id)
  erb(:"artists/show")
end

# edit
get '/artists/:id/edit' do
  @artist = Artist.find(params[:id])
  erb(:"artists/edit")
end

# update
post '/artists/:id' do
  artist = Artist.find(params[:id])
  artist.update(params[:artist])
  redirect("/artists/#{artist.id}")
end

# destroy
post '/artists/:id/delete' do
  artist = Artist.find(params[:id])
  artist.destroy
  redirect('/artists')
end
