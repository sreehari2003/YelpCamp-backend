const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user should have a name"],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "user should have a email"],
  },
  place: {
    type: String,
    required: [validator.isEmail, "user should have a place"],
  },
});
