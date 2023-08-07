import gameBoardFactory from "../modules/gameboard";
import player from "../modules/player";
import shipFactory from "../modules/ships-factory";


describe("Allow players to attack each others gameboard", () => {
  const playerBoard = gameBoardFactory(shipFactory)
  const aiBoard = gameBoardFactory(shipFactory)
  let playerShip = playerBoard.placeShip(4, 5, 8)
  let aiShip = aiBoard.placeShip(4,2,7)
  test("allows player to attack ai gameboard", () => {

  })

  test("allows ai to attack player gameboard", () => {

  })
  
  
  
  // test("create a ship with the specified length", () => {
  //   const testShip = shipFactory(3);
  //   expect(testShip.length).toBe(3);
  // });

});