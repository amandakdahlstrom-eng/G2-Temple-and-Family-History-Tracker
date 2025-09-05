let confettiFired = {}; // Tracks which puzzles have already celebrated
function revealPuzzle(containerId, progress, goal) {
  const container = document.getElementById(containerId);
  const pieces = container.children;
  const totalPieces = pieces.length;

  // Calculate how many tiles to show
  const visibleCount = Math.floor((progress / goal) * totalPieces);

  // Reveal the correct number of tiles
  for (let i = 0; i < totalPieces; i++) {
    pieces[i].style.opacity = i < visibleCount ? 1 : 0;
  }

  // 🎉 Trigger confetti if goal is reached and hasn't fired yet
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
  const url = 'https://script.google.com/macros/s/AKfycbyYLJsi5-a3-W6YuKSbYYJxdK9qnAA-qtQO30MI9ESS4DoGYD4SaQn_1SyIgKNjQqFY/exec'; // Replace with your actual URL
  try {
    const res = await fetch(url);
    const data = await res.json();

    // Reveal based on live data
    
    revealPuzzle('puzzle1', data.goal1, 5000); // Adjust goal as needed
    revealPuzzle('puzzle2', data.goal2, 50000);  // Adjust goal as needed
  } catch (error) {
    console.error("Failed to fetch progress data:", error);
  }
  
}
window.onload = function () {
  createPuzzle('puzzle1', 'Idaho Falls temple.webp', 5, 5);
  createPuzzle('puzzle2', 'Indexing.jpeg', 5, 5);
  fetchProgress();
};

