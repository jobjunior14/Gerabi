const Bralima = require(`../../../models/degoBar/bralimaModel`);
const catchAssynch = require(`../../../utils/catchAssynch.js`);
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
exports.getBralima = catchAssynch(async (req, res ) => {
  
 await getCollection(Bralima, req, res);

});

exports.pushDataBralima = catchAssynch(async (req, res ) => {
 
  await pushDataCollection(req, Bralima, res)
  
});

exports.updateDataBralima = catchAssynch(async (req, res ) => {
  
  await updateDataCollection(Bralima, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  lastCreatedDataCollection(Bralima, req, res);
});

exports.stastBralima = catchAssynch(async (req, res, next) => {

  await stastAutreCollection(Bralima, req, res);

});

exports.AllProductStatsBralima = catchAssynch(async (req, res, next) => {
   
  await AllProductStatsCollection(Bralima, req, res);

});

exports.suiviAllStatsBralima = catchAssynch(async (req, res, next) => {
  
  await suiviAllStatsCollection(Bralima, req, res);

});

exports.suiviDetailStatsBralima = catchAssynch(async (req, res, next) => {
 
  await suiviDetailStatsCollection(Bralima, req, res);

});

exports.yearStatsBralima = catchAssynch(async (req, res, next) => {
  
  await yearStatsCollection(Bralima, req, res);
});

exports.dailyRapBralima = catchAssynch(async (req, res, next) => {
  
  await dailyRapCollection(Bralima, req, res);
});
