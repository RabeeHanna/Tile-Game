var COLUMNS = 4;
var	ROWS = 9;
var	INTERVAL = 350;

var gameInterval;
var score = 0;

function createTable(columns, rows) {
	var html = '<table>';
	for (var i = 0; i < rows; i ++) {
		html += '<tr class="row' + i + '">';
		for (var j = 0; j < columns; j ++) {
			if (i == 0) {
				html += '<td class="column' + j + ' top"></td>';
			} else if (i == rows - 1) {
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

function clearTable() {
	$("#table").empty();
}

function getTile(column, row) {
	return $('.row' + row + ' .column' + column);
}

function getCoords(tile) {
	var column = tile.attr('class').split(" ")[0].slice(-1);
	var row = tile.parent().attr('class').slice(-1);
	return [column, row];
}

function upTile(tile) {
	var coords = getCoords(tile);
	return getTile(coords[0], (parseInt(coords[1]) - 1));
}

function downTile(tile) {
	var coords = getCoords(tile);
	return getTile(coords[0], (parseInt(coords[1]) + 1));
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

function buttonHandler0() {
	off($('.button'));
	on($(this));
}

function buttonHandler1() {
	if ($(this).attr("data-on") == 'on') {
		// gain points
		score += 10;
	} else {
		// lose points
		score -= 30;
	}
}

function moveUp() {
	$('td[data-on=on]').each(function() {
		off($(this));
		on(upTile($(this)));
	});
}

function game0Step() {
	score += 10;
	moveUp();
	$("#scoreVal").html(score);
}

function game1Step() {
	moveDown();
	$("#scoreVal").html(score);
}

function moveDown() {
	$('td[data-on=on]').each(function() {
		on(downTile($(this)));
		off($(this));
	});
}

function incomingTile(columns) {
	var c = Math.floor(Math.random() * columns);
	off($('.top'));
	on(getTile(c, 0));
}

var u;

function start(type) {
	createTable(COLUMNS, ROWS);
	$(window).unload(function() {
		clearInterval(gameInterval);
	});

	if (type == 0) {
		$('.button').click(buttonHandler0);
		gameInterval = setInterval(game0Step, INTERVAL);
	} else if (type == 1) {
		// For now, explicityly call incomeingTile(4) to simulate incoming tile
		$('.button').click(buttonHandler1);
		gameInterval = setInterval(game1Step, INTERVAL);

		u = setInterval(function(){incomingTile(4)}, 250);
	}
}

function end() {
	clearInterval(gameInterval);
	clearInterval(u);
	$('.button').off('click');
	clearTable();
	$("#scoreVal").html('-');
	score = 0;
}