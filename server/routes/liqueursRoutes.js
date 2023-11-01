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
  lastCreatedData
} = require("../controller/suiviStockVente/liqueursController.js");

router
  .route("/raportJournalier/:year/:month/:day")
  .get(getLiqueurs)
  .post(updateDataLiqueurs);

router.route("/raportJournalier").post(pushDataLiqueurs);

// stats
router
  .route("/raportMensuel/stasts/:year/:month")
  .get(stastLiqueurs);

router
  .route("/raportMensuel/Allstast/:year/:month")
  .get(AllProductStatsLiqueurs);

router
  .route("/raportMensuel/suiviAllStats/:year/:month")
  .get(suiviAllStatsLiqueurs);

router
  .route("/raportMensuel/suiviDetailStats/:year/:month")
  .get(suiviDetailStatsLiqueurs);

router
  .route("/raportMensuel/yearStats/:year")
  .get(yearStatsLiqueurs);

  //last created element
router
  .route("/raportJournalier/lastElement")
  .get(lastCreatedData);

module.exports = router;
