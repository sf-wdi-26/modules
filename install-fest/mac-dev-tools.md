# Installfest Step 1: Mac Development Tools

## Operating System & Command Line Tools

If you don't already have an account for the Mac App Store, follow the instructions on Apple Support to <a href="https://support.apple.com/kb/PH11499?locale=en_US" target="_blank">create a Mac App Store account</a>.

Before class starts, we suggest you upgrade your operating system to OS X Mavericks (10.9), Yosemite (10.10) or El Capitan (10.11).  If you're on an older machine with 4GB or less of memory, please stick to OS X Mavericks.  Also, if Apple releases a newer version of OS X while you're in WDI; please don't update until your instructors say it's ok.

To check what version of OS X you're running:

1. Click the apple icon in the top left of your computer screen.
2. Select "About This Mac" from the dropdown menu.
3. Read the version information from the window that pops up.

If you are not using Mavericks (10.9) Yosemite (10.10) or El Capitan (10.11), detailed instructions for upgrading your operating system are available through Apple support: <a href="https://www.apple.com/support/osx/upgrade" target="_blank">How to upgrade OS X</a>.

### Install Command Line Tools from the Terminal

1. Open the Terminal application.
2. In your Terminal, type `xcode-select --install`, and a new window and installer will appear.
3. Follow the instructions in the installer.

### Install Command Line Tools through Xcode (Older Versions of OS X)

**Only follow these steps if you were not able to install Xcode Command Line Tools with the instructions above.** If you must run a version of OS X before Mavericks, you will need to install Command Line Tools that come from Xcode.

1. Open the Mac App Store and install Xcode.
2. Open Xcode.
3. Inside the Xcode menu, choose Preferences > Downloads > Install The Command Line Tools.
4. Follow the instructions in the installer.

## Homebrew

__Note:  when copying the code snippets, please exclude the `$` as you paste and run the code into your terminal.  The dollar sign `$` is simply an indicator of the logged-in user in examples.__

<a href="http://brew.sh" target="_blank">Homebrew</a> is a *package manager* for OS X. We'll use it to quickly download and install other tools we need, or to update already installed tools.

1. Open the Terminal application, and run `which brew` to check if you have Homebrew installed already. The `which` Terminal command shows where on your computer a program is installed. If it is installed, the Terminal will output a file path. If it is not installed, the Terminal won't output anything.

2. **Only if you do not have Homebrew installed**, run the command below to install Homebrew. Wait while Homebrew downloads and installs.

	```bash
	$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	```

	If you run into problems, you may need to run `rm -rf /usr/local/Cellar /usr/local/.git` and then retry the command above.

3. Run `brew update` to update Homebrew.

4. Run `brew doctor` in your Terminal to check that Homebrew and any current packages are installed correctly. If there are issues, `brew doctor` will list suggestions for how to fix them.  Follow these suggestions one by one. If you're not sure what to do, **ask!**

5. Based on the errors in the step above, you may need to edit your `~/.bash_profile` to include the path to Homebrew if `brew doctor` shows warnings.  If in doubt ask for help here.

	```bash
	$ bash echo 'export PATH="/usr/local/bin:/usr/local/sbin:~/bin:$PATH"' >> ~/.bash_profile
	```

6. Let's install our first package with Homebrew, `tree`!  This package adds a command to your Terminal that displays files in a tree view (instead of a list view like `ls`).  Enter the following command in your Terminal:

	```bash
	$ brew install tree
	```

7. Run the Terminal command `tree` to see a tree view of all the files inside your current directory!

## Git

You should already have git installed and have an account on GitHub from Fundamentals. If not, sign up for an account on <a href="http://www.github.com" target="_blank">github.com</a>. We'll be using GitHub to track code changes and collaborate on projects.

### Confirm Install

1. To check whether git is installed on your system, run the Terminal command `which git`. The output should be a directory path like `/usr/bin/git`. This is where git is installed on your machine. If you don't see any output, git is not installed on your computer.

2. **Only if you do not have git installed**, run the following command in your Terminal:

	```bash
	$ brew install git
	```

### Configure Git

Configuring your git settings will help GitHub track your contributions and to make it easier and smoother to commit changes.

