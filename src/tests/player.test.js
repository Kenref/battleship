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

describe("test the getAdjacentCoordinates function", () => {
  test("get the coordinate to the left", () => {
    const player = Player();
    let newCoords = player.getAdjacentCoordinates(5, 5, "left");
    expect(newCoords).toEqual({ x: 4, y: 5 });
  });
  test("get the coordinate to down", () => {
    const player = Player();
    let newCoords = player.getAdjacentCoordinates(5, 5, "down");
    expect(newCoords).toEqual({ x: 5, y: 4 });
  });
});

describe("determine whether a hit was successful", () => {
  test("attack the opposing board at (0,0)", () => {
    const enemyBoard = gameBoardFactory(10, 10, shipFactory);
    enemyBoard.placeShip(0, 0, 3);
    const player = Player();
    player.attack(0, 0, enemyBoard);
    expect(player.successfulHit(0, 0, enemyBoard)).toBe(true);
    expect(player.successfulHit(1, 0, enemyBoard)).toBe(false);
    expect(player.successfulHit(5, 5, enemyBoard)).toBe(false);
  });
});

describe("test smart attack logic", () => {
  const originalMathRandom = Math.random;
  test("if nothing was hit last turn, it will attack randomly", () => {
    const enemyBoard = gameBoardFactory(10, 10, shipFactory);
    const player = Player();
    enemyBoard.placeShip(5, 5, 3);
    Math.random = jest.fn(() => 0.5);
    player.smartAttack(enemyBoard);
    expect(enemyBoard.grid[5][5].hitTimes).toBe(1);
    expect(player.successfulHit(5, 5, enemyBoard)).toBe(true);
  });

  test("if something is hit, attack adjacent squares(corner)", () => {
    const enemyBoard = gameBoardFactory(10, 10, shipFactory);
    const player = Player();
    enemyBoard.placeShip(0, 0, 2);
    enemyBoard.placeShip(0, 1, 1);
    Math.random = jest.fn(() => 0.0);
    player.smartAttack(enemyBoard);
    Math.random = originalMathRandom;
    player.smartAttack(enemyBoard);
    expect(
      enemyBoard.grid[1][0].hitTimes === 2 ||
        enemyBoard.grid[0][1].isSunk() === true,
    ).toBe(true);
  });

    test("if something is hit, attack adjacent squares (not on corner)", () => {
      const enemyBoard = gameBoardFactory(10, 10, shipFactory);
      const player = Player();
      enemyBoard.placeShip(5, 5, 2);
      enemyBoard.placeShip(4, 5, 1);
      enemyBoard.placeShip(5, 4, 1);
      enemyBoard.placeShip(5, 6, 1);
      Math.random = jest.fn(() => 0.5);
      player.smartAttack(enemyBoard);
      Math.random = originalMathRandom;
      player.smartAttack(enemyBoard);
      expect(
        enemyBoard.grid[4][5].isSunk() === true ||
          enemyBoard.grid[6][5].isSunk() === true ||
          enemyBoard.grid[5][4].isSunk() === true ||
          enemyBoard.grid[5][6].isSunk() === true
      ).toBe(true);
    });
  
  test("if there are no available adjacent squares, go back to attacking randomly", () => {
    const enemyBoard = gameBoardFactory(10, 10, shipFactory);
    const player = Player();
    enemyBoard.placeShip(0, 0, 1);
    // enemyBoard.grid[0][1] = "missed"
    // enemyBoard.grid[1][0] = "missed";    

    Math.random = jest.fn(() => 0);
    player.smartAttack(enemyBoard);
    Math.random = originalMathRandom
    player.smartAttack(enemyBoard);
    console.log(enemyBoard.missedAttacksArray)
    
  });
});

// describe("test smart attack logic", () => {
//   // const enemyBoard = gameBoardFactory(10, 10, shipFactory);
//   // const player = Player();
//   const adjacentSquares = [
//     { x: 5, y: 4 },
//     { x: 5, y: 6 },
//     { x: 4, y: 5 },
//     { x: 6, y: 5 },
//   ];

//   test("if nothing was hit last turn, it will attack randomly", () => {
//     const enemyBoard = gameBoardFactory(10, 10, shipFactory);
//     const player = Player();
//     enemyBoard.placeShip(5, 5, 3);
//     Math.random = jest.fn(() => 0.5)
//     player.smartAttack(enemyBoard)
//     expect(enemyBoard.grid[5][5].hitTimes).toBe(1)
//   })

//   // test("if player was hit last turn, it should hit an adjacent square this turn", () => {
//   //   const enemyBoard = gameBoardFactory(10, 10, shipFactory);
//   //   const player = Player();
//   //   enemyBoard.placeShip(5, 5, 3);
//   //   enemyBoard.placeShip(5, 6, 1);
//   //   enemyBoard.placeShip(5, 4, 1);
//   //   player.attack(5,5,enemyBoard)
//   //   player.hitLastTurn = true
//   //   player.smartAttack(enemyBoard)
//   //   const adjacentHit = adjacentSquares.some(
//   //     (square) => enemyBoard.grid[square.x][square.y] === "hit",
//   //   );
//   //   console.log(adjacentHit)
//   //   expect(adjacentHit).toBe(true)
//   // })
//   // test("if the adjacent square was hit this turn, it should shoot in the same direction", () => {
//   //   enemyBoard.placeShip(5, 5, 3);
//   //   player.attack(5, 5, enemyBoard);
//   //   player.hitLastTurn = true;
//   //   player.smartAttack(enemyBoard)
//   // });
//   test("if the adjacent square missed, then it will shoot another adjacent square until all valid adjacent squares have been shot", () => {});
// })

// describe("test smart attack hitting", () => {
//   test("when something is hit it will keep hitting that direction", () => {

//   });
//   test("if a coordinate has been hit, it will shoot adjacent left", () => {});
//   test("if adjacent left is empty it will shoot right", () => {});
//   test("if adjacent right is empty it will shoot up", () => {});
//   test("if adjacent up is empty it will shoot down", () => {});
// });

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
