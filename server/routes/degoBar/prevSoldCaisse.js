const express = require("express");
const router = express.Router();

const {
  getVenteAlimentation,
  pushDataVenteAlimentation,
  updateventeAlimentation,
} = require("../../controller/degoBar/preSoldCaisse");

const {protect} = require('../../controller/userAuth');

router.route("/").post(protect,pushDataVenteAlimentation);

router.route("/:year/:month/:day").get(protect, getVenteAlimentation).post(protect,updateventeAlimentation);

module.exports = router;
