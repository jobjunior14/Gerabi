const DepenseEffAlim = require(`../../models/alimentation/alimentationDepenseEffectuee`);
const catchAssynch = require(`../../utils/catchAssynch`);
const {
  getVente,
  pushDataVente,
  updatevente,
  monthStatsVente
} = require ('../functions/dailyVenteFunction&depenseEff');

exports.getDepenseEffAlim = catchAssynch(async (req, res, next) => {
  getVente({req: req, res: res, next: next, collection: DepenseEffAlim});
});

exports.pushDataDepenseEffAlim = catchAssynch(async (req, res, next) => {
  pushDataVente({req: req, res: res, next: next, collection: DepenseEffAlim});
});

exports.updateDepenseEffAlim = catchAssynch(async (req, res, next) => {
  updatevente({req: req, res: res, next: next, collection: DepenseEffAlim});
});

exports.monthStatsDepenseEffAlim = catchAssynch(async (req, res, next) => {
 monthStatsVente({req: req, res: res, next: next, collection: DepenseEffAlim});
});
