const tilesContainer = document.querySelector(".tiles");
const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const valuesPicklist = [...values, ...values];
const tileCount = valuesPicklist.length;

// Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(value) {
  const element = document.createElement("div");

  element.classList.add("tile");
  element.setAttribute("data-value", value);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    if (awaitingEndOfMove || revealed === "true" || element == activeTile) {
      return;
    }

    // Reveal this value
    element.innerHTML = value;

    if (!activeTile) {
      activeTile = element;

      return;
    }

    const valueToMatch = activeTile.getAttribute("data-value");

    if (valueToMatch === value) {
      element.setAttribute("data-revealed", "true");
      activeTile.setAttribute("data-revealed", "true");

      activeTile = null;
      awaitingEndOfMove = false;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        document.getElementById("buttons").style.display = "block";
      }

      return;
    }

    awaitingEndOfMove = true;

    setTimeout(() => {
      activeTile.innerHTML = "";
      element.innerHTML = "";

      awaitingEndOfMove = false;
      activeTile = null;
    }, 1000);
  });

  return element;
}

// Build up tiles
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * valuesPicklist.length);
  const value = valuesPicklist[randomIndex];
  const tile = buildTile(value);

  valuesPicklist.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}
