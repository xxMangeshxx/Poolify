document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return (window.location.href = "login.html");
  document.getElementById("username-display").textContent = `Hi, ${user.name}`;

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
    viewSection.style.display = "none";
    postSection.style.display = "block";
  });

  // Logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });

  // Load existing rides
  loadRides();

function loadRides() {
  const rideContainer = document.getElementById("rides-list");
  const rides = JSON.parse(localStorage.getItem("rides") || "[]");

  if (rides.length === 0) {
    rideContainer.innerHTML = "<p>No rides available.</p>";
    return;
  }

  rideContainer.innerHTML = rides.map((ride, index) => `
    <div class="ride-card">
      <h3>${ride.from} → ${ride.to}</h3>
      <p><strong>Date:</strong> ${ride.date} ${ride.time}</p>
      <p><strong>Seats:</strong> ${ride.seats}</p>
      <p><strong>Driver:</strong> ${ride.driver}</p>
      ${ride.note ? `<p><em>${ride.note}</em></p>` : ""}
      <div class="card-footer">
        <button class="btn join-btn" data-index="${index}">Join Ride</button>
      </div>
    </div>
  `).join("");

  // Add click listeners after rendering
  document.querySelectorAll(".join-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const rideIndex = e.target.dataset.index;
      const ride = rides[rideIndex];
      alert(`Joined ride from ${ride.from} to ${ride.to} with ${ride.driver}`);
              // Store the selected ride details in localStorage
      localStorage.setItem("currentRide", JSON.stringify(ride));

        // Redirect to the chat page
      window.location.href = "chat.html";
    });
  });
}


  // Post a Ride Handler
  document.getElementById("postRideForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const seats = document.getElementById("seats").value;
    const note = document.getElementById("note").value.trim();

    const newRide = {
      from,
      to,
      date,
      time,
      seats,
      driver: user.name,
      note
    };

    const rides = JSON.parse(localStorage.getItem("rides") || "[]");
    rides.push(newRide);
    localStorage.setItem("rides", JSON.stringify(rides));

    alert("Ride posted successfully!");
    e.target.reset();
    loadRides();
    viewTab.click();
  });
});
