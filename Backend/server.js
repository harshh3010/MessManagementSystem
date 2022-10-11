// Load and set the environment variables specified in config.env file
require("dotenv").config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./app");

// Establish connection to database
let databaseUrl;

if (process.env.NODE_ENV === "development") {
  databaseUrl = process.env.DATABASE_URL_LOCAL;
} else {
  databaseUrl = process.env.DATABASE_URL;
}

mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Connected to the database.");

    // Starting the server on specified hostname and port
    const hostname = process.env.SERVER_HOSTNAME;
    const port = process.env.SERVER_PORT;

    const server = app.listen(port, hostname, () => {
      console.log(`Server started on port ${port}.`);
    });
  })
  .catch((err) => {
    console.log(
      `Unable to establish connection with the database! Error: ${err}`
    );
  });
