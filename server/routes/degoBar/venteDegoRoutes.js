const express = require("express");
const router = express.Router();

const {
  getVenteDego,
  pushDataVenteDego,
  updateventeDego,
  monthStatsVenteDego,
} = require("../../controller/degoBar/venteDegoController");

const {protect} = require('../../controller/userAuth');

router.route("/").post(pushDataVenteDego);

router.route("/:year/:month/:day").get(protect, getVenteDego).post(updateventeDego);

router.route("/:year/:month").get(protect, monthStatsVenteDego);

module.exports = router;
