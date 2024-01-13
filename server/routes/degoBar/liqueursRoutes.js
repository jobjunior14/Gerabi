const express = require("express");
const router = express.Router();

const {
  getLiqueurs,
  pushDataLiqueurs,
  updateDataLiqueurs,
  stastLiqueurs,
  AllProductStatsLiqueurs,
  suiviAllStatsLiqueurs,
  suiviDetailStatsLiqueurs,
  yearStatsLiqueurs,
  lastCreatedData,
  dailyRapLiqueurs
} = require("../../controller/degoBar/suiviStockVente/liqueursController");

const {protect} = require('../../controller/userAuth');

router
  .route("/rapportJournalier/:year/:month/:day")
  .get(protect, getLiqueurs)
  .post(updateDataLiqueurs);

router.route("/rapportJournalier").post(pushDataLiqueurs);

// stats
router
  .route("/rapportMensuel/stats/:year/:month")
  .get(protect, stastLiqueurs);

router
  .route("/rapportMensuel/Allstast/:year/:month")
  .get(protect, AllProductStatsLiqueurs);

router
  .route("/rapportMensuel/suiviAllStats/:year/:month")
  .get(protect, suiviAllStatsLiqueurs);

router
  .route("/rapportMensuel/suiviDetailStats/:year/:month")
  .get(protect, suiviDetailStatsLiqueurs);

router
  .route("/rapportMensuel/yearStats/:year")
  .get(protect, yearStatsLiqueurs);

  //last created element
router
  .route("/rapportJournalier/lastElement")
  .get(protect, lastCreatedData);

router
  .route("/rapportJournalier/dailyRap/:year/:month/:day")
  .get(protect, dailyRapLiqueurs);

module.exports = router;
