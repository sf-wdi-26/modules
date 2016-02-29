# Express Routing Lab

## Introduction

We've now seen how to write an app with Node and Express from scratch, so let's apply this concept again by creating another RESTful API using Express.

A kid has come to you with an idea for an API to keep track of his candies.  You love candies!  So, you accept his proposal. You will create a resource `Candy` and use the kid's candy "data" to populate and post to your database. Check the additional resources at the bottom of this document to get some JSON data to add to your app as well, as well as some cURL examples to make sure your app works as expected!

## Exercise

#### Requirements

- Create an Express app from scratch
- This app will only respond to JSON; it is just an API, so don't worry about the views
- The resource `Candy` should be accessible via the endpoint `/candies` and be RESTful
- Implement `index`,`show`, `create`, `update`, and `destory` functionality

**Bonus:**
- Handle wrong responses with appropriate HTTP status and responses (404, 500, 422)
- Add some validations for `edit` and `update`


#### Deliverable

An example app can be found in `solution-code`.

Once you spin up your local server, look below at the cURL commands with the expected responses we want you to test on this app once you've finished building;  the HTTP status should always be 2XX.




`Index` cURL Request

```bash
curl -XGET http://localhost:3000/candies

```

  - Expected Response
  ```json
  [{"id":1,"name":"Chewing Gum","color":"Red"},{"id":2,"name":"Pez","color":"Green"},{"id":3,"name":"Marshmallow","color":"Pink"},{"id":4,"name":"Candy Stick","color":"Blue"}]
  ```
---

`Show` cURL Request

```bash
curl -XGET http://localhost:3000/candies/3

```

  - Expected Response
  ```json
  {"id":3,"name":"Marshmallow","color":"Pink"}
  ```
---

`Create` cURL Request

```bash
curl -XPOST -H "Content-Type: application/json" -d '{"id": 5, "name":"Jelly Belly","color":"Orange"}' http://localhost:3000/candies

```

  - Expected Response
    ```json
    {"id":5,"name":"Jelly Belly","color":"Orange"}
    ```

---


- A second `Index`cURL Request

  ```bash
  curl -XGET http://localhost:3000/candies
  ```

  - Expected Response

  ```json

  [{"id":1,"name":"Chewing Gum","color":"Red"},{"id":2,"name":"Pez","color":"Green"},{"id":3,"name":"Marshmallow","color":"Pink"},{"id":4,"name":"Candy Stick","color":"Blue"},{"id": 5, "name":"Jelly Belly","color":"Orange"}]
  ```
  > Note: The new record is sent back !

---

`Update` cURL Request

```bash
curl -XPUT -H "Content-Type: application/json" -d '{"name":"Marshmallows","color":"white"}' http://localhost:3000/candies/3
```

---

Another `Index` Request

```bash
curl -XGET http://localhost:3000/candies
```

  - Expected Response

  ```json

  [{"id":1,"name":"Chewing Gum","color":"Red"},{"id":2,"name":"Pez","color":"Green"},{"name":"Marshmallows","color":"white"},{"id":4,"name":"Candy Stick","color":"Blue"}]
  ```
  The record corresponding to the ID passed in the first request has been updated.

---

`Update` cURL Request

```bash
curl -XDELETE http://localhost:3000/candies/2
```

  - Expected Response
    ```json
    {"message":"deleted"}
    ```

---

`Index` cURL request, again!

```bash
curl -XGET http://localhost:3000/candies
```

 - Expected Response

  ```json

  [{"id":1,"name":"Chewing Gum","color":"Red"},null,{"id":3,"name":"Marshmallow","color":"Pink"},{"id":4,"name":"Candy Stick","color":"Blue"}]
  ```

> Note: The record corresponding to the ID passed in the first request has been deleted.



## Additional Resources

- [Curl Manual](http://curl.haxx.se/docs/manual.html)
- [ExpressJS documentation](http://expressjs.com/4x/api.html)
- [In-class starter code with solutions branches](https://github.com/sf-wdi-26/candies/tree/master)
- [More advanced solution](solution-code)
