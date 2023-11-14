const VenteDego = require(`${__dirname}/../models/venteDegoModel.js`);
const catchAssynch = require(`${__dirname}/../utils/catchAssynch.js`);
const {
  getVente,
  pushDataVente,
  updatevente,
  monthStatsVente
} = require ('./functions/venteDegoFunction');

exports.getVenteDego = catchAssynch(async (req, res, next) => {
  getVente({req: req, res: res, next: next, collection: VenteDego});
});

exports.pushDataVenteDego = catchAssynch(async (req, res, next) => {
  pushDataVente({req: req, res: res, next: next, collection: VenteDego});
});

exports.updateventeDego = catchAssynch(async (req, res, next) => {
  updatevente({req: req, res: res, next: next, collection: VenteDego});
});

exports.monthStatsVenteDego = catchAssynch(async (req, res, next) => {
 monthStatsVente({req: req, res: res, next: next, collection: VenteDego});
});
