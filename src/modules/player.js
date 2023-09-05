const boardSize = 10

function getRandomNumber(boardSize) {
  return Math.floor(Math.random() * boardSize);
}

function isNotOnEdge(x, y) {
  let edges = [];
  if (x <= 0) {
    edges.push("left")
  }
  if (x >= boardSize - 1) {
    edges.push("right")
  }
  //top and bottom are potentially reversed because of how the grid is made
  if (y <= 0) {
    edges.push("bottom")
  }
  if (y >= boardSize - 1) {
    edges.push("top")
  }
  if (edges.length === 0) {
    return true;
  } else {
    console.log(edges)
    return edges;
  }
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
        // approach right now is to get the edges first, then pick a random side to strike that is not on the edge, then random again
        //need to check that the square is a valid sqiare
      } else {
        // const sides
      }
    }
    

    
  }


  return {
    attack: attack,
    smartAttack: smartAttack,
    isNotOnEdge: isNotOnEdge
  };
}
