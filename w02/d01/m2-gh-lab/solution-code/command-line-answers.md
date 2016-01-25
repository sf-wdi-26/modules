
## Part 1 Solution

> Note: Use the solution from part one to help you through the solution to part two (the steps to complete each part are nearly identical aside, from the JavaScript needed)

- With partner1 driving:
  1. create a folder called `git-and-github-practice`
  2. within that folder create the following files `index.html`, `style.css`, and `script.js`
  3. copy and paste the code from the [starter-code](starter-code) from the `index.html` and `style.css` into your own
  4. add `// javascript to be added` to your `scripts.js` file
  5. initiate a git repository, commit your changes, and push to GitHub

```bash
mkdir git-and-github-practice
cd git-and-github-practice
touch index.html style.css script.js
# add '// javascript to be added' in your text editor to script.js
git init
git add .
git commit -m 'my first commit'
# create a repo on GitHub
git remote add origin YOUR-URL
git push -r origin master
```
![](https://i.imgur.com/LRzl2UD.png)

![](https://i.imgur.com/x4dQjWo.png)

- With partner2 driving, from their computer:

  1. get your partners link to the GitHub repository and fork and clone it
  2. open the project and make the 'Join Our Mailing List' button prompt the user for an email
  3. commit your changes and submit a pull request back to partner1




In your terminal:
```bash
git clone YOUR-COPIED-URL
cd git-and-github-practice
subl .
```

In script.js
```javascript

 window.onload = function(){

      var button = document.getElementById("button-yellow");

      button.addEventListener("click", function(event){
        prompt('What is your email?')
      });

    }
```

In your terminal:
```bash
git add .
git commit -m 'YOUR COMMIT MESSAGE'
gitp push origin master
```
![](https://i.imgur.com/w0V904t.png)

![](https://i.imgur.com/lOGl5cg.png)

- With partner1 driving:
  - merge the pull request from the GitHub interface

![](https://i.imgur.com/Xv40XIk.png)
