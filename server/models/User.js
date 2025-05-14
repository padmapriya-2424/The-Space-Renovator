const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetToken: { type: String },
  verificationTokenExpiration: { type: Date, default: Date.now, expires: 3600 }, // Expires in 1 hour
  resetTokenExpiration: { type: Date },
});

module.exports = mongoose.model("User", userSchema);
