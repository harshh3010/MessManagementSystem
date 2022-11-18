const express = require("express");

const authController = require("./../controllers/authController");

const router = express.Router();

// Signup request
router.post("/signup", authController.signUp);

// Email verification
router.post("/verifyEmail/:verificationToken", authController.verifyEmail);

// Login request
router.post("/login", authController.login);

// Forgot password request
router.post("/forgotPassword", authController.forgotPassword);

// Reset password request
router.post("/resetPassword/:passwordResetToken", authController.resetPassword);

// Get logged in user details
router.get(
  "/me",
  authController.protectRoute,
  authController.getLoggedInUserInfo
);

module.exports = router;
