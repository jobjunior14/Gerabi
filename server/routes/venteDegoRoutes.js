const express = require("express");
const router = express.Router();

const {
  getVenteDego,
  pushDataVente,
  updatevente,
  monthStatsVente,
} = require("../controller/venteDegoController");

router.route("/journaliere").post(pushDataVente);

router
  .route("/journaliere/:year/:month/:day")
  .get(getVenteDego)
  .post(updatevente);

router.route("/mensuel/:year/:month").get(monthStatsVente);

module.exports = router;
