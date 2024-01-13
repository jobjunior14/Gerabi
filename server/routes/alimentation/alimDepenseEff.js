const express = require("express");
const router = express.Router();
const {protect} = require('../../controller/userAuth');
const {
  getDepenseEffAlim,
  pushDataDepenseEffAlim,
  updateDepenseEffAlim,
  monthStatsDepenseEffAlim,
} = require("../../controller/alimentation/depenseEffAlim");

router.route("/").post(pushDataDepenseEffAlim);

router.route("/:year/:month/:day").get( protect, getDepenseEffAlim).post( updateDepenseEffAlim);

router.route("/:year/:month").get( protect, monthStatsDepenseEffAlim);


module.exports = router;