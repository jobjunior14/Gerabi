const express = require("express");
const router = express.Router();

const {
  getVenteAlimentation,
  pushDataVenteAlimentation,
  updateventeAlimentation,
  monthStatsVenteAlimentation,
} = require("../../controller/alimentation/venteAlimentationController");

router.route("/").post(pushDataVenteAlimentation);

router.route("/:year/:month/:day").get(getVenteAlimentation).post(updateventeAlimentation);

router.route("/:year/:month").get(monthStatsVenteAlimentation);

module.exports = router;
