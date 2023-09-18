

export default function renderGrid(grid,UXBoard) {
  UXBoard.innerHTML = ""; 
  grid.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = grid.length - 1 - rowIndex
      cell.dataset.col = colIndex;
      if (col instanceof Object) {
        cell.classList.add("ship")
      }
      UXBoard.appendChild(cell);
    });
  });
}
