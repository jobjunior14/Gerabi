const express = require("express");
const router = express.Router();

const {
  getAutreProduit,
  pushDataAutreProduit,
  updateDataAutreProduit,
  stastAutreProduit,
  AllProductStatsAutreProduit,
  suiviAllStatsAutreProduit,
  suiviDetailStatsAutreProduit,
  yearStatsAutreProduit,
  lastCreatedData
} = require("../controller/suiviStockVente/autreProduitController");

router
  .route("/raportJournalier/:year/:month/:day")
  .get(getAutreProduit)
  .post(updateDataAutreProduit);

router.route("/raportJournalier/").post(pushDataAutreProduit);

// stats
router
  .route("/raportMensuel/stasts/:year/:month")
  .get(stastAutreProduit);

router
  .route("/raportMensuel/Allstast/:year/:month")
  .get(AllProductStatsAutreProduit);

router
  .route("/raportMensuel/suiviAllStats/:year/:month")
  .get(suiviAllStatsAutreProduit);

router
  .route("/raportMensuel/suiviDetailStats/:year/:month")
  .get(suiviDetailStatsAutreProduit);

router
  .route("/raportMensuel/yearStats/:year")
  .get(yearStatsAutreProduit);

//last created element
router
  .route("/raportJournalier/lastElement")
  .get(lastCreatedData);

module.exports = router;
