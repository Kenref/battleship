export default function shipFactory(length) {
  return {
    length: length,

    hitTimes: 0,

    hit: function () { this.hitTimes += 1 },
    
    isSunk: function () {return (this.length === this.hitTimes) ? true : false}
  };

}


