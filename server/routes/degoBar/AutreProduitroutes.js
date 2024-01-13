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

const {protect} = require('../../controller/userAuth');

router
  .route("/rapportJournalier/:year/:month/:day")
  .get(protect, getAutreProduit)
  .post(updateDataAutreProduit);

router.route("/rapportJournalier/").post(pushDataAutreProduit);

// stats
router
  .route("/rapportMensuel/stats/:year/:month")
  .get(protect, stastAutreProduit);

router
  .route("/rapportMensuel/Allstast/:year/:month")
  .get(protect, AllProductStatsAutreProduit);

router
  .route("/rapportMensuel/suiviAllStats/:year/:month")
  .get(protect, suiviAllStatsAutreProduit);

router
  .route("/rapportMensuel/suiviDetailStats/:year/:month")
  .get(protect, suiviDetailStatsAutreProduit);

router
  .route("/rapportMensuel/yearStats/:year")
  .get(protect, yearStatsAutreProduit);

//last created element
router
  .route("/rapportJournalier/lastElement")
  .get(protect, lastCreatedData);

router
  .route("/rapportJournalier/dailyRap/:year/:month/:day")
  .get(protect, dailyRapAutreProduit);

module.exports = router;
