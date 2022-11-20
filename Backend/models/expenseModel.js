const mongoose = require("mongoose");
const Inventory = require("./inventoryModel");

const expenseSchema = mongoose.Schema({
  mess: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Mess",
    required: [true, "An expense must correspond to some mess."],
  },
  item: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Inventory",
    required: [true, "An expense must correspond to some inventory item."],
  },
  amount: {
    type: Number,
    required: [true, "Please specify the amount."],
    min: [0, "Min valid amount is 0."],
    max: [100000, "Max valid amount is 100000."],
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
  seller: {
    type: String,
    trim: true,
    maxlength: [40, "Size of seller cannot exceed 40."],
  },
  date: Date,
});

/**
 * To check if new document is created in post middleware
 */
expenseSchema.pre("save", async function (next) {
  this.wasNew = this.isNew;
  next();
});

/**
 * Function to update the quantity of item corresponding to the expense
 * in the inventory
 */
expenseSchema.post("save", async function () {
  if (this.wasNew) {
    const inventoryItem = await Inventory.findById(this.item);
    inventoryItem.quantity = 0 + inventoryItem.quantity + this.quantity;
    inventoryItem.save();
  }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
