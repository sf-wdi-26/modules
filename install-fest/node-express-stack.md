# Installfest Step 2: Node.js & Express Stack

Most of the coding work we do in weeks 3 to 5 will be driven by the back-end web development framework <a href="http://expressjs.com" target="_blank">Express</a>. We'll install Express individually in each project we create. For now, we'll install the other tools we'll use along with Express.

#### Plan Overview

1. Install Node.js, a platform for back-end web development with the JavaScript programming language.
2. Install jshint and its Sublime Text packages to get realtime JavaScript syntax hints.
3. Install MongoDB, the database we'll use with our Node.js and Express stack.

## Node.js

__Note:  when copying the code snippets, please exclude the `$` as you paste and run the code into your terminal.  The dollar sign `$` is simply an indicator of the logged-in user's terminal prompt in the examples.__

1. Install Node.js with Homebrew by running the following command in the Terminal:

  ```bash
  $ brew install node
  ```

2. Run the Terminal command `which node` to check that Node.js was installed. You should see a file path. The Terminal command `node` changes your Terminal into a Javascript REPL ("Read Evaluate Print Loop"), like the right-hand side of repl.it. Type `ctrl + c` twice to quit out of the REPL and return to the normal Terminal commands.

2. Run the Terminal command `which npm` to check that NPM is installed. The Node Package Manager, used through various `npm` commands, is a lot like Homebrew, except we'll use it for Node.js-specific tools instead of for general Mac tools. NPM packages are often called "node modules."

### Nodemon

Nodemon (short for "node monitor") will make our Node.js workflow more efficient.

1. Install nodemon globally with the following Terminal command:

  ```bash
  $  npm install -g nodemon
  ```

### jshint

It's time to install another Sublime Text package!  This one helps you spot errors in your javascript code.

1. First we need to install the linter program, `jshint`. In the Terminal, run `npm install -g jshint` to install jshint globally.
2. From the command palette in Sublime Text (`cmd + shift + p`), select `Package Control: Install Package` to bring up the list of available packages. Select `SublimeLinter` from the list, and Package Control will install it for you.
3. Repeat the step above to install the package `SublimeLinter-jshint`.

## MongoDB

MonogDB is a database that stores information as easy to read "documents". We'll use it to store data in our Node.js and Express stack.

1. Use Homebrew to update all our brew packages.

  ```bash
  $ brew update
  ```

2. Run `brew install` for **MongoDB**.

  ```bash
  $ brew install mongodb
  ```

3. Then we'll need a directory for **MongoDB** to save data.

  ```bash
  $ sudo mkdir -p /data/db
  ```

4. Finally we'll want to make sure we have permission to read and write to this directory.

  ```bash
  $ sudo chown -R $USER /data/db
  ```

5. Run two commands to check whether the install worked. You should see a file path after each command.

  ```bash
  $ which mongod
  $ which mongo
  ```
