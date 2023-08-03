import gameBoardFactory from "../modules/gameboard.js";

describe("initialising a game board factory", () => {
  test("Check there are 10 elements in the array", () => {
    const gameBoard = gameBoardFactory();
    expect(gameBoard.grid.length).toBe(10);

  });
  test("Check check there are 10 more elements in each of the 10 arrays", () => {
    const gameBoard = gameBoardFactory();
    gameBoard.grid.forEach(array => {
      expect(array.length).toBe(10)
    })
  });

  // test("Create a ship on a set of coordinates", () => {
  //   const testShip = shipFactory(3);
  //   const gameBoard = gameBoardFactory();
  //   testShip.push(gameBoard)
  //   expect(testShip.length).toBe(
  //    );
  // });
});
