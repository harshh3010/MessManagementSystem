const express = require("express");

const authController = require("../controllers/authController");
const messController = require("../controllers/messController");
const reportingController = require("../controllers/reportingController");

const router = express.Router({ mergeParams: true });

router
  .route("/getInventoryOverviewData")
  .get(
    authController.protectRoute,
    authController.restrictTo("admin", "mess-secretary", "mess-president"),
    messController.protectRouteUpdate,
    reportingController.getInventoryOverviewData
  );

router
  .route("/getExpenseOverviewData")
  .get(
    authController.protectRoute,
    authController.restrictTo("admin", "mess-secretary", "mess-president"),
    messController.protectRouteUpdate,
    reportingController.getExpensesOverviewData
  );

router
  .route("/getRecentExpenses")
  .get(
    authController.protectRoute,
    authController.restrictTo("admin", "mess-secretary", "mess-president"),
    messController.protectRouteUpdate,
    reportingController.getRecentExpenses
  );

router
  .route("/getConsumptionOverviewData")
  .get(
    authController.protectRoute,
    authController.restrictTo("admin", "mess-secretary", "mess-president"),
    messController.protectRouteUpdate,
    reportingController.getConsumptionOverviewData
  );

router
  .route("/getRecentConsumption")
  .get(
    authController.protectRoute,
    authController.restrictTo("admin", "mess-secretary", "mess-president"),
    messController.protectRouteUpdate,
    reportingController.getRecentConsumption
  );

module.exports = router;
