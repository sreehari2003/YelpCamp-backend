const express = require("express");
const campControl = require("../controller/campControl");

const router = express.Router();

router.route("/v1").get(campControl.getAllCamps).post(campControl.createCamp);
router.route("/v1/:id").get(campControl.getOneCamp);
router.route("/v1/:id/reviews").post(campControl.createReview);

module.exports = router;
