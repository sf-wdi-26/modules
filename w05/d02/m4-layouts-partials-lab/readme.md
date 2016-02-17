# Layouts, Views, & Partials Lab

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

Now that we've seen how to play with views and partials, you'll now create an app that will use partials and redirects.  Don't worry about styling, positioning, or models/databases, you're going to focus on how layouts, views, and partials work together with ```params```, ```yield```, and ```render```  to display the correct view to the user.


## Exercise

#### Requirements

- Create a rails app from scratch
- This app should have a controller called "static" with an "index" method
- The index method should render different templates based on the params:
	- When the param "page" is `1`, the template rendered should be "app/views/static/index_1.html.erb"
	- When the param "page" is `2`, the template rendered should be "app/views/static/index_2.html.erb"
	- Otherwise the template rendered should be "app/views/static/index.html.erb"
  - Test this with: ```/static/index?page=1``` and ```/static/index?page=2```
- The controller should also have a method page that renders the template `page` inside a layout called `page.html.erb`
- Both layouts should look different but they should render a _partial_ called `footer.html.erb` at the bottom.

**Bonus:**
- Scaffold a resource and try to render the collection on index using partial (take a look at the rails guide below)
- Get creative and add multiple different partials on each different layout
- Add some styles!

#### Deliverable

<p align="center">
<img src='http://s4.postimg.org/nubkfo1wt/Screen_Shot_2015_07_18_at_4_04_43_AM.png'
</p>

<p align="center">
<img src='http://s8.postimg.org/rqujplyh1/Screen_Shot_2015_07_18_at_4_04_56_AM.png'
</p>

<p align="center">
<img src='http://s21.postimg.org/vdnstz5o7/Screen_Shot_2015_07_18_at_4_05_21_AM.png'
</p>

<p align="center">
<img src='http://s11.postimg.org/biqgjmc3n/Screen_Shot_2015_07_18_at_4_05_35_AM.png'
</p>



## Additional Resources

- [Rails guides Layout and rendering](http://guides.rubyonrails.org/layouts_and_rendering.html)
