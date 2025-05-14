const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User'); // Ensure this path is correct
const authMiddleware = require("../middleware/auth"); // Correct path for authMiddleware
require("dotenv").config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const router = express.Router();
router.post("/resend-verification", async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user is already verified
        if (user.isVerified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        // Generate a new verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");
        user.verificationToken = verificationToken;
        user.verificationTokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours validity

        await user.save();

        // Create the verification link
        const verificationLink = `http://localhost:5000/api/users/verify-email/${verificationToken}`;

        // Send the verification email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            to: email,
            subject: "Resend: Verify Your Email",
            text: `Click this link to verify your email: ${verificationLink}`,
        });

        res.json({ message: "Verification email resent. Please check your inbox." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Registration Route with Email Verification
router.post("/register", async (req, res) => {
    console.log(req.body);  
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiration,
            isVerified: false
        });

        await newUser.save();

        // Send verification email
        const verificationLink = `http://localhost:5000/api/users/verify-email/${verificationToken}`;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        transporter.sendMail({
            to: email,
            subject: "Verify Your Email",
            text: `Click this link to verify your email: ${verificationUrl}`,
        }).catch(err => console.error("Email sending failed:", err));

        res.status(201).json({ message: "User registered successfully. Please check your email to verify your account." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the email is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify Email Route
router.get("/verify-email/:token", async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiration: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification token" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiration = undefined;
        await user.save();

        res.json({ message: "Email successfully verified" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete Account
router.delete("/delete-account", authMiddleware, async (req, res) => {
    try {
      const { password } = req.body; // Require password confirmation
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Incorrect password" });
  
      await user.remove();
      res.json({ message: "Account successfully deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// User Profile Route (protected)
// Edit User Profile Route
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    // Find the user by ID (from the token in authMiddleware)
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate new email
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Update user details
    if (name) user.name = name;
    if (email) user.email = email;

    // Save updated user
    await user.save();

    // Return updated user info
    res.json({
      message: "User profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Password Reset Request Route
router.post("/password-reset-request", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Set the reset token and expiration time
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Create a reset password link
    const resetUrl = `http://localhost:5000/api/users/reset-password/${resetToken}`;

    // Send the reset email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables for security
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      text: `Click this link to reset your password: ${resetUrl}`,
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error in password reset:", error);
    res.status(500).json({ message: "Server error. Please try again later." });  }
});

// Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: new Date() }, // Check if token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }
    if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }
      
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetToken = undefined;  // Clear the reset token
    user.resetTokenExpiration = undefined;
    await user.save();

    res.json({ message: "Password successfully reset" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
