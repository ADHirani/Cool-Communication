const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected with Database");
    });
};

module.exports = connectDB;
