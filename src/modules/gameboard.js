export default function gameBoardFactory(ship, board) {
  let grid = new Array(10).fill(null).map(() => new Array(10).fill("empty"));
  let shipsArray = [];

  function initialiseBoard() {
    board.innerHTML = "";
    grid
      .slice()
      .reverse()
      .forEach((row, reversedRowIndex) => {
        row.forEach((cell, colIndex) => {
          const cellElement = document.createElement("div");
          const rowIndex = 9 - reversedRowIndex;
          cellElement.dataset.row = rowIndex;
          cellElement.dataset.col = colIndex;
          cellElement.classList.add("cell");
          board.appendChild(cellElement);
        });
      });
  }

  function updateBoard() {
    const cells = document.querySelectorAll(".cell")
    cells.forEach((cellElement, index) => {
      const x = parseInt(cellElement.dataset.row);
      const y = parseInt(cellElement.dataset.col);
      const cell = grid[x][y];
      cellElement.className = "cell";
      if (cell instanceof Object) {
        cellElement.classList.add("ship");
        // cellElement.dataset.length = row.length;
      }else if (cell === "hit") {
        cellElement.classList.add("hit");
      } else if (cell === "miss") {
        cellElement.classList.add("miss");
      }
    });

  };
  

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
    //try chaning to getelementbyclassname because query selector all returns a nodelist
    ships.forEach((ship) => {
      ship.addEventListener("dragstart", (e) => {
        ship.classList.add("dragging");
        e.dataTransfer.setData("text/plain", e.target.dataset.length);
      });
      ship.addEventListener("dragend", (e) => {
        e.preventDefault();
        //hide ships after they been let go
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

  // the first ship placement activates the ai one too

  // function receiveAttack(x, y) {
  //   const target = grid[x][y];
  //   if (target instanceof Object) {
  //     target.hit();
  //     grid[x][y] = "hit";
  //   } else {
  //     grid[x][y] = "miss";
  //   }
  //   updateBoard();
  // }

  function receiveAttack(x, y) {
    const domTarget = document.querySelector(`[data-row="${x}"][data-col="${y}"]`);
    const gridTarget = grid[x][y]

    if (gridTarget instanceof Object) {
      gridTarget.hit()
      grid[x][y] = "hit"
      domTarget.classList.add("hit");
    } else {
      grid[x][y] = "miss"
      domTarget.classList.add("miss")
    }
    updateBoard();
  }

  function checkSunkAll() {
    console.log(shipsArray)
    return shipsArray.every((ship) => ship.isSunk());
  }

  // updateBoard();

  return {
    grid: grid,
    shipsArray: shipsArray,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    checkSunkAll: checkSunkAll,
    initialiseBoard: initialiseBoard,
    updateBoard: updateBoard,
    dragShips: dragShips,
  };
}
