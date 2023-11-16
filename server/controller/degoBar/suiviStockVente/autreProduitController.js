const AutreProduit = require('../../../models/degoBar/autreProduitModel');
const catchAssynch = require(`../../../utils/catchAssynch`);

const {
  getCollection, 
  pushDataCollection, 
  updateDataCollection, 
  stastAutreCollection,
  AllProductStatsCollection, 
  suiviAllStatsCollection,
  suiviDetailStatsCollection,
  yearStatsCollection,
  lastCreatedData
} =  require ("../../functions/degoBar/suiviStockVenteFunction");

exports.getAutreProduit = catchAssynch(async (req, res ) => {
  
  await getCollection (AutreProduit, req, res);

});

exports.pushDataAutreProduit = catchAssynch(async (req, res, next ) => {
 
  await pushDataCollection(req, AutreProduit, res)
  
});

exports.updateDataAutreProduit = catchAssynch(async (req, res ) => {
  
  updateDataCollection(AutreProduit, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  lastCreatedData(AutreProduit, req, res);
});

exports.stastAutreProduit = catchAssynch(async (req, res) => {

  stastAutreCollection(AutreProduit, req, res);

});

exports.AllProductStatsAutreProduit = catchAssynch(async (req, res, next) => {
   
  AllProductStatsCollection(AutreProduit, req, res);

});

exports.suiviAllStatsAutreProduit = catchAssynch(async (req, res, next) => {
  
  suiviAllStatsCollection(AutreProduit, req, res);

});

exports.suiviDetailStatsAutreProduit = catchAssynch(async (req, res, next) => {
 
  suiviDetailStatsCollection(AutreProduit, req, res);

});

exports.yearStatsAutreProduit = catchAssynch(async (req, res, next) => {
  
  yearStatsCollection(AutreProduit, req, res);
});
