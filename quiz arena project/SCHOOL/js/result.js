// -------------------------------------------------------
// result.js — Displays Quiz Summary, Explanations & Stats
// + Saves scores for "Compete with Friends" leaderboard 🏆
// -------------------------------------------------------

function initResult() {
  console.log("📘 Result Page Loaded");

  const score = parseInt(localStorage.getItem("quizScore") || "0", 10);
  const total = parseInt(localStorage.getItem("quizTotal") || "0", 10);
  const timeTaken = parseInt(localStorage.getItem("quizTimeTaken") || "0", 10);
  const questions = JSON.parse(localStorage.getItem("quizQuestions") || "[]");
  const answers = JSON.parse(localStorage.getItem("quizAnswers") || "[]");

  const finalScoreEl = document.getElementById("final-score");
  const percentScoreEl = document.getElementById("percent-score");
  const statsEl = document.getElementById("result-stats");
  const summaryList = document.getElementById("summary-list");

  if (!questions.length) {
    summaryList.innerHTML = "<p>No quiz data found.</p>";
    return;
  }

  const correctCount = answers.filter(a => a.isCorrect).length;
  const wrongCount = answers.length - correctCount;
  const percent = total ? Math.round((score / total) * 100) : 0;

  // Display stats
  finalScoreEl.textContent = `Score: ${score} / ${total}`;
  percentScoreEl.textContent = `Accuracy: ${percent}%`;
  statsEl.textContent = `✅ Correct: ${correctCount} | ❌ Wrong: ${wrongCount} | 🕒 Time: ${timeTaken}s`;

  // Build summary
  summaryList.innerHTML = "";
  questions.forEach((q, i) => {
    const userAns = answers[i] || {};
    const correctAns = q.answers.find(a => a.correct)?.text || "N/A";

    const item = document.createElement("div");
    item.className = "summary-item " + (userAns.isCorrect ? "correct" : "wrong");
    item.innerHTML = `
      <div class="q-text">Q${i + 1}: ${q.question}</div>
      <div><strong>Your Answer:</strong> ${userAns.chosen || "Not answered"} ${userAns.isCorrect ? "✅" : "❌"}</div>
      ${!userAns.isCorrect ? `<div><strong>Correct Answer:</strong> ${correctAns}</div>` : ""}
      <div class="exp-text"><strong>Explanation:</strong> ${q.explanation || "No explanation provided."}</div>
    `;
    summaryList.appendChild(item);
  });

  // 🏆 COMPETE WITH FRIENDS — Save to Leaderboard
  saveToLeaderboard(score);

  // Buttons
  document.getElementById("restartBtn").addEventListener("click", () => {
    localStorage.clear();
    location.href = "subject-select.html";
  });

  document.getElementById("homeBtn").addEventListener("click", () => {
    location.href = "class-select.html";
  });
}

// 🏆 Save Score for Leaderboard
function saveToLeaderboard(finalScore) {
  const loggedUser = localStorage.getItem("loggedInUser");
  if (!loggedUser) {
    console.warn("⚠️ No logged-in user — leaderboard not updated");
    return;
  }

  // Fetch user info
  const userData = JSON.parse(localStorage.getItem(loggedUser + "_data")) || {};
  const name = userData.name || "Player";
  const email = userData.email || loggedUser;

  // Get leaderboard data
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  // Check if user already exists
  const existing = leaderboard.find(l => l.email === email);
  if (existing) {
    if (finalScore > existing.score) existing.score = finalScore; // update best score only
  } else {
    leaderboard.push({ name, email, score: finalScore });
  }

  // Sort scores (highest first)
  leaderboard.sort((a, b) => b.score - a.score);

  // Save updated data
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  console.log("🏆 Leaderboard updated:", leaderboard);
}

window.initResult = initResult;
