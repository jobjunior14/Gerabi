const AlimentationBrasimba = require('../../../models/alimentation/alimentationBrasimbaModel');
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
  
  await getCollection (AlimentationBrasimba, req, res);

});

exports.pushDataAutreProduit = catchAssynch(async (req, res, next ) => {
 
  await pushDataCollection(req, AlimentationBrasimba, res)
  
});

exports.updateDataAutreProduit = catchAssynch(async (req, res ) => {
  
  await updateDataCollection(AlimentationBrasimba, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  await lastCreatedDataCollection(AlimentationBrasimba, req, res);
});

exports.stastAutreProduit = catchAssynch(async (req, res) => {

  await stastAutreCollection(AlimentationBrasimba, req, res);

});

exports.AllProductStatsAutreProduit = catchAssynch(async (req, res, next) => {
   
  await AllProductStatsCollection(AlimentationBrasimba, req, res);

});

exports.yearStatsAutreProduit = catchAssynch(async (req, res, next) => {
  
  await yearStatsCollection(AlimentationBrasimba, req, res);
});

exports.dailyRapAutreProduit = catchAssynch(async (req, res, next) => {
  
  await dailyRapCollection(AlimentationBrasimba, req, res);
});
