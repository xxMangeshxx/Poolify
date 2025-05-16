// SIGN UP handler
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      if (password !== confirmPassword) {
        document.getElementById("signupMessage").textContent = "Passwords do not match!";
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "{}");

      if (users[email]) {
        document.getElementById("signupMessage").textContent = "User already exists!";
        return;
      }

      users[email] = { name, email, password };
      localStorage.setItem("currentUser", JSON.stringify(users[email]));

      window.location.href = "login.html";
    });
  }

  // LOGIN fallback (already added earlier)
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const users = JSON.parse(localStorage.getItem("users") || "{}");

      if (users[email] && users[email].password === password) {
        localStorage.setItem("user", JSON.stringify(users[email]));
        window.location.href = "dashboard.html"; // placeholder
      } else {
        document.getElementById("loginMessage").textContent = "Invalid credentials";
      }
    });
  }
});
