const PrevSoldCaisse = require('../../models/alimentation/alimentationPrevSoldCaisse');
const catchAssynch = require(`../../utils/catchAssynch`);
const {
  getVente,
  pushDataVente,
  updatevente,
} = require ('../functions/dailyVenteFunction&depenseEff');

exports.getVenteAlimentation = catchAssynch(async (req, res, next) => {
  await getVente({req: req, res: res, next: next, collection: PrevSoldCaisse});
});

exports.pushDataVenteAlimentation = catchAssynch(async (req, res, next) => {
  await pushDataVente({req: req, res: res, next: next, collection: PrevSoldCaisse});
});

exports.updateventeAlimentation = catchAssynch(async (req, res, next) => {
  await updatevente({req: req, res: res, next: next, collection: PrevSoldCaisse});
});
