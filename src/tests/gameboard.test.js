import gameBoardFactory from "../modules/gameboard.js";
import shipFactory from "../modules/ships-factory.js";

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

  test("Create a ship on a set of coordinates", () => {
    // const testShip = shipFactory(3);
    const gameBoard = gameBoardFactory(shipFactory);
    gameBoard.placeShip(3,0,0)
    expect(gameBoard.grid[0][0]).toBe("ship");
    expect(gameBoard.grid[1][0]).toBe("ship");
    expect(gameBoard.grid[2][0]).toBe("ship");
  });
});
