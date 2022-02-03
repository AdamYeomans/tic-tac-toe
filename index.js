const Gameboard = () => {
  let turn = 0;
  // No need to check for a win until turn 6.
  // Turn 10 indicates tie.
  let state = "init";
  // States: init, inProgress, finished.
  // Init = enter usernames
  // inProgress = game in progress, track turns, possible win after turn 6
  // finished = announce winner, ask for rematch, reset usernames if desireable.

  // Setup gameboard
  var boardArray = ["", "", "", "", "", "", "", "", ""];

  const squares = document.getElementById("board").children;
  console.log(squares)
  for (let index = 0; index < squares.length; index++) {
    squares[index].addEventListener("click", function(){squareClickHandler(squares[index].id)});
  }

  function squareClickHandler(squareId) {
    if (boardArray[squareId]) {
      // Already filled.
      return;
    }
    if (turn % 2 == 0) {
      boardArray[squareId] = "X";
    }
    else {
      boardArray[squareId] = "0";
    }
    turn++;
    renderChanges();
  }

  function renderChanges() {
    for (let index = 0; index < squares.length; index++) {
      squares[index].innerHTML = boardArray[index];
    }
  }

  function clearBoard() {
    boardArray = ["", "", "", "", "", "", "", "", ""];
    renderChanges();
  }

  return {};
}

const Player = (name) => {
  let username = name;
  let wins = 0;
}

const Board = Gameboard();
console.log("Working");