function displaySection(section) {
	$(".section").hide();
	$("#" + section).show();
}

$(function() {
	$("#playButton0").click(function () {
		displaySection("game");
		start(0);
	});
	$("#playButton1").click(function () {
		displaySection("game");
		start(1);
	});
	$("#backButton").click(function () {
		end();
		displaySection("main");
	});
});