export default function gameBoardFactory(createShip) {
  let grid = new Array(10).fill(null).map(() => new Array(10).fill("empty"))
  return {
    grid: grid,

    placeShip: function(length, x, y) {
      let ship = createShip(length)
      for (let i = 0; i < ship.length; i++) {
        grid[x+i][y] = "ship";
      }
      return ship
    }
  }
}


