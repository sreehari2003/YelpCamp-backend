const mongoose = require("mongoose");
const { Schema } = mongoose;

const campGroundSchema = new Schema({
  title: {
    type: String,
    //here we are doing some basic eror handling
    required: [true, "should have a title"],
  },
  description: {
    type: String,
    required: [true, "should have a description"],
  },
  location: {
    required: [true, "should have a location"],
    type: String,
  },
  image: {
    required: [true, "should have a image"],
    type: String,
  },
  price: {
    required: [true, "should have a price"],
    type: Number,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const camp = mongoose.model("CampGround", campGroundSchema);
module.exports = camp;
