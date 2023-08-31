
export default function Player() {
  function attack(x,y,opponentBoard) {
    opponentBoard.receiveAttack(x,y)
  }

  function getRandomTarget() {
    
  }


  return {
    attack: attack,


    
  }

}








