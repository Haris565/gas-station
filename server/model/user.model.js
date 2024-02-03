const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  status: {
    type: String,
  },
  otp: {
    type: String,
  },
  role: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
});

module.exports = User = mongoose.model("user", userSchema);
