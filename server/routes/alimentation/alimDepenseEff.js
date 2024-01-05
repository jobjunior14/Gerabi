const express = require("express");
const router = express.Router();
const {proctect} = require('../../controller/userAuth');
const {
  getDepenseEffAlim,
  pushDataDepenseEffAlim,
  updateDepenseEffAlim,
  monthStatsDepenseEffAlim,
} = require("../../controller/alimentation/depenseEffAlim");

router.route("/").post( pushDataDepenseEffAlim);

router.route("/:year/:month/:day").get( proctect,getDepenseEffAlim).post(updateDepenseEffAlim);

router.route("/:year/:month").get( proctect,monthStatsDepenseEffAlim);


module.exports = router;