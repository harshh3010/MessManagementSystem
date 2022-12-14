const catchAsync = require("../utilities/catchAsync");
const { default: slugify } = require("slugify");
const {
  validate24HourTimeString,
  getDateFrom24HourTimeString,
  get24HourTimeStringFromDate,
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
    }---${req.body.dayOfWeek}`,
    description: req.body.description,
    dayOfWeek: req.body.dayOfWeek,
    startTime: getDateFrom24HourTimeString(req.body.startTime),
    endTime: getDateFrom24HourTimeString(req.body.endTime),
  };

  const newMessRoutine = await MessRoutine.create(messRoutineObj);

  res.status(200).json({
    status: "success",
    message: "Mess routine added successfully!",
    data: {
      _id: newMessRoutine._id,
      title: newMessRoutine.title,
      description: newMessRoutine.description,
      startTime: get24HourTimeStringFromDate(newMessRoutine.startTime),
      endTime: get24HourTimeStringFromDate(newMessRoutine.endTime),
      dayOfWeek: newMessRoutine.dayOfWeek,
    },
  });
});

/**
 * Function to fetch all the mess routines corresponding to the
 * mess specified in req url params.
 */
exports.getMessRoutines = catchAsync(async (req, res, next) => {
  const messRoutines = await MessRoutine.find({ mess: req.params.messId }).sort(
    { startTime: +1, endTime: +1 }
  );

  var data = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  messRoutines.forEach((messRoutine) => {
    data[messRoutine.dayOfWeek].push({
      _id: messRoutine._id,
      title: messRoutine.title,
      description: messRoutine.description,
      startTime: get24HourTimeStringFromDate(messRoutine.startTime),
      endTime: get24HourTimeStringFromDate(messRoutine.endTime),
    });
  });

  res.status(200).json({
    status: "success",
    data: data,
  });
});
