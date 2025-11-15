// -------------------------------------------
// script.js — Home Page logic (Final Version)
// -------------------------------------------

// ✍️ Typing animation
const lines = [
  "Challenge your brain 🧠",
  "Compete with friends ⚔️",
  "Learn something new 📚",
  "Climb the leaderboard 🚀"
];

const typedEl = document.getElementById("typedText");
let idx = 0;

function typeLine() {
  if (!typedEl) return;
  const text = lines[idx];
  typedEl.textContent = "";
  let i = 0;

  const t = setInterval(() => {
    typedEl.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(t);
      setTimeout(() => {
        let j = text.length - 1;
        const d = setInterval(() => {
          typedEl.textContent = text.slice(0, j);
          j--;
          if (j < 0) {
            clearInterval(d);
            idx = (idx + 1) % lines.length;
            setTimeout(typeLine, 300);
          }
        }, 25);
      }, 1200);
    }
  }, 50);
}
typeLine();

// 🌌 Particle background
const canvas = document.getElementById("bgParticles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let W = (canvas.width = innerWidth);
  let H = (canvas.height = innerHeight);
  window.addEventListener("resize", () => {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  });

  const particles = [];
  const rand = (min, max) => Math.random() * (max - min) + min;

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: rand(0, W),
      y: rand(0, H),
      r: rand(0.6, 2.2),
      dx: rand(-0.15, 0.15),
      dy: rand(-0.12, 0.12),
      alpha: rand(0.05, 0.4)
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.fillStyle = `rgba(0,195,255,${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ---------------------------------------------------
// ✅ START QUIZ LOGIC — Require Login Before Access
// ---------------------------------------------------
const startBtn = document.getElementById("startQuizButton");
const startLink = document.getElementById("startQuizLink");

function goToQuiz() {
  try {
    // optional click sound
    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_5e1d4be24a.mp3?filename=click-123-457.mp3"
    );
    audio.volume = 0.3;
    audio.play();
  } catch (e) {}

  // check login status
  const user = localStorage.getItem("loggedInUser");

  if (user) {
    // ✅ user logged in — go to class selection
    window.location.href = "school/class-select.html";
  } else {
    // 🚫 user not logged in — save redirect + go to login
    alert("⚠️ Please login or signup before starting the quiz!");
    localStorage.setItem("redirectAfterLogin", "school/class-select.html");
    window.location.href = "login.html";
  }
}

// safely attach event listeners
if (startBtn) startBtn.addEventListener("click", goToQuiz);
if (startLink) {
  startLink.addEventListener("click", (e) => {
    e.preventDefault();
    goToQuiz();
  });
}

// 📅 Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 🤖 Chatbot icon
console.log("🤖 Chatbot icon script loaded");

const chatbotIcon = document.getElementById("chatbotIcon");
if (chatbotIcon) {
  chatbotIcon.addEventListener("click", () => {
    try {
      const audio = new Audio(
        "https://cdn.pixabay.com/download/audio/2022/03/15/audio_5e1d4be24a.mp3?filename=click-123-457.mp3"
      );
      audio.volume = 0.3;
      audio.play();
    } catch (e) {}
    window.location.href = "chat.html";
  });
}

// 👤 Profile link (Navbar style)
const profileLink = document.getElementById("profileLink");
const signupLink = document.getElementById("signupLink");
const logoutLink = document.getElementById("logoutLink");

// check login
const loggedUser = localStorage.getItem("loggedInUser");

if (loggedUser) {
  const userData =
    JSON.parse(localStorage.getItem(loggedUser + "_data")) || {};
  const userName = userData.name || "User";

  // ✅ Show Profile link + Logout
  if (profileLink) {
    profileLink.style.display = "inline";
    profileLink.textContent = `👤 ${userName.split(" ")[0]}`;
  }

  if (logoutLink) logoutLink.style.display = "inline";
  if (signupLink) signupLink.style.display = "none";

  // Click profile link → open profile page
  profileLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "profile.html";
  });
} else {
  // 🚫 Not logged in
  if (profileLink) profileLink.style.display = "none";
  if (logoutLink) logoutLink.style.display = "none";
  if (signupLink) signupLink.style.display = "inline";
}

// ✅ Logout logic
if (logoutLink) {
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    window.location.reload();
  });
}
