json.array!(@tweets) do |tweet|
  json.extract! tweet, :id, :content
  json.url tweet_url(tweet, format: :json)
end
