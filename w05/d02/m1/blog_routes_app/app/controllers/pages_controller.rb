class PagesController <ApplicationController
  def faqs
    render text: "dont ask stupid questions"
  end
  def terms_and_conditions
    render text: "its free, you are the product"
  end
  def team
    render text: "be the Me in Team"
  end

end