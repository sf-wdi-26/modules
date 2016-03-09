function init() {

  var serverBaseUrl = document.domain;
  var socket = io.connect(serverBaseUrl);

  socket.on('incomingMessage', function (data) {
    var message = data.message;
    var name = data.name;
    $('#messages').prepend('<b>' + name + '</b><br />' + message + '<hr />');
  });

  socket.on('error', function (reason) {
    console.log('Unable to connect to server', reason);
  });

  function sendMessage(e) {
    e.preventDefault()
    var message = $('#outgoingMessage').val();
    var name = $('#name').val();
    $.ajax({
      url:  '/message',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({message: message, name: name})
    });
  }

  function outgoingMessageKeyDown(event) {
    if (event.which == 13) {
      event.preventDefault();
      if ($('#outgoingMessage').val().trim().length <= 0) {
        return;
      }
      sendMessage();
      $('#outgoingMessage').val('');
    }
  }

  $('#outgoingMessage').on('keydown', outgoingMessageKeyDown);
  $('#send').on('click', sendMessage);

}

$(document).on('ready', init);
