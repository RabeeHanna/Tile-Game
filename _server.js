var PORT = 8080;

var express = require('express');
var app = express();
var io = require('socket.io').listen(app.listen(PORT + 1));

app.use('/', express.static('public'));

var server = app.listen(PORT, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

io.sockets.on('connection', function(socket) {
	
	socket.emit('message', {message: 'welcome'});

	socket.on('send', function(data) {
		console.log('Revcieved message from client: ', data);
		//io.sockets.emit('message', data);
	});

});