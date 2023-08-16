import gameBoardFactory from "./gameboard";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export default function Player(isPlayerTurn) {
  function nextTurn(playerBoard, aiBoard) {
    if (playerBoard.checkSunkAll() || aiBoard.checkSunkAll()) {
      alert("game over")
      return
    }
    if (isPlayerTurn) {
      const aiGrid = document.querySelector(".player")
      aiGrid.addEventListener("click", function (e) {
        const x = parseInt(e.target.dataset.row, 10)
        const y = parseInt(e.target.dataset.col, 10)
        player.attack(ai, true,)
        //change this
      })
      isPlayerTurn = false;
    } else {
      isPlayerTurn = true;
    }
  }

  function attack(
    target,
    isPlayerTurn=isPlayerTurn,
    x = getRandomInt(0, 10),
    y = getRandomInt(0, 10),
  ) {
    if (isPlayerTurn) {
      target.receiveAttack(x, y);
    } else {
      target.receiveAttack(getRandomInt(0, 10), getRandomInt(0, 10));
    }
  }

  return {
    nextTurn: nextTurn,
    attack: attack,
  };
}
