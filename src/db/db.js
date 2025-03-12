const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("db connect");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
