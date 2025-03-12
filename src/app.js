const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const userRouter = require("./routes/user.routes");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRouter);

module.exports = app;
