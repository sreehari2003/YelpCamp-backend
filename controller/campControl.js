const camp = require("../models/campground");
const AppError = require("../utils/appError");
const Review = require("../models/review");
exports.getAllCamps = async (req, res, next) => {
  try {
    const data = await camp.find();
    res.status(201).json({
      ok: true,
      res: data,
    });
  } catch {
    res.status(201).json({
      ok: false,
      res: "something went wrong",
    });
  }
};
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
exports.createCamp = async (req, res, next) => {
  try {
    const data = await camp.create(req.body);
    res.status(201).json({
      ok: true,
      res: data,
    });
  } catch (err) {
    res.status(404).json({
      ok: false,
      err: err,
    });
  }
};
exports.createReview = async (req, res, next) => {
  try {
    const user = await camp.findById(req.params.id);
    const rev = new Review(req.body);
    user.reviews.push(rev);
    await user.save();
    await rev.save();
    res.status(201).json({
      ok: true,
      res: "review was added",
    });
  } catch (e) {
    res.status(404).json({
      ok: false,
      res: e,
    });
  }
};
