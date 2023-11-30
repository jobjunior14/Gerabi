const AlimentationAutreProduit = require('../../../models/alimentation/alimentationAutreProduitModel');
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
  
  await getCollection (AlimentationAutreProduit, req, res);

});

exports.pushDataAutreProduit = catchAssynch(async (req, res, next ) => {
 
  await pushDataCollection(req, AlimentationAutreProduit, res)
  
});

exports.updateDataAutreProduit = catchAssynch(async (req, res ) => {
  
  await updateDataCollection(AlimentationAutreProduit, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  await lastCreatedDataCollection(AlimentationAutreProduit, req, res);
});

exports.stastAutreProduit = catchAssynch(async (req, res) => {

  await stastAutreCollection(AlimentationAutreProduit, req, res);

});

exports.AllProductStatsAutreProduit = catchAssynch(async (req, res, next) => {
   
  await AllProductStatsCollection(AlimentationAutreProduit, req, res);

});

exports.yearStatsAutreProduit = catchAssynch(async (req, res, next) => {
  
  await yearStatsCollection(AlimentationAutreProduit, req, res);
});

exports.dailyRapAutreProduit = catchAssynch(async (req, res, next) => {
  
  await dailyRapCollection(AlimentationAutreProduit, req, res);
});
