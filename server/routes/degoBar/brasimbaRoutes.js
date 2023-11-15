const express = require("express");
const router = express.Router();

const {
  getBrasimba,
  pushDataBrasimba,
  updateDataBrasimba,
  stastBrasimba,
  AllProductStatsBrasimba,
  suiviAllStatsBrasimba,
  suiviDetailStatsBrasimba,
  yearStatsBrasimba,
  lastCreatedData
} = require("../../controller/degoBar/suiviStockVente/brasimbaController");

router
  .route("/raportJournalier/:year/:month/:day")
  .get(getBrasimba)
  .post(updateDataBrasimba);

router.route("/raportJournalier").post(pushDataBrasimba);

// stats
router
  .route("/raportMensuel/stats/:year/:month")
  .get(stastBrasimba);

router
  .route("/raportMensuel/Allstast/:year/:month")
  .get(AllProductStatsBrasimba);

router
  .route("/raportMensuel/suiviAllStats/:year/:month")
  .get(suiviAllStatsBrasimba);

router
  .route("/raportMensuel/suiviDetailStats/:year/:month")
  .get(suiviDetailStatsBrasimba);

router
  .route("/raportMensuel/yearStats/:year")
  .get(yearStatsBrasimba);

  //last created element
router
  .route("/raportJournalier/lastElement")
  .get(lastCreatedData);

module.exports = router;
