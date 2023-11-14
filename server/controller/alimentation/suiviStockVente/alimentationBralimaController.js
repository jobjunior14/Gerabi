const AlimentationBralima = require('../../../models/alimentation/alimentationBralimaModel');
const catchAssynch = require(`../../../utils/catchAssynch`);

const {
  getCollection, 
  pushDataCollection, 
  updateDataCollection, 
  stastAutreCollection,
  AllProductStatsCollection, 
  yearStatsCollection,
  lastCreatedData
} = require ("../../functions/suiviStockVenteAlimentationFucntion");

exports.getAutreProduit = catchAssynch(async (req, res ) => {
  
  await getCollection (AlimentationBralima, req, res);

});

exports.pushDataAutreProduit = catchAssynch(async (req, res, next ) => {
 
  pushDataCollection(req, AlimentationBralima, res)
  
});

exports.updateDataAutreProduit = catchAssynch(async (req, res ) => {
  
  updateDataCollection(AlimentationBralima, req, res );

});

exports.lastCreatedData = catchAssynch( async (req, res) => {

  lastCreatedData(AlimentationBralima, req, res);
});

exports.stastAutreProduit = catchAssynch(async (req, res) => {

  stastAutreCollection(AlimentationBralima, req, res);

});

exports.AllProductStatsAutreProduit = catchAssynch(async (req, res, next) => {
   
  AllProductStatsCollection(AlimentationBralima, req, res);

});

exports.yearStatsAutreProduit = catchAssynch(async (req, res, next) => {
  
  yearStatsCollection(AlimentationBralima, req, res);
});
