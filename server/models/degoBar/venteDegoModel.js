const mongoose = require("mongoose");

const dayData = new mongoose.Schema({
  valeur: {
    type: Number,
    require: [true, "must have a value"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const monthData = new mongoose.Schema({
  mois: {
    type: Number,
    default: Number(new Date().getMonth() + 1),
  },

  data: [dayData],
});
const yearData = new mongoose.Schema({
  annee: {
    type: Number,
    default: Number(new Date().getFullYear()),
  },

  data: [monthData],
});

// mongoose.set("strictQuery", false);

const VenteDego = mongoose.model("ventedego", yearData);

module.exports = VenteDego;
