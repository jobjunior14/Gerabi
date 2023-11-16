const express = require('express');
const router = express.Router();

const {
    getAutreProduit,
    pushDataAutreProduit,
    updateDataAutreProduit,
    lastCreatedData,
    stastAutreProduit,
    AllProductStatsAutreProduit,
    yearStatsAutreProduit
} = require ('../../controller/alimentation/suiviStockVente/alimentationBralimaController');

router
  .route("/rapportJournalier/:year/:month/:day")
  .get(getAutreProduit)
  .post(updateDataAutreProduit);

router.route("/rapportJournalier").post(pushDataAutreProduit);

// stats
router
  .route("/rapportMensuel/stats/:year/:month")
  .get(stastAutreProduit);

router
  .route("/rapportMensuel/Allstast/:year/:month")
  .get(AllProductStatsAutreProduit);

router
  .route("/rapportMensuel/yearStats/:year")
  .get(yearStatsAutreProduit);

  //last created element
router
  .route("/rapportJournalier/lastElement")
  .get(lastCreatedData);

module.exports = router;