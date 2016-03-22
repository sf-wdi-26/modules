class PostController < ApplicationController 
  before_action only: [:show, :edit, :update, :destroy]
  def index
    @posts = Post.all
  end

  def show

    @post = Post.find(params[:id])
  end

  def new
     @post = Post.new
     # @post.save
  end

  def edit
  end


  def create
    post = Post.new(post_params)
    if post.save
      redirect_to '/post'
    end
  end

  def update
  end

  def destroy
    @post = Post.destroy(params[:id])
    redirect_to '/post'
  end

  private
  def post_params
    post_params = params.require(:post).permit(:name, :content)
  end
end