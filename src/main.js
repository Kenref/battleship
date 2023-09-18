import shipFactory from "./modules/ships-factory"
import gameBoardFactory from "./modules/gameboard"
import Player from "./modules/player"
import "./style.css"
import renderGrid from "./ui-logic/render-grid"

const playerBoard = gameBoardFactory(10, 10, shipFactory)
const aiBoard = gameBoardFactory(10, 10, shipFactory);
const player = Player()
const ai = Player()
const playerBoardDiv = document.querySelector(".player")
const aiBoardDiv = document.querySelector(".ai");

renderGrid(playerBoard.grid, playerBoardDiv)
renderGrid(aiBoard.grid, aiBoardDiv)

playerBoard.checkAndPlaceShip(5, 5, 3)
playerBoard.checkAndPlaceShip(5, 5, 3);