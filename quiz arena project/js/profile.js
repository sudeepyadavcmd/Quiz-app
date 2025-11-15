document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");
  const logoutBtn = document.getElementById("logoutBtn");
  const homeBtn = document.getElementById("homeBtn");

  const loggedUser = localStorage.getItem("loggedInUser");

  if (!loggedUser) {
    alert("⚠️ You are not logged in!");
    window.location.href = "login.html";
    return;
  }

  const userDataRaw = localStorage.getItem(loggedUser + "_data");
  if (!userDataRaw) {
    alert("⚠️ User data not found. Please login again!");
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
    return;
  }

  const userData = JSON.parse(userDataRaw);

  // 🧠 Display user info
  nameEl.textContent = userData.name || "Unknown";
  emailEl.textContent = userData.email || "Not Available";

  // 🚪 Logout button
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    alert("👋 Logged out successfully!");
    window.location.href = "index.html";
  });

  // 🏠 Home button
  homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
