const express = require("express");

const authController = require("./../controllers/authController");
const messController = require("./../controllers/messController");
const studentController = require("./../controllers/studentController");

const router = express.Router();

// Test route
router.post(
  "/test",
  authController.protectRoute,
  messController.protectRoute,
  studentController.test
);

module.exports = router;
