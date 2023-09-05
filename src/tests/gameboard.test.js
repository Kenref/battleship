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
  });


});

describe("location of missed attacks will be added to missedAttacksArray", () => {
  test("missed attack at (9,9) will be added to array", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory)
    gameBoard.receiveAttack(9, 9)
    expect(gameBoard.grid[9][9]).toBe("missed")
    expect(gameBoard.missedAttacksArray).toContainEqual({x: 9,y: 9})
  })
  test("multiple missed attacks should be registered", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    gameBoard.receiveAttack(9, 9);
    gameBoard.receiveAttack(0,0)
    expect(gameBoard.grid[9][9]).toBe("missed");
    expect(gameBoard.grid[0][0]).toBe("missed");
    expect(gameBoard.missedAttacksArray).toContainEqual({ x: 0, y: 0 });
    expect(gameBoard.missedAttacksArray).toContainEqual({ x: 9, y: 9 });
  })
})

describe("check that ships status change to sunk when hit", () => {
    test("check sunk all for a single ship", () => {
      const gameBoard = gameBoardFactory(10, 10, shipFactory);
      gameBoard.placeShip(0, 0, 2);
      gameBoard.receiveAttack(0, 0);
      gameBoard.receiveAttack(1, 0);
      expect(gameBoard.grid[0][0].isSunk()).toBe(true);
      expect(gameBoard.grid[1][0].isSunk()).toBe(true);
    });
  
  test("check sunk all for multiple ships", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    gameBoard.placeShip(0, 0, 2);
    gameBoard.placeShip(5,5,1)
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    gameBoard.receiveAttack(5,5)
    expect(gameBoard.grid[0][0].isSunk()).toBe(true);
    expect(gameBoard.grid[1][0].isSunk()).toBe(true);
    expect(gameBoard.grid[5][5].isSunk()).toBe(true)
  });

  test("ships sunk should be false if missed", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    gameBoard.placeShip(0, 0, 2);
    gameBoard.receiveAttack(5, 5);
    expect(gameBoard.grid[0][0].isSunk()).toBe(false);
  });
})

describe("check that all ships have been sunk", () => {
  test("sunk all should return false if not all ships sunk", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    gameBoard.placeShip(0, 0, 1);
    expect(gameBoard.checkSunkAll()).toBe(false)
  })

  test("sunk all should return true if all ships have been sunk", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    gameBoard.placeShip(0, 0, 1);
    gameBoard.receiveAttack(0,0)
    expect(gameBoard.checkSunkAll()).toBe(true);
  })

  test("sunk all should return false if only some ships are sunk", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    gameBoard.placeShip(0, 0, 1);
    gameBoard.placeShip(9, 9, 1)
    gameBoard.receiveAttack(0,0)
    expect(gameBoard.checkSunkAll()).toBe(false);
  })
})



describe("check for valid attacks", () => {
  test("players should not be able to attack a square that is already missed'", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory)
    gameBoard.receiveAttack(0, 0)
    expect(gameBoard.isValidAttack(0,0)).toBe(false)
  });

  test("players should not be able to attack a square that is already hit", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory)
    gameBoard.placeShip(1,1,1)
    gameBoard.receiveAttack(1, 1)
    expect(gameBoard.isValidAttack(1,1)).toBe(false)
  })

  test("players should be able to attack a square that is 'empty'", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory)
    expect(gameBoard.isValidAttack(0,0)).toBe(true)
  });

  test("players should be able to attack a ship that has not been hit", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    gameBoard.placeShip(0, 0, 3);
    expect(gameBoard.isValidAttack(0, 0)).toBe(true);
  });

  test("ship should be able to be hit even if adjacent is hit", () => {
    const gameBoard = gameBoardFactory(10, 10, shipFactory);
    gameBoard.placeShip(0, 0, 3);
    gameBoard.receiveAttack(0,0)
    expect(gameBoard.isValidAttack(1, 0)).toBe(true);
  });
})