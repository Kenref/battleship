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

  function smartAttack(opponentBoard) {
    let x, y;
    
    if (
      lastHitCoordinates.x !== undefined &&
      opponentBoard.grid[lastHitCoordinates.x][lastHitCoordinates.y] &&
      opponentBoard.grid[lastHitCoordinates.x][
        lastHitCoordinates.y
      ].isSunk() === true
    ) {
      console.log("ship sunk");
      lastHitDirection = null;
      lastHitCoordinates = {};
      hitLastTurn = false;
    }

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
      }
      else {
        x = lastHitCoordinates.x
        y = lastHitCoordinates.y

        if (lastHitDirection === null) {
          let randomAdjacentCoordinates;
          let unavailableCoordinates = new Set()
          do {
            lastHitDirection = getRandomSide()
            if (unavailableCoordinates.size === 4) {
              lastHitDirection = null
              lastHitCoordinates = {}
              hitLastTurn = false
              return smartAttack(opponentBoard)
            }
            unavailableCoordinates.add(lastHitDirection)
            randomAdjacentCoordinates = getAdjacentCoordinates(x, y, lastHitDirection)
          } while (!opponentBoard.isValidAttack(randomAdjacentCoordinates.x, randomAdjacentCoordinates.y));

          opponentBoard.receiveAttack(randomAdjacentCoordinates.x, randomAdjacentCoordinates.y);

          if (!successfulHit(randomAdjacentCoordinates.x, randomAdjacentCoordinates.y,opponentBoard)) {
            hitLastTurn = false
          }
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
