function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export default function Player(isPlayerTurn) {
  function nextTurn() {
    if (isPlayerTurn) {
      isPlayerTurn = false;
    } else {
      isPlayerTurn = true;
    }
  }

  function attack(
    target=aiBoard,
    isPlayerTurn,
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
