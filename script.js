var COLUMNS 	= 4,
	ROWS 		= 8,
	BUTTON_BG 	= 'lightgreen',
	SPEED		= 350;

var gameInterval;

function createTable(columns, rows) {
	var html = '<table>';
	for (var i = 0; i < rows; i ++) {
		html += '<tr class="row' + i + '">';
		for (var j = 0; j < columns; j ++) {
			if (i == rows - 1) {
				html += '<td class="column' + j + ' button"></td>';
			} else {
				html += '<td class="column' + j + '"></td>';
			}
		}
		html += '</tr>';
	}
	html += "</table>"
	$("#table").html(html);
	$("#table tr td").attr('data-on', 'off');
}

function getTile(column, row) {
	return $('.row' + (row) + ' .column' + column);
}

function getCoords(tile) {
	var column = tile.attr('class').split(" ")[0].slice(-1);
	var row = tile.parent().attr('class').slice(-1);
	return [column, row];
}

function nextTile(tile) {
	var coords = getCoords(tile);
	return getTile(coords[0], coords[1] - 1);
}

function toggle(tile, position) {
	try {
		tile.attr('data-on', position);
	} catch (e) {
		// that tile is off the screen
	}
}

function on(tile) {
	toggle(tile, 'on');
}

function off(tile) {
	toggle(tile, 'off');
}

function buttonHandler() {
	off($('.button'));
	on($(this));
}

function moveUp() {
	$('td[data-on=on]').each(function() {
		off($(this));
		on(nextTile($(this)));
	});
}

$(function() {
	createTable(COLUMNS, ROWS);
	$('.button').click(buttonHandler);
	$(window).unload(function() {
		clearInterval(gameInterval);
	})
	gameInterval = setInterval(moveUp, SPEED);
});