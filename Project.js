const board = document.querySelector(".board");
const status = document.querySelector(".Status");
const resetButton = document.querySelector(".Restart");

// Create Gameboard
const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];
  
  const getBoard = () => board;
  const inputSign = (index, player) => {
    if (board[index] === "") {
      board[index] = player;
      return true;
    }
    return false;
  };
  const resetBoard = () => {
    board.fill("");
  };
  
  return { getBoard, inputSign, resetBoard };
})();

// Control to play the game
const playerControl = (function () {
  function playerValue(name, value) {
    return { name, value };
  }
  
  // Create players
  const player1 = playerValue("Player One", "X");
  const player2 = playerValue("Player Two", "O");
  
  // Switch player
  let currentPlayer = player1;
  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };
  const getCurrentPlayer = () => currentPlayer;
  const resetToPlayer1 = () => {
    currentPlayer = player1;
  };
  
  return { switchPlayer, getCurrentPlayer, resetToPlayer1 };
})();

const winCondition = (function () {
  // Win conditions
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const checkWinner = (board, currentPlayer) => {
    for (let condition of wins) {
      let [a, b, c] = condition;
      if (
        board[a] === currentPlayer.value &&
        board[b] === currentPlayer.value &&
        board[c] === currentPlayer.value
      ) {
        return `${currentPlayer.name} is the winner!`;
      }
    }
    if (!board.includes("")) {
      return `It's a tie!`;
    }
    return null;
  };
  
  return { checkWinner };
})();

const GameLoop = (function () {
  let isGameOver = false;

  const playerTurn = (index) => {
    if (isGameOver) return;
    
    if (Gameboard.inputSign(index, playerControl.getCurrentPlayer().value)) {
      const winner = winCondition.checkWinner(
        Gameboard.getBoard(),
        playerControl.getCurrentPlayer()
      );

      if (winner) {
        isGameOver = true;
        status.textContent = winner;
        return;
      }

      playerControl.switchPlayer();
      status.textContent = `${playerControl.getCurrentPlayer().name}'s Turn`;
    }
  };

  const resetGame = () => {
    isGameOver = false;
  };

  return { playerTurn, resetGame };
})();

const UI = (function () {
  const showBoard = () => {
    board.innerHTML = "";
    Gameboard.getBoard().forEach((cell, index) => {
      const cellDiv = document.createElement("button");
      cellDiv.className = "Cell";
      cellDiv.textContent = cell;
      cellDiv.addEventListener("click", () => {
        GameLoop.playerTurn(index);
        showBoard(); // Update board after each move
      });
      board.appendChild(cellDiv);
    });
  };

  const showStatus = () => {
    status.textContent = `${playerControl.getCurrentPlayer().name}'s Turn`;
  };

  return { showBoard, showStatus };
})();

// Restart game functionality
const restartGame = () => {
  Gameboard.resetBoard();
  playerControl.resetToPlayer1();
  GameLoop.resetGame();
  UI.showBoard();
  UI.showStatus();
};

// Initialize the game
UI.showBoard();
UI.showStatus();
resetButton.addEventListener("click", restartGame);