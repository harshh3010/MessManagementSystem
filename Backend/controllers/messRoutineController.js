const catchAsync = require("../utilities/catchAsync");
const { default: slugify } = require("slugify");
const {
  validate24HourTimeString,
  getDateFrom24HourTimeString,
} = require("../utilities/dateTimeUtils");
const MessRoutine = require("../models/messRoutineModel");
const AppError = require("../utilities/appError");

/**
 * A routine can only be added by authenticated admins or mess committee members,
 * to ensure this the req will pass through {@link authController.protectRoute},
 * {@link authController.restrictTo} middlewares
 */
exports.addMessRoutine = catchAsync(async (req, res, next) => {
  // Validating start and end time input by user
  if (
    !validate24HourTimeString(req.body.startTime) ||
    !validate24HourTimeString(req.body.endTime)
  ) {
    next(
      new AppError("Please input valid start and end time. (HH:MM Format)", 400)
    );
  }

  // Filtering the necessary info from req
  const messRoutineObj = {
    mess: req.params.messId,
    title: req.body.title,
    titleSlug: `${slugify(String(req.body.title).toLowerCase())}---${
      req.params.messId
    }`,
    description: req.body.description,
    dayOfWeek: req.body.dayOfWeek,
    startTime: getDateFrom24HourTimeString(req.body.startTime),
    endTime: getDateFrom24HourTimeString(req.body.endTime),
  };

  const newMessRoutine = await MessRoutine.create(messRoutineObj);

  res.status(200).json({
    status: "success",
    message: "Mess routine added successfully!",
    data: newMessRoutine,
  });
});
