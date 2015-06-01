function displaySection(section) {
	$(".section").hide();
	$("#" + section).show();
}

$(function() {
	$("#playButton").click(function () {
		displaySection("game");
		start();
	})

	$("#backButton").click(function () {
		end();
		displaySection("main");
	})

});