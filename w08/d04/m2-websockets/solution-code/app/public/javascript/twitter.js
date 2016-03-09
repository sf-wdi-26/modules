$(function (){
  var socket = io();

  socket.on('connect', function() {
    console.log('Connected!');
  });

  socket.on('tweets', function(tweet) {
    var html = '<div class="row"><div class="col-md-6 col-md-offset-3 tweet"><img src="' + tweet.user_profile_image + '" class="avatar pull-left"/><div class="names"><span class="full-name">' + tweet.name + ' </span><span class="username">@' +tweet.screen_name + '</span></div><div class="contents"><span class="text">' + tweet.text + '</span></div></div></div>';
    $('#tweet-container').prepend(html);
  });

  $('form').on('submit', function(){
    event.preventDefault();
    var search_term = $('input').val();
    socket.emit('updateTerm', search_term);
  });

  socket.on('updatedTerm', function(searchTerm) {
    $('h1').text("Twitter Search for "+ searchTerm);
    console.log(searchTerm);
  });

});