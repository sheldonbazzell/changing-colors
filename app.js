/* set used verify whether a randomly selected
sqaure is ready to change colors (i.e. if 2s has passed) */
var noSelect = new Set();
/* string used to revert previously updated square's color to white */
var prev;

function selectSquare() {
  return new Promise(resolve => {
    var rand = Math.floor(Math.random() * 15).toString();
    if (noSelect.has(rand)) {
      selectSquare();
    } else {
      resolve(rand);
    }
  });
}

function updateColor(color, payload) {
  document.getElementById(payload).style.background = color;
}

function updateSet(id) {
  noSelect.add(id);
  setTimeout(() => noSelect.delete(id), 2000);
}

setInterval(() => {
  selectSquare()
    .then(x => {
      updateSet(x);
      prev !== undefined ? updateColor('white', prev) : null
      updateColor('gray', x);
      prev = x;
    })
}, 250)