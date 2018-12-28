$(document).ready(function(){
  var socket = new WebSocket('ws://127.0.0.1:8000/chat/');
  var chat_form = $("#chat_form");
  var send_btn = $("#send-btn");
  var msg_field = $("#msg-field");
  socket.onopen = greeting;
  socket.onmessage = handle_messages;

  chat_form.on('submit', function(e) {
    e.preventDefault();
    message_data = {
      'username': $('input[name="username"]').val(),
      'message': $('input[name="msg"]').val()
    }

    socket.send(JSON.stringify(message_data));
    chat_form[0].reset();

  })

  msg_field.on('keyup', function() {
    context = {
      'typer': $('input[name="username"]').val()
    }
    socket.send(JSON.stringify(context))
  })

function greeting() {
  if(location.pathname != '/'){
    alert('Start Chat.');
  }
}

function message_show(message_data){
  if(message_data.message != '') {
    formatted_message = "<h5 class='sender'>" + message_data.username + "</h5>" + "<p class='message'>" + message_data.message + "<p>";
    $("#messages_canvas").append(formatted_message)
  }
}

function handle_messages(e) {
  data = JSON.parse(e.data)

  // if the data is coming is a message then execute only this IF statement.
  if(data.message) {
    message_show(data);
    return;
  }

  // Else show who is typing now.
  if(msg_field.val().length < 1) {
      istyping_field.text('');
  }

}

})
