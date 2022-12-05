import anime from "./node_modules/animejs/lib/anime.es.js";
const wrapper = document.getElementById("tiles");

let columns = 0,
  rows = 0,
  toggled = false;

const toggle = () => {
  toggled = !toggled;

  document.body.classList.toggle("toggled");
};

const handleOnClick = (index) => {
  toggle();

  anime({
    targets: ".tile",
    opacity: toggled ? ["0%", "100%"] : ["100%", "0%"],
    delay: anime.stagger(80, {
      grid: [columns, rows],
      from: index,
    }),
  });
};

const createTile = (index, options) => {
  const tile = document.createElement("div");
  let toggled;

  if (options) {
    tile.classList.add(options);
    tile.classList.add("toggled");
    toggled = true;
  } else {
    tile.classList.add("tile");
  }

  tile.style.opacity = toggled ? 0 : 1;
  tile.onclick = (e) => handleOnClick(index);
  return tile;
};

const createTiles = (quantity, columns, rows) => {
  const profile = placementCalculator("profile", columns, rows);
  const contact = placementCalculator("contact", columns, rows);
  const projects = placementCalculator("projects", columns, rows);
  Array.from(Array(quantity)).map((tile, index) => {
    let options;
    switch (index) {
      case profile:
      case profile + columns:
      case profile + columns + 1:
      case profile + columns - 1:
      case profile + 1:
      case profile - 1:
        options = "profile";
        break;
      case contact:
      case contact + columns:
      case contact + columns + 1:
      case contact + columns - 1:
      case contact + 1:
      case contact - 1:
        options = "contact";
        break;
      case projects:
      case projects + columns:
      case projects + columns + 1:
      case projects + columns - 1:
      case projects + 1:
      case projects - 1:
        options = "projects";
        break;
      case profile:
      case profile + columns:
      case profile + columns + 1:
      case profile + columns - 1:
      case profile + 1:
      case profile - 1:
        options = "profile";
        break;
    }
    wrapper.appendChild(createTile(index, options));
  });
};

const createGrid = () => {
  wrapper.innerHTML = "";

  const size = document.body.clientWidth > 800 ? 45 : 45;

  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);

  createTiles(columns * rows, columns, rows);
};

const placementCalculator = (option) => {
  switch (option) {
    case "profile":
      return 4 + columns * 2;
    case "contact":
      return 6 + columns * 15;
  }
};

createGrid();

window.onresize = () => createGrid();
