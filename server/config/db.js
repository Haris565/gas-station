const mongoose = require("mongoose");
const config = require("config");

const mongoURI = config.get("mongoURI");

console.log(mongoURI);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      autoCreate: true,
      autoIndex: true,
    });
    console.log("DB CONNECTED");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
