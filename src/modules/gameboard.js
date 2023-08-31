export default function gameBoardFactory(rows,columns,shipFactory) {
  const grid = []
  const missedAttacks = []
  const ships = []

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
    ships.push(ship)
  }

  function receiveAttack(x, y) {
    if (grid[x][y] === "empty") {
      grid[x][y] = "missed"
      missedAttacks.push({x,y})
    } else {
      grid[x][y].hit();
    }
  }

  function checkSunkAll() {
    return ships.every(ship => ship.isSunk() === true )
  }



  createGrid(rows,columns)

  return {
    grid: grid,
    missedAttacks: missedAttacks,
    ships: ships,
    createGrid: createGrid,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    checkSunkAll: checkSunkAll
  };

}
