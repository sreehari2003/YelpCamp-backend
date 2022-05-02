const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user should have a name"],
  },
  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, "email is required"],
    required: [true, "user should have a email"],
  },
  password: {
    type: String,
    maxlength: 8,
    required: [true, "user should have a password"],
  },
  passwordConfirm: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password not same",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (dbPass, userPass) {
  return await bcrypt.compare(dbPass, userPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
