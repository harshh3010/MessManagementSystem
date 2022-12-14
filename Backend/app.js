const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utilities/appError");
const errorController = require("./controllers/errorController");
const userRoutes = require("./routes/userRoutes");
const messRoutes = require("./routes/messRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Logging the HTTP requests to console in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// To allow requests from all origins
app.use(
  cors({
    origin: "*",
  })
);

// Middleware to read the body of http post request
app.use(express.json());

// Middleware to serve static files from specified directory
// Here we serve the mess management ui that we build using react
app.use(express.static("../Frontend/mess-management-system-ui/build"));

// Exposing different routes for rest API
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/mess", messRoutes);
app.use("/api/v1/students", studentRoutes);

// In case user searches for some route not defined by us, send a 404 error
app.all("*", (req, res, next) => {
  next(new AppError("This route is not defined!", 404));
});

// Last middleware for global error control
app.use(errorController);

module.exports = app;
