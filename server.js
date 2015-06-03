var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var games = {};

app.use('/', express.static('public'));

io.on('connection', function(socket){
	console.log('New connection: ' + socket.id);
	// Can setup game rooms here

	socket.on('gameStart', function(data) {
		// Game started

		// For now, only create new games, with default name
		/*
		// client will create servGameObj and send it through socket
		// it will contain the players, game type, and other important fields
		// that are relevant for the server to know
		games['new game!!!11'] = new data.servGameObj;
		*/

		// reply to a particular socket this way:
		if (data.gameType == 0) {
			console.log("starting game type 0");
			socket.emit('reply', {a:'game type 0'});
		} else {
			console.log("starting game type 1");
			socket.emit('reply', {a:'game type 1'});
		}
	});

	socket.on('disconnect', function(){
		console.log('User disconnected: ' + socket.id);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});