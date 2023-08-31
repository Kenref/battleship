
export default function Player() {






  
  return {

    nextTurn: function () {
      if (isPlayerTurn) {
        isPlayerTurn = false
      } else {
        isPlayerTurn = true
      }
    },

    attack: function(target,x,y) {
      target.receiveAttack(x,y)
    }
  }

}








