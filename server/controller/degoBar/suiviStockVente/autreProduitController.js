const AutreProduit = require('../../../models/degoBar/autreProduitModel');
const catchAssynch = require(`../../../utils/catchAssynch`);

const {
  pushDataCollection, 
  updateDataCollection, 
  suiviAllStatsCollection,
  suiviDetailStatsCollection,
} =  require ("../../functions/degoBar/suiviStockVenteFunction");

const {
  getCollection,
  lastCreatedDataCollection,
  stastAutreCollection,
  yearStatsCollection,
  dailyRapCollection,
  AllProductStatsCollection
} = require('../../functions/suiviStockEtVenteFunction');

exports.getAutreProduit = catchAssynch(async (req, res ) => {
  
  await getCollection (AutreProduit, req, res);

});

exports.pushDataAutreProduit = catchAssynch(async (req, res, next ) => {
 
  await pushDataCollection(req, AutreProduit, res)
  
});

exports.updateDataAutreProduit = catchAssynch(async (req, res ) => {
  
  await updateDataCollection(AutreProduit, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  await lastCreatedDataCollection(AutreProduit, req, res);
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

exports.dailyRapAutreProduit = catchAssynch(async (req, res, next) => {
  
  await dailyRapCollection(AutreProduit, req, res);
});
