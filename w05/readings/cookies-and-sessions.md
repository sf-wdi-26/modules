# Cookies & Sessions

| Objectives |
| :---- |
| Review the request and response cycle in the context of a stateless web |
| Understand the purpose of cookies in a web application |
| Differentiate between an HTTP Cookie and a session |

Both client-side & server-side sessions, respectively refered to as cookies and sessions, are tools that we use to maintain state between requests and responses over HTTP, a stateless protocol. If it were not for these tools you would have to re-login to prove who you are every time you visited a new page on your favorite social networking site. Instead your login state is persisted through these tools.

# Cookies
> Note: a cookie are how we maintain client-side sessions (confusing, as we'll be talking about sessions below)

## What's a cookie?
An HTTP cookie is a small amount of data sent in the HTTP Request Header from a website and stored in a user's **web browser**. Cookies are commonly used to maintain state between requests, such verifying a login state (logged-in or logged-out). Every time the user continues to make requests to that site, the user's browser automatically sends the cookie back to the site's server in the HTTP Request Header.

###Limitations
* Cookies live directly on a client's browser, so cookies do not get automatically transferred between different browsers/computers.
* Cookies have relatively low size limit at 4093 bytes.
* Users can block and manipulate cookies.

You may choose to also use a session if you want to overcome these limitations. More on sessions below...

##Further Reading
* [Client-side sessions](https://en.wikipedia.org/wiki/Session_(computer_science)#Client_side_web_sessions)
* [HTTP Cookies Explained](https://www.nczonline.net/blog/2009/05/05/http-cookies-explained/)
* [Cookies in the Chrome Console](https://developers.google.com/web/tools/iterate/manage-data/cookies?hl=en)

<hr>

#Sessions

> Note: "sessions", aka a session object, are how we maintain server-side sessions.

Cookies are great, but they're limited in size, and they're hard to work with. If we want finer control, sessions are great! Instead of storing all this data in the browser, we can store it in an object on **the server**. That's a session!

> `sessionStorage` in the browser similarly stores temporary data for us, but fundamentally different and not to be confused with a server-side session object.

When someone visits the website for the first time, they're assigned a *globally unique id*, or **guid** which is placed in the cookie and also used as a unique and corresponding session id.

It is common to create a new session object when a user logs into an application. In production-ready applications you may choose to use the session object to load into the application's active memory the information that we know the user will likely access from database. This makes the application faster as it first looks in the session object *before* executing a database requests.

##Further Reading
* [Server-side sessions](https://en.wikipedia.org/wiki/Session_(computer_science)#Server_side_web_sessions)
* [Sessions in Rails](http://guides.rubyonrails.org/security.html#what-are-sessions-questionmark)

##Questions to ask yourself
* Where are cookies stored? How about sessions?
* What are some good use-cases for a cookie?
* When is a cookie (client-side session) insufficient to require a session (server-side session)?
* Does a session still require the use of cookie? If so, how?