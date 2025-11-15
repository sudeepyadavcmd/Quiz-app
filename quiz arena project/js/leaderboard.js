const tableBody = document.querySelector("#leaderboardTable tbody");
const clearBtn = document.getElementById("clearBtn");

function loadLeaderboard() {
  const data = JSON.parse(localStorage.getItem("leaderboard")) || [];
  tableBody.innerHTML = "";

  if (data.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="3">No scores yet. Be the first to play! 🎯</td>`;
    tableBody.appendChild(tr);
    return;
  }

  // Sort high to low
  data.sort((a, b) => b.score - a.score);

  data.forEach((player, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>#${index + 1}</td>
      <td>${player.name}</td>
      <td>${player.score}</td>
    `;
    tableBody.appendChild(tr);
  });
}

clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear leaderboard?")) {
    localStorage.removeItem("leaderboard");
    loadLeaderboard();
  }
});

loadLeaderboard();
