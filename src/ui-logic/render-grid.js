
export default function renderGrid(grid,UXBoard) {
  UXBoard.innerHTML = "";
  grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;
      if (col instanceof Object) {
        cell.classList.add("ship");
        if (col.hitCoordinates.some(coord => coord.x === rowIndex && coord.y === colIndex)) {
        cell.classList.add("hit")
      }
      } else if (col === "missed") {
        cell.classList.add("missed");
      } 
      UXBoard.appendChild(cell);
    });
  });

}





