const catchAsync = require("../utilities/catchAsync");
const Mess = require("../models/messModel");
const Student = require("../models/studentModel");
const { default: slugify } = require("slugify");
const AppError = require("../utilities/appError");

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
    fee: req.body.fee,
  };

  const newMess = await Mess.create(messObj);

  res.status(200).json({
    status: "success",
    message: "Mess created successfully!",
    data: newMess,
  });
});

/**
 * This function will be used as a middleware to restrict certain
 * routes to be accessible by only those students who have paid the
 * mess fee. This must be called after {@link authController.protectRoute}
 * so that the user info can be accessed from req.user
 */
exports.protectRouteAccess = catchAsync(async (req, res, next) => {
  const currentStudent = await Student.findOne({ user: req.user._id });
  if (currentStudent && currentStudent.feeStatus === "unpaid") {
    next(new AppError("Please pay the mess fee to perform this action.", 401));
  } else {
    next();
  }
});

/**
 * This function will be used as a middleware to restrict updates
 * to be done by users who have the access to the mess
 *
 * This will be used after {@link authController.protectRoute}, therefore
 * the user info can be found in req.user and mess info will be available from
 * req.params.messId
 */
exports.protectRouteUpdate = (req, res, next) => {
  console.log(req.params.messId);
  console.log(req.user.messes);
  if (req.user.messes.includes(req.params.messId)) {
    next();
  } else {
    next(
      new AppError("You do not have permission to perform this action.", 401)
    );
  }
};
