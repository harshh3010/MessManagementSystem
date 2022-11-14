const express = require("express");

const authController = require("./../controllers/authController");
const messController = require("./../controllers/messController");

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
  messController.addStudent
);

// Post request to add a new mess routine
// Only authenticated admins and mess committee members can perform this action
router.post(
  "/addMessRoutine",
  authController.protectRoute,
  authController.restrictTo("admin", "mess-president", "mess-secretary"),
  messController.addMessRoutine
);

module.exports = router;
