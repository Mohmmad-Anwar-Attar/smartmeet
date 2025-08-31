const API = "http://localhost:4000/api";

async function createMeeting() {
  let title = document.getElementById("title").value;
  let duration = parseInt(document.getElementById("duration").value) || 1;
  let res = await fetch(`${API}/meetings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, duration, participants: 3 })
  });
  let data = await res.json();
  alert("Meeting Created: ID " + data.meeting.id);
}

async function feedback(useful) {
  let meetingId = document.getElementById("meetingId").value;
  await fetch(`${API}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ meetingId, userId: "u1", useful })
  });
  alert("Feedback submitted");
}

async function loadDashboard() {
  let res = await fetch(`${API}/dashboard`);
  let d = await res.json();
  document.getElementById("dashboard").innerText = JSON.stringify(d, null, 2);

  let ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Useful", "Useless"],
      datasets: [{ data: [d.useful, d.useless], backgroundColor: ["#4CAF50","#E53935"] }]
    }
  });
}

