# HTTParty

## Made for simple APIs

HTTParty is a fast and simple way to read public or basic cookie APIs.

HTTParty does not support OAuth!

---

## Reading an API

```ruby
response = HTTParty.get('http://reddit.com/.json')
response['data']['children'].first['data']['title']
```

---

## Using Classes

HTTParty allows you to create your own API class.

---

## Stack Exchange

```ruby
class StackExchange
  include HTTParty
  base_uri 'api.stackexchange.com'

  def initialize(service='stackoverflow', page=1)
    @options = { query: {site: service, page: page} }
  end

  def questions
    self.class.get("/2.2/questions", @options)
  end

  def users
    self.class.get("/2.2/users", @options)
  end

  # try others: badges, info, privileges
end
```

---

## Other APIs

* http://whoismyrepresentative.com/api/