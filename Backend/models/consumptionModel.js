const mongoose = require("mongoose");
const Inventory = require("./inventoryModel");
const AppError = require("../utilities/appError");

const consumptionSchema = mongoose.Schema({
  item: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Inventory",
    required: [true, "A consumption must correspond to some inventory item."],
  },
  quantity: {
    type: Number,
    required: [true, "Please specify the quantity."],
    min: [0, "Min valid quantity is 0."],
    max: [100000, "Max valid quantity is 100000."],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, "Size of description cannot exceed 200."],
  },
  date: Date,
});

/**
 * Cannot consume more than available quantity
 */
consumptionSchema.pre("save", async function (next) {
  this.wasNew = this.isNew;
  const inventoryItem = await Inventory.findById(this.item);
  this.inventoryItem = inventoryItem;
  if (+this.inventoryItem.quantity < +this.quantity) {
    next(new AppError("Cannot consume more that available quantity.", 400));
  }
  next();
});

/**
 * Function to update the quantity of item corresponding to the consumption
 * in the inventory
 */
consumptionSchema.post("save", async function () {
  if (this.wasNew) {
    this.inventoryItem.quantity =
      0 + this.inventoryItem.quantity - this.quantity;
    this.inventoryItem.save();
  }
});

const Consumption = mongoose.model("Consumption", consumptionSchema);

module.exports = Consumption;
