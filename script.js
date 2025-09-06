
const sheetId = "1pjBj8nzDLD8vARfs5IiaCtczvbOP0JX7gUXswVKs88k";
const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
const goals = [5000, 50000];
const cells = ["B2", "B3"];
const puzzleIds = ["puzzle1", "puzzle2"];
const imagePaths = ["images/image1_resized.jpg", "images/image2_resized.jpg"];

function createPuzzle(puzzleId, imagePath, progress) {
  const container = document.getElementById(puzzleId);
  const totalPieces = 625;
  const piecesToShow = Math.floor(progress * totalPieces);
  const indices = Array.from({length: totalPieces}, (_, i) => i);
  const shuffled = indices.sort(() => 0.5 - Math.random()).slice(0, piecesToShow);

  shuffled.forEach(index => {
    const x = index % 25;
    const y = Math.floor(index / 25);
    const piece = document.createElement("div");
    piece.style.left = `${x * 20}px`;
    piece.style.top = `${y * 20}px`;
    piece.style.backgroundImage = `url(${imagePath})`;
    piece.style.backgroundPosition = `-${x * 20}px -${y * 20}px`;
    container.appendChild(piece);
  });
}

function fetchData() {
  cells.forEach((cell, i) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!${cell}?key=${apiKey}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const value = parseFloat(data.values[0][0]);
        const progress = Math.min(value / goals[i], 1);
        createPuzzle(puzzleIds[i], imagePaths[i], progress);
      })
      .catch(err => console.error("Error fetching data:", err));
  });
}

window.onload = fetchData;
