document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Simulated user check
  const dummyUser = {
    email: "prat@msrit.edu",
    password: "pass123",
  };

  if (email === dummyUser.email && password === dummyUser.password) {
    localStorage.setItem("user", JSON.stringify(dummyUser));
    window.location.href = "dashboard.html"; // next page we’ll build
  } else {
    document.getElementById("loginMessage").textContent = "Invalid credentials";
  }
});
