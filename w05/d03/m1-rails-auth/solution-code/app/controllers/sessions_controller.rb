class SessionsController < ApplicationController
  def new
    redirect_to current_user if current_user 
  end

  def create
    #pass in array that user_params returns as arguments using a splat
    user = User.confirm(params[:email], params[:password])
    if user
      #this creates the session, logging in the user
      session[:user_id] = user.id
      #redirect to the show page
      redirect_to user_path(user.id)
    else
      #there was an error logging the user in
      redirect_to login_path
    end
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_path
  end
end
