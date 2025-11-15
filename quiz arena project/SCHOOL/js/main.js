// -------------------------------------------------------
// main.js — Page Router + Audio Unlock + Global Constants
// -------------------------------------------------------

const POINTS_CORRECT = 10;
const DEFAULT_TIME = 10;

// 🔊 Unlock AudioContext once the user interacts
document.addEventListener("click", function unlockAudio() {
  try {
    window.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtx.resume();
  } catch (e) {
    console.warn("⚠️ Audio unlock failed:", e);
  }
  document.removeEventListener("click", unlockAudio);
}, { once: true });

// 🧠 Page Router — detects current page & calls correct init()
function routeInit() {
  const page = document.body?.dataset?.page;
  if (!page) {
    console.warn("⚠️ No data-page found on <body>");
    return;
  }

  console.log("📄 Active Page:", page);

  const routes = {
    "class-select": window.initClassSelect,
    "stream-select": window.initStreamSelect,
    "subject-select": window.initSubjectSelect,
    "quiz": window.initQuiz,
    "result": window.initResult
  };

  const fn = routes[page];

  if (typeof fn === "function") {
    fn();
    console.log(`✅ Initialized ${page} page`);
  } else {
    console.warn(`⚠️ No init function found for page '${page}'`);
  }
}

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", routeInit);

