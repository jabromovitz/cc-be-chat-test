"use strict";

// Port where we'll run the websocket server
var wsPort = 8080;

// websocket and http servers
var ws = require('ws').Server;
var http = require('http');
var hash = require('object-hash');


var chatHistory = [ ];
var clients = {};
const CHAT_HISTORY_SIZE = 50;
var clientId = 0;

/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

//HTTP
var server = http.createServer(function(request, response) {
});

server.listen(wsPort, function() {
    console.log((new Date()) + " Server is listening on port " + wsPort);
});


// WS
var wsServer = new ws({server : server});

wsServer.on('connection', function(ws, req) {
	
	clients[clientId] = {socket: ws, name: false};
	var json = JSON.stringify({type:'id', uniqueID: clientId});
	ws.send(json);  //unique id
	ws.onclose = (function (clientId) {var id = clientId; return function() {delete clients[clientId];}}) (clientId);
	clientId++;

	ws.on('message', function(message) {

		var json = JSON.parse(message);

		//check if this is first message
		if(clients[json.id].name == false) {

			clients[json.id].name = json.msg;

			for(var i = 0; i < chatHistory.length; i++) {

				clients[json.id].socket.send(JSON.stringify({ type:'message', data:chatHistory[i]}));
			}

		} else {

		    var obj = {
		        time: (new Date()).getTime(),
		        text: json.msg,
		        author: clients[json.id].name,
		    };

		    // Resize 
		    chatHistory.push(obj);
		    chatHistory = chatHistory.slice(-CHAT_HISTORY_SIZE);

		    // Broadcast to connected clients
		    var json = JSON.stringify({ type:'message', data:obj });
		   	for (var client in clients) {

		   		clients[client].socket.send(json);
		   	}
	   }
	});
});