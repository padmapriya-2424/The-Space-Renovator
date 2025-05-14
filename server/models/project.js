const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectType: { type: String, required: true },
  userType: { type: String, required: true },
  floorPlanType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
