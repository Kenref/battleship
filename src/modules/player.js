
function getRandomInt() {
  let min = Math.ceil(0);
  let max = Math.floor(10);
  return Math.floor(Math.random() * (max - min) + min);
}

export default function Player(playerBoard, aiBoard) {
  function playerAttacks() {
    aiBoard.receiveAttack(x, y);
  }

  function aiAttacks(x = getRandomInt(), y = getRandomInt()) {
    playerBoard.receiveAttack(x,y)
  }

  // function attack(x=getRandomInt(),y=getRandomInt()) {
  //   if (gameState.isPlayerTurn) {
  //     aiBoard.receiveAttack(x, y);
  //   } else {
  //     playerBoard.receiveAttack(x,y);
  //   }
  // }

  return {
    playerAttacks: playerAttacks,
    aiAttacks: aiAttacks
  };
}


    // if (gameState.isPlayerTurn) {
    //   const aiGrid = document.querySelector(".ai");
    //   aiGrid.addEventListener("click", function (e) {
    //     const x = parseInt(e.target.dataset.row, 10);
    //     const y = parseInt(e.target.dataset.col, 10);
    //     player.attack(x, y);
    //     //change this
    //   });
    //   gameState.isPlayerTurn = false;
    // } else {
    //   gameState.isPlayerTurn = true;
    // }