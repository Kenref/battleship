export default function shipFactory(length) {

  function hit() {
    this.hitTimes += 1
  }

  function isSunk() {
    return (this.length === this.hitTimes) ? true : false
  }


  
  return {
    length: length,
    hitTimes: 0,
    hit: hit,
    isSunk: isSunk
  };

}


