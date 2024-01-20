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
  .get(protect, getBralima)
  .post(protect,updateDataBralima);

router.route("/rapportJournalier").post(protect,pushDataBralima);

// stats
router
  .route("/rapportMensuel/stats/:year/:month")
  .get(protect, stastBralima);

router
  .route("/rapportMensuel/Allstast/:year/:month")
  .get(protect, AllProductStatsBralima);

router
  .route("/rapportMensuel/suiviAllStats/:year/:month")
  .get(protect, suiviAllStatsBralima);

router
  .route("/rapportMensuel/suiviDetailStats/:year/:month")
  .get(protect, suiviDetailStatsBralima);

router
  .route("/rapportMensuel/yearStats/:year")
  .get(protect, yearStatsBralima);

  //last created element
router
  .route("/rapportJournalier/lastElement")
  .get(protect, lastCreatedData);

router
  .route("/rapportJournalier/dailyRap/:year/:month/:day")
  .get(protect, dailyRapBralima);

module.exports = router;
