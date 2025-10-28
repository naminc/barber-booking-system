const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const staffRoutes = require("./routes/staffRoutes");
const authRoutes = require("./routes/authRoutes");
const settingRoutes = require("./routes/settingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const contactRoutes = require("./routes/contactRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.set("json spaces", 2);
app.use("/uploads", express.static("public/uploads"));

// Test routes
app.get("/", (req, res) => res.send("Hello NodeJS Backend!"));
app.get("/api/status", (req, res) =>
  res.json({ status: "Running", time: new Date() })
);
app.post("/api/echo", (req, res) => res.json({ received: req.body }));

// Main routes
app.use("/api/users", userRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contacts", contactRoutes);

module.exports = app;