import gameBoardFactory from "../modules/gameboard";
import Player from "../modules/player";
import shipFactory from "../modules/ships-factory";


describe("allow players to attack the opposing board", () => {
  test("attack the opposing board at (0,0)", () => {
    const enemyBoard = gameBoardFactory(10, 10, shipFactory)
    enemyBoard.placeShip(0, 0, 3)
    
    const player = Player()
    const computer = Player()

    player.attack(0, 0)
    expect(enemyBoard.grid[0][0].hitTimes()).toBe(1)
    
  })
})





// describe("Allow players to attack each others gameboard", () => {
//   const playerBoard = gameBoardFactory(shipFactory)
//   const aiBoard = gameBoardFactory(shipFactory)
//   const player = Player()
//   const ai = Player()

//   playerBoard.placeShip(4, 5, 8);
//   aiBoard.placeShip(4, 2, 7);
//   test("allows player to attack ai gameboard", () => {
//     player.attack(aiBoard, 2, 7)
//     expect(aiBoard.grid[2][7]).toBe("hit")
//   })

//   test("allows ai to attack player gameboard", () => {
//     ai.attack(playerBoard, 5, 8)
//     expect(playerBoard.grid[5][8]).toBe("hit")
//   })
  
  

// });