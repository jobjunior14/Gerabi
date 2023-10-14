const express = require("express");
const router = express.Router();
const {
  getBralima,
  createBralima,
  pushDataBralima,
  getOneData,
  updateData,
  stastBralima,
} = require("../controller/bralimaController.js");

const {
  getAutreProduit,
  createAutreProduit,
  pushDataAutreProduit,
  getOneDataAutreProduit,
  updateDataAutreProduit,
  stastAutreProduit,
  AllProductStatsAutreProduit,
  suiviAllStatsAutreProduit,
  suiviDetailStatsAutreProduit,
  yearStatsAutreProduit,
} = require("../controller/autreProduitController.js");

const {
  getBrasimba,
  createBrasimba,
  pushDataBrasimba,
  getOneDataBrasimba,
  updateDataBrasimba,
  stastBrasimba,
} = require("../controller/brasimbaController.js");
const {
  getLiqueurs,
  createLiqueurs,
  pushDataLiqueurs,
  getOneDataLiqueurs,
  updateDataLiqueurs,
  stastLiqueurs,
} = require("../controller/liqueursController.js");

//Autre Produit
router
  .route("/raportJournalier/autreProduit/:year/:month/:day")
  .get(getAutreProduit)
  .post(updateDataAutreProduit);

router.route("/raportJournalier/autreProduit").post(pushDataAutreProduit);

// stats
router
  .route("/raportMensuel/stastAutreProduit/:year/:month")
  .get(stastAutreProduit);

router
  .route("/raportMensuel/AllstastAutreProduit/:year/:month")
  .get(AllProductStatsAutreProduit);

router
  .route("/raportMensuel/suiviAllStatsAutreProduit/:year/:month")
  .get(suiviAllStatsAutreProduit);

router
  .route("/raportMensuel/suiviDetailStatsAutreProduit/:year/:month")
  .get(suiviDetailStatsAutreProduit);

router
  .route("/raportMensuel/yearStatsAutreProduit/:year")
  .get(yearStatsAutreProduit);

module.exports = router;
