const SuiviDepense = require(`../../../models/alimentation/suiviDepenseAlimentationModel`);
const catchAssynch = require(`../../../utils/catchAssynch.js`);

const {
    getSuiviDepenseCollection,
    pushSuiviDepenseCollection,
    updateSuiviDepenseCollection,
    lastCreatedDataSuiviDepenseCollection,
    mensualStasSuiviDepenseCollection
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

    await mensualStasSuiviDepenseCollection({req: req, res: res, next: next, collection: SuiviDepense});
});