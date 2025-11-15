// 🧠 Demo Quiz Questions (you can replace with your own)
const quizData = [
  {
    question: "What is the capital of India?",
    answers: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    correct: "Delhi",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: "Mars",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correct: "Carbon Dioxide",
  },
  {
    question: "Who wrote 'Ramayana'?",
    answers: ["Tulsidas", "Valmiki", "Vyas", "Kalidas"],
    correct: "Valmiki",
  },
  {
    question: "What is H2O commonly known as?",
    answers: ["Salt", "Hydrogen", "Water", "Oxygen"],
    correct: "Water",
  },
];

let player1 = "";
let player2 = "";
let turn = 1;
let score1 = 0;
let score2 = 0;
let currentQ = 0;

const setupScreen = document.getElementById("setupScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const turnInfo = document.getElementById("turnInfo");
const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");
const winnerText = document.getElementById("winnerText");

// 🎮 Start Game
document.getElementById("startBtn").addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim() || "Player 1";
  player2 = document.getElementById("player2").value.trim() || "Player 2";

  setupScreen.style.display = "none";
  quizScreen.style.display = "block";

  loadQuestion();
});

function loadQuestion() {
  if (currentQ >= quizData.length) return endGame();

  const q = quizData[currentQ];
  turnInfo.textContent = `🎯 ${turn === 1 ? player1 : player2}'s Turn`;
  questionText.textContent = q.question;
  answersDiv.innerHTML = "";
  nextBtn.style.display = "none";

  q.answers.forEach((ans) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.className = "answer-btn";
    btn.onclick = () => handleAnswer(ans, q.correct);
    answersDiv.appendChild(btn);
  });
}

function handleAnswer(selected, correct) {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((btn) => (btn.disabled = true));

  if (selected === correct) {
    if (turn === 1) score1++;
    else score2++;
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQ++;
  turn = turn === 1 ? 2 : 1; // Switch turn
  if (currentQ < quizData.length) loadQuestion();
  else endGame();
});

function endGame() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";

  score1El.textContent = `${player1}: ${score1} points`;
  score2El.textContent = `${player2}: ${score2} points`;

  if (score1 > score2)
    winnerText.textContent = `🏆 Winner: ${player1}!`;
  else if (score2 > score1)
    winnerText.textContent = `🏆 Winner: ${player2}!`;
  else winnerText.textContent = "🤝 It's a tie!";
}

document.getElementById("restartBtn").addEventListener("click", () => {
  location.reload();
});

document.getElementById("homeBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});
