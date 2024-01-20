const express = require("express");
const router = express.Router();

const {
  getVenteAlimentation,
  pushDataVenteAlimentation,
  updateventeAlimentation,
  monthStatsVenteAlimentation,
} = require("../../controller/alimentation/venteAlimentationController");

const {protect} = require('../../controller/userAuth');

router.route("/").post(protect,pushDataVenteAlimentation);

router.route("/:year/:month/:day").get(protect, getVenteAlimentation).post(protect,updateventeAlimentation);

router.route("/:year/:month").get(protect, monthStatsVenteAlimentation);

module.exports = router;
