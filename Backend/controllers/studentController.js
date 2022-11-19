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

  var newStudent = await Student.create(studentObj);
  newStudent = await newStudent.populate("user");

  res.status(200).json({
    status: "success",
    message: "Student added successfully!",
    data: newStudent,
  });
});

/**
 * This function will load all the students that are a part of
 * the mess specified in req url as a param.
 */
exports.getStudents = catchAsync(async (req, res, next) => {
  const students = await Student.find({ mess: req.params.messId }).populate(
    "user"
  );
  res.status(200).json({
    status: "success",
    data: students,
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
