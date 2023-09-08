const boardSize = 10;
//get a random number from 0 to boardsize
function getRandomNumber(boardSize) {
  return Math.floor(Math.random() * boardSize);
}


function getAdjacentCoordinates(x, y, direction) {
  if (direction === "left") {
    // console.log({ x: x - 1, y: y }, "left");
    return {x: x-1, y: y}
  } else if (direction === "right") {
    // console.log({ x: x + 1, y: y }, "right");
    return { x: x + 1, y: y };
  } else if (direction === "up") {
    // console.log({ x: x, y: y + 1 }, "up");
    return { x: x, y: y  + 1};
  } else if (direction === "down") {
    // console.log({ x: x, y: y - 1 }, "down");
    return { x: x, y: y - 1 };
  }
}

function successfulHit(x, y, opponentBoard) {
  if (opponentBoard.grid[x][y] instanceof Object && opponentBoard.grid[x][y].hitCoordinates.some((coord) => coord.x === x && coord.y === y)) {
    return true
  }
  return false
}

function getRandomSide() {
  const directions = ["up", "down", "left", "right"]
  return directions[Math.floor(Math.random() * 4)]
}

export default function Player() {
  let hitLastTurn = false;
  let lastHitDirection = null;
  let lastHitCoordinates = {}

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
      if (!hitLastTurn && lastHitDirection === null) {
        do {
          x = getRandomNumber(boardSize);
          y = getRandomNumber(boardSize);
        } while (!opponentBoard.isValidAttack(x, y));

        opponentBoard.receiveAttack(x, y);
        if (successfulHit(x, y, opponentBoard)) {
          hitLastTurn = true
          lastHitCoordinates.x = x
          lastHitCoordinates.y = y
        }
      } else {
        x = lastHitCoordinates.x
        y = lastHitCoordinates.y
        if (lastHitDirection === null) {
          let randomAdjacentCoordinates;
          do {
            lastHitDirection = getRandomSide()
            randomAdjacentCoordinates = getAdjacentCoordinates(x, y, lastHitDirection)
          } while (!opponentBoard.isValidAttack(randomAdjacentCoordinates.x, randomAdjacentCoordinates.y));
          opponentBoard.receiveAttack(randomAdjacentCoordinates.x, randomAdjacentCoordinates.y);

          
        }
      }
    
    }

  return {
    attack: attack,
    smartAttack: smartAttack,
    hitLastTurn: hitLastTurn,
    lastHitDirection: lastHitDirection,
    lastHitCoordinates: lastHitCoordinates,
    successfulHit: successfulHit,
    getAdjacentCoordinates: getAdjacentCoordinates
  };
}
// if first time hitting a ship
// check if it is touching any sides
//    if it is then find the available sides
//      find a random side from the available to hit
//    if it is not then find a random side to strike next

// if last turn was a hit, keep hitting the same direction
// if last turn was not a hit, hit another random direction from original hit (available) instead
