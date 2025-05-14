const express = require("express");
const router = express.Router();
const Project = require("../models/Project"); // Import project model
//const cv = require("opencv4nodejs");
const path = require("path");
const fs = require("fs");

// ✅ Route to create a new project
router.post("/create", async (req, res) => {
  try {
    const { projectType, userType, floorPlanType } = req.body;

    if (!projectType || !userType || !floorPlanType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProject = new Project({ projectType, userType, floorPlanType });
    await newProject.save();

    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Route to get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/latest", async (req, res) => {
  try {
    const latestProject = await Project.findOne().sort({ createdAt: -1 });

    if (!latestProject) {
      return res.status(404).json({ message: "No project found" });
    }

    res.json(latestProject);
  } catch (error) {
    console.error("Error fetching latest project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/save-room-selection", async (req, res) => {
  try {
    const { roomType, userType } = req.body;

    if (!roomType || !userType) {
      return res.status(400).json({ message: "Room type and user type are required" });
    }

    // Store room selection
    const newSelection = new RoomSelection({ roomType, userType });
    await newSelection.save();

    res.status(201).json({ message: "Room selection saved successfully", room: newSelection });
  } catch (error) {
    console.error("❌ Error saving room selection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/latest-floor-plan", async (req, res) => {
  try {
    const files = fs.readdirSync(path.join(__dirname, "uploads"));
    if (files.length === 0) return res.status(404).json({ message: "No floor plan found." });

    const latestFile = files[files.length - 1]; // Get the last uploaded file
    res.json({ fileUrl: `/uploads/${latestFile}` });
  } catch (error) {
    console.error("Error fetching floor plan:", error);
    res.status(500).json({ message: "Error retrieving floor plan." });
  }
});
const RoomSelection = require("../models/RoomSelection"); // Create a model for room selection

router.post("/save-room-selection", async (req, res) => {
  try {
    const { x, y, roomType } = req.body;
    if (!x || !y || !roomType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSelection = new RoomSelection({ x, y, roomType });
    await newSelection.save();

    res.status(201).json({ message: "Room selection saved successfully", room: newSelection });
  } catch (error) {
    console.error("Error saving room selection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Route to process floor plan image
/*router.post("/process-floor-plan", async (req, res) => {
  try {
    const { filename } = req.body;
    if (!filename) {
      return res.status(400).json({ success: false, message: "Filename is required." });
    }

    const imagePath = path.join(__dirname, "../uploads", filename);
    if (!fs.existsSync(imagePath)) {
      return res.status(400).json({ success: false, message: "File not found" });
    }

    const image = await cv.imreadAsync(imagePath);
    const gray = await image.bgrToGrayAsync();
    const edges = await gray.cannyAsync(50, 150);
    const contours = await edges.findContoursAsync(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    const outputImage = image.copy();
    contours.forEach((contour) => {
      outputImage.drawContours([contour], -1, new cv.Vec(0, 255, 0), 2);
    });

    const processedFilename = `processed_${filename}`;
    const processedPath = path.join(__dirname, "../uploads", processedFilename);
    await cv.imwriteAsync(processedPath, outputImage);

    res.json({
      success: true,
      message: "Rooms processed successfully!",
      processedImage: `/uploads/${processedFilename}`,
      rooms: contours.length,
    });
  } catch (error) {
    console.error("Error processing floor plan:", error);
    res.status(500).json({ success: false, message: "Error processing floor plan" });
  }
});
*/
// ✅ Route to get the latest userType
router.get("/latest-user-type", async (req, res) => {
  try {
    const latestProject = await Project.findOne().sort({ createdAt: -1 });

    if (!latestProject) {
      return res.status(404).json({ message: "No project found" });
    }

    res.json({ userType: latestProject.userType });
  } catch (error) {
    console.error("Error fetching user type:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
