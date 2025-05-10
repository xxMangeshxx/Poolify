document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("username-display").textContent = `Hi, ${user.username}`;

  // Logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  // Tab Switching
  const viewTab = document.getElementById("view-tab");
  const postTab = document.getElementById("post-tab");
  const viewSection = document.getElementById("view-rides-section");
  const postSection = document.getElementById("post-ride-section");

  viewTab.addEventListener("click", () => {
    viewTab.classList.add("active");
    postTab.classList.remove("active");
    viewSection.style.display = "block";
    postSection.style.display = "none";
  });

  postTab.addEventListener("click", () => {
    postTab.classList.add("active");
    viewTab.classList.remove("active");
    postSection.style.display = "block";
    viewSection.style.display = "none";
  });

  // Load Rides (Stub for now)
  loadRides();

  function loadRides() {
    const dummyRides = JSON.parse(localStorage.getItem("rides") || "[]");
    const rideContainer = document.getElementById("rides-list");
    rideContainer.innerHTML = "";

    if (dummyRides.length === 0) {
      rideContainer.innerHTML = "<p>No rides available.</p>";
      return;
    }

    dummyRides.forEach(ride => {
      const div = document.createElement("div");
      div.className = "ride";
      div.innerHTML = `
        <h3>${ride.from} → ${ride.to}</h3>
        <p><strong>Date:</strong> ${ride.date} at ${ride.time}</p>
        <p><strong>Seats:</strong> ${ride.seats}</p>
        <p><strong>Driver:</strong> ${ride.driver}</p>
        ${ride.note ? `<p><em>${ride.note}</em></p>` : ""}
      `;
      rideContainer.appendChild(div);
    });
  }
});
