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
    expect(player.isNotOnEdge(5, 0)).toEqual(["bottom"]);
  })
  test("return false when on the buttom edge", () => {
    const player = Player();
    expect(player.isNotOnEdge(5, 9)).toEqual(["top"]);
  })
  test("return 2 edges", () => {
    const player = Player();
    expect(player.isNotOnEdge(0, 0)).toEqual(["left", "bottom"]);
  });
})








describe("test smart attack missing", () => {
  const enemyBoard = gameBoardFactory(10, 10, shipFactory);
  enemyBoard.placeShip(5, 5, 3);
  const player = Player();
  
  test("it will attack a random coordinate every time", () => {
    Math.random = jest.fn(() => 0.5)
    player.smartAttack(enemyBoard)
  })

  test("if a coordinate has been hit, it will shoot adjacent left,right,up,down until more is hit or all misses", () => {

  })
  test("if the adjacent square is hit it should keep attacking in that direction", () => {

   });
  
  
})

// describe("test smart attack hitting", () => {
//   test("when something is hit it will keep hitting that direction", () => {});
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

