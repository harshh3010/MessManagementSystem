const express = require("express");

const authController = require("./../controllers/authController");
const messController = require("./../controllers/messController");

const messRoutineRoutes = require("./messRoutineRoutes");
const studentRoutes = require("./studentRoutes");
const inventoryRoutes = require("./inventoryRoutes");
const expenseRoutes = require("./expenseRoutes");
const consumptionRoutes = require("./consumptionRoutes");
const reportingRoutes = require("./reportingRoutes");

const router = express.Router();

router
  .route("/")
  .post(
    // Post request to create a new mess
    // Only authenticated admins can perform this action
    authController.protectRoute,
    authController.restrictTo("admin"),
    messController.createMess
  )
  .get(
    // Get request to fetch all messes
    // Can be invoked by logged-in users only
    authController.protectRoute,
    messController.getMesses
  );

router.use("/:messId/routine", messRoutineRoutes);
router.use("/:messId/student", studentRoutes);
router.use("/:messId/inventory", inventoryRoutes);
router.use("/:messId/expense", expenseRoutes);
router.use("/:messId/consumption", consumptionRoutes);
router.use("/:messId/reporting", reportingRoutes);

module.exports = router;
