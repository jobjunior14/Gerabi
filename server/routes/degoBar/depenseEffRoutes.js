const express = require("express");
const router = express.Router();

const {
  getDepenseEff,
  pushDataDepenseEff,
  updateDepenseEff,
  monthStatsDepenseEff,
} = require("../../controller/degoBar/depenseEff");

router.route("/").post(pushDataDepenseEff);

router.route("/:year/:month/:day").get(getDepenseEff).post(updateDepenseEff);

router.route("/:year/:month").get(monthStatsDepenseEff);

module.exports = router;
