const express = require("express");
const router = express.Router();

const {
  getDepenseEffAlim,
  pushDataDepenseEffAlim,
  updateDepenseEffAlim,
  monthStatsDepenseEffAlim,
} = require("../../controller/alimentation/depenseEffAlim");

router.route("/").post(pushDataDepenseEffAlim);

router.route("/:year/:month/:day").get(getDepenseEffAlim).post(updateDepenseEffAlim);

router.route("/:year/:month").get(monthStatsDepenseEffAlim);

module.exports = router;