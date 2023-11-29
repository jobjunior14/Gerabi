const SuiviDette = require(`../../../models/degoBar/yourSuiviDetteModel.js`);
const catchAssynch = require(`../../../utils/catchAssynch.js`);

const {
    getSuiviDetteCollection,
    pushSuiviDetteCollection,
    updateSuiviDetteCollection,
    lastCreatedDataSuiviDetteCollection,
    mensualStastSuiviDetteCollection,
    mensualStastSuiviDetteDetailCollection,
    totalDetteCollection
} = require ('../../functions/yourSuiviDetteFucntion.js');

exports.getSuiviDette = catchAssynch (async (req, res) => {

    await getSuiviDetteCollection({req: req, res: res, collection: SuiviDette});
});

exports.pushSuiviDette = catchAssynch (async (req, res) => {

    await pushSuiviDetteCollection({req: req, res: res, collection: SuiviDette});
});

exports.updateSuiviDette = catchAssynch (async (req, res, next) => {
    
    await updateSuiviDetteCollection({req: req, res: res, next: next, collection: SuiviDette});
});

exports.lastCreatedDataSuiviDette = catchAssynch (async (req, res,) => {

    await lastCreatedDataSuiviDetteCollection({req: req, res: res, collection: SuiviDette});
});

exports.mensualStasSuiviDette = catchAssynch (async (req, res, next) => {

    await mensualStastSuiviDetteCollection({req: req, next: next, res: res, collection: SuiviDette})
});

exports.mensualStasSuiviDetteDetail = catchAssynch (async (req, res, next) => {

   await mensualStastSuiviDetteDetailCollection({req: req, next: next, res: res, collection: SuiviDette});
});

exports.totalDette = catchAssynch (async (req, res) => {

    await totalDetteCollection({req: req, res: res, collection: SuiviDette});
});