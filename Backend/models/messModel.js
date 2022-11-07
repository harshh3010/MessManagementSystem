const mongoose = require("mongoose");

const messSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the mess"],
    trim: true,
    minlength: [2, "Size of name must be at least 2"],
    maxlength: [40, "Size of name must be at most 40"],
  },
  nameSlug: {
    type: String,
    select: false,
    unique: [true, "A mess with specified name already exists."],
  },
  incharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Every mess must have an incharge"],
  },
  committeeMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Mess = mongoose.model("Mess", messSchema);

module.exports = Mess;
