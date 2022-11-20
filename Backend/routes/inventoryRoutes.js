const express = require("express");

const authController = require("../controllers/authController");
const inventoryController = require("../controllers/inventoryController");
const messController = require("../controllers/messController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    // Post request to add a new item in inventory
    // Only authenticated admins and mess committee members can perform this action
    authController.protectRoute,
    authController.restrictTo("admin", "mess-president", "mess-secretary"),
    messController.protectRouteUpdate,
    inventoryController.addInventoryItem
  )
  .get(
    // Get request to fetch all items in inventory of a mess
    // Only authenticated admins and mess committee members can perform this action
    authController.protectRoute,
    authController.restrictTo("admin", "mess-president", "mess-secretary"),
    messController.protectRouteUpdate,
    inventoryController.getInventoryItems
  );

module.exports = router;
