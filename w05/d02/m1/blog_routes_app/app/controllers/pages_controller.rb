class PagesController < ApplicationController
  layout "sidebar"

  def faqs
    render template: "pages/faqs", layout: "sidebar"
  end
  def terms_and_conditions
    render template: "pages/terms_and_conditions"
  end
  def team
    render template: "pages/team"
  end

end