
export default function Player() {
  function attack(x,y,opponentBoard) {
    opponentBoard.receiveAttack(x,y)
  }

  function getPlacementBoundary(gridLength, shipLength) {
    return gridLength - shipLength
  }



  function getRandomTarget() {

  }


  return {
    attack: attack,
    getPlacementBoundary: getPlacementBoundary

    
  }

}








