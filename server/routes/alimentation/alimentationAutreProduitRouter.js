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
} = require ('../../controller/alimentation/suiviStockVente/alimentationAutreProduitController');

router
  .route("/alimentation/raportJournalier/:year/:month/:day")
  .get(getAutreProduit)
  .post(updateDataAutreProduit);

router.route("/raportJournalier").post(pushDataAutreProduit);

// stats
router
  .route("/alimentation/raportMensuel/stasts/:year/:month")
  .get(stastAutreProduit);

router
  .route("/alimentation/raportMensuel/Allstast/:year/:month")
  .get(AllProductStatsAutreProduit);

router
  .route("/alimentation/raportMensuel/yearStats/:year")
  .get(yearStatsAutreProduit);

  //last created element
router
  .route("/alimentation/raportJournalier/lastElement")
  .get(lastCreatedData);

module.exports = router;