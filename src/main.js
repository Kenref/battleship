import shipFactory from "./modules/ships-factory"
import gameBoardFactory from "./modules/gameboard"
import Player from "./modules/player"
import "./style.css"
import renderGrid from "./ui-logic/render-grid"
import gameSetup from "./ui-logic/game-setup"

const playerBoard = gameBoardFactory(10, 10, shipFactory)
const aiBoard = gameBoardFactory(10, 10, shipFactory);
const player = Player()
const ai = Player()
const setup = gameSetup();

const playerBoardDiv = document.querySelector(".player")
const aiBoardDiv = document.querySelector(".ai");





setup.PlacePlayerShip()

renderGrid(playerBoard.grid, playerBoardDiv)
renderGrid(aiBoard.grid, aiBoardDiv)




