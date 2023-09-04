export default function gameBoardFactory(rows,columns,shipFactory) {
  const grid = []
  const missedAttacksArray = []
  const shipsArray = []

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
    shipsArray.push(ship)
  }

  function receiveAttack(x, y) {
    if (grid[x][y] === "empty") {
      grid[x][y] = "missed"
      missedAttacksArray.push({x,y})
    } else {
      grid[x][y].hit();
      //consider adding the coordinates to the hit object
    }
  }

  function checkSunkAll() {
    return shipsArray.every(ship => ship.isSunk() === true )
  }

  function isValidAttack(x, y) {
    return (grid[x][y] === "empty") ? true : false
  }


  createGrid(rows,columns)

  return {
    grid: grid,
    missedAttacksArray: missedAttacksArray,
    shipsArray: shipsArray,
    createGrid: createGrid,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    checkSunkAll: checkSunkAll,
    isValidAttack: isValidAttack
  };

}
