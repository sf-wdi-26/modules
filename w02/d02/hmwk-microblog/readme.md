# ![GA logo](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Microblog Lab

## Summary

Imagine you want to let people write really short public blog posts. The homepage of your microblog app should be a list of these micro-posts with a form to add a new one. We don't have a backend yet, so we won't be worrying about login, users, followers, and all of that good stuff quite yet. The new posts won't even stay on the page when we refresh. But we can create new blog posts, have them added to the page!

Something like this:

![alt tag](https://github.com/sf-wdi-22-23/Project-0-Solution/blob/master/screen_shot.png)

Skills:

- Use Git to save your progress
- Use JavaScript to access the DOM
- Use HTML forms to get input from the user
- Style your blog using CSS. Use responsive design!

2. Start by creating a folder with index.html, style.css and app.js files and initializing a git repo.
3. Your HTML page should have a list in it that will display the posts. It can be empty, with JS adding posts, or have some dummy posts in it to start.
4. Your JS will hold an array of posts that it appends to the HTML list.
5. When your user clicks submit, your JS should handle taking the content of the form and putting it in that array, and updating the DOM.
3. Make frequent commits and pushes. You should commit every time you add a new feature, and it is working! A feature can be something as small as adding a little style.

## Stretch Challenges (optional)

* Add a count of how many posts have been posted that updates every time a new post is created.
* Save `posts` to [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) or [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
* Add comments to posts
* Sort posts by order created OR alphabetically
