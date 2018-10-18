"use strict";

// Port where we'll run the websocket server
var wsPort = 8080;

// websocket and http servers
var ws = require('ws').Server;
var http = require('http');
var hash = require('object-hash');
var features = require('./features');

var chatHistory = [];
var clients = {};
const CHAT_HISTORY_SIZE = 50;
var clientId = 0;

//HTTP
var server = http.createServer(function(request, response) {
});

server.listen(wsPort, function() {
    console.log((new Date()) + " Server is listening on port " + wsPort);
});


// WS
var wsServer = new ws({server : server});

wsServer.on('connection', function(ws, req) {

	clients[clientId] = {socket: ws, name: false, signontime: (new Date()).getTime()};
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

			if (json.msg[0] == '/') {

				//Command 
				var commandWords = json.msg.split(" ");
				var cmd = commandWords[0].substring(1,commandWords[0].length);
				var operator = commandWords.length > 1 ? commandWords[1].trim() : "";

				//popular
				if (cmd === 'popular') {
					
					clients[json.id].socket.send(JSON.stringify({ type:'popular', data: features.popular()}));
				} else if (cmd === 'stats') {

					// find user
					for (var user in clients) {
						if (clients[user].name === operator) {
							clients[json.id].socket.send(JSON.stringify({ type:'stats', data:features.clientStats(clients[user].signontime)}));
							break;
						}
					}
				}

			} else {

				// Regular Message
			    var obj = {
			        time: (new Date()).getTime(),
			        text: features.badWordFilter(json.msg),
			        author: clients[json.id].name,
			    };

			    //Log word usage
			    for(var word of json.msg.split(" ")) {
			    	features.logWord(word);
			    }

			    // Resize 
			    chatHistory.push(obj);
			    chatHistory = chatHistory.slice(-CHAT_HISTORY_SIZE);

			    // Broadcast to connected clients
			    var json = JSON.stringify({ type:'message', data:obj });
			   	for (var client in clients) {

			   		clients[client].socket.send(json);
			   	}
			}
	   }
	});
});