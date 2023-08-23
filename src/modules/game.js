import shipFactory from "./ships-factory";

export default function Game(gameBoardFactory, Player) {
  let gameContainer = document.getElementById("game-container");
  let playerGrid = document.querySelector(".player");
  let aiGrid = document.querySelector(".ai");
  let aiHeader = document.querySelector(".ai-header");
  const startButton = document.querySelector(".start-button");
  const playerHeader = document.querySelector(".player-header");
  const shipContainer = document.querySelector(".ship-container")

  let gameState = {
    isPlayerTurn: true,
    isGameOver: false,
    // remove below later or implement
    playerAttacks: [],
    aiAttacks: [],
  };

  const playerBoard = gameBoardFactory(shipFactory, playerGrid);
  const aiBoard = gameBoardFactory(shipFactory, aiGrid);
  const player = Player(playerBoard, aiBoard, gameState);
  const ai = Player(playerBoard, aiBoard, gameState);

  startButton.addEventListener("click", startGame);

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

  function activateBoard() {
    aiGrid.addEventListener("click", (e) => {
      const x = parseInt(e.target.dataset.row);
      const y = parseInt(e.target.dataset.col);
      player.playerAttacks(x, y);
      setTimeout(ai.aiAttacks, 500);
      nextTurn();
    });
  }

  function startGame() {
    // aiHeader.style.display = "block";
    // aiGrid.style.display = "block"
    aiHeader.classList.remove("hidden")
    aiGrid.classList.remove("hidden");
    startButton.style.display = "none";
    shipContainer.style.display = "none"
    playerHeader.textContent = "Player";
    activateBoard();
  }

  return {
    playerBoard: playerBoard,
    aiBoard: aiBoard,
    player: player,
    ai: ai,
  };
}
