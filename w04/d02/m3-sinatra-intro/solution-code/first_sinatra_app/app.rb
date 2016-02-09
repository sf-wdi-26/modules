class FirstSinatraApp < Sinatra::Base

  get "/" do
    erb "WDI is awesome."
  end

  get "/songs" do
    @songs = ["Fly Me To The Moon", "New York, New York", "Luck Be A Lady"]
    erb :'songs'
  end

end
