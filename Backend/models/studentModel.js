const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A student must have a reference to user."],
    unique: [true, "The specified user already has student record."],
  },
  mess: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mess",
    required: [true, "A student must belong to some mess."],
  },
  feeStatus: {
    type: String,
    enum: {
      values: ["paid", "unpaid"],
      message: "Mess fee status must be either paid or unpaid.",
    },
    default: "unpaid",
  },
  registrationNumber: {
    type: Number,
    unique: [true, "A record with specified registration number exists."],
    required: [true, "A student must have a registration number."],
  },
  degree: {
    type: String,
    enum: {
      values: ["BTech", "MTech", "MCA", "MSc"],
      message: "Please specify a valid degree.",
    },
  },
  semester: {
    type: Number,
    min: [0, "Please provide a valid semester number."],
    max: [8, "Please provide a valid semester number."],
  },
  address: {
    type: String,
    required: [true, "Please provide an address for the student."],
    minlength: [5, "Size of address must be at least 5."],
    maxlength: [200, "Size of address must be at most 200."],
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
