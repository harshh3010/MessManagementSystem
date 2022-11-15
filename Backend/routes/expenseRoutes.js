const express = require("express");

const authController = require("../controllers/authController");
const messController = require("../controllers/messController");
const expenseController = require("../controllers/expenseController");

const router = express.Router({ mergeParams: true });

router.route("/").post(
  // Post request to add a new expense
  // Only authenticated admins and mess committee members can perform this action
  authController.protectRoute,
  authController.restrictTo("admin", "mess-president", "mess-secretary"),
  messController.protectRouteUpdate,
  expenseController.addExpense
);

module.exports = router;
