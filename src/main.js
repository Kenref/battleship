import gameBoardFactory from "./modules/gameboard.js";
import Player from "./modules/player.js";
import "./style.css"
import Game from "./modules/game.js";

const game = Game(gameBoardFactory, Player)

game.playerBoard.initialiseBoard()
game.aiBoard.initialiseBoard()
game.playerBoard.dragShips();





// game.playerBoard.placePlayerShip(1, 0, 0);
// game.playerBoard.placePlayerShip(2, 7, 7);
// game.playerBoard.placePlayerShip(3, 2, 7);
// game.playerBoard.placePlayerShip(4, 6, 4, "vertical");
// game.playerBoard.updateBoard();

game.aiBoard.placeAiShip()
game.aiBoard.updateBoard();


