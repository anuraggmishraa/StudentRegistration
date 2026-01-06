const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ===================== PORT ===================== */
const PORT = process.env.PORT || 3000;

/* ===================== DB CONNECT ===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

/* ===================== MODELS ===================== */
const User = require("./models/user");
const Course = require("./models/course");

/* ===================== ROUTES ===================== */

// Default route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

/* ---------- REGISTER ---------- */
app.post("/register", async (req, res) => {
  try {
    const { email, password, course } = req.body;

    if (!email || !password || !course) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already registered"
      });
    }

    await User.create({
      email: email.trim().toLowerCase(),
      password: password.trim(),
      course
    });

    res.json({
      success: true,
      message: "Registered successfully"
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      success: false,
      message: "Registration failed"
    });
  }
});

/* ---------- LOGIN ---------- */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password required"
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      password: password.trim()
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email or password"
      });
    }

    res.json({
      success: true,
      email: user.email,
      course: user.course
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
});

/* ---------- GET COURSES (FOR DROPDOWN) ---------- */
app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error("Courses error:", err);
    res.status(500).json([]);
  }
});

/* ---------- SEED COURSES (RUN ONCE) ---------- */
app.get("/seed-courses", async (req, res) => {
  try {
    const count = await Course.countDocuments();
    if (count > 0) {
      return res.send("Courses already exist");
    }

    await Course.insertMany([
      { name: "Web Development", duration: "6 Months" },
      { name: "Data Science", duration: "5 Months" },
      { name: "AI & ML", duration: "6 Months" },
      { name: "Cloud Computing", duration: "4 Months" }
    ]);

    res.send("Courses added successfully");
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).send("Seeding failed");
  }
});

/* ===================== START SERVER ===================== */
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
