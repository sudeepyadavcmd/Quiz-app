// -------------------------------------------------------
// data-loader.js — loads correct set of quiz questions
// -------------------------------------------------------

function getQuestions({ userClass, userStream, userSubject, userLevel }) {
  console.log("🧩 QUESTIONS_DATA loaded?", typeof QUESTIONS_DATA);

  // Normalize and clean
  const classKey = `class${String(userClass).trim()}`;
  const streamKey = String(userStream || "").trim().toLowerCase();
  const subjectKey = String(userSubject || "").trim().toLowerCase();
  const levelKey = String(userLevel || "easy").trim().toLowerCase();

  console.log("🧠 Looking for →", { classKey, streamKey, subjectKey, levelKey });

  // Pick correct dataset
  const allData =
    parseInt(userClass) <= 8
      ? typeof QUESTIONS_DATA_1to8 !== "undefined"
        ? QUESTIONS_DATA_1to8
        : {}
      : typeof QUESTIONS_DATA !== "undefined"
      ? QUESTIONS_DATA
      : {};

  let allQuestions = [];

  try {
    // Class 9–12: have streams
    if (parseInt(userClass) >= 9) {
      const found =
        allData?.[classKey]?.[streamKey]?.[subjectKey]?.[levelKey];
      if (Array.isArray(found) && found.length > 0) {
        allQuestions = found;
      }
    } else {
      // Class 1–8: no streams
      const found = allData?.[classKey]?.[subjectKey]?.[levelKey];
      if (Array.isArray(found) && found.length > 0) {
        allQuestions = found;
      }
    }

    if (!allQuestions || allQuestions.length === 0) {
      console.warn(
        `⚠️ No matching questions found for path: QUESTIONS_DATA["${classKey}"]["${streamKey}"]["${subjectKey}"]["${levelKey}"]`
      );
      allQuestions = [
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
      console.log(
        `✅ Found ${allQuestions.length} questions for ${classKey}/${streamKey}/${subjectKey}/${levelKey}`
      );
    }
  } catch (err) {
    console.error("❌ Error loading question data:", err);
  }

  return allQuestions;
}
