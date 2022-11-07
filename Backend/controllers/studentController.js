const catchAsync = require("../utilities/catchAsync");

exports.test = catchAsync(async (req, res, next) => {
  res.send("Hehe");
});
