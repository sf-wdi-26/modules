# <img src="https://cloud.githubusercontent.com/assets/7833470/10423298/ea833a68-7079-11e5-84f8-0a925ab96893.png" width="60"> Handlebars Templating

| Objectives |
| :--- |
| Add the Handlebars.js library to your projects |
| Create and compile a Handlebars template |
| Use Handlebars templating to display data from an AJAX call on your HTML page |

## What is a template?

* A **template** is a document (or piece of code) that contains **parameters** that are dynamically replaced with data.

* Thus far, we've been using jQuery to append HTML strings when we have data to send to the view from a server (via AJAX).

* To avoid building long strings of HTML every time we have data to send to the view, we'll use <a href="http://handlebarsjs.com" target="_blank">Handlebars templating</a> to dynamically display data in our HTML. The parameters for our data will live inside `{{ }}` tags.

## Why use client-side templating?

* Separate markup from logic. Remember this?

  ```js
  function generateEditSongsModalHtml(songs, albumId) {
  var html = '';
  songs.forEach(function(song) {
    html += '<form class="form-inline" id="' + albumId  + '"' +
            '  <div class="form-group">' +
            '    <input type="text" class="form-control song-trackNumber" value="' + song.trackNumber + '">' +
            '  </div>'+
            '  <div class="form-group">' +
            '    <input type="text" class="form-control song-name" value="' + song.name + '">' +
            '  </div>'+
            '  <div class="form-group">' +
            '    <button class="btn btn-danger delete-song" data-song-id="' + song._id + '">x</button>' +
            '  </div>'+
            '  <div class="form-group">' +
            '    <button type="submit" class="btn btn-success save-song" data-song-id="' + song._id + '">save</span></button>' +
            '  </div>'+
            '</form>';
  });

  return html;
}
  ```

* When appending new HTML elements to the page, the string of elements to append will only get longer as you begin to write more complex markup. [<a href="https://github.com/sf-wdi-26/tunely/blob/solutions_sprint_6/public/js/app.js#L90#L110" target="_blank">see Tune.ly</a>]
* Wouldn't it be nice if the HTML structure was already set up for us? That's where templating comes in!
* Maximize code reusability and maintainability.
* If you need to change your HTML structure for elements you're creating and displaying (e.g. adding an additional class name to your Spotify tracks), all you have to do is change the template!

## Challenges

* Let's begin with a simple Spotify Search app and add Handlebars templating. Begin with the master branch of [this repo](https://github.com/sf-wdi-26/basic-spotify-search)


<details>
  <summary>Can you find our jQuery HTML string?</summary>
  ```js
    // main.js, line 56:
    var $trackHtml = '<div class="row"><div class="col-xs-4"><img src="' + trackData.albumArt + 
    '" class="img-responsive"></div><div class="col-xs-8"><p><strong>' + trackData.name + 
    '</strong> by ' + trackData.artist + '</p><p><a href="' + trackData.previewUrl + 
    '" target="_blank" class="btn btn-sm btn-default">Preview <span class="glyphicon glyphicon-play">' + 
    '</span></a></p></div></div><hr>';
  ```
</details>



## Handlebars Setup

1. Add the Handlebars CDN to your `index.html` (you can always go to <a href="https://cdnjs.com" target="_blank">cdnjs</a> to search for CDNs). Make sure to require Handlebars before your custom script file.

  ```html
  <body>
    <div class="container">
      <!-- page content -->
    </div>

    <!-- jquery -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

    <!-- handlebars -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.3/handlebars.min.js"></script>

    <!-- custom script -->
    <script type="text/javascript" src="main.js"></script>
  </body>
  </html>
  ```

2. Next create an element in your `index.html` where you will append the data from your template. Give this element an `id` (e.g. `results`) so you can select it with jQuery.

  ```html
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div id="results"></div>
        </div>
      </div>
    </div>
  </body>
  ```

3. Create the template inside your `results` element. Give your template an `id` (e.g. `tracks-template`) so you can select it with jQuery. This template acts as an HTML "skeleton" which you'll fill with data. The `{{}}` parameters will be replaced by the data that comes back from your API call.

  ```html
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div id="results">

            <!-- handlebars template -->
            <script id="tracks-template" type="text/x-handlebars-template">
              {{#each tracks}}
                <p><strong>{{name}}</strong> by {{artists.[0].name}}</p>
              {{/each}}
            </script>

          </div>
        </div>
      </div>
    </div>
  </body>
  ```

  **Note:** The example above uses the Spotify API. We use `{{each}}` to iterate through the tracks that come back from Spotify. Each track has a `name` and an array of `artists`. Notice the extra `.` we need when accessing a value from an array (this syntax is specific to Handlebars). `artists.[0]` gives us the first artist from the array.

4. Compile your template in `main.js`. Calling `Handlebars.compile(source)` returns a function, which we save to the variable `template`. We will later use our new `template` function to pass in the data we want to render in the template.

  ```js
  // compile handlebars template
  var source = $('#tracks-template').html();
  var template = Handlebars.compile(source);
  ```

5. On success of your AJAX call, pass the data that comes back from the API into your template function. The output of the template function is HTML that contains the data from the API. The last step is to append the HTML to the view.

  ```js
  $.get(searchUrl, function (data) {

    // track results are in an array called `items`
    // which is nested in the `tracks` object
    var trackResults = data.tracks.items;
    console.log(trackResults);

    $loading.hide();

    var trackHtml = template({ tracks: trackResults });

      // append HTML to the view
      $results.append(trackHtml);
    });

    // reset the form
    $spotifySearch[0].reset();
    $track.focus();
  });
  ```

6. This is an exercise in client-side templating. Take some time to inspect the `trackResults` and work with Handlebars to make your app show the information you want to highlight.



## Resources

* <a href="http://handlebarsjs.com" target="_blank">Handlebars.js</a>
