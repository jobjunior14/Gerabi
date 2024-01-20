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
  lastCreatedData,
  dailyRapBrasimba
} = require("../../controller/degoBar/suiviStockVente/brasimbaController");

const {protect} = require('../../controller/userAuth');

router
  .route("/rapportJournalier/:year/:month/:day")
  .get(protect, getBrasimba)
  .post(protect,updateDataBrasimba);

router.route("/rapportJournalier").post(protect,pushDataBrasimba);

// stats
router
  .route("/rapportMensuel/stats/:year/:month")
  .get(protect, stastBrasimba);

router
  .route("/rapportMensuel/Allstast/:year/:month")
  .get(protect, AllProductStatsBrasimba);

router
  .route("/rapportMensuel/suiviAllStats/:year/:month")
  .get(protect, suiviAllStatsBrasimba);

router
  .route("/rapportMensuel/suiviDetailStats/:year/:month")
  .get(protect, suiviDetailStatsBrasimba);

router
  .route("/rapportMensuel/yearStats/:year")
  .get(protect, yearStatsBrasimba);

  //last created element
router
  .route("/rapportJournalier/lastElement")
  .get(protect, lastCreatedData);

router
  .route("/rapportJournalier/dailyRap/:year/:month/:day")
  .get(protect, dailyRapBrasimba);

module.exports = router;
