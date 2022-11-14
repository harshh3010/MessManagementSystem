const catchAsync = require("../utilities/catchAsync");
const User = require("../models/userModel");
const Student = require("../models/studentModel");

/**
 * A student can only be added by authenticated admins,
 * to ensure this the http req will pass through {@link authController.protectRoute}
 * and {@link authController.restrictTo}.
 */
exports.addStudent = catchAsync(async (req, res, next) => {
  // Filtering the necessary info from req
  const studentObj = {
    user: req.body.userId,
    mess: req.params.messId,
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
