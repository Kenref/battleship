
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

export default function Player(playerBoard, aiBoard) {
  function playerAttacks(x,y) {
    aiBoard.receiveAttack(x, y)
    aiBoard.updateBoard()
  }

  function aiAttacks(x = getRandomInt(10), y = getRandomInt(10)) {
    playerBoard.receiveAttack(x, y)
    playerBoard.updateBoard()
  }

  return {
    playerAttacks: playerAttacks,
    aiAttacks: aiAttacks
  };
}