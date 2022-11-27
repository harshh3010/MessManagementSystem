const catchAsync = require("../utilities/catchAsync");
const Inventory = require("../models/inventoryModel");
const Expense = require("../models/expenseModel");
const Consumption = require("../models/consumptionModel");
const Mess = require("../models/messModel");
const { default: mongoose } = require("mongoose");

exports.getInventoryOverviewData = catchAsync(async (req, res, next) => {
  const { messId } = req.params;
  const items = await Inventory.find({ mess: messId });
  const itemsArr = items.map((item) => item._id.toString());
  const startDate = (await Mess.findById(messId).select("createdAt")).createdAt;
  const itemIdToNameMap = {};
  items.forEach((item) => {
    itemIdToNameMap[item._id.toString()] = item.name;
  });

  const firstDate = new Date(startDate.getFullYear(), 0, 1);
  const days = Math.floor((startDate - firstDate) / (24 * 60 * 60 * 1000));

  const startWeek = Math.ceil(days / 7) - 1;

  var itemIdToWeeklyDataMap = {};
  for (const itemId of itemsArr) {
    const aggregatedExpenses = (
      await Expense.aggregate([
        {
          $match: {
            $and: [
              { date: { $gt: startDate } },
              { item: mongoose.Types.ObjectId(itemId) },
            ],
          },
        },
        {
          $group: {
            _id: { $week: "$date" },
            quantity: { $sum: "$quantity" },
          },
        },
      ])
    ).map((expense) => ({
      week: +expense._id - startWeek,
      quantity: expense.quantity,
    }));

    const aggregatedConsumption = (
      await Consumption.aggregate([
        {
          $match: {
            $and: [
              { date: { $gt: startDate } },
              { item: mongoose.Types.ObjectId(itemId) },
            ],
          },
        },
        {
          $group: {
            _id: { $week: "$date" },
            quantity: { $sum: "$quantity" },
          },
        },
      ])
    ).map((consumption) => ({
      week: +consumption._id - startWeek,
      quantity: consumption.quantity,
    }));

    aggregatedExpenses.forEach((expense) => {
      var add = true;
      aggregatedConsumption.forEach((consumption) => {
        if (consumption.week === expense.week) add = false;
      });
      if (add) aggregatedConsumption.push({ week: expense.week, quantity: 0 });
    });

    aggregatedConsumption.forEach((consumption) => {
      var add = true;
      aggregatedExpenses.forEach((expense) => {
        if (consumption.week === expense.week) add = false;
      });
      if (add) aggregatedExpenses.push({ week: consumption.week, quantity: 0 });
    });

    aggregatedExpenses.sort((a, b) => a.week - b.week);
    aggregatedConsumption.sort((a, b) => a.week - b.week);

    const purchasedData = aggregatedExpenses.map((expense) => {
      return {
        week: `Week ${expense.week}`,
        quantity: expense.quantity,
      };
    });
    const consumedData = aggregatedConsumption.map((expense) => {
      return {
        week: `Week ${expense.week}`,
        quantity: expense.quantity,
      };
    });

    itemIdToWeeklyDataMap[itemIdToNameMap[itemId]] = {
      purchased: purchasedData,
      consumed: consumedData,
    };
  }
  res.status(200).json({
    status: "success",
    data: itemIdToWeeklyDataMap,
  });
});

exports.getExpensesOverviewData = catchAsync(async (req, res, next) => {
  const { messId } = req.params;
  const expenses = await Expense.find({ mess: messId }).populate("item");

  var total = 0;
  var itemNameToCostMap = {};
  for (const expense of expenses) {
    total += expense.amount;
    if (!itemNameToCostMap[expense.item.name]) {
      itemNameToCostMap[expense.item.name] = expense.amount;
    } else {
      itemNameToCostMap[expense.item.name] += expense.amount;
    }
  }

  var arr = [];
  for (var name in itemNameToCostMap) {
    arr.push([name, itemNameToCostMap[name]]);
  }
  arr.sort((a, b) => b[1] - a[1]);

  var len = Math.min(arr.length, 9);
  var rem = total;
  const data = {};
  for (var i = 0; i < len; i++) {
    data[arr[i][0]] = arr[i][1].toFixed(2);
    rem -= arr[i][1];
  }
  if (arr.length > 9) {
    data["Others"] = rem.toFixed(2);
  }
  res.status(200).json({
    status: "success",
    data: {
      totalExpenses: total,
      data: data,
    },
  });
});

exports.getRecentExpenses = catchAsync(async (req, res, next) => {
  const expenses = (
    await Expense.find({ mess: req.params.messId })
      .sort({ date: -1 })
      .limit(6)
      .populate("item")
  ).map((expense) => ({
    name: expense.item.name,
    quantity: `${expense.quantity} ${expense.item.unit}`,
    amount: `₹${expense.amount}`,
  }));
  res.status(200).json({
    status: "success",
    data: expenses,
  });
});

exports.getConsumptionOverviewData = catchAsync(async (req, res, next) => {
  const consumptionData = await Consumption.find({
    mess: req.params.messId,
  }).populate("item");

  const itemNameToConsumedQtyMap = {};
  for (const consumption of consumptionData) {
    if (!itemNameToConsumedQtyMap[consumption.item.name]) {
      itemNameToConsumedQtyMap[consumption.item.name] = consumption.quantity;
    } else {
      itemNameToConsumedQtyMap[consumption.item.name] += consumption.quantity;
    }
  }

  const items = await Inventory.find({ mess: req.params.messId });
  const itemNameToAvailableQtyMap = {};
  for (const item of items) {
    itemNameToAvailableQtyMap[item.name] = item.quantity;
    if (!itemNameToConsumedQtyMap[item.name]) {
      itemNameToConsumedQtyMap[item.name] = 0;
    }
  }

  const data = {
    consumed: itemNameToConsumedQtyMap,
    available: itemNameToAvailableQtyMap,
  };

  res.status(200).json({
    status: "success",
    data: data,
  });
});

exports.getRecentConsumption = catchAsync(async (req, res, next) => {
  const consumption = (
    await Consumption.find({ mess: req.params.messId })
      .sort({ date: -1 })
      .limit(10)
      .populate("item")
  ).map((consumption) => ({
    name: consumption.item.name,
    quantity: `${consumption.quantity} ${consumption.item.unit}`,
  }));
  res.status(200).json({
    status: "success",
    data: consumption,
  });
});
