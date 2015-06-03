function displaySection(section) {
	$(".section").hide();
	$("#" + section).show();
}

function servSocket(event, message) {
	socket.emit(event, message);
}

$(function() {
<<<<<<< HEAD:page.js
	$("#playButton0").click(function () {
		displaySection("game");
		start(0);
	});
	$("#playButton1").click(function () {
		displaySection("game");
		start(1);
	});
=======

	socket.on('reply', function(data) {
		console.log('Message: ', data);
	});

	$("#playButton").click(function () {
		displaySection("game");
		start();
		servSocket('gameStart');
	})

>>>>>>> network-compatability:public/scripts/page.js
	$("#backButton").click(function () {
		end();
		displaySection("main");
	});
});