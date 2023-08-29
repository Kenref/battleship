export default function gameBoardFactory(shipFactory) {
  function createGrid(rows, columns) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push("empty");
      }
      grid.push(row);
    }
    return grid;
  }

  return {
    createGrid: createGrid,
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
