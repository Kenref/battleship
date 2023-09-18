function checkWithinBoundary(x, y, shipLength, gridLength, orientation) {
  if (orientation === "horizontal" && shipLength <= gridLength - x) {
    return true
  }
  else if (orientation === "vertical" && shipLength <= gridLength - y) {
    return true
  }
  else {
    return false
  }
}

export default function gameBoardFactory(rows, columns, shipFactory) {
  const grid = [];
  const missedAttacksArray = [];
  const shipsArray = [];

  function createGrid(rowLength, columnLength) {
    for (let i = 0; i < rowLength; i++) {
      const row = [];
      for (let j = 0; j < columnLength; j++) {
        row.push("empty");
      }
      grid.push(row);
    }
  }

  function placeShip(x, y, shipLength, orientation = "horizontal") {
    const ship = shipFactory(shipLength);
    for (let i = 0; i < shipLength; i++) {
      if (orientation === "horizontal") {
        this.grid[x + i][y] = ship;
      } else if (orientation === "vertical") {
        this.grid[x][y + i] = ship;
      }
    }
    shipsArray.push(ship);
  }

  function checkAndPlaceShip(x, y, shipLength, orientation="horizontal") {
    const boardSize = this.grid.length

    if (
      checkWithinBoundary(x, y, shipLength, boardSize, orientation) === false
    ) {
      throw new Error("Ship is being placed outside the board");
    }

    this.placeShip(x, y, shipLength, orientation);
  }

  // function placeAiShip(length) {
  //   const ship = shipFactory(length)
  //   const boardSize = this.grid.length
  //   const orientation = Math.random() < 0.5 ? "horizontal" : "vertical"


  // }


  function receiveAttack(x, y) {
    if (this.grid[x][y] === "empty") {
      this.grid[x][y] = "missed";
      this.missedAttacksArray.push({ x, y });
    } else {
      this.grid[x][y].hit();
      this.grid[x][y].addHitCoordinates(x, y);
    }
  }

  function checkSunkAll() {
    return shipsArray.every((ship) => ship.isSunk() === true);
  }

  function isValidAttack(x, y) {
    if (x < 0 || y < 0 || x >= this.grid.length || y >= this.grid[0].length) {
      return false;
    }
    if (this.grid[x][y] === "empty") {
      return true;
    } else if (this.grid[x][y] instanceof Object) {
      if (
        !this.grid[x][y].hitCoordinates.some(
          (coord) => coord.x === x && coord.y === y,
        )
      ) {
        return true;
      }
    }
    return false;
  }

  createGrid(rows, columns);

  return {
    grid: grid,
    missedAttacksArray: missedAttacksArray,
    shipsArray: shipsArray,
    createGrid: createGrid,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    checkSunkAll: checkSunkAll,
    isValidAttack: isValidAttack,
    checkAndPlaceShip: checkAndPlaceShip,
    // placeAiShip: placeAiShip
  };
}
