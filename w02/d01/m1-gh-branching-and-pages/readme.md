# Git and Github Branches and Pages

### Objectives
*After this lesson, students will be able to:*

- Create, merge and delete branches on local and remote repositories
- Deploy a project to Github Pages
- Describe how branching and merging allows for collaboration during development

### Preparation
*Before this lesson, students should already be able to:*

- Use the command line
- Use a text editor
- Explain basic git commands like init, add, commit, push, pull and clone
- Fork and clone remote repositories

## Review: Git vs GitHub and Version Control (5 mins)

#### What is the difference between Git and GitHub?

#### What is version control? A closer look:

Version control is a kind of software used to record and re-use changes (or versions) on files so that an history of the file content can be reviewed.

There are two main types of version control:

- Centralized
- Distributed

#### Centralized Version Control

Centralized version control (CVCs) has one central repository that is shared among all team members.

![Centralized Version Control](http://s17.postimg.org/3s9fr8zxr/figure1.png)


Schema from [IBM Developer works](http://www.ibm.com/developerworks/library/d-app-centric-ops/)


The main concept of a centralized system is that it works in a client and server relationship. The repository is located in one place and provides access to many clients. It’s very similar to FTP in where you have an FTP client which connects to an FTP server. All changes, users, versions of your project and information must be sent and received from this central repository.

The primary benefits of a Centralized Version Control is:

- It is easy to understand
- You have more control over users and access (since it is served from one place)
- Simple to get started

At the same time, Centralized Version Control has some drawbacks:

- Dependent on access to the server (requires internet connection)
- Hard to manage a server and backups
- It can be slower because every command connects to the server
- Branching and merging tools are difficult to use

Popular centralized version control systems (CVCSes) include:

- [Subversion](http://subversion.apache.org/)
- CVS

#### Distributed Version Control

Distributed version control systems are a newer option. In distributed version control, each user has their own copy of the entire repository, not just the files but the history as well. Think of it as a network of individual repositories.  

![Distributed Version Control](http://s17.postimg.org/3tjdko1rj/figure2.png)

Schema from [IBM Developer works](http://www.ibm.com/developerworks/library/d-app-centric-ops/)

The primary benefits of a Distributed Version Control is:

- More powerful and detailed change tracking, which means less conflicts
- No server necessary – all actions except sharing repositories are local (commit offline)
- Branching and merging is more reliable, and therefore used more often
- It’s fast

At the same time, Distributed Version Control do have some drawbacks:

- The distributed model is harder to understand
- The revisions are not incremental numbers, which make them harder to reference
- It can be easier to make mistakes until you are familiar with the model

Popular distributed version control systems include:

- [Git](http://git-scm.com/)
- [mercurial](http://www.selenic.com/mercurial/wiki/index.cgi/ProjectsUsingMercurial)
- [bzr](http://wiki.bazaar.canonical.com/WhoUsesBzr)
- [fossil](http://www.fossil-scm.org/)

#### So many commands?!

There are also a lot of commands you can use in git. You can take a look at a list of the available commands by running:

```bash
$ git help -a
```

Even though there are lots of commands, on the course we will really only need about 10.


#### Git File Lifecycle

To understand how Git works, we need to talk about the lifecycle of a Git-tracked file.

![lifecycle](https://cloud.githubusercontent.com/assets/40461/8226866/62730b4c-159a-11e5-89cd-20b72ed1de45.png)

Schema From [git-scm.com](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)

There are 4 main stages of Git version controlled file:

1. **Untracked**: The file will not be added in the next commit
2. **Staged**: Staged files have not yet been committed to memory but they are "on deck" so to speak for your next commit
3. **Unmodified**: The file has already been committed and has not changed since the last commit
4. **Modified**: You have changes in the file since it was last committed, you will need to stage them again for the changes to be added in the next commit

Once you have committed a file and it becomes "unmodified" then it's contents are saved in Git's memory.

- **Not saved in git memory**: Your file is not saved until you commit the file to Git's memory
- **Saved in git memory**: Only once you have committed a file, it becomes saved in Git's memory


## Let's use Git - Codealong (10 mins)

First, create a directory on your Desktop:

```bash
$ cd ~/Desktop
$ mkdir hello-world
```

You can place this directory under Git revision control using the command:

```bash
$ git init
```

Git will reply:

```bash
Initialized empty Git repository in <location>
```

You've now initialized the working directory.

#### The .git folder

If we look at the contents of this empty folder using:

```bash
ls -A
```

We should see that there is now a hidden folder called `.git` this is where all of the information about your repository is stored. There is no need for you to make any changes to this folder. You can control all the git flow using `git` commands.

#### Add a file

Let's create a new file:

```bash
$ touch file.txt
```

A small cross should show next to your prompt!

```bash
git:(master) ✗
```

If we run `git status` we should get:

```bash
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	file.txt

nothing added to commit but untracked files present (use "git add" to track)
```

This means that there is a new **untracked** file. Next, tell Git to take a snapshot of the contents of all files under the current directory (note the .)

```bash
$ git add . (or git add -A)
```
What is the difference?

This snapshot is now stored in a temporary staging area which Git calls the "index".

#### Commit

To permanently store the contents of the index in the repository, (commit these changes to the HEAD), you need to run:

```bash
$ git commit -m "Adds file.txt"
```

You should now get:

```bash
[master (root-commit) b4faebd] Adds file.txt
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 file.txt
```

#### Checking the log

If we want to view the commit history, we can run:

```bash
git log
```

You should see:

```bash
* b4faebd (HEAD, master) Adds file.txt
```

To exit this view, you need to press:

```bash
q
```

#### A good commit message

A good commit message is:
  - in present tense
  - describes what the commit contributes

Good: "Adds signup and login"
Good: "Creates upvote counter"
Good: "Fixes merge conflict"
Good: "Fixes typo"

Bad: "Added logout stuff"
Bad: "Upvotes!"
Bad: "conflict"
Bad: "stupid f***ing typos"
Bad: "whatever"

#### Make changes to the file

Now let's open file.txt in Sublime:

```bash
$ subl file.txt
```

Inside the file, write something.

If you press `return` in the terminal, you will now see that you have untracked changes.

Running `git status` again will show you that file.txt has been **modified**.

#### Revert to a previous commit

Let's now make a second commit.

```bash
$ git add .
$ git commit -m "Adds content to file.txt"
```

Checking `git log` will show you 2 commits with different ids:

```bash
* 6e78569 (HEAD, master) Adds content to file.txt
* b4faebd Adds file.txt
```

We can revert the file back to the first commit using it's specific commit id with:

```bash
$ git reset --soft b4faebd
```

This will do a soft reset, where the changes in the file we made are still there - the changes are staged but not committed anymore.

If we want to revert the file back and disregard any changes (dangerous!), we can use:

```bash
$ git reset --hard b4faebd
```

#### Making and cloning repositories - Codealong (10 mins)

Let's do this together:

1. Go to your Github account
2. In the top left, hit the + button and select `New repository`
![](https://help.github.com/assets/images/help/repository/repo-create.png)
3. Name your repository `hello-world`
![](https://help.github.com/assets/images/help/repository/repo-create-name.png)
4. **Initialize this repository with a README** (So that we can `git pull`)
4. Click the big green Create Repository button

We now need to connect our local Git repo with our remote repository on GitHub. We have to add a "remote" repository, an address where we can send our local files to be stored.

```bash
git remote add origin git@github.com:github-name/hello-world.git
```

#### Pushing to Github

In order to send files from our local machine to our remote repository on Github, we need to use the command `git push`. However, you also need to add the name of the remote, in this case we called it `origin` and the name of the branch, in this case `master`.

```bash
git push origin master
```

This should fail due to new files on the remote repo.

#### Pulling from Github

As we added the README.md in our repo, we need to first `pull` that file to our local repository to check that we haven't got a 'conflict'.

```bash
git pull origin master
```

Once we have done this, you should see the README file on your computer. Now you can push your changes:

```bash
git push origin master
```

Refresh your GitHub webpage, and the files should be there.


#### Cloning your first repository

Now that everyone has their first repository on GitHub, let's clone our first repository!

Cloning allows you to get a local copy of a remote repository.

Navigate back to your Desktop and **delete your hello-world repository**:

```bash
cd ~/Desktop
rm -rf hello-world
```

Now ask the person sitting next to you for their github name and navigate to their repository on github:

```bash
https://www.github.com/<github-username>/hello-world
```

On the right hand side you will see:

![clone](https://cloud.githubusercontent.com/assets/40461/8228838/dfdc57a0-15a9-11e5-90a7-6c4fa8641ae6.jpg)

Ensure that you have SSH checked and copy this url.

#### Clone their repo!

To retrieve the contents of their repo, all you need to do is:

```bash
$ git clone git@github.com:alexpchin/hello-world.git
```

Git should reply:

```bash
Cloning into 'hello-world'...
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
Receiving objects: 100% (3/3), done.
Checking connectivity... done.
```

You now have cloned your first repository!


## Forking Review

The `fork` & `pull` model lets anyone fork an existing repository and push changes to their personal fork without requiring access be granted to the source repository.

Most commonly, forks are used to either propose changes to someone else's project or to use someone else's project as a starting point for your own idea.

#### Cloning vs Forking

When you fork a repository, you make a new **remote** repository that is exactly the same as the original, except you are the owner. You can then `clone` your new fork and `push` and `pull` to it without needing any special permissions.

When you clone a repository, unless you have been added as a contributor, you will not be able to push your changes to the original remote repository.

#### Pull requests

When you want to propose a change to a repository (the original project) that you have forked, you can issue a pull request. This basically is you saying:

_"I've made some changes to your repository, if you want to include them in your original one then you can pull them from my fork!"_



## Questions

Use the internet and what you've learned today to answer the following questions with a partner:

* How do I send changes to the staging area?
* How do I check what is going to be committed?
* How do I send the commits to Github?
* How do I go back to the previous commit?
* How do I check the configuration on a specific machine?
* How does github know that I am allowed to push to a specific repo?

## Git Branching - Intro (10 mins)

Branching: How developers collaborate on projects

#### So what is branching?

Think of making a new branch like spinning up an alternate universe to play with. Each branch exists like a parallel dimension, side by side, for you to hack on.

[![git branching](https://www.atlassian.com/git/images/tutorials/collaborating/using-branches/01.svg)](https://www.atlassian.com/git/tutorials/using-branches/git-branch)

You create a branch anytime you want to work on a new feature, fix a bug, or refactor some code. Any changes you make in a branch stay on that branch, so it won't ruin any other versions you have sitting in other branches.

## Creating a Branch - Demo (10 mins)

By default, as soon as you make your first commit, you have and are on a `master` branch, and that's where your most production-ready, least experimental code lives.

Any time you're tasked with building a new feature, you make a branch named something obvious, switch to it, write some code, and then eventually merge it into master. Hopefully after someone's double-checked your work.

But let's see what this all looks like from scratch. Just watch and absorb for now, you'll practice it in a minute.

#### The normal git init process

We're working with a new dummy repo just for an example.

```bash
$ mkdir branching-is-awesome
$ cd branching-is-awesome/
$ git init
$ touch readme.md
$ git add -A
$ git commit -am 'initializes repository with an empty readme'
```

#### Suddenly, a new feature!

Now, let's say we have a feature we're about to work on. Something simple for now - let's say we want someone to know what this project is all about if they find it on Github, so we should make a readme.

Writing a readme. **That's a new feature, so we should make a new branch.**

```bash
$ git branch writing-our-readme
```

Git created it, but let's double check by listing all our branches:

```bash
$ git branch
  writing-our-readme
* master
```

Nice. The `*` tells us which one we're on (your terminal may or may not color it differently, too), and we see from the list of all our branches we have a new one. Let's switch to it so we can change some stuff without affecting `master`.

```bash
$ git checkout writing-our-readme
Switched to branch 'writing-our-readme'
```

Nice. `git checkout` is a beautiful command – you can use it to check out an old piece of history, another branch, even a specific file or a folder from an old piece of history _on_ another branch.

Now we're working in alternate universe. We can make whatever changes we need. Let's pretend we filled that sucker up with the best readme you've ever read. Obviously we should save our history with a commit, but we're still on our `writing-our-readme` branch, that hasn't changed.

```
$ git add -A
$ git commit -am 'adds incredible writing to readme'
```

#### Seeing the effects

You can really start to see this idea of parallel universes once you have a commit like this in a branch.

When we switch back and forth, like so:
```bash
$ git checkout master
$ git checkout writing-our-readme
# etc etc
```

We can actually see the changes:

<img width="740" alt="branch-readmes" src="https://cloud.githubusercontent.com/assets/25366/9808262/8bef4ffc-5812-11e5-817a-60571f97deea.png">


- On `master`, `readme.md` has no text in it.
- On `writing-our-readme`, `readme.md` is full of text.

You can literally switch between those branches in your terminal, switch back to your text editor, and see the text appear and disappear. Because in one universe, the text exists, and in another it doesn't.

### Finally, we merge

The very last step of this process is to _merge_ your changes from one branch back into your master. In a few weeks, when you work on your group projects, we'll show you how to use Github to merge changes in a more collaborative, central way.

But before Github existed, when you're working on a solo project, or maybe just because you love Terminal, let's look at how to merge your own branches back into your production-ready `master`.

We've gone through the whole process – you're starting a new feature, so you make a new branch, make a bunch of commits on that branch as you work on it, and now you're satisfied it's ready to ship.

You navigate to the branch you want to merge into – most often `master`, but it could be any branch.

```
$ git checkout master
```

And you simply tell it to `merge`:

```
$ git merge writing-our-readme
Updating 5da20b7..62b3656
Fast-forward
 readme.md | 7 +++++++
 1 file changed, 7 insertions(+)
```

This analyzes all the changes you've made on your feature branch, brings them into your `master` branch, and commits them to `master`.

And now that your `master` looks just like your `writing-our-readme` branch, you can delete it.

```
$ git branch -d writing-our-readme
Deleted branch writing-our-readme (was 62b3656).
```

Don't worry – just like most things in git, it's not gone forever. You could always checkout the last piece of history before you deleted the branch, and your branch would be there. Consider that timehopping to the past, where in the present it's gone and you don't need it.

Your most recent code ready to ship is in `master`, and you're a flipping pro.


#### Pushing Branches

Since you're getting to be experts with Github, you should know you can store branches on Github, too, not just your local git repo. While this will totally come into play on your group projects in a different way, it might be useful to you now for the simple purpose of backing up your work.

Maybe you're in the middle of a feature or a bug fix and you're just not done, but it's time for bed. Make your commits, of course, but if you've set up your repo to connect with Github, you can easily push your branch up there.

While you've seen this:

```
$ git push origin master
```

What you should know is that `origin` is simply an alias. We _could_ call it `github` if we wanted, or `zebra` or `fnarf` or `bagel`. It would then be:

```
$ git push zebra master
```

And you've now learned that `master` is just your special, default, production-ready branch. So, assuming you're using the default alias of `origin` (and not `zebra`), guess how you push a branch?

```
$ git push origin my-new-but-unfinished-feature-branch
```

You can `push` and `pull` those branches easily to save your work up in the cloud.

> "Real programmers don't edit `master`." – Dave, the Programmer

## Practice thinking in "branches" - Discussion (5 minutes)

Team up with the person next to you, and go through the following commands we've reviewed in class.  

- git branch
- git checkout
- git merge

Based on what we've talked about, and before you jump into your terminal, discuss the correct commands you would have to use - and the correct order you would need to use them in - to repeat the process of creating a readme. Be aware of the "why" and that you may have to use some commands more than once.

## Branch, Push, Merge, Repeat - Independent Practice (10 mins)

Time for you to try it. With your partner, walk through the steps necessary together, catching each other if either makes any missteps.

Start by mimicking our example – create a branch to write another readme.

- `git init`
- `git add` & `git commit`
- Create a new branch for the feature you're about to work on
- Switch to that branch
- Write some code
- `git merge` that branch back into your `master`

Once you've got it down, do the same process again for a bug fix (aka a typo), so you get in the habit of creating branches whenever you need to make changes.

## Create a pull request on GitHub - Codealong (5 mins)

Before you can open a pull request, you must create a branch in your local repository, commit to it, and push the branch to a repository or fork on GitHub.

1. Visit the repository you pushed to
2. Click the "Compare, review, create a pull request" button in the repository ![pr](https://cloud.githubusercontent.com/assets/40461/8229344/d344aa8e-15ad-11e5-8578-08893bcee335.jpg)

3. You'll land right onto the compare page - you can click Edit at the top to pick a new branch to merge in, using the Head Branch dropdown.
4. Select the target branch your branch should be merged to, using the Base Branch dropdown
5. Review your proposed change
6. Click "Click to create a pull request" for this comparison
7. Enter a title and description for your pull request
8. Click 'Send pull request'
9. 

## GitHub pages - Demo (5 mins)

Now that you have had some good practice at branching and merging it's time to deploy using GitHub pages.

We strongly encourage checking out the official [docs](https://pages.github.com/) and practice more at home.

It's _super_ easy and - basically - all that needs to happen is the creation of a new branch called `gh-pages`.  

From our readme project:

```bash
git branch gh-pages
git checkout gh-pages
```

As long as there is an index.html in your root directory of your gh-pages branch...

```bash
echo "<h1> GitHub pages! </h1>" >> index.html
```

...you'll be able to navigate to http://YOURUSERNAME.github.io/REPOSITORYNAME to view the rendered html. You can also point a new domain name to this URL; this would give you a fully deployed project with a custom URL.

## Conclusion (5 mins)

As a developer, you'll have to use Git pretty much everyday, the learning curve is steep and all the principles of version control can  be a bit blurry sometimes, hence why we ask students to push their homework everyday and to commit regularly during project time.

Don't be frustrated by all the new commands because we will definitely have the time to practice during this course.

- Explain the difference between forking and cloning.
- Describe the steps to initialize a Git repository and link your local repository to a GitHub remote location.
- What's a branch in git? When do you use it?
- How do you create a branch?
- How do you switch between branches?
- How do you merge & delete a branch?
