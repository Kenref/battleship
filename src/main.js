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


