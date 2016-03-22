class UsersController < ApplicationController
  before_action :require_login, only: :index

  # def index
  # end

  def new
    @user = User.new
  end

  def show
  end

  def create
    user = User.new(user_params)
    if user.save
      redirect_to user #magick
    else
      render :new
    end
     # TODO: once the controller is implemented don't forget to also sign the user in
  end 

  def update
  end

  def edit
  end

  def delete
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end
