import gameBoardFactory from "./modules/gameboard.js";
import Player from "./modules/player.js";
import "./style.css"
import Game from "./modules/game.js";

const game = Game(gameBoardFactory, Player)






game.playerBoard.placeShip(1, 8, 4);
game.playerBoard.placeShip(2, 6, 7);
game.playerBoard.placeShip(3, 4, 2);
game.playerBoard.placeShip(4, 6, 2);

game.aiBoard.placeShip(1, 1, 1)
game.aiBoard.placeShip(2, 8, 8);
game.aiBoard.placeShip(3, 6, 2);
game.aiBoard.placeShip(4, 4, 6);

// game.player.attack(aiBoard, true, 1, 1)
// game.ai.attack(playerBoard, false)

// game.player.nextTurn(playerBoard, aiBoard, player, ai)