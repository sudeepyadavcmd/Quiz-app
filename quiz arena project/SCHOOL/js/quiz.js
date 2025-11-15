// -------------------------------------------------------
// quiz.js — Handles Quiz Logic (final fixed version)
// -------------------------------------------------------

function initQuiz() {
  console.log("📘 Quiz Page Loaded");

  // 🧩 UI Elements
  const qIndexEl = document.getElementById("q-index");
  const qTotalEl = document.getElementById("q-total");
  const timerLabelEl = document.getElementById("timer-label");
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  // 🧩 User Selections
  const userClass = localStorage.getItem("userClass") || "12";
  const userStream = localStorage.getItem("userStream") || "science";
  const userSubject = localStorage.getItem("userSubject") || "physics";
  const userLevel = localStorage.getItem("userLevel") || "easy";
  const numQuestions = parseInt(localStorage.getItem("numQuestions") || "10", 10);

  // 🕒 Start time tracking
  let quizStartTime = Date.now();

  // 🧠 Load Questions
  let allQuestions = getQuestions({ userClass, userStream, userSubject, userLevel });
  let questions = [];

  if (!allQuestions || allQuestions.length === 0) {
    console.warn("⚠️ No questions found, using fallback");
    questions = [
      {
        question: "Fallback: 2 + 2 = ?",
        answers: [
          { text: "4", correct: true },
          { text: "3" },
          { text: "5" },
          { text: "6" }
        ],
        explanation: "2 + 2 = 4"
      }
    ];
  } else {
    questions = allQuestions.slice(0, Math.min(numQuestions, allQuestions.length));
  }

  console.log(`✅ Loaded ${questions.length} questions for quiz.`);

  let currentIndex = 0;
  let score = 0;
  let timer = null;
  let answered = false;

  const userAnswers = questions.map(() => ({
    chosen: null,
    isCorrect: false,
    correctAnswer: "",
    explanation: ""
  }));

  // ⏱️ Timer
  function startTimer() {
  clearInterval(timer);
  const circle = document.querySelector(".progress-ring__circle");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = 0;

  let t = DEFAULT_TIME;
  timerLabelEl.textContent = t;

  // Reset circle progress
  function setProgress(timeLeft) {
    const offset = circumference - (timeLeft / DEFAULT_TIME) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  timer = setInterval(() => {
    t--;
    timerLabelEl.textContent = t;
    setProgress(t);
    if (t <= 3 && t > 0 && !answered) playBeep();
    if (t <= 0) {
      clearInterval(timer);
      setProgress(0);
      setTimeout(nextQuestion, 800);
    }
  }, 1000);
}


  // 🧩 Display Question
  function setQuestion() {
    answered = false;
    const q = questions[currentIndex];
    qIndexEl.textContent = currentIndex + 1;
    qTotalEl.textContent = questions.length;

    questionText.textContent = q.question;
    answerButtons.innerHTML = "";

    const answers = [...q.answers];
    shuffle(answers);

    answers.forEach(ans => {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.textContent = ans.text;
      btn.addEventListener("click", () => onAnswerClick(btn, ans));
      answerButtons.appendChild(btn);
    });

    nextBtn.style.display = "none";
    submitBtn.style.display = "none";
    startTimer();
  }

  // 🧠 When user selects an answer
  function onAnswerClick(btn, ans) {
    answered = true;
    Array.from(answerButtons.children).forEach(b => (b.disabled = true));
    clearInterval(timer);

    const isCorrect = !!ans.correct;
    if (isCorrect) {
      btn.classList.add("answer-correct");
      score += POINTS_CORRECT;
    } else {
      btn.classList.add("answer-wrong");
    }

    const q = questions[currentIndex];
    userAnswers[currentIndex] = {
      chosen: ans.text,
      isCorrect,
      correctAnswer: (q.answers.find(a => a.correct) || {}).text || "N/A",
      explanation: q.explanation || "No explanation provided."
    };

    if (currentIndex < questions.length - 1) {
      nextBtn.style.display = "inline-block";
    } else {
      submitBtn.style.display = "inline-block";
    }

    nextBtn.disabled = false;
  }

  // ⏭️ Next Question
  function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) setQuestion();
    else finishQuiz();
  }

  // 🏁 End Quiz & Save Results
  // 🏁 End Quiz & Save Results
function finishQuiz() {
  const quizEndTime = Date.now();
  const timeTaken = Math.floor((quizEndTime - quizStartTime) / 1000);

  localStorage.setItem("quizScore", score);
  localStorage.setItem("quizTotal", questions.length * POINTS_CORRECT);
  localStorage.setItem("quizAnswers", JSON.stringify(userAnswers));
  localStorage.setItem("quizQuestions", JSON.stringify(questions));
  localStorage.setItem("quizTimeTaken", String(timeTaken));

  console.log("✅ Quiz data saved:", {
    score,
    total: questions.length * POINTS_CORRECT,
    timeTaken,
    userAnswers,
  });

  // 🎉 Celebration before redirect
  showCelebration();

  // ⏳ Redirect after a short delay (so effect is visible)
  setTimeout(() => {
    location.href = "result.html";
  }, 5500);
}

  // 🎧 Beep Sound
  function playBeep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      gain.gain.value = 0.1;
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.warn("Beep failed:", e);
    }
  }

  // 🎯 Keyboard Controls
  // ✅ Keyboard Shortcuts for Quiz Page
document.addEventListener("keydown", (e) => {
  const answerBtns = Array.from(answerButtons.children);

  // 1️⃣ Select options with keys 1–4
  if (["1", "2", "3", "4"].includes(e.key)) {
    const idx = parseInt(e.key) - 1;
    if (answerBtns[idx] && !answerBtns[idx].disabled) {
      answerBtns[idx].click();
    }
  }

  // 2️⃣ Press Enter → go to next OR submit
  if (e.key === "Enter") {
    e.preventDefault();

    if (
      nextBtn &&
      nextBtn.style.display !== "none" &&
      !nextBtn.disabled
    ) {
      nextBtn.click(); // Go to next question
    } else if (
      submitBtn &&
      submitBtn.style.display !== "none" &&
      !submitBtn.disabled
    ) {
       
      submitBtn.click(); // ✅ Submit quiz when it's the last question
    }
  }
});

  // 🧩 Button Events
  nextBtn.addEventListener("click", nextQuestion);
  submitBtn.addEventListener("click", finishQuiz);


  // 🟩 Start the Quiz
  setQuestion();
}

// ✅ Global export
window.initQuiz = initQuiz;

// 🎉 Celebration Function (College Style)
function showCelebration() {
  // ✅ 1. Confetti animation (Canvas Confetti)
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
  document.body.appendChild(script);

  script.onload = () => {
    const duration = 1 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    // 2. Show Congratulations message ABOVE quiz card
    const quizContainer = document.querySelector(".container");
    let msg = document.getElementById("quizMessage");

    // Agar message div pehle se nahi hai to create karo
    if (!msg) {
      msg = document.createElement("div");
      msg.id = "quizMessage";
      msg.className = "quiz-message";
      quizContainer.prepend(msg);
    }

    msg.innerHTML = "🎉 Congratulations! You finished the quiz! 🎓";
    msg.style.display = "block";

    //  Hide after 3 seconds
    setTimeout(() => {
      msg.style.display = "none";
    }, 3000);

    //  3. Play applause sound
    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_5e1d4be24a.mp3?filename=applause-81577.mp3"
    );
    audio.play();
  };
}
