let confettiFired = {}; // Tracks which puzzles have already celebrated

function revealPuzzle(containerId, progress, goal) {
  const container = document.getElementById(containerId);
  const pieces = container.children;
  const totalPieces = pieces.length;

  const visibleCount = Math.floor((progress / goal) * totalPieces);

  for (let i = 0; i < totalPieces; i++) {
    pieces[i].style.opacity = i < visibleCount ? 1 : 0;
  }

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
      piece.style.opacity = 0;
      container.appendChild(piece);
    }
  }
}

async function fetchProgress() {
  const url = 'https://script.google.com/macros/s/AKfycbyYLJsi5-a3-W6YuKSbYYJxdK9qnAA-qtQO30MI9ESS4DoGYD4SaQn_1SyIgKNjQqFY/exec';
  try {
    const res = await fetch(url);
    const data = await res.json();

    revealPuzzle('puzzle1', data.goal1, 5000);
    revealPuzzle('puzzle2', data.goal2, 50000);
  } catch (error) {
    console.error("Failed to fetch progress data:", error);
  }
}

window.onload = function () {
  createPuzzle('puzzle1', 'Idaho Falls temple.webp', 5, 5);
  createPuzzle('puzzle2', 'Indexing.jpeg', 5, 5);
  fetchProgress();
};


