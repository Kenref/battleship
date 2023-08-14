import gameBoardFactory from "../modules/gameboard";
import Player from "../modules/player";
import shipFactory from "../modules/ships-factory";


describe("Allow players to attack each others gameboard", () => {
  const playerBoard = gameBoardFactory(shipFactory)
  const aiBoard = gameBoardFactory(shipFactory)
  const player = Player()
  const ai = Player()

  playerBoard.placeShip(4, 5, 8);
  aiBoard.placeShip(4, 2, 7);
  test("allows player to attack ai gameboard", () => {
    let isPlayerTurn = true;
    player.attack(aiBoard,isPlayerTurn, 2, 7)
    expect(aiBoard.grid[2][7]).toBe("hit")
  })

  test("allows ai to attack player gameboard", () => {
    let isPlayerTurn = false;
    ai.attack(playerBoard,isPlayerTurn)
    expect(playerBoard.grid[5][8]).toBe("ship")
  })
  


});