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

describe("check that function will return false when on the side squares", () => {
  test("return true when not on edge", () => {
    const player = Player();
    expect(player.isNotOnEdge(5, 5)).toEqual(true);
  });
  test("return false when on the left edge", () => {
    const player = Player()
    expect(player.isNotOnEdge(0,5)).toEqual(["left"])
  })
  test("return false when on the right edge", () => {
    const player = Player();
    expect(player.isNotOnEdge(9, 5)).toEqual(["right"]);
  })
  test("return false when on the top edge", () => {
    const player = Player();
    expect(player.isNotOnEdge(5, 0)).toEqual(["down"]);
  })
  test("return false when on the buttom edge", () => {
    const player = Player();
    expect(player.isNotOnEdge(5, 9)).toEqual(["up"]);
  })
  test("return 2 edges", () => {
    const player = Player();
    expect(player.isNotOnEdge(0, 0)).toEqual(["left", "down"]);
  });
})

describe("test adjacentSides function", () => {
  test("unavailable up returns left right down", () => {
    const player = Player();
    const availableSides = player.getAvailableSides(["up"])
    expect(availableSides).toEqual(["down", "left", "right"]);
  });
  test("2 unavailable sides", () => {
    const player = Player()
    const availableSides = player.getAvailableSides(["left", "down"])
    expect(availableSides).toEqual(["up", "right"])
  })
});

describe("testing getNextHitDirection function", () => {
  test("unavailable up returns left right down", () => {
    const player = Player();
    const availableSides = player.getAvailableSides(["up"]);
    expect(availableSides).toEqual(["down", "left", "right"]);
  });
  test("2 unavailable sides", () => {
    const player = Player();
    const availableSides = player.getAvailableSides(["left", "down"]);
    expect(availableSides).toEqual(["up", "right"]);
  });
});

describe("takes the side in words and converts it to a int", () => {
  test("unavailable up returns left right down", () => {
    const player = Player();
    const availableSides = player.getAvailableSides(["up"]);
    expect(availableSides).toEqual(["down", "left", "right"]);
  });
  test("2 unavailable sides", () => {
    const player = Player();
    const availableSides = player.getAvailableSides(["left", "down"]);
    expect(availableSides).toEqual(["up", "right"]);
  });
});

describe("test the attackAdjacent function", () => {
  const enemyBoard = gameBoardFactory(10, 10, shipFactory)
  enemyBoard.placeShip(4, 5, 3)
  const player = Player()
  
  test("attack to the left of 5,5 which is 4,5", () => {
    player.attackAdjacent(5, 5, "left", enemyBoard);
    expect(enemyBoard.grid[4][5].hitCoordinates).toContainEqual({x:4, y:5})
  })
  test("attack to the right of 5,5 which is 6,5", () => {
    player.attackAdjacent(5, 5, "right", enemyBoard);
    expect(enemyBoard.grid[6][5].hitCoordinates).toContainEqual({ x: 6, y: 5 });
  });
})



describe("test smart attack logic", () => {
  // const enemyBoard = gameBoardFactory(10, 10, shipFactory);
  // const player = Player();
  const adjacentSquares = [
    { x: 5, y: 4 },
    { x: 5, y: 6 },
    { x: 4, y: 5 },
    { x: 6, y: 5 },
  ];


  
  test("if nothing was hit last turn, it will attack randomly", () => {
    const enemyBoard = gameBoardFactory(10, 10, shipFactory);
    const player = Player();
    enemyBoard.placeShip(5, 5, 3);
    Math.random = jest.fn(() => 0.5)
    player.smartAttack(enemyBoard)
    expect(enemyBoard.grid[5][5].hitTimes).toBe(1)
  })

  test("if player was hit last turn, it should hit an adjacent square this turn", () => {
    const enemyBoard = gameBoardFactory(10, 10, shipFactory);
    const player = Player();
    enemyBoard.placeShip(5, 5, 3);
    enemyBoard.placeShip(5, 6, 1);
    enemyBoard.placeShip(5, 4, 1);
    player.attack(5,5,enemyBoard)
    player.hitLastTurn = true
    player.smartAttack(enemyBoard)
    const adjacentHit = adjacentSquares.some(
      (square) => enemyBoard.grid[square.x][square.y] === "hit",
    );
    console.log(adjacentHit)
    expect(adjacentHit).toBe(true)
  })
  // test("if the adjacent square was hit this turn, it should shoot in the same direction", () => {
  //   enemyBoard.placeShip(5, 5, 3);
  //   player.attack(5, 5, enemyBoard);
  //   player.hitLastTurn = true;
  //   player.smartAttack(enemyBoard)
  // });
  test("if the adjacent square missed, then it will shoot another adjacent square until all valid adjacent squares have been shot", () => {});
})

describe("test smart attack hitting", () => {
  test("when something is hit it will keep hitting that direction", () => {

  });
  test("if a coordinate has been hit, it will shoot adjacent left", () => {});
  test("if adjacent left is empty it will shoot right", () => {});
  test("if adjacent right is empty it will shoot up", () => {});
  test("if adjacent up is empty it will shoot down", () => {});
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

