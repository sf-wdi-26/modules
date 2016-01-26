<!-- 
---
title: Persisting Form Input with Bootstrap, jQuery and Browser Storage
type: lesson
duration: "1:25"
creator:
    name: Ben Hulan
    city: SF
competencies: Front-end intro
---
 -->

# Persisting Form Input with Bootstrap, jQuery and Browser Storage

### Objectives
*After this lesson, students will be able to:*

- Create HTML forms and store user input in the browser
- Read and write data with localStorage and sessionStorage
- Understand the pros and cons of using built-in browser storage

### Preparation
*Before this lesson, students should already be able to:*

- Write basic HTML/CSS
- Read and write basic vanilla Javascript

## Warm-up
Before we begin, let's look at the files in `browser-storage-examples`
`sessionStorage.html` is the most basic. We will go through this line-by-line in class.
`localStorage_1.html` does the same thing, but it adds the clear button.

Let's brainstorm something else we can do with localStorage and edit the code in class, together, to do that. _One suggestion would be to create an array of strings and iterate through the array to display different text with each click._

## Instructions:

- Open SublimeText3 and install the [Bootstrap Snippets](https://packagecontrol.io/packages/Bootstrap%203%20Snippets) package.
- Restart SublimeText3 (close and re-open the application)
- Type 'bs3-template:html5' and hit `tab`
- Make any changes you need (language = 'en', title, etc)
- Scroll down to below the `<h1>` tag and type 'bs3-form' and press `tab` again
- Add any form elements you wish and try to store the input data using browser storage.

_Remember: `localStorage` and `sessionStorage` only store strings, so you may need to `parseInt()` if you need to do anything with the user data after it has been entered._
