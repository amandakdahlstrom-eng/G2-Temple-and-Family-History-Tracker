// Google Sheets API endpoint for cell B2 in Sheet1
const sheetURL = "https://docs.google.com/spreadsheets/d/1pjBj8nzDLD8vARfs5IiaCtczvbOP0JX7gUXswVKs88k/gviz/tq?tqx=out:json&tq=SELECT B LIMIT 1&sheet=Sheet1";

// Goal value
const goal = 5000;

fetch(sheetURL)
  .then(response => response.text())
  .then(data => {
    const jsonData = JSON.parse(data.substr(47).slice(0, -2));
    const value = parseFloat(jsonData.table.rows[0].c[0].v);
    const percent = Math.min((value / goal) * 100, 100);
    document.getElementById('fill').style.height = percent + '%';
    document.getElementById('goalText').innerText = value + ' / ' + goal;
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    document.getElementById('goalText').innerText = "Error loading data";
  });
