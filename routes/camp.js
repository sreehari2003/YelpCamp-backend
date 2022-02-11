const express = require("express");
const campControl = require("../controller/campControl");

const router = express.Router();

router.route("/camp").get(campControl.getAllCamps).post(campControl.createCamp);
router.route("/camp/:id").get(campControl.getOneCamp);

module.exports = router;
