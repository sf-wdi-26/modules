class SessionsController < ApplicationController
  def new
    #TODO: render a login view
  end

  def create
    #call the User#confirm method
    if User.confirm(params[:email], params[:password])
      # this creates the session, logging in the user
      session[:user_id] = user.id
      #redirect to the show page
      redirect_to user_path(user.id)
    else
      #there was an error logging the user in
      redirect_to login_path
    end
  end

  def destroy
    #TODO: logout the current user
    session[:user_id] = nil
  end
end
