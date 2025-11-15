// -------------------------------------------------------------
// subject-select.js — Handles subject, level, and question count
// -------------------------------------------------------------
function initSubjectSelect() {
  console.log("📘 Subject Select Page Loaded");

  const userClass = get("userClass") || "9";
  const userStream = get("userStream");

  const subjectList = $("#subjectList");
  const numInput = $("#numInput");
  const levelList = $("#levelList");
  const startBtn = $("#startBtn");

  // 🧠 Populate subjects based on class & stream
  subjectList.innerHTML = '<option value="">-- Select Subject --</option>';
  let subjects = [];

  if (["1", "2"].includes(userClass)) {
    subjects = ["English", "Hindi", "Mathematics", "EVS"];
  } else if (["3", "4", "5"].includes(userClass)) {
    subjects = ["English", "Hindi", "Mathematics", "EVS", "Science", "Social Science", "Computer"];
  } else if (["6", "7", "8"].includes(userClass)) {
    subjects = ["English", "Hindi", "Mathematics", "Science", "History", "Geography", "Civics", "Computer"];
  } else if (["9", "10"].includes(userClass)) {
    if (userStream === "science") subjects = ["Physics", "Chemistry", "Biology"];
    else if (userStream === "sst") subjects = ["History", "Civics", "Geography", "Economics"];
    else if (userStream === "maths") subjects = ["Mathematics"];
    else subjects = ["General"];
  } else if (["11", "12"].includes(userClass)) {
    const map = {
      science: ["Physics", "Chemistry", "Mathematics", "Biology"],
      commerce: ["Accountancy", "Business Studies", "Economics", "English", "Mathematics"],
      arts: ["History", "Political Science", "Geography", "English", "Economics"],
    };
    subjects = map[userStream] || ["General"];
  }

  // 🧩 Add subjects to dropdown
  subjects.forEach(s => {
    const opt = create("option", {}, s);
    opt.value = s.toLowerCase().replace(/\s+/g, '');
    opt.textContent = s;
    subjectList.appendChild(opt);
  });

  // 🧩 Enable/disable Start button based on all selections
  function checkEnable() {
    const selectedSubject = subjectList.value;
    const n = parseInt(numInput.value || "0", 10);
    const selectedLevel = levelList.value;

    // ✅ Enable button only when subject, level, and valid number entered
    const isValid = selectedSubject && selectedLevel && n > 0 && n <= 1000;
    startBtn.disabled = !isValid;
  }

  // 🔄 Event listeners for validation
  on(subjectList, "change", checkEnable);
  on(numInput, "input", () => {
    if (numInput.value > 1000) numInput.value = 1000;
    checkEnable();
  });
  on(levelList, "change", () => {
    save("userLevel", levelList.value);
    checkEnable();
  });

  // ▶️ Start quiz when button clicked
  on(startBtn, "click", () => {
    save("userSubject", subjectList.value);
    save("numQuestions", String(Math.min(1000, parseInt(numInput.value || "10", 10))));
    location.href = "quiz.html";
  });

  // ⌨️ Press Enter to start (only if all valid)
  document.addEventListener("keydown", e => {
    if (e.key === "Enter" && !startBtn.disabled) {
      e.preventDefault();
      startBtn.click();
    }
  });
}

// ✅ Make global for main.js
window.initSubjectSelect = initSubjectSelect;
