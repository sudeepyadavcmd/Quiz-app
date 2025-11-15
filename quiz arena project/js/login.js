const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("⚠️ Please enter both email and password!");
      return;
    }

    // 🧠 stored user fetch
    const raw = localStorage.getItem(email + "_data");
    if (!raw) {
      alert("❌ No account found. Please sign up first!");
      window.location.href = "signup.html";
      return;
    }

    try {
      const user = JSON.parse(raw);
      if (user.password === password) {
        localStorage.setItem("loggedInUser", email);
        alert(`✅ Welcome back, ${user.name}!`);
        // redirect logic
        const redirect = localStorage.getItem("redirectAfterLogin");
        if (redirect) {
          localStorage.removeItem("redirectAfterLogin");
          window.location.href = redirect;
        } else {
          window.location.href = "profile.html";
        }
      } else {
        alert("❌ Wrong password!");
      }
    } catch (err) {
      alert("⚠️ Corrupted user data. Please sign up again.");
      localStorage.removeItem(email + "_data");
    }
  });
}
