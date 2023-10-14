const mongoose = require("mongoose");

const valeurSchema = new mongoose.Schema({
  valeur: {
    trype: Number,
    require: [true, "vous devez mettre les ventes journailere"],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

const monthData = new mongoose.Schema({
  mois: {
    type: Number,
    default: Number(new Date().getMonth() + 1),
  },
  data: [valeurSchema],
});

const yearData = new mongoose.Schema({
  annee: {
    type: Number,
    default: Number(new Date().getFullYear),
  },

  data: [monthData],
});

mongoose.set("strictQuery", false);

const VenteDego = mongoose.model("ventedego", yearData);

module.exports = VenteDego;
