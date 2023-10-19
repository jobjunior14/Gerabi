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
} = require("../controller/brasimbaController.js");

router
  .route("/raportJournalier/:year/:month/:day")
  .get(getBrasimba)
  .post(updateDataBrasimba);

router.route("/raportJournalier").post(pushDataBrasimba);

// stats
router
  .route("/raportMensuel/stasts/:year/:month")
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

module.exports = router;
