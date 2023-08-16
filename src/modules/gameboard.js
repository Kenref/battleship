export default function gameBoardFactory(ship, board) {
  let grid = new Array(10).fill(null).map(() => new Array(10).fill("empty"))
  let shipsArray = []

  function updateBoard() {
    
  }


  grid.forEach((row) => {
    row.forEach((cell) => {
      const cellElement = document.createElement("div")
      cellElement.classList.add("cell")
      if (cell === "ship") {
        cellElement.classList.add("ship")
      } else if (cell === "hit") {
        cellElement.classList.add("hit");
      } else if (cell === "miss") {
        cellElement.classList.add("miss");
      }
      board.appendChild(cellElement)
    })
  })

    function placeShip (length, x, y) {
      let newShip = ship(length)
      shipsArray.push(newShip)
      for (let i = 0; i < newShip.length; i++) {
        grid[x + i][y] = "ship";
        const cellElement = board.children[x*10+y+i]
        cellElement.classList.add("ship")
      }
      return newShip
      // allow ships to be placed horizontally or vertically
      // ships cannot be placed if they are longer than board e.g. on the edge
    }

      function receiveAttack(x, y) {
      if (grid[x][y] === "ship") {
        grid[x][y] = "hit"
        return "hit"
      } else {
        grid[x][y] = "miss"
        return "miss"
      }
    }

    function checkSunkAll() {
      return shipsArray.every((ship) => ship.isSunk())
    }
  
  
  return {
    grid: grid,
    shipsArray: shipsArray,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    checkSunkAll: checkSunkAll

  }
}


