const PrevsoldCaisse = require('../../models/degoBar/prevSoldCaisse');
const catchAssynch = require(`../../utils/catchAssynch`);
const {
  getVente,
  pushDataVente,
  updatevente,
} = require ('../functions/dailyVenteFunction&depenseEff');

exports.getVenteAlimentation = catchAssynch(async (req, res, next) => {
  await getVente({req: req, res: res, next: next, collection: PrevsoldCaisse});
});

exports.pushDataVenteAlimentation = catchAssynch(async (req, res, next) => {
  await pushDataVente({req: req, res: res, next: next, collection: PrevsoldCaisse});
});

exports.updateventeAlimentation = catchAssynch(async (req, res, next) => {
  await updatevente({req: req, res: res, next: next, collection: PrevsoldCaisse});
});
