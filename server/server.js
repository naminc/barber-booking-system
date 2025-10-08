const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
const db = require("./src/config/db"); // Ensure DB connects on server start
const User = require("./src/models/User");
const Staff = require("./src/models/Staff");
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.send("Hello NodeJS Backend");
});

app.get("/api/status", (req, res) => {
  res.json({ status: "API is running at port " + PORT, timestamp: new Date() });
});

app.post("/api/echo", (req, res) => {
  res.json({ received: req.body });
});

app.get("/api/users", (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

app.post("/api/users/create", (req, res) => {
  const { name, email, password, phone, role } = req.body;
  if (!name || !email || !password || !phone || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }
  User.create({ name, email, password, phone, role }, (err, results) => {
    if (err) {
      console.error("Error creating user:", err);
      return res.status(500).json({ error: "Database query error" });
    } else if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not created" });
    }
    res.json(results);
  });
});

app.post("/api/users/delete", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  User.delete(id, (err, results) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Database query error" });
    } else if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(results);
  });
});

app.get("/api/staff", (req, res) => {
  Staff.getAll((err, results) => {
    if (err) {
      console.error("Error fetching staff:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
});

app.post("/api/staff/create", (req, res) => {
  const { name, specialization, phone, status } = req.body;
  if (!name || !specialization || !phone || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }
  Staff.create({ name, specialization, phone, status }, (err, results) => {
    if (err) {
      console.error("Error creating staff:", err);
      return res.status(500).json({ error: "Database query error" });
    } else if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Staff not created" });
    }
    res.json(results);
  });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
