var $box1 = $('#box1');
var $box2 = $('#box2');
var $box3 = $('#box3');
var $box4 = $('#box4');
var $box5 = $('#box5');
var $box6 = $('#box6');
var $box7 = $('#box7');
var $box8 = $('#box8');
var $box9 = $('#box9');
var $resetB = $('#resetB')

var player = 'x';

var board = [
    ['0', '0', '0'],
    ['0', '0', '0'],
    ['0', '0', '0']
];


function displayImage(box) {
    box.children('img.' + player + 'Image').show();
}

function changePlayerTurn() {
    if (player === 'x') {
        player = 'o';
        $('span.playerTurn').text('O');
    } else {
        player = 'x';
        $('span.playerTurn').text('X');
    }
}

$box1.on('click', function () {
    boxClicked(0, 0, $box1);
});

$box2.on('click', function () {
    boxClicked(0, 1, $box2);
});

$box3.on('click', function () {
    boxClicked(0, 2, $box3);
});

$box4.on('click', function () {
    boxClicked(1, 0, $box4);
});

$box5.on('click', function () {
    boxClicked(1, 1, $box5);
});

$box6.on('click', function () {
    boxClicked(1, 2, $box6);
});

$box7.on('click', function () {
    boxClicked(2, 0, $box7);
});

$box8.on('click', function () {
    boxClicked(2, 1, $box8);
});

$box9.on('click', function () {
    boxClicked(2, 2, $box9);
});

function boxClicked(row, col, box) {
    if (board[row][col] === '0' && !gameWon()) {
        displayImage(box);
        board[row][col] = player;
        checkStatus();
    } else {
        alert("Invalid Move");
    }
}

$resetB.on('click', resetBoard);

function gameWon() {
    var $Score = $('span.' + player + 'Score');
    if (board[0][0] === player) {
        if (board[0][1] === player && board[0][2] === player) {
            return true;
        } else if (board[1][0] === player && board[2][0] === player) {
            return true;
        } else if (board[1][1] === player && board[2][2] === player) {
            return true;
        }
    }
    if (board[0][1] === player) {
        if (board[1][1] === player && board[2][1] === player) {
            return true;
        }
    }
    if (board[0][2] === player) {
        if (board[1][2] === player && board[2][2] === player) {
            return true;
        } else if (board[1][1] === player && board[2][0] === player) {
            return true;
        }
    }
    if (board[1][0] === player) {
        if (board[1][1] === player && board[1][2] === player) {
            return true;
        }
    }
    if (board[2][0] === player) {
        if (board[2][1] === player && board[2][2] === player) {
            return true;
        }
    }
    return false;

}

function draw() {
    if (!board[0].includes('0') && !board[1].includes('0') && !board[2].includes('0')) {
        console.log('draw');
        return true;
    }
    else {
        return false;
    }
}

function resetBoard() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            board[i][j] = '0';
        }
    }
    var $images = $('td img');
    $images.hide();
    player = 'x';
    $('h2').html('<span class="playerTurn">X</span>, it\'s your turn!');
}

function incrementPlayer() {
    var $score = $('p span.' + player + 'Score');
    if (parseInt($score.text()) === 0) {

        $('.' + player + 'Wins').html(player.toUpperCase() + ' has <span class="' + player + 'Score">1</span> point!');
    } else if (parseInt($score.text()) === 1) {
        $('.' + player + 'Wins').html(player.toUpperCase() + ' has <span class="' + player + 'Score">2</span> point!');
    } else {
        $score.text(parseInt($score.text()) + 1);
    }
}

function checkStatus() {
    if (!gameWon() && !draw()) {
        changePlayerTurn();
    }
    else {
        if (gameWon()) {
            incrementPlayer();
            $('h2').html(player.toUpperCase() + ' Won!');
        }
        else if (draw()) {
            $('h2').html('Draw!');
        }
    }
}