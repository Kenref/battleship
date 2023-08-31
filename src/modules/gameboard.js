export default function gameBoardFactory(rows,columns,shipFactory) {
  const grid = []
  const missedAttacks = []
  const ships = []

  function createGrid(rowLength, columnLength) {
    for (let i = 0; i < rowLength; i++) {
      const row = [];
      for (let j = 0; j < columnLength; j++) {
        row.push("empty");
      }
      grid.push(row);
    }
  }

  function placeShip(x, y,shipLength) {
    const ship = shipFactory(shipLength)
    for (let i = 0; i < shipLength; i++) {
      grid[x+i][y] = ship
    }
    ships.push(ship)
  }

  function receiveAttack(x, y) {
    if (grid[x][y] === "empty") {
      grid[x][y] = "missed"
      missedAttacks.push({x,y})
    } else {
      grid[x][y].hit();
    }
  }

  function checkSunkAll() {
    return ships.every(ship => ship.isSunk() === true )
  }



  createGrid(rows,columns)

  return {
    grid: grid,
    missedAttacks: missedAttacks,
    ships: ships,
    createGrid: createGrid,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    checkSunkAll: checkSunkAll
  };

  // return {
  //   grid: grid,
  //   shipsArray: shipsArray,

  //   placeShip: function (length, x, y) {
  //     let newShip = ship(length)
  //     shipsArray.push(newShip)
  //     for (let i = 0; i < newShip.length; i++) {
  //       grid[x + i][y] = "ship";
  //     }
  //     return newShip
  //     // allow ships to be placed horizontally or vertically
  //     // ships cannot be placed if they are longer than board e.g. on the edge
  //   },

  //   receiveAttack: function(x, y) {
  //     if (grid[x][y] === "ship") {
  //       grid[x][y] = "hit"
  //       return "hit"
  //     } else {
  //       grid[x][y] = "miss"
  //       return "miss"
  //     }
  //   },

  //   checkSunkAll: function () {
  //     return shipsArray.every((ship) => ship.isSunk())
  //   },

  // }
}
