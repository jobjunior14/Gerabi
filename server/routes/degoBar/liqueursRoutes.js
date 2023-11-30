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

router
  .route("/rapportJournalier/:year/:month/:day")
  .get(getLiqueurs)
  .post(updateDataLiqueurs);

router.route("/rapportJournalier").post(pushDataLiqueurs);

// stats
router
  .route("/rapportMensuel/stats/:year/:month")
  .get(stastLiqueurs);

router
  .route("/rapportMensuel/Allstast/:year/:month")
  .get(AllProductStatsLiqueurs);

router
  .route("/rapportMensuel/suiviAllStats/:year/:month")
  .get(suiviAllStatsLiqueurs);

router
  .route("/rapportMensuel/suiviDetailStats/:year/:month")
  .get(suiviDetailStatsLiqueurs);

router
  .route("/rapportMensuel/yearStats/:year")
  .get(yearStatsLiqueurs);

  //last created element
router
  .route("/rapportJournalier/lastElement")
  .get(lastCreatedData);

router
  .route("/rapportJournalier/dailyRap/:year/:month/:day")
  .get(dailyRapLiqueurs);

module.exports = router;
