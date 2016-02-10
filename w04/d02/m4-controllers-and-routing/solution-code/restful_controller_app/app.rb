class RestfulControllerApp < Sinatra::Base

  # INDEX - like index.html, a list of books
  # GET "/books" - Gets all the books we have
  get "/books" do
    # some code here
  end

  # NEW - a page that gives us a form to make a new book
  # GET "/books/new" - Give us a form to fill out details of a new book
  get "/books/new" do
    # some code here
  end

  # CREATE - where the new form POSTs to, it does the actual creating
  # POST "/books" - Create a new book, add it to our list
  post "/books" do
    # some code here
  end

  # SHOW - show details about just one book
  # GET "/books/3" - Just get one specific book (that already exists)
  get "/books/:id" do
    # some code here
  end

  # EDIT - like NEW, this just gives us a form that will PUT/PATCH our changes
  # GET "/books/3/edit" - Give us a form to edit a book's details
  get "/books/:id/edit" do
    # some code here
  end

  # UPDATE - like CREATE, this does the actual updating
  # PUT "/books/3" - Updates a specific book
  put "/books/:id" do
    # some code here
  end

  # UPDATE - believe it not, PUT & PATCH are often the same code, so many developers skip PATCH and just have PUT
  # PATCH "/books/3" - Partially updates a specific book
  patch "/books/:id" do
    # some code here
  end

  # DESTROY - totally nukes a book from the database
  # DELETE "/books/3" - Deletes a specific book
  delete "/books/:id" do
    # some code here
  end
end
