const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxdOYFY1YhYUM51OJ2mJH4FcVrnyhROmlukMie7tBh45Wqe-M54MMe7_pTGrOnZchDWWXG33g3oqSq/pub?gid=1067605396&single=true&output=csv";
const goal1 = 5000;
const goal2 = 50000;
const gridSize = 25;
const totalTiles = gridSize * gridSize;

function createPuzzle(containerId, imageUrl, revealedTiles) {
  const container = document.getElementById(containerId);
  const indices = Array.from({ length: totalTiles }, (_, i) => i);
  const shuffled = indices.sort(() => 0.5 - Math.random()).slice(0, revealedTiles);

  shuffled.forEach(index => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const tile = document.createElement("div");
    tile.style.left = `${col * 20}px`;
    tile.style.top = `${row * 20}px`;
    tile.style.backgroundImage = `url(${imageUrl})`;
    tile.style.backgroundPosition = `-${col * 20}px -${row * 20}px`;
    container.appendChild(tile);
  });
}

fetch(csvUrl)
  .then(response => response.text())
  .then(data => {
    const rows = data.split("\n").map(row => row.split(","));
    const value1 = parseFloat(rows[1][1]);
    const value2 = parseFloat(rows[2][1]);

    const progress1 = Math.min(value1 / goal1, 1.0);
    const progress2 = Math.min(value2 / goal2, 1.0);

    const tiles1 = Math.floor(progress1 * totalTiles);
    const tiles2 = Math.floor(progress2 * totalTiles);

    createPuzzle("puzzle1", "image1_resized.jpg", tiles1);
    createPuzzle("puzzle2", "image2_resized.jpg", tiles2);

    // Display numerical progress
    document.getElementById("progress1").textContent = `${value1.toLocaleString()} / ${goal1.toLocaleString()}`;
    document.getElementById("progress2").textContent = `${value2.toLocaleString()} / ${goal2.toLocaleString()}`;

    // ✅ Display percentage progress
    const percent1 = (progress1 * 100).toFixed(1);
    const percent2 = (progress2 * 100).toFixed(1);
    document.getElementById("percentage1").textContent = `${percent1}% complete`;
    document.getElementById("percentage2").textContent = `${percent2}% complete`;
  })
  .catch(error => console.error("Error fetching CSV:", error));
