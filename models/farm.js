const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, "farm should have a name"],
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: [validator.isEmail, "farm should have a email id"],
  },
});

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
