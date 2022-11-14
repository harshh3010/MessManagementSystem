const catchAsync = require("../utilities/catchAsync");
const Mess = require("../models/messModel");
const Student = require("../models/studentModel");
const User = require("../models/userModel");
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
 * A student can only be added by authenticated admins,
 * to ensure this the http req will pass through {@link authController.protectRoute}
 * and {@link authController.restrictTo}.
 */
exports.addStudent = catchAsync(async (req, res, next) => {
  // Filtering the necessary info from req
  const studentObj = {
    user: req.body.userId,
    mess: req.body.messId,
    registrationNumber: req.body.registrationNumber,
    degree: req.body.degree,
    semester: req.body.semester,
    address: req.body.address,
  };

  const newStudent = await Student.create(studentObj);

  res.status(200).json({
    status: "success",
    message: "Student added successfully!",
    data: newStudent,
  });
});

/**
 * This function will be used to assign roles to students in a mess.
 * The roles can only be assigned by authenticated admins for messes created
 * by them, admins cannot modify messes that are not created by them.
 */
exports.assignRole = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId);
  user.role = req.role;
  user.save();
  res.status(200).json({
    status: "success",
    message: "Role updated successfully!",
  });
});

/**
 * This function will be used as a middleware to restrict certain
 * routes to be accessible by only those students who have paid the
 * mess fee. This must be called after {@link authController.protectRoute}
 * so that the user info can be accessed from req.user
 */
exports.protectRoute = catchAsync(async (req, res, next) => {
  const currentStudent = await Student.findOne({ user: req.user._id });
  if (currentStudent.feeStatus === "unpaid") {
    next(new AppError("Please pay the mess fee to perform this action.", 401));
  } else {
    next();
  }
});

/**
 * Function to check whether a user has access to a specified mess
 */
exports.hasMessAccess = (user, mess) => {
  return user.messes.contains(mess);
};
