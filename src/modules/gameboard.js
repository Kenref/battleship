export default function gameBoardFactory(ship) {
  let grid = new Array(10).fill(null).map(() => new Array(10).fill("empty"))
  let shipsArray = []
  return {
    grid: grid,
    shipsArray: shipsArray,

    placeShip: function (length, x, y) {
      let newShip = ship(length)
      shipsArray.push(newShip)
      for (let i = 0; i < newShip.length; i++) {
        grid[x+i][y] = "ship";
      }
      return newShip
      // allow ships to be placed horizontally or vertically
    },

    receiveAttack: function(x, y) {
      if (grid[x][y] === "ship") {
        grid[x][y] = "hit"
      } else {
        grid[x][y] = "miss"
      }
    },

    checkSunkAll: function () {
      return shipsArray.every((ship) => ship.isSunk())
    }

  }
}


