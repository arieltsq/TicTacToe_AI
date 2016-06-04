/* global $ */
var player = 1;
var grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function updateGrid (cell, player) {
  $('#msg').empty();
  if (cell.is(':empty')) {
    if (player === 1) {
      // $('#msg').text('Player 1 move');
      cell.append('X');
      $('#player1').show();
      $('#player2').hide();
    } else if (player === 2) {
      $('#msg').append('Player 1 move');
      // $('#player2').hide();
      // $('#player1').show();
      cell.append('O');
    }
  // cell.append(player);
  } else {
    return false;
  }
}

function ComputerMoves () {
  // *Note to self: Singular and Plural, do helps
  // cells in this manner takes in the class .gridCell indexes
  var cells = $('.gridCell');
  var CompMove = Math.floor(Math.random() * 8);

  console.log(CompMove);

  if (grid[CompMove]) {
    // this is a recursion, its calls a method in a Method
    // "as if looping"
    return ComputerMoves();
    // return false;
  } else {
    // Method 1: this is the same as the chunk code of text but concise down to take in the CompMove instead of indexes such as index[0] or index[1]
    cells.eq(CompMove).append('O');
    grid[CompMove] = 2;
    // Method 2: to log and enter the AI  moves using indexes
    // if (CompMove === 0) {
    // cells.eq(0).append('O');
    // grid[0] = 2;
    // }
    // if (CompMove === 1) {
    //   cells.eq(1).append('O');
    //   grid[1] = 2;
    // }
    // if (CompMove === 2) {
    //   cells.eq(2).append('O');
    //   grid[2] = 2;
    // }
    //
    // if (CompMove === 3) {
    //   cells.eq(3).append('O');
    //   grid[3] = 2;
    // }
    // if (CompMove === 4) {
    //   cells.eq(4).append('O');
    //   grid[4] = 2;
    // }
    // if (CompMove === 5) {
    //   cells.eq(5).append('O');
    //   grid[5] = 2;
    // }
    // if (CompMove === 6) {
    //   cells.eq(6).append('O');
    //   grid[6] = 2;
    // }
    // if (CompMove === 7) {
    //   cells.eq(7).append('O');
    //   grid[7] = 2;
    // }
    // if (CompMove === 8) {
    //   cells.eq(8).append('O');
    //   grid[8] = 2;
    // }
    // after computer moves, player must be set to 1 so that the game continues and player one can make his move
    player = 1;
    console.log('computer' + whoWon());
    if (whoWon() === 2 || whoWon() === 1) {
      window.alert('Computer won');
      restart();
    } else if (whoWon() === 3) {
      window.alert("It's a draw");
      restart();
    } else {
      player = 1;
    }
  }
}
$('.gridCell').click(function () {
  var index = parseInt(this.id);
  console.log('testing' + index);
  updateGrid($(this), player);
  playTurn(index);
});
function playTurn (index) {
  if (grid[index] || isGameOver()) {
    return false;
  } else {
    grid[index] = player;
    if (whoWon() === 2 || whoWon() === 1) {
      window.alert("You've won");
      restart();
    } else if (whoWon() === 3) {
      window.alert("It's a draw");
      restart();
    } else if (player === 1) {
      player = 2;
    } else {
      player = 1;
    }
    // below comment logs down the player
    // console.log('player' + whoWon());

    ComputerMoves();
    return true;
  }
}

function isGameOver () {
  if (whoWon()) return true;
  return false;
}
function whoWon () {
  // top
  if (grid[0] === 1 && grid[1] === 1 && grid[2] === 1) return 1;
  if (grid[0] === 2 && grid[1] === 2 && grid[2] === 2) return 2;
  // middle
  if (grid[3] === 1 && grid[4] === 1 && grid[5] === 1) return 1;
  if (grid[3] === 2 && grid[4] === 2 && grid[5] === 2) return 2;
  // bottom
  if (grid[6] === 1 && grid[7] === 1 && grid[8] === 1) return 1;
  if (grid[6] === 2 && grid[7] === 2 && grid[8] === 2) return 2;
  // left
  if (grid[0] === 1 && grid[3] === 1 && grid[6] === 1) return 1;
  if (grid[0] === 2 && grid[3] === 2 && grid[6] === 2) return 2;
  // middle
  if (grid[1] === 1 && grid[4] === 1 && grid[7] === 1) return 1;
  if (grid[1] === 2 && grid[4] === 2 && grid[7] === 2) return 2;
  // right
  if (grid[2] === 1 && grid[5] === 1 && grid[8] === 1) return 1;
  if (grid[2] === 2 && grid[5] === 2 && grid[8] === 2) return 2;
  // horizontal 1
  if (grid[0] === 1 && grid[4] === 1 && grid[8] === 1) return 1;
  if (grid[0] === 2 && grid[4] === 2 && grid[8] === 2) return 2;
  // horizontal 2
  if (grid[2] === 1 && grid[4] === 1 && grid[6] === 1) return 1;
  if (grid[2] === 2 && grid[4] === 2 && grid[6] === 2) return 2;

  if ((grid[0] === 1 || grid[0] === 2) && (grid[1] === 1 || grid[1] === 2) && (grid[2] === 1 || grid[2] === 2) && (grid[3] === 1 || grid[3] === 2) && (grid[4] === 1 || grid[4] === 2) && (grid[5] === 1 || grid[5] === 2) && (grid[6] === 1 || grid[6] === 2) && (grid[7] === 1 || grid[7] === 2) && (grid[8] === 1 || grid[8] === 2)) {
    return 3;
  }
  return 0;
}

$('#resetBtn').click(function () {
  restart();
});

function restart () {
  window.alert('Game Resetting');
  grid = [null, null, null, null, null, null, null, null, null];
  player = 1;
  $('.gridCell').empty();
  $('#player1').hide();
  $('#player2').hide();
  $('#msg').text('Board Restart');
}
$('#compPlay').click(function () {
  ComputerMoves();
});
