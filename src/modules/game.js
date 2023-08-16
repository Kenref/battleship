import shipFactory from "./ships-factory";

export default function Game(gameBoardFactory, Player) {
  let gameContainer = document.getElementById("game-container");
  let playerGrid = document.querySelector(".player");
  let aiGrid = document.querySelector(".ai");

  let isPlayerTurn = true;
  let playerAttacks = [];
  let aiAttacks = [];

  const playerBoard = gameBoardFactory(shipFactory, playerGrid);
  const aiBoard = gameBoardFactory(shipFactory, aiGrid);
  const player = Player();
  const ai = Player();


  return {
    isPlayerTurn: isPlayerTurn,
    playerAttacks: playerAttacks,
    aiAttacks: aiAttacks,

    playerBoard: playerBoard,
    aiBoard: aiBoard,
    player: player,
    ai: ai
  }
}