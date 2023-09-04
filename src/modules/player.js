function getRandomNumber(max) {
  Math.floor(Math.random() * max);
}

export default function Player() {
  function attack(x, y, opponentBoard) {
    opponentBoard.receiveAttack(x, y);
  }

  // function getPlacementBoundary(gridLength, shipLength) {
  //   return gridLength - shipLength
  // }


  //bring in the missed attacks and hit attacks arrays
  function smartAttack(opponentBoard) {
    const x = Math.floor(Math.random() * max);
    const y = Math.floor(Math.random() * max);



  }
  





  return {
    attack: attack,
  };
}
