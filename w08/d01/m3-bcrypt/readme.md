# Storing Passwords w/ Bcrypt

| Objectives |
| :--- |
| Distinguish between Authentication and Authorization |
| Implement a password **authentication** strategy with bcrypt |

## Authentication / Authorization

* **Authentication** verifies that a user is who they say they are. When a user logs into our site, we *authenticate* them by checking that the password they typed in matches the password we have stored for them.
* **Authorization** is the process of determining whether or not a user has *permission* to to perform certain actions on our site. For example, a user may *be authorized* to view their profile page and edit their own blog posts, but not to edit another user's blog posts.

A user must always first be authenticated, then it can be determined what they are authorized to do.

Example: when Sarah enters a bar, a bouncer looks at her photo ID to ensure (authenticate) that she is who she claims. Sarah is thirty years old so she is allowed (authorized) to drink.


##Password hashing

In order to authenticate a user, we need to store their password in our database. This allows us to check that the user typed in the correct password when logging into our site.

The downside is that if anyone ever got access to our database, they would also have access to all of our users' login information. We use a [**hashing algorithm**](https://crackstation.net/hashing-security.htm#normalhashing) to avoid storing plain-text passwords in the database. We also use [**salt**](https://crackstation.net/hashing-security.htm#salt) to randomize the hashing algorithm, providing extra security against potential attacks. The plain-text password that has been hashed can be referred to as the **password digest**.

Think of a digested password as a firework. It is very easy to explode a firework (*hash plaintext into a digest*), but next to impossible to reverse that process (*turn the digest back into plaintext*). If I wanted to see if two sets of fireworks are the same (*a user is logging in, aka has provided their password and wishes to be authenticated*) we have to explode the fireworks again to compare it with the original explosion (*take the provided plaintext password, hash it again using the same algorithm, and match it with the saved password digest*).

![fireworks](http://i.giphy.com/122XXtx3oumxBm.gif)

##Bcrypt

[Bcrypt](https://www.npmjs.com/package/bcrypt) is a widely used, open-source password hashing library available to multiple languages (we'll be using the NodeJS version).

Let's play!

```bash
npm install bcrypt
```

Enter into `node` then require `bcrypt`:

```javascript
// require bcrypt
var bcrypt = require('bcrypt');
```

###Signup

**Generating password digests** Let's hash a password for an user:

```javascript
// user object 
var user = {name: 'bob', createdAt: Date.now() }
// create a plaintext password
var password = 'swordfish';
// generate salt for more security
bcrypt.genSalt(10, function(err, salt) {
  // hash the password w/ the salt
  bcrypt.hash(password, salt, function(err, hash) {
    // save the password digest (hash) to the user
    user.passwordDigest = hash;
  });
});
```

Check the user object again and see the passwordDigest stored inside of it. Great! We could store this user to a database and have implemented good security by only storing the password digest _WITHOUT_ the plaintext version.

###Signin

**Authenticating a user** Now that we have saved the user `bob`, how can we be sure it's actually him next time he logs into his account? We will require him to provide the same password again. 

In the same node session, let's experiment with comparing a provided plaintext password with an existing password digest to authenticate a user.

```javascript
bcrypt.compare('swordfish', user.passwordDigest, function(err, res) {
  return console.log("user authenticated: " + res);
});
```

To signup & signin a user in an application will be the same thing. The only difference is we will have a `User` model and a database to persist to.

<hr>


##Helpful Videos

* [How one-way encryption works](http://www.wimp.com/howencryption/)
* [How not to store passwords](https://www.youtube.com/watch?v=8ZtInClXe1Q)
