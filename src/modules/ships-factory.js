export default function shipFactory(length) {
  let hitCoordinates = []

  function hit() {
    this.hitTimes += 1
  }

  function isSunk() {
    return (this.length === this.hitTimes) ? true : false
  }

  function addHitCoordinates(x,y) {
    hitCoordinates.push({x,y})
  }
  
  return {
    length: length,
    hitTimes: 0,
    hitCoordinates: hitCoordinates,
    hit: hit,
    isSunk: isSunk,
    addHitCoordinates: addHitCoordinates
  };

}


