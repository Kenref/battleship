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
});

describe("if there are no adjacent squares, go back to attacking randomly", () => {
  let originalMathRandom;
  beforeEach(() => {
    originalMathRandom = Math.random;
    jest.spyOn(global.Math, "random").mockReturnValue(0);
  });
  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  test("if there are no available adjacent squares, go back to attacking randomly", () => {
    const enemyBoard = gameBoardFactory(10, 10, shipFactory);
    const player = Player();
    enemyBoard.placeShip(0, 0, 1);
    enemyBoard.placeShip(5, 5, 1);
    player.smartAttack(enemyBoard);
    global.Math.random = jest.fn(() => 0.5);
    player.smartAttack(enemyBoard);
    expect(enemyBoard.grid[5][5].isSunk()).toBe(true)
  });
});

