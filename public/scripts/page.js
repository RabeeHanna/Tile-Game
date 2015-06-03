function displaySection(section) {
	$(".section").hide();
	$("#" + section).show();
}

function servSocket(event, message) {
	socket.emit(event, message);
}

$(function() {

	socket.on('reply', function(data) {
		console.log('Message: ', data);
	});

	$("#playButton").click(function () {
		displaySection("game");
		start();
		servSocket('gameStart');
	})

	$("#backButton").click(function () {
		end();
		displaySection("main");
	})

});