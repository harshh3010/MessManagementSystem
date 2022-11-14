const express = require("express");

const authController = require("./../controllers/authController");
const messController = require("./../controllers/messController");
const studentController = require("./../controllers/studentController");

const router = express.Router({ mergeParams: true });

router.route("/").post(
  // Post request to add a new student to a mess
  // Only authenticated admins can perform this action
  authController.protectRoute,
  authController.restrictTo("admin"),
  messController.protectRouteUpdate,
  studentController.addStudent
);

router.route("/roles").post(
  // Post request to assign a role to some student
  // This action can only be performed by authenticated admins
  authController.protectRoute,
  authController.restrictTo("admin"),
  messController.protectRouteUpdate,
  studentController.assignRole
);

module.exports = router;
