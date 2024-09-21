const tilesContainer = document.querySelector(".tiles");
const values = [
  `<i class="fa-solid fa-hand-holding-heart"></i>`,
  `<i class="fa-solid fa-piggy-bank"></i>`,
  `<i class="fa-solid fa-sack-dollar"></i>`,
  `<i class="fa-solid fa-handshake"></i>`,
  `<i class="fa-solid fa-fire"></i>`,
  `<i class="fa-solid fa-money-bill-1-wave"></i>`,
  `<i class="fa-solid fa-scale-balanced"></i>`,
  `<i class="fa-solid fa-house-flag"></i>`,
  `<i class="icon_svg"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194 143" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><path d="M7.136 46.232h-4.71c-1.34 0-2.426-1.14-2.426-2.544v-5.356c0-1.404 1.086-2.543 2.427-2.543h6.025C13.12 17.559 29.658 4.081 49.343 4.081c17.957 0 33.295 11.214 39.393 27.02 2.453-1.786 5.343-2.816 8.436-2.816 2.98 0 5.772.956 8.167 2.624 6.148-15.705 21.434-26.828 39.318-26.828 19.685 0 36.223 13.477 40.89 31.708h6.026c1.34 0 2.427 1.139 2.427 2.543v5.356c0 1.405-1.086 2.544-2.427 2.544h-4.71v.056c0 23.31-18.896 42.208-42.206 42.208a42.028 42.028 0 0 1-19.211-4.616l-17.61 9.973 26.599 15.063-.012.02c3.764 2.247 6.886 6.23 8.353 11.254 2.171 7.441.053 14.91-4.79 18.729l-5.466-4.87c1.621-2.426 2.134-5.941 1.105-9.465-.814-2.788-2.438-5.053-4.405-6.458l-.047.083-2.238-1.268a7.45 7.45 0 0 0-1.316-.316l-8.056-4.603c.068-.091.137-.182.207-.271L97 99.989l-20.77 11.762.207.27-8.057 4.604a7.45 7.45 0 0 0-1.315.316l-2.238 1.268-.047-.083c-1.967 1.405-3.591 3.67-4.405 6.458-1.029 3.524-.516 7.039 1.105 9.465l-5.465 4.87c-4.844-3.82-6.962-11.288-4.79-18.729 1.466-5.024 4.588-9.007 8.352-11.253l-.012-.02 26.6-15.064-17.61-9.973a42.028 42.028 0 0 1-19.212 4.616c-23.31 0-42.207-18.897-42.207-42.208v-.056Zm84.415.056c0 12.144-5.129 23.09-13.338 30.79L97 87.717l18.787-10.64c-8.21-7.7-13.338-18.645-13.338-30.789 0-1.945.132-3.86.387-5.734a13.899 13.899 0 0 0-5.664-1.21c-2.116 0-4.137.482-5.988 1.358a42.6 42.6 0 0 1 .367 5.586Zm-42.208 31.05c2.218 0 4.382-.232 6.468-.674l-35.847-20.3c4.184 12.203 15.758 20.974 29.38 20.974Zm31.05-31.05c0-17.148-13.901-31.05-31.05-31.05-16.116 0-29.364 12.279-30.9 27.991L67.86 71.215c7.606-5.66 12.533-14.718 12.533-24.927Zm64.264 31.05c13.621 0 25.195-8.771 29.379-20.974l-35.847 20.3c2.086.442 4.25.674 6.468.674Zm-18.517-6.123 49.418-27.986c-1.537-15.712-14.785-27.99-30.901-27.99-17.149 0-31.05 13.9-31.05 31.05 0 10.208 4.927 19.267 12.533 24.926Z"/></svg>
 </i>`,
];
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
      element.classList.add("paired");
      activeTile.classList.add("paired");

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
