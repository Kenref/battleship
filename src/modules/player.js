const boardSize = 10;
//get a random number from 0 to boardsize
function getRandomNumber(boardSize) {
  return Math.floor(Math.random() * boardSize);
}
// return true if not touching edges otherwise return edges
function isNotOnEdge(x, y) {
  let edges = [];
  if (x <= 0) {
    edges.push("left");
  }
  if (x >= boardSize - 1) {
    edges.push("right");
  }
  //top and bottom are potentially reversed because of how the grid is made
  if (y <= 0) {
    edges.push("down");
  }
  if (y >= boardSize - 1) {
    edges.push("up");
  }
  if (edges.length === 0) {
    return true;
  } else {
    return edges;
  }
}
// return available sides if given unavailable sides
function getAvailableSides(unavailableSidesArray) {
  const allDirections = ["up", "down", "left", "right"];
  const availableSides = allDirections.filter(
    (direction) => !unavailableSidesArray.includes(direction),
  );
  return availableSides;
}

function getNextHitDirection(availableSides, lastHitDirection, exclusion = null) {
  let nextHit;

  if (exclusion) {
    availableSides = availableSides.filter((side) => side !== exclusion);
  }

  if ((lastHitDirection === null)) {
    const randomIndex = Math.floor(Math.random() * availableSides.length);
    nextHit = availableSides[randomIndex];
    lastHitDirection = nextHit;
    return nextHit;
  } else {
    return lastHitDirection;
  }
}

function attackAdjacent(x, y, direction, opponentBoard) {
  // console.log("before", opponentBoard.grid[x][y].hitCoordinates);
  if (direction === "left") {
    opponentBoard.receiveAttack(x-1,y)
  } else if (direction === "right") {
    opponentBoard.receiveAttack(x+1, y);
  } else if (direction === "up") {
    opponentBoard.receiveAttack(x, y+1);
  } else if (direction === "down") {
    opponentBoard.receiveAttack(x, y-1);
  }
  // console.log("after",opponentBoard.grid[x][y].hitCoordinates);
}

function successfulHit(x, y, opponentBoard) {
  if (opponentBoard.grid[x][y] instanceof Object && opponentBoard.grid[x][y].hitCoordinates.some((coord) => coord.x === x && coord.y === y)) {
    return true
  }
  return false
}

export default function Player() {
  let hitLastTurn = false;
  let lastHitDirection = null;
  let lastHitCoordinates = null

  function attack(x, y, opponentBoard) {
    opponentBoard.receiveAttack(x, y);
  }

  // function getPlacementBoundary(gridLength, shipLength) {
  //   return gridLength - shipLength
  // }

  // function smartAttack(opponentBoard) {
  //   let x, y;

  //   if (!hitLastTurn && lastHitCoordinates === null && lastHitDirection === null) {
  //     do {
  //       x = getRandomNumber(boardSize);
  //       y = getRandomNumber(boardSize);
  //     } while (!opponentBoard.isValidAttack(x, y));

  //     opponentBoard.receiveAttack(x, y);
  //     if (successfulHit(x, y, opponentBoard)) {
  //       hitLastTurn = true
  //       lastHitCoordinates = {x,y}
  //     }
  //   }
  //   // this is for the first time something is hit
  //   else if (hitLastTurn) {
  //     //if last turn was a hit - this turn choose a random direction to hit
  //     if (lastHitDirection === null) {
  //       if (isNotOnEdge(x,y)) {
  //         lastHitDirection = getNextHitDirection(["up", "down", "left", "right"], lastHitDirection)
  //         attackAdjacent(lastHitCoordinates.x, lastHitCoordinates.y, lastHitDirection, opponentBoard)
  //       } else {
  //         const edges = isNotOnEdge(x,y)
  //         lastHitDirection = getNextHitDirection(edges, lastHitDirection)
  //         attackAdjacent(lastHitCoordinates.x, lastHitCoordinates.y, lastHitDirection, opponentBoard)
  //       }
  //       hitLastTurn = successfulHit(x, y, opponentBoard);
  //     } else {  // if we shot in a direction from x,y last turn
        
        
  //       //if hit and if no hit


  //       //if last turn was a miss - go back to original and check other sides randomly
  //       //else if last turn was a hit keep going that direction until sunk
  //     }

  //     // approach right now is to get the edges first, then pick a random side to strike that is not on the edge, then random again
  //     //need to check that the square is a valid sqiare
  //   } else if (!hitLastTurn && lastHitDirection !== null) {
  //     let currentHitDirection = getNextHitDirection(["up", "down", "left", "right"], null, lastHitDirection);
  //     attackAdjacent(lastHitCoordinates.x, lastHitCoordinates.y, currentHitDirection, opponentBoard);
  //     lastHitDirection = currentHitDirection
  //     hitLastTurn = successfulHit(lastHitCoordinates.x, lastHitCoordinates.y, opponentBoard);
  //   }
  //   // remember if something misses reset last hit turn and last hit direction
  // }

  function smartAttack(opponentBoard) {
      let x, y;

      if (!hitLastTurn && lastHitCoordinates === null && lastHitDirection === null) {
        do {
          x = getRandomNumber(boardSize);
          y = getRandomNumber(boardSize);
        } while (!opponentBoard.isValidAttack(x, y));

        opponentBoard.receiveAttack(x, y);
        if (successfulHit(x, y, opponentBoard)) {
          hitLastTurn = true
          lastHitCoordinates = {x,y}
        }
      } else {
        if (lastHitCoordinates === null) {
          
        }
      }
    
    
    }

  return {
    attack: attack,
    smartAttack: smartAttack,
    isNotOnEdge: isNotOnEdge,
    getAvailableSides: getAvailableSides,
    getNextHitDirection: getNextHitDirection,
    attackAdjacent: attackAdjacent,
    hitLastTurn: hitLastTurn,
    lastHitDirection: lastHitDirection,
    successfulHit: successfulHit
  };
}
// if first time hitting a ship
// check if it is touching any sides
//    if it is then find the available sides
//      find a random side from the available to hit
//    if it is not then find a random side to strike next

// if last turn was a hit, keep hitting the same direction
// if last turn was not a hit, hit another random direction from original hit (available) instead
