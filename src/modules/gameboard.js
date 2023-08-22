export default function gameBoardFactory(ship, board) {
  let grid = new Array(10).fill(null).map(() => new Array(10).fill("empty"));
  let shipsArray = [];

  function updateBoard() {
    board.innerHTML = "";
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement("div");

        cellElement.dataset.row = rowIndex
        cellElement.dataset.col = colIndex

        cellElement.classList.add("cell");
        if (cell instanceof Object) {
          cellElement.classList.add("ship");
        } else if (cell === "hit") {
          cellElement.classList.add("hit");
        } else if (cell === "miss") {
          cellElement.classList.add("miss");
        }
        board.appendChild(cellElement);
      });
    });
  }

  function placeShip(length,x,y, orientation="horizontal") {
    let newShip = ship(length, x, y);
    shipsArray.push(newShip);

    if (orientation === "horizontal" && newShip.length > (10 - y)) {
      throw new Error("Ship does not fit horizontally")
    }
    if (orientation === "vertical" && newShip.length > (10 - x)) {
      throw new Error("Ship does not fit vertically")
    }

    if (orientation === "horizontal") {
      for (let i = 0; i < newShip.length; i++) {
        grid[x][y + i] = newShip;
      }
    } else {
      for (let i = 0; i < newShip.length; i++) {
        grid[x + i][y] = newShip;
    }



    }
    updateBoard()
    return newShip;
    // allow ships to be placed horizontally or vertically
    // ships cannot be placed if they are longer than board e.g. on the edge
  }

  function placeAllShips() {
    //work on placing ships next
  }

  function receiveAttack(x, y) {
    const target = grid[x][y]
    if (target instanceof Object) {
      target.hit()
      grid[x][y] = "hit";
    } else {
      grid[x][y] = "miss";
    }
    updateBoard()
  }

  function checkSunkAll() {
    return shipsArray.every((ship) => ship.isSunk());
  }

  updateBoard()

  return {
    grid: grid,
    shipsArray: shipsArray,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    checkSunkAll: checkSunkAll, 
    updateBoard: updateBoard,
  };
}
