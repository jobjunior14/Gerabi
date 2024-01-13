const express = require("express");
const router = express.Router();

const {
  getVenteAlimentation,
  pushDataVenteAlimentation,
  updateventeAlimentation,
  monthStatsVenteAlimentation,
} = require("../../controller/alimentation/venteAlimentationController");

const {protect} = require('../../controller/userAuth');

router.route("/").post(pushDataVenteAlimentation);

router.route("/:year/:month/:day").get(protect, getVenteAlimentation).post(updateventeAlimentation);

router.route("/:year/:month").get(protect, monthStatsVenteAlimentation);

module.exports = router;
