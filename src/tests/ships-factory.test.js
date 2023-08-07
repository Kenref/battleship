import shipFactory from "../modules/ships-factory.js"

describe("initialising a ship factory function", () => {
  test("create a ship with the specified length", () => {
    const testShip = shipFactory(3);
    expect(testShip.length).toBe(3);
  });
  test("create a fresh ship", () => {
    const testShip = shipFactory(3);
    expect(testShip.hitTimes).toBe(0);
  });
  test("check status of new ship", () => {
    const testShip = shipFactory(3);
    expect(testShip.isSunk()).toBe(false);
  });
});


describe("testing the status of a ship", () => {
  test("tests ship hitpoints after being hit", () => {
      const testShip = shipFactory(3)
      testShip.hit()
      expect(testShip.hitTimes).toBe(1)
    })
  test("check status of ship after being hit", () => {
    const testShip = shipFactory(1);
    testShip.hit();
    expect(testShip.isSunk()).toBe(true)
  });
  test("check status ship after being hit", () => {
    const testShip = shipFactory(2);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  })
})  


