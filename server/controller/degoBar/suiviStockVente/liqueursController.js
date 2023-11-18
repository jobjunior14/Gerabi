const Liqueurs = require(`../../../models/degoBar/liqueursModel`);
const catchAssynch = require(`../../../utils/catchAssynch.js`);
const {
  getCollection, 
  pushDataCollection, 
  updateDataCollection, 
  stastAutreCollection,
  AllProductStatsCollection, 
  suiviAllStatsCollection,
  suiviDetailStatsCollection,
  yearStatsCollection,
  lastCreatedDataCollection
} = require ("../../functions/degoBar/suiviStockVenteFunction");

exports.getLiqueurs = catchAssynch(async (req, res ) => {
  
  await getCollection (Liqueurs, req, res);

});

exports.pushDataLiqueurs = catchAssynch(async (req, res ) => {
 
  await pushDataCollection(req, Liqueurs, res)
  
});

exports.updateDataLiqueurs = catchAssynch(async (req, res ) => {
  
  await updateDataCollection(Liqueurs, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  lastCreatedDataCollection(Liqueurs, req, res);
});

exports.stastLiqueurs = catchAssynch(async (req, res, next) => {

  await stastAutreCollection(Liqueurs, req, res);

});

exports.AllProductStatsLiqueurs = catchAssynch(async (req, res, next) => {
   
  await AllProductStatsCollection(Liqueurs, req, res);

});

exports.suiviAllStatsLiqueurs = catchAssynch(async (req, res, next) => {
  
  await suiviAllStatsCollection(Liqueurs, req, res);

});

exports.suiviDetailStatsLiqueurs = catchAssynch(async (req, res, next) => {
 
  await suiviDetailStatsCollection(Liqueurs, req, res);

});

exports.yearStatsLiqueurs = catchAssynch(async (req, res, next) => {
  
  await yearStatsCollection(Liqueurs, req, res);
});