1. Use the following three `git config` commands to configure your git user information and have git "cache" (remember) it. We use the `--global` (or `-g`) option to make the configuration apply to all repositories.

	```bash
	$ git config --global user.name "YOUR_GITHUB_USERNAME"
	$ git config --global user.email "YOUR_GITHUB_EMAIL_ADDRESS"
	$ git config --global credential.helper cache
	```

2. Generate a SSH key for GitHub by <a href="https://help.github.com/articles/generating-ssh-keys" target="_blank">following GitHub's instructions</a>. This will allow you to use GitHub from your Terminal without entering your login information every time you push.

## Sublime Text

1. Use this link to <a href="http://c758482.r82.cf2.rackcdn.com/Sublime%20Text%20Build%203083.dmg" target="_blank">download Sublime Text 3</a>.
2. Open the downloaded file.
3. Follow the installation instructions (drag Sublime Text 3 to your Applications folder).
4. Open the Sublime Text 3 application.

### Add Package Control

Sublime Text has its own package manager called Package Control. We'll use it to add extra features to Sublime Text, including a web development shortcut package called "Emmet" and a JavaScript syntax helper "jshint".

1. Follow <a href="https://packagecontrol.io/installation" target="_blank">Package Control's "simple installation" instructions</a> to add Package Control to Sublime Text. When you paste the large block of text, make sure you:
	* use the Sublime Text 3 version, and
	* enter the text into the bottom rectangle of the Sublime Text console.
2. We access Package Control through the Sublime Text command palette. Open the palette by pressing `cmd + shift + p` within Sublime Text. Start typing "Package Control" in the command palette to see the list of things Package Control can do.

### Add Packages

1. Let's install our first package, Emmet. From the command palette (`cmd + shift + p`), select `Package Control: Install Package` to bring up the list of available packages.
2. Select `Emmet` from the list, and Package Control will install it for you! (Start typing "Emmet" in the search bar to narrow down the list.)

The other package we'll to add, `jshint`, requires Node.js, so we'll get to it in the next set of installation instructions.

### Open Sublime from the Terminal

Sublime Text 3 includes a program that launches Sublime from the Terminal. We'll use the `ln` command to link that program to a simple `subl` command.

**Before following these steps**, make sure you downloaded Sublime Text 3, NOT Sublime Text 2. Also make sure you're running Sublime from your Applications folder NOT from the installer (go ahead and eject the installer if you haven't already).

1. To run a program from the Terminal, it needs to be available on your $PATH. The next step assumes `/usr/local/bin` is in your $PATH, so let's check that.  Run the following command from the Terminal to see your current $PATH:

	```bash
	$ echo $PATH
	```

2. Run the following command in your Terminal to set up the link:

	```bash
	$ ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/subl
	```

3. Type `subl .` in the Terminal, and Sublime Text 3 should open!

### Configure Git to Use Sublime

When you forget to enter a commit message in the Terminal, git opens a text editor and reminds you to add a commit message.

1. Run the following command in the Terminal to configure git to open Sublime Text instead of the default text editor:

	```bash
	$ git config --global core.editor "subl"
	```


## Chrome

1. If you don't already have it, <a href="https://support.google.com/chrome/answer/95346?hl=en" target="_blank">download and install the Chrome web browser</a>.


## bash-it

In this class we'll be working in our terminals a lot.  Bash-it adds a lot of useful visual tools to the bash shell that will help you to see what is going on and where you're at in the directory structure.
If you already have shell customizations, you can skip this step.  If you're not sure what that is, please follow along:

1. In your terminal download it using git:
  ```bash
	$  git clone --depth=1 https://github.com/Bash-it/bash-it.git ~/.bash_it
	```

2. Then install it by running:
	```bash
	$  ~/.bash_it/install.sh
	```

3. Close your current terminal and open a new one.  It should appear a little different now.


## Window management

While programming it's pretty common to need to place two or three windows next to each other.  We'll install a program that gives us shortcut keys to do this.  
This step is optional.

1. Download https://raw.github.com/onsi/ShiftIt/master/ShiftIt.zip
2. Extract it and drag the application into your `Applications` directory.
3. Double-click the ShiftIt icon in `Applications` and follow the instructions to enable the accessibility options.
