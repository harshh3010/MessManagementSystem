const express = require("express");

const authController = require("./../controllers/authController");
const messController = require("./../controllers/messController");

const messRoutineRoutes = require("./messRoutineRoutes");
const studentRoutes = require("./studentRoutes");
const inventoryRoutes = require("./inventoryRoutes");

const router = express.Router();

router.route("/").post(
  // Post request to create a new mess
  // Only authenticated admins can perform this action
  authController.protectRoute,
  authController.restrictTo("admin"),
  messController.createMess
);

router.use("/:messId/routine", messRoutineRoutes);
router.use("/:messId/student", studentRoutes);
router.use("/:messId/inventory", inventoryRoutes);

module.exports = router;
