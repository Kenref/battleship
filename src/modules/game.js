import shipFactory from "./ships-factory";


export default function Game(gameBoardFactory, Player) {
  let gameContainer = document.getElementById("game-container");
  let playerGrid = document.querySelector(".player");
  let aiGrid = document.querySelector(".ai");

  let gameState = {
    isPlayerTurn: true,
    isGameOver: false,

    playerAttacks: [],
    aiAttacks: [],
  };

  const playerBoard = gameBoardFactory(shipFactory, playerGrid);
  const aiBoard = gameBoardFactory(shipFactory, aiGrid);
  const player = Player(playerBoard, aiBoard, gameState);
  const ai = Player(playerBoard, aiBoard, gameState);

  // function nextTurn() {
  //   if (playerBoard.checkSunkAll() || aiBoard.checkSunkAll()) {
  //     alert("game over");
  //     gameState.isGameOver = true;
  //     return gameState.isGameOver;
  //   }
  //   if(gameState.isPlayerTurn = true){
  //     player.playerAttacks()
  //     gameState.isPlayerTurn = false
  //   } else {
  //     ai.aiAttacks()
  //     gameState.isPlayerTurn = true
  //   }
  // }

  function nextTurn() {
    if (playerBoard.checkSunkAll() || aiBoard.checkSunkAll()) {
      alert("game over");
      gameState.isGameOver = true;
      return gameState.isGameOver;
    }
    if (gameState.isPlayerTurn) {
      gameState.isPlayerTurn = false;
    } else {
      gameState.isPlayerTurn = true;
    }
  }

  aiGrid.addEventListener("click", (e) => {
    const x = parseInt(e.target.dataset.row);
    const y = parseInt(e.target.dataset.col);
    // console.log(e)
    player.playerAttacks(x, y)
    setTimeout(ai.aiAttacks, 500)
    nextTurn()
  })

  return {
    // isPlayerTurn: isPlayerTurn,
    // playerAttacks: playerAttacks,
    // aiAttacks: aiAttacks,

    playerBoard: playerBoard,
    aiBoard: aiBoard,
    player: player,
    ai: ai,
    nextTurn: nextTurn
  };
}