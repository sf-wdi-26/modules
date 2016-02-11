class PizzaShop < Sinatra::Base

  # INDEX - like index.html, a list of pizzas
  # GET "/pizzas" - Gets all the pizzas we have
  get "/pizzas" do
    @pizzas = Pizza.all
  end

  # CREATE - where the new form POSTs to, it does the actual creating
  # POST "/pizzas" - Create a new pizza, add it to our list
  post "/pizzas" do
    hash = {name: "Red Anchove Delight", sauce: 'red', cheese:true, mushrooms:true, extra_toppings: "anchoves"}
    @pizza = Pizza.new(hash)
    @pizza.save
  end

  # SHOW - show details about just one pizza
  # GET "/pizzas/3" - Just get one specific pizza (that already exists)
  get "/pizzas/:id" do
    @pizza = Pizza.find(params[:id])
  end

  # UPDATE - like CREATE, this does the actual updating
  # PUT "/pizzas/3" - Updates a specific pizza
  put "/pizzas/:id" do
    changes = {name: "White Anchove Delight", sauce: 'white'}
    @pizza = Pizza.find(params[:id])
    @pizza.update_attributes(changes)
  end

  # UPDATE - believe it not, PUT & PATCH are often the same code, so many developers skip PATCH and just have PUT
  # PATCH "/pizzas/3" - Partially updates a specific pizza
  patch "/pizzas/:id" do
    changes = {name: "White Anchove Delight", sauce: 'white'}
    @pizza = Pizza.find(params[:id])
    @pizza.update_attributes(changes)
  end

  # DESTROY - totally nukes a pizza from the database
  # DELETE "/pizzas/3" - Deletes a specific pizza
  delete "/pizzas/:id" do
    @pizza = Pizza.find(params[:id])
    @pizza.destroy
  end

end
