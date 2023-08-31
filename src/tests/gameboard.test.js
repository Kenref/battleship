import gameBoardFactory from "../modules/gameboard.js";
import shipFactory from "../modules/ships-factory.js";

describe("creating a grid using array", () => {
  test("create a gridArray of 5 length and height", () => {
    const gameBoard = gameBoardFactory(5, 5, shipFactory);
    expect(gameBoard.grid.length).toBe(5);
    expect(gameBoard.grid[0].length).toBe(5);
  });

  test("the gridArray will have 10 length for both rows and columns", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    expect(gameBoard.grid.length).toBe(10);
    expect(gameBoard.grid[0].length).toBe(10);
  });

  test("all of the gridArray cells are initialised to empty", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    for (let row of gameBoard.grid) {
      for (let cell of row) {
        expect(cell).toBe("empty");
      }
    }
  });
});

describe("place ships at specific coordinates", () => {
  test("place a ship at (0,0)", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    gameBoard.placeShip(0, 0, 2);
    expect(gameBoard.grid[0][0].length).toBe(2);
    expect(gameBoard.grid[1][0].length).toBe(2);
  });
});

describe("ships able to receive attacks", () => {
  test("the ship at (0,0) will receive an attack", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    gameBoard.placeShip(0, 0, 2);
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.grid[0][0].hitTimes).toBe(1);
  });

  test("if part of the ship is hit the hitpoints will be reflected in the whole ship", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    gameBoard.placeShip(0, 0, 2);
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.grid[0][0].hitTimes).toBe(1);
    expect(gameBoard.grid[1][0].hitTimes).toBe(1);
    // expect(gameBoard.grid[0][0].hitTimes).toBe(1)
    //       expect(gameBoard.grid[1][0].hitTimes).toBe(1);
  });

  test("check if the ship is able to be sunk", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    gameBoard.placeShip(0, 0, 2);
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    expect(gameBoard.grid[0][0].isSunk()).toBe(true);
    expect(gameBoard.grid[1][0].isSunk()).toBe(true);
  });
});

