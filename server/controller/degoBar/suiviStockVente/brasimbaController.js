const Brasimba = require(`../../../models/degoBar/brasimbaModel`);
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
} =   require ("../../functions/degoBar/suiviStockVenteFunction");

exports.getBrasimba = catchAssynch(async (req, res ) => {
  
  await getCollection (Brasimba, req, res);

});

exports.pushDataBrasimba = catchAssynch(async (req, res ) => {
 
  await pushDataCollection(req, Brasimba, res)
  
});

exports.updateDataBrasimba = catchAssynch(async (req, res ) => {
  
  await updateDataCollection(Brasimba, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  lastCreatedDataCollection(Brasimba, req, res);
});

exports.stastBrasimba = catchAssynch(async (req, res, next) => {

  await stastAutreCollection(Brasimba, req, res);

});

exports.AllProductStatsBrasimba = catchAssynch(async (req, res, next) => {
   
  await AllProductStatsCollection(Brasimba, req, res);

});

exports.suiviAllStatsBrasimba = catchAssynch(async (req, res, next) => {
  
  await suiviAllStatsCollection(Brasimba, req, res);

});

exports.suiviDetailStatsBrasimba = catchAssynch(async (req, res, next) => {
 
  await suiviDetailStatsCollection(Brasimba, req, res);

});

exports.yearStatsBrasimba = catchAssynch(async (req, res, next) => {
  
  await yearStatsCollection(Brasimba, req, res);
});