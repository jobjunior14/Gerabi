const DepenseEff = require(`../../models/degoBar/depenseEffectuee`);
const catchAssynch = require(`../../utils/catchAssynch`);
const {
  getVente,
  pushDataVente,
  updatevente,
  monthStatsVente
} = require ('../functions/dailyVenteFunction&depenseEff');

exports.getDepenseEff = catchAssynch(async (req, res, next) => {
  getVente({req: req, res: res, next: next, collection: DepenseEff});
});

exports.pushDataDepenseEff = catchAssynch(async (req, res, next) => {
  pushDataVente({req: req, res: res, next: next, collection: DepenseEff});
});

exports.updateDepenseEff = catchAssynch(async (req, res, next) => {
  updatevente({req: req, res: res, next: next, collection: DepenseEff});
});

exports.monthStatsDepenseEff = catchAssynch(async (req, res, next) => {
 monthStatsVente({req: req, res: res, next: next, collection: DepenseEff});
});
