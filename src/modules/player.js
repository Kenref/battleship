
export default function Player() {
  function attack(x,y,opponentBoard) {
    opponentBoard.receiveAttack(x,y)
  }



  //logic for ai attack

  return {
    attack: attack,


    
  }

}








