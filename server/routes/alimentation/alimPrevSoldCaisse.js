const express = require("express");
const router = express.Router();

const {
  getVenteAlimentation,
  pushDataVenteAlimentation,
  updateventeAlimentation,
} = require("../../controller/alimentation/prevSoldCaisse");

const {protect} = require('../../controller/userAuth');

router.route("/").post(protect,pushDataVenteAlimentation);

router.route("/:year/:month/:day").get(protect, getVenteAlimentation).post(protect,updateventeAlimentation);


module.exports = router;
