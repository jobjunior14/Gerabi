const express = require("express");
const router = express.Router();

const {
  getVenteDego,
  pushDataVente,
  updatevente,
  monthStatsVente,
} = require("../controller/venteDegoController");

router.route("/").post(pushDataVente);

router.route("/:year/:month/:day").get(getVenteDego).post(updatevente);

router.route("/:year/:month").get(monthStatsVente);

module.exports = router;
