document.addEventListener("DOMContentLoaded", () => {
  // SIGN UP handler
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      // Check if passwords match
      if (password !== confirmPassword) {
        document.getElementById("signupMessage").textContent = "Passwords do not match!";
        return;
      }

      // Retrieve stored users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "{}");

      // Check if user already exists
      if (users[email]) {
        document.getElementById("signupMessage").textContent = "User already exists!";
        return;
      }

      // Store the new user in localStorage
      users[email] = { name, email, password };
      localStorage.setItem("users", JSON.stringify(users));

      // Store the current logged-in user (for convenience)
      localStorage.setItem("currentUser", JSON.stringify(users[email]));

      // Redirect to login page after successful sign-up
      window.location.href = "login.html";
    });
  }

  // LOGIN handler
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // Retrieve stored users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "{}");

      // Check if user exists and password matches
      if (users[email] && users[email].password === password) {
        // Store the user info in localStorage
        localStorage.setItem("user", JSON.stringify(users[email]));

        // Redirect to dashboard after successful login
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("loginMessage").textContent = "Invalid credentials";
      }
    });
  }
});
