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
  .route("/rapportJournalier/:year/:month/:day")
  .get(getBrasimba)
  .post(updateDataBrasimba);

router.route("/rapportJournalier").post(pushDataBrasimba);

// stats
router
  .route("/rapportMensuel/stats/:year/:month")
  .get(stastBrasimba);

router
  .route("/rapportMensuel/Allstast/:year/:month")
  .get(AllProductStatsBrasimba);

router
  .route("/rapportMensuel/suiviAllStats/:year/:month")
  .get(suiviAllStatsBrasimba);

router
  .route("/rapportMensuel/suiviDetailStats/:year/:month")
  .get(suiviDetailStatsBrasimba);

router
  .route("/rapportMensuel/yearStats/:year")
  .get(yearStatsBrasimba);

  //last created element
router
  .route("/rapportJournalier/lastElement")
  .get(lastCreatedData);

module.exports = router;
