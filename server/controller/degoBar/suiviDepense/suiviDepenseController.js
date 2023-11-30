const SuiviDepense = require(`../../../models/degoBar/suiviDepenseModel`);
const catchAssynch = require(`../../../utils/catchAssynch.js`);

const {
    getSuiviDepenseCollection,
    pushSuiviDepenseCollection,
    updateSuiviDepenseCollection,
    lastCreatedDataSuiviDepenseCollection,
    mensualStasAllSuiviDepenseCollection,
    mensualstatsDetailsSuiviDepenseCollection,
    dailyRepportSuiviDepenseCollection
} = require('../../functions/suiviDepenseFucntion');

exports.getSuiviDepense = catchAssynch( async (req, res) => {

    await getSuiviDepenseCollection({req: req, res: res, collection: SuiviDepense});
});

exports.pushSuiviDepense = catchAssynch (async (req, res, next) => {

   await pushSuiviDepenseCollection({req: req, res: res, next: next, collection: SuiviDepense});
});

exports.updateSuiviDepense = catchAssynch (async (req, res, next) => {
    
    await updateSuiviDepenseCollection({req: req, res: res, next: next, collection: SuiviDepense});
});

exports.lastCreatedDataSuiviDepense = catchAssynch (async (req, res,) => {

   await lastCreatedDataSuiviDepenseCollection({req: req, res: res, collection: SuiviDepense});
});

exports.mensualStasSuiviDepense = catchAssynch (async (req, res, next) => {

    await mensualStasAllSuiviDepenseCollection({req: req, res: res, next: next, collection: SuiviDepense});
});

exports.mensualDetailStasSuiviDepense = catchAssynch (async (req, res, next) => {

    await mensualstatsDetailsSuiviDepenseCollection({req: req, res: res, next: next, collection: SuiviDepense});
});

exports.dailyRepportSuiviDepense = catchAssynch (async (req, res, next) => {
    await dailyRepportSuiviDepenseCollection({req: req, res: res, next: next, collection: SuiviDepense});
});