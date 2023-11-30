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
  lastCreatedData,
  dailyRapAutreProduit
} = require("../../controller/degoBar/suiviStockVente/autreProduitController");

router
  .route("/rapportJournalier/:year/:month/:day")
  .get(getAutreProduit)
  .post(updateDataAutreProduit);

router.route("/rapportJournalier/").post(pushDataAutreProduit);

// stats
router
  .route("/rapportMensuel/stats/:year/:month")
  .get(stastAutreProduit);

router
  .route("/rapportMensuel/Allstast/:year/:month")
  .get(AllProductStatsAutreProduit);

router
  .route("/rapportMensuel/suiviAllStats/:year/:month")
  .get(suiviAllStatsAutreProduit);

router
  .route("/rapportMensuel/suiviDetailStats/:year/:month")
  .get(suiviDetailStatsAutreProduit);

router
  .route("/rapportMensuel/yearStats/:year")
  .get(yearStatsAutreProduit);

//last created element
router
  .route("/rapportJournalier/lastElement")
  .get(lastCreatedData);

router
  .route("/rapportJournalier/dailyRap/:year/:month/:day")
  .get(dailyRapAutreProduit);

module.exports = router;
