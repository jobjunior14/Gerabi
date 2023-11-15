const express = require("express");
const router = express.Router();

const {
  getVenteDego,
  pushDataVenteDego,
  updateventeDego,
  monthStatsVenteDego,
} = require("../../controller/degoBar/venteDegoController");

router.route("/").post(pushDataVenteDego);

router.route("/:year/:month/:day").get(getVenteDego).post(updateventeDego);

router.route("/:year/:month").get(monthStatsVenteDego);

module.exports = router;
