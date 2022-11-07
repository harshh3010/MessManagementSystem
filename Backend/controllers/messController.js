const catchAsync = require("../utilities/catchAsync");
const Mess = require("../models/messModel");
const { default: slugify } = require("slugify");

/**
 * A mess can only be created by authenticated admins,
 * to ensure this the http req will pass through {@link authController.protectRoute}
 * and {@link authController.restrictTo}. The info of user creating the mess (which is also the
 * logged in user) will be present in req.user
 */
exports.createMess = catchAsync(async (req, res, next) => {
  // Filtering the necessary info from req
  const messObj = {
    name: req.body.name,
    nameSlug: slugify(String(req.body.name).toLowerCase()),
    incharge: req.user._id,
    committeeMembers: req.body.committeeMembers,
  };

  const newMess = await Mess.create(messObj);

  res.status(200).json({
    status: "success",
    message: "Mess created successfully!",
    data: newMess,
  });
});
