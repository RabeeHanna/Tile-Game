var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static('public'));

io.on('connection', function(socket){
	console.log('a user connected');
	// Can setup game rooms here

	socket.on('gameStart', function(data) {
		// Game started
		// reply to a particular socket this way:
		if (data.gameStart == 0) {
			socket.emit('reply', {a:'game type 0'});
		} else (data.gameStart == 1) {
			socket.emit('reply', {a:'game type 1'});
		}
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});