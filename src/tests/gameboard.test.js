import gameBoardFactory from "../modules/gameboard.js";
import shipFactory from "../modules/ships-factory.js";

describe("creating a grid using array", () => {
  test("create a grid of 5 length and height", () => {
    const grid = gameBoardFactory().createGrid(5, 5);
    expect(grid.length).toBe(5);
    expect(grid[0].length).toBe(5);
  });

  test("the grid will have 10 length for both rows and columns", () => {
    const grid = gameBoardFactory().createGrid(10, 10);
    expect(grid.length).toBe(10);
    expect(grid[0].length).toBe(10);
  });

  test("all of the grid cells are initialised to empty", () => {
    const grid = gameBoardFactory().createGrid(10, 10);
    for (let row of grid) {
      for (let cell of row) {
        expect(cell).toBe("empty");
      }
    }
  });
});

describe("place ships at specific coordinates", () => {
  test("place a ship at (0,0)", () => {
    const grid = gameBoardFactory().createGrid(10,10)
    const newShip = shipFactory(2)
    newShip.placeship(0, 0)
    expect(0,0).tobe(newShip)
  })
})

// describe("initialising a game board factory", () => {
//   test("Check there are 10 elements in the array", () => {
//     const gameBoard = gameBoardFactory();
//     expect(gameBoard.grid.length).toBe(10);
//   });
//   test("Check check there are 10 more elements in each of the 10 arrays", () => {
//     const gameBoard = gameBoardFactory();
//     gameBoard.grid.forEach((array) => {
//       expect(array.length).toBe(10);
//     });
//   });
// });

// describe("creating a ship in a set of coordinates", () => {
//   test("Create a ship of 3 length at (0,0)", () => {
//     const gameBoard = gameBoardFactory(shipFactory);
//     gameBoard.placeShip(3, 0, 0);
//     expect(gameBoard.grid[0][0]).toBe("ship");
//     expect(gameBoard.grid[1][0]).toBe("ship");
//     expect(gameBoard.grid[2][0]).toBe("ship");
//   });
//   test("create a ship of 2 length in (8,9)", () => {
//     const gameBoard = gameBoardFactory(shipFactory);
//     gameBoard.placeShip(2, 8, 9);
//     expect(gameBoard.grid[8][9]).toBe("ship");
//     expect(gameBoard.grid[9][9]).toBe("ship");
//   });
// });

// describe("tests whether ships are able to receive a hit", () => {
//   const gameBoard = gameBoardFactory(shipFactory);
//   let testShip = gameBoard.placeShip(2, 0, 0);
//   test("tests whether receiveAttack function is working", () => {
//     gameBoard.receiveAttack(0, 0);
//     testShip.hit();
//     expect(gameBoard.grid[0][0]).toBe("hit");
//     expect(testShip.hitTimes).toBe(1);
//   });
//   test("test whether ships able to sink", () => {
//     gameBoard.receiveAttack(1, 0);
//     testShip.hit();
//     expect(testShip.isSunk()).toBe(true);
//   });
//   test("test whether hits can miss", () => {
//     expect(gameBoard.grid[9][9]).toBe("empty");
//     gameBoard.receiveAttack(9, 9);
//     expect(gameBoard.grid[9][9]).toBe("miss");
//   });

//   test("test whether all ships have been sunk", () => {
//     gameBoard.checkSunkAll();
//   });
// });
