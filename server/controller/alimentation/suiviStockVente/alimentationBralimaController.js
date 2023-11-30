const AlimentationBralima = require('../../../models/alimentation/alimentationBralimaModel');
const catchAssynch = require(`../../../utils/catchAssynch`);

const { 
  pushDataCollection, 
  updateDataCollection,  
} =  require ("../../functions/alimentation/suiviStockVenteAlimentationFucntion");

const {
  getCollection,
  lastCreatedDataCollection,
  stastAutreCollection,
  yearStatsCollection,
  dailyRapCollection,
  AllProductStatsCollection
} = require('../../functions/suiviStockEtVenteFunction');

exports.getAutreProduit = catchAssynch(async (req, res ) => {
  
  await getCollection (AlimentationBralima, req, res);

});

exports.pushDataAutreProduit = catchAssynch(async (req, res, next ) => {
 
  await pushDataCollection(req, AlimentationBralima, res)
  
});

exports.updateDataAutreProduit = catchAssynch(async (req, res ) => {
  
  await updateDataCollection(AlimentationBralima, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  await lastCreatedDataCollection(AlimentationBralima, req, res);
});

exports.stastAutreProduit = catchAssynch(async (req, res) => {

  await stastAutreCollection(AlimentationBralima, req, res);

});

exports.AllProductStatsAutreProduit = catchAssynch(async (req, res, next) => {
   
  await AllProductStatsCollection(AlimentationBralima, req, res);

});

exports.yearStatsAutreProduit = catchAssynch(async (req, res, next) => {
  
  await yearStatsCollection(AlimentationBralima, req, res);
});

exports.dailyRapAutreProduit = catchAssynch(async (req, res, next) => {
  
  await dailyRapCollection(AlimentationBralima, req, res);
});
