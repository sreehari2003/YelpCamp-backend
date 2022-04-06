const camp = require("../models/campground");
const AppError = require("../utils/appError");
const Review = require("../models/review");
const callAsync = require("../utils/callAsync");

exports.getAllCamps = callAsync(async (req, res, next) => {
  const data = await camp.find();
  if (!data) return next(new AppError("couldn't find camps", 404));

  res.status(201).json({
    ok: true,
    res: data,
  });
});
exports.getOneCamp = async (req, res, next) => {
  try {
    const cmp = await camp.findById(req.params.id).populate("reviews");
    if (!cmp) {
      new AppError("Camp not found", 404);
      next();
    } else {
      res.status(200).json({
        ok: true,
        res: cmp,
      });
    }
  } catch (e) {
    res.status(404).json({
      ok: false,
      error: e,
    });
  }
};
exports.createCamp = callAsync(async (req, res, next) => {
  const data = await camp.create(req.body);
  if (!data) return next(new AppError("couldnot createCamp", 404));
  res.status(201).json({
    ok: true,
    res: data,
  });
});
exports.createReview = callAsync(async (req, res, next) => {
  const user = await camp.findById(req.params.id);
  if (!user) return next(new AppError("requested user not found", 401));
  const rev = new Review(req.body);
  user.reviews.push(rev);
  await user.save();
  await rev.save();
  res.status(201).json({
    ok: true,
    res: "review was added",
  });
});
