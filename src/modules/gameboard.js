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

  function placeShip(x, y, shipLength) {
    const ship = shipFactory(shipLength);
    for (let i = 0; i < shipLength; i++) {
      this.grid[x + i][y] = ship;
    }
    this.shipsArray.push(ship);
  }

  // function receiveAttack(x, y) {
  //   if (this.grid[x][y] === "empty") {
  //     this.grid[x][y] = "missed"
  //     this.missedAttacksArray.push({x,y})
  //   } else {
  //     this.grid[x][y].hit();
  //     this.grid.hitCoordinates = x, y
  //     console.log("hitcoords", this.grid.hitCoordinates);
  //     //consider adding the coordinates to the hit object
  //   }
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
  };
}
