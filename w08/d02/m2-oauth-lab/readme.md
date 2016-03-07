---
title: Local Authentication Lab - Username/Password
type: lab
duration: "1:25"
creator:
    name: Gerry
    city: London
competencies: Server Applications
---

# Integrating Social Logins Lab

## Introduction

We've covered the concept of OAuth and how to implement it using Express. Let's take an app we've previously worked on and allow for social login by adding `passport-facebook` functionality.

## Exercise

#### Requirements

- Create a Facebook application on the Facebook developers portal
- Take the starter code and implement Facebook login
- Users should only be able to add candies when they are logged-in
- The form should only be visible when you're logged-in
- Make sure it is not possible to CRUD candies via curl

**Bonus:**
- Add a reference to a user when a candy document is created and show the user details in the candy list
- Make sure only the user who created a candy can delete it

#### Starter code

You might recognize the starter code - it's from our Candies application we worked on earlier this week and late last week.

#### Deliverable

Please find screenshots of the solution-code provided

![app screenshot](http://s27.postimg.org/h15kqhnyr/Screen_Shot_2015_08_10_at_17_16_51.png)


## Additional Resources

- [Passport facebook Documentation](https://github.com/jaredhanson/passport-facebook)
- [Facebook developers portal](https://developers.facebook.com/)
