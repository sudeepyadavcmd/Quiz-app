const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value.trim();

    if (!name || !email || !password) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    if (localStorage.getItem(email + "_data")) {
      alert("⚠️ Email already registered. Please login!");
      window.location.href = "login.html";
      return;
    }

    const data = { name, email, password };
    localStorage.setItem(email + "_data", JSON.stringify(data));
    localStorage.setItem("loggedInUser", email);
    alert("✅ Signup successful!");
    window.location.href = "profile.html";
  });
}
