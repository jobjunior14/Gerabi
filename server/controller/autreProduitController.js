const AutreProduit = require(`${__dirname}/../models/autreProduitModel.js`);
const catchAssynch = require(`${__dirname}/../utils/catchAssynch.js`);
const {
  getCollection, 
  pushDataCollection, 
  updateDataCollection, 
  stastAutreCollection,
  AllProductStatsCollection, 
  suiviAllStatsCollection,
  suiviDetailStatsCollection,
  yearStatsCollection } =  require ("./middlewareFunction.js");

exports.getAutreProduit = catchAssynch(async (req, res ) => {
  
  await getCollection (AutreProduit, req, res);

});

exports.pushDataAutreProduit = catchAssynch(async (req, res, next ) => {
 
  await pushDataCollection(req.body, AutreProduit, res)
  
});

exports.updateDataAutreProduit = catchAssynch(async (req, res ) => {
  
  await updateDataCollection(AutreProduit, req, res );

});

exports.stastAutreProduit = catchAssynch(async (req, res) => {

  await stastAutreCollection(AutreProduit, req, res);

});

exports.AllProductStatsAutreProduit = catchAssynch(async (req, res, next) => {
   
  await AllProductStatsCollection(AutreProduit, req, res);

});

exports.suiviAllStatsAutreProduit = catchAssynch(async (req, res, next) => {
  
  await suiviAllStatsCollection(AutreProduit, req, res);

});

exports.suiviDetailStatsAutreProduit = catchAssynch(async (req, res, next) => {
 
  await suiviDetailStatsCollection(AutreProduit, req, res);

});

exports.yearStatsAutreProduit = catchAssynch(async (req, res, next) => {
  
  await yearStatsCollection(AutreProduit, req, res);
});
