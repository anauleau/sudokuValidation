// 2d array
function isValid(set) {
	var result = true,
		values = {},
		i;
	for (i = 0; i < set.length; i++) {
		if (set[i] < 1 || set[i] > 9 || values[set[i]]) {
			result = false;
			break;
		} else {
			values[set[i]] = true;
		}
	}
	return result;
}

// check sets
function validateSets(sets) {
	var result = true,
		i;
	for (i = 0; i < sets.length; i++) {
		if (!isValid(sets[i])) {
			result = false;
			break;
		}
	}
	return result;
}

function validateSudokuBoard(board) {
	var columns = [],
		squares = [];
	// TODO: Add simple tests to invalidate boards

	// Check Rows
	if (!validateSets(board)) {
		return false;
	}
	// build columns
	board.forEach(function(row) {
		for (var i = 0; i < row.length; i++) {
			if (!columns[i]) {
				columns[i] = [];
				columns[i].push(row[i]);
			} else {
				columns[i].push(row[i]);
			}
		}
	});
	if(!validateSets(columns)) {
		return false;
	}
	// build squares
	function squareHelper(array, squareN, newVal) {
		if (!array[squareN]) {
			array[squareN] = [];
			array[squareN].push(newVal);
		} else {
			array[squareN].push(newVal);
		}
	}
	function squareBuilder(inputArray) {
		var outputArray = [];
		inputArray.forEach(function(row) {
			for (var i = 0; i < row.length; i++) {
				if (i < 3) {
					squareHelper(outputArray, 0, row[i]);
				} else if (i < 6) {
					squareHelper(outputArray, 1, row[i]);
				} else {
					squareHelper(outputArray, 2, row[i]);
				}
			}
		});
		return outputArray;
	}
	squares.concat(
		squareBuilder([board[0], board[1], board[2]]),
		squareBuilder([board[3], board[4], board[5]]),
		squareBuilder([board[6], board[7], board[8]])
	);
	if (!validateSets(squares)) {
		return false;
	}
	return true;
}


var goodBoard = [
	[5,3,4,6,7,8,9,1,2],
	[6,7,2,1,9,5,3,4,8],
	[1,9,8,3,4,2,5,6,7],
	[8,5,9,7,6,1,4,2,3],
	[4,2,6,8,5,3,7,9,1],
	[7,1,3,9,2,4,8,5,6],
	[9,6,1,5,3,7,2,8,4],
	[2,8,7,4,1,9,6,3,5],
	[3,4,5,2,8,6,1,7,9]
];

var badBoard = [
	[3,3,4,6,7,8,9,1,2],
	[6,7,2,1,9,5,3,4,8],
	[1,9,8,3,4,2,5,6,7],
	[8,5,9,7,6,1,4,2,3],
	[4,2,6,8,5,3,7,9,1],
	[7,1,3,9,2,4,8,5,6],
	[9,6,1,5,3,7,2,8,4],
	[2,8,7,4,1,9,6,3,5],
	[3,4,5,2,8,6,1,7,9]
];
