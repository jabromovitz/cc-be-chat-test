$(function () {
    "use strict";

    // for better performance - to avoid searching in DOM
    var content = $('#content');
    var input = $('#input');
    var status = $('#status');
    var myName = false;
    var myID = false;


    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // open connection
    var connection = new WebSocket('ws://localhost:8080');

    connection.onopen = function () {
        // first we want users to enter their names
        input.removeAttr('disabled');
        status.text('Choose name:');
    };

    connection.onerror = function (error) {
        // just in there were some problems with conenction...
        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                    + 'connection or the server is down.' } ));
    };

    // most important part - incoming messages
    connection.onmessage = function (message) {

         var json = JSON.parse(message.data);

       
        if (json.type === 'history') { // entire message history
            // insert every single message to the chat window
            for (var i=0; i < json.data.length; i++) {
                addMessage(json.data[i].author, json.data[i].text,
                             new Date(json.data[i].time));
            }
        } else if (json.type === 'message') {

            input.removeAttr('disabled');
            addMessage(json.data.author, json.data.text,
                       new Date(json.data.time));
        } else if (json.type == 'id') {
            
            myID = json.uniqueID;
            input.removeAttr('disabled').focus();
        } else if (json.type === 'stats') {

             input.removeAttr('disabled');
            content.prepend('<p>' + json.data + '</p>');

        } else if (json.type === 'popular') {

             input.removeAttr('disabled');
             content.prepend(content.prepend('<p>' + json.data + '</p>'));
        }
    };

    // Send when press enter
    input.keydown(function(e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();
            if (!msg) {
                return;
            }

            connection.send(JSON.stringify({id: myID, msg: msg}));
            $(this).val('');
            //input.attr('disabled', 'disabled');

            // we know that the first message sent from a user their name
            if (myName === false) {
                myName = msg;
                status.text(myName + ': ');
                //input.removeAttr('disabled').focus();
            }
        }
    });


    setInterval(function() {
        if (connection.readyState !== 1) {
            status.text('Error');
            input.attr('disabled', 'disabled').val('Unable to comminucate '
                                                 + 'with the WebSocket server.');
        }
    }, 3000);

    // Add a message to the chat window
    function addMessage(author, message, dt) {
        content.prepend('<p>' + author + ' @ ' +
             + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
             + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
             + ': ' + message + '</p>');
    }
});
