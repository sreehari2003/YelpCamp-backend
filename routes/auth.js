const express = require("express");
const router = express.Router();
const userControll = require("../controller/userController");
router
  .route("/signup")
  .post(userControll.newUser)
  .delete(userControll.protect, userControll.delete);

module.exports = router;
