// select dom element

const board = document.querySelector(".board");
const Status = document.querySelector(".Status")







//----------------------------------------------------------------






// create Gameboard :

const Gameboard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  // input value

  const getBoard = () => board;

  const inputSign = (index, player) => {
    if (board[index] === "") {
      board[index] = player;
    }
  };

  return { getBoard, inputSign };
})();
// 






// a control to play the game

const playerControl = (function () {
  function playerValue(name, value) {
    return {
      name,
      value,
    };
  }

  // create player
  const player1 = playerValue("Player One", "X");
  const player2 = playerValue("Player Two", "O");

  //Switch player :
  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  return { switchPlayer, getCurrentPlayer };
})();








const winCondition = (function () {
  // win condition :
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

  const chechWinner = (board, currentPlayer) => {
    for (let condition of wins) {
      let [a, b, c] = condition;
      if (
        board[a] === currentPlayer.value &&
        board[b] === currentPlayer.value &&
        board[c] === currentPlayer.value
      ) {
        return (winner = `${currentPlayer.name} is the winner`);
      }
    }
    if (!board.includes("")) {
      return (tie = `its a tie!`);
    }

    return null;
  };

  return { chechWinner };
})();






const GameLoop = (function () {
  // every time a player Click its swith the Player ;

  const playerTurn = () => {
    const checkWinner = winCondition.chechWinner(
      Gameboard.getBoard(),
      playerControl.getCurrentPlayer()
    );

    if (checkWinner) {
      return checkWinner;
    }

    playerControl.switchPlayer();

    return playerControl.getCurrentPlayer().name ;
  };

  // Stop the Game and Show the Winner or Tie

  const endGame = () => {
    const checkWinner = winCondition.chechWinner(
      Gameboard.getBoard(),
      playerControl.getCurrentPlayer()
    );

    if (checkWinner) {
      return checkWinner;
    }

    return null;
  };

  // Update UI board for every Turn or End game;

  const boardUpdate = () => {
    const boardState = Gameboard.getBoard();
    return boardState;
  };

  return { playerTurn, endGame, boardUpdate };
})();





const UI = (function (){
    // Select the Board in html :
    const ShowBoard = () => {
      GameLoop.boardUpdate().forEach((Cell) => {
         const cellDiv = document.createElement('div');
         cellDiv.className = "Cell";
         cellDiv.innerText = Cell;
         board.appendChild(cellDiv);
      })
    };


    const showStatus = () => {

    };



    return {ShowBoard}
})();




const GameRestart = (function () {
    // select Status text Content 


    // Restart the game . 

    const restartButton = () => {
      
    }


})();




const clickHandiling = (function (){


})();
