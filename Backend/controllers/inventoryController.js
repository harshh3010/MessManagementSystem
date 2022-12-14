const { default: slugify } = require("slugify");
const Inventory = require("../models/inventoryModel");
const catchAsync = require("../utilities/catchAsync");

/**
 * Funtion to add a new inventory item in a mess.
 * Action can only be performed by restricted users.
 */
exports.addInventoryItem = catchAsync(async (req, res, next) => {
  // Filtering the necessary info
  const inventoryItemObj = {
    mess: req.params.messId,
    name: req.body.name,
    nameSlug: `${slugify(String(req.body.name).toLowerCase())}---${
      req.params.messId
    }`,
    description: req.body.description,
    brand: req.body.brand,
    unit: req.body.unit,
    quantity: 0,
  };

  const newInventoryItem = await Inventory.create(inventoryItemObj);

  res.status(200).json({
    status: "success",
    message: "Inventory item added successfully!",
    data: newInventoryItem,
  });
});

/**
 * Function to get all items in inventory of a mess
 */
exports.getInventoryItems = catchAsync(async (req, res, next) => {
  const items = await Inventory.find({ mess: req.params.messId });
  res.status(200).json({
    status: "success",
    data: items,
  });
});
