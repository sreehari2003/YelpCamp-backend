const mongoose = require("mongoose");

const campGroundSchema = new mongoose.Schema({
  title: {
    type: "string",
    //here we are doing some basic eror handling
    required: [true, "should have a title"],
  },
  description: {
    type: "string",
    required: [true, "should have a description"],
  },
  location: String,
});

const camp = mongoose.model("CampGround", campGroundSchema);
module.exports = camp;
