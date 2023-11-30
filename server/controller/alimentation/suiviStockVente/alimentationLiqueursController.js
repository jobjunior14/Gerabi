const AlimentationLiqueurs = require('../../../models/alimentation/alimentationLiqueursModel');
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
  
  await getCollection (AlimentationLiqueurs, req, res);

});

exports.pushDataAutreProduit = catchAssynch(async (req, res, next ) => {
 
  await pushDataCollection(req, AlimentationLiqueurs, res)
  
});

exports.updateDataAutreProduit = catchAssynch(async (req, res ) => {
  
  await updateDataCollection(AlimentationLiqueurs, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  await lastCreatedDataCollection(AlimentationLiqueurs, req, res);
});

exports.stastAutreProduit = catchAssynch(async (req, res) => {

  await stastAutreCollection(AlimentationLiqueurs, req, res);

});

exports.AllProductStatsAutreProduit = catchAssynch(async (req, res, next) => {
   
  await AllProductStatsCollection(AlimentationLiqueurs, req, res);

});

exports.yearStatsAutreProduit = catchAssynch(async (req, res, next) => {
  
  await yearStatsCollection(AlimentationLiqueurs, req, res);
});

exports.dailyRapAutreProduit = catchAssynch(async (req, res, next) => {
  
  await dailyRapCollection(AlimentationLiqueurs, req, res);
});
