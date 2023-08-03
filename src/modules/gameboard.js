export default function gameBoardFactory() {
  let grid = new Array(10).fill(null).map(() => new Array(10).fill("empty"))
  return {
    grid: grid
  }
}


