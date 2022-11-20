const catchAsync = require("../utilities/catchAsync");
const Expense = require("../models/expenseModel");

/**
 * Function to add a new expense.
 * The expense can only be added by authenticated admins
 * and mess committee members.
 */
exports.addExpense = catchAsync(async (req, res, next) => {
  // Filtering the necessary info
  const expenseObj = {
    mess: req.params.messId,
    item: req.body.itemId,
    amount: req.body.amount,
    quantity: req.body.quantity,
    description: req.body.description,
    seller: req.body.seller,
    date: req.body.date || new Date(),
  };

  const newExpense = await Expense.create(expenseObj);

  res.status(200).json({
    status: "success",
    message: "Expense added successfully!",
    data: newExpense,
  });
});

/**
 * Function to get all expenses of a specified mess
 */
exports.getExpenses = catchAsync(async (req, res, next) => {
  const expenses = await Expense.find({ mess: req.params.messId });
  res.status(200).json({
    status: "success",
    data: expenses,
  });
});
