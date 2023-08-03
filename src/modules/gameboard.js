function gameBoardFactory() {
  let gameBoard = new Array(10).fill(null).map(() => new Array(10).fill("empty"))
  return {
    gameBoard
  }
}


export {gameBoardFactory}