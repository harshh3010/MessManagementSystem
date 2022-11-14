const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the item."],
    trim: true,
    minlength: [2, "Size of name must be at least 2."],
    maxlength: [40, "Size of name must be at most 40."],
  },
  nameSlug: {
    type: String,
    select: false,
    unique: [true, "An item with specified name already exists."],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, "Size of description must not exceed 200."],
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [40, "Size of brand cannot exceed 40."],
  },
  unit: {
    type: String,
    enum: {
      values: ["g", "kg", "ml", "l"],
      message: "Please provide a valid unit.",
    },
    required: [true, "An item must have a unit."],
  },
  quantity: {
    type: mongoose.SchemaTypes.Decimal128,
    default: 0,
    min: [0, "Min valid quantity is 0."],
    max: [10000, "Max valid quantity is 10000."],
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
