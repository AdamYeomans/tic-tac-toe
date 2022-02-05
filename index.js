const Gameboard = (playerOne, playerTwo) => {
  let turn = 0;
  // No need to check for a win until turn 5.
  // Turn 10 indicates tie.
  // let state = "init";
  // States: init, inProgress, finished.
  // Init = enter usernames
  // inProgress = game in progress, track turns, possible win after turn 6
  // finished = announce winner, ask for rematch, reset usernames if desireable.

  // Setup gameboard
  var boardArray = [["", "", ""], ["", "", ""], ["", "", ""]];

  const squares = document.getElementById("board").children;
  for (let index = 0; index < squares.length; index++) {
    squares[index].addEventListener("click", function(){squareClickHandler(squares[index].id)});
  }

  function squareClickHandler(squareId) {
    // Need to translate index to 2d array.
    // Divide by 3 to see which first array position (floored)
    // Mod by 3 to see second array position
      // Consider top left 0,0 and bottom right 2,2
      // Eg position 1,1 (center) is array pos 4.
        // 4 / 3 == 1
        // 4 % 3 == 1
    let firstPosition = Math.floor(squareId / 3);
    let secondPosition = squareId % 3;
    if (boardArray[firstPosition][secondPosition]) {
      // Already filled.
      return;
    }
    if (turn % 2 == 0) {
      boardArray[firstPosition][secondPosition] = "X";
      var winCon = "X";
    }
    else {
      boardArray[firstPosition][secondPosition] = "O";
      var winCon = "O";
    }
    turn++;

    // Checking win condition
    if (turn > 0) {
      // As it needs to be 3 in a row, we can crawl the surrounding nodes to check for 3 consecutive.
      // Whilst also checking if we're out of bounds.
      // You can only win on your turn, thus we only search for wins for that player.
      // Don't need to check current tile as we just placed there.
      // Need to check cardinal and diagnal.
      let directions = [[0,1], [0,-1], [1,1], [1,0], [1,-1], [-1,1], [-1,0], [-1,-1]];
      for (let i = 0; i < directions.length; i++) {
        // Check if it's out of bounds
        if (
          firstPosition + directions[i][0] > 2 || 
          firstPosition + directions[i][0] < 0 ||
          secondPosition + directions[i][1] > 2 || 
          secondPosition + directions[i][1] < 0
        ) {
          continue;
        }
        // If inbounds, check if wincon is same.
        if (
          winCon == boardArray[firstPosition + directions[i][0]][secondPosition + directions[i][1]]
        ) {
          // We search for another link in the chain
          // Need to check if in bounds first.
          if (
            firstPosition + directions[i][0] + directions[i][0] > 2 || 
            firstPosition + directions[i][0] + directions[i][0] < 0 ||
            secondPosition + directions[i][1] + directions[i][1] > 2 || 
            secondPosition + directions[i][1] + directions[i][1] < 0
          ) {
            continue;
          }
          if (
            winCon == boardArray[firstPosition + directions[i][0] + directions[i][0]][secondPosition + directions[i][1] + directions[i][1]]
          ) {
            if (winCon == "X") {
              playerOne.win();
            }
            else {
              playerTwo.win();
            }
            clearBoard();
          }
        }
      }
      
    }
    renderChanges();
  }

  function renderChanges() {
    for (let index = 0; index < squares.length; index++) {
      let firstPosition = Math.floor(index / 3);
      let secondPosition = index % 3;
      if (boardArray[firstPosition][secondPosition] == "") {
        if (squares[index].childElementCount > 0) {
          squares[index].removeChild(squares[index].childNodes[0]);
        }
        continue;
      }
      console.log(`${index}: ${squares[index].childElementCount}`);
      if (squares[index].childElementCount > 0) {
        var node = squares[index].childNodes[0];
      }
      else {
        var node = document.createElement("img");
        node.classList.add("w-full");
        node.classList.add("h-full");
        node.classList.add("border-none");
      }
      if (boardArray[firstPosition][secondPosition] == "X") {
        node.src = "./cross.svg";
      }
      else if (boardArray[firstPosition][secondPosition] == "O") {
        node.src = "./circle.svg";
      }
      squares[index].appendChild(node);
    }
  }

  function clearBoard() {
    boardArray = [["", "", ""], ["", "", ""], ["", "", ""]];
    renderChanges();
  }

  return {};
}

const Player = (id) => {
  // let username = name;
  let wins = 0;
  const winCounter = document.getElementById(id);
  // const updateName = (newName) => {
    // username = newName;
  // }
  const win = () => {
    wins += 1;
    updateWins()
  }

  function updateWins() {
    winCounter.innerText = wins;
  }
  
  return {win}
}

playerOne = Player("p1-score");
playerTwo = Player("p2-score");
const Board = Gameboard(playerOne, playerTwo);