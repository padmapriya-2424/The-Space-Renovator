const mongoose = require("mongoose");

const RoomSelectionSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    roomType: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RoomSelection", RoomSelectionSchema);
