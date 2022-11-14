const express = require("express");

const authController = require("./../controllers/authController");
const messController = require("./../controllers/messController");
const messRoutineController = require("./../controllers/messRoutineController");

const router = express.Router({ mergeParams: true });

router.route("/").post(
  // Post request to add a new mess routine
  // Only authenticated admins and mess committee members can perform this action
  authController.protectRoute,
  authController.restrictTo("admin", "mess-president", "mess-secretary"),
  messController.protectRouteUpdate,
  messRoutineController.addMessRoutine
);

module.exports = router;
