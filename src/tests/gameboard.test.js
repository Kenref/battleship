import gameBoardFactory from "../modules/gameboard.js";

describe("initialising a game board factory", () => {
  test("Initialise the game board", () => {
    const gameBoard = gameBoardFactory();
    expect(gameBoard).toBe([]);
  });
  test("Create a ship on a set of coordinates", () => {
    const testShip = shipFactory(3);
    const gameBoard = gameBoardFactory();
    testShip.push(gameBoard)
    expect(testShip.length).toBe([
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
    ]);
  });
});
