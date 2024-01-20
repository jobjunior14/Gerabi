const express = require('express');
const router = express.Router();

const {
    getAutreProduit,
    pushDataAutreProduit,
    updateDataAutreProduit,
    lastCreatedData,
    stastAutreProduit,
    AllProductStatsAutreProduit,
    yearStatsAutreProduit,
    dailyRapAutreProduit
} = require ('../../controller/alimentation/suiviStockVente/alimentationBralimaController');

const {protect} = require('../../controller/userAuth');

router
  .route("/rapportJournalier/:year/:month/:day")
  .get(protect, getAutreProduit)
  .post(protect,updateDataAutreProduit);

router.route("/rapportJournalier").post(protect,pushDataAutreProduit);

// stats
router
  .route("/rapportMensuel/stats/:year/:month")
  .get(protect, stastAutreProduit);

router
  .route("/rapportMensuel/Allstast/:year/:month")
  .get(protect, AllProductStatsAutreProduit);

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