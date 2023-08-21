export default function shipFactory(length,x,y) {
  function hit() {
    this.hitTimes += 1
  }
  function isSunk() {
    return (this.length === this.hitTimes) ? true : false
  }

  return {
    length: length,
    location: { x, y },
    hitTimes: 0,
    hit: hit,
    isSunk: isSunk
  };

}


