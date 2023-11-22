const VenteAlimentation = require('../../models/alimentation/venteAlimentationModel');
const catchAssynch = require(`../../utils/catchAssynch`);
const {
  getVente,
  pushDataVente,
  updatevente,
  monthStatsVente
} = require ('../functions/dailyVenteFunction&depenseEff');

exports.getVenteAlimentation = catchAssynch(async (req, res, next) => {
  await getVente({req: req, res: res, next: next, collection: VenteAlimentation});
});

exports.pushDataVenteAlimentation = catchAssynch(async (req, res, next) => {
  await pushDataVente({req: req, res: res, next: next, collection: VenteAlimentation});
});

exports.updateventeAlimentation = catchAssynch(async (req, res, next) => {
  await updatevente({req: req, res: res, next: next, collection: VenteAlimentation});
});

exports.monthStatsVenteAlimentation = catchAssynch(async (req, res, next) => {
 await monthStatsVente({req: req, res: res, next: next, collection: VenteAlimentation});
});
