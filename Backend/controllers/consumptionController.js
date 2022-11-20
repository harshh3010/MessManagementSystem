const catchAsync = require("../utilities/catchAsync");
const Consumption = require("../models/consumptionModel");

/**
 * Function to add a new consumption.
 * The consumption can only be added by authenticated admins
 * and mess committee members.
 */
exports.addConsumption = catchAsync(async (req, res, next) => {
  // Filtering the necessary info
  const consumptionObj = {
    mess: req.params.messId,
    item: req.body.itemId,
    quantity: req.body.quantity,
    description: req.body.description,
    date: req.body.date || new Date(),
  };

  const newConsumption = await Consumption.create(consumptionObj);

  res.status(200).json({
    status: "success",
    message: "Consumption added successfully!",
    data: newConsumption,
  });
});

/**
 * Function to get all the consumptions of a mess
 */
exports.getConsumptions = catchAsync(async (req, res, next) => {
  const consumptions = await Consumption.find({ mess: req.params.messId });
  res.status(200).json({
    status: "success",
    data: consumptions,
  });
});
