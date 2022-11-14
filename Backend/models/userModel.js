const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name."],
    trim: true,
    minlength: [2, "Size of name must be at least 2"],
    maxlength: [40, "Size of name must be at most 40"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have an email address."],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address."],
  },
  password: {
    type: String,
    required: [true, "A user must have a password."],
    minlength: [8, "Password must be at least 8 characters long."],
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "student", "mess-president", "mess-secretary"],
      message: "Role must be either admin or student.",
    },
    default: "student",
  },
  createdAt: Date,
  emailVerificationToken: String,
  emailVerificationExpiresAt: Date,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpiresAt: Date,
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Method to generate a password reset token
userSchema.methods.generatePasswordResetToken = function () {
  // Generating random hexadecimal string
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Creating an SHA-256 hash for the hexadecimal string
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Setting the reset token's expiration time (10 minutes)
  this.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Method to check if the user recently changed their password
userSchema.methods.wasPasswordChanged = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTime;
  }

  return false;
};

// Setting the creation time for a user before saving into database
userSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
  }
  next();
});

// Setting the password changed time if the user had changed the password
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  // -2000 is to ensure that the jwt issue time is always more than password change time
  this.passwordChangedAt = Date.now() - 2000;

  next();
});

// Setting the hashed password in database rather than original password entered by the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
