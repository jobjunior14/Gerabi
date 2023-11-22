const VenteDego = require(`../../models/degoBar/venteDegoModel`);
const catchAssynch = require(`../../utils/catchAssynch`);
const {
  getVente,
  pushDataVente,
  updatevente,
  monthStatsVente
} = require ('../functions/dailyVenteFunction&depenseEff');

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
