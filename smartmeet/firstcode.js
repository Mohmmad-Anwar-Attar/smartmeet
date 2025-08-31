const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let meetings = [];
let feedbacks = [];

// Create meeting
app.post("/api/meetings", (req, res) => {
  const meeting = { id: Date.now(), ...req.body };
  meetings.push(meeting);
  res.json({ message: "Meeting created", meeting });
});

// Submit feedback
app.post("/api/feedback", (req, res) => {
  feedbacks.push(req.body);
  res.json({ message: "Feedback submitted" });
});

// Dashboard stats
app.get("/api/dashboard", (req, res) => {
  let totalMeetings = meetings.length;
  let totalHours = meetings.reduce((acc, m) => acc + (m.duration || 1), 0);
  let useful = feedbacks.filter(f => f.useful).length;
  let useless = feedbacks.filter(f => !f.useful).length;

  let wastedHours = (useless / feedbacks.length) * totalHours || 0;
  let avgSalary = 500; // Example cost per hour
  let moneyLost = wastedHours * avgSalary;

  res.json({
    totalMeetings,
    totalHours,
    useful,
    useless,
    wastedHours,
    moneyLost
  });
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
