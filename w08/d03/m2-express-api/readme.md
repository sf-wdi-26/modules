# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Express Spotify Notes App


| Objectives |
| :--- |
| Add the Handlebars.js library to an Express project |
| Starter code establishes best practices in RESTful API |
| Consume an external API (Spotify) while building your own |

## Setup

Fork and clone [this repo](https://github.com/sf-wdi-26/express-spotify-search)

1. Carefully add the contents of your basic spotify search `main.js` to `/public/scripts/main.js` and remove conflicts.
2. Carefully add the spotify search markup to the Express app `index.hbs` and resolve conflicts.
3. Add the loading.gif file to the `/public` directory and copy over the relevant CSS
4. Carefully [register partials](https://github.com/donpark/hbs#user-content-helpers-and-partials) and create the necessary directory structure to support them.
5. Change variable names, as necessary
6. Add the `\` comment in front of Spotify Handlebars template references

#### Gotchas

* You cannot declare the same variable twice in JavaScript unless they have different scope.
* You cannot have two elements with the same `id` in HTML, including Handlebars template scripts
* You may wish to register partials, but it is not necessary for a successful project. Please note however that `main.js` will only affect code on the page where it is called (`index.hbs`)
* (In other words `main.js` will NOT affect code rendered in a partial.)


