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
  lastCreatedData
} = require("../controller/suiviStockVente/bralimaController");

router
  .route("/raportJournalier/:year/:month/:day")
  .get(getBralima)
  .post(updateDataBralima);

router.route("/raportJournalier").post(pushDataBralima);

// stats
router
  .route("/raportMensuel/stasts/:year/:month")
  .get(stastBralima);

router
  .route("/raportMensuel/Allstast/:year/:month")
  .get(AllProductStatsBralima);

router
  .route("/raportMensuel/suiviAllStats/:year/:month")
  .get(suiviAllStatsBralima);

router
  .route("/raportMensuel/suiviDetailStats/:year/:month")
  .get(suiviDetailStatsBralima);

router
  .route("/raportMensuel/yearStats/:year")
  .get(yearStatsBralima);

  //last created element
router
  .route("/raportJournalier/lastElement")
  .get(lastCreatedData);

module.exports = router;
