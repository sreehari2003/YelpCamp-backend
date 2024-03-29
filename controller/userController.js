const User = require("../models/user");
const appError = require("../utils/appError");
const catchAsync = require("../utils/callAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

//function to create jwt token
const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET);
};

exports.newUser = catchAsync(async (req, res, next) => {
  const { password, name, passwordConfirm, email } = req.body;
  console.log(req.body);
  if (!email || !password || !passwordConfirm || !name) {
    return next(new appError("Data input missing", 404));
  }
  const obj = { email, password, name, passwordConfirm };
  const resp = await User.create(obj);
  const token = createToken(resp._id);
  res.status(201).json({
    ok: true,
    message: "User created successfully",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new appError("not authorized", 401));
  }
  const token = req.headers.authorization.split(" ")[1];
  const use = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = User.findById(use.id);
  req.user = user;
  next();
});

exports.delete = catchAsync(async (req, res, next) => {
  const { _id } = req.user._conditions;
  if (!_id) return next(new appError("user not found", 404));

  await User.findByIdAndDelete(_id);
  res.status(200).json({
    ok: true,
    message: "User deleted successfully",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new appError("please enter a valid email or password", 401));
  }
  const user = await User.findOne({ email: email }).select("+password");

  if (!(await user.correctPassword(password, user.password))) {
    return next(new appError("Invalid Email or Password", 401));
  }
  const token = createToken(user._id);

  res.status(200).json({
    ok: true,
    userName: user.name,
    token,
  });
});
