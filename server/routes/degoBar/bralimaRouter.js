const express = require("express");
const router = express.Router();

const {
  getBralima,
  pushDataBralima,
  updateDataBralima,
  stastBralima,
  AllProductStatsBralima,
  suiviAllStatsBralima,
  suiviDetailStatsBralima,
  yearStatsBralima,
  lastCreatedData,
  dailyRapBralima
} = require("../../controller/degoBar/suiviStockVente/bralimaController");
const {protect} = require('../../controller/userAuth');

router
  .route("/rapportJournalier/:year/:month/:day")
  .get( getBralima)
  .post(updateDataBralima);

router.route("/rapportJournalier").post(pushDataBralima);

// stats
router
  .route("/rapportMensuel/stats/:year/:month")
  .get( stastBralima);

router
  .route("/rapportMensuel/Allstast/:year/:month")
  .get( AllProductStatsBralima);

router
  .route("/rapportMensuel/suiviAllStats/:year/:month")
  .get( suiviAllStatsBralima);

router
  .route("/rapportMensuel/suiviDetailStats/:year/:month")
  .get( suiviDetailStatsBralima);

router
  .route("/rapportMensuel/yearStats/:year")
  .get( yearStatsBralima);

  //last created element
router
  .route("/rapportJournalier/lastElement")
  .get( lastCreatedData);

router
  .route("/rapportJournalier/dailyRap/:year/:month/:day")
  .get( dailyRapBralima);

module.exports = router;
