const catchAsync = require("../utilities/catchAsync");
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
