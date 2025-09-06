let confettiFired = {}; // Tracks which puzzles have already celebrated

function createPuzzle(containerId, imageUrl, rows, cols) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  container.style.width = '500px';
  container.style.height = '500px';
  container.style.gap = '2px';

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const piece = document.createElement('div');
      piece.className = 'puzzle-piece';
      piece.style.backgroundImage = `url(${imageUrl})`;
      piece.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
      piece.style.backgroundPosition = `${(c / (cols - 1)) * 100}% ${(r / (rows - 1)) * 100}%`;
      piece.style.opacity = 1;
      container.appendChild(piece);
    }
  }
}

function revealPuzzle(containerId, progress, goal) {
  const container = document.getElementById(containerId);
  const pieces = Array.from(container.children);
  const totalPieces = pieces.length;
  const visibleCount = Math.floor((progress / goal) * totalPieces);

  // Shuffle the pieces array
  const shuffled = [...pieces];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Reveal the correct number of shuffled tiles
  shuffled.forEach((piece, index) => {
    piece.classList.toggle('revealed', index < visibleCount);
  });

  // Trigger confetti if goal is reached and hasn't fired yet
  if (progress >= goal && !confettiFired[containerId]) {
    launchConfetti();
    confettiFired[containerId] = true;
  }
}

function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

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

    document.getElementById('loading').style.display = 'none';
  } catch (error) {
    console.error("Failed to fetch progress data:", error);
  }
}

window.onload = function () {
  createPuzzle('puzzle1', 'temple.webp', 5, 5);
  createPuzzle('puzzle2', 'indexing.jpeg', 5, 5);
  fetchProgress();
  
};
