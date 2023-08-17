import shipFactory from "./ships-factory";


export default function Game(gameBoardFactory, Player) {
  let gameContainer = document.getElementById("game-container");
  let playerGrid = document.querySelector(".player");
  let aiGrid = document.querySelector(".ai");

  let gameState = {
    isPlayerTurn: true,
    isGameOver: false,
    
    playerAttacks: [],
    aiAttacks: []
  }

  const playerBoard = gameBoardFactory(shipFactory, playerGrid);
  const aiBoard = gameBoardFactory(shipFactory, aiGrid);
  const player = Player(playerBoard,aiBoard,gameState);
  const ai = Player(playerBoard,aiBoard,gameState);



  return {
    // isPlayerTurn: isPlayerTurn,
    // playerAttacks: playerAttacks,
    // aiAttacks: aiAttacks,

    playerBoard: playerBoard,
    aiBoard: aiBoard,
    player: player,
    ai: ai
  }
}