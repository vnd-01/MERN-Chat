const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI;


const connection = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Succesfully Connected to mongoDB ")
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connection;