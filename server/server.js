const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();
const upload = multer({ dest: "uploads/" });

// Debugging logs to ensure environment variables are loaded
console.log("✅ EMAIL_USER:", process.env.EMAIL_USER || "❌ NOT SET");
console.log("✅ EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD ? "Loaded" : "❌ NOT SET");
console.log("✅ MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "❌ NOT SET");

// Middleware
app.use(cors({ origin: "http://127.0.0.1:5501" })); // Adjust as per frontend URL
app.use(express.json()); // Built-in JSON parsing

// Routes
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

// Serve static files (processed images & uploaded files)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root Route (Test if API is running)
app.get("/", (req, res) => {
  res.send("Welcome to The Space Renovator API 🚀");
});


// Floor plan upload endpoint
app.post("/upload-floor-plan", upload.single("floorPlan"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded." });
  }

  console.log("Uploaded file:", req.file);
  const fileUrl = `/uploads/${req.file.filename}`;

  res.status(200).json({
    success: true,
    message: "File uploaded successfully!",
    fileUrl: fileUrl, // Send file URL to frontend
  });
});


// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop server if DB connection fails
  });
