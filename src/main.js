import shipFactory from "./modules/ships-factory.js";
import gameBoardFactory from "./modules/gameboard.js";
import Player from "./modules/player.js";
import "./style.css"

let gameContainer = document.getElementById("game-container");
let playerGrid = document.querySelector(".player");
let aiGrid = document.querySelector(".ai");

let isPlayerTurn = true

const playerBoard = gameBoardFactory(shipFactory, playerGrid);
const aiBoard = gameBoardFactory(shipFactory, aiGrid);
const player = Player();
const ai = Player();

let playerAttacks = []
let aiAttacks = []

playerBoard.placeShip(1, 8, 4);
playerBoard.placeShip(2, 6, 7);
playerBoard.placeShip(3, 4, 2);
playerBoard.placeShip(4, 6, 2);

aiBoard.placeShip(1, 1, 1)
aiBoard.placeShip(2, 8, 8);
aiBoard.placeShip(3, 6, 2);
aiBoard.placeShip(4, 4, 6);

player.attack(aiBoard, true, 1, 1)
ai.attack(playerBoard, false)
