
function getRandomNumber(max) {
  Math.floor(Math.random() * max);
}

export default function Player() {
  const landedAttacksArray = []

  function attack(x, y, opponentBoard) {
    console.log(opponentBoard.isValidAttack(x,y))
    opponentBoard.receiveAttack(x, y);
  }

  // function getPlacementBoundary(gridLength, shipLength) {
  //   return gridLength - shipLength
  // }




  //bring in the missed attacks and hit attacks arrays
  function smartAttack(opponentBoard, boardSize) {
    const x = getRandomNumber(boardSize)
    const y = getRandomNumber(boardSize)

    // console.log(opponentBoard.isValidAttack(x,y))

    // if (opponentBoard.isValidAttack(x, y,opponentBoard.grid)) {
    //   opponentBoard.receiveAttack(x,y)
    // }

  }
  





  return {
    attack: attack,
    smartAttack: smartAttack
  };
}
