
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// function whosTurn() {
//   let turn
//   if (Game.isPlayerTurn) {
//     turn = "player"
//   } else {
//     turn = "ai"
//   }
// }

export default function Player(playerBoard,aiBoard,gameState) {
  function nextTurn() {
    if (playerBoard.checkSunkAll() || aiBoard.checkSunkAll()) {
      alert("game over")
      isGameOver = true
      return isGameOver
    }
    if (gameState.isPlayerTurn) {
      const aiGrid = document.querySelector(".ai")
      aiGrid.addEventListener("click", function (e) {
        const x = parseInt(e.target.dataset.row, 10)
        const y = parseInt(e.target.dataset.col, 10)
        player.attack(ai, true,)
        //change this
      })
      gameState.isPlayerTurn = false;
    } else {
      gameState.isPlayerTurn = true;
    }
  }
  //check sunk all

  function attack(x=getRandomInt(0,10),y=getRandomInt(0,10)) {
    if (gameState.isPlayerTurn) {
      aiBoard.receiveAttack(x, y);
    } else {
      playerBoard.receiveAttack(x,y);
    }
  }

  return {
    nextTurn: nextTurn,
    attack: attack,
  };
}
