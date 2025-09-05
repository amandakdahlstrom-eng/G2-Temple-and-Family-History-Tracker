async function fetchProgress() {
  const url = 'https://script.google.com/macros/s/AKfycbyYLJsi5-a3-W6YuKSbYYJxdK9qnAA-qtQO30MI9ESS4DoGYD4SaQn_1SyIgKNjQqFY/exec'; // Replace with your actual URL
  try {
    const res = await fetch(url);
    const data = await res.json();

    // Create puzzles
    createPuzzle('puzzle1', 'goal1.jpg', 5, 5);
    createPuzzle('puzzle2', 'goal2.jpg', 5, 5);

    // Reveal based on live data
    revealPuzzle('puzzle1', data.goal1, 5000); // Adjust goal as needed
    revealPuzzle('puzzle2', data.goal2, 50000);  // Adjust goal as needed
  } catch (error) {
    console.error("Failed to fetch progress data:", error);
  }
}
