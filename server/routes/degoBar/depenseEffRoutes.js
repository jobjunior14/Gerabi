const express = require("express");
const router = express.Router();

const {
  getDepenseEff,
  pushDataDepenseEff,
  updateDepenseEff,
  monthStatsDepenseEff,
} = require("../../controller/degoBar/depenseEff");

const {protect} = require('../../controller/userAuth');

router.route("/").post(protect,pushDataDepenseEff);

router.route("/:year/:month/:day").get(protect, getDepenseEff).post(protect,updateDepenseEff);

router.route("/:year/:month").get(protect,monthStatsDepenseEff);

module.exports = router;
