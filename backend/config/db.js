const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("DB CONNECTED");
  } catch (err) {
    console.log(err);
  }
};

module.exports = ConnectDB;

