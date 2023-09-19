import checkAndPlaceShip from "../modules/gameboard";

function handleDrop(event) {
  event.preventDefault();

  const targetCell = event.currentTarget;
  const x = targetCell.dataset.row;
  const y = targetCell.dataset.col;

  const shipLength = draggedShip.dataset.length
  const orientation = draggedShip.dataset.orientation;

  try {
    checkAndPlaceShip(x, y, shipLength, orientation);
    // ... (update the UI to reflect the successful ship placement)
  } catch (error) {
    console.error(error);
    // ... (handle the error, e.g., by showing a message to the user)
  }
}


export default function gameSetup() {

  function PlacePlayerShip() {
    const startingShips = document.querySelectorAll(".starting-ships");
    const cells = document.querySelectorAll(".cell")
    let x, y, shipLength, orientation
    let draggedShip = null

    startingShips.forEach((ship) => {
      ship.addEventListener("dragstart", (e) => {
        ship.classList.add("dragging");
        draggedShip = ship
      });
      ship.addEventListener("dragend", (e) => {
        e.preventDefault();
        ship.style.display = "none"
      });
    });
    cells.forEach(cell => {
      cell.addEventListener("dragover", (e) => {
        e.preventDefault()
      })
      cell.addEventListener("drop", (e) => {
        e.preventDefault()

        x = e.target.dataset.row
        y = e.target.dataset.col;
        shipLength = draggedShip.dataset.length
        console.log(x, y, shipLength)
        handleDrop(e)
        
        
      })

    })
  }


  function PlaceAiShip() {}

  return {
    PlacePlayerShip: PlacePlayerShip,
  };
}
