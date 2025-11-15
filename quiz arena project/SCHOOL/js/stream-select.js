// -------------------------------------------------------
// stream-select.js — Stream selection logic
// -------------------------------------------------------
function initStreamSelect() {
  console.log("📘 Stream Select Page Loaded");

  const userClass = localStorage.getItem("userClass");
  const container = document.getElementById("streams");
  const nextBtn = document.getElementById("nextBtn");
  const backBtn = document.getElementById("backBtn");
  let selectedStream = null;

  let streams = [];

  if (userClass === "11" || userClass === "12") {
    streams = [
      { key: "science", title: "Science Stream" },
      { key: "commerce", title: "Commerce Stream" },
      { key: "arts", title: "Arts / Humanities" }
    ];
  } else if (userClass === "9" || userClass === "10") {
    streams = [
      { key: "science", title: "Science" },
      { key: "maths", title: "Mathematics" },
      { key: "sst", title: "Social Science" },
      { key: "english", title: "English Language & Literature" },
      { key: "hindi", title: "Hindi / Regional Language" },
      { key: "it", title: "Computer / Information Technology" }
    ];
  } else {
    // Lower classes skip this page
    location.href = "subject-select.html";
    return;
  }

  // 🧩 Create option cards
  container.innerHTML = "";
  streams.forEach(s => {
    const div = document.createElement("div");
    div.className = "option-card";
    div.textContent = s.title;
    div.onclick = () => {
      document.querySelectorAll(".option-card").forEach(c => c.classList.remove("selected"));
      div.classList.add("selected");
      selectedStream = s.key;
      nextBtn.disabled = false;
    };
    container.appendChild(div);
  });

  // 🔘 Buttons
  nextBtn.onclick = () => {
    if (!selectedStream) return;
    localStorage.setItem("userStream", selectedStream);
    location.href = "subject-select.html";
  };

  backBtn.onclick = () => {
    location.href = "class-select.html";
  };
  // ✅ Enable Enter key to act like clicking "Next"
document.addEventListener("keydown", (e) => {
  const nextBtn = document.getElementById("nextBtn");
  if (e.key === "Enter" && nextBtn && !nextBtn.disabled) {
    e.preventDefault();
    nextBtn.click();
  }
});

}
