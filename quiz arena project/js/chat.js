const chatContent = document.getElementById("chatContent");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const closeChat = document.getElementById("closeChat");

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

closeChat.addEventListener("click", () => {
  window.location.href = "index.html";
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;
  addMessage("user", message);
  chatInput.value = "";

  // simulate bot thinking
  const typingMsg = addTypingEffect();
  setTimeout(() => {
    typingMsg.remove();
    botReply(message.toLowerCase());
  }, 800);
}

function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
  msgDiv.innerHTML = `<strong>${sender === "user" ? "You" : "Quizzy"}:</strong> ${text}`;
  chatContent.appendChild(msgDiv);
  chatContent.scrollTop = chatContent.scrollHeight;
}

function addTypingEffect() {
  const typing = document.createElement("div");
  typing.classList.add("bot-message");
  typing.textContent = "Quizzy is typing...";
  chatContent.appendChild(typing);
  chatContent.scrollTop = chatContent.scrollHeight;
  return typing;
}

function botReply(message) {
  let reply;

  if (message.includes("hello") || message.includes("hi")) {
    reply = "Hey there! 👋 Ready to test your brain today?";
  } else if (message.includes("quiz")) {
    reply = "To start a quiz, go to Home and click 'Start Quiz 🚀'.";
  } else if (message.includes("profile")) {
    reply = "Check your Profile 👤 to see your details.";
  } else if (message.includes("leaderboard") || message.includes("friends")) {
    reply = "🏆 You can view your friends' scores on the Leaderboard page.";
  } else if (message.includes("signup") || message.includes("login")) {
    reply = "Sign up or log in from the main page to track your progress.";
  } else if (message.includes("bye")) {
    reply = "Goodbye 👋 — Keep learning and come back soon!";
  } else {
    reply = "Hmm 🤔 I didn’t catch that. Try asking about quiz, profile, or leaderboard!";
  }

  addMessage("bot", reply);
}
