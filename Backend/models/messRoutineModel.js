const mongoose = require("mongoose");
const AppError = require("../utilities/appError");

const messRoutineSchema = mongoose.Schema({
  mess: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mess",
    required: [true, "A mess routine must belong to some mess."],
  },
  title: {
    type: String,
    required: [true, "Please provide a title for the mess routine."],
    trim: true,
    minlength: [2, "Size of title must be at least 2."],
    maxlength: [40, "Size of title must be at most 40."],
  },
  titleSlug: {
    type: String,
    select: false,
    unique: [true, "A mess routine with specified title already exists."],
  },
  description: {
    type: String,
    required: [true, "A mess routine must have a description."],
    trim: true,
    minlength: [2, "Size of description must be at least 2."],
    maxlength: [200, "Size of description must be at most 200."],
  },
  dayOfWeek: {
    type: String,
    enum: {
      values: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      message: "Please provide a valid day of week.",
    },
    required: [true, "A mess routine must belong to some day of week."],
  },
  startTime: {
    type: Date,
    required: [true, "A mess routine must have a start time."],
  },
  endTime: {
    type: Date,
    required: [true, "A mess routine must have an end time."],
  },
});

// Middleware to ensure that start time of a routine is less than end time
messRoutineSchema.pre("save", function (next) {
  const startTime = this.startTime.getTime();
  const endTime = this.endTime.getTime();
  if (startTime >= endTime) {
    return next(new AppError("Start time must be smaller than end time.", 400));
  }
  next();
});

const MessRoutine = mongoose.model("MessRoutine", messRoutineSchema);

module.exports = MessRoutine;
