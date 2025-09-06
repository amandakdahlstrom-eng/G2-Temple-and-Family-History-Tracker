let confettiFired = {}; // Tracks which puzzles have already celebrated

// Run when the whole page is loaded (DOM, images, styles)
window.onload = function () {
  createPuzzle('puzzle1', 'Temple.webp', 25, 25);
  createPuzzle('puzzle2', 'https://github.com/amandakdahlstrom-eng/G2-Temple-and-Family-History-Tracker/blob/d943f5acbaf5660617d2ea545566e841af0c18b7/indexing.jpeg', 50, 50);
  fetchProgress();
};

/**
 * Create the puzzle pieces inside the container.
 * @param {string} containerId - The ID of the container div.
 * @param {string} imageUrl - The image URL to use for pieces.
 * @param {number} rows - Number of rows.
 * @param {number} cols - Number of columns.
 */
function createPuzzle(containerId, imageUrl, rows, cols) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found.`);
    return;
  }
  
  container.innerHTML = ''; // Clear any existing pieces

  // Set CSS grid layout properties
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  container.style.gap = '2px';

  // Create puzzle pieces with appropriate background image positioning
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const piece = document.createElement('div');
      piece.className = 'puzzle-piece';
      piece.style.backgroundImage = `url(${imageUrl})`;
      piece.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
      piece.style.backgroundPosition = `${(c / (cols - 1)) * 100}% ${(r / (rows - 1)) * 100}%`;
      piece.style.opacity = 0;
      container.appendChild(piece);
    }
  }
}

/**
 * Reveal pieces of the puzzle according to progress.
 * @param {string} containerId - The ID of the puzzle container.
 * @param {number} progress - Current progress value.
 * @param {number} goal - Goal value to reach full puzzle.
 */
function revealPuzzle(containerId, progress, goal) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found.`);
    return;
  }

  const pieces = Array.from(container.children);
  const totalPieces = pieces.length;
  const visibleCount = Math.floor((progress / goal) * totalPieces);

  // Shuffle pieces randomly
  const shuffled = [...pieces];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Reveal the appropriate number of pieces
  shuffled.forEach((piece, index) => {
    piece.classList.toggle('revealed', index < visibleCount);
  });

  // Launch confetti once when goal is reached
  if (progress >= goal && !confettiFired[containerId]) {
    launchConfetti();
    confettiFired[containerId] = true;
  }
}

/**
 * Launches confetti using the confetti library.
 */
function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

/**
 * Fetch progress data from external source and update puzzle.
 */
async function fetchProgress() {
  const url = 'https://script.google.com/macros/s/AKfycbxn0HT3qx7hne-H0MAhYRmDr9DGJjic1mdvJBrXA7f8ZDCz6zE8SXF5uXswHQ8Hm80j/exec';
  
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log("Fetched data:", data);

    revealPuzzle('puzzle1', data.goal1, 5000);
    revealPuzzle('puzzle2', data.goal2, 50000);

    document.getElementById('progress1').textContent = `Progress: ${data.goal1} / 5000`;
    document.getElementById('progress2').textContent = `Progress: ${data.goal2} / 50000`;

    // Hide loading indicator once data is ready
    const loadingEl = document.getElementById('loading');
    if (loadingEl) loadingEl.style.display = 'none';

  } catch (error) {
    console.error("Failed to fetch progress data:", error);
  }
}
