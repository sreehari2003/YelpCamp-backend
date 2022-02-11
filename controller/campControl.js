const camp = require("../models/campground");
const AppError = require("../utils/appError");
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
    const cmp = await camp.findById(req.params.id);
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
