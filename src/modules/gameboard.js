export default function gameBoardFactory(ship, board) {
  let grid = new Array(10).fill(null).map(() => new Array(10).fill("empty"));
  let shipsArray = [];

  function updateBoard() {
    // board.innerHTML = "";
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement("div");
        cellElement.dataset.row = rowIndex;
        cellElement.dataset.col = colIndex;
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
    // dragShips();
  }

  function placeShip(length, x, y, orientation = "horizontal") {
    let newShip = ship(length, x, y);
    shipsArray.push(newShip);

    if (orientation === "horizontal" && newShip.length > 10 - y) {
      throw new Error("Ship does not fit horizontally");
    }
    if (orientation === "vertical" && newShip.length > 10 - x) {
      throw new Error("Ship does not fit vertically");
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
    updateBoard();
    return newShip;
  }

  // activate more than once and change orientation
  function dragShips() {
    const ships = document.querySelectorAll(".ships");
    const gridCells = document.querySelectorAll(".cell");

    ships.forEach((ship) => {
      ship.addEventListener("dragstart", (e) => {
        ship.classList.add("dragging");
        e.dataTransfer.setData("text/plain", e.target.dataset.length);
      });
      ship.addEventListener("dragend", (e) => {
        e.preventDefault();

        // if () {
        //   ship.style.display = "none"
        // }
      });
    });
    gridCells.forEach((cell) => {
      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      cell.addEventListener("drop", (e) => {
        e.preventDefault();
        const shipLength = e.dataTransfer.getData("text/plain");
        const x = parseInt(e.target.dataset.row);
        const y = parseInt(e.target.dataset.col);
        e.target.dataset.length = shipLength;
        cell.dataset.length = shipLength;
        console.log(e.target.dataset.length);

        placeShip(shipLength, x, y);
      });
    });
  }

  //the first ship placement activates the ai one too

  function receiveAttack(x, y) {
    const target = grid[x][y];
    if (target instanceof Object) {
      target.hit();
      grid[x][y] = "hit";
    } else {
      grid[x][y] = "miss";
    }
    updateBoard();
  }

  function checkSunkAll() {
    return shipsArray.every((ship) => ship.isSunk());
  }

  updateBoard();

  return {
    grid: grid,
    shipsArray: shipsArray,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    checkSunkAll: checkSunkAll,
    updateBoard: updateBoard,
    dragShips: dragShips,
  };
}
