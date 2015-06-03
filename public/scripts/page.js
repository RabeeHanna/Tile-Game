function displaySection(section) {
	$(".section").hide();
	$("#" + section).show();
}

function servSocket(event, message) {
	socket.emit(event, message);
}

$(function() {
	$("#playButton0").click(function () {
		displaySection("game");
		servSocket('gameStart', {gameType: 0});
		start(0);
	});

	$("#playButton1").click(function () {
		displaySection("game");
		servSocket('gameStart', {gameType: 1});
		start(1);
	});

	socket.on('reply', function(data) {
		console.log('Message: ', data);
	});

	$("#backButton").click(function () {
		end();
		displaySection("main");
	});
});