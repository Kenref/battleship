import gameBoardFactory from "../modules/gameboard";
import Player from "../modules/player";
import shipFactory from "../modules/ships-factory";

describe("allow players to attack the opposing board", () => {
  test("attack the opposing board at (0,0)", () => {
    const enemyBoard = gameBoardFactory(10, 10, shipFactory);
    enemyBoard.placeShip(0, 0, 3);
    const player = Player();
    player.attack(0, 0, enemyBoard);
    expect(enemyBoard.grid[0][0].hitTimes).toBe(1);
  });
});











// describe("calculate placement boundary", () => {
//   test("ship of length 3 will make boundary 7", () => {
//     const player = Player();
//     const shipLength = 3;
//     let boundary = player.getPlacementBoundary(10, shipLength);
//     expect(boundary).toBe(7);
//   });

//   test("ship of length 0 will make boundary 10", () => {
//     const player = Player();
//     const shipLength = 0;
//     let boundary = player.getPlacementBoundary(10, shipLength);
//     expect(boundary).toBe(10);
//   });
// });

