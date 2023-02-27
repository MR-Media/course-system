require("dotenv").config();
require("./configs/database").connect();

const express = require("express");

const userRoute = require("./routes/user");

// Initialize express
const app = express();

// Set up middleware
app.use(express.json());

// Set up routes
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
