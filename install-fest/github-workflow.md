#Github Workflow

These directions will guide you through the proper way to consume our class repo and create your own version.

![](https://octodex.github.com/images/octobiwan.jpg)

##Objectives

You should be able to...

* Have your own copy of our class repo to annotate
* Update changes from the main repo into your repo
* Save your repo remotely with Github

##Terminology

* **Repository** is a collection of files that are tracked together by the git protocol, also known as a repo

* **Remote vs Local** is the distinction between files (a repo) that live in a server, such as one managed by Github, and one that lives directly on your machine

* **Fork** is a remote repo that is a direct copy of another remote repo

* **Clone** is to bring down all files from a remote repo to your machine locally

* **Remote** is an alias in your Github repo that points to a remote Github repo via its web address

* **Origin** is the standard naming convention for *your* remote repo

* **Upstream** is the standard naming convention for the *original* remote repo


##What's happening

![GitHub Workflow](http://i.imgur.com/ti2p75d.png)


##Steps

###Log into Github

* [Login](https://github.com/login) here

###Fork our class repo

* Navigate to the [class repo](https://github.com/sf-wdi-21/notes)
* Fork it! 

![Fork](http://i.imgur.com/L9ABwKh.png)

* When prompted "Where should we fork this to?" click on your user profile


###Clone your forked version

* You should now be on your forked version
* Clone it down to your machine by copying the text inside the `clone URL` textbox (both ssh & https URLs work)

![](http://i.imgur.com/EhKvKsu.png)

* In your terminal navigate to your `~/dev` folder and enter the command `git clone <YOUR CLONE URL HERE>`

* You can now `ls` and be able to see a folder `notes` (feel free to rename the folder if you wish)

* `cd` into notes and once inside type `git remote -v` this should list two aliases named `origin` that both point to your remote fork.

###Point to Upstream

* Lastly we need to give your local repo an alias that points to the original version of the class room notes (the one that we will update daily)
* To do this you must type `git remote add upstream git@github.com:sf-wdi-21/notes.git` this command adds a remote alias named upstream which points to the URL given.
* Type `git remote -v` again to make sure this was done correctly. You should now see 4 alias, 2 origin and 2 upstream

##Final Workflow

Once your setup you can follow these steps to:

* Source the latest updates from us
* Add your own files to the repo
* Save your version of your repo remotely to your Github account

###Sourcing updates

Now at any time you can grab any changes we make to the original class notes repo by being inside your local notes repo and typing `git pull upstream master`. If you get an error make sure you have added & committed any changes first.

###Making changes

Get in the habit of creating a new directory or file to store your notes or work for that day.

**Do not directly edit our notes**, otherwise you will probably have to deal with merge conflicts.

###Committing Changes

* You can use `git add .` to add all changes you made in your repo
* Use `git commit -m "<your message>"` to describe what changes you made

Finally, push your changes to your remote fork to have them remotely saved.

`git push origin master`

HOORAH!

![](https://octodex.github.com/images/nyantocat.gif)
