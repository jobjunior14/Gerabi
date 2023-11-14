const VenteAlimentation = require('../../models/alimentation/venteAlimentationModel');
const catchAssynch = require(`${__dirname}/../utils/catchAssynch.js`);
const {
  getVente,
  pushDataVente,
  updatevente,
  monthStatsVente
} = require ('../functions/venteDegoFunction');

exports.getVenteAlimentation = catchAssynch(async (req, res, next) => {
  getVente({req: req, res: res, next: next, collection: VenteAlimentation});
});

exports.pushDataVenteAlimentation = catchAssynch(async (req, res, next) => {
  pushDataVente({req: req, res: res, next: next, collection: VenteAlimentation});
});

exports.updateventeAlimentation = catchAssynch(async (req, res, next) => {
  updatevente({req: req, res: res, next: next, collection: VenteAlimentation});
});

exports.monthStatsVenteAlimentation = catchAssynch(async (req, res, next) => {
 monthStatsVente({req: req, res: res, next: next, collection: VenteAlimentation});
});
