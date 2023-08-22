
function getRandomInt() {
  let min = Math.ceil(0);
  let max = Math.floor(10);
  return Math.floor(Math.random() * (max - min) + min);
}

export default function Player(playerBoard, aiBoard) {
  function playerAttacks(x,y) {
    aiBoard.receiveAttack(x, y)
  }

  function aiAttacks(x = getRandomInt(), y = getRandomInt()) {
    playerBoard.receiveAttack(x,y)
  }

  return {
    playerAttacks: playerAttacks,
    aiAttacks: aiAttacks
  };
}