class StaticController < ApplicationController
  def index
    if params[:page] == "1"
      render :index_1 and return
    elsif params[:page] == "2"
      render :index_2  and return
    end
  end

  def page
    render layout: "page"
  end
end
