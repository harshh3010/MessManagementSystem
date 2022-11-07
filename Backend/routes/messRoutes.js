const express = require("express");

const authController = require("./../controllers/authController");
const messController = require("./../controllers/messController");
const studentController = require("./../controllers/studentController");

const router = express.Router();

// Post request to create a new mess
// Only authenticated admins can perform this action
router.post(
  "/createMess",
  authController.protectRoute,
  authController.restrictTo("admin"),
  messController.createMess
);

// Post request to add a new student to a mess
// Only authenticated admins can perform this action
router.post(
  "/addStudent",
  authController.protectRoute,
  authController.restrictTo("admin"),
  studentController.addStudent
);

module.exports = router;
