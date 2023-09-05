const boardSize = 10

function getRandomNumber(boardSize) {
  return Math.floor(Math.random() * boardSize);
}

export default function Player() {
  let hitLastTurn = false;
  let lastTurnDirection


  function attack(x, y, opponentBoard) {
    opponentBoard.receiveAttack(x, y);
  }

  // function getPlacementBoundary(gridLength, shipLength) {
  //   return gridLength - shipLength
  // }

  function isNotOnEdge(x, y) {
    let edges = ""
    if (x < 0) {
      edges + "left"
    }
    if (x > boardSize - 1) {
      edges + "right"
    }
    //top and bottom are potentially reversed because of how the grid is made
    if (y < 0) {
      edges + "bottom"
    }
    if (y > boardSize - 1) {
      edges + "top"
    }
  }





  function smartAttack(opponentBoard) {
    let x, y
    
    if (!hitLastTurn) {
      do {
        x = getRandomNumber(boardSize);
        y = getRandomNumber(boardSize);
      } while (!opponentBoard.isValidAttack(x, y));
      opponentBoard.receiveAttack(x, y);
      if (opponentBoard.grid[x][y] instanceof Object && opponentBoard.grid[x][y].hitCoordinates.some((coord) => coord.x === x && coord.y === y)) {
        hitLastTurn = true
      }
    }else {
      if (isNotOnEdge) {
        
      }
    }
    

    
  }


  return {
    attack: attack,
    smartAttack: smartAttack,
    isNotOnEdge: isNotOnEdge
  };
}
