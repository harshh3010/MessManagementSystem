const express = require("express");

const authController = require("../controllers/authController");
const messController = require("../controllers/messController");
const consumptionController = require("../controllers/consumptionController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    // Post request to add a new consumption
    // Only authenticated admins and mess committee members can perform this action
    authController.protectRoute,
    authController.restrictTo("admin", "mess-president", "mess-secretary"),
    messController.protectRouteUpdate,
    consumptionController.addConsumption
  )
  .get(
    // Get request to fetch all consumptions of a mess
    // Only authenticated admins and mess committee members can perform this action
    authController.protectRoute,
    authController.restrictTo("admin", "mess-president", "mess-secretary"),
    messController.protectRouteUpdate,
    consumptionController.getConsumptions
  );

module.exports = router;
